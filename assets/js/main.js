/**
 * Atlas Pilates — Main Application Logic
 * Premium interactive exercise player with aesthetic minimalist body silhouettes,
 * real-time biofeedback tension gauges, joint angle trackers, breathing visualizers,
 * and high-end interactive training indicators. Instructions in Portuguese.
 */

document.addEventListener('DOMContentLoaded', () => {
  try { initMobileMenu(); } catch (e) { console.error('initMobileMenu error:', e); }
  try { initVideoModal(); } catch (e) { console.error('initVideoModal error:', e); }
  try { initFilters(); } catch (e) { console.error('initFilters error:', e); }
  try { initFAQ(); } catch (e) { console.error('initFAQ error:', e); }
  try { initScrollReveal(); } catch (e) { console.error('initScrollReveal error:', e); }
  try { initAuth(); } catch (e) { console.error('initAuth error:', e); }
  try { initProgramProgress(); } catch (e) { console.error('initProgramProgress error:', e); }
});

// ==========================================
// WORKOUT DATABASE (Simulated Exercises)
// ==========================================
const workoutData = {
  "Rosca Martelo Inclinada (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Rosca Martelo Inclinada (Elástico)",
            "duration": 40,
            "instructions": "Rosca para bíceps com inclinação do tronco para trás contra a resistência elástica. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Bíceps e Braços"
        }
    ]
},

  "Elevação Frontal Unilateral (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "10/lado",
    "exercises": [
        {
            "name": "Elevação Frontal Unilateral (Elástico)",
            "duration": 40,
            "instructions": "Elevação alternada de braço para deltoide anterior com foco em equilíbrio muscular. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Ombros e Equilíbrio"
        }
    ]
},

  "Agachamento Isométrico com Bíceps (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "45s",
    "exercises": [
        {
            "name": "Agachamento Isométrico com Bíceps (Elástico)",
            "duration": 45,
            "instructions": "Segure o agachamento na parede enquanto realiza flexões de bíceps com a barra. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "squat-press",
            "target": "Quadríceps e Bíceps"
        }
    ]
},

  "Extensão de Quadril em Pé (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Extensão de Quadril em Pé (Elástico)",
            "duration": 40,
            "instructions": "Estenda a perna para trás contra a resistência do elástico para focar em glúteos. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Glúteos e Posterior"
        }
    ]
},

  "Remada Alta com Barra e Elástico": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Remada Alta com Barra e Elástico",
            "duration": 40,
            "instructions": "Puxe a barra até a altura do peito, mantendo os cotovelos elevados sob tração. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Ombros e Costas"
        }
    ]
},

  "Prancha Alta com Toque de Ombro (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Prancha Alta com Toque de Ombro (Elástico)",
            "duration": 40,
            "instructions": "Prancha alta tocando os ombros alternadamente com elásticos gerando instabilidade. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Core e Estabilidade"
        }
    ]
},

  "Avanço Lateral com Resistência": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Avanço Lateral com Resistência",
            "duration": 40,
            "instructions": "Dê um passo lateral mantendo a barra tracionada para focar nos glúteos e adutores. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Pernas e Glúteos"
        }
    ]
},

  "Abdominal Russo com Elástico": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Abdominal Russo com Elástico",
            "duration": 40,
            "instructions": "Rotação de tronco com as pernas suspensas e barra sob resistência dos elásticos. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Core e Oblíquos"
        }
    ]
},

  "Crucifixo Peitoral com Barra e Elástico": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Crucifixo Peitoral com Barra e Elástico",
            "duration": 40,
            "instructions": "Deitada de costas, empurre a barra à frente vencendo a força das faixas elásticas. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Peitoral e Tríceps"
        }
    ]
},

  "Alongamento Integrado com Elástico": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "40s",
    "exercises": [
        {
            "name": "Alongamento Integrado com Elástico",
            "duration": 40,
            "instructions": "Flexão de quadril à frente aproveitando a tração suave dos elásticos para relaxar a coluna. 1. Posicione os elásticos com segurança. <br>2. Realize a movimentação mantendo estabilidade corporal total. <br>3. Expire durante a contração muscular.",
            "animation": "overhead-lunge",
            "target": "Alongamento e Coluna"
        }
    ]
},

  "Aperto de Anel Deitada Lateral": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Aperto de Anel Deitada Lateral",
            "duration": 35,
            "instructions": "Deitada de lado, esprema o anel com a mão superior apoiada na parte de cima para tríceps. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Tríceps e Peitoral"
        }
    ]
},

  "Flexão de Quadril com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Flexão de Quadril com Anel",
            "duration": 35,
            "instructions": "Deitada de costas, empurre o anel contra a coxa enquanto eleva o joelho ao peito. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Core e Flexores"
        }
    ]
},

  "Squeeze de Ombro Posterior": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Squeeze de Ombro Posterior",
            "duration": 35,
            "instructions": "Segure o anel nas costas com ambas as mãos e faça compressões para alinhar a cintura escapular. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Ombros e Postura"
        }
    ]
},

  "Ponte Unilateral com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "10/lado",
    "exercises": [
        {
            "name": "Ponte Unilateral com Anel",
            "duration": 35,
            "instructions": "Elevação pélvica de uma perna só mantendo o anel pressionado entre as coxas. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "bridge-squeeze",
            "target": "Glúteos e Adutores"
        }
    ]
},

  "Abdominal Oblíquo com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Abdominal Oblíquo com Anel",
            "duration": 35,
            "instructions": "Crunch com rotação lateral do tronco levando o anel em direção à parte externa dos joelhos. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Core e Oblíquos"
        }
    ]
},

  "Isometria de Agachamento Sumô com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "45s",
    "exercises": [
        {
            "name": "Isometria de Agachamento Sumô com Anel",
            "duration": 45,
            "instructions": "Agachamento sumô sustentado espremendo o anel à frente do peito continuamente. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Pernas e Peitoral"
        }
    ]
},

  "Rosca Bíceps Isométrica com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Rosca Bíceps Isométrica com Anel",
            "duration": 35,
            "instructions": "Esprema o anel entre o antebraço e a articulação do cotovelo para isolar o bíceps. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Bíceps e Isometria"
        }
    ]
},

  "Pressione o Anel Acima da Cabeça": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Pressione o Anel Acima da Cabeça",
            "duration": 35,
            "instructions": "Pressione o anel acima da cabeça com os braços esticados para deltoides e costas superiores. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Ombros e Costas"
        }
    ]
},

  "Elevação Pélvica com Isometria no Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 4,
    "reps": "10",
    "exercises": [
        {
            "name": "Elevação Pélvica com Isometria no Anel",
            "duration": 35,
            "instructions": "Mantenha o quadril elevado enquanto realiza pulsos rápidos de compressão no anel. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Glúteos e Core"
        }
    ]
},

  "Alongamento de Posterior com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "30s",
    "exercises": [
        {
            "name": "Alongamento de Posterior com Anel",
            "duration": 30,
            "instructions": "Deitada, coloque o pé dentro da alça do anel e puxe a perna reta para alongar posterior. 1. Posicione o anel na região de ativação. <br>2. Faça compressões mantendo controle absoluto. <br>3. Mantenha os ombros relaxados e respiração fluida.",
            "animation": "thigh-squeeze",
            "target": "Alongamento e Pernas"
        }
    ]
},

  "Rosca Bíceps na Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Rosca Bíceps na Barra",
            "duration": 40,
            "instructions": "Rosca de bíceps com a barra para fortalecimento e tonificação dos braços. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Braços e Bíceps"
        }
    ]
},

  "Remada Curvada com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Remada Curvada com Barra",
            "duration": 40,
            "instructions": "Remada curvada para fortalecimento das costas e alinhamento dos ombros. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Costas e Ombros"
        }
    ]
},

  "Agachamento Sumô com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Agachamento Sumô com Barra",
            "duration": 40,
            "instructions": "Agachamento com postura ampla para focar na parte interna das coxas e glúteos. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "squat-press",
            "target": "Pernas e Glúteos"
        }
    ]
},

  "Elevação de Quadril com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 4,
    "reps": "12",
    "exercises": [
        {
            "name": "Elevação de Quadril com Barra",
            "duration": 40,
            "instructions": "Elevação pélvica com barra para ativação intensa de glúteos e posterior de coxa. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Glúteos e Posterior"
        }
    ]
},

  "Desenvolvimento com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Desenvolvimento com Barra",
            "duration": 40,
            "instructions": "Desenvolvimento de ombros acima da cabeça para fortalecer os deltoides. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Ombros e Tríceps"
        }
    ]
},

  "Avanço Reverso com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "10/lado",
    "exercises": [
        {
            "name": "Avanço Reverso com Barra",
            "duration": 40,
            "instructions": "Passo atrás alternado segurando a barra para melhorar força e estabilidade. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Pernas e Equilíbrio"
        }
    ]
},

  "Prancha com Apoio na Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "45s",
    "exercises": [
        {
            "name": "Prancha com Apoio na Barra",
            "duration": 45,
            "instructions": "Estabilização de core apoiando as mãos na barra no chão para maior dificuldade. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "overhead-lunge",
            "target": "Core e Estabilidade"
        }
    ]
},

  "Tríceps Testa com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Tríceps Testa com Barra",
            "duration": 40,
            "instructions": "Extensão de cotovelos deitada com barra para esculpir a parte de trás dos braços. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Tríceps e Braços"
        }
    ]
},

  "Abdominal Infra com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Abdominal Infra com Barra",
            "duration": 40,
            "instructions": "Elevação de pernas segurando a barra acima do peito para focar na região infra-abdominal. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Core e Abdominais"
        }
    ]
},

  "Alongamento com Barra": {
    "type": "pilates",
    "equipment": "bar",
    "sets": 3,
    "reps": "30s",
    "exercises": [
        {
            "name": "Alongamento com Barra",
            "duration": 30,
            "instructions": "Alongamento relaxante da cadeia posterior utilizando a barra para apoiar as mãos. 1. Segure a barra firmemente. <br>2. Execute o movimento de forma controlada mantendo o alinhamento. <br>3. Inspire na descida, expire no esforço máximo.",
            "animation": "thigh-squeeze",
            "target": "Coluna e Alongamento"
        }
    ]
},

  "Rosca Martelo (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Rosca Martelo (Elástico)",
            "duration": 40,
            "instructions": "Rosca para bíceps e antebraços usando a resistência dos elásticos acoplados à barra. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Bíceps e Braços"
        }
    ]
},

  "Elevação Lateral (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Elevação Lateral (Elástico)",
            "duration": 40,
            "instructions": "Elevação lateral de braços sob tensão constante para fortalecer os ombros. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Ombros e Postura"
        }
    ]
},

  "Puxada Alta (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Puxada Alta (Elástico)",
            "duration": 40,
            "instructions": "Remada alta puxando a barra em direção ao queixo para trabalhar trapézio e ombros. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Ombros e Costas"
        }
    ]
},

  "Agachamento Búlgaro (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "10/lado",
    "exercises": [
        {
            "name": "Agachamento Búlgaro (Elástico)",
            "duration": 40,
            "instructions": "Agachamento unilateral com pé traseiro suspenso na alça elástica para estabilidade. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "squat-press",
            "target": "Pernas e Glúteos"
        }
    ]
},

  "Extensão de Tríceps (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Extensão de Tríceps (Elástico)",
            "duration": 40,
            "instructions": "Extensão de tríceps acima da cabeça contra a força de tração do elástico. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Tríceps e Braços"
        }
    ]
},

  "Passo Cruzado (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Passo Cruzado (Elástico)",
            "duration": 40,
            "instructions": "Passo lateral cruzado com elástico nos pés para tonificação lateral dos quadris. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Quadril e Glúteos"
        }
    ]
},

  "Flexão de Braços Resistida": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "10",
    "exercises": [
        {
            "name": "Flexão de Braços Resistida",
            "duration": 40,
            "instructions": "Flexão de braço tradicional com o elástico passando pelas costas gerando sobrecarga. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Peito e Tríceps"
        }
    ]
},

  "Crucifixo Inverso (Elástico)": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Crucifixo Inverso (Elástico)",
            "duration": 40,
            "instructions": "Abertura de braços em postura curvada para focar na parte posterior dos ombros. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Costas e Ombros"
        }
    ]
},

  "Chute Lateral Resistido": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Chute Lateral Resistido",
            "duration": 40,
            "instructions": "Abdução de quadril em quatro apoios utilizando a alça elástica na sola do pé. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Glúteos e Quadril"
        }
    ]
},

  "Prancha Oblíqua com Giro": {
    "type": "pilates",
    "equipment": "elastic",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Prancha Oblíqua com Giro",
            "duration": 40,
            "instructions": "Giro lateral de quadril em posição de prancha contra a tração dos elásticos. 1. Utilize a resistência dos elásticos para aumentar a intensidade. <br>2. Mantenha os cotovelos alinhados e execute com controle. <br>3. Controle a descida resistindo à tração.",
            "animation": "overhead-lunge",
            "target": "Core e Oblíquos"
        }
    ]
},

  "Aperto de Tornozelo (Ring)": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Aperto de Tornozelo (Ring)",
            "duration": 35,
            "instructions": "Deitada de costas, aperte o anel posicionado entre os tornozelos para focar no core e adutores. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Pernas e Core"
        }
    ]
},

  "Abdominal com Pressão de Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Abdominal com Pressão de Anel",
            "duration": 35,
            "instructions": "Crunch abdominal mantendo o anel pressionado entre as mãos para maior ativação de peitorais e core. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Core e Abdômen"
        }
    ]
},

  "Agachamento com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15",
    "exercises": [
        {
            "name": "Agachamento com Anel",
            "duration": 35,
            "instructions": "Agachamento clássico mantendo o anel pressionado na altura do peito durante o movimento. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Pernas e Peitoral"
        }
    ]
},

  "Ponte de Glúteos com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 4,
    "reps": "12",
    "exercises": [
        {
            "name": "Ponte de Glúteos com Anel",
            "duration": 35,
            "instructions": "Elevação pélvica clássica com o anel pressionado ativamente entre os joelhos. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "bridge-squeeze",
            "target": "Glúteos e Adutores"
        }
    ]
},

  "Prancha com Pressão de Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "30s",
    "exercises": [
        {
            "name": "Prancha com Pressão de Anel",
            "duration": 30,
            "instructions": "Sustentação em prancha alta apoiando uma das mãos sobre o anel, desafiando a estabilidade de ombro. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Core e Estabilidade"
        }
    ]
},

  "Rosca Bíceps com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Rosca Bíceps com Anel",
            "duration": 35,
            "instructions": "Flexão de cotovelo espremendo o anel contra o ombro para ativação isométrica do bíceps. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Bíceps e Braços"
        }
    ]
},

  "Pressione o Anel Lateral": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "15/lado",
    "exercises": [
        {
            "name": "Pressione o Anel Lateral",
            "duration": 35,
            "instructions": "Esprema o anel contra a parte externa da coxa usando a palma da mão para isolar tríceps e peitorais. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Tríceps e Lateral"
        }
    ]
},

  "Elevação de Pernas com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "10",
    "exercises": [
        {
            "name": "Elevação de Pernas com Anel",
            "duration": 35,
            "instructions": "Elevação de pernas unidas segurando o anel entre os tornozelos para focar nos abdominais inferiores. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Core e Pernas"
        }
    ]
},

  "Extensão de Tríceps com Anel": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Extensão de Tríceps com Anel",
            "duration": 35,
            "instructions": "Segure o anel acima da cabeça e esprema-o para ativar tríceps e ombros posteriores. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Tríceps e Costas"
        }
    ]
},

  "Pombo com Anel de Pilates": {
    "type": "pilates",
    "equipment": "Ring",
    "sets": 3,
    "reps": "30s",
    "exercises": [
        {
            "name": "Pombo com Anel de Pilates",
            "duration": 30,
            "instructions": "Postura de alongamento de glúteos e flexores utilizando o anel para apoio das mãos e mobilidade. 1. Posicione o anel na região indicada. <br>2. Faça compressões ritmadas e controladas de 1-2 segundos. <br>3. Sinta a ativação profunda isométrica e respire cadenciadamente.",
            "animation": "thigh-squeeze",
            "target": "Alongamento e Quadril"
        }
    ]
},

  "Alongamento de Perna Única": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Alongamento de Perna Única",
            "duration": 45,
            "instructions": "Abraço alternado de joelhos no peito mantendo a outra perna flutuando esticada a 45 graus. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Core e Pernas"
        }
    ]
},

  "Alongamento de Perna Dupla": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Alongamento de Perna Dupla",
            "duration": 45,
            "instructions": "Eleve pernas e braços a 45 graus e retorne abraçando os joelhos para fortalecimento abdominal. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Core e Abdômen"
        }
    ]
},

  "O Macaco (Spine Stretch)": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "10",
    "exercises": [
        {
            "name": "O Macaco (Spine Stretch)",
            "duration": 45,
            "instructions": "Sentada com pernas afastadas, role a coluna para a frente mantendo os braços paralelos ao mat. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Coluna e Alongamento"
        }
    ]
},

  "Círculos no Ar (Corkscrew)": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "8",
    "exercises": [
        {
            "name": "Círculos no Ar (Corkscrew)",
            "duration": 45,
            "instructions": "Com pernas unidas elevadas ao teto, faça círculos lentos estabilizando completamente o quadril. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Core e Quadril"
        }
    ]
},

  "O Cisne (Swan Dive)": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "10",
    "exercises": [
        {
            "name": "O Cisne (Swan Dive)",
            "duration": 45,
            "instructions": "Deitada de bruços, eleve o peito do chão ativando toda a musculatura extensora da coluna. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Lombar e Costas"
        }
    ]
},

  "Chute Lateral em Quatro Apoios": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "12/lado",
    "exercises": [
        {
            "name": "Chute Lateral em Quatro Apoios",
            "duration": 45,
            "instructions": "Elevação lateral de perna flexionada na posição de quatro apoios para fortalecimento do glúteo médio. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Glúteos e Core"
        }
    ]
},

  "Ponte Clássica no Mat": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 4,
    "reps": "12",
    "exercises": [
        {
            "name": "Ponte Clássica no Mat",
            "duration": 45,
            "instructions": "Elevação pélvica articulando a coluna vértebra por vértebra para mobilidade e posterior de coxa. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Coluna e Glúteos"
        }
    ]
},

  "Canivete (Jackknife)": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "8",
    "exercises": [
        {
            "name": "Canivete (Jackknife)",
            "duration": 45,
            "instructions": "Eleve as pernas e o quadril do mat direcionando os pés em direção ao teto com máximo controle abdominal. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Avançado e Core"
        }
    ]
},

  "Torção de Coluna Sentada": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "12",
    "exercises": [
        {
            "name": "Torção de Coluna Sentada",
            "duration": 45,
            "instructions": "Sentada com braços abertos, gire o tronco para as laterais ativando os oblíquos e a mobilidade torácica. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Oblíquos e Coluna"
        }
    ]
},

  "Prancha Lateral Clássica": {
    "type": "pilates",
    "equipment": "Mat",
    "sets": 3,
    "reps": "30s",
    "exercises": [
        {
            "name": "Prancha Lateral Clássica",
            "duration": 30,
            "instructions": "Prancha apoiada sobre um antebraço e laterais dos pés para fortalecimento de cintura e quadril. 1. Deite no mat mantendo a lombar apoiada ou coluna neutra. <br>2. Ative o core profundamente para cada repetição. <br>3. Respire pelo nariz e expire pela boca de forma fluida.",
            "animation": "breath",
            "target": "Core e Estabilidade"
        }
    ]
},

  "Yoga para Postura e Ombros": {
    "type": "yoga",
    "duration": "20 min",
    "exercises": [
        {
            "name": "Yoga para Postura e Ombros - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Yoga para Postura e Ombros - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Yoga para Postura e Ombros - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Vinyasa Flow Energizante": {
    "type": "yoga",
    "duration": "35 min",
    "exercises": [
        {
            "name": "Vinyasa Flow Energizante - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Vinyasa Flow Energizante - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Vinyasa Flow Energizante - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Yoga Coxas e Quadril": {
    "type": "yoga",
    "duration": "30 min",
    "exercises": [
        {
            "name": "Yoga Coxas e Quadril - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Yoga Coxas e Quadril - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Yoga Coxas e Quadril - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Hatha Yoga Clássico": {
    "type": "yoga",
    "duration": "45 min",
    "exercises": [
        {
            "name": "Hatha Yoga Clássico - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Hatha Yoga Clássico - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Hatha Yoga Clássico - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Vinyasa Desafio de Equilíbrio": {
    "type": "yoga",
    "duration": "50 min",
    "exercises": [
        {
            "name": "Vinyasa Desafio de Equilíbrio - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Vinyasa Desafio de Equilíbrio - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Vinyasa Desafio de Equilíbrio - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Yin Yoga Restaurativo": {
    "type": "yoga",
    "duration": "40 min",
    "exercises": [
        {
            "name": "Yin Yoga Restaurativo - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Yin Yoga Restaurativo - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Yin Yoga Restaurativo - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Yoga Core Estabilidade": {
    "type": "yoga",
    "duration": "30 min",
    "exercises": [
        {
            "name": "Yoga Core Estabilidade - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Yoga Core Estabilidade - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Yoga Core Estabilidade - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Yoga Alongamento Profundo": {
    "type": "yoga",
    "duration": "40 min",
    "exercises": [
        {
            "name": "Yoga Alongamento Profundo - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Yoga Alongamento Profundo - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Yoga Alongamento Profundo - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Pranayama & Meditação": {
    "type": "yoga",
    "duration": "15 min",
    "exercises": [
        {
            "name": "Pranayama & Meditação - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Pranayama & Meditação - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Pranayama & Meditação - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},

  "Ashtanga Power Intro": {
    "type": "yoga",
    "duration": "50 min",
    "exercises": [
        {
            "name": "Ashtanga Power Intro - Abertura",
            "duration": 40,
            "instructions": "1. Respire fundo e comece a fluir pela postura. <br>2. Alongue os braços e mantenha a estabilidade corporal.",
            "animation": "breath",
            "target": "Corpo Inteiro"
        },
        {
            "name": "Ashtanga Power Intro - Postura Principal",
            "duration": 60,
            "instructions": "1. Permaneça na postura ativando o equilíbrio. <br>2. Mantenha os quadris alinhados e os ombros relaxados.",
            "animation": "warrior-1",
            "target": "Força e Equilíbrio"
        },
        {
            "name": "Ashtanga Power Intro - Savasana Final",
            "duration": 60,
            "instructions": "1. Deite-se de costas no tapete. <br>2. Relaxe todos os músculos e respire de forma natural.",
            "animation": "savasana",
            "target": "Restauração Total"
        }
    ]
},


  // ============================
  // YOGA SESSIONS
  // ============================

  "Sunrise Morning Flow": {
    type: "yoga",
    duration: "30 min",
    exercises: [
      { name: "Postura da Criança (Balasana)", duration: 30, instructions: "1. Ajoelhe-se e sente-se nos calcanhares. <br>2. Incline o tronco para a frente e apoie a testa no chão. <br>3. Alongue os braços para a frente e respire profundamente.", animation: "childs-pose", target: "Coluna e Quadris" },
      { name: "Alongamento Gato-Vaca (Marjaryasana)", duration: 40, instructions: "1. Fique em quatro apoios (mãos e joelhos). <br>2. Ao inspirar, curve a coluna para baixo e olhe para cima (Vaca). <br>3. Ao expirar, curve a coluna para cima empurrando o chão (Gato).", animation: "cat-cow", target: "Mobilidade da Coluna" },
      { name: "Cachorro Olhando para Baixo", duration: 45, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" },
      { name: "Saudação ao Sol (Surya Namaskar)", duration: 60, instructions: "1. Inspire elevando os braços. <br>2. Expire dobrando o quadril à frente. <br>3. Desça em chaturanga. <br>4. Inspire no cachorro olhando para cima, expire para baixo.", animation: "vinyasa", target: "Fluxo Corpo Inteiro" },
      { name: "Guerreiro I (Virabhadrasana I)", duration: 40, instructions: "1. Dê um passo largo para trás com o pé esquerdo. <br>2. Flexione o joelho direito a 90 graus. <br>3. Eleve os braços em direção ao teto e alinhe o quadril à frente.", animation: "warrior-1", target: "Pernas e Ombros" }
    ]
  },

  "Power Vinyasa Flow": {
    type: "yoga",
    duration: "55 min",
    exercises: [
      { name: "Guerreiro II (Virabhadrasana II)", duration: 45, instructions: "1. Abra as pernas em posição ampla. <br>2. Gire o pé direito 90° e dobre o joelho direito alinhado ao tornozelo. <br>3. Estenda os braços horizontalmente na altura dos ombros. <br>4. Mantenha o olhar sobre a mão da frente.", animation: "warrior-2", target: "Pernas, Quadril e Core" },
      { name: "Triângulo (Trikonasana)", duration: 40, instructions: "1. Afaste as pernas e estenda os braços em T. <br>2. Incline o tronco lateralmente, descendo a mão direita até a canela ou o chão. <br>3. Estenda o braço esquerdo para cima. <br>4. Olhe para a mão de cima e abra o peito.", animation: "triangle", target: "Flexores Laterais e Quadril" },
      { name: "Cachorro Olhando para Baixo", duration: 45, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" },
      { name: "Saudação ao Sol (Surya Namaskar)", duration: 60, instructions: "1. Inspire elevando os braços. <br>2. Expire dobrando o quadril à frente. <br>3. Desça em chaturanga. <br>4. Inspire no cachorro olhando para cima, expire para baixo.", animation: "vinyasa", target: "Fluxo Corpo Inteiro" },
      { name: "Torção de Coluna Sentada", duration: 40, instructions: "1. Sente-se com as pernas cruzadas ou com um joelho dobrado. <br>2. Gire o tronco para o lado direito. <br>3. Coloque o cotovelo esquerdo no joelho direito para aprofundar. <br>4. Mantenha a coluna ereta e respire na torção.", animation: "seated-twist", target: "Coluna e Órgãos Abdominais" }
    ]
  },

  "Deep Restore & Relax": {
    type: "yoga",
    duration: "45 min",
    exercises: [
      { name: "Respiração Abdominal Profunda", duration: 30, instructions: "1. Sente-se confortavelmente. <br>2. Coloque uma mão no abdômen. <br>3. Inspire expandindo a barriga. <br>4. Expire lentamente esvaziando os pulmões.", animation: "breath", target: "Sistema Nervoso" },
      { name: "Postura da Esfinge", duration: 40, instructions: "1. Deite-se de barriga para baixo com os antebraços no chão. <br>2. Eleve o peito mantendo os ombros relaxados e longe das orelhas. <br>3. Olhe para a frente.", animation: "sphinx", target: "Lombar" },
      { name: "Ponte Suportada", duration: 50, instructions: "1. Deite-se de costas com os joelhos dobrados. <br>2. Eleve os quadris contraindo os glúteos. <br>3. Mantenha o pescoço relaxado no chão e respire.", animation: "bridge", target: "Glúteos e Lombar" },
      { name: "Torção de Coluna Deitada", duration: 45, instructions: "1. Traga os joelhos ao peito. <br>2. Deixe os joelhos caírem para o lado direito. <br>3. Vire a cabeça para o lado esquerdo e sinta o alongamento.", animation: "twist", target: "Rotação de Coluna" }
    ]
  },

  "Equilíbrio e Força": {
    type: "yoga",
    duration: "40 min",
    exercises: [
      { name: "Postura da Árvore (Vrikshasana)", duration: 45, instructions: "1. Fique de pé sobre a perna esquerda. <br>2. Pressione a sola do pé direito contra a coxa interna esquerda (evite o joelho). <br>3. Una as palmas das mãos no peito ou eleve-as acima da cabeça. <br>4. Mantenha o olhar fixo em um ponto à frente para equilibrar.", animation: "tree-pose", target: "Equilíbrio e Tornozelos" },
      { name: "Guerreiro I (Virabhadrasana I)", duration: 40, instructions: "1. Dê um passo largo para trás com o pé esquerdo. <br>2. Flexione o joelho direito a 90 graus. <br>3. Eleve os braços em direção ao teto e alinhe o quadril à frente.", animation: "warrior-1", target: "Pernas e Ombros" },
      { name: "Guerreiro II (Virabhadrasana II)", duration: 45, instructions: "1. Abra as pernas em posição ampla. <br>2. Gire o pé direito 90° e dobre o joelho direito alinhado ao tornozelo. <br>3. Estenda os braços horizontalmente na altura dos ombros. <br>4. Mantenha o olhar sobre a mão da frente.", animation: "warrior-2", target: "Pernas, Quadril e Core" },
      { name: "Triângulo (Trikonasana)", duration: 40, instructions: "1. Afaste as pernas e estenda os braços em T. <br>2. Incline o tronco lateralmente, descendo a mão direita até a canela ou o chão. <br>3. Estenda o braço esquerdo para cima.", animation: "triangle", target: "Flexores Laterais e Quadril" },
      { name: "Cachorro Olhando para Baixo", duration: 30, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão. <br>3. Mantenha os braços esticados e a cabeça relaxada.", animation: "down-dog", target: "Posterior e Ombros" }
    ]
  },

  "Post-Workout Recovery": {
    type: "yoga",
    duration: "25 min",
    exercises: [
      { name: "Liberação de Ombros e Pescoço", duration: 30, instructions: "1. Gire o pescoço suavemente em círculos. <br>2. Incline a orelha direita em direção ao ombro correspondente. <br>3. Alterne os lados para soltar a tensão.", animation: "neck", target: "Coluna Cervical" },
      { name: "Alongamento Sentado — Isquiotibiais", duration: 40, instructions: "1. Estique uma das pernas à frente. <br>2. Incline o tronco a partir dos quadris mantendo as costas retas. <br>3. Alcance o pé ou canela.", animation: "hamstring", target: "Cadeia Posterior" },
      { name: "Postura do Pombo", duration: 50, instructions: "1. Traga o joelho direito para a frente no chão. <br>2. Estique a perna esquerda totalmente para trás. <br>3. Desça o quadril em direção ao mat.", animation: "pigeon", target: "Flexores de Quadril" },
      { name: "Relaxamento Final (Savasana)", duration: 60, instructions: "1. Deite-se totalmente plano de costas. <br>2. Deixe os pés caírem para os lados e palmas das mãos para cima. <br>3. Respire e absorva o treino.", animation: "savasana", target: "Restauração Total" }
    ]
  },

  "Yin Yoga Noturno": {
    type: "yoga",
    duration: "50 min",
    exercises: [
      { name: "Respiração 4-7-8 para Relaxar", duration: 60, instructions: "1. Inspire pelo nariz contando 4 tempos. <br>2. Segure o ar por 7 tempos. <br>3. Expire completamente pela boca contando 8 tempos. <br>4. Repita 5 ciclos.", animation: "breath", target: "Sistema Nervoso Parassimpático" },
      { name: "Postura do Pombo Reclinado", duration: 90, instructions: "1. Traga o joelho direito para a frente no chão. <br>2. Estique a perna esquerda totalmente para trás. <br>3. Incline o tronco para frente e descanse os antebraços no chão. <br>4. Fique aqui por 2-3 min por lado.", animation: "pigeon", target: "Quadril Profundo" },
      { name: "Torção de Coluna Deitada", duration: 60, instructions: "1. Traga os joelhos ao peito. <br>2. Deixe os joelhos caírem para o lado direito. <br>3. Vire a cabeça para o lado esquerdo e sinta o alongamento.", animation: "twist", target: "Coluna e Costelas" },
      { name: "Postura da Esfinge Longa", duration: 90, instructions: "1. Deite-se de barriga para baixo com os antebraços no chão. <br>2. Eleve o peito mantendo os ombros relaxados. <br>3. Fique aqui por 2-3 min respirando profundamente.", animation: "sphinx", target: "Lombar e Abdômen" },
      { name: "Savasana Final", duration: 120, instructions: "1. Deite-se de costas. <br>2. Deixe os pés caírem para os lados. <br>3. Feche os olhos e abandone qualquer esforço. <br>4. Permaneça 5-10 minutos.", animation: "savasana", target: "Restauração Completa" }
    ]
  },

  "Yoga Anti-Estresse": {
    type: "yoga",
    duration: "35 min",
    exercises: [
      { name: "Respiração da Caixa (Box Breathing)", duration: 45, instructions: "1. Inspire por 4 tempos. <br>2. Segure por 4 tempos. <br>3. Expire por 4 tempos. <br>4. Segure vazio por 4 tempos. Repita 8 ciclos.", animation: "breath", target: "Ansiedade e Foco Mental" },
      { name: "Postura do Bebê Feliz (Ananda Balasana)", duration: 50, instructions: "1. Deite-se de costas e traga os joelhos ao peito. <br>2. Agarre os dedões dos pés com os dedos. <br>3. Abra os joelhos além do tronco e puxe suavemente para baixo. <br>4. Balance levemente de lado a lado.", animation: "happy-baby", target: "Quadril e Lombar" },
      { name: "Postura Pernas na Parede (Viparita Karani)", duration: 120, instructions: "1. Sente-se de lado próximo a uma parede. <br>2. Deite-se virando as pernas para cima na parede. <br>3. Deixe os braços abertos ao lado do corpo com palmas para cima. <br>4. Permaneça 5 minutos respirando fundo.", animation: "legs-up-wall", target: "Circulação e Recuperação" },
      { name: "Torção de Coluna Deitada", duration: 60, instructions: "1. Traga os joelhos ao peito. <br>2. Deixe-os cair para o lado direito. <br>3. Vire a cabeça para o lado oposto.", animation: "twist", target: "Coluna e Sistema Nervoso" },
      { name: "Savasana Guiada", duration: 120, instructions: "1. Deite-se de costas. <br>2. Feche os olhos. <br>3. Relaxe cada parte do corpo da cabeça aos pés, conscientemente. <br>4. Permaneça 8-10 minutos.", animation: "savasana", target: "Restauração do Sistema Nervoso" }
    ]
  },

  "Força & Fluidez Yoga": {
    type: "yoga",
    duration: "50 min",
    exercises: [
      { name: "Postura da Prancha (Phalakasana)", duration: 45, instructions: "1. Apoie as mãos diretamente abaixo dos ombros. <br>2. Estique as pernas formando uma linha reta. <br>3. Contraia o abdômen e os glúteos sem deixar o quadril subir ou cair.", animation: "plank-pose", target: "Core e Força Total" },
      { name: "Chaturanga Dandasana", duration: 35, instructions: "1. Em prancha alta, dobre os cotovelos próximos ao corpo. <br>2. Desça até a linha dos ombros ficar na altura dos cotovelos. <br>3. Mantenha o corpo reto sem deixar os quadris caírem.", animation: "chaturanga", target: "Tríceps, Peito e Core" },
      { name: "Cachorro Olhando para Cima (Urdhva Mukha Svanasana)", duration: 40, instructions: "1. Deitada de barriga para baixo, mãos sob os ombros. <br>2. Pressione o chão e eleve o peito e os quadris. <br>3. Apenas as mãos e o peito dos pés tocam o chão. <br>4. Abra o peito e olhe ligeiramente para cima.", animation: "updog", target: "Coluna e Peito" },
      { name: "Postura do Corvo (Bakasana)", duration: 40, instructions: "1. Agache-se e coloque as mãos no chão. <br>2. Apoie os joelhos nos tríceps e transfira o peso para as mãos. <br>3. Levante os pés do chão e equilibre nos braços. <br>4. Fique 5-10 respirações.", animation: "crow-pose", target: "Braços, Core e Equilíbrio" },
      { name: "Guerreiro III (Virabhadrasana III)", duration: 45, instructions: "1. Em pé, inclina o tronco para frente. <br>2. Eleve a perna direita atrás formando uma linha reta. <br>3. Estenda os braços à frente ou ao longo do corpo. <br>4. Mantenha o quadril nivelado.", animation: "warrior-3", target: "Equilíbrio e Força de Perna" },
      { name: "Postura da Meia Lua (Ardha Chandrasana)", duration: 40, instructions: "1. Do Guerreiro II, estique a perna dianteira e leve a mão direita ao chão. <br>2. Eleve a perna esquerda paralela ao chão. <br>3. Abra o quadril e o peito para o lado, estendendo o braço esquerdo para cima.", animation: "half-moon", target: "Equilíbrio Total e Pernas" }
    ]
  },

  "Yoga Detox Matinal": {
    type: "yoga",
    duration: "30 min",
    exercises: [
      { name: "Torção em Cadeira (Parivrtta Utkatasana)", duration: 40, instructions: "1. Agache como se fosse sentar em uma cadeira imaginária. <br>2. Una as mãos no peito em anjali mudra. <br>3. Gire o tronco para a direita colocando o cotovelo esquerdo na parte externa do joelho direito.", animation: "chair-twist", target: "Órgãos Digestivos e Core" },
      { name: "Saudação ao Sol com Torção", duration: 60, instructions: "1. Execute a sequência da Saudação ao Sol. <br>2. Ao chegar em Guerreiro I, adicione uma torção de tronco. <br>3. Abra um braço para o teto enquanto o outro aponta para o chão.", animation: "vinyasa", target: "Corpo Inteiro e Digestão" },
      { name: "Postura do Camelo (Ustrasana)", duration: 45, instructions: "1. Ajoelhe-se com os joelhos na largura do quadril. <br>2. Empurre o quadril para frente enquanto inclina o tronco para trás. <br>3. Leve as mãos aos calcanhares ou coloque-as na lombar. <br>4. Abra bem o peito.", animation: "camel-pose", target: "Extensão de Coluna e Tireóide" },
      { name: "Postura da Cobra (Bhujangasana)", duration: 40, instructions: "1. Deite-se de bruços com as mãos sob os ombros. <br>2. Pressione o chão e eleve o peito lentamente. <br>3. Mantenha os cotovelos ligeiramente dobrados. <br>4. Olhe para frente ou levemente para cima.", animation: "cobra-pose", target: "Lombar e Abertura de Peito" },
      { name: "Postura da Criança (Balasana)", duration: 60, instructions: "1. Sente-se nos calcanhares. <br>2. Incline o tronco à frente apoiando a testa no chão. <br>3. Braços estendidos à frente ou ao longo do corpo. <br>4. Respire fundo expandindo as costas.", animation: "childs-pose", target: "Relaxamento da Coluna" }
    ]
  },

  "Yoga para Iniciantes": {
    type: "yoga",
    duration: "25 min",
    exercises: [
      { name: "Respiração Diafragmática", duration: 30, instructions: "1. Sente-se ou deite-se confortavelmente. <br>2. Coloque uma mão no peito e outra no abdômen. <br>3. Inspire enchendo o abdômen primeiro. <br>4. Expire vagarosamente.", animation: "breath", target: "Relaxamento e Foco" },
      { name: "Postura da Montanha (Tadasana)", duration: 30, instructions: "1. Fique de pé com os pés juntos ou levemente afastados. <br>2. Pressione os pés no chão e eleve toda a coluna. <br>3. Relaxe os ombros para baixo e para trás. <br>4. Respire profundamente por 10 respirações.", animation: "mountain-pose", target: "Postura e Alinhamento" },
      { name: "Postura do Gato-Vaca (Marjaryasana)", duration: 40, instructions: "1. Em quatro apoios. <br>2. Ao inspirar, deixe a barriga cair para o chão e olhe para cima (Vaca). <br>3. Ao expirar, curve a coluna para cima como um gato. <br>4. Repita 10 vezes.", animation: "cat-cow", target: "Mobilidade da Coluna" },
      { name: "Postura da Criança", duration: 60, instructions: "1. Ajoelhe-se e afaste os joelhos. <br>2. Incline o tronco entre as coxas. <br>3. Estenda os braços à frente ou apoie ao longo do corpo. <br>4. Respire fundo pelas costas.", animation: "childs-pose", target: "Lombar e Ombros" },
      { name: "Savasana", duration: 60, instructions: "1. Deite-se de costas. <br>2. Deixe o corpo relaxar completamente. <br>3. Feche os olhos e respire naturalmente. <br>4. Permaneça 3-5 minutos.", animation: "savasana", target: "Relaxamento Total" }
    ]
  },

  "Yoga Força de Braços": {
    type: "yoga",
    duration: "40 min",
    exercises: [
      { name: "Prancha Lateral (Vasisthasana)", duration: 40, instructions: "1. Em prancha alta, gire para o lado transferindo o peso para a mão direita. <br>2. Empilhe os pés ou coloque o joelho de baixo no chão. <br>3. Eleve o quadril e estenda o braço esquerdo para cima.", animation: "side-plank", target: "Ombros e Core Lateral" },
      { name: "Postura do Delfim (Ardha Pincha Mayurasana)", duration: 35, instructions: "1. Em quatro apoios, desça para os antebraços. <br>2. Eleve os quadris formando um V invertido nos antebraços. <br>3. Pressione os antebraços no chão e tente deixar os calcanhares no chão.", animation: "dolphin-pose", target: "Ombros e Isquiotibiais" },
      { name: "Postura do Corvo (Bakasana)", duration: 40, instructions: "1. Agache e coloque as mãos no chão. <br>2. Dobre os cotovelos e apoie os joelhos neles. <br>3. Transfira o peso para as mãos e levante os pés. <br>4. Equilibre por 5 respirações.", animation: "crow-pose", target: "Braços e Core" },
      { name: "Chaturanga Dandasana", duration: 35, instructions: "1. Em prancha alta, dobre os cotovelos próximos ao corpo. <br>2. Desça controlado até os ombros ficarem na altura dos cotovelos. <br>3. Suba de volta.", animation: "chaturanga", target: "Tríceps e Peito" },
      { name: "Postura do Arco (Dhanurasana)", duration: 40, instructions: "1. Deite-se de bruços. <br>2. Dobre os joelhos e segure os tornozelos com as mãos. <br>3. Inspire elevando o peito e as coxas do chão ao mesmo tempo. <br>4. Mantenha o equilíbrio sobre o abdômen.", animation: "bow-pose", target: "Coluna, Peito e Isquiotibiais" }
    ]
  },

  // ============================
  // BODYWEIGHT — TREINO EM CASA
  // ============================

  "Full Body em Casa": {
    type: "pilates",
    equipment: "Mat",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Agachamento Isométrico (Wall Sit)", duration: 45, instructions: "1. Encoste-se na parede e desça até os joelhos formarem 90°. <br>2. Mantenha as costas retas e os joelhos alinhados aos pés. <br>3. Segure a posição pelo tempo indicado.", animation: "wall-sit", target: "Quadríceps e Glúteos" },
      { name: "Superman no Mat", duration: 35, instructions: "1. Deite-se de bruços com braços estendidos à frente. <br>2. Eleve simultaneamente braços, peito e pernas do chão. <br>3. Segure 2 segundos no topo e desça com controle.", animation: "superman", target: "Lombar e Glúteos" },
      { name: "Bird Dog", duration: 40, instructions: "1. Em quatro apoios, core contraído. <br>2. Estenda o braço direito à frente e a perna esquerda atrás ao mesmo tempo. <br>3. Mantenha a linha reta do calcanhar à mão. <br>4. Troque os lados.", animation: "bird-dog", target: "Core Estabilizador e Lombar" },
      { name: "Dead Bug", duration: 40, instructions: "1. Deite-se de costas e eleve braços e pernas a 90°. <br>2. Expire estendendo o braço direito atrás e a perna esquerda à frente. <br>3. Retorne e alterne os lados mantendo a lombar no chão.", animation: "dead-bug", target: "Core Profundo e Anti-Rotação" },
      { name: "Flexão de Braço Modificada", duration: 35, instructions: "1. Apoie os joelhos no chão. <br>2. Mãos um pouco mais largas que os ombros. <br>3. Desça o peito até perto do chão dobrando os cotovelos. <br>4. Suba esticando os braços.", animation: "pushup-bar", target: "Peito, Tríceps e Core" }
    ]
  },

  "HIIT Suave em Casa": {
    type: "pilates",
    equipment: "Mat",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Agachamento com Salto Suave", duration: 30, instructions: "1. Agache até os joelhos formarem 90°. <br>2. Suba com impulso elevando levemente os calcanhares. <br>3. Aterrisse suavemente dobrando os joelhos. <br>4. Repita no ritmo.", animation: "squat-press", target: "Pernas, Glúteos e Cardio" },
      { name: "Mountain Climbers", duration: 35, instructions: "1. Em prancha alta com braços esticados. <br>2. Traga o joelho direito em direção ao peito e retorne. <br>3. Alterne as pernas em ritmo constante. <br>4. Mantenha os quadris nivelados.", animation: "plank-bar", target: "Core e Cardio" },
      { name: "Toque no Ombro em Prancha", duration: 40, instructions: "1. Em prancha alta. <br>2. Levante a mão direita e toque o ombro esquerdo. <br>3. Troque os lados. <br>4. Mantenha o quadril estável sem girar.", animation: "plank-bar", target: "Core Anti-Rotação e Braços" },
      { name: "Hollow Body Hold", duration: 45, instructions: "1. Deite-se de costas com braços acima da cabeça. <br>2. Eleve levemente braços e pernas do chão. <br>3. Pressione a lombar contra o chão. <br>4. Mantenha a posição contraindo o abdômen.", animation: "hundred", target: "Core Profundo e Resistência" }
    ]
  },

  "Pilates Bar + Flow Matinal": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Respiração Ativadora", duration: 30, instructions: "1. Em pé, segure a barra à frente. <br>2. Inspire pelo nariz expandindo as costelas. <br>3. Expire contraindo o abdômen empurrando o ar para fora. <br>4. Repita 10 vezes para ativar o core.", animation: "breath", target: "Core Profundo e Foco" },
      { name: "Agachamento com Desenvolvimento", duration: 35, instructions: "1. Fique de pé sobre os elásticos da barra de Pilates. <br>2. Posicione a barra na altura dos ombros. <br>3. Agache e ao subir empurre a barra acima da cabeça.", animation: "squat-press", target: "Glúteos e Ombros" },
      { name: "Guerreiro II com Barra Elevada", duration: 40, instructions: "1. Afaste as pernas em postura de Guerreiro II. <br>2. Segure a barra acima da cabeça com braços esticados. <br>3. Mantenha a barra estável enquanto dobra o joelho dianteiro. <br>4. Sinta o trabalho do core e das pernas.", animation: "warrior-2", target: "Pernas, Core e Ombros" },
      { name: "Rosca Bíceps com Barra", duration: 35, instructions: "1. Pés nos elásticos. <br>2. Palmas para cima. <br>3. Flexione os cotovelos trazendo a barra aos ombros.", animation: "bicep-curl-bar", target: "Bíceps e Antebraços" },
      { name: "Alongamento Final — Postura da Criança", duration: 60, instructions: "1. Larguem a barra. <br>2. Ajoelhe-se no mat. <br>3. Incline o tronco à frente estendendo os braços à frente. <br>4. Respire fundo pelas costas.", animation: "childs-pose", target: "Recuperação e Alongamento" }
    ]
  },

  "Yoga + Pilates Bar Fusion": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Saudação ao Sol com Barra", duration: 60, instructions: "1. Segure a barra acima da cabeça. <br>2. Inspire elevando a barra ainda mais. <br>3. Expire dobrando o tronco à frente com a barra à frente. <br>4. Repita 5x para aquecer.", animation: "vinyasa", target: "Aquecimento Total" },
      { name: "Guerreiro I com Remada", duration: 40, instructions: "1. Em postura Guerreiro I segurando a barra. <br>2. Incline o tronco sobre a perna dianteira. <br>3. Puxe a barra para os quadris em remada curvada.", animation: "row-bar", target: "Costas e Pernas" },
      { name: "Árvore com Barra de Equilíbrio", duration: 45, instructions: "1. Fique na Postura da Árvore com o pé apoiado na coxa. <br>2. Segure a barra com uma mão à frente para suporte. <br>3. Progressivamente solte a barra aumentando o desafio de equilíbrio.", animation: "tree-pose", target: "Equilíbrio e Tornozelos" },
      { name: "Elevação de Quadril com Resistência", duration: 40, instructions: "1. Deite no mat com pés nas alças. <br>2. Barra sobre o quadril. <br>3. Eleve contra a resistência elástica.", animation: "glute-bridge-bar", target: "Glúteos e Posterior" },
      { name: "Savasana de Integração", duration: 90, instructions: "1. Afaste a barra. <br>2. Deite-se completamente no mat. <br>3. Feche os olhos e integre todo o treino. <br>4. Permaneça 3-5 minutos.", animation: "savasana", target: "Recuperação e Integração" }
    ]
  },

  "Corpo Completo — Barra + Core": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Agachamento Sumô com Barra", duration: 40, instructions: "1. Pés afastados e apontados para fora. <br>2. Barra atrás dos ombros. <br>3. Agache descendo o quadril até os joelhos.", animation: "sumo-squat-bar", target: "Glúteos e Adutores" },
      { name: "O Cem com Barra Aérea", duration: 50, instructions: "1. Deite-se e eleve as pernas a 45°. <br>2. Segure a barra verticalmente acima do peito com braços esticados. <br>3. Eleve a cabeça e os ombros. <br>4. Bombeie os braços 100 vezes.", animation: "hundred", target: "Core Total" },
      { name: "Prancha com Barra", duration: 45, instructions: "1. Mãos na barra no chão. <br>2. Corpo em linha reta. <br>3. Core ativado por 30-45 segundos.", animation: "plank-bar", target: "Core e Estabilizadores" },
      { name: "Rosca Inversa com Barra", duration: 35, instructions: "1. Pegada pronada sobre os elásticos. <br>2. Flexione os cotovelos puxando a barra ao peito.", animation: "reverse-curl-bar", target: "Antebraços e Bíceps" },
      { name: "Roll-Up + Barra Estendida", duration: 45, instructions: "1. Deite com a barra acima da cabeça. <br>2. Expire enrolando a coluna vértebra por vértebra. <br>3. Estenda a barra para os pés no topo. <br>4. Retorne devagar.", animation: "roll-up", target: "Abdômen e Coluna" }
    ]
  },



  "Squat & Press": {
    type: "pilates",
    equipment: "bar",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Agachamento com Desenvolvimento", duration: 35, instructions: "1. Fique de pé segurando a barra de Pilates na altura dos ombros. <br>2. Agache flexionando os joelhos e jogando o quadril para trás. <br>3. Fique de pé e empurre a barra acima da cabeça.", animation: "squat-press", target: "Glúteos e Ombros" }
    ]
  },

  "Overhead Lunge": {
    type: "pilates",
    equipment: "bar",
    sets: 3,
    reps: 10,
    exercises: [
      { name: "Avanço com Barra Elevada", duration: 35, instructions: "1. Fique de pé segurando a barra acima da cabeça com braços esticados. <br>2. Dê um passo largo à frente. <br>3. Flexione os joelhos até o de trás quase tocar o chão. <br>4. Retorne e alterne.", animation: "overhead-lunge", target: "Quadríceps e Estabilidade" }
    ]
  },

  "Força Total com Barra": {
    type: "pilates",
    equipment: "bar",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Levantamento Terra (Romanian Deadlift)", duration: 40, instructions: "1. Fique de pé segurando a barra na frente das coxas. <br>2. Incline o tronco à frente a partir dos quadris mantendo as costas retas. <br>3. Desça a barra pelas pernas sentindo a tensão nos isquiotibiais. <br>4. Retorne à posição inicial contraindo os glúteos.", animation: "deadlift-bar", target: "Isquiotibiais e Glúteos" },
      { name: "Remada Curvada com Barra", duration: 35, instructions: "1. Incline o tronco a 45° mantendo as costas retas. <br>2. Segure a barra com as duas mãos à frente. <br>3. Puxe os cotovelos para trás e para cima. <br>4. Aperte as escápulas no topo e desça com controle.", animation: "row-bar", target: "Costas e Bíceps" },
      { name: "Elevação Lateral com Barra", duration: 30, instructions: "1. Fique de pé com a barra paralela ao chão na frente do corpo. <br>2. Mantenha o core contraído. <br>3. Eleve a barra lateralmente até a altura dos ombros. <br>4. Desça com controle.", animation: "side-raise-bar", target: "Deltoides Laterais" },
      { name: "Prancha com Barra", duration: 45, instructions: "1. Apoie as mãos na barra colocada no chão. <br>2. Estique as pernas e forme uma linha reta do calcanhar à cabeça. <br>3. Contraia o abdômen e os glúteos. <br>4. Mantenha por 30-45 segundos respirando.", animation: "plank-bar", target: "Core e Estabilizadores" }
    ]
  },

  "Escultura de Braços & Bíceps": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Rosca Bíceps com Barra", duration: 35, instructions: "1. Fique de pé pisando nas alças elásticas com ambos os pés. <br>2. Segure a barra com as palmas voltadas para cima na largura dos ombros. <br>3. Flexione os cotovelos trazendo a barra em direção aos ombros, tensionando os elásticos. <br>4. Desça de forma controlada.", animation: "bicep-curl-bar", target: "Bíceps e Antebraços" },
      { name: "Desenvolvimento Militar com Barra", duration: 35, instructions: "1. Com a barra na altura do peito e as palmas voltadas para a frente. <br>2. Empurre a barra para cima até esticar completamente os braços acima da cabeça. <br>3. Retorne devagar até a altura dos ombros sob tensão constante.", animation: "military-press-bar", target: "Ombros e Tríceps" },
      { name: "Tríceps Overhead com Barra", duration: 40, instructions: "1. Eleve a barra acima da cabeça com as mãos próximas. <br>2. Mantendo os cotovelos apontados para a frente, flexione-os descendo a barra atrás da cabeça. <br>3. Estenda os braços novamente empurrando contra a resistência do elástico.", animation: "tricep-overhead-bar", target: "Tríceps" }
    ]
  },

  "Pernas & Glúteos Extremos": {
    type: "pilates",
    equipment: "elastic",
    sets: 4,
    reps: 12,
    exercises: [
      { name: "Agachamento Sumô com Barra", duration: 40, instructions: "1. Afaste bem os pés com as pontas viradas para fora, pisando nos elásticos. <br>2. Descanse a barra de forma segura atrás dos ombros. <br>3. Agache descendo o quadril até a linha dos joelhos. <br>4. Suba apertando os glúteos.", animation: "sumo-squat-bar", target: "Glúteos, Adutores e Quadríceps" },
      { name: "Elevação de Quadril com Resistência", duration: 40, instructions: "1. Deite-se de costas com os pés nas alças elásticas. <br>2. Posicione a barra sobre a linha do quadril segurando-a com as mãos. <br>3. Eleve o quadril do chão contra a resistência elástica da barra que é empurrada para baixo. <br>4. Segure 1s e desça vértebra por vértebra.", animation: "glute-bridge-bar", target: "Glúteos e Posterior de Coxa" },
      { name: "Chute Traseiro com Elástico da Barra", duration: 35, instructions: "1. Fique em quatro apoios segurando as duas pontas da barra contra o mat. <br>2. Posicione a alça elástica na sola do pé direito. <br>3. Dê um chute para trás e para cima esticando completamente a perna contra o elástico. <br>4. Alterne após a série.", animation: "donkey-kick-bar", target: "Glúteos e Lombar" }
    ]
  },

  "Definição & Cintura Oblíqua": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Giro de Cintura com Barra", duration: 45, instructions: "1. Fique de pé with feet on the elastic loops. <br>2. Place the bar behind shoulders. <br>3. Keeping hips forward, twist torso side to side against tension.", animation: "torso-twist-bar", target: "Oblíquos e Core Lateral" },
      { name: "Flexão Auxiliada com Barra", duration: 40, instructions: "1. Fique na posição de flexão apoiando as duas mãos firmemente na barra no chão. <br>2. Flexione os cotovelos trazendo o peito perto da barra. <br>3. Empurre de volta com força mantendo o core ativado.", animation: "pushup-bar", target: "Peito, Ombros e Core" },
      { name: "Prancha com Barra", duration: 45, instructions: "1. Apoie as mãos na barra colocada no chão. <br>2. Estique as pernas e forme uma linha reta do calcanhar à cabeça. <br>3. Contraia o abdômen e os glúteos. <br>4. Mantenha por 30-45 segundos respirando.", animation: "plank-bar", target: "Core" }
    ]
  },

  "Resistência & Quadril com Barra": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "Passo Lateral com Barra", duration: 40, instructions: "1. Fique de pé com os pés dentro das alças elásticas da barra de Pilates. <br>2. Segure a barra à frente do peito com elásticos tensionados. <br>3. Dê passos laterais largos controlando a tração do elástico que puxa as pernas para dentro.", animation: "lateral-walk-bar", target: "Abdutores de Quadril e Glúteo Médio" },
      { name: "Afundo Búlgaro com Barra", duration: 35, instructions: "1. Posicione um pé atrás apoiado no elástico da barra, mantendo o outro pé no mat. <br>2. Segure a barra apoiada nos ombros. <br>3. Desça o joelho de trás em direção ao chão e retorne elevando o tronco.", animation: "bulgarian-lunge-bar", target: "Quadríceps, Glúteos e Estabilidade" },
      { name: "Agachamento Sumô com Barra", duration: 40, instructions: "1. Afaste bem os pés com as pontas viradas para fora, pisando nos elásticos. <br>2. Descanse a barra de forma segura atrás dos ombros. <br>3. Agache descendo o quadril até a linha dos joelhos.", animation: "sumo-squat-bar", target: "Glúteos, Adutores e Quadríceps" }
    ]
  },

  "Superiores & Postura com Barra": {
    type: "pilates",
    equipment: "elastic",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Elevação Frontal com Barra", duration: 30, instructions: "1. Fique de pé com os pés dentro das alças da barra. <br>2. Segure a barra à frente das coxas com pegada pronada (palmas para baixo). <br>3. Eleve a barra mantendo os braços retos até a altura dos ombros contra a resistência elástica. <br>4. Desça devagar.", animation: "front-raise-bar", target: "Deltoides Anteriores e Postura" },
      { name: "Rosca Inversa com Barra", duration: 35, instructions: "1. Fique de pé pisando nos elásticos da barra. <br>2. Segure a barra com pegada pronada (palmas voltadas para baixo). <br>3. Flexione os cotovelos trazendo a barra em direção ao peito para trabalhar antebraço e bíceps. <br>4. Retorne devagar.", animation: "reverse-curl-bar", target: "Antebraços e Bíceps Braquial" },
      { name: "Remada Curvada com Barra", duration: 35, instructions: "1. Incline o tronco a 45° mantendo as costas retas. <br>2. Segure a barra com as duas mãos à frente. <br>3. Puxe os cotovelos para trás e para cima. <br>4. Aperte as escápulas no topo e desça com controle.", animation: "row-bar", target: "Costas e Bíceps" }
    ]
  },

  // ============================
  // PILATES — RING SESSIONS
  // ============================

  "Inner Thigh Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 20,
    exercises: [
      { name: "Aperto de Coxa com Anel", duration: 30, instructions: "1. Deite-se de costas ou sente-se com joelhos dobrados. <br>2. Posicione o anel de Pilates entre as coxas. <br>3. Aperte o anel devagar, segure por 1s e solte com controle.", animation: "thigh-squeeze", target: "Adutores e Core Interno" }
    ]
  },

  "Bridge & Ring Squeeze": {
    type: "pilates",
    equipment: "Ring",
    sets: 4,
    reps: 12,
    exercises: [
      { name: "Ponte com Compressão de Anel", duration: 35, instructions: "1. Deite-se de costas com joelhos dobrados e o anel entre as coxas. <br>2. Eleve os quadris do chão contraindo glúteos e lombar. <br>3. Squeeze o anel no topo da ponte e desça.", animation: "bridge-squeeze", target: "Glúteos e Posterior de Coxa" }
    ]
  },

  "Ring Power — Full Body": {
    type: "pilates",
    equipment: "Ring",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Compressão de Anel no Peito", duration: 30, instructions: "1. Deite-se de costas com joelhos dobrados. <br>2. Segure o anel entre as palmas das mãos na altura do peito. <br>3. Pressione as palmas em direção ao centro do anel. <br>4. Segure 2s e solte com controle.", animation: "ring-chest-press", target: "Peitoral e Tríceps" },
      { name: "Aperto de Coxa com Anel", duration: 30, instructions: "1. Sente-se com joelhos dobrados e pés no chão. <br>2. Posicione o anel entre as coxas. <br>3. Aperte o anel devagar, segure por 1s e solte com controle.", animation: "thigh-squeeze", target: "Adutores" },
      { name: "Aperto Lateral com Anel", duration: 35, instructions: "1. Deite-se de lado com o corpo em linha reta. <br>2. Posicione o anel entre os tornozelos. <br>3. Levante a perna de cima comprimindo o anel. <br>4. Desça com controle e repita.", animation: "ring-side-squeeze", target: "Abdutores e Glúteo Médio" },
      { name: "Ponte com Compressão de Anel", duration: 35, instructions: "1. Deite-se de costas com joelhos dobrados e o anel entre as coxas. <br>2. Eleve os quadris do chão contraindo glúteos e lombar. <br>3. Squeeze o anel no topo da ponte e desça.", animation: "bridge-squeeze", target: "Glúteos e Posterior de Coxa" }
    ]
  },

  // ============================
  // PILATES — CLASSIC MAT
  // ============================

  "Pilates Clássico no Mat": {
    type: "pilates",
    equipment: "Mat",
    sets: 2,
    reps: 10,
    exercises: [
      { name: "O Cem (The Hundred)", duration: 60, instructions: "1. Deite-se de costas e eleve as pernas a 45°. <br>2. Levante a cabeça e os ombros em crunch. <br>3. Estenda os braços paralelos ao chão. <br>4. Bata os braços para cima e para baixo (pompas rápidas) contando 100.", animation: "hundred", target: "Core Profundo e Resistência" },
      { name: "Roll-Up (Enrolamento)", duration: 45, instructions: "1. Deite-se de costas com braços acima da cabeça. <br>2. Inspire e traga os braços para a frente. <br>3. Expire enrolando a coluna vértebra por vértebra até tocar os pés. <br>4. Inspire no topo, expire enrolando de volta.", animation: "roll-up", target: "Coluna e Abdômen" },
      { name: "Círculo de Perna", duration: 40, instructions: "1. Deite-se de costas com uma perna esticada no chão. <br>2. Eleve a outra perna em direção ao teto. <br>3. Faça círculos lentos e controlados com a perna elevada. <br>4. Mantenha o quadril completamente fixo no chão.", animation: "leg-circle", target: "Quadril e Estabilidade de Core" },
      { name: "Pont com Enrolamento", duration: 45, instructions: "1. Deite-se de costas com joelhos dobrados. <br>2. Eleve os quadris articulando a coluna vértebra por vértebra. <br>3. No topo, contraia os glúteos. <br>4. Desça enrolando de volta com controle.", animation: "bridge", target: "Coluna, Glúteos e Isquiotibiais" }
    ]
  },

  "Core Avançado de Pilates": {
    type: "pilates",
    equipment: "Mat",
    sets: 3,
    reps: 12,
    exercises: [
      { name: "O Cem (The Hundred)", duration: 60, instructions: "1. Deite-se de costas e eleve as pernas a 45°. <br>2. Bombeie os braços esticados ao lado do corpo respirando cadenciadamente.", animation: "hundred", target: "Core Resistência" },
      { name: "O Teaser", duration: 50, instructions: "1. Deite de costas e eleve pernas e braços a 45° simultaneamente. <br>2. Equilibre-se sobre o cóccix formando um V perfeito com o corpo. <br>3. Sustente a posição com o abdômen contraído.", animation: "teaser-pilates", target: "Core Total e Equilíbrio" },
      { name: "Tesouras no Mat", duration: 40, instructions: "1. Curve a cabeça e ombros para cima. <br>2. Eleve uma perna reta e puxe-a com as mãos enquanto a outra flutua esticada perto do chão. <br>3. Alterne as pernas de forma contínua.", animation: "scissors-pilates", target: "Abdominais Inferiores e Posterior de Coxa" },
      { name: "Alongamento Duplo de Pernas", duration: 45, instructions: "1. Traga os joelhos ao peito abraçando as canelas. <br>2. Estenda os braços para trás e as pernas para a frente a 45° ao mesmo tempo. <br>3. Retorne em círculo abraçando os joelhos.", animation: "double-leg-stretch", target: "Core Estabilizador" }
    ]
  },

  "Flexibilidade Avançada": {
    type: "yoga",
    duration: "45 min",
    exercises: [
      { name: "Postura da Meia Lua (Ardha Chandrasana)", duration: 45, instructions: "1. Incline o tronco lateralmente apoiando uma mão no chão ou bloco. <br>2. Eleve a outra perna paralela ao chão. <br>3. Estenda o braço oposto em direção ao teto abrindo o quadril e o peito.", animation: "half-moon", target: "Equilíbrio, Pernas e Quadril" },
      { name: "Postura do Pombo", duration: 50, instructions: "1. Traga o joelho direito para a frente no chão. <br>2. Estique a perna esquerda totalmente para trás. <br>3. Desça o quadril em direção ao mat.", animation: "pigeon", target: "Flexores de Quadril" },
      { name: "Postura do Camelo (Ustrasana)", duration: 40, instructions: "1. Ajoelhe-se no mat na largura do quadril. <br>2. Incline o tronco para trás levando as mãos até os calcanhares. <br>3. Empurre os quadris para frente e abra bem o peito.", animation: "camel-pose", target: "Extensão de Coluna e Ombros" },
      { name: "Postura da Cobra (Bhujangasana)", duration: 40, instructions: "1. Deite de bruços no mat. <br>2. Pressione as mãos sob os ombros e eleve o peito do chão. <br>3. Mantenha os cotovelos flexionados e próximos às costelas.", animation: "cobra-pose", target: "Fortalecimento Lombar" }
    ]
  },

  "Pilates Escultura Lateral": {
    type: "pilates",
    equipment: "Mat",
    sets: 3,
    reps: 15,
    exercises: [
      { name: "Chute Lateral (Side Kick)", duration: 45, instructions: "1. Deite-se de lado apoiando a cabeça na mão. <br>2. Traga as pernas levemente à frente. <br>3. Eleve a perna de cima à altura do quadril e chute à frente duas vezes e atrás uma vez de forma controlada.", animation: "side-kick-pilates", target: "Glúteo Médio e Estabilidade de Core" },
      { name: "A Serra (Pilates Saw)", duration: 40, instructions: "1. Sente-se com as pernas abertas além da largura do mat. <br>2. Gire o tronco e alcance o pé oposto com a mão serrando o dedo mindinho do pé. <br>3. Retorne com a coluna reta e alterne os lados.", animation: "saw-pilates", target: "Mobilidade de Coluna e Oblíquos" },
      { name: "Aperto Lateral com Anel", duration: 35, instructions: "1. Deite-se de lado com o anel entre os tornozelos. <br>2. Eleve ambas as pernas espremendo o anel no topo.", animation: "ring-side-squeeze", target: "Adutores e Lateral do Corpo" }
    ]
  },

  "Power Flow Desafio Core": {
    type: "yoga",
    duration: "35 min",
    exercises: [
      { name: "Postura do Barco (Navasana)", duration: 50, instructions: "1. Sente-se no mat com joelhos dobrados. <br>2. Incline o tronco reto para trás e estique as pernas a 45° formando um V. <br>3. Estenda os braços à frente paralelos ao chão.", animation: "boat-pose", target: "Abdômen e Flexores de Quadril" },
      { name: "Prancha Tradicional (Phalakasana)", duration: 45, instructions: "1. Apoie as mãos na largura dos ombros com os braços esticados. <br>2. Mantenha o corpo alinhado da cabeça aos pés sem deixar o quadril cair.", animation: "plank-pose", target: "Força Total e Core" },
      { name: "Cachorro Olhando para Baixo", duration: 30, instructions: "1. Suba os quadris e estique as pernas formando um V invertido. <br>2. Empurre os calcanhares em direção ao chão.", animation: "down-dog", target: "Posterior e Ombros" }
    ]
  }
};

let currentPlayerInterval = null;
let currentExerciseIndex = 0;
let currentSecondsLeft = 0;
let isPlayerPaused = false;
let currentWorkoutName = "";
let currentWorkoutData = null;

// ==========================================
// SCROLL REVEAL (Intersection Observer)
// ==========================================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// MOBILE DRAWER MENU
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeMenu);
}

// ==========================================
// PREMIUM WEB AUDIO CHIME
// ==========================================
function playPremiumChime(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'complete') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); 
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); 
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.7);
    }
  } catch (e) {
    console.log("Audio contexts blocked.");
  }
}

// ==========================================
// VIDEO MODAL PLAYER SETUP & ACTIONS
// ==========================================
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      closeWorkoutPlayer();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWorkoutPlayer();
      }
    });
  }
}

function closeWorkoutPlayer() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  clearInterval(currentPlayerInterval);
  currentPlayerInterval = null;
}

// ==========================================
// PREMIUM CONTENT GUARD
// ==========================================

/**
 * Checks whether the card / element that triggered the click
 * is marked as premium content (has .card__badge--premium or .card__lock).
 */
function isContentPremium(triggerElement) {
  if (!triggerElement) return false;
  const card = triggerElement.closest('.card, article, [data-premium]');
  if (!card) return false;
  return !!(
    card.querySelector('.card__badge--premium') ||
    card.querySelector('.card__lock') ||
    card.dataset.premium === 'true'
  );
}

/**
 * Central access gate. Returns true when the user may play the content.
 * Falls back to free access when Supabase is unavailable (offline / file://).
 */
async function canPlayContent(triggerElement) {
  // MODO TESTE/DESENVOLVIMENTO: Tudo 100% liberado para teste livre
  return true;

  /* -- Gating real que volta após a homologação --
  if (!isContentPremium(triggerElement)) return true;
  if (window.atlasSupabase && typeof window.atlasSupabase.checkPremiumAccess === 'function') {
    try {
      const hasPremium = await window.atlasSupabase.checkPremiumAccess();
      return hasPremium;
    } catch (err) {
      console.warn('[Atlas] Supabase check failed, falling back:', err);
    }
  }
  const cached = localStorage.getItem('atlas_premium_status');
  if (cached === 'active' || cached === 'trial') return true;
  return false;
  */
}

window.openVideoModal = async function(title, duration, triggerEl) {
  // triggerEl may be passed via onclick="openVideoModal(t, d, this)"
  // or we try to infer it from the event target
  const trigger = triggerEl || (window._lastClickTarget) || null;

  const allowed = await canPlayContent(trigger);
  if (!allowed) {
    window.showToast('🔒 Conteúdo Premium — adquira o Atlas Pilates Bar para desbloquear.');
    setTimeout(() => { window.location.href = 'subscription.html'; }, 1200);
    return;
  }

  launchWorkoutPlayer(title);
};

window.openExerciseModal = async function(name, type, triggerEl) {
  const trigger = triggerEl || (window._lastClickTarget) || null;

  const allowed = await canPlayContent(trigger);
  if (!allowed) {
    window.showToast('🔒 Conteúdo Premium — adquira o Atlas Pilates Bar para desbloquear.');
    setTimeout(() => { window.location.href = 'subscription.html'; }, 1200);
    return;
  }

  launchWorkoutPlayer(name);
};

// Track last clicked element so modal openers called without `this` still work
document.addEventListener('click', function(e) {
  window._lastClickTarget = e.target;
}, true);

function launchWorkoutPlayer(name) {
  const modal = document.getElementById('videoModal');
  if (!modal) return;

  currentWorkoutName = name;
  currentWorkoutData = workoutData[name];

  if (!currentWorkoutData) {
    currentWorkoutData = {
      type: "yoga",
      exercises: [
        { name: name, duration: 45, instructions: "Listen to your body. Breathe deeply and maintain control.", animation: "breath", target: "Posture" }
      ]
    };
  }

  currentExerciseIndex = 0;
  isPlayerPaused = false;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  loadExercise(currentExerciseIndex);
}

function loadExercise(index) {
  clearInterval(currentPlayerInterval);
  const exercise = currentWorkoutData.exercises[index];
  currentSecondsLeft = exercise.duration;

  renderPlayerUI(exercise);
  startTimer();
}

function startTimer() {
  currentPlayerInterval = setInterval(() => {
    if (isPlayerPaused) return;

    currentSecondsLeft--;
    
    if (currentSecondsLeft > 0 && currentSecondsLeft <= 3) {
      playPremiumChime('tick');
    }

    updateTimerDisplay();

    if (currentSecondsLeft <= 0) {
      clearInterval(currentPlayerInterval);
      playPremiumChime('complete');
      
      if (currentExerciseIndex < currentWorkoutData.exercises.length - 1) {
        currentExerciseIndex++;
        loadExercise(currentExerciseIndex);
      } else {
        finishWorkout();
      }
    }
  }, 1000);
}

function finishWorkout() {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  playPremiumChime('complete');

  // Salva progresso do programa ativo se houver
  if (window.activeProgramId) {
    const progId = window.activeProgramId;
    let curr = localStorage.getItem(`atlas_program_progress_${progId}`);
    curr = curr === null ? 1 : parseInt(curr) || 1;
    
    // Avança progresso para o próximo dia
    const next = curr + 1;
    localStorage.setItem(`atlas_program_progress_${progId}`, next);
    
    // Se estivermos na página de programas, re-renderiza o progresso na tela
    const grid = document.querySelector(`.program-progress-grid[data-program-id="${progId}"]`);
    if (grid) {
      const totalDays = parseInt(grid.getAttribute('data-total-days')) || 7;
      const prefix = grid.getAttribute('data-prefix') || 'D';
      renderGrid(grid, progId, totalDays, prefix, next);
    }
    
    // Limpa a referência do programa ativo
    window.activeProgramId = null;
  }
  
  inner.innerHTML = `
    <button class="video-modal__close" onclick="closeWorkoutPlayer()">✕</button>
    <div style="padding: 3rem 2rem; background: var(--color-near-black); text-align: center; color: #fff; min-height: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <span style="font-size: 4rem; margin-bottom: 1.5rem; animation: float 3s ease-in-out infinite;">✨</span>
      <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 0.5rem; color: var(--color-accent-gold);">Treino Concluído!</h2>
      <p style="color: rgba(255,255,255,0.6); max-width: 400px; margin-bottom: 2rem; font-size: 0.9375rem;">
        Parabéns! Você completou o treino de <strong>${currentWorkoutName}</strong>. Você está evoluindo sua força, equilíbrio e controle.
      </p>
      <div style="display: flex; gap: 2rem; margin-bottom: 2.5rem; justify-content: center;">
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">+50</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">XP Ganhos</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">${currentWorkoutData.type === 'yoga' ? '180' : '220'}</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Kcal Queimadas</div>
        </div>
        <div>
          <div style="font-family: var(--font-heading); font-size: 2rem; color: #fff;">🔥 13</div>
          <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4);">Dias Seguidos</div>
        </div>
      </div>
      <button onclick="closeWorkoutPlayer()" class="btn btn--gold btn--lg" style="padding: 0.875rem 3rem;">Concluir</button>
    </div>
  `;
  showToast("🎉 Treino concluído! +50 XP!");
}

function updateTimerDisplay() {
  const countdownText = document.getElementById('playerCountdownText');
  const circleFill = document.getElementById('playerProgressCircleFill');
  const exercise = currentWorkoutData.exercises[currentExerciseIndex];

  const currentTotal = exercise.duration;
  const timeProgress = (currentTotal - currentSecondsLeft) / currentTotal;

  if (countdownText) {
    countdownText.textContent = currentSecondsLeft + 's';
  }

  if (circleFill) {
    const dasharray = 283; 
    circleFill.setAttribute('stroke-dashoffset', dasharray * (1 - timeProgress));
  }

  const angleDisplay = document.getElementById('gaugeAngleDisplay');
  const tensionProgress = document.getElementById('gaugeTensionProgress');
  const breathStateText = document.getElementById('breathStateText');

  const cycle = (currentSecondsLeft % 6); 
  
  if (currentWorkoutData.type === 'yoga') {
    if (breathStateText) {
      if (cycle >= 3) {
        breathStateText.textContent = "Inalar Profundo";
        breathStateText.style.color = "var(--color-accent-gold)";
      } else {
        breathStateText.textContent = "Exalar com Controle";
        breathStateText.style.color = "rgba(255,255,255,0.7)";
      }
    }
  }

  if (currentWorkoutData.type === 'pilates') {
    if (angleDisplay && tensionProgress) {
      let angle = 180;
      let tension = 15;
      
      if (cycle >= 3) {
        const factor = (cycle - 3) / 3; 
        angle = Math.round(180 - (90 * factor)); 
        tension = Math.round(15 + (70 * factor)); 
      } else {
        const factor = cycle / 3; 
        angle = Math.round(90 + (90 * factor)); 
        tension = Math.round(85 - (70 * factor)); 
      }

      angleDisplay.textContent = angle + '°';
      tensionProgress.style.width = tension + '%';
      
      const tensionValueText = document.getElementById('tensionValueText');
      if (tensionValueText) tensionValueText.textContent = tension + '%';
    }
  }
}

function renderPlayerUI(exercise) {
  const inner = document.querySelector('.video-modal__inner');
  if (!inner) return;

  const isYoga = currentWorkoutData.type === 'yoga';

  inner.innerHTML = `
    <button class="video-modal__close" id="videoModalClose" onclick="closeWorkoutPlayer()">✕</button>
    
    <div style="display: grid; grid-template-columns: 280px 1fr; background: #141211; min-height: 560px; color: #fff; font-family: system-ui, sans-serif;">
      
      <!-- Side Exercise List -->
      <div style="background: #1c1a18; border-right: 1px solid rgba(255,255,255,0.06); padding: var(--space-xl) var(--space-lg); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-accent-gold); margin-bottom: 0.5rem;">Treino</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.125rem; margin-bottom: 1.5rem; color: #fff; font-weight: 400; line-height: 1.3;">${currentWorkoutName}</h3>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${currentWorkoutData.exercises.map((ex, idx) => `
              <div style="display: flex; align-items: center; gap: 10px; padding: 0.625rem; border-radius: var(--radius-md); background: ${idx === currentExerciseIndex ? 'rgba(201,169,110,0.1)' : 'transparent'}; border: 1px solid ${idx === currentExerciseIndex ? 'rgba(201,169,110,0.2)' : 'transparent'};">
                <span style="width: 20px; height: 20px; border-radius: 50%; border: 1px solid ${idx <= currentExerciseIndex ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; color: ${idx <= currentExerciseIndex ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.4)'}; background: ${idx < currentExerciseIndex ? 'var(--color-accent-gold)' : 'transparent'}">
                  ${idx < currentExerciseIndex ? '✓' : idx + 1}
                </span>
                <span style="font-size: 0.8125rem; color: ${idx === currentExerciseIndex ? '#fff' : 'rgba(255,255,255,0.5)'}; font-weight: ${idx === currentExerciseIndex ? '500' : '400'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">
                  ${ex.name}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Target Zone & Device connection badges -->
        <div style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1rem;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-bottom: 6px;">
            <span>Foco:</span>
            <strong style="color: var(--color-accent-gold); font-weight: 500;">${exercise.target}</strong>
          </div>
          <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.625rem; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.04); padding: 2px 6px; border-radius: 4px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981;"></span>
            Treinador Virtual Ativo
          </div>
        </div>
      </div>

      <!-- Main Animation & Timer area -->
      <div style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
        
        <!-- Premium Pulsing Human Joint Animation & Biofeedback Trackers -->
        <div style="display: grid; grid-template-columns: 1fr 180px; gap: 1rem; align-items: center; min-height: 240px; background: #0b0a09; border-radius: var(--radius-xl); border: 1px solid rgba(255,255,255,0.04); box-shadow: inset 0 8px 32px rgba(0,0,0,0.45); padding: 1rem; position: relative;">
          
          <!-- Animation Canvas -->
          <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
            ${renderSVGAnimation(exercise.animation)}
          </div>

          <!-- Real-time BIOFEEDBACK PANEL -->
          <div style="background: rgba(25,23,21,0.65); border: 1px solid rgba(255,255,255,0.05); border-radius: var(--radius-lg); padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            <div style="font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.375rem;">Biofeedback</div>
            
            ${isYoga ? `
              <!-- Yoga: Breathing Rhythm Gauge -->
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Guia de Ritmo</div>
                <div id="breathStateText" style="font-family: var(--font-heading); font-size: 0.9375rem; font-weight: 400; color: var(--color-accent-gold);">Inalar</div>
              </div>
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Batimentos</div>
                <div style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">108 <span style="font-size: 0.6875rem; color: rgba(255,255,255,0.4);">BPM</span></div>
              </div>
            ` : `
              <!-- Pilates: Tension & Joint Angle Gauges -->
              <div>
                <div style="font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">Ângulo da Articulação</div>
                <div id="gaugeAngleDisplay" style="font-family: var(--font-heading); font-size: 1.125rem; font-weight: 400; color: #fff;">180°</div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.6875rem; color: rgba(255,255,255,0.5); margin-bottom: 4px;">
                  <span>Tensão</span>
                  <span id="tensionValueText" style="color: var(--color-accent-gold);">15%</span>
                </div>
                <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                  <div id="gaugeTensionProgress" style="height: 100%; width: 15%; background: var(--color-accent-gold); transition: width 0.15s ease-out; border-radius: 2px;"></div>
                </div>
              </div>
            `}
          </div>

        </div>

        <!-- Exercise Details -->
        <div style="text-align: center; margin-top: 1rem; z-index: 10;">
          <h2 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.5rem; color: #fff; font-weight: 400;">
            ${exercise.name}
          </h2>
          <p style="color: rgba(255,255,255,0.75); max-width: 480px; margin: 0 auto; line-height: 1.6; font-size: 0.875rem; min-height: 60px;">
            ${exercise.instructions}
          </p>
        </div>

        <!-- Timer Circle & Player Control Elements -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 1.25rem;">
          
          <button onclick="navigateWorkout(-1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;" ${currentExerciseIndex === 0 ? 'disabled style="opacity: 0.2; cursor: default;"' : ''}>
            ⏮ Voltar
          </button>

          <div style="display: flex; align-items: center; gap: 1.5rem;">
            
            <!-- Circular Progress SVG -->
            <div style="position: relative; width: 64px; height: 64px;">
              <svg width="64" height="64" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.06)" stroke-width="4" fill="none" />
                <circle id="playerProgressCircleFill" cx="50" cy="50" r="45" stroke="var(--color-accent-gold)" stroke-width="4" fill="none" 
                  stroke-dasharray="283" stroke-dashoffset="0" stroke-linecap="round" style="transition: stroke-dashoffset 1s linear; transform: rotate(-90deg); transform-origin: 50px 50px;" />
              </svg>
              <div id="playerCountdownText" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--font-heading); font-size: 1.1rem; font-weight: 400; color: #fff;">
                ${currentSecondsLeft}s
              </div>
            </div>

            <!-- Pause / Play controls -->
            <button id="playerPausePlayBtn" onclick="togglePlayerPause()" style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-accent-gold); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; box-shadow: 0 4px 12px rgba(201,169,110,0.3); transition: transform 0.2s;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

          </div>

          <button onclick="navigateWorkout(1)" style="background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">
            ${currentExerciseIndex === currentWorkoutData.exercises.length - 1 ? 'Concluir ✓' : 'Avançar ⏭'}
          </button>
        </div>

      </div>
    </div>
  `;
  updateTimerDisplay();
}

window.togglePlayerPause = function() {
  isPlayerPaused = !isPlayerPaused;
  const btn = document.getElementById('playerPausePlayBtn');
  if (btn) {
    if (isPlayerPaused) {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>';
      btn.style.background = 'rgba(255,255,255,0.15)';
    } else {
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      btn.style.background = 'var(--color-accent-gold)';
    }
  }
};

window.navigateWorkout = function(direction) {
  if (direction === 1) {
    if (currentExerciseIndex < currentWorkoutData.exercises.length - 1) {
      currentExerciseIndex++;
      loadExercise(currentExerciseIndex);
    } else {
      finishWorkout();
    }
  } else if (direction === -1) {
    if (currentExerciseIndex > 0) {
      currentExerciseIndex--;
      loadExercise(currentExerciseIndex);
    }
  }
};

// ==========================================
// VIRTUAL COACH SKELETON ANIMATIONS (STICK PERSON)
// ==========================================
function renderSVGAnimation(type) {
  return `
    <svg width="220" height="220" viewBox="0 0 100 100" style="overflow: visible;">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-accent-gold)" stop-opacity="0.25" />
          <stop offset="100%" stop-color="var(--color-accent-gold)" stop-opacity="0" />
        </radialGradient>
        <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
        <style>
          @keyframes breathing-body {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.02) translateY(-1px); }
          }
          @keyframes stretch-child {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(3px, 1px); }
          }
          @keyframes cat-cow-morph {
            0%, 100% { d: path("M32,54 Q50,62 68,54"); } 
            50% { d: path("M32,54 Q50,42 68,54"); } 
          }
          @keyframes cat-cow-head {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(15deg); }
          }
          @keyframes downdog-pulse {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-1.5px, -2px); }
          }
          @keyframes warrior-lunge {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(2px) translateX(-1px); }
          }
          @keyframes squatting {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(14px); }
          }
          @keyframes arm-overhead-press {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes walk-lunge {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
          }
          @keyframes joint-glow {
            0%, 100% { r: 2px; opacity: 0.6; }
            50% { r: 3.2px; opacity: 1; }
          }
          @keyframes squish-ring {
            0%, 100% { transform: scaleX(1) scaleY(1); }
            50% { transform: scaleX(0.6) scaleY(0.9); }
          }
          @keyframes bridge-lift {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
          }
          @keyframes chaturanga-pulse {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }

          .silhouette-line {
            stroke: #eae5d9;
            stroke-width: 3.5;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            filter: url(#shadow-filter);
          }
          .silhouette-head {
            fill: #eae5d9;
            filter: url(#shadow-filter);
          }
          .body-joint-glow {
            fill: var(--color-accent-gold);
            animation: joint-glow 2s infinite ease-in-out;
          }
          .elastic-tension-band {
            stroke: var(--color-accent-gold);
            stroke-width: 1.5;
            stroke-dasharray: 2 1;
            fill: none;
            opacity: 0.65;
          }
          .pilates-metal-bar {
            stroke: #eae5d9;
            stroke-width: 4;
            stroke-linecap: round;
          }
          .pilates-foam-ring {
            stroke: var(--color-accent-gold);
            stroke-width: 3.5;
            fill: none;
          }
          .indicator-arrow {
            stroke: var(--color-accent-gold);
            stroke-width: 1.5;
            fill: none;
            marker-end: url(#arrowhead);
          }
        </style>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-accent-gold)" />
        </marker>
      </defs>

      <circle cx="50" cy="50" r="45" fill="url(#glow)" />
      <line x1="5" y1="80" x2="95" y2="80" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" />

      ${type === 'breath' || type === 'savasana' ? `
        <!-- Breath / Savasana: Minimalist Lying Posture -->
        <g style="transform-origin: 50px 75px; animation: breathing-body 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="22" cy="71" r="4.5" />
          <line class="silhouette-line" x1="27" y1="75" x2="78" y2="75" />
          <path class="silhouette-line" d="M28,75 L45,71 M45,71 L65,75" />
          <circle class="body-joint-glow" cx="28" cy="75" r="2.5" />
          <circle class="body-joint-glow" cx="45" cy="71" r="2.5" />
        </g>
      ` : ''}

      ${type === 'childs-pose' ? `
        <!-- Child's Pose: Realistic Knee Fold and Arm Stretch -->
        <g style="transform-origin: 25px 80px; animation: stretch-child 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="58" cy="74" r="4.5" />
          <path class="silhouette-line" d="M25,80 Q38,63 48,71" />
          <line class="silhouette-line" x1="25" y1="80" x2="35" y2="80" />
          <line class="silhouette-line" x1="48" y1="71" x2="72" y2="80" />
          <circle class="body-joint-glow" cx="25" cy="80" r="2" />
          <circle class="body-joint-glow" cx="48" cy="71" r="2" />
        </g>
      ` : ''}

      ${type === 'cat-cow' ? `
        <!-- Cat-Cow: Curving Spine on Hands & Knees -->
        <g>
          <line class="silhouette-line" x1="32" y1="54" x2="32" y2="80" />
          <line class="silhouette-line" x1="68" y1="54" x2="68" y2="80" />
          <path id="catCowSpine" class="silhouette-line" d="M32,54 Q50,62 68,54" style="animation: cat-cow-morph 5s ease-in-out infinite;" />
          <g style="transform-origin: 32px 54px; animation: cat-cow-head 5s ease-in-out infinite;">
            <circle class="silhouette-head" cx="23" cy="48" r="4.5" />
            <line class="silhouette-line" x1="32" y1="54" x2="25" y2="50" />
          </g>
          <circle class="body-joint-glow" cx="32" cy="54" r="2.5" />
          <circle class="body-joint-glow" cx="68" cy="54" r="2.5" />
        </g>
      ` : ''}

      ${type === 'down-dog' ? `
        <!-- Down-Dog: Realistic Apex Hips and Straight Limbs -->
        <g style="transform-origin: 50px 80px; animation: downdog-pulse 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="31" cy="62" r="4.5" />
          <line class="silhouette-line" x1="36" y1="54" x2="50" y2="35" />
          <line class="silhouette-line" x1="36" y1="54" x2="24" y2="80" />
          <path class="silhouette-line" d="M50,35 L63,57 L74,80" />
          <circle class="body-joint-glow" cx="50" cy="35" r="2.5" />
          <circle class="body-joint-glow" cx="36" cy="54" r="2.5" />
          <circle class="body-joint-glow" cx="63" cy="57" r="2" />
        </g>
      ` : ''}

      ${type === 'vinyasa' ? `
        <!-- Vinyasa / Chaturanga: Lowered Straight Body Plank -->
        <g style="animation: chaturanga-pulse 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="25" cy="55" r="4.5" />
          <path class="silhouette-line" d="M35,60 L55,68 L78,80" />
          <path class="silhouette-line" d="M35,60 L44,68 L36,80" />
          <circle class="body-joint-glow" cx="35" cy="60" r="2" />
          <circle class="body-joint-glow" cx="55" cy="68" r="2" />
          <circle class="body-joint-glow" cx="44" cy="68" r="1.5" />
        </g>
      ` : ''}

      ${type === 'warrior-1' ? `
        <!-- Warrior I: High Lunge and Raised Overhead Arms -->
        <g style="transform-origin: 45px 80px; animation: warrior-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="45" cy="21" r="4.5" />
          <line class="silhouette-line" x1="45" y1="28" x2="45" y2="50" />
          <line class="silhouette-line" x1="45" y1="28" x2="45" y2="8" />
          <path class="silhouette-line" d="M45,50 L28,55 L28,80" />
          <line class="silhouette-line" x1="45" y1="50" x2="68" y2="80" />
          <circle class="body-joint-glow" cx="45" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="28" cy="55" r="2" />
          <circle class="body-joint-glow" cx="45" cy="28" r="2" />
        </g>
      ` : ''}

      ${type === 'squat-press' ? `
        <!-- Squat Press: Pilates Bar Squat and Overhead Extension -->
        <g style="transform-origin: 50px 80px; animation: squatting 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="50" cy="22" r="4.5" />
          <line class="silhouette-line" x1="50" y1="28" x2="50" y2="50" />
          <path class="silhouette-line" d="M50,50 L36,62 L36,80" />
          <path class="silhouette-line" d="M50,50 L64,62 L64,80" />
          
          <g style="transform-origin: 50px 30px; animation: arm-overhead-press 4s ease-in-out infinite;">
            <path class="silhouette-line" d="M50,30 L34,22 L24,12" />
            <path class="silhouette-line" d="M50,30 L66,22 L76,12" />
            <line class="pilates-metal-bar" x1="16" y1="12" x2="84" y2="12" />
            <path class="elastic-tension-band" d="M16,12 C16,40 36,75 36,80" />
            <path class="elastic-tension-band" d="M84,12 C84,40 64,75 64,80" />
          </g>
          
          <circle class="body-joint-glow" cx="50" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="36" cy="62" r="2" />
          <circle class="body-joint-glow" cx="64" cy="62" r="2" />
        </g>
      ` : ''}

      ${type === 'overhead-lunge' ? `
        <!-- Overhead Lunge: Lunge position with raised hands holding bar -->
        <g style="transform-origin: 50px 80px; animation: walk-lunge 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="50" cy="22" r="4.5" />
          <line class="silhouette-line" x1="50" y1="28" x2="50" y2="50" />
          <path class="silhouette-line" d="M50,50 L34,54 L34,80" />
          <path class="silhouette-line" d="M50,50 L64,62 L64,80" />
          <path class="silhouette-line" d="M50,30 L40,14 L30,4" />
          <path class="silhouette-line" d="M50,30 L60,14 L70,4" />
          <line class="pilates-metal-bar" x1="20" y1="4" x2="80" y2="4" />
          <line class="elastic-tension-band" x1="20" y1="4" x2="64" y2="80" />
          <line class="elastic-tension-band" x1="80" y1="4" x2="64" y2="80" />
          <circle class="body-joint-glow" cx="50" cy="50" r="2.5" />
          <circle class="body-joint-glow" cx="34" cy="54" r="2" />
        </g>
      ` : ''}

      ${type === 'thigh-squeeze' ? `
        <!-- Thigh Squeeze: Lying on back squeezing Pilates Ring between knees -->
        <g>
          <circle class="silhouette-head" cx="20" cy="76" r="4.5" />
          <line class="silhouette-line" x1="25" y1="80" x2="55" y2="80" />
          <path class="silhouette-line" d="M55,80 L66,55 L75,80" />
          
          <g style="transform-origin: 66px 55px; animation: squish-ring 3s ease-in-out infinite;">
            <ellipse class="pilates-foam-ring" cx="66" cy="55" rx="10" ry="10" />
            <rect fill="#fff" x="55" y="52" width="2" height="6" rx="1" />
            <rect fill="#fff" x="75" y="52" width="2" height="6" rx="1" />
          </g>
          <circle class="body-joint-glow" cx="55" cy="80" r="2.5" />
          <circle class="body-joint-glow" cx="66" cy="55" r="2" />
        </g>
      ` : ''}

      ${type === 'bridge-squeeze' ? `
        <!-- Bridge Squeeze: Hip Raised Lying Bridge Pose -->
        <g style="transform-origin: 32px 80px; animation: bridge-lift 4s ease-in-out infinite;">
          <circle class="silhouette-head" cx="20" cy="76" r="4.5" />
          <path class="silhouette-line" d="M32,80 L52,60 L68,60 L68,80" />
          <circle class="body-joint-glow" cx="52" cy="60" r="2.5" />
          <circle class="body-joint-glow" cx="68" cy="60" r="2" />
        </g>
      ` : ''}

    </svg>
  `;
}

// ==========================================
// CATEGORY FILTERS
// ==========================================
function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const gridItems = document.querySelectorAll('#yogaGrid article, #pilatesGrid article, #libraryGrid article');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.parentElement.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      gridItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = '';
          item.classList.add('visible');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// FAQ ACCORDIONS (Subscription Page)
// ==========================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      const isOpen = faqItem.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      
      if (!isOpen) {
        faqItem.classList.add('active');
      }
    });
  });
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
window.showToast = function(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast__content">
      <span class="toast__icon">✨</span>
      <span class="toast__message">${message}</span>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add('active'), 10);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// ==========================================
// AUTH & ONBOARDING SYSTEM (Supabase-backed)
// ==========================================

/**
 * Applies nav/drawer UI for a resolved user object.
 * Works with both Supabase session users and legacy localStorage users.
 */
function _applyAuthUI(user) {
  const navActions = document.querySelector('.nav__actions');
  if (navActions) {
    const existingMenuBtn = navActions.querySelector('.nav__menu-btn');
    const menuBtnHtml = existingMenuBtn
      ? existingMenuBtn.outerHTML
      : `<button class="nav__menu-btn" id="menuBtn"><span></span><span></span><span></span></button>`;

    const displayName = user ? (user.name || user.email || 'Minha Conta') : null;

    if (user) {
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn--outline btn--sm">Olá, ${displayName}!</a>
        <a href="subscription.html" class="btn btn--primary btn--sm">Premium</a>
        ${menuBtnHtml}
      `;
    } else {
      navActions.innerHTML = `
        <a href="profile.html" class="btn btn--outline btn--sm">Sign In</a>
        <a href="subscription.html" class="btn btn--primary btn--sm">Get Access</a>
        ${menuBtnHtml}
      `;
    }
    initMobileMenu();
  }

  // Update mobile drawer Profile link
  if (user) {
    const displayName = user.name || user.email || 'Conta';
    document.querySelectorAll('.drawer-link').forEach(link => {
      if (link.getAttribute('href') === 'profile.html') {
        link.innerHTML = `Perfil (${displayName})`;
      }
    });
    // Hero greeting
    const heroEyebrowText = document.querySelector('.hero__eyebrow .label-md');
    if (heroEyebrowText) {
      heroEyebrowText.textContent = `Olá, ${user.name || displayName}! ✨`;
    }
  }
}

/**
 * Populates the profile page views (authView / profileView).
 */
function _applyProfileView(user) {
  const authView = document.getElementById('authView');
  const profileView = document.getElementById('profileView');
  if (!authView || !profileView) return;

  if (user) {
    authView.style.display = 'none';
    profileView.style.display = 'block';

    const profileName = document.getElementById('profileName');
    const profileGoal = document.getElementById('profileGoal');
    const profileAge  = document.getElementById('profileAge');
    const profileEmail = document.getElementById('profileEmail');

    if (profileName)  profileName.textContent  = user.name  || user.email || '—';
    if (profileGoal)  profileGoal.textContent  = `Foco: ${user.goal || '—'}`;
    if (profileAge)   profileAge.textContent   = user.age ? `${user.age} anos` : '—';
    if (profileEmail) profileEmail.textContent = user.email || '—';
  } else {
    profileView.style.display = 'none';
    authView.style.display = 'block';
    const step1 = document.getElementById('authStep1');
    const step2 = document.getElementById('authStep2');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
    const emailInput = document.getElementById('authEmail');
    if (emailInput) emailInput.value = '';
  }
}

async function initAuth() {
  // 1. Try Supabase session first
  let supabaseUser = null;
  if (window.atlasSupabase && typeof window.atlasSupabase.getSession === 'function') {
    try {
      const session = await window.atlasSupabase.getSession();
      if (session && session.user) {
        supabaseUser = session.user;

        // Also pull profile metadata from Supabase if available
        if (typeof window.atlasSupabase.getProfile === 'function') {
          try {
            const profile = await window.atlasSupabase.getProfile();
            if (profile) {
              supabaseUser = { ...supabaseUser, ...profile };
            }
          } catch (_) { /* profile fetch is optional */ }
        }

        // Cache premium status locally for offline fallback
        if (typeof window.atlasSupabase.checkPremiumAccess === 'function') {
          try {
            const isPremium = await window.atlasSupabase.checkPremiumAccess();
            localStorage.setItem('atlas_premium_status', isPremium ? 'active' : 'free');
          } catch (_) { /* non-critical */ }
        }
      }
    } catch (err) {
      console.warn('[Atlas] Supabase session check failed:', err);
    }
  }

  // 2. Fallback to legacy localStorage user (for local/offline use)
  const legacyUserJson = localStorage.getItem('atlas_user');
  const legacyUser = legacyUserJson ? JSON.parse(legacyUserJson) : null;

  const user = supabaseUser || legacyUser;

  // 3. Apply UI
  _applyAuthUI(user);
  _applyProfileView(user);

  // 4. Check if password recovery redirect hash is present in URL
  if (window.location.hash && (window.location.hash.includes('type=recovery') || window.location.hash.includes('access_token='))) {
    if (typeof window.switchAuthStep === 'function') {
      window.switchAuthStep(4);
    }
  }

  // 5. Update UI elements if user is Premium
  updatePremiumElementsUI();
}

/**
 * Dynamically unlocks and updates UI elements on the page if the user is verified premium.
 */
async function updatePremiumElementsUI() {
  const allowed = await canPlayContent(null);
  if (allowed) {
    // 1. Remove all lock indicators (including the inline SVG overlays from old templates)
    document.querySelectorAll('.card__lock, .lock-icon, [data-lock]').forEach(el => {
      el.remove();
    });

    // Remove inline SVG locks from programs.html if cached
    document.querySelectorAll('.reveal div[style*="position:absolute"], .reveal div[style*="position: absolute"]').forEach(el => {
      if (el.innerHTML.includes('<svg') && (el.innerHTML.includes('rect') || el.innerHTML.includes('path'))) {
        if (!el.textContent.includes('Most Popular') && !el.textContent.includes('Free')) {
          el.remove();
        }
      }
    });

    // 2. Reset dark/dimmed images to full brightness
    document.querySelectorAll('.card__media img, img').forEach(img => {
      if (img.style.filter && img.style.filter.includes('brightness')) {
        img.style.filter = '';
      }
      // Also fallback general styles
      if (img.style.filter === 'none' || img.style.filter === '') {
        img.style.filter = 'brightness(1)';
      }
    });

    // 3. Change "Unlock with Premium" buttons in programs.html to active triggers
    document.querySelectorAll('a[href*="subscription.html"]').forEach(btn => {
      const card = btn.closest('.reveal, article, div');
      const text = btn.textContent || '';
      if (card && (text.includes('Unlock') || text.includes('Premium') || text.includes('Start'))) {
        const titleEl = card.querySelector('h2');
        const title = titleEl ? titleEl.textContent.trim() : 'Programa';
        
        btn.innerHTML = 'Iniciar Programa';
        btn.removeAttribute('href');
        btn.style.cursor = 'pointer';
        btn.className = 'btn btn--primary';
        btn.onclick = (e) => {
          e.preventDefault();
          window.startProgram(title, 14);
        };
      }
    });
  }
}

/**
 * Helper to slugify program titles in JavaScript, matching the node rebuilder.
 */
function getProgramId(title) {
  return title.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Dynamically maps a program and day index to a real workout from workoutData.
 * Respects modality and filters matches accordingly.
 */
window.getWorkoutForProgramDay = function(programId, day) {
  if (!window.workoutsByCategory) {
    window.workoutsByCategory = {
      yoga: [],
      pilates: [],
      bar: [],
      elastic: [],
      ring: [],
      fusion: [],
      general: []
    };
    for (let key in workoutData) {
      const item = workoutData[key];
      const type = (item.type || '').toLowerCase();
      const equip = (item.equipment || '').toLowerCase();
      const keyLower = key.toLowerCase();
      
      if (type === 'yoga') {
        window.workoutsByCategory.yoga.push(key);
      } else if (type === 'pilates' && equip === 'none') {
        window.workoutsByCategory.pilates.push(key);
      } else if (equip === 'bar' || keyLower.includes('barra')) {
        window.workoutsByCategory.bar.push(key);
      } else if (equip === 'ring' || keyLower.includes('anel') || keyLower.includes('ring')) {
        window.workoutsByCategory.ring.push(key);
      } else if (equip === 'elastic' || keyLower.includes('elástico')) {
        window.workoutsByCategory.elastic.push(key);
      } else if (type === 'fusion' || keyLower.includes('fusion') || keyLower.includes('flow') || keyLower.includes('+')) {
        window.workoutsByCategory.fusion.push(key);
      } else {
        window.workoutsByCategory.general.push(key);
      }
    }
  }

  let pool = [];
  const p = programId.toLowerCase();
  
  if (p.includes('core-reset')) {
    pool = [...window.workoutsByCategory.yoga, ...window.workoutsByCategory.pilates];
  } else if (p.includes('body-sculptor')) {
    pool = [...window.workoutsByCategory.ring, ...window.workoutsByCategory.bar];
  } else if (p.includes('pilates-classico')) {
    pool = window.workoutsByCategory.pilates;
  } else if (p.includes('yoga-iniciantes')) {
    pool = window.workoutsByCategory.yoga;
  } else if (p.includes('forca-com-equipamentos') || p.includes('forca-equipamentos')) {
    pool = [...window.workoutsByCategory.bar, ...window.workoutsByCategory.ring, ...window.workoutsByCategory.elastic];
  } else if (p.includes('core-avancado')) {
    pool = Object.keys(workoutData).filter(k => k.toLowerCase().includes('core') || k.toLowerCase().includes('abdominal') || k.toLowerCase().includes('prancha'));
  } else if (p.includes('flexibilidade')) {
    pool = Object.keys(workoutData).filter(k => k.toLowerCase().includes('alongamento') || k.toLowerCase().includes('flexibilidade') || k.toLowerCase().includes('restore') || k.toLowerCase().includes('yin'));
  } else if (p.includes('barra-elastico') || p.includes('barra-e-elastico') || p.includes('desafio-21-dias-barra-elastico')) {
    pool = [...window.workoutsByCategory.bar, ...window.workoutsByCategory.elastic];
  } else if (p.includes('fusion-yoga')) {
    pool = [...window.workoutsByCategory.fusion, ...window.workoutsByCategory.yoga, ...window.workoutsByCategory.bar];
  } else if (p.includes('desafio-anel')) {
    pool = window.workoutsByCategory.ring;
  } else if (p.includes('pernas-gluteos') || p.includes('pernas')) {
    pool = Object.keys(workoutData).filter(k => {
      const kl = k.toLowerCase();
      return kl.includes('agachamento') || kl.includes('glúteo') || kl.includes('quadril') || kl.includes('perna') || kl.includes('ponte') || kl.includes('pélvica') || kl.includes('avanço');
    });
  } else if (p.includes('upper-body') || p.includes('upper')) {
    pool = Object.keys(workoutData).filter(k => {
      const kl = k.toLowerCase();
      return kl.includes('rosca') || kl.includes('bíceps') || kl.includes('tríceps') || kl.includes('ombro') || kl.includes('peitoral') || kl.includes('braço') || kl.includes('remada') || kl.includes('desenvolvimento') || kl.includes('triceps') || kl.includes('biceps');
    });
  } else if (p.includes('hiit')) {
    pool = Object.keys(workoutData).filter(k => k.toLowerCase().includes('hiit') || k.toLowerCase().includes('prancha') || k.toLowerCase().includes('suave'));
  } else if (p.includes('barra-express')) {
    pool = window.workoutsByCategory.bar;
  } else if (p.includes('dual-equipment') || p.includes('full-body-fusion')) {
    pool = [...window.workoutsByCategory.bar, ...window.workoutsByCategory.ring, ...window.workoutsByCategory.fusion];
  }

  if (pool.length === 0) {
    pool = Object.keys(workoutData);
  }

  const index = (day - 1) % pool.length;
  return pool[index];
};

/**
 * Dynamically tracks and renders program progress grids (D1, D2...)
 * and buttons, saving user state to localStorage.
 */
function initProgramProgress() {
  const progressGrids = document.querySelectorAll('.program-progress-grid');
  
  progressGrids.forEach(grid => {
    const programId = grid.getAttribute('data-program-id');
    const totalDays = parseInt(grid.getAttribute('data-total-days')) || 7;
    const prefix = grid.getAttribute('data-prefix') || 'D';
    
    // Check localStorage progress (default to 1 Day instead of hardcoded Day 4/2)
    let currentProgress = localStorage.getItem(`atlas_program_progress_${programId}`);
    if (currentProgress === null) {
      currentProgress = 1;
      localStorage.setItem(`atlas_program_progress_${programId}`, 1);
    } else {
      currentProgress = parseInt(currentProgress) || 1;
    }
    
    renderGrid(grid, programId, totalDays, prefix, currentProgress);
  });
}

function renderGrid(grid, programId, totalDays, prefix, currentProgress) {
  grid.innerHTML = '';
  
  for (let i = 1; i <= totalDays; i++) {
    const dayItem = document.createElement('div');
    dayItem.style.textAlign = 'center';
    dayItem.style.padding = 'var(--space-sm)';
    dayItem.style.borderRadius = 'var(--radius-md)';
    dayItem.style.cursor = 'pointer';
    dayItem.style.transition = 'all 0.2s';
    
    let labelColor = 'rgba(255,255,255,0.5)';
    let contentHtml = '';
    
    if (i < currentProgress) {
      // Completed day
      dayItem.style.background = 'var(--color-near-black)';
      contentHtml = `<div style="font-size:0.625rem; color: ${labelColor}; margin-bottom:2px; pointer-events: none;">${prefix}${i}</div><div style="font-size:0.625rem; color: var(--color-accent-gold); font-weight: bold; pointer-events: none;">✓</div>`;
    } else if (i === currentProgress) {
      // Current day
      dayItem.style.background = 'rgba(201,169,110,0.15)';
      dayItem.style.border = '1px solid rgba(201,169,110,0.3)';
      contentHtml = `<div style="font-size:0.625rem; color: var(--color-accent-gold); margin-bottom:2px; pointer-events: none;">${prefix}${i}</div><div style="font-size:0.625rem; color: var(--color-accent-gold); pointer-events: none;">▶</div>`;
    } else {
      // Future day
      dayItem.style.background = 'var(--bg-secondary)';
      labelColor = 'var(--text-muted)';
      contentHtml = `<div style="font-size:0.625rem; color: ${labelColor}; margin-bottom:2px; pointer-events: none;">${prefix}${i}</div><div style="font-size:0.625rem; color: var(--text-light); pointer-events: none;">○</div>`;
    }
    
    dayItem.innerHTML = contentHtml;
    
    // Add hover effect
    dayItem.onmouseenter = () => { dayItem.style.transform = 'scale(1.05)'; };
    dayItem.onmouseleave = () => { dayItem.style.transform = ''; };
    
    // Toggle progress when day circle is clicked!
    dayItem.addEventListener('click', () => {
      localStorage.setItem(`atlas_program_progress_${programId}`, i);
      renderGrid(grid, programId, totalDays, prefix, i);
    });
    
    grid.appendChild(dayItem);
  }
  
  // Set button text according to active day
  updateProgramButton(programId, currentProgress, totalDays, prefix);
}

function updateProgramButton(programId, progress, totalDays, prefix) {
  const btn = document.getElementById(`btn-${programId}`);
  if (!btn) return;
  
  const unitName = prefix === 'S' ? 'Semana' : 'Dia';
  
  if (progress === 1) {
    btn.innerHTML = 'Iniciar Programa';
  } else if (progress <= totalDays) {
    btn.innerHTML = `Continuar — ${unitName} ${progress}`;
  } else {
    btn.innerHTML = 'Concluído! Reiniciar';
  }
}

/**
 * Starts a workout program by matching its name to a real workout from workoutData
 * and opening the video modal player.
 */
window.startProgram = function(programName, totalDays) {
  const progId = getProgramId(programName);

  // Define como programa ativo para salvar o progresso ao terminar o treino
  window.activeProgramId = progId;

  let currentProgress = 1;
  const saved = localStorage.getItem(`atlas_program_progress_${progId}`);
  currentProgress = saved !== null ? parseInt(saved) || 1 : 1;

  // Se o programa foi concluído, reinicia no dia 1
  if (currentProgress > totalDays) {
    currentProgress = 1;
    localStorage.setItem(`atlas_program_progress_${progId}`, 1);
    const grid = document.querySelector(`.program-progress-grid[data-program-id="${progId}"]`);
    if (grid) {
      const prefix = progId.includes('yoga') ? 'S' : 'D';
      renderGrid(grid, progId, totalDays, prefix, 1);
    }
  }

  // Busca treino ideal para este dia do programa
  const finalWorkout = window.getWorkoutForProgramDay(progId, currentProgress);

  // Obtém duração prometida nas estatísticas
  let durationStr = "25 min";
  const btn = document.getElementById(`btn-${progId}`);
  if (btn) {
    const parentContainer = btn.parentElement;
    if (parentContainer) {
      const statsElements = Array.from(parentContainer.querySelectorAll('div > div'));
      statsElements.forEach(el => {
        const text = el.textContent.trim().toLowerCase();
        if (text.includes('min') || text.includes('dias') || text.includes('diário')) {
          const valEl = el.nextElementSibling || el.parentElement.querySelector('div:last-child');
          if (valEl && valEl.textContent.includes('min')) {
            durationStr = valEl.textContent.trim();
          }
        }
      });
    }
  }

  window.showToast(`🚀 Iniciando ${programName} — Dia ${currentProgress} (${durationStr})`);
  
  setTimeout(() => {
    if (window.openVideoModal) {
      window.openVideoModal(finalWorkout, durationStr);
    } else if (window.openExerciseModal) {
      window.openExerciseModal(finalWorkout, durationStr);
    }
  }, 1000);
};

// ==========================================
// LOGIN — chamado pelo botão do profile.html
// ==========================================
window.handleAuthLoginSubmit = async function() {
  const emailInput    = document.getElementById('authEmail');
  const passwordInput = document.getElementById('authPassword');
  const btn           = document.getElementById('authBtn1');

  if (!emailInput || !passwordInput) return;

  const email    = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  if (!email || !email.includes('@')) {
    window.showToast('Por favor, insira um e-mail válido.');
    return;
  }
  if (!password || password.length < 6) {
    window.showToast('A senha precisa ter pelo menos 6 caracteres.');
    return;
  }

  if (btn) { btn.textContent = 'Entrando...'; btn.disabled = true; }

  // Tenta login via Supabase
  if (window.atlasSupabase && typeof window.atlasSupabase.signIn === 'function') {
    const { data, error } = await window.atlasSupabase.signIn(email, password);
    if (btn) { btn.textContent = 'Entrar'; btn.disabled = false; }

    if (error) {
      let friendlyError = error;
      if (error.includes('Email not confirmed') || error.includes('confirm')) {
        friendlyError = 'Por favor, confirme seu cadastro no e-mail antes de fazer login!';
      } else if (error.includes('Invalid login credentials') || error.includes('invalid_grant')) {
        friendlyError = 'E-mail ou senha incorretos.';
      }
      window.showToast('❌ ' + friendlyError);
      return;
    }

    window.showToast('✅ Bem-vindo(a) de volta!');
    localStorage.setItem('atlas_premium_status', 'active');
    setTimeout(() => initAuth(), 500);
  } else {
    // Fallback offline: localStorage
    if (btn) { btn.textContent = 'Entrar'; btn.disabled = false; }
    const registered = JSON.parse(localStorage.getItem('atlas_registered_users') || '[]');
    const found = registered.find(u => u.email === email);
    if (found) {
      localStorage.setItem('atlas_user', JSON.stringify(found));
      window.showToast('Bem-vindo(a) de volta, ' + found.name + '!');
      initAuth();
    } else {
      window.showToast('Conta não encontrada. Crie uma conta primeiro.');
    }
  }
};

// ==========================================
// ALTERNAR ENTRE TELAS DE AUTENTICAÇÃO
// ==========================================
window.switchAuthStep = function(stepNum) {
  const steps = ['authStep1', 'authStep2', 'authStep3', 'authStep4'];
  steps.forEach((stepId, idx) => {
    const el = document.getElementById(stepId);
    if (el) {
      el.style.display = (idx + 1 === stepNum) ? 'block' : 'none';
    }
  });
};

// ==========================================
// REGISTRO — chamado pelo botão do profile.html
// ==========================================
window.handleAuthRegisterSubmit = async function() {
  const nameInput  = document.getElementById('authName');
  const ageInput   = document.getElementById('authAge');
  const goalSelect = document.getElementById('authGoal');
  const levelSelect= document.getElementById('authLevel');
  const emailInput = document.getElementById('regEmail') || document.getElementById('authEmail');
  const passInput  = document.getElementById('regPassword') || document.getElementById('authPassword');
  const btn        = document.getElementById('authBtn2');

  if (!emailInput || !passInput) { window.showToast('Preencha todos os campos.'); return; }

  const email    = emailInput.value.trim().toLowerCase();
  const password = passInput.value;
  const name     = nameInput  ? nameInput.value.trim()  : '';
  const age      = ageInput   ? ageInput.value.trim()   : '';
  const goal     = goalSelect ? goalSelect.value         : 'Pilates';
  const level    = levelSelect? levelSelect.value        : 'Iniciante';

  if (!email || !email.includes('@')) { window.showToast('E-mail inválido.'); return; }
  if (!password || password.length < 6) { window.showToast('Senha mínima de 6 caracteres.'); return; }

  if (btn) { btn.textContent = 'Criando conta...'; btn.disabled = true; }

  if (window.atlasSupabase && typeof window.atlasSupabase.signUp === 'function') {
    const { data, error } = await window.atlasSupabase.signUp(email, password, name, age, goal, level);
    if (btn) { btn.textContent = 'Criar Conta'; btn.disabled = false; }

    if (error) {
      window.showToast('❌ ' + error);
      return;
    }

    window.showToast('🎉 Conta criada! Verifique seu e-mail para confirmar.');
    // Se confirmação automática ativa, já faz login
    if (data?.session) {
      localStorage.setItem('atlas_premium_status', 'active');
      setTimeout(() => initAuth(), 500);
    }
  } else {
    // Fallback offline
    if (btn) { btn.textContent = 'Criar Conta'; btn.disabled = false; }
    const newUser = { email, name, age, goal, level };
    const registered = JSON.parse(localStorage.getItem('atlas_registered_users') || '[]');
    registered.push(newUser);
    localStorage.setItem('atlas_registered_users', JSON.stringify(registered));
    localStorage.setItem('atlas_user', JSON.stringify(newUser));
    window.showToast('Conta criada com sucesso!');
    initAuth();
  }
};

// ==========================================
// LOGOUT
// ==========================================
window.handleLogout = async function() {
  if (window.atlasSupabase && typeof window.atlasSupabase.signOut === 'function') {
    await window.atlasSupabase.signOut();
  }
  localStorage.removeItem('atlas_user');
  localStorage.removeItem('atlas_premium_status');
  window.showToast('Você saiu da sua conta.');
  setTimeout(() => initAuth(), 300);
};

// ==========================================
// RECUPERAÇÃO DE SENHA
// ==========================================
window.handleRecoverySubmit = async function() {
  const emailInput = document.getElementById('recoveryEmail') || document.getElementById('authEmail');
  if (!emailInput) return;
  const email = emailInput.value.trim().toLowerCase();
  if (!email) { window.showToast('Informe seu e-mail.'); return; }

  if (window.atlasSupabase && typeof window.atlasSupabase.resetPassword === 'function') {
    const { error } = await window.atlasSupabase.resetPassword(email);
    if (error) { window.showToast('❌ ' + error); return; }
    window.showToast('📧 Link de redefinição enviado para seu e-mail!');
  } else {
    window.showToast('Recuperação indisponível no modo offline.');
  }
};

// ==========================================
// REDEFINIÇÃO DE SENHA
// ==========================================
window.handleUpdatePasswordSubmit = async function() {
  const passInput = document.getElementById('newPassword');
  if (!passInput) return;
  const password = passInput.value;
  if (!password || password.length < 6) {
    window.showToast('A senha precisa ter pelo menos 6 caracteres.');
    return;
  }

  if (window.atlasSupabase && typeof window.atlasSupabase.updatePassword === 'function') {
    const { success, error } = await window.atlasSupabase.updatePassword(password);
    if (error) {
      window.showToast('❌ ' + error);
      return;
    }
    window.showToast('✅ Senha redefinida com sucesso! Faça login.');
    window.switchAuthStep(1);
  } else {
    window.showToast('Redefinição indisponível no modo offline.');
  }
};

// Alias antigo para compatibilidade
window.handleAuthEmailSubmit = window.handleAuthLoginSubmit;


// ==========================================
// OFFLINE TRANSLATION SYSTEM (FILE:/// SUPPORT)
// ==========================================
const translations = {
  pt: {
    "Home": "Início",
    "Yoga": "Yoga",
    "Pilates": "Pilates",
    "Programs": "Programas",
    "Library": "Biblioteca",
    "Sign In": "Entrar",
    "Go Premium": "Seja Premium",
    "My Profile": "Meu Perfil",
    "Subscription": "Assinatura",
    "About Us": "Sobre Nós",
    "Contact": "Contato",
    "Start Free": "Iniciar Grátis"
  },
  en: {
    "Home": "Home",
    "Yoga": "Yoga",
    "Pilates": "Pilates",
    "Programs": "Programs",
    "Library": "Library",
    "Sign In": "Sign In",
    "Go Premium": "Go Premium",
    "My Profile": "My Profile",
    "Subscription": "Subscription",
    "About Us": "About Us",
    "Contact": "Contact",
    "Start Free": "Start Free"
  },
  es: {
    "Home": "Inicio",
    "Yoga": "Yoga",
    "Pilates": "Pilates",
    "Programs": "Programas",
    "Library": "Biblioteca",
    "Sign In": "Iniciar Sesión",
    "Go Premium": "Hacerse Premium",
    "My Profile": "Mi Perfil",
    "Subscription": "Suscripción",
    "About Us": "Sobre Nosotros",
    "Contact": "Contacto",
    "Start Free": "Comenzar Gratis"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
});

function initLanguageSwitcher() {
  const style = document.createElement('style');
  style.innerHTML = `
    .lang-switcher {
      position: relative;
      display: inline-block;
      font-family: var(--font-heading);
      margin-right: var(--space-md);
      vertical-align: middle;
    }
    .lang-switcher__btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-pill);
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.8125rem;
      cursor: pointer;
      transition: all 0.2s;
      line-height: 1;
    }
    .lang-switcher__btn:hover {
      border-color: var(--color-accent-gold);
    }
    .lang-switcher__dropdown {
      display: none;
      position: absolute;
      top: 110%;
      right: 0;
      background: var(--bg-card);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: 6px 0;
      min-width: 130px;
      z-index: 10000;
    }
    .lang-switcher__dropdown.active {
      display: block;
    }
    .lang-switcher__option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      border: none;
      background: none;
      color: var(--text-primary);
      font-size: 0.8125rem;
      text-align: left;
      cursor: pointer;
      transition: background 0.15s;
    }
    .lang-switcher__option:hover {
      background: var(--bg-secondary);
      color: var(--color-accent-gold);
    }
  `;
  document.head.appendChild(style);

  const navActions = document.querySelector('.nav__actions');
  if (navActions) {
    const switcherContainer = document.createElement('div');
    switcherContainer.className = 'lang-switcher';
    
    const savedLang = localStorage.getItem('atlas_lang') || 'pt';
    const langLabels = { pt: 'Português', en: 'English', es: 'Español' };
    const currentLabel = langLabels[savedLang] || 'Português';

    switcherContainer.innerHTML = `
      <button class="lang-switcher__btn" id="langBtn">
        <span>🌐</span>
        <span id="currentLangLabel">${currentLabel}</span>
        <span style="font-size: 0.6rem; opacity:0.6;">▼</span>
      </button>
      <div class="lang-switcher__dropdown" id="langDropdown">
        <button class="lang-switcher__option" onclick="changeLanguage('pt', 'Português')">🇧🇷 Português</button>
        <button class="lang-switcher__option" onclick="changeLanguage('en', 'English')">🇺🇸 English</button>
        <button class="lang-switcher__option" onclick="changeLanguage('es', 'Español')">🇪🇸 Español</button>
      </div>
    `;

    navActions.parentNode.insertBefore(switcherContainer, navActions);

    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
      });
    }

    if (savedLang !== 'pt') {
      applyTranslations(savedLang);
    }
  }
}

window.changeLanguage = function(langCode, langLabel) {
  localStorage.setItem('atlas_lang', langCode);
  const label = document.getElementById('currentLangLabel');
  if (label) label.textContent = langLabel;
  
  applyTranslations(langCode);
  window.showToast(langCode === 'en' ? `Language changed to: ${langLabel}` : langCode === 'es' ? `Idioma cambiado a: ${langLabel}` : `Idioma alterado para: ${langLabel}`);
  
  setTimeout(() => window.location.reload(), 600);
};

function applyTranslations(lang) {
  const dictionary = translations[lang];
  if (!dictionary) return;

  // Translate Navbar
  const navLinks = document.querySelectorAll('.nav__link');
  const navKeys = ["Home", "Yoga", "Pilates", "Programs", "Library"];
  navLinks.forEach((link, idx) => {
    if (navKeys[idx]) {
      link.textContent = dictionary[navKeys[idx]];
    }
  });

  // Translate Drawer Links
  const drawerLinks = document.querySelectorAll('.drawer-link');
  drawerLinks.forEach((link, idx) => {
    if (navKeys[idx]) {
      link.textContent = dictionary[navKeys[idx]];
    }
  });

  // Translate Footer links
  const footerLinks = document.querySelectorAll('.footer__link');
  footerLinks.forEach(link => {
    const text = link.textContent.trim();
    if (dictionary[text]) {
      link.textContent = dictionary[text];
    }
  });
}


