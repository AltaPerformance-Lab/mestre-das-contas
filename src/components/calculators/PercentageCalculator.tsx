"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { trackEvent } from "@/lib/analytics";
import { calculatePercentage, type PercentageResult } from "@/lib/calculators/percentage";

// --- TIPAGEM ---
type HistoricoPercent = {
  data: string;
  tipo: string;
  conta: string;
  resultado: string;
};

interface PercentageCalculatorProps {
    initialA?: number;
    initialB?: number;
    initialMode?: string;
    initialResult?: PercentageResult | null;
}

export default function PercentageCalculator({
    initialA = 0,
    initialB = 0,
    initialMode = "simples",
    initialResult = null
}: PercentageCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);

  // STATES
  const [modo, setModo] = useState(initialMode); 
  const [valA, setValA] = useState(initialA > 0 ? initialA.toString() : "");
  const [valB, setValB] = useState(initialB > 0 ? initialB.toString() : "");
  
  const [resultado, setResultado] = useState<PercentageResult | null>(initialResult);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoPercent[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Porcentagem_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_percent");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialA > 0 && initialB > 0 && !resultado) {
        handleCalcular(initialA, initialB, initialMode);
    }
  }, [initialA, initialB, initialMode]);

  const handleCalcular = (a = parseFloat(valA), b = parseFloat(valB), m = modo) => {
    const res = calculatePercentage(a, b, m);
    if (res) {
        setResultado(res);
        trackEvent("calculate_porcentagem", { modo: m, valor_a: a, valor_b: b });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: PercentageResult) => {
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

  const handleShare = (type: "result" | "tool") => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/porcentagem`, '_blank');
        return;
    }
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

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Percent size={22} /></div>
                    Calculadora de Porcentagem
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2" title="Incorporar">
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={modo} onValueChange={(v) => { setModo(v); setResultado(null); }} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8 h-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <TabsTrigger value="simples" className="text-xs sm:text-sm py-2.5 rounded-lg">% de Valor</TabsTrigger>
                  <TabsTrigger value="reverso" className="text-xs sm:text-sm py-2.5 rounded-lg">Valor é %</TabsTrigger>
                  <TabsTrigger value="variacao" className="text-xs sm:text-sm py-2.5 rounded-lg">Variação</TabsTrigger>
                </TabsList>
                
                <div className="space-y-8 min-h-[140px] flex flex-col justify-center">
                    {modo === "simples" && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-lg text-slate-700 dark:text-slate-300 font-medium justify-center">
                            <span className="text-slate-400">Quanto é</span>
                            <div className="relative w-28">
                                <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="20" className="pr-8 text-center font-bold text-2xl h-14 dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                                <Percent size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                            </div>
                            <span className="text-slate-400">de</span>
                            <div className="w-36">
                                <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="500" className="text-center font-bold text-2xl h-14 dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                            </div>
                        </div>
                    )}
                    {modo === "reverso" && (
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-lg text-slate-700 dark:text-slate-300 font-medium justify-center">
                            <span className="text-slate-400">O valor</span>
                            <div className="w-28">
                                <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="50" className="text-center font-bold text-2xl h-14 dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                            </div>
                            <span className="text-slate-400">é quantos % de</span>
                            <div className="w-36">
                                <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="200" className="text-center font-bold text-2xl h-14 dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                            </div>
                        </div>
                    )}
                    {modo === "variacao" && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-500 font-medium ml-1">Valor Inicial</Label>
                                    <Input type="number" value={valA} onChange={e=>setValA(e.target.value)} placeholder="100" className="h-14 text-xl font-bold dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-500 font-medium ml-1">Valor Final</Label>
                                    <Input type="number" value={valB} onChange={e=>setValB(e.target.value)} placeholder="150" className="h-14 text-xl font-bold dark:bg-slate-800 dark:text-white" inputMode="decimal"/>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg">Calcular</Button>
                        <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 rounded-xl transition-colors"><X className="h-6 w-6" /></Button>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider text-center">Aumentos e Descontos</p>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={() => setModo("aumento")} className={`h-10 text-xs font-medium ${modo === 'aumento' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}><TrendingUp size={14} className="mr-2 text-green-500"/> Aumentar %</Button>
                        <Button variant="outline" onClick={() => setModo("desconto")} className={`h-10 text-xs font-medium ${modo === 'desconto' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-400'}`}><TrendingDown size={14} className="mr-2 text-red-500"/> Descontar %</Button>
                    </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={14} /> Histórico</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 pb-2 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="font-bold">{item.conta}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.tipo}</span>
                        </div>
                        <span className="font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded text-xs tabular-nums">= {item.resultado}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card className={`h-full w-full border-0 shadow-lg overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0"><CardTitle className="text-lg font-bold">Resumo</CardTitle></CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[250px]">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2"><Calculator size={32} className="opacity-30" /></div>
                  <p className="text-sm font-medium">Preencha os valores ao lado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-2">{resultado.conta}</p>
                    <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{resultado.valor}</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-indigo-100 dark:border-indigo-900 shadow-sm">
                      <p className="text-xs text-slate-400 uppercase font-bold mb-1">Explicação</p>
                      <p className="text-sm font-medium leading-relaxed">{resultado.detalhe}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("result")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">{copiado === "result" ? "Copiado" : "Link"}</Button>
                        <Button variant="outline" onClick={() => { trackEvent("print_porcentagem"); if (reactToPrintFn) reactToPrintFn(); }} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide"><Printer size={16}/> PDF</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* MODAL EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold mb-4">Incorporar</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4"><code className="text-xs font-mono text-blue-300 break-all leading-relaxed">{`<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Porcentagem"></iframe>`}</code></div>
                <Button onClick={() => { navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/porcentagem?embed=true" width="100%" height="600" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Porcentagem"></iframe>`); setCopiado("embed"); setTimeout(() => setCopiado(null), 2000); }} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold h-12 rounded-xl">{copiado === "embed" ? "Copiado!" : "Copiar Código"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}