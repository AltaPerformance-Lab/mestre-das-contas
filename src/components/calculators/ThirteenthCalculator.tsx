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

// TIPO PARA HISTÓRICO
type Historico13 = {
  data: string;
  salario: string;
  liquido: string;
  meses: string;
};

type Resultado13 = {
    totalBruto: string;
    primeiraParcela: string;
    segundaParcela: string;
    inss: string;
    irrf: string;
    totalLiquido: string;
    meses: number;
    rawSalario: number;
    rawMeses: number;
    rawDeps: number;
} | null;

export default function ThirteenthCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES DE DADOS
  const [salarioBruto, setSalarioBruto] = useState("");
  const [salarioValue, setSalarioValue] = useState(0);
  const [dependentes, setDependentes] = useState("0");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("12");
  
  const [resultado, setResultado] = useState<Resultado13>(null);

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
    
    // Carregar Histórico
    const salvo = localStorage.getItem("historico_13");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Ler URL
    const urlSalario = searchParams.get("salario");
    const urlMeses = searchParams.get("meses");
    const urlDeps = searchParams.get("dependentes");

    if (urlSalario) {
        const valSalario = parseFloat(urlSalario);
        setSalarioValue(valSalario);
        setSalarioBruto(formatBRL(valSalario));
        
        if (urlMeses) setMesesTrabalhados(urlMeses);
        if (urlDeps) setDependentes(urlDeps);

        setTimeout(() => {
            calcular(valSalario, parseInt(urlMeses || "12"), parseInt(urlDeps || "0"));
        }, 200);
    }
  }, [searchParams]);

  // CÁLCULO
  const calcular = (pSalario = salarioValue, pMeses = parseInt(mesesTrabalhados), pDeps = parseInt(dependentes) || 0) => {
    if (!pSalario) return;

    // Valor Total Bruto (Proporcional)
    const valorTotal13 = (pSalario / 12) * pMeses;

    // 1ª Parcela (50% do total, sem descontos)
    const primeiraParcela = valorTotal13 / 2;

    // Descontos (Sobre o CHEIO) - INSS 2025
    let inss = 0;
    let baseCalculo = valorTotal13;
    
    if (baseCalculo <= 1412.00) inss = baseCalculo * 0.075;
    else if (baseCalculo <= 2666.68) inss = (1412.00 * 0.075) + ((baseCalculo - 1412.00) * 0.09);
    else if (baseCalculo <= 4000.03) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((baseCalculo - 2666.68) * 0.12);
    else if (baseCalculo <= 7786.02) inss = (1412.00 * 0.075) + ((2666.68 - 1412.00) * 0.09) + ((4000.03 - 2666.68) * 0.12) + ((baseCalculo - 4000.03) * 0.14);
    else inss = 908.85;

    // IRRF
    const deducaoDependentes = pDeps * 189.59;
    const baseIRRF = baseCalculo - inss - deducaoDependentes;
    let irrf = 0;
    if (baseIRRF <= 2259.20) irrf = 0;
    else if (baseIRRF <= 2826.65) irrf = (baseIRRF * 0.075) - 169.44;
    else if (baseIRRF <= 3751.05) irrf = (baseIRRF * 0.15) - 381.44;
    else if (baseIRRF <= 4664.68) irrf = (baseIRRF * 0.225) - 662.77;
    else irrf = (baseIRRF * 0.275) - 896.00;
    if (irrf < 0) irrf = 0;

    // 2ª Parcela (Total - 1ª - Descontos)
    const segundaParcela = valorTotal13 - primeiraParcela - inss - irrf;

    const novoResultado = {
      totalBruto: formatBRL(valorTotal13),
      primeiraParcela: formatBRL(primeiraParcela),
      segundaParcela: formatBRL(segundaParcela),
      inss: formatBRL(inss),
      irrf: formatBRL(irrf),
      totalLiquido: formatBRL(primeiraParcela + segundaParcela),
      meses: pMeses,
      rawSalario: pSalario,
      rawMeses: pMeses,
      rawDeps: pDeps
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // ACTIONS
  const salvarHistorico = (res: any) => {
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
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de 13º Salário"></iframe>`);
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
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Coins size={22} strokeWidth={2.5} /></div>
                    Dados do 13º Salário
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
                      <Label className="text-slate-600 font-medium">Meses Trabalhados</Label>
                      <Select value={mesesTrabalhados} onValueChange={setMesesTrabalhados}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 text-base"><SelectValue /></SelectTrigger>
                          <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 1).map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} meses</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 font-medium">Dependentes</Label>
                      <Input type="number" value={dependentes} onChange={e => setDependentes(e.target.value)} className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="0" inputMode="numeric"/>
                  </div>
              </div>

              <div className="flex gap-3 pt-2">
                  <Button onClick={() => calcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 rounded-xl transition-all active:scale-[0.99]">Calcular 13º</Button>
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
                        <span className="text-[10px] text-slate-400 font-medium">{item.meses} meses • {item.data}</span>
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
              <CardTitle className="text-slate-800 text-lg font-bold">Resultado Detalhado</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                      <CalendarDays size={40} className="opacity-30" />
                  </div>
                  <p className="text-sm font-medium max-w-[200px]">Preencha os dados para ver as parcelas.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  
                  {/* Card 1ª Parcela */}
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 relative w-full text-center hover:bg-blue-100 transition-colors">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">1ª Parcela (Adiantamento)</p>
                    <p className="text-3xl font-extrabold text-blue-700 break-words tracking-tight">{resultado.primeiraParcela}</p>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded text-blue-400 border border-blue-100 absolute top-4 right-4 font-medium">Sem descontos</span>
                  </div>

                  {/* Card 2ª Parcela */}
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-lg relative w-full text-center group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors duration-500"></div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1 relative z-10">2ª Parcela (Saldo Final)</p>
                    <p className="text-4xl font-extrabold text-white break-words tracking-tight relative z-10">{resultado.segundaParcela}</p>
                    <p className="text-[10px] text-slate-500 mt-2 relative z-10">(Valor restante menos impostos)</p>
                  </div>

                  <div className="space-y-0 text-sm bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-slate-600 font-medium">Total Bruto ({resultado.meses}/12)</span><span className="font-bold text-slate-900">{resultado.totalBruto}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> INSS</span><span className="font-bold text-red-600">- {resultado.inss}</span></div>
                    <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span className="text-red-500 font-medium flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> IRRF</span><span className="font-bold text-red-600">- {resultado.irrf}</span></div>
                    <div className="flex justify-between py-3 px-4 bg-slate-50 font-bold"><span className="text-slate-700 text-xs uppercase tracking-wide">Total Líquido (Soma)</span><span className="text-blue-600 text-base">{resultado.totalLiquido}</span></div>
                  </div>

                  {/* BOTÕES */}
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
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Extrato de 13º Salário</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Simulação <strong>Mestre das Contas</strong></p>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Recibo de Simulação</p>
                        </div>
                        <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                    </div>
                </div>

                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Salário Base</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.totalBruto}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Meses Trab.</p>
                        <p className="text-xl font-bold text-slate-900">{resultado.meses} / 12</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                        <p className="text-xs text-slate-500 uppercase font-bold mb-2">Dependentes</p>
                        <p className="text-xl font-bold text-slate-900">{dependentes}</p>
                    </div>
                </div>

                <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 text-left">Descrição</th>
                                <th className="p-4 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td className="p-4 font-medium">1ª Parcela (Adiantamento)</td><td className="p-4 text-right font-bold text-green-700">{resultado.primeiraParcela}</td></tr>
                            <tr><td className="p-4 font-medium">2ª Parcela (Saldo)</td><td className="p-4 text-right font-bold text-green-700">{resultado.segundaParcela}</td></tr>
                            <tr><td className="p-4 font-medium text-red-600">Desconto INSS</td><td className="p-4 text-right font-bold text-red-600">- {resultado.inss}</td></tr>
                            <tr><td className="p-4 font-medium text-red-600">Desconto IRRF</td><td className="p-4 text-right font-bold text-red-600">- {resultado.irrf}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-900 text-white">
                            <tr>
                                <td className="p-4 font-bold uppercase tracking-wider">TOTAL LÍQUIDO (1ª + 2ª)</td>
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
                        Não vale como documento oficial
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora 13º Salário"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora 13º Salário"></iframe>`);
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