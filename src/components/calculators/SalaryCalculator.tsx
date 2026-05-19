"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, User, Calculator, RefreshCcw, 
  Share2, Printer, History, Code2, CheckCircle2, X, Link as LinkIcon
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { SimpleDonut } from "@/components/ui/SimpleDonut";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { trackEvent } from "@/lib/analytics";
import { calculateSalary, type SalaryResult } from "@/lib/calculators/salary";

// --- TIPAGEM ---
type HistoricoItem = {
  data: string;
  bruto: string;
  liquido: string;
  descontos: string;
};

interface SalaryCalculatorProps {
    initialValue?: number;
    initialDeps?: number;
    initialOutros?: number;
    initialResult?: SalaryResult | null;
}

export default function SalaryCalculator({
    initialValue: propSalario = 0,
    initialDeps: propDeps = 0,
    initialOutros: propOutros = 0,
    initialResult: propResult = null
}: SalaryCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);
  const [isEmbed, setIsEmbed] = useState(false);

  // UTILS
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // Estados inicializados via props ou URL
  const [brutoValue, setBrutoValue] = useState(propSalario);
  const [brutoDisplay, setBrutoDisplay] = useState(propSalario > 0 ? formatBRL(propSalario) : "");
  const [outrosValue, setOutrosValue] = useState(propOutros);
  const [outrosDisplay, setOutrosDisplay] = useState(propOutros > 0 ? formatBRL(propOutros) : "");
  const [dependentes, setDependentes] = useState(propDeps > 0 ? propDeps.toString() : "");
  
  const [resultado, setResultado] = useState<SalaryResult | null>(propResult);

  // Funcionalidades
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Holerite_Simulado_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // --- EFEITOS ---
  useEffect(() => {
    const embedParam = searchParams.get("embed") === "true";
    setIsEmbed(embedParam);
    setIsIframe(window.self !== window.top || embedParam);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_salario");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Lógica de inicialização via URL se props estiverem vazias
    const urlSalario = searchParams.get("salario");
    const urlDeps = searchParams.get("dependentes");
    const urlOutros = searchParams.get("outros");

    if (!propSalario && urlSalario) {
        const s = parseFloat(urlSalario);
        const d = urlDeps ? parseInt(urlDeps) : 0;
        const o = urlOutros ? parseFloat(urlOutros) : 0;
        
        setBrutoValue(s);
        setBrutoDisplay(formatBRL(s));
        setDependentes(d > 0 ? d.toString() : "");
        setOutrosValue(o);
        setOutrosDisplay(o > 0 ? formatBRL(o) : "");
        
        handleCalcular(s, d, o);
    } else if (propSalario > 0 && !resultado) {
        handleCalcular(propSalario, propDeps, propOutros);
    }
  }, [searchParams, propSalario, propDeps, propOutros]);

  // --- HANDLERS ---
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleBrutoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setBrutoDisplay(display);
    setBrutoValue(value);
  };

  const handleOutrosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display, value } = formatarMoedaInput(e.target.value);
    setOutrosDisplay(display);
    setOutrosValue(value);
  };

  const handleCalcular = (pSalario = brutoValue, pDeps = parseInt(dependentes) || 0, pOutros = outrosValue) => {
    if (pSalario <= 0) return;
    const res = calculateSalary(pSalario, pDeps, pOutros);
    if (res) {
        setResultado(res);
        trackEvent("calculate_salario", { bruto: pSalario });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: SalaryResult) => {
    const novoItem: HistoricoItem = { 
        data: new Date().toLocaleDateString("pt-BR"), 
        bruto: res.bruto, 
        liquido: res.liquido,
        descontos: res.totalDescontos
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_salario", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setBrutoDisplay(""); setBrutoValue(0);
    setDependentes("");
    setOutrosDisplay(""); setOutrosValue(0);
    setResultado(null);
  };

  const handleShare = (type: "link" | "embed") => {
    if (isEmbed) {
        window.open(`https://mestredascontas.com.br/financeiro/salario-liquido`, '_blank');
        return;
    }
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado?.rawBruto) params.set("salario", resultado.rawBruto.toString());
        if (resultado?.rawDeps) params.set("dependentes", resultado.rawDeps.toString());
        if (resultado?.rawOutros) params.set("outros", resultado.rawOutros.toString());
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Salário Líquido"></iframe>`);
    }
    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const calculatorContent = (
    <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-7 space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex flex-row items-center justify-between gap-2">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Calculator size={22} /></div> 
                        <div>
                            Calcular Salário
                            <span className="block text-xs font-normal opacity-90 text-blue-100">IRRF 2026</span>
                        </div>
                    </h2>
                    {!isIframe && (
                        <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2">
                            <Code2 size={18} />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
                <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Salário Bruto</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input placeholder="R$ 0,00" value={brutoDisplay} onChange={handleBrutoChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Número de Dependentes</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input type="number" placeholder="0" className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white" value={dependentes} onChange={(e) => setDependentes(e.target.value)} inputMode="numeric" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Outros Descontos</Label>
                    <Input placeholder="R$ 0,00" value={outrosDisplay} onChange={handleOutrosChange} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric" />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg">Calcular</Button>
                    <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 rounded-xl"><RefreshCcw className="h-5 w-5" /></Button>
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
                                <span className="font-bold">{item.bruto}</span>
                                <span className="text-[10px] text-slate-400">{item.data}</span>
                            </div>
                            <span className="font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs tabular-nums">Liq: {item.liquido}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        <div className="lg:col-span-5 h-full">
            <Card id="resultado-salario-card" ref={contentRef} className={`h-full border-0 shadow-lg transition-all duration-500 overflow-hidden ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0"><h3 className="text-lg font-bold">Resumo</h3></CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
                {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2"><Calculator size={32} className="opacity-30" /></div>
                    <p className="text-sm font-medium">Preencha os dados ao lado.</p>
                </div>
                ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                    <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden flex flex-col items-center">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">Salário Líquido</span>
                        <div className="relative z-10 text-3xl font-extrabold text-white tracking-tight"><CountUp value={parseFloat(resultado.liquido.replace(/[^0-9,]/g, '').replace(',', '.'))} /></div>
                        <div className="mt-4 relative z-10"><SimpleDonut data={[{ label: "Líquido", value: parseFloat(resultado.liquido.replace(/[^0-9,]/g, '').replace(',', '.')), color: "#22c55e" }, { label: "Descontos", value: parseFloat(resultado.totalDescontos.replace(/[^0-9,]/g, '').replace(',', '.')), color: "#ef4444" }]} size={120} thickness={12}/></div>
                    </div>
                    <div className="space-y-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden text-sm">
                        <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors"><span>Bruto</span><span className="font-bold">{resultado.bruto}</span></div>
                        <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors text-red-600 font-bold"><span>INSS</span><span>- {resultado.inss}</span></div>
                        <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors text-red-600 font-bold"><span>IRRF</span><span>- {resultado.irrf}</span></div>
                        {resultado.outros !== "R$ 0,00" && <div className="flex justify-between items-center p-3 border-b hover:bg-slate-50 transition-colors text-slate-500 font-bold"><span>Outros</span><span>- {resultado.outros}</span></div>}
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 font-bold text-xs uppercase text-slate-400"><span>Total Descontos</span><span>{resultado.totalDescontos}</span></div>
                    </div>
                    <div className="text-center"><span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">Alíquota Efetiva: <strong>{resultado.aliquotaEfetiva}</strong></span></div>
                    <div className="grid grid-cols-2 gap-3 pt-2 print:hidden">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">{copiado === "link" ? "Copiado" : "Link"}</Button>
                        <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide"><Printer size={16}/> PDF</Button>
                        <div className="col-span-2"><ShareAsImage elementId="resultado-salario-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" /></div>
                    </div>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
    </div>
  );

  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-2 flex flex-col items-center justify-start font-sans">
            <div className="w-full max-w-3xl">
                {calculatorContent}
                <div className="mt-4 text-center border-t border-slate-200 dark:border-slate-800 pt-3">
                    <Link href="https://mestredascontas.com.br/financeiro/salario-liquido" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Calculator size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <div className="w-full font-sans">
      {calculatorContent}

      {/* MODAL EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold mb-4">Incorporar</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4"><code className="text-xs font-mono text-blue-300 break-all leading-relaxed">{`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Salário"></iframe>`}</code></div>
                <Button onClick={() => { navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Salário"></iframe>`); setCopiado("embed"); setTimeout(() => setCopiado(null), 2000); }} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold h-12 rounded-xl">{copiado === "embed" ? "Copiado!" : "Copiar Código"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}