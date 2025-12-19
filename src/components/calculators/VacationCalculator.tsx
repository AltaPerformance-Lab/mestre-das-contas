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

// TIPO PARA HISTÓRICO
type HistoricoFerias = {
  data: string;
  salario: string;
  liquido: string;
  dias: string;
  vendeu: boolean;
};

type ResultadoFerias = {
    valorFerias: string;
    tercoFerias: string;
    abono: string;
    adiantamento13: string;
    inss: string;
    irrf: string;
    totalBruto: string;
    totalDescontos: string;
    totalLiquido: string;
    diasGozo: number;
    vendeuFerias: boolean;
    rawSalario: number;
    rawDias: number;
    rawVender: boolean;
    rawDecimo: boolean;
    rawDeps: number;
} | null;

export default function VacationCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES DE DADOS
  const [salarioBruto, setSalarioBruto] = useState("");
  const [salarioValue, setSalarioValue] = useState(0);
  const [dependentes, setDependentes] = useState("0");
  const [diasFerias, setDiasFerias] = useState("30");
  const [venderFerias, setVenderFerias] = useState(false);
  const [adiantarDecimo, setAdiantarDecimo] = useState(false);
  
  const [resultado, setResultado] = useState<ResultadoFerias>(null);

  // STATES DE FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoFerias[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Ferias_Simulada_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
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

  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_ferias");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlSalario = searchParams.get("salario");
    const urlDias = searchParams.get("dias");
    const urlVender = searchParams.get("vender");
    const urlDecimo = searchParams.get("decimo");
    const urlDeps = searchParams.get("dependentes");

    if (urlSalario) {
        const valSalario = parseFloat(urlSalario);
        setSalarioValue(valSalario);
        setSalarioBruto(formatBRL(valSalario));
        
        if (urlDias) setDiasFerias(urlDias);
        if (urlVender) setVenderFerias(urlVender === "true");
        if (urlDecimo) setAdiantarDecimo(urlDecimo === "true");
        if (urlDeps) setDependentes(urlDeps);

        setTimeout(() => {
            calcular(valSalario, parseInt(urlDias || "30"), urlVender === "true", urlDecimo === "true", parseInt(urlDeps || "0"));
        }, 200);
    }
  }, [searchParams]);

  // CÁLCULO
  const calcular = (
      pSalario = salarioValue, 
      pDias = parseInt(diasFerias), 
      pVender = venderFerias, 
      pDecimo = adiantarDecimo,
      pDeps = parseInt(dependentes) || 0
  ) => {
    if (!pSalario) return;

    const valorDia = pSalario / 30;

    // 1. Férias Gozadas
    const vlrFerias = valorDia * pDias;
    const vlrTercoFerias = vlrFerias / 3;

    // 2. Abono Pecuniário (Venda)
    let vlrAbono = 0;
    let vlrTercoAbono = 0;

    if (pVender) {
      const diasVendidos = 10; 
      vlrAbono = valorDia * diasVendidos;
      vlrTercoAbono = vlrAbono / 3;
    }

    // 3. Adiantamento 13º
    let vlrAdiantamento13 = 0;
    if (pDecimo) {
      vlrAdiantamento13 = pSalario / 2;
    }

    // 4. Base de Cálculo (Abono é isento)
    const baseTributavel = vlrFerias + vlrTercoFerias;
    
    // 5. INSS 2025
    let inss = 0;
    let baseCalculo = baseTributavel;
    if (baseCalculo <= 1412.00) inss = baseCalculo * 0.075;
    else if (baseCalculo <= 2666.68) inss = (1412.00 * 0.075) + ((baseCalculo - 1412.00) * 0.09);
    else if (baseCalculo <= 4000.03) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((baseCalculo - 2666.68) * 0.12);
    else if (baseCalculo <= 7786.02) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((baseCalculo - 4000.03) * 0.14);
    else inss = 908.85;

    // 6. IRRF
    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = baseTributavel - inss - deducaoDependentes;
    let irrf = 0;
    if (baseIRRF <= 2259.20) irrf = 0;
    else if (baseIRRF <= 2826.65) irrf = (baseIRRF * 0.075) - 169.44;
    else if (baseIRRF <= 3751.05) irrf = (baseIRRF * 0.15) - 381.44;
    else if (baseIRRF <= 4664.68) irrf = (baseIRRF * 0.225) - 662.77;
    else irrf = (baseIRRF * 0.275) - 896.00;
    if (irrf < 0) irrf = 0;

    const totalProventos = vlrFerias + vlrTercoFerias + vlrAbono + vlrTercoAbono + vlrAdiantamento13;
    const totalDescontos = inss + irrf;
    const totalLiquido = totalProventos - totalDescontos;

    const novoResultado = {
      valorFerias: formatBRL(vlrFerias),
      tercoFerias: formatBRL(vlrTercoFerias),
      abono: formatBRL(vlrAbono + vlrTercoAbono),
      adiantamento13: formatBRL(vlrAdiantamento13),
      inss: formatBRL(inss),
      irrf: formatBRL(irrf),
      totalBruto: formatBRL(totalProventos),
      totalDescontos: formatBRL(totalDescontos),
      totalLiquido: formatBRL(totalLiquido),
      diasGozo: pDias,
      vendeuFerias: pVender,
      rawSalario: pSalario,
      rawDias: pDias,
      rawVender: pVender,
      rawDecimo: pDecimo,
      rawDeps: pDeps
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // ACTIONS
  const salvarHistorico = (res: any) => {
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
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Férias"></iframe>`);
    }

    setCopiado(type);
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    if (reactToPrintFn) reactToPrintFn();
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 w-full overflow-hidden bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Sun size={22} strokeWidth={2.5} /></div>
                    Planeje suas Férias
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

              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Dependentes</Label>
                      <Input type="number" value={dependentes} onChange={e => setDependentes(e.target.value)} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="0" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Dias de Descanso</Label>
                      <Select value={diasFerias} onValueChange={setDiasFerias}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-base"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="30">30 dias</SelectItem>
                              <SelectItem value="20">20 dias</SelectItem>
                              <SelectItem value="15">15 dias</SelectItem>
                              <SelectItem value="10">10 dias</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>

              {/* OPÇÕES AVANÇADAS */}
              <div className="bg-slate-50 p-5 rounded-xl space-y-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 relative">
                          <Label htmlFor="vender-ferias" className="cursor-pointer text-sm font-medium text-slate-700">Vender 10 dias (Abono)?</Label>
                          <div className="group relative flex items-center">
                              <Info size={16} className="text-slate-400 cursor-help hover:text-blue-500 transition-colors" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl hidden group-hover:block z-50 leading-tight text-center after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-800">
                                  "Vender as férias" significa trocar 10 dias de descanso por dinheiro. Esse valor é isento de impostos.
                              </div>
                          </div>
                      </div>
                      <Switch id="vender-ferias" checked={venderFerias} onCheckedChange={setVenderFerias} />
                  </div>

                  <div className="h-px bg-slate-200 my-2"></div>

                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 relative">
                          <Label htmlFor="adiantar-decimo" className="cursor-pointer text-sm font-medium text-slate-700">Adiantar 1ª Parc. 13º?</Label>
                          <div className="group relative flex items-center">
                              <Info size={16} className="text-slate-400 cursor-help hover:text-blue-500 transition-colors" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-xl hidden group-hover:block z-50 leading-tight text-center after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-800">
                                  Você pode receber metade do 13º salário junto com as férias.
                              </div>
                          </div>
                      </div>
                      <Switch id="adiantar-decimo" checked={adiantarDecimo} onCheckedChange={setAdiantarDecimo} />
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]">Calcular Férias</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 rounded-xl transition-colors" title="Limpar"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico Recente</h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer active:bg-slate-100" 
                         onClick={() => {
                             const valBruto = item.salario.replace("R$", "").trim();
                             handleSalarioChange({ target: { value: valBruto.replace(/\./g, "").replace(",", "") } } as any);
                         }}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{item.salario}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{item.dias} • {item.vendeu ? "Vendeu" : "Normal"}</span>
                    </div>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs tabular-nums">{item.liquido}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 overflow-hidden flex flex-col ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 bg-white shrink-0">
              <CardTitle className="text-slate-800 text-lg font-bold">Recibo de Férias</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <Palmtree size={40} className="opacity-30" />
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Preencha os dados para simular o valor das suas férias.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* Destaque */}
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-lg shadow-blue-100/50 text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Líquido a Receber</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-blue-600 mt-2 break-words tracking-tight leading-tight">{resultado.totalLiquido}</p>
                  </div>

                  {/* Lista */}
                  <div className="space-y-0 text-sm bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">Férias ({resultado.diasGozo} dias)</span><span className="font-bold text-slate-900">{resultado.valorFerias}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">1/3 Constitucional</span><span className="font-bold text-slate-900">{resultado.tercoFerias}</span></div>
                    
                    {resultado.abono !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-green-50/50"><span className="text-green-700 font-bold">Abono Pecuniário (+1/3)</span><span className="font-bold text-green-800">{resultado.abono}</span></div>}
                    {resultado.adiantamento13 !== "R$ 0,00" && <div className="flex justify-between py-3 px-4 bg-blue-50/50"><span className="text-blue-700 font-bold">Adiantamento 13º</span><span className="font-bold text-blue-800">{resultado.adiantamento13}</span></div>}
                    
                    <div className="flex justify-between py-3 px-4 text-red-500 items-center group bg-red-50/10"><span className="flex items-center gap-2 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> INSS</span><span className="font-bold text-red-600">- {resultado.inss}</span></div>
                    <div className="flex justify-between py-3 px-4 text-red-500 items-center group bg-red-50/10"><span className="flex items-center gap-2 font-medium"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> IRRF</span><span className="font-bold text-red-600">- {resultado.irrf}</span></div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-4">* Os valores de INSS e IRRF incidem sobre o valor das férias gozadas e o terço constitucional. O abono pecuniário é isento.</p>

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

      {/* --- IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
                <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recibo de Férias</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Simulação <strong>Mestre das Contas</strong></p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Demonstrativo</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Salário Base</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.rawSalario ? formatBRL(resultado.rawSalario) : "R$ 0,00"}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Dias de Gozo</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.diasGozo}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Vendeu?</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.vendeuFerias ? "Sim (10 dias)" : "Não"}</p>
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
                            <tr><td className="p-4 font-medium">Férias ({resultado.diasGozo} dias)</td><td className="p-4 text-right font-bold text-green-700">{resultado.valorFerias}</td><td className="p-4 text-right text-slate-400">-</td></tr>
                            <tr><td className="p-4 font-medium">1/3 Constitucional</td><td className="p-4 text-right font-bold text-green-700">{resultado.tercoFerias}</td><td className="p-4 text-right text-slate-400">-</td></tr>
                            
                            {resultado.abono !== "R$ 0,00" && (
                                <tr className="bg-green-50/30"><td className="p-4 font-bold text-green-800">Abono Pecuniário (+1/3)</td><td className="p-4 text-right font-bold text-green-800">{resultado.abono}</td><td className="p-4 text-right text-slate-400">-</td></tr>
                            )}
                            
                            {resultado.adiantamento13 !== "R$ 0,00" && (
                                <tr className="bg-blue-50/30"><td className="p-4 font-bold text-blue-800">Adiantamento 13º Salário</td><td className="p-4 text-right font-bold text-blue-800">{resultado.adiantamento13}</td><td className="p-4 text-right text-slate-400">-</td></tr>
                            )}
                            
                            <tr><td className="p-4 font-medium">INSS</td><td className="p-4 text-right text-slate-400">-</td><td className="p-4 text-right font-bold text-red-600">{resultado.inss}</td></tr>
                            <tr><td className="p-4 font-medium">IRRF</td><td className="p-4 text-right text-slate-400">-</td><td className="p-4 text-right font-bold text-red-600">{resultado.irrf}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="p-4 font-bold uppercase tracking-wider">TOTAL LÍQUIDO</td>
                                <td className="p-4 text-right" colSpan={2}>
                                    <span className="text-lg font-extrabold">{resultado.totalLiquido}</span>
                                </td>
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
                        Não vale como documento oficial
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- MODAL DE EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Férias"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/ferias?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Férias"></iframe>`);
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