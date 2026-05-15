"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, CalendarClock, Percent, Car, Home, Wallet,
  Share2, Printer, History, Code2, CheckCircle2, Link as LinkIcon, X, ExternalLink
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateFinancing, type FinancingResult } from "@/lib/calculators/financing";

// --- TIPAGEM ---
type HistoricoFinanc = {
  data: string;
  bem: string;
  entrada: string;
  parcela: string;
  tipo: string;
};

interface FinancingCalculatorProps {
    initialValue?: number;
    initialEntrada?: number;
    initialTaxa?: number;
    initialPrazo?: number;
    initialTipo?: string;
    initialResult?: FinancingResult | null;
}

export default function FinancingCalculator({
    initialValue = 0,
    initialEntrada = 0,
    initialTaxa = 0,
    initialPrazo = 0,
    initialTipo = "price",
    initialResult = null
}: FinancingCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);

  // HELPER FORMAT
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // --- STATES DE DADOS ---
  const [valorBemNum, setValorBemNum] = useState(initialValue);
  const [valorBem, setValorBem] = useState(initialValue > 0 ? formatBRL(initialValue) : "");
  
  const [entradaNum, setEntradaNum] = useState(initialEntrada);
  const [entrada, setEntrada] = useState(initialEntrada > 0 ? formatBRL(initialEntrada) : "");

  const [taxaJuros, setTaxaJuros] = useState(initialTaxa > 0 ? initialTaxa.toString() : "");
  const [prazoMeses, setPrazoMeses] = useState(initialPrazo > 0 ? initialPrazo.toString() : "");
  const [tipoTabela, setTipoTabela] = useState(initialTipo);
  const [resultado, setResultado] = useState<FinancingResult | null>(initialResult);

  // --- FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoFinanc[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Simulacao_Financiamento_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // --- FORMATADORES ---
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleValorBemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setValorBem(display);
    setValorBemNum(value);
  };

  const handleEntradaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setEntrada(display);
    setEntradaNum(value);
  };

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_financ");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialValue > 0 && initialTaxa > 0 && initialPrazo > 0 && !resultado) {
        handleCalcular(initialValue, initialEntrada, initialTaxa, initialPrazo, initialTipo);
    }
  }, [initialValue, initialEntrada, initialTaxa, initialPrazo, initialTipo]);

  // --- HANDLERS ---
  const handleCalcular = (V = valorBemNum, E = entradaNum, i_mensal = parseFloat(taxaJuros), n = parseFloat(prazoMeses), tipo = tipoTabela) => {
    const res = calculateFinancing(V, E, i_mensal, n, tipo);
    if (res) {
        setResultado(res);
        trackEvent("calculate_financiamento", { valor: V, prazo: n, tipo });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: FinancingResult) => {
    const novoItem: HistoricoFinanc = {
        data: new Date().toLocaleDateString("pt-BR"),
        bem: res.valorBem,
        entrada: res.valorEntrada,
        parcela: res.rawTipo === "price" ? res.valorParcela : `${res.primeiraParcela} (1ª)`,
        tipo: res.rawTipo === "price" ? "Price" : "SAC"
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_financ", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setValorBem(""); setValorBemNum(0);
    setEntrada(""); setEntradaNum(0);
    setTaxaJuros(""); setPrazoMeses("");
    setResultado(null);
  };

  const handleShare = (type: "result" | "tool") => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/financiamento-veiculos`, '_blank');
        return;
    }
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let url = baseUrl;

    if (type === "result" && resultado) {
        const params = new URLSearchParams();
        params.set("valor", resultado.rawValor.toString());
        params.set("entrada", resultado.rawEntrada.toString());
        params.set("taxa", resultado.rawTaxa.toString());
        params.set("prazo", resultado.rawPrazo.toString());
        params.set("tipo", resultado.rawTipo);
        url = `${baseUrl}?${params.toString()}`;
    }

    navigator.clipboard.writeText(url);
    setCopiado(type === "result" ? "result" : "link");
    setTimeout(() => setCopiado(null), 2000);
  };

  const saldoDevedor = valorBemNum - entradaNum;

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- COLUNA ESQUERDA: INPUTS --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b border-slate-100 dark:border-slate-800 p-6">
              <div className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-xl flex items-center gap-3 text-slate-800 dark:text-slate-100">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 flex gap-1 shadow-sm">
                        <Car size={18} strokeWidth={2.5} />
                        <Home size={18} strokeWidth={2.5} />
                    </div>
                    Simular Financiamento
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 h-8 px-2 rounded-lg" title="Incorporar no seu site">
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Valor do Bem</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={valorBem} onChange={handleValorBemChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" inputMode="numeric"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Valor da Entrada</Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={entrada} onChange={handleEntradaChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" inputMode="numeric"/>
                    </div>
                  </div>
              </div>

              {saldoDevedor > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-xl text-sm flex items-center justify-between border border-blue-100 dark:border-blue-800">
                      <span className="font-medium">Valor a Financiar:</span>
                      <span className="font-bold text-lg">{formatBRL(saldoDevedor)}</span>
                  </div>
              )}

              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Juros Mensal (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input type="number" value={taxaJuros} onChange={e => setTaxaJuros(e.target.value)} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" placeholder="1.5" inputMode="decimal"/>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Prazo (Meses)</Label>
                      <div className="relative">
                        <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input type="number" value={prazoMeses} onChange={e => setPrazoMeses(e.target.value)} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" placeholder="48" inputMode="numeric"/>
                      </div>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-300 font-medium">Amortização</Label>
                  <Select value={tipoTabela} onValueChange={setTipoTabela}>
                      <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 text-base font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="price">Tabela Price (Fixas)</SelectItem>
                          <SelectItem value="sac">Tabela SAC (Decrescentes)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]" disabled={saldoDevedor <= 0}>
                    Calcular Parcelas
                  </Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                    <X className="h-5 w-5" />
                  </Button>
              </div>
            </CardContent>
          </Card>

          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Recentes</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{item.bem}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Entrada: {item.entrada}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.parcela}</span>
                            <span className="text-[10px] text-blue-600 font-medium">{item.tipo}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- COLUNA DIREITA: RESULTADOS --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card className={`h-full w-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Resumo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2"><Car size={32} className="opacity-30" /></div>
                  <p className="text-sm font-medium max-w-[220px]">Preencha os dados ao lado para ver a simulação.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">
                        {resultado.rawTipo === 'price' ? 'Valor da Parcela (Fixa)' : '1ª Parcela (Decrescente)'}
                    </p>
                    <div className="flex items-center justify-center gap-1 relative z-10">
                       <span className="text-3xl font-extrabold text-white tracking-tight">
                           {resultado.rawTipo === 'price' ? resultado.valorParcela : resultado.primeiraParcela}
                       </span>
                    </div>
                    {resultado.rawTipo === 'sac' && (
                        <p className="text-[10px] text-slate-400 mt-2 relative z-10">Última parcela: {resultado.ultimaParcela}</p>
                    )}
                  </div>

                  <div className="space-y-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden text-sm">
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Financiado</span>
                        <span className="font-bold">{resultado.valorFinanciado}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800 bg-blue-50/50 dark:bg-blue-900/10">
                        <span className="text-blue-700 dark:text-blue-300 font-bold">Total em Juros</span>
                        <span className="font-bold text-red-600 dark:text-red-400">+ {resultado.totalJuros}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 text-white font-bold">
                        <span>Custo Total</span>
                        <span className="text-lg">{resultado.totalPago}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button variant="outline" onClick={() => handleShare("result")} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:text-slate-100 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900">
                          {copiado === "result" ? "Copiado" : "Compartilhar"}
                      </Button>
                      <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:text-slate-100 bg-white dark:bg-slate-900 text-xs font-bold uppercase tracking-wide">
                          <Printer size={16}/> Imprimir
                      </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- IMPRESSÃO --- */}
      <div className="hidden print:block text-slate-900">
        <div ref={contentRef} className="p-8 bg-white">
            <h1 className="text-3xl font-bold border-b-2 border-slate-800 pb-4 mb-8">Simulação de Financiamento</h1>
            {resultado && (
                <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex justify-between mb-4 border-b border-slate-200 pb-4">
                            <span className="font-bold text-lg">Total a Pagar</span>
                            <span className="text-3xl font-extrabold">{resultado.totalPago}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span>Valor do Bem:</span> <strong>{resultado.valorBem}</strong></div>
                            <div><span>Entrada:</span> <strong>{resultado.valorEntrada}</strong></div>
                            <div><span>Financiado:</span> <strong>{resultado.valorFinanciado}</strong></div>
                            <div><span>Juros:</span> <strong className="text-red-600">{resultado.totalJuros}</strong></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold mb-4">Incorporar no Site</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4">
                    <code className="text-xs font-mono text-blue-300 break-all leading-relaxed">
                        {`<iframe src="https://mestredascontas.com.br/financeiro/financiamento-veiculos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Financiamento"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/financiamento-veiculos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Financiamento"></iframe>`);
                    setCopiado("embed");
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Copiado!" : "Copiar Código"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}