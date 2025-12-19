"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Percent, Calculator, TrendingUp, TrendingDown,
  Share2, Printer, History, Code2, CheckCircle2, X, ArrowRight, Link as LinkIcon
} from "lucide-react";

// --- TIPAGEM ---
type HistoricoPercent = {
  data: string;
  tipo: string;
  conta: string;
  resultado: string;
};

type ResultadoPercent = {
    valor: string;
    conta: string;
    detalhe: string;
    modo: string;
    rawA: number;
    rawB: number;
} | null;

export default function PercentageCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES
  const [modo, setModo] = useState("simples"); 
  const [valA, setValA] = useState("");
  const [valB, setValB] = useState("");
  
  const [resultado, setResultado] = useState<ResultadoPercent>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoPercent[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Porcentagem_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_percent");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlModo = searchParams.get("modo");
    const urlA = searchParams.get("a");
    const urlB = searchParams.get("b");

    if (urlA && urlB) {
        setValA(urlA);
        setValB(urlB);
        if (urlModo) setModo(urlModo);
        setTimeout(() => calcular(parseFloat(urlA), parseFloat(urlB), urlModo || "simples"), 200);
    }
  }, [searchParams]);

  const calcular = (a = parseFloat(valA), b = parseFloat(valB), m = modo) => {
    if (isNaN(a) || isNaN(b)) return;

    let res = 0;
    let textoConta = "";
    let textoResultado = "";
    let detalhe = "";

    switch (m) {
        case "simples": // Quanto é X% de Y?
            res = (a / 100) * b;
            textoConta = `${a}% de ${b}`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Cálculo: (${a} ÷ 100) × ${b}`;
            break;
        case "reverso": // X é quantos % de Y?
            res = (a / b) * 100;
            textoConta = `${a} de ${b}`;
            textoResultado = `${res.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
            detalhe = `Cálculo: (${a} ÷ ${b}) × 100`;
            break;
        case "aumento": // Aumentar X% em Y
            res = b * (1 + (a / 100));
            textoConta = `${b} + ${a}%`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Valor do aumento: ${(res - b).toLocaleString("pt-BR")}`;
            break;
        case "desconto": // Descontar X% de Y
            res = b * (1 - (a / 100));
            textoConta = `${b} - ${a}%`;
            textoResultado = res.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
            detalhe = `Valor do desconto: ${(b - res).toLocaleString("pt-BR")}`;
            break;
        case "variacao": // Variação de A para B
            res = ((b - a) / a) * 100;
            textoConta = `De ${a} para ${b}`;
            textoResultado = `${res > 0 ? "+" : ""}${res.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
            detalhe = res > 0 ? "Houve um Aumento" : "Houve uma Queda";
            break;
    }

    const novoResultado = {
        valor: textoResultado,
        conta: textoConta,
        detalhe,
        modo: m,
        rawA: a,
        rawB: b
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoPercent = {
        data: new Date().toLocaleTimeString("pt-BR", {hour: '2-digit', minute:'2-digit'}),
        tipo: formatarModo(res.modo),
        conta: res.conta,
        resultado: res.valor
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_percent", JSON.stringify(novoHistorico));
  };

  const formatarModo = (m: string) => {
      const map: any = { simples: "% de Valor", reverso: "Valor é %", aumento: "Aumento %", desconto: "Desconto %", variacao: "Variação %" };
      return map[m] || m;
  };

  const limpar = () => {
    setValA(""); setValB(""); setResultado(null);
  };

  // --- ACTIONS ---
  const handleShare = (type: "result" | "tool") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let url = baseUrl;

    if (type === "result" && resultado) {
        const params = new URLSearchParams();
        params.set("modo", resultado.modo);
        params.set("a", resultado.rawA.toString());
        params.set("b", resultado.rawB.toString());
        url = `${baseUrl}?${params.toString()}`;
    }

    navigator.clipboard.writeText(url);
    setCopiado(type === "result" ? "result" : "link");
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  // --- FUNÇÃO CORRIGIDA ---
  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Porcentagem"></iframe>`;
    navigator.clipboard.writeText(code);
    setCopiado("embed");
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Percent size={22} strokeWidth={2.5} /></div>
                    Calculadora de Porcentagem
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
            <CardContent className="p-6">
              
              <Tabs defaultValue="simples" value={modo} onValueChange={(v) => { setModo(v); setResultado(null); }} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger value="simples" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">% de Valor</TabsTrigger>
                  <TabsTrigger value="reverso" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Valor é %</TabsTrigger>
                  <TabsTrigger value="variacao" className="text-xs sm:text-sm py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all">Variação</TabsTrigger>
                </TabsList>
                
                {/* ÁREA DE INPUTS DINÂMICA - FOCO NA UX */}
                <div className="space-y-8 min-h-[140px] flex flex-col justify-center">
                    
                    {modo === "simples" && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-lg text-slate-700 font-medium justify-center animate-in fade-in slide-in-from-left-4 duration-300">
                            <span className="text-slate-400">Quanto é</span>
                            <div className="relative w-28">
                                <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="20" className="pr-8 text-center font-bold text-2xl h-14 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                                <Percent size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                            </div>
                            <span className="text-slate-400">de</span>
                            <div className="w-36">
                                <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="500" className="text-center font-bold text-2xl h-14 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                            </div>
                            <span className="text-slate-400 hidden sm:inline">?</span>
                        </div>
                    )}

                    {modo === "reverso" && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-lg text-slate-700 font-medium justify-center animate-in fade-in slide-in-from-left-4 duration-300">
                            <span className="text-slate-400">O valor</span>
                            <div className="w-28">
                                <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="50" className="text-center font-bold text-2xl h-14 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                            </div>
                            <span className="text-slate-400">é quantos % de</span>
                            <div className="w-36">
                                <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="200" className="text-center font-bold text-2xl h-14 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                            </div>
                            <span className="text-slate-400 hidden sm:inline">?</span>
                        </div>
                    )}

                    {modo === "variacao" && (
                        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-500 font-medium ml-1">Valor Inicial</Label>
                                    <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="100" className="h-14 text-xl font-bold bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-500 font-medium ml-1">Valor Final</Label>
                                    <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="150" className="h-14 text-xl font-bold bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" inputMode="decimal"/>
                                </div>
                            </div>
                            <p className="text-xs text-center text-slate-400 font-medium bg-slate-50 py-2 rounded-lg border border-dashed border-slate-200">Calcula o aumento ou queda percentual entre dois números.</p>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-indigo-200 rounded-xl transition-all active:scale-[0.99]">
                            Calcular
                        </Button>
                        <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors" title="Limpar">
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* ATALHOS RÁPIDOS */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider text-center">Outras Funções</p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={() => setModo("aumento")} className={`h-10 text-xs font-medium border-slate-200 ${modo === 'aumento' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <TrendingUp size={14} className="mr-2 text-green-500"/> Aumentar %
                        </Button>
                        <Button variant="outline" onClick={() => setModo("desconto")} className={`h-10 text-xs font-medium border-slate-200 ${modo === 'desconto' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <TrendingDown size={14} className="mr-2 text-red-500"/> Descontar %
                        </Button>
                    </div>
                </div>

                {(modo === 'aumento' || modo === 'desconto') && (
                      <div className="bg-indigo-50 p-4 rounded-xl mt-4 text-center text-sm text-indigo-800 animate-in fade-in slide-in-from-top-2 border border-indigo-100">
                          {modo === 'aumento' ? "Ex: Aumentar 10% de um salário." : "Ex: Calcular preço com 20% de desconto."}
                          <div className="flex gap-2 mt-3 justify-center items-center">
                             <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="Valor (R$)" className="w-32 bg-white h-10 font-bold border-indigo-200 text-center"/>
                             <span className="font-bold text-lg text-indigo-400">{modo === 'aumento' ? '+' : '-'}</span>
                             <div className="relative w-24">
                                <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="%" className="pr-6 bg-white h-10 font-bold border-indigo-200 text-center"/>
                                <Percent size={12} className="absolute right-2 top-3 text-slate-400"/>
                             </div>
                          </div>
                          <Button size="sm" onClick={() => calcular()} className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700">Calcular Rápido</Button>
                      </div>
                )}

              </Tabs>
            </CardContent>
          </Card>

          {/* HISTÓRICO RÁPIDO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                  <History size={14} /> Últimos Cálculos
                </h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer active:bg-slate-100">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{item.conta}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.tipo}</span>
                        </div>
                        <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs tabular-nums">= {item.resultado}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- COLUNA DIREITA: RESULTADOS --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden flex flex-col ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 bg-white shrink-0">
              <CardTitle className="text-slate-800 text-lg font-bold">Resultado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[250px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <div className="text-slate-300"><Calculator size={40} /></div>
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Preencha os valores para ver o resultado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* CARD DESTAQUE */}
                  <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/30 transition-colors duration-500"></div>
                    
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-2">{resultado.conta}</p>
                    <div className="flex items-center justify-center gap-1 relative z-10">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{resultado.valor}</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">Explicação</p>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">{resultado.detalhe}</p>
                  </div>

                  {/* BOTOES DE AÇÃO */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleShare("result")} 
                        className="h-11 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-xs font-bold uppercase tracking-wide"
                      >
                          {copiado === "result" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Resultado</span>}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handlePrint} 
                        className="h-11 border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold uppercase tracking-wide"
                      >
                          <span className="flex items-center gap-2"><Printer size={16}/> Imprimir</span>
                      </Button>
                  </div>
                  
                  <div className="text-center">
                    <button 
                        onClick={() => handleShare("tool")}
                        className="text-xs text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-2 transition-colors"
                    >
                        {copiado === "link" ? "Link da ferramenta copiado!" : "Compartilhar Calculadora"}
                    </button>
                  </div>

                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- LAYOUT DE IMPRESSÃO (ESCONDIDO NA TELA) --- */}
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
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Relatório de Cálculo</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 text-center mb-8">
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Cálculo Realizado</p>
                    <p className="text-2xl text-slate-700 mb-4">{resultado.conta}</p>
                    <div className="w-full h-px bg-slate-200 mb-4"></div>
                    <p className="text-sm text-slate-500 uppercase font-bold mb-2">Resultado</p>
                    <p className="text-5xl font-extrabold text-slate-900">{resultado.valor}</p>
                </div>

                <div className="p-4 border-l-4 border-indigo-600 bg-indigo-50 text-indigo-900 text-sm">
                    <strong>Detalhe da Operação:</strong> {resultado.detalhe}
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm fixed bottom-0 w-full">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Ferramenta disponível em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL DE EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Porcentagem"></iframe>`}
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