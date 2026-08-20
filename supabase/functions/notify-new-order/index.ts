import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' };
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const { order_id } = await req.json();
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: order, error } = await supabase.from('orders').select('*').eq('id', order_id).single();
    if (error) throw error;
    const items = (order.items || []).map((i: any) => `• ${i.name} × ${i.quantity || 1} — €${i.price}`).join('\n');
    const text = `🍫 CacaoForm — нове замовлення\n\n#${String(order.id).slice(0,8)}\nКлієнт: ${order.customer_name}\nEmail: ${order.email}\nТелефон: ${order.phone}\n\n${items}\n\nРазом: €${order.total}${order.comment ? `\n\nКоментар: ${order.comment}` : ''}`;
    const bot = Deno.env.get('TELEGRAM_BOT_TOKEN'); const chat = Deno.env.get('TELEGRAM_CHAT_ID');
    if (bot && chat) await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ chat_id: chat, text }) });
    return new Response(JSON.stringify({ ok: true }), { headers: { ...cors, 'content-type': 'application/json' } });
  } catch (e) { return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...cors, 'content-type': 'application/json' } }); }
});
