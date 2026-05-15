"use client";

import { useState, useEffect } from "react";
import { Calculator, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { calculateMei, MeiResult, MEI_CONSTANTS } from "@/lib/calculators/mei";

interface MEICalculatorProps {
  initialFaturamento?: number;
  initialAtividade?: string;
  initialMeses?: number;
  initialResult?: MeiResult | null;
}

export default function MEICalculator({
  initialFaturamento = 0,
  initialAtividade = "servicos",
  initialMeses = 12,
  initialResult = null
}: MEICalculatorProps) {
  // Inputs
  const [atividade, setAtividade] = useState<string>(initialAtividade);
  const [faturamentoMensal, setFaturamentoMensal] = useState<string>(initialFaturamento > 0 ? (initialFaturamento / initialMeses).toString() : "");
  const [mesesTrabalhados, setMesesTrabalhados] = useState<number>(initialMeses);

  // Resultados
  const [result, setResult] = useState<MeiResult | null>(initialResult);

  // --- EFEITO: CÁLCULO AUTOMÁTICO ---
  useEffect(() => {
    const faturamentoNum = parseFloat(faturamentoMensal) || 0;
    if (faturamentoNum > 0) {
      const newResult = calculateMei(faturamentoNum, atividade, mesesTrabalhados);
      setResult(newResult);
    } else {
        setResult(null);
    }
  }, [atividade, faturamentoMensal, mesesTrabalhados]);

  // Helper para moeda
  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="flex flex-col gap-6">
      
      {/* --- BOX DE ENTRADA --- */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Lado Esquerdo: Inputs */}
        <div className="flex flex-col gap-4">
            
            <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Tipo de Atividade</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                        { id: "servicos", label: "Serviços" },
                        { id: "comercio", label: "Comércio" },
                        { id: "comercio_servicos", label: "Ambos" },
                        { id: "caminhoneiro", label: "Caminhoneiro" }
                    ].map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => setAtividade(item.id)}
                            className={`p-2 rounded-lg border text-[10px] font-bold transition-all ${atividade === item.id ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Faturamento Mensal (R$)</label>
                <input 
                    type="number" 
                    placeholder="Média Mensal (Ex: 4000)" 
                    className="w-full text-lg p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-slate-100"
                    value={faturamentoMensal}
                    onChange={(e) => setFaturamentoMensal(e.target.value)}
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2">
                    Informe a média que você recebe por mês.
                </p>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Meses Ativos no Ano</label>
                <input 
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={mesesTrabalhados}
                    onChange={(e) => setMesesTrabalhados(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
                    <span>1 mês</span>
                    <span className="text-blue-600">{mesesTrabalhados} meses</span>
                    <span>12 meses</span>
                </div>
                {mesesTrabalhados < 12 && (
                    <p className="text-xs text-amber-600 font-bold mt-1 flex items-center gap-1">
                        <AlertTriangle size={12}/> Limite proporcional ativado
                    </p>
                )}
            </div>

        </div>

        {/* Lado Direito: Resultados */}
        <div className="flex flex-col gap-4">
            
            {/* CARD DAS */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Calculator size={80} className="text-blue-900 dark:text-blue-500"/>
                </div>
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Valor do DAS Mensal</h3>
                <div className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">
                    {formatCurrency(result?.dasValue || 0)}
                </div>
                <div className="space-y-2 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                        <span>INSS (Base 2026)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {formatCurrency(atividade === 'caminhoneiro' ? MEI_CONSTANTS.SALARIO_MINIMO_2026 * 0.12 : MEI_CONSTANTS.SALARIO_MINIMO_2026 * 0.05)}
                        </span>
                    </div>
                    {(atividade === "comercio" || atividade === "comercio_servicos") && (
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span>ICMS (Estadual)</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">R$ 1,00</span>
                        </div>
                    )}
                    {(atividade === "servicos" || atividade === "comercio_servicos") && (
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span>ISS (Municipal)</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">R$ 5,00</span>
                        </div>
                    )}
                </div>
            </div>

            {/* CARD LIMITE */}
            <div className={`p-6 rounded-2xl border shadow-sm relative overflow-hidden transition-colors
                ${!result ? "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" : 
                  !result.isEstourou ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : 
                  result.estouroPercentual <= 20 ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800" : 
                  "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800"}
            `}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-1
                    ${!result ? "text-slate-500" : 
                      !result.isEstourou ? "text-emerald-700 dark:text-emerald-400" : 
                      result.estouroPercentual <= 20 ? "text-amber-700 dark:text-amber-400" : 
                      "text-rose-700 dark:text-rose-400"}
                `}>Status do Limite Anual</h3>

                <div className={`text-xl font-black mb-2 flex items-center gap-2
                    ${!result ? "text-slate-400" : 
                      !result.isEstourou ? "text-emerald-900 dark:text-emerald-300" : 
                      result.estouroPercentual <= 20 ? "text-amber-900 dark:text-amber-300" : 
                      "text-rose-900 dark:text-rose-300"}
                `}>
                    {!result && "Aguardando faturamento..."}
                    {result && !result.isEstourou && <><CheckCircle2/> Dentro do Limite</>}
                    {result && result.isEstourou && result.estouroPercentual <= 20 && <><AlertTriangle/> Excesso &lt; 20%</>}
                    {result && result.isEstourou && result.estouroPercentual > 20 && <><AlertCircle/> Desenquadramento!</>}
                </div>
                
                {result && (
                  <>
                    <div className="text-sm font-medium opacity-80 mb-2">
                        Limite Proporcional: {formatCurrency(result.limiteProporcional)}
                    </div>

                    {result.isEstourou && result.estouroPercentual > 20 && (
                        <div className="bg-white/60 dark:bg-white/10 p-3 rounded-lg text-[10px] font-bold text-rose-800 dark:text-rose-300 mt-2">
                            Você ultrapassou o limite em {formatCurrency(result.estouroValor)} ({result.estouroPercentual.toFixed(1)}%). O desenquadramento é retroativo a janeiro. Procure um contador urgente.
                        </div>
                    )}
                    {result.isEstourou && result.estouroPercentual <= 20 && (
                        <div className="bg-white/60 dark:bg-white/10 p-3 rounded-lg text-[10px] font-bold text-amber-800 dark:text-amber-300 mt-2">
                            Você ultrapassou o limite em {formatCurrency(result.estouroValor)} ({result.estouroPercentual.toFixed(1)}%). Você pagará um DAS complementar sobre o excesso, mas continua MEI no ano atual.
                        </div>
                    )}
                  </>
                )}
            </div>

        </div>
      </div>

    </div>
  );
}
