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
  Clock, DollarSign, RefreshCcw, 
  Share2, Printer, History, Code2, CheckCircle2, Link as LinkIcon, X, Sun, Moon
} from "lucide-react";
import ShareAsImage from "@/components/ui/ShareAsImage";

// --- TIPAGEM ---
type HistoricoHoras = {
  data: string;
  salario: string;
  total: string;
  qtd50: string;
  qtd100: string;
};

type ResultadoHoras = {
    valorHora: string;
    total50: string;
    total100: string;
    dsr: string;
    totalFinal: string;
    rawSalario: number;
    rawH50: number;
    rawH100: number;
} | null;

export default function OvertimeCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [salario, setSalario] = useState("");
  const [salarioNum, setSalarioNum] = useState(0);
  const [jornada, setJornada] = useState("220"); // 220h (padrão) ou 180h
  const [horas50, setHoras50] = useState(""); // Dias úteis
  const [horas100, setHoras100] = useState(""); // Domingos/Feriados
  const [diasUteis, setDiasUteis] = useState("25"); // Para DSR
  const [domingosFeriados, setDomingosFeriados] = useState("5"); // Para DSR
  
  const [resultado, setResultado] = useState<ResultadoHoras>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoHoras[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  // Estado para data (Correção de Hidratação)
  const [dataAtual, setDataAtual] = useState("");

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Horas_Extras_MestreDasContas",
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

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setSalario(display);
    setSalarioNum(value);
  };

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_horas");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlSalario = searchParams.get("salario");
    const urlH50 = searchParams.get("h50");
    const urlH100 = searchParams.get("h100");

    if (urlSalario) {
        const val = parseFloat(urlSalario);
        setSalarioNum(val);
        setSalario(formatBRL(val));
        if (urlH50) setHoras50(urlH50);
        if (urlH100) setHoras100(urlH100);

        setTimeout(() => {
            calcular(val, parseFloat(urlH50 || "0"), parseFloat(urlH100 || "0"));
        }, 200);
    }
  }, [searchParams]);

  // CÁLCULO
  const calcular = (
      Sal = salarioNum, 
      H50 = parseFloat(horas50) || 0, 
      H100 = parseFloat(horas100) || 0,
      Jor = parseFloat(jornada),
      DU = parseFloat(diasUteis),
      DF = parseFloat(domingosFeriados)
  ) => {
    if (!Sal) return;

    // 1. Valor da Hora Normal
    const valorHora = Sal / Jor;

    // 2. Cálculo Hora Extra 50%
    const valorHora50 = valorHora * 1.5;
    const total50 = valorHora50 * H50;

    // 3. Cálculo Hora Extra 100%
    const valorHora100 = valorHora * 2;
    const total100 = valorHora100 * H100;

    // 4. Cálculo do DSR (Descanso Semanal Remunerado)
    // Fórmula: (Total Horas Extras / Dias Úteis) * Domingos e Feriados
    const totalHorasReais = total50 + total100;
    const dsr = (totalHorasReais / DU) * DF;

    const totalReceber = total50 + total100 + dsr;

    const novoResultado = {
        valorHora: formatBRL(valorHora),
        total50: formatBRL(total50),
        total100: formatBRL(total100),
        dsr: formatBRL(dsr),
        totalFinal: formatBRL(totalReceber),
        // Raw
        rawSalario: Sal,
        rawH50: H50,
        rawH100: H100
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoHoras = {
        data: new Date().toLocaleDateString("pt-BR"),
        salario: formatBRL(res.rawSalario),
        total: res.totalFinal,
        qtd50: `${res.rawH50}h`,
        qtd100: `${res.rawH100}h`
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_horas", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setSalario(""); setSalarioNum(0);
    setHoras50(""); setHoras100("");
    setResultado(null);
  };

  // --- ACTIONS ---
  const handleShare = (type: "result" | "tool") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let url = baseUrl;

    if (type === "result" && resultado) {
        const params = new URLSearchParams();
        params.set("salario", resultado.rawSalario.toString());
        params.set("h50", resultado.rawH50.toString());
        params.set("h100", resultado.rawH100.toString());
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
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} strokeWidth={2.5} /></div>
                    Calcular Horas Extras
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
            
            <CardContent className="space-y-6 p-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Salário Base</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input 
                        placeholder="R$ 0,00" 
                        value={salario} 
                        onChange={handleSalarioChange} 
                        className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" 
                        inputMode="numeric"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Jornada Mensal</Label>
                    <Select value={jornada} onValueChange={setJornada}>
                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 font-medium text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="220">220 horas (Padrão)</SelectItem>
                            <SelectItem value="180">180 horas (Turno/12x36)</SelectItem>
                            <SelectItem value="150">150 horas (30h/sem)</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5"><Sun size={16} className="text-orange-500"/> Horas 50% (Úteis)</Label>
                    <Input 
                        type="number" 
                        placeholder="0" 
                        value={horas50} 
                        onChange={e => setHoras50(e.target.value)} 
                        className="h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" 
                        inputMode="decimal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5"><Moon size={16} className="text-blue-500"/> Horas 100% (Feriados)</Label>
                    <Input 
                        type="number" 
                        placeholder="0" 
                        value={horas100} 
                        onChange={e => setHoras100(e.target.value)} 
                        className="h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" 
                        inputMode="decimal"
                    />
                  </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Configuração do DSR (Mês)</p>
                  <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500 font-medium">Dias Úteis</Label>
                          <Input type="number" value={diasUteis} onChange={e => setDiasUteis(e.target.value)} className="h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-slate-100" />
                      </div>
                      <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500 font-medium">Domingos/Feriados</Label>
                          <Input type="number" value={domingosFeriados} onChange={e => setDomingosFeriados(e.target.value)} className="h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-slate-100" />
                      </div>
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-purple-200 rounded-xl transition-all active:scale-[0.99]">
                    Calcular
                  </Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 rounded-xl transition-colors" title="Limpar dados">
                    <RefreshCcw className="h-5 w-5" />
                  </Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO RÁPIDO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                  <History size={14} /> Cálculos Recentes
                </h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer active:bg-slate-100 dark:active:bg-slate-700">
                        <div className="flex flex-col">
                            <span className="text-slate-800 dark:text-slate-200 font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.qtd50} (50%) + {item.qtd100} (100%)</span>
                        </div>
                        <span className="block font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded text-xs tabular-nums">Total: {item.total}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- COLUNA DIREITA: RESULTADOS --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-horas-card" className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Extrato de Horas Extras</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <div className="text-slate-300"><Clock size={40} /></div>
                  </div>
                  <p className="text-sm font-medium max-w-[220px]">Preencha os dados ao lado para ver o valor das suas horas extras e DSR.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* CARD PRETO DESTAQUE */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/30 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Total a Receber (HE + DSR)</p>
                    <div className="w-full flex items-center justify-center px-4 relative z-10">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight break-words leading-tight text-center">{resultado.totalFinal}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 relative z-10 border-t border-white/10 pt-2 inline-block px-4">
                        Valor da sua hora normal: <strong className="text-slate-300">{resultado.valorHora}</strong>
                    </p>
                  </div>

                  {/* LISTA DETALHADA */}
                  <div className="space-y-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">H.E. 50% (Dias Úteis)</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{resultado.total50}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <span className="text-sm text-slate-600 font-medium">H.E. 100% (Feriados)</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{resultado.total100}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors">
                        <span className="text-sm text-purple-700 dark:text-purple-300 font-bold flex items-center gap-2">Reflexo DSR</span>
                        <span className="text-sm font-extrabold text-purple-700 dark:text-purple-300">{resultado.dsr}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* O DSR é calculado sobre o total das horas extras.</p>

                  {/* BOTOES DE AÇÃO */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleShare("result")} 
                        className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900 dark:text-slate-100"
                      >
                          {copiado === "result" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Resultado</span>}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handlePrint} 
                        className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900 dark:text-slate-100"
                      >
                          <span className="flex items-center gap-2"><Printer size={16}/> Imprimir/PDF</span>
                      </Button>
                      <div className="col-span-2">
                        <ShareAsImage elementId="resultado-horas-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border-none" />
                      </div>
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
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Extrato de Horas Extras</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                </div>
            </div>

            {resultado && (
                <>
                {/* Grid de Dados */}
                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Salário Base</p>
                        <p className="text-xl font-bold text-slate-900">{formatBRL(resultado.rawSalario)}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Horas Realizadas</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.rawH50 + resultado.rawH100}h</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Valor Hora Normal</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.valorHora}</p>
                    </div>
                </div>

                {/* Tabela Detalhada */}
                <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 text-left">Descrição</th>
                                <th className="p-4 text-right">Valor a Pagar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-medium">Horas Extras 50% (Dias Úteis)</td>
                                <td className="p-4 text-right">{resultado.total50}</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium">Horas Extras 100% (Feriados)</td>
                                <td className="p-4 text-right">{resultado.total100}</td>
                            </tr>
                            <tr className="bg-slate-50/50">
                                <td className="p-4 font-bold text-slate-700">Reflexo no DSR</td>
                                <td className="p-4 text-right font-bold text-slate-700">{resultado.dsr}</td>
                            </tr>
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="p-4 font-bold uppercase tracking-wider">Total a Receber</td>
                                <td className="p-4 text-right font-extrabold text-lg">{resultado.totalFinal}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* CTA Footer Impressão */}
                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Acesse essa ferramenta em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Não vale como documento oficial
                    </div>
                </div>
                </>
            )}
        </div>
      </div>

      {/* --- MODAL DE EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Horas Extras"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Horas Extras"></iframe>`);
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