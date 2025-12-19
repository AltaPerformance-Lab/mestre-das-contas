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
  Landmark, TrendingDown, TrendingUp, History, CalendarClock, Share2, 
  Download, CheckCircle2, Code2, Link as LinkIcon, ExternalLink, X 
} from "lucide-react";

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

// --- DADOS ESTÁTICOS (PRESETS) ---
// Movido para fora do componente para não recriar a cada render
const PRESETS: Record<string, { label: string; atual: number; iva: number }> = {
    padrao: { label: "Produto Geral (Varejo)", atual: 34, iva: 26.5 },
    servico: { label: "Serviços Gerais", atual: 16, iva: 26.5 }, 
    saude: { label: "Saúde/Educação (Reduzida)", atual: 14, iva: 10.6 },
    cesta: { label: "Cesta Básica Nacional", atual: 18, iva: 0 }, 
    seletivo: { label: "Cigarro/Bebida (Imposto Seletivo)", atual: 80, iva: 60 },
    imovel: { label: "Compra de Imóvel", atual: 8, iva: 15.9 }
};

interface TaxReformCalculatorProps {
  initialCategory?: string;
  initialValue?: number;
  initialCargaAtual?: number;
  hideTitle?: boolean;
}

export default function TaxReformCalculator({ 
  initialCategory = "padrao", 
  initialValue = 0, 
  initialCargaAtual, 
  hideTitle = false 
}: TaxReformCalculatorProps) {
  
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // --- HELPER DE FORMATAÇÃO ---
  const formatBRL = (val: number | undefined | null) => {
    if (val === undefined || val === null || isNaN(val)) return "R$ 0,00";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);
  };

  // --- STATES (INICIALIZAÇÃO OTIMIZADA PARA PSEO) ---
  // A mágica acontece aqui: Iniciamos o state JÁ com o valor da prop. Sem useEffect flash.
  const [valorNum, setValorNum] = useState(initialValue);
  const [valorProduto, setValorProduto] = useState(initialValue > 0 ? formatBRL(initialValue) : "");
  const [categoria, setCategoria] = useState(initialCategory);
  
  // Lógica inteligente para carga inicial: Prop > Preset > Padrão
  const [cargaAtual, setCargaAtual] = useState(() => {
      if (initialCargaAtual) return initialCargaAtual.toString();
      return (PRESETS[initialCategory]?.atual || 34).toString();
  });

  const [resultado, setResultado] = useState<any>(null);

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

  // --- FUNÇÃO DE CÁLCULO ---
  const calcular = (V = valorNum, Cat = categoria, cargaStr = cargaAtual) => {
    if (!V || isNaN(V)) return;

    const regra = PRESETS[Cat] || PRESETS["padrao"];
    
    // Define a taxa antiga (prioriza o input manual do usuário se houver)
    let taxaAntigaPct = parseFloat(cargaStr);
    if (isNaN(taxaAntigaPct)) taxaAntigaPct = regra.atual;

    const taxaNovaPct = regra.iva;
    const impostoAtual = V * (taxaAntigaPct / 100);
    const impostoNovo = V * (taxaNovaPct / 100);
    const diferenca = impostoNovo - impostoAtual;
    const variacao = impostoAtual > 0 ? ((impostoNovo - impostoAtual) / impostoAtual) * 100 : 0;

    const timeline: TimelineStep[] = [];
    timeline.push({
        ano: "2025 (Hoje)", fase: "Sistema Antigo", impostoEstimado: impostoAtual, valorTotal: formatBRL(impostoAtual),
        descricao: `Carga cheia de PIS, COFINS, ICMS, ISS e IPI (~${taxaAntigaPct}%).`
    });
    timeline.push({
        ano: "2026", fase: "Fase de Testes", impostoEstimado: impostoAtual, valorTotal: formatBRL(impostoAtual),
        descricao: "Início da cobrança de 1% (IVA) compensável. Carga inalterada."
    });
    const step2027 = impostoAtual + ((impostoNovo - impostoAtual) * 0.30);
    timeline.push({
        ano: "2027", fase: "Entra a CBS", impostoEstimado: step2027, valorTotal: formatBRL(step2027),
        descricao: "Fim do PIS/COFINS. Entra a CBS federal completa."
    });
    const step2030 = impostoAtual + ((impostoNovo - impostoAtual) * 0.65);
    timeline.push({
        ano: "2030", fase: "Transição Gradual", impostoEstimado: step2030, valorTotal: formatBRL(step2030),
        descricao: "Redução do ICMS/ISS e aumento proporcional do IBS."
    });
    timeline.push({
        ano: "2033", fase: "Implementação Total", impostoEstimado: impostoNovo, valorTotal: formatBRL(impostoNovo),
        descricao: `Vigência integral do novo sistema (${taxaNovaPct}% IVA).`
    });

    const novoResultado = {
        atual: { taxa: taxaAntigaPct, valor: formatBRL(impostoAtual) },
        novo: { taxa: taxaNovaPct, valor: formatBRL(impostoNovo) },
        diferencaValor: formatBRL(Math.abs(diferenca)),
        diferencaPercent: isNaN(variacao) ? "0%" : variacao.toFixed(1) + "%",
        situacao: diferenca > 0 ? "Aumento" : "Redução",
        categoriaLabel: regra.label,
        rawValor: V, rawCat: Cat, timeline: timeline 
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- EFEITOS ---
  
  // 1. Inicialização e URL Params (Prioridade: URL > Prop > Vazio)
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_tax");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se veio via prop (pSEO), calcula imediatamente
    if (initialValue > 0) {
        calcular(initialValue, initialCategory, initialCargaAtual?.toString());
    } else {
        // Se não tem prop, olha a URL (Share)
        const urlValor = searchParams.get("valor");
        const urlCat = searchParams.get("cat");
        
        if (urlValor) {
            const val = parseFloat(urlValor);
            setValorNum(val);
            setValorProduto(formatBRL(val));
            if (urlCat) setCategoria(urlCat);
            // Pequeno delay para garantir estados atualizados
            setTimeout(() => calcular(val, urlCat || "padrao"), 200);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executa apenas na montagem

  // 2. Atualiza carga estimada ao trocar categoria (apenas se usuário não digitou customizado)
  const handleCategoriaChange = (novaCat: string) => {
      setCategoria(novaCat);
      if (PRESETS[novaCat]) {
          setCargaAtual(PRESETS[novaCat].atual.toString());
      }
  };

  // --- HANDLERS ---
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
      // BLINDAGEM IFRAME: Joga pro site principal
      if (isIframe) {
          window.open(`https://mestredascontas.com.br/financeiro/reforma-tributaria`, '_blank');
          return;
      }

      if (action === 'pdf') reactToPrintFn();
      if (action === 'embed') setShowEmbedModal(true);
      if (action === 'share') {
          const params = new URLSearchParams();
          params.set("valor", resultado.rawValor.toString());
          params.set("cat", resultado.rawCat);
          navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
          setCopiado("link");
          setTimeout(() => setCopiado(null), 2000);
      }
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- INPUTS (Esq) --- */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 bg-white rounded-2xl overflow-hidden sticky top-24">
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
                            className="h-12 text-lg font-bold pl-4 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                            inputMode="numeric"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-slate-600 font-medium">Categoria do Item</Label>
                        <Select value={categoria} onValueChange={handleCategoriaChange}>
                            <SelectTrigger className="h-12 w-full truncate bg-slate-50 border-slate-200 font-medium text-slate-700">
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
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-700 font-medium flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="bg-white p-1 rounded-full"><History size={12}/></div>
                            <span>Carga Atual Estimada (%)</span>
                        </div>
                        <Input 
                            type="number" 
                            value={cargaAtual} 
                            onChange={e => setCargaAtual(e.target.value)}
                            className="h-8 bg-white border-blue-200 text-blue-900 font-bold"
                        />
                    </div>
                    <Button onClick={() => calcular()} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]">
                        Calcular Impacto
                    </Button>
                    
                    {!isIframe && historico.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-100">
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14}/> Recentes</h4>
                             <div className="space-y-1">
                             {historico.map((h, i) => (
                                 <div key={i} className="flex justify-between text-xs text-slate-500 py-2 px-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                                     <span className="truncate font-medium">{h.produto}</span>
                                     <span className="font-bold text-slate-700 whitespace-nowrap">{h.diferenca}</span>
                                 </div>
                             ))}
                             </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="lg:col-span-7">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 rounded-2xl overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-12 flex flex-col items-center gap-4">
                            <div className="bg-white p-4 rounded-full shadow-sm ring-1 ring-slate-100">
                                <CalendarClock size={48} className="text-slate-300"/>
                            </div>
                            <div>
                                <p className="font-bold text-lg text-slate-600">Panorama da Reforma</p>
                                <p className="text-sm">Veja a evolução dos impostos de 2026 até 2033.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {/* CARD DE RESULTADO */}
                            <div className={`p-6 rounded-2xl border relative overflow-hidden ${resultado.situacao === 'Redução' ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${resultado.situacao === 'Redução' ? 'text-emerald-600' : 'text-rose-600'}`}>Resultado Final (2033)</p>
                                        <div className={`text-3xl md:text-4xl font-extrabold flex flex-wrap items-center gap-2 ${resultado.situacao === 'Redução' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {resultado.situacao === 'Redução' ? <TrendingDown size={32}/> : <TrendingUp size={32}/>}
                                            <span className="break-all tracking-tight">{resultado.diferencaValor}</span>
                                        </div>
                                        <p className={`text-sm font-medium mt-2 opacity-90 ${resultado.situacao === 'Redução' ? 'text-emerald-800' : 'text-rose-800'}`}>
                                            de impostos a {resultado.situacao === 'Redução' ? 'menos' : 'mais'} por operação.
                                        </p>
                                    </div>
                                    <div className="text-left sm:text-right shrink-0 bg-white/60 p-3 rounded-xl backdrop-blur-sm border border-white/50">
                                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nova Alíquota (IVA)</p>
                                        <p className="text-3xl font-extrabold text-slate-900">{resultado.novo.taxa}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* TIMELINE */}
                            <div>
                                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
                                    <div className="bg-blue-100 p-1.5 rounded-lg text-blue-600"><CalendarClock size={20}/></div>
                                    Cronograma de Transição
                                </h3>
                                <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-slate-100">
                                    {resultado.timeline.map((step: TimelineStep, idx: number) => (
                                        <div key={idx} className="relative pl-10 md:pl-12 pb-8 last:pb-0 group">
                                            <div className={`absolute left-0 w-7 h-7 rounded-full border-4 bg-white mt-0 transition-all shadow-sm z-10 flex items-center justify-center ${idx === resultado.timeline.length -1 ? 'border-blue-500' : 'border-slate-200 group-hover:border-blue-300'}`}>
                                                <div className={`w-2 h-2 rounded-full ${idx === resultado.timeline.length -1 ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className={`text-base font-bold ${idx === resultado.timeline.length -1 ? 'text-blue-700' : 'text-slate-800'}`}>{step.ano}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 px-2.5 py-1 bg-slate-100 rounded-full uppercase tracking-wide border border-slate-200">{step.fase}</span>
                                                </div>
                                                
                                                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <p className="text-sm text-slate-600 leading-relaxed">{step.descricao}</p>
                                                        <div className="text-right shrink-0">
                                                            <p className="text-[10px] text-slate-400 uppercase font-bold">Valor Estimado</p>
                                                            <span className="block font-bold text-slate-800 text-base whitespace-nowrap">{step.valorTotal}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AÇÕES */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button className="h-12 border-slate-200 hover:bg-blue-50 text-blue-700 font-bold" variant="outline" onClick={() => handleAction("share")}>
                                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Ver Completo</span> : 
                                    (copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                                </Button>
                                <Button className="h-12 border-slate-200 hover:bg-slate-100 text-slate-700 font-bold" variant="outline" onClick={() => handleAction("pdf")}>
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
                            {resultado.timeline.map((step: TimelineStep, i: number) => (
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
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
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
                }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}