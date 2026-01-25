"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Clock, Share2, Printer, History, Code2, CheckCircle2, X, RefreshCcw
} from "lucide-react";

type HistoricoHoras = {
  data: string;
  entrada: string;
  saida: string;
  intervalo: string;
  total: string;
};

type ResultadoHoras = {
    horasTrabalhadas: string;
    horasExtras: string | null;
    jornadaPadrao: string;
    rawTotalMinutes: number;
} | null;

interface WorkHoursCalculatorProps {
    initialValue?: string;
}

export default function WorkHoursCalculator({ initialValue }: WorkHoursCalculatorProps = {}) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // Estados
  const [entrada, setEntrada] = useState("08:00");
  const [saida, setSaida] = useState("17:00");
  const [intervalo, setIntervalo] = useState("01:00");
  const [jornada, setJornada] = useState("08:00"); // Jornada padrão diária

  const [resultado, setResultado] = useState<ResultadoHoras>(null);

  // Funcionalidades
  const [historico, setHistorico] = useState<HistoricoHoras[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Horas_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_horas");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlEntrada = searchParams.get("entrada");
    const urlSaida = searchParams.get("saida");
    const urlIntervalo = searchParams.get("intervalo");

    if (urlEntrada) setEntrada(urlEntrada);
    if (urlSaida) setSaida(urlSaida);
    if (urlIntervalo) setIntervalo(urlIntervalo);
    
    if (urlEntrada && urlSaida) {
        setTimeout(() => calcular(urlEntrada, urlSaida, urlIntervalo || "01:00"), 100);
    }
  }, [searchParams]);

  // --- CÁLCULO ---
  const timeToMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return (h * 60) + m;
  };

  const minutesToTime = (minutes: number) => {
      const h = Math.floor(Math.abs(minutes) / 60);
      const m = Math.abs(minutes) % 60;
      const sign = minutes < 0 ? "-" : "";
      return `${sign}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const calcular = (pEntrada = entrada, pSaida = saida, pIntervalo = intervalo) => {
    const minEntrada = timeToMinutes(pEntrada);
    const minSaida = timeToMinutes(pSaida);
    const minIntervalo = timeToMinutes(pIntervalo);
    const minJornada = timeToMinutes(jornada);

    let totalTrabalhado = minSaida - minEntrada - minIntervalo;
    
    // Tratamento para virada de noite (ex: 22:00 as 06:00)
    if (minSaida < minEntrada) {
        totalTrabalhado = (minSaida + 1440) - minEntrada - minIntervalo;
    }

    const diffJornada = totalTrabalhado - minJornada;
    
    const novoResultado = {
        horasTrabalhadas: minutesToTime(totalTrabalhado),
        horasExtras: diffJornada !== 0 ? minutesToTime(diffJornada) : null,
        jornadaPadrao: jornada,
        rawTotalMinutes: totalTrabalhado
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(pEntrada, pSaida, pIntervalo, novoResultado.horasTrabalhadas);
  };

  const salvarHistorico = (ent: string, sai: string, int: string, tot: string) => {
    const novoItem: HistoricoHoras = { 
        data: new Date().toLocaleDateString("pt-BR"), 
        entrada: ent, 
        saida: sai, 
        intervalo: int,
        total: tot
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_horas", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setEntrada("08:00");
    setSaida("17:00");
    setIntervalo("01:00");
    setResultado(null);
  };

  const handleShare = (type: "link" | "embed") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/calculos/horas-trabalhadas`, '_blank');
        return;
    }
    if (type === "link") {
        const params = new URLSearchParams();
        params.set("entrada", entrada);
        params.set("saida", saida);
        params.set("intervalo", intervalo);
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/calculos/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Horas"></iframe>`);
    }
    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- COLUNA 1: FORMULÁRIO --- */}
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                <div className="flex flex-row items-center justify-between gap-2">
                    <CardTitle className="text-xl flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} strokeWidth={2.5} /></div> 
                        Calcular Horas
                    </CardTitle>
                    {!isIframe && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setShowEmbedModal(true)} 
                            className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg"
                        >
                            <Code2 size={18} />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 dark:text-slate-300 font-medium">Entrada</Label>
                        <Input 
                            type="time" 
                            value={entrada} 
                            onChange={(e) => setEntrada(e.target.value)} 
                            className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white text-lg" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 dark:text-slate-300 font-medium">Saída</Label>
                        <Input 
                            type="time" 
                            value={saida} 
                            onChange={(e) => setSaida(e.target.value)} 
                            className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white text-lg" 
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 dark:text-slate-300 font-medium">Intervalo</Label>
                        <Input 
                            type="time" 
                            value={intervalo} 
                            onChange={(e) => setIntervalo(e.target.value)} 
                            className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white text-lg" 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 dark:text-slate-300 font-medium">Jornada Esperada</Label>
                        <Input 
                            type="time" 
                            value={jornada} 
                            onChange={(e) => setJornada(e.target.value)} 
                            className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white text-lg" 
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 dark:shadow-none rounded-xl transition-all active:scale-[0.99]">
                        Calcular Totais
                    </Button>
                    <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 bg-white dark:bg-slate-900 rounded-xl transition-colors">
                        <RefreshCcw className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
            </Card>

            {/* HISTÓRICO */}
            {!isIframe && historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico</h4>
                    <div className="space-y-1">
                    {historico.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer active:bg-slate-100 dark:active:bg-slate-700" 
                             onClick={() => { 
                                setEntrada(item.entrada);
                                setSaida(item.saida);
                                setIntervalo(item.intervalo);
                                setTimeout(calcular, 100);
                             }}>
                            <div className="flex flex-col">
                                <span className="text-slate-800 dark:text-slate-200 font-bold">{item.entrada} - {item.saida}</span>
                                <span className="text-[10px] text-slate-400">{item.data}</span>
                            </div>
                            <span className="font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.total}h</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- COLUNA 2: RESULTADO --- */}
        <div className="lg:col-span-6 h-full">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-500 overflow-hidden ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Resumo das Horas</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
                {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                        <Clock size={40} className="opacity-30" />
                    </div>
                    <p className="text-sm font-medium max-w-[200px]">Preencha os horários para calcular sua jornada.</p>
                </div>
                ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                    
                    <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/30 transition-colors duration-500"></div>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10">Total Trabalhado</span>
                        
                        <div className="text-5xl font-extrabold text-white mt-2 tracking-tight relative z-10">
                            {resultado.horasTrabalhadas}
                        </div>
                        <p className="text-slate-400 text-xs mt-2 font-medium">Horas : Minutos</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                             <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Saldo do Dia</p>
                             {resultado.horasExtras && (
                                 <p className={`text-lg font-bold ${resultado.horasExtras.startsWith("-") ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>
                                    {resultado.horasExtras.startsWith("-") ? "" : "+"}{resultado.horasExtras}
                                 </p>
                             )}
                             {!resultado.horasExtras && <p className="text-lg font-bold text-slate-400">00:00</p>}
                        </div>
                         <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                             <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Jornada Base</p>
                             <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{resultado.jornadaPadrao}</p>
                        </div>
                    </div>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                        Entrada: <strong>{entrada}</strong> • Saída: <strong>{saida}</strong> • Intervalo: <strong>{intervalo}</strong>
                    </div>

                    {/* BOTÕES DE AÇÃO */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Compartilhar</span>}
                        </Button>
                        <Button variant="outline" onClick={handlePrint} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            <span className="flex items-center gap-2"><Printer size={16}/> Imprimir</span>
                        </Button>
                    </div>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>

      {/* --- MODAL EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/calculos/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Horas"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/calculos/horas-trabalhadas?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Horas"></iframe>`);
                    setCopiado("embed");
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}

       {/* --- LAYOUT DE IMPRESSÃO --- */}
       {resultado && (
         <div className="hidden print:block">
             <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                 <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                     <div>
                         <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Registro de Ponto</h1>
                         <p className="text-sm text-slate-500 mt-1 font-medium">Mestre das Contas</p>
                     </div>
                     <div className="text-right">
                         <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                             <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Simulação</p>
                         </div>
                         <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                     </div>
                 </div>
 
                 <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                     <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                         <p className="text-xs text-slate-500 uppercase font-bold mb-2">Entrada</p>
                         <p className="text-xl font-bold text-slate-900">{entrada}</p>
                     </div>
                     <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                         <p className="text-xs text-slate-500 uppercase font-bold mb-2">Saída</p>
                         <p className="text-xl font-bold text-slate-900">{saida}</p>
                     </div>
                     <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                         <p className="text-xs text-slate-500 uppercase font-bold mb-2">Intervalo</p>
                         <p className="text-xl font-bold text-slate-900">{intervalo}</p>
                     </div>
                 </div>
 
                 <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden text-center bg-slate-900 text-white p-6">
                     <p className="text-sm text-slate-400 uppercase font-bold mb-2">Total de Horas Trabalhadas</p>
                     <p className="text-6xl font-extrabold tracking-tighter">{resultado.horasTrabalhadas}</p>
                     {resultado.horasExtras && (
                        <p className={`mt-4 text-lg font-bold ${resultado.horasExtras.startsWith("-") ? "text-red-400" : "text-green-400"}`}>
                            {resultado.horasExtras.startsWith("-") ? "" : "Horas Extras: +"}
                            {resultado.horasExtras.startsWith("-") ? "Horas Faltantes: " : ""}
                            {resultado.horasExtras}
                        </p>
                     )}
                 </div>

                 <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                     <div className="text-slate-500 text-xs">
                         Gerado em <strong>mestredascontas.com.br</strong>
                     </div>
                 </div>
             </div>
         </div>
       )}
    </div>
  );
}
