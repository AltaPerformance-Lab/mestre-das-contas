"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Flame, Activity, Scale, Utensils,
  Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, ArrowDown, ArrowUp, Minus
} from "lucide-react";

type HistoricoCalorias = {
  data: string;
  meta: string; // TMB ou Gasto Total
  perfil: string; // Idade/Peso/Altura
};

export default function CalorieCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // --- STATES DADOS ---
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [genero, setGenero] = useState("masculino");
  const [atividade, setAtividade] = useState("sedentario");
  const [resultado, setResultado] = useState<any>(null);

  // --- FUNCIONALIDADES ---
  const [historico, setHistorico] = useState<HistoricoCalorias[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Plano_Calorico_MestreDasContas",
  });

  // --- EFEITOS ---
  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_calorias");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlIdade = searchParams.get("idade");
    const urlPeso = searchParams.get("peso");
    const urlAltura = searchParams.get("altura");
    const urlGenero = searchParams.get("genero");
    const urlAtividade = searchParams.get("atividade");

    if (urlIdade && urlPeso && urlAltura) {
        setIdade(urlIdade);
        setPeso(urlPeso);
        setAltura(urlAltura);
        if (urlGenero) setGenero(urlGenero);
        if (urlAtividade) setAtividade(urlAtividade);

        setTimeout(() => {
            calcular(urlIdade, urlPeso, urlAltura, urlGenero || "masculino", urlAtividade || "sedentario");
        }, 200);
    }
  }, [searchParams]);

  // --- CÁLCULO (Mifflin-St Jeor) ---
  const calcular = (
      i = idade, 
      p = peso, 
      a = altura, 
      g = genero, 
      atv = atividade
  ) => {
    const age = parseFloat(i);
    const weight = parseFloat(p);
    const height = parseFloat(a); // em cm

    if (!age || !weight || !height) return;

    // 1. TMB (Taxa Metabólica Basal)
    let tmb = 0;
    if (g === "masculino") {
        // (10 x peso) + (6.25 x altura) - (5 x idade) + 5
        tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        // (10 x peso) + (6.25 x altura) - (5 x idade) - 161
        tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Gasto Energético Total (TDEE)
    const fatores: Record<string, number> = {
        "sedentario": 1.2,      // Pouco ou nenhum exercício
        "leve": 1.375,          // Exercício leve 1-3 dias/sem
        "moderado": 1.55,       // Exercício moderado 3-5 dias/sem
        "ativo": 1.725,         // Exercício pesado 6-7 dias/sem
        "atleta": 1.9           // Exercício muito pesado/trabalho físico
    };
    
    const tdee = tmb * (fatores[atv] || 1.2);

    const novoResultado = {
        tmb: Math.round(tmb),
        tdee: Math.round(tdee),
        perderPeso: Math.round(tdee - 500),    // Déficit seguro
        ganharMassa: Math.round(tdee + 300),   // Superávit seguro
        perderRapido: Math.round(tdee - 750),  // Déficit agressivo (limite)
        
        // Dados Raw
        rawIdade: age,
        rawPeso: weight,
        rawAltura: height,
        rawGenero: g,
        rawAtividade: atv
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  // --- ACTIONS ---
  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoCalorias = {
        data: new Date().toLocaleDateString("pt-BR"),
        meta: `${res.tdee} kcal/dia`,
        perfil: `${res.rawIdade} anos, ${res.rawPeso}kg`
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_calorias", JSON.stringify(novoHistorico));
  };

  const limpar = () => {
    setIdade(""); setPeso(""); setAltura("");
    setResultado(null);
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { 
        window.open(`https://mestredascontas.com.br/saude/calorias-diarias`, '_blank'); 
        return; 
    }
    if (action === "share") {
        const params = new URLSearchParams();
        if (resultado) {
            params.set("idade", resultado.rawIdade.toString());
            params.set("peso", resultado.rawPeso.toString());
            params.set("altura", resultado.rawAltura.toString());
            params.set("genero", resultado.rawGenero);
            params.set("atividade", resultado.rawAtividade);
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
    const code = `<iframe src="https://mestredascontas.com.br/saude/calorias-diarias?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Calorias"></iframe>`;
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
                    <div className="bg-orange-100 p-1.5 md:p-2 rounded-lg text-orange-600"><Flame size={20} /></div>
                    Calcular Gasto Calórico
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
                  <Label className="text-slate-600 font-medium">Sexo</Label>
                  <RadioGroup defaultValue={genero} onValueChange={setGenero} className="flex gap-4">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 w-full justify-center hover:bg-slate-50 cursor-pointer has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                          <RadioGroupItem value="masculino" id="r1" />
                          <Label htmlFor="r1" className="cursor-pointer">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 w-full justify-center hover:bg-slate-50 cursor-pointer has-[:checked]:border-pink-500 has-[:checked]:bg-pink-50">
                          <RadioGroupItem value="feminino" id="r2" />
                          <Label htmlFor="r2" className="cursor-pointer">Feminino</Label>
                      </div>
                  </RadioGroup>
              </div>

              <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-600">Idade</Label>
                    <Input type="number" value={idade} onChange={e => setIdade(e.target.value)} placeholder="30" className="h-12 text-center" inputMode="numeric"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Peso (kg)</Label>
                    <Input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="75" className="h-12 text-center" inputMode="decimal"/>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-600">Altura (cm)</Label>
                    <Input type="number" value={altura} onChange={e => setAltura(e.target.value)} placeholder="175" className="h-12 text-center" inputMode="numeric"/>
                  </div>
              </div>

              <div className="space-y-2">
                  <Label className="text-slate-600">Nível de Atividade Física</Label>
                  <Select value={atividade} onValueChange={setAtividade}>
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                      <SelectContent>
                          <SelectItem value="sedentario">Sedentário (Pouco ou nenhum exercício)</SelectItem>
                          <SelectItem value="leve">Levemente Ativo (Exercício 1-3 dias/sem)</SelectItem>
                          <SelectItem value="moderado">Moderadamente Ativo (3-5 dias/sem)</SelectItem>
                          <SelectItem value="ativo">Muito Ativo (6-7 dias/sem)</SelectItem>
                          <SelectItem value="atleta">Extremamente Ativo (Trabalho físico/Atleta)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>

              <Button onClick={() => calcular()} className="w-full bg-orange-600 hover:bg-orange-700 h-14 text-lg font-bold shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">Calcular Metabolismo</Button>
            </CardContent>
          </Card>

          {/* HISTÓRICO */}
          {!isIframe && historico.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Cálculos Recentes</h4>
                <div className="space-y-2">
                {historico.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 p-2 rounded cursor-pointer" onClick={() => {}}>
                        <div className="flex flex-col">
                            <span className="text-slate-900 font-bold">{item.perfil}</span>
                            <span className="text-[10px] text-slate-400">{item.data}</span>
                        </div>
                        <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-xs">{item.meta}</span>
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
              <CardTitle className="text-slate-800 text-lg md:text-xl">Planejamento Calórico</CardTitle>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              {!resultado ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center"><Utensils size={32} className="opacity-40" /></div>
                  <p className="text-sm max-w-[200px]">Descubra quantas calorias você precisa para atingir sua meta.</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Destaque TDEE */}
                  <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-center relative overflow-hidden w-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider relative z-10">Gasto Diário Total (TDEE)</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-white mt-2 break-all tracking-tight relative z-10 leading-tight">{resultado.tdee} <span className="text-lg font-medium text-slate-400">kcal</span></p>
                    <p className="text-[10px] text-slate-500 mt-2 relative z-10">Metabolismo Basal (Repouso): {resultado.tmb} kcal</p>
                  </div>

                  {/* Metas */}
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-blue-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full text-blue-600 shadow-sm"><ArrowDown size={16}/></div>
                            <div>
                                <p className="text-xs font-bold text-blue-800 uppercase">Perder Peso</p>
                                <p className="text-[10px] text-blue-600">Déficit moderado</p>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-blue-700">{resultado.perderPeso} kcal</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-green-100 bg-green-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full text-green-600 shadow-sm"><Minus size={16}/></div>
                            <div>
                                <p className="text-xs font-bold text-green-800 uppercase">Manter Peso</p>
                                <p className="text-[10px] text-green-600">Sem alteração</p>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-green-700">{resultado.tdee} kcal</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-orange-100 bg-orange-50">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-full text-orange-600 shadow-sm"><ArrowUp size={16}/></div>
                            <div>
                                <p className="text-xs font-bold text-orange-800 uppercase">Ganhar Massa</p>
                                <p className="text-[10px] text-orange-600">Superávit limpo</p>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-orange-700">{resultado.ganharMassa} kcal</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-400 text-center leading-tight px-2">* Fórmula Mifflin-St Jeor. Consulte um nutricionista antes de mudar sua dieta.</p>
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

      {/* --- IMPRESSÃO --- */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 print:bg-white text-black">
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-800 pb-4">
                    <div><h1 className="text-3xl font-bold text-slate-900">Planejamento Nutricional</h1><p className="text-sm text-slate-500 mt-1">Gerado por <strong>Mestre das Contas</strong></p></div>
                    <div className="text-right"><p className="text-xs text-slate-400 uppercase tracking-wide">Data</p><p className="text-lg font-bold text-slate-700">{new Date().toLocaleDateString()}</p></div>
                </div>
                
                <div className="mb-8 grid grid-cols-4 gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div><p className="text-xs font-bold uppercase text-slate-500">Idade</p><p className="font-bold text-lg">{resultado.rawIdade} anos</p></div>
                    <div><p className="text-xs font-bold uppercase text-slate-500">Peso</p><p className="font-bold text-lg">{resultado.rawPeso} kg</p></div>
                    <div><p className="text-xs font-bold uppercase text-slate-500">Altura</p><p className="font-bold text-lg">{resultado.rawAltura} cm</p></div>
                    <div><p className="text-xs font-bold uppercase text-slate-500">Nível Ativ.</p><p className="font-bold text-lg capitalize">{resultado.rawAtividade}</p></div>
                </div>

                <div className="mb-8 text-center p-6 border-2 border-slate-900 rounded-xl">
                    <p className="text-sm font-bold uppercase tracking-wider mb-2">Seu Gasto Energético Total (TDEE)</p>
                    <p className="text-6xl font-extrabold">{resultado.tdee} <span className="text-2xl font-medium text-slate-500">kcal</span></p>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="p-4 border rounded text-center bg-blue-50 border-blue-200">
                        <p className="text-xs font-bold uppercase text-blue-800 mb-2">Perder Peso</p>
                        <p className="text-2xl font-bold text-blue-600">{resultado.perderPeso}</p>
                        <p className="text-[10px] text-blue-500">(-500 kcal)</p>
                    </div>
                    <div className="p-4 border rounded text-center bg-green-50 border-green-200">
                        <p className="text-xs font-bold uppercase text-green-800 mb-2">Manter</p>
                        <p className="text-2xl font-bold text-green-600">{resultado.tdee}</p>
                        <p className="text-[10px] text-green-500">(Manutenção)</p>
                    </div>
                    <div className="p-4 border rounded text-center bg-orange-50 border-orange-200">
                        <p className="text-xs font-bold uppercase text-orange-800 mb-2">Ganhar Massa</p>
                        <p className="text-2xl font-bold text-orange-600">{resultado.ganharMassa}</p>
                        <p className="text-[10px] text-orange-500">(+300 kcal)</p>
                    </div>
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
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/saude/calorias-diarias?embed=true" width="100%" height="750" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Calorias"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-orange-600 hover:bg-orange-700">{embedCopiado ? "Copiado!" : "Copiar Código HTML"}</Button>
            </div>
        </div>
      )}
    </div>
  );
}
