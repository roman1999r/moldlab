import {useParams, useNavigate} from 'react-router-dom';
import ProductModel from '../components/ProductModel';
import {localizeProduct} from '../data/products';
import {useLanguage} from '../context/LanguageContext';

export default function Product({products, onAdd}) {
    const {id} = useParams();
    const nav = useNavigate();
    const {language, t} = useLanguage();
    const p = products.map(x => localizeProduct(x, language)).find(x => String(x.id) === String(id));
    if (!p) return <div className="container page">
        <h1>{t.product.notFound}</h1>
    </div>;
    return <main className="page">
        <div className="container product-detail">
            <button
                className="back"
                onClick={() => nav(-1)}
            >← {t.product.back}</button>
            <div className="detail-grid">
                <div className="detail-model"><ProductModel
                    src={p.model}
                    poster={p.image}
                    large
                /></div>
                <div><span className="eyebrow">{p.category}</span>
                    <h1>{p.name}</h1>
                    <p className="lead">{p.description}</p>
                    <div className="detail-price">€{p.price}</div>
                    <div className="detail-spec">
                        <div><span>{t.product.size}</span><b>{p.size}</b></div>
                        <div><span>{t.product.cells}</span><b>{p.cells}</b>
                        </div>
                        <div><span>{t.product.preview}</span><b>✓</b></div>
                    </div>
                    <button
                        className="button primary full"
                        onClick={() => onAdd(p)}
                    >{t.product.add}</button>
                </div>
            </div>
        </div>
    </main>;
}
