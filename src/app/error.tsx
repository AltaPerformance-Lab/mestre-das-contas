'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para serviço de analytics (opcional)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Icone de Erro */}
      <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-red-100 dark:ring-red-900/30 shadow-sm animate-in zoom-in duration-300">
        <AlertCircle size={40} strokeWidth={1.5} />
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
        Algo deu errado!
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
        Não se preocupe, foi apenas uma falha técnica momentânea. Nossos dados estão seguros.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95 duration-200"
        >
          <RefreshCcw size={18} />
          Tentar Novamente
        </button>
        
        <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 duration-200">
            <Home size={18} />
            Início
            </button>
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && (
        <div className="mt-12 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-lg text-left max-w-2xl w-full overflow-auto">
            <p className="text-xs font-mono text-red-800 dark:text-red-200 whitespace-pre-wrap">
                {error.message}
                {error.stack}
            </p>
        </div>
      )}
    </div>
  );
}
