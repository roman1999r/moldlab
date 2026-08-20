-- CacaoForm production schema
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  old_price numeric(10,2),
  size text,
  cells integer not null default 1 check (cells > 0),
  image_url text,
  model_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  comment text,
  items jsonb not null,
  total numeric(10,2) not null check (total >= 0),
  status text not null default 'new' check (status in ('new','confirmed','in_progress','ready','shipped','completed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.custom_orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  description text not null,
  file_url text,
  status text not null default 'new' check (status in ('new','confirmed','in_progress','ready','shipped','completed','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.custom_orders enable row level security;

drop policy if exists "products_public_read" on public.products;
drop policy if exists "products_admin_insert" on public.products;
drop policy if exists "products_admin_update" on public.products;
drop policy if exists "products_admin_delete" on public.products;
create policy "products_public_read" on public.products for select to anon, authenticated using (true);
create policy "products_admin_insert" on public.products for insert to authenticated with check (public.is_admin());
create policy "products_admin_update" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "products_admin_delete" on public.products for delete to authenticated using (public.is_admin());

drop policy if exists "orders_public_insert" on public.orders;
drop policy if exists "orders_admin_read" on public.orders;
drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_public_insert" on public.orders for insert to anon, authenticated with check (status = 'new');
create policy "orders_admin_read" on public.orders for select to authenticated using (public.is_admin());
create policy "orders_admin_update" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "custom_public_insert" on public.custom_orders;
drop policy if exists "custom_admin_read" on public.custom_orders;
drop policy if exists "custom_admin_update" on public.custom_orders;
create policy "custom_public_insert" on public.custom_orders for insert to anon, authenticated with check (status = 'new');
create policy "custom_admin_read" on public.custom_orders for select to authenticated using (public.is_admin());
create policy "custom_admin_update" on public.custom_orders for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Storage bucket for product photos and GLB files.
insert into storage.buckets (id, name, public) values ('catalog','catalog',true) on conflict (id) do update set public = true;

drop policy if exists "catalog_public_read" on storage.objects;
drop policy if exists "catalog_admin_insert" on storage.objects;
drop policy if exists "catalog_admin_update" on storage.objects;
drop policy if exists "catalog_admin_delete" on storage.objects;
create policy "catalog_public_read" on storage.objects for select using (bucket_id = 'catalog');
create policy "catalog_admin_insert" on storage.objects for insert to authenticated with check (bucket_id = 'catalog' and public.is_admin());
create policy "catalog_admin_update" on storage.objects for update to authenticated using (bucket_id = 'catalog' and public.is_admin()) with check (bucket_id = 'catalog' and public.is_admin());
create policy "catalog_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'catalog' and public.is_admin());

-- After creating your admin account in Supabase Auth, add its UUID:
-- insert into public.admin_users(user_id) values ('YOUR-AUTH-USER-UUID');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types) values ('custom-uploads','custom-uploads',true,10485760,array['image/*','image/svg+xml','application/pdf','model/gltf-binary','model/obj','application/octet-stream','text/plain']) on conflict (id) do update set public = true, file_size_limit = 10485760;
drop policy if exists "custom_upload_public" on storage.objects;
drop policy if exists "custom_upload_read" on storage.objects;
drop policy if exists "custom_upload_admin_delete" on storage.objects;
create policy "custom_upload_public" on storage.objects for insert to anon, authenticated with check (bucket_id = 'custom-uploads');
create policy "custom_upload_read" on storage.objects for select using (bucket_id = 'custom-uploads');
create policy "custom_upload_admin_delete" on storage.objects for delete to authenticated using (bucket_id = 'custom-uploads' and public.is_admin());
