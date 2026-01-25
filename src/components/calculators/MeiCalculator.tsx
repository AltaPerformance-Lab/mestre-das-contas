"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Briefcase
} from 'lucide-react';
// toBRL dependency removed

export default function MeiCalculator() {
  // Constants for 2026 (Hypothetical/Projected)
  const SALARIO_MINIMO_2026 = 1500.00; // Projection
  const LIMITE_ANUAL = 81000.00;
  
  const [faturamentoMensal, setFaturamentoMensal] = useState('');
  const [atividade, setAtividade] = useState('servicos'); // comercio, industria, servicos, comercio_servicos
  const [mesesTrabalhados, setMesesTrabalhados] = useState(12);

  // Calculate DAS
  const calculateDas = () => {
    const inss = SALARIO_MINIMO_2026 * 0.05;
    let icms = 0;
    let iss = 0;

    if (atividade === 'comercio' || atividade === 'industria') {
      icms = 1.00;
    } else if (atividade === 'servicos') {
      iss = 5.00;
    } else if (atividade === 'comercio_servicos') {
      icms = 1.00;
      iss = 5.00;
    } else if (atividade === 'caminhoneiro') {
       // Caminhoneiro is 12% INSS + ISS/ICMS (Simplifying: Adding both for safety as margin)
       return (SALARIO_MINIMO_2026 * 0.12) + 6.00; 
    }

    return inss + icms + iss;
  };

  const dasValue = calculateDas();
  const limiteProporcional = (LIMITE_ANUAL / 12) * monthsToConsider();
  
  function monthsToConsider() {
      return Math.max(1, Math.min(12, parseInt(mesesTrabalhados.toString()) || 12));
  }

  const faturamentoAtual = parseFloat(faturamentoMensal.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const faturamentoAnualEstimado = faturamentoAtual * monthsToConsider();
  
  const isEstourou = faturamentoAnualEstimado > limiteProporcional;
  const estouroValor = faturamentoAnualEstimado - limiteProporcional;
  const estouroPercentual = (estouroValor / limiteProporcional) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- INPUTS --- */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Atividade */}
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Briefcase size={16} className="text-emerald-500"/> Atividade Principal
            </label>
            <div className="relative">
                <select 
                    value={atividade}
                    onChange={(e) => setAtividade(e.target.value)}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                >
                    <option value="comercio">Comércio ou Indústria</option>
                    <option value="servicos">Prestação de Serviços</option>
                    <option value="comercio_servicos">Comércio + Serviços</option>
                    <option value="caminhoneiro">MEI Caminhoneiro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
            </div>
        </div>

        {/* Meses de Atividade */}
        <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Calendar size={16} className="text-emerald-500"/> Meses Ativos em 2026
            </label>
            <select 
                value={mesesTrabalhados}
                onChange={(e) => setMesesTrabalhados(parseInt(e.target.value))}
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer text-center"
            >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                    <option key={m} value={m}>{m} meses</option>
                ))}
            </select>
        </div>

        {/* Faturamento Médio */}
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
                    className="w-full pl-12 p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xl font-bold text-slate-900 dark:text-white placeholder:text-slate-300 focus:border-emerald-500 focus:ring-0 outline-none transition-all"
                />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pl-1">
                Coloque uma média do que você vende por mês.
            </p>
        </div>

      </div>

      {/* --- RESULTS --- */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700 space-y-8">
          
          {/* DAS Card */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden">
             <div className="absolute left-0 top-0 h-full w-1.5 bg-emerald-500"></div>
             <div className="space-y-1">
                 <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">Valor do DAS Mensal</h3>
                 <p className="text-xs text-slate-400">Vencimento todo dia 20</p>
             </div>
             <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                 {dasValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
             </div>
          </div>

          {/* Limit Analysis */}
          <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Calculator size={20} className="text-emerald-500"/> Análise de Limite 2026
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Limite Permitido ({mesesTrabalhados} meses)</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-300">
                          {limiteProporcional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isEstourou ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'}`}>
                      <p className={`text-xs font-bold uppercase mb-1 ${isEstourou ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          Sua Projeção Anual
                      </p>
                      <p className={`text-xl font-bold ${isEstourou ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
                          {faturamentoAnualEstimado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                  </div>
              </div>

              {/* Status Bar */}
              <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${isEstourou ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (faturamentoAnualEstimado / limiteProporcional) * 100)}%` }}
                  ></div>
              </div>

              {/* Feedback Message */}
              {isEstourou ? (
                  <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl">
                      <AlertTriangle className="text-red-500 shrink-0 mt-0.5" />
                      <div>
                          <h4 className="font-bold text-red-700 dark:text-red-400 text-sm">Cuidado: Limite Excedido!</h4>
                          <p className="text-xs text-red-600 dark:text-red-300 mt-1 leading-relaxed">
                              Você ultrapassou o limite em <strong>{estouroValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>. 
                              {estouroPercentual <= 20 ? 
                                " Como foi menos de 20%, você pagará multa sobre o excedente e será desenquadrado no próximo ano." : 
                                " Como foi mais de 20%, o desenquadramento é retroativo a janeiro! Procure um contador urgente."}
                          </p>
                      </div>
                  </div>
              ) : (
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                          <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Tudo Certo! Dentro do Limite.</h4>
                          <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1 leading-relaxed">
                              Você ainda tem uma margem de <strong>{(limiteProporcional - faturamentoAnualEstimado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> para faturar este ano sem sair do MEI.
                          </p>
                      </div>
                  </div>
              )}

          </div>

      </div>
      
    </div>
  );
}
