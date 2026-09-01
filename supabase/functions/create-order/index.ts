// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
//
// const cors = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers':
//         'authorization, x-client-info, apikey, content-type',
// };
//
// Deno.serve(async (req) => {
//     console.log('STEP 1: function started');
//
//     if (req.method === 'OPTIONS') {
//         console.log('STEP OPTIONS');
//         return new Response('ok', { headers: cors });
//     }
//
//     try {
//         console.log('STEP 2: before req.json()');
//
//         const payload = await req.json();
//
//         console.log('STEP 3: payload received');
//
//         console.log('PAYLOAD:', {
//             customer_name: payload.customer_name,
//             email: payload.email,
//             phone: payload.phone,
//             total: payload.total,
//             items_count: payload.items?.length,
//         });
//
//         console.log('STEP 4: before createClient');
//
//         const supabase = createClient(
//             Deno.env.get('SUPABASE_URL')!,
//             Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
//         );
//
//         console.log('STEP 5: supabase client created');
//
//         console.log('STEP 6: before INSERT');
//
//         const { data: order, error: orderError } = await supabase
//             .from('orders')
//             .insert({
//                 customer_name: payload.customer_name,
//                 email: payload.email,
//                 phone: payload.phone,
//                 comment: payload.comment || null,
//                 items: payload.items,
//                 total: payload.total,
//                 status: 'new',
//             })
//             .select('id')
//             .single();
//
//         console.log('STEP 7: INSERT finished');
//
//         console.log('ORDER:', order);
//         console.log('ORDER ERROR:', orderError);
//
//         if (orderError) {
//             throw orderError;
//         }
//
//         console.log('STEP 8: before Telegram config');
//
//         const bot = Deno.env.get('TELEGRAM_BOT_TOKEN');
//         const chat = Deno.env.get('TELEGRAM_CHAT_ID');
//
//         console.log('STEP 9: Telegram config:', {
//             botConfigured: Boolean(bot),
//             chatConfigured: Boolean(chat),
//         });
//
//         if (!bot || !chat) {
//             throw new Error(
//                 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured'
//             );
//         }
//
//         console.log('STEP 10: before Telegram request');
//
//         const { data: fullOrder, error: fetchError } = await supabase
//             .from('orders')
//             .select('*')
//             .eq('id', order.id)
//             .single();
//
//         console.log('STEP 11: full order fetched');
//
//         if (fetchError) {
//             throw fetchError;
//         }
//
//         const items = (fullOrder.items || [])
//             .map((item: any) => {
//                 const quantity = Number(item.quantity || 1);
//                 const price = Number(item.price || 0);
//
//                 const sizeLine = item.selectedSize
//                     ? `\n  📏 Розмір: ${item.selectedSize}`
//                     : '';
//
//                 return (
//                     `• ${item.name}` +
//                     sizeLine +
//                     `\n  🔢 Кількість: ${quantity} шт.` +
//                     `\n  💶 Ціна: €${price.toFixed(2)}`
//                 );
//             })
//             .join('\n\n');;
//
//         const text =
//             `🍫 MoldLab — НОВЕ ЗАМОВЛЕННЯ\n\n` +
//             `#${String(fullOrder.id).slice(0, 8)}\n` +
//             `👤 Клієнт: ${fullOrder.customer_name}\n` +
//             `📧 Email: ${fullOrder.email}\n` +
//             `📞 Телефон: ${fullOrder.phone}\n\n` +
//             `📦 Товари:\n${items}\n\n` +
//             `💰 Разом: €${fullOrder.total}` +
//             (fullOrder.comment
//                 ? `\n\n💬 Коментар: ${fullOrder.comment}`
//                 : '');
//
//         console.log('STEP 12: message prepared');
//
//         const telegramResponse = await fetch(
//             `https://api.telegram.org/bot${bot}/sendMessage`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     chat_id: chat,
//                     text,
//                 }),
//             }
//         );
//
//         const telegramResult = await telegramResponse.text();
//
//         console.log('STEP 13: Telegram response:', telegramResult);
//
//         if (!telegramResponse.ok) {
//             throw new Error(`Telegram error: ${telegramResult}`);
//         }
//
//         console.log('STEP 14: SUCCESS');
//
//         return new Response(
//             JSON.stringify({
//                 ok: true,
//                 order_id: order.id,
//             }),
//             {
//                 status: 200,
//                 headers: {
//                     ...cors,
//                     'content-type': 'application/json',
//                 },
//             }
//         );
//     } catch (error) {
//         console.error('CREATE ORDER ERROR:', error);
//
//         return new Response(
//             JSON.stringify({
//                 ok: false,
//                 error: error instanceof Error ? error.message : String(error),
//             }),
//             {
//                 status: 500,
//                 headers: {
//                     ...cors,
//                     'content-type': 'application/json',
//                 },
//             }
//         );
//     }
// });



//
//
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
//
// const cors = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers':
//         'authorization, x-client-info, apikey, content-type',
// };
//
// Deno.serve(async (req) => {
//     if (req.method === 'OPTIONS') {
//         return new Response('ok', { headers: cors });
//     }
//
//     try {
//         const payload = await req.json();
//
//         const supabase = createClient(
//             Deno.env.get('SUPABASE_URL')!,
//             Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
//         );
//
//         // 1. Створюємо замовлення
//         const { data: order, error: orderError } = await supabase
//             .from('orders')
//             .insert({
//                 customer_name: payload.customer_name,
//                 email: payload.email,
//                 phone: payload.phone,
//                 comment: payload.comment || null,
//                 items: payload.items,
//                 total: payload.total,
//                 status: 'new',
//             })
//             .select('id')
//             .single();
//
//         if (orderError) throw orderError;
//
//         const orderNumber = String(order.id).slice(0, 8);
//
//         // 2. Формуємо товари
//         const items = (payload.items || [])
//             .map(
//                 (item: any) =>
//                     `<li>
//             ${item.name} × ${item.quantity || 1}
//             — €${item.price}
//           </li>`
//             )
//             .join('');
//
//         // 3. EMAIL КЛІЄНТУ
//         const resendKey = Deno.env.get('RESEND_API_KEY');
//         const emailFrom = Deno.env.get('EMAIL_FROM');
//
//         if (!resendKey || !emailFrom) {
//             throw new Error(
//                 'RESEND_API_KEY or EMAIL_FROM is not configured'
//             );
//         }
//
//         const emailHtml = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
//         <h2>🍫 Дякуємо за ваше замовлення!</h2>
//
//         <p>
//           Вітаємо, <strong>${payload.customer_name}</strong>!
//         </p>
//
//         <p>
//           Ваше замовлення успішно прийнято.
//         </p>
//
//         <hr>
//
//         <p>
//           <strong>Номер замовлення:</strong> #${orderNumber}
//         </p>
//
//         <h3>📦 Ваші товари:</h3>
//
//         <ul>
//           ${items}
//         </ul>
//
//         <p style="font-size: 18px;">
//           <strong>💰 Разом: €${payload.total}</strong>
//         </p>
//
//         ${
//             payload.comment
//                 ? `
//               <p>
//                 <strong>💬 Ваш коментар:</strong><br>
//                 ${payload.comment}
//               </p>
//             `
//                 : ''
//         }
//
//         <hr>
//
//         <p>
//           Ми зв'яжемося з вами найближчим часом для підтвердження замовлення.
//         </p>
//
//         <p>
//           Дякуємо, що обрали CacaoForm ❤️
//         </p>
//       </div>
//     `;
//
//         const emailResponse = await fetch(
//             'https://api.resend.com/emails',
//             {
//                 method: 'POST',
//                 headers: {
//                     Authorization: `Bearer ${resendKey}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     from: emailFrom,
//                     to: [payload.email],
//                     subject: `Ваше замовлення #${orderNumber} прийнято — CacaoForm`,
//                     html: emailHtml,
//                 }),
//             }
//         );
//
//         const emailResult = await emailResponse.text();
//
//         if (!emailResponse.ok) {
//             console.error('RESEND ERROR:', emailResult);
//             throw new Error(`Email error: ${emailResult}`);
//         }
//
//         // 4. TELEGRAM
//         const bot = Deno.env.get('TELEGRAM_BOT_TOKEN');
//         const chat = Deno.env.get('TELEGRAM_CHAT_ID');
//
//         if (!bot || !chat) {
//             throw new Error(
//                 'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured'
//             );
//         }
//
//         const telegramItems = (payload.items || [])
//             .map(
//                 (item: any) =>
//                     `• ${item.name} × ${item.quantity || 1} — €${item.price}`
//             )
//             .join('\n');
//
//         const text =
//             `🍫 CacaoForm — НОВЕ ЗАМОВЛЕННЯ\n\n` +
//             `#${orderNumber}\n` +
//             `👤 Клієнт: ${payload.customer_name}\n` +
//             `📧 Email: ${payload.email}\n` +
//             `📞 Телефон: ${payload.phone}\n\n` +
//             `📦 Товари:\n${telegramItems}\n\n` +
//             `💰 Разом: €${payload.total}` +
//             (payload.comment
//                 ? `\n\n💬 Коментар: ${payload.comment}`
//                 : '');
//
//         const telegramResponse = await fetch(
//             `https://api.telegram.org/bot${bot}/sendMessage`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     chat_id: chat,
//                     text,
//                 }),
//             }
//         );
//
//         const telegramResult = await telegramResponse.text();
//
//         if (!telegramResponse.ok) {
//             console.error('TELEGRAM ERROR:', telegramResult);
//             throw new Error(`Telegram error: ${telegramResult}`);
//         }
//
//         return new Response(
//             JSON.stringify({
//                 ok: true,
//                 order_id: order.id,
//             }),
//             {
//                 status: 200,
//                 headers: {
//                     ...cors,
//                     'content-type': 'application/json',
//                 },
//             }
//         );
//     } catch (error) {
//         console.error('CREATE ORDER ERROR:', error);
//
//         return new Response(
//             JSON.stringify({
//                 ok: false,
//                 error:
//                     error instanceof Error
//                         ? error.message
//                         : String(error),
//             }),
//             {
//                 status: 500,
//                 headers: {
//                     ...cors,
//                     'content-type': 'application/json',
//                 },
//             }
//         );
//     }
// });



import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    console.log('STEP 1: function started');

    if (req.method === 'OPTIONS') {
        console.log('STEP OPTIONS');
        return new Response('ok', { headers: cors });
    }

    try {
        console.log('STEP 2: before req.json()');

        const payload = await req.json();

        console.log('STEP 3: payload received');

        console.log('PAYLOAD:', {
            customer_name: payload.customer_name,
            email: payload.email,
            phone: payload.phone,
            total: payload.total,
            items_count: payload.items?.length,
        });

        console.log('STEP 4: before createClient');

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        console.log('STEP 5: supabase client created');

        /*
         * ==========================================
         * CHECK + DECREASE STOCK
         * ==========================================
         */

        console.log('STEP 6: before stock update');

        const { error: stockError } = await supabase.rpc(
            'decrease_product_stock',
            {
                p_items: payload.items,
            }
        );

        console.log('STEP 7: stock update finished');

        if (stockError) {
            console.error('STOCK ERROR:', stockError);

            throw new Error(
                stockError.message || 'Not enough stock'
            );
        }

        console.log('STEP 8: stock successfully updated');

        /*
         * ==========================================
         * CREATE ORDER
         * ==========================================
         */

        console.log('STEP 9: before INSERT');

        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                customer_name: payload.customer_name,
                email: payload.email,
                phone: payload.phone,
                comment: payload.comment || null,
                items: payload.items,
                total: payload.total,
                status: 'new',
            })
            .select('id')
            .single();

        console.log('STEP 10: INSERT finished');

        console.log('ORDER:', order);
        console.log('ORDER ERROR:', orderError);

        if (orderError) {
            throw orderError;
        }

        /*
         * ==========================================
         * TELEGRAM CONFIG
         * ==========================================
         */

        console.log('STEP 11: before Telegram config');

        const bot = Deno.env.get('TELEGRAM_BOT_TOKEN');
        const chat = Deno.env.get('TELEGRAM_CHAT_ID');

        console.log('STEP 12: Telegram config:', {
            botConfigured: Boolean(bot),
            chatConfigured: Boolean(chat),
        });

        if (!bot || !chat) {
            throw new Error(
                'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured'
            );
        }

        /*
         * ==========================================
         * GET FULL ORDER
         * ==========================================
         */

        console.log('STEP 13: before Telegram request');

        const { data: fullOrder, error: fetchError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', order.id)
            .single();

        console.log('STEP 14: full order fetched');

        if (fetchError) {
            throw fetchError;
        }

        /*
         * ==========================================
         * PREPARE TELEGRAM MESSAGE
         * ==========================================
         */

        const items = (fullOrder.items || [])
            .map((item: any) => {
                const quantity = Number(item.quantity || 1);
                const price = Number(item.price || 0);

                const sizeLine = item.selectedSize
                    ? `\n  📏 Розмір: ${item.selectedSize}`
                    : '';

                return (
                    `• ${item.name}` +
                    sizeLine +
                    `\n  🔢 Кількість: ${quantity} шт.` +
                    `\n  💶 Ціна: €${price.toFixed(2)}`
                );
            })
            .join('\n\n');

        const text =
            `🍫 MoldLab — НОВЕ ЗАМОВЛЕННЯ\n\n` +
            `#${String(fullOrder.id).slice(0, 8)}\n` +
            `👤 Клієнт: ${fullOrder.customer_name}\n` +
            `📧 Email: ${fullOrder.email}\n` +
            `📞 Телефон: ${fullOrder.phone}\n\n` +
            `📦 Товари:\n${items}\n\n` +
            `💰 Разом: €${fullOrder.total}` +
            (fullOrder.comment
                ? `\n\n💬 Коментар: ${fullOrder.comment}`
                : '');

        console.log('STEP 15: message prepared');

        /*
         * ==========================================
         * SEND TELEGRAM
         * ==========================================
         */

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${bot}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chat,
                    text,
                }),
            }
        );

        const telegramResult = await telegramResponse.text();

        console.log(
            'STEP 16: Telegram response:',
            telegramResult
        );

        if (!telegramResponse.ok) {
            throw new Error(
                `Telegram error: ${telegramResult}`
            );
        }

        console.log('STEP 17: SUCCESS');

        return new Response(
            JSON.stringify({
                ok: true,
                order_id: order.id,
            }),
            {
                status: 200,
                headers: {
                    ...cors,
                    'content-type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error(
            'CREATE ORDER ERROR:',
            error
        );

        return new Response(
            JSON.stringify({
                ok: false,
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            }),
            {
                status: 500,
                headers: {
                    ...cors,
                    'content-type': 'application/json',
                },
            }
        );
    }
});