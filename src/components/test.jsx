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
                className="add-button"
                onClick={() => onAdd(product)}
            ><ShoppingBag size={17} /> {t.product.add}</button>
        </div>
    </div>
</article>;