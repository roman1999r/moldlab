import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag
} from 'lucide-react';

export default function Cart({
                                 cart,
                                 updateCartQuantity,
                                 removeFromCart,
                                 clearCart
                             }) {
    if (!cart?.length) {
        return null;
    }

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price || 0) *
            Number(item.quantity || 0),
        0
    );

    const count = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.quantity || 0),
        0
    );

    return (
        <aside className="cart">

            <div className="cart-header">

                <div>
                    <h2>
                        Корзина
                    </h2>

                    <span>
                        {count}{' '}
                        {count === 1
                            ? 'товар'
                            : 'товари'}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={clearCart}
                    className="cart-clear"
                >
                    Очистити
                </button>

            </div>

            <div className="cart-items">

                {cart.map(item => {

                    const quantity =
                        Number(
                            item.quantity || 1
                        );

                    const stock =
                        Number(
                            item.stock
                        );

                    const maxReached =
                        Number.isFinite(stock) &&
                        quantity >= stock;

                    return (
                        <div
                            className="cart-item"
                            key={`${item.id}-${item.selectedSize}`}
                        >

                            {/* IMAGE */}

                            <div className="cart-item-image">

                                {item.image_url ? (
                                    <img
                                        src={
                                            item.image_url
                                        }
                                        alt={
                                            item.name
                                        }
                                    />
                                ) : (
                                    <ShoppingBag
                                        size={20}
                                    />
                                )}

                            </div>

                            {/* INFO */}

                            <div className="cart-item-info">

                                <strong>
                                    {item.name}
                                </strong>

                                <span>
                                    Розмір:{' '}
                                    <b>
                                        {
                                            item.selectedSize
                                        }
                                    </b>
                                </span>

                                <span>
                                    €{
                                    Number(
                                        item.price ||
                                        0
                                    ).toFixed(2)
                                }
                                </span>

                                {/* QUANTITY */}

                                <div className="cart-quantity">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateCartQuantity(
                                                item.id,
                                                item.selectedSize,
                                                quantity - 1
                                            )
                                        }
                                        disabled={
                                            quantity <= 1
                                        }
                                    >
                                        <Minus
                                            size={14}
                                        />
                                    </button>

                                    <span>
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateCartQuantity(
                                                item.id,
                                                item.selectedSize,
                                                quantity + 1
                                            )
                                        }
                                        disabled={
                                            maxReached
                                        }
                                    >
                                        <Plus
                                            size={14}
                                        />
                                    </button>

                                </div>

                                {maxReached && (
                                    <small className="cart-stock-warning">
                                        Максимальна кількість:
                                        {' '}
                                        {stock}
                                    </small>
                                )}

                            </div>

                            {/* PRICE */}

                            <div className="cart-item-right">

                                <strong>
                                    €
                                    {(
                                        Number(
                                            item.price ||
                                            0
                                        ) *
                                        quantity
                                    ).toFixed(2)}
                                </strong>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFromCart(
                                            item.id,
                                            item.selectedSize
                                        )
                                    }
                                    className="cart-remove"
                                    aria-label="Видалити"
                                >
                                    <Trash2
                                        size={17}
                                    />
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* TOTAL */}

            <div className="cart-footer">

                <div className="cart-total">

                    <span>
                        Разом
                    </span>

                    <strong>
                        €
                        {total.toFixed(2)}
                    </strong>

                </div>

                <button
                    type="button"
                    className="button primary cart-checkout"
                >
                    Оформити замовлення
                </button>

            </div>

        </aside>
    );
}