import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyBadge() {
  return (
    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-sm my-4">
      <div className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full text-emerald-700 dark:text-emerald-400 shrink-0">
        <Lock size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
          Segurança Total: Seus dados ficam no seu dispositivo
        </h4>
        <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 leading-relaxed">
          Nós utilizamos processamento <strong>100% Client-Side</strong>. Isso significa que nenhuma informação (valores, CPFs, senhas) é enviada para nossos servidores. O cálculo acontece diretamente no seu navegador, garantindo privacidade absoluta.
        </p>
      </div>
    </div>
  );
}
