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
  DollarSign, CalendarClock, Percent, Car, Home, Wallet,
  Share2, Printer, History, Code2, CheckCircle2, Link as LinkIcon, X, ExternalLink
} from "lucide-react";

// --- TIPAGEM ---
type HistoricoFinanc = {
  data: string;
  bem: string;
  entrada: string;
  parcela: string;
  tipo: string;
};

type ResultadoFinanc = {
  valorParcela: string;
  primeiraParcela: string;
  ultimaParcela: string;
  totalPago: string;
  totalJuros: string;
  valorFinanciado: string;
  valorBem: string;
  valorEntrada: string;
  tipo: string;
  prazo: string;
  taxa: string;
  rawValor: number;
  rawEntrada: number;
  rawTaxa: number;
  rawPrazo: number;
  rawTipo: string;
};

// Interface para pSEO
interface FinancingCalculatorProps {
  initialValue?: number; // Recebe valor da URL (ex: 50000)
}

export default function FinancingCalculator({ initialValue = 0 }: FinancingCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // --- STATES DE DADOS ---
  const [valorBem, setValorBem] = useState("");
  const [valorBemNum, setValorBemNum] = useState(0);
  
  const [entrada, setEntrada] = useState("");
  const [entradaNum, setEntradaNum] = useState(0);

  const [taxaJuros, setTaxaJuros] = useState("");
  const [prazoMeses, setPrazoMeses] = useState("");
  const [tipoTabela, setTipoTabela] = useState("price"); // price ou sac
  const [resultado, setResultado] = useState<ResultadoFinanc | null>(null);

  // --- FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoFinanc[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  // Estado para data (Correção de Hidratação)
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  
  // Configuração de Impressão
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Simulacao_Financiamento_MestreDasContas",
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

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // --- CÁLCULO CORE ---
  const calcularCore = (
      V: number, 
      E: number, 
      i_mensal: number, 
      n: number, 
      tipo: string
  ) => {
    const P = V - E;

    if (P <= 0 || isNaN(i_mensal) || !n) return;

    const i = i_mensal / 100;
    let valorParcela = 0;
    let totalPago = 0;
    let totalJuros = 0;
    let primeiraParcela = 0;
    let ultimaParcela = 0;

    if (tipo === "price") {
        valorParcela = P * ( (i * Math.pow(1+i, n)) / (Math.pow(1+i, n) - 1) );
        totalPago = valorParcela * n;
        totalJuros = totalPago - P;
        primeiraParcela = valorParcela;
        ultimaParcela = valorParcela;
    } else {
        const amortizacao = P / n;
        primeiraParcela = amortizacao + (P * i);
        // Cálculo simplificado da última parcela (aproximado para SAC)
        ultimaParcela = amortizacao + (amortizacao * i); 
        totalPago = (n * (primeiraParcela + ultimaParcela)) / 2; 
        totalJuros = totalPago - P;
        valorParcela = primeiraParcela;
    }

    const novoResultado: ResultadoFinanc = {
        valorParcela: formatBRL(valorParcela),
        primeiraParcela: formatBRL(primeiraParcela),
        ultimaParcela: formatBRL(ultimaParcela),
        totalPago: formatBRL(totalPago),
        totalJuros: formatBRL(totalJuros),
        valorFinanciado: formatBRL(P),
        valorBem: formatBRL(V),
        valorEntrada: formatBRL(E),
        tipo: tipo === "price" ? "Price (Fixas)" : "SAC (Decrescentes)",
        prazo: `${n} meses`,
        taxa: `${i_mensal}% a.m.`,
        rawValor: V,
        rawEntrada: E,
        rawTaxa: i_mensal,
        rawPrazo: n,
        rawTipo: tipo
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // Wrapper para chamar do botão
  const calcular = () => {
      calcularCore(valorBemNum, entradaNum, parseFloat(taxaJuros), parseFloat(prazoMeses), tipoTabela);
  }

  // --- EFEITOS (INICIALIZAÇÃO) ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_financ");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Lógica de Prioridade: pSEO (Prop) > URL Query (Share)
    if (initialValue > 0) {
        // Modo pSEO: Preenche e sugere valores padrão para o cálculo já aparecer
        setValorBemNum(initialValue);
        setValorBem(formatBRL(initialValue));
        
        // Sugestão inteligente: 20% entrada, 48x, 1.5% a.m.
        const entradaSugerida = initialValue * 0.20;
        setEntradaNum(entradaSugerida);
        setEntrada(formatBRL(entradaSugerida));
        
        setTaxaJuros("1.5");
        setPrazoMeses("48");
        
        // Dispara cálculo automático
        setTimeout(() => {
            calcularCore(initialValue, entradaSugerida, 1.5, 48, "price");
        }, 300);

    } else {
        // Modo Share Link
        const urlValor = searchParams.get("valor");
        const urlEntrada = searchParams.get("entrada");
        const urlTaxa = searchParams.get("taxa");
        const urlPrazo = searchParams.get("prazo");
        const urlTipo = searchParams.get("tipo");

        if (urlValor && urlTaxa && urlPrazo) {
            const val = parseFloat(urlValor);
            const ent = urlEntrada ? parseFloat(urlEntrada) : 0;
            
            setValorBemNum(val);
            setValorBem(formatBRL(val));
            
            setEntradaNum(ent);
            setEntrada(formatBRL(ent));

            setTaxaJuros(urlTaxa);
            setPrazoMeses(urlPrazo);
            if (urlTipo) setTipoTabela(urlTipo);

            setTimeout(() => {
                calcularCore(val, ent, parseFloat(urlTaxa), parseFloat(urlPrazo), urlTipo || "price");
            }, 200);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initialValue]);

  // --- HISTÓRICO ---
  const salvarHistorico = (res: ResultadoFinanc) => {
    const novoItem: HistoricoFinanc = {
        data: new Date().toLocaleDateString("pt-BR"),
        bem: res.valorBem,
        entrada: res.valorEntrada,
        parcela: res.tipo.includes("Price") ? res.valorParcela : `${res.primeiraParcela} (1ª)`,
        tipo: res.tipo.includes("Price") ? "Price" : "SAC"
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

  // --- ACTIONS BLINDADAS ---
  const handleShare = (type: "result" | "tool") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    
    // BLINDAGEM IFRAME
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/financiamento-veiculos`, '_blank');
        return;
    }

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

  const handlePrint = () => {
    // BLINDAGEM IFRAME
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/financiamento-veiculos`, '_blank');
        return;
    }
    if (reactToPrintFn) reactToPrintFn();
  };

  const saldoDevedor = valorBemNum - entradaNum;

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
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 flex gap-1 shadow-sm">
                        <Car size={18} strokeWidth={2.5} />
                        <Home size={18} strokeWidth={2.5} />
                    </div>
                    Simular Financiamento
                  </CardTitle>
                  {!isIframe && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowEmbedModal(true)} 
                        className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 h-8 px-2 rounded-lg"
                        title="Incorporar no seu site"
                      >
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              
              {/* Inputs Valor e Entrada */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor do Bem (Total)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="R$ 0,00" 
                        value={valorBem} 
                        onChange={handleValorBemChange} 
                        className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor da Entrada</Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="R$ 0,00" 
                        value={entrada} 
                        onChange={handleEntradaChange} 
                        className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                        inputMode="numeric"
                      />
                    </div>
                  </div>
              </div>

              {/* Feedback Visual Saldo */}
              {saldoDevedor > 0 && (
                  <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-xl text-sm flex items-center justify-between border border-blue-100 animate-in fade-in">
                      <span className="font-medium">Valor a Financiar:</span>
                      <span className="font-bold text-lg">{formatBRL(saldoDevedor)}</span>
                  </div>
              )}
              {saldoDevedor < 0 && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-100 animate-in fade-in flex items-center gap-2">
                      <X size={16}/> A entrada não pode ser maior que o valor do bem!
                  </div>
              )}

              {/* Inputs Taxa e Prazo */}
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Juros Mensal (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            type="number" 
                            value={taxaJuros} 
                            onChange={e => setTaxaJuros(e.target.value)} 
                            className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                            placeholder="1.5" 
                            inputMode="decimal"
                        />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Prazo (Meses)</Label>
                      <div className="relative">
                        <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            type="number" 
                            value={prazoMeses} 
                            onChange={e => setPrazoMeses(e.target.value)} 
                            className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                            placeholder="48" 
                            inputMode="numeric"
                        />
                      </div>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label className="text-slate-600 font-medium">Sistema de Amortização</Label>
                  <Select value={tipoTabela} onValueChange={setTipoTabela}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-slate-700 font-medium text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="price">Tabela Price (Parcelas Fixas - Veículos)</SelectItem>
                          <SelectItem value="sac">Tabela SAC (Decrescentes - Imóveis)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]" disabled={saldoDevedor <= 0}>
                    Calcular Parcelas
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
                            <span className="text-slate-800 font-bold">{item.bem}</span>
                            <span className="text-[10px] text-slate-400 font-medium">Entrada: {item.entrada}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs tabular-nums">{item.parcela}</span>
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
          <Card className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden flex flex-col ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 bg-white shrink-0">
              <CardTitle className="text-slate-800 text-lg font-bold">Resumo do Financiamento</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <div className="flex gap-1 opacity-40 text-slate-400">
                          <Car size={28} />
                          <Home size={28} />
                      </div>
                  </div>
                  <p className="text-sm font-medium max-w-[220px]">Preencha os dados ao lado para simular as parcelas do seu sonho.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* CARD PRETO DESTAQUE */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    {resultado.rawTipo === 'price' ? (
                        <>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Valor da Parcela (Fixa)</p>
                            <div className="flex items-center justify-center gap-1 relative z-10">
                               <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{resultado.valorParcela}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">1ª Parcela (Decrescente)</p>
                            <div className="flex items-center justify-center gap-1 relative z-10">
                               <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{resultado.primeiraParcela}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-2 relative z-10 border-t border-white/10 pt-2 inline-block px-4">
                                Última parcela: <strong className="text-slate-300">{resultado.ultimaParcela}</strong>
                            </p>
                        </>
                    )}
                  </div>

                  {/* LISTA DETALHADA */}
                  <div className="space-y-1 w-full bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">Valor do Bem</span>
                        <span className="text-sm font-bold text-slate-900">{resultado.valorBem}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">Entrada</span>
                        <span className="text-sm font-bold text-green-600">- {resultado.valorEntrada}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                        <span className="text-sm text-blue-700 font-bold">Valor Financiado</span>
                        <span className="text-sm font-bold text-blue-700">{resultado.valorFinanciado}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">Prazo / Taxa</span>
                        <span className="text-sm font-bold text-slate-900">{resultado.prazo} / {resultado.taxa}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 hover:bg-red-50 transition-colors group">
                        <span className="text-sm text-red-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"><Percent size={14}/> Total em Juros</span>
                        <span className="text-sm font-extrabold text-red-600">+ {resultado.totalJuros}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
                        <span className="text-sm font-bold uppercase tracking-wide">Custo Total</span>
                        <span className="text-base font-extrabold">{resultado.totalPago}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* Não inclui IOF, TAC e seguros (CET). O valor final varia conforme o banco.</p>

                  {/* BOTOES DE AÇÃO */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleShare("result")} 
                        className="h-11 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-xs font-bold uppercase tracking-wide"
                      >
                          {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={16}/> Ver Completo</span> : 
                          (copiado === "result" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Resultado</span>)}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handlePrint} 
                        className="h-11 border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold uppercase tracking-wide"
                      >
                          {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={16}/> Baixar PDF</span> : 
                          <span className="flex items-center gap-2"><Printer size={16}/> Imprimir/PDF</span>}
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
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Simulação de Financiamento</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                </div>
            </div>

            {resultado && (
                <>
                {/* Grid de Dados */}
                <div className="mb-8 grid grid-cols-2 gap-6 text-sm">
                    <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2 border-b border-slate-200 pb-1">Dados do Bem</p>
                        <div className="flex justify-between mb-2"><span>Valor Total:</span> <strong>{resultado.valorBem}</strong></div>
                        <div className="flex justify-between"><span>Entrada:</span> <strong className="text-green-700">- {resultado.valorEntrada}</strong></div>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2 border-b border-slate-200 pb-1">Condições</p>
                        <div className="flex justify-between mb-2"><span>Financiado:</span> <strong>{resultado.valorFinanciado}</strong></div>
                        <div className="flex justify-between"><span>Taxa / Prazo:</span> <strong>{resultado.taxa} / {resultado.prazo}</strong></div>
                    </div>
                </div>

                {/* Box de Resultado */}
                <div className="mb-8 bg-slate-50 p-8 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-end mb-6 border-b border-slate-300 pb-6">
                        <span className="text-lg font-bold text-slate-700">Total a Pagar</span>
                        <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{resultado.totalPago}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Amortização</p>
                            <p className="text-2xl font-bold text-slate-700">{resultado.tipo}</p>
                        </div>
                        <div>
                            <p className="text-xs text-red-600 uppercase font-bold tracking-wider mb-1">Custo dos Juros</p>
                            <p className="text-2xl font-bold text-red-600">+ {resultado.totalJuros}</p>
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
                        {`<iframe src="https://mestredascontas.com.br/financeiro/financiamento-veiculos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Financiamento"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/financiamento-veiculos?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Financiamento"></iframe>`);
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