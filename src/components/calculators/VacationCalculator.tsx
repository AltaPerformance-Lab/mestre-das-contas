"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator, DollarSign, Palmtree, Info, RefreshCcw, Sun, 
  Share2, Printer, History, Code2, CheckCircle2, X, Link as LinkIcon 
} from "lucide-react";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { trackEvent } from "@/lib/analytics";
import { calculateVacation, type VacationResult } from "@/lib/calculators/vacation";

// TIPO PARA HISTÓRICO
type HistoricoFerias = {
  data: string;
  salario: string;
  liquido: string;
  dias: string;
  vendeu: boolean;
};

interface VacationCalculatorProps {
    initialSalario?: number;
    initialDias?: number;
    initialVender?: boolean;
    initialDecimo?: boolean;
    initialDeps?: number;
    initialResult?: VacationResult | null;
}

export default function VacationCalculator({
    initialSalario = 0,
    initialDias = 30,
    initialVender = false,
    initialDecimo = false,
    initialDeps = 0,
    initialResult = null
}: VacationCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // UTILS
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // STATES DE DADOS
  const [salarioBruto, setSalarioBruto] = useState(initialSalario > 0 ? formatBRL(initialSalario) : "");
  const [salarioValue, setSalarioValue] = useState(initialSalario);
  const [dependentes, setDependentes] = useState(initialDeps > 0 ? initialDeps.toString() : "0");
  const [diasFerias, setDiasFerias] = useState(initialDias.toString());
  const [venderFerias, setVenderFerias] = useState(initialVender);
  const [adiantarDecimo, setAdiantarDecimo] = useState(initialDecimo);
  
  const [resultado, setResultado] = useState<VacationResult | null>(initialResult);

  // STATES DE FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoFerias[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Ferias_Simulada_MestreDasContas",
    onAfterPrint: () => trackEvent("print_ferias_success"),
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
    setSalarioBruto(display);
    setSalarioValue(value);
  };

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_ferias");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Hidratação via URL (Deep Linking)
    const urlSalario = searchParams.get("salario");
    const urlDias = searchParams.get("dias");
    const urlVender = searchParams.get("vender") === "true";
    const urlDecimo = searchParams.get("decimo") === "true";
    const urlDeps = searchParams.get("dependentes");

    if (!initialSalario && urlSalario) {
        const s = parseFloat(urlSalario);
        const d = urlDias ? parseInt(urlDias) : 30;
        const dep = urlDeps ? parseInt(urlDeps) : 0;
        
        setSalarioValue(s);
        setSalarioBruto(formatBRL(s));
        setDiasFerias(d.toString());
        setVenderFerias(urlVender);
        setAdiantarDecimo(urlDecimo);
        setDependentes(dep.toString());
        
        handleCalcular(s, d, urlVender, urlDecimo, dep);
    } else if (initialSalario > 0 && !resultado) {
        handleCalcular(initialSalario, initialDias, initialVender, initialDecimo, initialDeps);
    }
  }, [searchParams, initialSalario, initialDias, initialVender, initialDecimo, initialDeps]);

  const handleCalcular = (
      s = salarioValue, 
      d = parseInt(diasFerias), 
      v = venderFerias, 
      dec = adiantarDecimo,
      dep = parseInt(dependentes) || 0
  ) => {
    const res = calculateVacation(s, d, v, dec, dep);
    if (res) {
        setResultado(res);
        trackEvent("calculate_ferias", { dias: d, vendeu: v });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: VacationResult) => {
    const novoItem: HistoricoFerias = {
        data: new Date().toLocaleDateString("pt-BR"),
        salario: formatBRL(res.rawSalario),
        liquido: res.totalLiquido,
        dias: `${res.diasGozo} dias`,
        vendeu: res.vendeuFerias
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_ferias", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setSalarioBruto(""); setSalarioValue(0);
    setDependentes("0"); setDiasFerias("30");
    setVenderFerias(false); setAdiantarDecimo(false);
    setResultado(null);
  };

  const handleShare = (type: "link" | "embed") => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/trabalhista/ferias`, '_blank');
        return;
    }
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("salario", resultado.rawSalario.toString());
            params.set("dias", resultado.rawDias.toString());
            params.set("vender", resultado.rawVender.toString());
            params.set("decimo", resultado.rawDecimo.toString());
            params.set("dependentes", resultado.rawDeps.toString());
        }
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
        trackEvent("share_ferias_link");
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Férias"></iframe>`);
        trackEvent("share_ferias_embed");
    }
    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Sun size={22} /></div>
                    Planeje suas Férias
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2" title="Incorporar">
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
                  <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Dependentes</Label>
                      <Input type="number" value={dependentes} onChange={e => setDependentes(e.target.value)} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white" placeholder="0" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Dias de Descanso</Label>
                      <Select value={diasFerias} onValueChange={setDiasFerias}>
                          <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="30">30 dias</SelectItem>
                              <SelectItem value="20">20 dias</SelectItem>
                              <SelectItem value="15">15 dias</SelectItem>
                              <SelectItem value="10">10 dias</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl space-y-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                      <Label htmlFor="vender-ferias" className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">Vender 10 dias (Abono)?</Label>
                      <Switch id="vender-ferias" checked={venderFerias} onCheckedChange={setVenderFerias} />
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                  <div className="flex items-center justify-between">
                      <Label htmlFor="adiantar-decimo" className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">Adiantar 1ª Parc. 13º?</Label>
                      <Switch id="adiantar-decimo" checked={adiantarDecimo} onCheckedChange={setAdiantarDecimo} />
                  </div>
              </div>
              <div className="flex gap-3 pt-2">
                  <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg">Calcular</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 rounded-xl transition-colors"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>
          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><History size={14} /> Histórico</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 last:border-0 pb-2 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                        <div className="flex flex-col">
                            <span className="font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.dias} • {item.vendeu ? "Vendeu" : "Normal"}</span>
                        </div>
                        <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.liquido}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-ferias-card" className={`h-full w-full border-0 shadow-lg overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0"><CardTitle className="text-lg font-bold">Resumo</CardTitle></CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2"><Palmtree size={32} className="opacity-30" /></div>
                  <p className="text-sm font-medium">Preencha os dados ao lado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Líquido a Receber</p>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">{resultado.totalLiquido}</div>
                  </div>
                  <div className="space-y-0 text-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span>Férias ({resultado.diasGozo} dias)</span><span className="font-bold">{resultado.valorFerias}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span>1/3 Constitucional</span><span className="font-bold">{resultado.tercoFerias}</span></div>
                    {resultado.abono !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-green-50/50 text-green-700 font-bold"><span>Abono Pecuniário (+1/3)</span><span>{resultado.abono}</span></div>}
                    {resultado.adiantamento13 !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-blue-50/50 text-blue-700 font-bold"><span>Adiantamento 13º</span><span>{resultado.adiantamento13}</span></div>}
                    <div className="flex justify-between py-3 px-4 text-red-600 font-bold"><span>INSS</span><span>- {resultado.inss}</span></div>
                    <div className="flex justify-between py-3 px-4 text-red-600 font-bold"><span>IRRF</span><span>- {resultado.irrf}</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">{copiado === "link" ? "Copiado" : "Link"}</Button>
                        <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide"><Printer size={16}/> PDF</Button>
                        <div className="col-span-2"><ShareAsImage elementId="resultado-ferias-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" /></div>
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
                <h3 className="text-lg font-bold mb-4">Incorporar</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4"><code className="text-xs font-mono text-blue-300 break-all leading-relaxed">{`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Férias"></iframe>`}</code></div>
                <Button onClick={() => { navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Férias"></iframe>`); setCopiado("embed"); setTimeout(() => setCopiado(null), 2000); }} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold h-12 rounded-xl">{copiado === "embed" ? "Copiado!" : "Copiar Código"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}