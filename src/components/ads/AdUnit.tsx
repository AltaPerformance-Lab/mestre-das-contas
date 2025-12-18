import InternalAdUnit from "./InternalAdUnit";

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
  
  // 1. LÓGICA DE FORMATO (Mantém a inteligência de layout)
  let finalFormat = format;

  if (format === "auto") {
      if (slot.includes("sidebar") || slot.includes("sticky")) {
          finalFormat = "vertical";
      } else {
          finalFormat = "horizontal";
      }
  }

  // 2. ESTILOS DO CONTAINER
  const containerClasses = finalFormat === "vertical" || finalFormat === "rectangle"
    ? "w-full"
    : "w-full flex justify-center items-center my-8";

  return (
    <div className={`print:hidden ${containerClasses} ${className}`}>
      <div className={finalFormat === "vertical" ? "w-full" : "w-full max-w-4xl"}>
          
          {/* Label "Publicidade" discreto */}
          <span className="block text-[10px] text-slate-300 text-center mb-2 uppercase tracking-widest w-full opacity-60">
            Publicidade
          </span>
          
          {/* CORREÇÃO CRÍTICA:
             1. Passamos o 'slot' para baixo.
             2. Passamos 'variant' (que padrão é "auto").
             
             Isso permite que o InternalAdUnit use o nome do slot (ex: "home_feed")
             para calcular qual dos 15 anúncios mostrar.
          */}
          <InternalAdUnit 
             format={finalFormat} 
             variant={variant} 
             slot={slot} 
          />
      </div>
    </div>
  );


  // --- QUANDO O ADSENSE APROVAR, DESCOMENTE ISSO ---
  /*
  return (
    <div className={`w-full flex justify-center my-4 overflow-hidden ${className} print:hidden`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-SEU_ID_AQUI"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
  */
}