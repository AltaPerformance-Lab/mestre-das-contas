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
  Briefcase, DollarSign, CalendarRange, RefreshCcw, 
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, ShieldAlert 
} from "lucide-react";

type HistoricoSeguro = {
  data: string;
  media: string;
  parcelas: string;
  valor: string;
};

export default function UnemploymentCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [salario1, setSalario1] = useState("");
  const [salario2, setSalario2] = useState("");
  const [salario3, setSalario3] = useState("");
  const [mesesTrabalhados, setMesesTrabalhados] = useState("");
  const [solicitacao, setSolicitacao] = useState("1"); // 1ª, 2ª ou 3ª solicitação
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoSeguro[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  // IMPRESSÃO
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Seguro_Desemprego_Simulado_MestreDasContas",
  });

  // UTILS
  const formatarMoedaInput = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros === "") return { display: "", value: 0 };
    const numero = parseFloat(apenasNumeros) / 100;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero);
    return { display: formatado, value: numero };
  };

  const handleSalarioChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { display } = formatarMoedaInput(e.target.value);
    setter(display);
  };

  const parseMoeda = (val: string) => parseFloat(val.replace(/\./g, "").replace(",", ".").replace("R$", "").trim()) || 0;
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_seguro");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlS1 = searchParams.get("s1");
    const urlS2 = searchParams.get("s2");
    const urlS3 = searchParams.get("s3");
    const urlMeses = searchParams.get("meses");
    const urlSol = searchParams.get("sol");

    if (urlS1 && urlMeses) {
        setSalario1(formatBRL(parseFloat(urlS1)));
        if (urlS2) setSalario2(formatBRL(parseFloat(urlS2)));
        if (urlS3) setSalario3(formatBRL(parseFloat(urlS3)));
        setMesesTrabalhados(urlMeses);
        if (urlSol) setSolicitacao(urlSol);

        setTimeout(() => {
            calcular(parseFloat(urlS1), urlS2 ? parseFloat(urlS2) : 0, urlS3 ? parseFloat(urlS3) : 0, parseInt(urlMeses), parseInt(urlSol || "1"));
        }, 200);
    }
  }, [searchParams]);

  // LÓGICA OFICIAL 2024/2025
  const calcular = (
      s1 = parseMoeda(salario1), 
      s2 = parseMoeda(salario2), 
      s3 = parseMoeda(salario3), 
      meses = parseInt(mesesTrabalhados), 
      vez = parseInt(solicitacao)
  ) => {
    
    if (!meses || isNaN(meses)) return;

    // 1. Calcular Média (Últimos 3 salários)
    // Se não tiver 3 salários, divide pelo que tem
    let soma = s1 + s2 + s3;
    let divisor = 0;
    if (s1 > 0) divisor++;
    if (s2 > 0) divisor++;
    if (s3 > 0) divisor++;
    
    const mediaSalarial = divisor > 0 ? soma / divisor : 0;

    // 2. Calcular Valor da Parcela (Tabela 2024 - Base Salário Mínimo R$ 1.412)
    let valorParcela = 0;
    const salarioMinimo = 1412.00; // 2024/2025

    if (mediaSalarial <= 2041.39) {
        valorParcela = mediaSalarial * 0.8;
    } else if (mediaSalarial <= 3402.65) {
        valorParcela = 1633.10 + ((mediaSalarial - 2041.39) * 0.5);
    } else {
        valorParcela = 2313.74; // Teto
    }

    // O valor não pode ser menor que o salário mínimo
    if (valorParcela < salarioMinimo) valorParcela = salarioMinimo;

    // 3. Calcular Quantidade de Parcelas
    let qtdParcelas = 0;

    if (vez === 1) {
        if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0; // Menos de 12 meses na 1ª solicitação não tem direito
    } else if (vez === 2) {
        if (meses >= 9 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0;
    } else { // 3ª ou mais
        if (meses >= 6 && meses <= 11) qtdParcelas = 3;
        else if (meses >= 12 && meses <= 23) qtdParcelas = 4;
        else if (meses >= 24) qtdParcelas = 5;
        else qtdParcelas = 0;
    }

    const totalReceber = valorParcela * qtdParcelas;

    const novoResultado = {
        media: formatBRL(mediaSalarial),
        valorParcela: formatBRL(valorParcela),
        qtdParcelas,
        total: formatBRL(totalReceber),
        direito: qtdParcelas > 0,
        motivoNegativa: qtdParcelas === 0 ? "Tempo de trabalho insuficiente para esta solicitação." : "",
        
        // Raw data
        rawS1: s1, rawS2: s2, rawS3: s3, rawMeses: meses, rawVez: vez
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
    if (!res.direito) return;
    const novoItem: HistoricoSeguro = {
        data: new Date().toLocaleDateString("pt-BR"),
        media: res.media,
        parcelas: `${res.qtdParcelas}x`,
        valor: res.valorParcela
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_seguro", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setSalario1(""); setSalario2(""); setSalario3("");
    setMesesTrabalhados(""); setSolicitacao("1");
    setResultado(null);
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { window.open(`https://mestredascontas.com.br/trabalhista/seguro-desemprego`, '_blank'); return; }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("s1", resultado.rawS1);
            params.set("s2", resultado.rawS2);
            params.set("s3", resultado.rawS3);
            params.set("meses", resultado.rawMeses);
            params.set("sol", resultado.rawVez);
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
    const code = `<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="750" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora Seguro Desemprego"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* --- FORMULÁRIO --- */}
        <div className="md:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-4 md:p-6">
              <div className="flex flex-row items-center justify-between gap-2">
                  <CardTitle className="text-lg md:text-xl flex items-center gap-2 text-slate-800">
                    <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-blue-600"><Briefcase size={20} /></div>
                    Simular Seguro
                  </CardTitle>
                  {!isIframe && (
                      <button onClick={() => handleAction("embed")} className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-2 py-1 md:px-3 md:py-1.5 rounded-full transition-all group shrink-0">
                          <Code2 size={14} className="text-slate-400 group-hover:text-blue-600"/> Incorporar
                      </button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-4 md:p-6">
              
              <div className="space-y-3">
                  <Label className="text-slate-600 font-medium">Últimos 3 Salários Brutos</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">1º</span>
                          <Input placeholder="R$ 0,00" value={salario1} onChange={handleSalarioChange(setSalario1)} className="pl-8 h-11 border-slate-200" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">2º</span>
                          <Input placeholder="R$ 0,00" value={salario2} onChange={handleSalarioChange(setSalario2)} className="pl-8 h-11 border-slate-200" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">3º</span>
                          <Input placeholder="R$ 0,00" value={salario3} onChange={handleSalarioChange(setSalario3)} className="pl-8 h-11 border-slate-200" inputMode="numeric"/>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label className="text-slate-600">Meses Trabalhados (Últimos 36 meses)</Label>
                      <Input type="number" value={mesesTrabalhados} onChange={e => setMesesTrabalhados(e.target.value)} className="h-12 border-slate-200" placeholder="Ex: 24" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600">Quantas vezes já solicitou?</Label>
                      <Select value={solicitacao} onValueChange={setSolicitacao}>
                          <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">Primeira vez</SelectItem>
                              <SelectItem value="2">Segunda vez</SelectItem>
                              <SelectItem value="3">Terceira vez ou mais</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>

              <div className="flex gap-3 pt-4">
                  <Button onClick={() => calcular()} className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">Calcular Benefício</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 shrink-0 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50"><RefreshCcw className="h-5 w-5" /></Button>
              </div>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer">
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">Média: {item.media}</span>
                            <span className="text-[10px] text-slate-400">{item.data}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{item.valor}</span>
                            <span className="text-[10px] text-slate-400">{item.parcelas} parcelas</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        {/* --- RESULTADO (Dir) --- */}
        <div className="md:col-span-5 w-full flex flex-col gap-4">
          <Card className={`h-fit w-full transition-all duration-500 border-0 shadow-sm ring-1 ring-slate-200 overflow-hidden ${resultado ? 'bg-white' : 'bg-slate-50'} print:bg-white print:border-slate-300`}>
            <CardHeader className="px-5 md:px-6 border-b border-slate-100 bg-white">
              <CardTitle className="text-slate-800 text-lg md:text-xl">Resultado da Simulação</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><ShieldAlert size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Preencha os dados para ver se tem direito e o valor.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {resultado.direito ? (
                      <>
                        {/* Destaque Positivo */}
                        <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Valor da Parcela</p>
                            <p className="text-4xl md:text-5xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.valorParcela}</p>
                            <div className="inline-block mt-3 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30 relative z-10">
                                {resultado.qtdParcelas} Parcelas
                            </div>
                        </div>

                        {/* Detalhes */}
                        <div className="space-y-3 text-sm bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-full">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span className="text-slate-600">Média Salarial (3 meses)</span>
                                <span className="font-semibold text-slate-900">{resultado.media}</span>
                            </div>
                            <div className="flex justify-between py-2 items-center group font-bold bg-blue-50/50 -mx-2 px-2 rounded">
                                <span className="text-slate-700">Total do Benefício</span>
                                <span className="text-blue-700">{resultado.total}</span>
                            </div>
                        </div>
                      </>
                  ) : (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600"><X size={24}/></div>
                          <h3 className="font-bold text-red-800 mb-2">Sem Direito ao Benefício</h3>
                          <p className="text-sm text-red-700 leading-relaxed">{resultado.motivoNegativa}</p>
                          <p className="text-xs text-red-600 mt-2">Verifique o tempo mínimo de meses trabalhados para a {resultado.rawVez}ª solicitação.</p>
                      </div>
                  )}
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* Cálculo baseado na tabela vigente do Ministério do Trabalho.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* BOTÕES */}
          {resultado && resultado.direito && (
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

      {/* --- IMPRESSÃO --- */}
      {resultado && resultado.direito && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Simulação Seguro Desemprego</h1><p className="text-sm text-slate-500 mt-1">Gerado por <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 border rounded">
                        <p className="text-xs text-slate-400 uppercase font-bold">Média Salarial</p>
                        <p className="text-xl font-bold">{resultado.media}</p>
                    </div>
                    <div className="p-3 border rounded">
                        <p className="text-xs text-slate-400 uppercase font-bold">Solicitação</p>
                        <p className="text-xl font-bold">{resultado.rawVez}ª vez</p>
                    </div>
                </div>
                <div className="mb-8 bg-slate-50 p-6 rounded border border-slate-200 text-center">
                    <p className="text-sm uppercase font-bold text-slate-500 mb-2">Valor do Benefício</p>
                    <p className="text-4xl font-extrabold text-slate-900 mb-2">{resultado.valorParcela}</p>
                    <p className="text-lg font-medium text-blue-600">em {resultado.qtdParcelas} parcelas</p>
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
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Seguro Desemprego"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-blue-600 hover:bg-blue-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}