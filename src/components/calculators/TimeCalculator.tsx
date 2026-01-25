"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Clock, Share2, Printer, History, Code2, 
  CheckCircle2, X, AlertTriangle, Moon, Sun, Timer
} from "lucide-react";

type HistoricoPonto = {
  data: string;
  trabalhado: string;
  saldo: string;
  status: "positivo" | "negativo" | "neutro";
};

type ResultadoPonto = {
    totalTrabalhado: string;
    saldo: string;
    status: "positivo" | "negativo" | "neutro";
    horasExtras: boolean;
    atraso: boolean;
    almoco: string;
} | null;

export default function TimeCalculator() {
  const [entrada1, setEntrada1] = useState("");
  const [saida1, setSaida1] = useState("");
  const [entrada2, setEntrada2] = useState("");
  const [saida2, setSaida2] = useState("");
  const [jornada, setJornada] = useState("08:00");
  
  const [resultado, setResultado] = useState<ResultadoPonto>(null);
  const [historico, setHistorico] = useState<HistoricoPonto[]>([]);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ 
      contentRef, 
      documentTitle: "Folha_Ponto_MestreDasContas",
      pageStyle: `@page { size: auto; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  useEffect(() => {
    const salvo = localStorage.getItem("historico_ponto");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, []);

  // Converte "08:30" para minutos (510)
  const timeToMinutes = (time: string) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    return (h * 60) + m;
  };

  // Converte minutos (510) para "08:30"
  const minutesToTime = (mins: number) => {
    const isNegative = mins < 0;
    const absMins = Math.abs(mins);
    const h = Math.floor(absMins / 60);
    const m = absMins % 60;
    return `${isNegative ? "-" : ""}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const calcular = () => {
    if (!entrada1 || !saida1) return;

    const periodo1 = timeToMinutes(saida1) - timeToMinutes(entrada1);
    const periodo2 = (entrada2 && saida2) ? timeToMinutes(saida2) - timeToMinutes(entrada2) : 0;
    
    // Tratamento de virada de noite (ex: entrou 22:00 saiu 05:00)
    const p1Adjusted = periodo1 < 0 ? periodo1 + (24 * 60) : periodo1;
    const p2Adjusted = periodo2 < 0 ? periodo2 + (24 * 60) : periodo2;

    const totalTrabalhadoMins = p1Adjusted + p2Adjusted;
    const jornadaMins = timeToMinutes(jornada);
    
    // Intervalo de Almoço
    let almocoMins = 0;
    if (entrada2 && saida1) {
        almocoMins = timeToMinutes(entrada2) - timeToMinutes(saida1);
        if (almocoMins < 0) almocoMins += (24 * 60);
    }

    const saldoMins = totalTrabalhadoMins - jornadaMins;
    
    // Regra de Tolerância CLT (10 min diários)
    let status: "positivo" | "negativo" | "neutro" = "neutro";
    if (saldoMins > 10) status = "positivo";
    if (saldoMins < -10) status = "negativo";

    const novoRes: ResultadoPonto = {
        totalTrabalhado: minutesToTime(totalTrabalhadoMins),
        saldo: minutesToTime(saldoMins),
        status,
        horasExtras: saldoMins > 0,
        atraso: saldoMins < 0,
        almoco: minutesToTime(almocoMins)
    };

    setResultado(novoRes);

    const novoHist = [{ 
        data: new Date().toLocaleDateString("pt-BR"), 
        trabalhado: novoRes.totalTrabalhado, 
        saldo: novoRes.saldo,
        status: novoRes.status
    }, ...historico].slice(0, 5);
    
    setHistorico(novoHist);
    localStorage.setItem("historico_ponto", JSON.stringify(novoHist));
  };

  const limpar = () => {
      setEntrada1(""); setSaida1(""); setEntrada2(""); setSaida2("");
      setResultado(null);
  };

  const handleShare = () => {
      const code = `<iframe src="https://mestredascontas.com.br/trabalhista/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0"></iframe>`;
      navigator.clipboard.writeText(code);
      setCopiado("embed");
      setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO --- */}
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg shadow-indigo-100/50 dark:shadow-none ring-1 ring-indigo-100 dark:ring-indigo-900 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} strokeWidth={2.5}/></div>
                            Registrar Ponto
                        </CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setShowEmbed(true)} className="text-white hover:bg-white/20 h-8 px-2 rounded-lg">
                            <Code2 size={18} />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Sun size={14} className="text-orange-500"/> Entrada</Label>
                            <Input type="time" value={entrada1} onChange={e => setEntrada1(e.target.value)} className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors text-lg dark:text-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Moon size={14} className="text-slate-400"/> Saída Almoço</Label>
                            <Input type="time" value={saida1} onChange={e => setSaida1(e.target.value)} className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors text-lg dark:text-slate-100" />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Sun size={14} className="text-orange-500"/> Volta Almoço</Label>
                            <Input type="time" value={entrada2} onChange={e => setEntrada2(e.target.value)} className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors text-lg dark:text-slate-100" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-2"><Moon size={14} className="text-slate-400"/> Saída</Label>
                            <Input type="time" value={saida2} onChange={e => setSaida2(e.target.value)} className="h-12 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 transition-colors text-lg dark:text-slate-100" />
                        </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jornada Esperada</Label>
                            <Input type="time" value={jornada} onChange={e => setJornada(e.target.value)} className="h-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 w-full text-center font-mono text-slate-600 dark:text-slate-200" />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button onClick={calcular} className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-14 text-lg font-bold shadow-lg shadow-indigo-200 rounded-xl transition-all active:scale-[0.99]">
                            Calcular Dia
                        </Button>
                        <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl">
                            <X size={20} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* HISTÓRICO */}
            {historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14}/> Últimos Dias</h4>
                    <div className="space-y-1">
                        {historico.map((h, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 py-2">
                                <span className="text-slate-500 dark:text-slate-400">{h.data}</span>
                                <div className="flex gap-4">
                                    <span className="font-mono text-slate-700 dark:text-slate-300">{h.trabalhado}</span>
                                    <span className={`font-bold font-mono w-16 text-right ${h.status === 'positivo' ? 'text-green-600' : h.status === 'negativo' ? 'text-red-600' : 'text-slate-400'}`}>
                                        {h.status === 'positivo' ? '+' : ''}{h.saldo}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="lg:col-span-6">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'} transition-all duration-500`}>
                <CardContent className="p-6 flex flex-col justify-center h-full min-h-[400px]">
                    {!resultado ? (
                        <div className="text-center text-slate-400 flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Timer size={40} className="opacity-30"/>
                            </div>
                            <p className="text-sm font-medium">Preencha os horários para ver o saldo.</p>
                        </div>
                    ) : (
                        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 w-full">
                            
                            {/* Círculo Principal */}
                            <div className="relative w-56 h-56 mx-auto flex flex-col items-center justify-center">
                                <div className={`absolute inset-0 rounded-full border-4 animate-pulse opacity-20 ${resultado.status === 'positivo' ? 'border-green-500 bg-green-50' : resultado.status === 'negativo' ? 'border-red-500 bg-red-50' : 'border-slate-300 bg-slate-50'}`}></div>
                                <div className="z-10 flex flex-col items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Trabalhado</span>
                                    <span className="text-6xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight font-mono">{resultado.totalTrabalhado}</span>
                                    {resultado.almoco !== "00:00" && <span className="text-xs text-slate-400 mt-2 bg-white/50 dark:bg-white/10 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700">Almoço: {resultado.almoco}</span>}
                                </div>
                            </div>

                            {/* Saldo */}
                            <div className={`p-4 rounded-xl border ${resultado.status === 'positivo' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' : resultado.status === 'negativo' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                <p className="text-xs font-bold uppercase mb-1">Saldo do Dia</p>
                                <p className="text-3xl font-extrabold font-mono flex items-center justify-center gap-2">
                                    {resultado.status === 'positivo' && <CheckCircle2 size={24}/>}
                                    {resultado.status === 'negativo' && <AlertTriangle size={24}/>}
                                    {resultado.status === 'positivo' ? '+' : ''}{resultado.saldo}
                                </p>
                                <p className="text-xs opacity-70 mt-1">
                                    {resultado.status === 'positivo' ? 'Crédito no Banco de Horas' : resultado.status === 'negativo' ? 'Débito de horas' : 'Jornada cumprida'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" onClick={handleShare} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 dark:text-slate-200">
                                    {copiado === "embed" ? "Copiado!" : "Compartilhar"}
                                </Button>
                                <Button variant="outline" onClick={reactToPrintFn} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 dark:text-slate-200">
                                    <Printer size={16} className="mr-2"/> Imprimir
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* IMPRESSÃO */}
      {resultado && (
        <div className="hidden print:block" ref={contentRef}>
            <div className="p-8 border-b-2 border-slate-100 mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Registro de Ponto Diário</h1>
                <p className="text-sm text-slate-500">Mestre das Contas - Simulação</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                <div className="p-4 border rounded"><strong>Entrada:</strong> {entrada1}</div>
                <div className="p-4 border rounded"><strong>Saída Almoço:</strong> {saida1}</div>
                <div className="p-4 border rounded"><strong>Volta Almoço:</strong> {entrada2}</div>
                <div className="p-4 border rounded"><strong>Saída:</strong> {saida2}</div>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded border border-slate-200">
                <p className="text-sm text-slate-500 uppercase font-bold">Total Trabalhado</p>
                <p className="text-4xl font-bold text-slate-900 my-2">{resultado.totalTrabalhado}</p>
                <p className={`text-lg font-bold ${resultado.status === 'positivo' ? 'text-green-600' : resultado.status === 'negativo' ? 'text-red-600' : 'text-slate-600'}`}>
                    Saldo: {resultado.status === 'positivo' ? '+' : ''}{resultado.saldo}
                </p>
            </div>
            <p className="text-center text-xs text-slate-400 mt-8">Este documento não tem valor legal oficial.</p>
        </div>
      )}

      {/* EMBED */}
      {showEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbed(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbed(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de Horas Trabalhadas"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                     const code = `<iframe src="https://mestredascontas.com.br/trabalhista/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de Horas Trabalhadas"></iframe>`;
                     navigator.clipboard.writeText(code);
                     setCopiado("embed");
                     setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}