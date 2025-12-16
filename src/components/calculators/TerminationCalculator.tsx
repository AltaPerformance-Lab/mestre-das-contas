"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { differenceInMonths, differenceInYears, addDays, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator, DollarSign, Briefcase, Info, 
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, Calendar 
} from "lucide-react";

// Tipo para o histórico
type HistoricoRescisao = {
  dataCalc: string;
  total: string;
  motivo: string;
  periodo: string;
  salario: string;
  // Guardamos os parametros RAW para restaurar o calculo ao clicar
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

  const [resultado, setResultado] = useState<any>(null);

  // --- STATES DE FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoRescisao[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Configuração de Impressão
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Rescisao_Simulada_MestreDasContas",
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
    
    // Carregar Histórico
    const salvo = localStorage.getItem("historico_rescisao");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Ler URL
    const urlSalario = searchParams.get("salario");
    const urlInicio = searchParams.get("inicio");
    const urlFim = searchParams.get("fim");
    const urlMotivo = searchParams.get("motivo");
    
    if (urlSalario && urlInicio && urlFim) {
        // Popula os campos
        const valSalario = parseFloat(urlSalario);
        setSalarioValue(valSalario);
        setSalarioBruto(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valSalario));
        setDataInicio(urlInicio);
        setDataFim(urlFim);
        if (urlMotivo) setMotivo(urlMotivo);

        // Auto-calcula
        setTimeout(() => {
            calcular(valSalario, urlInicio, urlFim, urlMotivo || "sem_justa_causa");
        }, 200);
    }
  }, [searchParams]);

  // --- CÁLCULO (Lógica Corrigida) ---
  const calcular = (
      pSalario = salarioValue, 
      pInicio = dataInicio, 
      pFim = dataFim, 
      pMotivo = motivo
  ) => {
    if (!pSalario || !pInicio || !pFim) return;

    const inicio = new Date(pInicio);
    const fim = new Date(pFim);
    
    // 1. Tempos
    const anosTrabalhados = differenceInYears(fim, inicio);
    
    // Lei 12.506 (Aviso Prévio Proporcional)
    let diasAviso = 30;
    if (anosTrabalhados > 0 && pMotivo === "sem_justa_causa") {
      diasAviso += Math.min(anosTrabalhados * 3, 60);
    }

    // Data Projetada
    const dataProjetada = (avisoPrevio === "indenizado" && pMotivo === "sem_justa_causa")
      ? addDays(fim, diasAviso) 
      : fim;

    // 2. Saldo de Salário
    const diaDesligamento = fim.getDate();
    const vlrSaldoSalario = (pSalario / 30) * diaDesligamento;

    // 3. 13º Proporcional
    let mesesDecimo = dataProjetada.getMonth() + 1; 
    if (dataProjetada.getDate() < 15) mesesDecimo -= 1;
    // Se entrou no mesmo ano
    if (inicio.getFullYear() === fim.getFullYear()) {
        mesesDecimo = mesesDecimo - inicio.getMonth();
        if (inicio.getDate() > 15) mesesDecimo -= 1; // Ajuste se entrou depois do dia 15
    }
    if (mesesDecimo < 0) mesesDecimo = 0;
    const vlrDecimo = (pSalario / 12) * mesesDecimo;

    // 4. Férias Proporcionais + 1/3 (CORREÇÃO DE LÓGICA APLICADA)
    // Encontrar o início do último período aquisitivo
    let inicioPeriodoAquisitivo = new Date(inicio);
    // Avança os anos até chegar no período atual
    while (addDays(inicioPeriodoAquisitivo, 365) <= dataProjetada) {
        inicioPeriodoAquisitivo = addDays(inicioPeriodoAquisitivo, 365);
    }

    let mesesFerias = differenceInMonths(dataProjetada, inicioPeriodoAquisitivo);

    // Ajuste para fração de 15 dias no último mês
    const dataAux = new Date(inicioPeriodoAquisitivo);
    dataAux.setMonth(dataAux.getMonth() + mesesFerias); // Avança os meses cheios

    // Se sobrou 14 dias ou mais (regra de arredondamento de férias é > 14 dias), conta mais 1 avo
    // Usando differenceInDays absoluto para garantir precisão
    if (differenceInDays(dataProjetada, dataAux) >= 14) { 
        mesesFerias += 1;
    }

    if (mesesFerias > 12) mesesFerias = 12; 
    if (mesesFerias < 0) mesesFerias = 0;

    const vlrFeriasProp = (pSalario / 12) * mesesFerias;
    const vlrTercoFeriasProp = vlrFeriasProp / 3;

    // 5. Férias Vencidas
    let vlrFeriasVencidasTotal = 0;
    if (temFeriasVencidas) {
        const dias = parseInt(diasFeriasVencidas) || 0;
        const valorBase = (pSalario / 30) * dias;
        vlrFeriasVencidasTotal = valorBase + (valorBase / 3);
    }

    // 6. Aviso Prévio Indenizado
    let vlrAvisoIndenizado = 0;
    if (pMotivo === "sem_justa_causa" && avisoPrevio === "indenizado") {
      vlrAvisoIndenizado = (pSalario / 30) * diasAviso;
    }

    // 7. FGTS
    let vlrMultaFgts = 0;
    let vlrSaqueFgts = 0;
    
    if (pMotivo === "sem_justa_causa") {
      const saldoAtualInput = parseFloat(saldoFgts.replace(/\D/g, "") || "0") / 100;
      const baseFgtsRescisao = vlrAvisoIndenizado + vlrDecimo + vlrSaldoSalario;
      const fgtsRescisao = baseFgtsRescisao * 0.08;
      const saldoTotalFgts = saldoAtualInput + fgtsRescisao;
      
      vlrMultaFgts = saldoTotalFgts * 0.40;

      if (saqueAniversario) {
          vlrSaqueFgts = vlrMultaFgts; 
      } else {
          vlrSaqueFgts = saldoTotalFgts + vlrMultaFgts; 
      }
    }

    const totalVerbasEmpresa = vlrSaldoSalario + vlrDecimo + vlrFeriasProp + vlrTercoFeriasProp + vlrAvisoIndenizado + vlrFeriasVencidasTotal;
    const estimativaDescontos = (vlrSaldoSalario + vlrDecimo) * 0.09; // Estimativa média INSS
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
      // Raw data para histórico
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
      
      // Recalcula
      setTimeout(() => calcular(item.raw.salario, item.raw.inicio, item.raw.fim, item.raw.motivo), 100);
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/trabalhista/rescisao`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado?.raw) {
            params.set("salario", resultado.raw.salario.toString());
            params.set("inicio", resultado.raw.inicio);
            params.set("fim", resultado.raw.fim);
            params.set("motivo", resultado.raw.motivo);
        }
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
        navigator.clipboard.writeText(url);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { 
        reactToPrintFn(); 
    } else if (action === "embed") { 
        setShowEmbedModal(true); 
    }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Rescisão"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-6 md:gap-8 w-full print:hidden">
      
      {/* --- FORMULÁRIO (Coluna Esquerda/Topo) --- */}
      <div className="md:col-span-7 w-full space-y-6">
        <Card className="border-0 shadow-sm ring-1 ring-slate-200 w-full overflow-hidden bg-white">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
            <div className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg"><Briefcase className="text-blue-600 w-4 h-4 md:w-5 md:h-5" /></div> 
                    Dados do Contrato
                </CardTitle>
                {!isIframe && (
                    <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                        <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                    </button>
                )}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 md:space-y-5 p-4 md:p-6">
            <div className="space-y-2">
              <Label className="text-slate-600 font-medium text-sm md:text-base">Salário Bruto</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-9 h-12 text-lg font-medium border-slate-200 input-mode-numeric" inputMode="numeric"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium text-sm">Data de Admissão</Label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input type="date" value={dataInicio} onChange={e => setDataInicio(e.target.value)} className="h-12 pl-9 text-slate-600 border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium text-sm">Data de Afastamento</Label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input type="date" value={dataFim} onChange={e => setDataFim(e.target.value)} className="h-12 pl-9 text-slate-600 border-slate-200" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium text-sm">Motivo da Rescisão</Label>
              <Select value={motivo} onValueChange={setMotivo}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sem_justa_causa">Dispensa sem Justa Causa</SelectItem>
                  <SelectItem value="pedido_demissao">Pedido de Demissão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 font-medium text-sm">Aviso Prévio</Label>
              <Select value={avisoPrevio} onValueChange={setAvisoPrevio}>
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indenizado">Indenizado (Pago em dinheiro)</SelectItem>
                  <SelectItem value="trabalhado">Trabalhado (Você cumpriu)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* OPÇÕES AVANÇADAS */}
            <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100">
                <div className="flex items-center justify-between">
                    <Label htmlFor="ferias-vencidas" className="cursor-pointer text-sm font-medium text-slate-700">Possui férias vencidas?</Label>
                    <Switch id="ferias-vencidas" checked={temFeriasVencidas} onCheckedChange={setTemFeriasVencidas} />
                </div>
                
                {temFeriasVencidas && (
                    <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                        <Label className="text-xs text-slate-500 mb-1.5 block uppercase font-bold tracking-wide">Dias Acumulados</Label>
                        <Input type="number" value={diasFeriasVencidas} onChange={e => setDiasFeriasVencidas(e.target.value)} className="bg-white border-slate-200" placeholder="Ex: 30" inputMode="numeric"/>
                    </div>
                )}

                {motivo === "sem_justa_causa" && (
                    <>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-slate-700">Saldo do FGTS (Para multa)</Label>
                            <Input placeholder="R$ 0,00" value={saldoFgts} onChange={e => { const {display} = formatarMoedaInput(e.target.value); setSaldoFgts(display); }} className="bg-white h-11 border-slate-200" inputMode="numeric"/>
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

            <Button onClick={() => calcular()} className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">Calcular Rescisão</Button>
          </CardContent>
        </Card>

        {/* HISTÓRICO */}
        {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico Recente</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" onClick={() => handleRestaurarHistorico(item)}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{item.salario}</span>
                        <span className="text-[10px] text-slate-400">{item.periodo} • {item.dataCalc}</span>
                    </div>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">{item.total}</span>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* --- RESULTADO (Coluna Direita/Baixo) --- */}
      <div className="md:col-span-5 w-full flex flex-col gap-4">
        <Card className={`h-fit w-full transition-all duration-500 border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
          <CardHeader className="px-5 md:px-6 border-b border-slate-100 bg-white">
            <CardTitle className="text-slate-800 text-lg md:text-xl">Extrato da Rescisão</CardTitle>
          </CardHeader>
          
          <CardContent className="p-5 md:p-6">
            {!resultado ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><Calculator size={32} className="opacity-40" /></div>
                <p className="text-sm max-w-[200px]">Preencha os dados ao lado para gerar o extrato detalhado.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Destaque */}
                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Total Líquido Estimado</p>
                  <p className="text-3xl md:text-4xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.totalLiquido}</p>
                  {resultado.bloqueadoSaqueAniversario && <div className="mt-3 bg-amber-500/20 text-amber-400 text-[10px] px-3 py-1 rounded-full border border-amber-500/30 inline-flex items-center gap-1 relative z-10">⚠️ Saldo FGTS Retido</div>}
                </div>

                {/* Lista */}
                <div className="space-y-0 text-sm bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
                  <div className="flex justify-between py-3 px-3"><span className="text-slate-600">Saldo de Salário</span><span className="font-semibold text-slate-900">{resultado.saldoSalario}</span></div>
                  <div className="flex justify-between py-3 px-3"><span className="text-slate-600">13º Proporcional ({resultado.mesesDecimo}/12)</span><span className="font-semibold text-slate-900">{resultado.decimo}</span></div>
                  <div className="flex justify-between py-3 px-3"><span className="text-slate-600">Férias Prop. ({resultado.mesesFerias}/12) + 1/3</span><span className="font-semibold text-slate-900">{resultado.feriasProp}</span></div>
                  
                  {resultado.feriasVencidas !== "R$ 0,00" && <div className="flex justify-between py-3 px-3 bg-blue-50/30"><span className="text-blue-800 font-medium">Férias Vencidas + 1/3</span><span className="font-semibold text-blue-900">{resultado.feriasVencidas}</span></div>}
                  {resultado.aviso !== "R$ 0,00" && <div className="flex justify-between py-3 px-3 bg-green-50/30"><span className="text-green-800 font-medium">Aviso Prévio ({resultado.diasAviso}d)</span><span className="font-semibold text-green-900">{resultado.aviso}</span></div>}
                  {resultado.multaFgts !== "R$ 0,00" && <div className="flex justify-between py-3 px-3 bg-green-50/30"><span className="text-green-800 font-medium">Multa 40% FGTS</span><span className="font-semibold text-green-900">{resultado.multaFgts}</span></div>}
                  
                  <div className="py-3 px-3">
                    <div className="flex justify-between items-center mb-1"><span className="text-slate-600 font-medium">Saque FGTS Disponível</span><span className="font-bold text-green-600">{resultado.saqueFgts}</span></div>
                  </div>
                  <div className="flex justify-between py-3 px-3 bg-red-50/30 text-red-600 border-t border-red-100"><span className="font-medium">Descontos (INSS/IRRF Est.)</span><span className="font-bold">- {resultado.descontosEst}</span></div>
                </div>
                
                <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* Os valores são simulados. A homologação oficial pode ter variações.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* BOTÕES DE AÇÃO */}
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

      {/* --- MODAL DE IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Termo de Simulação de Rescisão</h1><p className="text-sm text-slate-500 mt-1">Gerado por <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Dados</p><p><strong>Admissão:</strong> {new Date(dataInicio).toLocaleDateString()}</p><p><strong>Afastamento:</strong> {new Date(dataFim).toLocaleDateString()}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Detalhes</p><p><strong>Motivo:</strong> {motivo === "sem_justa_causa" ? "Sem Justa Causa" : "Pedido Demissão"}</p><p><strong>Aviso:</strong> {avisoPrevio}</p></div>
                </div>
                <div className="mb-8">
                    <table className="w-full text-sm border border-slate-300">
                        <thead className="bg-slate-100"><tr><th className="p-3 text-left border-b">Descrição da Verba</th><th className="p-3 text-right border-b">Valor</th></tr></thead>
                        <tbody>
                            <tr><td className="p-3 border-b">Saldo de Salário</td><td className="p-3 text-right border-b">{resultado.saldoSalario}</td></tr>
                            <tr><td className="p-3 border-b">13º Salário Proporcional</td><td className="p-3 text-right border-b">{resultado.decimo}</td></tr>
                            <tr><td className="p-3 border-b">Férias Proporcionais + 1/3</td><td className="p-3 text-right border-b">{resultado.feriasProp}</td></tr>
                            {resultado.feriasVencidas !== "R$ 0,00" && <tr><td className="p-3 border-b">Férias Vencidas + 1/3</td><td className="p-3 text-right border-b">{resultado.feriasVencidas}</td></tr>}
                            {resultado.aviso !== "R$ 0,00" && <tr><td className="p-3 border-b">Aviso Prévio Indenizado</td><td className="p-3 text-right border-b">{resultado.aviso}</td></tr>}
                            {resultado.multaFgts !== "R$ 0,00" && <tr><td className="p-3 border-b">Multa 40% FGTS</td><td className="p-3 text-right border-b">{resultado.multaFgts}</td></tr>}
                            <tr><td className="p-3 border-b text-red-600">Descontos Estimados (INSS/IRRF)</td><td className="p-3 text-right border-b text-red-600">- {resultado.descontosEst}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-50 font-bold">
                            <tr><td className="p-3 text-right">TOTAL LÍQUIDO A RECEBER</td><td className="p-3 text-right text-lg text-blue-600 bg-blue-50 border-t border-blue-200">{resultado.totalLiquido}</td></tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo.</p>
                <div className="bg-slate-900 p-4 rounded-lg relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/trabalhista/rescisao?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Rescisão"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-blue-600 hover:bg-blue-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}