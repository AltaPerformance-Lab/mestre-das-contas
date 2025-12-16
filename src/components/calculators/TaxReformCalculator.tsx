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
  Landmark, Calculator, ArrowRightLeft, TrendingDown, TrendingUp, 
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, AlertTriangle, X
} from "lucide-react";

type HistoricoTax = {
  data: string;
  produto: string;
  valor: string;
  diferenca: string;
};

export default function TaxReformCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [valorProduto, setValorProduto] = useState("");
  const [valorNum, setValorNum] = useState(0);
  const [categoria, setCategoria] = useState("padrao");
  const [cargaAtual, setCargaAtual] = useState(""); // Estimativa do usuário ou padrão
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoTax[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: "Simulacao_Reforma_Tributaria" });

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
    servico: { label: "Serviços Gerais", atual: 16, iva: 26.5 }, // Serviços vão pagar mais no nominal, mas ganham crédito
    saude: { label: "Saúde/Educação (Reduzida)", atual: 14, iva: 10.6 }, // 60% redução
    cesta: { label: "Cesta Básica Nacional", atual: 18, iva: 0 }, // Isento
    seletivo: { label: "Cigarro/Bebida (Imposto Seletivo)", atual: 80, iva: 60 }, // IVA + Seletivo
    imovel: { label: "Compra de Imóvel", atual: 8, iva: 15.9 } // Redução específica
  };

  useEffect(() => {
    if (presets[categoria]) {
        setCargaAtual(presets[categoria].atual.toString());
    }
  }, [categoria]);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_tax");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlValor = searchParams.get("valor");
    const urlCat = searchParams.get("cat");

    if (urlValor) {
        const val = parseFloat(urlValor);
        setValorNum(val);
        setValorProduto(formatBRL(val));
        if (urlCat) setCategoria(urlCat);
        setTimeout(() => calcular(val, urlCat || "padrao"), 200);
    }
  }, [searchParams]);

  const calcular = (V = valorNum, Cat = categoria) => {
    if (!V) return;

    const regra = presets[Cat];
    const taxaAntiga = parseFloat(cargaAtual) / 100;
    const taxaNova = regra.iva / 100;

    // Cenário Atual (Aproximado)
    // No sistema antigo, o imposto está "por dentro", o cálculo é complexo. 
    // Vamos simplificar para carga efetiva sobre o preço final para didática.
    const impostoAtual = V * taxaAntiga;
    const precoSemImposto = V - impostoAtual;

    // Cenário Novo (IVA Dual - Cobrança "por fora" visualmente, mas incide sobre valor agregado)
    // Para comparação justa, mantemos o preço base e aplicamos a nova alíquota.
    const impostoNovo = V * taxaNova; 
    
    // Diferença
    const diferenca = impostoNovo - impostoAtual;
    const variacao = ((impostoNovo - impostoAtual) / impostoAtual) * 100;

    const novoResultado = {
        atual: { taxa: parseFloat(cargaAtual), valor: formatBRL(impostoAtual) },
        novo: { taxa: regra.iva, valor: formatBRL(impostoNovo) },
        diferencaValor: formatBRL(Math.abs(diferenca)),
        diferencaPercent: variacao.toFixed(1) + "%",
        situacao: diferenca > 0 ? "Aumento" : "Redução",
        categoriaLabel: regra.label,
        rawValor: V,
        rawCat: Cat
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
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* INPUTS */}
        <div className="md:col-span-6 space-y-6">
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
                <CardHeader className="bg-slate-900 text-white p-4 md:p-6 rounded-t-xl">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <div className="bg-white/20 p-1.5 rounded-lg"><Landmark size={20}/></div>
                        Simulador Novo IVA (2026)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Valor do Produto/Serviço</Label>
                        <Input placeholder="R$ 0,00" value={valorProduto} onChange={handleValorChange} className="h-12 text-lg font-bold pl-4" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Categoria do Item</Label>
                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger className="h-12"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="padrao">🛍️ Comércio em Geral (Roupas, Eletrônicos)</SelectItem>
                                <SelectItem value="servico">💼 Serviços (Advogado, TI, Academia)</SelectItem>
                                <SelectItem value="cesta">🍎 Cesta Básica Nacional (Alimentos)</SelectItem>
                                <SelectItem value="saude">💊 Saúde e Educação (Medicamentos, Escolas)</SelectItem>
                                <SelectItem value="imovel">🏠 Compra e Venda de Imóveis</SelectItem>
                                <SelectItem value="seletivo">🍺 Imposto Seletivo (Cigarro, Bebida)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-500">
                        <p><strong>Carga Atual Estimada:</strong> {cargaAtual}% (Soma aprox. de PIS/COFINS/IPI/ICMS/ISS)</p>
                    </div>

                    <Button onClick={() => calcular()} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold">
                        Comparar Impostos
                    </Button>
                </CardContent>
            </Card>

            {!isIframe && historico.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><History size={14}/> Simulações Recentes</h4>
                    {historico.map((h, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-slate-50 last:border-0 py-2">
                            <span>{h.produto} ({h.valor})</span>
                            <span className="font-bold text-slate-700">{h.diferenca}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* RESULTADO */}
        <div className="md:col-span-6">
            <Card className={`h-full border-0 shadow-sm ring-1 ring-slate-200 ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
                <CardContent className="p-6 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-10">
                            <ArrowRightLeft size={48} className="mx-auto opacity-20 mb-4"/>
                            <p>Compare o sistema antigo com o novo IVA Dual.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            
                            <div className={`p-6 rounded-2xl border text-center relative overflow-hidden ${resultado.situacao === 'Redução' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">Impacto no Preço</p>
                                <p className={`text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-2 ${resultado.situacao === 'Redução' ? 'text-green-700' : 'text-red-700'}`}>
                                    {resultado.situacao === 'Redução' ? <TrendingDown size={32}/> : <TrendingUp size={32}/>}
                                    {resultado.diferencaValor}
                                </p>
                                <p className="text-sm font-medium mt-2 opacity-80">{resultado.situacao} estimada de {resultado.diferencaPercent}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 opacity-70">
                                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Sistema Antigo</p>
                                    <p className="text-xl font-bold text-slate-700">{resultado.atual.valor}</p>
                                    <p className="text-xs text-slate-500">Carga ~{resultado.atual.taxa}%</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                    <p className="text-[10px] font-bold uppercase text-blue-600 mb-1">Novo IVA (2026+)</p>
                                    <p className="text-xl font-bold text-blue-800">{resultado.novo.valor}</p>
                                    <p className="text-xs text-blue-600">Alíquota {resultado.novo.taxa}%</p>
                                </div>
                            </div>

                            <div className="text-xs text-slate-400 text-center leading-tight">
                                * Simulação baseada na alíquota padrão estimada de 26.5% (IBS+CBS) conforme PLP 68/2024. O valor real depende do repasse da empresa.
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" onClick={() => handleAction("share")}>{linkCopiado ? "Copiado!" : "Compartilhar"}</Button>
                                <Button variant="outline" onClick={() => handleAction("pdf")}>Baixar Relatório</Button>
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
            <div ref={contentRef} className="print:w-full print:p-10 text-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Relatório de Impacto Tributário</h1>
                <p className="text-slate-500 mb-8">Simulação Reforma 2025 - Mestre das Contas</p>
                
                <div className="border rounded-lg p-4 mb-4 text-left">
                    <p><strong>Item:</strong> {resultado.categoriaLabel}</p>
                    <p><strong>Valor Base:</strong> {formatBRL(resultado.rawValor)}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border p-4 rounded bg-slate-100">
                        <p className="text-xs uppercase font-bold">Carga Atual</p>
                        <p className="text-2xl">{resultado.atual.valor}</p>
                    </div>
                    <div className="border p-4 rounded bg-slate-100">
                        <p className="text-xs uppercase font-bold">Novo IVA</p>
                        <p className="text-2xl">{resultado.novo.valor}</p>
                    </div>
                </div>

                <p className="text-lg font-bold">Veredito: {resultado.situacao} de {resultado.diferencaValor}</p>
                <p className="text-xs mt-8 text-slate-400">Este documento é uma estimativa educacional baseada nos textos da Reforma Tributária (EC 132/23).</p>
            </div>
        </div>
      )}

      {/* EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4"><X size={20}/></button>
                <h3 className="font-bold mb-2">Incorporar</h3>
                <code className="text-xs bg-slate-100 p-2 block mb-4 rounded">{`<iframe src="https://mestredascontas.com.br/financeiro/reforma-tributaria?embed=true" width="100%" height="700" style="border:0;" title="Simulador Reforma"></iframe>`}</code>
                <Button onClick={copiarEmbedCode} className="w-full">Copiar</Button>
            </div>
        </div>
      )}
    </div>
  );
}