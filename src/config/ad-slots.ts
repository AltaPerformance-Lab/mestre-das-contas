// Mapeamento de Slots do Frontend para IDs do AdSense
// Substitua os valores vazios ("") pelos IDs numéricos gerados no painel do Google AdSense
// Exemplo: "home_top_feed": "1234567890"

export const ADS_SLOTS: Record<string, string> = {
    // --- HOME ---
    "home_top_feed": "",      // Topo da Home
    "home_middle_feed": "",   // Entre categorias
    "home_sidebar": "",       // Barra lateral (Desktop)

    // --- TRABALHISTA ---
    "hub_top": "",            // Topo do Hub Trabalhista
    "hub_bottom": "",         // Rodapé do Hub Trabalhista
    "rescisao_top": "",       // Calculadora Rescisão (Topo)
    "rescisao_mid": "",       // Calculadora Rescisão (Meio)
    "rescisao_bottom": "",    // Calculadora Rescisão (Fim)
    "termination_top": "",    // pSEO Rescisão (Topo)
    "termination_mid": "",    // pSEO Rescisão (Meio)
    "termination_bottom": "", // pSEO Rescisão (Fim)

    // --- FINANCEIRO ---
    "fin_hub_top": "",        // Topo do Hub Financeiro
    "fin_hub_bottom": "",     // Rodapé do Hub Financeiro
    "card_top": "",           // Maquininha (Topo)
    "card_mid": "",           // Maquininha (Meio)
    "card_bottom": "",        // Maquininha (Fim)
    
    // --- FERRAMENTAS ---
    "pix_top": "",
    "pix_mid": "",
    "pix_bottom": "",

    // --- GERADOR QR CODE ---
    "qrcode_top": "",
    "qrcode_mid": "",
    "qrcode_bottom": "",
    "qr_case_top": "",
    "qr_case_mobile_mid": "",
    "qr_case_bottom": "",
    
    // --- REFORMA TRIBUTÁRIA ---
    "reforma_top": "",
    "reforma_mid": "",
    "reforma_bottom": "",
    
    // --- SIDEBAR GLOBAL ---
    "sidebar_sticky": "",     // Anúncio fixo na sidebar
    "right_sidebar_1": "",
    "right_sidebar_2": "",
};
