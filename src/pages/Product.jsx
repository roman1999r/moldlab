// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ProductModel from '../components/ProductModel';
// import { localizeProduct } from '../data/products';
// import { useLanguage } from '../context/LanguageContext';
//
// export default function Product({ products, onAdd }) {
//     const { id } = useParams();
//     const nav = useNavigate();
//     const { language, t } = useLanguage();
//
//     const [selectedSize, setSelectedSize] = useState(null);
//
//     const originalProduct = products.find(
//         x => String(x.id) === String(id)
//     );
//
//     if (!originalProduct) {
//         return (
//             <div className="container page">
//                 <h1>{t.product.notFound}</h1>
//             </div>
//         );
//     }
//
//     /*
//      * Локалізуємо товар,
//      * але product_sizes залишаємо
//      */
//     const p = localizeProduct(
//         originalProduct,
//         language
//     );
//
//     const sizes = Array.isArray(originalProduct.product_sizes)
//         ? originalProduct.product_sizes
//         : [];
//
//     console.log('PRODUCT:', p);
//     console.log(
//         'PRODUCT SIZES:',
//         originalProduct.product_sizes
//     );
//     console.log(
//         'SELECTED SIZE:',
//         selectedSize
//     );
//
//     function handleAdd() {
//         /*
//          * Якщо товар має розміри —
//          * розмір обов'язково треба вибрати.
//          */
//         if (sizes.length > 0 && !selectedSize) {
//             alert('Будь ласка, виберіть розмір');
//             return;
//         }
//
//         console.log('========== ADD TO CART ==========');
//         console.log('PRODUCT ID:', p.id);
//         console.log('PRODUCT NAME:', p.name);
//         console.log('SELECTED SIZE:', selectedSize);
//
//         /*
//          * Передаємо товар + конкретний розмір
//          */
//         onAdd(p, selectedSize);
//     }
//
//     return (
//         <main className="page">
//
//             <div className="container product-detail">
//
//                 <button
//                     className="back"
//                     onClick={() => nav(-1)}
//                 >
//                     ← {t.product.back}
//                 </button>
//
//                 <div className="detail-grid">
//
//                     {/* MODEL */}
//
//                     <div className="detail-model">
//                         <ProductModel
//                             src={p.model}
//                             poster={p.image}
//                             large
//                         />
//                     </div>
//
//                     {/* INFO */}
//
//                     <div>
//
//                         <span className="eyebrow">
//                             {p.category}
//                         </span>
//
//                         <h1>
//                             {p.name}
//                         </h1>
//
//                         <p className="lead">
//                             {p.description}
//                         </p>
//
//                         <div className="detail-price">
//                             €
//                             {Number(
//                                 p.price || 0
//                             ).toFixed(2)}
//                         </div>
//
//                         {/* SIZE SELECTOR */}
//
//                         {sizes.length > 0 && (
//                             <div className="product-size-selector">
//
//                                 <div className="product-size-title">
//
//                                     <span>
//                                         {t.product.size}
//                                     </span>
//
//                                     {selectedSize && (
//                                         <strong>
//                                             {selectedSize}
//                                         </strong>
//                                     )}
//
//                                 </div>
//
//                                 <div className="product-size-options">
//
//                                     {sizes.map(size => {
//
//                                         const value =
//                                             String(size.size);
//
//                                         const stock =
//                                             Number(
//                                                 size.stock || 0
//                                             );
//
//                                         const isSelected =
//                                             selectedSize === value;
//
//                                         const isOutOfStock =
//                                             stock <= 0;
//
//                                         return (
//                                             <button
//                                                 key={size.id}
//                                                 type="button"
//                                                 disabled={
//                                                     isOutOfStock
//                                                 }
//                                                 className={`size-button ${isSelected ? 'active' : ''}`}
//                                                 onClick={() => {
//                                                     console.log(
//                                                         'SIZE SELECTED:',
//                                                         value
//                                                     );
//
//                                                     setSelectedSize(
//                                                         value
//                                                     );
//                                                 }}
//                                             >
//                                                 <span>
//                                                     {value}
//                                                 </span>
//
//                                                 {isOutOfStock && (
//                                                     <small>
//                                                         Немає в наявності
//                                                     </small>
//                                                 )}
//                                             </button>
//                                         );
//                                     })}
//
//                                 </div>
//
//                             </div>
//                         )}
//
//                         {/* SPECIFICATIONS */}
//
//                         <div className="detail-spec">
//
//                             {sizes.length === 0 && (
//                                 <div>
//                                     <span>
//                                         {t.product.size}
//                                     </span>
//
//                                     <b>
//                                         {p.size || '—'}
//                                     </b>
//                                 </div>
//                             )}
//
//                             <div>
//                                 <span>
//                                     {t.product.cells}
//                                 </span>
//
//                                 <b>
//                                     {p.cells}
//                                 </b>
//                             </div>
//
//                             <div>
//                                 <span>
//                                     {t.product.preview}
//                                 </span>
//
//                                 <b>
//                                     ✓
//                                 </b>
//                             </div>
//
//                         </div>
//
//                         {/* ADD TO CART */}
//
//                         <button
//                             type="button"
//                             className="button primary full"
//                             disabled={
//                                 sizes.length > 0 &&
//                                 !selectedSize
//                             }
//                             onClick={handleAdd}
//                         >
//                             {t.product.add}
//                         </button>
//
//                     </div>
//
//                 </div>
//
//             </div>
//
//         </main>
//     );
// }



import {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {ArrowUpRight, Box} from 'lucide-react';

import ProductModel from '../components/ProductModel';
import { localizeProduct } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Product({ products, onAdd }) {
    const { id } = useParams();
    const nav = useNavigate();
    const { language, t } = useLanguage();

    const [selectedSize, setSelectedSize] = useState(null);
    const [show3D, setShow3D] = useState(false);
    const modelContainerRef = useRef(null);

    useEffect(() => {
        if (!show3D || !modelContainerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Модель повністю вийшла з екрану
                if (!entry.isIntersecting) {
                    setShow3D(false);
                }
            },
            {
                threshold: 0
            }
        );

        observer.observe(modelContainerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [show3D]);

    const originalProduct = products.find(
        x => String(x.id) === String(id)
    );

    if (!originalProduct) {
        return (
            <div className="container page">
                <h1>{t.product.notFound}</h1>
            </div>
        );
    }

    /*
     * Локалізуємо товар
     */
    const p = localizeProduct(
        originalProduct,
        language
    );

    /*
     * Розміри з Supabase
     */
    const sizes = Array.isArray(
        originalProduct.product_sizes
    )
        ? originalProduct.product_sizes
        : [];

    console.log('PRODUCT:', p);
    console.log(
        'PRODUCT SIZES:',
        originalProduct.product_sizes
    );
    console.log(
        'SELECTED SIZE:',
        selectedSize
    );

    /*
     * Вибраний розмір
     */
    const selectedSizeData = sizes.find(
        item =>
            String(item.size) ===
            String(selectedSize)
    );

    /*
     * Перевірка наявності
     */
    const hasSizes = sizes.length > 0;

    const available = hasSizes
        ? Boolean(
            selectedSizeData &&
            Number(selectedSizeData.stock) > 0
        )
        : Number(p.stock || 0) > 0;

    /*
     * Додавання в кошик
     */
    function handleAdd() {

        /*
         * Якщо є розміри —
         * потрібно вибрати розмір
         */
        if (hasSizes && !selectedSize) {
            alert('Будь ласка, виберіть розмір');
            return;
        }

        /*
         * Якщо товару немає
         */
        if (!available) {
            return;
        }

        console.log(
            '========== ADD TO CART =========='
        );

        console.log(
            'PRODUCT ID:',
            p.id
        );

        console.log(
            'PRODUCT NAME:',
            p.name
        );

        console.log(
            'SELECTED SIZE:',
            selectedSize
        );

        onAdd?.(
            p,
            selectedSize || null
        );
    }

    return (
        <main className="page">

            <div className="container product-detail">

                {/* BACK */}

                <button
                    className="back"
                    onClick={() => nav(-1)}
                >
                    ← {t.product.back}
                </button>


                <div ref={modelContainerRef} className="detail-grid">


                    {/* ================================================= */}
                    {/* MODEL / PHOTO */}
                    {/* ================================================= */}
                    <div className="product-image">
                        {show3D ? (
                            <ProductModel
                                src={p.model}
                                poster={p.image}
                            />
                        ) : (
                            <img
                                src={p.image}
                                alt={p.name}
                                className="product-image-photo"
                            />
                        )}

                        <button
                            type="button"
                            className="three-d-badge"
                            onClick={() => setShow3D(prev => !prev)}
                            aria-label={show3D ? 'Show photo' : 'Show 3D model'}
                        >
                            <Box size={14} />
                            {show3D ? 'Фото' : '3D'}
                        </button>

                    </div>
                    {/*<div className="detail-model">*/}

                    {/*    <div className="detail-media">*/}

                    {/*        {show3D && p.model ? (*/}
                    {/*            <ProductModel*/}
                    {/*                src={p.model}*/}
                    {/*                poster={p.image}*/}
                    {/*                large*/}
                    {/*            />*/}
                    {/*        ) : (*/}
                    {/*            <img*/}
                    {/*                src={p.image}*/}
                    {/*                alt={p.name}*/}
                    {/*                className="detail-product-photo"*/}
                    {/*            />*/}
                    {/*        )}*/}

                    {/*        /!* ПЕРЕМИКАЧ *!/*/}

                    {/*        {p.model && (*/}
                    {/*            <button*/}
                    {/*                type="button"*/}
                    {/*                className="detail-3d-toggle"*/}
                    {/*                onClick={() =>*/}
                    {/*                    setShow3D(prev => !prev)*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                <Box size={16} />*/}

                    {/*                {show3D ? 'Фото' : '3D'}*/}
                    {/*            </button>*/}
                    {/*        )}*/}

                    {/*    </div>*/}

                    {/*</div>*/}


                    {/* ================================================= */}
                    {/* INFO */}
                    {/* ================================================= */}

                    <div>

                        {/* CATEGORY */}

                        <span className="eyebrow">
                            {p.category}
                        </span>


                        {/* NAME */}

                        <h1>
                            {p.name}
                        </h1>


                        {/* DESCRIPTION */}

                        <p className="lead">
                            {p.description}
                        </p>


                        {/* PRICE */}

                        <div className="detail-price">
                            €
                            {Number(
                                p.price || 0
                            ).toFixed(2)}
                        </div>


                        {/* ================================================= */}
                        {/* SIZE SELECTOR */}
                        {/* ================================================= */}

                        {hasSizes && (
                            <div className="product-size-selector">

                                <div className="product-size-title">

                                    <span>
                                        {t.product.size}
                                    </span>

                                    {selectedSize && (
                                        <strong>
                                            {selectedSize}
                                        </strong>
                                    )}

                                </div>


                                <div className="product-size-options">

                                    {sizes.map(
                                        size => {

                                            const value =
                                                String(
                                                    size.size
                                                );

                                            const stock =
                                                Number(
                                                    size.stock ||
                                                    0
                                                );

                                            const isSelected =
                                                selectedSize ===
                                                value;

                                            const isOutOfStock =
                                                stock <= 0;

                                            return (
                                                <button
                                                    key={
                                                        size.id ||
                                                        value
                                                    }
                                                    type="button"
                                                    disabled={
                                                        isOutOfStock
                                                    }
                                                    className={[
                                                        'size-button',
                                                        isSelected
                                                            ? 'selected'
                                                            : '',
                                                        isOutOfStock
                                                            ? 'disabled'
                                                            : ''
                                                    ]
                                                        .filter(
                                                            Boolean
                                                        )
                                                        .join(
                                                            ' '
                                                        )}
                                                    onClick={() =>
                                                        setSelectedSize(
                                                            value
                                                        )
                                                    }
                                                >

                                                    <span>
                                                        {value}
                                                    </span>

                                                    {isOutOfStock && (
                                                        <small>
                                                            Немає в наявності
                                                        </small>
                                                    )}

                                                </button>
                                            );
                                        }
                                    )}

                                </div>

                            </div>
                        )}


                        {/* ================================================= */}
                        {/* STOCK */}
                        {/* ================================================= */}

                        {hasSizes &&
                            selectedSizeData && (
                                <div className="product-stock">

                                    {Number(
                                        selectedSizeData.stock
                                    ) > 0
                                        ? (
                                            <>
                                                В наявності:{' '}
                                                {
                                                    selectedSizeData.stock
                                                }{' '}
                                                шт.
                                            </>
                                        )
                                        : (
                                            'Немає в наявності'
                                        )}

                                </div>
                            )}


                        {/* SIZE NOT SELECTED */}

                        {hasSizes &&
                            !selectedSize && (
                                <div className="product-stock">
                                    Оберіть розмір
                                </div>
                            )}


                        {/* NO SIZES */}

                        {!hasSizes && (
                            <div className="product-stock">

                                {Number(
                                    p.stock || 0
                                ) > 0
                                    ? `В наявності: ${p.stock} шт.`
                                    : 'Немає в наявності'}

                            </div>
                        )}


                        {/* ================================================= */}
                        {/* SPECIFICATIONS */}
                        {/* ================================================= */}

                        <div className="detail-spec">

                            {sizes.length === 0 && (
                                <div>

                                    <span>
                                        {t.product.size}
                                    </span>

                                    <b>
                                        {p.size || '—'}
                                    </b>

                                </div>
                            )}


                            <div>

                                <span>
                                    {t.product.cells}
                                </span>

                                <b>
                                    {p.cells}
                                </b>

                            </div>


                            <div>

                                <span>
                                    {t.product.preview}
                                </span>

                                <b>
                                    ✓
                                </b>

                            </div>

                        </div>


                        {/* ================================================= */}
                        {/* ADD TO CART */}
                        {/* ================================================= */}

                        <button
                            type="button"
                            className="button primary full"
                            disabled={
                                !available ||
                                (
                                    hasSizes &&
                                    !selectedSize
                                )
                            }
                            onClick={handleAdd}
                        >

                            {hasSizes &&
                            !selectedSize
                                ? 'Оберіть розмір'
                                : available
                                    ? t.product.add
                                    : 'Немає в наявності'}

                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}

