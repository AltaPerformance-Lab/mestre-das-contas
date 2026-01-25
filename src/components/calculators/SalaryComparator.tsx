"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, BarChart3, Users, Share2, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Dados baseados em estimativas PNAD/IBGE (simplificados para UX)
const DISTRIBUTION_TIERS = [
    { name: "E", min: 0, max: 900, label: "Renda Baixa", percent: 28, color: "bg-red-400" },
    { name: "D", min: 900, max: 2800, label: "Média Baixa", percent: 32, color: "bg-orange-400" },
    { name: "C", min: 2800, max: 7100, label: "Classe Média", percent: 25, color: "bg-yellow-400" },
    { name: "B", min: 7100, max: 22000, label: "Média Alta", percent: 12, color: "bg-emerald-400" },
    { name: "A", min: 22000, max: 99999999, label: "Renda Alta", percent: 3, color: "bg-purple-600" },
];

interface Props {
    initialValue?: number;
}

export default function SalaryComparator({ initialValue = 0 }: Props) {
  const [salary, setSalary] = useState(initialValue ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(initialValue) : "");
  const [salaryNum, setSalaryNum] = useState(initialValue);
  const [result, setResult] = useState<{ tier: typeof DISTRIBUTION_TIERS[0], percentile: number } | null>(null);

  // Auto-calculate on mount if initialValue exists
  React.useEffect(() => {
      if (initialValue > 0) {
          calculatePosition(initialValue);
      }
  }, []);

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return { display: "", value: 0 };
    const val = parseFloat(numbers) / 100;
    return {
        display: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val),
        value: val
    };
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatCurrency(e.target.value);
    setSalary(display);
    setSalaryNum(value);
    // Reset result on change ONLY if user is typing, to allow re-calculation visually
    if (result) setResult(null); 
  };

  const calculatePosition = (valOverride?: number) => {
    const val = valOverride !== undefined ? valOverride : salaryNum;
    if (val <= 0) return;

    // Determina a classe
    const tier = DISTRIBUTION_TIERS.find(t => val >= t.min && val < t.max) || DISTRIBUTION_TIERS[DISTRIBUTION_TIERS.length - 1];

    // Calcula percentil "fake" mas plausível baseado na distribuição acumulada
    // Soma os percentuais das classes abaixo
    let cumulative = 0;
    for (const t of DISTRIBUTION_TIERS) {
        if (t.name === tier.name) break;
        cumulative += t.percent;
    }
    
    // Interpolação dentro da classe para não ficar estático
    const range = tier.max === 99999999 ? salaryNum : (tier.max - tier.min);
    const positionInTier = (salaryNum - tier.min) / range;
    // Limita a posição intra-tier a 90% para não pular pra próxima
    const safePosition = Math.min(positionInTier, 0.99); 
    
    const finalPercentile = Math.min(99.9, cumulative + (safePosition * tier.percent));

    setResult({ tier, percentile: finalPercentile });
  };

  const handleShare = () => {
    if (!result) return;
    const text = `Ganho mais que ${result.percentile.toFixed(0)}% dos brasileiros! Descubra sua posição no ranking de renda:`;
    const url = "https://mestredascontas.com.br/financeiro/comparador-salario";
    if (navigator.share) {
        navigator.share({ title: "Comparador de Renda", text, url });
    } else {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert("Link copiado!");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-0 shadow-2xl shadow-indigo-500/10 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Qual seu lugar na fila? 🇧🇷</h2>
            <p className="text-indigo-100 text-sm opacity-90">
                Compare seu salário com a população brasileira (Dados PNAD/IBGE Estimados)
            </p>
        </CardHeader>

        <CardContent className="p-8">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Seu Salário Mensal Bruto</Label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                value={salary}
                                onChange={handleSalaryChange}
                                placeholder="R$ 0,00"
                                className="pl-10 h-12 text-lg font-bold bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-500"
                                inputMode="numeric"
                            />
                        </div>
                        <Button 
                            onClick={() => calculatePosition()}
                            disabled={!salaryNum}
                            className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all"
                        >
                            Comparar
                        </Button>
                    </div>
                </div>

                {/* RESULTADO (Animation Wrapper) */}
                {result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="mt-8 space-y-8"
                    >
                         {/* SCORE CARD */}
                         <div className="text-center bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                            
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">Seu Resultado</p>
                            <h3 className="text-3xl md:text-4xl font-extrabold mb-1">
                                Top {100 - result.percentile < 1 ? "1%" : `${(100 - result.percentile).toFixed(0)}%`} do Brasil
                            </h3>
                            <p className="text-indigo-300 font-medium">
                                Você ganha mais que <strong className="text-white">{result.percentile.toFixed(1)}%</strong> da população.
                            </p>
                            
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-center">
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/10`}>
                                    Classe Social: {result.tier.name} ({result.tier.label})
                                </span>
                            </div>
                         </div>

                         {/* GRÁFICO BARRAS */}
                         <div className="space-y-4">
                             <div className="flex justify-between items-end px-2">
                                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <BarChart3 size={16}/> Distribuição de Renda
                                </h4>
                             </div>
                             
                             <div className="relative h-48 flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2">
                                {DISTRIBUTION_TIERS.map((tier) => {
                                    const isUserTier = result.tier.name === tier.name;
                                    return (
                                        <div key={tier.name} className="relative flex-1 h-full flex flex-col justify-end group">
                                            {/* Tooltip on Hover */}
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                                {tier.label} ({tier.percent}%)
                                            </div>

                                            {/* Bar */}
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${tier.percent * 2.5}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className={`w-full rounded-t-lg relative transition-all duration-300 ${isUserTier ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-200 dark:bg-slate-700'}`}
                                            >
                                                {isUserTier && (
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                                                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Você</span>
                                                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-indigo-600 dark:border-t-indigo-400"></div>
                                                    </div>
                                                )}
                                            </motion.div>
                                            
                                            {/* Label Axis */}
                                            <div className="text-center mt-2 border-t border-slate-100 dark:border-slate-800 pt-1">
                                                <span className={`block font-bold text-xs ${isUserTier ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                                                    {tier.name}
                                                </span>
                                                <span className="text-[9px] text-slate-400 hidden sm:block">
                                                    {tier.percent}%
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                         </div>

                         {/* CTA SHARE */}
                         <Button onClick={handleShare} variant="outline" className="w-full h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold gap-2">
                            <Share2 size={18} />
                            Compartilhar Meu Resultado
                         </Button>

                         <p className="text-[10px] text-center text-slate-400">
                             * Metodologia Simplificada para fins ilustrativos. Faixas de renda baseadas em critérios de mercado e FGV (2024).
                         </p>
                    </motion.div>
                )}

                 {/* EMPTY STATE / TEASER */}
                 {!result && (
                     <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-center">
                         <Users className="mx-auto text-slate-300 mb-3 h-10 w-10"/>
                         <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                             Digite seu salário bruto acima para ver o gráfico comparativo instantaneamente.
                         </p>
                     </div>
                 )}
            </div>
        </CardContent>
      </Card>
      
      {result && (
         <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
             <Link href="/financeiro/reforma-tributaria" className="group flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl hover:border-indigo-500 transition-colors shadow-sm">
                 <div className="bg-green-100 text-green-600 p-3 rounded-full group-hover:scale-110 transition-transform">
                     <DollarSign size={20} />
                 </div>
                 <div className="text-left">
                     <p className="text-xs font-bold text-slate-400 uppercase">Veja também</p>
                     <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors">Como a Reforma Tributária afeta sua classe?</p>
                 </div>
                 <ArrowRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"/>
             </Link>
         </div>
      )}
    </div>
  );
}
