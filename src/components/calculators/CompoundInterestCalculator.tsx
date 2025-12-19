"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, DollarSign, Coins, CalendarClock, Percent, 
  Share2, Printer, History, Code2, CheckCircle2, Link as LinkIcon, X
} from "lucide-react";

// --- TIPAGEM ---
type HistoricoJuros = {
  data: string;
  total: string;
  investido: string;
  periodo: string;
  juros: string;
};

type ResultadoJuros = {
  total: string;
  investido: string;
  juros: string;
  periodo: string;
  taxa: string;
  rawInicial: number;
  rawMensal: number;
  rawTaxa: number;
  rawTempo: number;
};

export default function CompoundInterestCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // --- STATES DE DADOS ---
  const [inicial, setInicial] = useState("");
  const [inicialValue, setInicialValue] = useState(0);
  
  const [mensal, setMensal] = useState("");
  const [mensalValue, setMensalValue] = useState(0);
  
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  
  const [resultado, setResultado] = useState<ResultadoJuros | null>(null);

  // --- STATES FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoJuros[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  // Estado para data (Correção de Hidratação)
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  
  // Configuração de Impressão
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Simulacao_Juros_Compostos_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // --- FORMATADORES ---
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleInicialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setInicial(display);
    setInicialValue(value);
  };

  const handleMensalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setMensal(display);
    setMensalValue(value);
  };

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_juros");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlInicial = searchParams.get("inicial");
    const urlMensal = searchParams.get("mensal");
    const urlTaxa = searchParams.get("taxa");
    const urlTempo = searchParams.get("tempo");

    if (urlInicial && urlTaxa && urlTempo) {
        const valInicial = parseFloat(urlInicial);
        setInicialValue(valInicial);
        setInicial(formatBRL(valInicial));
        
        if (urlMensal) {
            const valMensal = parseFloat(urlMensal);
            setMensalValue(valMensal);
            setMensal(formatBRL(valMensal));
        }
        
        setTaxa(urlTaxa);
        setTempo(urlTempo);

        setTimeout(() => {
            calcular(valInicial, urlMensal ? parseFloat(urlMensal) : 0, parseFloat(urlTaxa), parseFloat(urlTempo));
        }, 200);
    }
  }, [searchParams]);

  // --- CÁLCULO ---
  const calcular = (pInicial = inicialValue, pMensal = mensalValue, pTaxa = parseFloat(taxa), pTempo = parseFloat(tempo)) => {
    if (isNaN(pTaxa) || isNaN(pTempo)) return;

    const i = pTaxa / 100; // Taxa mensal
    const t = pTempo * 12; // Anos -> Meses

    // Fórmula VF = P(1+i)^t + M * [ ((1+i)^t - 1) / i ]
    const montanteInicial = pInicial * Math.pow(1 + i, t);
    
    // Tratamento para taxa zero no aporte mensal (evita divisão por zero)
    let montanteAportes = 0;
    if (i > 0) {
        montanteAportes = pMensal * ((Math.pow(1 + i, t) - 1) / i);
    } else {
        montanteAportes = pMensal * t;
    }
    
    const totalFinal = montanteInicial + (pMensal > 0 ? montanteAportes : 0);
    const totalInvestido = pInicial + (pMensal * t);
    const totalJuros = totalFinal - totalInvestido;

    const novoResultado: ResultadoJuros = {
      total: formatBRL(totalFinal),
      investido: formatBRL(totalInvestido),
      juros: formatBRL(totalJuros),
      periodo: `${pTempo} anos`,
      taxa: `${pTaxa}% a.m.`,
      rawInicial: pInicial,
      rawMensal: pMensal,
      rawTaxa: pTaxa,
      rawTempo: pTempo
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- HISTÓRICO ---
  const salvarHistorico = (res: ResultadoJuros) => {
    const novoItem: HistoricoJuros = {
        data: new Date().toLocaleDateString("pt-BR"),
        total: res.total,
        investido: res.investido,
        juros: res.juros,
        periodo: res.periodo
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_juros", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setInicial(""); setInicialValue(0);
    setMensal(""); setMensalValue(0);
    setTaxa(""); setTempo("");
    setResultado(null);
  };

  // --- ACTIONS ---
  const handleShare = (type: "result" | "tool") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let url = baseUrl;

    if (type === "result" && resultado) {
        const params = new URLSearchParams();
        params.set("inicial", resultado.rawInicial.toString());
        params.set("mensal", resultado.rawMensal.toString());
        params.set("taxa", resultado.rawTaxa.toString());
        params.set("tempo", resultado.rawTempo.toString());
        url = `${baseUrl}?${params.toString()}`;
    }

    navigator.clipboard.writeText(url);
    setCopiado(type === "result" ? "result" : "link");
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      
      {/* GRID PRINCIPAL */}
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- COLUNA ESQUERDA: INPUTS --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 p-6">
              <div className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-xl flex items-center gap-3 text-slate-800">
                    <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shadow-sm"><TrendingUp size={22} strokeWidth={2.5} /></div>
                    Simular Investimento
                  </CardTitle>
                  {!isIframe && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowEmbedModal(true)} 
                        className="text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 h-8 px-2 rounded-lg"
                        title="Incorporar no seu site"
                      >
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              
              {/* Inputs Valor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor Inicial</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="R$ 0,00" 
                        value={inicial} 
                        onChange={handleInicialChange} 
                        className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Aporte Mensal</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="R$ 0,00" 
                        value={mensal} 
                        onChange={handleMensalChange} 
                        className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                        inputMode="numeric"
                      />
                    </div>
                  </div>
              </div>

              {/* Inputs Taxa/Tempo */}
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Taxa Mensal (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            type="number" 
                            value={taxa} 
                            onChange={e => setTaxa(e.target.value)} 
                            className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                            placeholder="0.8" 
                            inputMode="decimal"
                        />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Tempo (Anos)</Label>
                      <div className="relative">
                        <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            type="number" 
                            value={tempo} 
                            onChange={e => setTempo(e.target.value)} 
                            className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                            placeholder="10" 
                            inputMode="numeric"
                        />
                      </div>
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white h-14 text-lg font-bold shadow-lg shadow-emerald-200 rounded-xl transition-all active:scale-[0.99] flex items-center gap-2">
                    <TrendingUp size={20} className="text-emerald-100"/> Calcular Futuro
                  </Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors" title="Limpar dados">
                    <X className="h-5 w-5" />
                  </Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO RÁPIDO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                  <History size={14} /> Simulações Recentes
                </h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer active:bg-slate-100">
                        <div className="flex flex-col">
                            <span className="text-slate-800 font-bold">{item.periodo}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Inv: {item.investido}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs tabular-nums">{item.total}</span>
                            <span className="text-[10px] text-emerald-600 font-medium">+{item.juros} juros</span>
                        </div>
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
              <CardTitle className="text-slate-800 text-lg font-bold">Projeção Financeira</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                    <TrendingUp size={36} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-medium max-w-[220px]">Preencha os dados ao lado para ver o poder dos juros compostos.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* CARD PRETO DESTAQUE */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/30 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Montante Final Acumulado</p>
                    <div className="flex items-center justify-center gap-1 relative z-10">
                       <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-all">{resultado.total}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-4 text-[10px] text-slate-400 relative z-10">
                        <span>Em {resultado.periodo} • Taxa {resultado.taxa}</span>
                    </div>
                  </div>

                  {/* LISTA DETALHADA */}
                  <div className="space-y-1 w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">Total Investido</span>
                        <span className="text-sm font-bold text-slate-900">{resultado.investido}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                        <span className="text-sm text-emerald-700 font-bold flex items-center gap-2"><TrendingUp size={16}/> Total em Juros</span>
                        <span className="text-sm font-extrabold text-emerald-700">+ {resultado.juros}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* Projeção estimada. Rendimentos passados não garantem ganhos futuros.</p>

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
                          <span className="flex items-center gap-2"><Printer size={16}/> Imprimir/PDF</span>
                      </Button>
                  </div>
                  
                  <div className="text-center">
                    <button 
                        onClick={() => handleShare("tool")}
                        className="text-xs text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-2 transition-colors"
                    >
                        {copiado === "link" ? "Link da ferramenta copiado!" : "Copiar link da calculadora para amigos"}
                    </button>
                  </div>

                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- LAYOUT DE IMPRESSÃO (ESCONDIDO NA TELA) --- */}
      <div className="hidden print:block">
        <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
            
            {/* Header Impressão */}
            <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mestre das Contas</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">www.mestredascontas.com.br</p>
                </div>
                <div className="text-right">
                    <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Projeção Financeira</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                </div>
            </div>

            {resultado && (
                <>
                {/* Grid de Dados */}
                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Investimento Inicial</p>
                        <p className="text-xl font-bold text-slate-900">{formatBRL(resultado.rawInicial)}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Aporte Mensal</p>
                        <p className="text-xl font-bold text-slate-900">{formatBRL(resultado.rawMensal)}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Taxa / Prazo</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.taxa} / {resultado.periodo}</p>
                    </div>
                </div>

                {/* Box de Resultado */}
                <div className="mb-8 bg-slate-50 p-8 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-6">
                        <span className="text-lg font-bold text-slate-700">Total Acumulado</span>
                        <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{resultado.total}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Investido (Seu dinheiro)</p>
                            <p className="text-2xl font-bold text-slate-700">{resultado.investido}</p>
                        </div>
                        <div>
                            <p className="text-xs text-emerald-600 uppercase font-bold tracking-wider mb-1">Total em Juros (Lucro)</p>
                            <p className="text-2xl font-bold text-emerald-600">+ {resultado.juros}</p>
                        </div>
                    </div>
                </div>

                {/* CTA Footer Impressão */}
                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Acesse essa ferramenta em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Indique para seus amigos
                    </div>
                </div>
                </>
            )}
        </div>
      </div>

      {/* --- MODAL DE EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/financeiro/juros-compostos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Juros Compostos"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/juros-compostos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Juros Compostos"></iframe>`);
                    setCopiado("embed");
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}