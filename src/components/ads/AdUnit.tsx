import InternalAdUnit from "./InternalAdUnit";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  // AQUI ESTAVA O ERRO DA PRIMEIRA IMAGEM: Faltava definir que variant é permitido
  variant?: "speed" | "software" | "agency" | "auto" | string; 
  className?: string;
}

export default function AdUnit({ 
  slot, 
  format = "auto", 
  variant, 
  className = "" 
}: AdUnitProps) {
  
  // 1. LÓGICA DE FORMATO
  let finalFormat = format;

  if (slot.includes("sidebar")) {
      finalFormat = "vertical";
  } else if (format === "auto") {
      finalFormat = "horizontal";
  }

  // 2. LÓGICA DE VARIANTE (TEMA)
  let finalVariant = variant;
  
  // Se não foi escolhido manual, adivinha pelo slot
  if (!finalVariant || finalVariant === "auto") {
      if (slot.includes("sidebar")) finalVariant = "agency";
      else if (slot.includes("mid")) finalVariant = "software";
      else finalVariant = "speed";
  }

  // 3. ESTILOS DO CONTAINER
  const containerClasses = finalFormat === "vertical"
    ? "w-full"
    : "w-full flex justify-center items-center my-8";

  return (
    <div className={`print:hidden ${containerClasses} ${className}`}>
      <div className={finalFormat === "vertical" ? "w-full" : "w-full max-w-4xl"}>
          <span className="block text-[10px] text-slate-300 text-center mb-2 uppercase tracking-widest w-full">
            Publicidade
          </span>
          {/* Agora o InternalAdUnit vai receber o tipo correto */}
          <InternalAdUnit format={finalFormat} variant={finalVariant} />
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