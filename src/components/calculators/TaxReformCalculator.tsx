"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, CheckCircle2, Code2, Link as LinkIcon, ExternalLink, X,
  Landmark, History, CalendarClock, TrendingDown, TrendingUp, Share2
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateTaxReform, REFORM_PRESETS as PRESETS } from "@/lib/calculators/tax-reform";

// --- TIPOS ---
type HistoricoTax = {
  data: string;
  produto: string;
  valor: string;
  diferenca: string;
};

type TimelineStep = {
  ano: string;
  fase: string;
  impostoEstimado: number;
  valorTotal: string;
  descricao: string;
};

interface TaxReformCalculatorProps {
  initialCategory?: string;
  initialValue?: number;
  initialCargaAtual?: number;
  initialResult?: any;
  hideTitle?: boolean;
}

export default function TaxReformCalculator({ 
  initialCategory = "padrao", 
  initialValue = 0, 
  initialCargaAtual, 
  initialResult = null,
  hideTitle = false 
}: TaxReformCalculatorProps) {
  
  const [isIframe, setIsIframe] = useState(false);

  // --- HELPER DE FORMATAÇÃO ---
  const formatBRL = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  // --- STATES ---
  const [valorNum, setValorNum] = useState(initialValue);
  const [valorProduto, setValorProduto] = useState(initialValue > 0 ? formatBRL(initialValue) : "");
  const [categoria, setCategoria] = useState(initialCategory);
  const [cargaAtual, setCargaAtual] = useState(() => {
      if (initialCargaAtual) return initialCargaAtual.toString();
      return (PRESETS[initialCategory]?.atual || 34).toString();
  });
  const [resultado, setResultado] = useState<any>(initialResult);

  // --- STATES FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoTax[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Relatorio_Reforma_Tributaria_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // --- HANDLERS ---
  const handleCalcular = (V = valorNum, Cat = categoria, cargaStr = cargaAtual) => {
    const res = calculateTaxReform(V, Cat, parseFloat(cargaStr));
    if (res) {
        setResultado(res);
        trackEvent("calculate_reforma", { valor: V, categoria: Cat, situacao: res.situacao });
        if (!isIframe) salvarHistorico(res);
    }
  };

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_tax");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialValue > 0 && !resultado) {
        handleCalcular(initialValue, initialCategory, initialCargaAtual?.toString());
    }
  }, [initialValue, initialCategory, initialCargaAtual]);

  const handleCategoriaChange = (novaCat: string) => {
      setCategoria(novaCat);
      if (PRESETS[novaCat]) {
          setCargaAtual(PRESETS[novaCat].atual.toString());
      }
  };

  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setValorProduto(display);
    setValorNum(value);
  };

  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoTax = {
        data: new Date().toLocaleDateString("pt-BR"),
        produto: res.categoriaLabel,
        valor: formatBRL(res.rawValor),
        diferenca: `${res.situacao} de ${res.diferencaValor}`
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_tax", JSON.stringify(novoHistorico));
  };

  const handleAction = (action: string) => {
      if (isIframe) {
          window.open(`https://mestredascontas.com.br/financeiro/reforma-tributaria`, '_blank');
          return;
      }

      if (action === 'pdf') {
          trackEvent("print_reforma");
          reactToPrintFn();
      }
      if (action === 'embed') {
          trackEvent("share_reforma_embed");
          setShowEmbedModal(true);
      }
      if (action === 'share') {
          const params = new URLSearchParams();
          params.set("valor", resultado.rawValor.toString());
          params.set("cat", resultado.rawCat);
          navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
          trackEvent("share_reforma_link");
          setCopiado("link");
          setTimeout(() => setCopiado(null), 2000);
      }
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- INPUTS --- */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden sticky top-24">
                {!hideTitle && (
                    <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
                        <CardTitle className="text-lg flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Landmark size={20}/></div>
                            Simulador Novo IVA
                        </CardTitle>
                        {!isIframe && (
                            <Button variant="ghost" size="sm" onClick={() => handleAction('embed')} className="absolute right-4 top-6 text-white/70 hover:text-white hover:bg-white/10">
                                <Code2 size={18}/>
                            </Button>
                        )}
                    </CardHeader>
                )}
                <CardContent className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Valor do Produto/Serviço</Label>
                        <Input 
                            placeholder="R$ 0,00" 
                            value={valorProduto} 
                            onChange={handleValorChange} 
                            className="h-12 text-lg font-bold pl-4 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" 
                            inputMode="numeric"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Categoria do Item</Label>
                        <Select value={categoria} onValueChange={handleCategoriaChange}>
                            <SelectTrigger className="h-12 w-full truncate bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent className="max-w-[90vw]">
                                <SelectItem value="padrao">🛍️ Comércio em Geral</SelectItem>
                                <SelectItem value="servico">💼 Serviços (Advogado, TI)</SelectItem>
                                <SelectItem value="cesta">🍎 Cesta Básica Nacional</SelectItem>
                                <SelectItem value="saude">💊 Saúde e Educação</SelectItem>
                                <SelectItem value="imovel">🏠 Compra/Venda Imóveis</SelectItem>
                                <SelectItem value="seletivo">🍺 Imposto Seletivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 font-medium flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="bg-white dark:bg-slate-800 p-1 rounded-full"><History size={12}/></div>
                            <span>Carga Atual Estimada (%)</span>
                        </div>
                        <Input 
                            type="number" 
                            value={cargaAtual} 
                            onChange={e => setCargaAtual(e.target.value)}
                            className="h-8 bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100 font-bold"
                        />
                    </div>
                    <Button onClick={() => handleCalcular()} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]">
                        Calcular Impacto
                    </Button>
                    
                    {!isIframe && historico.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14}/> Recentes</h4>
                             <div className="space-y-1">
                             {historico.map((h, i) => (
                                 <div key={i} className="flex justify-between text-xs text-slate-500 dark:text-slate-400 py-2 px-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                                     <span className="truncate font-medium">{h.produto}</span>
                                     <span className="font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">{h.diferenca}</span>
                                 </div>
                             ))}
                             </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* --- RESULTADO --- */}
        <div className="lg:col-span-7">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 rounded-2xl overflow-hidden ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-12 flex flex-col items-center gap-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm ring-1 ring-slate-100 dark:ring-slate-700">
                                <CalendarClock size={48} className="text-slate-300"/>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-slate-600 dark:text-slate-300">Panorama da Reforma</p>
                                <p className="text-sm">Veja a evolução dos impostos de 2026 até 2033.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            <div className={`p-6 rounded-2xl border relative overflow-hidden ${resultado.situacao === 'Redução' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800'}`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${resultado.situacao === 'Redução' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>Resultado Final (2033)</p>
                                        <div className={`text-3xl md:text-4xl font-extrabold flex flex-wrap items-center gap-2 ${resultado.situacao === 'Redução' ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>
                                            {resultado.situacao === 'Redução' ? <TrendingDown size={32}/> : <TrendingUp size={32}/>}
                                            <span className="break-words">{resultado.diferencaValor}</span>
                                        </div>
                                        <p className={`text-sm font-medium mt-2 opacity-90 ${resultado.situacao === 'Redução' ? 'text-emerald-800 dark:text-emerald-200' : 'text-rose-800 dark:text-rose-200'}`}>
                                            de impostos a {resultado.situacao === 'Redução' ? 'menos' : 'mais'} por operação.
                                        </p>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0 bg-white/60 dark:bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/50 dark:border-white/10">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">Nova Alíquota (IVA)</p>
                                        <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{resultado.novo.taxa}%</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 text-lg">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg text-blue-600 dark:text-blue-400"><CalendarClock size={20}/></div>
                                    Cronograma de Transição
                                </h3>
                                <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                                    {resultado.timeline.map((step: any, idx: number) => (
                                        <div key={idx} className="relative pl-10 md:pl-12 pb-8 last:pb-0 group">
                                            <div className={`absolute left-0 w-7 h-7 rounded-full border-4 bg-white dark:bg-slate-800 mt-0 transition-all shadow-sm z-10 flex items-center justify-center ${idx === resultado.timeline.length -1 ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-700'}`}>
                                                <div className={`w-2 h-2 rounded-full ${idx === resultado.timeline.length -1 ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className={`text-base font-bold ${idx === resultado.timeline.length -1 ? 'text-blue-700 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>{step.ano}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full uppercase tracking-wide border border-slate-200 dark:border-slate-700">{step.fase}</span>
                                                </div>
                                                
                                                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm group-hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.descricao}</p>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Valor Estimado</p>
                                                            <span className="block font-bold text-slate-800 dark:text-slate-200 text-base">{step.valorTotal}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button className="h-12 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-bold bg-white dark:bg-slate-900" variant="outline" onClick={() => handleAction("share")}>
                                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Ver Completo</span> : 
                                    (copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                                </Button>
                                <Button className="h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold bg-white dark:bg-slate-900" variant="outline" onClick={() => handleAction("pdf")}>
                                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Baixar PDF</span> : 
                                    <span className="flex items-center gap-2"><Download size={18}/> Baixar PDF</span>}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* --- IMPRESSÃO --- */}
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
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Relatório de Impacto Tributário</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Produto Analisado</p>
                            <p className="text-xl font-bold text-slate-900">{resultado.categoriaLabel}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Valor Base</p>
                            <p className="text-xl font-bold text-slate-900">{formatBRL(resultado.rawValor)}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="font-bold text-lg mb-4 border-b border-slate-200 pb-2">Cronograma de Transição</h3>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-100 text-slate-600">
                                <th className="p-3 text-left font-bold rounded-l-lg">Ano</th>
                                <th className="p-3 text-left font-bold">Fase</th>
                                <th className="p-3 text-right font-bold rounded-r-lg">Valor do Imposto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {resultado.timeline.map((step: any, i: number) => (
                                <tr key={i}>
                                    <td className="p-3 font-bold">{step.ano}</td>
                                    <td className="p-3 text-slate-600">{step.fase}</td>
                                    <td className="p-3 text-right font-mono font-bold">{step.valorTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Acesse essa ferramenta em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/financeiro/reforma-tributaria?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Reforma Tributária"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    const code = `<iframe src="https://mestredascontas.com.br/financeiro/reforma-tributaria?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Reforma Tributária"></iframe>`;
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