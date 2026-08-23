import {useEffect, useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    ImagePlus,
    Box,
    Package,
    ClipboardList,
    LogOut,
    Plus,
    Pencil,
    Trash2,
    Upload,
    RefreshCw,
    Users as UsersIcon
} from 'lucide-react';
import {supabase} from '../lib/supabase';
import {useLanguage} from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Users from './Users';



async function notifyStatus(orderId, type = 'order') {
    if (!supabase) return;
    const {error} = await supabase.functions.invoke('notify-order-status', {
        body: {order_id: orderId, type},
    });
    if (error) console.error('Telegram status notification failed:', error);
}

const emptyProduct = {
    id: null,
    name: '',
    category: 'Фігурки',
    description: '',
    price: '',
    old_price: '',
    size: '',
    cells: 1,
    image_url: '',
    model_url: '',
    featured: false
};
const statuses = ['new', 'confirmed', 'in_progress', 'ready', 'shipped', 'completed', 'cancelled'];
const statusLabels = {
    new: 'Нове',
    confirmed: 'Підтверджено',
    in_progress: 'В роботі',
    ready: 'Готово',
    shipped: 'Відправлено',
    completed: 'Завершено',
    cancelled: 'Скасовано'
};

export default function Admin() {
    const {t} = useLanguage();
    const [session, setSession] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('dashboard');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customOrders, setCustomOrders] = useState([]);
    const [editing, setEditing] = useState(null);
    const [saving, setSaving] = useState(false);

    async function verifyAdmin(currentSession) {
        if (!currentSession || !supabase) {
            setAuthorized(false);
            return false;
        }
        const {data, error} = await supabase.rpc('is_admin');
        const ok = !error && data === true;
        setAuthorized(ok);
        if (!ok) setMessage(t.admin.adminOnly);
        return ok;
    }

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            setMessage(t.admin.supabase);
            return;
        }
        let active = true;
        supabase.auth.getSession().then(async ({data}) => {
            if (!active) return;
            setSession(data.session);
            await verifyAdmin(data.session);
            setLoading(false)
        });
        const {data} = supabase.auth.onAuthStateChange((_e, s) => {
            setSession(s);
            if (s) verifyAdmin(s); else setAuthorized(false)
        });
        return () => {
            active = false;
            data.subscription.unsubscribe()
        };
    }, []);
    useEffect(() => {
        if (authorized) loadAll()
    }, [authorized]);

    async function login(e) {
        e.preventDefault();
        setMessage('');
        if (!supabase) return setMessage(t.admin.supabase);
        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            setMessage(error.message);
            return
        }
        const ok = await verifyAdmin(data.session);
        if (!ok) {
            await supabase.auth.signOut();
        }
    }

    async function loadAll() {
        if (!supabase) return;
        const [p, o, c] = await Promise.all([supabase.from('products').select('*').order('created_at', {ascending: false}), supabase.from('orders').select('*').order('created_at', {ascending: false}), supabase.from('custom_orders').select('*').order('created_at', {ascending: false})]);
        if (p.error) setMessage(p.error.message);
        if (o.error) setMessage(o.error.message);
        if (c.error) setMessage(c.error.message);
        setProducts(p.data || []);
        setOrders(o.data || []);
        setCustomOrders(c.data || [])
    }

    async function logout() {
        await supabase.auth.signOut();
        setSession(null);
        setAuthorized(false)
    }

    async function saveProduct(e) {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        const payload = {
            name: editing.name,
            category: editing.category,
            description: editing.description,
            price: Number(editing.price),
            old_price: editing.old_price ? Number(editing.old_price) : null,
            size: editing.size,
            cells: Number(editing.cells) || 1,
            image_url: editing.image_url,
            model_url: editing.model_url,
            featured: Boolean(editing.featured)
        };
        const query = editing.id ? supabase.from('products').update(payload).eq('id', editing.id) : supabase.from('products').insert(payload);
        const {error} = await query;
        if (error) setMessage(error.message); else {
            setEditing(null);
            await loadAll()
        }
        setSaving(false)
    }

    async function removeProduct(id) {
        if (!window.confirm('Delete this product?')) return;
        const {error} = await supabase.from('products').delete().eq('id', id);
        if (error) setMessage(error.message); else loadAll()
    }

    async function uploadAsset(file, type) {
        if (!file || !supabase) return;
        const isModel = type === 'model_url';
        if (isModel && !file.name.toLowerCase().endsWith('.glb')) return setMessage('3D model must be a .glb file.');
        if (!isModel && !file.type.startsWith('image/')) return setMessage('Please upload an image.');
        const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
        const path = `${crypto.randomUUID()}.${ext}`;
        const {error} = await supabase.storage.from('catalog').upload(path, file, {
            upsert: false,
            contentType: file.type || undefined
        });
        if (error) {
            setMessage(error.message);
            return;
        }
        const {data} = supabase.storage.from('catalog').getPublicUrl(path);
        setEditing(v => ({...v, [type]: data.publicUrl}));
    }

    async function updateOrder(id, status) {
        const {error} = await supabase.from('orders').update({status}).eq('id', id);
        if (error) setMessage(error.message); else {
            await notifyStatus(id, 'order');
            await loadAll()
        }
    }

    async function updateCustom(id, status) {
        const {error} = await supabase.from('custom_orders').update({status}).eq('id', id);
        if (error) setMessage(error.message); else {
            await notifyStatus(id, 'custom');
            await loadAll()
        }
    }


    async function changeRole(userId, role) {
        const { error } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', userId);

        if (error) {
            console.error('ROLE UPDATE ERROR:', error);
            return;
        }

        await loadUsers();
    }

    const revenue = useMemo(() => orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total || 0), 0), [orders]);
    if (loading) return <div className="page center">
        <div className="loader">Loading…</div>
    </div>;
    if (!supabase || !session || !authorized) return <div className="page auth">
        <div className="auth-card">
            <div className="auth-top"><Link
                to="/"
                className="back"
            >← {t.admin.back}</Link><LanguageSwitcher /></div>
            <span className="eyebrow">CacaoForm Admin</span>
            <h1>{t.admin.title}</h1>
            <p className="muted">{t.admin.subtitle}</p>
            <form onSubmit={login}><input
                type="email"
                required
                placeholder={t.admin.email}
                value={email}
                onChange={e => setEmail(e.target.value)}
            /><input
                type="password"
                required
                placeholder={t.admin.password}
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
                <button className="button primary full">{t.admin.login}</button>
            </form>
            {message && <div className="notice">{message}</div>}</div>
    </div>;
    const title =
        tab === 'dashboard'
            ? t.admin.dashboard
            : tab === 'products'
                ? t.admin.products
                : tab === 'orders'
                    ? t.admin.orders
                    : tab === 'custom'
                        ? t.admin.custom
                        : 'Користувачі';    return <main className="admin-page">
        <div className="container admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-brand-row"><Link
                    to="/"
                    className="logo"
                ><span className="logo-mark">C</span>Cacao<span>Form</span></Link><LanguageSwitcher />
                </div>
                <div className="admin-menu">
                    <button
                        className={tab === 'dashboard' ? 'active' : ''}
                        onClick={() => setTab('dashboard')}
                    ><ClipboardList size={17} /> {t.admin.dashboard}</button>
                    <button
                        className={tab === 'products' ? 'active' : ''}
                        onClick={() => setTab('products')}
                    ><Box size={17} /> {t.admin.products}</button>
                    <button
                        className={tab === 'orders' ? 'active' : ''}
                        onClick={() => setTab('orders')}
                    ><Package size={17} /> {t.admin.orders}</button>
                    <button
                        className={tab === 'custom' ? 'active' : ''}
                        onClick={() => setTab('custom')}
                    ><ImagePlus size={17} /> {t.admin.custom}</button>
                    <button
                        className={tab === 'users' ? 'active' : ''}
                        onClick={() => setTab('users')}
                    >
                        <UsersIcon size={17} />
                        Користувачі
                    </button>
                </div>
                <button
                    className="admin-logout"
                    onClick={logout}
                ><LogOut size={17} /> {t.admin.logout}</button>
            </aside>
            <section className="admin-content">
                <div className="admin-top">
                    <div><span className="eyebrow">CacaoForm Admin</span>
                        <h1>{title}</h1>
                    </div>
                    <button
                        className="button secondary"
                        onClick={loadAll}
                    ><RefreshCw size={16} /> {t.admin.refresh}</button>
                </div>
                {message && <div className="notice">{message}</div>}
                {tab === 'dashboard' && <>
                    <div className="admin-cards">
                        <div>
                            <span>{t.admin.ordersCount}</span><b>{orders.length}</b>
                        </div>
                        <div>
                            <span>{t.admin.newCount}</span><b>{orders.filter(o => o.status === 'new').length}</b>
                        </div>
                        <div>
                            <span>{t.admin.customCount}</span><b>{customOrders.length}</b>
                        </div>
                        <div>
                            <span>{t.admin.revenue}</span><b>€{revenue.toFixed(2)}</b>
                        </div>
                    </div>
                    <div className="admin-panel">
                        <h2>{t.admin.recent}</h2>
                        {orders.slice(0, 5).map(o => <OrderRow
                            key={o.id}
                            order={o}
                            onStatus={updateOrder}
                        />)}{!orders.length &&
                        <p className="muted">{t.admin.noOrders}</p>}</div>
                </>}
                {tab === 'products' && <Products
                    products={products}
                    editing={editing}
                    setEditing={setEditing}
                    saveProduct={saveProduct}
                    removeProduct={removeProduct}
                    uploadAsset={uploadAsset}
                    saving={saving}
                    t={t}
                />}
                {tab === 'orders' && <div className="admin-panel">
                    <h2>{t.admin.orders}</h2>
                    {orders.map(o => <OrderRow
                        key={o.id}
                        order={o}
                        onStatus={updateOrder}
                        detailed
                    />)}{!orders.length &&
                    <p className="muted">{t.admin.noOrders}</p>}</div>}
                {tab === 'custom' && <div className="admin-panel">
                    <h2>{t.admin.customOrders}</h2>
                    {customOrders.map(o => <div
                        className="custom-order"
                        key={o.id}
                    >
                        <div>
                            <b>{o.customer_name}</b><small>{o.email} · {o.phone}</small>
                            <p>{o.description}</p>
                            {o.file_url && <a
                                href={o.file_url}
                                target="_blank"
                                rel="noreferrer"
                            >Open file</a>}</div>
                        <select
                            value={o.status}
                            onChange={e => updateCustom(o.id, e.target.value)}
                        >{statuses.map(s => <option
                            key={s}
                            value={s}
                        >{statusLabels[s]}</option>)}</select>
                    </div>)}{!customOrders.length &&
                    <p className="muted">{t.admin.noCustom}</p>}</div>}
                {tab === 'users' && <Users />}
            </section>
        </div>
    </main>;
}

function Products({
                      products,
                      editing,
                      setEditing,
                      saveProduct,
                      removeProduct,
                      uploadAsset,
                      saving,
                      t
                  }) {
    return <div className="products-admin">
        <div className="admin-panel">
            <div className="panel-head">
                <h2>{t.admin.catalog}</h2>
                <button
                    className="button primary"
                    onClick={() => setEditing({...emptyProduct})}
                ><Plus size={16} /> {t.admin.newProduct}</button>
            </div>
            {products.map(p => <div
                className="product-admin-row"
                key={p.id}
            >
                <div className="admin-thumb">{p.image_url ? <img
                    src={p.image_url}
                    alt=""
                /> : <Box size={22} />}</div>
                <div><b>{p.name}</b><small>{p.category} · €{p.price}</small>
                </div>
                <button
                    className="icon-button"
                    onClick={() => setEditing({...p})}
                ><Pencil size={16} /></button>
                <button
                    className="icon-button danger"
                    onClick={() => removeProduct(p.id)}
                ><Trash2 size={16} /></button>
            </div>)}{!products.length &&
            <p className="muted">{t.admin.noProducts}</p>}</div>
        {editing && <form
            className="admin-panel product-form"
            onSubmit={saveProduct}
        >
            <div className="panel-head">
                <h2>{editing.id ? t.admin.editProduct : t.admin.newProduct}</h2>
                <button
                    type="button"
                    className="icon-button"
                    onClick={() => setEditing(null)}
                >×
                </button>
            </div>
            <div className="form-grid"><label>{t.admin.name}<input
                required
                value={editing.name}
                onChange={e => setEditing({
                    ...editing,
                    name: e.target.value
                })}
            /></label><label>{t.admin.category}<input
                required
                value={editing.category}
                onChange={e => setEditing({
                    ...editing,
                    category: e.target.value
                })}
            /></label><label>{t.admin.price}<input
                required
                type="number"
                step="0.01"
                value={editing.price}
                onChange={e => setEditing({
                    ...editing,
                    price: e.target.value
                })}
            /></label><label>{t.admin.oldPrice}<input
                type="number"
                step="0.01"
                value={editing.old_price || ''}
                onChange={e => setEditing({
                    ...editing,
                    old_price: e.target.value
                })}
            /></label><label>{t.admin.size}<input
                value={editing.size || ''}
                onChange={e => setEditing({
                    ...editing,
                    size: e.target.value
                })}
            /></label><label>{t.admin.cells}<input
                type="number"
                min="1"
                value={editing.cells || 1}
                onChange={e => setEditing({
                    ...editing,
                    cells: e.target.value
                })}
            /></label></div>
            <label>{t.admin.description}<textarea
                value={editing.description || ''}
                onChange={e => setEditing({
                    ...editing,
                    description: e.target.value
                })}
            /></label>
            <div className="upload-grid">
                <div className="upload-box">
                    <ImagePlus /><b>{t.admin.photo}</b><small>{t.admin.uploadPhoto}</small><input
                    type="file"
                    accept="image/*"
                    onChange={e => uploadAsset(e.target.files?.[0], 'image_url')}
                />{editing.image_url && <img
                    src={editing.image_url}
                    alt="preview"
                />}</div>
                <div className="upload-box">
                    <Upload /><b>{t.admin.model}</b><small>{t.admin.uploadModel}</small><input
                    type="file"
                    accept=".glb,model/gltf-binary"
                    onChange={e => uploadAsset(e.target.files?.[0], 'model_url')}
                />{editing.model_url &&
                    <small className="url-ok">✓ GLB connected</small>}</div>
            </div>
            <label className="check"><input
                type="checkbox"
                checked={Boolean(editing.featured)}
                onChange={e => setEditing({
                    ...editing,
                    featured: e.target.checked
                })}
            />{t.admin.featured}</label>
            <button
                className="button primary full"
                disabled={saving}
            >{saving ? t.admin.save + '…' : t.admin.save}</button>
        </form>}
    </div>;
}

function OrderRow({order, onStatus, detailed}) {
    return <div className="order-row">
        <div>
            <b>#{order.id.slice(0, 8)}</b><span>{order.customer_name}</span><small>{order.email} · {order.phone}</small>{detailed && order.comment &&
            <small>Comment: {order.comment}</small>}{detailed &&
            <small>{(order.items || []).map(i => `${i.name} × ${i.quantity || 1}`).join(' · ')}</small>}
        </div>
        <strong>€{Number(order.total).toFixed(2)}</strong><select
        value={order.status}
        onChange={e => onStatus(order.id, e.target.value)}
    >{statuses.map(s => <option
        key={s}
        value={s}
    >{statusLabels[s]}</option>)}</select></div>
}
