
import Link from "next/link";
import { Zap, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden pb-32">
      {/* Background Pattern Leve (CSS Puro = Zero Carregamento) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Badge de Atualização (Sem animação para LCP) */}
          <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 backdrop-blur-sm text-blue-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Zap size={14} className="text-yellow-400 fill-yellow-400" /> Atualizado Lei 2026
          </div>
          
          {/* Título Principal (H1) - REMOVIDO ANIMATE PARA OTIMIZAR LCP */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-balance">
            Simplifique seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Dia a Dia</span> com ferramentas inteligentes.
          </h1>
          
          {/* Subtítulo - REMOVIDO ANIMATE PARA OTIMIZAR LCP */}
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto text-pretty">
            Calculadoras e ferramentas gratuitas para Finanças, Direitos Trabalhistas, Saúde e Tech. 
            Tudo em um só lugar, 100% online e gratuito.
          </p>
 
          {/* Botões de Ação (CTAs) - REMOVIDO ANIMATE */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/financeiro/reforma-tributaria" className="w-full sm:w-auto">
              <Button className="h-14 px-8 text-lg font-bold bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 transition-all shadow-lg shadow-blue-900/40 rounded-full w-full">
                Simular Reforma Tributária
              </Button>
            </Link>
            <Link href="#calculadoras" className="w-full sm:w-auto">
              <Button variant="outline" className="h-14 px-8 text-lg font-medium border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white rounded-full w-full">
                Ver todas as ferramentas
              </Button>
            </Link>
          </div>

          {/* Prova Social / Trust Badges */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 font-medium opacity-80 animate-in fade-in duration-1000 delay-300">
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Legislação Vigente</span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500"/> Privacidade Garantida</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Cálculos Exatos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
