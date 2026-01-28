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

        if (hasConsent) {
            setConsent(true);
            
            // Configurar GA com performance otimizada e privacidade
            if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
                (window as any).gtag('config', GA_MEASUREMENT_ID, {
                    page_path: window.location.pathname,
                    send_page_view: true,
                    anonymize_ip: true, // LGPD compliance
                    cookie_flags: 'SameSite=None;Secure', // Segurança
                });
            }
        } else {
          setConsent(false);
        }
    };

    // Verifica ao montar
    checkConsent();

    // 2. Ouve atualizações em tempo real
    window.addEventListener("consent_updated", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
        window.removeEventListener("consent_updated", checkConsent);
        window.removeEventListener("storage", checkConsent);
    };
  }, [GA_MEASUREMENT_ID]);

  // Se não tiver ID ou não tiver consentimento, não renderiza nada
  if (!GA_MEASUREMENT_ID || !consent) return null;

  // Retorna o componente oficial do Next.js agora que temos permissão
  return <GoogleAnalyticsScript gaId={GA_MEASUREMENT_ID} />;
}