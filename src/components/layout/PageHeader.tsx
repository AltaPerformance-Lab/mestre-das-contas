"use client";

import { ChevronRight, Home, Star } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string | ReactNode;
  description: string;
  icon?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  variant?: "default" | "reform" | "health"; 
  category?: string;
  categoryColor?: string;
  rating?: number;
  reviews?: number;
}

export default function PageHeader({
  title,
  description,
  icon,
  breadcrumbs = [],
  badge,
  variant = "default",
  category,
  rating,
  reviews
}: PageHeaderProps) {
  
  // --- BALA DE PRATA: CSS DIRETO (Bypassa o Tailwind JIT) ---
  // Se o Tailwind falhar, isso aqui garante a cor.
  const gradientMap: Record<string, string> = {
    default: "linear-gradient(to right, #1e40af, #3730a3)", // Azul (Blue-700 -> Indigo-800)
    reform:  "linear-gradient(to right, #065f46, #0d9488)", // Verde (Emerald-800 -> Teal-600)
    health:  "linear-gradient(to right, #ea580c, #e11d48)", // Saúde (Orange-600 -> Rose-600)
  };

  const backgroundStyle = gradientMap[variant] || gradientMap.default;

  return (
    <div 
      className="relative w-full text-white shadow-lg overflow-hidden rounded-3xl mb-8 print:hidden"
      style={{ background: backgroundStyle }} // <--- AQUI ESTÁ A MÁGICA
    >
      
      {/* Fallback de cor sólida caso o gradiente falhe (bg-slate-900) */}
      <div className="absolute inset-0 bg-slate-900 -z-10" />

      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-black/10 blur-2xl pointer-events-none" />

      <div className="relative px-6 py-10 md:py-12 max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
        
        {/* Ícone Wrapper */}
        {icon && (
          <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm shadow-inner ring-1 ring-white/30 text-white shrink-0">
            {icon}
          </div>
        )}

        <div className="flex-1 space-y-4">
          
          {/* Linha Superior: Breadcrumbs + Badge */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/90">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 opacity-80 hover:opacity-100">
              <Home className="w-4 h-4" /> Início
            </Link>
            
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 opacity-50" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors opacity-80 hover:opacity-100">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </div>
            ))}

            {/* Badge de Destaque */}
            {badge && (
              <span className="hidden sm:inline-flex ml-2 items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white ring-1 ring-white/40 shadow-sm uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>

          {/* Título Principal */}
          <div>
            {category && (
              <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
                {category}
              </p>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm leading-[1.1]">
              {title}
            </h1>
          </div>

          {/* Descrição + Rating */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <p className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-medium">
              {description}
            </p>

            {/* Rating Visual */}
            {rating && (
              <div className="flex flex-col items-start sm:items-end bg-black/20 p-2 px-3 rounded-lg backdrop-blur-md border border-white/10 shrink-0">
                 <div className="flex text-yellow-400 gap-0.5">
                   {[...Array(5)].map((_, i) => (
                     <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.round(rating) ? "currentColor" : "none"} 
                        className={i < Math.round(rating) ? "" : "text-white/30"} 
                     />
                   ))}
                 </div>
                 <div className="text-[10px] text-white/90 font-medium mt-1">
                    <span className="text-white font-bold text-sm mr-1">{rating}</span> 
                    {reviews && <span>({reviews > 1000 ? (reviews/1000).toFixed(1) + 'k' : reviews} avaliações)</span>}
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}