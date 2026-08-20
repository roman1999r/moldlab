import {ShoppingBag, Menu, X} from 'lucide-react';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import {useLanguage} from '../context/LanguageContext';

export default function Header({count}) {
    const {t} = useLanguage();
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    const go = (id) => {
        document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
        close();
    };
    return <header className="header">
        <div className="container nav">
            <Link
                to="/"
                className="logo"
                onClick={close}
            ><span className="logo-mark">M</span>Mold<span>Lab</span></Link>
            <button
                className="menu"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
            >{open ? <X /> : <Menu />}</button>
            <nav className={open ? 'nav-links open' : 'nav-links'}>
                <a
                    href="#catalog"
                    onClick={(e) => {
                        e.preventDefault();
                        go('catalog')
                    }}
                >{t.nav.catalog}</a>
                <a
                    href="#how"
                    onClick={(e) => {
                        e.preventDefault();
                        go('how')
                    }}
                >{t.nav.process}</a>
                <a
                    href="#custom"
                    onClick={(e) => {
                        e.preventDefault();
                        go('custom')
                    }}
                >{t.nav.custom}</a>
                <a
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        go('about')
                    }}
                >{t.nav.about}</a>
            </nav>
            <div className="header-actions"><LanguageSwitcher /><a
                href="#cart"
                className="cart-link"
            ><ShoppingBag size={19} /><span>{count}</span></a></div>
        </div>
    </header>;
}
