// import {useEffect, useMemo, useState} from 'react';
// import {Link} from 'react-router-dom';
// import {
//     ImagePlus,
//     Box,
//     Package,
//     ClipboardList,
//     LogOut,
//     Plus,
//     Pencil,
//     Trash2,
//     Upload,
//     RefreshCw,
//     Users as UsersIcon
// } from 'lucide-react';
// import {supabase} from '../lib/supabase';
// import {useLanguage} from '../context/LanguageContext';
// import LanguageSwitcher from '../components/LanguageSwitcher';
// import Users from '../components/Users';
//
//
//
// async function notifyStatus(orderId, type = 'order') {
//     if (!supabase) return;
//     const {error} = await supabase.functions.invoke('notify-order-status', {
//         body: {order_id: orderId, type},
//     });
//     if (error) console.error('Telegram status notification failed:', error);
// }
//
// const emptyProduct = {
//     id: null,
//     name: '',
//     category: 'Фігурки',
//     description: '',
//     price: '',
//     old_price: '',
//     size: '',
//     cells: 1,
//     image_url: '',
//     model_url: '',
//     featured: false
// };
// const statuses = ['new', 'confirmed', 'in_progress', 'ready', 'shipped', 'completed', 'cancelled'];
// const statusLabels = {
//     new: 'Нове',
//     confirmed: 'Підтверджено',
//     in_progress: 'В роботі',
//     ready: 'Готово',
//     shipped: 'Відправлено',
//     completed: 'Завершено',
//     cancelled: 'Скасовано'
// };
//
// export default function Admin() {
//     const {t} = useLanguage();
//     const [session, setSession] = useState(null);
//     const [authorized, setAuthorized] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [tab, setTab] = useState('dashboard');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [products, setProducts] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [customOrders, setCustomOrders] = useState([]);
//     const [editing, setEditing] = useState(null);
//     const [saving, setSaving] = useState(false);
//
//     async function verifyAdmin(currentSession) {
//         if (!currentSession || !supabase) {
//             setAuthorized(false);
//             return false;
//         }
//         const {data, error} = await supabase.rpc('is_admin');
//         const ok = !error && data === true;
//         setAuthorized(ok);
//         if (!ok) setMessage(t.admin.adminOnly);
//         return ok;
//     }
//
//     useEffect(() => {
//         if (!supabase) {
//             setLoading(false);
//             setMessage(t.admin.supabase);
//             return;
//         }
//         let active = true;
//         supabase.auth.getSession().then(async ({data}) => {
//             if (!active) return;
//             setSession(data.session);
//             await verifyAdmin(data.session);
//             setLoading(false)
//         });
//         const {data} = supabase.auth.onAuthStateChange((_e, s) => {
//             setSession(s);
//             if (s) verifyAdmin(s); else setAuthorized(false)
//         });
//         return () => {
//             active = false;
//             data.subscription.unsubscribe()
//         };
//     }, []);
//     useEffect(() => {
//         if (authorized) loadAll()
//     }, [authorized]);
//
//     async function login(e) {
//         e.preventDefault();
//         setMessage('');
//         if (!supabase) return setMessage(t.admin.supabase);
//         const {data, error} = await supabase.auth.signInWithPassword({
//             email,
//             password
//         });
//         if (error) {
//             setMessage(error.message);
//             return
//         }
//         const ok = await verifyAdmin(data.session);
//         if (!ok) {
//             await supabase.auth.signOut();
//         }
//     }
//
//     async function loadAll() {
//         if (!supabase) return;
//         const [p, o, c] = await Promise.all([supabase.from('products').select('*').order('created_at', {ascending: false}), supabase.from('orders').select('*').order('created_at', {ascending: false}), supabase.from('custom_orders').select('*').order('created_at', {ascending: false})]);
//         if (p.error) setMessage(p.error.message);
//         if (o.error) setMessage(o.error.message);
//         if (c.error) setMessage(c.error.message);
//         setProducts(p.data || []);
//         setOrders(o.data || []);
//         setCustomOrders(c.data || [])
//     }
//
//     async function logout() {
//         await supabase.auth.signOut();
//         setSession(null);
//         setAuthorized(false)
//     }
//
//     async function saveProduct(e) {
//         e.preventDefault();
//         setSaving(true);
//         setMessage('');
//         const payload = {
//             name: editing.name,
//             category: editing.category,
//             description: editing.description,
//             price: Number(editing.price),
//             old_price: editing.old_price ? Number(editing.old_price) : null,
//             size: editing.size,
//             cells: Number(editing.cells) || 1,
//             image_url: editing.image_url,
//             model_url: editing.model_url,
//             featured: Boolean(editing.featured)
//         };
//         const query = editing.id ? supabase.from('products').update(payload).eq('id', editing.id) : supabase.from('products').insert(payload);
//         const {error} = await query;
//         if (error) setMessage(error.message); else {
//             setEditing(null);
//             await loadAll()
//         }
//         setSaving(false)
//     }
//
//     async function removeProduct(id) {
//         if (!window.confirm('Delete this product?')) return;
//         const {error} = await supabase.from('products').delete().eq('id', id);
//         if (error) setMessage(error.message); else loadAll()
//     }
//
//     async function uploadAsset(file, type) {
//         if (!file || !supabase) return;
//         const isModel = type === 'model_url';
//         if (isModel && !file.name.toLowerCase().endsWith('.glb')) return setMessage('3D model must be a .glb file.');
//         if (!isModel && !file.type.startsWith('image/')) return setMessage('Please upload an image.');
//         const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
//         const path = `${crypto.randomUUID()}.${ext}`;
//         const {error} = await supabase.storage.from('catalog').upload(path, file, {
//             upsert: false,
//             contentType: file.type || undefined
//         });
//         if (error) {
//             setMessage(error.message);
//             return;
//         }
//         const {data} = supabase.storage.from('catalog').getPublicUrl(path);
//         setEditing(v => ({...v, [type]: data.publicUrl}));
//     }
//
//     async function updateOrder(id, status) {
//         const {error} = await supabase.from('orders').update({status}).eq('id', id);
//         if (error) setMessage(error.message); else {
//             await notifyStatus(id, 'order');
//             await loadAll()
//         }
//     }
//
//     async function updateCustom(id, status) {
//         const {error} = await supabase.from('custom_orders').update({status}).eq('id', id);
//         if (error) setMessage(error.message); else {
//             await notifyStatus(id, 'custom');
//             await loadAll()
//         }
//     }
//
//
//     async function changeRole(userId, role) {
//         const { error } = await supabase
//             .from('profiles')
//             .update({ role })
//             .eq('id', userId);
//
//         if (error) {
//             console.error('ROLE UPDATE ERROR:', error);
//             return;
//         }
//
//         await loadUsers();
//     }
//
//     const revenue = useMemo(() => orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total || 0), 0), [orders]);
//     if (loading) return <div className="page center">
//         <div className="loader">Loading…</div>
//     </div>;
//     if (!supabase || !session || !authorized) return <div className="page auth">
//         <div className="auth-card">
//             <div className="auth-top"><Link
//                 to="/"
//                 className="back"
//             >← {t.admin.back}</Link><LanguageSwitcher /></div>
//             <span className="eyebrow">CacaoForm Admin</span>
//             <h1>{t.admin.title}</h1>
//             <p className="muted">{t.admin.subtitle}</p>
//             <form onSubmit={login}><input
//                 type="email"
//                 required
//                 placeholder={t.admin.email}
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//             /><input
//                 type="password"
//                 required
//                 placeholder={t.admin.password}
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//             />
//                 <button className="button primary full">{t.admin.login}</button>
//             </form>
//             {message && <div className="notice">{message}</div>}</div>
//     </div>;
//     const title =
//         tab === 'dashboard'
//             ? t.admin.dashboard
//             : tab === 'products'
//                 ? t.admin.products
//                 : tab === 'orders'
//                     ? t.admin.orders
//                     : tab === 'custom'
//                         ? t.admin.custom
//                         : 'Користувачі';    return <main className="admin-page">
//         <div className="container admin-shell">
//             <aside className="admin-sidebar">
//                 <div className="admin-brand-row"><Link
//                     to="/"
//                     className="logo"
//                 ><span className="logo-mark">C</span>Cacao<span>Form</span></Link><LanguageSwitcher />
//                 </div>
//                 <div className="admin-menu">
//                     <button
//                         className={tab === 'dashboard' ? 'active' : ''}
//                         onClick={() => setTab('dashboard')}
//                     ><ClipboardList size={17} /> {t.admin.dashboard}</button>
//                     <button
//                         className={tab === 'products' ? 'active' : ''}
//                         onClick={() => setTab('products')}
//                     ><Box size={17} /> {t.admin.products}</button>
//                     <button
//                         className={tab === 'orders' ? 'active' : ''}
//                         onClick={() => setTab('orders')}
//                     ><Package size={17} /> {t.admin.orders}</button>
//                     <button
//                         className={tab === 'custom' ? 'active' : ''}
//                         onClick={() => setTab('custom')}
//                     ><ImagePlus size={17} /> {t.admin.custom}</button>
//                     <button
//                         className={tab === 'users' ? 'active' : ''}
//                         onClick={() => setTab('users')}
//                     >
//                         <UsersIcon size={17} />
//                         Користувачі
//                     </button>
//                 </div>
//                 <button
//                     className="admin-logout"
//                     onClick={logout}
//                 ><LogOut size={17} /> {t.admin.logout}</button>
//             </aside>
//             <section className="admin-content">
//                 <div className="admin-top">
//                     <div><span className="eyebrow">CacaoForm Admin</span>
//                         <h1>{title}</h1>
//                     </div>
//                     <button
//                         className="button secondary"
//                         onClick={loadAll}
//                     ><RefreshCw size={16} /> {t.admin.refresh}</button>
//                 </div>
//                 {message && <div className="notice">{message}</div>}
//                 {tab === 'dashboard' && <>
//                     <div className="admin-cards">
//                         <div>
//                             <span>{t.admin.ordersCount}</span><b>{orders.length}</b>
//                         </div>
//                         <div>
//                             <span>{t.admin.newCount}</span><b>{orders.filter(o => o.status === 'new').length}</b>
//                         </div>
//                         <div>
//                             <span>{t.admin.customCount}</span><b>{customOrders.length}</b>
//                         </div>
//                         <div>
//                             <span>{t.admin.revenue}</span><b>€{revenue.toFixed(2)}</b>
//                         </div>
//                     </div>
//                     <div className="admin-panel">
//                         <h2>{t.admin.recent}</h2>
//                         {orders.slice(0, 5).map(o => <OrderRow
//                             key={o.id}
//                             order={o}
//                             onStatus={updateOrder}
//                         />)}{!orders.length &&
//                         <p className="muted">{t.admin.noOrders}</p>}</div>
//                 </>}
//                 {tab === 'products' && <Products
//                     products={products}
//                     editing={editing}
//                     setEditing={setEditing}
//                     saveProduct={saveProduct}
//                     removeProduct={removeProduct}
//                     uploadAsset={uploadAsset}
//                     saving={saving}
//                     t={t}
//                 />}
//                 {tab === 'orders' && <div className="admin-panel">
//                     <h2>{t.admin.orders}</h2>
//                     {orders.map(o => <OrderRow
//                         key={o.id}
//                         order={o}
//                         onStatus={updateOrder}
//                         detailed
//                     />)}{!orders.length &&
//                     <p className="muted">{t.admin.noOrders}</p>}</div>}
//                 {tab === 'custom' && <div className="admin-panel">
//                     <h2>{t.admin.customOrders}</h2>
//                     {customOrders.map(o => <div
//                         className="custom-order"
//                         key={o.id}
//                     >
//                         <div>
//                             <b>{o.customer_name}</b><small>{o.email} · {o.phone}</small>
//                             <p>{o.description}</p>
//                             {o.file_url && <a
//                                 href={o.file_url}
//                                 target="_blank"
//                                 rel="noreferrer"
//                             >Open file</a>}</div>
//                         <select
//                             value={o.status}
//                             onChange={e => updateCustom(o.id, e.target.value)}
//                         >{statuses.map(s => <option
//                             key={s}
//                             value={s}
//                         >{statusLabels[s]}</option>)}</select>
//                     </div>)}{!customOrders.length &&
//                     <p className="muted">{t.admin.noCustom}</p>}</div>}
//                 {tab === 'users' && <Users />}
//
//             </section>
//         </div>
//     </main>;
// }
//
// function Products({
//                       products,
//                       editing,
//                       setEditing,
//                       saveProduct,
//                       removeProduct,
//                       uploadAsset,
//                       saving,
//                       t
//                   }) {
//     return <div className="products-admin">
//         <div className="admin-panel">
//             <div className="panel-head">
//                 <h2>{t.admin.catalog}</h2>
//                 <button
//                     className="button primary"
//                     onClick={() => setEditing({...emptyProduct})}
//                 ><Plus size={16} /> {t.admin.newProduct}</button>
//             </div>
//             {products.map(p => <div
//                 className="product-admin-row"
//                 key={p.id}
//             >
//                 <div className="admin-thumb">{p.image_url ? <img
//                     src={p.image_url}
//                     alt=""
//                 /> : <Box size={22} />}</div>
//                 <div><b>{p.name}</b><small>{p.category} · €{p.price}</small>
//                 </div>
//                 <button
//                     className="icon-button"
//                     onClick={() => setEditing({...p})}
//                 ><Pencil size={16} /></button>
//                 <button
//                     className="icon-button danger"
//                     onClick={() => removeProduct(p.id)}
//                 ><Trash2 size={16} /></button>
//             </div>)}{!products.length &&
//             <p className="muted">{t.admin.noProducts}</p>}</div>
//         {editing && <form
//             className="admin-panel product-form"
//             onSubmit={saveProduct}
//         >
//             <div className="panel-head">
//                 <h2>{editing.id ? t.admin.editProduct : t.admin.newProduct}</h2>
//                 <button
//                     type="button"
//                     className="icon-button"
//                     onClick={() => setEditing(null)}
//                 >×
//                 </button>
//             </div>
//             <div className="form-grid"><label>{t.admin.name}<input
//                 required
//                 value={editing.name}
//                 onChange={e => setEditing({
//                     ...editing,
//                     name: e.target.value
//                 })}
//             /></label><label>{t.admin.category}<input
//                 required
//                 value={editing.category}
//                 onChange={e => setEditing({
//                     ...editing,
//                     category: e.target.value
//                 })}
//             /></label><label>{t.admin.price}<input
//                 required
//                 type="number"
//                 step="0.01"
//                 value={editing.price}
//                 onChange={e => setEditing({
//                     ...editing,
//                     price: e.target.value
//                 })}
//             /></label><label>{t.admin.oldPrice}<input
//                 type="number"
//                 step="0.01"
//                 value={editing.old_price || ''}
//                 onChange={e => setEditing({
//                     ...editing,
//                     old_price: e.target.value
//                 })}
//             /></label><label>{t.admin.size}<input
//                 value={editing.size || ''}
//                 onChange={e => setEditing({
//                     ...editing,
//                     size: e.target.value
//                 })}
//             /></label><label>{t.admin.cells}<input
//                 type="number"
//                 min="1"
//                 value={editing.cells || 1}
//                 onChange={e => setEditing({
//                     ...editing,
//                     cells: e.target.value
//                 })}
//             /></label></div>
//             <label>{t.admin.description}<textarea
//                 value={editing.description || ''}
//                 onChange={e => setEditing({
//                     ...editing,
//                     description: e.target.value
//                 })}
//             /></label>
//             <div className="upload-grid">
//                 <div className="upload-box">
//                     <ImagePlus /><b>{t.admin.photo}</b><small>{t.admin.uploadPhoto}</small><input
//                     type="file"
//                     accept="image/*"
//                     onChange={e => uploadAsset(e.target.files?.[0], 'image_url')}
//                 />{editing.image_url && <img
//                     src={editing.image_url}
//                     alt="preview"
//                 />}</div>
//                 <div className="upload-box">
//                     <Upload /><b>{t.admin.model}</b><small>{t.admin.uploadModel}</small><input
//                     type="file"
//                     accept=".glb,model/gltf-binary"
//                     onChange={e => uploadAsset(e.target.files?.[0], 'model_url')}
//                 />{editing.model_url &&
//                     <small className="url-ok">✓ GLB connected</small>}</div>
//             </div>
//             <label className="check"><input
//                 type="checkbox"
//                 checked={Boolean(editing.featured)}
//                 onChange={e => setEditing({
//                     ...editing,
//                     featured: e.target.checked
//                 })}
//             />{t.admin.featured}</label>
//             <button
//                 className="button primary full"
//                 disabled={saving}
//             >{saving ? t.admin.save + '…' : t.admin.save}</button>
//         </form>}
//     </div>;
// }
//
// function OrderRow({order, onStatus, detailed}) {
//     return <div className="order-row">
//         <div>
//             <b>#{order.id.slice(0, 8)}</b><span>{order.customer_name}</span><small>{order.email} · {order.phone}</small>{detailed && order.comment &&
//             <small>Comment: {order.comment}</small>}{detailed &&
//             <small>{(order.items || []).map(i => `${i.name} × ${i.quantity || 1}`).join(' · ')}</small>}
//         </div>
//         <strong>€{Number(order.total).toFixed(2)}</strong><select
//         value={order.status}
//         onChange={e => onStatus(order.id, e.target.value)}
//     >{statuses.map(s => <option
//         key={s}
//         value={s}
//     >{statusLabels[s]}</option>)}</select></div>
// }

//
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
//
// import { supabase } from '../lib/supabase';
// import { useAuth } from '../context/AuthContext';
// import {
//     ImagePlus,
//     Upload
// } from 'lucide-react';
// import {useLanguage} from "../context/LanguageContext.jsx";
//
//
// const DEFAULT_SIZES = [
//     { size: 'S', stock: 0 },
//     { size: 'M', stock: 0 },
//     { size: 'L', stock: 0 }
// ];
//
// const emptyProduct = {
//     id: null,
//     category: 'Фігурки',
//     featured: false,
//     name: '',
//     description: '',
//     price: '',
//     old_price: '',
//     image_url: '',
//     model_url: '',
//     cells: 1,
//     // weight: '',
//     sizes: DEFAULT_SIZES.map(item => ({ ...item }))
// };
//
// export default function Admin({
//                                   products = [],
//                                   setProducts
//                               }) {
//     const {
//         user,
//         profile,
//         role,
//         logout
//     } = useAuth();
//
//     const [form, setForm] = useState(emptyProduct);
//
//     const [editingId, setEditingId] =
//         useState(null);
//
//     const [loading, setLoading] =
//         useState(false);
//
//     const [message, setMessage] =
//         useState('');
//
//     const [orders, setOrders] =
//         useState([]);
//
//     const [ordersLoading, setOrdersLoading] =
//         useState(false);
//     const {t} = useLanguage();
//     /*
//      * ORDERS
//      */
//
//     useEffect(() => {
//         loadOrders();
//     }, []);
//
//     async function loadOrders() {
//         if (!supabase) return;
//
//         setOrdersLoading(true);
//
//         const {
//             data,
//             error
//         } = await supabase
//             .from('orders')
//             .select('*')
//             .order('created_at', {
//                 ascending: false
//             })
//             .limit(50);
//
//         if (error) {
//             console.error(
//                 'LOAD ORDERS ERROR:',
//                 error
//             );
//
//             setOrders([]);
//         } else {
//             setOrders(data || []);
//         }
//
//         setOrdersLoading(false);
//     }
//
//     /*
//      * FORM
//      */
//
//     function change(field, value) {
//         setForm(current => ({
//             ...current,
//             [field]: value
//         }));
//     }
//
//     function changeSizeStock(size, value) {
//         const stock =
//             Math.max(
//                 0,
//                 Number(value) || 0
//             );
//
//         setForm(current => ({
//             ...current,
//
//             sizes: current.sizes.map(item =>
//                 item.size === size
//                     ? {
//                         ...item,
//                         stock
//                     }
//                     : item
//             )
//         }));
//     }
//
//     /*
//      * LOAD PRODUCT SIZES
//      */
//
//     async function loadProductSizes(productId) {
//         if (!supabase) {
//             return DEFAULT_SIZES.map(
//                 item => ({ ...item })
//             );
//         }
//
//         const {
//             data,
//             error
//         } = await supabase
//             .from('product_sizes')
//             .select('size, stock')
//             .eq('product_id', productId)
//             .order('size');
//
//         if (error) {
//             console.error(
//                 'LOAD PRODUCT SIZES ERROR:',
//                 error
//             );
//
//             return DEFAULT_SIZES.map(
//                 item => ({ ...item })
//             );
//         }
//
//         return DEFAULT_SIZES.map(
//             defaultSize => {
//                 const saved =
//                     (data || []).find(
//                         item =>
//                             item.size ===
//                             defaultSize.size
//                     );
//
//                 return {
//                     size: defaultSize.size,
//                     stock:
//                         saved?.stock ?? 0
//                 };
//             }
//         );
//     }
//
//         async function uploadAsset(file, type) {
//         if (!file || !supabase) return;
//         const isModel = type === 'model_url';
//         if (isModel && !file.name.toLowerCase().endsWith('.glb')) return setMessage('3D model must be a .glb file.');
//         if (!isModel && !file.type.startsWith('image/')) return setMessage('Please upload an image.');
//         const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
//         const path = `${crypto.randomUUID()}.${ext}`;
//         const {error} = await supabase.storage.from('catalog').upload(path, file, {
//             upsert: false,
//             contentType: file.type || undefined
//         });
//         if (error) {
//             setMessage(error.message);
//             return;
//         }
//         const {data} = supabase.storage.from('catalog').getPublicUrl(path);
//             setEditingId(v => ({...v, [type]: data.publicUrl}));
//     }
//
//
//
//     // async function uploadAsset(file, field) {
//     //     if (!file) return;
//     //
//     //     if (!supabase) {
//     //         setMessage('Supabase не підключений.');
//     //         return;
//     //     }
//     //
//     //     try {
//     //         setLoading(true);
//     //         setMessage('');
//     //
//     //         const extension =
//     //             file.name.split('.').pop()?.toLowerCase();
//     //
//     //         const fileName =
//     //             `${crypto.randomUUID()}.${extension}`;
//     //
//     //         const folder =
//     //             field === 'image_url'
//     //                 ? 'images'
//     //                 : 'models';
//     //
//     //         const filePath =
//     //             `${folder}/${fileName}`;
//     //
//     //         const {
//     //             error: uploadError
//     //         } = await supabase.storage
//     //             .from('products')
//     //             .upload(
//     //                 filePath,
//     //                 file,
//     //                 {
//     //                     cacheControl: '3600',
//     //                     upsert: false
//     //                 }
//     //             );
//     //
//     //         if (uploadError) {
//     //             throw uploadError;
//     //         }
//     //
//     //         const {
//     //             data
//     //         } = supabase.storage
//     //             .from('products')
//     //             .getPublicUrl(filePath);
//     //
//     //         const publicUrl =
//     //             data?.publicUrl;
//     //
//     //         if (!publicUrl) {
//     //             throw new Error(
//     //                 'Не вдалося отримати URL файлу.'
//     //             );
//     //         }
//     //
//     //         setForm(current => ({
//     //             ...current,
//     //             [field]: publicUrl
//     //         }));
//     //
//     //         setMessage(
//     //             field === 'image_url'
//     //                 ? 'Фото завантажено.'
//     //                 : '3D модель завантажена.'
//     //         );
//     //
//     //     } catch (error) {
//     //         console.error(
//     //             'UPLOAD ASSET ERROR:',
//     //             error
//     //         );
//     //
//     //         setMessage(
//     //             error?.message ||
//     //             'Не вдалося завантажити файл.'
//     //         );
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }
//     /*
//      * EDIT
//      */
//
//     async function startEdit(product) {
//         setLoading(true);
//         setMessage('');
//
//         try {
//             const sizes =
//                 await loadProductSizes(
//                     product.id
//                 );
//
//             setEditingId(product.id);
//
//             setForm({
//                 name: product.name || '',
//                 category:
//                     product.category || '',
//                 description:
//                     product.description || '',
//                 price:
//                     product.price ?? '',
//                 old_price:
//                     product.old_price ?? '',
//                 image_url:
//                     product.image_url || '',
//                 model_url:
//                     product.model_url || '',
//                 cells:
//                     product.cells || '',
//                 // weight:
//                 //     product.weight || '',
//                 sizes
//             });
//
//             window.scrollTo({
//                 top: 0,
//                 behavior: 'smooth'
//             });
//
//         } catch (error) {
//             console.error(
//                 'START EDIT ERROR:',
//                 error
//             );
//
//             setMessage(
//                 'Не вдалося завантажити товар.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     /*
//      * RESET
//      */
//
//     function resetForm() {
//         setEditingId(null);
//
//         setForm({
//             ...emptyProduct,
//             sizes:
//                 DEFAULT_SIZES.map(
//                     item => ({ ...item })
//                 )
//         });
//
//         setMessage('');
//     }
//
//     /*
//      * SAVE PRODUCT SIZES
//      */
//
//     async function saveProductSizes(
//         productId
//     ) {
//         if (!supabase) {
//             throw new Error(
//                 'Supabase не підключений.'
//             );
//         }
//
//         /*
//          * Видаляємо старі розміри.
//          * Потім записуємо актуальні.
//          */
//
//         const {
//             error: deleteError
//         } = await supabase
//             .from('product_sizes')
//             .delete()
//             .eq(
//                 'product_id',
//                 productId
//             );
//
//         if (deleteError) {
//             throw deleteError;
//         }
//
//         const rows =
//             form.sizes.map(item => ({
//                 product_id: productId,
//                 size: item.size,
//                 stock:
//                     Math.max(
//                         0,
//                         Number(
//                             item.stock
//                         ) || 0
//                     )
//             }));
//
//         const {
//             error: insertError
//         } = await supabase
//             .from('product_sizes')
//             .insert(rows);
//
//         if (insertError) {
//             throw insertError;
//         }
//     }
//
//     /*
//      * SAVE PRODUCT
//      */
//
//     async function saveProduct(e) {
//         e.preventDefault();
//
//         if (!supabase) {
//             setMessage(
//                 'Supabase не підключений.'
//             );
//
//             return;
//         }
//
//         if (!form.name.trim()) {
//             setMessage(
//                 'Введіть назву товару.'
//             );
//
//             return;
//         }
//
//         setLoading(true);
//         setMessage('');
//
//         try {
//             const payload = {
//                 name:
//                     form.name.trim(),
//
//                 category:
//                     form.category.trim(),
//
//                 description:
//                     form.description.trim(),
//
//                 price:
//                     Number(form.price) || 0,
//
//                 old_price:
//                     form.old_price
//                         ? Number(
//                             form.old_price
//                         )
//                         : null,
//
//                 image_url:
//                     form.image_url.trim()
//                         ? form.image_url.trim()
//                         : null,
//
//                 model_url:
//                     form.model_url.trim()
//                         ? form.model_url.trim()
//                         : null,
//
//                 cells:
//                     form.cells.trim()
//                         ? form.cells.trim()
//                         : null,
//
//                 // weight:
//                 //     form.weight.trim()
//                 //         ? form.weight.trim()
//                 //         : null
//             };
//
//             let savedProduct;
//
//             /*
//              * UPDATE
//              */
//
//             if (editingId) {
//                 const {
//                     data,
//                     error
//                 } = await supabase
//                     .from('products')
//                     .update(payload)
//                     .eq(
//                         'id',
//                         editingId
//                     )
//                     .select()
//                     .single();
//
//                 if (error) {
//                     throw error;
//                 }
//
//                 savedProduct = data;
//
//                 await saveProductSizes(
//                     editingId
//                 );
//
//                 if (typeof setProducts === 'function') {
//                     setProducts(current =>
//                         current.map(
//                             product =>
//                                 product.id ===
//                                 editingId
//                                     ? data
//                                     : product
//                         )
//                     );
//                 }
//
//                 setMessage(
//                     'Товар успішно оновлено.'
//                 );
//             }
//
//             /*
//              * CREATE
//              */
//
//             else {
//                 const {
//                     data,
//                     error
//                 } = await supabase
//                     .from('products')
//                     .insert(payload)
//                     .select()
//                     .single();
//
//                 if (error) {
//                     throw error;
//                 }
//
//                 savedProduct = data;
//
//                 await saveProductSizes(
//                     data.id
//                 );
//
//                 if (typeof setProducts === 'function') {
//                     setProducts(current => [
//                         data,
//                         ...current
//                     ]);
//                 }
//
//                 setMessage(
//                     'Товар успішно створено.'
//                 );
//             }
//
//             console.log(
//                 'SAVED PRODUCT:',
//                 savedProduct
//             );
//
//             /*
//              * Не скидаємо повідомлення
//              * одразу після resetForm.
//              */
//
//             setEditingId(null);
//
//             setForm({
//                 ...emptyProduct,
//                 sizes:
//                     DEFAULT_SIZES.map(
//                         item => ({
//                             ...item
//                         })
//                     )
//             });
//
//         } catch (error) {
//             console.error(
//                 'SAVE PRODUCT ERROR:',
//                 error
//             );
//
//             setMessage(
//                 error?.message ||
//                 'Не вдалося зберегти товар.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     /*
//      * DELETE PRODUCT
//      */
//
//     async function deleteProduct(id) {
//         if (!supabase) return;
//
//         const ok =
//             window.confirm(
//                 'Видалити цей товар?'
//             );
//
//         if (!ok) return;
//
//         setLoading(true);
//
//         try {
//             /*
//              * product_sizes видаляться
//              * автоматично завдяки
//              * ON DELETE CASCADE.
//              */
//
//             const {
//                 error
//             } = await supabase
//                 .from('products')
//                 .delete()
//                 .eq('id', id);
//
//             if (error) {
//                 throw error;
//             }
//
//             if (typeof setProducts === 'function') {
//                 setProducts(current =>
//                     current.filter(
//                         product =>
//                             product.id !== id
//                     )
//                 );
//             }
//
//             if (editingId === id) {
//                 resetForm();
//             }
//
//             setMessage(
//                 'Товар видалено.'
//             );
//
//         } catch (error) {
//             console.error(
//                 'DELETE PRODUCT ERROR:',
//                 error
//             );
//
//             setMessage(
//                 error?.message ||
//                 'Не вдалося видалити товар.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     /*
//      * ORDER STATUS
//      */
//
//     async function updateOrderStatus(
//         id,
//         status
//     ) {
//         if (!supabase) return;
//
//         const {
//             error
//         } = await supabase
//             .from('orders')
//             .update({ status })
//             .eq('id', id);
//
//         if (error) {
//             console.error(
//                 'UPDATE ORDER ERROR:',
//                 error
//             );
//
//             setMessage(
//                 error.message
//             );
//
//             return;
//         }
//
//         setOrders(current =>
//             current.map(order =>
//                 order.id === id
//                     ? {
//                         ...order,
//                         status
//                     }
//                     : order
//             )
//         );
//     }
//
//     /*
//      * AUTH INFO
//      */
//
//     const adminEmail =
//         profile?.email ||
//         user?.email ||
//         '';
//
//     return (
//         <main className="admin-page">
//
//             <div className="container admin-shell">
//
//                 {/* SIDEBAR */}
//
//                 <aside className="admin-sidebar">
//
//                     <strong>
//                         MoldLab Admin
//                     </strong>
//
//                     <small className="muted">
//                         {adminEmail}
//                     </small>
//
//                     {role && (
//                         <small className="muted">
//                             Role: {role}
//                         </small>
//                     )}
//
//                     <nav className="admin-menu">
//
//                         <a href="#products">
//                             Products
//                         </a>
//
//                         <a href="#orders">
//                             Orders
//                         </a>
//
//                         <Link to="/admin/users">
//                             Users
//                         </Link>
//
//                     </nav>
//
//                     <button
//                         type="button"
//                         className="admin-logout"
//                         onClick={logout}
//                     >
//                         Вийти
//                     </button>
//
//                 </aside>
//
//                 {/* CONTENT */}
//
//                 <section className="admin-content">
//
//                     {/* HEADER */}
//
//                     <div className="admin-top">
//
//                         <div>
//
//                             <span className="eyebrow">
//                                 Administration
//                             </span>
//
//                             <h1>
//                                 Панель керування
//                             </h1>
//
//                         </div>
//
//                     </div>
//
//                     {/* MESSAGE */}
//
//                     {message && (
//                         <div className="notice">
//                             {message}
//                         </div>
//                     )}
//
//                     {/* PRODUCTS FORM */}
//
//                     <section
//                         id="products"
//                         className="admin-panel"
//                     >
//
//                         <div className="panel-head">
//
//                             <h2>
//                                 {editingId
//                                     ? 'Редагувати товар'
//                                     : 'Створити товар'}
//                             </h2>
//
//                             {editingId && (
//                                 <button
//                                     type="button"
//                                     className="button secondary"
//                                     onClick={
//                                         resetForm
//                                     }
//                                 >
//                                     Скасувати
//                                 </button>
//                             )}
//
//                         </div>
//
//                         <form
//                             className="product-form"
//                             onSubmit={
//                                 saveProduct
//                             }
//                         >
//
//                             {/* BASIC */}
//
//                             <div className="form-grid">
//
//                                 <label>
//                                     Назва
//
//                                     <input
//                                         required
//                                         value={
//                                             form.name
//                                         }
//                                         onChange={e =>
//                                             change(
//                                                 'name',
//                                                 e.target
//                                                     .value
//                                             )
//                                         }
//                                     />
//                                 </label>
//
//                                 <label>
//                                     Категорія
//
//                                     <input
//                                         value={
//                                             form.category
//                                         }
//                                         onChange={e =>
//                                             change(
//                                                 'category',
//                                                 e.target
//                                                     .value
//                                             )
//                                         }
//                                     />
//                                 </label>
//
//                                 <label>
//                                     Ціна
//
//                                     <input
//                                         required
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={
//                                             form.price
//                                         }
//                                         onChange={e =>
//                                             change(
//                                                 'price',
//                                                 e.target
//                                                     .value
//                                             )
//                                         }
//                                     />
//                                 </label>
//
//                                 <label>
//                                     Стара ціна
//
//                                     <input
//                                         type="number"
//                                         min="0"
//                                         step="0.01"
//                                         value={
//                                             form.old_price
//                                         }
//                                         onChange={e =>
//                                             change(
//                                                 'old_price',
//                                                 e.target
//                                                     .value
//                                             )
//                                         }
//                                     />
//                                 </label>
//
//                                 {/*<label>*/}
//                                 {/*    Вага*/}
//
//                                 {/*    <input*/}
//                                 {/*        value={*/}
//                                 {/*            form.weight*/}
//                                 {/*        }*/}
//                                 {/*        onChange={e =>*/}
//                                 {/*            change(*/}
//                                 {/*                'weight',*/}
//                                 {/*                e.target*/}
//                                 {/*                    .value*/}
//                                 {/*            )*/}
//                                 {/*        }*/}
//                                 {/*    />*/}
//                                 {/*</label>*/}
//
//                                 <label>
//                                     cells
//
//                                     <input
//                                         placeholder="New"
//                                         value={
//                                             form.cells
//                                         }
//                                         onChange={e =>
//                                             change(
//                                                 'cells',
//                                                 e.target
//                                                     .value
//                                             )
//                                         }
//                                     />
//                                 </label>
//
//                             </div>
//
//                             {/* SIZES */}
//
//                             <div className="sizes-stock">
//
//                                 <h3>
//                                     Наявність по розмірах
//                                 </h3>
//
//                                 <p className="muted">
//                                     Вкажіть кількість
//                                     товару для кожного
//                                     розміру.
//                                 </p>
//
//                                 <div className="sizes-stock-grid">
//
//                                     {form.sizes.map(
//                                         item => (
//                                             <label
//                                                 key={
//                                                     item.size
//                                                 }
//                                             >
//
//                                                 <span>
//                                                     Розмір{' '}
//                                                     {
//                                                         item.size
//                                                     }
//                                                 </span>
//
//                                                 <input
//                                                     type="number"
//                                                     min="0"
//                                                     step="1"
//                                                     value={
//                                                         item.stock
//                                                     }
//                                                     onChange={e =>
//                                                         changeSizeStock(
//                                                             item.size,
//                                                             e.target
//                                                                 .value
//                                                         )
//                                                     }
//                                                 />
//
//                                                 <small>
//                                                     шт.
//                                                 </small>
//
//                                             </label>
//                                         )
//                                     )}
//
//                                 </div>
//
//                             </div>
//
//                             {/* DESCRIPTION */}
//
//                             <label>
//                                 Опис
//
//                                 <textarea
//                                     value={
//                                         form.description
//                                     }
//                                     onChange={e =>
//                                         change(
//                                             'description',
//                                             e.target
//                                                 .value
//                                         )
//                                     }
//                                 />
//                             </label>
//
//                             {/* URLS */}
//
//                             <div className="upload-grid">
//
//                                 <div className="upload-box">
//
//                                     <ImagePlus />
//
//                                     <b>
//                                         {t.admin.photo}
//                                     </b>
//
//                                     <small>
//                                         {t.admin.uploadPhoto}
//                                     </small>
//
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={e =>
//                                             uploadAsset(
//                                                 e.target.files?.[0],
//                                                 'image_url'
//                                             )
//                                         }
//                                     />
//
//                                     {form.image_url && (
//                                         <img
//                                             src={form.image_url}
//                                             alt="preview"
//                                         />
//                                     )}
//
//                                 </div>
//
//
//                                 <div className="upload-box">
//
//                                     <Upload />
//
//                                     <b>
//                                         {t.admin.model}
//                                     </b>
//
//                                     <small>
//                                         {t.admin.uploadModel}
//                                     </small>
//
//                                     <input
//                                         type="file"
//                                         accept=".glb,model/gltf-binary"
//                                         onChange={e =>
//                                             uploadAsset(
//                                                 e.target.files?.[0],
//                                                 'model_url'
//                                             )
//                                         }
//                                     />
//
//                                     {form.model_url && (
//                                         <small className="url-ok">
//                                             ✓ GLB connected
//                                         </small>
//                                     )}
//
//                                 </div>
//
//                             </div>
//
//                                 {/* BUTTON */}
//
//                             <button
//                                 type="submit"
//                                 className="button primary"
//                                 disabled={loading}
//                             >
//                                 {loading
//                                     ? 'Збереження...'
//                                     : editingId
//                                         ? 'Зберегти зміни'
//                                         : 'Створити товар'}
//                             </button>
//
//                         </form>
//
//                     </section>
//
//                     {/* PRODUCT LIST */}
//
//                     <section className="admin-panel">
//
//                         <div className="panel-head">
//
//                             <h2>
//                                 Товари
//                             </h2>
//
//                             <span className="muted">
//                                 {products.length}
//                             </span>
//
//                         </div>
//
//                         {products.length === 0 ? (
//                             <p className="muted">
//                                 Товарів поки немає.
//                             </p>
//                         ) : (
//                             products.map(
//                                 product => (
//                                     <ProductAdminRow
//                                         key={
//                                             product.id
//                                         }
//                                         product={
//                                             product
//                                         }
//                                         onEdit={
//                                             startEdit
//                                         }
//                                         onDelete={
//                                             deleteProduct
//                                         }
//                                     />
//                                 )
//                             )
//                         )}
//
//                     </section>
//
//                     {/* ORDERS */}
//
//                     <section
//                         id="orders"
//                         className="admin-panel"
//                     >
//
//                         <div className="panel-head">
//
//                             <h2>
//                                 Замовлення
//                             </h2>
//
//                             <button
//                                 type="button"
//                                 className="button secondary"
//                                 onClick={
//                                     loadOrders
//                                 }
//                                 disabled={
//                                     ordersLoading
//                                 }
//                             >
//                                 {ordersLoading
//                                     ? 'Завантаження...'
//                                     : 'Оновити'}
//                             </button>
//
//                         </div>
//
//                         {orders.length === 0 ? (
//                             <p className="muted">
//                                 Замовлень поки немає.
//                             </p>
//                         ) : (
//                             orders.map(
//                                 order => (
//                                     <div
//                                         className="order-row"
//                                         key={
//                                             order.id
//                                         }
//                                     >
//
//                                         <div>
//                                             <b>
//                                                 #
//                                                 {
//                                                     order.id
//                                                 }
//                                             </b>
//
//                                             <small>
//                                                 {
//                                                     order.email ||
//                                                     order.customer_email ||
//                                                     ''
//                                                 }
//                                             </small>
//                                         </div>
//
//                                         <strong>
//                                             {order.total !=
//                                             null
//                                                 ? `€${order.total}`
//                                                 : ''}
//                                         </strong>
//
//                                         <select
//                                             value={
//                                                 order.status ||
//                                                 'new'
//                                             }
//                                             onChange={e =>
//                                                 updateOrderStatus(
//                                                     order.id,
//                                                     e.target
//                                                         .value
//                                                 )
//                                             }
//                                         >
//
//                                             <option value="new">
//                                                 Нове
//                                             </option>
//
//                                             <option value="processing">
//                                                 В обробці
//                                             </option>
//
//                                             <option value="completed">
//                                                 Виконано
//                                             </option>
//
//                                             <option value="cancelled">
//                                                 Скасовано
//                                             </option>
//
//                                         </select>
//
//                                     </div>
//                                 )
//                             )
//                         )}
//
//                     </section>
//
//                 </section>
//
//             </div>
//
//         </main>
//     );
// }
//
//
// /*
//  * PRODUCT ADMIN ROW
//  */
//
// function ProductAdminRow({
//                              product,
//                              onEdit,
//                              onDelete
//                          }) {
//     const [
//         sizes,
//         setSizes
//     ] = useState([]);
//
//     const [
//         sizesLoading,
//         setSizesLoading
//     ] = useState(true);
//
//     useEffect(() => {
//         let mounted = true;
//
//         async function loadSizes() {
//             if (!supabase) {
//                 return;
//             }
//
//             const {
//                 data,
//                 error
//             } = await supabase
//                 .from('product_sizes')
//                 .select(
//                     'size, stock'
//                 )
//                 .eq(
//                     'product_id',
//                     product.id
//                 )
//                 .order('size');
//
//             if (error) {
//                 console.error(
//                     'LOAD ROW SIZES ERROR:',
//                     error
//                 );
//
//                 if (mounted) {
//                     setSizes([]);
//                     setSizesLoading(false);
//                 }
//
//                 return;
//             }
//
//             if (mounted) {
//                 setSizes(data || []);
//                 setSizesLoading(false);
//             }
//         }
//
//         loadSizes();
//
//         return () => {
//             mounted = false;
//         };
//     }, [product.id]);
//
//     return (
//         <div className="product-admin-row">
//
//             <div className="admin-thumb">
//
//                 {product.image_url ? (
//                     <img
//                         src={
//                             product.image_url
//                         }
//                         alt={
//                             product.name
//                         }
//                     />
//                 ) : (
//                     '3D'
//                 )}
//
//             </div>
//
//             <div>
//
//                 <b>
//                     {product.name}
//                 </b>
//
//                 <small>
//                     {product.category}
//                 </small>
//
//                 <div
//                     style={{
//                         display: 'flex',
//                         gap: '8px',
//                         marginTop: '8px',
//                         flexWrap: 'wrap'
//                     }}
//                 >
//
//                     {sizesLoading ? (
//                         <small>
//                             Завантаження...
//                         </small>
//                     ) : (
//                         ['S', 'M', 'L'].map(
//                             size => {
//                                 const item =
//                                     sizes.find(
//                                         s =>
//                                             s.size ===
//                                             size
//                                     );
//
//                                 const stock =
//                                     item?.stock ??
//                                     0;
//
//                                 return (
//                                     <small
//                                         key={size}
//                                     >
//                                         {size}:{' '}
//                                         {stock}
//                                     </small>
//                                 );
//                             }
//                         )
//                     )}
//
//                 </div>
//
//             </div>
//
//             <strong>
//                 €{product.price}
//             </strong>
//
//             <div>
//
//                 <button
//                     type="button"
//                     className="button secondary"
//                     onClick={() =>
//                         onEdit(product)
//                     }
//                 >
//                     Редагувати
//                 </button>
//
//                 <button
//                     type="button"
//                     className="button danger"
//                     onClick={() =>
//                         onDelete(
//                             product.id
//                         )
//                     }
//                 >
//                     Видалити
//                 </button>
//
//             </div>
//
//         </div>
//     );
// }



import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

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
    Users as UsersIcon,
    BarChart3
} from 'lucide-react';

import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Users from '../components/Users';
import Analytics from "../components/Analytics.jsx";


async function notifyStatus(orderId, type = 'order') {
    if (!supabase) return;

    const { error } = await supabase.functions.invoke(
        'notify-order-status',
        {
            body: {
                order_id: orderId,
                type
            }
        }
    );

    if (error) {
        console.error(
            'Telegram status notification failed:',
            error
        );
    }
}


/*
|--------------------------------------------------------------------------
| РОЗМІРИ
|--------------------------------------------------------------------------
*/

// const AVAILABLE_SIZES = [
//     'XS',
//     'S',
//     'M',
//     'L',
//     'XL',
//     'XXL'
// ];
//
//
// function createEmptySizes() {
//     return AVAILABLE_SIZES.map(size => ({
//         size,
//         stock: 0,
//         enabled: false
//     }));
// }
function createEmptySizes() {
    return [];
}


/*
|--------------------------------------------------------------------------
| EMPTY PRODUCT
|--------------------------------------------------------------------------
*/

const emptyProduct = {
    id: null,

    name: '',
    category_id: '',
    description: '',

    price: '',
    old_price: '',

    size: '',
    cells: 1,

    image_url: '',
    model_url: '',

    featured: false,

    sizes: []
};


/*
|--------------------------------------------------------------------------
| ORDERS
|--------------------------------------------------------------------------
*/

const statuses = [
    'new',
    'confirmed',
    'in_progress',
    'ready',
    'shipped',
    'completed',
    'cancelled'
];


const statusLabels = {
    new: 'Нове',
    confirmed: 'Підтверджено',
    in_progress: 'В роботі',
    ready: 'Готово',
    shipped: 'Відправлено',
    completed: 'Завершено',
    cancelled: 'Скасовано'
};


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

export default function Admin() {
    const { t } = useLanguage();

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


    const [analytics, setAnalytics] = useState([]);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategorySlug, setNewCategorySlug] = useState('');






        /*
    |--------------------------------------------------------------------------
    | CATEGORY
    |--------------------------------------------------------------------------
    */


    async function loadCategories() {
        if (!supabase) return;

        const {
            data,
            error
        } = await supabase
            .from('categories')
            .select('id, name, slug, active, created_at')
            .order('name', {
                ascending: true
            });

        if (error) {
            console.error('LOAD CATEGORIES ERROR:', error);
            setMessage(`Помилка категорій: ${error.message}`);
            return;
        }

        setCategories(data || []);
    }

    async function addCategory() {
        const name = newCategoryName.trim();
        const slug = newCategorySlug.trim();

        if (!name || !slug) {
            setMessage('Вкажіть назву та slug категорії.');
            return;
        }

        const {
            data,
            error
        } = await supabase
            .from('categories')
            .insert({
                name,
                slug,
                active: true
            })
            .select()
            .single();

        if (error) {
            console.error('ADD CATEGORY ERROR:', error);
            setMessage(error.message);
            return;
        }

        setCategories(current => [
            ...current,
            data
        ].sort((a, b) =>
            a.name.localeCompare(b.name)
        ));

        setNewCategoryName('');
        setNewCategorySlug('');

        setMessage('Категорію додано.');
    }

    async function toggleCategory(category) {
        const {
            error
        } = await supabase
            .from('categories')
            .update({
                active: !category.active
            })
            .eq('id', category.id);

        if (error) {
            console.error('TOGGLE CATEGORY ERROR:', error);
            setMessage(error.message);
            return;
        }

        setCategories(current =>
            current.map(item =>
                item.id === category.id
                    ? {
                        ...item,
                        active: !item.active
                    }
                    : item
            )
        );
    }

    async function removeCategory(category) {
        const confirmed = window.confirm(
            `Видалити категорію "${category.name}"?`
        );

        if (!confirmed) return;

        const {
            error
        } = await supabase
            .from('categories')
            .delete()
            .eq('id', category.id);

        if (error) {
            console.error('DELETE CATEGORY ERROR:', error);
            setMessage(error.message);
            return;
        }

        setCategories(current =>
            current.filter(
                item => item.id !== category.id
            )
        );

        setMessage('Категорію видалено.');
    }



    // async function loadCategories() {
    //     const {
    //         data,
    //         error
    //     } = await supabase
    //         .from('categories')
    //         .select('*')
    //         .order('name');
    //
    //     if (error) {
    //         console.error('LOAD CATEGORIES ERROR:', error);
    //         return;
    //     }
    //
    //     setCategories(data || []);
    // }

    /*
    |--------------------------------------------------------------------------
    | VERIFY ADMIN
    |--------------------------------------------------------------------------
    */

    async function loadAnalytics() {
        if (!supabase) return;

        setAnalyticsLoading(true);

        console.log('LOADING ANALYTICS...');

        const {
            data,
            error
        } = await supabase
            .from('site_analytics')
            .select('*')
            .order('created_at', {
                ascending: false
            })
            .limit(5000);

        console.log('ANALYTICS DATA:', data);
        console.log('ANALYTICS ERROR:', error);

        if (error) {
            setMessage(
                `Помилка статистики: ${error.message}`
            );

            setAnalytics([]);
        } else {
            setAnalytics(data || []);
        }

        setAnalyticsLoading(false);
    }


    async function verifyAdmin(currentSession) {
        if (!currentSession || !supabase) {
            setAuthorized(false);
            return false;
        }

        const {
            data,
            error
        } = await supabase.rpc('is_admin');

        const ok = !error && data === true;

        setAuthorized(ok);

        if (!ok) {
            setMessage(t.admin.adminOnly);
        }

        return ok;
    }


    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            setMessage(t.admin.supabase);
            return;
        }

        let active = true;

        supabase.auth
            .getSession()
            .then(async ({ data }) => {
                if (!active) return;

                setSession(data.session);

                await verifyAdmin(data.session);

                setLoading(false);
            });

        const {
            data
        } = supabase.auth.onAuthStateChange(
            (_event, currentSession) => {
                setSession(currentSession);

                if (currentSession) {
                    verifyAdmin(currentSession);
                } else {
                    setAuthorized(false);
                }
            }
        );

        return () => {
            active = false;
            data.subscription.unsubscribe();
        };
    }, []);


    /*
    |--------------------------------------------------------------------------
    | LOAD DATA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!authorized) return;

        loadAll();
        loadAnalytics();
        loadCategories();
    }, [authorized]);


    async function loadAll() {
        if (!supabase) return;

        const [
            productsResponse,
            ordersResponse,
            customOrdersResponse
        ] = await Promise.all([

            supabase
                .from('products')
                .select(`
                    *,
                    product_sizes (
                        id,
                        size,
                        stock
                    )
                `)
                .order('created_at', {
                    ascending: false
                }),

            supabase
                .from('orders')
                .select('*')
                .order('created_at', {
                    ascending: false
                }),

            supabase
                .from('custom_orders')
                .select('*')
                .order('created_at', {
                    ascending: false
                })
        ]);


        if (productsResponse.error) {
            setMessage(productsResponse.error.message);
        }

        if (ordersResponse.error) {
            setMessage(ordersResponse.error.message);
        }

        if (customOrdersResponse.error) {
            setMessage(customOrdersResponse.error.message);
        }

        const productsWithSizes = (
            productsResponse.data || []
        ).map(product => ({
            ...product,
            sizes: product.product_sizes || []
        }));


        // const productsWithSizes = (
        //     productsResponse.data || []
        // ).map(product => ({
        //     ...product,
        //
        //     sizes: AVAILABLE_SIZES.map(size => {
        //         const existing = (
        //             product.product_sizes || []
        //         ).find(item => item.size === size);
        //
        //         return {
        //             size,
        //             stock: existing?.stock || 0,
        //             enabled: Boolean(existing)
        //         };
        //     })
        // }));


        setProducts(productsWithSizes);

        setOrders(
            ordersResponse.data || []
        );

        setCustomOrders(
            customOrdersResponse.data || []
        );
    }


    async function login(e) {
        e.preventDefault();

        setMessage('');

        if (!supabase) {
            setMessage(t.admin.supabase);
            return;
        }

        const {
            data,
            error
        } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setMessage(error.message);
            return;
        }

        const ok = await verifyAdmin(data.session);

        if (!ok) {
            await supabase.auth.signOut();
        }
    }


    async function logout() {
        await supabase.auth.signOut();

        setSession(null);
        setAuthorized(false);
    }


    /*
    |--------------------------------------------------------------------------
    | PRODUCT
    |--------------------------------------------------------------------------
    */

    async function saveProduct(e) {
        e.preventDefault();

        if (!supabase) return;

        setSaving(true);
        setMessage('');


        try {
            /*
            |--------------------------------------------------------------------------
            | 1. PRODUCTS
            |--------------------------------------------------------------------------
            */

            const payload = {
                name: editing.name.trim(),

                category_id: editing.category_id,

                description:
                    editing.description?.trim() || null,

                price: Number(editing.price),

                old_price: editing.old_price
                    ? Number(editing.old_price)
                    : null,

                /*
                 * Це поле залишаємо для сумісності
                 * з твоєю старою таблицею.
                 */
                size: null,

                cells:
                    Number(editing.cells) || 1,

                image_url:
                    editing.image_url || null,

                model_url:
                    editing.model_url || null,

                featured:
                    Boolean(editing.featured)
            };


            let productId = editing.id;


            /*
            |--------------------------------------------------------------------------
            | CREATE
            |--------------------------------------------------------------------------
            */

            if (!editing.id) {
                const {
                    data,
                    error
                } = await supabase
                    .from('products')
                    .insert(payload)
                    .select()
                    .single();

                if (error) {
                    throw error;
                }

                productId = data.id;
            }


            /*
            |--------------------------------------------------------------------------
            | UPDATE
            |--------------------------------------------------------------------------
            */

            else {
                const {
                    error
                } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('id', editing.id);

                if (error) {
                    throw error;
                }
            }


            /*
            |--------------------------------------------------------------------------
            | 2. PRODUCT SIZES
            |--------------------------------------------------------------------------
            */
            const selectedSizes = (editing.sizes || [])
                .filter(item => item.size?.trim())
                .map(item => ({
                    product_id: productId,
                    size: item.size.trim(),
                    stock: Math.max(
                        0,
                        Number(item.stock) || 0
                    )
                }));

            // const selectedSizes = (
            //     editing.sizes || []
            // )
            //     .filter(item => item.enabled)
            //     .map(item => ({
            //         product_id: productId,
            //
            //         size: item.size,
            //
            //         stock: Math.max(
            //             0,
            //             Number(item.stock) || 0
            //         )
            //     }));


            /*
            |--------------------------------------------------------------------------
            | DELETE OLD SIZES
            |--------------------------------------------------------------------------
            |
            | Для першої простої версії робимо синхронізацію:
            |
            | видаляємо старі розміри
            | і створюємо вибрані заново.
            |
            */

            const {
                error: deleteSizesError
            } = await supabase
                .from('product_sizes')
                .delete()
                .eq('product_id', productId);

            if (deleteSizesError) {
                throw deleteSizesError;
            }


            /*
            |--------------------------------------------------------------------------
            | INSERT NEW SIZES
            |--------------------------------------------------------------------------
            */

            if (selectedSizes.length > 0) {
                const {
                    error: insertSizesError
                } = await supabase
                    .from('product_sizes')
                    .insert(selectedSizes);

                if (insertSizesError) {
                    throw insertSizesError;
                }
            }


            /*
            |--------------------------------------------------------------------------
            | SUCCESS
            |--------------------------------------------------------------------------
            */

            setMessage(
                editing.id
                    ? 'Товар успішно оновлено.'
                    : 'Товар успішно створено.'
            );

            setEditing(null);

            await loadAll();

        } catch (error) {
            console.error(
                'SAVE PRODUCT ERROR:',
                error
            );

            setMessage(
                error.message ||
                'Помилка збереження товару.'
            );
        } finally {
            setSaving(false);
        }
    }


    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    async function removeProduct(id) {
        const confirmed = window.confirm(
            'Видалити цей товар?'
        );

        if (!confirmed) return;

        const {
            error
        } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            setMessage(error.message);
            return;
        }

        await loadAll();
    }


    /*
    |--------------------------------------------------------------------------
    | UPLOAD
    |--------------------------------------------------------------------------
    */

    async function uploadAsset(file, type) {
        if (!file || !supabase) return;

        const isModel =
            type === 'model_url';


        if (
            isModel &&
            !file.name
                .toLowerCase()
                .endsWith('.glb')
        ) {
            setMessage(
                '3D модель повинна бути у форматі .glb.'
            );

            return;
        }


        if (
            !isModel &&
            !file.type.startsWith('image/')
        ) {
            setMessage(
                'Будь ласка, завантажте зображення.'
            );

            return;
        }


        const ext =
            file.name
                .split('.')
                .pop()
                ?.toLowerCase() || 'bin';


        const path =
            `${crypto.randomUUID()}.${ext}`;


        const {
            error
        } = await supabase.storage
            .from('catalog')
            .upload(
                path,
                file,
                {
                    upsert: false,
                    contentType:
                        file.type || undefined
                }
            );


        if (error) {
            setMessage(error.message);
            return;
        }


        const {
            data
        } = supabase.storage
            .from('catalog')
            .getPublicUrl(path);


        setEditing(current => ({
            ...current,

            [type]:
            data.publicUrl
        }));
    }


    /*
    |--------------------------------------------------------------------------
    | ORDERS
    |--------------------------------------------------------------------------
    */

    async function updateOrder(id, status) {
        const {
            error
        } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', id);

        if (error) {
            setMessage(error.message);
            return;
        }

        await notifyStatus(id, 'order');

        await loadAll();
    }


    async function updateCustom(id, status) {
        const {
            error
        } = await supabase
            .from('custom_orders')
            .update({ status })
            .eq('id', id);

        if (error) {
            setMessage(error.message);
            return;
        }

        await notifyStatus(id, 'custom');

        await loadAll();
    }


    /*
    |--------------------------------------------------------------------------
    | REVENUE
    |--------------------------------------------------------------------------
    */

    const revenue = useMemo(
        () =>
            orders
                .filter(
                    order =>
                        order.status !== 'cancelled'
                )
                .reduce(
                    (sum, order) =>
                        sum +
                        Number(order.total || 0),
                    0
                ),
        [orders]
    );


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div className="page center">
                <div className="loader">
                    Loading…
                </div>
            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

    if (
        !supabase ||
        !session ||
        !authorized
    ) {
        return (
            <div className="page auth">

                <div className="auth-card">

                    <div className="auth-top">

                        <Link
                            to="/"
                            className="back"
                        >
                            ← {t.admin.back}
                        </Link>

                        <LanguageSwitcher />

                    </div>

                    <span className="eyebrow">
                        MoldLab Admin
                    </span>

                    <h1>
                        {t.admin.title}
                    </h1>

                    <p className="muted">
                        {t.admin.subtitle}
                    </p>

                    <form onSubmit={login}>

                        <input
                            type="email"
                            required
                            placeholder={
                                t.admin.email
                            }
                            value={email}
                            onChange={e =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="password"
                            required
                            placeholder={
                                t.admin.password
                            }
                            value={password}
                            onChange={e =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="button primary full"
                        >
                            {t.admin.login}
                        </button>

                    </form>

                    {message && (
                        <div className="notice">
                            {message}
                        </div>
                    )}

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | TITLE
    |--------------------------------------------------------------------------
    */

    const title =
        tab === 'dashboard'
            ? t.admin.dashboard
            : tab === 'products'
                ? t.admin.products
                : tab === 'orders'
                    ? t.admin.orders
                    : tab === 'custom'
                        ? t.admin.custom
                        : tab === 'categories'
                            ? 'Категорії'
                        : tab === 'analytics'
                            ? 'Статистика'
                            : 'Користувачі';


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (
        <main className="admin-page">

            <div className="container admin-shell">

                {/* SIDEBAR */}

                <aside className="admin-sidebar">

                    <div className="admin-brand-row">

                        <Link
                            to="/"
                            className="logo"
                        >
                            <span className="logo-mark">
                        M
                    </span>

                            <span>
                        mold<span>lab</span>
                    </span>
                        </Link>

                        <LanguageSwitcher />

                    </div>


                    <div className="admin-menu">

                        <button
                            className={
                                tab === 'dashboard'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('dashboard')
                            }
                        >
                            <ClipboardList
                                size={17}
                            />

                            {t.admin.dashboard}
                        </button>


                        <button
                            className={
                                tab === 'products'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('products')
                            }
                        >
                            <Box size={17} />

                            {t.admin.products}
                        </button>


                        <button
                            className={
                                tab === 'orders'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('orders')
                            }
                        >
                            <Package size={17} />

                            {t.admin.orders}
                        </button>


                        <button
                            className={
                                tab === 'custom'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('custom')
                            }
                        >
                            <ImagePlus
                                size={17}
                            />

                            {t.admin.custom}
                        </button>

                        <button
                            className={
                                tab === 'analytics'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('analytics')
                            }
                        >
                            <BarChart3 size={17} />

                            Статистика
                        </button>


                        <button
                            className={
                                tab === 'users'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('users')
                            }
                        >
                            <UsersIcon
                                size={17}
                            />

                            Користувачі
                        </button>

                        <button
                            className={
                                tab === 'categories'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setTab('categories')
                            }
                        >
                            <ClipboardList size={17} />

                            Категорії
                        </button>

                    </div>


                    <button
                        className="admin-logout"
                        onClick={logout}
                    >
                        <LogOut size={17} />

                        {t.admin.logout}
                    </button>

                </aside>


                {/* CONTENT */}

                <section className="admin-content">

                    <div className="admin-top">

                        <div>

                            <span className="eyebrow">
                                CacaoForm Admin
                            </span>

                            <h1>
                                {title}
                            </h1>

                        </div>


                        <button
                            className="button secondary"
                            onClick={() => {
                                loadAll();
                                loadAnalytics();
                            }}
                        >
                            <RefreshCw
                                size={16}
                            />

                            {t.admin.refresh}
                        </button>

                    </div>


                    {message && (
                        <div className="notice">
                            {message}
                        </div>
                    )}


                    {/* DASHBOARD */}

                    {tab === 'dashboard' && (
                        <>
                            <div className="admin-cards">

                                <div>
                                    <span>
                                        {t.admin.ordersCount}
                                    </span>

                                    <b>
                                        {orders.length}
                                    </b>
                                </div>

                                <div>
                                    <span>
                                        {t.admin.newCount}
                                    </span>

                                    <b>
                                        {
                                            orders.filter(
                                                order =>
                                                    order.status ===
                                                    'new'
                                            ).length
                                        }
                                    </b>
                                </div>

                                <div>
                                    <span>
                                        {t.admin.customCount}
                                    </span>

                                    <b>
                                        {
                                            customOrders.length
                                        }
                                    </b>
                                </div>

                                <div>
                                    <span>
                                        {t.admin.revenue}
                                    </span>

                                    <b>
                                        €
                                        {revenue.toFixed(2)}
                                    </b>
                                </div>

                            </div>


                            <div className="admin-panel">

                                <h2>
                                    {t.admin.recent}
                                </h2>

                                {orders
                                    .slice(0, 5)
                                    .map(order => (
                                        <OrderRow
                                            key={order.id}
                                            order={order}
                                            onStatus={
                                                updateOrder
                                            }
                                        />
                                    ))}

                                {!orders.length && (
                                    <p className="muted">
                                        {
                                            t.admin.noOrders
                                        }
                                    </p>
                                )}

                            </div>
                        </>
                    )}


                    {/* PRODUCTS */}

                    {tab === 'products' && (
                        <Products
                            products={products}
                            categories={categories}
                            editing={editing}
                            setEditing={setEditing}
                            saveProduct={saveProduct}
                            removeProduct={removeProduct}
                            uploadAsset={uploadAsset}
                            saving={saving}
                            t={t}
                        />
                    )}


                    {/* ORDERS */}

                    {tab === 'orders' && (
                        <div className="admin-panel">

                            <h2>
                                {t.admin.orders}
                            </h2>

                            {orders.map(order => (
                                <OrderRow
                                    key={order.id}
                                    order={order}
                                    onStatus={
                                        updateOrder
                                    }
                                    detailed
                                />
                            ))}

                            {!orders.length && (
                                <p className="muted">
                                    {
                                        t.admin.noOrders
                                    }
                                </p>
                            )}

                        </div>
                    )}


                    {/* CUSTOM */}

                    {tab === 'custom' && (
                        <div className="admin-panel">

                            <h2>
                                {t.admin.customOrders}
                            </h2>

                            {customOrders.map(order => (
                                <div
                                    className="custom-order"
                                    key={order.id}
                                >

                                    <div>

                                        <b>
                                            {
                                                order.customer_name
                                            }
                                        </b>

                                        <small>
                                            {order.email}
                                            {' · '}
                                            {order.phone}
                                        </small>

                                        <p>
                                            {
                                                order.description
                                            }
                                        </p>

                                        {order.file_url && (
                                            <a
                                                href={
                                                    order.file_url
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Open file
                                            </a>
                                        )}

                                    </div>


                                    <select
                                        value={
                                            order.status
                                        }
                                        onChange={e =>
                                            updateCustom(
                                                order.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        {statuses.map(
                                            status => (
                                                <option
                                                    key={status}
                                                    value={
                                                        status
                                                    }
                                                >
                                                    {
                                                        statusLabels[
                                                            status
                                                            ]
                                                    }
                                                </option>
                                            )
                                        )}

                                    </select>

                                </div>
                            ))}


                            {!customOrders.length && (
                                <p className="muted">
                                    {
                                        t.admin.noCustom
                                    }
                                </p>
                            )}

                        </div>
                    )}

                    {/* ANALYTICS */}

                    {tab === 'analytics' && (
                        <Analytics />
                    )}


                    {/* USERS */}

                    {tab === 'users' && (
                        <Users />
                    )}

                    {tab === 'categories' && (
                        <div className="admin-panel">

                            <div className="panel-head">
                                <div>
                                    <h2>Категорії товарів</h2>

                                    <p className="muted">
                                        Увімкнені категорії будуть показуватися
                                        на сайті.
                                    </p>
                                </div>
                            </div>


                            {/* ADD CATEGORY */}

                            <div className="category-create">

                                <input
                                    className={"category-create-input"}
                                    type="text"
                                    placeholder="Назва категорії"
                                    value={newCategoryName}
                                    onChange={e =>
                                        setNewCategoryName(
                                            e.target.value
                                        )
                                    }
                                />

                                <input
                                    className={"category-create-input"}
                                    type="text"
                                    placeholder="slug, наприклад figurky"
                                    value={newCategorySlug}
                                    onChange={e =>
                                        setNewCategorySlug(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    className="button primary"
                                    onClick={addCategory}
                                >
                                    <Plus size={16} />
                                    Додати
                                </button>

                            </div>


                            {/* CATEGORIES */}

                            <div className="categories-admin-list">

                                {categories.map(category => (

                                    <div
                                        className="category-admin-row"
                                        key={category.id}
                                    >

                                        <label className="category-toggle">

                                            <input
                                                type="checkbox"
                                                checked={Boolean(
                                                    category.active
                                                )}
                                                onChange={() =>
                                                    toggleCategory(
                                                        category
                                                    )
                                                }
                                            />

                                            <span>
                            {category.name}
                        </span>

                                        </label>

                                        <span
                                            className={
                                                category.active
                                                    ? 'category-status active'
                                                    : 'category-status'
                                            }
                                        >
                        {category.active
                            ? 'Показується'
                            : 'Прихована'}
                    </span>


                                        <button
                                            type="button"
                                            className="icon-button danger"
                                            onClick={() =>
                                                removeCategory(
                                                    category
                                                )
                                            }
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>

                                ))}


                                {!categories.length && (
                                    <p className="muted">
                                        Категорій ще немає.
                                    </p>
                                )}

                            </div>

                        </div>
                    )}

                </section>

            </div>

        </main>
    );
}


/*
|--------------------------------------------------------------------------
| PRODUCTS COMPONENT
|--------------------------------------------------------------------------
*/

function Products({
                      products,
                      categories,
                      editing,
                      setEditing,
                      saveProduct,
                      removeProduct,
                      uploadAsset,
                      saving,
                      t
                  }) {

    function startNewProduct() {
        setEditing({
            ...emptyProduct,

            sizes: createEmptySizes()
        });
    }

    async function startEdit(product) {

        const { data: sizes, error } = await supabase
            .from('product_sizes')
            .select('id, size, stock')
            .eq('product_id', product.id)
            .order('created_at');

        if (error) {
            console.error('LOAD PRODUCT SIZES ERROR:', error);
            return;
        }

        setEditing({
            ...product,
            sizes: sizes || []
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    // function startEditProduct(product) {
    //     const sizes = createEmptySizes();
    //
    //     for (const size of sizes) {
    //         const existing = (
    //             product.product_sizes ||
    //             []
    //         ).find(
    //             item =>
    //                 item.size === size.size
    //         );
    //
    //         if (existing) {
    //             size.enabled = true;
    //             size.stock =
    //                 existing.stock || 0;
    //         }
    //     }
    //
    //
    //     /*
    //      * Якщо loadAll вже сформував sizes
    //      * використовуємо їх.
    //      */
    //
    //     if (
    //         Array.isArray(product.sizes)
    //     ) {
    //         for (const size of product.sizes) {
    //             const target =
    //                 sizes.find(
    //                     item =>
    //                         item.size ===
    //                         size.size
    //                 );
    //
    //             if (target) {
    //                 target.enabled =
    //                     Boolean(
    //                         size.enabled
    //                     );
    //
    //                 target.stock =
    //                     Number(
    //                         size.stock
    //                     ) || 0;
    //             }
    //         }
    //     }
    //
    //
    //     setEditing({
    //         ...product,
    //
    //         sizes
    //     });
    // }


    return (
        <div className="products-admin">

            {/* PRODUCT LIST */}

            <div className="admin-panel">

                <div className="panel-head">

                    <h2>
                        {t.admin.catalog}
                    </h2>

                    <button
                        type="button"
                        className="button primary"
                        onClick={() => {
                            startNewProduct();

                            setTimeout(() => {
                                document
                                    .getElementById('product-form-edit')
                                    ?.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                            }, 100);
                        }}
                    >
                        <Plus size={16} />
                        {t.admin.newProduct}
                    </button>

                </div>


                {products.map(product => (
                    <div
                        className="product-admin-row"
                        key={product.id}
                    >

                        <div className="admin-thumb">

                            {product.image_url ? (
                                <img
                                    src={
                                        product.image_url
                                    }
                                    alt=""
                                />
                            ) : (
                                <Box size={22} />
                            )}

                        </div>


                        <div>

                            <b>
                                {product.name}
                            </b>

                            <small>
                                {product.category}
                                {' · '}
                                €{product.price}
                            </small>


                            {/* STOCK SUMMARY */}

                            {product.product_sizes?.length >
                                0 && (
                                    <small>
                                        {product.product_sizes
                                            .map(
                                                item =>
                                                    `${item.size}: ${item.stock}`
                                            )
                                            .join(' · ')}
                                    </small>
                                )}

                        </div>


                        <button
                            onClick={() => {
                                startEdit(product);

                                setTimeout(() => {
                                    document
                                        .getElementById('product-form-edit')
                                        ?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                }, 100);
                            }}
                        >
                            <Pencil size={16} />
                        </button>


                        <button
                            className="icon-button danger"
                            onClick={() =>
                                removeProduct(
                                    product.id
                                )
                            }
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>
                ))}


                {!products.length && (
                    <p className="muted">
                        {t.admin.noProducts}
                    </p>
                )}

            </div>


            {/* PRODUCT FORM */}

            {editing && (
                <form
                    id="product-form-edit"
                    className="admin-panel product-form"
                    onSubmit={saveProduct}
                >

                    <div className="panel-head">

                        <h2>
                            {editing.id
                                ? t.admin.editProduct
                                : t.admin.newProduct}
                        </h2>

                        <button
                            type="button"
                            className="icon-button"
                            onClick={() =>
                                setEditing(null)
                            }
                        >
                            ×
                        </button>

                    </div>


                    {/* BASIC INFO */}

                    <div className="form-grid">

                        <label>
                            {t.admin.name}

                            <input
                                required
                                value={
                                    editing.name
                                }
                                onChange={e =>
                                    setEditing(
                                        current => ({
                                            ...current,

                                            name:
                                            e.target
                                                .value
                                        })
                                    )
                                }
                            />
                        </label>


                        <label>
                            {t.admin.category}

                            <select
                                required
                                value={editing.category_id || ''}
                                onChange={e =>
                                    setEditing(current => ({
                                        ...current,
                                        category_id: e.target.value
                                    }))
                                }
                            >
                                <option value="">Оберіть категорію</option>

                                {categories.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </label>


                        <label>
                            {t.admin.price}

                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    editing.price
                                }
                                onChange={e =>
                                    setEditing(
                                        current => ({
                                            ...current,

                                            price:
                                            e.target
                                                .value
                                        })
                                    )
                                }
                            />
                        </label>


                        <label>
                            {t.admin.oldPrice}

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    editing.old_price ||
                                    ''
                                }
                                onChange={e =>
                                    setEditing(
                                        current => ({
                                            ...current,

                                            old_price:
                                            e.target
                                                .value
                                        })
                                    )
                                }
                            />
                        </label>


                        <label>
                            {t.admin.cells}

                            <input
                                type="number"
                                min="1"
                                value={
                                    editing.cells ||
                                    1
                                }
                                onChange={e =>
                                    setEditing(
                                        current => ({
                                            ...current,

                                            cells:
                                            e.target
                                                .value
                                        })
                                    )
                                }
                            />
                        </label>

                    </div>


                    {/* DESCRIPTION */}

                    <label>
                        {t.admin.description}

                        <textarea
                            value={
                                editing.description ||
                                ''
                            }
                            onChange={e =>
                                setEditing(
                                    current => ({
                                        ...current,

                                        description:
                                        e.target
                                            .value
                                    })
                                )
                            }
                        />

                    </label>


                    {/* SIZES */}

                    {/*<div className="product-size-manager">*/}

                    {/*    <div className="size-manager-head">*/}

                    {/*        <div>*/}
                    {/*            <h3>*/}
                    {/*                Розміри та залишки*/}
                    {/*            </h3>*/}

                    {/*            <p className="muted">*/}
                    {/*                Виберіть розміри,*/}
                    {/*                які будуть доступні*/}
                    {/*                покупцю.*/}
                    {/*            </p>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}


                    {/*    <div className="size-manager-grid">*/}

                    {/*        {(editing.sizes || [])*/}
                    {/*            .map(*/}
                    {/*                (*/}
                    {/*                    sizeItem,*/}
                    {/*                    index*/}
                    {/*                ) => (*/}

                    {/*                    <div*/}
                    {/*                        className={*/}
                    {/*                            `size-manager-row ${*/}
                    {/*                                sizeItem.enabled*/}
                    {/*                                    ? 'active'*/}
                    {/*                                    : ''*/}
                    {/*                            }`*/}
                    {/*                        }*/}
                    {/*                        key={*/}
                    {/*                            sizeItem.size*/}
                    {/*                        }*/}
                    {/*                    >*/}

                    {/*                        <label className="size-checkbox">*/}

                    {/*                            <input*/}
                    {/*                                type="checkbox"*/}
                    {/*                                checked={*/}
                    {/*                                    Boolean(*/}
                    {/*                                        sizeItem.enabled*/}
                    {/*                                    )*/}
                    {/*                                }*/}
                    {/*                                onChange={*/}
                    {/*                                    e => {*/}
                    {/*                                        const sizes =*/}
                    {/*                                            [*/}
                    {/*                                                ...editing.sizes*/}
                    {/*                                            ];*/}

                    {/*                                        sizes[*/}
                    {/*                                            index*/}
                    {/*                                            ] = {*/}
                    {/*                                            ...sizes[*/}
                    {/*                                                index*/}
                    {/*                                                ],*/}

                    {/*                                            enabled:*/}
                    {/*                                            e*/}
                    {/*                                                .target*/}
                    {/*                                                .checked*/}
                    {/*                                        };*/}

                    {/*                                        setEditing(*/}
                    {/*                                            current => ({*/}
                    {/*                                                ...current,*/}

                    {/*                                                sizes*/}
                    {/*                                            })*/}
                    {/*                                        );*/}
                    {/*                                    }*/}
                    {/*                                }*/}
                    {/*                            />*/}

                    {/*                            <span>*/}
                    {/*                                {*/}
                    {/*                                    sizeItem.size*/}
                    {/*                                }*/}
                    {/*                            </span>*/}

                    {/*                        </label>*/}


                    {/*                        <label className="stock-input">*/}

                    {/*                            <span>*/}
                    {/*                                Кількість*/}
                    {/*                            </span>*/}

                    {/*                            <input*/}
                    {/*                                type="number"*/}
                    {/*                                min="0"*/}
                    {/*                                disabled={*/}
                    {/*                                    !sizeItem.enabled*/}
                    {/*                                }*/}
                    {/*                                value={*/}
                    {/*                                    sizeItem.stock*/}
                    {/*                                }*/}
                    {/*                                onChange={*/}
                    {/*                                    e => {*/}
                    {/*                                        const sizes =*/}
                    {/*                                            [*/}
                    {/*                                                ...editing.sizes*/}
                    {/*                                            ];*/}

                    {/*                                        sizes[*/}
                    {/*                                            index*/}
                    {/*                                            ] = {*/}
                    {/*                                            ...sizes[*/}
                    {/*                                                index*/}
                    {/*                                                ],*/}

                    {/*                                            stock:*/}
                    {/*                                            e*/}
                    {/*                                                .target*/}
                    {/*                                                .value*/}
                    {/*                                        };*/}

                    {/*                                        setEditing(*/}
                    {/*                                            current => ({*/}
                    {/*                                                ...current,*/}

                    {/*                                                sizes*/}
                    {/*                                            })*/}
                    {/*                                        );*/}
                    {/*                                    }*/}
                    {/*                                }*/}
                    {/*                            />*/}

                    {/*                        </label>*/}


                    {/*                        <span*/}
                    {/*                            className={*/}
                    {/*                                sizeItem.enabled*/}
                    {/*                                    ? 'stock-status available'*/}
                    {/*                                    : 'stock-status'*/}
                    {/*                            }*/}
                    {/*                        >*/}
                    {/*                            {sizeItem.enabled*/}
                    {/*                                ? Number(*/}
                    {/*                                    sizeItem.stock*/}
                    {/*                                ) > 0*/}
                    {/*                                    ? 'В наявності'*/}
                    {/*                                    : 'Немає'*/}
                    {/*                                : 'Не використовується'}*/}
                    {/*                        </span>*/}

                    {/*                    </div>*/}

                    {/*                )*/}
                    {/*            )}*/}

                    {/*    </div>*/}

                    {/*</div>*/}\
                    <div className="product-size-manager">

                        <div className="size-manager-head">
                            <div>
                                <h3>Розміри та залишки</h3>

                                <p className="muted">
                                    Додайте розміри, доступні для цього товару,
                                    та вкажіть кількість.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="button secondary"
                                onClick={() => {
                                    setEditing(current => ({
                                        ...current,
                                        sizes: [
                                            ...(current.sizes || []),
                                            {
                                                size: '',
                                                stock: 0
                                            }
                                        ]
                                    }));
                                }}
                            >
                                + Додати розмір
                            </button>
                        </div>

                        <div className="size-manager-grid">

                            {(editing.sizes || []).map((sizeItem, index) => (

                                <div
                                    className="size-manager-row active"
                                    key={index}
                                >

                                    <label>
                                        <span>Розмір</span>

                                        <input
                                            type="text"
                                            placeholder="10×10×10"
                                            value={sizeItem.size}
                                            onChange={e => {

                                                const sizes = [
                                                    ...(editing.sizes || [])
                                                ];

                                                sizes[index] = {
                                                    ...sizes[index],
                                                    size: e.target.value
                                                };

                                                setEditing(current => ({
                                                    ...current,
                                                    sizes
                                                }));
                                            }}
                                        />
                                    </label>


                                    <label className="stock-input">
                                        <span>Кількість</span>

                                        <input
                                            type="number"
                                            min="0"
                                            value={sizeItem.stock}
                                            onChange={e => {

                                                const sizes = [
                                                    ...(editing.sizes || [])
                                                ];

                                                sizes[index] = {
                                                    ...sizes[index],
                                                    stock: e.target.value
                                                };

                                                setEditing(current => ({
                                                    ...current,
                                                    sizes
                                                }));
                                            }}
                                        />
                                    </label>


                                    <button
                                        type="button"
                                        className="button danger"
                                        onClick={() => {

                                            const sizes = [
                                                ...(editing.sizes || [])
                                            ];

                                            sizes.splice(index, 1);

                                            setEditing(current => ({
                                                ...current,
                                                sizes
                                            }));
                                        }}
                                    >
                                        Видалити
                                    </button>

                                </div>

                            ))}

                            {(!editing.sizes ||
                                editing.sizes.length === 0) && (

                                <p className="muted">
                                    Розміри ще не додані.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* UPLOADS */}

                    <div className="upload-grid">

                        <div className="upload-box">

                            <ImagePlus />

                            <b>
                                {t.admin.photo}
                            </b>

                            <small>
                                {
                                    t.admin.uploadPhoto
                                }
                            </small>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={e =>
                                    uploadAsset(
                                        e.target
                                            .files?.[0],
                                        'image_url'
                                    )
                                }
                            />


                            {editing.image_url && (
                                <img
                                    src={
                                        editing.image_url
                                    }
                                    alt="preview"
                                />
                            )}

                        </div>


                        <div className="upload-box">

                            <Upload />

                            <b>
                                {t.admin.model}
                            </b>

                            <small>
                                {
                                    t.admin.uploadModel
                                }
                            </small>

                            <input
                                type="file"
                                accept=".glb,model/gltf-binary"
                                onChange={e =>
                                    uploadAsset(
                                        e.target
                                            .files?.[0],
                                        'model_url'
                                    )
                                }
                            />


                            {editing.model_url && (
                                <small className="url-ok">
                                    ✓ GLB connected
                                </small>
                            )}

                        </div>

                    </div>


                    {/* FEATURED */}

                    <label className="check">

                        <input
                            type="checkbox"
                            checked={
                                Boolean(
                                    editing.featured
                                )
                            }
                            onChange={e =>
                                setEditing(
                                    current => ({
                                        ...current,

                                        featured:
                                        e.target
                                            .checked
                                    })
                                )
                            }
                        />

                        {t.admin.featured}

                    </label>


                    {/* SAVE */}

                    <button
                        type="submit"
                        className="button primary full"
                        disabled={saving}
                    >
                        {saving
                            ? `${t.admin.save}…`
                            : t.admin.save}
                    </button>

                </form>
            )}

        </div>
    );
}


/*
|--------------------------------------------------------------------------
| ORDER ROW
|--------------------------------------------------------------------------
*/

function OrderRow({
                      order,
                      onStatus,
                      detailed
                  }) {

    return (
        <div className="order-row">

            <div>

                <b>
                    #{order.id.slice(0, 8)}
                </b>

                <span>
                    {order.customer_name}
                </span>

                <small>
                    {order.email}
                    {' · '}
                    {order.phone}
                </small>


                {detailed &&
                    order.comment && (
                        <small>
                            Comment:{' '}
                            {order.comment}
                        </small>
                    )}


                {detailed && (
                    <small>
                        {(order.items || [])
                            .map(
                                item =>
                                    `${item.name} × ${
                                        item.quantity ||
                                        1
                                    }`
                            )
                            .join(' · ')}
                    </small>
                )}

            </div>


            <strong>
                €
                {Number(
                    order.total
                ).toFixed(2)}
            </strong>


            <select
                value={
                    order.status
                }
                onChange={e =>
                    onStatus(
                        order.id,
                        e.target.value
                    )
                }
            >

                {statuses.map(status => (
                    <option
                        key={status}
                        value={status}
                    >
                        {
                            statusLabels[
                                status
                                ]
                        }
                    </option>
                ))}

            </select>

        </div>
    );
}
