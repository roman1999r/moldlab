import { supabase } from './supabase';

const SESSION_KEY = 'moldlab-analytics-session';

function getSessionId() {
    try {
        let sessionId = localStorage.getItem(SESSION_KEY);

        if (!sessionId) {
            sessionId = crypto.randomUUID();

            localStorage.setItem(
                SESSION_KEY,
                sessionId
            );
        }

        return sessionId;
    } catch (error) {
        // Якщо localStorage недоступний
        return crypto.randomUUID();
    }
}

function getDevice() {
    const width = window.innerWidth;

    if (width < 768) {
        return 'mobile';
    }

    if (width < 1024) {
        return 'tablet';
    }

    return 'desktop';
}

export async function trackPageView(page) {


    if (!supabase) {
        console.error('❌ SUPABASE IS NULL');
        return;
    }


    let sessionId;

    try {
        sessionId = getSessionId();


    } catch (error) {


        return;
    }

    /*
     * Перевіряємо поточного користувача
     */

    const {
        data: userData,
        error: userError
    } = await supabase.auth.getUser();


    /*
     * Перевіряємо session
     */

    const {
        data: sessionData,
        error: sessionError
    } = await supabase.auth.getSession();


    /*
     * INSERT
     */

    const payload = {
        session_id: sessionId,
        event_type: 'page_view',
        page: page || window.location.pathname,
        product_id: null,
        device: getDevice(),
        created_at: new Date().toISOString()
    };


    const {
        data,
        error
    } = await supabase
        .from('site_analytics')
        .insert(payload)


    if (error) {

    } else {

    }

}