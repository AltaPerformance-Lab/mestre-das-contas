"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
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

// --- TIPAGEM ---
type HistoricoItem = {
  data: string;
  bruto: string;
  liquido: string;
  descontos: string;
};

type ResultadoSalario = {
    bruto: string;
    inss: string;
    irrf: string;
    outros: string;
    totalDescontos: string;
    liquido: string;
    aliquotaEfetiva: string;
    rawBruto: number;
    rawDeps: number;
    rawOutros: number;
} | null;

// --- PROP PARA PSEO ---
interface SalaryCalculatorProps {
    initialValue?: number;
}

export default function SalaryCalculator({ initialValue }: SalaryCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // Estados
  const [brutoDisplay, setBrutoDisplay] = useState("");
  const [outrosDisplay, setOutrosDisplay] = useState("");
  const [brutoValue, setBrutoValue] = useState(0);
  const [outrosValue, setOutrosValue] = useState(0);
  const [dependentes, setDependentes] = useState("");
  
  const [resultado, setResultado] = useState<ResultadoSalario>(null);

  // Funcionalidades
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Holerite_Simulado_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // --- FORMATAÇÃO ---
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_salario");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlSalario = searchParams.get("salario");
    const urlDeps = searchParams.get("dependentes");
    const urlOutros = searchParams.get("outros");

    let valorInicial = 0;
    let depsInicial = 0;
    let outrosInicial = 0;
    let deveCalcular = false;

    if (initialValue && initialValue > 0) {
        valorInicial = initialValue;
        deveCalcular = true;
    } else if (urlSalario) {
        valorInicial = parseFloat(urlSalario);
        if (urlDeps) {
            depsInicial = parseInt(urlDeps);
            setDependentes(urlDeps);
        }
        if (urlOutros) {
            outrosInicial = parseFloat(urlOutros);
            setOutrosValue(outrosInicial);
            setOutrosDisplay(formatCurrency(outrosInicial));
        }
        deveCalcular = true;
    }

    if (deveCalcular && valorInicial > 0) {
        setBrutoValue(valorInicial);
        setBrutoDisplay(formatCurrency(valorInicial));
        setTimeout(() => {
            calcular(valorInicial, depsInicial, outrosInicial);
        }, 100);
    }
  }, [searchParams, initialValue]);

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

  // --- CÁLCULO ---
  const calcular = (pSalario = brutoValue, pDeps = parseInt(dependentes) || 0, pOutros = outrosValue) => {
    const salario = pSalario;
    let inss = 0;
    let resto = salario;

    if (salario > 7786.02) {
        inss = 908.85; 
    } else {
        if (salario > 4000.03) { inss += (salario - 4000.03) * 0.14; resto = 4000.03; }
        if (resto > 2666.68) { inss += (resto - 2666.68) * 0.12; resto = 2666.68; }
        if (resto > 1412.00) { inss += (resto - 1412.00) * 0.09; resto = 1412.00; }
        inss += resto * 0.075;
    }

    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = salario - inss - deducaoDependentes;
    let irrf = 0;

    // NOVA TABELA IRRF 2026 (Projeção Isenção 5k)
    // Tabela progressiva ajustada para continuidade matemática
    if (baseIRRF <= 5000.00) { irrf = 0; }
    else if (baseIRRF <= 7500.00) { irrf = (baseIRRF * 0.075) - 375.00; }
    else if (baseIRRF <= 10000.00) { irrf = (baseIRRF * 0.15) - 937.50; }
    else if (baseIRRF <= 12500.00) { irrf = (baseIRRF * 0.225) - 1687.50; }
    else { irrf = (baseIRRF * 0.275) - 2312.50; }
    
    if (irrf < 0) irrf = 0;

    const totalDescontos = inss + irrf + pOutros;
    const salarioLiquido = salario - totalDescontos;

    const novoResultado = {
      bruto: formatCurrency(salario),
      inss: formatCurrency(inss),
      irrf: formatCurrency(irrf),
      outros: formatCurrency(pOutros),
      totalDescontos: formatCurrency(totalDescontos),
      liquido: formatCurrency(salarioLiquido),
      aliquotaEfetiva: salario > 0 ? ((totalDescontos / salario) * 100).toFixed(2) + "%" : "0%",
      rawBruto: salario,
      rawDeps: pDeps,
      rawOutros: pOutros
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
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
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/salario-liquido`, '_blank');
        return;
    }
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado?.rawBruto) params.set("salario", resultado.rawBruto.toString());
        if (resultado?.rawDeps) params.set("dependentes", resultado.rawDeps.toString());
        if (resultado?.rawOutros) params.set("outros", resultado.rawOutros.toString());
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Salário Líquido"></iframe>`);
    }
    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/financeiro/salario-liquido`, '_blank');
        return;
    }
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- COLUNA 1: FORMULÁRIO --- */}
        <div className="lg:col-span-7 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex flex-row items-center justify-between gap-2">
                    <CardTitle className="text-xl flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Calculator size={22} strokeWidth={2.5} /></div> 
                        <div>
                            Calcular Salário
                            <span className="block text-xs font-normal opacity-90 text-blue-100">Atualizado: Isenção IR até R$ 5k</span>
                        </div>
                    </CardTitle>
                    {!isIframe && (
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setShowEmbedModal(true)} 
                            className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg"
                        >
                            <Code2 size={18} />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
                <div className="space-y-2">
                    <Label htmlFor="salario" className="text-slate-600 dark:text-slate-300 font-medium">Salário Bruto</Label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            id="salario" 
                            placeholder="R$ 0,00" 
                            value={brutoDisplay} 
                            onChange={handleBrutoChange} 
                            className="pl-10 text-lg font-medium h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-colors" 
                            maxLength={18} 
                            inputMode="numeric" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="dependentes" className="text-slate-600 dark:text-slate-300 font-medium">Número de Dependentes</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input 
                            id="dependentes" 
                            type="number" 
                            placeholder="0" 
                            className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-colors" 
                            value={dependentes} 
                            onChange={(e) => setDependentes(e.target.value)} 
                            inputMode="numeric" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="outros" className="text-slate-600 dark:text-slate-300 font-medium">Outros Descontos (Opcional)</Label>
                    <Input 
                        id="outros" 
                        placeholder="R$ 0,00" 
                        value={outrosDisplay} 
                        onChange={handleOutrosChange} 
                        className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 dark:text-white transition-colors" 
                        inputMode="numeric" 
                    />
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-3 rounded-lg flex items-start gap-3 mt-2">
                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-emerald-800 dark:text-emerald-200">
                        <p className="font-bold mb-1">Legislação Vigente (2026)</p>
                        <p className="leading-relaxed opacity-90">
                            Cálculo atualizado com a nova faixa de isenção de IRPF até <strong>R$ 5.000,00</strong>. 
                            <a href="https://www.gov.br/receitafederal/pt-br" target="_blank" rel="noopener noreferrer" className="underline ml-1 hover:text-emerald-600 dark:hover:text-emerald-300">
                                Fonte Oficial (Gov.br)
                            </a>
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-14 text-lg font-bold shadow-lg shadow-blue-200 dark:shadow-none rounded-xl transition-all active:scale-[0.99]">
                        Calcular
                    </Button>
                    <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 bg-white dark:bg-slate-900 rounded-xl transition-colors">
                        <RefreshCcw className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
            </Card>

            {/* HISTÓRICO */}
            {!isIframe && historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Últimos Cálculos</h4>
                    <div className="space-y-1">
                    {historico.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer active:bg-slate-100 dark:active:bg-slate-700" 
                             onClick={() => { 
                                 const valBruto = item.bruto.replace("R$", "").trim();
                                 handleBrutoChange({ target: { value: valBruto.replace(/\./g, "").replace(",", "") } } as any);
                             }}>
                            <div className="flex flex-col">
                                <span className="text-slate-800 dark:text-slate-200 font-bold">{item.bruto}</span>
                                <span className="text-[10px] text-slate-400">{item.data}</span>
                            </div>
                            <span className="font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-xs tabular-nums">Liq: {item.liquido}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- COLUNA 2: RESULTADO --- */}
        <div className="lg:col-span-5 h-full">
            <Card id="resultado-salario-card" className={`h-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-500 overflow-hidden ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Holerite Simulado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
                {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                        <Calculator size={40} className="opacity-30" />
                    </div>
                    <p className="text-sm font-medium max-w-[200px]">Preencha os dados ao lado para ver a mágica acontecer.</p>
                </div>
                ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                    
                    {/* CARD LÍQUIDO COM CHART */}
                    <div className="bg-slate-900 p-0 rounded-2xl shadow-xl relative overflow-hidden w-full group flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/30 transition-colors duration-500"></div>
                        
                        <div className="p-6 pb-2 w-full relative z-10 flex flex-col items-center justify-center text-center">
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Salário Líquido</span>
                            <div className="w-full flex items-center justify-center px-4 relative z-10">
                                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight break-words leading-tight text-center">
                                    <CountUp value={parseFloat(resultado.liquido.replace(/[^0-9,]/g, '').replace(',', '.'))} />
                                </span>
                            </div>
                        </div>

                         {/* Mini Donut Chart no Card - Agora em linha separada */}
                        <div className="p-6 pt-2 w-full flex items-center justify-center relative z-10">
                             <SimpleDonut 
                                data={[
                                    { label: "Líquido", value: parseFloat(resultado.liquido.replace(/[^0-9,]/g, '').replace(',', '.')), color: "#22c55e" },
                                    { label: "Descontos", value: parseFloat(resultado.totalDescontos.replace(/[^0-9,]/g, '').replace(',', '.')), color: "#ef4444" },
                                ]} 
                                size={140} 
                                thickness={16}
                             />
                        </div>
                    </div>

                    {/* TABELA DE VALORES */}
                    <div className="space-y-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden text-sm">
                        <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <span className="text-slate-600 dark:text-slate-400 font-medium">Salário Bruto</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">{resultado.bruto}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> INSS</span>
                            <span className="font-bold text-red-600 dark:text-red-400">- {resultado.inss}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> IRRF</span>
                            <span className="font-bold text-red-600 dark:text-red-400">- {resultado.irrf}</span>
                        </div>
                        {resultado.outros !== "R$ 0,00" && (
                            <div className="flex justify-between items-center p-3 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Outros</span>
                                <span className="font-bold text-slate-600 dark:text-slate-300">- {resultado.outros}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50">
                            <span className="text-slate-400 text-xs uppercase font-bold">Total Descontos</span>
                            <span className="text-slate-500 dark:text-slate-400 font-bold">{resultado.totalDescontos}</span>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                            Alíquota Efetiva Real: <strong className="text-slate-600 dark:text-slate-300">{resultado.aliquotaEfetiva}</strong>
                        </span>
                    </div>

                    {/* BOTÕES DE AÇÃO */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Link</span>}
                        </Button>
                        <Button variant="outline" onClick={handlePrint} className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-bold uppercase tracking-wide">
                            <span className="flex items-center gap-2"><Printer size={16}/> Imprimir</span>
                        </Button>
                        <div className="col-span-2">
                            <ShareAsImage elementId="resultado-salario-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border-none" />
                        </div>
                    </div>
                </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>

      {/* --- LAYOUT DE IMPRESSÃO --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mestre das Contas</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">www.mestredascontas.com.br</p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Holerite Simulado</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Salário Base</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.bruto}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Dependentes</p>
                        <p className="text-xl font-bold text-slate-900">{dependentes || 0}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Outros Descontos</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.outros}</p>
                    </div>
                </div>

                <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 text-left">Descrição</th>
                                <th className="p-4 text-right text-green-700">Proventos</th>
                                <th className="p-4 text-right text-red-700">Descontos</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr>
                                <td className="p-4 font-medium">Salário Bruto</td>
                                <td className="p-4 text-right text-green-700 font-bold">{resultado.bruto}</td>
                                <td className="p-4 text-right text-slate-400">-</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium">INSS</td>
                                <td className="p-4 text-right text-slate-400">-</td>
                                <td className="p-4 text-right text-red-600 font-bold">{resultado.inss}</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium">IRRF</td>
                                <td className="p-4 text-right text-slate-400">-</td>
                                <td className="p-4 text-right text-red-600 font-bold">{resultado.irrf}</td>
                            </tr>
                            {resultado.outros !== "R$ 0,00" && (
                                <tr>
                                    <td className="p-4 font-medium">Outros Descontos</td>
                                    <td className="p-4 text-right text-slate-400">-</td>
                                    <td className="p-4 text-right text-red-600 font-bold">{resultado.outros}</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="p-4 font-bold uppercase tracking-wider">Líquido a Receber</td>
                                <td className="p-4 text-right" colSpan={2}>
                                    <span className="text-lg font-extrabold">{resultado.liquido}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Ferramenta disponível em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Não vale como documento oficial
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Salário"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Salário"></iframe>`);
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