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
        id: 'addresses',
        label: 'Адреси доставки',
        icon: MapPin,
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
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [addressesLoading, setAddressesLoading] = useState(false);
    const [addressSaving, setAddressSaving] = useState(false);
    const [addressMessage, setAddressMessage] = useState('');

    const [editingAddressId, setEditingAddressId] = useState(null);

    const [addressForm, setAddressForm] = useState({
        label: 'Дім',
        first_name: '',
        last_name: '',
        phone: '',
        country: 'PL',
        city: '',
        address: '',
        apartment: '',
        postal_code: '',
        delivery_method: 'inpost_paczkomat',
        pickup_point: '',
        is_default: false,
    });

    useEffect(() => {
        if (!user) {
            setShippingAddresses([]);
            return;
        }

        async function loadShippingAddresses() {
            setAddressesLoading(true);

            const { data, error } = await supabase
                .from('shipping_addresses')
                .select('*')
                .eq('user_id', user.id)
                .order('is_default', {
                    ascending: false,
                })
                .order('created_at', {
                    ascending: false,
                });

            if (error) {
                console.error(
                    'Shipping addresses loading error:',
                    error
                );

                setShippingAddresses([]);
            } else {
                setShippingAddresses(data || []);
            }

            setAddressesLoading(false);
        }

        loadShippingAddresses();
    }, [user]);

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

    function updateAddressField(field, value) {
        setAddressForm((current) => ({
            ...current,
            [field]: value,
        }));
    }


    function resetAddressForm() {
        setEditingAddressId(null);

        setAddressForm({
            label: 'Дім',
            first_name: profile?.full_name || '',
            last_name: '',
            phone: profile?.phone || '',
            country: profile?.country || 'PL',
            city: profile?.city || '',
            address: profile?.address || '',
            apartment: '',
            postal_code: profile?.postal_code || '',
            delivery_method: 'inpost_paczkomat',
            pickup_point: '',
            is_default: shippingAddresses.length === 0,
        });

        setAddressMessage('');
    }


    function editShippingAddress(address) {
        setEditingAddressId(address.id);

        setAddressForm({
            label: address.label || 'Адреса',
            first_name: address.first_name || '',
            last_name: address.last_name || '',
            phone: address.phone || '',
            country: address.country || 'PL',
            city: address.city || '',
            address: address.address || '',
            apartment: address.apartment || '',
            postal_code: address.postal_code || '',
            delivery_method:
                address.delivery_method ||
                'inpost_paczkomat',
            pickup_point:
                address.pickup_point || '',
            is_default:
                Boolean(address.is_default),
        });

        setAddressMessage('');
    }


    async function saveShippingAddress(e) {
        e.preventDefault();

        if (!user) return;

        setAddressSaving(true);
        setAddressMessage('');

        if (!addressForm.first_name.trim()) {
            setAddressMessage('Введіть імʼя.');
            setAddressSaving(false);
            return;
        }

        if (!addressForm.last_name.trim()) {
            setAddressMessage('Введіть прізвище.');
            setAddressSaving(false);
            return;
        }

        if (!addressForm.phone.trim()) {
            setAddressMessage('Введіть телефон.');
            setAddressSaving(false);
            return;
        }

        if (!addressForm.country) {
            setAddressMessage('Виберіть країну.');
            setAddressSaving(false);
            return;
        }

        if (!addressForm.city.trim()) {
            setAddressMessage('Введіть місто.');
            setAddressSaving(false);
            return;
        }

        if (
            addressForm.delivery_method !== 'inpost_paczkomat' &&
            !addressForm.address.trim()
        ) {
            setAddressMessage('Введіть адресу.');
            setAddressSaving(false);
            return;
        }

        try {
            /*
             * Якщо адреса має стати основною,
             * спочатку прибираємо default з інших.
             */

            if (addressForm.is_default) {
                const { error: defaultError } =
                    await supabase
                        .from('shipping_addresses')
                        .update({
                            is_default: false,
                        })
                        .eq('user_id', user.id);

                if (defaultError) {
                    throw defaultError;
                }
            }

            const payload = {
                user_id: user.id,

                label:
                    addressForm.label.trim() ||
                    'Адреса',

                first_name:
                    addressForm.first_name.trim(),

                last_name:
                    addressForm.last_name.trim(),

                phone:
                    addressForm.phone.trim(),

                country:
                addressForm.country,

                city:
                    addressForm.city.trim(),

                address:
                    addressForm.address.trim(),

                apartment:
                    addressForm.apartment.trim(),

                postal_code:
                    addressForm.postal_code.trim(),

                delivery_method:
                addressForm.delivery_method,

                pickup_point:
                    addressForm.pickup_point.trim(),

                is_default:
                addressForm.is_default,

                updated_at:
                    new Date().toISOString(),
            };

            let result;

            if (editingAddressId) {
                result = await supabase
                    .from('shipping_addresses')
                    .update(payload)
                    .eq('id', editingAddressId)
                    .eq('user_id', user.id);
            } else {
                result = await supabase
                    .from('shipping_addresses')
                    .insert(payload);
            }

            if (result.error) {
                throw result.error;
            }

            const { data, error } = await supabase
                .from('shipping_addresses')
                .select('*')
                .eq('user_id', user.id)
                .order('is_default', {
                    ascending: false,
                })
                .order('created_at', {
                    ascending: false,
                });

            if (error) {
                throw error;
            }

            setShippingAddresses(data || []);

            setAddressMessage(
                editingAddressId
                    ? 'Адресу оновлено.'
                    : 'Адресу збережено.'
            );

            resetAddressForm();

        } catch (error) {
            console.error(
                'Shipping address save error:',
                error
            );

            setAddressMessage(
                'Не вдалося зберегти адресу.'
            );
        } finally {
            setAddressSaving(false);
        }
    }


    async function deleteShippingAddress(addressId) {
        if (!user) return;

        const confirmed = window.confirm(
            'Видалити цю адресу доставки?'
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from('shipping_addresses')
            .delete()
            .eq('id', addressId)
            .eq('user_id', user.id);

        if (error) {
            console.error(
                'Shipping address delete error:',
                error
            );

            setAddressMessage(
                'Не вдалося видалити адресу.'
            );

            return;
        }

        setShippingAddresses((current) =>
            current.filter(
                address => address.id !== addressId
            )
        );

        if (editingAddressId === addressId) {
            resetAddressForm();
        }
    }


    async function setDefaultShippingAddress(addressId) {
        if (!user) return;

        const { error: resetError } =
            await supabase
                .from('shipping_addresses')
                .update({
                    is_default: false,
                })
                .eq('user_id', user.id);

        if (resetError) {
            console.error(
                'Default address reset error:',
                resetError
            );

            return;
        }

        const { error } = await supabase
            .from('shipping_addresses')
            .update({
                is_default: true,
                updated_at:
                    new Date().toISOString(),
            })
            .eq('id', addressId)
            .eq('user_id', user.id);

        if (error) {
            console.error(
                'Default address error:',
                error
            );

            return;
        }

        setShippingAddresses((current) =>
            current.map(address => ({
                ...address,
                is_default:
                    address.id === addressId,
            }))
        );
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

                        {/* ================= SHIPPING ADDRESSES ================= */}

                        {activeSection === 'addresses' && (
                            <div className="account-section">

                                <div className="account-section-header">

                                    <div>
                                        <div className="eyebrow">
                                            ACCOUNT
                                        </div>

                                        <h1>
                                            Адреси доставки
                                        </h1>

                                        <p className="muted">
                                            Збережені адреси для швидкого оформлення замовлення
                                        </p>
                                    </div>

                                </div>


                                {/* SAVED ADDRESSES */}

                                {addressesLoading ? (

                                    <div className="account-empty">
                                        Завантаження адрес...
                                    </div>

                                ) : shippingAddresses.length > 0 ? (

                                    <div className="shipping-addresses-list">

                                        {shippingAddresses.map((address) => (

                                            <article
                                                className={`shipping-address-card ${
                                                    address.is_default
                                                        ? 'is-default'
                                                        : ''
                                                }`}
                                                key={address.id}
                                            >

                                                <div className="shipping-address-card-header">

                                                    <div>

                                                        <strong>
                                                            {address.label}
                                                        </strong>

                                                        {address.is_default && (
                                                            <span className="shipping-address-default">
                                        Основна
                                    </span>
                                                        )}

                                                    </div>

                                                    <div className="shipping-address-actions">

                                                        {!address.is_default && (
                                                            <button
                                                                type="button"
                                                                className="button secondary"
                                                                onClick={() =>
                                                                    setDefaultShippingAddress(
                                                                        address.id
                                                                    )
                                                                }
                                                            >
                                                                Зробити основною
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            className="button secondary"
                                                            onClick={() =>
                                                                editShippingAddress(
                                                                    address
                                                                )
                                                            }
                                                        >
                                                            <Pencil size={15} />
                                                            Редагувати
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="button secondary"
                                                            onClick={() =>
                                                                deleteShippingAddress(
                                                                    address.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>

                                                    </div>

                                                </div>


                                                <div className="shipping-address-content">

                                                    <div>
                                                        <strong>
                                                            {address.first_name}{' '}
                                                            {address.last_name}
                                                        </strong>
                                                    </div>

                                                    {address.phone && (
                                                        <div className="profile-info-row">
                                                            <Phone size={15} />

                                                            <span>
                                        {address.phone}
                                    </span>
                                                        </div>
                                                    )}

                                                    <div className="profile-info-row">
                                                        <MapPin size={15} />

                                                        <span>
                                    {[
                                        address.address,
                                        address.apartment,
                                        address.city,
                                        address.postal_code,
                                    ]
                                        .filter(Boolean)
                                        .join(', ')}
                                </span>
                                                    </div>

                                                    <div className="shipping-address-country">
                                                        {address.country}
                                                    </div>

                                                    {address.pickup_point && (
                                                        <div className="shipping-address-pickup">
                                                            Пункт: {address.pickup_point}
                                                        </div>
                                                    )}

                                                </div>

                                            </article>

                                        ))}

                                    </div>

                                ) : (

                                    <div className="account-empty">

                                        <MapPin size={42} />

                                        <h3>
                                            Збережених адрес немає
                                        </h3>

                                        <p className="muted">
                                            Додайте адресу, щоб швидше оформляти замовлення.
                                        </p>

                                    </div>

                                )}


                                {/* ADD / EDIT ADDRESS */}

                                <div className="shipping-address-form-card">

                                    <div className="account-section-header">

                                        <div>

                                            <h2>
                                                {editingAddressId
                                                    ? 'Редагувати адресу'
                                                    : 'Додати адресу'}
                                            </h2>

                                            <p className="muted">
                                                Ці дані будуть доступні під час оформлення замовлення.
                                            </p>

                                        </div>

                                    </div>


                                    <form
                                        className="profile-form"
                                        onSubmit={saveShippingAddress}
                                    >

                                        <div className="form-grid">

                                            <label>

                        <span>
                            Назва адреси
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.label}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'label',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Дім"
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Імʼя
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.first_name}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'first_name',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Імʼя"
                                                    required
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Прізвище
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.last_name}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'last_name',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Прізвище"
                                                    required
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Телефон
                        </span>

                                                <input
                                                    type="tel"
                                                    value={addressForm.phone}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'phone',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="+34..."
                                                    required
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Країна
                        </span>

                                                <select
                                                    value={addressForm.country}
                                                    onChange={(e) => {
                                                        updateAddressField(
                                                            'country',
                                                            e.target.value
                                                        );

                                                        if (
                                                            e.target.value !== 'PL'
                                                        ) {
                                                            updateAddressField(
                                                                'delivery_method',
                                                                'courier'
                                                            );
                                                        }
                                                    }}
                                                    disabled={addressSaving}
                                                >
                                                    <option value="PL">
                                                        Polska
                                                    </option>

                                                    <option value="DE">
                                                        Deutschland
                                                    </option>

                                                    <option value="FR">
                                                        France
                                                    </option>

                                                    <option value="ES">
                                                        España
                                                    </option>

                                                    <option value="IT">
                                                        Italia
                                                    </option>

                                                    <option value="NL">
                                                        Nederland
                                                    </option>

                                                    <option value="BE">
                                                        Belgium
                                                    </option>

                                                    <option value="AT">
                                                        Österreich
                                                    </option>

                                                    <option value="CZ">
                                                        Česko
                                                    </option>

                                                    <option value="SK">
                                                        Slovensko
                                                    </option>

                                                    <option value="HU">
                                                        Magyarország
                                                    </option>

                                                    <option value="RO">
                                                        România
                                                    </option>

                                                    <option value="UA">
                                                        Україна
                                                    </option>

                                                    <option value="GB">
                                                        United Kingdom
                                                    </option>

                                                    <option value="US">
                                                        United States
                                                    </option>

                                                    <option value="CA">
                                                        Canada
                                                    </option>

                                                    <option value="AU">
                                                        Australia
                                                    </option>

                                                </select>

                                            </label>


                                            <label>

                        <span>
                            Місто
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.city}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'city',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Місто"
                                                    required
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Поштовий індекс
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.postal_code}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'postal_code',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="50000"
                                                    disabled={addressSaving}
                                                />

                                            </label>


                                            <label>

                        <span>
                            Спосіб доставки
                        </span>

                                                <select
                                                    value={addressForm.delivery_method}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'delivery_method',
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={addressSaving}
                                                >

                                                    {addressForm.country === 'PL' ? (
                                                        <>
                                                            <option value="inpost_paczkomat">
                                                                InPost Paczkomat
                                                            </option>

                                                            <option value="inpost_courier">
                                                                InPost Kurier
                                                            </option>

                                                            <option value="dpd_courier">
                                                                DPD Kurier
                                                            </option>

                                                            <option value="dhl_courier">
                                                                DHL Kurier
                                                            </option>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <option value="courier">
                                                                Курʼєр
                                                            </option>

                                                            <option value="pickup_point">
                                                                Пункт видачі
                                                            </option>
                                                        </>
                                                    )}

                                                </select>

                                            </label>

                                        </div>


                                        <label className="form-field-full">

                    <span>
                        Вулиця та номер будинку
                    </span>

                                            <input
                                                type="text"
                                                value={addressForm.address}
                                                onChange={(e) =>
                                                    updateAddressField(
                                                        'address',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Calle Mayor 10"
                                                disabled={addressSaving}
                                            />

                                        </label>


                                        <label className="form-field-full">

                    <span>
                        Квартира / локал
                    </span>

                                            <input
                                                type="text"
                                                value={addressForm.apartment}
                                                onChange={(e) =>
                                                    updateAddressField(
                                                        'apartment',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Квартира 5"
                                                disabled={addressSaving}
                                            />

                                        </label>


                                        {(
                                            addressForm.delivery_method ===
                                            'inpost_paczkomat' ||
                                            addressForm.delivery_method ===
                                            'pickup_point'
                                        ) && (

                                            <label className="form-field-full">

                        <span>
                            Пункт / Paczkomat
                        </span>

                                                <input
                                                    type="text"
                                                    value={addressForm.pickup_point}
                                                    onChange={(e) =>
                                                        updateAddressField(
                                                            'pickup_point',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Наприклад WAW147H"
                                                    disabled={addressSaving}
                                                />

                                            </label>

                                        )}


                                        <label className="shipping-address-default-checkbox">

                                            <input
                                                type="checkbox"
                                                checked={addressForm.is_default}
                                                onChange={(e) =>
                                                    updateAddressField(
                                                        'is_default',
                                                        e.target.checked
                                                    )
                                                }
                                                disabled={addressSaving}
                                            />

                                            <span>
                        Використовувати як основну адресу
                    </span>

                                        </label>


                                        {addressMessage && (
                                            <div className="profile-save-message">
                                                {addressMessage}
                                            </div>
                                        )}


                                        <div className="shipping-address-form-actions">

                                            <button
                                                type="submit"
                                                className="button primary"
                                                disabled={addressSaving}
                                            >
                                                {addressSaving
                                                    ? 'Збереження...'
                                                    : editingAddressId
                                                        ? 'Зберегти адресу'
                                                        : 'Додати адресу'}
                                            </button>


                                            {editingAddressId && (
                                                <button
                                                    type="button"
                                                    className="button secondary"
                                                    onClick={resetAddressForm}
                                                    disabled={addressSaving}
                                                >
                                                    Скасувати
                                                </button>
                                            )}

                                        </div>

                                    </form>

                                </div>

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