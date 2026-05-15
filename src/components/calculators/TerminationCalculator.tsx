"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { differenceInYears, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator, DollarSign, Briefcase, Info, 
  Share2, Printer, History, Code2, CheckCircle2, X, Link as LinkIcon 
} from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { trackEvent } from "@/lib/analytics";
import { calculateTermination, type TerminationResult } from "@/lib/calculators/termination";

// Tipo para o histórico
type HistoricoRescisao = {
  dataCalc: string;
  total: string;
  motivo: string;
  periodo: string;
  salario: string;
  raw: any;
};

interface TerminationCalculatorProps {
    initialValue?: number;
    initialInicio?: string;
    initialFim?: string;
    initialReason?: string;
    initialAviso?: string;
    initialResult?: TerminationResult | null;
}

export default function TerminationCalculator({
    initialValue: propSalario = 0,
    initialInicio: propInicio = "",
    initialFim: propFim = "",
    initialReason: propReason = "sem_justa_causa",
    initialAviso: propAviso = "indenizado",
    initialResult: propResult = null
}: TerminationCalculatorProps) {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);
  const [isEmbed, setIsEmbed] = useState(false);

  // HELPER FORMAT
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // --- STATES DE DADOS ---
  const [salarioValue, setSalarioValue] = useState(propSalario);
  const [salarioBruto, setSalarioBruto] = useState(propSalario > 0 ? formatBRL(propSalario) : "");
  const [dataInicio, setDataInicio] = useState(propInicio);
  const [dataFim, setDataFim] = useState(propFim);
  const [motivo, setMotivo] = useState(propReason);
  const [avisoPrevio, setAvisoPrevio] = useState(propAviso);
  
  const [saldoFgts, setSaldoFgts] = useState("");
  const [temFeriasVencidas, setTemFeriasVencidas] = useState(false);
  const [diasFeriasVencidas, setDiasFeriasVencidas] = useState("30");
  const [saqueAniversario, setSaqueAniversario] = useState(false);

  const [resultado, setResultado] = useState<TerminationResult | null>(propResult);

  // --- STATES DE FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoRescisao[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Rescisao_Simulada_MestreDasContas",
    pageStyle: `@page { size: A4; margin: 10mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

  // --- FORMATADORES ---
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

  // --- EFEITOS ---
  useEffect(() => {
    const embedParam = searchParams.get("embed") === "true";
    setIsEmbed(embedParam);
    setIsIframe(window.self !== window.top || embedParam);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_rescisao");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Inicialização via URL se props estiverem vazias
    const urlSalario = searchParams.get("salario");
    const urlInicio = searchParams.get("inicio");
    const urlFim = searchParams.get("fim");
    const urlMotivo = searchParams.get("motivo");
    const urlAviso = searchParams.get("aviso");

    if (!propSalario && urlSalario) {
        const s = parseFloat(urlSalario);
        const i = urlInicio || "";
        const f = urlFim || "";
        const m = urlMotivo || propReason;
        const a = urlAviso || propAviso;

        setSalarioValue(s);
        setSalarioBruto(formatBRL(s));
        setDataInicio(i);
        setDataFim(f);
        setMotivo(m);
        setAvisoPrevio(a);

        if (s > 0 && i && f) {
            handleCalcular(s, i, f, m, a);
        }
    } else if (propSalario > 0 && propInicio && propFim && !resultado) {
        handleCalcular(propSalario, propInicio, propFim, propReason, propAviso);
    }
  }, [searchParams, propSalario, propInicio, propFim, propReason, propAviso]);

  // --- HANDLERS ---
  const handleCalcular = (
      pSalario = salarioValue, 
      pInicio = dataInicio, 
      pFim = dataFim, 
      pMotivo = motivo,
      pAviso = avisoPrevio
  ) => {
    if (pSalario <= 0 || !pInicio || !pFim) return;
    const res = calculateTermination(pSalario, pInicio, pFim, pMotivo, pAviso, temFeriasVencidas, diasFeriasVencidas, saldoFgts, saqueAniversario);
    if (res) {
        setResultado(res);
        trackEvent("calculate_rescisao", { motivo: pMotivo, salario: pSalario });
        if (!isIframe) salvarHistorico(res);
    } else if (pSalario && pInicio && pFim && parseISO(pInicio) > parseISO(pFim)) {
        alert("A data de afastamento não pode ser anterior à data de admissão.");
    }
  };

  const salvarHistorico = (res: TerminationResult) => {
      const novoItem: HistoricoRescisao = {
          dataCalc: new Date().toLocaleDateString("pt-BR"),
          total: res.totalLiquido,
          motivo: motivo === "sem_justa_causa" ? "Sem Justa Causa" : (motivo === "pedido_demissao" ? "Pedido Demissão" : (motivo === "acordo_comum" ? "Acordo Comum" : "Justa Causa")),
          periodo: `${differenceInYears(new Date(dataFim), new Date(dataInicio))} anos`,
          salario: formatBRL(res.raw.salario),
          raw: res.raw
      };
      const novoHistorico = [novoItem, ...historico].slice(0, 5);
      setHistorico(novoHistorico);
      localStorage.setItem("historico_rescisao", JSON.stringify(novoHistorico));
  };

  const handleRestaurarHistorico = (item: HistoricoRescisao) => {
      setSalarioValue(item.raw.salario);
      setSalarioBruto(formatBRL(item.raw.salario));
      setDataInicio(item.raw.inicio);
      setDataFim(item.raw.fim);
      setMotivo(item.raw.motivo);
      setAvisoPrevio(item.raw.aviso);
      setSaldoFgts(item.raw.fgts);
      setTemFeriasVencidas(item.raw.feriasVencidas);
      setDiasFeriasVencidas(item.raw.diasFerias);
      setTimeout(() => handleCalcular(item.raw.salario, item.raw.inicio, item.raw.fim, item.raw.motivo, item.raw.aviso), 100);
  };

  const handleShare = (type: "link" | "embed") => {
    if (isEmbed) {
        window.open(`https://mestredascontas.com.br/trabalhista/rescisao`, '_blank');
        return;
    }
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado?.raw) {
            params.set("salario", resultado.raw.salario.toString());
            params.set("inicio", resultado.raw.inicio);
            params.set("fim", resultado.raw.fim);
            params.set("motivo", resultado.raw.motivo);
        }
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; overflow:hidden; border-radius:12px;" title="Calculadora de Rescisão"></iframe>`);
    }
    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const calculatorContent = (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 w-full print:hidden">
      
      {/* --- FORMULÁRIO --- */}
      <div className="lg:col-span-7 w-full space-y-6">
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 w-full overflow-hidden bg-white dark:bg-slate-900 rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Briefcase size={22} /></div> 
                    Dados do Contrato
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
                <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" inputMode="numeric"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-300 font-medium">Data de Admissão</Label>
                <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-300 font-medium">Data de Afastamento</Label>
                <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 dark:text-slate-300 font-medium">Motivo</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100"><SelectValue /></SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="sem_justa_causa">Sem Justa Causa</SelectItem>
                  <SelectItem value="pedido_demissao">Pedido de Demissão</SelectItem>
                  <SelectItem value="justa_causa">Justa Causa</SelectItem>
                  <SelectItem value="acordo_comum">Acordo Comum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 dark:text-slate-300 font-medium">Aviso Prévio</Label>
              <Select value={avisoPrevio} onValueChange={setAvisoPrevio}>
                <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-100"><SelectValue /></SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  <SelectItem value="indenizado">Indenizado</SelectItem>
                  <SelectItem value="trabalhado">Trabalhado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl space-y-4 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <Label htmlFor="ferias-vencidas" className="cursor-pointer text-sm font-medium">Férias vencidas?</Label>
                    <Switch id="ferias-vencidas" checked={temFeriasVencidas} onCheckedChange={setTemFeriasVencidas} />
                </div>
                {temFeriasVencidas && (
                    <div className="animate-in slide-in-from-top-2 fade-in">
                        <Label className="text-xs text-slate-500 mb-1 block uppercase font-bold">Dias</Label>
                        <Input type="number" value={diasFeriasVencidas} onChange={e => setDiasFeriasVencidas(e.target.value)} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-10" placeholder="Ex: 30" inputMode="numeric"/>
                    </div>
                )}
                {(motivo === "sem_justa_causa" || motivo === "acordo_comum") && (
                    <>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">Saldo FGTS</Label>
                            <Input placeholder="R$ 0,00" value={saldoFgts} onChange={e => { const {display} = formatarMoedaInput(e.target.value); setSaldoFgts(display); }} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-10" inputMode="numeric"/>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <Label htmlFor="saque-aniversario" className="cursor-pointer text-sm font-medium">Saque Aniversário?</Label>
                            <Switch id="saque-aniversario" checked={saqueAniversario} onCheckedChange={setSaqueAniversario} />
                        </div>
                    </>
                )}
            </div>

            <Button onClick={() => handleCalcular()} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                Calcular Rescisão
            </Button>
          </CardContent>
        </Card>

        {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" onClick={() => handleRestaurarHistorico(item)}>
                        <div className="flex flex-col">
                            <span className="font-bold">{item.salario}</span>
                            <span className="text-[10px] text-slate-400">{item.periodo} • {item.dataCalc}</span>
                        </div>
                        <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.total}</span>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* --- RESULTADO --- */}
      <div className="lg:col-span-5 w-full flex flex-col gap-6">
        <Card id="resultado-rescisao-card" className={`h-full w-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
          <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Resumo</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col">
            {!resultado ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2"><Calculator size={32} className="opacity-30" /></div>
                <p className="text-sm font-medium max-w-[200px]">Preencha os dados ao lado.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Total Líquido Estimado</p>
                  <div className="relative z-10 text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                      <CountUp value={parseFloat(resultado.totalLiquido.replace(/[^0-9,]/g, '').replace(',', '.'))} />
                  </div>
                  {resultado.bloqueadoSaqueAniversario && (
                      <div className="mt-4 bg-amber-500/20 text-amber-300 text-[10px] px-3 py-1.5 rounded-full border border-amber-500/30 font-medium">⚠️ FGTS Retido</div>
                  )}
                </div>

                <div className="space-y-0 text-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 dark:text-slate-400 font-medium">Saldo de Salário</span><span className="font-bold">{resultado.saldoSalario}</span></div>
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 dark:text-slate-400 font-medium">13º Proporcional ({resultado.mesesDecimo}/12)</span><span className="font-bold">{resultado.decimo}</span></div>
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 dark:text-slate-400 font-medium">Férias Prop. ({resultado.mesesFerias}/12) + 1/3</span><span className="font-bold">{resultado.feriasProp}</span></div>
                  {resultado.feriasVencidas !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-blue-50/50 dark:bg-blue-900/20 font-bold"><span>Férias Vencidas + 1/3</span><span>{resultado.feriasVencidas}</span></div>}
                  {resultado.aviso !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-green-50/50 dark:bg-green-900/20 font-bold"><span>Aviso Prévio ({resultado.diasAviso}d)</span><span>{resultado.aviso}</span></div>}
                  <div className="py-3 px-4 flex justify-between items-center"><span className="text-slate-500 text-xs uppercase font-bold">Saque FGTS</span><span className="font-bold text-green-600">{resultado.saqueFgts}</span></div>
                  <div className="flex justify-between py-3 px-4 bg-red-50/30 text-red-600 font-bold border-t border-red-100 uppercase text-xs"><span>Descontos</span><span>- {resultado.descontosEst}</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">
                        {copiado === "link" ? "Copiado" : "Link"}
                    </Button>
                    <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">
                        <Printer size={16}/> PDF
                    </Button>
                    <div className="col-span-2">
                         <ShareAsImage elementId="resultado-rescisao-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" />
                    </div>
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
                    <Link href="https://mestredascontas.com.br/trabalhista/rescisao" target="_blank" className="text-[10px] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Briefcase size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <div className="w-full font-sans">
      {calculatorContent}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold mb-4">Incorporar</h3>
                <div className="bg-slate-950 p-4 rounded-xl mb-4">
                    <code className="text-xs font-mono text-blue-300 break-all leading-relaxed">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Rescisão"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Rescisão"></iframe>`);
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