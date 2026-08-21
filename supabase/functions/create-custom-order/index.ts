import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: cors });
    }

    try {
        const payload = await req.json();

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        );

        // Створюємо індивідуальне замовлення
        const { data: order, error: orderError } = await supabase
            .from('custom_orders')
            .insert({
                customer_name: payload.customer_name,
                email: payload.email,
                phone: payload.phone,
                description: payload.description,
                file_url: payload.file_url || null,
                status: 'new',
            })
            .select('id')
            .single();

        if (orderError) {
            throw orderError;
        }

        const text =
            `🎨 MoldLab — НОВЕ ІНДИВІДУАЛЬНЕ ЗАМОВЛЕННЯ\n\n` +
            `#${String(order.id).slice(0, 8)}\n` +
            `👤 Клієнт: ${payload.customer_name}\n` +
            `📧 Email: ${payload.email}\n` +
            `📞 Телефон: ${payload.phone}\n\n` +
            `📝 Опис:\n${payload.description}` +
            (payload.file_url
                ? `\n\n📎 Файл:\n${payload.file_url}`
                : '');

        const bot = Deno.env.get('TELEGRAM_BOT_TOKEN');
        const chat = Deno.env.get('TELEGRAM_CHAT_ID');

        if (!bot || !chat) {
            throw new Error(
                'TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured'
            );
        }

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

        if (!telegramResponse.ok) {
            throw new Error(`Telegram error: ${telegramResult}`);
        }

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
        console.error('CUSTOM ORDER ERROR:', error);

        return new Response(
            JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : String(error),
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