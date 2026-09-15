import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { localizeProduct } from '../data/products';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function Catalog({ products, onAdd }) {
    const { language, t } = useLanguage();

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPageFromUrl = Number(
        searchParams.get('page') || 1
    );

    const [selectedCategory, setSelectedCategory] =
        useState('all');

    const [categories, setCategories] = useState([]);

    const [page, setPage] = useState(
        Number.isFinite(currentPageFromUrl) &&
        currentPageFromUrl > 0
            ? currentPageFromUrl
            : 1
    );

    const ITEMS_PER_PAGE = 12;

    /*
     * ---------------------------------------------------------
     * LOAD ACTIVE CATEGORIES
     * ---------------------------------------------------------
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
                    'LOAD CATALOG CATEGORIES ERROR:',
                    error
                );

                return;
            }

            setCategories(data || []);
        }

        loadCategories();
    }, []);

    /*
     * ---------------------------------------------------------
     * LOCALIZED PRODUCTS
     * ---------------------------------------------------------
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
     * ---------------------------------------------------------
     * FILTER BY CATEGORY
     * ---------------------------------------------------------
     */

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') {
            return normalized;
        }

        return normalized.filter(
            product =>
                String(product.category_id) ===
                String(selectedCategory)
        );
    }, [
        normalized,
        selectedCategory
    ]);

    /*
     * ---------------------------------------------------------
     * PAGINATION
     * ---------------------------------------------------------
     */

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredProducts.length /
            ITEMS_PER_PAGE
        )
    );

    /*
     * Якщо категорія змінилася,
     * повертаємося на першу сторінку.
     */

    useEffect(() => {
        if (page > totalPages) {
            changePage(totalPages);
        }
    }, [page, totalPages]);

    const paginatedProducts = useMemo(() => {
        const start =
            (page - 1) * ITEMS_PER_PAGE;

        const end =
            start + ITEMS_PER_PAGE;

        return filteredProducts.slice(
            start,
            end
        );
    }, [
        filteredProducts,
        page
    ]);

    /*
     * ---------------------------------------------------------
     * CHANGE PAGE
     * ---------------------------------------------------------
     */

    function changePage(nextPage) {
        const safePage = Math.min(
            Math.max(nextPage, 1),
            totalPages
        );

        setPage(safePage);

        setSearchParams({
            page: String(safePage)
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /*
     * ---------------------------------------------------------
     * CHANGE CATEGORY
     * ---------------------------------------------------------
     */

    function changeCategory(category) {
        setSelectedCategory(category);
        setPage(1);

        setSearchParams({
            page: '1'
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /*
     * ---------------------------------------------------------
     * PAGE BUTTONS
     * ---------------------------------------------------------
     */

    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    /*
     * ---------------------------------------------------------
     * RENDER
     * ---------------------------------------------------------
     */

    return (
        <main>
            <section
                id="catalog"
                className="section"
            >
                <div className="container">

                    {/* HEADER */}

                    <div className="section-head">
                        <div>
                            <span className="eyebrow">
                                {t.catalog.eyebrow}
                            </span>

                            <h1>
                                {t.catalog.title}
                            </h1>
                        </div>

                        <p>
                            {t.catalog.text}
                        </p>
                    </div>

                    {/* CATEGORY FILTERS */}

                    <div className="filters">

                        <button
                            type="button"
                            className={
                                selectedCategory === 'all'
                                    ? 'active'
                                    : ''
                            }
                            onClick={() =>
                                changeCategory('all')
                            }
                        >
                            {t.catalog.all}
                        </button>

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
                                    changeCategory(category.id)
                                }
                            >
                                {category.name}
                            </button>
                        ))}

                    </div>

                    {/* PRODUCTS */}

                    {paginatedProducts.length > 0 ? (
                        <div className="grid catalog-grid">

                            {paginatedProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={onAdd}
                                />
                            ))}

                        </div>
                    ) : (
                        <div className="empty-state">
                            <p className="muted">
                                {language === 'uk'
                                    ? 'Товарів у цій категорії поки немає.'
                                    : language === 'pl'
                                        ? 'Brak produktów w tej kategorii.'
                                        : 'There are no products in this category yet.'
                                }
                            </p>
                        </div>
                    )}

                    {/* PAGINATION */}

                    {totalPages > 1 && (
                        <div className="pagination">

                            <button
                                type="button"
                                className="pagination-button"
                                disabled={page === 1}
                                onClick={() =>
                                    changePage(page - 1)
                                }
                                aria-label="Previous page"
                            >
                                <ArrowLeft size={18} />
                            </button>

                            <div className="pagination-pages">

                                {pageNumbers.map(pageNumber => (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        className={
                                            pageNumber === page
                                                ? 'active'
                                                : ''
                                        }
                                        onClick={() =>
                                            changePage(pageNumber)
                                        }
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                            </div>

                            <button
                                type="button"
                                className="pagination-button"
                                disabled={page === totalPages}
                                onClick={() =>
                                    changePage(page + 1)
                                }
                                aria-label="Next page"
                            >
                                <ArrowRight size={18} />
                            </button>

                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}

