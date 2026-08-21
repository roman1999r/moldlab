import {ArrowRight, Box, Sparkles} from 'lucide-react';
import {useMemo, useState} from 'react';
import ProductCard from '../components/ProductCard';
import CustomForm from '../components/CustomForm';
import {categories, localizeProduct} from '../data/products';
import {useLanguage} from '../context/LanguageContext';

export default function Home({products, onAdd}) {
    const {language, t} = useLanguage();
    const [cat, setCat] = useState('Всі');
    const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
    const normalized = products.map(p => localizeProduct(p, language));
    const localizedCategories = language === 'pl' ? ['Wszystkie', 'Kwiaty', 'Figurki', 'Tabliczki', 'Święta'] : language === 'en' ? ['All', 'Flowers', 'Figures', 'Bars', 'Festive'] : categories;
    const selectedIndex = categories.indexOf(cat);
    const list = useMemo(() => cat === 'Всі' ? normalized : normalized.filter(p => p.originalCategory === cat), [cat, products, language]);
    return <main>
        <section className="hero">
            <div className="container hero-grid">
                <div>
                    <span className="eyebrow"><Sparkles size={15} /> {t.hero.eyebrow}</span>
                    <h1>{t.hero.title}</h1>
                    <p>{t.hero.text}</p>
                    <div className="actions"><a
                        className="button primary"
                        href="#catalog"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo('catalog')
                        }}
                    >{t.hero.catalog} <ArrowRight size={18} /></a><a
                        className="button secondary"
                        href="#custom"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo('custom')
                        }}
                    >{t.hero.custom}</a></div>
                    <div className="trust">{t.hero.trust}</div>
                </div>
                <div className="hero-product">{normalized[0] && <ProductCard
                    product={normalized[0]}
                    onAdd={onAdd}
                />}</div>
            </div>
        </section>
        <section
            id="catalog"
            className="section"
        >
            <div className="container">
                <div className="section-head">
                    <div><span className="eyebrow">{t.catalog.eyebrow}</span>
                        <h2>{t.catalog.title}</h2>
                    </div>
                    <p>{t.catalog.text}</p>
                </div>
                <div className="filters">{localizedCategories.map((c, i) =>
                    <button
                        key={c}
                        className={selectedIndex === i ? 'active' : ''}
                        onClick={() => setCat(categories[i])}
                    >{c}</button>)}</div>
                <div className="grid">{list.map(p => <ProductCard
                    key={p.id}
                    product={p}
                    onAdd={onAdd}
                />)}</div>
            </div>
        </section>
        <section
            id="how"
            className="section dark"
        >
            <div className="container">
                <span className="eyebrow">{t.process.eyebrow}</span>
                <h2>{t.process.title}</h2>
                <div className="steps">{t.process.steps.map(s => <div
                    className="step"
                    key={s[0]}
                ><span>{s[0]}</span>
                    <h3>{s[1]}</h3>
                    <p>{s[2]}</p>
                </div>)}</div>
            </div>
        </section>
        <section
            id="custom"
            className="section custom"
        >
            <div className="container custom-grid">
                <div><span className="eyebrow">{t.custom.eyebrow}</span>
                    <h2>{t.custom.title}</h2>
                    <p>{t.custom.text}</p>
                    <div className="custom-card"><Box size={36} />
                        <h3>{t.custom.what}</h3>
                        <ul>{t.custom.bullets.map(x =>
                            <li key={x}>{x}</li>)}</ul>
                    </div>
                </div>
                <CustomForm /></div>
        </section>
        <section
            id="about"
            className="section about"
        >
            <div className="container">
                <span className="eyebrow">{t.about.eyebrow}</span>
                <h2>{t.about.title}</h2>
                <p>{t.about.text}</p>
            </div>
        </section>
    </main>;
}
