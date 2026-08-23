// import {useEffect, useState} from 'react';
// import {Routes, Route} from 'react-router-dom';
// import Header from './components/Header';
// import Cart from './components/Cart';
// import Home from './pages/Home';
// import Product from './pages/Product';
// import Admin from './pages/Admin';
// import {demoProducts} from './data/products';
// import {supabase} from './lib/supabase';
// import {LanguageProvider} from './context/LanguageContext';
//
// import {AuthProvider} from './context/AuthContext';
// import AdminRoute from './components/AdminRoute';
// import Auth from './pages/Auth';
// import Account from './pages/Account';
// import Wishlist from './pages/Wishlist';
//
//
// const adminPath = import.meta.env.VITE_ADMIN_PATH;
//
// export default function App() {
//     const [cart, setCart] = useState(() => {
//         try {
//             return JSON.parse(localStorage.getItem('cacaoform-cart') || '[]')
//         } catch {
//             return []
//         }
//     });
//
//     // =========================
//     // WISHLIST
//     // =========================
//
//     const [wishlist, setWishlist] = useState(() => {
//         try {
//             return JSON.parse(
//                 localStorage.getItem('moldlab-wishlist') || '[]'
//             );
//         } catch {
//             return [];
//         }
//     });
//     useEffect(() => {
//         localStorage.setItem(
//             'moldlab-wishlist',
//             JSON.stringify(wishlist)
//         );
//     }, [wishlist]);
//
//
//     const [products, setProducts] = useState(demoProducts);
//     useEffect(() => localStorage.setItem('cacaoform-cart', JSON.stringify(cart)), [cart]);
//     useEffect(() => {
//         if (!supabase) return;
//         supabase.from('products').select('*').order('created_at', {ascending: false}).then(({data}) => {
//             if (data?.length) setProducts(data)
//         })
//     }, []);
//     const add = p => setCart(c => {
//         const existing = c.find(x => x.id === p.id);
//         return existing ? c.map(x => x.id === p.id ? {
//             ...x,
//             quantity: (x.quantity || 1) + 1
//         } : x) : [...c, {...p, quantity: 1}]
//     });
//     return <AuthProvider> <LanguageProvider><>
//         {/*<Header count={cart.reduce((s, x) => s + (x.quantity || 1), 0)} />*/}
//         <Header
//             count={cart.reduce(
//                 (s, x) => s + (x.quantity || 1),
//                 0
//             )}
//             wishlistCount={wishlist.length}
//             onWishlist={() => setWishlistOpen(true)}
//         />
//         <Routes>
//         <Route
//             path="/"
//             element={<Home
//                 products={products}
//                 onAdd={add}
//             />}
//         /><Route
//         path="/product/:id"
//         element={<Product
//             products={products}
//             onAdd={add}
//         />}
//     /><Route
//         // path="/manage-x7k9/*"
//         path={`/${adminPath}/*`}
//         element={
//             <AdminRoute>
//                 <Admin />
//             </AdminRoute>
//         }
//
//     />
//             <Route path="/login" element={<Auth />} />
//
//             <Route
//                 path="/account"
//                 element={<Account />}
//             />
//
//             <Route
//                 path="/wishlist"
//                 element={<Wishlist />}
//             />
//
//         </Routes>
//
//
//         {cart.length > 0 && <Cart
//         cart={cart}
//         setCart={setCart}
//     />}
//
//         <Wishlist
//             wishlist={wishlist}
//             setWishlist={setWishlist}
//             products={products}
//         />
//
//         <footer>
//             <div className="container footer">
//                 <span>© 2026 MoldLab</span><span>Silicone molds for chocolate</span>
//             </div>
//         </footer>
//     </>
//     </LanguageProvider>
//     </AuthProvider>
// }


import { useEffect, useState } from 'react';
import {
    Routes,
    Route
} from 'react-router-dom';

import Header from './components/Header';
import Cart from './components/Cart';

import Home from './pages/Home';
import Product from './pages/Product';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';

import { demoProducts } from './data/products';
import { supabase } from './lib/supabase';

import { LanguageProvider } from './context/LanguageContext';

const adminPath =
    import.meta.env.VITE_ADMIN_PATH || 'admin';

export default function App() {

    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('cacaoform-cart') || '[]'
            );
        } catch {
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('moldlab-wishlist') || '[]'
            );
        } catch {
            return [];
        }
    });

    const [products, setProducts] =
        useState(demoProducts);

    const [user, setUser] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            'cacaoform-cart',
            JSON.stringify(cart)
        );
    }, [cart]);

    useEffect(() => {
        localStorage.setItem(
            'moldlab-wishlist',
            JSON.stringify(wishlist)
        );
    }, [wishlist]);

    useEffect(() => {

        if (!supabase) return;

        supabase
            .from('products')
            .select('*')
            .order('created_at', {
                ascending: false
            })
            .then(({ data, error }) => {

                if (error) {
                    console.error(
                        'Products error:',
                        error
                    );
                    return;
                }

                if (data?.length) {
                    setProducts(data);
                }
            });

    }, []);

    useEffect(() => {

        if (!supabase) return;

        supabase.auth
            .getUser()
            .then(({ data }) => {
                setUser(data.user || null);
            });

        const {
            data: listener
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user || null);
            }
        );

        return () => {
            listener?.subscription?.unsubscribe();
        };

    }, []);

    function add(product) {

        setCart(current => {

            const existing =
                current.find(
                    item => item.id === product.id
                );

            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity:
                                (item.quantity || 1) + 1
                        }
                        : item
                );
            }

            return [
                ...current,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    }

    function toggleWishlist(product) {

        setWishlist(current => {

            const exists =
                current.some(
                    item => item.id === product.id
                );

            if (exists) {
                return current.filter(
                    item => item.id !== product.id
                );
            }

            return [
                ...current,
                product
            ];
        });
    }

    const cartCount =
        cart.reduce(
            (sum, item) =>
                sum + (item.quantity || 1),
            0
        );

    return (
        <LanguageProvider>

            <Header
                count={cartCount}
                wishlistCount={wishlist.length}
                wishlist={wishlist}
                onWishlist={toggleWishlist}
                user={user}
            />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            products={products}
                            onAdd={add}
                            wishlist={wishlist}
                            onWishlist={toggleWishlist}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <Product
                            products={products}
                            onAdd={add}
                            wishlist={wishlist}
                            onWishlist={toggleWishlist}
                        />
                    }
                />

                <Route
                    path="/auth"
                    element={<Auth />}
                />

                <Route
                    path="/account"
                    element={<Account />}
                />

                <Route
                    path="/wishlist"
                    element={
                        <Wishlist
                            wishlist={wishlist}
                            setWishlist={setWishlist}
                            onAdd={add}
                        />
                    }
                />

                <Route
                    path={`/${adminPath}/*`}
                    element={<Admin />}
                />

            </Routes>

            {cart.length > 0 && (
                <Cart
                    cart={cart}
                    setCart={setCart}
                />
            )}

            <footer>
                <div className="container footer">
                    <span>
                        © 2026 MoldLab
                    </span>

                    <span>
                        Silicone molds for chocolate
                    </span>
                </div>
            </footer>

        </LanguageProvider>
    );
}