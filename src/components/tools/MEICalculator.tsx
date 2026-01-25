"use client";

import { useState, useEffect } from "react";
import { Calculator, ArrowRight, AlertCircle, CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";


// --- DADOS 2026 ---
const SALARIO_MINIMO_2026 = 1621.00;
const TETO_ANUAL = 81000.00;
const TETO_MENSAL_MEDIO = 6750.00;

export default function MEICalculator() {
  // Inputs
  const [atividade, setAtividade] = useState<"comercio" | "servicos" | "ambos">("servicos");
  const [faturamentoAnual, setFaturamentoAnual] = useState<string>("");
  const [faturamentoMensal, setFaturamentoMensal] = useState<string>("");
  const [mesInicio, setMesInicio] = useState<number>(1); // 1 = Janeiro

  // Resultados
  const [valorDAS, setValorDAS] = useState<number>(0);
  const [limiteProporcional, setLimiteProporcional] = useState<number>(TETO_ANUAL);
  const [statusLimite, setStatusLimite] = useState<"ok" | "atencao" | "estourado">("ok");
  const [excesso, setExcesso] = useState<number>(0);

  // --- EFEITO: CÁLCULO AUTOMÁTICO ---
  useEffect(() => {
    calcularDAS();
    calcularLimite();
  }, [atividade, faturamentoAnual, faturamentoMensal, mesInicio]);

  const calcularDAS = () => {
    const inss = SALARIO_MINIMO_2026 * 0.05; // 5% do Salário Mínimo
    let icms = 0;
    let iss = 0;

    if (atividade === "comercio" || atividade === "ambos") icms = 1.00;
    if (atividade === "servicos" || atividade === "ambos") iss = 5.00;

    setValorDAS(inss + icms + iss);
  };

  const calcularLimite = () => {
    // 1. Limite Proporcional
    const mesesAtivos = 12 - mesInicio + 1;
    const tetoProp = mesesAtivos * TETO_MENSAL_MEDIO;
    setLimiteProporcional(tetoProp);

    // 2. Faturamento Estimado
    let faturamentoTotal = parseFloat(faturamentoAnual) || 0;
    if (faturamentoMensal) {
        faturamentoTotal = parseFloat(faturamentoMensal) * 12;
    }

    // 3. Status
    if (faturamentoTotal > tetoProp * 1.2) {
        setStatusLimite("estourado"); // Mais de 20%
        setExcesso(faturamentoTotal - tetoProp);
    } else if (faturamentoTotal > tetoProp) {
        setStatusLimite("atencao"); // Até 20%
        setExcesso(faturamentoTotal - tetoProp);
    } else {
        setStatusLimite("ok");
        setExcesso(0);
    }
  };

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
                <div className="grid grid-cols-3 gap-2">
                    <button 
                        onClick={() => setAtividade("servicos")}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${atividade === "servicos" ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
                    >
                        Serviços
                    </button>
                    <button 
                        onClick={() => setAtividade("comercio")}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${atividade === "comercio" ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
                    >
                        Comércio
                    </button>
                    <button 
                        onClick={() => setAtividade("ambos")}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${atividade === "ambos" ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"}`}
                    >
                        Ambos
                    </button>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Faturamento Anual Estimado (R$)</label>
                <input 
                    type="number" 
                    placeholder="Ex: 50000" 
                    className="w-full text-lg p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-slate-100"
                    value={faturamentoAnual}
                    onChange={(e) => { setFaturamentoAnual(e.target.value); setFaturamentoMensal(""); }}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Ou preencha a média mensal abaixo:
                </p>
                <input 
                    type="number" 
                    placeholder="Média Mensal (Ex: 4000)" 
                    className="w-full text-sm p-2 mt-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-1 focus:ring-blue-400 outline-none dark:text-slate-100"
                    value={faturamentoMensal}
                    onChange={(e) => { setFaturamentoMensal(e.target.value); setFaturamentoAnual(""); }}
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">Mês de Abertura do MEI</label>
                <select 
                    className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-slate-100"
                    value={mesInicio}
                    onChange={(e) => setMesInicio(parseInt(e.target.value))}
                >
                    <option value={1}>Janeiro (Ano Completo)</option>
                    <option value={2}>Fevereiro</option>
                    <option value={3}>Março</option>
                    <option value={4}>Abril</option>
                    <option value={5}>Maio</option>
                    <option value={6}>Junho</option>
                    <option value={7}>Julho</option>
                    <option value={8}>Agosto</option>
                    <option value={9}>Setembro</option>
                    <option value={10}>Outubro</option>
                    <option value={11}>Novembro</option>
                    <option value={12}>Dezembro</option>
                </select>
                {mesInicio > 1 && (
                    <p className="text-xs text-amber-600 font-bold mt-1 flex items-center gap-1">
                        <AlertTriangle size={12}/> Limite proporcional a {12 - mesInicio + 1} meses
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
                    {formatCurrency(valorDAS)}
                </div>
                <div className="space-y-2 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                        <span>INSS (5% Sal. Mín.)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(SALARIO_MINIMO_2026 * 0.05)}</span>
                    </div>
                    {atividade === "comercio" || atividade === "ambos" ? (
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span>ICMS (Estadual)</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">R$ 1,00</span>
                        </div>
                    ) : null}
                    {atividade === "servicos" || atividade === "ambos" ? (
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span>ISS (Municipal)</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">R$ 5,00</span>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* CARD LIMITE */}
            <div className={`p-6 rounded-2xl border shadow-sm relative overflow-hidden transition-colors
                ${statusLimite === "ok" ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800" : 
                  statusLimite === "atencao" ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800" : 
                  "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800"}
            `}>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-1
                    ${statusLimite === "ok" ? "text-emerald-700 dark:text-emerald-400" : 
                      statusLimite === "atencao" ? "text-amber-700 dark:text-amber-400" : 
                      "text-rose-700 dark:text-rose-400"}
                `}>Status do Limite Anual</h3>

                <div className={`text-2xl font-black mb-2 flex items-center gap-2
                    ${statusLimite === "ok" ? "text-emerald-900 dark:text-emerald-300" : 
                      statusLimite === "atencao" ? "text-amber-900 dark:text-amber-300" : 
                      "text-rose-900 dark:text-rose-300"}
                `}>
                    {statusLimite === "ok" && <><CheckCircle2/> Dentro do Limite</>}
                    {statusLimite === "atencao" && <><AlertTriangle/> Excesso &lt; 20%</>}
                    {statusLimite === "estourado" && <><AlertCircle/> Desenquadramento!</>}
                </div>
                
                <div className="text-sm font-medium opacity-80 mb-2">
                    Limite Máximo: {formatCurrency(limiteProporcional)}
                </div>

                {statusLimite === "estourado" && (
                    <div className="bg-white/60 p-3 rounded-lg text-xs font-bold text-rose-800 mt-2">
                        Você ultrapassou o limite em {formatCurrency(excesso)}. O MEI será desenquadrado retroativamente e pagará imposto sobre tudo! Procure um contador urgente.
                    </div>
                )}
                 {statusLimite === "atencao" && (
                    <div className="bg-white/60 p-3 rounded-lg text-xs font-bold text-amber-800 mt-2">
                        Você ultrapassou o limite em {formatCurrency(excesso)}. Você pagará um DAS complementar sobre o excesso no ano que vem, mas continua MEI.
                    </div>
                )}
            </div>

        </div>
      </div>

    </div>
  );
}
