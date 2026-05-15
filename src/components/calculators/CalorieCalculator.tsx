"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Flame, X, Code2, History, ArrowDown, ArrowUp, Share2, Printer, Link as LinkIcon, CheckCircle2, Utensils
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { calculateCalorias, type CalorieResult } from "@/lib/calculators/health";

// --- TIPAGEM ---
type HistoricoCalorias = {
  data: string;
  meta: string;
  perfil: string;
};

interface CalorieCalculatorProps {
    initialIdade?: string;
    initialPeso?: string;
    initialAltura?: string;
    initialGenero?: string;
    initialAtividade?: string;
    initialResult?: CalorieResult | null;
}

export default function CalorieCalculator({
    initialIdade = "",
    initialPeso = "",
    initialAltura = "",
    initialGenero = "masculino",
    initialAtividade = "sedentario",
    initialResult = null
}: CalorieCalculatorProps) {
  const [isIframe, setIsIframe] = useState(false);

  // --- STATES DADOS ---
  const [idade, setIdade] = useState(initialIdade);
  const [peso, setPeso] = useState(initialPeso);
  const [altura, setAltura] = useState(initialAltura);
  const [genero, setGenero] = useState(initialGenero);
  const [atividade, setAtividade] = useState(initialAtividade);
  const [resultado, setResultado] = useState<CalorieResult | null>(initialResult);

  // --- FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoCalorias[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | "result" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  
  const [dataAtual, setDataAtual] = useState(""); 
  const searchParams = useSearchParams();

  // Hydrate from URL
  useEffect(() => {
    const i = searchParams.get('idade');
    const p = searchParams.get('peso');
    const a = searchParams.get('altura');
    const g = searchParams.get('genero');
    const atv = searchParams.get('atividade');

    if (i) setIdade(i);
    if (p) setPeso(p);
    if (a) setAltura(a);
    if (g) setGenero(g);
    if (atv) setAtividade(atv);

    if (i && p && a) {
        handleCalcular(i, p, a, g || genero, atv || atividade);
    }
  }, [searchParams]);

  const contentRef = useRef<HTMLDivElement>(null);
  
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Planejamento_Calorico_MestreDasContas",
    pageStyle: `
      @page { size: auto; margin: 0mm; } 
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));

    // Se temos valores iniciais mas não o resultado, calcula imediatamente
    if (initialIdade && initialPeso && initialAltura && !resultado) {
        handleCalcular(initialIdade, initialPeso, initialAltura, initialGenero, initialAtividade);
    }

    const salvo = localStorage.getItem("historico_calorias");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, [initialIdade, initialPeso, initialAltura, initialGenero, initialAtividade]);

  const handleCalcular = (i = idade, p = peso, a = altura, g = genero, atv = atividade) => {
    const novoResultado = calculateCalorias(i, p, a, g, atv);
    if (novoResultado) {
        setResultado(novoResultado);
        trackEvent("calculate_calorias", { tdee: novoResultado.tdee, genero: g });
        if (!isIframe) salvarHistorico(novoResultado);
    }
  };

  const salvarHistorico = (res: CalorieResult) => {
    const novoItem: HistoricoCalorias = {
        data: new Date().toLocaleDateString("pt-BR"),
        meta: `${res.tdee} kcal`,
        perfil: `${res.rawIdade}a, ${res.rawPeso}kg`
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_calorias", JSON.stringify(novoHistorico));
  };

  const handleShare = (type: "result" | "tool") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    let url = baseUrl;

    if (type === "result" && resultado) {
        const params = new URLSearchParams();
        params.set("idade", resultado.rawIdade.toString());
        params.set("peso", resultado.rawPeso.toString());
        params.set("altura", resultado.rawAltura.toString());
        params.set("genero", resultado.rawGenero);
        params.set("atividade", resultado.rawAtividade);
        url = `${baseUrl}?${params.toString()}`;
    }

    navigator.clipboard.writeText(url);
    if (type === "result") trackEvent("share_calorias_result");
    else trackEvent("share_calorias_tool");
    setCopiado(type === "result" ? "result" : "link");
    setTimeout(() => setCopiado(null), 2000);
  };

  const handlePrint = () => {
    trackEvent("print_calorias");
    if (reactToPrintFn) reactToPrintFn();
  };

  const getLabelAtividade = (key: string) => {
      const labels: Record<string, string> = {
          "sedentario": "Sedentário", "leve": "Levemente Ativo",
          "moderado": "Moderado", "ativo": "Muito Ativo", "atleta": "Atleta"
      };
      return labels[key] || key;
  };

  return (
    <div className="w-full font-sans">
      <div className="grid lg:grid-cols-12 gap-8 w-full print:hidden">
        <div className="lg:col-span-7 space-y-6 w-full">
          <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-b border-slate-100 dark:border-slate-800 p-6">
              <div className="flex flex-row items-center justify-between gap-4">
                  <CardTitle className="text-xl flex items-center gap-3 text-slate-800 dark:text-slate-100">
                    <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 shadow-sm"><Flame size={22} strokeWidth={2.5} /></div>
                    Calcular Gasto Calórico
                  </CardTitle>
                  {!isIframe && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowEmbedModal(true)} 
                        className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 h-8 px-2 rounded-lg"
                        title="Incorporar no seu site"
                      >
                          <Code2 size={18} />
                      </Button>
                  )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 p-6">
              <div className="space-y-3">
                  <Label className="text-slate-700 dark:text-slate-300 font-semibold text-sm">Sexo Biológico</Label>
                  <RadioGroup defaultValue={genero} onValueChange={setGenero} className="grid grid-cols-2 gap-4">
                      <label className={`flex items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-all ${genero === 'masculino' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                          <RadioGroupItem value="masculino" id="r1" className="sr-only" />
                          <span>Masculino</span>
                      </label>
                      <label className={`flex items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-all ${genero === 'feminino' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 font-medium ring-1 ring-pink-500' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                          <RadioGroupItem value="feminino" id="r2" className="sr-only" />
                          <span>Feminino</span>
                      </label>
                  </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Idade (anos)</Label>
                    <Input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="Ex: 30" className="h-12 text-center text-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Peso (kg)</Label>
                    <Input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ex: 75" className="h-12 text-center text-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" inputMode="decimal"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600 dark:text-slate-300 font-medium">Altura (cm)</Label>
                    <Input type="number" value={altura} onChange={e => setAltura(e.target.value)} placeholder="Ex: 175" className="h-12 text-center text-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" inputMode="numeric"/>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label className="text-slate-600 dark:text-slate-300 font-medium">Nível de Atividade Física</Label>
                  <Select value={atividade} onValueChange={setAtividade}>
                      <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="sedentario">Sedentário (Escritório, sem treino)</SelectItem>
                          <SelectItem value="leve">Leve (Treino 1-3x por semana)</SelectItem>
                          <SelectItem value="moderado">Moderado (Treino 3-5x por semana)</SelectItem>
                          <SelectItem value="ativo">Ativo (Treino 6-7x por semana)</SelectItem>
                          <SelectItem value="atleta">Atleta (Treino pesado 2x ao dia)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <Button onClick={() => handleCalcular()} className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-14 text-lg font-bold shadow-lg shadow-orange-200 rounded-xl transition-all active:scale-[0.99] flex items-center gap-2">
                <Flame size={20} className="fill-white/20"/> Calcular Agora
              </Button>
            </CardContent>
          </Card>

          {!isIframe && historico.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                  <History size={14} /> Histórico Recente
                </h4>
                <div className="space-y-1">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-800 pb-2 last:border-0 last:pb-0 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{item.perfil}</span>
                        <span className="font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded text-xs tabular-nums">{item.meta}</span>
                    </div>
                ))}
                </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <Card className={`h-full w-full transition-all duration-500 border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden flex flex-col ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
            <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
              <CardTitle className="text-slate-800 dark:text-slate-100 text-lg font-bold">Seu Planejamento</CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 flex-1 flex flex-col">
              {!resultado ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center space-y-4 min-h-[300px]">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                    <Utensils size={36} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-medium max-w-[220px]">Preencha seus dados ao lado para gerar seu plano nutricional.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/30 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 mb-1">Manter o Peso (TDEE)</p>
                    <div className="flex items-center justify-center gap-1 relative z-10">
                       <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{resultado.tdee}</span>
                       <span className="text-base font-medium text-slate-500 mt-3">kcal</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-4 text-[10px] text-slate-400 relative z-10">
                        <span>Basal: <strong className="text-slate-300">{resultado.tmb}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-300 shadow-sm ring-1 ring-blue-100 dark:ring-blue-800"><ArrowDown size={18} strokeWidth={2.5}/></div>
                            <div>
                                <p className="text-xs font-extrabold text-blue-800 dark:text-blue-200 uppercase tracking-wide">Perder Peso</p>
                                <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Déficit Seguro</p>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-blue-700 dark:text-blue-300">{resultado.perderPeso}</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-orange-100 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-900/10 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400 shadow-sm ring-1 ring-orange-100 dark:ring-orange-800"><ArrowUp size={18} strokeWidth={2.5}/></div>
                            <div>
                                <p className="text-xs font-extrabold text-orange-800 dark:text-orange-200 uppercase tracking-wide">Ganhar Massa</p>
                                <p className="text-[10px] text-orange-600 dark:text-orange-400 font-medium">Superávit</p>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-orange-700 dark:text-orange-300">{resultado.ganharMassa}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleShare("result")} 
                        className="h-11 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-900 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900 dark:text-slate-100"
                      >
                          {copiado === "result" ? <span className="flex items-center gap-2"><CheckCircle2 size={16}/> Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Resultado</span>}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={handlePrint} 
                        className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 text-xs font-bold uppercase tracking-wide bg-white dark:bg-slate-900 dark:text-slate-100"
                      >
                          <span className="flex items-center gap-2"><Printer size={16}/> Imprimir/PDF</span>
                      </Button>
                  </div>
                  
                  <div className="text-center">
                    <button 
                        onClick={() => handleShare("tool")}
                        className="text-xs text-slate-400 hover:text-slate-600 underline decoration-slate-300 underline-offset-2 transition-colors"
                    >
                        {copiado === "link" ? "Link da ferramenta copiado!" : "Copiar link da calculadora para amigos"}
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden print:block">
        <div ref={contentRef} className="print:w-full print:p-8 print:bg-white text-slate-900">
            <div className="flex justify-between items-start mb-8 border-b-2 border-slate-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Mestre das Contas</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">www.mestredascontas.com.br</p>
                </div>
                <div className="text-right">
                    <div className="bg-slate-100 px-3 py-1 rounded inline-block">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Planejamento Calórico</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{dataAtual}</p>
                </div>
            </div>

            {resultado && (
                <>
                <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">Perfil Analisado</p>
                    <div className="grid grid-cols-4 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Idade</p>
                            <p className="text-xl font-bold">{resultado.rawIdade} anos</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Peso</p>
                            <p className="text-xl font-bold">{resultado.rawPeso} kg</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Altura</p>
                            <p className="text-xl font-bold">{resultado.rawAltura} cm</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Atividade</p>
                            <p className="text-xl font-bold">{getLabelAtividade(resultado.rawAtividade)}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-10 text-center">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Sua meta de manutenção (TDEE)</p>
                    <div className="inline-block border-4 border-slate-900 rounded-2xl px-10 py-6">
                        <p className="text-6xl font-extrabold text-slate-900">{resultado.tdee}</p>
                        <p className="text-lg font-medium text-slate-500">kcal / dia</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="p-5 border border-slate-200 rounded-xl bg-white text-center">
                        <p className="text-xs font-bold uppercase text-blue-700 mb-2">Perder Peso</p>
                        <p className="text-3xl font-bold text-slate-800">{resultado.perderPeso}</p>
                        <p className="text-xs text-slate-400 mt-1">Déficit Moderado</p>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl bg-slate-100 text-center">
                        <p className="text-xs font-bold uppercase text-slate-700 mb-2">Manter</p>
                        <p className="text-3xl font-bold text-slate-800">{resultado.tdee}</p>
                        <p className="text-xs text-slate-400 mt-1">Manutenção</p>
                    </div>
                    <div className="p-5 border border-slate-200 rounded-xl bg-white text-center">
                        <p className="text-xs font-bold uppercase text-orange-700 mb-2">Ganhar Massa</p>
                        <p className="text-3xl font-bold text-slate-800">{resultado.ganharMassa}</p>
                        <p className="text-xs text-slate-400 mt-1">Superávit</p>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-200 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                        <LinkIcon size={16}/>
                        <span>Acesse essa ferramenta em: <strong>mestredascontas.com.br</strong></span>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-slate-500 text-xs font-bold uppercase">
                        Indique para seus amigos
                    </div>
                </div>
                </>
            )}
        </div>
      </div>

      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Copie o código abaixo para adicionar essa calculadora no seu blog ou site.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/saude/calorias-diarias?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de Calorias"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => {
                    navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/saude/calorias-diarias?embed=true" width="100%" height="800" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora de Calorias"></iframe>`);
                    setCopiado("embed");
                    setTimeout(() => setCopiado(null), 2000);
                }} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}