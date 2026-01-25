'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Previne o mini-infobar padrão do navegador
      e.preventDefault();
      // Guarda o evento para disparar depois
      setDeferredPrompt(e);
      // Mostra nosso botão personalizado
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostra o prompt nativo
    deferredPrompt.prompt();

    // Espera a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou a instalação');
    } else {
      console.log('Usuário recusou a instalação');
    }

    // Limpa o evento
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-50 animate-in slide-in-from-bottom duration-500 print:hidden">
      <div className="bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-xl shadow-2xl border border-slate-700 flex flex-col gap-3 max-w-sm ml-auto">
        <div className="flex justify-between items-start">
            <div className="flex gap-3">
                <div className="bg-blue-600 rounded-lg p-2 h-fit">
                    <Download size={20} className="text-white"/>
                </div>
                <div>
                   <h3 className="font-bold text-sm">Instalar Aplicativo</h3>
                   <p className="text-xs text-slate-300 mt-1">
                     Adicione o Mestre das Contas à sua tela inicial para acesso rápido e offline.
                   </p>
                </div>
            </div>
            <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
                <X size={16}/>
            </button>
        </div>
        
        <Button 
            onClick={handleInstallClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
        >
            Instalar Agora
        </Button>
      </div>
    </div>
  );
}
