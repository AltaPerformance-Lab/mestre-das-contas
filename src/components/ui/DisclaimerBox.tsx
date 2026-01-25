import { AlertTriangle } from "lucide-react";

export default function DisclaimerBox() {
  return (
    <div className="mt-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4 flex gap-3 items-start text-left print:hidden">
      <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={18} />
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">
          Isenção de Responsabilidade
        </p>
        <p className="text-xs text-amber-800/90 dark:text-amber-200/80 leading-relaxed text-pretty">
          Os cálculos e ferramentas disponibilizados neste site têm caráter estritamente <strong>educativo e informativo</strong>. 
          Eles não substituem aconselhamento profissional (médico, contábil ou jurídico). 
          O <strong>Mestre das Contas</strong> não se responsabiliza por decisões tomadas com base nestes resultados. 
          Sempre consulte um especialista qualificado antes de tomar decisões financeiras ou de saúde importantes.
        </p>
      </div>
    </div>
  );
}