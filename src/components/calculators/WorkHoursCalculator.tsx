"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Share2, Printer, History, Code2, CheckCircle2, X, RefreshCcw } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateWorkHoursSimple, type WorkHoursResult } from "@/lib/calculators/work-hours";

interface HistoricoHoras {
  data: string;
  entrada: string;
  saida: string;
  intervalo: string;
  total: string;
}

interface WorkHoursCalculatorProps {
    initialEntrada?: string;
    initialSaida?: string;
    initialIntervalo?: string;
    initialJornada?: string;
    initialResult?: WorkHoursResult | null;
}

export default function WorkHoursCalculator({ 
    initialEntrada = "08:00", 
    initialSaida = "17:00", 
    initialIntervalo = "01:00",
    initialJornada = "08:00",
    initialResult = null
}: WorkHoursCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);
  const [entrada, setEntrada] = useState(initialEntrada);
  const [saida, setSaida] = useState(initialSaida);
  const [intervalo, setIntervalo] = useState(initialIntervalo);
  const [jornada, setJornada] = useState(initialJornada);
  const [resultado, setResultado] = useState<WorkHoursResult | null>(initialResult);
  const [historico, setHistorico] = useState<HistoricoHoras[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Hydrate from URL
  useEffect(() => {
    const e = searchParams.get('entrada');
    const s = searchParams.get('saida');
    const i = searchParams.get('intervalo');
    const j = searchParams.get('jornada');

    if (e) setEntrada(e);
    if (s) setSaida(s);
    if (i) setIntervalo(i);
    if (j) setJornada(j);

    if (e && s) {
        handleCalculate();
    }
  }, [searchParams]);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Horas_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    const salvo = localStorage.getItem("historico_horas");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const res = calculateWorkHoursSimple(entrada, saida, intervalo, jornada);
    setResultado(res);
    trackEvent("calculate_horas", { total: res.horasTrabalhadas });
    if (!isIframe) {
        const novoItem = { data: new Date().toLocaleDateString("pt-BR"), entrada, saida, intervalo, total: res.horasTrabalhadas };
        const novoHistorico = [novoItem, ...historico].slice(0, 5);
        setHistorico(novoHistorico);
        localStorage.setItem("historico_horas", JSON.stringify(novoHistorico));
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                    <CardTitle className="text-xl flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} /></div> 
                        Calcular Horas
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Entrada</Label>
                            <Input type="time" value={entrada} onChange={(e) => setEntrada(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Saída</Label>
                            <Input type="time" value={saida} onChange={(e) => setSaida(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Intervalo</Label>
                            <Input type="time" value={intervalo} onChange={(e) => setIntervalo(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Jornada</Label>
                            <Input type="time" value={jornada} onChange={(e) => setJornada(e.target.value)} className="h-12 dark:bg-slate-800 dark:text-white" />
                        </div>
                    </div>
                    <Button onClick={() => handleCalculate()} className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl">
                        Calcular Totais
                    </Button>
                </CardContent>
            </Card>

            {!isIframe && historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={14} /> Histórico</h4>
                    <div className="space-y-2">
                    {historico.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer" 
                             onClick={() => { setEntrada(item.entrada); setSaida(item.saida); setIntervalo(item.intervalo); }}>
                            <div className="flex flex-col">
                                <span className="text-slate-800 dark:text-slate-200 font-bold">{item.entrada} - {item.saida}</span>
                                <span className="text-[10px] text-slate-400">{item.data}</span>
                            </div>
                            <span className="font-bold text-blue-700 dark:text-blue-400">{item.total}h</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        <div className="lg:col-span-6 h-full">
            <Card className={`h-full border-0 shadow-lg ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
                <CardHeader className="p-6 border-b dark:border-slate-800">
                    <CardTitle className="text-lg font-bold">Resumo das Horas</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {resultado ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-slate-900 p-8 rounded-2xl text-center relative overflow-hidden">
                                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10">Total Trabalhado</span>
                                <div className="text-5xl font-extrabold text-white mt-2 relative z-10">{resultado.horasTrabalhadas}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Saldo</p>
                                    <p className={`text-lg font-bold ${resultado.saldo?.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                                        {resultado.saldo || "00:00"}
                                    </p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Base</p>
                                    <p className="text-lg font-bold">{resultado.jornadaPadrao}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => window.print()} className="flex-1 h-11 font-bold">Imprimir</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 text-center py-20">
                            <Clock size={40} className="opacity-30 mb-4" />
                            <p className="text-sm">Preencha os horários para calcular.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {resultado && (
          <div className="hidden print:block p-8 bg-white text-slate-900">
              <h1 className="text-2xl font-bold border-b-2 border-slate-800 pb-4 mb-8">Registro de Ponto</h1>
              <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 border rounded">
                      <p className="text-xs text-slate-500 font-bold">TOTAL TRABALHADO</p>
                      <p className="text-3xl font-bold">{resultado.horasTrabalhadas}</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
