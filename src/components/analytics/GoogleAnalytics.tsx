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
    const stored = localStorage.getItem("mestre_contas_consent");
    if (stored) {
      const { preferences } = JSON.parse(stored);
      if (preferences.analytics) setConsent(true);
    }

    // 2. Ouve atualizações em tempo real (Evento customizado + Storage)
    const checkConsent = () => {
        const updated = localStorage.getItem("mestre_contas_consent");
        if (updated) {
            const { preferences } = JSON.parse(updated);
            if (preferences.analytics) setConsent(true);
        }
    };

    window.addEventListener("consent_updated", checkConsent);
    window.addEventListener("storage", checkConsent);

    return () => {
        window.removeEventListener("consent_updated", checkConsent);
        window.removeEventListener("storage", checkConsent);
    };
  }, []);

  // Se não tiver ID ou não tiver consentimento, não renderiza nada
  if (!GA_MEASUREMENT_ID || !consent) return null;

  // Retorna o componente oficial do Next.js agora que temos permissão
  return <GoogleAnalyticsScript gaId={GA_MEASUREMENT_ID} />;
}