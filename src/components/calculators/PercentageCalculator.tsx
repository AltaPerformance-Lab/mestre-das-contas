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
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, ArrowRight
} from "lucide-react";

type HistoricoPercent = {
  data: string;
  tipo: string;
  conta: string;
  resultado: string;
};

export default function PercentageCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES
  const [modo, setModo] = useState("simples"); // simples, reverso, aumento, desconto
  
  // Inputs genéricos (ValA e ValB)
  const [valA, setValA] = useState("");
  const [valB, setValB] = useState("");
  
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoPercent[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Porcentagem_MestreDasContas",
  });

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { window.open(`https://mestredascontas.com.br/financeiro/porcentagem`, '_blank'); return; }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("modo", resultado.modo);
            params.set("a", resultado.rawA.toString());
            params.set("b", resultado.rawB.toString());
        }
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { reactToPrintFn(); }
    else if (action === "embed") { setShowEmbedModal(true); }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Porcentagem"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                    <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600"><Percent size={18} /></div>
                    Calculadora de Porcentagem
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 hover:border-indigo-200 px-2 py-1 rounded-full transition-all group">
                          <Code2 size={14} className="text-slate-400 group-hover:text-indigo-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              
              <Tabs defaultValue="simples" value={modo} onValueChange={(v) => { setModo(v); setResultado(null); }} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 h-auto bg-slate-100 p-1">
                  <TabsTrigger value="simples" className="text-xs md:text-sm py-2">% de Valor</TabsTrigger>
                  <TabsTrigger value="reverso" className="text-xs md:text-sm py-2">Valor é %</TabsTrigger>
                  <TabsTrigger value="variacao" className="text-xs md:text-sm py-2">Variação</TabsTrigger>
                </TabsList>
                
                {/* ÁREA DE INPUTS DINÂMICA */}
                <div className="space-y-6">
                    {modo === "simples" && (
                        <div className="flex flex-col md:flex-row items-center gap-4 text-lg text-slate-700 font-medium justify-center">
                            <span>Quanto é</span>
                            <div className="relative w-24"><Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="20" className="pr-6 text-center font-bold"/><Percent size={14} className="absolute right-2 top-3 text-slate-400"/></div>
                            <span>de</span>
                            <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="500" className="w-32 text-center font-bold"/>
                            <span>?</span>
                        </div>
                    )}

                    {modo === "reverso" && (
                        <div className="flex flex-col md:flex-row items-center gap-4 text-lg text-slate-700 font-medium justify-center">
                            <span>O valor</span>
                            <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="50" className="w-24 text-center font-bold"/>
                            <span>é quantos % de</span>
                            <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="200" className="w-32 text-center font-bold"/>
                            <span>?</span>
                        </div>
                    )}

                    {modo === "variacao" && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Valor Inicial</Label>
                                    <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="100" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Valor Final</Label>
                                    <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="150" />
                                </div>
                            </div>
                            <p className="text-xs text-center text-slate-500">Calcula o aumento ou queda percentual entre dois valores.</p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button onClick={() => calcular()} className="flex-1 bg-indigo-600 hover:bg-indigo-700 h-12 font-bold shadow-lg shadow-indigo-200">Calcular</Button>
                        <Button variant="outline" onClick={limpar} size="icon" className="h-12 w-12 shrink-0"><X className="h-5 w-5" /></Button>
                    </div>
                </div>

                {/* ATALHOS RÁPIDOS NO RODAPÉ DO CARD */}
                <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <Button variant="ghost" onClick={() => setModo("aumento")} className={`text-xs ${modo === 'aumento' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'}`}><TrendingUp size={14} className="mr-1"/> Aumentar %</Button>
                    <Button variant="ghost" onClick={() => setModo("desconto")} className={`text-xs ${modo === 'desconto' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'}`}><TrendingDown size={14} className="mr-1"/> Descontar %</Button>
                </div>
                {(modo === 'aumento' || modo === 'desconto') && (
                     <div className="bg-indigo-50 p-3 rounded-lg mt-2 text-center text-sm text-indigo-800 animate-in fade-in">
                         {modo === 'aumento' ? "Ex: Aumentar 10% de um salário." : "Ex: Calcular preço com 20% de desconto."}
                         <div className="flex gap-2 mt-2 justify-center items-center">
                             <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="Valor (R$)" className="w-28 bg-white h-9"/>
                             <span>{modo === 'aumento' ? '+' : '-'}</span>
                             <div className="relative w-20"><Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="%" className="pr-5 bg-white h-9"/><Percent size={12} className="absolute right-2 top-2.5 text-slate-400"/></div>
                         </div>
                     </div>
                )}

              </Tabs>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Últimos Cálculos</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-medium">{item.conta}</span>
                            <span className="text-[10px] text-slate-400">{item.tipo}</span>
                        </div>
                        <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs">= {item.resultado}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="md:col-span-5 w-full flex flex-col gap-4">
          <Card className={`h-fit w-full transition-all duration-500 border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'} print:bg-white print:border-slate-300`}>
            <CardHeader className="px-5 md:px-6 border-b border-slate-100 bg-white">
              <CardTitle className="text-slate-800 text-lg md:text-xl">Resultado</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-48 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><Calculator size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Preencha os valores para ver o resultado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">{resultado.conta}</p>
                    <p className="text-5xl font-extrabold text-white break-all tracking-tight leading-tight">{resultado.valor}</p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
                      <p className="text-sm text-indigo-800 font-medium">{resultado.detalhe}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BOTÕES */}
          {resultado && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in">
                  <Button variant="outline" onClick={() => handleAction("share")} className="h-12 border-slate-200 hover:bg-blue-50 text-blue-700">
                      {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Abrir</span> : (linkCopiado ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado!</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                  </Button>
                  <Button variant="outline" onClick={() => handleAction("pdf")} className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700">
                      {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> PDF</span> : <span className="flex items-center gap-2"><Download size={18}/> Imprimir</span>}
                  </Button>
              </div>
          )}
        </div>
      </div>

      {/* IMPRESSÃO */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black text-center">
                <h1 className="text-3xl font-bold mb-4">Cálculo de Porcentagem</h1>
                <div className="border p-8 rounded text-4xl font-bold mb-4">{resultado.valor}</div>
                <p className="text-xl">{resultado.conta}</p>
                <p className="text-sm text-slate-500 mt-4">{resultado.detalhe}</p>
                <p className="text-xs mt-8">Gerado por Mestre das Contas</p>
            </div>
        </div>
      )}

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <code className="text-xs font-mono text-blue-300 break-all block bg-slate-900 p-4 rounded mb-4">{`<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Porcentagem"></iframe>`}</code>
                <Button onClick={copiarEmbedCode} className="w-full bg-indigo-600 hover:bg-indigo-700">{embedCopiado ? "Copiado!" : "Copiar Código"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}