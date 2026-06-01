"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  PiggyBank, Info, Calendar, Percent, 
  Coins, ArrowRight, Smartphone, ShieldCheck, 
  HelpCircle, Sparkles, MessageSquare, ChevronDown,
  Share2, Printer, CheckCircle2
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Helper for Saque Aniversário calculation
export function calculateSaqueAniversario(balance: number) {
  if (balance <= 500) return { percent: 50, additional: 0, value: balance * 0.5 };
  if (balance <= 1000) return { percent: 40, additional: 50, value: balance * 0.4 + 50 };
  if (balance <= 5000) return { percent: 30, additional: 150, value: balance * 0.3 + 150 };
  if (balance <= 10000) return { percent: 20, additional: 650, value: balance * 0.2 + 650 };
  if (balance <= 15000) return { percent: 15, additional: 1150, value: balance * 0.15 + 1150 };
  if (balance <= 20000) return { percent: 10, additional: 1900, value: balance * 0.1 + 1900 };
  return { percent: 5, additional: 2900, value: balance * 0.05 + 2900 };
}

export default function FgtsCalculator() {
  const [balanceInput, setBalanceInput] = useState("5.000,00");
  const [years, setYears] = useState(7);
  const [interestRate, setInterestRate] = useState(1.8); // Monthly standard rate
  const [showResult, setShowResult] = useState(true);
  const [copiado, setCopiado] = useState(false);

  const parsedBalance = parseFloat(balanceInput.replace(/\./g, "").replace(",", ".")) || 0;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Calculate dynamic multi-year projection
  const yearsToSimulate = Array.from({ length: years }, (_, i) => i + 1);
  let currentBalance = parsedBalance;
  let totalLiberado = 0;
  let totalRetido = 0;

  const projections = yearsToSimulate.map((y) => {
    const startingBalance = currentBalance;
    const { value: annualWithdrawal } = calculateSaqueAniversario(startingBalance);
    
    // We assume 4% yield per year (3% standard + TR)
    const remainingBalance = Math.max(0, (startingBalance - annualWithdrawal) * 1.04);
    currentBalance = remainingBalance;

    // Monthly compound discount: PV = FV / (1 + r)^m
    const months = y * 12;
    const monthlyRate = interestRate / 100;
    const pv = annualWithdrawal / Math.pow(1 + monthlyRate, months);
    totalLiberado += pv;
    totalRetido += annualWithdrawal;

    return {
      year: y,
      startingBalance,
      annualWithdrawal,
      pv,
      remainingBalance
    };
  });

  const totalFees = totalRetido - totalLiberado;

  const handleCalculate = () => {
    trackEvent("calculate_fgts", { balance: parsedBalance, years, interestRate });
    setShowResult(true);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* INPUT PANEL */}
      <div className="lg:col-span-5 space-y-6 print:hidden">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="balance" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Saldo Estimado do FGTS
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-extrabold text-sm">R$</span>
              <Input
                id="balance"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                className="pl-11 h-14 text-lg font-black dark:bg-slate-950 dark:border-slate-800"
                placeholder="0,00"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Consulte seu saldo exato no aplicativo oficial do FGTS da Caixa.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Anos para Antecipar: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{years} Anos</span>
              </Label>
            </div>
            <Slider
              value={[years]}
              onValueChange={(val) => setYears(val[0])}
              min={1}
              max={10}
              step={1}
              className="py-4"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1 ano</span>
              <span>5 anos</span>
              <span>10 anos</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Taxa de Juros Mensal Média: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{interestRate.toFixed(2)}%</span>
              </Label>
            </div>
            <Slider
              value={[interestRate]}
              onValueChange={(val) => setInterestRate(val[0])}
              min={1.2}
              max={2.5}
              step={0.1}
              className="py-4"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1.20% (Safra)</span>
              <span>1.80% (Média)</span>
              <span>2.50% (Teto)</span>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={parsedBalance <= 0}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-base rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-95 transition-all mt-4"
          >
            Simular Antecipação Grátis <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* RESULT PANEL */}
      <div className="lg:col-span-7 print:col-span-12">
        {showResult ? (
          <div className="space-y-6">
            {/* PIX VALUE CARD */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-950 p-6 md:p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles size={12} className="animate-pulse" /> Antecipação Liberada (Estimada)
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-indigo-200/80 font-bold block uppercase tracking-wider">Você recebe na conta via PIX</span>
                  <div className="text-4xl md:text-5xl font-black tracking-tight">{formatCurrency(totalLiberado)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-indigo-200/70 font-medium block">Total de Taxas do Banco</span>
                    <span className="font-extrabold text-sm text-rose-200">{formatCurrency(totalFees)}</span>
                  </div>
                  <div>
                    <span className="text-indigo-200/70 font-medium block">Saldo de Saque Retido</span>
                    <span className="font-extrabold text-sm text-indigo-100">{formatCurrency(totalRetido)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INFORMATIVE GUIDE BOX - ZERO LINKS */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 print:hidden">
              <div className="flex items-center gap-2">
                <Smartphone size={20} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  Como habilitar o Saque-Aniversário passo a passo:
                </h4>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-decimal leading-relaxed">
                <li>Baixe o aplicativo oficial do <strong>FGTS</strong> desenvolvido pela Caixa Econômica Federal.</li>
                <li>Faça login com seu CPF e senha cadastrada (ou crie uma nova conta gov.br).</li>
                <li>Na tela principal, toque na opção <strong>"Saque-Aniversário do FGTS"</strong>.</li>
                <li>Selecione a opção para alterar a modalidade de saque de <strong>"Saque-Rescisão"</strong> para <strong>"Saque-Aniversário"</strong>.</li>
                <li>Confirme os termos de opção e pronto! O valor anual estará liberado para saque automático no mês do seu aniversário.</li>
              </ol>
            </div>

            {/* TABELA DE PROJEÇÃO ANUAL */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm uppercase flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-600" /> Detalhamento Ano a Ano (Projeção)
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100/50 dark:bg-slate-800/30 text-slate-500 font-extrabold uppercase">
                    <tr>
                      <th className="px-4 py-3">Ano</th>
                      <th className="px-4 py-3">Saldo Inicial</th>
                      <th className="px-4 py-3">Saque Aniversário</th>
                      <th className="px-4 py-3">Valor Descontado (PIX)</th>
                      <th className="px-4 py-3">Saldo Restante</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {projections.map((p) => (
                      <tr key={p.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{p.year}º Ano</td>
                        <td className="px-4 py-3 font-mono">{formatCurrency(p.startingBalance)}</td>
                        <td className="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400 font-mono">{formatCurrency(p.annualWithdrawal)}</td>
                        <td className="px-4 py-3 text-emerald-600 font-mono font-bold">{formatCurrency(p.pv)}</td>
                        <td className="px-4 py-3 font-mono text-slate-400">{formatCurrency(p.remainingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AÇÕES DE IMPRESSÃO E COMPARTILHAMENTO */}
            <div className="flex flex-wrap gap-4 pt-4 print:hidden">
              <Button 
                variant="outline" 
                onClick={handleShare} 
                className="flex-1 h-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold gap-2 rounded-xl"
              >
                {copiado ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                {copiado ? "Link Copiado" : "Compartilhar"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.print()} 
                className="flex-1 h-12 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold gap-2 rounded-xl"
              >
                <Printer size={18} /> Imprimir / Salvar PDF
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 min-h-[350px]">
            <PiggyBank size={48} className="mb-4 opacity-50 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">Simulador de Saque FGTS</h3>
            <p className="text-sm max-w-sm mt-1 leading-relaxed">
              Insira o saldo estimado do seu Fundo de Garantia e escolha as opções para ver a estimativa do valor que você pode adiantar na hora.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
