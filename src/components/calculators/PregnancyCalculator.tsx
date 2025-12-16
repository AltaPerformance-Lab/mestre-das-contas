"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Baby, CalendarHeart, Share2, Download, History, Code2, ExternalLink, CheckCircle2, Copy, X, Sparkles } from "lucide-react";
import { addDays, differenceInWeeks, differenceInDays, format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

type HistoricoGestacao = {
  data: string;
  semanas: string;
  dpp: string;
};

export default function PregnancyCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [dum, setDum] = useState("");
  const [nomeBebe, setNomeBebe] = useState("");
  const [sexo, setSexo] = useState("surpresa"); // menino, menina, surpresa
  const [resultado, setResultado] = useState<any>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoGestacao[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle: "Acompanhamento_Gestacional_MestreDasContas" });

  // CORES DINÂMICAS
  const getTheme = () => {
      if (sexo === "menino") return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600", textDark: "text-blue-800", icon: "bg-blue-100", btn: "bg-blue-500 hover:bg-blue-600" };
      if (sexo === "menina") return { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-600", textDark: "text-pink-800", icon: "bg-pink-100", btn: "bg-pink-500 hover:bg-pink-600" };
      return { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-600", textDark: "text-teal-800", icon: "bg-teal-100", btn: "bg-teal-500 hover:bg-teal-600" };
  };
  const theme = getTheme();

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const salvo = localStorage.getItem("historico_gestacao");
    if (salvo) setHistorico(JSON.parse(salvo));

    const urlDum = searchParams.get("dum");
    const urlNome = searchParams.get("nome");
    const urlSexo = searchParams.get("sexo");

    if (urlDum) {
        setDum(urlDum);
        if (urlNome) setNomeBebe(urlNome);
        if (urlSexo) setSexo(urlSexo);
        setTimeout(() => calcular(urlDum), 200);
    }
  }, [searchParams]);

  const calcular = (dataInput = dum) => {
    if (!dataInput) return;
    const dataDum = parseISO(dataInput);
    if (!isValid(dataDum)) return;

    // Regra de Naegele
    const dpp = addDays(dataDum, 280);
    const hoje = new Date();
    
    let semanas = differenceInWeeks(hoje, dataDum);
    let diasTotais = differenceInDays(hoje, dataDum);
    let diasRestantes = diasTotais % 7;

    // Ajuste para não dar negativo se DUM for futuro (erro usuário)
    if (semanas < 0) { semanas = 0; diasRestantes = 0; }
    if (semanas > 42) { semanas = 42; diasRestantes = 0; } // Limite biológico

    const novoResultado = {
      dpp: format(dpp, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      semanas,
      dias: diasRestantes,
      trimestre: semanas < 13 ? "1º Trimestre" : semanas < 27 ? "2º Trimestre" : "3º Trimestre",
      signo: "Em breve", 
      tamanho: getTamanhoBebe(semanas),
      rawDum: dataInput
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const getTamanhoBebe = (sem: number) => {
      if (sem < 4) return "Semente de Papoula";
      if (sem < 8) return "Framboesa";
      if (sem < 12) return "Limão";
      if (sem < 16) return "Abacate";
      if (sem < 20) return "Banana";
      if (sem < 24) return "Espiga de Milho";
      if (sem < 28) return "Beringela";
      if (sem < 32) return "Coco Verde";
      if (sem < 36) return "Mamão Papaya";
      return "Melancia";
  };

  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoGestacao = { 
        data: new Date().toLocaleDateString(), 
        semanas: `${res.semanas} semanas`, 
        dpp: res.dpp 
    };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_gestacao", JSON.stringify(novoHistorico));
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { window.open(`https://mestredascontas.com.br/saude/gestacional`, '_blank'); return; }
    if (action === "share") {
        const params = new URLSearchParams();
        params.set("dum", resultado.rawDum);
        if (nomeBebe) params.set("nome", nomeBebe);
        params.set("sexo", sexo);
        
        navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { reactToPrintFn(); }
    else if (action === "embed") { setShowEmbedModal(true); }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredascontas.com.br/saude/gestacional?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Gestacional"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-12 gap-8 w-full print:hidden">
        
        {/* INPUTS */}
        <div className="md:col-span-6 space-y-6">
            <Card className="border-0 shadow-sm ring-1 ring-slate-200 bg-white">
                <CardHeader className={`${theme.bg} border-b ${theme.border} p-4 md:p-6 transition-colors duration-500`}>
                    <CardTitle className={`text-lg flex items-center gap-2 text-slate-800`}>
                        <div className={`p-1.5 rounded-lg ${theme.icon} ${theme.text}`}><Baby size={20}/></div>
                        Acompanhamento da Gravidez
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Data da Última Menstruação (DUM)</Label>
                        <Input type="date" value={dum} onChange={e => setDum(e.target.value)} className="h-12 text-lg" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Sexo do Bebê</Label>
                            <Select value={sexo} onValueChange={setSexo}>
                                <SelectTrigger className="h-12"><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="surpresa">🎁 Vou descobrir</SelectItem>
                                    <SelectItem value="menino">💙 Menino</SelectItem>
                                    <SelectItem value="menina">💖 Menina</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Nome (Opcional)</Label>
                            <Input placeholder="Ex: Gabriel" value={nomeBebe} onChange={e => setNomeBebe(e.target.value)} className="h-12" />
                        </div>
                    </div>

                    <Button onClick={() => calcular()} className={`w-full h-12 font-bold text-lg text-white shadow-md transition-all active:scale-[0.98] ${theme.btn}`}>
                        Calcular Data do Parto
                    </Button>
                </CardContent>
            </Card>

            {!isIframe && historico.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><History size={14}/> Consultas Recentes</h4>
                    {historico.map((h, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-slate-50 last:border-0 py-2">
                            <span className="font-medium text-slate-700">{h.semanas}</span>
                            <span className={`font-bold ${theme.text}`}>{h.dpp}</span>
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
                            <CalendarHeart size={48} className="mx-auto opacity-20 mb-4"/>
                            <p>Informe a DUM para descobrir a data provável do parto.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
                            
                            <div className={`${theme.bg} p-6 rounded-2xl border ${theme.border} relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10"><Sparkles className={theme.text} size={60}/></div>
                                <p className={`text-xs font-bold uppercase mb-1 ${theme.text}`}>
                                    {nomeBebe ? `Chegada d${sexo === 'menina' ? 'a' : 'o'} ${nomeBebe}` : "Data Provável do Parto"}
                                </p>
                                <p className={`text-3xl md:text-4xl font-extrabold ${theme.textDark}`}>{resultado.dpp}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Tempo de Gestação</p>
                                    <p className="text-2xl font-bold text-slate-800">{resultado.semanas} <span className="text-sm font-medium text-slate-500">semanas</span></p>
                                    <p className="text-xs text-slate-400 mt-1">+ {resultado.dias} dias</p>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 font-bold uppercase mb-1">Tamanho Estimado</p>
                                    <p className="text-lg font-bold text-slate-800 flex items-center justify-center gap-2">
                                        {resultado.tamanho === 'Melancia' ? '🍉' : '🥑'} {resultado.tamanho}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{resultado.trimestre}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" onClick={() => handleAction("share")} className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700">
                                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Ver Detalhes</span> : (linkCopiado ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado!</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                                </Button>
                                <Button variant="outline" onClick={() => handleAction("pdf")} className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700">
                                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Baixar PDF</span> : <span className="flex items-center gap-2"><Download size={18}/> Salvar Cartão</span>}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* IMPRESSÃO (Oculto) - Design Estilo Cartão de Vacina */}
      {resultado && (
        <div className="hidden print:block">
            <div ref={contentRef} className="print:w-full print:p-8 text-center border-4 border-double rounded-3xl m-4 h-[90vh] flex flex-col justify-center items-center relative overflow-hidden" style={{ borderColor: sexo === 'menina' ? '#fbcfe8' : (sexo === 'menino' ? '#bfdbfe' : '#ccfbf1') }}>
                
                {/* Background Decorativo */}
                <div className="absolute top-0 left-0 w-full h-40 opacity-10 bg-slate-100" style={{ backgroundColor: sexo === 'menina' ? '#fce7f3' : (sexo === 'menino' ? '#dbeafe' : '#f0fdfa') }}></div>

                <div className="relative z-10 space-y-6">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Meu Diário de Gravidez</h1>
                    <p className="text-slate-500 uppercase tracking-widest text-sm">Acompanhamento Semanal</p>

                    <div className="border-b-2 w-24 mx-auto my-6 border-slate-300"></div>

                    {nomeBebe && <h2 className="text-6xl font-script text-slate-900 my-8" style={{ fontFamily: 'cursive', color: sexo === 'menina' ? '#db2777' : (sexo === 'menino' ? '#2563eb' : '#0d9488') }}>{nomeBebe}</h2>}

                    <div className="grid grid-cols-2 gap-8 text-left max-w-lg mx-auto my-8">
                        <div className="p-4 border rounded-xl">
                            <p className="text-xs uppercase text-slate-400 font-bold">Data Prevista (DPP)</p>
                            <p className="text-2xl font-bold text-slate-800">{resultado.dpp}</p>
                        </div>
                        <div className="p-4 border rounded-xl">
                            <p className="text-xs uppercase text-slate-400 font-bold">Idade Gestacional</p>
                            <p className="text-2xl font-bold text-slate-800">{resultado.semanas} semanas</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl max-w-xl mx-auto border border-slate-100">
                        <p className="text-lg text-slate-700 italic">"O milagre da vida crescendo a cada dia."</p>
                    </div>
                </div>

                <div className="absolute bottom-10 w-full text-center">
                    <p className="text-xs text-slate-400">Gerado com carinho por <strong>Mestre das Contas</strong></p>
                </div>
            </div>
        </div>
      )}

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm print:hidden">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Incorporar em seu Blog</h3>
                <p className="text-sm text-slate-500 mb-4">Compartilhe essa ferramenta com seus leitores.</p>
                <div className="bg-slate-900 p-4 rounded-lg relative mb-4 overflow-hidden">
                    <code className="text-xs font-mono text-blue-300 break-all block">{`<iframe src="https://mestredascontas.com.br/saude/gestacional?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora de Gravidez"></iframe>`}</code>
                </div>
                <Button onClick={copiarEmbedCode} className="w-full bg-slate-800 hover:bg-slate-900">Copiar Código HTML</Button>
            </div>
        </div>
      )}
    </div>
  );
}