// import {Box, ShoppingBag, ArrowUpRight} from 'lucide-react';
// import {Link} from 'react-router-dom';
// import ProductModel from './ProductModel';
// import {useLanguage} from '../context/LanguageContext';
// import {Heart} from 'lucide-react';
// import {useWishlist} from '../hooks/useWishlist';
//
// export default function ProductCard({product, onAdd}) {
//     const {t} = useLanguage();
//     const {
//         isInWishlist,
//         toggleWishlist
//     } = useWishlist();
//
//     return <article className="product-card">
//         <div className="product-image"><ProductModel
//             src={product.model}
//             poster={product.image}
//         />
//             <div className="three-d-badge"><Box size={14} /> 3D</div>
//             <Link
//                 className="product-open"
//                 to={`/product/${product.id}`}
//                 aria-label={`${t.product.details || t.product.view3d}: ${product.name}`}
//             ><ArrowUpRight size={17} /></Link>
//
//             <button
//                 type="button"
//                 className={`wishlist-button ${liked ? 'active' : ''}`}
//                 onClick={() =>
//                     toggleWishlist(product)
//                 }
//                 aria-label="Wishlist"
//             >
//                 <Heart
//                     size={20}
//                     fill={liked ? 'currentColor' : 'none'}
//                 />
//             </button>
//
//         </div>
//         <div className="product-info">
//             <span className="product-category">{product.category}</span>
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <div className="product-meta">
//                 <span>{product.size}</span><span>{product.cells} {t.product.cells.toLowerCase()}</span>
//             </div>
//             <div className="product-bottom">
//                 <div className="price">
//                     <strong>€{product.price}</strong>{product.oldPrice &&
//                     <del>€{product.oldPrice}</del>}</div>
//                 <button
//                     className="add-button"
//                     onClick={() => onAdd(product)}
//                 ><ShoppingBag size={17} /> {t.product.add}</button>
//             </div>
//             <button
//                 className={`wishlist-button ${
//                     isInWishlist(product.id) ? 'active' : ''
//                 }`}
//                 onClick={async e => {
//                     e.preventDefault();
//                     e.stopPropagation();
//
//                     const result = await toggleWishlist(product.id);
//
//                     if (result?.requiresLogin) {
//                         window.location.href = '/auth';
//                     }
//                 }}
//             >
//                 <Heart
//                     size={20}
//                     fill={
//                         isInWishlist(product.id)
//                             ? 'currentColor'
//                             : 'none'
//                     }
//                 />
//             </button>
//
//         </div>
//     </article>;
// }


///////////////////////////////////////////////////////////////
// import { Link } from 'react-router-dom';
// import {
//     Heart,
//     ShoppingCart,
//     Box
// } from 'lucide-react';
//
// import { useWishlist } from '../hooks/useWishlist';
//
// export default function ProductCard({
//                                         product,
//                                         onAdd
//                                     }) {
//     const {
//         isInWishlist,
//         toggleWishlist
//     } = useWishlist();
//
//     const liked =
//         isInWishlist(product.id);
//
//     const imageUrl =
//         product.image_url ||
//         product.image ||
//         product.photo_url ||
//         null;
//
//     const modelUrl =
//         product.model_url ||
//         product.model_3d_url ||
//         product.glb_url ||
//         null;
//
//     function handleWishlist(e) {
//         e.preventDefault();
//         e.stopPropagation();
//
//         toggleWishlist(product);
//     }
//
//     function handleAdd(e) {
//         e.preventDefault();
//         e.stopPropagation();
//
//         onAdd(product);
//     }
//
//     return (
//         <article className="product-card">
//
//             <div className="product-image">
//
//                 <Link
//                     to={`/product/${product.id}`}
//                 >
//                     {modelUrl ? (
//                         <div className="model">
//                             <model-viewer
//                                 src={modelUrl}
//                                 c camera-controls
//                                 auto-rotate
//                                 rotation-per-second="18deg"
//                                 interaction-prompt="none"
//                                 shadow-intensity="1"
//                                 exposure="1"
//                                 camera-orbit="0deg 72deg 105%"
//                                 field-of-view="28deg"
//                             />
//                         </div>
//                     ) : imageUrl ? (
//                         <img
//                             src={imageUrl}
//                             alt={product.name}
//                             className="product-image-img"
//                         />
//                     ) : (
//                         <div className="model-empty">
//                             Немає зображення
//                         </div>
//                     )}
//                 </Link>
//
//                 {modelUrl && (
//                     <div className="three-d-badge">
//                         <Box size={14} />
//                         3D
//                     </div>
//                 )}
//
//
//
//                 <Link
//                     to={`/product/${product.id}`}
//                     className="product-open"
//                     onClick={e =>
//                         e.stopPropagation()
//                     }
//                 >
//                     <Box size={17} />
//                 </Link>
//
//                 {modelUrl && (
//                     <div className="model-hint">
//                         Перетягуйте для перегляду
//                     </div>
//                 )}
//             </div>
//
//             <div className="product-info">
//
//                 <div className="category">
//                     {product.category || 'MOLD'}
//                 </div>
//
//                 <Link
//                     to={`/product/${product.id}`}
//                 >
//                     <h3>
//                         {product.name}
//                     </h3>
//                 </Link>
//
//                 <p>
//                     {product.description || ''}
//                 </p>
//
//                 <div className="meta">
//                     {product.material && (
//                         <span>
//                             {product.material}
//                         </span>
//                     )}
//
//                     {product.size && (
//                         <span>
//                             {product.size}
//                         </span>
//                     )}
//                 </div>
//
//                 <div className="product-bottom">
//
//                     <strong>
//                         €{Number(
//                         product.price || 0
//                     ).toFixed(2)}
//                     </strong>
//
//                     {product.old_price && (
//                         <del>
//                             €{Number(
//                             product.old_price
//                         ).toFixed(2)}
//                         </del>
//                     )}
//
//                     <button
//                         type="button"
//                         className={`wishlist-button ${
//                             liked ? 'liked' : ''
//                         }`}
//                         onClick={handleWishlist}
//                         aria-label={
//                             liked
//                                 ? 'Видалити з обраного'
//                                 : 'Додати в обране'
//                         }
//                     >
//                         <Heart
//                             size={20}
//                             fill={
//                                 liked
//                                     ? 'currentColor'
//                                     : 'none'
//                             }
//                         />
//                     </button>
//
//                     <button
//                         type="button"
//                         onClick={handleAdd}
//                     >
//                         <ShoppingCart size={16} />
//                         Додати
//                     </button>
//
//                 </div>
//
//             </div>
//
//         </article>
//     );
// }

/////////////////////////////////////////////////////////////////////////
// import { Link } from 'react-router-dom';
// import { Heart, ShoppingBag, Box } from 'lucide-react';
// import {useState} from "react";
//
// export default function ProductCard({
//                                         product,
//                                         onAdd,
//                                         isLiked = false,
//                                         onToggleWishlist
//                                     }) {
//     const [sizes, setSizes] = useState([]);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [quantity, setQuantity] = useState(1);
//
//     useEffect(() => {
//         async function loadSizes() {
//             const {
//                 data,
//                 error
//             } = await supabase
//                 .from('product_sizes')
//                 .select('size, stock')
//                 .eq('product_id', product.id)
//                 .order('size');
//
//             if (error) {
//                 console.error(
//                     'LOAD SIZES ERROR:',
//                     error
//                 );
//                 return;
//             }
//
//             setSizes(data || []);
//
//             const availableSize =
//                 data?.find(item => item.stock > 0);
//
//             setSelectedSize(
//                 availableSize?.size ?? null
//             );
//         }
//
//         loadSizes();
//     }, [product.id]);
//
//
//
//
//     if (!product) return null;
//
//     return (
//         <article className="product-card">
//
//             <div className="product-image">
//
//                 <Link to={`/product/${product.id}`}>
//                     {product.model_url ? (
//                         <div className="model">
//                             <model-viewer
//                                 src={product.model_url}
//                                 camera-controls
//                                 auto-rotate
//                                 shadow-intensity="1"
//                                 exposure="1"
//                                 environment-image="neutral"
//                             />
//                         </div>
//                     ) : product.image_url ? (
//                         <img
//                             src={product.image_url}
//                             alt={product.name}
//                         />
//                     ) : (
//                         <div className="model-empty">
//                             Немає зображення
//                         </div>
//                     )}
//                 </Link>
//
//                 {product.model_url && (
//                     <div className="three-d-badge">
//                         <Box size={13} />
//                         3D
//                     </div>
//                 )}
//
//             </div>
//
//             <div className="product-info">
//
//                 <div className="category">
//                     {product.category || 'Mold'}
//                 </div>
//
//                 <Link to={`/product/${product.id}`}>
//                     <h3>{product.name}</h3>
//                 </Link>
//
//                 <p>
//                     {product.description || ''}
//                 </p>
//
//                 <div className="meta">
//                     {product.material && (
//                         <span>{product.material}</span>
//                     )}
//
//                     {product.size && (
//                         <span>{product.size}</span>
//                     )}
//                 </div>
//
//                 <div className="product-bottom">
//
//                     <strong>
//                         {product.price} €
//                     </strong>
//
//                     <div className="product-actions">
//
//                         {/* WISHLIST */}
//                         <button
//                             type="button"
//                             className={`wishlist-product-button ${
//                                 isLiked ? 'liked' : ''
//                             }`}
//                             onClick={() => {
//                                 if (onToggleWishlist) {
//                                     onToggleWishlist(product);
//                                 }
//                             }}
//                             aria-label={
//                                 isLiked
//                                     ? 'Видалити з улюблених'
//                                     : 'Додати в улюблені'
//                             }
//                         >
//                             <Heart
//                                 size={19}
//                                 fill={isLiked ? 'currentColor' : 'none'}
//                             />
//                         </button>
//
//                         {/* CART */}
//                         <button
//                             type="button"
//                             onClick={() => onAdd(product)}
//                             className="add-cart-button"
//                         >
//                             <ShoppingBag size={16} />
//                             Додати
//                         </button>
//
//                     </div>
//
//                 </div>
//
//             </div>
//
//         </article>
//     );
// }
/////////////////////////////////////////////

import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Heart,
    ShoppingBag,
    Box,
    Minus,
    Plus
} from 'lucide-react';

import {supabase} from '../lib/supabase';

export default function ProductCard({
                                        product,
                                        onAdd,
                                        isLiked = false,
                                        onToggleWishlist
                                    }) {
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loadingSizes, setLoadingSizes] = useState(true);

    useEffect(() => {
        if (!product?.id) return;

        async function loadSizes() {
            setLoadingSizes(true);

            const {
                data,
                error
            } = await supabase
                .from('product_sizes')
                .select('id, size, stock')
                .eq('product_id', product.id)
                .order('size');

            if (error) {
                console.error(
                    'LOAD PRODUCT SIZES ERROR:',
                    error
                );

                setSizes([]);
                setSelectedSize(null);
                setLoadingSizes(false);

                return;
            }

            const availableSizes = (data || []).filter(
                item => Number(item.stock) > 0
            );

            setSizes(data || []);

            const firstAvailable =
                availableSizes[0] || null;

            setSelectedSize(
                firstAvailable?.size ?? null
            );

            setQuantity(1);
            setLoadingSizes(false);
        }

        loadSizes();
    }, [product?.id]);

    if (!product) {
        return null;
    }

    /*
     * Знаходимо вибраний розмір.
     */
    const selectedSizeData = sizes.find(
        item => item.size === selectedSize
    );

    /*
     * Скільки товару залишилось для вибраного розміру.
     */
    const selectedStock = selectedSizeData
        ? Number(selectedSizeData.stock) || 0
        : 0;

    /*
     * Загальна кількість товару на складі.
     */
    const totalStock = sizes.reduce(
        (total, item) =>
            total + (Number(item.stock) || 0),
        0
    );

    const isOutOfStock =
        !loadingSizes &&
        sizes.length > 0 &&
        totalStock <= 0;

    /*
     * Якщо product_sizes ще не створений для товару,
     * можна залишити товар доступним.
     *
     * Якщо хочеш, щоб абсолютно кожен товар
     * обов'язково мав розмір — тут можна зробити
     * жорстку перевірку.
     */
    const hasSizes = sizes.length > 0;

    function decreaseQuantity() {
        setQuantity(current =>
            Math.max(1, current - 1)
        );
    }

    function increaseQuantity() {
        if (!selectedSizeData) return;

        setQuantity(current =>
            Math.min(
                selectedStock,
                current + 1
            )
        );
    }

    function handleQuantityChange(value) {
        const nextValue =
            Number(value) || 1;

        setQuantity(
            Math.min(
                Math.max(1, nextValue),
                selectedStock || 1
            )
        );
    }

    function handleSizeChange(size) {
        const sizeData = sizes.find(
            item => item.size === size
        );

        if (!sizeData) return;

        const stock =
            Number(sizeData.stock) || 0;

        if (stock <= 0) return;

        setSelectedSize(size);
        setQuantity(1);
    }

    function handleAdd() {
        if (isOutOfStock) {
            return;
        }

        /*
         * Якщо для товару є розміри,
         * обов'язково вибираємо розмір.
         */
        if (hasSizes && !selectedSizeData) {
            return;
        }

        /*
         * Перевірка залишку.
         */
        if (
            hasSizes &&
            quantity > selectedStock
        ) {
            return;
        }

        /*
         * Передаємо в Cart:
         *
         * product
         * selectedSize
         * quantity
         * stock
         */
        onAdd({
            ...product,

            selectedSize:
                hasSizes
                    ? selectedSize
                    : null,

            quantity,

            stock:
                hasSizes
                    ? selectedStock
                    : product.stock ?? null
        });
    }

    return (
        <article className="product-card">

            {/* IMAGE / 3D */}

            <div className="product-image">

                <Link
                    to={` / product / $
{
    product.id
}
`}
                >
                    {product.model_url ? (

                        <div className="model">

                            <model-viewer
                                src={product.model_url}
                                camera-controls
                                auto-rotate
                                shadow-intensity="1"
                                exposure="1"
                                environment-image="neutral"
                                interaction-prompt="none"
                            />

                        </div>

                    ) : product.image_url ? (

                        <img
                            src={product.image_url}
                            alt={product.name}
                        />

                    ) : (

                        <div className="model-empty">
                            Немає зображення
                        </div>

                    )}
                </Link>

                {product.model_url && (
                    <div className="three-d-badge">
                        <Box size={13} />
                        3D
                    </div>
                )}

            </div>

            {/* PRODUCT INFO */}

            <div className="product-info">

                <div className="category">
                    {product.category || 'Mold'}
                </div>

                <Link
                    to={` / product / $
{
    product.id
}
`}
                >
                    <h3>
                        {product.name}
                    </h3>
                </Link>

                <p>
                    {product.description || ''}
                </p>

                {/* SIZE */}

                {loadingSizes ? (

                    <div className="product-size-loading">
                        Завантаження розмірів...
                    </div>

                ) : hasSizes ? (

                    <div className="product-sizes">

                        <span className="sizes-title">
                            Розмір:
                        </span>

                        <div className="size-list">

                            {sizes.map(item => {

                                const stock =
                                    Number(item.stock) || 0;

                                const available =
                                    stock > 0;

                                const selected =
                                    selectedSize ===
                                    item.size;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        disabled={!available}
                                        className={
                                            `
size - button
$
{
    selected
        ? 'selected'
        : ''
}
$
{
    !available
        ? 'disabled'
        : ''
}
`
                                        }
                                        onClick={() =>
                                            handleSizeChange(
                                                item.size
                                            )
                                        }
                                    >
                                        {item.size}
                                    </button>
                                );
                            })}

                        </div>

                        {selectedSizeData && (
                            <span className="stock-info">
                                В наявності:{' '}
                                {selectedStock}
                            </span>
                        )}

                    </div>

                ) : null}

                {/* OUT OF STOCK */}

                {isOutOfStock && (
                    <div className="out-of-stock">
                        Немає в наявності
                    </div>
                )}

                {/* PRICE + ACTIONS */}
                {sizes.length > 0 && (
                    <div className="product-sizes">

        <span className="sizes-title">
            Розмір:
        </span>

                        <div className="sizes-list">

                            {sizes.map(item => (
                                <button
                                    key={item.id}
                                    type="button"
                                    disabled={item.stock <= 0}
                                    className={
                                        selectedSize === item.size
                                            ? 'size-button active'
                                            : 'size-button'
                                    }
                                    onClick={() => {
                                        setSelectedSize(item.size);
                                        setQuantity(1);
                                    }}
                                >
                                    {item.size}

                                    {item.stock <= 0 && (
                                        <small>
                                            Немає
                                        </small>
                                    )}
                                </button>
                            ))}

                        </div>

                    </div>
                )}
                {selectedSize && (
                    <div className="product-quantity">

                        <button
                            type="button"
                            onClick={() =>
                                setQuantity(
                                    current =>
                                        Math.max(
                                            1,
                                            current - 1
                                        )
                                )
                            }
                        >
                            −
                        </button>

                        <span>
            {quantity}
        </span>

                        <button
                            type="button"
                            onClick={() => {
                                const selected =
                                    sizes.find(
                                        item =>
                                            item.size ===
                                            selectedSize
                                    );

                                if (!selected) return;

                                setQuantity(current =>
                                    Math.min(
                                        selected.stock,
                                        current + 1
                                    )
                                );
                            }}
                        >
                            +
                        </button>

                    </div>
                )}

                <div className="product-bottom">

                    <div className="price">

                        <strong>
                            €
                            {Number(
                                product.price || 0
                            ).toFixed(2)}
                        </strong>

                        {product.old_price && (
                            <del>
                                €
                                {Number(
                                    product.old_price
                                ).toFixed(2)}
                            </del>
                        )}

                    </div>

                    <div className="product-actions">

                        {/* WISHLIST */}

                        <button
                            type="button"
                            className={
                                `
wishlist - product - button
$
{
    isLiked
        ? 'liked'
        : ''
}
`
                            }
                            onClick={() => {
                                if (
                                    onToggleWishlist
                                ) {
                                    onToggleWishlist(
                                        product
                                    );
                                }
                            }}
                            aria-label={
                                isLiked
                                    ? 'Видалити з улюблених'
                                    : 'Додати в улюблені'
                            }
                        >
                            <Heart
                                size={19}
                                fill={
                                    isLiked
                                        ? 'currentColor'
                                        : 'none'
                                }
                            />
                        </button>

                    </div>

                </div>

                {/* QUANTITY */}

                {!isOutOfStock &&
                    (!hasSizes ||
                        selectedSizeData) && (

                        <div className="product-quantity">

                        <span>
                            Кількість:
                        </span>

                            <div className="quantity-control">

                                <button
                                    type="button"
                                    onClick={
                                        decreaseQuantity
                                    }
                                    disabled={
                                        quantity <= 1
                                    }
                                    aria-label="Зменшити"
                                >
                                    <Minus size={15} />
                                </button>

                                <input
                                    type="number"
                                    min="1"
                                    max={
                                        hasSizes
                                            ? selectedStock
                                            : undefined
                                    }
                                    value={quantity}
                                    onChange={e =>
                                        handleQuantityChange(
                                            e.target.value
                                        )
                                    }
                                />

                                <button
                                    type="button"
                                    onClick={
                                        increaseQuantity
                                    }
                                    disabled={
                                        hasSizes &&
                                        quantity >=
                                        selectedStock
                                    }
                                    aria-label="Збільшити"
                                >
                                    <Plus size={15} />
                                </button>

                            </div>

                        </div>
                    )}

                {/* ADD TO CART */}

                <button
                    type="button"
                    onClick={handleAdd}
                    className="add-cart-button"
                    disabled={
                        isOutOfStock ||
                        (
                            hasSizes &&
                            !selectedSizeData
                        )
                    }
                >
                    <ShoppingBag size={16} />

                    {isOutOfStock
                        ? 'Немає в наявності'
                        : hasSizes &&
                        !selectedSizeData
                            ? 'Оберіть розмір'
                            : 'Додати'}
                </button>

            </div>

        </article>
    );
}

