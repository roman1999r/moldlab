import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import Product from './pages/Product';
import Admin from './pages/Admin';
import {demoProducts} from './data/products';
import {supabase} from './lib/supabase';
import {LanguageProvider} from './context/LanguageContext';

const adminPath = import.meta.env.VITE_ADMIN_PATH;


export default function App() {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('cacaoform-cart') || '[]')
        } catch {
            return []
        }
    });
    const [products, setProducts] = useState(demoProducts);
    useEffect(() => localStorage.setItem('cacaoform-cart', JSON.stringify(cart)), [cart]);
    useEffect(() => {
        if (!supabase) return;
        supabase.from('products').select('*').order('created_at', {ascending: false}).then(({data}) => {
            if (data?.length) setProducts(data)
        })
    }, []);
    const add = p => setCart(c => {
        const existing = c.find(x => x.id === p.id);
        return existing ? c.map(x => x.id === p.id ? {
            ...x,
            quantity: (x.quantity || 1) + 1
        } : x) : [...c, {...p, quantity: 1}]
    });
    return <LanguageProvider><>
        <Header count={cart.reduce((s, x) => s + (x.quantity || 1), 0)} /><Routes><Route
        path="/"
        element={<Home
            products={products}
            onAdd={add}
        />}
    /><Route
        path="/product/:id"
        element={<Product
            products={products}
            onAdd={add}
        />}
    /><Route
        // path="/manage-x7k9/*"
        path={`/${adminPath}/*`}
        element={<Admin />}



    /></Routes>{cart.length > 0 && <Cart
        cart={cart}
        setCart={setCart}
    />}
        <footer>
            <div className="container footer">
                <span>© 2026 MoldLab</span><span>Silicone molds for chocolate</span>
            </div>
        </footer>
    </>
    </LanguageProvider>;
}
