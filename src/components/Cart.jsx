import {useMemo, useState} from 'react';
import {X, Plus, Minus, Trash2, LoaderCircle} from 'lucide-react';
import {supabase} from '../lib/supabase';
import {useLanguage} from '../context/LanguageContext';

export default function Cart({cart, setCart}) {
    const {t} = useLanguage();
    const [checkout, setCheckout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const items = cart.map(p => ({product: p, quantity: p.quantity || 1}));
    const total = useMemo(() => items.reduce((s, {
        product,
        quantity
    }) => s + Number(product.price) * quantity, 0), [items]);
    const change = (id, delta) => setCart(c => c.flatMap(p => {
        if (p.id !== id) return [p];
        const next = (p.quantity || 1) + delta;
        return next <= 0 ? [] : [{...p, quantity: next}]
    }));

    async function submitOrder(e) {
        e.preventDefault();
        setMessage('');
        if (!supabase) return setMessage(t.cart.connect);
        setLoading(true);
        try {
            const payload = {
                customer_name: e.currentTarget.customer_name.value,
                email: e.currentTarget.email.value,
                phone: e.currentTarget.phone.value,
                comment: e.currentTarget.comment.value,
                items: items.map(({product, quantity}) => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity
                })),
                total,
                status: 'new'
            };
            console.log('ORDER PAYLOAD:', JSON.stringify(payload, null, 2));


            const { data, error } = await supabase.functions.invoke('create-order', {
                body: payload,
            });

            if (error) {
                console.error('FUNCTION ERROR:', error);

                if (error.context) {
                    try {
                        const body = await error.context.json();
                        console.error('FUNCTION RESPONSE BODY:', body);
                    } catch {
                        console.error('Could not read function response body');
                    }
                }

                throw error;
            }

            console.log('CREATE ORDER RESPONSE:', data);

            if (!data?.ok) {
                throw new Error(data?.error || 'Не вдалося створити замовлення');
            }

            // const {
            //     // data,
            //     error
            // } = await supabase.from('orders').insert(payload)
                // .select('id').single();
            if (error) throw error;
            // await supabase.functions.invoke('notify-new-order', {body: {order_id: data.id}}).catch(() => null);
            setCart([]);
            setCheckout(false);
            setMessage(t.cart.success);
        } catch (error) {
            console.error('ORDER ERROR:', error);
            setMessage(error.message || t.cart.error);
        } finally {
            setLoading(false)
        }
    }

    return <aside
        className="cart-drawer"
        id="cart"
    >
        <div className="cart-head">
            <div><span className="eyebrow">{t.cart.eyebrow}</span>
                <h3>{t.cart.title}</h3>
            </div>
            <button
                className="icon-button"
                onClick={() => setCart([])}
                aria-label="Clear cart"
            ><X size={18} /></button>
        </div>
        <div className="cart-list">{items.map(({product, quantity}) => <div
            className="cart-item"
            key={product.id}
        >
            <div><b>{product.name}</b><small>€{product.price} / шт.</small>
            </div>
            <div className="quantity">
                <button onClick={() => change(product.id, -1)}>
                    <Minus size={13} /></button>
                <span>{quantity}</span>
                <button onClick={() => change(product.id, 1)}><Plus size={13} />
                </button>
            </div>
            <strong>€{(product.price * quantity).toFixed(2)}</strong>
            <button
                className="remove"
                onClick={() => setCart(c => c.filter(p => p.id !== product.id))}
            ><Trash2 size={15} /></button>
        </div>)}</div>
        <div className="cart-total">
            <span>{t.cart.total}</span><strong>€{total.toFixed(2)}</strong>
        </div>
        {message && <div className="notice">{message}</div>}{!checkout ? <button
        className="button primary full"
        onClick={() => setCheckout(true)}
    >{t.cart.checkout}</button> : <form
        className="checkout-form"
        onSubmit={submitOrder}
    ><input
        name="customer_name"
        required
        placeholder={t.cart.name}
    /><input
        name="email"
        required
        type="email"
        placeholder={t.cart.email}
    /><input
        name="phone"
        required
        placeholder={t.cart.phone}
    /><textarea
        name="comment"
        placeholder={t.cart.comment}
    />
        <button
            className="button primary full"
            disabled={loading}
        >{loading ? <LoaderCircle
            className="spin"
            size={18}
        /> : t.cart.submit}</button>
        <button
            type="button"
            className="button secondary full"
            onClick={() => setCheckout(false)}
        >{t.cart.back}</button>
    </form>}</aside>;
}
