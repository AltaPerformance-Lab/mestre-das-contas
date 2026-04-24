'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já instalou ou recusou permanentemente
    const dismissedUntil = localStorage.getItem('pwa_prompt_dismissed_until');
    const isPermanentDismiss = localStorage.getItem('pwa_prompt_permanent_dismiss');

    if (isPermanentDismiss) return;
    
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      localStorage.setItem('pwa_prompt_permanent_dismiss', 'true');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = (permanent = false) => {
    if (permanent) {
      localStorage.setItem('pwa_prompt_permanent_dismiss', 'true');
    } else {
      // 1 semana de cooldown (7 dias)
      const nextShow = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('pwa_prompt_dismissed_until', nextShow.toString());
    }
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 z-50 animate-in slide-in-from-bottom duration-500 print:hidden">
      <div className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-none dark:border dark:border-slate-800 flex flex-col gap-4 max-w-sm ml-auto overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl" />
        
        <div className="flex justify-between items-start relative z-10">
            <div className="flex gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-3 h-fit shadow-lg shadow-blue-200 dark:shadow-none">
                    <Download size={24} className="text-white"/>
                </div>
                <div>
                   <h3 className="font-extrabold text-base tracking-tight">App Mestre das Contas</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                     Tenha acesso instantâneo às ferramentas, mesmo <span className="text-blue-600 dark:text-blue-400 font-bold">sem internet</span>.
                   </p>
                </div>
            </div>
            <button onClick={() => handleClose(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1">
                <X size={20}/>
            </button>
        </div>
        
        <div className="flex flex-col gap-2 relative z-10">
            <Button 
                onClick={handleInstallClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
                Instalar Aplicativo
            </Button>
            
            <button 
                onClick={() => handleClose(true)}
                className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-center uppercase font-bold tracking-widest py-1 transition-colors"
            >
                Não mostrar novamente
            </button>
        </div>
      </div>
    </div>
  );
}
