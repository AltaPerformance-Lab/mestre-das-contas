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
  Landmark, TrendingDown, TrendingUp, History, X, CalendarClock
} from "lucide-react";

// Tipos Internos
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

// --- PROPS PARA PSEO (SEO PROGRAMÁTICO) ---
// Isso permite que a página dinâmica injete dados específicos na calculadora
interface TaxReformCalculatorProps {
  initialCategory?: string;     // Ex: 'servico'
  initialValue?: number;        // Ex: 5000
  initialCargaAtual?: number;   // Ex: 14.5 (Para sobrepor o padrão do preset)
  hideTitle?: boolean;          // True para esconder o título do Card (usar o H1 da página)
}

export default function TaxReformCalculator({ 
  initialCategory, 
  initialValue, 
  initialCargaAtual, 
  hideTitle = false 
}: TaxReformCalculatorProps) {
  
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [valorProduto, setValorProduto] = useState("");
  const [valorNum, setValorNum] = useState(0);
  const [categoria, setCategoria] = useState("padrao");
  const [cargaAtual, setCargaAtual] = useState(""); 
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoTax[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: "Simulacao_Reforma_Tributaria_Timeline" });

  // FORMATADORES
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

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // PRESETS DE CARGA TRIBUTÁRIA ATUAL (Estimativas médias IBPT)
  const presets: any = {
    padrao: { label: "Produto Geral (Varejo)", atual: 34, iva: 26.5 },
    servico: { label: "Serviços Gerais", atual: 16, iva: 26.5 }, 
    saude: { label: "Saúde/Educação (Reduzida)", atual: 14, iva: 10.6 },
    cesta: { label: "Cesta Básica Nacional", atual: 18, iva: 0 }, 
    seletivo: { label: "Cigarro/Bebida (Imposto Seletivo)", atual: 80, iva: 60 },
    imovel: { label: "Compra de Imóvel", atual: 8, iva: 15.9 }
  };

  // --- EFEITO 1: GESTÃO DE PRESETS E PSEO ---
  useEffect(() => {
    // Lógica inteligente: 
    // Se a categoria selecionada for igual à inicial injetada E tivermos uma carga customizada (ex: Advogado 14.5%),
    // usamos a carga customizada. Se o usuário mudar a categoria manualmente, usamos o preset padrão.
    if (initialCategory && categoria === initialCategory && initialCargaAtual) {
        setCargaAtual(initialCargaAtual.toString());
    } else if (presets[categoria]) {
        setCargaAtual(presets[categoria].atual.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria, initialCategory, initialCargaAtual]);

  // --- EFEITO 2: INICIALIZAÇÃO E URL PARAMS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_tax");
    if (salvo) setHistorico(JSON.parse(salvo));

    // 1. Prioridade: Props do pSEO
    if (initialCategory) {
        setCategoria(initialCategory);
    }

    if (initialValue) {
        setValorNum(initialValue);
        setValorProduto(formatBRL(initialValue));
        // Dispara cálculo automático com pequeno delay para garantir que states assentaram
        setTimeout(() => calcular(initialValue, initialCategory || "padrao"), 300);
    } else {
        // 2. Fallback: URL Params (compartilhamento)
        const urlValor = searchParams.get("valor");
        const urlCat = searchParams.get("cat");

        if (urlValor) {
            const val = parseFloat(urlValor);
            setValorNum(val);
            setValorProduto(formatBRL(val));
            if (urlCat) setCategoria(urlCat);
            setTimeout(() => calcular(val, urlCat || "padrao"), 300);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initialCategory, initialValue]);

  // --- LÓGICA DE CÁLCULO E TIMELINE ---
  const calcular = (V = valorNum, Cat = categoria) => {
    if (!V) return;

    const regra = presets[Cat];
    // Se tivermos cargaAtual no state (pode ter vindo do preset ou do pSEO), usamos ela
    const taxaAntigaPct = parseFloat(cargaAtual); 
    const taxaNovaPct = regra.iva;

    // Valores Base
    const impostoAtual = V * (taxaAntigaPct / 100);
    const impostoNovo = V * (taxaNovaPct / 100);
    
    // Diferença Final
    const diferenca = impostoNovo - impostoAtual;
    const variacao = ((impostoNovo - impostoAtual) / impostoAtual) * 100;

    // --- GERAÇÃO DO PANORAMA 2026-2033 ---
    const timeline: TimelineStep[] = [];

    // 2025 (Base)
    timeline.push({
        ano: "2025 (Hoje)",
        fase: "Sistema Antigo",
        impostoEstimado: impostoAtual,
        valorTotal: formatBRL(impostoAtual),
        descricao: `Carga cheia de PIS, COFINS, ICMS, ISS e IPI (~${taxaAntigaPct}%).`
    });

    // 2026 (Teste)
    timeline.push({
        ano: "2026",
        fase: "Fase de Testes",
        impostoEstimado: impostoAtual, 
        valorTotal: formatBRL(impostoAtual),
        descricao: "Início da cobrança de 1% (IVA) compensável. Carga inalterada."
    });

    // 2027 (CBS Cheia)
    const step2027 = impostoAtual + ((impostoNovo - impostoAtual) * 0.30);
    timeline.push({
        ano: "2027",
        fase: "Entra a CBS",
        impostoEstimado: step2027,
        valorTotal: formatBRL(step2027),
        descricao: "Fim do PIS/COFINS. Entra a CBS federal completa."
    });

    // 2030 (Transição)
    const step2030 = impostoAtual + ((impostoNovo - impostoAtual) * 0.65);
    timeline.push({
        ano: "2030",
        fase: "Transição Gradual",
        impostoEstimado: step2030,
        valorTotal: formatBRL(step2030),
        descricao: "Redução do ICMS/ISS e aumento proporcional do IBS."
    });

    // 2033 (Final)
    timeline.push({
        ano: "2033",
        fase: "Implementação Total",
        impostoEstimado: impostoNovo,
        valorTotal: formatBRL(impostoNovo),
        descricao: `Vigência integral do novo sistema (${taxaNovaPct}% IVA).`
    });

    const novoResultado = {
        atual: { taxa: taxaAntigaPct, valor: formatBRL(impostoAtual) },
        novo: { taxa: taxaNovaPct, valor: formatBRL(impostoNovo) },
        diferencaValor: formatBRL(Math.abs(diferenca)),
        diferencaPercent: variacao.toFixed(1) + "%",
        situacao: diferenca > 0 ? "Aumento" : "Redução",
        categoriaLabel: regra.label,
        rawValor: V,
        rawCat: Cat,
        timeline: timeline 
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
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
      if (action === 'pdf') reactToPrintFn();
      if (action === 'embed') setShowEmbedModal(true);
      if (action === 'share') {
          const params = new URLSearchParams();
          params.set("valor", resultado.rawValor.toString());
          params.set("cat", resultado.rawCat);
          navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
          setLinkCopiado(true);
          setTimeout(() => setLinkCopiado(false), 2000);
      }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/reforma-tributaria?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Reforma Tributária"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    // LAYOUT RESPONSIVO: max-w-[100vw] evita scroll lateral no mobile
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      
      <div className="grid md:grid-cols-12 gap-4 md:gap-8 w-full print:hidden">
        
        {/* INPUTS */}
        <div className="md:col-span-5 space-y-6">
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white sticky top-24">
                
                {/* HEADER: Só mostra se hideTitle for falso (padrão) */}
                {!hideTitle && (
                    <CardHeader className="bg-slate-900 text-white p-4 md:p-6 rounded-t-xl">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-lg"><Landmark size={20}/></div>
                            Simulador Novo IVA
                        </CardTitle>
                    </CardHeader>
                )}

                <CardContent className="p-4 md:p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Valor do Produto/Serviço</Label>
                        <Input placeholder="R$ 0,00" value={valorProduto} onChange={handleValorChange} className="h-12 text-lg font-bold pl-4" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Categoria do Item</Label>
                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger className="h-12 w-full truncate"><SelectValue/></SelectTrigger>
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

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500">
                        <p><strong>Carga Atual:</strong> {cargaAtual}% (Estimativa PIS/COFINS/ICMS/ISS)</p>
                    </div>

                    <Button onClick={() => calcular()} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold">
                        Calcular Impacto
                    </Button>

                    {!isIframe && historico.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-100">
                             <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><History size={14}/> Recentes</h4>
                             {historico.map((h, i) => (
                                 <div key={i} className="flex justify-between text-xs text-slate-500 py-1 gap-2">
                                     <span className="truncate">{h.produto}</span>
                                     <span className="font-medium whitespace-nowrap">{h.diferenca}</span>
                                 </div>
                             ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* RESULTADO E TIMELINE */}
        <div className="md:col-span-7">
            <Card className={`h-full border-0 shadow-sm ring-1 ring-slate-200 ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
                <CardContent className="p-4 md:p-6 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-10">
                            <CalendarClock size={48} className="mx-auto opacity-20 mb-4"/>
                            <p className="font-medium text-lg">Panorama da Reforma</p>
                            <p className="text-sm">Veja a evolução dos impostos de 2026 até 2033.</p>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                            
                            {/* Bloco de Destaque */}
                            <div className={`p-4 md:p-6 rounded-2xl border relative overflow-hidden ${resultado.situacao === 'Redução' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">Resultado Final (2033)</p>
                                        <p className={`text-2xl md:text-3xl font-extrabold flex items-center gap-2 ${resultado.situacao === 'Redução' ? 'text-green-700' : 'text-red-700'}`}>
                                            {resultado.situacao === 'Redução' ? <TrendingDown size={24}/> : <TrendingUp size={24}/>}
                                            {resultado.diferencaValor}
                                        </p>
                                        <p className="text-sm font-medium mt-1 opacity-80">de impostos a {resultado.situacao === 'Redução' ? 'menos' : 'mais'} por operação.</p>
                                    </div>
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-slate-500 uppercase">Alíquota IVA</p>
                                        <p className="text-2xl font-bold text-slate-900">{resultado.novo.taxa}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Visual */}
                            <div>
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <CalendarClock className="text-blue-600" size={20}/> Cronograma
                                </h3>
                                <div className="space-y-0 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-slate-200">
                                    {resultado.timeline.map((step: TimelineStep, idx: number) => (
                                        <div key={idx} className="relative pl-6 md:pl-8 pb-6 last:pb-0 group">
                                            <div className={`absolute left-0 w-4 h-4 rounded-full border-2 bg-white mt-1.5 transition-colors ${idx === 0 || idx === resultado.timeline.length -1 ? 'border-blue-600 bg-blue-50' : 'border-slate-300'}`}></div>
                                            
                                            <div className="flex flex-col gap-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className={`text-sm font-bold ${idx === resultado.timeline.length -1 ? 'text-blue-700' : 'text-slate-900'}`}>{step.ano}</span>
                                                    <span className="text-[10px] font-medium text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full">{step.fase}</span>
                                                </div>
                                                
                                                <div className="flex justify-between items-end border-b border-slate-50 pb-2 mb-1 border-dashed">
                                                    <p className="text-xs text-slate-500 mt-1 max-w-[70%] leading-relaxed">{step.descricao}</p>
                                                    <div className="text-right ml-2">
                                                        <span className="block font-bold text-slate-700 text-sm">{step.valorTotal}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                <Button className="w-full" variant="outline" onClick={() => handleAction("share")}>{linkCopiado ? "Link Copiado!" : "Compartilhar Resultado"}</Button>
                                <Button className="w-full" variant="outline" onClick={() => handleAction("pdf")}>Baixar PDF</Button>
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
            <div ref={contentRef} className="print:w-full print:p-8">
                <h1 className="text-2xl font-bold mb-4">Relatório Reforma Tributária</h1>
                <p>Produto: {resultado.categoriaLabel}</p>
                <p>Valor Base: {formatBRL(resultado.rawValor)}</p>
                <br/>
                <table className="w-full border-collapse border text-sm">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border p-2 text-left">Ano</th>
                            <th className="border p-2 text-left">Fase</th>
                            <th className="border p-2 text-right">Valor Imposto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultado.timeline.map((step: TimelineStep, i: number) => (
                            <tr key={i}>
                                <td className="border p-2">{step.ano}</td>
                                <td className="border p-2">{step.fase}</td>
                                <td className="border p-2 text-right">{step.valorTotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4"><X size={20}/></button>
                <h3 className="font-bold mb-2">Incorporar Calculadora</h3>
                <code className="text-xs bg-slate-100 p-3 block mb-4 rounded border border-slate-200 text-slate-600 break-all">
                    {`<iframe src="https://mestredascontas.com.br/financeiro/reforma-tributaria?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Reforma Tributária"></iframe>`}
                </code>
                <Button onClick={copiarEmbedCode} className="w-full">Copiar Código</Button>
            </div>
        </div>
      )}
    </div>
  );
}