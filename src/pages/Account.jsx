// import { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//     User,
//     Mail,
//     Heart,
//     ShoppingBag,
//     LogOut,
//     ShieldCheck
// } from 'lucide-react';
//
// import { supabase } from '../lib/supabase';
//
// export default function Account() {
//     const navigate = useNavigate();
//
//     const [user, setUser] = useState(null);
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         loadAccount();
//     }, []);
//
//     async function loadAccount() {
//         if (!supabase) {
//             setLoading(false);
//             return;
//         }
//
//         try {
//             const {
//                 data: { user }
//             } = await supabase.auth.getUser();
//
//             if (!user) {
//                 navigate('/auth');
//                 return;
//             }
//
//             setUser(user);
//
//             const { data: profileData } = await supabase
//                 .from('profiles')
//                 .select('*')
//                 .eq('id', user.id)
//                 .maybeSingle();
//
//             setProfile(profileData);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     async function logout() {
//         await supabase.auth.signOut();
//         navigate('/');
//     }
//
//     if (loading) {
//         return (
//             <main className="page center">
//                 <div className="loader">
//                     Завантаження...
//                 </div>
//             </main>
//         );
//     }
//
//     if (!user) return null;
//
//     const name =
//         profile?.full_name ||
//         user.user_metadata?.full_name ||
//         'Користувач';
//
//     const isAdmin = profile?.role === 'admin';
//
//     return (
//         <main className="page account-page">
//             <div className="container">
//
//                 <div className="account-header">
//                     <div>
//                         <span className="eyebrow">
//                             Особистий кабінет
//                         </span>
//
//                         <h1>
//                             Привіт, {name}
//                         </h1>
//
//                         <p>
//                             Керуйте своїм акаунтом, замовленнями
//                             та обраними товарами.
//                         </p>
//                     </div>
//
//                     <button
//                         className="button secondary"
//                         onClick={logout}
//                     >
//                         <LogOut size={17} />
//                         Вийти
//                     </button>
//                 </div>
//
//                 <div className="account-grid">
//
//                     <div className="account-card">
//                         <div className="account-card-icon">
//                             <User size={22} />
//                         </div>
//
//                         <h3>Мій профіль</h3>
//
//                         <p>
//                             <Mail size={15} />
//                             {user.email}
//                         </p>
//
//                         {isAdmin && (
//                             <div className="account-role admin">
//                                 <ShieldCheck size={15} />
//                                 Адміністратор
//                             </div>
//                         )}
//                     </div>
//
//                     <Link
//                         to="/wishlist"
//                         className="account-card account-link"
//                     >
//                         <div className="account-card-icon">
//                             <Heart size={22} />
//                         </div>
//
//                         <h3>Вішлист</h3>
//
//                         <p>
//                             Ваші улюблені товари
//                         </p>
//                     </Link>
//
//                     <div className="account-card">
//                         <div className="account-card-icon">
//                             <ShoppingBag size={22} />
//                         </div>
//
//                         <h3>Мої замовлення</h3>
//
//                         <p>
//                             Історія ваших замовлень
//                         </p>
//
//                         <span className="muted">
//                             Розділ можна підключити до
//                             orders
//                         </span>
//                     </div>
//
//                     {isAdmin && (
//                         <Link
//                             to="/admin"
//                             className="account-card account-link admin-card"
//                         >
//                             <div className="account-card-icon">
//                                 <ShieldCheck size={22} />
//                             </div>
//
//                             <h3>Адмін-панель</h3>
//
//                             <p>
//                                 Керування магазином
//                             </p>
//                         </Link>
//                     )}
//
//                 </div>
//
//             </div>
//         </main>
//     );
// }


import {
    User,
    LogOut,
    Shield,
    Heart
} from 'lucide-react';

import {
    Link,
    Navigate
} from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function Account() {
    const {
        user,
        profile,
        isAdmin,
        logout,
        loading
    } = useAuth();

    if (loading) {
        return (
            <div className="center">
                Завантаження...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/auth"
                replace
            />
        );
    }

    return (
        <main className="page">

            <div className="container">

                <div className="account-card">

                    <div className="account-avatar">
                        <User size={30} />
                    </div>

                    <div>

                        <div className="eyebrow">
                            ACCOUNT
                        </div>

                        <h1>
                            {profile?.full_name ||
                                user.email}
                        </h1>

                        <p className="muted">
                            {user.email}
                        </p>

                        {isAdmin && (
                            <div className="role admin">
                                <Shield size={14} />
                                Адміністратор
                            </div>
                        )}

                    </div>

                </div>

                <div className="account-actions">

                    <Link
                        to="/wishlist"
                        className="button secondary"
                    >
                        <Heart size={17} />
                        Моє обране
                    </Link>

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="button primary"
                        >
                            <Shield size={17} />
                            Адмін-панель
                        </Link>
                    )}

                    <button
                        className="button secondary"
                        onClick={logout}
                    >
                        <LogOut size={17} />
                        Вийти
                    </button>

                </div>

            </div>

        </main>
    );
}