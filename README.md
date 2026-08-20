# CacaoForm — React + JavaScript

Магазин силіконових форм для шоколаду на React + Vite + JavaScript + Supabase.

## Що зроблено

- React + JavaScript, без TypeScript
- GitHub Pages через GitHub Actions
- Supabase Auth + RLS
- прихована admin-зона: `/#/manage-x7k9`
- адмінка перевіряє `is_admin()` перед доступом до даних
- каталог товарів із 3D GLB viewer
- demo GLB-моделі в `public/models/`
- збільшені та центровані 3D-картки
- кошик із кількістю товарів і localStorage
- custom-order форма з upload
- українська / польська / англійська локалізація
- автоматичне визначення мови браузера + збереження вибору
- Supabase Storage для фото та GLB
- GitHub Actions build з Supabase environment secrets

## Локальний запуск

```bash
npm install
npm run dev
```

Створи `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

## Supabase

1. Створи Supabase project.
2. Виконай `supabase/schema.sql` у SQL Editor.
3. У Authentication створи admin user.
4. Додай його UUID:

```sql
insert into public.admin_users(user_id)
values ('YOUR-AUTH-USER-UUID');
```

5. Переконайся, що Storage bucket `catalog` створився через schema.

## Адмінка

У меню магазину посилання на адмінку навмисно відсутнє.

Адреса:

```text
/#/manage-x7k9
```

Це лише маскування URL. Реальний захист — Supabase Auth + `public.is_admin()` + RLS.

Відкритої реєстрації адмінів немає. Нових адміністраторів створюй через Supabase Authentication.

## 3D

Demo GLB знаходяться тут:

```text
public/models/
```

Для реальних товарів краще завантажувати `.glb` через Admin → Products → 3D model. STL можна попередньо конвертувати в GLB через Blender.

## GitHub Pages

У GitHub repository додай Actions secrets:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Workflow використовує їх під час `npm run build`.

Якщо repository називається `cacaoform`, у `vite.config.js` залишай:

```js
base: '/cacaoform/'
```
