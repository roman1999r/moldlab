import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { trackPageView } from '../lib/analytics.js';

export default function AnalyticsTracker() {

    const location = useLocation();

    useEffect(() => {

        console.log(
            '📱 ANALYTICS TRACKER MOUNTED'
        );

        console.log(
            '📱 Current URL:',
            window.location.href
        );

        console.log(
            '📱 Current path:',
            location.pathname
        );

        console.log(
            '📱 User Agent:',
            navigator.userAgent
        );

        console.log(
            '📱 Screen:',
            window.innerWidth,
            'x',
            window.innerHeight
        );

        console.log(
            '📱 Online:',
            navigator.onLine
        );

        trackPageView(
            location.pathname
        );

    }, [
        location.pathname
    ]);

    return null;
}