"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CreditCard, DollarSign, Calculator, AlertCircle, ArrowDown, ArrowRight, Wallet, Percent } from 'lucide-react';

interface SimulationResult {
    totalSale: number;
    installments: number;
    mdrRate: number;
    anticipationRate: number;
    
    // Sem antecipação (Receber parcelado)
    liquidInstallment: number;
    totalLiquidNoAnticipation: number;
    totalFeesNoAnticipation: number;

    // Com antecipação (Receber agora)
    liquidTotalAnticipated: number;
    totalFeesAnticipated: number;
    
    // Diferença
    difference: number;
}

interface CardMachineSimulatorProps {
    initialMdr?: number;
    initialAnticipation?: number;
    initialInstallments?: string;
    brandName?: string;
}

export default function CardMachineSimulator({ 
    initialMdr, 
    initialAnticipation, 
    initialInstallments = "1",
    brandName 
}: CardMachineSimulatorProps = {}) {
  const [saleValue, setSaleValue] = useState("");
  const [installments, setInstallments] = useState(initialInstallments);
  const [mdr, setMdr] = useState(initialMdr ? initialMdr.toString() : "3.5"); 
  const [anticipation, setAnticipation] = useState(initialAnticipation ? initialAnticipation.toString() : "2.5"); 
  const [result, setResult] = useState<SimulationResult | null>(null);

  // Auto-calculate on mount if props are provided (optional, maybe better to wait for user input)
  // Let's just set the defaults.


  const calculate = () => {
    if(!saleValue) return;

    const total = parseFloat(saleValue.replace(",", ".").replace(/[^0-9.]/g, ""));
    const n = parseInt(installments);
    const mdrRate = parseFloat(mdr.replace(",", ".")) / 100;
    const antRate = parseFloat(anticipation.replace(",", ".")) / 100;

    // 1. Receber Parcelado (Sem antecipação)
    // Desconta apenas o MDR uma vez sobre o total.
    const liquidNoAnticipation = total * (1 - mdrRate);
    const feesNoAnticipation = total * mdrRate;
    const installmentValue = liquidNoAnticipation / n;

    // 2. Receber Agora (Antecipação)
    // Cálculo composto ou simples? Maquininhas variam. Padrão de mercado costuma ser composto mensal.
    // Lógica padrão: Tira o MDR primeiro. Depois, antecipa cada parcela trazendo a valor presente.
    // Valor Presente = Valor Parcela / (1 + taxa)^mês
    
    let liquidAnticipated = 0;
    const rawInstallment = total / n; // Parcela bruta sem MDR
    
    // Aplica MDR primeiro no total (maquininha padrão)
    const totalAfterMdr = total * (1 - mdrRate);
    const baseInstallment = totalAfterMdr / n;

    // Traz cada parcela a valor presente
    for (let i = 1; i <= n; i++) {
        // Taxa de antecipação simples ou composta? Mercado Pago/PagSeguro usam 2.99% ao mês (composto)
        // V = P / (1 + i)^n
        liquidAnticipated += baseInstallment / Math.pow(1 + antRate, i);
    }

    const feesAnticipated = total - liquidAnticipated;

    setResult({
        totalSale: total,
        installments: n,
        mdrRate: mdrRate * 100,
        anticipationRate: antRate * 100,
        
        liquidInstallment: installmentValue,
        totalLiquidNoAnticipation: liquidNoAnticipation,
        totalFeesNoAnticipation: feesNoAnticipation,

        liquidTotalAnticipated: liquidAnticipated,
        totalFeesAnticipated: feesAnticipated,

        difference: liquidNoAnticipation - liquidAnticipated
    });
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans">
        
        {/* INPUTS */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg shadow-indigo-100 dark:shadow-none ring-1 ring-indigo-50 dark:ring-indigo-900 bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-900 text-white p-6 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2"><CreditCard size={20}/> Dados da Venda</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    
                    <div className="space-y-2">
                        <Label>Valor da Venda (R$)</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                            <Input 
                                value={saleValue}
                                onChange={(e) => setSaleValue(e.target.value)}
                                placeholder="1.000,00"
                                className="pl-10 h-14 text-xl font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/20"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Número de Parcelas</Label>
                        <Select value={installments} onValueChange={setInstallments}>
                            <SelectTrigger className="h-12 text-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1x (Crédito à Vista)</SelectItem>
                                <SelectItem value="2">2x</SelectItem>
                                <SelectItem value="3">3x</SelectItem>
                                <SelectItem value="4">4x</SelectItem>
                                <SelectItem value="5">5x</SelectItem>
                                <SelectItem value="6">6x</SelectItem>
                                <SelectItem value="7">7x</SelectItem>
                                <SelectItem value="8">8x</SelectItem>
                                <SelectItem value="9">9x</SelectItem>
                                <SelectItem value="10">10x</SelectItem>
                                <SelectItem value="11">11x</SelectItem>
                                <SelectItem value="12">12x</SelectItem>
                                <SelectItem value="18">18x</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1 text-xs">Taxa MDR (%) <Percent size={10}/></Label>
                            <Input value={mdr} onChange={(e) => setMdr(e.target.value)} className="h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" placeholder="3.5"/>
                            <p className="text-[9px] text-slate-400">Intermediação (Ex: 3.19%)</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1 text-xs">Taxa Antecipação (%) <Percent size={10}/></Label>
                            <Input value={anticipation} onChange={(e) => setAnticipation(e.target.value)} className="h-11 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" placeholder="2.5"/>
                            <p className="text-[9px] text-slate-400">Juros Mensal (Ex: 2.99%)</p>
                        </div>
                    </div>

                    <Button onClick={calculate} className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl transition-all active:scale-95">
                        Simular Taxas <Calculator className="ml-2" size={20}/>
                    </Button>
                </CardContent>
            </Card>

        </div>

        {/* RESULTS */}
        <div className="lg:col-span-7 space-y-6">
            {result ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    
                    {/* CARD VS */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        
                        {/* OPÇÃO 1: RECEBER PARCELADO */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                <Wallet size={20} className="text-emerald-500"/> Sem Antecipar
                            </h3>
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {result.totalLiquidNoAnticipation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <p className="text-xs text-slate-500">Valor líquido total</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Você recebe:</span>
                                    <span className="font-bold">{result.installments}x {result.liquidInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between text-red-500">
                                    <span>Taxas:</span>
                                    <span>- {result.totalFeesNoAnticipation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </div>

                        {/* OPÇÃO 2: ANTECIPAR TUDO */}
                        <div className="bg-indigo-50 dark:bg-indigo-950 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5"><ArrowDown size={80} className="text-indigo-900"/></div>
                            <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2 relative z-10">
                                <DollarSign size={20} className="text-indigo-600"/> Antecipar Tudo (Hoje)
                            </h3>
                            <div className="space-y-1 relative z-10">
                                <p className="text-3xl font-black text-indigo-700 dark:text-indigo-300 tracking-tight">
                                    {result.liquidTotalAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <p className="text-xs text-indigo-600/80 dark:text-indigo-300/80">Cai amanhã na conta</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-indigo-200/50 space-y-2 text-sm relative z-10">
                                <div className="flex justify-between text-indigo-800 dark:text-indigo-200">
                                    <span>Custo da Pressa:</span>
                                    <span className="font-bold text-red-600">- {result.totalFeesAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between text-indigo-800/80 dark:text-indigo-200/80 text-xs">
                                    <span>Perda adicional:</span>
                                    <span>{result.difference.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ALERTA DE LUCRO */}
                    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-5 border border-amber-100 dark:border-amber-900/40 flex gap-4 items-start shadow-sm">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-700"><AlertCircle size={24}/></div>
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-1">Cuidado com o Lucro!</h4>
                            <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                                Se você antecipar, estará pagando <strong>{((result.totalFeesAnticipated / result.totalSale) * 100).toFixed(2)}%</strong> em taxas. 
                                Certifique-se de que sua margem de lucro cobre esse custo, caso contrário você pode estar pagando para trabalhar.
                            </p>
                        </div>
                    </div>

                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <Calculator size={48} className="mb-4 opacity-50"/>
                    <h3 className="text-lg font-medium text-slate-600 mb-1">Simulador de Taxas</h3>
                    <p className="text-sm max-w-xs mx-auto">Preencha valor e parcelas para ver quanto a maquininha vai descontar do seu lucro.</p>
                </div>
            )}
        </div>

    </div>
  );
}
