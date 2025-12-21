"use client";

import { useEffect, useRef } from "react";
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

  // CRIA UMA CHAVE ÚNICA BASEADA NA ROTA
  // Sempre que a rota ou os parâmetros mudarem, essa chave muda.
  // Isso força o React a desmontar o componente antigo e montar um novo.
  const keyTrigger = `${pathname}-${searchParams.toString()}-${slot}`;

  useEffect(() => {
    try {
      // Pequeno timeout para garantir que o DOM renderizou após a troca de rota
      const timeoutId = setTimeout(() => {
          if (adRef.current && (window as any).adsbygoogle) {
             // Limpa qualquer lixo anterior (segurança extra)
             if (adRef.current.innerHTML.trim() !== "") {
                console.log("AdSense: Slot já preenchido, ignorando push.");
                return;
             }
             
             (window as any).adsbygoogle.push({});
          }
      }, 100); // 100ms é imperceptível mas evita race conditions

      return () => clearTimeout(timeoutId);

    } catch (err) {
      console.error("AdSense Error:", err);
    }
  }, [keyTrigger]); // Roda novamente sempre que a chave mudar

  return (
    <div 
      key={keyTrigger} // <--- O PULO DO GATO: Força o Re-render total
      className={`overflow-hidden ${className} min-h-[250px] bg-slate-50 flex items-center justify-center`}
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
      
      {/* Fallback visual enquanto carrega (Skeleton) - Opcional mas elegante */}
      <script dangerouslySetInnerHTML={{ __html: `(adsbygoogle = window.adsbygoogle || []).onload = function() { this.parentNode.style.background = 'transparent'; };` }} />
    </div>
  );
}