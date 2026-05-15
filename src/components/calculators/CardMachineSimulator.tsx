"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, Calculator, AlertCircle, ArrowDown, Wallet, CirclePercent } from 'lucide-react';
import { trackEvent } from "@/lib/analytics";
import { calculateCardMachine, type CardMachineResult } from "@/lib/calculators/card-machine";

interface CardMachineSimulatorProps {
    initialValue?: number;
    initialMdr?: number;
    initialAnticipation?: number;
    initialInstallments?: string;
    brandName?: string;
    referralUrl?: string;
    extraFees?: { label: string; value: number }[];
    initialResult?: CardMachineResult | null;
}

export default function CardMachineSimulator({ 
    initialValue = 0,
    initialMdr = 3.5, 
    initialAnticipation = 2.5, 
    initialInstallments = "1",
    brandName = "",
    referralUrl = "",
    extraFees = [],
    initialResult = null
}: CardMachineSimulatorProps) {
  const [saleValue, setSaleValue] = useState(initialValue > 0 ? initialValue.toString() : "");
  const [installments, setInstallments] = useState(initialInstallments);
  const [mdr, setMdr] = useState(initialMdr.toString()); 
  const [anticipation, setAnticipation] = useState(initialAnticipation.toString()); 
  const [result, setResult] = useState<CardMachineResult | null>(initialResult);

  useEffect(() => {
    if (saleValue) {
        const total = parseFloat(saleValue.replace(",", ".").replace(/[^0-9.]/g, ""));
        const n = parseInt(installments);
        const mdrVal = parseFloat(mdr.replace(",", ".")) || 0;
        const antVal = parseFloat(anticipation.replace(",", ".")) || 0;
        
        if (total > 0) {
            const res = calculateCardMachine(total, n, mdrVal, antVal);
            setResult(res);
            trackEvent("calculate_maquininha", { valor: total, parcelas: n });
        }
    }
  }, [saleValue, installments, mdr, anticipation]);

  const handleCalculate = () => {
      // Trigger calculation if needed (already handled by useEffect, but for UX)
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 font-sans">
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900">
                <CardHeader className="bg-slate-900 text-white p-6 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <CreditCard size={20}/> {brandName ? `Venda: ${brandName}` : "Dados da Venda"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="dark:text-slate-300">Valor da Venda (R$)</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                            <Input 
                                value={saleValue}
                                onChange={(e) => setSaleValue(e.target.value)}
                                placeholder="1.000,00"
                                className="pl-10 h-14 text-xl font-bold text-indigo-700 dark:text-indigo-300 dark:bg-slate-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="dark:text-slate-300">Número de Parcelas</Label>
                        <Select value={installments} onValueChange={setInstallments}>
                            <SelectTrigger className="h-12 text-lg dark:bg-slate-800 dark:text-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[1,2,3,4,5,6,7,8,9,10,11,12,18].map(n => (
                                    <SelectItem key={n} value={n.toString()}>{n}x {n === 1 ? "(Crédito à Vista)" : ""}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 flex flex-col">
                            <Label className="flex items-center gap-1 text-xs dark:text-slate-400 min-h-[32px]">Taxa MDR (%)</Label>
                            <Input value={mdr} onChange={(e) => setMdr(e.target.value)} className="h-11 dark:bg-slate-800 dark:text-white mt-auto" placeholder="3.5"/>
                        </div>
                        <div className="space-y-2 flex flex-col">
                            <Label className="flex items-center gap-1 text-xs dark:text-slate-400 min-h-[32px]">Taxa Antecipação (%)</Label>
                            <Input value={anticipation} onChange={(e) => setAnticipation(e.target.value)} className="h-11 dark:bg-slate-800 dark:text-white mt-auto" placeholder="2.5"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
            {result ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                <Wallet size={20} className="text-emerald-500"/> Sem Antecipar
                            </h3>
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-slate-900 dark:text-white">
                                    {result.totalLiquidNoAnticipation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <p className="text-xs text-slate-500">Valor líquido total</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Recebe:</span>
                                    <span className="font-bold">{result.installments}x {result.liquidInstallment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between text-red-500 font-medium">
                                    <span>Taxas:</span>
                                    <span>- {result.totalFeesNoAnticipation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-50 dark:bg-indigo-950 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm relative overflow-hidden">
                            <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
                                <DollarSign size={20} className="text-indigo-600"/> Antecipar Tudo (Hoje)
                            </h3>
                            <div className="space-y-1">
                                <p className="text-3xl font-black text-indigo-700 dark:text-indigo-300">
                                    {result.liquidTotalAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                                <p className="text-xs text-indigo-600/80 dark:text-indigo-300/80">Cai amanhã na conta</p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-indigo-200/50 space-y-2 text-sm">
                                <div className="flex justify-between text-indigo-800 dark:text-indigo-200">
                                    <span>Custo Total:</span>
                                    <span className="font-bold text-red-600">- {result.totalFeesAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>


                    
                    {extraFees && extraFees.length > 0 && (
                        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Custos Extras de Adesão</p>
                            {extraFees.map((fee, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-slate-600 dark:text-slate-400">{fee.label}</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{fee.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-5 border border-amber-100 dark:border-amber-900/40 flex gap-4 items-start">
                        <div className="bg-amber-100 p-2 rounded-full text-amber-700"><AlertCircle size={24}/></div>
                        <div>
                            <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-1">Cuidado com o Lucro!</h4>
                            <p className="text-sm text-amber-800 dark:text-amber-400 leading-relaxed">
                                Antecipando, você paga <strong>{result.feePercentage.toFixed(2)}%</strong> em taxas. Verifique sua margem!
                            </p>
                        </div>
                    </div>

                    {referralUrl && (
                        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-indigo-600 dark:to-blue-600 p-6 rounded-2xl shadow-xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="space-y-1 text-center sm:text-left">
                                <h4 className="font-bold text-lg">Gostou das taxas da {brandName}?</h4>
                                <p className="text-sm text-indigo-100/80">Garanta sua maquininha com desconto exclusivo pelo nosso link.</p>
                            </div>
                            <Button 
                                onClick={() => {
                                    trackEvent("referral_click", { brand: brandName });
                                    window.open(referralUrl, "_blank");
                                }}
                                className="bg-white text-indigo-900 hover:bg-indigo-50 font-black px-8 h-12 rounded-xl shadow-lg shadow-black/20 shrink-0"
                            >
                                PEDIR AGORA
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 min-h-[300px]">
                    <Calculator size={48} className="mb-4 opacity-50"/>
                    <h3 className="text-lg font-medium text-slate-600">Simulador de Taxas</h3>
                    <p className="text-sm">Preencha os dados ao lado para simular.</p>
                </div>
            )}
        </div>
    </div>
  );
}
