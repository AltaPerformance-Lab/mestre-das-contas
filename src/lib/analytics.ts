/**
 * Utilitário de rastreamento de eventos para o GA4
 * Garante que os eventos sejam disparados apenas se o consentimento for dado
 */

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Verifica consentimento antes de disparar (opcional, o GA4 já lida com o modo de consentimento)
    const stored = localStorage.getItem("mestre_contas_consent");
    let hasConsent = true; // Por padrão, confiamos no modo de consentimento do GA4 (denied/granted)
    
    if (stored) {
        const { preferences } = JSON.parse(stored);
        if (preferences.analytics === false) hasConsent = false;
    }

    if (hasConsent) {
        (window as any).gtag('event', eventName, {
            ...params,
            timestamp: new Date().toISOString(),
            page_path: window.location.pathname
        });
    }
  }
};
