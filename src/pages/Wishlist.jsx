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

export default function Wishlist({ onAdd }) {
    const {
        wishlist,
        removeFromWishlist,
        clearWishlist
    } = useWishlist();

    console.log('💖 WISHLIST PAGE DATA:', wishlist);

    return (
        <main className="page">
            <div className="container">

                {/* HEADER */}
                <div className="wishlist-page-header">

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
                            type="button"
                            className="button secondary"
                            onClick={clearWishlist}
                        >
                            <Trash2 size={16} />
                            Очистити
                        </button>
                    )}

                </div>

                {/* EMPTY */}
                {wishlist.length === 0 ? (

                    <div className="wishlist-empty-page">

                        <Heart size={45} />

                        <h2>
                            Обраних товарів ще немає
                        </h2>

                        <p>
                            Додавайте товари до обраного
                            натисканням на сердечко.
                        </p>

                        <Link
                            to="/"
                            className="button primary"
                        >
                            Перейти до товарів
                        </Link>

                    </div>

                ) : (

                    /* WISHLIST GRID */
                    <div className="wishlist-page-grid">

                        {wishlist.map((product) => {

                            const selectedSize =
                                product.selectedSize !== null &&
                                product.selectedSize !== undefined &&
                                product.selectedSize !== ''
                                    ? String(product.selectedSize)
                                    : null;

                            const image =
                                product.image ||
                                product.image_url ||
                                product.imageUrl ||
                                null;

                            console.log(
                                '💖 RENDER WISHLIST PRODUCT:',
                                {
                                    id: product.id,
                                    wishlistId: product.wishlistId,
                                    name: product.name,
                                    selectedSize,
                                    image
                                }
                            );

                            return (
                                <article
                                    className="wishlist-page-card"
                                    key={`${product.id}-${selectedSize}-${product.wishlistId}`}
                                >

                                    {/* IMAGE */}
                                    <Link
                                        to={`/product/${product.id}`}
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
                                    </Link>

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
                                                {product.description}
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
                                                €
                                                {Number(
                                                    product.price || 0
                                                ).toFixed(2)}
                                            </strong>

                                            {product.oldPrice && (
                                                <del>
                                                    €
                                                    {Number(
                                                        product.oldPrice
                                                    ).toFixed(2)}
                                                </del>
                                            )}

                                        </div>

                                        {/* ACTIONS */}
                                        <div className="wishlist-page-actions">

                                            {/* ADD TO CART */}
                                            <button
                                                type="button"
                                                className="button primary wishlist-add-cart"
                                                onClick={() => {
                                                    console.log(
                                                        '🛒 ADD FROM WISHLIST:',
                                                        {
                                                            productId:
                                                            product.id,
                                                            selectedSize
                                                        }
                                                    );

                                                    if (!selectedSize) {
                                                        console.log(
                                                            '❌ SIZE IS MISSING'
                                                        );
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

                                            {/* DELETE */}
                                            <button
                                                type="button"
                                                className="button secondary wishlist-delete-button"
                                                onClick={() => {
                                                    console.log(
                                                        '🗑️ REMOVE WISHLIST:',
                                                        {
                                                            productId:
                                                            product.id,
                                                            selectedSize
                                                        }
                                                    );

                                                    removeFromWishlist(
                                                        product.id,
                                                        selectedSize
                                                    );
                                                }}
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
        </main>
    );
}