import InternalAdUnit from "./InternalAdUnit";
import GoogleAd from "./GoogleAd";
import { ADS_SLOTS } from "@/config/ad-slots";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical" | string;
  variant?: "speed" | "software" | "agency" | "auto" | string | number; 
  className?: string;
}

export default function AdUnit({ 
  slot, 
  format = "auto", 
  variant = "auto", 
  className = "" 
}: AdUnitProps) {
  
  // 1. LÓGICA DE FORMATO INTELIGENTE
  let finalFormat = format;

  if (format === "auto") {
      if (slot.includes("sidebar") || slot.includes("sticky") || slot.includes("aside")) {
          finalFormat = "vertical";
      } else {
          finalFormat = "horizontal";
      }
  }

  // 2. VERIFICAÇÃO DE ADSENSE
  // Só mostra AdSense se tivermos o ID do Publisher configurado E o slot mapeado
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const adSlotId = ADS_SLOTS[slot];
  
  // Lógica: AdSense só ativa se AMBOS existirem
  const useAdSense = !!(publisherId && adSlotId && adSlotId.trim() !== "");

  // 3. ESTILOS DO CONTAINER
  const containerClasses = finalFormat === "vertical" || finalFormat === "rectangle"
    ? "w-full my-6" 
    : "w-full flex flex-col justify-center items-center my-8 md:my-12"; 

  return (
    <div className={`print:hidden ${containerClasses} ${className}`}>
      <div className={finalFormat === "vertical" ? "w-full" : "w-full"}>
          
          {/* Label "Publicidade" (Acessibilidade + Compliance) */}
          <div className="flex items-center justify-center gap-2 mb-2 opacity-40 select-none">
             <div className="h-px w-4 bg-slate-400"></div>
             <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
               Publicidade
             </span>
             <div className="h-px w-4 bg-slate-400"></div>
          </div>
          
          {useAdSense ? (
             <GoogleAd 
                slot={adSlotId} 
                format={finalFormat as any} 
                responsive={true}
             />
          ) : (
             /* Fallback: Anúncios Internos (House Ads) 
                Mostra quando não tem AdSense configurado ou slot não existe */
             <InternalAdUnit 
                format={finalFormat} 
                variant={variant} 
                slot={slot} 
             />
          )}
      </div>
    </div>
  );
}