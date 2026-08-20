import {Box, ShoppingBag, ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router-dom';
import ProductModel from './ProductModel';
import {useLanguage} from '../context/LanguageContext';

export default function ProductCard({product, onAdd}) {
    const {t} = useLanguage();
    return <article className="product-card">
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
            <div className="product-meta">
                <span>{product.size}</span><span>{product.cells} {t.product.cells.toLowerCase()}</span>
            </div>
            <div className="product-bottom">
                <div className="price">
                    <strong>€{product.price}</strong>{product.oldPrice &&
                    <del>€{product.oldPrice}</del>}</div>
                <button
                    className="add-button"
                    onClick={() => onAdd(product)}
                ><ShoppingBag size={17} /> {t.product.add}</button>
            </div>
        </div>
    </article>;
}
