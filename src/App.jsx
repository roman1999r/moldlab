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

// ДОБРЕ
// import { useEffect, useState } from 'react';
// import {
//     Routes,
//     Route
// } from 'react-router-dom';
//
// import Header from './components/Header';
// import Cart from './components/Cart';
//
// import Home from './pages/Home';
// import Product from './pages/Product';
// import Admin from './pages/Admin';
// import Auth from './pages/Auth';
// import Account from './pages/Account';
// import Wishlist from './pages/Wishlist';
//
// import { supabase } from './lib/supabase';
// import { useAuth } from './context/AuthContext';
// import AdminRoute from "./components/AdminRoute.jsx";
//
// const adminPath =
//     import.meta.env.VITE_ADMIN_PATH || 'admin';
//
// export default function App() {
//     const { user } = useAuth();
//
//     const [cart, setCart] = useState(() => {
//         try {
//             return JSON.parse(
//                 localStorage.getItem('cacaoform-cart') || '[]'
//             );
//         } catch {
//             return [];
//         }
//     });
//
//     const [products, setProducts] = useState([]);
//     const [productsLoading, setProductsLoading] =
//         useState(true);
//     const [productsError, setProductsError] =
//         useState('');
//
//
//     useEffect(() => {
//         window.history.scrollRestoration = 'manual';
//
//         return () => {
//             window.history.scrollRestoration = 'auto';
//         };
//     }, []);
//
//     useEffect(() => {
//         localStorage.setItem(
//             'cacaoform-cart',
//             JSON.stringify(cart)
//         );
//     }, [cart]);
//
//     // useEffect(() => {
//     //     async function loadProducts() {
//     //         if (!supabase) {
//     //             setProductsError(
//     //                 'Supabase не підключений.'
//     //             );
//     //             setProductsLoading(false);
//     //             return;
//     //         }
//     //
//     //         setProductsLoading(true);
//     //         setProductsError('');
//     //
//     //         console.log('Loading products from Supabase...');
//     //
//     //         const {
//     //             data,
//     //             error
//     //         } = await supabase
//     //             .from('products')
//     //             .select('*')
//     //             .order('created_at', {
//     //                 ascending: false
//     //             });
//     //
//     //         console.log('PRODUCTS:', data);
//     //         console.log('PRODUCTS ERROR:', error);
//     //
//     //         if (error) {
//     //             setProducts([]);
//     //             setProductsError(
//     //                 error.message ||
//     //                 'Помилка завантаження товарів.'
//     //             );
//     //         } else {
//     //             setProducts(data || []);
//     //         }
//     //
//     //         setProductsLoading(false);
//     //     }
//     //
//     //     loadProducts();
//     // }, []);
//
//     useEffect(() => {
//         async function loadProducts() {
//
//             if (!supabase) {
//                 setProductsError('Supabase не підключений.');
//                 setProductsLoading(false);
//                 return;
//             }
//
//             const result = await supabase
//                 .from('products')
//                 .select(`
//     *,
//     product_sizes (
//         id,
//         size,
//         stock
//     )
// `)
//
//
//             if (result.error) {
//                 setProducts([]);
//                 setProductsError(result.error.message);
//             } else {
//                 setProducts(result.data || []);
//             }
//
//             setProductsLoading(false);
//
//
//         }
//
//         loadProducts();
//     }, []);
//
//     function addToCart(product, selectedSize) {
//         setCart(current => {
//             const existing = current.find(
//                 item =>
//                     item.id === product.id &&
//                     item.selectedSize === selectedSize
//             );
//
//             if (existing) {
//                 return current.map(item =>
//                     item.id === product.id &&
//                     item.selectedSize === selectedSize
//                         ? {
//                             ...item,
//                             quantity:
//                                 (item.quantity || 1) + 1
//                         }
//                         : item
//                 );
//             }
//
//             return [
//                 ...current,
//                 {
//                     ...product,
//                     selectedSize,
//                     quantity: 1
//                 }
//             ];
//         });
//     }
//
//     function updateCartQuantity(
//         productId,
//         selectedSize,
//         quantity
//     ) {
//         if (quantity < 1) {
//             removeFromCart(
//                 productId,
//                 selectedSize
//             );
//
//             return;
//         }
//
//         setCart(current =>
//             current.map(item =>
//                 item.id === productId &&
//                 item.selectedSize === selectedSize
//                     ? {
//                         ...item,
//                         quantity
//                     }
//                     : item
//             )
//         );
//     }
//
//     function removeFromCart(
//         productId,
//         selectedSize
//     ) {
//         setCart(current =>
//             current.filter(
//                 item =>
//                     !(
//                         item.id === productId &&
//                         item.selectedSize === selectedSize
//                     )
//             )
//         );
//     }
//
//     function clearCart() {
//         setCart([]);
//     }
//
//     return (
//         <>
//             <Header
//                 count={cart.reduce(
//                     (sum, item) =>
//                         sum + (item.quantity || 1),
//                     0
//                 )}
//             />
//
//             <Routes>
//
//                 <Route
//                     path="/"
//                     element={
//                         <Home
//                             products={products}
//                             onAdd={addToCart}
//                             loading={productsLoading}
//                             error={productsError}
//                         />
//                     }
//                 />
//
//                 <Route
//                     path="/product/:id"
//                     element={
//                         <Product
//                             products={products}
//                             onAdd={addToCart}
//                         />
//                     }
//                 />
//
//                 <Route
//                     path="/login"
//                     element={<Auth />}
//                 />
//
//                 <Route
//                     path="/admin"
//                     element={
//                         <AdminRoute>
//                             <Admin />
//                         </AdminRoute>
//                     }
//                 />
//
//                 <Route
//                     path="/account"
//                     element={<Account />}
//                 />
//
//                 <Route
//                     path="/wishlist"
//                     element={<Wishlist />}
//                 />
//
//                 <Route
//                     path={`/${adminPath}/*`}
//                     element={<Admin />}
//                 />
//
//             </Routes>
//
//             {cart.length > 0 && (
//                 <Cart
//                     cart={cart}
//                     setCart={setCart}
//                 />
//             )}
//
//             <footer>
//                 <div className="container footer">
//                     <span>
//                         © 2026 MoldLab
//                     </span>
//
//                     <span>
//                         Silicone molds for chocolate
//                     </span>
//                 </div>
//             </footer>
//         </>
//     );
// }



import { useLocation } from 'react-router-dom';

import { trackPageView } from './lib/analytics';
import { useEffect, useState,useRef } from 'react';
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
import AdminRoute from './components/AdminRoute.jsx';

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
    const [cartNotification, setCartNotification] = useState(null);
    const notificationTimer = useRef(null);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] =
        useState(true);
    const [productsError, setProductsError] =
        useState('');

    /*
     * -----------------------------------------
     * SCROLL
     * -----------------------------------------
     */

    useEffect(() => {
        window.history.scrollRestoration = 'manual';

        return () => {
            window.history.scrollRestoration = 'auto';
        };
    }, []);

    /*
     * -----------------------------------------
     * SAVE CART
     * -----------------------------------------
     */

    useEffect(() => {
        localStorage.setItem(
            'cacaoform-cart',
            JSON.stringify(cart)
        );
    }, [cart]);

    /*
     * -----------------------------------------
     * LOAD PRODUCTS
     * -----------------------------------------
     */

    useEffect(() => {
        async function loadProducts() {
            if (!supabase) {
                setProductsError(
                    'Supabase не підключений.'
                );

                setProductsLoading(false);

                return;
            }

            setProductsLoading(true);
            setProductsError('');

            const {
                data,
                error
            } = await supabase
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
                });

            if (error) {
                console.error(
                    'LOAD PRODUCTS ERROR:',
                    error
                );

                setProducts([]);
                setProductsError(
                    error.message ||
                    'Помилка завантаження товарів.'
                );
            } else {
                setProducts(data || []);
            }

            setProductsLoading(false);
        }

        loadProducts();
    }, []);


    useEffect(() => {
        const channel = supabase
            .channel('product-stock')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'product_sizes',
                },
                (payload) => {
                    setProducts((currentProducts) =>
                        currentProducts.map((product) => ({
                            ...product,
                            product_sizes:
                                product.product_sizes?.map((size) =>
                                    size.id === payload.new.id
                                        ? {
                                            ...size,
                                            stock: payload.new.stock,
                                        }
                                        : size
                                ),
                        }))
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    /*
     * -----------------------------------------
     * ADD TO CART
     * -----------------------------------------
     */

    function addToCart(product, selectedSize = null) {
        const normalizedSize =
            selectedSize !== null &&
            selectedSize !== undefined &&
            selectedSize !== ''
                ? String(selectedSize)
                : null;

        setCartNotification({
            message: `${product.name}  додано до корзини`
        });

        clearTimeout(notificationTimer.current);

        notificationTimer.current = setTimeout(() => {
            setCartNotification(null);
        }, 2500);

        console.log('========== APP ADD TO CART ==========');
        console.log('PRODUCT:', product);
        console.log('PRODUCT ID:', product.id);
        console.log('SELECTED SIZE:', normalizedSize);

        setCart(current => {

            const existing = current.find(item => {

                const itemSize =
                    item.selectedSize !== null &&
                    item.selectedSize !== undefined &&
                    item.selectedSize !== ''
                        ? String(item.selectedSize)
                        : null;

                return (
                    String(item.id) === String(product.id) &&
                    itemSize === normalizedSize
                );
            });

            /*
             * Такий самий товар + такий самий розмір
             * => збільшуємо quantity
             */

            if (existing) {
                console.log(
                    'EXISTING CART ITEM -> INCREASE QUANTITY'
                );

                return current.map(item => {

                    const itemSize =
                        item.selectedSize !== null &&
                        item.selectedSize !== undefined &&
                        item.selectedSize !== ''
                            ? String(item.selectedSize)
                            : null;

                    if (
                        String(item.id) === String(product.id) &&
                        itemSize === normalizedSize
                    ) {
                        return {
                            ...item,
                            quantity:
                                Number(item.quantity || 0) + 1
                        };
                    }

                    return item;
                });
            }

            /*
             * Інший розмір
             * => НОВИЙ рядок у корзині
             */

            console.log(
                'NEW CART ITEM'
            );

            return [
                ...current,
                {
                    ...product,

                    /*
                     * Ось тут зберігаємо розмір
                     */
                    selectedSize: normalizedSize,

                    quantity: 1
                }
            ];
        });
    }

    /*
     * -----------------------------------------
     * UPDATE CART QUANTITY
     * -----------------------------------------
     */

    function updateCartQuantity(
        productId,
        selectedSize,
        quantity
    ) {
        const nextQuantity = Number(quantity);

        if (!Number.isFinite(nextQuantity)) {
            return;
        }

        const normalizedSize =
            selectedSize !== null &&
            selectedSize !== undefined &&
            selectedSize !== ''
                ? String(selectedSize)
                : null;

        if (nextQuantity < 1) {
            removeFromCart(
                productId,
                normalizedSize
            );

            return;
        }

        setCart(current =>
            current.map(item => {

                const itemSize =
                    item.selectedSize !== null &&
                    item.selectedSize !== undefined &&
                    item.selectedSize !== ''
                        ? String(item.selectedSize)
                        : null;

                if (
                    String(item.id) !== String(productId) ||
                    itemSize !== normalizedSize
                ) {
                    return item;
                }

                const sizes =
                    Array.isArray(item.product_sizes)
                        ? item.product_sizes
                        : [];

                const selectedSizeData =
                    sizes.find(
                        size =>
                            String(size.size) ===
                            normalizedSize
                    );

                const stock =
                    selectedSizeData
                        ? Number(selectedSizeData.stock)
                        : null;

                if (
                    stock !== null &&
                    Number.isFinite(stock) &&
                    nextQuantity > stock
                ) {
                    return {
                        ...item,
                        quantity: stock
                    };
                }

                return {
                    ...item,
                    quantity: nextQuantity
                };
            })
        );
    }
    /*
     * -----------------------------------------
     * REMOVE FROM CART
     * -----------------------------------------
     */

    function removeFromCart(
        productId,
        selectedSize = null
    ) {
        const normalizedSize =
            selectedSize !== null &&
            selectedSize !== undefined &&
            selectedSize !== ''
                ? String(selectedSize)
                : null;

        setCart(current =>
            current.filter(item => {

                const itemSize =
                    item.selectedSize !== null &&
                    item.selectedSize !== undefined &&
                    item.selectedSize !== ''
                        ? String(item.selectedSize)
                        : null;

                return !(
                    String(item.id) === String(productId) &&
                    itemSize === normalizedSize
                );
            })
        );
    }

    /*
     * -----------------------------------------
     * CLEAR CART
     * -----------------------------------------
     */



    function clearCart() {
        setCart([]);
    }

    /*
     * -----------------------------------------
     * CHECKOUT
     * -----------------------------------------
     */

    function handleCheckout() {
        /*
         * Поки просто переходимо
         * до наступного етапу.
         *
         * Тут пізніше буде:
         *
         * /checkout
         *
         * де користувач введе:
         * - ім'я
         * - телефон
         * - email
         * - адресу
         * - спосіб доставки
         * - коментар
         */

        console.log(
            'CHECKOUT CART:',
            cart
        );

        /*
         * Тимчасово можна показати alert.
         */

        alert(
            'Оформлення замовлення буде додано наступним кроком.'
        );
    }

    /*
     * -----------------------------------------
     * CART COUNT
     * -----------------------------------------
     */

    const cartCount =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(
                    item.quantity || 0
                ),
            0
        );

    /*
     * -----------------------------------------
     * RENDER
     * -----------------------------------------
     */

    return (
        <>
            <Header
                count={cartCount}
            />

            {cartNotification && (
                <div className="cart-notification">
                    <span>✓</span>
                    <span>{cartNotification.message}</span>
                </div>
            )}

            <Routes>

                <Route
                    path="/"
                    element={
                        <Home
                            products={products}
                            onAdd={addToCart}
                            loading={
                                productsLoading
                            }
                            error={
                                productsError
                            }
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
                    element={
                        <Auth />
                    }
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
                    element={
                        <Account />
                    }
                />

                <Route
                    path="/wishlist"
                    element={
                        <Wishlist />
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            updateCartQuantity={updateCartQuantity}
                            removeFromCart={removeFromCart}
                            clearCart={clearCart}
                        />
                    }
                />

                <Route
                    path={`/${adminPath}/*`}
                    element={
                        <Admin />
                    }
                />

            </Routes>

            {/* CART */}

            {/*{cart.length > 0 && (*/}
            {/*    <Cart*/}
            {/*        cart={cart}*/}

            {/*        updateCartQuantity={*/}
            {/*            updateCartQuantity*/}
            {/*        }*/}

            {/*        removeFromCart={*/}
            {/*            removeFromCart*/}
            {/*        }*/}

            {/*        clearCart={*/}
            {/*            clearCart*/}
            {/*        }*/}

            {/*        onCheckout={*/}
            {/*            handleCheckout*/}
            {/*        }*/}
            {/*    />*/}
            {/*)}*/}

            {/* FOOTER */}

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