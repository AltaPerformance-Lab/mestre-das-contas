"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { historicalIndices } from "@/data/indices-historicos";
import { TrendingUp, Calculator, AlertTriangle, ArrowRight, Calendar, BarChart3, Info, Share2, Printer, CheckCircle2 } from 'lucide-react';
import { trackEvent } from "@/lib/analytics";
import { calculateRent, type RentResult } from "@/lib/calculators/rent";

interface RentCalculatorProps {
    initialValue?: number;
    initialMonth?: string;
    initialIndex?: string;
    initialResult?: RentResult | null;
}

export default function RentCalculator({ 
    initialValue = 0, 
    initialMonth = "", 
    initialIndex = "ipca",
    initialResult = null
}: RentCalculatorProps) {
  const [currentRent, setCurrentRent] = useState(initialValue > 0 ? initialValue.toString() : "");
  const [anniversaryMonth, setAnniversaryMonth] = useState(initialMonth);
  const [indexType, setIndexType] = useState(initialIndex);
  const [result, setResult] = useState<RentResult | null>(initialResult);
  const [copiado, setCopiado] = useState(false);

  // Carregar dados salvos no localStorage ao montar o componente
  useEffect(() => {
    try {
      const savedRent = localStorage.getItem("rent_calc_current_rent");
      const savedMonth = localStorage.getItem("rent_calc_anniversary_month");
      const savedIndex = localStorage.getItem("rent_calc_index_type");

      if (savedRent) setCurrentRent(savedRent);
      if (savedMonth) setAnniversaryMonth(savedMonth);
      if (savedIndex) setIndexType(savedIndex);
    } catch (e) {
      console.warn("Erro ao acessar localStorage:", e);
    }
  }, []);

  // Salvar alterações no localStorage
  useEffect(() => {
    try {
      if (currentRent) {
        localStorage.setItem("rent_calc_current_rent", currentRent);
      } else {
        localStorage.removeItem("rent_calc_current_rent");
      }
      
      if (anniversaryMonth) {
        localStorage.setItem("rent_calc_anniversary_month", anniversaryMonth);
      } else {
        localStorage.removeItem("rent_calc_anniversary_month");
      }
      
      localStorage.setItem("rent_calc_index_type", indexType);
    } catch (e) {
      console.warn("Erro ao salvar no localStorage:", e);
    }
  }, [currentRent, anniversaryMonth, indexType]);

  useEffect(() => {
    const rentValue = parseFloat(currentRent) || 0;
    if (rentValue > 0 && anniversaryMonth) {
        const res = calculateRent(rentValue, anniversaryMonth, indexType);
        setResult(res);
        trackEvent("calculate_aluguel", { valor_antigo: rentValue, novo_valor: res?.newRent, indice: indexType });
    } else {
        setResult(null);
    }
  }, [currentRent, anniversaryMonth, indexType]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans">
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-900 text-white p-6 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-lg"><Calculator size={20}/> Dados do Contrato</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Valor Atual do Aluguel (R$)</Label>
                        <Input 
                            value={currentRent}
                            onChange={(e) => setCurrentRent(e.target.value)}
                            placeholder="Ex: 2500,00"
                            className="h-12 text-lg font-bold dark:bg-slate-800 dark:text-white"
                            type="number"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Mês de Aniversário (Reajuste)</Label>
                        <Select value={anniversaryMonth} onValueChange={setAnniversaryMonth}>
                            <SelectTrigger className="h-12 text-lg dark:bg-slate-800 dark:text-white">
                                <SelectValue placeholder="Selecione o mês" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800">
                                {historicalIndices.slice(0, 12).map((m) => (
                                    <SelectItem key={m.date} value={m.date}>{m.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label className="dark:text-slate-200">Índice do Contrato</Label>
                        <Select value={indexType} onValueChange={setIndexType}>
                            <SelectTrigger className="h-12 text-lg dark:bg-slate-800 dark:text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800">
                                <SelectItem value="ipca">IPCA (Inflação Oficial)</SelectItem>
                                <SelectItem value="igpm">IGP-M (Inflação do Aluguel)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
            {result ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
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

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2 flex items-center gap-1"><BarChart3 size={14}/> Índice Aplicado ({result.indexUsed})</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{result.rate.toFixed(2)}%</p>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-5 rounded-xl border border-amber-100 dark:border-amber-900/50">
                            <p className="text-xs text-amber-700 dark:text-amber-500 font-bold uppercase mb-2 flex items-center gap-1">Se fosse {result.indexOpposite}...</p>
                            <p className="text-2xl font-bold text-amber-800 dark:text-amber-400">{result.rateOpposite.toFixed(2)}%</p>
                        </div>
                    </div>

                    <Card className="border-0 shadow-md bg-white dark:bg-slate-900 ring-1 ring-slate-100 dark:ring-slate-800">
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
                                        {result.relevantMonths.map((m: any) => (
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
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[300px]">
                    <Calendar size={48} className="mb-4 opacity-50"/>
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">Aguardando Dados</h3>
                    <p className="text-sm">Preencha valor e aniversário para calcular.</p>
                </div>
            )}
        </div>
    </div>
  );
}
