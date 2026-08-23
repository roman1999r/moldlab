import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const orderStatuses: Record<string, string> = {
  new: 'Нове',
  confirmed: 'Підтверджено',
  in_progress: 'В роботі',
  ready: 'Готово',
  shipped: 'Відправлено',
  completed: 'Завершено',
  cancelled: 'Скасовано',
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
    const { order_id, type = 'order' } = await req.json();
    if (!order_id) return json({ error: 'order_id is required' }, 400);
    if (type !== 'order' && type !== 'custom') return json({ error: 'Invalid type' }, 400);

    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const botToken = Deno.env.get('telegram_bot_token');
    const chatId = Deno.env.get('telegram_chat_id');

    if (!serviceKey || !botToken || !chatId) {
      return json({ error: 'Telegram/Supabase secrets are not configured' }, 500);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      serviceKey,
      { auth: { persistSession: false } },
    );

    const table = type === 'custom' ? 'custom_orders' : 'orders';
    const { data: order, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', order_id)
      .single();

    if (error) throw error;

    const label = orderStatuses[order.status] || order.status;
    const prefix = type === 'custom' ? '🎨' : '📦';
    const text = [
      `${prefix} CacaoForm — СТАТУС ЗАМОВЛЕННЯ`,
      '',
      `№ ${String(order.id).slice(0, 8)}`,
      `👤 ${order.customer_name}`,
      `📌 Новий статус: ${label}`,
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
