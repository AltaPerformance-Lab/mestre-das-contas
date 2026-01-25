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
  Briefcase, DollarSign, CalendarRange, RefreshCcw, 
  Share2, Printer, History, Code2, ExternalLink, CheckCircle2, X, ShieldAlert, Link as LinkIcon
} from "lucide-react";
import ShareAsImage from "@/components/ui/ShareAsImage";

// --- TIPAGEM ---
type HistoricoSeguro = {
  data: string;
  media: string;
  parcelas: string;
  valor: string;
};

type ResultadoSeguro = {
    media: string;
    valorParcela: string;
    qtdParcelas: number;
    total: string;
    direito: boolean;
    motivoNegativa: string;
    rawS1: number;
    rawS2: number;
    rawS3: number;
    rawMeses: number;
    rawVez: number;
} | null;

export default function UnemploymentCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [salario1, setSalario1] = useState("");
  const [salario2, setSalario2] = useState("");
  const [salario3, setSalario3] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("");
  const [solicitacao, setSolicitacao] = useState("1"); // 1ª, 2ª ou 3ª solicitação
  const [resultado, setResultado] = useState<ResultadoSeguro>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoSeguro[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Seguro_Desemprego_Simulado_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // UTILS
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleSalarioChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display } = formatarMoedaInput(e.target.value);
    setter(display);
  };

  const parseMoeda = (val: string) => parseFloat(val.replace(/\./g, "").replace(",", ".").replace("R$", "").trim()) || 0;
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_seguro");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlS1 = searchParams.get("s1");
    const urlS2 = searchParams.get("s2");
    const urlS3 = searchParams.get("s3");
    const urlMeses = searchParams.get("meses");
    const urlSol = searchParams.get("sol");

    if (urlS1 && urlMeses) {
        setSalario1(formatBRL(parseFloat(urlS1)));
        if (urlS2) setSalario2(formatBRL(parseFloat(urlS2)));
        if (urlS3) setSalario3(formatBRL(parseFloat(urlS3)));
        setMesesTrabalhados(urlMeses);
        if (urlSol) setSolicitacao(urlSol);

        setTimeout(() => {
            calcular(parseFloat(urlS1), urlS2 ? parseFloat(urlS2) : 0, urlS3 ? parseFloat(urlS3) : 0, parseInt(urlMeses), parseInt(urlSol || "1"));
        }, 200);
    }
  }, [searchParams]);

  // LÓGICA OFICIAL 2025
  const calcular = (
      s1 = parseMoeda(salario1), 
      s2 = parseMoeda(salario2), 
      s3 = parseMoeda(salario3), 
      meses = parseInt(mesesTrabalhados), 
      vez = parseInt(solicitacao)
  ) => {
    
    if (!meses || isNaN(meses)) return;

    // 1. Calcular Média (Últimos 3 salários)
    let soma = s1 + s2 + s3;
    let divisor = 0;
    if (s1 > 0) divisor++;
    if (s2 > 0) divisor++;
    if (s3 > 0) divisor++;
    
    const mediaSalarial = divisor > 0 ? soma / divisor : 0;

    // 2. Calcular Valor da Parcela (Tabela 2025 - Base Salário Mínimo R$ 1.509 - Estimativa)
    let valorParcela = 0;
    const salarioMinimo = 1509.00; // Estimativa 2025

    if (mediaSalarial <= 2128.84) { // Faixas ajustadas proporcionalmente (estimativa)
        valorParcela = mediaSalarial * 0.8;
    } else if (mediaSalarial <= 3548.47) {
        valorParcela = 1703.07 + ((mediaSalarial - 2128.84) * 0.5);
    } else {
        valorParcela = 2412.98; // Teto estimado
    }

    if (valorParcela < salarioMinimo) valorParcela = salarioMinimo;

    // 3. Calcular Quantidade de Parcelas
    let qtdParcelas = 0;

    if (vez === 1) {
        if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0; 
    } else if (vez === 2) {
        if (meses >= 9 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0;
    } else { // 3ª ou mais
        if (meses >= 6 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0;
    }

    const totalReceber = valorParcela * qtdParcelas;

    const novoResultado = {
        media: formatBRL(mediaSalarial),
        valorParcela: formatBRL(valorParcela),
        qtdParcelas,
        total: formatBRL(totalReceber),
        direito: qtdParcelas > 0,
        motivoNegativa: qtdParcelas === 0 ? "Tempo de trabalho insuficiente para esta solicitação." : "",
        rawS1: s1, rawS2: s2, rawS3: s3, rawMeses: meses, rawVez: vez
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
    if (!res.direito) return;
    const novoItem: HistoricoSeguro = {
        data: new Date().toLocaleDateString("pt-BR"),
        media: res.media,
        parcelas: `${res.qtdParcelas}x`,
        valor: res.valorParcela
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_seguro", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setSalario1(""); setSalario2(""); setSalario3("");
    setMesesTrabalhados(""); setSolicitacao("1");
    setResultado(null);
  };

  const handleShare = (type: "link" | "embed") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("s1", resultado.rawS1.toString());
            params.set("s2", resultado.rawS2.toString());
            params.set("s3", resultado.rawS3.toString());
            params.set("meses", resultado.rawMeses.toString());
            params.set("sol", resultado.rawVez.toString());
        }
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="750" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Seguro Desemprego"></iframe>`);
    }

    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Briefcase size={22} strokeWidth={2.5} /></div>
                    Simular Seguro
                  </CardTitle>
                  {!isIframe && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowEmbedModal(true)} 
                        className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg"
                        title="Incorporar no seu site"
                      >
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              
              <div className="space-y-4">
                  <Label className="text-slate-600 dark:text-slate-300 font-medium">Últimos 3 Salários Brutos</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">1º</span>
                          <Input placeholder="R$ 0,00" value={salario1} onChange={handleSalarioChange(setSalario1)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">2º</span>
                          <Input placeholder="R$ 0,00" value={salario2} onChange={handleSalarioChange(setSalario2)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">3º</span>
                          <Input placeholder="R$ 0,00" value={salario3} onChange={handleSalarioChange(setSalario3)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900" inputMode="numeric"/>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Meses Trabalhados (Últimos 36m)</Label>
                      <Input type="number" value={mesesTrabalhados} onChange={e => setMesesTrabalhados(e.target.value)} className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-slate-900" placeholder="Ex: 24" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Quantas vezes já solicitou?</Label>
                      <Select value={solicitacao} onValueChange={setSolicitacao}>
                          <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white"><SelectValue /></SelectTrigger>
                          <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                              <SelectItem value="1" className="dark:text-slate-200 focus:dark:bg-slate-700">Primeira vez</SelectItem>
                              <SelectItem value="2" className="dark:text-slate-200 focus:dark:bg-slate-700">Segunda vez</SelectItem>
                              <SelectItem value="3" className="dark:text-slate-200 focus:dark:bg-slate-700">Terceira vez ou mais</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>

              <div className="flex gap-3 pt-6">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none rounded-xl transition-all active:scale-[0.99]">
                    Calcular Benefício
                  </Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 dark:bg-slate-900 rounded-xl transition-colors" title="Limpar">
                    <RefreshCcw className="h-6 w-6" />
                  </Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO RÁPIDO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                  <History size={14} /> Histórico Recente
                </h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer active:bg-slate-100 dark:active:bg-slate-700">
                        <div className="flex flex-col">
                            <span className="text-slate-900 dark:text-slate-100 font-bold">Média: {item.media}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.data}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.valor}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.parcelas}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- COLUNA DIREITA: RESULTADOS --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-seguro-card" className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Resultado da Simulação</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                      <ShieldAlert size={40} className="opacity-30" />
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Preencha os dados ao lado para ver se tem direito e o valor.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {resultado.direito ? (
                      <>
                        {/* Destaque Positivo */}
                        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                            
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Valor da Parcela</p>
                            <div className="w-full flex items-center justify-center px-4 relative z-10">
                                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-words leading-tight text-center">{resultado.valorParcela}</span>
                            </div>
                            
                            <div className="inline-block mt-4 px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30 relative z-10">
                                {resultado.qtdParcelas} Parcelas
                            </div>
                        </div>

                        {/* Detalhes */}
                        <div className="space-y-0 text-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
                            <div className="flex justify-between py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="text-slate-600 dark:text-slate-400 font-medium">Média Salarial (3 meses)</span>
                                <span className="font-bold text-slate-900 dark:text-slate-100">{resultado.media}</span>
                            </div>
                            <div className="flex justify-between py-3 px-4 bg-blue-50/50 dark:bg-blue-900/20">
                                <span className="text-slate-700 dark:text-slate-300 font-bold">Total do Benefício</span>
                                <span className="text-blue-700 dark:text-blue-400 font-extrabold">{resultado.total}</span>
                            </div>
                        </div>
                      </>
                  ) : (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-8 text-center shadow-sm">
                          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400"><X size={32}/></div>
                          <h3 className="font-bold text-red-800 dark:text-red-200 mb-2 text-lg">Sem Direito ao Benefício</h3>
                          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed max-w-[250px] mx-auto">{resultado.motivoNegativa}</p>
                          <p className="text-xs text-red-600 dark:text-red-400 mt-4 bg-red-100/50 dark:bg-red-900/20 py-2 px-3 rounded inline-block">Requisito não atendido</p>
                      </div>
                  )}
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* Cálculo baseado na tabela vigente do Ministério do Trabalho.</p>

                  {/* BOTOES DE AÇÃO */}
                  {resultado.direito && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Compartilhar</span>}
                        </Button>
                        <Button variant="outline" onClick={handlePrint} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            <span className="flex items-center gap-2"><Printer size={16}/> Imprimir PDF</span>
                        </Button>
                        <div className="col-span-2">
                           <ShareAsImage elementId="resultado-seguro-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border-none" />
                        </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* --- LAYOUT DE IMPRESSÃO (ESCONDIDO NA TELA) --- */}
      {resultado && resultado.direito && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Simulação Seguro Desemprego</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Gerado por <strong>Mestre das Contas</strong></p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Relatório</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-6 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Média Salarial</p>
                        <p className="text-2xl font-bold text-slate-900">{resultado.media}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Solicitação</p>
                        <p className="text-2xl font-bold text-slate-900">{resultado.rawVez}ª vez</p>
                    </div>
                </div>

                <div className="mb-8 bg-slate-50 p-8 rounded-xl border border-slate-200 text-center">
                    <p className="text-sm uppercase font-bold text-slate-500 mb-2">Valor do Benefício</p>
                    <p className="text-5xl font-extrabold text-slate-900 mb-2">{resultado.valorParcela}</p>
                    <p className="text-xl font-medium text-blue-600">em {resultado.qtdParcelas} parcelas</p>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm fixed bottom-0 w-full">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Ferramenta disponível em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL DE EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Seguro Desemprego"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Seguro Desemprego"></iframe>`);
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