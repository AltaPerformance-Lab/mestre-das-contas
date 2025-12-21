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
  let finalFormat = format;

  if (format === "auto") {
      if (slot.includes("sidebar") || slot.includes("sticky") || slot.includes("aside")) {
          finalFormat = "vertical";
      } else {
          finalFormat = "horizontal";
      }
  }

  // 2. ESTILOS DO CONTAINER
  const containerClasses = finalFormat === "vertical" || finalFormat === "rectangle"
    ? "w-full my-6" 
    : "w-full flex flex-col justify-center items-center my-8 md:my-12"; 

  return (
    <div className={`print:hidden ${containerClasses} ${className}`}>
      <div className={finalFormat === "vertical" ? "w-full" : "w-full max-w-6xl"}>
          
          {/* Label "Publicidade" (Acessibilidade + Compliance) */}
          <div className="flex items-center justify-center gap-2 mb-2 opacity-40 select-none">
             <div className="h-px w-4 bg-slate-400"></div>
             <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">
               Publicidade
             </span>
             <div className="h-px w-4 bg-slate-400"></div>
          </div>
          
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