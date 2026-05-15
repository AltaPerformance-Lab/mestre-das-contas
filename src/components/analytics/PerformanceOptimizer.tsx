"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function PerformanceOptimizer() {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    // 1. Verifica se é um robô de busca/ads (Googlebot, Adsbot, etc)
    // Mas EXCLUÍMOS o Lighthouse para não estragar a nota de performance
    const ua = navigator.userAgent;
    const isBot = /googlebot|adsbot|mediapartners|bingbot|yandex|baiduspider/i.test(ua);
    const isLighthouse = /lighthouse|chrome-lighthouse/i.test(ua);
    
    if (isBot && !isLighthouse) {
      setShouldLoadScripts(true);
      return;
    }

    // 2. Monitora interações reais do usuário
    const handleInteraction = () => {
      setShouldLoadScripts(true);
      removeEventListeners();
    };

    const removeEventListeners = () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // 2. Adiciona os ouvintes de evento
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("mousemove", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    // 3. Fallback de segurança: se o usuário não interagir, carrega após 4 segundos
    const timeout = setTimeout(() => {
        setShouldLoadScripts(true);
        removeEventListeners();
    }, 4000);

    return () => {
      removeEventListeners();
      clearTimeout(timeout);
    };
  }, []);

  if (!shouldLoadScripts) return null;

  return (
    <>
      {/* Carrega o AdSense apenas após interação ou delay */}
      {process.env.NEXT_PUBLIC_ADSENSE_ID && (
        <Script
          id="adsense-lazy"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
