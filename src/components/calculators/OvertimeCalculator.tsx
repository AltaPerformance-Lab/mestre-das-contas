"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, DollarSign, RefreshCcw, 
  Share2, Printer, History, Code2, CheckCircle2, X, Sun, Moon
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { calculateOvertime, type OvertimeResult } from "@/lib/calculators/overtime";

// --- TIPAGEM ---
type HistoricoHoras = {
  data: string;
  salario: string;
  total: string;
  qtd50: string;
  qtd100: string;
};

interface OvertimeCalculatorProps {
    initialSalario?: number;
    initialH50?: number;
    initialH100?: number;
    initialResult?: OvertimeResult | null;
}

export default function OvertimeCalculator({
    initialSalario = 0,
    initialH50 = 0,
    initialH100 = 0,
    initialResult = null
}: OvertimeCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);

  // UTILS
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // DADOS
  const [salarioNum, setSalarioNum] = useState(initialSalario);
  const [salario, setSalario] = useState(initialSalario > 0 ? formatBRL(initialSalario) : "");
  const [jornada, setJornada] = useState("220");
  const [horas50, setHoras50] = useState(initialH50 > 0 ? initialH50.toString() : "");
  const [horas100, setHoras100] = useState(initialH100 > 0 ? initialH100.toString() : "");
  const [diasUteis, setDiasUteis] = useState("25");
  const [domingosFeriados, setDomingosFeriados] = useState("5");
  
  const [resultado, setResultado] = useState<OvertimeResult | null>(initialResult);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoHoras[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Calculo_Horas_Extras_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

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

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_horas");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialSalario > 0 && !resultado) {
        handleCalcular(initialSalario, initialH50, initialH100);
    }
  }, [initialSalario, initialH50, initialH100]);

  // HANDLERS
  const handleCalcular = (
      Sal = salarioNum, 
      H50 = parseFloat(horas50) || 0, 
      H100 = parseFloat(horas100) || 0,
      Jor = parseFloat(jornada),
      DU = parseFloat(diasUteis),
      DF = parseFloat(domingosFeriados)
  ) => {
    const res = calculateOvertime(Sal, H50, H100, Jor, DU, DF);
    if (res) {
        setResultado(res);
        trackEvent("calculate_horas_extras", { salario: Sal, h50: H50, h100: H100 });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: OvertimeResult) => {
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

  const handleShare = (type: "result" | "tool") => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/trabalhista/horas-extras`, '_blank');
        return;
    }
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

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Clock size={22} /></div>
                    Calcular Horas Extras
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2" title="Incorporar">
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
                      <Input placeholder="R$ 0,00" value={salario} onChange={handleSalarioChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" inputMode="numeric" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Jornada Mensal</Label>
                    <Select value={jornada} onValueChange={setJornada}>
                        <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="220">220 horas</SelectItem>
                            <SelectItem value="180">180 horas</SelectItem>
                            <SelectItem value="150">150 horas</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5"><Sun size={16} className="text-orange-500"/> Horas 50%</Label>
                    <Input type="number" placeholder="0" value={horas50} onChange={e => setHoras50(e.target.value)} className="h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" inputMode="decimal" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1.5"><Moon size={16} className="text-blue-500"/> Horas 100%</Label>
                    <Input type="number" placeholder="0" value={horas100} onChange={e => setHoras100(e.target.value)} className="h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" inputMode="decimal" />
                  </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-3">DSR (Mês)</p>
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
                  <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg">Calcular</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 rounded-xl transition-colors"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>
          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={14} /> Histórico</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400">{item.qtd50} (50%) + {item.qtd100} (100%)</span>
                        </div>
                        <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.total}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-horas-card" className={`h-full w-full border-0 shadow-lg overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0"><CardTitle className="text-lg font-bold">Extrato</CardTitle></CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2"><Clock size={32} className="opacity-30" /></div>
                  <p className="text-sm font-medium">Preencha os dados ao lado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Total a Receber</p>
                    <div className="relative z-10 text-3xl font-extrabold text-white tracking-tight">{resultado.totalFinal}</div>
                    <p className="text-[10px] text-slate-400 mt-2 relative z-10 border-t border-white/10 pt-2 inline-block px-4">Hora normal: <strong className="text-slate-300">{resultado.valorHora}</strong></p>
                  </div>
                  <div className="space-y-1 w-full bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors"><span className="text-sm text-slate-600 font-medium">H.E. 50%</span><span className="text-sm font-bold">{resultado.total50}</span></div>
                    <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors"><span className="text-sm text-slate-600 font-medium">H.E. 100%</span><span className="text-sm font-bold">{resultado.total100}</span></div>
                    <div className="flex justify-between items-center p-3 bg-purple-50/50 font-bold"><span className="text-sm text-purple-700">Reflexo DSR</span><span className="text-sm">{resultado.dsr}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button variant="outline" onClick={() => handleShare("result")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">
                          {copiado === "result" ? "Copiado" : "Resultado"}
                      </Button>
                      <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide"><Printer size={16}/> PDF</Button>
                      <div className="col-span-2">
                        <ShareAsImage elementId="resultado-horas-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" />
                      </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* MODAL EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Incorporar</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all leading-relaxed">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Horas Extras"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/horas-extras?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Horas Extras"></iframe>`);
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