// // import { useEffect, useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import {
// //     User,
// //     Mail,
// //     Heart,
// //     ShoppingBag,
// //     LogOut,
// //     ShieldCheck
// // } from 'lucide-react';
// //
// // import { supabase } from '../lib/supabase';
// //
// // export default function Account() {
// //     const navigate = useNavigate();
// //
// //     const [user, setUser] = useState(null);
// //     const [profile, setProfile] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //
// //     useEffect(() => {
// //         loadAccount();
// //     }, []);
// //
// //     async function loadAccount() {
// //         if (!supabase) {
// //             setLoading(false);
// //             return;
// //         }
// //
// //         try {
// //             const {
// //                 data: { user }
// //             } = await supabase.auth.getUser();
// //
// //             if (!user) {
// //                 navigate('/auth');
// //                 return;
// //             }
// //
// //             setUser(user);
// //
// //             const { data: profileData } = await supabase
// //                 .from('profiles')
// //                 .select('*')
// //                 .eq('id', user.id)
// //                 .maybeSingle();
// //
// //             setProfile(profileData);
// //         } catch (error) {
// //             console.error(error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }
// //
// //     async function logout() {
// //         await supabase.auth.signOut();
// //         navigate('/');
// //     }
// //
// //     if (loading) {
// //         return (
// //             <main className="page center">
// //                 <div className="loader">
// //                     Завантаження...
// //                 </div>
// //             </main>
// //         );
// //     }
// //
// //     if (!user) return null;
// //
// //     const name =
// //         profile?.full_name ||
// //         user.user_metadata?.full_name ||
// //         'Користувач';
// //
// //     const isAdmin = profile?.role === 'admin';
// //
// //     return (
// //         <main className="page account-page">
// //             <div className="container">
// //
// //                 <div className="account-header">
// //                     <div>
// //                         <span className="eyebrow">
// //                             Особистий кабінет
// //                         </span>
// //
// //                         <h1>
// //                             Привіт, {name}
// //                         </h1>
// //
// //                         <p>
// //                             Керуйте своїм акаунтом, замовленнями
// //                             та обраними товарами.
// //                         </p>
// //                     </div>
// //
// //                     <button
// //                         className="button secondary"
// //                         onClick={logout}
// //                     >
// //                         <LogOut size={17} />
// //                         Вийти
// //                     </button>
// //                 </div>
// //
// //                 <div className="account-grid">
// //
// //                     <div className="account-card">
// //                         <div className="account-card-icon">
// //                             <User size={22} />
// //                         </div>
// //
// //                         <h3>Мій профіль</h3>
// //
// //                         <p>
// //                             <Mail size={15} />
// //                             {user.email}
// //                         </p>
// //
// //                         {isAdmin && (
// //                             <div className="account-role admin">
// //                                 <ShieldCheck size={15} />
// //                                 Адміністратор
// //                             </div>
// //                         )}
// //                     </div>
// //
// //                     <Link
// //                         to="/wishlist"
// //                         className="account-card account-link"
// //                     >
// //                         <div className="account-card-icon">
// //                             <Heart size={22} />
// //                         </div>
// //
// //                         <h3>Вішлист</h3>
// //
// //                         <p>
// //                             Ваші улюблені товари
// //                         </p>
// //                     </Link>
// //
// //                     <div className="account-card">
// //                         <div className="account-card-icon">
// //                             <ShoppingBag size={22} />
// //                         </div>
// //
// //                         <h3>Мої замовлення</h3>
// //
// //                         <p>
// //                             Історія ваших замовлень
// //                         </p>
// //
// //                         <span className="muted">
// //                             Розділ можна підключити до
// //                             orders
// //                         </span>
// //                     </div>
// //
// //                     {isAdmin && (
// //                         <Link
// //                             to="/admin"
// //                             className="account-card account-link admin-card"
// //                         >
// //                             <div className="account-card-icon">
// //                                 <ShieldCheck size={22} />
// //                             </div>
// //
// //                             <h3>Адмін-панель</h3>
// //
// //                             <p>
// //                                 Керування магазином
// //                             </p>
// //                         </Link>
// //                     )}
// //
// //                 </div>
// //
// //             </div>
// //         </main>
// //     );
// // }
//
//
// import {
//     User,
//     LogOut,
//     Shield,
//     Heart
// } from 'lucide-react';
//
// import {
//     Link,
//     Navigate
// } from 'react-router-dom';
//
// import { useAuth } from '../context/AuthContext';
//
// export default function Account() {
//     const {
//         user,
//         profile,
//         isAdmin,
//         logout,
//         loading
//     } = useAuth();
//
//     if (loading) {
//         return (
//             <div className="center">
//                 Завантаження...
//             </div>
//         );
//     }
//
//     if (!user) {
//         return (
//             <Navigate
//                 to="/auth"
//                 replace
//             />
//         );
//     }
//
//     return (
//         <main className="page">
//
//             <div className="container">
//
//                 <div className="account-card">
//
//                     <div className="account-avatar">
//                         <User size={30} />
//                     </div>
//
//                     <div>
//
//                         <div className="eyebrow">
//                             ACCOUNT
//                         </div>
//
//                         <h1>
//                             {profile?.full_name ||
//                                 user.email}
//                         </h1>
//
//                         <p className="muted">
//                             {user.email}
//                         </p>
//
//                         {isAdmin && (
//                             <div className="role admin">
//                                 <Shield size={14} />
//                                 Адміністратор
//                             </div>
//                         )}
//
//                     </div>
//
//                 </div>
//
//                 <div className="account-actions">
//
//                     <Link
//                         to="/wishlist"
//                         className="button secondary"
//                     >
//                         <Heart size={17} />
//                         Моє обране
//                     </Link>
//
//                     {isAdmin && (
//                         <Link
//                             to="/admin"
//                             className="button primary"
//                         >
//                             <Shield size={17} />
//                             Адмін-панель
//                         </Link>
//                     )}
//
//                     <button
//                         className="button secondary"
//                         onClick={logout}
//                     >
//                         <LogOut size={17} />
//                         Вийти
//                     </button>
//
//                 </div>
//
//             </div>
//
//         </main>
//     );
// }


import { useEffect, useState } from 'react';
import {
    User,
    LogOut,
    Shield,
    Heart,
    ShoppingBag,
    ShoppingCart,
    Pencil,
    Mail,
    Phone,
    MapPin,
    Package,
    ChevronRight,
    Trash2,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';

const ORDER_STATUS = {
    new: 'Нове',
    confirmed: 'Підтверджено',
    in_progress: 'В роботі',
    ready: 'Готове',
    shipped: 'Відправлено',
    completed: 'Виконано',
    cancelled: 'Скасовано',
};

const MENU_ITEMS = [
    {
        id: 'profile',
        label: 'Профіль',
        icon: User,
    },
    {
        id: 'orders',
        label: 'Замовлення',
        icon: ShoppingBag,
    },
    {
        id: 'edit',
        label: 'Редагування профілю',
        icon: Pencil,
    },
    {
        id: 'wishlist',
        label: 'Обране',
        icon: Heart,
    },
];

export default function Account({ onAdd }) {
    const {
        user,
        profile,
        isAdmin,
        logout,
        loading: authLoading,
        refreshProfile,
    } = useAuth();

    const {
        wishlist,
        loading: wishlistLoading,
        removeFromWishlist,
    } = useWishlist();

    const [activeSection, setActiveSection] = useState('profile');

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    const [form, setForm] = useState({
        full_name: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        postal_code: '',
    });

    useEffect(() => {
        if (!profile) return;

        setForm({
            full_name: profile.full_name || '',
            phone: profile.phone || '',
            country: profile.country || '',
            city: profile.city || '',
            address: profile.address || '',
            postal_code: profile.postal_code || '',
        });
    }, [profile]);

    useEffect(() => {
        if (!user) return;

        async function loadOrders() {
            setOrdersLoading(true);

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Orders loading error:', error);
                setOrders([]);
            } else {
                setOrders(data || []);
            }

            setOrdersLoading(false);
        }

        loadOrders();
    }, [user]);

    if (authLoading) {
        return (
            <div className="center">
                Завантаження...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    function updateField(field, value) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleSaveProfile(e) {
        e.preventDefault();

        setSaving(true);
        setSaveMessage('');

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: form.full_name.trim(),
                phone: form.phone.trim(),
                country: form.country.trim(),
                city: form.city.trim(),
                address: form.address.trim(),
                postal_code: form.postal_code.trim(),
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);

        if (error) {
            console.error('Profile update error:', error);
            setSaveMessage('Не вдалося зберегти зміни.');
            setSaving(false);
            return;
        }

        await refreshProfile();

        setSaveMessage('Профіль успішно оновлено.');
        setSaving(false);
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    function formatPrice(price) {
        return `${Number(price || 0).toFixed(2)} €`;
    }

    function getStatusClass(status) {
        return `order-status status-${status}`;
    }

    function handleMenuClick(itemId) {
        setActiveSection(itemId);
        setSaveMessage('');
    }

    return (
        <main className="page account-page">
            <div className="container">

                <div className="account-layout">

                    {/* SIDEBAR */}

                    <aside className="account-sidebar">

                        <div className="account-user">

                            <div className="account-avatar">
                                <User size={28} />
                            </div>

                            <div className="account-user-info">
                                <strong>
                                    {profile?.full_name || 'Користувач'}
                                </strong>

                                <span>
                                    {user.email}
                                </span>
                            </div>

                        </div>


                        <nav className="account-menu">

                            {MENU_ITEMS.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`account-menu-item ${
                                            activeSection === item.id
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleMenuClick(item.id)
                                        }
                                    >
                                        <Icon size={18} />

                                        <span>
                                            {item.label}
                                        </span>

                                        <ChevronRight
                                            size={16}
                                            className="account-menu-arrow"
                                        />
                                    </button>
                                );
                            })}

                        </nav>


                        <div className="account-sidebar-bottom">

                            {isAdmin && (
                                <a
                                    href="/admin"
                                    className="account-menu-item"
                                >
                                    <Shield size={18} />

                                    <span>
                                        Адмін-панель
                                    </span>

                                    <ChevronRight size={16} />
                                </a>
                            )}

                            <button
                                type="button"
                                className="account-menu-item logout-item"
                                onClick={logout}
                            >
                                <LogOut size={18} />

                                <span>
                                    Вийти
                                </span>
                            </button>

                        </div>

                    </aside>


                    {/* CONTENT */}

                    <section className="account-content">

                        {/* ================= PROFILE ================= */}

                        {activeSection === 'profile' && (
                            <div className="account-section">

                                <div className="account-section-header">

                                    <div>
                                        <div className="eyebrow">
                                            ACCOUNT
                                        </div>

                                        <h1>
                                            Профіль
                                        </h1>

                                        <p className="muted">
                                            Ваша особиста інформація
                                        </p>
                                    </div>

                                </div>


                                <div className="profile-card">

                                    <div className="profile-card-avatar">
                                        <User size={40} />
                                    </div>

                                    <div className="profile-main-info">

                                        <h2>
                                            {profile?.full_name ||
                                                'Імʼя не вказано'}
                                        </h2>

                                        <div className="profile-info-row">
                                            <Mail size={17} />
                                            <span>
                                                {user.email}
                                            </span>
                                        </div>

                                        {profile?.phone && (
                                            <div className="profile-info-row">
                                                <Phone size={17} />
                                                <span>
                                                    {profile.phone}
                                                </span>
                                            </div>
                                        )}

                                        {(profile?.city ||
                                            profile?.country) && (
                                            <div className="profile-info-row">
                                                <MapPin size={17} />

                                                <span>
                                                    {[
                                                        profile.city,
                                                        profile.country,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(', ')}
                                                </span>
                                            </div>
                                        )}

                                        {profile?.address && (
                                            <div className="profile-info-row">
                                                <MapPin size={17} />
                                                <span>
                                                    {profile.address}
                                                </span>
                                            </div>
                                        )}

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="button primary"
                                    onClick={() =>
                                        setActiveSection('edit')
                                    }
                                >
                                    <Pencil size={17} />
                                    Редагувати профіль
                                </button>

                            </div>
                        )}


                        {/* ================= ORDERS ================= */}

                        {activeSection === 'orders' && (
                            <div className="account-section">

                                <div className="account-section-header">

                                    <div>
                                        <div className="eyebrow">
                                            ACCOUNT
                                        </div>

                                        <h1>
                                            Замовлення
                                        </h1>

                                        <p className="muted">
                                            Історія ваших замовлень
                                        </p>
                                    </div>

                                </div>


                                {ordersLoading ? (

                                    <div className="account-empty">
                                        Завантаження замовлень...
                                    </div>

                                ) : orders.length === 0 ? (

                                    <div className="account-empty">

                                        <Package size={42} />

                                        <h3>
                                            Замовлень ще немає
                                        </h3>

                                        <p className="muted">
                                            Тут зʼявляться ваші замовлення
                                            після покупки.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="orders-list">

                                        {orders.map((order) => (

                                            <article
                                                className="order-card"
                                                key={order.id}
                                            >

                                                <div className="order-card-header">

                                                    <div>

                                                        <span className="order-number">
                                                            Замовлення #
                                                            {order.id.slice(0, 8)}
                                                        </span>

                                                        <span className="order-date">
                                                            {formatDate(
                                                                order.created_at
                                                            )}
                                                        </span>

                                                    </div>

                                                    <span
                                                        className={getStatusClass(
                                                            order.status
                                                        )}
                                                    >
                                                        {ORDER_STATUS[
                                                                order.status
                                                                ] ||
                                                            order.status}
                                                    </span>

                                                </div>


                                                <div className="order-items">

                                                    {(order.items || []).map(
                                                        (item, index) => (

                                                            <div
                                                                className="order-item"
                                                                key={`${item.id}-${index}`}
                                                            >

                                                                <div className="order-item-name">

                                                                    {item.name}

                                                                    {item.selectedSize && (
                                                                        <span>
                                                                            Розмір:{' '}
                                                                            {item.selectedSize}
                                                                        </span>
                                                                    )}

                                                                </div>

                                                                <div className="order-item-quantity">
                                                                    ×{' '}
                                                                    {item.quantity}
                                                                </div>

                                                                <div className="order-item-price">
                                                                    {formatPrice(
                                                                        Number(
                                                                            item.price ||
                                                                            0
                                                                        ) *
                                                                        Number(
                                                                            item.quantity ||
                                                                            1
                                                                        )
                                                                    )}
                                                                </div>

                                                            </div>

                                                        )
                                                    )}

                                                </div>


                                                <div className="order-card-footer">

                                                    {order.comment && (
                                                        <div className="order-comment">
                                                            Коментар:{' '}
                                                            {order.comment}
                                                        </div>
                                                    )}

                                                    <strong>
                                                        Всього:{' '}
                                                        {formatPrice(
                                                            order.total
                                                        )}
                                                    </strong>

                                                </div>

                                            </article>

                                        ))}

                                    </div>

                                )}

                            </div>
                        )}


                        {/* ================= EDIT PROFILE ================= */}

                        {activeSection === 'edit' && (
                            <div className="account-section">

                                <div className="account-section-header">

                                    <div>
                                        <div className="eyebrow">
                                            ACCOUNT
                                        </div>

                                        <h1>
                                            Редагування профілю
                                        </h1>

                                        <p className="muted">
                                            Оновіть свої контактні дані
                                        </p>
                                    </div>

                                </div>


                                <form
                                    className="profile-form"
                                    onSubmit={handleSaveProfile}
                                >

                                    <div className="form-grid">

                                        <label>

                                            <span>
                                                Імʼя та прізвище
                                            </span>

                                            <input
                                                type="text"
                                                value={form.full_name}
                                                onChange={(e) =>
                                                    updateField(
                                                        'full_name',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ваше імʼя"
                                            />

                                        </label>


                                        <label>

                                            <span>
                                                Email
                                            </span>

                                            <input
                                                type="email"
                                                value={user.email || ''}
                                                disabled
                                            />

                                            <small>
                                                Email змінюється через
                                                налаштування акаунта.
                                            </small>

                                        </label>


                                        <label>

                                            <span>
                                                Телефон
                                            </span>

                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) =>
                                                    updateField(
                                                        'phone',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="+34 ..."
                                            />

                                        </label>


                                        <label>

                                            <span>
                                                Країна
                                            </span>

                                            <input
                                                type="text"
                                                value={form.country}
                                                onChange={(e) =>
                                                    updateField(
                                                        'country',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Іспанія"
                                            />

                                        </label>


                                        <label>

                                            <span>
                                                Місто
                                            </span>

                                            <input
                                                type="text"
                                                value={form.city}
                                                onChange={(e) =>
                                                    updateField(
                                                        'city',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Ваше місто"
                                            />

                                        </label>


                                        <label>

                                            <span>
                                                Поштовий індекс
                                            </span>

                                            <input
                                                type="text"
                                                value={form.postal_code}
                                                onChange={(e) =>
                                                    updateField(
                                                        'postal_code',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="50000"
                                            />

                                        </label>

                                    </div>


                                    <label className="form-field-full">

                                        <span>
                                            Адреса
                                        </span>

                                        <input
                                            type="text"
                                            value={form.address}
                                            onChange={(e) =>
                                                updateField(
                                                    'address',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Вулиця, будинок, квартира"
                                        />

                                    </label>


                                    {saveMessage && (
                                        <div className="profile-save-message">
                                            {saveMessage}
                                        </div>
                                    )}


                                    <button
                                        type="submit"
                                        className="button primary"
                                        disabled={saving}
                                    >
                                        {saving
                                            ? 'Збереження...'
                                            : 'Зберегти зміни'}
                                    </button>

                                </form>

                            </div>
                        )}


                        {/* ================= WISHLIST ================= */}

                        {activeSection === 'wishlist' && (
                            <div className="account-section">

                                <div className="account-section-header">

                                    <div>

                                        <div className="eyebrow">
                                            ACCOUNT
                                        </div>

                                        <h1>
                                            Обране
                                        </h1>

                                        <p className="muted">
                                            Товари, які ви зберегли
                                        </p>

                                    </div>


                                    {wishlist.length > 0 && (
                                        <span className="wishlist-count">
                                            {wishlist.length}
                                        </span>
                                    )}

                                </div>


                                {wishlistLoading ? (

                                    <div className="account-empty">
                                        Завантаження...
                                    </div>

                                ) : wishlist.length === 0 ? (

                                    <div className="account-empty">

                                        <Heart size={42} />

                                        <h3>
                                            Обране порожнє
                                        </h3>

                                        <p className="muted">
                                            Додавайте товари в обране,
                                            щоб повернутися до них пізніше.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="account-wishlist-grid">

                                        {wishlist.map((product) => {

                                            const selectedSize =
                                                product.selectedSize !== null &&
                                                product.selectedSize !== undefined &&
                                                product.selectedSize !== ''
                                                    ? String(
                                                        product.selectedSize
                                                    )
                                                    : null;

                                            const image =
                                                product.image_url ||
                                                product.image ||
                                                product.imageUrl ||
                                                null;

                                            return (
                                                <article
                                                    className="wishlist-page-card"
                                                    key={`${product.id}-${selectedSize}-${product.wishlistId}`}
                                                >

                                                    {/* IMAGE */}

                                                    <a
                                                        href={`/product/${product.id}`}
                                                        className="wishlist-page-image"
                                                    >

                                                        {image ? (

                                                            <img
                                                                src={image}
                                                                alt={
                                                                    product.name ||
                                                                    'Товар'
                                                                }
                                                            />

                                                        ) : (

                                                            <div>
                                                                Немає фото
                                                            </div>

                                                        )}

                                                    </a>


                                                    {/* INFO */}

                                                    <div className="wishlist-page-info">

                                                        <div className="category">
                                                            {product.category ||
                                                                'MOLD'}
                                                        </div>


                                                        <h3>
                                                            {product.name ||
                                                                'Без назви'}
                                                        </h3>


                                                        {product.description && (
                                                            <p>
                                                                {
                                                                    product.description
                                                                }
                                                            </p>
                                                        )}


                                                        {/* SIZE */}

                                                        <div className="wishlist-selected-size">

                                                            <span>
                                                                Розмір:
                                                            </span>

                                                            <strong>
                                                                {selectedSize ||
                                                                    'Не вибрано'}
                                                            </strong>

                                                        </div>


                                                        {/* PRICE */}

                                                        <div className="wishlist-price">

                                                            <strong>
                                                                {formatPrice(
                                                                    product.price
                                                                )}
                                                            </strong>

                                                            {product.oldPrice && (
                                                                <del>
                                                                    {formatPrice(
                                                                        product.oldPrice
                                                                    )}
                                                                </del>
                                                            )}

                                                        </div>


                                                        {/* BUTTONS */}

                                                        <div className="wishlist-page-actions">

                                                            <button
                                                                type="button"
                                                                className="button primary wishlist-add-cart"
                                                                disabled={
                                                                    !selectedSize
                                                                }
                                                                onClick={() => {

                                                                    console.log(
                                                                        '🛒 ACCOUNT WISHLIST ADD:',
                                                                        {
                                                                            productId:
                                                                            product.id,
                                                                            selectedSize,
                                                                        }
                                                                    );

                                                                    if (
                                                                        !selectedSize
                                                                    ) {
                                                                        return;
                                                                    }

                                                                    onAdd?.(
                                                                        product,
                                                                        selectedSize
                                                                    );

                                                                }}
                                                            >

                                                                <ShoppingCart
                                                                    size={16}
                                                                />

                                                                Додати в кошик

                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="button secondary wishlist-delete-button"
                                                                onClick={() =>
                                                                    removeFromWishlist(
                                                                        product.id,
                                                                        selectedSize
                                                                    )
                                                                }
                                                                aria-label="Видалити з обраного"
                                                            >

                                                                <Trash2
                                                                    size={16}
                                                                />

                                                            </button>

                                                        </div>

                                                    </div>

                                                </article>
                                            );
                                        })}

                                    </div>

                                )}

                            </div>
                        )}

                    </section>

                </div>

            </div>
        </main>
    );
}