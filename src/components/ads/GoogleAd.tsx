"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  className?: string;
  responsive?: boolean;
}

export default function GoogleAd({ 
  slot, 
  format = "auto", 
  className = "",
  responsive = true
}: GoogleAdProps) {
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const adRef = useRef<HTMLModElement>(null);
  const [consent, setConsent] = useState(false);

  // CRIA UMA CHAVE ÚNICA BASEADA NA ROTA
  const keyTrigger = `${pathname}-${searchParams.toString()}-${slot}`;

  // 1. GERENCIAMENTO DE CONSENTIMENTO
  useEffect(() => {
    // Função para verificar consentimento
    const checkConsent = () => {
        const stored = localStorage.getItem("mestre_contas_consent");
        if (stored) {
            const { preferences } = JSON.parse(stored);
            if (preferences.marketing) {
                setConsent(true);
            } else {
                setConsent(false);
            }
        } else {
             // Se não tem nada salvo, assumimos false (esperando aceite)
             setConsent(false);
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
    if (!consent) return; // Se não tem consentimento, não faz nada

    try {
      const timeoutId = setTimeout(() => {
          if (adRef.current && (window as any).adsbygoogle) {
             if (adRef.current.innerHTML.trim() !== "") {
                return;
             }
             (window as any).adsbygoogle.push({});
          }
      }, 100);

      return () => clearTimeout(timeoutId);

    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [keyTrigger, consent]); // Roda quando a chave ou o consentimento mudarem

  // Se não tiver consentimento, não renderiza nada (ou renderize um placeholder se preferir evitar CLS)
  // Por enquanto, vamos retornar null para não carregar scripts indesejados.
  // Se quiser evitar CLS (Cumulative Layout Shift), renderize a div vazia com a altura min.
  // Altura mínima lógica para evitar CLS (Cumulative Layout Shift)
  const minHeightClass = format === "horizontal" ? "min-h-[90px]" : "min-h-[250px]";

  if (!consent) return null;

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