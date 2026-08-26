// // import {Box, ShoppingBag, ArrowUpRight} from 'lucide-react';
// // import {Link} from 'react-router-dom';
// // import ProductModel from './ProductModel';
// // import {useLanguage} from '../context/LanguageContext';
// // import {Heart} from 'lucide-react';
// // import {useWishlist} from '../hooks/useWishlist';
// //
// // export default function ProductCard({product, onAdd}) {
// //     const {t} = useLanguage();
// //     const {
// //         isInWishlist,
// //         toggleWishlist
// //     } = useWishlist();
// //
// //     return <article className="product-card">
// //         <div className="product-image"><ProductModel
// //             src={product.model}
// //             poster={product.image}
// //         />
// //             <div className="three-d-badge"><Box size={14} /> 3D</div>
// //             <Link
// //                 className="product-open"
// //                 to={`/product/${product.id}`}
// //                 aria-label={`${t.product.details || t.product.view3d}: ${product.name}`}
// //             ><ArrowUpRight size={17} /></Link>
// //
// //             <button
// //                 type="button"
// //                 className={`wishlist-button ${liked ? 'active' : ''}`}
// //                 onClick={() =>
// //                     toggleWishlist(product)
// //                 }
// //                 aria-label="Wishlist"
// //             >
// //                 <Heart
// //                     size={20}
// //                     fill={liked ? 'currentColor' : 'none'}
// //                 />
// //             </button>
// //
// //         </div>
// //         <div className="product-info">
// //             <span className="product-category">{product.category}</span>
// //             <h3>{product.name}</h3>
// //             <p>{product.description}</p>
// //             <div className="product-meta">
// //                 <span>{product.size}</span><span>{product.cells} {t.product.cells.toLowerCase()}</span>
// //             </div>
// //             <div className="product-bottom">
// //                 <div className="price">
// //                     <strong>€{product.price}</strong>{product.oldPrice &&
// //                     <del>€{product.oldPrice}</del>}</div>
// //                 <button
// //                     className="add-button"
// //                     onClick={() => onAdd(product)}
// //                 ><ShoppingBag size={17} /> {t.product.add}</button>
// //             </div>
// //             <button
// //                 className={`wishlist-button ${
// //                     isInWishlist(product.id) ? 'active' : ''
// //                 }`}
// //                 onClick={async e => {
// //                     e.preventDefault();
// //                     e.stopPropagation();
// //
// //                     const result = await toggleWishlist(product.id);
// //
// //                     if (result?.requiresLogin) {
// //                         window.location.href = '/auth';
// //                     }
// //                 }}
// //             >
// //                 <Heart
// //                     size={20}
// //                     fill={
// //                         isInWishlist(product.id)
// //                             ? 'currentColor'
// //                             : 'none'
// //                     }
// //                 />
// //             </button>
// //
// //         </div>
// //     </article>;
// // }
//
//
// ///////////////////////////////////////////////////////////////
// // import { Link } from 'react-router-dom';
// // import {
// //     Heart,
// //     ShoppingCart,
// //     Box
// // } from 'lucide-react';
// //
// // import { useWishlist } from '../hooks/useWishlist';
// //
// // export default function ProductCard({
// //                                         product,
// //                                         onAdd
// //                                     }) {
// //     const {
// //         isInWishlist,
// //         toggleWishlist
// //     } = useWishlist();
// //
// //     const liked =
// //         isInWishlist(product.id);
// //
// //     const imageUrl =
// //         product.image_url ||
// //         product.image ||
// //         product.photo_url ||
// //         null;
// //
// //     const modelUrl =
// //         product.model_url ||
// //         product.model_3d_url ||
// //         product.glb_url ||
// //         null;
// //
// //     function handleWishlist(e) {
// //         e.preventDefault();
// //         e.stopPropagation();
// //
// //         toggleWishlist(product);
// //     }
// //
// //     function handleAdd(e) {
// //         e.preventDefault();
// //         e.stopPropagation();
// //
// //         onAdd(product);
// //     }
// //
// //     return (
// //         <article className="product-card">
// //
// //             <div className="product-image">
// //
// //                 <Link
// //                     to={`/product/${product.id}`}
// //                 >
// //                     {modelUrl ? (
// //                         <div className="model">
// //                             <model-viewer
// //                                 src={modelUrl}
// //                                 c camera-controls
// //                                 auto-rotate
// //                                 rotation-per-second="18deg"
// //                                 interaction-prompt="none"
// //                                 shadow-intensity="1"
// //                                 exposure="1"
// //                                 camera-orbit="0deg 72deg 105%"
// //                                 field-of-view="28deg"
// //                             />
// //                         </div>
// //                     ) : imageUrl ? (
// //                         <img
// //                             src={imageUrl}
// //                             alt={product.name}
// //                             className="product-image-img"
// //                         />
// //                     ) : (
// //                         <div className="model-empty">
// //                             Немає зображення
// //                         </div>
// //                     )}
// //                 </Link>
// //
// //                 {modelUrl && (
// //                     <div className="three-d-badge">
// //                         <Box size={14} />
// //                         3D
// //                     </div>
// //                 )}
// //
// //
// //
// //                 <Link
// //                     to={`/product/${product.id}`}
// //                     className="product-open"
// //                     onClick={e =>
// //                         e.stopPropagation()
// //                     }
// //                 >
// //                     <Box size={17} />
// //                 </Link>
// //
// //                 {modelUrl && (
// //                     <div className="model-hint">
// //                         Перетягуйте для перегляду
// //                     </div>
// //                 )}
// //             </div>
// //
// //             <div className="product-info">
// //
// //                 <div className="category">
// //                     {product.category || 'MOLD'}
// //                 </div>
// //
// //                 <Link
// //                     to={`/product/${product.id}`}
// //                 >
// //                     <h3>
// //                         {product.name}
// //                     </h3>
// //                 </Link>
// //
// //                 <p>
// //                     {product.description || ''}
// //                 </p>
// //
// //                 <div className="meta">
// //                     {product.material && (
// //                         <span>
// //                             {product.material}
// //                         </span>
// //                     )}
// //
// //                     {product.size && (
// //                         <span>
// //                             {product.size}
// //                         </span>
// //                     )}
// //                 </div>
// //
// //                 <div className="product-bottom">
// //
// //                     <strong>
// //                         €{Number(
// //                         product.price || 0
// //                     ).toFixed(2)}
// //                     </strong>
// //
// //                     {product.old_price && (
// //                         <del>
// //                             €{Number(
// //                             product.old_price
// //                         ).toFixed(2)}
// //                         </del>
// //                     )}
// //
// //                     <button
// //                         type="button"
// //                         className={`wishlist-button ${
// //                             liked ? 'liked' : ''
// //                         }`}
// //                         onClick={handleWishlist}
// //                         aria-label={
// //                             liked
// //                                 ? 'Видалити з обраного'
// //                                 : 'Додати в обране'
// //                         }
// //                     >
// //                         <Heart
// //                             size={20}
// //                             fill={
// //                                 liked
// //                                     ? 'currentColor'
// //                                     : 'none'
// //                             }
// //                         />
// //                     </button>
// //
// //                     <button
// //                         type="button"
// //                         onClick={handleAdd}
// //                     >
// //                         <ShoppingCart size={16} />
// //                         Додати
// //                     </button>
// //
// //                 </div>
// //
// //             </div>
// //
// //         </article>
// //     );
// // }
//
// /////////////////////////////////////////////////////////////////////////
// // import { Link } from 'react-router-dom';
// // import { Heart, ShoppingBag, Box } from 'lucide-react';
// // import {useState} from "react";
// //
// // export default function ProductCard({
// //                                         product,
// //                                         onAdd,
// //                                         isLiked = false,
// //                                         onToggleWishlist
// //                                     }) {
// //     const [sizes, setSizes] = useState([]);
// //     const [selectedSize, setSelectedSize] = useState(null);
// //     const [quantity, setQuantity] = useState(1);
// //
// //     useEffect(() => {
// //         async function loadSizes() {
// //             const {
// //                 data,
// //                 error
// //             } = await supabase
// //                 .from('product_sizes')
// //                 .select('size, stock')
// //                 .eq('product_id', product.id)
// //                 .order('size');
// //
// //             if (error) {
// //                 console.error(
// //                     'LOAD SIZES ERROR:',
// //                     error
// //                 );
// //                 return;
// //             }
// //
// //             setSizes(data || []);
// //
// //             const availableSize =
// //                 data?.find(item => item.stock > 0);
// //
// //             setSelectedSize(
// //                 availableSize?.size ?? null
// //             );
// //         }
// //
// //         loadSizes();
// //     }, [product.id]);
// //
// //
// //
// //
// //     if (!product) return null;
// //
// //     return (
// //         <article className="product-card">
// //
// //             <div className="product-image">
// //
// //                 <Link to={`/product/${product.id}`}>
// //                     {product.model_url ? (
// //                         <div className="model">
// //                             <model-viewer
// //                                 src={product.model_url}
// //                                 camera-controls
// //                                 auto-rotate
// //                                 shadow-intensity="1"
// //                                 exposure="1"
// //                                 environment-image="neutral"
// //                             />
// //                         </div>
// //                     ) : product.image_url ? (
// //                         <img
// //                             src={product.image_url}
// //                             alt={product.name}
// //                         />
// //                     ) : (
// //                         <div className="model-empty">
// //                             Немає зображення
// //                         </div>
// //                     )}
// //                 </Link>
// //
// //                 {product.model_url && (
// //                     <div className="three-d-badge">
// //                         <Box size={13} />
// //                         3D
// //                     </div>
// //                 )}
// //
// //             </div>
// //
// //             <div className="product-info">
// //
// //                 <div className="category">
// //                     {product.category || 'Mold'}
// //                 </div>
// //
// //                 <Link to={`/product/${product.id}`}>
// //                     <h3>{product.name}</h3>
// //                 </Link>
// //
// //                 <p>
// //                     {product.description || ''}
// //                 </p>
// //
// //                 <div className="meta">
// //                     {product.material && (
// //                         <span>{product.material}</span>
// //                     )}
// //
// //                     {product.size && (
// //                         <span>{product.size}</span>
// //                     )}
// //                 </div>
// //
// //                 <div className="product-bottom">
// //
// //                     <strong>
// //                         {product.price} €
// //                     </strong>
// //
// //                     <div className="product-actions">
// //
// //                         {/* WISHLIST */}
// //                         <button
// //                             type="button"
// //                             className={`wishlist-product-button ${
// //                                 isLiked ? 'liked' : ''
// //                             }`}
// //                             onClick={() => {
// //                                 if (onToggleWishlist) {
// //                                     onToggleWishlist(product);
// //                                 }
// //                             }}
// //                             aria-label={
// //                                 isLiked
// //                                     ? 'Видалити з улюблених'
// //                                     : 'Додати в улюблені'
// //                             }
// //                         >
// //                             <Heart
// //                                 size={19}
// //                                 fill={isLiked ? 'currentColor' : 'none'}
// //                             />
// //                         </button>
// //
// //                         {/* CART */}
// //                         <button
// //                             type="button"
// //                             onClick={() => onAdd(product)}
// //                             className="add-cart-button"
// //                         >
// //                             <ShoppingBag size={16} />
// //                             Додати
// //                         </button>
// //
// //                     </div>
// //
// //                 </div>
// //
// //             </div>
// //
// //         </article>
// //     );
// // }
// /////////////////////////////////////////////
//










import { useState } from 'react';
import {Box, ShoppingBag,ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductModel from "./ProductModel.jsx";
import {useLanguage} from "../context/LanguageContext.jsx";

export default function ProductCard({ product, onAdd }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const {t} = useLanguage();
    // Розміри приходять із Supabase як product_sizes
    const sizes = Array.isArray(product?.product_sizes)
        ? product.product_sizes
        : [];

    const hasSizes = sizes.length > 0;

    // Вибраний розмір
    const selectedSizeData = sizes.find(
        item => item.size === selectedSize
    );

    // Якщо є розміри — перевіряємо stock вибраного розміру.
    // Якщо розмірів немає — перевіряємо product.stock.
    const available = hasSizes
        ? Boolean(
            selectedSizeData &&
            Number(selectedSizeData.stock) > 0
        )
        : Number(product?.stock || 0) > 0;

    function handleAdd() {
        // Якщо є розміри — спочатку треба вибрати розмір
        if (hasSizes && !selectedSize) {
            return;
        }

        // Якщо товару немає в наявності
        if (!available) {
            return;
        }

        // Передаємо product + selectedSize
        onAdd?.(product, selectedSize || null);
    }

    return (

        // <article className="product-card">
        //
        //     {/* IMAGE */}
        //     <div className="product-image">
        //         {product?.image_url ? (
        //             <img
        //                 src={product.image_url}
        //                 alt={product.name || 'Товар'}
        //             />
        //         ) : (
        //             <div className="product-image-placeholder">
        //                 Немає фото
        //             </div>
        //         )}
        //
        //         {product?.featured && (
        //             <span className="product-featured">
        //                 Популярне
        //             </span>
        //         )}
        //     </div>
        //
        //     {/* CONTENT */}
        //     <div className="product-content">
        //
        //         {/* CATEGORY */}
        //         {product?.category && (
        //             <div className="product-category">
        //                 {product.category}
        //             </div>
        //         )}
        //
        //         {/* NAME */}
        //         <h3 className="product-title">
        //             {product?.name}
        //         </h3>
        //
        //         {/* DESCRIPTION */}
        //         {product?.description && (
        //             <p className="product-description">
        //                 {product.description}
        //             </p>
        //         )}
        //
        //         {/* SIZES */}
        //         {hasSizes && (
        //             <div className="product-sizes">
        //
        //                 <span className="product-sizes-title">
        //                     Розмір:
        //                 </span>
        //
        //                 <div className="size-list">
        //
        //                     {sizes.map(item => {
        //                         const isSelected =
        //                             selectedSize === item.size;
        //
        //                         const isAvailable =
        //                             Number(item.stock) > 0;
        //
        //                         return (
        //                             <button
        //                                 key={
        //                                     item.id ||
        //                                     item.size
        //                                 }
        //                                 type="button"
        //                                 className={[
        //                                     'size-button',
        //                                     isSelected
        //                                         ? 'selected'
        //                                         : '',
        //                                     !isAvailable
        //                                         ? 'disabled'
        //                                         : ''
        //                                 ]
        //                                     .filter(Boolean)
        //                                     .join(' ')}
        //                                 disabled={!isAvailable}
        //                                 onClick={() =>
        //                                     setSelectedSize(
        //                                         item.size
        //                                     )
        //                                 }
        //                             >
        //                                 <span>
        //                                     {item.size}
        //                                 </span>
        //
        //                                 {!isAvailable && (
        //                                     <span className="size-stock">
        //                                         Немає
        //                                     </span>
        //                                 )}
        //                             </button>
        //                         );
        //                     })}
        //
        //                 </div>
        //             </div>
        //         )}
        //
        //         {/* STOCK */}
        //         {hasSizes && selectedSizeData && (
        //             <div className="product-stock">
        //
        //                 {Number(
        //                     selectedSizeData.stock
        //                 ) > 0 ? (
        //                     <>
        //                         В наявності:{' '}
        //                         {selectedSizeData.stock} шт.
        //                     </>
        //                 ) : (
        //                     'Немає в наявності'
        //                 )}
        //
        //             </div>
        //         )}
        //
        //         {/* Якщо є розміри, але нічого не вибрано */}
        //         {hasSizes && !selectedSize && (
        //             <div className="product-stock">
        //                 Оберіть розмір
        //             </div>
        //         )}
        //
        //         {/* Якщо розмірів немає */}
        //         {!hasSizes && (
        //             <div className="product-stock">
        //                 {Number(product?.stock || 0) > 0
        //                     ? `В наявності: ${product.stock} шт.`
        //                     : 'Немає в наявності'}
        //             </div>
        //         )}
        //
        //         {/* PRICE + CART */}
        //         <div className="product-bottom">
        //
        //             {/* PRICE */}
        //             <div className="product-bottom">
        //
        //                 {product?.old_price && (
        //                     <span className="product-old-price">
        //                         {product.old_price} $
        //                     </span>
        //                 )}
        //
        //                 <strong>
        //                     {product?.price} $
        //                 </strong>
        //
        //             </div>
        //
        //             {/* ADD TO CART */}
        //             <button
        //                 type="button"
        //                 className="add-button"
        //                 disabled={
        //                     !available ||
        //                     (hasSizes && !selectedSize)
        //                 }
        //                 onClick={handleAdd}
        //             >
        //                 <ShoppingBag size={18} />
        //
        //                 {hasSizes && !selectedSize
        //                     ? 'Оберіть розмір'
        //                     : available
        //                         ? 'До кошика'
        //                         : 'Немає в наявності'}
        //             </button>
        //
        //         </div>
        //
        //     </div>
        //
        // </article>

        <article className="product-card">
            <div className="product-image"><ProductModel
                src={product.model}
                poster={product.image}
            />
                <div className="three-d-badge"><Box size={14} /> 3D</div>
                <Link
                    className="product-open"
                    to={`/product/${product.id}`}
                    aria-label={`${t.product.details || t.product.view3d}: ${product.name}`}
                ><ArrowUpRight size={17} /></Link></div>
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                {/* SIZES */}
                {hasSizes && (<div className="product-sizes">

                        <span className="product-sizes-title">
                            Розмір:
                        </span>

                    <div className="size-list">

                        {sizes.map(item => {
                            const isSelected = selectedSize === item.size;

                            const isAvailable = Number(item.stock) > 0;

                            return (<button
                                key={item.id || item.size}
                                type="button"
                                className={['size-button', isSelected ? 'selected' : '', !isAvailable ? 'disabled' : '']
                                    .filter(Boolean)
                                    .join(' ')}
                                disabled={!isAvailable}
                                onClick={() => setSelectedSize(item.size)}
                            >
                                        <span>
                                            {item.size}
                                        </span>

                                {!isAvailable && (<span className="size-stock">
                                                Немає
                                            </span>)}
                            </button>);
                        })}

                    </div>
                </div>)}

                {/* STOCK */}
                {hasSizes && selectedSizeData && (<div className="product-stock">

                    {Number(selectedSizeData.stock) > 0 ? (<>
                        В наявності:{' '}
                        {selectedSizeData.stock} шт.
                    </>) : ('Немає в наявності')}

                </div>)}

                {/* Якщо є розміри, але нічого не вибрано */}
                {hasSizes && !selectedSize && (<div className="product-stock">
                    Оберіть розмір
                </div>)}

                {/* Якщо розмірів немає */}
                {!hasSizes && (<div className="product-stock">
                    {Number(product?.stock || 0) > 0 ? `В наявності: ${product.stock} шт.` : 'Немає в наявності'}
                </div>)}




                <div className="product-bottom">
                    <div className="price">
                        <strong>€{product.price}</strong>{product.oldPrice &&
                        <del>€{product.oldPrice}</del>}</div>

                    <button
                        type="button"
                        className="add-button"
                        disabled={!available || (hasSizes && !selectedSize)}
                        onClick={handleAdd}
                    >
                        <ShoppingBag size={17} />

                        {hasSizes && !selectedSize
                            ? 'Оберіть розмір'
                            : available
                                ? t.product.add
                                : 'Немає в наявності'
                        }
                    </button>

                    {/*<button*/}
                    {/*    className="add-button"*/}
                    {/*    onClick={handleAdd}*/}
                    {/*>*/}
                    {/*    <ShoppingBag size={17} />*/}
                    {/*    {t.product.add}*/}
                    {/*</button>*/}
                </div>
            </div>
        </article>

    );
}


// import { useState } from 'react';
// import { ShoppingBag } from 'lucide-react';
//
// export default function ProductCard({ product, onAdd }) {
//     const sizes = Array.isArray(product.product_sizes)
//         ? product.product_sizes
//         : [];
//
//     const hasSizes = sizes.length > 0;
//
//     const availableSizes = sizes.filter(
//         item => Number(item.stock) > 0
//     );
//
//     const [selectedSize, setSelectedSize] = useState(
//         availableSizes[0]?.size || ''
//     );
//
//     const selectedSizeData = sizes.find(
//         item => item.size === selectedSize
//     );
//
//     const selectedStock = Number(
//         selectedSizeData?.stock || 0
//     );
//
//     const isAvailable = hasSizes
//         ? selectedStock > 0
//         : true;
//
//     const hasStock = hasSizes
//         ? availableSizes.length > 0
//         : true;
//
//     function handleAdd() {
//         if (!isAvailable) {
//             return;
//         }
//
//         onAdd({
//             ...product,
//             selectedSize: hasSizes
//                 ? selectedSize
//                 : null
//         });
//     }
//
//     return (
//         <article className="product-card">
//
//             <div className="product-image">
//                 {product.image_url ? (
//                     <img
//                         src={product.image_url}
//                         alt={product.name}
//                     />
//                 ) : (
//                     <div className="product-image-empty">
//                         Немає фото
//                     </div>
//                 )}
//             </div>
//
//             <div className="product-content">
//
//                 <div className="product-category">
//                     {product.category}
//                 </div>
//
//                 <h3>
//                     {product.name}
//                 </h3>
//
//                 {product.description && (
//                     <p className="product-description">
//                         {product.description}
//                     </p>
//                 )}
//
//                 <div className="product-price">
//
//                     {product.old_price && (
//                         <span className="old-price">
//                             {product.old_price} €
//                         </span>
//                     )}
//
//                     <strong>
//                         {product.price} €
//                     </strong>
//
//                 </div>
//
//                 {hasSizes && (
//                     <div className="product-sizes">
//
//                         <div className="product-sizes-title">
//                             Розмір:
//                         </div>
//
//                         <div className="product-sizes-list">
//
//                             {sizes.map(size => {
//
//                                 const stock =
//                                     Number(size.stock);
//
//                                 const available =
//                                     stock > 0;
//
//                                 return (
//                                     <button
//                                         key={size.id}
//                                         type="button"
//                                         disabled={!available}
//                                         className={[
//                                             'product-size',
//                                             selectedSize === size.size
//                                                 ? 'active'
//                                                 : '',
//                                             !available
//                                                 ? 'disabled'
//                                                 : ''
//                                         ].join(' ')}
//                                         onClick={() =>
//                                             setSelectedSize(
//                                                 size.size
//                                             )
//                                         }
//                                     >
//                                         {size.size}
//
//                                         {!available && (
//                                             <span>
//                                                 Немає
//                                             </span>
//                                         )}
//                                     </button>
//                                 );
//                             })}
//
//                         </div>
//
//                         {selectedSizeData &&
//                             selectedStock > 0 && (
//                                 <div className="product-stock">
//                                     Залишилось:{' '}
//                                     <strong>
//                                         {selectedStock}
//                                     </strong>{' '}
//                                     шт.
//                                 </div>
//                             )}
//
//                     </div>
//                 )}
//
//                 {!hasStock && (
//                     <div className="product-stock out">
//                         Немає в наявності
//                     </div>
//                 )}
//
//                 <button
//                     type="button"
//                     className="button primary product-add"
//                     disabled={!isAvailable}
//                     onClick={handleAdd}
//                 >
//                     <ShoppingBag size={18} />
//
//                     {hasStock
//                         ? 'Додати в кошик'
//                         : 'Немає в наявності'}
//                 </button>
//
//             </div>
//
//         </article>
//     );
// }