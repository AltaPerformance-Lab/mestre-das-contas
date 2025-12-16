"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, DollarSign, PiggyBank, CalendarClock, Percent, 
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, Coins
} from "lucide-react";

// TIPO PARA HISTÓRICO
type HistoricoJuros = {
  data: string;
  total: string;
  investido: string;
  periodo: string;
  juros: string;
};

export default function CompoundInterestCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES DE DADOS
  const [inicial, setInicial] = useState("");
  const [inicialValue, setInicialValue] = useState(0);
  
  const [mensal, setMensal] = useState("");
  const [mensalValue, setMensalValue] = useState(0);
  
  const [taxa, setTaxa] = useState("");
  const [tempo, setTempo] = useState("");
  const [tipoTempo, setTipoTempo] = useState("anos"); // anos ou meses

  const [resultado, setResultado] = useState<any>(null);

  // STATES DE FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoJuros[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Simulacao_Juros_Compostos_MestreDasContas",
  });

  // FORMATADORES
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

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    
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

  // CÁLCULO
  const calcular = (pInicial = inicialValue, pMensal = mensalValue, pTaxa = parseFloat(taxa), pTempo = parseFloat(tempo)) => {
    if (isNaN(pTaxa) || isNaN(pTempo)) return;

    // Converte tudo para mensal
    const i = pTaxa / 100; // Taxa mensal
    const t = pTempo * 12; // Anos para meses (Considerando input em anos por padrão)

    // Fórmula VF = P(1+i)^t + M * [ ((1+i)^t - 1) / i ]
    const montanteInicial = pInicial * Math.pow(1 + i, t);
    const montanteAportes = pMensal * ((Math.pow(1 + i, t) - 1) / i);
    
    const totalFinal = montanteInicial + (pMensal > 0 ? montanteAportes : 0);
    const totalInvestido = pInicial + (pMensal * t);
    const totalJuros = totalFinal - totalInvestido;

    const novoResultado = {
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

  // ACTIONS
  const salvarHistorico = (res: any) => {
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/financeiro/juros-compostos`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("inicial", resultado.rawInicial.toString());
            params.set("mensal", resultado.rawMensal.toString());
            params.set("taxa", resultado.rawTaxa.toString());
            params.set("tempo", resultado.rawTempo.toString());
        }
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { 
        reactToPrintFn(); 
    } else if (action === "embed") { 
        setShowEmbedModal(true); 
    }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/juros-compostos?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Juros Compostos"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 w-full overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    <div className="bg-green-100 p-1.5 md:p-2 rounded-lg text-green-600"><TrendingUp size={20} /></div>
                    Simular Investimento
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                          <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor Inicial</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={inicial} onChange={handleInicialChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Aporte Mensal</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={mensal} onChange={handleMensalChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                    </div>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="text-slate-600">Taxa de Juros (Mensal)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" value={taxa} onChange={e => setTaxa(e.target.value)} className="pl-9 h-12 border-slate-200" placeholder="0.8" inputMode="decimal"/>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600">Período (Anos)</Label>
                      <div className="relative">
                        <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" value={tempo} onChange={e => setTempo(e.target.value)} className="pl-9 h-12 border-slate-200" placeholder="10" inputMode="numeric"/>
                      </div>
                  </div>
              </div>

              <div className="flex gap-3 pt-4">
                  <Button onClick={() => calcular()} className="flex-1 bg-green-600 hover:bg-green-700 h-14 text-lg font-bold shadow-lg shadow-green-200 transition-all active:scale-[0.98]">Calcular Futuro</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-500 hover:text-green-600 hover:bg-green-50"><X className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Simulações Recentes</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" 
                         onClick={() => {
                             // Restaurar histórico (sem lógica complexa, apenas visual)
                             // Para restaurar completo precisaria salvar os inputs raw no histórico
                         }}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{item.periodo}</span>
                        <span className="text-[10px] text-slate-400">Inv: {item.investido}</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">{item.total}</span>
                        <span className="text-[10px] text-green-500">+{item.juros} juros</span>
                    </div>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="md:col-span-5 w-full flex flex-col gap-4">
          <Card className={`h-fit w-full transition-all duration-500 border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'} print:bg-white print:border-slate-300 print:shadow-none`}>
            <CardHeader className="px-5 md:px-6 border-b border-slate-100 bg-white">
              <CardTitle className="text-slate-800 text-lg md:text-xl">Projeção Financeira</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><PiggyBank size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Preencha os dados para ver o poder dos juros compostos.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Destaque */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                    
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Montante Final Acumulado</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.total}</p>
                    <p className="text-[10px] text-slate-500 mt-2 relative z-10">Em {resultado.periodo} com taxa de {resultado.taxa}</p>
                  </div>

                  {/* Lista Detalhada */}
                  <div className="space-y-3 text-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Total Investido</span>
                        <span className="font-semibold text-slate-900">{resultado.investido}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-green-50/50 -mx-2 px-2 rounded">
                        <span className="text-green-700 font-bold flex items-center gap-2"><TrendingUp size={16}/> Total em Juros</span>
                        <span className="font-extrabold text-green-700">+ {resultado.juros}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* Projeção estimada. Rendimentos passados não garantem ganhos futuros.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BOTÕES */}
          {resultado && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in">
                  <Button variant="outline" onClick={() => handleAction("share")} className="h-12 border-slate-200 hover:bg-blue-50 text-blue-700">
                      {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Ver Completo</span> : (linkCopiado ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado!</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                  </Button>
                  <Button variant="outline" onClick={() => handleAction("pdf")} className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700">
                      {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Baixar PDF</span> : <span className="flex items-center gap-2"><Download size={18}/> Salvar PDF</span>}
                  </Button>
              </div>
          )}
        </div>
      </div>

      {/* --- IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Projeção Financeira</h1><p className="text-sm text-slate-500 mt-1">Simulação <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Investimento Inicial</p><p className="text-xl font-bold">{formatBRL(resultado.rawInicial)}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Aporte Mensal</p><p className="text-xl font-bold">{formatBRL(resultado.rawMensal)}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Taxa / Prazo</p><p className="text-xl font-bold">{resultado.taxa} / {resultado.periodo}</p></div>
                </div>
                <div className="mb-8 bg-slate-50 p-6 rounded border border-slate-200">
                    <div className="flex justify-between items-end mb-4 border-b border-slate-300 pb-4">
                        <span className="text-lg font-bold">Total Acumulado</span>
                        <span className="text-4xl font-extrabold text-slate-900">{resultado.total}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Total Investido (Seu dinheiro)</p>
                            <p className="text-xl font-bold text-slate-700">{resultado.investido}</p>
                        </div>
                        <div>
                            <p className="text-xs text-green-600 uppercase font-bold">Total em Juros (Lucro)</p>
                            <p className="text-xl font-bold text-green-700">+ {resultado.juros}</p>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-8 border-t border-slate-300 mt-8">
                    <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
                    <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
                </div>
            </div>
        </div>
      )}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo.</p>
                <div className="bg-slate-900 p-4 rounded-lg relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/financeiro/juros-compostos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Juros Compostos"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-green-600 hover:bg-green-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}