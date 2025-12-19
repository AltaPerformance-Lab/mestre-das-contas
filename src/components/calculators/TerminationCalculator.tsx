"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { differenceInMonths, differenceInYears, addDays, differenceInDays, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator, DollarSign, Briefcase, Info, 
  Share2, Printer, History, Code2, CheckCircle2, X, Calendar, Link as LinkIcon 
} from "lucide-react";

// Tipo para o histórico
type HistoricoRescisao = {
  dataCalc: string;
  total: string;
  motivo: string;
  periodo: string;
  salario: string;
  raw: {
    salario: number;
    inicio: string;
    fim: string;
    motivo: string;
    aviso: string;
    fgts: string;
    feriasVencidas: boolean;
    diasFerias: string;
  }
};

type ResultadoRescisao = {
    saldoSalario: string;
    decimo: string;
    feriasProp: string;
    feriasVencidas: string;
    aviso: string;
    multaFgts: string;
    saqueFgts: string;
    descontosEst: string;
    totalLiquido: string;
    diasAviso: number;
    mesesDecimo: number;
    mesesFerias: number;
    bloqueadoSaqueAniversario: boolean;
    raw: any;
} | null;

export default function TerminationCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // --- STATES DE DADOS ---
  const [salarioBruto, setSalarioBruto] = useState("");
  const [salarioValue, setSalarioValue] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [motivo, setMotivo] = useState("sem_justa_causa");
  const [avisoPrevio, setAvisoPrevio] = useState("indenizado");
  
  // Inputs Avançados
  const [saldoFgts, setSaldoFgts] = useState("");
  const [temFeriasVencidas, setTemFeriasVencidas] = useState(false);
  const [diasFeriasVencidas, setDiasFeriasVencidas] = useState("30");
  const [saqueAniversario, setSaqueAniversario] = useState(false);

  const [resultado, setResultado] = useState<ResultadoRescisao>(null);

  // --- STATES DE FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoRescisao[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);

  // Configuração de Impressão
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Rescisao_Simulada_MestreDasContas",
    pageStyle: `
      @page { size: A4; margin: 10mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
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

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // --- EFEITOS (Load & URL) ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_rescisao");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlSalario = searchParams.get("salario");
    const urlInicio = searchParams.get("inicio");
    const urlFim = searchParams.get("fim");
    const urlMotivo = searchParams.get("motivo");
    
    if (urlSalario && urlInicio && urlFim) {
        const valSalario = parseFloat(urlSalario);
        setSalarioValue(valSalario);
        setSalarioBruto(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valSalario));
        setDataInicio(urlInicio);
        setDataFim(urlFim);
        if (urlMotivo) setMotivo(urlMotivo);

        setTimeout(() => {
            calcular(valSalario, urlInicio, urlFim, urlMotivo || "sem_justa_causa");
        }, 200);
    }
  }, [searchParams]);

  // --- CÁLCULO ---
  const calcular = (
      pSalario = salarioValue, 
      pInicio = dataInicio, 
      pFim = dataFim, 
      pMotivo = motivo
  ) => {
    if (!pSalario || !pInicio || !pFim) return;

    const inicio = parseISO(pInicio);
    const fim = parseISO(pFim);
    
    // 1. Tempos
    const anosTrabalhados = differenceInYears(fim, inicio);
    
    // Lei 12.506 (Aviso Prévio Proporcional) - Adiciona 3 dias por ano completo, até 60 dias (total 90)
    let diasAviso = 30; 
    if (anosTrabalhados > 0 && pMotivo === "sem_justa_causa") {
      diasAviso += Math.min(anosTrabalhados * 3, 60);
    }

    // Data Projetada (Se indenizado, projeta o tempo. Se trabalhado, o tempo já passou)
    const dataProjetada = (avisoPrevio === "indenizado" && pMotivo === "sem_justa_causa")
      ? addDays(fim, diasAviso) 
      : fim;

    // 2. Saldo de Salário
    const diaDesligamento = fim.getDate();
    const vlrSaldoSalario = (pSalario / 30) * diaDesligamento;

    // 3. 13º Proporcional (conta avos até a data projetada)
    let mesesDecimo = dataProjetada.getMonth() + 1; 
    if (dataProjetada.getDate() < 15) mesesDecimo -= 1;
    
    if (inicio.getFullYear() === fim.getFullYear()) {
        mesesDecimo = mesesDecimo - inicio.getMonth();
        if (inicio.getDate() > 15) mesesDecimo -= 1;
    }
    if (mesesDecimo < 0) mesesDecimo = 0;
    const vlrDecimo = (pSalario / 12) * mesesDecimo;

    // 4. Férias Proporcionais + 1/3
    let inicioPeriodoAquisitivo = new Date(inicio);
    // Avança os anos até chegar no período atual
    while (addDays(inicioPeriodoAquisitivo, 365) <= dataProjetada) {
        inicioPeriodoAquisitivo = addDays(inicioPeriodoAquisitivo, 365);
    }

    let mesesFerias = differenceInMonths(dataProjetada, inicioPeriodoAquisitivo);
    const dataAux = new Date(inicioPeriodoAquisitivo);
    dataAux.setMonth(dataAux.getMonth() + mesesFerias);

    // Regra de >14 dias para ganhar 1/12
    if (differenceInDays(dataProjetada, dataAux) >= 14) { 
        mesesFerias += 1;
    }

    if (mesesFerias > 12) mesesFerias = 12; 
    if (mesesFerias < 0) mesesFerias = 0;

    const vlrFeriasProp = (pSalario / 12) * mesesFerias;
    const vlrTercoFeriasProp = vlrFeriasProp / 3;

    // 5. Férias Vencidas (Input do Usuário)
    let vlrFeriasVencidasTotal = 0;
    if (temFeriasVencidas) {
        const dias = parseInt(diasFeriasVencidas) || 0;
        // Cálculo padrão: (Salário / 30) * Dias * 1/3 constitucional
        const valorBase = (pSalario / 30) * dias;
        vlrFeriasVencidasTotal = valorBase + (valorBase / 3);
    }

    // 6. Aviso Prévio Indenizado (Apenas se o motivo for dispensa sem justa causa e indenizado)
    let vlrAvisoIndenizado = 0;
    if (pMotivo === "sem_justa_causa" && avisoPrevio === "indenizado") {
      vlrAvisoIndenizado = (pSalario / 30) * diasAviso;
    }

    // 7. FGTS
    let vlrMultaFgts = 0;
    let vlrSaqueFgts = 0;
    
    if (pMotivo === "sem_justa_causa") {
      const saldoAtualInput = parseFloat(saldoFgts.replace(/\D/g, "") || "0") / 100;
      // Estima o FGTS da rescisão (sobre aviso, 13º e saldo)
      const baseFgtsRescisao = vlrAvisoIndenizado + vlrDecimo + vlrSaldoSalario;
      const fgtsRescisao = baseFgtsRescisao * 0.08;
      const saldoTotalFgts = saldoAtualInput + fgtsRescisao;
      
      vlrMultaFgts = saldoTotalFgts * 0.40;

      if (saqueAniversario) {
          vlrSaqueFgts = vlrMultaFgts; // Só saca a multa
      } else {
          vlrSaqueFgts = saldoTotalFgts + vlrMultaFgts; // Saca tudo
      }
    }

    const totalVerbasEmpresa = vlrSaldoSalario + vlrDecimo + vlrFeriasProp + vlrTercoFeriasProp + vlrAvisoIndenizado + vlrFeriasVencidasTotal;
    const estimativaDescontos = (vlrSaldoSalario + vlrDecimo) * 0.09; // Estimativa média INSS (simplificada para simulação)
    const totalLiquidoReceber = totalVerbasEmpresa - estimativaDescontos + vlrSaqueFgts;

    const novoResultado = {
      saldoSalario: formatBRL(vlrSaldoSalario),
      decimo: formatBRL(vlrDecimo),
      feriasProp: formatBRL(vlrFeriasProp + vlrTercoFeriasProp),
      feriasVencidas: formatBRL(vlrFeriasVencidasTotal),
      aviso: formatBRL(vlrAvisoIndenizado),
      multaFgts: formatBRL(vlrMultaFgts),
      saqueFgts: formatBRL(vlrSaqueFgts),
      descontosEst: formatBRL(estimativaDescontos),
      totalLiquido: formatBRL(totalLiquidoReceber),
      diasAviso: diasAviso,
      mesesDecimo: mesesDecimo,
      mesesFerias: mesesFerias,
      bloqueadoSaqueAniversario: saqueAniversario && pMotivo === "sem_justa_causa",
      raw: {
          salario: pSalario,
          inicio: pInicio,
          fim: pFim,
          motivo: pMotivo,
          aviso: avisoPrevio,
          fgts: saldoFgts,
          feriasVencidas: temFeriasVencidas,
          diasFerias: diasFeriasVencidas
      }
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- ACTIONS ---
  const salvarHistorico = (res: any) => {
      const novoItem: HistoricoRescisao = {
          dataCalc: new Date().toLocaleDateString("pt-BR"),
          total: res.totalLiquido,
          motivo: motivo === "sem_justa_causa" ? "Sem Justa Causa" : "Pedido Demissão",
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
      
      setTimeout(() => calcular(item.raw.salario, item.raw.inicio, item.raw.fim, item.raw.motivo), 100);
  };

  const handleShare = (type: "link" | "embed") => {
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
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Rescisão"></iframe>`);
    }

    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 w-full print:hidden">
      
      {/* --- FORMULÁRIO (Coluna Esquerda) --- */}
      <div className="lg:col-span-7 w-full space-y-6">
        <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 w-full overflow-hidden bg-white rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Briefcase size={22} strokeWidth={2.5} /></div> 
                    Dados do Contrato
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
          
          <CardContent className="space-y-5 p-6">
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Salário Bruto</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-10 h-12 text-lg font-medium bg-slate-50 border-slate-200 focus:bg-white transition-colors" inputMode="numeric"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">Data de Admissão</Label>
                <div className="relative">
                    <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">Data de Afastamento</Label>
                <div className="relative">
                    <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Motivo da Rescisão</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sem_justa_causa">Dispensa sem Justa Causa</SelectItem>
                  <SelectItem value="pedido_demissao">Pedido de Demissão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium">Aviso Prévio</Label>
              <Select value={avisoPrevio} onValueChange={setAvisoPrevio}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indenizado">Indenizado (Pago em dinheiro)</SelectItem>
                  <SelectItem value="trabalhado">Trabalhado (Você cumpriu)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* OPÇÕES AVANÇADAS */}
            <div className="bg-slate-50 p-5 rounded-xl space-y-4 border border-slate-100">
                <div className="flex items-center justify-between">
                    <Label htmlFor="ferias-vencidas" className="cursor-pointer text-sm font-medium text-slate-700">Possui férias vencidas?</Label>
                    <Switch id="ferias-vencidas" checked={temFeriasVencidas} onCheckedChange={setTemFeriasVencidas} />
                </div>
                
                {temFeriasVencidas && (
                    <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                        <Label className="text-xs text-slate-500 mb-1.5 block uppercase font-bold tracking-wide">Dias Acumulados</Label>
                        <Input 
                            type="number" 
                            value={diasFeriasVencidas} 
                            onChange={e => setDiasFeriasVencidas(e.target.value)} 
                            className="bg-white border-slate-200 h-10" 
                            placeholder="Ex: 30" 
                            inputMode="numeric"
                            maxLength={3} // Limita para evitar números absurdos
                        />
                        {parseInt(diasFeriasVencidas) > 60 && (
                            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1"><Info size={12}/> Valor alto: verifique se são dias corridos.</p>
                        )}
                    </div>
                )}

                {motivo === "sem_justa_causa" && (
                    <>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-slate-700">Saldo do FGTS (Para multa)</Label>
                            <Input placeholder="R$ 0,00" value={saldoFgts} onChange={e => { const {display} = formatarMoedaInput(e.target.value); setSaldoFgts(display); }} className="bg-white h-10 border-slate-200" inputMode="numeric"/>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="saque-aniversario" className="cursor-pointer text-sm font-medium text-slate-700">Optou pelo Saque Aniversário?</Label>
                                <Info size={16} className="text-slate-400" />
                            </div>
                            <Switch id="saque-aniversario" checked={saqueAniversario} onCheckedChange={setSaqueAniversario} />
                        </div>
                    </>
                )}
            </div>

            <Button onClick={() => calcular()} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-indigo-200 rounded-xl transition-all active:scale-[0.99]">
                Calcular Rescisão
            </Button>
          </CardContent>
        </Card>

        {/* HISTÓRICO */}
        {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico Recente</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer active:bg-slate-100" onClick={() => handleRestaurarHistorico(item)}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{item.salario}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{item.periodo} • {item.dataCalc}</span>
                    </div>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs tabular-nums">{item.total}</span>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* --- RESULTADO (Coluna Direita) --- */}
      <div className="lg:col-span-5 w-full flex flex-col gap-6">
        <Card className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden flex flex-col ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
          <CardHeader className="px-6 py-5 border-b border-slate-100 bg-white shrink-0">
            <CardTitle className="text-slate-800 text-lg font-bold">Extrato da Rescisão</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 flex-1 flex flex-col">
            {!resultado ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                    <Calculator size={40} className="opacity-30" />
                </div>
                <p className="text-sm font-medium max-w-[200px]">Preencha os dados ao lado para gerar o extrato detalhado.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                
                {/* Destaque - AGORA COM FONTE RESPONSIVA PARA NÃO CORTAR */}
                <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                  
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Total Líquido Estimado</p>
                  <div className="flex items-center justify-center gap-1 relative z-10 px-2">
                      {/* Correção: Tamanho de fonte adaptável para não cortar valores grandes */}
                      <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight break-words">{resultado.totalLiquido}</span>
                  </div>
                  
                  {resultado.bloqueadoSaqueAniversario && (
                      <div className="mt-4 bg-amber-500/20 text-amber-300 text-[10px] px-3 py-1.5 rounded-full border border-amber-500/30 inline-flex items-center gap-1.5 relative z-10 font-medium animate-pulse">
                          ⚠️ Saldo FGTS Retido (Saque-Aniversário)
                      </div>
                  )}
                </div>

                {/* Lista Detalhada */}
                <div className="space-y-0 text-sm bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">Saldo de Salário</span><span className="font-bold text-slate-900">{resultado.saldoSalario}</span></div>
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">13º Proporcional ({resultado.mesesDecimo}/12)</span><span className="font-bold text-slate-900">{resultado.decimo}</span></div>
                  <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">Férias Prop. ({resultado.mesesFerias}/12) + 1/3</span><span className="font-bold text-slate-900">{resultado.feriasProp}</span></div>
                  
                  {resultado.feriasVencidas !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-blue-50/50"><span className="text-blue-700 font-bold">Férias Vencidas + 1/3</span><span className="font-bold text-blue-800">{resultado.feriasVencidas}</span></div>}
                  {resultado.aviso !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-green-50/50"><span className="text-green-700 font-bold">Aviso Prévio ({resultado.diasAviso}d)</span><span className="font-bold text-green-800">{resultado.aviso}</span></div>}
                  {resultado.multaFgts !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-emerald-50/50"><span className="text-emerald-700 font-bold">Multa 40% FGTS</span><span className="font-bold text-emerald-800">{resultado.multaFgts}</span></div>}
                  
                  <div className="py-3 px-4">
                    <div className="flex justify-between items-center"><span className="text-slate-500 font-medium text-xs uppercase tracking-wide">Saque FGTS Disponível</span><span className="font-bold text-green-600">{resultado.saqueFgts}</span></div>
                  </div>
                  <div className="flex justify-between py-3 px-4 bg-red-50/30 text-red-600 border-t border-red-100"><span className="font-bold text-xs uppercase tracking-wide">Descontos (INSS/IRRF Est.)</span><span className="font-bold">- {resultado.descontosEst}</span></div>
                </div>
                
                <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* Os valores são simulados baseados na CLT vigente. A homologação oficial pode ter pequenas variações.</p>

                {/* BOTÕES DE AÇÃO */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 text-xs font-bold uppercase tracking-wide">
                        {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Compartilhar</span>}
                    </Button>
                    <Button variant="outline" onClick={handlePrint} className="h-11 border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-xs font-bold uppercase tracking-wide">
                        <span className="flex items-center gap-2"><Printer size={16}/> Imprimir PDF</span>
                    </Button>
                </div>

              </div>
            )}
          </CardContent>
        </Card>
      </div>
      </div>

      {/* --- MODAL DE IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Termo de Simulação</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Gerado por <strong>Mestre das Contas</strong></p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Rescisão de Contrato</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-2 gap-6 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Dados do Contrato</p>
                        <p className="mb-1"><strong>Admissão:</strong> {new Date(dataInicio).toLocaleDateString()}</p>
                        <p><strong>Afastamento:</strong> {new Date(dataFim).toLocaleDateString()}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Motivo do Desligamento</p>
                        <p className="mb-1"><strong>Tipo:</strong> {motivo === "sem_justa_causa" ? "Sem Justa Causa" : "Pedido Demissão"}</p>
                        <p><strong>Aviso Prévio:</strong> {avisoPrevio}</p>
                    </div>
                </div>

                <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 text-left">Descrição da Verba</th>
                                <th className="p-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium">Saldo de Salário</td><td className="p-4 text-right font-bold text-slate-700">{resultado.saldoSalario}</td></tr>
                            <tr><td className="p-4 font-medium">13º Salário Proporcional</td><td className="p-4 text-right font-bold text-slate-700">{resultado.decimo}</td></tr>
                            <tr><td className="p-4 font-medium">Férias Proporcionais + 1/3</td><td className="p-4 text-right font-bold text-slate-700">{resultado.feriasProp}</td></tr>
                            
                            {resultado.feriasVencidas !== "R$ 0,00" && (
                                <tr className="bg-blue-50/30"><td className="p-4 font-bold text-blue-800">Férias Vencidas + 1/3</td><td className="p-4 text-right font-bold text-blue-800">{resultado.feriasVencidas}</td></tr>
                            )}
                            
                            {resultado.aviso !== "R$ 0,00" && (
                                <tr className="bg-green-50/30"><td className="p-4 font-bold text-green-800">Aviso Prévio Indenizado</td><td className="p-4 text-right font-bold text-green-800">{resultado.aviso}</td></tr>
                            )}
                            
                            {resultado.multaFgts !== "R$ 0,00" && (
                                <tr className="bg-emerald-50/30"><td className="p-4 font-bold text-emerald-800">Multa 40% FGTS</td><td className="p-4 text-right font-bold text-emerald-800">{resultado.multaFgts}</td></tr>
                            )}
                            
                            <tr><td className="p-4 font-medium text-red-600">Descontos Estimados (INSS/IRRF)</td><td className="p-4 text-right font-bold text-red-600">- {resultado.descontosEst}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="p-4 font-bold uppercase tracking-wider">TOTAL LÍQUIDO A RECEBER</td>
                                <td className="p-4 text-right text-lg font-extrabold">{resultado.totalLiquido}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm fixed bottom-0 w-full">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Ferramenta disponível em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Simulação não oficial
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Rescisão"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Rescisão"></iframe>`);
                    setCopiado("embed");
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}