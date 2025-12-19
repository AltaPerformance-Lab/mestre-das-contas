"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, Share2, Printer, History, 
  Code2, CheckCircle2, Link as LinkIcon, X, Scale, Ruler 
} from "lucide-react";

// --- TIPAGEM ---
type HistoricoItem = {
  data: string;
  peso: string;
  altura: string;
  imc: string;
  classificacao: string;
};

type ResultadoIMC = {
    imc: string;
    classificacao: string;
    cor: string; // Classes do Tailwind para cor do texto/borda
    bg: string;  // Classes do Tailwind para cor de fundo
    peso: string;
    altura: string;
} | null;

export default function IMCCalculator() {
  const searchParams = useSearchParams();
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<ResultadoIMC>(null);
  
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  
  // Estado para data (Correção de Hidratação)
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  
  // Configuração de Impressão
  const reactToPrintFn = useReactToPrint({ 
    contentRef,
    documentTitle: "Relatorio_IMC_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const urlPeso = searchParams.get("peso");
    const urlAltura = searchParams.get("altura");
    
    if (urlPeso && urlAltura) {
      setPeso(urlPeso);
      setAltura(urlAltura);
      setTimeout(() => calcular(urlPeso, urlAltura), 100);
    }
    
    const salvo = localStorage.getItem("historico_imc");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, [searchParams]);

  // --- CÁLCULO ---
  const calcular = (p = peso, a = altura) => {
    // Tratamento robusto para vírgula ou ponto
    const pesoNum = parseFloat(p.replace(",", "."));
    
    // Se altura for inteira (ex: 180), divide por 100. Se for decimal (1.80), mantem.
    // Lógica melhorada: se for maior que 3, assume que é cm (ninguém tem 3 metros)
    let alturaNum = parseFloat(a.replace(",", "."));
    if (alturaNum > 3) alturaNum = alturaNum / 100;

    if (!pesoNum || !alturaNum || isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) return;

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = "";
    let cor = ""; // Texto e Borda
    let bg = "";  // Fundo

    if (imc < 18.5) { 
        classificacao = "Abaixo do Peso"; 
        cor = "text-blue-600 border-blue-200"; 
        bg = "bg-blue-50"; 
    }
    else if (imc < 24.9) { 
        classificacao = "Peso Normal"; 
        cor = "text-green-700 border-green-200"; 
        bg = "bg-green-50"; 
    }
    else if (imc < 29.9) { 
        classificacao = "Sobrepeso"; 
        cor = "text-yellow-700 border-yellow-200"; 
        bg = "bg-yellow-50"; 
    }
    else if (imc < 34.9) { 
        classificacao = "Obesidade Grau I"; 
        cor = "text-orange-700 border-orange-200"; 
        bg = "bg-orange-50"; 
    }
    else if (imc < 39.9) { 
        classificacao = "Obesidade Grau II"; 
        cor = "text-red-700 border-red-200"; 
        bg = "bg-red-50"; 
    }
    else { 
        classificacao = "Obesidade Grau III"; 
        cor = "text-red-900 border-red-300"; 
        bg = "bg-red-100"; 
    }

    const novoResultado = { 
        imc: imc.toFixed(2), 
        classificacao, 
        cor, 
        bg,
        peso: pesoNum.toString(), 
        altura: alturaNum.toFixed(2) 
    };
    
    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- HISTÓRICO ---
  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoItem = { 
        data: new Date().toLocaleDateString("pt-BR"), 
        peso: res.peso, 
        altura: res.altura, 
        imc: res.imc, 
        classificacao: res.classificacao 
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_imc", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
      setPeso("");
      setAltura("");
      setResultado(null);
  };

  // --- ACTIONS ---
  const handleAction = (action: string) => {
    if (action === 'pdf') reactToPrintFn();
    if (action === 'embed') setShowEmbedModal(true);
    if (action === 'share') {
        const url = `${window.location.origin}${window.location.pathname}?peso=${peso}&altura=${altura}`;
        navigator.clipboard.writeText(url);
        setCopiado("link");
        setTimeout(() => setCopiado(null), 2000);
    }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/saude/imc?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de IMC"></iframe>`;
    navigator.clipboard.writeText(code);
    setCopiado("embed");
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="w-full font-sans">
      
      {/* GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- COLUNA ESQUERDA: INPUTS --- */}
        <div className="lg:col-span-5 space-y-6 w-full">
            <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 bg-white rounded-2xl overflow-hidden sticky top-24">
            <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-6">
                <div className="flex flex-row items-center justify-between gap-4">
                    <CardTitle className="text-xl flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><HeartPulse size={22} strokeWidth={2.5} /></div>
                        Calcular IMC
                    </CardTitle>
                    {!isIframe && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setShowEmbedModal(true)} 
                            className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg"
                            title="Incorporar no seu site"
                        >
                            <Code2 size={18} />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Peso (kg)</Label>
                        <div className="relative">
                            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                placeholder="Ex: 80" 
                                value={peso} 
                                onChange={e => setPeso(e.target.value)} 
                                type="number" 
                                inputMode="decimal"
                                className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Altura (m ou cm)</Label>
                        <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                placeholder="Ex: 1.80" 
                                value={altura} 
                                onChange={e => setAltura(e.target.value)} 
                                type="number" 
                                inputMode="decimal"
                                className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                    <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white h-14 text-lg font-bold shadow-lg shadow-red-200 rounded-xl transition-all active:scale-[0.99]">
                        Calcular Agora
                    </Button>
                    <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors" title="Limpar dados">
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
            </Card>

            {/* HISTÓRICO RÁPIDO */}
            {!isIframe && historico.length > 0 && !resultado && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                        <History size={14} /> Histórico Recente
                    </h4>
                    <div className="space-y-1">
                        {historico.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer" onClick={() => { setPeso(item.peso); setAltura(item.altura); }}>
                                <span className="text-slate-600 font-medium">{item.peso}kg / {item.altura}m</span>
                                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs tabular-nums">{item.imc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- COLUNA DIREITA: RESULTADO --- */}
        <div className="lg:col-span-7">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 rounded-2xl overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-12 flex flex-col items-center gap-4">
                            <div className="bg-white p-4 rounded-full shadow-sm ring-1 ring-slate-100">
                                <HeartPulse size={48} className="text-slate-300"/>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-slate-600">Sua saúde em foco</p>
                                <p className="text-sm">Preencha peso e altura para ver o resultado.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* CARD DESTAQUE DINÂMICO */}
                            <div className={`p-8 rounded-2xl border-2 text-center relative overflow-hidden transition-colors duration-500 ${resultado.cor} ${resultado.bg}`}>
                                <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Seu Índice de Massa Corporal</p>
                                <div className="text-7xl font-extrabold tracking-tighter mb-4">{resultado.imc}</div>
                                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wide border bg-white/50 backdrop-blur-sm ${resultado.cor}`}>
                                    {resultado.classificacao}
                                </div>
                            </div>

                            {/* DADOS DETALHADOS */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Peso</p>
                                    <p className="text-2xl font-bold text-slate-700">{resultado.peso} <span className="text-sm font-medium text-slate-400">kg</span></p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-1">Altura</p>
                                    <p className="text-2xl font-bold text-slate-700">{resultado.altura} <span className="text-sm font-medium text-slate-400">m</span></p>
                                </div>
                            </div>

                            {/* AÇÕES */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button className="h-12 border-slate-200 hover:bg-blue-50 text-blue-700 font-bold" variant="outline" onClick={() => handleAction("share")}>
                                    {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>}
                                </Button>
                                <Button className="h-12 border-slate-200 hover:bg-slate-100 text-slate-700 font-bold" variant="outline" onClick={() => handleAction("pdf")}>
                                    <span className="flex items-center gap-2"><Printer size={18}/> Baixar PDF</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* --- IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mestre das Contas</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">www.mestredascontas.com.br</p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Relatório de Saúde</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-10 text-center border-4 border-slate-100 rounded-2xl p-8">
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Seu IMC Calculado</p>
                    <p className="text-8xl font-black text-slate-900 mb-4">{resultado.imc}</p>
                    <p className="text-xl font-medium text-slate-600 uppercase tracking-widest">{resultado.classificacao}</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold mb-2">Peso Informado</p>
                        <p className="text-3xl font-bold text-slate-800">{resultado.peso} kg</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold mb-2">Altura Informada</p>
                        <p className="text-3xl font-bold text-slate-800">{resultado.altura} m</p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Acesse essa ferramenta em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Cuide da sua saúde
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/saude/imc?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de IMC"></iframe>`}
                    </code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}