import { supabase } from './supabase';

const SESSION_KEY = 'moldlab-analytics-session';

const IS_DEV =
    import.meta.env.DEV ||
    window.location.hostname.includes('github.io');

function log(...args) {
    if (IS_DEV) {
        console.log('[ANALYTICS]', ...args);
    }
}

function logError(...args) {
    console.error('[ANALYTICS]', ...args);
}


/*
|--------------------------------------------------------------------------
| DEVICE
|--------------------------------------------------------------------------
*/

function getDevice() {
    const width = window.innerWidth;

    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';

    return 'desktop';
}


/*
|--------------------------------------------------------------------------
| SESSION
|--------------------------------------------------------------------------
*/

function getSessionId() {
    try {
        let sessionId =
            localStorage.getItem(SESSION_KEY);

        if (!sessionId) {
            sessionId = crypto.randomUUID();

            localStorage.setItem(
                SESSION_KEY,
                sessionId
            );

            log(
                'NEW SESSION CREATED:',
                sessionId
            );
        } else {
            log(
                'EXISTING SESSION:',
                sessionId
            );
        }

        return sessionId;

    } catch (error) {
        logError(
            '❌ LOCAL STORAGE ERROR:',
            error
        );

        /*
         * Якщо localStorage заблокований,
         * все одно створюємо session ID.
         */

        return crypto.randomUUID();
    }
}


/*
|--------------------------------------------------------------------------
| MOBILE DEBUG
|--------------------------------------------------------------------------
*/

function getEnvironmentInfo() {
    return {
        hostname: window.location.hostname,
        href: window.location.href,

        pathname: window.location.pathname,

        userAgent:
        navigator.userAgent,

        language:
        navigator.language,

        online:
        navigator.onLine,

        width:
        window.innerWidth,

        height:
        window.innerHeight,

        devicePixelRatio:
        window.devicePixelRatio,

        device:
            getDevice(),

        localStorage:
            typeof localStorage !== 'undefined',

        crypto:
            typeof crypto !== 'undefined' &&
            typeof crypto.randomUUID === 'function'
    };
}


/*
|--------------------------------------------------------------------------
| TRACK PAGE VIEW
|--------------------------------------------------------------------------
*/

export async function trackPageView(page) {

    console.log(
        '========================================'
    );

    console.log(
        '📊 ANALYTICS TRACK START'
    );

    console.log(
        'Environment:',
        getEnvironmentInfo()
    );


    /*
     * SUPABASE
     */

    if (!supabase) {

        logError(
            '❌ SUPABASE IS NULL'
        );

        return;
    }

    log(
        '✅ Supabase client exists'
    );


    /*
     * SESSION
     */

    const sessionId =
        getSessionId();


    /*
     * DEVICE
     */

    const device =
        getDevice();


    log(
        'Device detected:',
        device
    );

    log(
        'Screen:',
        window.innerWidth,
        'x',
        window.innerHeight
    );


    /*
     * PAYLOAD
     */

    const payload = {

        session_id:
        sessionId,

        event_type:
            'page_view',

        page:
            page || '/',

        device:
        device
    };


    console.log(
        '📦 ANALYTICS PAYLOAD:',
        payload
    );


    /*
     * ONLINE CHECK
     */

    if (!navigator.onLine) {

        logError(
            '❌ DEVICE IS OFFLINE'
        );

        return;
    }


    log(
        '🌐 Device is online'
    );


    /*
     * SUPABASE INSERT
     */

    const startTime =
        performance.now();


    try {

        log(
            '🚀 Sending INSERT to Supabase...'
        );


        const {
            data,
            error
        } = await supabase
            .from('site_analytics')
            .insert(payload)
            .select();


        const duration =
            Math.round(
                performance.now() -
                startTime
            );


        console.log(
            '⏱️ Supabase response time:',
            `${duration}ms`
        );


        /*
         * ERROR
         */

        if (error) {

            console.error(
                '❌ SUPABASE ANALYTICS ERROR'
            );

            console.error(
                'Code:',
                error.code
            );

            console.error(
                'Message:',
                error.message
            );

            console.error(
                'Details:',
                error.details
            );

            console.error(
                'Hint:',
                error.hint
            );

            console.error(
                'Full error:',
                error
            );

            return;
        }


        /*
         * SUCCESS
         */

        console.log(
            '✅ ANALYTICS INSERT SUCCESS'
        );

        console.log(
            'Inserted data:',
            data
        );

        console.log(
            'Session ID:',
            sessionId
        );

        console.log(
            'Device:',
            device
        );

        console.log(
            'Page:',
            page
        );

    } catch (error) {

        console.error(
            '💥 ANALYTICS EXCEPTION'
        );

        console.error(
            error
        );

    }


    console.log(
        '📊 ANALYTICS TRACK END'
    );

    console.log(
        '========================================'
    );
}