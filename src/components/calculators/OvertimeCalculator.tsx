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
  Clock, DollarSign, Calendar, RefreshCcw, 
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, Sun, Moon
} from "lucide-react";

type HistoricoHoras = {
  data: string;
  salario: string;
  total: string;
  qtd50: string;
  qtd100: string;
};

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
  
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoHoras[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Horas_Extras_MestreDasContas",
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { window.open(`https://mestredascontas.com.br/trabalhista/horas-extras`, '_blank'); return; }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("salario", resultado.rawSalario.toString());
            params.set("h50", resultado.rawH50.toString());
            params.set("h100", resultado.rawH100.toString());
        }
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { reactToPrintFn(); }
    else if (action === "embed") { setShowEmbedModal(true); }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Horas Extras"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg text-purple-600"><Clock size={20} /></div>
                    Calcular Horas Extras
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                          <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 md:p-6">
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Salário Base</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input placeholder="R$ 0,00" value={salario} onChange={handleSalarioChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium">Jornada Mensal</Label>
                    <Select value={jornada} onValueChange={setJornada}>
                        <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="220">220 horas (Padrão)</SelectItem>
                            <SelectItem value="180">180 horas (Turno/12x36)</SelectItem>
                            <SelectItem value="150">150 horas (30h/sem)</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium flex items-center gap-1"><Sun size={14}/> Horas 50% (Úteis)</Label>
                    <Input type="number" placeholder="0" value={horas50} onChange={e => setHoras50(e.target.value)} className="h-12 border-slate-200" inputMode="decimal"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 font-medium flex items-center gap-1"><Moon size={14}/> Horas 100% (Feriados)</Label>
                    <Input type="number" placeholder="0" value={horas100} onChange={e => setHoras100(e.target.value)} className="h-12 border-slate-200" inputMode="decimal"/>
                  </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-2">Configuração do DSR (Mês)</p>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Dias Úteis</Label>
                          <Input type="number" value={diasUteis} onChange={e => setDiasUteis(e.target.value)} className="h-9 bg-white" />
                      </div>
                      <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Domingos/Feriados</Label>
                          <Input type="number" value={domingosFeriados} onChange={e => setDomingosFeriados(e.target.value)} className="h-9 bg-white" />
                      </div>
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-purple-600 hover:bg-purple-700 h-14 text-lg font-bold shadow-lg shadow-purple-200 transition-all active:scale-[0.98]">Calcular</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-500 hover:text-purple-600 hover:bg-purple-50"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Cálculos Recentes</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400">{item.qtd50} (50%) + {item.qtd100} (100%)</span>
                        </div>
                        <span className="font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-xs">Total: {item.total}</span>
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
              <CardTitle className="text-slate-800 text-lg md:text-xl">Demonstrativo</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><Calendar size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Preencha os dados para ver o valor das horas extras e DSR.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Destaque */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Total a Receber (HE + DSR)</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.totalFinal}</p>
                    <p className="text-[10px] text-slate-500 mt-2 relative z-10">Valor da sua hora normal: {resultado.valorHora}</p>
                  </div>

                  {/* Lista Detalhada */}
                  <div className="space-y-3 text-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">H.E. 50% (Dias Úteis)</span>
                        <span className="font-semibold text-slate-900">{resultado.total50}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">H.E. 100% (Feriados)</span>
                        <span className="font-semibold text-slate-900">{resultado.total100}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-purple-50/50 -mx-2 px-2 rounded">
                        <span className="text-purple-700 font-bold flex items-center gap-2">Reflexo DSR</span>
                        <span className="font-extrabold text-purple-700">{resultado.dsr}</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* O DSR é calculado sobre o total das horas extras.</p>
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
                    <div><h1 className="text-3xl font-bold text-slate-900">Extrato de Horas Extras</h1><p className="text-sm text-slate-500 mt-1">Simulação <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Salário Base</p><p className="text-xl font-bold">{formatBRL(resultado.rawSalario)}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Horas Realizadas</p><p className="text-xl font-bold">{resultado.rawH50 + resultado.rawH100}h</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Valor Hora Normal</p><p className="text-xl font-bold">{resultado.valorHora}</p></div>
                </div>
                <div className="mb-8">
                    <table className="w-full text-sm border border-slate-300">
                        <thead className="bg-slate-100"><tr><th className="p-3 text-left border-b">Descrição</th><th className="p-3 text-right border-b">Valor</th></tr></thead>
                        <tbody>
                            <tr><td className="p-3 border-b">Horas Extras 50%</td><td className="p-3 text-right border-b">{resultado.total50}</td></tr>
                            <tr><td className="p-3 border-b">Horas Extras 100%</td><td className="p-3 text-right border-b">{resultado.total100}</td></tr>
                            <tr><td className="p-3 border-b font-bold">Reflexo no DSR</td><td className="p-3 text-right border-b font-bold">{resultado.dsr}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-50 font-bold">
                            <tr><td className="p-3 text-right">TOTAL A RECEBER</td><td className="p-3 text-right text-lg text-blue-600 bg-blue-50 border-t border-blue-200">{resultado.totalFinal}</td></tr>
                        </tfoot>
                    </table>
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
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Horas Extras"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-purple-600 hover:bg-purple-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}