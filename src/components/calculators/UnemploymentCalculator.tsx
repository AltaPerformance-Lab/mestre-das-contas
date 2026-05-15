"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, DollarSign, RefreshCcw, 
  Share2, Printer, History, Code2, CheckCircle2, X, ShieldAlert, Link as LinkIcon
} from "lucide-react";
import ShareAsImage from "@/components/ui/ShareAsImage";
import { trackEvent } from "@/lib/analytics";
import { calculateUnemployment, type UnemploymentResult } from "@/lib/calculators/unemployment";

// --- TIPAGEM ---
type HistoricoSeguro = {
  data: string;
  media: string;
  parcelas: string;
  valor: string;
};

interface UnemploymentCalculatorProps {
    initialS1?: number;
    initialS2?: number;
    initialS3?: number;
    initialMeses?: number;
    initialVez?: number;
    initialResult?: UnemploymentResult | null;
}

export default function UnemploymentCalculator({
    initialS1 = 0,
    initialS2 = 0,
    initialS3 = 0,
    initialMeses = 0,
    initialVez = 1,
    initialResult = null
}: UnemploymentCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);

  // UTILS
  const formatBRL = (val: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  // DADOS
  const [salario1, setSalario1] = useState(initialS1 > 0 ? formatBRL(initialS1) : "");
  const [salario2, setSalario2] = useState(initialS2 > 0 ? formatBRL(initialS2) : "");
  const [salario3, setSalario3] = useState(initialS3 > 0 ? formatBRL(initialS3) : "");
  const [mesesTrabalhados, setMesesTrabalhados] = useState(initialMeses > 0 ? initialMeses.toString() : "");
  const [solicitacao, setSolicitacao] = useState(initialVez.toString());
  
  const [resultado, setResultado] = useState<UnemploymentResult | null>(initialResult);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoSeguro[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Seguro_Desemprego_Simulado_MestreDasContas",
    pageStyle: `@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }`
  });

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

  const parseMoeda = (val: string) => parseFloat(val.replace(/\./g, "").replace(",", ".").replace("R$", "").replace(/\s/g, "").trim()) || 0;

  // EFEITOS
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
    const salvo = localStorage.getItem("historico_seguro");
    if (salvo) setHistorico(JSON.parse(salvo));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialS1 > 0 && !resultado) {
        handleCalcular(initialS1, initialS2, initialS3, initialMeses, initialVez);
    }
  }, [initialS1, initialS2, initialS3, initialMeses, initialVez]);

  const handleCalcular = (
      s1 = parseMoeda(salario1), 
      s2 = parseMoeda(salario2), 
      s3 = parseMoeda(salario3), 
      meses = parseInt(mesesTrabalhados), 
      vez = parseInt(solicitacao)
  ) => {
    const res = calculateUnemployment(s1, s2, s3, meses, vez);
    if (res) {
        setResultado(res);
        trackEvent("calculate_seguro", { meses, vez, direito: res.direito });
        if (!isIframe) salvarHistorico(res);
    }
  };

  const salvarHistorico = (res: UnemploymentResult) => {
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

  const handleShare = (type: "link" | "embed") => {
    if (isIframe) {
        window.open(`https://mestredascontas.com.br/trabalhista/seguro-desemprego`, '_blank');
        return;
    }
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("s1", resultado.rawS1.toString());
            params.set("s2", resultado.rawS2.toString());
            params.set("s3", resultado.rawS3.toString());
            params.set("meses", resultado.rawMeses.toString());
            params.set("sol", resultado.rawVez.toString());
        }
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Seguro Desemprego"></iframe>`);
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
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Briefcase size={22} /></div>
                    Simular Seguro
                  </CardTitle>
                  {!isIframe && (
                      <Button variant="ghost" size="sm" onClick={() => setShowEmbedModal(true)} className="text-white hover:bg-white/20 h-8 px-2" title="Incorporar">
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-4">
                  <Label className="text-slate-600 dark:text-slate-300 font-medium">Últimos 3 Salários Brutos</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">1º</span>
                          <Input placeholder="R$ 0,00" value={salario1} onChange={handleSalarioChange(setSalario1)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">2º</span>
                          <Input placeholder="R$ 0,00" value={salario2} onChange={handleSalarioChange(setSalario2)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric"/>
                      </div>
                      <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-1 rounded">3º</span>
                          <Input placeholder="R$ 0,00" value={salario3} onChange={handleSalarioChange(setSalario3)} className="pl-8 h-12 border-slate-200 dark:border-slate-700 dark:text-white" inputMode="numeric"/>
                      </div>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Meses Trabalhados</Label>
                      <Input type="number" value={mesesTrabalhados} onChange={e => setMesesTrabalhados(e.target.value)} className="h-12 dark:text-white" placeholder="Ex: 24" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                      <Label className="text-slate-600 dark:text-slate-300 font-medium">Quantas vezes já solicitou?</Label>
                      <Select value={solicitacao} onValueChange={setSolicitacao}>
                          <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 dark:text-white"><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">Primeira vez</SelectItem>
                              <SelectItem value="2">Segunda vez</SelectItem>
                              <SelectItem value="3">Terceira vez ou mais</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex gap-3 pt-6">
                  <Button onClick={() => handleCalcular()} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-14 text-lg font-bold rounded-xl shadow-lg">Calcular</Button>
                  <Button variant="outline" onClick={limpar} size="icon" className="h-14 w-14 rounded-xl transition-colors"><RefreshCcw className="h-6 w-6" /></Button>
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
                            <span className="font-bold">Média: {item.media}</span>
                            <span className="text-[10px] text-slate-400">{item.data}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded text-xs tabular-nums">{item.valor}</span>
                            <span className="text-[10px] text-slate-400">{item.parcelas}</span>
                        </div>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card id="resultado-seguro-card" className={`h-full w-full border-0 shadow-lg overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 shrink-0"><CardTitle className="text-lg font-bold">Resumo</CardTitle></CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2"><ShieldAlert size={32} className="opacity-30" /></div>
                  <p className="text-sm font-medium">Preencha os dados ao lado.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 w-full">
                  {resultado.direito ? (
                      <>
                        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl text-center relative overflow-hidden group">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Parcela</p>
                            <div className="relative z-10 text-3xl font-extrabold text-white tracking-tight">{resultado.valorParcela}</div>
                            <div className="inline-block mt-4 px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-bold border border-green-500/30 relative z-10">{resultado.qtdParcelas} Parcelas</div>
                        </div>
                        <div className="space-y-0 text-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
                            <div className="flex justify-between py-3 px-4 hover:bg-slate-50 transition-colors"><span>Média Salarial</span><span className="font-bold">{resultado.media}</span></div>
                            <div className="flex justify-between py-3 px-4 bg-blue-50/50 font-bold text-blue-700"><span>Total do Benefício</span><span>{resultado.total}</span></div>
                        </div>
                      </>
                  ) : (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-xl p-8 text-center">
                          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600"><X size={32}/></div>
                          <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Sem Direito</h3>
                          <p className="text-sm text-red-700 dark:text-red-300">{resultado.motivoNegativa}</p>
                      </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button variant="outline" onClick={() => handleShare("link")} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide">{copiado === "link" ? "Copiado" : "Compartilhar"}</Button>
                        <Button variant="outline" onClick={() => reactToPrintFn()} className="h-11 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white text-xs font-bold uppercase tracking-wide"><Printer size={16}/> PDF</Button>
                        <div className="col-span-2"><ShareAsImage elementId="resultado-seguro-card" className="w-full h-11 bg-slate-900 dark:bg-slate-800 text-white" /></div>
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
                <div className="bg-slate-950 p-4 rounded-xl mb-4"><code className="text-xs font-mono text-blue-300 break-all leading-relaxed">{`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Seguro Desemprego"></iframe>`}</code></div>
                <Button onClick={() => { navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/trabalhista/seguro-desemprego?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Seguro Desemprego"></iframe>`); setCopiado("embed"); setTimeout(() => setCopiado(null), 2000); }} className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold h-12 rounded-xl">{copiado === "embed" ? "Copiado!" : "Copiar Código"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}