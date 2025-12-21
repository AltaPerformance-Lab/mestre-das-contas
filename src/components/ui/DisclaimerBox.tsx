import { AlertTriangle } from "lucide-react";

export default function DisclaimerBox() {
  return (
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start text-left print:hidden">
      <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
      <div className="space-y-1">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
          Isenção de Responsabilidade
        </p>
        <p className="text-xs text-amber-800/90 leading-relaxed text-pretty">
          Os cálculos realizados nesta ferramenta têm caráter estritamente <strong>educativo e informativo</strong>. 
          Eles não substituem aconselhamento profissional (médico, contábil ou jurídico). 
          O <strong>Mestre das Contas</strong> não se responsabiliza por decisões tomadas com base nestes resultados. 
          Sempre consulte um especialista qualificado antes de tomar decisões financeiras ou de saúde importantes.
        </p>
      </div>
    </div>
  );
}