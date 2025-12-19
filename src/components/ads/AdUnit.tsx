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
  
  // 1. LÓGICA DE FORMATO INTELIGENTE
  // Se o slot tiver "sidebar", força vertical. Senão, horizontal.
  let finalFormat = format;

  if (format === "auto") {
      if (slot.includes("sidebar") || slot.includes("sticky") || slot.includes("aside")) {
          finalFormat = "vertical";
      } else {
          finalFormat = "horizontal";
      }
  }

  // 2. ESTILOS DO CONTAINER (Margens e centralização)
  const containerClasses = finalFormat === "vertical" || finalFormat === "rectangle"
    ? "w-full my-6" // Vertical: margem normal
    : "w-full flex justify-center items-center my-10"; // Horizontal: mais espaço

  return (
    <div className={`print:hidden ${containerClasses} ${className}`}>
      <div className={finalFormat === "vertical" ? "w-full" : "w-full max-w-5xl"}>
          
          {/* Label "Publicidade" super discreto */}
          <span className="block text-[9px] text-slate-300 text-center mb-1.5 uppercase tracking-widest w-full opacity-50 select-none">
            Publicidade
          </span>
          
          {/* Renderiza o Anúncio Interno */}
          <InternalAdUnit 
             format={finalFormat} 
             variant={variant} 
             slot={slot} 
          />
      </div>
    </div>
  );
}