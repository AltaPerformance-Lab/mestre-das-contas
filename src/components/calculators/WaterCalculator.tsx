"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Droplet, Activity, Share2, Printer, History, Code2, 
  CheckCircle2, X, GlassWater, Link as LinkIcon, ExternalLink 
} from "lucide-react";

// TIPAGEM
type HistoricoAgua = {
  data: string;
  peso: string;
  meta: string;
  atividade: string;
};

type ResultadoAgua = {
    totalLitros: string;
    totalMl: number;
    copos: number;
    garrafas: string;
    rawPeso: number;
    rawAtiv: string;
} | null;

export default function WaterCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES
  const [peso, setPeso] = useState("");
  const [atividade, setAtividade] = useState("sedentario");
  const [resultado, setResultado] = useState<ResultadoAgua>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoAgua[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ 
      contentRef, 
      documentTitle: "Meta_Agua_MestreDasContas",
      pageStyle: `
        @page { size: A5; margin: 10mm; } 
        @media print { body { -webkit-print-color-adjust: exact; } }
      `
  });

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_agua");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlPeso = searchParams.get("peso");
    const urlAtiv = searchParams.get("atividade");

    if (urlPeso) {
        setPeso(urlPeso);
        if (urlAtiv) setAtividade(urlAtiv);
        setTimeout(() => calcular(urlPeso, urlAtiv || "sedentario"), 200);
    }
  }, [searchParams]);

  // CÁLCULO
  const calcular = (p = peso, a = atividade) => {
    const pesoNum = parseFloat(p);
    if (!pesoNum || isNaN(pesoNum)) return;

    let fator = 35; // Base 35ml/kg (OMS)
    if (a === "leve") fator = 40;
    if (a === "moderado") fator = 45;
    if (a === "intenso") fator = 50;

    const totalMl = pesoNum * fator;
    const copos = Math.ceil(totalMl / 250); // Copos de 250ml
    const garrafas = (totalMl / 500).toFixed(1); // Garrafas de 500ml

    const novoRes = {
        totalLitros: (totalMl / 1000).toFixed(2).replace('.', ',') + " L",
        totalMl: totalMl,
        copos,
        garrafas: garrafas.replace('.', ','),
        rawPeso: pesoNum,
        rawAtiv: a
    };

    setResultado(novoRes);
    if (!isIframe) salvarHistorico(novoRes);
  };

  // ACTIONS
  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoAgua = { 
        data: new Date().toLocaleDateString("pt-BR"), 
        peso: `${res.rawPeso}kg`, 
        meta: res.totalLitros,
        atividade: res.rawAtiv
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_agua", JSON.stringify(novoHistorico));
  };

  const handleRestaurarHistorico = (item: HistoricoAgua) => {
      setPeso(item.peso.replace("kg", ""));
      setAtividade(item.atividade);
      setTimeout(() => calcular(item.peso.replace("kg", ""), item.atividade), 100);
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    // BLINDAGEM IFRAME: Joga pro seu site se estiver embarcado
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/saude/agua`, '_blank');
        return;
    }

    if (action === "share") {
        const url = `${window.location.origin}${window.location.pathname}?peso=${peso}&atividade=${atividade}`;
        navigator.clipboard.writeText(url);
        setCopiado("link");
        setTimeout(() => setCopiado(null), 2000);
    } 
    else if (action === "embed") {
        setShowEmbedModal(true);
    }
    else if (action === "pdf") {
        reactToPrintFn();
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg shadow-cyan-100/50 ring-1 ring-cyan-100 w-full overflow-hidden bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6">
                    <div className="flex flex-row items-center justify-between gap-2">
                        <CardTitle className="text-xl flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Droplet size={22} strokeWidth={2.5}/></div>
                            Calcular Hidratação
                        </CardTitle>
                        {!isIframe && (
                            <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2 rounded-lg">
                                <Code2 size={18} />
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Seu Peso (kg)</Label>
                        <div className="relative">
                            <Input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ex: 70" className="h-12 border-slate-200 pl-4 text-lg font-medium" inputMode="decimal"/>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">kg</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Nível de Atividade</Label>
                        <Select value={atividade} onValueChange={setAtividade}>
                            <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sedentario">Sedentário (Pouco exercício)</SelectItem>
                                <SelectItem value="leve">Leve (1-3x por semana)</SelectItem>
                                <SelectItem value="moderado">Moderado (3-5x por semana)</SelectItem>
                                <SelectItem value="intenso">Intenso (Atleta/Trabalho físico)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={() => calcular()} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 h-14 text-lg font-bold shadow-lg shadow-cyan-200 rounded-xl transition-all active:scale-[0.99]">
                        Ver Minha Meta
                    </Button>
                </CardContent>
            </Card>

            {/* HISTÓRICO */}
            {!isIframe && historico.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14}/> Recentes</h4>
                    <div className="space-y-1">
                    {historico.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" onClick={() => handleRestaurarHistorico(h)}>
                            <div className="flex flex-col">
                                <span className="text-slate-900 font-bold">{h.peso}</span>
                                <span className="text-[10px] text-slate-400 capitalize">{h.atividade}</span>
                            </div>
                            <span className="font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded text-xs">{h.meta}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="lg:col-span-6">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 ${resultado ? 'bg-white' : 'bg-slate-50'} transition-all duration-500`}>
                <CardContent className="p-6 flex flex-col justify-center h-full min-h-[400px]">
                    {!resultado ? (
                        <div className="text-center text-slate-400 flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Droplet size={40} className="opacity-30"/>
                            </div>
                            <p className="text-sm font-medium">Preencha seus dados para descobrir a meta ideal.</p>
                        </div>
                    ) : (
                        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 w-full">
                            
                            {/* Círculo Principal */}
                            <div className="relative w-56 h-56 mx-auto flex flex-col items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-4 border-cyan-100 animate-pulse"></div>
                                <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-200"></div>
                                <div className="z-10 flex flex-col items-center">
                                    <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-1">Sua Meta Diária</span>
                                    <span className="text-6xl font-extrabold text-cyan-800 tracking-tight">{resultado.totalLitros}</span>
                                    <span className="text-xs text-slate-400 mt-2 bg-slate-50 px-2 py-1 rounded-full">Baseado na OMS</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-cyan-200 transition-colors">
                                    <div className="flex justify-center mb-2 text-cyan-500"><GlassWater size={24} /></div>
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Em Copos</p>
                                    <p className="text-2xl font-bold text-slate-800">~{resultado.copos}</p>
                                    <p className="text-[10px] text-slate-400">de 250ml</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-cyan-200 transition-colors">
                                    <div className="flex justify-center mb-2 text-cyan-500"><Activity size={24} /></div>
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Em Garrafas</p>
                                    <p className="text-2xl font-bold text-slate-800">~{resultado.garrafas}</p>
                                    <p className="text-[10px] text-slate-400">de 500ml</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" onClick={() => handleAction('share')} className="h-11 border-slate-200 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200">
                                    {isIframe ? <span className="flex gap-2 items-center"><ExternalLink size={16}/> Ver Completo</span> : 
                                    (copiado === "link" ? <span className="flex gap-2 items-center"><CheckCircle2 size={16}/> Copiado</span> : "Compartilhar")}
                                </Button>
                                <Button variant="outline" onClick={() => handleAction('pdf')} className="h-11 border-slate-200 hover:bg-slate-100 hover:text-slate-900">
                                    {isIframe ? <span className="flex gap-2 items-center"><ExternalLink size={16}/> Baixar PDF</span> : 
                                    <span className="flex gap-2 items-center"><Printer size={16}/> Imprimir PDF</span>}
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
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 text-center bg-white">
                <div className="border-b-2 border-slate-100 pb-6 mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-1">Meta de Hidratação</h1>
                    <p className="text-slate-500 text-sm">Personalizado por <strong>Mestre das Contas</strong></p>
                </div>
                
                <div className="border-4 border-cyan-100 rounded-3xl p-10 inline-block mb-8 bg-cyan-50/30">
                    <p className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-2">Objetivo Diário</p>
                    <p className="text-8xl font-extrabold text-cyan-700">{resultado.totalLitros}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-10">
                    <div className="p-4 border rounded-xl text-left">
                        <p className="text-xs text-slate-400 uppercase font-bold">Perfil</p>
                        <p className="text-lg font-bold">{resultado.rawPeso} kg</p>
                    </div>
                    <div className="p-4 border rounded-xl text-left">
                        <p className="text-xs text-slate-400 uppercase font-bold">Atividade</p>
                        <p className="text-lg font-bold capitalize">{resultado.rawAtiv}</p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between text-sm fixed bottom-0 w-full text-slate-400">
                    <div className="flex items-center gap-2">
                        <LinkIcon size={14}/> mestredascontas.com.br
                    </div>
                    <p>{dataAtual}</p>
                </div>
            </div>
        </div>
      )}

      {/* MODAL EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-cyan-300 break-all block">{`<iframe src="https://mestredascontas.com.br/saude/agua?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Água"></iframe>`}</code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/saude/agua?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Água"></iframe>`);
                    setCopiado('embed');
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 h-12 rounded-xl text-white font-bold">
                    {copiado === 'embed' ? "Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}