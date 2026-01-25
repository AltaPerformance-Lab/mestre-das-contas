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
  Baby, CalendarHeart, Share2, Printer, History, Code2, 
  ExternalLink, CheckCircle2, X, Sparkles, Link as LinkIcon
} from "lucide-react";
import { addDays, differenceInWeeks, differenceInDays, format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- TIPAGEM ---
type HistoricoGestacao = {
  data: string;
  semanas: string;
  dpp: string;
};

type ResultadoGestacao = {
    dpp: string;
    semanas: number;
    dias: number;
    trimestre: string;
    tamanho: string;
    rawDum: string;
} | null;

export default function PregnancyCalculator() {
  const searchParams = useSearchParams();
  const [isIframe, setIsIframe] = useState(false);

  // DADOS
  const [dum, setDum] = useState("");
  const [nomeBebe, setNomeBebe] = useState("");
  const [sexo, setSexo] = useState("surpresa"); // menino, menina, surpresa
  const [resultado, setResultado] = useState<ResultadoGestacao>(null);

  // FUNCIONALIDADES
  const [historico, setHistorico] = useState<HistoricoGestacao[]>([]);
  const [copiado, setCopiado] = useState<"link" | "embed" | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [dataAtual, setDataAtual] = useState("");

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ 
      contentRef, 
      documentTitle: "Meu_Diario_Gestacional_MestreDasContas",
      pageStyle: `
        @page { size: A4; margin: 10mm; } 
        @media print { body { -webkit-print-color-adjust: exact; } }
      `
  });

  // CORES DINÂMICAS (UX AFETIVA)
  const getTheme = () => {
      if (sexo === "menino") return { 
          bgHeader: "bg-blue-500", 
          bgLight: "bg-blue-50 dark:bg-blue-900/10", 
          text: "text-blue-600 dark:text-blue-400", 
          border: "border-blue-200 dark:border-blue-800", 
          ring: "ring-blue-100 dark:ring-blue-900",
          btn: "bg-blue-600 hover:bg-blue-700" 
      };
      if (sexo === "menina") return { 
          bgHeader: "bg-pink-500", 
          bgLight: "bg-pink-50 dark:bg-pink-900/10", 
          text: "text-pink-600 dark:text-pink-400", 
          border: "border-pink-200 dark:border-pink-800", 
          ring: "ring-pink-100 dark:ring-pink-900",
          btn: "bg-pink-600 hover:bg-pink-700" 
      };
      return { 
          bgHeader: "bg-teal-500", 
          bgLight: "bg-teal-50 dark:bg-teal-900/10", 
          text: "text-teal-600 dark:text-teal-400", 
          border: "border-teal-200 dark:border-teal-800", 
          ring: "ring-teal-100 dark:ring-teal-900",
          btn: "bg-teal-600 hover:bg-teal-700" 
      };
  };
  const theme = getTheme();

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    setDataAtual(new Date().toLocaleDateString("pt-BR"));
    
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

    // Regra de Naegele (DUM + 7 dias - 3 meses + 1 ano ou + 280 dias)
    const dpp = addDays(dataDum, 280);
    const hoje = new Date();
    
    let semanas = differenceInWeeks(hoje, dataDum);
    let diasTotais = differenceInDays(hoje, dataDum);
    let diasRestantes = diasTotais % 7;

    // Ajustes de segurança
    if (semanas < 0) { semanas = 0; diasRestantes = 0; }
    if (semanas > 42) { semanas = 42; diasRestantes = 0; } 

    const novoResultado = {
      dpp: format(dpp, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      semanas,
      dias: diasRestantes,
      trimestre: semanas < 13 ? "1º Trimestre" : semanas < 27 ? "2º Trimestre" : "3º Trimestre",
      tamanho: getTamanhoBebe(semanas),
      rawDum: dataInput
    };

    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const getTamanhoBebe = (sem: number) => {
      if (sem < 4) return "Sementinha de Papoula";
      if (sem < 8) return "Framboesa";
      if (sem < 12) return "Limão Siciliano";
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

  const handleShare = (type: "link" | "embed") => {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    
    if (type === "link") {
        const params = new URLSearchParams();
        if (resultado) params.set("dum", resultado.rawDum);
        if (nomeBebe) params.set("nome", nomeBebe);
        params.set("sexo", sexo);
        navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    } else {
        navigator.clipboard.writeText(`<iframe src="https://mestredascontas.com.br/saude/gestacional?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px;" title="Calculadora Gestacional"></iframe>`);
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
        
        {/* INPUTS */}
        <div className="lg:col-span-6 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden transition-all duration-500">
                <CardHeader className={`${theme.bgHeader} text-white p-6 transition-colors duration-500`}>
                    <div className="flex flex-row items-center justify-between gap-2">
                        <CardTitle className="text-xl flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm"><Baby size={22} strokeWidth={2.5} /></div>
                            Acompanhamento da Gravidez
                        </CardTitle>
                        {!isIframe && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowEmbedModal(true)} 
                                className="text-white hover:text-white hover:bg-white/20 h-8 px-2 rounded-lg"
                            >
                                <Code2 size={18} />
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                    <div className="space-y-2">
                        <Label className="text-slate-600 dark:text-slate-300 font-medium">Data da Última Menstruação (DUM)</Label>
                        <Input type="date" value={dum} onChange={e => setDum(e.target.value)} className="h-12 text-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium">Sexo do Bebê</Label>
                            <Select value={sexo} onValueChange={setSexo}>
                                <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-200"><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="surpresa">🎁 Vou descobrir</SelectItem>
                                    <SelectItem value="menino">💙 Menino</SelectItem>
                                    <SelectItem value="menina">💖 Menina</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-600 dark:text-slate-300 font-medium">Nome (Opcional)</Label>
                            <Input placeholder="Ex: Gabriel" value={nomeBebe} onChange={e => setNomeBebe(e.target.value)} className="h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 transition-colors dark:text-slate-100" />
                        </div>
                    </div>

                    <Button onClick={() => calcular()} className={`w-full h-14 font-bold text-lg text-white shadow-lg rounded-xl transition-all active:scale-[0.99] ${theme.btn}`}>
                        Calcular Data do Parto
                    </Button>
                </CardContent>
            </Card>

            {!isIframe && historico.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider"><History size={14}/> Consultas Recentes</h4>
                    <div className="space-y-1">
                    {historico.map((h, i) => (
                        <div key={i} className="flex justify-between text-sm border-b border-slate-50 dark:border-slate-800 last:border-0 py-2 px-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-colors">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{h.semanas}</span>
                            <span className={`font-bold ${theme.text}`}>{h.dpp}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>

        {/* RESULTADO */}
        <div className="lg:col-span-6 h-full">
            <Card className={`h-full border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-500 overflow-hidden ${resultado ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-950'}`}>
                <CardContent className="p-6 flex flex-col justify-center h-full min-h-[400px]">
                    {!resultado ? (
                        <div className="text-center text-slate-400">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CalendarHeart size={48} className="opacity-20"/>
                            </div>
                            <p className="text-sm font-medium">Informe a data da última menstruação para descobrir a data provável do parto.</p>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                            
                            <div className={`${theme.bgLight} p-8 rounded-3xl border ${theme.border} relative overflow-hidden group`}>
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity"><Sparkles className={theme.text} size={80}/></div>
                                <p className={`text-xs font-bold uppercase mb-2 tracking-widest ${theme.text}`}>
                                    {nomeBebe ? `Chegada d${sexo === 'menina' ? 'a' : 'o'} ${nomeBebe}` : "Data Provável do Parto"}
                                </p>
                                <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.text}`}>{resultado.dpp}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tempo de Gestação</p>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{resultado.semanas} <span className="text-sm font-medium text-slate-500">semanas</span></p>
                                    <p className="text-xs text-slate-400 mt-1">+ {resultado.dias} dias</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tamanho Estimado</p>
                                    <p className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                                        {resultado.tamanho === 'Melancia' ? '🍉' : '🥑'} {resultado.tamanho}
                                    </p>
                                    <p className="text-[10px] uppercase font-bold tracking-wide text-slate-400 mt-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full inline-block border border-slate-100 dark:border-slate-700">{resultado.trimestre}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button variant="outline" onClick={() => handleShare("link")} className="h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs uppercase font-bold tracking-wide bg-white dark:bg-slate-900">
                                    {copiado === "link" ? <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Link Copiado</span> : <span className="flex items-center gap-2"><Share2 size={16}/> Compartilhar</span>}
                                </Button>
                                <Button variant="outline" onClick={handlePrint} className="h-12 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs uppercase font-bold tracking-wide bg-white dark:bg-slate-900">
                                    <span className="flex items-center gap-2"><Printer size={16}/> Salvar Cartão</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>

      {/* --- LAYOUT DE IMPRESSÃO (DIÁRIO GESTACIONAL) --- */}
      {resultado && (
        <div className="hidden print:flex print:flex-col print:items-center print:justify-center print:h-screen print:w-full bg-white">
            <div ref={contentRef} className="print:w-full h-full border-4 border-double rounded-[2rem] p-8 relative overflow-hidden flex flex-col items-center justify-center text-center" 
                 style={{ borderColor: sexo === 'menina' ? '#fbcfe8' : (sexo === 'menino' ? '#bfdbfe' : '#ccfbf1') }}>
                
                {/* Marcas d'água decorativas */}
                <div className="absolute top-0 left-0 w-full h-32 opacity-20" style={{ backgroundColor: sexo === 'menina' ? '#fce7f3' : (sexo === 'menino' ? '#dbeafe' : '#f0fdfa') }}></div>
                <div className="absolute bottom-0 left-0 w-full h-32 opacity-20" style={{ backgroundColor: sexo === 'menina' ? '#fce7f3' : (sexo === 'menino' ? '#dbeafe' : '#f0fdfa') }}></div>

                <div className="relative z-10 w-full max-w-2xl space-y-8">
                    <div>
                        <h1 className="text-5xl font-bold text-slate-800 mb-2 font-serif">Diário da Gestação</h1>
                        <p className="text-slate-500 uppercase tracking-[0.2em] text-sm">Acompanhamento Semanal</p>
                    </div>

                    <div className="w-24 h-1 mx-auto bg-slate-200 rounded-full"></div>

                    {nomeBebe ? (
                        <h2 className="text-7xl font-bold my-6" style={{ fontFamily: 'cursive', color: sexo === 'menina' ? '#db2777' : (sexo === 'menino' ? '#2563eb' : '#0d9488') }}>
                            {nomeBebe}
                        </h2>
                    ) : (
                        <h2 className="text-4xl font-bold text-slate-700 my-6">Bebê a Caminho</h2>
                    )}

                    <div className="grid grid-cols-2 gap-6 text-left w-full">
                        <div className="p-6 border rounded-2xl bg-white shadow-sm">
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Previsão de Chegada</p>
                            <p className="text-3xl font-bold text-slate-800">{resultado.dpp}</p>
                        </div>
                        <div className="p-6 border rounded-2xl bg-white shadow-sm">
                            <p className="text-xs uppercase text-slate-400 font-bold mb-1">Idade Gestacional</p>
                            <p className="text-3xl font-bold text-slate-800">{resultado.semanas} semanas</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 italic text-slate-600 text-lg">
                        "O milagre da vida crescendo um pouquinho a cada dia. <br/>Mal podemos esperar para te conhecer."
                    </div>
                </div>

                <div className="absolute bottom-8 w-full text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                        <LinkIcon size={12}/>
                        <span>Gerado em <strong>mestredascontas.com.br</strong> em {dataAtual}</span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* MODAL DE EMBED */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in backdrop-blur-sm print:hidden" onClick={() => setShowEmbedModal(false)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"><X size={20}/></button>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Incorporar no seu Site</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Compartilhe essa ferramenta com seus leitores.</p>
                <div className="bg-slate-950 p-4 rounded-xl relative mb-4 overflow-hidden group">
                    <code className="text-xs font-mono text-blue-300 break-all block leading-relaxed selection:bg-blue-900">
                        {`<iframe src="https://mestredascontas.com.br/saude/gestacional?embed=true" width="100%" height="700" frameborder="0" style="border:0; border-radius:12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);" title="Calculadora Gestacional"></iframe>`}
                    </code>
                </div>
                <Button onClick={() => handleShare("embed")} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold h-12 rounded-xl">
                    {copiado === "embed" ? "Código Copiado!" : "Copiar Código HTML"}
                </Button>
            </div>
        </div>
      )}
    </div>
  );
}