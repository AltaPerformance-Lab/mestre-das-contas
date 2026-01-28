// Mapeamento de Slots do Frontend para IDs do AdSense
// Substitua os valores vazios ("") pelos IDs numéricos gerados no painel do Google AdSense
// Exemplo: "home_top_feed": "1234567890"

export const ADS_SLOTS: Record<string, string> = {
    // --- HOME ---
    "home_top_feed": "5870296706",      // Home - Topo Feed (Responsivo)
    "home_middle_feed": "8804948780",   // Home - Meio Feed (Responsivo)
    "home_sidebar": "8757849344",       // Reutiliza: Sidebar Sticky

    // --- TRABALHISTA ---
    "hub_top": "2498969854",            // Reutiliza: Reforma Topo
    "hub_bottom": "3428908143",         // Reutiliza: Reforma Bottom
    "rescisao_top": "2498969854",       // Reutiliza: Reforma Topo
    "rescisao_mid": "4429561835",       // Reutiliza: Reforma Meio
    "rescisao_bottom": "3428908143",    // Reutiliza: Reforma Bottom
    "termination_top": "2498969854",    // Reutiliza: Reforma Topo (pSEO)
    "termination_mid": "4429561835",    // Reutiliza: Reforma Meio (pSEO)
    "termination_bottom": "3428908143", // Reutiliza: Reforma Bottom (pSEO)

    // --- FINANCEIRO ---
    "fin_hub_top": "2498969854",        // Reutiliza: Reforma Topo
    "fin_hub_bottom": "3428908143",     // Reutiliza: Reforma Bottom
    "card_top": "2498969854",           // Reutiliza: Reforma Topo (Maquininha)
    "card_mid": "4429561835",           // Reutiliza: Reforma Meio (Maquininha)
    "card_bottom": "3428908143",        // Reutiliza: Reforma Bottom (Maquininha)
    
    // --- FERRAMENTAS ---
    "pix_top": "2498969854",            // Reutiliza: Reforma Topo
    "pix_mid": "4429561835",            // Reutiliza: Reforma Meio
    "pix_bottom": "3428908143",         // Reutiliza: Reforma Bottom

    // --- GERADOR QR CODE ---
    "qrcode_top": "2498969854",         // Reutiliza: Reforma Topo
    "qrcode_mid": "4429561835",         // Reutiliza: Reforma Meio
    "qrcode_bottom": "3428908143",      // Reutiliza: Reforma Bottom
    "qr_case_top": "2498969854",        // Reutiliza: Reforma Topo (pSEO)
    "qr_case_mobile_mid": "4429561835", // Reutiliza: Reforma Meio (pSEO)
    "qr_case_bottom": "3428908143",     // Reutiliza: Reforma Bottom (pSEO)
    
    // --- REFORMA TRIBUTÁRIA ---
    "reforma_top": "2498969854",        // Reforma - Topo (Responsivo)
    "reforma_mid": "4429561835",        // Reforma - Meio (Responsivo)
    "reforma_bottom": "3428908143",     // Reforma - Bottom (Responsivo)
    
    // --- SIDEBAR GLOBAL ---
    "sidebar_sticky": "8757849344",     // Sidebar - Sticky (Responsivo)
    "right_sidebar_1": "8757849344",    // Reutiliza: Sidebar Sticky
    "right_sidebar_2": "8757849344",    // Reutiliza: Sidebar Sticky
};
