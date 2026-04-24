import Link from 'next/link';
import { 
  FileQuestion, Home, ArrowRight 
} from "lucide-react";
import SmartNotFoundSuggestions from '@/components/layout/SmartNotFoundSuggestions';

export default function NotFound() {
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorativo Suave */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Ícone 404 Animado */}
        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center mb-8 animate-bounce ring-1 ring-slate-100 dark:ring-slate-800">
           <FileQuestion size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5}/>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tighter mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 mb-4">
          Ops! Cálculo não encontrado.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
          A página que você procura mudou de endereço ou não existe mais. 
          Aproveite para conferir nossas sugestões:
        </p>

        {/* COMPONENTE DE SUGESTÕES INTELIGENTES */}
        <SmartNotFoundSuggestions />

        {/* BOTÃO HOME */}
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10 transition-all transform active:scale-95">
             <Home size={20} />
             Voltar para o Início
          </button>
        </Link>

      </div>

      <p className="absolute bottom-6 text-xs text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase">
        Mestre das Contas
      </p>
    </div>
  );
}