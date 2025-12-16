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
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X 
} from "lucide-react";

type HistoricoItem = {
  data: string;
  bruto: string;
  liquido: string;
  descontos: string;
};

export default function SalaryCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // Estados
  const [brutoDisplay, setBrutoDisplay] = useState("");
  const [outrosDisplay, setOutrosDisplay] = useState("");
  const [brutoValue, setBrutoValue] = useState(0);
  const [outrosValue, setOutrosValue] = useState(0);
  const [dependentes, setDependentes] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  // Funcionalidades
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Holerite_Simulado_MestreDasContas",
  });

  // --- FORMATAÇÃO ---
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  };

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_salario");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlSalario = searchParams.get("salario");
    const urlDeps = searchParams.get("dependentes");
    const urlOutros = searchParams.get("outros");

    if (urlSalario) {
        const valSalario = parseFloat(urlSalario);
        setBrutoValue(valSalario);
        setBrutoDisplay(formatCurrency(valSalario));

        if (urlDeps) setDependentes(urlDeps);
        
        let valOutros = 0;
        if (urlOutros) {
            valOutros = parseFloat(urlOutros);
            setOutrosValue(valOutros);
            setOutrosDisplay(formatCurrency(valOutros));
        }

        setTimeout(() => {
            calcular(valSalario, parseInt(urlDeps || "0"), valOutros);
        }, 100);
    }
  }, [searchParams]);

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
    
    // INSS 2025 (Progressivo)
    let inss = 0;
    if (salario <= 1412.00) inss = salario * 0.075;
    else if (salario <= 2666.68) inss = (1412.00 * 0.075) + ((salario - 1412.00) * 0.09);
    else if (salario <= 4000.03) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((salario - 2666.68) * 0.12);
    else if (salario <= 7786.02) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((salario - 4000.03) * 0.14);
    else inss = 908.85;

    // IRRF
    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = salario - inss - deducaoDependentes;
    let irrf = 0;
    if (baseIRRF <= 2259.20) irrf = 0;
    else if (baseIRRF <= 2826.65) irrf = (baseIRRF * 0.075) - 169.44;
    else if (baseIRRF <= 3751.05) irrf = (baseIRRF * 0.15) - 381.44;
    else if (baseIRRF <= 4664.68) irrf = (baseIRRF * 0.225) - 662.77;
    else irrf = (baseIRRF * 0.275) - 896.00;
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

  // --- ACTIONS ---
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/financeiro/salario-liquido?salario=${brutoValue}&dependentes=${dependentes}`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado?.rawBruto) params.set("salario", resultado.rawBruto.toString());
        if (resultado?.rawDeps) params.set("dependentes", resultado.rawDeps.toString());
        if (resultado?.rawOutros) params.set("outros", resultado.rawOutros.toString());
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
    const code = `<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de Salário Líquido"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 w-full print:hidden">
        
        {/* --- COLUNA 1: FORMULÁRIO --- */}
        <div className="space-y-6">
            <Card className="w-full shadow-sm border-slate-200">
            {/* CABEÇALHO COMPACTO NO MOBILE */}
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
                <div className="flex flex-row items-center justify-between gap-2">
                    <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                        <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg"><Calculator className="text-blue-600 w-4 h-4 md:w-5 md:h-5" /></div> 
                        Calcular Salário
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
                <Label htmlFor="salario" className="text-sm md:text-base">Salário Bruto</Label>
                <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="salario" placeholder="R$ 0,00" value={brutoDisplay} onChange={handleBrutoChange} className="pl-9 text-lg font-medium h-12" maxLength={18} inputMode="numeric" />
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="dependentes" className="text-sm md:text-base">Número de Dependentes</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input id="dependentes" type="number" placeholder="0" className="pl-9 h-12" value={dependentes} onChange={(e) => setDependentes(e.target.value)} inputMode="numeric" />
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="outros" className="text-sm md:text-base">Outros Descontos (Opcional)</Label>
                <Input id="outros" placeholder="R$ 0,00" value={outrosDisplay} onChange={handleOutrosChange} className="h-12" inputMode="numeric" />
                </div>

                <div className="flex gap-3 pt-2">
                <Button onClick={() => calcular()} className="flex-1 bg-blue-600 hover:bg-blue-700 text-base md:text-lg h-12 font-bold shadow-blue-200 shadow-lg active:scale-95 transition-transform">Calcular</Button>
                <Button variant="outline" onClick={limpar} size="icon" className="h-12 w-12 shrink-0 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"><RefreshCcw className="h-5 w-5" /></Button>
                </div>
            </CardContent>
            </Card>

            {/* HISTÓRICO */}
            {!isIframe && historico.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Últimos Cálculos</h4>
                    <div className="space-y-2">
                    {historico.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" 
                             onClick={() => { 
                                 const valBruto = item.bruto.replace("R$", "").trim();
                                 handleBrutoChange({ target: { value: valBruto.replace(/\./g, "").replace(",", "") } } as any);
                             }}>
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{item.bruto}</span>
                            <span className="text-[10px] text-slate-400">{item.data}</span>
                        </div>
                        <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded text-xs">Liq: {item.liquido}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- COLUNA 2: RESULTADO --- */}
        <div className="flex flex-col gap-4">
            <Card className={`w-full transition-all duration-500 h-fit ${resultado ? 'border-blue-200 bg-blue-50/30 shadow-md' : 'border-slate-100 bg-slate-50 shadow-none'}`}>
            <CardHeader className="p-4 md:p-6"><CardTitle className="text-lg md:text-xl text-slate-800">Resultado Detalhado</CardTitle></CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
                {!resultado ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[150px] md:min-h-[200px] space-y-4 py-4 md:py-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><Calculator size={24} className="opacity-40 md:w-8 md:h-8" /></div>
                    <p className="text-center max-w-[220px] text-xs md:text-sm">Preencha os valores para ver a mágica acontecer.</p>
                </div>
                ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white p-5 md:p-6 rounded-xl border border-blue-100 shadow-lg shadow-blue-100/50 text-center overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                    <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Salário Líquido</span>
                    <div className="text-3xl md:text-5xl font-extrabold text-blue-600 mt-2 md:mt-3 tracking-tight break-words leading-none pb-1">{resultado.liquido}</div>
                    </div>

                    <div className="space-y-3 text-sm bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                        <span className="text-slate-600 font-medium">Salário Bruto</span>
                        <span className="font-bold text-slate-900">{resultado.bruto}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> INSS</span>
                        <span className="font-bold text-red-600">- {resultado.inss}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> IRRF</span>
                        <span className="font-bold text-red-600">- {resultado.irrf}</span>
                    </div>
                    {resultado.outros !== "R$ 0,00" && (
                        <div className="flex justify-between items-center group">
                        <span className="text-slate-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Outros</span>
                        <span className="font-bold text-slate-600">- {resultado.outros}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
                        <span className="text-slate-400 text-xs uppercase font-bold">Total Descontos</span>
                        <span className="text-slate-500 font-bold text-sm">{resultado.totalDescontos}</span>
                    </div>
                    </div>
                    
                    <div className="text-center text-xs text-slate-400 bg-blue-50/50 py-2 rounded-lg border border-blue-100">
                    Alíquota Efetiva: <strong className="text-slate-700">{resultado.aliquotaEfetiva}</strong>
                    </div>
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

      {/* --- MODAL DE IMPRESSÃO --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-4xl font-bold text-slate-900">Holerite Simulado</h1><p className="text-sm text-slate-500 mt-1">Gerado por <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-3 gap-4">
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Salário Base</p><p className="text-xl font-bold">{resultado.bruto}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Dependentes</p><p className="text-xl font-bold">{dependentes || 0}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Outros Descontos</p><p className="text-xl font-bold">{resultado.outros}</p></div>
                </div>
                <div className="mb-8">
                    <table className="w-full text-sm border border-slate-300">
                        <thead className="bg-slate-100"><tr><th className="p-3 text-left border-b">Descrição</th><th className="p-3 text-right border-b">Proventos</th><th className="p-3 text-right border-b">Descontos</th></tr></thead>
                        <tbody>
                            <tr><td className="p-3 border-b">Salário Bruto</td><td className="p-3 text-right border-b text-green-700">{resultado.bruto}</td><td className="p-3 text-right border-b">-</td></tr>
                            <tr><td className="p-3 border-b">INSS</td><td className="p-3 text-right border-b">-</td><td className="p-3 text-right border-b text-red-600">{resultado.inss}</td></tr>
                            <tr><td className="p-3 border-b">IRRF</td><td className="p-3 text-right border-b">-</td><td className="p-3 text-right border-b text-red-600">{resultado.irrf}</td></tr>
                            {resultado.outros !== "R$ 0,00" && <tr><td className="p-3 border-b">Outros</td><td className="p-3 text-right border-b">-</td><td className="p-3 text-right border-b text-red-600">{resultado.outros}</td></tr>}
                        </tbody>
                        <tfoot className="bg-slate-50 font-bold">
                            <tr><td className="p-3 text-right" colSpan={2}>LÍQUIDO A RECEBER</td><td className="p-3 text-right text-lg text-blue-600 bg-blue-50 border-t border-blue-200">{resultado.liquido}</td></tr>
                        </tfoot>
                    </table>
                </div>
                <p className="text-[10px] text-slate-400 text-center">* Este documento é uma simulação e não possui valor legal.</p>
            </div>
        </div>
      )}

      {/* --- MODAL EMBED --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para usar no seu site.</p>
                <div className="bg-slate-900 p-4 rounded-lg relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/financeiro/salario-liquido?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Salário"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-blue-600 hover:bg-blue-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}