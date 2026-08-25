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

import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';
import AdminRoute from "./components/AdminRoute.jsx";

const adminPath =
    import.meta.env.VITE_ADMIN_PATH || 'admin';

export default function App() {
    const { user } = useAuth();

    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem('cacaoform-cart') || '[]'
            );
        } catch {
            return [];
        }
    });

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] =
        useState(true);
    const [productsError, setProductsError] =
        useState('');


    useEffect(() => {
        window.history.scrollRestoration = 'manual';

        return () => {
            window.history.scrollRestoration = 'auto';
        };
    }, []);

    useEffect(() => {
        localStorage.setItem(
            'cacaoform-cart',
            JSON.stringify(cart)
        );
    }, [cart]);

    // useEffect(() => {
    //     async function loadProducts() {
    //         if (!supabase) {
    //             setProductsError(
    //                 'Supabase не підключений.'
    //             );
    //             setProductsLoading(false);
    //             return;
    //         }
    //
    //         setProductsLoading(true);
    //         setProductsError('');
    //
    //         console.log('Loading products from Supabase...');
    //
    //         const {
    //             data,
    //             error
    //         } = await supabase
    //             .from('products')
    //             .select('*')
    //             .order('created_at', {
    //                 ascending: false
    //             });
    //
    //         console.log('PRODUCTS:', data);
    //         console.log('PRODUCTS ERROR:', error);
    //
    //         if (error) {
    //             setProducts([]);
    //             setProductsError(
    //                 error.message ||
    //                 'Помилка завантаження товарів.'
    //             );
    //         } else {
    //             setProducts(data || []);
    //         }
    //
    //         setProductsLoading(false);
    //     }
    //
    //     loadProducts();
    // }, []);

    useEffect(() => {
        async function loadProducts() {

            if (!supabase) {
                setProductsError('Supabase не підключений.');
                setProductsLoading(false);
                return;
            }

            const result = await supabase
                .from('products')
                .select('*');


            if (result.error) {
                setProducts([]);
                setProductsError(result.error.message);
            } else {
                setProducts(result.data || []);
            }

            setProductsLoading(false);


        }

        loadProducts();
    }, []);

    function addToCart(product, selectedSize) {
        setCart(current => {
            const existing = current.find(
                item =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize
            );

            if (existing) {
                return current.map(item =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize
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
                    selectedSize,
                    quantity: 1
                }
            ];
        });
    }

    return (
        <>
            <Header
                count={cart.reduce(
                    (sum, item) =>
                        sum + (item.quantity || 1),
                    0
                )}
            />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            products={products}
                            onAdd={addToCart}
                            loading={productsLoading}
                            error={productsError}
                        />
                    }
                />

                <Route
                    path="/product/:id"
                    element={
                        <Product
                            products={products}
                            onAdd={addToCart}
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Auth />}
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/account"
                    element={<Account />}
                />

                <Route
                    path="/wishlist"
                    element={<Wishlist />}
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
        </>
    );
}