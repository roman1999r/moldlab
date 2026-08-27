import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
    Eye,
    Users,
    Smartphone,
    Monitor,
    Tablet,
    TrendingUp
} from 'lucide-react';



export default function Analytics() {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadAnalytics();
    }, []);

    // async function loadAnalytics() {
    //     if (!supabase) {
    //         setError('Supabase не підключений.');
    //         setLoading(false);
    //         return;
    //     }
    //
    //     setLoading(true);
    //     setError('');
    //
    //     const { data, error } = await supabase
    //         .from('site_analytics')
    //         .select(`
    //             id,
    //             session_id,
    //             event_type,
    //             page,
    //             product_id,
    //             device,
    //             created_at
    //         `)
    //         .order('created_at', {
    //             ascending: false
    //         })
    //         .limit(5000);
    //
    //     if (error) {
    //         console.error(
    //             'ANALYTICS LOAD ERROR:',
    //             error
    //         );
    //
    //         setError(error.message);
    //         setLoading(false);
    //         return;
    //     }
    //
    //     setEvents(data || []);
    //     setLoading(false);
    // }
    async function loadAnalytics() {
        if (!supabase) {
            setError('Supabase не підключений.');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');

        const {
            data,
            error
        } = await supabase
            .from('site_analytics')
            .select('*')
            .order('created_at', {
                ascending: false
            })
            .limit(5000);

        console.log(
            'ANALYTICS DATA:',
            data
        );

        console.log(
            'ANALYTICS ERROR:',
            error
        );

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setEvents(data || []);
        setLoading(false);
    }

    /*
     * PAGE VIEWS
     */

    const pageViews = events.filter(
        event =>
            event.event_type === 'page_view'
    );

    /*
     * UNIQUE VISITORS
     */

    const uniqueVisitors =
        new Set(
            events.map(
                event => event.session_id
            )
        ).size;

    /*
     * DEVICES
     */

    const mobile = events.filter(
        event =>
            event.device === 'mobile'
    ).length;

    const tablet = events.filter(
        event =>
            event.device === 'tablet'
    ).length;

    const desktop = events.filter(
        event =>
            event.device === 'desktop'
    ).length;

    /*
     * TODAY
     */

    const today = new Date();

    const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const todayViews =
        pageViews.filter(event =>
            new Date(event.created_at) >=
            todayStart
        ).length;

    /*
     * LAST 7 DAYS
     */

    const sevenDaysAgo =
        new Date();

    sevenDaysAgo.setDate(
        sevenDaysAgo.getDate() - 6
    );

    sevenDaysAgo.setHours(
        0,
        0,
        0,
        0
    );

    const last7Days =
        pageViews.filter(event =>
            new Date(event.created_at) >=
            sevenDaysAgo
        );

    /*
     * TOP PAGES
     */

    const pageCounts = {};

    pageViews.forEach(event => {
        const page =
            event.page || '/';

        pageCounts[page] =
            (pageCounts[page] || 0) + 1;
    });

    const topPages =
        Object.entries(pageCounts)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 10);

    /*
     * CHART
     */

    const days = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(
            date.getDate() - i
        );

        date.setHours(
            0,
            0,
            0,
            0
        );

        const nextDate =
            new Date(date);

        nextDate.setDate(
            nextDate.getDate() + 1
        );

        const count =
            last7Days.filter(event => {
                const created =
                    new Date(
                        event.created_at
                    );

                return (
                    created >= date &&
                    created < nextDate
                );
            }).length;

        days.push({
            date,
            count
        });
    }

    const maxViews = Math.max(
        ...days.map(day => day.count),
        1
    );

    if (loading) {
        return (
            <div className="admin-panel analytics-loading">
                Завантаження статистики…
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-panel">
                <div className="notice">
                    Помилка аналітики: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="analytics">

            {/* HEADER */}

            <div className="admin-panel">

                <div className="panel-head">

                    <div>
                        <span className="eyebrow">
                            MoldLab
                        </span>

                        <h2>
                            Аналітика сайту
                        </h2>

                        <p className="muted">
                            Статистика відвідувань
                            та переглядів.
                        </p>
                    </div>

                    <button
                        className="button secondary"
                        onClick={loadAnalytics}
                    >
                        Оновити
                    </button>

                </div>

            </div>


            {/* CARDS */}

            <div className="analytics-cards">

                <div className="analytics-card">

                    <div className="analytics-icon">
                        <Eye size={20} />
                    </div>

                    <span>
                        Всього переглядів
                    </span>

                    <strong>
                        {pageViews.length}
                    </strong>

                </div>


                <div className="analytics-card">

                    <div className="analytics-icon">
                        <Users size={20} />
                    </div>

                    <span>
                        Унікальні відвідувачі
                    </span>

                    <strong>
                        {uniqueVisitors}
                    </strong>

                </div>


                <div className="analytics-card">

                    <div className="analytics-icon">
                        <TrendingUp size={20} />
                    </div>

                    <span>
                        Переглядів сьогодні
                    </span>

                    <strong>
                        {todayViews}
                    </strong>

                </div>

            </div>


            {/* DEVICES */}

            <div className="admin-panel">

                <h2>
                    Пристрої
                </h2>

                <div className="device-stats">

                    <div>
                        <Smartphone size={18} />

                        <span>
                            Mobile
                        </span>

                        <strong>
                            {mobile}
                        </strong>
                    </div>


                    <div>
                        <Tablet size={18} />

                        <span>
                            Tablet
                        </span>

                        <strong>
                            {tablet}
                        </strong>
                    </div>


                    <div>
                        <Monitor size={18} />

                        <span>
                            Desktop
                        </span>

                        <strong>
                            {desktop}
                        </strong>
                    </div>

                </div>

            </div>


            {/* CHART */}

            <div className="admin-panel">

                <div className="panel-head">

                    <div>
                        <h2>
                            Перегляди за 7 днів
                        </h2>

                        <p className="muted">
                            Останні 7 днів
                        </p>
                    </div>

                </div>


                <div className="analytics-chart">

                    {days.map(day => {

                        const percent =
                            (day.count /
                                maxViews) *
                            100;

                        return (
                            <div
                                className="chart-day"
                                key={
                                    day.date.toISOString()
                                }
                            >

                                <div className="chart-value">
                                    {day.count}
                                </div>

                                <div className="chart-column">

                                    <div
                                        className="chart-bar"
                                        style={{
                                            height:
                                                `${Math.max(
                                                    percent,
                                                    4
                                                )}%`
                                        }}
                                    />

                                </div>

                                <small>
                                    {day.date.toLocaleDateString(
                                        'uk-UA',
                                        {
                                            weekday:
                                                'short'
                                        }
                                    )}
                                </small>

                            </div>
                        );
                    })}

                </div>

            </div>


            {/* TOP PAGES */}

            <div className="admin-panel">

                <h2>
                    Популярні сторінки
                </h2>

                <div className="analytics-pages">

                    {topPages.map(
                        ([page, count]) => (
                            <div
                                className="analytics-page-row"
                                key={page}
                            >

                                <span>
                                    {page}
                                </span>

                                <strong>
                                    {count}
                                </strong>

                            </div>
                        )
                    )}

                    {!topPages.length && (
                        <p className="muted">
                            Даних поки немає.
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}