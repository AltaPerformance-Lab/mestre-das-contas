"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  className?: string;
  responsive?: boolean;
  onUnfilled?: () => void;
}

export default function GoogleAd({ 
  slot, 
  format = "auto", 
  className = "",
  responsive = true,
  onUnfilled
}: GoogleAdProps) {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adRef = useRef<HTMLModElement>(null);
  const [consent, setConsent] = useState<'granted' | 'denied' | 'pending'>('pending');

  // CRIA UMA CHAVE ÚNICA BASEADA NA ROTA E CONSENTIMENTO
  const keyTrigger = `${pathname}-${searchParams.toString()}-${slot}-${consent}`;

  // 1. GERENCIAMENTO DE CONSENTIMENTO
  useEffect(() => {
    // Função para verificar consentimento
    const checkConsent = () => {
        const stored = localStorage.getItem("mestre_contas_consent");
        if (stored) {
            const { preferences } = JSON.parse(stored);
            if (preferences.marketing) {
                setConsent('granted');
            } else {
                setConsent('denied');
            }
        } else {
             // Se não tem nada salvo, está aguardando (pending)
             setConsent('pending');
        }
    };

    // Verifica inicial
    checkConsent();

    // Ouve atualizações
    const handleUpdate = () => checkConsent();
    window.addEventListener("consent_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
        window.removeEventListener("consent_updated", handleUpdate);
        window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // 2. INICIALIZAÇÃO DO ADSENSE
  useEffect(() => {
    // Se consentimento foi negado, não injeta o AdSense
    if (consent === 'denied') return;

    let observer: MutationObserver | null = null;

    try {
      const timeoutId = setTimeout(() => {
          if (adRef.current && (window as any).adsbygoogle) {
             
             // Observer para detectar se o AdSense não conseguiu preencher o anúncio (unfilled)
             if (onUnfilled) {
                 observer = new MutationObserver((mutations) => {
                     mutations.forEach((mutation) => {
                         if (mutation.attributeName === 'data-ad-status') {
                             const status = adRef.current?.getAttribute('data-ad-status');
                             if (status === 'unfilled') {
                                 onUnfilled();
                             }
                         }
                     });
                 });
                 observer.observe(adRef.current, { attributes: true });
             }

             // Verifica se o anúncio já foi preenchido
             if (adRef.current.innerHTML.trim() !== "") {
                return;
             }
             
             // Se estiver pendente, pode definir NPA (Non-Personalized Ads) 
             if (consent === 'pending') {
               (window as any).adsbygoogle.requestNonPersonalizedAds = 1;
             }

             (window as any).adsbygoogle.push({});
          }
      }, 300); // Um pequeno delay para garantir que a div esteja pronta

      return () => {
          clearTimeout(timeoutId);
          if (observer) observer.disconnect();
      };

    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [keyTrigger, consent, onUnfilled]);

  // Altura mínima lógica para evitar CLS (Cumulative Layout Shift)
  const minHeightClass = format === "horizontal" ? "min-h-[90px]" : "min-h-[250px]";

  // Se o consentimento foi explicitamente negado, renderizamos apenas o espaço vazio
  if (consent === 'denied') {
    return <div className={`overflow-hidden ${className} ${minHeightClass} bg-slate-50 dark:bg-slate-900 flex items-center justify-center`} />;
  }

  // Renderizamos a tag <ins> se consentimento for granted ou pending (para o Googlebot poder ler)
  return (
    <div 
      key={keyTrigger} 
      className={`overflow-hidden ${className} ${minHeightClass} bg-slate-50 dark:bg-slate-900 flex items-center justify-center`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}