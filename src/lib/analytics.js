// import { supabase } from './supabase';
//
// const SESSION_KEY = 'moldlab-analytics-session';
//
// function getSessionId() {
//     let sessionId =
//         localStorage.getItem(SESSION_KEY);
//
//     if (!sessionId) {
//         sessionId = crypto.randomUUID();
//
//         localStorage.setItem(
//             SESSION_KEY,
//             sessionId
//         );
//     }
//
//     return sessionId;
// }
//
// function getDevice() {
//     const width = window.innerWidth;
//
//     if (width < 768) {
//         return 'mobile';
//     }
//
//     if (width < 1024) {
//         return 'tablet';
//     }
//
//     return 'desktop';
// }
//
// export async function trackPageView(page) {
//     if (!supabase) return;
//
//     try {
//         const sessionId =
//             getSessionId();
//
//         const {
//             error
//         } = await supabase
//             .from('site_analytics')
//             .insert({
//                 session_id: sessionId,
//                 event_type: 'page_view',
//                 page,
//                 device: getDevice()
//             });
//
//         if (error) {
//             console.error(
//                 'Analytics error:',
//                 error
//             );
//         }
//
//     } catch (error) {
//         console.error(
//             'Analytics exception:',
//             error
//         );
//     }
// }


import { supabase } from './supabase';

const SESSION_KEY = 'moldlab-analytics-session';

function getSessionId() {
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
        sessionId = crypto.randomUUID();

        localStorage.setItem(
            SESSION_KEY,
            sessionId
        );
    }

    return sessionId;
}

function getDevice() {
    const width = window.innerWidth;

    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';

    return 'desktop';
}

export async function trackPageView(page) {
    console.log('========== ANALYTICS START ==========');
    console.log('Supabase:', supabase);
    console.log('Page:', page);

    if (!supabase) {
        console.error('❌ SUPABASE IS NULL');
        return;
    }

    const sessionId = getSessionId();
    const device = getDevice();

    console.log('Session:', sessionId);
    console.log('Device:', device);

    const payload = {
        session_id: sessionId,
        event_type: 'page_view',
        page,
        device
    };

    console.log('INSERT PAYLOAD:', payload);

    const {
        data,
        error
    } = await supabase
        .from('site_analytics')
        .insert(payload)
        .select();

    console.log('INSERT DATA:', data);
    console.log('INSERT ERROR:', error);

    if (error) {
        console.error(
            '❌ ANALYTICS INSERT FAILED',
            error
        );
    } else {
        console.log(
            '✅ ANALYTICS INSERT SUCCESS'
        );
    }

    console.log('========== ANALYTICS END ==========');
}