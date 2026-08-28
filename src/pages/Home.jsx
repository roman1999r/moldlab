// import {ArrowRight, Box, Sparkles} from 'lucide-react';
// import {useMemo, useState} from 'react';
// import ProductCard from '../components/ProductCard';
// import CustomForm from '../components/CustomForm';
// import {categories, localizeProduct} from '../data/products';
// import {useLanguage} from '../context/LanguageContext';
//
// export default function Home({products, onAdd}) {
//     console.log('HOME PRODUCTS:', products);
//     const {language, t} = useLanguage();
//     const [cat, setCat] = useState('Всі');
//     const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
//     const normalized = products.map(p => localizeProduct(p, language));
//     const localizedCategories = language === 'pl' ? ['Wszystkie', 'Kwiaty', 'Figurki', 'Tabliczki', 'Święta'] : language === 'en' ? ['All', 'Flowers', 'Figures', 'Bars', 'Festive'] : categories;
//     const selectedIndex = categories.indexOf(cat);
//     const list = useMemo(() => cat === 'Всі' ? normalized : normalized.filter(p => p.originalCategory === cat), [cat, products, language]);
//     return <main>
//         <section className="hero">
//             <div className="container hero-grid">
//                 <div>
//                     <span className="eyebrow"><Sparkles size={15} /> {t.hero.eyebrow}</span>
//                     <h1>{t.hero.title}</h1>
//                     <p>{t.hero.text}</p>
//                     <div className="actions"><a
//                         className="button primary"
//                         href="#catalog"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             scrollTo('catalog')
//                         }}
//                     >{t.hero.catalog} <ArrowRight size={18} /></a><a
//                         className="button secondary"
//                         href="#custom"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             scrollTo('custom')
//                         }}
//                     >{t.hero.custom}</a></div>
//                     <div className="trust">{t.hero.trust}</div>
//                 </div>
//                 <div className="hero-product">{normalized[0] && <ProductCard
//                     product={normalized[0]}
//                     onAdd={onAdd}
//                 />}</div>
//             </div>
//         </section>
//         <section
//             id="catalog"
//             className="section"
//         >
//             <div className="container">
//                 <div className="section-head">
//                     <div><span className="eyebrow">{t.catalog.eyebrow}</span>
//                         <h2>{t.catalog.title}</h2>
//                     </div>
//                     <p>{t.catalog.text}</p>
//                 </div>
//                 <div className="filters">{localizedCategories.map((c, i) =>
//                     <button
//                         key={c}
//                         className={selectedIndex === i ? 'active' : ''}
//                         onClick={() => setCat(categories[i])}
//                     >{c}</button>)}</div>
//                 <div className="grid">{list.map(p => <ProductCard
//                     key={p.id}
//                     product={p}
//                     onAdd={onAdd}
//                 />)}</div>
//             </div>
//         </section>
//         <section
//             id="how"
//             className="section dark"
//         >
//             <div className="container">
//                 <span className="eyebrow">{t.process.eyebrow}</span>
//                 <h2>{t.process.title}</h2>
//                 <div className="steps">{t.process.steps.map(s => <div
//                     className="step"
//                     key={s[0]}
//                 ><span>{s[0]}</span>
//                     <h3>{s[1]}</h3>
//                     <p>{s[2]}</p>
//                 </div>)}</div>
//             </div>
//         </section>
//         <section
//             id="custom"
//             className="section custom"
//         >
//             <div className="container custom-grid">
//                 <div><span className="eyebrow">{t.custom.eyebrow}</span>
//                     <h2>{t.custom.title}</h2>
//                     <p>{t.custom.text}</p>
//                     <div className="custom-card"><Box size={36} />
//                         <h3>{t.custom.what}</h3>
//                         <ul>{t.custom.bullets.map(x =>
//                             <li key={x}>{x}</li>)}</ul>
//                     </div>
//                 </div>
//                 <CustomForm /></div>
//         </section>
//         <section
//             id="about"
//             className="section about"
//         >
//             <div className="container">
//                 <span className="eyebrow">{t.about.eyebrow}</span>
//                 <h2>{t.about.title}</h2>
//                 <p>{t.about.text}</p>
//             </div>
//         </section>
//     </main>;
// }


// import {ArrowRight, Box, Sparkles} from 'lucide-react';
// import {useMemo, useState, useMemo} from 'react';
// import ProductCard from '../components/ProductCard';
// import CustomForm from '../components/CustomForm';
// import {localizeProduct} from '../data/products';
// import { supabase } from '../lib/supabase';
// import {useLanguage} from '../context/LanguageContext';
//
// export default function Home({products, onAdd}) {
//     const {language, t} = useLanguage();
//     const [cat, setCat] = useState('Всі');
//     const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
//     const normalized = products.map(p => localizeProduct(p, language));
//     const localizedCategories = language === 'pl' ? ['Wszystkie', 'Kwiaty', 'Figurki', 'Tabliczki', 'Święta'] : language === 'en' ? ['All', 'Flowers', 'Figures', 'Bars', 'Festive'] : categories;
//     const selectedIndex = categories.indexOf(cat);
//     const list = useMemo(() => cat === 'Всі' ? normalized : normalized.filter(p => p.originalCategory === cat), [cat, products, language]);
//     const [categories, setCategories] = useState([]);
//
//     useEffect(() => {
//         async function loadCategories() {
//             const {
//                 data,
//                 error
//             } = await supabase
//                 .from('categories')
//                 .select('*')
//                 .eq('is_active', true)
//                 .order('name');
//
//             if (error) {
//                 console.error(
//                     'LOAD HOME CATEGORIES ERROR:',
//                     error
//                 );
//                 return;
//             }
//
//             setCategories(data || []);
//         }
//
//         loadCategories();
//     }, []);
//
//
//     return <main>
//         <section className="hero">
//             <div className="container hero-grid">
//                 <div>
//                     <span className="eyebrow"><Sparkles size={15} /> {t.hero.eyebrow}</span>
//                     <h1>{t.hero.title}</h1>
//                     <p>{t.hero.text}</p>
//                     <div className="actions"><a
//                         className="button primary"
//                         href="#catalog"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             scrollTo('catalog')
//                         }}
//                     >{t.hero.catalog} <ArrowRight size={18} /></a><a
//                         className="button secondary"
//                         href="#custom"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             scrollTo('custom')
//                         }}
//                     >{t.hero.custom}</a></div>
//                     <div className="trust">{t.hero.trust}</div>
//                 </div>
//                 <div className="hero-product">{normalized[0] && <ProductCard
//                     product={normalized[0]}
//                     onAdd={onAdd}
//                 />}</div>
//             </div>
//         </section>
//         <section
//             id="catalog"
//             className="section"
//         >
//             <div className="container">
//                 <div className="section-head">
//                     <div><span className="eyebrow">{t.catalog.eyebrow}</span>
//                         <h2>{t.catalog.title}</h2>
//                     </div>
//                     <p>{t.catalog.text}</p>
//                 </div>
//                 <div className="filters">{localizedCategories.map((c, i) =>
//                     <button
//                         key={c}
//                         className={selectedIndex === i ? 'active' : ''}
//                         onClick={() => setCat(categories[i])}
//                     >{c}</button>)}</div>
//                 <div className="grid">{list.map(p => <ProductCard
//                     key={p.id}
//                     product={p}
//                     onAdd={onAdd}
//
//                 />)}</div>
//             </div>
//         </section>
//         <section
//             id="how"
//             className="section dark"
//         >
//             <div className="container">
//                 <span className="eyebrow">{t.process.eyebrow}</span>
//                 <h2>{t.process.title}</h2>
//                 <div className="steps">{t.process.steps.map(s => <div
//                     className="step"
//                     key={s[0]}
//                 ><span>{s[0]}</span>
//                     <h3>{s[1]}</h3>
//                     <p>{s[2]}</p>
//                 </div>)}</div>
//             </div>
//         </section>
//         <section
//             id="custom"
//             className="section custom"
//         >
//             <div className="container custom-grid">
//                 <div><span className="eyebrow">{t.custom.eyebrow}</span>
//                     <h2>{t.custom.title}</h2>
//                     <p>{t.custom.text}</p>
//                     <div className="custom-card"><Box size={36} />
//                         <h3>{t.custom.what}</h3>
//                         <ul>{t.custom.bullets.map(x =>
//                             <li key={x}>{x}</li>)}</ul>
//                     </div>
//                 </div>
//                 <CustomForm /></div>
//         </section>
//         <section
//             id="about"
//             className="section about"
//         >
//             <div className="container">
//                 <span className="eyebrow">{t.about.eyebrow}</span>
//                 <h2>{t.about.title}</h2>
//                 <p>{t.about.text}</p>
//             </div>
//         </section>
//     </main>;
// }


import {
    ArrowRight,
    Box,
    Sparkles
} from 'lucide-react';

import {
    useEffect,
    useMemo,
    useState
} from 'react';

import ProductCard from '../components/ProductCard';
import CustomForm from '../components/CustomForm';

import {localizeProduct} from '../data/products';
import {supabase} from '../lib/supabase';

import {useLanguage} from '../context/LanguageContext';


export default function Home({products, onAdd}) {

    const {
        language,
        t
    } = useLanguage();


    /*
    |--------------------------------------------------------------------------
    | CATEGORIES
    |--------------------------------------------------------------------------
    */

    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState('all');


    /*
    |--------------------------------------------------------------------------
    | LOAD ACTIVE CATEGORIES
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadCategories() {

            if (!supabase) return;


            const {
                data,
                error
            } = await supabase
                .from('categories')
                .select(`
                                id,
                                name,
                                slug,
                                active
                `)
                        .eq('active', true)
                        .order('name');


            if (error) {

                console.error(
                    'LOAD HOME CATEGORIES ERROR:',
                    error
                );

                return;
            }


            setCategories(data || []);
        }


        loadCategories();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | LOCALIZED PRODUCTS
    |--------------------------------------------------------------------------
    */

    const normalized = useMemo(() => {

        return (products || []).map(product =>
            localizeProduct(
                product,
                language
            )
        );

    }, [products, language]);


    /*
    |--------------------------------------------------------------------------
    | FILTER PRODUCTS
    |--------------------------------------------------------------------------
    */

    const list = useMemo(() => {

        if (selectedCategory === 'all') {
            return normalized;
        }


        return normalized.filter(
            product =>
                product.category_id ===
                selectedCategory
        );

    }, [
        normalized,
        selectedCategory
    ]);


    /*
    |--------------------------------------------------------------------------
    | SCROLL
    |--------------------------------------------------------------------------
    */

    const scrollTo = (id) => {

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: 'smooth'
            });

    };


    /*
    |--------------------------------------------------------------------------
    | HERO PRODUCT
    |--------------------------------------------------------------------------
    */

    const heroProduct =
        normalized[0];


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <main>


            {/* ============================================================
                HERO
            ============================================================ */}

            <section className="hero" id='hero'>

                <div className="container hero-grid">

                    <div>

                        <span className="eyebrow">

                            <Sparkles size={15} />

                            {t.hero.eyebrow}

                        </span>


                        <h1>
                            {t.hero.title}
                        </h1>


                        <p>
                            {t.hero.text}
                        </p>


                        <div className="actions">

                            <a
                                className="button primary"
                                href="#catalog"
                                onClick={(e) => {

                                    e.preventDefault();

                                    scrollTo('catalog');

                                }}
                            >

                                {t.hero.catalog}

                                <ArrowRight size={18} />

                            </a>


                            <a
                                className="button secondary"
                                href="#custom"
                                onClick={(e) => {

                                    e.preventDefault();

                                    scrollTo('custom');

                                }}
                            >

                                {t.hero.custom}

                            </a>

                        </div>


                        <div className="trust">

                            {t.hero.trust}

                        </div>

                    </div>


                    <div className="hero-product">

                        {heroProduct && (

                            <ProductCard
                                product={heroProduct}
                                onAdd={onAdd}
                            />

                        )}

                    </div>

                </div>

            </section>


            {/* ============================================================
                CATALOG
            ============================================================ */}

            <section
                id="catalog"
                className="section"
            >

                <div className="container">


                    {/* SECTION HEADER */}

                    <div className="section-head">

                        <div>

                            <span className="eyebrow">

                                {t.catalog.eyebrow}

                            </span>


                            <h2>

                                {t.catalog.title}

                            </h2>

                        </div>


                        <p>

                            {t.catalog.text}

                        </p>

                    </div>


                    {/* ====================================================
                        CATEGORY FILTERS
                    ==================================================== */}

                    <div className="filters">

                        {/* ВСІ */}

                        <button
                            type="button"
                            className={
                                selectedCategory === 'all'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                setSelectedCategory('all')
                            }
                        >
                            {language === 'pl'
                                ? 'Wszystkie'
                                : language === 'en'
                                    ? 'All'
                                    : 'Всі'
                            }
                        </button>


                        {/* КАТЕГОРІЇ З БАЗИ */}

                        {categories.map(category => (
                            <button
                                type="button"
                                key={category.id}
                                className={
                                    selectedCategory === category.id
                                        ? 'active'
                                        : ''
                                }
                                onClick={() =>
                                    setSelectedCategory(category.id)
                                }
                            >
                                {category.name}
                            </button>
                        ))}

                    </div>


                    {/* ====================================================
                        PRODUCTS
                    ==================================================== */}

                    <div className="grid">

                        {list.map(product => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={onAdd}
                            />

                        ))}

                    </div>


                    {/* NO PRODUCTS */}

                    {list.length === 0 && (

                        <div className="empty-state">

                            <p className="muted">

                                {language === 'uk'
                                    ? 'У цій категорії товарів поки немає.'
                                    : language === 'pl'
                                        ? 'Brak produktów w tej kategorii.'
                                        : 'There are no products in this category yet.'
                                }

                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* ============================================================
                HOW IT WORKS
            ============================================================ */}

            <section
                id="how"
                className="section dark"
            >

                <div className="container">

                    <span className="eyebrow">

                        {t.process.eyebrow}

                    </span>


                    <h2>

                        {t.process.title}

                    </h2>


                    <div className="steps">

                        {t.process.steps.map(step => (

                            <div
                                className="step"
                                key={step[0]}
                            >

                                <span>
                                    {step[0]}
                                </span>


                                <h3>
                                    {step[1]}
                                </h3>


                                <p>
                                    {step[2]}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* ============================================================
                CUSTOM ORDER
            ============================================================ */}

            <section
                id="custom"
                className="section custom"
            >

                <div className="container custom-grid">

                    <div>

                        <span className="eyebrow">

                            {t.custom.eyebrow}

                        </span>


                        <h2>

                            {t.custom.title}

                        </h2>


                        <p>

                            {t.custom.text}

                        </p>


                        <div className="custom-card">

                            <Box size={36} />


                            <h3>

                                {t.custom.what}

                            </h3>


                            <ul>

                                {t.custom.bullets.map(item => (

                                    <li key={item}>

                                        {item}

                                    </li>

                                ))}

                            </ul>

                        </div>

                    </div>


                    <CustomForm />

                </div>

            </section>


            {/* ============================================================
                ABOUT
            ============================================================ */}

            <section
                id="about"
                className="section about"
            >

                <div className="container">

                    <span className="eyebrow">

                        {t.about.eyebrow}

                    </span>


                    <h2>

                        {t.about.title}

                    </h2>


                    <p>

                        {t.about.text}

                    </p>

                </div>

            </section>

        </main>

    );

}
