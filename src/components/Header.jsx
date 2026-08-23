// // import {ShoppingBag, Menu, X} from 'lucide-react';
// // import {Link} from 'react-router-dom';
// // import {useState} from 'react';
// // import LanguageSwitcher from './LanguageSwitcher';
// // import {useLanguage} from '../context/LanguageContext';
// // import { useAuth } from '../context/AuthContext';
// //
// // export default function Header({count}) {
// //     const {t} = useLanguage();
// //     const [open, setOpen] = useState(false);
// //     const close = () => setOpen(false);
// //     const go = (id) => {
// //         document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
// //         close();
// //     };
// //
// //     const { user, profile, isAdmin, signOut } = useAuth();
// //
// //
// //     return <header className="header">
// //         <div className="container nav">
// //             <Link
// //                 to="/"
// //                 className="logo"
// //                 onClick={close}
// //             ><span className="logo-mark">M</span>Mold<span>Lab</span></Link>
// //             <button
// //                 className="menu"
// //                 onClick={() => setOpen(!open)}
// //                 aria-label="Menu"
// //             >{open ? <X /> : <Menu />}</button>
// //             <nav className={open ? 'nav-links open' : 'nav-links'}>
// //                 <a
// //                     href="#catalog"
// //                     onClick={(e) => {
// //                         e.preventDefault();
// //                         go('catalog')
// //                     }}
// //                 >{t.nav.catalog}</a>
// //                 <a
// //                     href="#how"
// //                     onClick={(e) => {
// //                         e.preventDefault();
// //                         go('how')
// //                     }}
// //                 >{t.nav.process}</a>
// //                 <a
// //                     href="#custom"
// //                     onClick={(e) => {
// //                         e.preventDefault();
// //                         go('custom')
// //                     }}
// //                 >{t.nav.custom}</a>
// //                 <a
// //                     href="#about"
// //                     onClick={(e) => {
// //                         e.preventDefault();
// //                         go('about')
// //                     }}
// //                 >{t.nav.about}</a>
// //             </nav>
// //             <div className="header-actions"><LanguageSwitcher /><a
// //                 href="#cart"
// //                 className="cart-link"
// //             ><ShoppingBag size={19} /><span>{count}</span></a></div>
// //         </div>
// //     </header>;
// // }
//
//
//
// import { Link } from 'react-router-dom';
// import { Heart, LogIn, LogOut, Shield, User } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useWishlist } from '../hooks/useWishlist';
//
// export default function Header({ count }) {
//     const {
//         user,
//         profile,
//         isAdmin,
//         signOut
//     } = useAuth();
//
//     const {
//         wishlist
//     } = useWishlist();
//
//     return (
//         <header className="site-header">
//             <div className="container header-inner">
//
//                 {/* LOGO */}
//                 <Link to="/" className="logo">
//                     MoldLab
//                 </Link>
//
//                 {/* NAVIGATION */}
//                 <nav className="main-nav">
//
//                     <Link to="/">
//                         Каталог
//                     </Link>
//
//                     <Link to="/wishlist" className="header-link">
//                         <Heart size={18} />
//
//                         <span>
//                             Обране
//                         </span>
//
//                         {wishlist.length > 0 && (
//                             <span className="badge">
//                                 {wishlist.length}
//                             </span>
//                         )}
//                     </Link>
//
//                 </nav>
//
//                 {/* RIGHT SIDE */}
//                 <div className="header-actions">
//
//                     {/* CART */}
//                     <Link
//                         to="/"
//                         className="cart-link"
//                     >
//                         🛒
//
//                         {count > 0 && (
//                             <span className="badge">
//                                 {count}
//                             </span>
//                         )}
//                     </Link>
//
//                     {/* USER */}
//                     {user ? (
//                         <div className="account">
//
//                             <Link
//                                 to="/profile"
//                                 className="account-link"
//                             >
//                                 <User size={18} />
//
//                                 <span>
//                                     {profile?.full_name ||
//                                         user.email}
//                                 </span>
//                             </Link>
//
//                             {/* ADMIN */}
//                             {isAdmin && (
//                                 <Link
//                                     to="/admin"
//                                     className="admin-link"
//                                 >
//                                     <Shield size={18} />
//                                     Адмінка
//                                 </Link>
//                             )}
//
//                             {/* LOGOUT */}
//                             <button
//                                 type="button"
//                                 className="logout-button"
//                                 onClick={signOut}
//                             >
//                                 <LogOut size={18} />
//                                 Вийти
//                             </button>
//
//                         </div>
//                     ) : (
//                         <Link
//                             to="/auth"
//                             className="login-button"
//                         >
//                             <LogIn size={18} />
//                             Увійти
//                         </Link>
//                     )}
//
//                 </div>
//
//             </div>
//         </header>
//     );
// }


import { useState } from 'react';
import {
    ShoppingBag,
    Heart,
    User,
    Menu,
    X,
    LogIn
} from 'lucide-react';

import {
    Link,
    useLocation
} from 'react-router-dom';

import { useLanguage } from '../context/LanguageContext';

export default function Header({
                                   count = 0,
                                   wishlistCount = 0,
                                   user
                               }) {

    const { language, setLanguage } =
        useLanguage();

    const [open, setOpen] =
        useState(false);

    const location =
        useLocation();

    const adminPath =
        import.meta.env.VITE_ADMIN_PATH || 'admin';

    return (
        <header className="header">

            <div className="container nav">

                <Link
                    to="/"
                    className="logo"
                    onClick={() => setOpen(false)}
                >
                    <span className="logo-mark">
                        M
                    </span>

                    <span>
                        Mold<span>Lab</span>
                    </span>
                </Link>

                <nav
                    className={`nav-links ${
                        open ? 'open' : ''
                    }`}
                >

                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                    >
                        Каталог
                    </Link>

                    <a
                        href="/#custom"
                        onClick={() => setOpen(false)}
                    >
                        Індивідуальне замовлення
                    </a>

                    <a
                        href="/#about"
                        onClick={() => setOpen(false)}
                    >
                        Про нас
                    </a>

                </nav>

                <div className="header-actions">

                    <Link
                        to="/wishlist"
                        className="header-icon"
                        title="Вішлист"
                    >
                        <Heart
                            size={20}
                            strokeWidth={1.8}
                        />

                        {wishlistCount > 0 && (
                            <span className="header-badge">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <Link
                            to="/account"
                            className="header-account"
                            title="Мій акаунт"
                        >
                            <User size={19} />

                            <span className="header-account-text">
                                Акаунт
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/auth"
                            className="header-account"
                            title="Увійти"
                        >
                            <LogIn size={19} />

                            <span className="header-account-text">
                                Увійти
                            </span>
                        </Link>
                    )}

                    <Link
                        to="/"
                        className="cart-link"
                        title="Кошик"
                    >
                        <ShoppingBag size={20} />

                        {count > 0 && (
                            <span>
                                {count}
                            </span>
                        )}
                    </Link>

                    <div className="language-switcher">
                        <select
                            value={language}
                            onChange={e =>
                                setLanguage(e.target.value)
                            }
                        >
                            <option value="uk">
                                UA
                            </option>

                            <option value="en">
                                EN
                            </option>

                            <option value="es">
                                ES
                            </option>
                        </select>
                    </div>

                    <button
                        className="menu"
                        onClick={() =>
                            setOpen(!open)
                        }
                        aria-label="Menu"
                    >
                        {open
                            ? <X size={23} />
                            : <Menu size={23} />}
                    </button>

                </div>

            </div>

        </header>
    );
}

