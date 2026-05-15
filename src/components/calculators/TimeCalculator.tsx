"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X, AlertTriangle, Moon, Sun, Timer, Clock, Code2, History, Printer } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateWorkHoursAdvanced, type WorkHoursResult } from "@/lib/calculators/work-hours";

interface HistoricoPonto {
  data: string;
  trabalhado: string;
  saldo: string;
  status: "positivo" | "negativo" | "neutro";
}

interface TimeCalculatorProps {
    initialEntrada1?: string;
    initialSaida1?: string;
    initialEntrada2?: string;
    initialSaida2?: string;
    initialJornada?: string;
    initialResult?: WorkHoursResult | null;
}

export default function TimeCalculator({
    initialEntrada1 = "",
    initialSaida1 = "",
    initialEntrada2 = "",
    initialSaida2 = "",
    initialJornada = "08:00",
    initialResult = null
}: TimeCalculatorProps) {
  const [entrada1, setEntrada1] = useState(initialEntrada1);
  const [saida1, setSaida1] = useState(initialSaida1);
  const [entrada2, setEntrada2] = useState(initialEntrada2);
  const [saida2, setSaida2] = useState(initialSaida2);
  const [jornada, setJornada] = useState(initialJornada);
  
  const [resultado, setResultado] = useState<WorkHoursResult | null>(initialResult);
  const [historico, setHistorico] = useState<HistoricoPonto[]>([]);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Hydrate from URL
  useEffect(() => {
    const e1 = searchParams.get('e1');
    const s1 = searchParams.get('s1');
    const e2 = searchParams.get('e2');
    const s2 = searchParams.get('s2');
    const j = searchParams.get('jornada');

    if (e1) setEntrada1(e1);
    if (s1) setSaida1(s1);
    if (e2) setEntrada2(e2);
    if (s2) setSaida2(s2);
    if (j) setJornada(j);

    if (e1 && s1) {
        handleCalculate();
    }
  }, [searchParams]);

  const reactToPrintFn = useReactToPrint({ 
      contentRef, 
      documentTitle: "Folha_Ponto_MestreDasContas",
      pageStyle: `@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  useEffect(() => {
    const salvo = localStorage.getItem("historico_ponto");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!entrada1 || !saida1) return;

    const res = calculateWorkHoursAdvanced(entrada1, saida1, entrada2, saida2, jornada);
    setResultado(res);
    trackEvent("calculate_ponto", { total: res.horasTrabalhadas, status: res.status });

    const novoHist = [{ 
        data: new Date().toLocaleDateString("pt-BR"), 
        trabalhado: res.horasTrabalhadas, 
        saldo: res.saldo,
        status: res.status
    }, ...historico].slice(0, 5);
    
    setHistorico(novoHist);
    localStorage.setItem("historico_ponto", JSON.stringify(novoHist));
  };

  const limpar = () => {
      setEntrada1(""); setSaida1(""); setEntrada2(""); setSaida2("");
      setResultado(null);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} /></div>
                            Registrar Ponto
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Sun size={14} className="text-orange-500"/> Entrada</Label>
                            <Input type="time" value={entrada1} onChange={e => setEntrada1(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Moon size={14} className="text-slate-400"/> Saída Almoço</Label>
                            <Input type="time" value={saida1} onChange={e => setSaida1(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Sun size={14} className="text-orange-500"/> Volta Almoço</Label>
                            <Input type="time" value={entrada2} onChange={e => setEntrada2(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2"><Moon size={14} className="text-slate-400"/> Saída</Label>
                            <Input type="time" value={saida2} onChange={e => setSaida2(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-400 uppercase">Jornada</Label>
                        <Input type="time" value={jornada} onChange={e => setJornada(e.target.value)} className="h-10 dark:bg-slate-800 dark:text-white text-center" />
                    </div>
                    <Button onClick={() => handleCalculate()} className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 text-lg font-bold rounded-xl">
                        Calcular Dia
                    </Button>
                </CardContent>
            </Card>

            {historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={14}/> Últimos Dias</h4>
                    <div className="space-y-1">
                        {historico.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b dark:border-slate-800 py-2">
                                <span className="text-slate-500">{h.data}</span>
                                <div className="flex gap-4">
                                    <span className="font-mono">{h.trabalhado}</span>
                                    <span className={`font-bold font-mono ${h.status === 'positivo' ? 'text-green-600' : h.status === 'negativo' ? 'text-red-600' : 'text-slate-400'}`}>
                                        {h.status === 'positivo' ? '+' : ''}{h.saldo}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="lg:col-span-6">
            <Card className={`h-full border-0 shadow-lg ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'} min-h-[400px]`}>
                <CardContent className="p-6 flex flex-col justify-center h-full">
                    {resultado ? (
                        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            <div className="relative w-56 h-56 mx-auto flex flex-col items-center justify-center">
                                <div className={`absolute inset-0 rounded-full border-4 opacity-20 ${resultado.status === 'positivo' ? 'border-green-500 bg-green-50' : resultado.status === 'negativo' ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'}`}></div>
                                <div className="z-10 flex flex-col items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase mb-1">Trabalhado</span>
                                    <span className="text-6xl font-extrabold font-mono dark:text-white">{resultado.horasTrabalhadas}</span>
                                    {resultado.almoco !== "00:00" && <span className="text-xs text-slate-400 mt-2">Almoço: {resultado.almoco}</span>}
                                </div>
                            </div>
                            <div className={`p-4 rounded-xl border ${resultado.status === 'positivo' ? 'bg-green-50 border-green-200 text-green-800' : resultado.status === 'negativo' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                                <p className="text-xs font-bold uppercase mb-1">Saldo do Dia</p>
                                <p className="text-3xl font-extrabold font-mono">
                                    {resultado.status === 'positivo' ? '+' : ''}{resultado.saldo}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 flex flex-col items-center">
                            <Timer size={40} className="opacity-30 mb-4"/>
                            <p className="text-sm">Preencha os horários para calcular.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}