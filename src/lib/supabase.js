// import { createClient } from '@supabase/supabase-js';
// const url = import.meta.env.VITE_SUPABASE_URL;
// const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// export const supabase = url && key ? createClient(url, key) : null;



///////////////////////
// import { createClient } from '@supabase/supabase-js';
//
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
//
// export const supabase =
//     supabaseUrl && supabaseAnonKey
//         ? createClient(
//             supabaseUrl,
//             supabaseAnonKey,
//             {
//                 auth: {
//                     persistSession: true,
//                     autoRefreshToken: true,
//                     detectSessionInUrl: true
//                 }
//             }
//         )
//         : null;
/////////////////////////////////////
// import { createClient } from '@supabase/supabase-js';
//
// const supabaseUrl =
//     import.meta.env.VITE_SUPABASE_URL;
//
// const supabaseAnonKey =
//     import.meta.env.VITE_SUPABASE_ANON_KEY;
//
// export const supabase =
//     supabaseUrl && supabaseAnonKey
//         ? createClient(
//             supabaseUrl,
//             supabaseAnonKey
//         )
//         : null;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('SUPABASE URL:', supabaseUrl);
console.log('SUPABASE KEY EXISTS:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
        'Supabase не налаштований. Перевір VITE_SUPABASE_URL та VITE_SUPABASE_PUBLISHABLE_KEY'
    );
}

export const supabase =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null;