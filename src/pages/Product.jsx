// import {useParams, useNavigate} from 'react-router-dom';
// import ProductModel from '../components/ProductModel';
// import {localizeProduct} from '../data/products';
// import {useLanguage} from '../context/LanguageContext';
//
// export default function Product({products, onAdd}) {
//     const {id} = useParams();
//     const nav = useNavigate();
//     const {language, t} = useLanguage();
//     const p = products.map(x => localizeProduct(x, language)).find(x => String(x.id) === String(id));
//     if (!p) return <div className="container page">
//         <h1>{t.product.notFound}</h1>
//     </div>;
//     return <main className="page">
//         <div className="container product-detail">
//             <button
//                 className="back"
//                 onClick={() => nav(-1)}
//             >← {t.product.back}</button>
//             <div className="detail-grid">
//                 <div className="detail-model"><ProductModel
//                     src={p.model}
//                     poster={p.image}
//                     large
//                 /></div>
//                 <div><span className="eyebrow">{p.category}</span>
//                     <h1>{p.name}</h1>
//                     <p className="lead">{p.description}</p>
//                     <div className="detail-price">€{p.price}</div>
//                     <div className="detail-spec">
//                         <div><span>{t.product.size}</span><b>{p.size}</b></div>
//                         <div><span>{t.product.cells}</span><b>{p.cells}</b>
//                         </div>
//                         <div><span>{t.product.preview}</span><b>✓</b></div>
//                     </div>
//                     <button
//                         className="button primary full"
//                         onClick={() => onAdd(p)}
//                     >{t.product.add}</button>
//                 </div>
//             </div>
//         </div>
//     </main>;
// }





import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductModel from '../components/ProductModel';
import { localizeProduct } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

export default function Product({ products, onAdd }) {
    const { id } = useParams();
    const nav = useNavigate();
    const { language, t } = useLanguage();

    const [selectedSize, setSelectedSize] = useState(null);

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
     * Локалізуємо товар,
     * але product_sizes залишаємо
     */
    const p = localizeProduct(
        originalProduct,
        language
    );

    const sizes = Array.isArray(originalProduct.product_sizes)
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

    function handleAdd() {
        /*
         * Якщо товар має розміри —
         * розмір обов'язково треба вибрати.
         */
        if (sizes.length > 0 && !selectedSize) {
            alert('Будь ласка, виберіть розмір');
            return;
        }

        console.log('========== ADD TO CART ==========');
        console.log('PRODUCT ID:', p.id);
        console.log('PRODUCT NAME:', p.name);
        console.log('SELECTED SIZE:', selectedSize);

        /*
         * Передаємо товар + конкретний розмір
         */
        onAdd(p, selectedSize);
    }

    return (
        <main className="page">

            <div className="container product-detail">

                <button
                    className="back"
                    onClick={() => nav(-1)}
                >
                    ← {t.product.back}
                </button>

                <div className="detail-grid">

                    {/* MODEL */}

                    <div className="detail-model">
                        <ProductModel
                            src={p.model}
                            poster={p.image}
                            large
                        />
                    </div>

                    {/* INFO */}

                    <div>

                        <span className="eyebrow">
                            {p.category}
                        </span>

                        <h1>
                            {p.name}
                        </h1>

                        <p className="lead">
                            {p.description}
                        </p>

                        <div className="detail-price">
                            €
                            {Number(
                                p.price || 0
                            ).toFixed(2)}
                        </div>

                        {/* SIZE SELECTOR */}

                        {sizes.length > 0 && (
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

                                    {sizes.map(size => {

                                        const value =
                                            String(size.size);

                                        const stock =
                                            Number(
                                                size.stock || 0
                                            );

                                        const isSelected =
                                            selectedSize === value;

                                        const isOutOfStock =
                                            stock <= 0;

                                        return (
                                            <button
                                                key={size.id}
                                                type="button"
                                                disabled={
                                                    isOutOfStock
                                                }
                                                className={
                                                    isSelected
                                                        ? 'active'
                                                        : ''
                                                }
                                                onClick={() => {
                                                    console.log(
                                                        'SIZE SELECTED:',
                                                        value
                                                    );

                                                    setSelectedSize(
                                                        value
                                                    );
                                                }}
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
                                    })}

                                </div>

                            </div>
                        )}

                        {/* SPECIFICATIONS */}

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

                        {/* ADD TO CART */}

                        <button
                            type="button"
                            className="button primary full"
                            disabled={
                                sizes.length > 0 &&
                                !selectedSize
                            }
                            onClick={handleAdd}
                        >
                            {t.product.add}
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}