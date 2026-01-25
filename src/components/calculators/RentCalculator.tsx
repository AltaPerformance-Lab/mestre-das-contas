"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { historicalIndices } from "@/data/indices-historicos";
import { TrendingUp, Calculator, AlertTriangle, ArrowRight, Calendar, DollarSign, BarChart3, Info } from 'lucide-react';

interface RentCalculatorProps {
    initialIgpm?: number;
    initialIpca?: number;
    periodLabel?: string;
}

export default function RentCalculator({ initialIgpm, initialIpca, periodLabel }: RentCalculatorProps = {}) {
  const [currentRent, setCurrentRent] = useState("");
  const [anniversaryMonth, setAnniversaryMonth] = useState("");
  const [indexType, setIndexType] = useState("ipca"); // ipca ou igpm
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!currentRent || !anniversaryMonth) return;
    
    const rentValue = parseFloat(currentRent.replace(",", ".").replace(/[^0-9.]/g, ""));
    const selectedMonthIndex = historicalIndices.findIndex(m => m.date === anniversaryMonth);
    
    if (selectedMonthIndex === -1 && anniversaryMonth) {
        // Se a data for muito antiga ou futura não mapeada, usar 12 meses recentes padrão
        // (Simplificação: em um app real buscaria API)
        return;
    }

    // Pega os 12 meses anteriores ao aniversário para compor o índice acumulado
    // OBS: O reajuste usa o índice acumulado dos 12 meses ANTERIORES ao mês do aniversário.
    // Ex: Aniversário em Jan/2026 -> Usa índices de Dez/2025 a Jan/2025? Não, Jan/2026 usa Jan/25 a Dez/25.
    
    // Simplificação robusta: Pegar os 12 itens a partir do mês anterior ao selecionado
    // Se selecionou Jan/2026, pegamos Dez/2025 para trás
    
    const startIndex = historicalIndices.findIndex(m => m.date < anniversaryMonth); // Primeiro mês anterior ao aniversário
    if (startIndex === -1) return;

    const relevantMonths = historicalIndices.slice(startIndex, startIndex + 12);
    
    // Cálculo de Acumulado: (1 + i1) * (1 + i2)... - 1
    let accumulatedFactor = 1;
    let accumulatedOpposite = 1; // Para comparar (se escolheu IPCA, calcula IGPM tbm)

    relevantMonths.forEach(m => {
        const val = indexType === 'ipca' ? m.ipca : m.igpm;
        const opp = indexType === 'ipca' ? m.igpm : m.ipca;
        accumulatedFactor *= (1 + val / 100);
        accumulatedOpposite *= (1 + opp / 100);
    });

    const finalRate = (accumulatedFactor - 1) * 100;
    const finalRateOpposite = (accumulatedOpposite - 1) * 100;

    const newRent = rentValue * accumulatedFactor;
    const difference = newRent - rentValue;

    setResult({
        oldRent: rentValue,
        newRent,
        difference,
        rate: finalRate,
        rateOpposite: finalRateOpposite,
        months: relevantMonths,
        indexUsed: indexType.toUpperCase(),
        indexOpposite: indexType === 'ipca' ? 'IGP-M' : 'IPCA'
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans">
        
        {/* INPUTS */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg shadow-blue-100 dark:shadow-none ring-1 ring-blue-50 dark:ring-slate-800 bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2"><Calculator size={20}/> Dados do Contrato</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Valor Atual do Aluguel (R$)</Label>
                        <Input 
                            value={currentRent}
                            onChange={(e) => setCurrentRent(e.target.value)}
                            placeholder="Ex: 2500,00"
                            className="h-12 text-lg font-bold text-slate-700 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                            type="number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Mês de Aniversário (Reajuste)</Label>
                        <Select value={anniversaryMonth} onValueChange={setAnniversaryMonth}>
                            <SelectTrigger className="h-12 text-lg dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                <SelectValue placeholder="Selecione o mês" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                {/* Gerar opções baseadas no histórico disponivel (exceto os 12 ultimos que não tem histórico completo para trás) */}
                                {historicalIndices.slice(0, 12).map((m) => (
                                    <SelectItem key={m.date} value={m.date} className="dark:text-slate-200 focus:dark:bg-slate-700">{m.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Mês em que o contrato completa ano.</p>
                    </div>

                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Índice do Contrato</Label>
                        <Select value={indexType} onValueChange={setIndexType}>
                            <SelectTrigger className="h-12 text-lg dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                <SelectItem value="ipca" className="dark:text-slate-200 focus:dark:bg-slate-700">IPCA (Inflação Oficial)</SelectItem>
                                <SelectItem value="igpm" className="dark:text-slate-200 focus:dark:bg-slate-700">IGP-M (Inflação do Aluguel)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button onClick={calculate} className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg shadow-blue-200 dark:shadow-none rounded-xl">
                        Calcular Novo Aluguel <ArrowRight className="ml-2"/>
                    </Button>
                </CardContent>
            </Card>

        </div>

        {/* RESULTS */}
        <div className="lg:col-span-7 space-y-6">
            {result ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    
                    {/* CARD RESULTADO PRINCIPAL */}
                    <Card className="border-0 shadow-xl shadow-blue-200/50 dark:shadow-none bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp size={120} /></div>
                        <CardContent className="p-8 relative z-10">
                            <p className="text-blue-100 font-medium mb-1 uppercase tracking-wide text-xs">Valor Reajustado ({result.indexUsed})</p>
                            <div className="text-5xl font-black mb-2 tracking-tight">
                                {result.newRent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </div>
                            <div className="flex items-center gap-3 text-sm bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                                <span className="text-emerald-300 font-bold">+{result.difference.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                <span className="w-px h-3 bg-white/20"></span>
                                <span>{result.rate.toFixed(2)}% acumulado</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* CARD COMPARATIVO */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2 flex items-center gap-1"><BarChart3 size={14}/> Índice Aplicado ({result.indexUsed})</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{result.rate.toFixed(2)}%</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Acumulado 12 meses</p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-5"><AlertTriangle size={60} className="text-amber-800 dark:text-amber-500"/></div>
                            <p className="text-xs text-amber-700 dark:text-amber-500 font-bold uppercase mb-2 flex items-center gap-1">Se fosse {result.indexOpposite}...</p>
                            <p className="text-2xl font-bold text-amber-800 dark:text-amber-400">{result.rateOpposite.toFixed(2)}%</p>
                            <p className="text-xs text-amber-700/80 dark:text-amber-500/80 mt-1">Diferença de {(Math.abs(result.rate - result.rateOpposite)).toFixed(2)}%</p>
                        </div>
                    </div>

                    {/* TABELA DE MESES */}
                    <Card className="border-0 shadow-md dark:shadow-none bg-white dark:bg-slate-900 ring-1 ring-slate-100 dark:ring-slate-800">
                        <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
                            <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Memória de Cálculo (12 Meses)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[300px] overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-950 sticky top-0 z-10">
                                        <tr>
                                            <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Mês/Ano</th>
                                            <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400 text-right">{result.indexUsed}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {result.months.map((m: any) => (
                                            <tr key={m.date} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">{m.label}</td>
                                                <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-right font-mono">
                                                    {(result.indexUsed === 'IPCA' ? m.ipca : m.igpm).toFixed(2)}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 flex gap-3 text-sm text-blue-800 dark:text-blue-300">
                        <Info className="shrink-0 mt-0.5" size={18}/>
                        <p>O reajuste é calculado multiplicando os índices mensalmente (Juros Compostos), não apenas somando. Por isso o valor final pode ser ligeiramente maior que a soma simples.</p>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <Calendar size={48} className="mb-4 opacity-50"/>
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">Aguardando Dados</h3>
                    <p className="text-sm max-w-xs mx-auto">Preencha o valor e a data de aniversário ao lado para ver o cálculo detalhado.</p>
                </div>
            )}
        </div>

    </div>
  );
}
