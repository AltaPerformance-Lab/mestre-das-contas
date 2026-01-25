"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, ChevronDown, ChevronUp, ShieldCheck, Check } from "lucide-react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Estado das preferências
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true e desabilitado
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Verifica se já existe consentimento salvo
    const savedConsent = localStorage.getItem("mestre_contas_consent");
    if (!savedConsent) {
      // Pequeno delay para animação suave na entrada
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (finalPreferences: typeof preferences) => {
    localStorage.setItem("mestre_contas_consent", JSON.stringify({
      preferences: finalPreferences,
      timestamp: new Date().toISOString(),
    }));
    
    // Dispara evento customizado para outros componentes (Analytics/Ads) reagirem imediatamente
    window.dispatchEvent(new Event("consent_updated"));
    console.log("Consentimento salvo:", finalPreferences);

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] px-4 pb-4 md:pb-6 pointer-events-none">
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 pointer-events-auto transform transition-all duration-500 ease-out animate-in slide-in-from-bottom-10 fade-in">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
          <div className="flex gap-4">
            <div className="hidden md:flex w-12 h-12 bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-xl items-center justify-center shrink-0">
              <Cookie size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span className="md:hidden text-amber-600 dark:text-amber-500"><Cookie size={20}/></span>
                Nós valorizamos sua privacidade
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar anúncios. 
                Ao clicar em "Aceitar Todos", você concorda com nossa <Link href="/politica-privacidade" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">Política de Privacidade</Link>.
              </p>
            </div>
          </div>

          {/* BOTÕES PRINCIPAIS (Mobile: Empilhados / Desktop: Lado a Lado) */}
          <div className="flex flex-col gap-2 min-w-[200px] shrink-0">
            <button 
              onClick={handleAcceptAll}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-slate-900/20 dark:shadow-none"
            >
              Aceitar Todos
            </button>
            <div className="flex gap-2">
               <button 
                 onClick={() => setShowDetails(!showDetails)}
                 className="flex-1 py-2 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
               >
                 {showDetails ? "Ocultar" : "Personalizar"} 
                 {showDetails ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
               </button>
               <button 
                 onClick={handleRejectAll}
                 className="flex-1 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-colors"
               >
                 Rejeitar
               </button>
            </div>
          </div>
        </div>

        {/* ÁREA EXPANSÍVEL (DETALHES) */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
               <ShieldCheck size={16} className="text-emerald-500"/> Preferências de Cookies
            </h4>
            
            <div className="space-y-3">
              {/* Opção 1: Necessários */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                 <div className="pr-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Essenciais</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Necessários para o site funcionar. Não podem ser desligados.</p>
                 </div>
                 <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded border border-emerald-100 dark:border-emerald-800">
                    <Check size={14} /> Ativo
                 </div>
              </div>

              {/* Opção 2: Analíticos */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                 <div className="pr-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Analíticos</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ajudam a entender como você usa o site (Google Analytics).</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                 </label>
              </div>

              {/* Opção 3: Marketing */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-800 transition-colors">
                 <div className="pr-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Marketing</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Usados para exibir anúncios relevantes para você (AdSense).</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                 </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
               <button 
                 onClick={handleSavePreferences}
                 className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
               >
                 Salvar Minhas Preferências
               </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 md:hidden"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

      </div>
    </div>
  );
}