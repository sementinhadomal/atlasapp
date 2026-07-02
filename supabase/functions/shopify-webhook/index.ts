import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0"

// Inicializar cliente do Supabase com a Service Role Key (para contornar RLS ao atualizar registros de usuários)
const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Tratar requisição OPTIONS para CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const eventType = req.headers.get("x-shopify-topic") || "unknown"
    const payload = await req.json()

    // 1. Registrar o log do webhook recebido
    const { error: logError } = await supabaseAdmin
      .from("webhook_logs")
      .insert({
        event_type: eventType,
        payload: payload,
      })

    if (logError) {
      console.error("Erro ao registrar log do webhook:", logError)
    }

    // 2. Extrair dados comuns do payload
    let email = payload.email || (payload.customer && payload.customer.email)
    if (!email && payload.line_items) {
      // Tentar achar em dados adicionais do pedido
      email = payload.customer?.email
    }

    if (!email) {
      return new Response(
        JSON.stringify({ error: "E-mail do cliente não encontrado no payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      )
    }

    email = email.toLowerCase().trim()

    // 3. Processar de acordo com o tipo de evento do Shopify
    if (eventType === "orders/create" || eventType === "orders/paid") {
      // Nova compra da Atlas Pilates Bar
      const shopifyOrderId = payload.id?.toString()
      const amount = parseFloat(payload.total_price || "0")
      const currency = payload.currency || "USD"

      // Procurar usuário pelo email no auth.users
      const { data: users, error: userLookupError } = await supabaseAdmin
        .auth.admin.listUsers()
      
      const matchedUser = users?.users?.find(u => u.email?.toLowerCase() === email)
      const userId = matchedUser ? matchedUser.id : null

      // Criar/atualizar assinatura: concede 30 dias de Trial grátis
      const now = new Date()
      const trialEndDate = new Date()
      trialEndDate.setDate(now.getDate() + 30)

      const { error: subError } = await supabaseAdmin
        .from("subscriptions")
        .upsert({
          email: email,
          user_id: userId,
          status: "trial",
          trial_days_remaining: 30,
          renew_date: trialEndDate.toISOString(),
          next_billing_date: trialEndDate.toISOString(),
          shopify_customer_id: payload.customer?.id?.toString(),
          updated_at: now.toISOString()
        }, { onConflict: "email" })

      if (subError) throw subError

      // Gravar histórico de compras
      await supabaseAdmin
        .from("purchase_history")
        .insert({
          user_id: userId,
          email: email,
          shopify_order_id: shopifyOrderId,
          amount: amount,
          currency: currency
        })

    } else if (eventType === "subscriptions/create" || eventType === "subscriptions/update") {
      // Evento de atualização/criação do aplicativo de assinaturas do Shopify
      const statusMap: Record<string, string> = {
        active: "active",
        trialing: "trial",
        cancelled: "cancelled",
        past_due: "past_due",
        unpaid: "expired",
        expired: "expired"
      }

      const rawStatus = payload.status?.toLowerCase() || "active"
      const status = statusMap[rawStatus] || "active"
      const shopifySubId = payload.id?.toString()
      const nextBillingDate = payload.next_billing_date || payload.current_period_end

      // Calcular dias restantes se for trial
      let trialDays = null
      if (status === "trial" && nextBillingDate) {
        const diffTime = Math.abs(new Date(nextBillingDate).getTime() - new Date().getTime())
        trialDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }

      const { error: subUpdateError } = await supabaseAdmin
        .from("subscriptions")
        .update({
          status: status,
          trial_days_remaining: trialDays,
          next_billing_date: nextBillingDate ? new Date(nextBillingDate).toISOString() : null,
          renew_date: nextBillingDate ? new Date(nextBillingDate).toISOString() : null,
          shopify_subscription_id: shopifySubId,
          updated_at: new Date().toISOString()
        })
        .eq("email", email)

      if (subUpdateError) throw subUpdateError
    }

    return new Response(
      JSON.stringify({ success: true, message: `Webhook processado com sucesso para ${email}` }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )

  } catch (err) {
    console.error("Erro ao processar webhook:", err)
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    )
  }
})
