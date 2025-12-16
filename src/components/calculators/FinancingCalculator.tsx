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
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, ArrowRight
} from "lucide-react";

type HistoricoFinanc = {
  data: string;
  bem: string;
  entrada: string;
  parcela: string;
  tipo: string;
};

export default function FinancingCalculator() {
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
  const [resultado, setResultado] = useState<any>(null);

  // --- FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoFinanc[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Simulacao_Financiamento_MestreDasContas",
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

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_financ");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Ler URL (Agora suporta valor total e entrada)
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
            calcular(val, ent, parseFloat(urlTaxa), parseFloat(urlPrazo), urlTipo || "price");
        }, 200);
    }
  }, [searchParams]);

  // --- CÁLCULO ---
  const calcular = (
      V = valorBemNum, 
      E = entradaNum, 
      i_mensal = parseFloat(taxaJuros), 
      n = parseFloat(prazoMeses), 
      tipo = tipoTabela
  ) => {
    
    // O valor financiado é o Valor do Bem menos a Entrada
    const P = V - E;

    if (P <= 0 || isNaN(i_mensal) || !n) return;

    const i = i_mensal / 100;
    let valorParcela = 0;
    let totalPago = 0;
    let totalJuros = 0;
    let primeiraParcela = 0;
    let ultimaParcela = 0;

    if (tipo === "price") {
        // Tabela Price (Parcelas Fixas)
        valorParcela = P * ( (i * Math.pow(1+i, n)) / (Math.pow(1+i, n) - 1) );
        totalPago = valorParcela * n;
        totalJuros = totalPago - P;
        primeiraParcela = valorParcela;
        ultimaParcela = valorParcela;
    } else {
        // Tabela SAC (Parcelas Decrescentes)
        const amortizacao = P / n;
        primeiraParcela = amortizacao + (P * i);
        ultimaParcela = amortizacao + (amortizacao * i); 
        totalPago = (n * (primeiraParcela + ultimaParcela)) / 2; 
        totalJuros = totalPago - P;
        valorParcela = primeiraParcela; // Exibe a primeira
    }

    const novoResultado = {
        valorParcela: formatBRL(valorParcela),
        primeiraParcela: formatBRL(primeiraParcela),
        ultimaParcela: formatBRL(ultimaParcela),
        totalPago: formatBRL(totalPago),
        totalJuros: formatBRL(totalJuros),
        valorFinanciado: formatBRL(P),
        valorBem: formatBRL(V),
        valorEntrada: formatBRL(E),
        tipo: tipo === "price" ? "Tabela Price (Fixas)" : "Tabela SAC (Decrescentes)",
        prazo: `${n} meses`,
        taxa: `${i_mensal}% a.m.`,
        
        // Dados RAW para reconstrução
        rawValor: V,
        rawEntrada: E,
        rawTaxa: i_mensal,
        rawPrazo: n,
        rawTipo: tipo
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- ACTIONS ---
  const salvarHistorico = (res: any) => {
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/financeiro/financiamento`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("valor", resultado.rawValor.toString());
            params.set("entrada", resultado.rawEntrada.toString());
            params.set("taxa", resultado.rawTaxa.toString());
            params.set("prazo", resultado.rawPrazo.toString());
            params.set("tipo", resultado.rawTipo);
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
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/financiamento?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Financiamento"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  // Helper para mostrar o valor financiado em tempo real
  const saldoDevedor = valorBemNum - entradaNum;

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    {/* ÍCONES LADO A LADO PARA CARRO E CASA */}
                    <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-blue-600 flex gap-1">
                        <Car size={18} />
                        <Home size={18} />
                    </div>
                    Simular Financiamento
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                          <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 md:p-6">
              
              {/* BLOCO VALOR E ENTRADA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor do Bem (Total)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={valorBem} onChange={handleValorBemChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Valor da Entrada</Label>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={entrada} onChange={handleEntradaChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                    </div>
                  </div>
              </div>

              {/* Feedback Visual do Saldo Devedor */}
              {saldoDevedor > 0 && (
                  <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm flex items-center justify-between border border-blue-100 animate-in fade-in">
                      <span>Valor a Financiar:</span>
                      <span className="font-bold">{formatBRL(saldoDevedor)}</span>
                  </div>
              )}
              {saldoDevedor < 0 && (
                  <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold border border-red-100 animate-in fade-in">
                      A entrada não pode ser maior que o valor do bem!
                  </div>
              )}

              {/* BLOCO JUROS E PRAZO */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="text-slate-600">Juros Mensal (%)</Label>
                      <div className="relative">
                        <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" value={taxaJuros} onChange={e => setTaxaJuros(e.target.value)} className="pl-9 h-12 border-slate-200" placeholder="1.5" inputMode="decimal"/>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600">Prazo (Meses)</Label>
                      <div className="relative">
                        <CalendarClock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input type="number" value={prazoMeses} onChange={e => setPrazoMeses(e.target.value)} className="pl-9 h-12 border-slate-200" placeholder="48" inputMode="numeric"/>
                      </div>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label className="text-slate-600">Tipo de Amortização</Label>
                  {/* TEXTOS ENCURTADOS PARA NÃO QUEBRAR NO MOBILE */}
                  <Select value={tipoTabela} onValueChange={setTipoTabela}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-sm md:text-base"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="price">Tabela Price (Parcelas Fixas - Veículos)</SelectItem>
                          <SelectItem value="sac">Tabela SAC (Decrescentes - Imóveis)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <div className="flex gap-3 pt-4">
                  <Button onClick={() => calcular()} className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]" disabled={saldoDevedor <= 0}>Calcular Parcelas</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"><X className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Simulações Recentes</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" onClick={() => {}}>
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{item.bem}</span>
                            <span className="text-[10px] text-slate-400">Entrada: {item.entrada}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{item.parcela}</span>
                            <span className="text-[10px] text-slate-400">{item.tipo}</span>
                        </div>
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
              <CardTitle className="text-slate-800 text-lg md:text-xl">Resumo do Contrato</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center">
                      <div className="flex gap-1 opacity-40">
                          <Car size={24} />
                          <Home size={24} />
                      </div>
                  </div>
                  <p className="text-sm max-w-[200px]">Simule financiamento de veículos, imóveis ou empréstimos pessoais.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Destaque */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    
                    {resultado.rawTipo === 'price' ? (
                        <>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Valor da Parcela (Fixa)</p>
                            <p className="text-3xl md:text-4xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.valorParcela}</p>
                        </>
                    ) : (
                        <>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">1ª Parcela (Decrescente)</p>
                            <p className="text-3xl md:text-4xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.primeiraParcela}</p>
                            <p className="text-[10px] text-slate-400 mt-1 relative z-10">Última: {resultado.ultimaParcela}</p>
                        </>
                    )}
                  </div>

                  {/* Lista */}
                  <div className="space-y-3 text-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
                    <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-600">Valor do Bem</span><span className="font-semibold text-slate-900">{resultado.valorBem}</span></div>
                    <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-600">Entrada</span><span className="font-semibold text-green-600">- {resultado.valorEntrada}</span></div>
                    <div className="flex justify-between py-2 border-b border-slate-100 bg-blue-50/50 -mx-2 px-2 rounded"><span className="text-blue-700 font-medium">Financiado</span><span className="font-bold text-blue-700">{resultado.valorFinanciado}</span></div>
                    
                    <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-slate-600">Prazo / Taxa</span><span className="font-semibold text-slate-900">{resultado.prazo} / {resultado.taxa}</span></div>
                    
                    <div className="flex justify-between py-2 border-b border-slate-100 text-red-600 group">
                        <span className="flex items-center gap-2"><Percent size={16}/> Total Juros</span>
                        <span className="font-extrabold">+ {resultado.totalJuros}</span>
                    </div>

                    <div className="flex justify-between py-2 text-slate-800 items-center group font-bold">
                        <span>Custo Total</span>
                        <span>{resultado.totalPago}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* Não inclui IOF e seguros (CET). O valor final varia conforme o banco.</p>
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

      {/* --- IMPRESSÃO --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Simulação de Financiamento</h1><p className="text-sm text-slate-500 mt-1">Gerado por <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded">
                        <p className="text-xs text-slate-400 uppercase font-bold">Dados do Bem</p>
                        <p className="flex justify-between"><span>Valor Total:</span> <strong>{resultado.valorBem}</strong></p>
                        <p className="flex justify-between"><span>Entrada:</span> <strong>{resultado.valorEntrada}</strong></p>
                    </div>
                    <div className="p-3 border rounded">
                        <p className="text-xs text-slate-400 uppercase font-bold">Condições</p>
                        <p className="flex justify-between"><span>Valor Financiado:</span> <strong>{resultado.valorFinanciado}</strong></p>
                        <p className="flex justify-between"><span>Taxa:</span> <strong>{resultado.taxa}</strong></p>
                        <p className="flex justify-between"><span>Prazo:</span> <strong>{resultado.prazo}</strong></p>
                    </div>
                </div>
                <div className="mb-8 bg-slate-50 p-6 rounded border border-slate-200">
                    <div className="flex justify-between items-end mb-4 border-b border-slate-300 pb-4">
                        <span className="text-lg font-bold">Total a Pagar</span>
                        <span className="text-4xl font-extrabold text-slate-900">{resultado.totalPago}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Sistema de Amortização</p>
                            <p className="text-xl font-bold text-slate-700">{resultado.tipo}</p>
                        </div>
                        <div>
                            <p className="text-xs text-red-600 uppercase font-bold">Total em Juros</p>
                            <p className="text-xl font-bold text-red-700">{resultado.totalJuros}</p>
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
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/financeiro/financiamento?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Financiamento"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-blue-600 hover:bg-blue-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}