import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  try {
    const { order_id } = await req.json();
    if (!order_id) return json({ error: 'order_id is required' }, 400);

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!serviceKey || !botToken || !chatId) {
      return json({ error: 'Telegram/Supabase secrets are not configured' }, 500);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      serviceKey,
      { auth: { persistSession: false } },
    );

    const { data: order, error } = await supabase
      .from('custom_orders')
      .select('*')
      .eq('id', order_id)
      .single();

    if (error) throw error;

    const text = [
      '🎨 CacaoForm — НОВА ЗАЯВКА НА ІНДИВІДУАЛЬНУ ФОРМУ',
      '',
      `№ ${String(order.id).slice(0, 8)}`,
      '',
      `👤 Клієнт: ${order.customer_name}`,
      `📧 Email: ${order.email}`,
      `📞 Телефон: ${order.phone}`,
      '',
      '📝 Опис:',
      order.description,
      order.file_url ? `\n📎 Файл:\n${order.file_url}` : '',
    ].join('\n');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const telegram = await telegramResponse.json();
    if (!telegramResponse.ok || !telegram.ok) {
      return json({ error: 'Telegram API error', details: telegram }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
