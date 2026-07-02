// Cliente Supabase e Utilitários de Autenticação / Assinatura
// ==========================================

// Configurações de conexão do Supabase (Substituir com suas credenciais de produção)
const SUPABASE_URL = window.ATLAS_SUPABASE_URL || "https://nigskghtcpoemnqzqscj.supabase.co";
const SUPABASE_ANON_KEY = window.ATLAS_SUPABASE_ANON_KEY || "sb_publishable_wt8LrdwcU1rYa9aAWKGzJQ_kTpEtpfU";

// Inicializa o cliente do Supabase
// O CDN v2 do supabase-js expõe a lib como `supabase` (global window.supabase)
let _supabase = null;
const _supaLib = (typeof window.supabase !== 'undefined' && window.supabase.createClient)
  ? window.supabase
  : (typeof supabasejs !== 'undefined' ? supabasejs : null);

if (_supaLib) {
  _supabase = _supaLib.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn("[Atlas] Biblioteca Supabase JS não carregada. Modo offline ativo.");
}

// Objeto global de integração Atlas Supabase
window.atlasSupabase = {
  client: _supabase,

  // Verifica se o usuário atual está autenticado
  async getSession() {
    if (!_supabase) return null;
    const { data: { session }, error } = await _supabase.auth.getSession();
    if (error) {
      console.error("Erro ao obter sessão:", error);
      return null;
    }
    return session;
  },

  // Inscrever-se (Sign Up) com Onboarding
  async signUp(email, password, name, age, goal, experienceLevel) {
    if (!_supabase) return { error: "Supabase não configurado" };
    
    // Cadastra o usuário e insere metadados em raw_user_meta_data
    const { data, error } = await _supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          age: parseInt(age),
          goal,
          experience_level: experienceLevel
        }
      }
    });

    if (error) return { error: error.message };

    // Atualiza tabela de perfil pública
    if (data?.user) {
      await _supabase.from('profiles').upsert({
        id: data.user.id,
        name,
        email,
        goal,
        age: parseInt(age),
        experience_level: experienceLevel
      });
    }

    return { data };
  },

  // Login (Sign In) com e-mail e senha
  async signIn(email, password) {
    if (!_supabase) return { error: "Supabase não configurado" };
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { data };
  },

  // Logout (Sign Out)
  async signOut() {
    if (!_supabase) return;
    await _supabase.auth.signOut();
    localStorage.removeItem('atlas_user');
    localStorage.removeItem('atlas_premium_status');
  },

  // Enviar e-mail de recuperação de senha
  async resetPassword(email) {
    if (!_supabase) return { error: "Supabase não configurado" };
    const { error } = await _supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/profile.html?reset=true',
    });
    if (error) return { error: error.message };
    return { success: true };
  },

  // Atualizar senha (usado após link de redefinição)
  async updatePassword(newPassword) {
    if (!_supabase) return { error: "Supabase não configurado" };
    const { error } = await _supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: error.message };
    return { success: true };
  },

  // Obter perfil completo do usuário conectado
  async getUserProfile() {
    if (!_supabase) return null;
    const session = await this.getSession();
    if (!session) return null;

    const { data, error } = await _supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      console.warn("Perfil não encontrado no BD, buscando metadados da sessão:", error);
      return {
        name: session.user.user_metadata?.name || "Usuário",
        email: session.user.email,
        goal: session.user.user_metadata?.goal || "Pilates",
        age: session.user.user_metadata?.age || 30,
        experience_level: session.user.user_metadata?.experience_level || "Iniciante"
      };
    }
    return data;
  },

  // Alias used by initAuth in main.js
  async getProfile() {
    return this.getUserProfile();
  },

  // Obter detalhes da assinatura (Shopify status)
  async getSubscription() {
    if (!_supabase) return null;
    const session = await this.getSession();
    if (!session) return null;

    const { data, error } = await _supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Erro ao obter assinatura:", error);
      return null;
    }

    return data;
  },

  // Verifica se o usuário tem acesso premium liberado.
  // MODO ATUAL: qualquer usuário autenticado recebe acesso total.
  // Quando os webhooks Shopify estiverem ativos, troque pela lógica de subscription abaixo.
  async checkPremiumAccess() {
    if (!_supabase) return false;
    const session = await this.getSession();
    // Qualquer sessão válida = acesso liberado
    if (session && session.user) return true;
    return false;

    /* -- Lógica futura com Shopify subscription --
    const sub = await this.getSubscription();
    if (!sub) return false;
    return sub.status === 'trial' || sub.status === 'active';
    */
  }
};
