-- Habilita extensão pgcrypto se necessário
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de Perfis de Usuários (estendendo auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    name TEXT,
    email TEXT,
    goal TEXT,
    age INTEGER,
    experience_level TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Assinaturas (Shopify)
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users ON DELETE CASCADE UNIQUE,
    email TEXT UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('trial', 'active', 'cancelled', 'past_due', 'expired')),
    trial_days_remaining INTEGER,
    next_billing_date TIMESTAMP WITH TIME ZONE,
    renew_date TIMESTAMP WITH TIME ZONE,
    expire_date TIMESTAMP WITH TIME ZONE,
    shopify_customer_id TEXT,
    shopify_subscription_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Histórico de Compras (Shopify)
CREATE TABLE IF NOT EXISTS public.purchase_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT,
    shopify_order_id TEXT,
    amount NUMERIC,
    currency TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Logs de Webhooks (Auditoria)
CREATE TABLE IF NOT EXISTS public.webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT,
    payload JSONB,
    processed BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativar RLS (Row Level Security) em tabelas críticas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_history ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso
-- 1. Profiles: usuários podem ler e atualizar apenas o próprio perfil
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Subscriptions: usuários podem apenas ler sua própria assinatura
CREATE POLICY "Users can view own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

-- 3. Purchase History: usuários podem apenas ler suas próprias compras
CREATE POLICY "Users can view own purchases" ON public.purchase_history
    FOR SELECT USING (auth.uid() = user_id OR email = auth.jwt() ->> 'email');

-- Trigger para criar perfil automaticamente no SignUp
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, updated_at)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'Usuário Atlas'),
        new.email,
        NOW()
    );

    -- Tenta vincular uma assinatura pré-existente criada por webhook via e-mail
    UPDATE public.subscriptions
    SET user_id = new.id
    WHERE email = new.email;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
