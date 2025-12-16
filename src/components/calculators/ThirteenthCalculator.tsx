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
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X 
} from "lucide-react";

// TIPO PARA HISTÓRICO
type Historico13 = {
  data: string;
  salario: string;
  liquido: string;
  meses: string;
};

export default function ThirteenthCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // STATES DE DADOS
  const [salarioBruto, setSalarioBruto] = useState("");
  const [salarioValue, setSalarioValue] = useState(0);
  const [dependentes, setDependentes] = useState("0");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("12");
  const [resultado, setResultado] = useState<any>(null);

  // STATES DE FUNCIONALIDADES
  const [historico, setHistorico] = useState<Historico13[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Decimo_Terceiro_Simulado_MestreDasContas",
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

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/trabalhista/decimo-terceiro`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("salario", resultado.rawSalario.toString());
            params.set("meses", resultado.rawMeses.toString());
            params.set("dependentes", resultado.rawDeps.toString());
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
    const code = `<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de 13º Salário"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO (Esq) --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 w-full overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-blue-600"><Coins size={20} /></div>
                    Dados do 13º Salário
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                          <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 md:p-6">
              <div className="space-y-2">
                <Label className="text-slate-600 font-medium">Salário Bruto</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="R$ 0,00" value={salarioBruto} onChange={handleSalarioChange} className="pl-9 h-12 text-lg font-medium border-slate-200" inputMode="numeric"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="text-slate-600">Meses Trabalhados</Label>
                      <Select value={mesesTrabalhados} onValueChange={setMesesTrabalhados}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                          <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 1).map(num => (
                              <SelectItem key={num} value={num.toString()}>{num} meses</SelectItem>
                          ))}
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600">Dependentes</Label>
                      <Input type="number" value={dependentes} onChange={e => setDependentes(e.target.value)} className="h-12 border-slate-200" placeholder="0" inputMode="numeric"/>
                  </div>
              </div>

              <div className="flex gap-3 pt-4">
                  <Button onClick={() => calcular()} className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">Calcular 13º</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico Recente</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" 
                         onClick={() => {
                             const valBruto = item.salario.replace("R$", "").trim();
                             handleSalarioChange({ target: { value: valBruto.replace(/\./g, "").replace(",", "") } } as any);
                         }}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-bold">{item.salario}</span>
                        <span className="text-[10px] text-slate-400">{item.meses} meses • {item.data}</span>
                    </div>
                    <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">{item.liquido}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="md:col-span-5 w-full flex flex-col gap-4">
          <Card className={`h-fit w-full transition-all duration-500 border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
            <CardHeader className="px-5 md:px-6 border-b border-slate-100 bg-white">
              <CardTitle className="text-slate-800 text-lg md:text-xl">Resultado Detalhado</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><CalendarDays size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Preencha os dados para ver as parcelas.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Card 1ª Parcela */}
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 relative w-full text-center">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">1ª Parcela (Nov)</p>
                    <p className="text-3xl font-extrabold text-blue-700 break-words tracking-tight">{resultado.primeiraParcela}</p>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded text-blue-400 border border-blue-100 absolute top-4 right-4">Sem descontos</span>
                  </div>

                  {/* Card 2ª Parcela */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative w-full text-center">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">2ª Parcela (Dez)</p>
                    <p className="text-3xl font-extrabold text-slate-900 break-words tracking-tight">{resultado.segundaParcela}</p>
                    <p className="text-[10px] text-slate-400 mt-1">(Valor restante menos impostos)</p>
                  </div>

                  <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100 w-full">
                    <div className="flex justify-between py-1"><span className="text-slate-600">Total Bruto ({resultado.meses}/12)</span><span className="font-semibold text-slate-900">{resultado.totalBruto}</span></div>
                    <div className="flex justify-between py-1 text-red-500"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> INSS</span><span className="font-semibold">- {resultado.inss}</span></div>
                    <div className="flex justify-between py-1 text-red-500"><span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> IRRF</span><span className="font-semibold">- {resultado.irrf}</span></div>
                    <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between font-bold"><span className="text-slate-700">Total Líquido (Soma)</span><span className="text-blue-600">{resultado.totalLiquido}</span></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BOTÕES */}
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

      {/* --- IMPRESSÃO (Oculto) --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Extrato de 13º Salário</h1><p className="text-sm text-slate-500 mt-1">Simulação <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Salário Base</p><p className="text-xl font-bold">{resultado.totalBruto}</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Meses Trab.</p><p className="text-xl font-bold">{resultado.meses} / 12</p></div>
                    <div className="p-3 border rounded"><p className="text-xs text-slate-400 uppercase font-bold">Dependentes</p><p className="text-xl font-bold">{dependentes}</p></div>
                </div>
                <div className="mb-8">
                    <table className="w-full text-sm border border-slate-300">
                        <thead className="bg-slate-100"><tr><th className="p-3 text-left border-b">Descrição</th><th className="p-3 text-right border-b">Valor</th></tr></thead>
                        <tbody>
                            <tr><td className="p-3 border-b">1ª Parcela (Adiantamento)</td><td className="p-3 text-right border-b text-green-700">{resultado.primeiraParcela}</td></tr>
                            <tr><td className="p-3 border-b">2ª Parcela (Saldo)</td><td className="p-3 text-right border-b text-green-700">{resultado.segundaParcela}</td></tr>
                            <tr><td className="p-3 border-b text-red-600">Desconto INSS</td><td className="p-3 text-right border-b text-red-600">- {resultado.inss}</td></tr>
                            <tr><td className="p-3 border-b text-red-600">Desconto IRRF</td><td className="p-3 text-right border-b text-red-600">- {resultado.irrf}</td></tr>
                        </tbody>
                        <tfoot className="bg-slate-50 font-bold">
                            <tr><td className="p-3 text-right">TOTAL LÍQUIDO (1ª + 2ª)</td><td className="p-3 text-right text-lg text-blue-600 bg-blue-50 border-t border-blue-200">{resultado.totalLiquido}</td></tr>
                        </tfoot>
                    </table>
                </div>
                <div className="text-center pt-8 border-t border-slate-300 mt-8">
                    <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
                    <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
                </div>
            </div>
        </div>
      )}

      {/* --- EMBED MODAL --- */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar Calculadora</h3>
                <p className="text-sm text-slate-500 mb-4">Copie o código abaixo.</p>
                <div className="bg-slate-900 p-4 rounded-lg relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/trabalhista/decimo-terceiro?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora 13º Salário"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-blue-600 hover:bg-blue-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}