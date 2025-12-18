import Link from "next/link";
import AdUnit from "@/components/ads/AdUnit"; // Seu componente de anúncio existente
import { Star, TrendingUp } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="flex flex-col gap-6 py-6 px-4">
      
      {/* Bloco 1: Anúncio Retângulo (Acima da dobra) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
         <span className="text-[10px] font-bold text-slate-300 uppercase block mb-2 tracking-widest">Publicidade</span>
         {/* Espaço reservado para o AdSense (300x250) */}
         <div className="flex justify-center min-h-[250px] bg-slate-50 rounded-lg overflow-hidden">
             <AdUnit slot="sidebar_right_top" format="rectangle" />
         </div>
      </div>

      {/* Bloco 2: Destaques Rápidos */}
      <div className="bg-slate-900 rounded-xl p-5 text-white shadow-md">
          <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-yellow-400">
              <Star className="fill-yellow-400" size={14}/> Top Ferramentas
          </h3>
          <ul className="space-y-3 text-sm">
              <li>
                  <Link href="/trabalhista/rescisao" className="block hover:text-blue-300 transition-colors border-b border-white/10 pb-2">
                      Rescisão CLT
                  </Link>
              </li>
              <li>
                  <Link href="/financeiro/reforma-tributaria" className="block hover:text-blue-300 transition-colors border-b border-white/10 pb-2">
                      Novo IVA 2025
                  </Link>
              </li>
              <li>
                  <Link href="/saude/gestacional" className="block hover:text-blue-300 transition-colors">
                      Calculadora Gestacional
                  </Link>
              </li>
          </ul>
      </div>

      {/* Bloco 3: Anúncio Arranha-céu (Sticky Vertical) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center flex-1">
         <span className="text-[10px] font-bold text-slate-300 uppercase block mb-2 tracking-widest">Publicidade</span>
         <div className="flex justify-center min-h-[600px] bg-slate-50 rounded-lg overflow-hidden">
             <AdUnit slot="sidebar_right_sticky" format="vertical" />
         </div>
      </div>

    </div>
  );
}