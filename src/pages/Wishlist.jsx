// import { Heart, ShoppingCart, X } from 'lucide-react';
// import { useState } from 'react';
//
// export default function Wishlist({
//                                      wishlist = [],
//                                      setWishlist,
//                                      products = [],
//                                      onRemove,
//                                      onAdd
//                                  }) {
//
//     const [open, setOpen] = useState(false);
//
//
//     // =========================
//     // PRODUCTS IN WISHLIST
//     // =========================
//
//     const wishlistProducts = products.filter(
//         product =>
//             wishlist.includes(product.id)
//     );
//
//
//     // =========================
//     // REMOVE
//     // =========================
//
//     function remove(productId) {
//
//         if (onRemove) {
//
//             onRemove(productId);
//
//             return;
//
//         }
//
//         setWishlist?.(
//             current =>
//                 current.filter(
//                     id => id !== productId
//                 )
//         );
//
//     }
//
//
//     // =========================
//     // ADD TO CART
//     // =========================
//
//     function addToCart(product) {
//
//         if (onAdd) {
//             onAdd(product);
//         }
//
//     }
//
//
//     return (
//         <>
//
//             {/* =========================
//                 WISHLIST BUTTON
//             ========================= */}
//
//             <button
//                 type="button"
//                 className="wishlist-button"
//                 onClick={() =>
//                     setOpen(true)
//                 }
//                 aria-label="Wishlist"
//             >
//
//                 <Heart
//                     size={21}
//                     fill={
//                         wishlist.length
//                             ? "currentColor"
//                             : "none"
//                     }
//                 />
//
//                 {wishlist.length > 0 && (
//
//                     <span className="wishlist-count">
//                         {wishlist.length}
//                     </span>
//
//                 )}
//
//             </button>
//
//
//             {/* =========================
//                 OVERLAY
//             ========================= */}
//
//             {open && (
//
//                 <div
//                     className="wishlist-overlay"
//                     onClick={() =>
//                         setOpen(false)
//                     }
//                 >
//
//                     <aside
//                         className="wishlist-panel"
//                         onClick={e =>
//                             e.stopPropagation()
//                         }
//                     >
//
//                         {/* HEADER */}
//
//                         <div className="wishlist-header">
//
//                             <div>
//
//                                 <h2>
//                                     Обране
//                                 </h2>
//
//                                 <span>
//                                     {wishlist.length}{' '}
//                                     {wishlist.length === 1
//                                         ? 'товар'
//                                         : 'товарів'}
//                                 </span>
//
//                             </div>
//
//
//                             <button
//                                 type="button"
//                                 className="wishlist-close"
//                                 onClick={() =>
//                                     setOpen(false)
//                                 }
//                             >
//
//                                 <X size={22} />
//
//                             </button>
//
//                         </div>
//
//
//                         {/* EMPTY */}
//
//                         {wishlistProducts.length === 0 ? (
//
//                             <div className="wishlist-empty">
//
//                                 <Heart
//                                     size={48}
//                                     strokeWidth={1.5}
//                                 />
//
//                                 <h3>
//                                     Обране порожнє
//                                 </h3>
//
//                                 <p>
//                                     Додавайте товари,
//                                     які вам сподобались.
//                                 </p>
//
//                             </div>
//
//                         ) : (
//
//                             <div className="wishlist-items">
//
//                                 {wishlistProducts.map(
//                                     product => (
//
//                                         <div
//                                             className="wishlist-item"
//                                             key={product.id}
//                                         >
//
//                                             {/* IMAGE */}
//
//                                             <div className="wishlist-image">
//
//                                                 {product.image_url ||
//                                                 product.image ? (
//
//                                                     <img
//                                                         src={
//                                                             product.image_url ||
//                                                             product.image
//                                                         }
//                                                         alt={
//                                                             product.name
//                                                         }
//                                                     />
//
//                                                 ) : (
//
//                                                     <div>
//                                                         No image
//                                                     </div>
//
//                                                 )}
//
//                                             </div>
//
//
//                                             {/* INFO */}
//
//                                             <div className="wishlist-info">
//
//                                                 <h3>
//                                                     {product.name}
//                                                 </h3>
//
//
//                                                 {product.description && (
//
//                                                     <p>
//                                                         {
//                                                             product.description
//                                                         }
//                                                     </p>
//
//                                                 )}
//
//
//                                                 <strong>
//                                                     €{Number(
//                                                     product.price || 0
//                                                 ).toFixed(2)}
//                                                 </strong>
//
//
//                                                 <div className="wishlist-actions">
//
//                                                     <button
//                                                         type="button"
//                                                         className="button primary"
//                                                         onClick={() =>
//                                                             addToCart(
//                                                                 product
//                                                             )
//                                                         }
//                                                     >
//
//                                                         <ShoppingCart
//                                                             size={16}
//                                                         />
//
//                                                         У кошик
//
//                                                     </button>
//
//
//                                                     <button
//                                                         type="button"
//                                                         className="button secondary"
//                                                         onClick={() =>
//                                                             remove(
//                                                                 product.id
//                                                             )
//                                                         }
//                                                     >
//
//                                                         <X size={16} />
//
//                                                         Видалити
//
//                                                     </button>
//
//                                                 </div>
//
//                                             </div>
//
//                                         </div>
//
//                                     )
//                                 )}
//
//                             </div>
//
//                         )}
//
//                     </aside>
//
//                 </div>
//
//             )}
//
//         </>
//     );
// }
import {
    Heart,
    ShoppingCart,
    Trash2
} from 'lucide-react';

import { Link } from 'react-router-dom';

import { useWishlist } from '../hooks/useWishlist';

export default function Wishlist({
                                     onAdd
                                 }) {
    const {
        wishlist,
        removeFromWishlist,
        clearWishlist
    } = useWishlist();

    return (
        <main className="page">
            <div className="container">

                <div className="wishlist-page-head">
                    <div>
                        <div className="eyebrow">
                            <Heart size={14} />
                            Обране
                        </div>

                        <h1>
                            Мої улюблені
                            <br />
                            <em>товари</em>
                        </h1>
                    </div>

                    {wishlist.length > 0 && (
                        <button
                            className="button secondary"
                            onClick={clearWishlist}
                        >
                            <Trash2 size={16} />
                            Очистити
                        </button>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="wishlist-empty-page">

                        <Heart size={45} />

                        <h2>
                            Обраних товарів ще немає
                        </h2>

                        <p>
                            Додавайте товари до
                            обраного натисканням
                            на сердечко.
                        </p>

                        <Link
                            to="/"
                            className="button primary"
                        >
                            Перейти до товарів
                        </Link>

                    </div>
                ) : (
                    <div className="wishlist-page-grid">

                        {wishlist.map(product => (
                            <article
                                className="wishlist-page-card"
                                key={product.id}
                            >

                                <Link
                                    to={`/product/${product.id}`}
                                    className="wishlist-page-image"
                                >
                                    {product.image_url ? (
                                        <img
                                            src={
                                                product.image_url
                                            }
                                            alt={
                                                product.name
                                            }
                                        />
                                    ) : (
                                        <div>
                                            Немає фото
                                        </div>
                                    )}
                                </Link>

                                <div>
                                    <div className="category">
                                        {product.category ||
                                            'MOLD'}
                                    </div>

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <strong>
                                        €{Number(
                                        product.price ||
                                        0
                                    ).toFixed(2)}
                                    </strong>

                                    <div className="wishlist-page-actions">

                                        <button
                                            className="button primary"
                                            onClick={() =>
                                                onAdd(product)
                                            }
                                        >
                                            <ShoppingCart
                                                size={16}
                                            />
                                            Додати в кошик
                                        </button>

                                        <button
                                            className="button secondary"
                                            onClick={() =>
                                                removeFromWishlist(
                                                    product.id
                                                )
                                            }
                                        >
                                            <Trash2
                                                size={16}
                                            />
                                        </button>

                                    </div>
                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>
        </main>
    );
}