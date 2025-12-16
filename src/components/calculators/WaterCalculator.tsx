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
  Droplet, Activity, Share2, Download, History, Code2, ExternalLink, CheckCircle2, X
} from "lucide-react";

type HistoricoAgua = {
  data: string;
  peso: string;
  meta: string;
};

export default function WaterCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  const [peso, setPeso] = useState("");
  const [atividade, setAtividade] = useState("sedentario");
  const [resultado, setResultado] = useState<any>(null);

  const [historico, setHistorico] = useState<HistoricoAgua[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: "Meta_Agua_MestreDasContas" });

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_agua");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlPeso = searchParams.get("peso");
    const urlAtiv = searchParams.get("atividade");

    if (urlPeso) {
        setPeso(urlPeso);
        if (urlAtiv) setAtividade(urlAtiv);
        setTimeout(() => calcular(urlPeso, urlAtiv || "sedentario"), 200);
    }
  }, [searchParams]);

  const calcular = (p = peso, a = atividade) => {
    const pesoNum = parseFloat(p);
    if (!pesoNum) return;

    let fator = 35; // Base 35ml/kg
    if (a === "leve") fator = 40;
    if (a === "moderado") fator = 45;
    if (a === "intenso") fator = 50;

    const totalMl = pesoNum * fator;
    const copos = Math.ceil(totalMl / 250); // Copos de 250ml
    const garrafas = (totalMl / 500).toFixed(1); // Garrafas de 500ml

    const novoRes = {
        totalLitros: (totalMl / 1000).toFixed(2) + " L",
        totalMl: totalMl,
        copos,
        garrafas,
        rawPeso: pesoNum,
        rawAtiv: a
    };

    setResultado(novoRes);
    if (!isIframe) salvarHistorico(novoRes);
  };

  const salvarHistorico = (res: any) => {
    const novoItem = { 
        data: new Date().toLocaleDateString(), 
        peso: `${res.rawPeso}kg`, 
        meta: res.totalLitros 
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_agua", JSON.stringify(novoHistorico));
  };

  const handleAction = (action: string) => {
      if (action === 'pdf') reactToPrintFn();
      if (action === 'embed') setShowEmbedModal(true);
      if (action === 'share') {
          navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?peso=${peso}&atividade=${atividade}`);
          setLinkCopiado(true);
          setTimeout(() => setLinkCopiado(false), 2000);
      }
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        {/* INPUTS */}
        <div className="md:col-span-6 space-y-6">
            <Card>
                <CardHeader className="bg-cyan-50/50 border-b border-cyan-100 p-4">
                    <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                        <div className="bg-cyan-100 p-1.5 rounded-lg text-cyan-600"><Droplet size={20}/></div>
                        Calcular Hidratação
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Seu Peso (kg)</Label>
                        <Input type="number" value={peso} onChange={e => setPeso(e.target.value)} placeholder="Ex: 70" />
                    </div>
                    <div className="space-y-2">
                        <Label>Nível de Atividade</Label>
                        <Select value={atividade} onValueChange={setAtividade}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sedentario">Sedentário (Pouco exercício)</SelectItem>
                                <SelectItem value="leve">Leve (1-3x por semana)</SelectItem>
                                <SelectItem value="moderado">Moderado (3-5x por semana)</SelectItem>
                                <SelectItem value="intenso">Intenso (Atleta/Trabalho físico)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={() => calcular()} className="w-full bg-cyan-600 hover:bg-cyan-700 h-12 text-lg font-bold">Ver Meta Diária</Button>
                </CardContent>
            </Card>

            {!isIframe && historico.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><History size={14}/> Recentes</h4>
                    {historico.map((h, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-slate-50 last:border-0 py-2">
                            <span>{h.peso}</span>
                            <span className="font-bold text-cyan-600">{h.meta}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* RESULTADO */}
        <div className="md:col-span-6">
            <Card className={`h-full border-0 shadow-sm ring-1 ring-slate-200 ${resultado ? 'bg-white' : 'bg-slate-50'}`}>
                <CardContent className="p-6 flex flex-col justify-center h-full">
                    {!resultado ? (
                        <div className="text-center text-slate-400 py-10">
                            <Droplet size={48} className="mx-auto opacity-20 mb-4"/>
                            <p>Preencha para ver quantos litros beber.</p>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-cyan-50 p-6 rounded-full w-48 h-48 mx-auto flex flex-col items-center justify-center border-4 border-cyan-100 shadow-inner">
                                <span className="text-sm font-bold text-cyan-600 uppercase tracking-wide">Sua Meta</span>
                                <span className="text-5xl font-extrabold text-cyan-800">{resultado.totalLitros}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Em Copos (250ml)</p>
                                    <p className="text-xl font-bold text-slate-700">~ {resultado.copos} copos</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase">Em Garrafas (500ml)</p>
                                    <p className="text-xl font-bold text-slate-700">~ {resultado.garrafas} garrafas</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <Button variant="outline" onClick={() => handleAction('share')}>{linkCopiado ? "Copiado!" : "Compartilhar"}</Button>
                                <Button variant="outline" onClick={() => handleAction('pdf')}>Baixar PDF</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* IMPRESSÃO */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-10 text-center">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Meta de Hidratação Diária</h1>
                <p className="text-slate-500 mb-8">Personalizado por Mestre das Contas</p>
                <div className="border-4 border-cyan-600 rounded-xl p-10 inline-block mb-8">
                    <p className="text-8xl font-bold text-cyan-600">{resultado.totalLitros}</p>
                </div>
                <p className="text-xl">Para o peso de <strong>{resultado.rawPeso}kg</strong> com atividade <strong>{resultado.rawAtiv}</strong>.</p>
                <div className="mt-8 text-sm text-slate-400">www.mestredascontas.com.br</div>
            </div>
        </div>
      )}
    </div>
  );
}