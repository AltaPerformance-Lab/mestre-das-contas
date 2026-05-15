"use client";

import { useEffect, useState } from "react";
// Renomeamos a importação da biblioteca para não dar conflito com o nome da função
import { GoogleAnalytics as GoogleAnalyticsScript } from "@next/third-parties/google";

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);
  
  // Puxa do .env
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  useEffect(() => {
    // 1. Verifica consentimento salvo
    const checkConsent = () => {
        const stored = localStorage.getItem("mestre_contas_consent");
        let hasConsent = false;
        
        if (stored) {
            const { preferences } = JSON.parse(stored);
            if (preferences.analytics) hasConsent = true;
        }

        if (typeof window !== 'undefined' && window.gtag) {
            if (hasConsent) {
                // Atualiza o consentimento para concedido
                window.gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
                
                // Configurações adicionais
                if (GA_MEASUREMENT_ID) {
                    window.gtag('config', GA_MEASUREMENT_ID, {
                        page_path: window.location.pathname,
                        anonymize_ip: true,
                        cookie_flags: 'SameSite=None;Secure',
                    });
                }
            } else {
                // Atualiza para negado
                window.gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }
        }
    };

    // Dá um pequeno tempo para o script do GA carregar
    const timer = setTimeout(checkConsent, 500);

    // 2. Ouve atualizações em tempo real
    window.addEventListener("consent_updated", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
        clearTimeout(timer);
        window.removeEventListener("consent_updated", checkConsent);
        window.removeEventListener("storage", checkConsent);
    };
  }, [GA_MEASUREMENT_ID]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'url_passthrough', true);
          `,
        }}
      />
      <GoogleAnalyticsScript 
        gaId={GA_MEASUREMENT_ID} 
        data-strategy="afterInteractive"
      />
    </>
  );
}