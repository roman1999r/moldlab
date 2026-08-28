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

import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import {useLanguage} from "../context/LanguageContext.jsx";


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const {language, t} = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        profile,
        logout
    } = useAuth();
    const {
        wishlist
    } = useWishlist();

    const wishlistCount = Array.isArray(wishlist)
        ? wishlist.length
        : 0;

    useEffect(() => {
        const id = window.location.hash.substring(1);

        if (id) {
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, []);


    function goToSection(id) {
        closeMenu();

        if (location.pathname === '/') {
            document.getElementById(id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            navigate(`/#${id}`);

            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }

    function closeMenu() {
        setMenuOpen(false);
    }

    async function handleLogout() {
        await logout();
        closeMenu();
        navigate('/');
    }

    function isActive(path) {
        return location.pathname === path;
    }

    return (
        <header className="header">
            <div className="container nav">

                {/* LOGO */}
                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    <span className="logo-mark">
                        M
                    </span>

                    <span>
                        old<span>lab</span>
                    </span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <nav
                    className={`nav-links ${
                        menuOpen ? 'open' : ''
                    }`}
                >
                    <Link
                        onClick={() => goToSection('hero')}
                    >
                        {t.nav.main}
                    </Link>

                    <Link

                        onClick={() => goToSection('catalog')}
                    >
                        {t.nav.catalog}
                    </Link>

                    <Link
                        onClick={() => goToSection('custom')}
                    >
                        {t.nav.custom}
                    </Link>

                    <Link
                        onClick={() => goToSection('about')}
                    >
                        {t.nav.about}
                    </Link>


                    {user ? (
                        <>
                            {profile?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    onClick={closeMenu}
                                >
                                    {t.nav.admin_panel}
                                </Link>
                            )}

                            <Link
                                to="/account"
                                onClick={closeMenu}
                            >
                                {t.nav.pagina}
                            </Link>

                            <button
                                type="button"
                                className="button secondary"
                                onClick={handleLogout}
                            >
                                {t.nav.exit}
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            onClick={closeMenu}
                        >
                            Увійти
                        </Link>
                    )}
                </nav>
                <div className="header-actions"><LanguageSwitcher /></div>

                {/* HEADER ACTIONS */}
                <div className="header-actions">


                    {/* CART */}
                    <Link
                        to="/cart"
                        className="cart-link"
                        aria-label="Корзина"
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                fontSize: '18px'
                            }}
                        >
                            🛒
                        </span>
                    </Link>


                    {/* MOBILE MENU */}
                    <button
                        type="button"
                        className="menu"
                        aria-label="Меню"
                        aria-expanded={menuOpen}
                        onClick={() =>
                            setMenuOpen(prev => !prev)
                        }
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>

                </div>

            </div>
        </header>
    );
}