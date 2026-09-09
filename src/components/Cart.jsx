// import {
//     Minus,
//     Plus,
//     Trash2,
//     ShoppingBag
// } from 'lucide-react';
//
// export default function Cart({
//                                  cart,
//                                  updateCartQuantity,
//                                  removeFromCart,
//                                  clearCart
//                              }) {
//     if (!cart?.length) {
//         return null;
//     }
//
//     const total = cart.reduce(
//         (sum, item) =>
//             sum +
//             Number(item.price || 0) *
//             Number(item.quantity || 0),
//         0
//     );
//
//     const count = cart.reduce(
//         (sum, item) =>
//             sum +
//             Number(item.quantity || 0),
//         0
//     );
//
//     return (
//         <aside className="cart">
//
//             <div className="cart-header">
//
//                 <div>
//                     <h2>
//                         Корзина
//                     </h2>
//
//                     <span>
//                         {count}{' '}
//                         {count === 1
//                             ? 'товар'
//                             : 'товари'}
//                     </span>
//                 </div>
//
//                 <button
//                     type="button"
//                     onClick={clearCart}
//                     className="cart-clear"
//                 >
//                     Очистити
//                 </button>
//
//             </div>
//
//             <div className="cart-items">
//
//                 {cart.map(item => {
//
//                     const quantity =
//                         Number(
//                             item.quantity || 1
//                         );
//
//                     const stock =
//                         Number(
//                             item.stock
//                         );
//
//                     const maxReached =
//                         Number.isFinite(stock) &&
//                         quantity >= stock;
//
//                     return (
//                         <div
//                             className="cart-item"
//                             key={`${item.id}-${item.selectedSize}`}
//                         >
//
//                             {/* IMAGE */}
//
//                             <div className="cart-item-image">
//
//                                 {item.image_url ? (
//                                     <img
//                                         src={
//                                             item.image_url
//                                         }
//                                         alt={
//                                             item.name
//                                         }
//                                     />
//                                 ) : (
//                                     <ShoppingBag
//                                         size={20}
//                                     />
//                                 )}
//
//                             </div>
//
//                             {/* INFO */}
//
//                             <div className="cart-item-info">
//
//                                 <strong>
//                                     {item.name}
//                                 </strong>
//
//                                 <span>
//                                     Розмір:{' '}
//                                     <b>
//                                         {
//                                             item.selectedSize
//                                         }
//                                     </b>
//                                 </span>
//
//                                 <span>
//                                     €{
//                                     Number(
//                                         item.price ||
//                                         0
//                                     ).toFixed(2)
//                                 }
//                                 </span>
//
//                                 {/* QUANTITY */}
//
//                                 <div className="cart-quantity">
//
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             updateCartQuantity(
//                                                 item.id,
//                                                 item.selectedSize,
//                                                 quantity - 1
//                                             )
//                                         }
//                                         disabled={
//                                             quantity <= 1
//                                         }
//                                     >
//                                         <Minus
//                                             size={14}
//                                         />
//                                     </button>
//
//                                     <span>
//                                         {quantity}
//                                     </span>
//
//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             updateCartQuantity(
//                                                 item.id,
//                                                 item.selectedSize,
//                                                 quantity + 1
//                                             )
//                                         }
//                                         disabled={
//                                             maxReached
//                                         }
//                                     >
//                                         <Plus
//                                             size={14}
//                                         />
//                                     </button>
//
//                                 </div>
//
//                                 {maxReached && (
//                                     <small className="cart-stock-warning">
//                                         Максимальна кількість:
//                                         {' '}
//                                         {stock}
//                                     </small>
//                                 )}
//
//                             </div>
//
//                             {/* PRICE */}
//
//                             <div className="cart-item-right">
//
//                                 <strong>
//                                     €
//                                     {(
//                                         Number(
//                                             item.price ||
//                                             0
//                                         ) *
//                                         quantity
//                                     ).toFixed(2)}
//                                 </strong>
//
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         removeFromCart(
//                                             item.id,
//                                             item.selectedSize
//                                         )
//                                     }
//                                     className="cart-remove"
//                                     aria-label="Видалити"
//                                 >
//                                     <Trash2
//                                         size={17}
//                                     />
//                                 </button>
//
//                             </div>
//
//                         </div>
//                     );
//                 })}
//
//             </div>
//
//             {/* TOTAL */}
//
//             <div className="cart-footer">
//
//                 <div className="cart-total">
//
//                     <span>
//                         Разом
//                     </span>
//
//                     <strong>
//                         €
//                         {total.toFixed(2)}
//                     </strong>
//
//                 </div>
//
//                 <button
//                     type="button"
//                     className="button primary cart-checkout"
//                 >
//                     Оформити замовлення
//                 </button>
//
//             </div>
//
//         </aside>
//     );
// }




//
//
// import {
//     Minus,
//     Plus,
//     Trash2,
//     ShoppingBag
// } from 'lucide-react';
//
// export default function Cart({
//                                  cart,
//                                  updateCartQuantity,
//                                  removeFromCart,
//                                  clearCart
//                              }) {
//     if (!cart?.length) {
//         return null;
//     }
//
//     const total = cart.reduce(
//         (sum, item) => {
//             return (
//                 sum +
//                 Number(item.price || 0) *
//                 Number(item.quantity || 0)
//             );
//         },
//         0
//     );
//
//     const count = cart.reduce(
//         (sum, item) => {
//             return (
//                 sum +
//                 Number(item.quantity || 0)
//             );
//         },
//         0
//     );
//
//     return (
//         <aside className="cart">
//
//             {/* HEADER */}
//
//             <div className="cart-header">
//
//                 <div>
//                     <h2>
//                         Корзина
//                     </h2>
//
//                     <span>
//                         {count}{' '}
//                         {count === 1
//                             ? 'товар'
//                             : count < 5
//                                 ? 'товари'
//                                 : 'товарів'}
//                     </span>
//                 </div>
//
//                 <button
//                     type="button"
//                     onClick={clearCart}
//                     className="cart-clear"
//                 >
//                     Очистити
//                 </button>
//
//             </div>
//
//             {/* ITEMS */}
//
//             <div className="cart-items">
//
//                 {cart.map(item => {
//
//                     const quantity =
//                         Number(item.quantity || 1);
//
//                     /*
//                      * Якщо товар має розміри,
//                      * знаходимо stock саме
//                      * вибраного розміру.
//                      */
//
//                     const sizes =
//                         Array.isArray(
//                             item.product_sizes
//                         )
//                             ? item.product_sizes
//                             : [];
//
//                     const selectedSizeData =
//                         sizes.find(
//                             size =>
//                                 size.size ===
//                                 item.selectedSize
//                         );
//
//                     /*
//                      * Якщо є розміри —
//                      * використовуємо stock
//                      * вибраного розміру.
//                      *
//                      * Якщо розмірів немає —
//                      * використовуємо item.stock.
//                      */
//
//                     const stock = sizes.length > 0
//                         ? Number(
//                             selectedSizeData?.stock || 0
//                         )
//                         : Number(
//                             item.stock || 0
//                         );
//
//                     /*
//                      * Чи досягнута максимальна
//                      * кількість.
//                      */
//
//                     const maxReached =
//                         stock > 0 &&
//                         quantity >= stock;
//
//                     /*
//                      * Чи товар взагалі є
//                      * в наявності.
//                      */
//
//                     const outOfStock =
//                         stock <= 0;
//
//                     return (
//                         <div
//                             className="cart-item"
//                             key={
//                                 `${item.id}-${item.selectedSize || 'default'}`
//                             }
//                         >
//
//                             {/* IMAGE */}
//
//                             <div className="cart-item-image">
//
//                                 {item.image_url ? (
//                                     <img
//                                         src={
//                                             item.image_url
//                                         }
//                                         alt={
//                                             item.name
//                                         }
//                                     />
//                                 ) : (
//                                     <ShoppingBag
//                                         size={20}
//                                     />
//                                 )}
//
//                             </div>
//
//                             {/* INFO */}
//
//                             <div className="cart-item-info">
//
//                                 <strong>
//                                     {item.name}
//                                 </strong>
//
//                                 {/* SIZE */}
//
//                                 {item.selectedSize && (
//                                     <span>
//                                         Розмір:{' '}
//                                         <b>
//                                             {
//                                                 item.selectedSize
//                                             }
//                                         </b>
//                                     </span>
//                                 )}
//
//                                 {/* PRICE */}
//
//                                 <span>
//                                     €{
//                                     Number(
//                                         item.price || 0
//                                     ).toFixed(2)
//                                 }
//                                 </span>
//
//                                 {/* QUANTITY */}
//
//                                 <div className="cart-quantity">
//
//                                     {/* MINUS */}
//
//                                     <button
//                                         type="button"
//                                         disabled={
//                                             quantity <= 1
//                                         }
//                                         onClick={() =>
//                                             updateCartQuantity(
//                                                 item.id,
//                                                 item.selectedSize,
//                                                 quantity - 1
//                                             )
//                                         }
//                                     >
//                                         <Minus
//                                             size={14}
//                                         />
//                                     </button>
//
//                                     <span>
//                                         {quantity}
//                                     </span>
//
//                                     {/* PLUS */}
//
//                                     <button
//                                         type="button"
//                                         disabled={
//                                             maxReached ||
//                                             outOfStock
//                                         }
//                                         onClick={() =>
//                                             updateCartQuantity(
//                                                 item.id,
//                                                 item.selectedSize,
//                                                 quantity + 1
//                                             )
//                                         }
//                                     >
//                                         <Plus
//                                             size={14}
//                                         />
//                                     </button>
//
//                                 </div>
//
//                                 {/* STOCK MESSAGE */}
//
//                                 {outOfStock ? (
//                                     <small className="cart-stock-warning">
//                                         Немає в наявності
//                                     </small>
//                                 ) : maxReached ? (
//                                     <small className="cart-stock-warning">
//                                         Максимальна кількість:{' '}
//                                         {stock}
//                                     </small>
//                                 ) : (
//                                     <small className="cart-stock">
//                                         Залишилось:{' '}
//                                         {stock} шт.
//                                     </small>
//                                 )}
//
//                             </div>
//
//                             {/* RIGHT */}
//
//                             <div className="cart-item-right">
//
//                                 {/* ITEM TOTAL */}
//
//                                 <strong>
//                                     €
//                                     {(
//                                         Number(
//                                             item.price || 0
//                                         ) *
//                                         quantity
//                                     ).toFixed(2)}
//                                 </strong>
//
//                                 {/* REMOVE */}
//
//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         removeFromCart(
//                                             item.id,
//                                             item.selectedSize
//                                         )
//                                     }
//                                     className="cart-remove"
//                                     aria-label="Видалити"
//                                 >
//                                     <Trash2
//                                         size={17}
//                                     />
//                                 </button>
//
//                             </div>
//
//                         </div>
//                     );
//                 })}
//
//             </div>
//
//             {/* FOOTER */}
//
//             <div className="cart-footer">
//
//                 <div className="cart-total">
//
//                     <span>
//                         Разом
//                     </span>
//
//                     <strong>
//                         €
//                         {total.toFixed(2)}
//                     </strong>
//
//                 </div>
//
//                 <button
//                     type="button"
//                     className="button primary cart-checkout"
//                 >
//                     Оформити замовлення
//                 </button>
//
//             </div>
//
//         </aside>
//     );
// }














// import {
//     Minus,
//     Plus,
//     Trash2,
//     ShoppingBag
// } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
//
// export default function Cart({
//                                  cart,
//                                  updateCartQuantity,
//                                  removeFromCart,
//                                  clearCart
//                              }) {
//     const navigate = useNavigate();
//     if (!cart?.length) {
//         return (
//             <main className="cart-page">
//                 <div className="cart-breadcrumb">
//                     <div className="container">
//                         <Link to="/">Головна</Link>
//                         <span>›</span>
//                         <span>Корзина</span>
//                     </div>
//                 </div>
//
//                 <div className="container cart-empty">
//                     <ShoppingBag size={48} />
//
//                     <h1>Ваша корзина порожня</h1>
//
//                     <p>
//                         Додайте товари до корзини,
//                         щоб оформити замовлення.
//                     </p>
//
//                     <Link
//                         to="/"
//                         className="button primary"
//                     >
//                         Перейти до магазину
//                     </Link>
//                 </div>
//             </main>
//         );
//     }
//
//     /*
//      * -----------------------------------------
//      * TOTAL
//      * -----------------------------------------
//      */
//
//     const total = cart.reduce(
//         (sum, item) => {
//             return (
//                 sum +
//                 Number(item.price || 0) *
//                 Number(item.quantity || 0)
//             );
//         },
//         0
//     );
//
//     /*
//      * -----------------------------------------
//      * COUNT
//      * -----------------------------------------
//      */
//
//     const count = cart.reduce(
//         (sum, item) => {
//             return (
//                 sum +
//                 Number(item.quantity || 0)
//             );
//         },
//         0
//     );
//
//     /*
//      * -----------------------------------------
//      * CHECKOUT
//      * -----------------------------------------
//      */
//
//     function handleCheckout() {
//         navigate('/checkout');
//     }
//
//     /*
//      * -----------------------------------------
//      * RENDER
//      * -----------------------------------------
//      */
//
//     return (
//         <main className="cart-page">
//
//             {/* =================================
//                 BREADCRUMB
//             ================================= */}
//
//             <div className="cart-breadcrumb">
//
//                 <div className="container">
//
//                     <Link to="/">
//                         Головна
//                     </Link>
//
//                     <span>›</span>
//
//                     <span>
//                         Корзина
//                     </span>
//
//                 </div>
//
//             </div>
//
//             {/* =================================
//                 CONTENT
//             ================================= */}
//
//             <div className="container cart-layout">
//
//                 {/* =================================
//                     LEFT
//                 ================================= */}
//
//                 <section className="cart-products">
//
//                     <div className="cart-title-row">
//
//                         <div>
//                             <h1>
//                                 Ваша корзина товарів
//                             </h1>
//
//                             <p>
//                                 {count}{' '}
//                                 {count === 1
//                                     ? 'товар'
//                                     : count < 5
//                                         ? 'товари'
//                                         : 'товарів'}
//                             </p>
//                         </div>
//
//                         <button
//                             type="button"
//                             className="cart-clear"
//                             onClick={clearCart}
//                         >
//                             Очистити корзину
//                         </button>
//
//                     </div>
//
//                     {/* =================================
//                         PRODUCTS
//                     ================================= */}
//
//                     <div className="cart-list">
//
//                         {cart.map((item, index) => {
//                             console.log(item)
//
//                             const quantity =
//                                 Number(
//                                     item.quantity || 1
//                                 );
//
//                             /*
//                              * Розміри товару
//                              */
//
//                             const sizes =
//                                 Array.isArray(
//                                     item.product_sizes
//                                 )
//                                     ? item.product_sizes
//                                     : [];
//
//                             /*
//                              * Stock конкретного
//                              * вибраного розміру
//                              */
//
//                             const selectedSizeData =
//                                 sizes.find(
//                                     size =>
//                                         size.size ===
//                                         item.selectedSize
//                                 );
//
//                             /*
//                              * Якщо товар має
//                              * розміри —
//                              * беремо stock
//                              * вибраного розміру.
//                              */
//
//                             let stock;
//
//                             if (sizes.length > 0) {
//                                 stock = Number(
//                                     selectedSizeData?.stock || 0
//                                 );
//                             } else {
//                                 stock = Number(
//                                     item.stock || 0
//                                 );
//                             }
//
//                             const maxReached =
//                                 stock > 0 &&
//                                 quantity >= stock;
//
//                             /*
//                              * Унікальний key.
//                              *
//                              * Якщо два однакові товари
//                              * випадково потрапили
//                              * в корзину — index
//                              * гарантує унікальність.
//                              */
//
//                             const itemKey =
//                                 `${item.id}-${item.selectedSize || 'default'}-${index}`;
//
//                             return (
//                                 <article
//                                     className="cart-product"
//                                     key={itemKey}
//                                 >
//
//                                     {/* IMAGE */}
//
//                                     <div className="cart-product-image">
//
//                                         {item.image_url ? (
//                                             <img
//                                                 src={
//                                                     item.image_url
//                                                 }
//                                                 alt={
//                                                     item.name
//                                                 }
//                                             />
//                                         ) : (
//                                             <ShoppingBag
//                                                 size={28}
//                                             />
//                                         )}
//
//                                     </div>
//
//                                     {/* INFO */}
//
//                                     <div className="cart-product-info">
//
//                                         <Link
//                                             to={`/product/${item.id}`}
//                                             className="cart-product-name"
//                                         >
//                                             {item.name}
//                                         </Link>
//
//                                         {item.category && (
//                                             <span className="cart-product-category">
//                                                 {item.category}
//                                             </span>
//                                         )}
//
//                                         {item.selectedSize && (
//                                             <span className="cart-product-size">
//                                                 Розмір:{' '}
//                                                 <strong>
//                                                     {
//                                                         item.selectedSize
//                                                     }
//                                                 </strong>
//                                             </span>
//                                         )}
//
//                                         <span className="cart-product-price">
//                                             €
//                                             {Number(
//                                                 item.price || 0
//                                             ).toFixed(2)}
//                                         </span>
//
//                                         {/* QUANTITY */}
//
//                                         <div className="cart-quantity">
//
//                                             <button
//                                                 type="button"
//                                                 disabled={
//                                                     quantity <= 1
//                                                 }
//                                                 onClick={() =>
//                                                     updateCartQuantity(
//                                                         item.id,
//                                                         item.selectedSize,
//                                                         quantity - 1
//                                                     )
//                                                 }
//                                                 aria-label="Зменшити кількість"
//                                             >
//                                                 <Minus
//                                                     size={15}
//                                                 />
//                                             </button>
//
//                                             <span>
//                                                 {quantity}
//                                             </span>
//
//                                             <button
//                                                 type="button"
//                                                 disabled={
//                                                     maxReached ||
//                                                     stock <= 0
//                                                 }
//                                                 onClick={() =>
//                                                     updateCartQuantity(
//                                                         item.id,
//                                                         item.selectedSize,
//                                                         quantity + 1
//                                                     )
//                                                 }
//                                                 aria-label="Збільшити кількість"
//                                             >
//                                                 <Plus
//                                                     size={15}
//                                                 />
//                                             </button>
//
//                                         </div>
//
//                                         {/* STOCK */}
//
//                                         {stock > 0 && (
//                                             <small className="cart-stock">
//                                                 В наявності:{' '}
//                                                 {stock} шт.
//                                             </small>
//                                         )}
//
//                                     </div>
//
//                                     {/* RIGHT */}
//
//                                     <div className="cart-product-right">
//
//                                         <strong className="cart-product-total">
//                                             €
//                                             {(
//                                                 Number(
//                                                     item.price || 0
//                                                 ) *
//                                                 quantity
//                                             ).toFixed(2)}
//                                         </strong>
//
//                                         <button
//                                             type="button"
//                                             className="cart-remove"
//                                             onClick={() =>
//                                                 removeFromCart(
//                                                     item.id,
//                                                     item.selectedSize
//                                                 )
//                                             }
//                                             aria-label="Видалити товар"
//                                             title="Видалити товар"
//                                         >
//                                             <Trash2
//                                                 size={18}
//                                             />
//                                         </button>
//
//                                     </div>
//
//                                 </article>
//                             );
//                         })}
//
//                     </div>
//
//                     {/* CONTINUE SHOPPING */}
//
//                     <Link
//                         to="/"
//                         className="cart-continue"
//                     >
//                         ← Продовжити покупки
//                     </Link>
//
//                 </section>
//
//                 {/* =================================
//                     SUMMARY
//                 ================================= */}
//
//                 <aside className="cart-summary">
//
//                     <h2>
//                         Сума замовлення
//                     </h2>
//
//                     <div className="cart-summary-box">
//
//                         <div className="cart-summary-row">
//
//                             <span>
//                                 Підсумок
//                             </span>
//
//                             <strong>
//                                 €
//                                 {total.toFixed(2)}
//                             </strong>
//
//                         </div>
//
//                         <div className="cart-summary-divider" />
//
//                         <div className="cart-summary-row cart-summary-total">
//
//                             <span>
//                                 Ітого
//                             </span>
//
//                             <strong>
//                                 €
//                                 {total.toFixed(2)}
//                             </strong>
//
//                         </div>
//
//                     </div>
//
//                     <button
//                         type="button"
//                         className="button primary cart-checkout"
//                         onClick={handleCheckout}
//                     >
//                         Оформити замовлення
//                     </button>
//
//                 </aside>
//
//             </div>
//
//         </main>
//     );
// }



import { useMemo, useState } from 'react';
import {
    X,
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    LoaderCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function Cart({
                                 cart,
                                 updateCartQuantity,
                                 removeFromCart,
                                 clearCart
                             }) {
    const { t } = useLanguage();

    const [checkout, setCheckout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    /*
     * -----------------------------------------
     * TOTAL
     * -----------------------------------------
     */

    const total = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum +
                Number(item.price || 0) *
                Number(item.quantity || 0),
            0
        );
    }, [cart]);

    /*
     * -----------------------------------------
     * COUNT
     * -----------------------------------------
     */

    const count = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum + Number(item.quantity || 0),
            0
        );
    }, [cart]);

    /*
     * -----------------------------------------
     * CHECKOUT
     * -----------------------------------------
     */

    function openCheckout() {
        setMessage('');
        setCheckout(true);
    }

    function closeCheckout() {
        if (loading) return;

        setCheckout(false);
        setMessage('');
    }

    /*
     * -----------------------------------------
     * SUBMIT ORDER
     * -----------------------------------------
     */

    async function submitOrder(e) {
        e.preventDefault();

        if (!cart.length) {
            return;
        }

        if (!supabase) {
            setMessage(
                t.cart?.connect ||
                'Supabase не підключений.'
            );
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const form = e.currentTarget;

            /*
             * -----------------------------------------
             * FORM DATA
             * -----------------------------------------
             */

            const firstName =
                form.first_name.value.trim();

            const lastName =
                form.last_name.value.trim();

            const email =
                form.email.value.trim();

            const phone =
                form.phone.value.trim();

            const shippingMethod =
                form.shipping_method.value;

            const shippingCountry =
                form.shipping_country.value;

            const shippingAddress =
                form.shipping_address.value.trim();

            const shippingApartment =
                form.shipping_apartment.value.trim();

            const shippingCity =
                form.shipping_city.value.trim();

            const shippingPostalCode =
                form.shipping_postal_code.value.trim();

            const pickupPoint =
                form.pickup_point.value.trim();

            const paymentMethod =
                form.payment_method.value;

            const comment =
                form.comment.value.trim();

            /*
             * -----------------------------------------
             * VALIDATION
             * -----------------------------------------
             */

            if (!firstName) {
                setMessage('Введіть імʼя.');
                setLoading(false);
                return;
            }

            if (!lastName) {
                setMessage('Введіть прізвище.');
                setLoading(false);
                return;
            }

            if (!email) {
                setMessage('Введіть email.');
                setLoading(false);
                return;
            }

            if (!phone) {
                setMessage('Введіть номер телефону.');
                setLoading(false);
                return;
            }

            if (!shippingMethod) {
                setMessage(
                    'Виберіть спосіб доставки.'
                );
                setLoading(false);
                return;
            }

            /*
             * Для кур'єрської доставки
             * адреса обов'язкова
             */

            const courierMethods = [
                'inpost_courier',
                'dpd_courier',
                'dhl_courier',
                'gls_courier'
            ];

            if (
                courierMethods.includes(shippingMethod)
            ) {
                if (
                    !shippingAddress ||
                    !shippingCity ||
                    !shippingPostalCode
                ) {
                    setMessage(
                        'Вкажіть адресу, місто та поштовий індекс.'
                    );

                    setLoading(false);
                    return;
                }
            }

            /*
             * Для Paczkomat поки вимагаємо
             * номер пункту вручну.
             *
             * Пізніше підключимо реальний
             * InPost selector.
             */

            if (
                shippingMethod === 'inpost_paczkomat' &&
                !pickupPoint
            ) {
                setMessage(
                    'Вкажіть Paczkomat.'
                );

                setLoading(false);
                return;
            }

            if (!paymentMethod) {
                setMessage(
                    'Виберіть спосіб оплати.'
                );

                setLoading(false);
                return;
            }

            /*
             * -----------------------------------------
             * CUSTOMER NAME
             * -----------------------------------------
             *
             * Залишаємо customer_name для
             * сумісності з поточною таблицею orders.
             */

            const customerName =
                `${firstName} ${lastName}`.trim();

            /*
             * -----------------------------------------
             * PAYLOAD
             * -----------------------------------------
             */

            const payload = {
                customer_name: customerName,

                first_name: firstName,

                last_name: lastName,

                email,

                phone,

                shipping_method: shippingMethod,

                shipping_country:
                    shippingCountry || 'Poland',

                shipping_address:
                    shippingAddress || null,

                shipping_apartment:
                    shippingApartment || null,

                shipping_city:
                    shippingCity || null,

                shipping_postal_code:
                    shippingPostalCode || null,

                pickup_point:
                    pickupPoint || null,

                payment_method:
                paymentMethod,

                comment,

                items: cart.map(item => ({
                    id: item.id,

                    name: item.name,

                    price:
                        Number(item.price || 0),

                    quantity:
                        Number(item.quantity || 1),

                    /*
                     * ВАЖЛИВО:
                     * передаємо конкретний розмір
                     */

                    selectedSize:
                        item.selectedSize || null
                })),

                total,

                status: 'new'
            };

            console.log(
                '========== ORDER PAYLOAD =========='
            );

            console.log(
                JSON.stringify(
                    payload,
                    null,
                    2
                )
            );

            /*
             * -----------------------------------------
             * CREATE ORDER
             * -----------------------------------------
             */

            const {
                data,
                error
            } = await supabase.functions.invoke(
                'create-order',
                {
                    body: payload
                }
            );

            if (error) {
                console.error(
                    'CREATE ORDER ERROR:',
                    error
                );

                throw error;
            }

            console.log(
                'CREATE ORDER RESPONSE:',
                data
            );

            if (!data?.ok) {
                throw new Error(
                    data?.error ||
                    'Не вдалося створити замовлення'
                );
            }

            /*
             * -----------------------------------------
             * SUCCESS
             * -----------------------------------------
             */

            clearCart();

            setCheckout(false);

            setMessage(
                t.cart?.success ||
                'Замовлення успішно оформлено!'
            );

        } catch (error) {
            console.error(
                'ORDER ERROR:',
                error
            );

            setMessage(
                error?.message ||
                t.cart?.error ||
                'Помилка оформлення замовлення.'
            );

        } finally {
            setLoading(false);
        }
    }

    /*
     * -----------------------------------------
     * EMPTY CART
     * -----------------------------------------
     */

    if (!cart?.length) {
        return (
            <main className="cart-page">

                <div className="cart-breadcrumb">
                    <div className="container">

                        <Link to="/">
                            Головна
                        </Link>

                        <span>›</span>

                        <span>
                            Корзина
                        </span>

                    </div>
                </div>

                <div className="container cart-empty">

                    <ShoppingBag size={48} />

                    <h1>
                        Ваша корзина порожня
                    </h1>

                    <p>
                        Додайте товари до корзини,
                        щоб оформити замовлення.
                    </p>

                    <Link
                        to="/"
                        className="button primary"
                    >
                        Перейти до магазину
                    </Link>

                    {message && (
                        <div className="notice">
                            {message}
                        </div>
                    )}

                </div>
            </main>
        );
    }

    /*
     * -----------------------------------------
     * RENDER
     * -----------------------------------------
     */

    return (
        <>
            <main className="cart-page">

                {/* BREADCRUMB */}

                <div className="cart-breadcrumb">

                    <div className="container">

                        <Link to="/">
                            Головна
                        </Link>

                        <span>›</span>

                        <span>
                            Корзина
                        </span>

                    </div>

                </div>

                {/* CONTENT */}

                <div className="container cart-layout">

                    {/* LEFT */}

                    <section className="cart-products">

                        <div className="cart-title-row">

                            <div>

                                <h1>
                                    Ваша корзина товарів
                                </h1>

                                <p>
                                    {count}{' '}
                                    {count === 1
                                        ? 'товар'
                                        : count < 5
                                            ? 'товари'
                                            : 'товарів'}
                                </p>

                            </div>

                            <button
                                type="button"
                                className="cart-clear"
                                onClick={clearCart}
                            >
                                Очистити корзину
                            </button>

                        </div>

                        {/* PRODUCTS */}

                        <div className="cart-list">

                            {cart.map((item, index) => {

                                const quantity =
                                    Number(
                                        item.quantity || 1
                                    );

                                const sizes =
                                    Array.isArray(
                                        item.product_sizes
                                    )
                                        ? item.product_sizes
                                        : [];

                                const selectedSizeData =
                                    sizes.find(
                                        size =>
                                            String(
                                                size.size
                                            ) ===
                                            String(
                                                item.selectedSize
                                            )
                                    );

                                let stock;

                                if (sizes.length > 0) {
                                    stock = Number(
                                        selectedSizeData?.stock || 0
                                    );
                                } else {
                                    stock = Number(
                                        item.stock || 0
                                    );
                                }

                                const maxReached =
                                    stock > 0 &&
                                    quantity >= stock;

                                const itemKey =
                                    `${item.id}-${item.selectedSize || 'default'}-${index}`;

                                return (
                                    <article
                                        className="cart-product"
                                        key={itemKey}
                                    >

                                        <div className="cart-product-image">

                                            {item.image_url ||
                                            item.image ? (
                                                <img
                                                    src={
                                                        item.image_url ||
                                                        item.image
                                                    }
                                                    alt={
                                                        item.name
                                                    }
                                                />
                                            ) : (
                                                <ShoppingBag
                                                    size={28}
                                                />
                                            )}

                                        </div>

                                        <div className="cart-product-info">

                                            <Link
                                                to={`/product/${item.id}`}
                                                className="cart-product-name"
                                            >
                                                {item.name}
                                            </Link>

                                            {item.category && (
                                                <span className="cart-product-category">
                                                    {item.category}
                                                </span>
                                            )}

                                            {item.selectedSize && (
                                                <span className="cart-product-size">
                                                    Розмір:{' '}
                                                    <strong>
                                                        {
                                                            item.selectedSize
                                                        }
                                                    </strong>
                                                </span>
                                            )}

                                            <span className="cart-product-price">
                                                €
                                                {Number(
                                                    item.price || 0
                                                ).toFixed(2)}
                                            </span>

                                            <div className="cart-quantity">

                                                <button
                                                    type="button"
                                                    disabled={
                                                        quantity <= 1
                                                    }
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            quantity - 1
                                                        )
                                                    }
                                                >
                                                    <Minus
                                                        size={15}
                                                    />
                                                </button>

                                                <span>
                                                    {quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    disabled={
                                                        maxReached ||
                                                        stock <= 0
                                                    }
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            quantity + 1
                                                        )
                                                    }
                                                >
                                                    <Plus
                                                        size={15}
                                                    />
                                                </button>

                                            </div>

                                            {stock > 0 && (
                                                <small className="cart-stock">
                                                    В наявності:{' '}
                                                    {stock} шт.
                                                </small>
                                            )}

                                        </div>

                                        <div className="cart-product-right">

                                            <strong className="cart-product-total">
                                                €
                                                {(
                                                    Number(
                                                        item.price || 0
                                                    ) *
                                                    quantity
                                                ).toFixed(2)}
                                            </strong>

                                            <button
                                                type="button"
                                                className="cart-remove"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.id,
                                                        item.selectedSize
                                                    )
                                                }
                                            >
                                                <Trash2
                                                    size={18}
                                                />
                                            </button>

                                        </div>

                                    </article>
                                );
                            })}

                        </div>

                        <Link
                            to="/"
                            className="cart-continue"
                        >
                            ← Продовжити покупки
                        </Link>

                    </section>

                    {/* SUMMARY */}

                    <aside className="cart-summary">

                        <h2>
                            Сума замовлення
                        </h2>

                        <div className="cart-summary-box">

                            <div className="cart-summary-row">

                                <span>
                                    Підсумок
                                </span>

                                <strong>
                                    €{total.toFixed(2)}
                                </strong>

                            </div>

                            <div className="cart-summary-divider" />

                            <div className="cart-summary-row cart-summary-total">

                                <span>
                                    Ітого
                                </span>

                                <strong>
                                    €{total.toFixed(2)}
                                </strong>

                            </div>

                        </div>

                        <button
                            type="button"
                            className="button primary cart-checkout"
                            onClick={openCheckout}
                        >
                            Оформити замовлення
                        </button>

                        {message && (
                            <div className="notice">
                                {message}
                            </div>
                        )}

                    </aside>

                </div>

            </main>

            {/* =====================================
                CHECKOUT MODAL
            ===================================== */}

            {checkout && (
                <div
                    className="checkout-overlay"
                    onMouseDown={e => {
                        if (
                            e.target === e.currentTarget &&
                            !loading
                        ) {
                            closeCheckout();
                        }
                    }}
                >

                    <div className="checkout-modal">

                        {/* HEADER */}

                        <div className="checkout-modal-header">

                            <div>

                                <span className="eyebrow">
                                    Оформлення
                                </span>

                                <h2>
                                    Дані про відправку
                                </h2>

                            </div>

                            <button
                                type="button"
                                className="icon-button"
                                onClick={closeCheckout}
                                disabled={loading}
                                aria-label="Закрити"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* ORDER SUMMARY */}

                        <div className="checkout-order">

                            <div className="checkout-order-title">
                                Ваше замовлення
                            </div>

                            {cart.map(item => (
                                <div
                                    className="checkout-order-item"
                                    key={`${item.id}-${item.selectedSize || 'default'}`}
                                >

                                    <div>

                                        <strong>
                                            {item.name}
                                        </strong>

                                        {item.selectedSize && (
                                            <small>
                                                Розмір:{' '}
                                                {
                                                    item.selectedSize
                                                }
                                            </small>
                                        )}

                                        <small>
                                            {item.quantity} × €
                                            {Number(
                                                item.price || 0
                                            ).toFixed(2)}
                                        </small>

                                    </div>

                                    <strong>
                                        €
                                        {(
                                            Number(
                                                item.price || 0
                                            ) *
                                            Number(
                                                item.quantity || 1
                                            )
                                        ).toFixed(2)}
                                    </strong>

                                </div>
                            ))}

                            <div className="checkout-total">

                                <span>
                                    Всього
                                </span>

                                <strong>
                                    €{total.toFixed(2)}
                                </strong>

                            </div>

                        </div>

                        {/* FORM */}

                        <form
                            className="checkout-form"
                            onSubmit={submitOrder}
                        >

                            {/* =========================
                                CUSTOMER
                            ========================== */}

                            <div className="checkout-section-title">
                                Dane odbiorcy
                            </div>

                            <div className="checkout-form-row">

                                <input
                                    name="first_name"
                                    required
                                    placeholder="Imię *"
                                    disabled={loading}
                                />

                                <input
                                    name="last_name"
                                    required
                                    placeholder="Nazwisko *"
                                    disabled={loading}
                                />

                            </div>

                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="E-mail *"
                                disabled={loading}
                            />

                            <input
                                name="phone"
                                required
                                type="tel"
                                placeholder="Telefon *"
                                disabled={loading}
                            />

                            {/* =========================
                                SHIPPING
                            ========================== */}

                            <div className="checkout-section-title">
                                Sposób dostawy
                            </div>

                            <select
                                name="shipping_method"
                                required
                                disabled={loading}
                                defaultValue=""
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Wybierz sposób dostawy
                                </option>

                                <option value="inpost_paczkomat">
                                    InPost Paczkomat®
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

                                <option value="gls_courier">
                                    GLS Kurier
                                </option>

                            </select>

                            {/* =========================
                                COUNTRY
                            ========================== */}

                            <select
                                name="shipping_country"
                                required
                                disabled={loading}
                                defaultValue="Poland"
                            >

                                <option value="Poland">
                                    Polska
                                </option>

                            </select>

                            {/* =========================
                                ADDRESS
                            ========================== */}

                            <div className="checkout-section-title">
                                Adres dostawy
                            </div>

                            <input
                                name="shipping_address"
                                placeholder="Ulica"
                                disabled={loading}
                            />

                            <div className="checkout-form-row">

                                <input
                                    name="shipping_apartment"
                                    placeholder="Numer domu / lokalu"
                                    disabled={loading}
                                />

                                <input
                                    name="shipping_postal_code"
                                    placeholder="Kod pocztowy"
                                    disabled={loading}
                                />

                            </div>

                            <input
                                name="shipping_city"
                                placeholder="Miasto"
                                disabled={loading}
                            />

                            {/* =========================
                                PACZKOMAT
                            ========================== */}

                            <div className="checkout-pickup">

                                <label>
                                    Paczkomat / punkt odbioru
                                </label>

                                <input
                                    name="pickup_point"
                                    placeholder="Np. WAW147H"
                                    disabled={loading}
                                />

                                <small>
                                    Поки введіть код Paczkomat вручну.
                                    Реальний вибір пункту InPost підключимо
                                    наступним кроком.
                                </small>

                            </div>

                            {/* =========================
                                PAYMENT
                            ========================== */}

                            <div className="checkout-section-title">
                                Metoda płatności
                            </div>

                            <select
                                name="payment_method"
                                required
                                disabled={loading}
                                defaultValue=""
                            >

                                <option
                                    value=""
                                    disabled
                                >
                                    Wybierz metodę płatności
                                </option>

                                <option value="card">
                                    Karta płatnicza
                                </option>

                                <option value="blik">
                                    BLIK
                                </option>

                                <option value="przelewy24">
                                    Przelewy24
                                </option>

                                <option value="paypal">
                                    PayPal
                                </option>

                            </select>

                            {/* =========================
                                COMMENT
                            ========================== */}

                            <textarea
                                name="comment"
                                placeholder="Komentarz do zamówienia (opcjonalnie)"
                                disabled={loading}
                                rows={4}
                            />

                            {message && (
                                <div className="notice">
                                    {message}
                                </div>
                            )}

                            {/* =========================
                                SUBMIT
                            ========================== */}

                            <button
                                type="submit"
                                className="button primary full"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <LoaderCircle
                                            size={18}
                                            className="spin"
                                        />

                                        Tworzenie zamówienia...
                                    </>
                                ) : (
                                    <>
                                        Zamawiam
                                        {' · '}
                                        €{total.toFixed(2)}
                                    </>
                                )}

                            </button>

                            <button
                                type="button"
                                className="button secondary full"
                                onClick={closeCheckout}
                                disabled={loading}
                            >
                                Wróć do koszyka
                            </button>

                        </form>

                    </div>

                </div>
            )}
        </>
    );
}







