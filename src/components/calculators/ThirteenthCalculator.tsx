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
  Calculator, DollarSign, CalendarDays, RefreshCcw, Coins, 
  Share2, Printer, History, Code2, CheckCircle2, X, Link as LinkIcon
} from "lucide-react";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { trackEvent } from "@/lib/analytics";
import { calculateThirteenth, type ThirteenthResult } from "@/lib/calculators/thirteenth";

// TIPO PARA HISTÓRICO
type Historico13 = {
  data: string;
  salario: string;
  liquido: string;
  meses: string;
};

interface ThirteenthCalculatorProps {
    initialSalario?: number;
    initialMeses?: number;
    initialDeps?: number;
    initialResult?: ThirteenthResult | null;
}

export default function ThirteenthCalculator({
    initialSalario = 0,
    initialMeses = 12,
    initialDeps = 0,
    initialResult = null
}: ThirteenthCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // HELPER FORMAT
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // STATES DE DADOS
  const [salarioValue, setSalarioValue] = useState(initialSalario);
  const [salarioBruto, setSalarioBruto] = useState(initialSalario > 0 ? formatBRL(initialSalario) : "");
  const [dependentes, setDependentes] = useState(initialDeps.toString());
  const [mesesTrabalhados, setMesesTrabalhados] = useState(initialMeses.toString());
  
  const [resultado, setResultado] = useState<ThirteenthResult | null>(initialResult);

  // STATES DE FUNCIONALIDADES
  const [historico, setHistorico] = useState<Historico13[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Decimo_Terceiro_Simulado_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // FORMATADORES
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleSalarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setSalarioBruto(display);
    setSalarioValue(value);
  };

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_13");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Hidratação via URL (Deep Linking)
    const urlSalario = searchParams.get("salario");
    const urlMeses = searchParams.get("meses");
    const urlDeps = searchParams.get("dependentes");

    if (!initialSalario && urlSalario) {
        const s = parseFloat(urlSalario);
        const m = urlMeses ? parseInt(urlMeses) : 12;
        const d = urlDeps ? parseInt(urlDeps) : 0;
        
        setSalarioValue(s);
        setSalarioBruto(formatBRL(s));
        setMesesTrabalhados(m.toString());
        setDependentes(d.toString());
        
        handleCalcular(s, m, d);
    } else if (initialSalario > 0 && !resultado) {
        handleCalcular(initialSalario, initialMeses, initialDeps);
    }
  }, [searchParams, initialSalario, initialMeses, initialDeps]);

  // CÁLCULO
  const handleCalcular = (pSalario = salarioValue, pMeses = parseInt(mesesTrabalhados), pDeps = parseInt(dependentes) || 0) => {
    const res = calculateThirteenth(pSalario, pMeses, pDeps);
    if (res) {
        setResultado(res);
        trackEvent("calculate_13", { meses: pMeses, salario: pSalario });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: ThirteenthResult) => {
    const novoItem: Historico13 = {
        data: new Date().toLocaleDateString("pt-BR"),
        salario: formatBRL(res.rawSalario),
        liquido: res.totalLiquido,
        meses: `${res.rawMeses}/12`
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_13", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setSalarioBruto(""); setSalarioValue(0);
    setDependentes("0"); setMesesTrabalhados("12");
    setResultado(null);
  };

  const handleShare = (type: "link" | "embed") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("salario", resultado.rawSalario.toString());
            params.set("meses", resultado.rawMeses.toString());
            params.set("dependentes", resultado.rawDeps.toString());
        }
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
        trackEvent("share_13_link");
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px;" title="Calculadora de 13º Salário"></iframe>`);
        trackEvent("share_13_embed");
    }

    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 w-full overflow-hidden bg-white dark:bg-slate-900 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Coins size={22} strokeWidth={2.5} /></div>
                    Dados do 13º Salário
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg" title="Incorporar no seu site">
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-300 font-medium">Salário Bruto</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" inputMode="numeric"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Meses Trabalhados</Label>
                      <Select value={mesesTrabalhados} onValueChange={setMesesTrabalhados}>
                          <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 text-base"><SelectValue /></SelectTrigger>
                          <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 1).map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} meses</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Dependentes</Label>
                      <Input type="number" value={dependentes} onChange={e => setDependentes(e.target.value)} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-900 transition-colors" placeholder="0" inputMode="numeric"/>
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]">Calcular 13º</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"><RefreshCcw className="h-5 w-5" /></Button>
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
                            <span className="text-slate-900 dark:text-slate-100 font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.meses} meses</span>
                        </div>
                        <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs">{item.liquido}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-decimo-card" className={`h-full w-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Resultado Detalhado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2"><CalendarDays size={40} className="opacity-30" /></div>
                  <p className="text-sm font-medium max-w-[200px]">Preencha os dados para ver as parcelas.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">1ª Parcela (Adiantamento)</p>
                    <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">{resultado.primeiraParcela}</p>
                  </div>

                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg text-center">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">2ª Parcela (Saldo Final)</p>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{resultado.segundaParcela}</p>
                  </div>

                  <div className="space-y-0 text-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 dark:text-slate-400 font-medium">Total Bruto ({resultado.meses}/12)</span><span className="font-bold text-slate-900 dark:text-slate-100">{resultado.totalBruto}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-red-500 font-medium flex items-center gap-2">INSS</span><span className="font-bold text-red-600">- {resultado.inss}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-red-500 font-medium flex items-center gap-2">IRRF</span><span className="font-bold text-red-600">- {resultado.irrf}</span></div>
                    <div className="flex justify-between py-3 px-4 bg-slate-50 dark:bg-slate-800/50 font-bold"><span className="text-slate-700 dark:text-slate-300 text-xs uppercase tracking-wide">Total Líquido</span><span className="text-blue-600 dark:text-blue-400 text-base">{resultado.totalLiquido}</span></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:text-slate-100 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900">
                          {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Link</span>}
                      </Button>
                      <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:text-slate-100 bg-white dark:bg-slate-900 text-xs font-bold uppercase tracking-wide">
                          <Printer size={16}/> Imprimir
                      </Button>
                      <div className="col-span-2">
                            <ShareAsImage elementId="resultado-decimo-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" />
                      </div>
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
            <h1 className="text-3xl font-bold border-b-2 border-slate-800 pb-4 mb-8">Extrato de 13º Salário</h1>
            {resultado && (
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200"><p className="text-xs uppercase font-bold text-slate-500 mb-1">Salário Bruto</p><p className="text-xl font-bold">{resultado.totalBruto}</p></div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200"><p className="text-xs uppercase font-bold text-slate-500 mb-1">Meses</p><p className="text-xl font-bold">{resultado.meses} / 12</p></div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200"><p className="text-xs uppercase font-bold text-slate-500 mb-1">Dependentes</p><p className="text-xl font-bold">{resultado.rawDeps}</p></div>
                    </div>
                    <table className="w-full border-collapse">
                        <thead className="bg-slate-100"><tr className="text-left"><th className="p-3">Rubrica</th><th className="p-3 text-right">Valor</th></tr></thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-3">1ª Parcela</td><td className="p-3 text-right font-bold text-emerald-600">{resultado.primeiraParcela}</td></tr>
                            <tr><td className="p-3">2ª Parcela</td><td className="p-3 text-right font-bold text-emerald-600">{resultado.segundaParcela}</td></tr>
                            <tr><td className="p-3 text-red-600">INSS</td><td className="p-3 text-right font-bold text-red-600">- {resultado.inss}</td></tr>
                            <tr><td className="p-3 text-red-600">IRRF</td><td className="p-3 text-right font-bold text-red-600">- {resultado.irrf}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-900 text-white"><tr><td className="p-3 font-bold">LÍQUIDO TOTAL</td><td className="p-3 text-right font-bold text-lg">{resultado.totalLiquido}</td></tr></tfoot>
                    </table>
                </div>
            )}
        </div>
      </div>

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora 13º Salário"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora 13º Salário"></iframe>`);
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