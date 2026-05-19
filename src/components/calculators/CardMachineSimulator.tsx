"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, DollarSign, Calculator, AlertCircle, ArrowDown, Wallet, CirclePercent, ArrowRight, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
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

                    {!brandName && (() => {
                        const parsedValue = parseFloat(saleValue.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
                        const parsedN = parseInt(installments) || 1;
                        const ipRes = parsedValue > 0 ? calculateCardMachine(parsedValue, parsedN, 3.15, 8.90) : null;
                        const tRes = parsedValue > 0 ? calculateCardMachine(parsedValue, parsedN, 0.99, 9.90) : null;
                        const psRes = parsedValue > 0 ? calculateCardMachine(parsedValue, parsedN, 3.79, 11.50) : null;

                        return (
                          <div className="space-y-6 mt-6">
                            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                                <Sparkles className="text-indigo-600 dark:text-indigo-400 animate-pulse" size={20} />
                                Compare e Economize Agora (Links Oficiais com Desconto)
                              </h3>
                              <p className="text-xs text-slate-500 mb-4">
                                Simulamos esta mesma venda em nossos parceiros de afiliação. Clique para pedir a sua máquina com desconto exclusivo do Mestre das Contas!
                              </p>
                              
                              <div className="grid gap-4">
                                {/* InfinitePay Card */}
                                {ipRes && (
                                  <div className="bg-gradient-to-r from-slate-50 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 p-4 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-slate-900 dark:text-white">InfinitePay</span>
                                        <span className="text-[10px] bg-slate-900 dark:bg-indigo-600 text-white font-bold px-2 py-0.5 rounded">CNPJ Indicado</span>
                                      </div>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">
                                        MDR: <span className="font-semibold">3.15%</span> | Antecipação: <span className="font-semibold">8.90%</span>
                                      </p>
                                      <p className="text-xs text-indigo-700 dark:text-indigo-300">
                                        Você recebe líquido: <strong className="font-mono">{ipRes.liquidTotalAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                      </p>
                                    </div>
                                    <Button 
                                      onClick={() => {
                                        trackEvent("referral_click", { brand: "InfinitePay" });
                                        window.open("http://buy.infinitepay.io/smart?rid=hdcrepresentacoes", "_blank");
                                      }}
                                      className="w-full sm:w-auto bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
                                    >
                                      Pedir com Desconto <ArrowRight size={12} className="ml-1" />
                                    </Button>
                                  </div>
                                )}

                                {/* Ton Card */}
                                {tRes && (
                                  <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 dark:from-slate-900 dark:to-emerald-950/10 p-4 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-slate-900 dark:text-white">Ton T3 (PromoTon)</span>
                                        <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">CPF Indicado</span>
                                      </div>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">
                                        MDR: <span className="font-semibold">0.99%</span> | Antecipação: <span className="font-semibold">9.90%</span>
                                      </p>
                                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                        Você recebe líquido: <strong className="font-mono">{tRes.liquidTotalAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                      </p>
                                    </div>
                                    <Button 
                                      onClick={() => {
                                        trackEvent("referral_click", { brand: "Ton" });
                                        window.open("https://www.ton.com.br/checkout/#/cart?coupon=MESTREDASCONTAS10&utm_source=affiliate&utm_medium=invite_share&utm_campaign=MESTREDASCONTAS10", "_blank");
                                      }}
                                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg"
                                    >
                                      Pedir com Desconto <ArrowRight size={12} className="ml-1" />
                                    </Button>
                                  </div>
                                )}

                                {/* PagSeguro Card */}
                                {psRes && (
                                  <div className="bg-gradient-to-r from-slate-50 to-yellow-50/20 dark:from-slate-900 dark:to-yellow-950/10 p-4 rounded-xl border border-yellow-100/50 dark:border-yellow-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="font-extrabold text-slate-900 dark:text-white">Moderninha PagBank</span>
                                        <span className="text-[10px] bg-yellow-500 text-slate-950 font-extrabold px-2 py-0.5 rounded">CPF e Vales</span>
                                      </div>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">
                                        MDR: <span className="font-semibold">3.79%</span> | Antecipação: <span className="font-semibold">11.50%</span>
                                      </p>
                                      <p className="text-xs text-yellow-700 dark:text-yellow-600">
                                        Você recebe líquido: <strong className="font-mono">{psRes.liquidTotalAnticipated.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                                      </p>
                                    </div>
                                    <Button 
                                      onClick={() => {
                                        trackEvent("referral_click", { brand: "PagSeguro" });
                                        window.open("https://pagbank.vc/indica-maquininhas-ad67c77f3", "_blank");
                                      }}
                                      className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-lg"
                                    >
                                      Pedir com Desconto <ArrowRight size={12} className="ml-1" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Banner de Atração da Agência Alta Performance Web */}
                            <div className="bg-gradient-to-br from-indigo-950 to-slate-950 p-6 rounded-2xl shadow-xl text-white border border-indigo-500/20 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-500" />
                              
                              <div className="space-y-4 relative z-10">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-extrabold uppercase tracking-widest">
                                  <Sparkles size={12} className="animate-pulse" /> Consultoria Comercial Especializada
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-black text-lg md:text-xl leading-tight">💼 Faturamento acima de R$ 15.000/mês?</h4>
                                  <p className="text-xs text-indigo-100/80 leading-relaxed">
                                    Não pague taxas padrão! Credenciadoras têm tabelas ocultas exclusivas para empresas com maior volume de vendas.
                                  </p>
                                  <p className="text-[11px] text-slate-400 leading-relaxed">
                                    Nosso time de tecnologia e negócios da <strong>Agência Alta Performance Web</strong> intermedia taxas customizadas (a partir de <strong>0,79% no débito</strong> e <strong>7,50% em 12x</strong>) diretamente com as superintendências da Stone, PagBank e InfinitePay, 100% grátis.
                                  </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                                  <Button 
                                    onClick={() => {
                                      trackEvent("agency_whatsapp_click", { location: "simulator_banner" });
                                      const text = "Olá! Vi o simulador de taxas no Mestre das Contas e gostaria de um diagnóstico gratuito da Agência Alta Performance Web para negociar taxas menores para minha empresa.";
                                      window.open(`https://wa.me/5564992514471?text=${encodeURIComponent(text)}`, "_blank");
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-5 h-11 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20"
                                  >
                                    <MessageSquare size={14} /> Falar com Especialista da Agência
                                  </Button>
                                  
                                  <Button 
                                    onClick={() => {
                                      trackEvent("agency_site_click", { location: "simulator_banner" });
                                      window.location.href = "/para-empresas";
                                    }}
                                    className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold text-xs px-4 h-11 rounded-lg flex items-center justify-center gap-1.5"
                                  >
                                    Conhecer Serviços da Agência <ExternalLink size={12} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                    })()}

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
