"use client";

import { ChevronRight, Home, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/navigation"; // Para botão voltar no mobile

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
  variant?: "default" | "reform" | "health" | "finance" | "labor" | "tools"; 
  category?: string;
  categoryColor?: string; // Mantido para compatibilidade, mas o variant controla a cor
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
  
  const router = useRouter();

  // Mapeamento de Gradientes Otimizados (CSS Puro)
  const gradientMap: Record<string, string> = {
    default: "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)", // Blue-900 -> Indigo-900
    reform:  "linear-gradient(135deg, #064e3b 0%, #0f766e 100%)", // Emerald-900 -> Teal-700
    health:  "linear-gradient(135deg, #be123c 0%, #9f1239 100%)", // Rose-700 -> Rose-900
    finance: "linear-gradient(135deg, #065f46 0%, #047857 100%)", // Emerald-800 -> Emerald-700 (Green)
    labor:   "linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)", // Blue (Labor)
    tools:   "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)", // Indigo-600 -> Indigo-700
  };

  const backgroundStyle = gradientMap[variant] || gradientMap.default;

  // --- JSON-LD DE BREADCRUMBS ---
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      // Item 1: Home
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://mestredascontas.com.br"
      },
      // Items Dinâmicos
      ...breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://mestredascontas.com.br${item.href}` : undefined
      }))
    ]
  };

  return (
    <div 
      className="relative w-full text-white shadow-xl overflow-hidden rounded-[2rem] mb-8 print:hidden group isolate"
      style={{ background: backgroundStyle }} 
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Fallback de cor sólida (Anti-FOUC) */}
      <div className="absolute inset-0 bg-slate-900 -z-20" />

      {/* Padrão de Fundo (Sutil) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Elementos Decorativos (Glow) */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none mix-blend-overlay" />

      <div className="relative px-6 py-8 md:py-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-6 z-10">
        
        {/* Ícone (Desktop: Grande / Mobile: Escondido ou Pequeno) */}
        {icon && (
          <div className="hidden lg:flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl ring-1 ring-white/20 text-white shrink-0 transform group-hover:scale-105 transition-transform duration-500">
            {icon}
          </div>
        )}

        <div className="flex-1 space-y-4 w-full">
          
          {/* Breadcrumbs e Navegação */}
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium text-blue-100/90">
            
            {/* Botão Voltar (Apenas Mobile) */}
            <button 
                onClick={() => router.back()} 
                className="lg:hidden mr-2 p-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Voltar"
            >
                <ArrowLeft size={16} />
            </button>

            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 opacity-80 hover:opacity-100">
              <Home className="w-3.5 h-3.5 mb-0.5" /> Início
            </Link>
            
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                {item.href ? (
                  <Link href={item.href} className="hover:text-white transition-colors opacity-80 hover:opacity-100 truncate max-w-[150px]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white truncate max-w-[200px]">{item.label}</span>
                )}
              </div>
            ))}

            {/* Badge */}
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/90 text-amber-950 shadow-sm uppercase tracking-wider ml-auto lg:ml-2">
                {badge}
              </span>
            )}
          </div>

          {/* Título e Categoria */}
          <div>
            {category && (
              <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-200/80 mb-2">
                {category}
              </p>
            )}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md leading-[1.15] text-balance">
              {title}
            </h1>
          </div>

          {/* Descrição e Rating */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between pt-2">
            <p className="text-sm md:text-lg text-blue-50/90 max-w-3xl leading-relaxed font-medium text-pretty">
              {description}
            </p>

            {/* Rating Box */}
            {rating && (
              <div className="flex items-center gap-3 bg-black/20 p-3 rounded-2xl backdrop-blur-md border border-white/5 shrink-0 self-start lg:self-auto hover:bg-black/30 transition-colors cursor-default">
                 <div className="text-center px-1">
                    <span className="block text-xl font-bold text-white leading-none">{rating}</span>
                    <span className="text-[9px] text-blue-200 uppercase tracking-wide">Nota</span>
                 </div>
                 <div className="h-8 w-px bg-white/10"></div>
                 <div>
                     <div className="flex text-amber-400 gap-0.5">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={14} 
                           fill={i < Math.round(rating) ? "currentColor" : "none"} 
                           className={i < Math.round(rating) ? "" : "text-white/20"} 
                         />
                       ))}
                     </div>
                     <div className="text-[10px] text-blue-100 mt-0.5">
                        {reviews && <span>{reviews > 1000 ? (reviews/1000).toFixed(1) + 'k' : reviews} opiniões</span>}
                     </div>
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}