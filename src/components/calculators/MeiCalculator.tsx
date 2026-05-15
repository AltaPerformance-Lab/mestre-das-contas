"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Briefcase,
  Share2,
  Printer
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { calculateMei, type MeiResult } from "@/lib/calculators/mei";

interface MeiCalculatorProps {
    initialFaturamento?: number;
    initialAtividade?: string;
    initialMeses?: number;
    initialResult?: MeiResult | null;
}

export default function MeiCalculator({
    initialFaturamento = 0,
    initialAtividade = "servicos",
    initialMeses = 12,
    initialResult = null
}: MeiCalculatorProps) {
  const [faturamentoMensal, setFaturamentoMensal] = useState(initialFaturamento > 0 ? initialFaturamento.toString() : "");
  const [atividade, setAtividade] = useState(initialAtividade);
  const [mesesTrabalhados, setMesesTrabalhados] = useState(initialMeses);
  const [result, setResult] = useState<MeiResult | null>(initialResult);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const f = parseFloat(faturamentoMensal) || 0;
    const res = calculateMei(f, atividade, mesesTrabalhados);
    setResult(res);
    
    if (f > 0) {
        trackEvent("calculate_mei", { faturamento: f, atividade });
    }
  }, [faturamentoMensal, atividade, mesesTrabalhados]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Briefcase size={16} className="text-emerald-500"/> Atividade Principal
            </label>
            <div className="relative">
                <select 
                    value={atividade}
                    onChange={(e) => setAtividade(e.target.value)}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer dark:text-white"
                >
                    <option value="comercio">Comércio ou Indústria</option>
                    <option value="servicos">Prestação de Serviços</option>
                    <option value="comercio_servicos">Comércio + Serviços</option>
                    <option value="caminhoneiro">MEI Caminhoneiro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Calendar size={16} className="text-emerald-500"/> Meses Ativos em 2026
            </label>
            <select 
                value={mesesTrabalhados}
                onChange={(e) => setMesesTrabalhados(parseInt(e.target.value))}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 appearance-none cursor-pointer text-center dark:text-white"
            >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                    <option key={m} value={m}>{m} meses</option>
                ))}
            </select>
        </div>

        <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-500"/> Média de Faturamento Mensal
            </label>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-emerald-500 transition-colors">R$</span>
                <input 
                    type="number"
                    value={faturamentoMensal}
                    onChange={(e) => setFaturamentoMensal(e.target.value)}
                    placeholder="0,00"
                    className="w-full pl-12 p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white placeholder:text-slate-300 focus:border-emerald-500 outline-none transition-all"
                />
            </div>
        </div>
      </div>

      {result && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
               <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-500"></div>
               <div className="space-y-1">
                   <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Valor do DAS Mensal</h3>
                   <p className="text-xs text-slate-400">Vencimento todo dia 20</p>
               </div>
               <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                   {result.dasValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
               </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Calculator size={20} className="text-emerald-500"/> Análise de Limite 2026
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Limite Permitido ({result.mesesConsiderados} meses)</p>
                        <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
                            {result.limiteProporcional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                    <div className={`p-4 rounded-xl border ${result.isEstourou ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'}`}>
                        <p className={`text-xs font-bold uppercase mb-1 ${result.isEstourou ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            Sua Projeção Anual
                        </p>
                        <p className={`text-xl font-bold ${result.isEstourou ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
                            {result.faturamentoAnualEstimado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                    </div>
                </div>

                <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${result.isEstourou ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, (result.faturamentoAnualEstimado / result.limiteProporcional) * 100)}%` }}
                    ></div>
                </div>

                {result.isEstourou ? (
                    <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Cuidado: Limite Excedido!</h4>
                            <p className="text-xs text-red-600 dark:text-red-300 mt-1 leading-relaxed">
                                Você ultrapassou o limite em <strong>{result.estouroValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>. 
                                {result.estouroPercentual <= 20 ? 
                                  " Como foi menos de 20%, você pagará multa sobre o excedente." : 
                                  " Como foi mais de 20%, o desenquadramento é retroativo a janeiro!"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Tudo Certo! Dentro do Limite.</h4>
                            <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1 leading-relaxed">
                                Você ainda tem uma margem de <strong>{result.margemRestante.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 pt-2">
          <Button variant="outline" onClick={handleShare} className="flex-1 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold gap-2 rounded-xl">
              {copiado ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Share2 size={18} />}
              {copiado ? "Link Copiado" : "Compartilhar"}
          </Button>
          <Button variant="outline" onClick={() => window.print()} className="flex-1 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold gap-2 rounded-xl">
              <Printer size={18} /> Imprimir
          </Button>
      </div>
    </div>
  );
}
