"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeartPulse, Share2, Download, History, CheckCircle2, Code2, ExternalLink, Copy, X } from "lucide-react";

type HistoricoItem = {
  data: string;
  peso: string;
  altura: string;
  imc: string;
  classificacao: string;
};

// Definindo tipo para o resultado para tirar o 'any'
type ResultadoIMC = {
    imc: string;
    classificacao: string;
    cor: string;
    peso: string;
    altura: string;
} | null;

export default function IMCCalculator() {
  const searchParams = useSearchParams();
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [resultado, setResultado] = useState<ResultadoIMC>(null);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [embedCopiado, setEmbedCopiado] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [isIframe, setIsIframe] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  
  const reactToPrintFn = useReactToPrint({ 
    contentRef,
    documentTitle: "Relatorio_IMC_MestreDosCalculos",
  });

  useEffect(() => {
    setIsIframe(window.self !== window.top);
    const urlPeso = searchParams.get("peso");
    const urlAltura = searchParams.get("altura");
    if (urlPeso && urlAltura) {
      setPeso(urlPeso);
      setAltura(urlAltura);
      // Pequeno delay para garantir que a UI carregou
      setTimeout(() => calcular(urlPeso, urlAltura), 100);
    }
    const salvo = localStorage.getItem("historico_imc");
    if (salvo) setHistorico(JSON.parse(salvo));
  }, [searchParams]);

  const calcular = (p = peso, a = altura) => {
    // Tratamento robusto para vírgula ou ponto
    const pesoNum = parseFloat(p.replace(",", "."));
    // Se altura for inteira (ex: 180), divide por 100. Se for decimal (1.80), mantem.
    const alturaNum = parseFloat(a.replace(",", ".")) / (a.includes(".") || a.includes(",") ? 1 : 100);

    if (!pesoNum || !alturaNum || isNaN(pesoNum) || isNaN(alturaNum)) return;

    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = "";
    let cor = "";

    if (imc < 18.5) { classificacao = "Abaixo do Peso"; cor = "text-blue-600 border-blue-200 bg-blue-50"; }
    else if (imc < 24.9) { classificacao = "Peso Normal"; cor = "text-green-700 border-green-200 bg-green-50"; }
    else if (imc < 29.9) { classificacao = "Sobrepeso"; cor = "text-yellow-700 border-yellow-200 bg-yellow-50"; }
    else if (imc < 34.9) { classificacao = "Obesidade Grau I"; cor = "text-orange-700 border-orange-200 bg-orange-50"; }
    else if (imc < 39.9) { classificacao = "Obesidade Grau II"; cor = "text-red-700 border-red-200 bg-red-50"; }
    else { classificacao = "Obesidade Grau III"; cor = "text-red-900 border-red-300 bg-red-100"; }

    const novoResultado = { imc: imc.toFixed(2), classificacao, cor, peso: pesoNum.toString(), altura: alturaNum.toFixed(2) };
    setResultado(novoResultado);
    if (!isIframe) salvarHistorico(novoResultado);
  };

  const salvarHistorico = (res: any) => {
    const novoItem: HistoricoItem = { data: new Date().toLocaleDateString("pt-BR"), peso: res.peso, altura: res.altura, imc: res.imc, classificacao: res.classificacao };
    const novoHistorico = [novoItem, ...historico].slice(0, 5);
    setHistorico(novoHistorico);
    localStorage.setItem("historico_imc", JSON.stringify(novoHistorico));
  };

  const handleAction = (action: "share" | "pdf" | "embed") => {
    if (isIframe) { window.open(`https://mestredoscalculos.com.br/saude/imc?peso=${peso}&altura=${altura}`, '_blank'); return; }
    if (action === "share") {
        const url = `${window.location.origin}${window.location.pathname}?peso=${peso}&altura=${altura}`;
        navigator.clipboard.writeText(url);
        setLinkCopiado(true);
        setTimeout(() => setLinkCopiado(false), 2000);
    } else if (action === "pdf") { reactToPrintFn(); } 
    else if (action === "embed") { setShowEmbedModal(true); }
  };

  const copiarEmbedCode = () => {
    const code = `<iframe src="https://mestredoscalculos.com.br/saude/imc?embed=true" width="100%" height="650" frameborder="0" style="border:0; overflow:hidden; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1);" title="Calculadora de IMC"></iframe>`;
    navigator.clipboard.writeText(code);
    setEmbedCopiado(true);
    setTimeout(() => setEmbedCopiado(false), 2000);
  };

  return (
    <div className="w-full">
      
      {/* CARD DE INPUT - CENTRALIZADO SE NÃO TIVER RESULTADO */}
      <div className={`space-y-6 w-full print:hidden transition-all duration-500 ease-in-out ${resultado ? '' : 'max-w-xl mx-auto'}`}>
        <Card className="border-slate-200 shadow-sm h-full overflow-visible">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <div className="bg-red-100 p-2 rounded-lg text-red-600"><HeartPulse size={20} /></div>
                Calcular IMC
              </CardTitle>
              
              {!isIframe && (
                  <button 
                    onClick={() => handleAction("embed")} 
                    className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 px-3 py-1.5 rounded-full transition-all group"
                  >
                    <Code2 size={16} className="text-slate-400 group-hover:text-blue-600"/>
                    Incorporar
                  </button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Peso (kg)</Label><Input placeholder="Ex: 80" value={peso} onChange={e => setPeso(e.target.value)} type="number" /></div>
              <div className="space-y-2"><Label>Altura (cm)</Label><Input placeholder="Ex: 180" value={altura} onChange={e => setAltura(e.target.value)} type="number" /></div>
            </div>
            <Button onClick={() => calcular()} className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-bold shadow-lg shadow-blue-100">Calcular Agora</Button>
          </CardContent>
        </Card>

        {/* Histórico */}
        {!isIframe && historico.length > 0 && !resultado && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm animate-in fade-in">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider"><History size={14} /> Histórico Recente</h4>
            <div className="space-y-2">
              {historico.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 hover:bg-slate-50 p-2 rounded cursor-pointer" onClick={() => { setPeso(item.peso); setAltura(item.altura); }}>
                  <span className="text-slate-600 font-medium">{item.peso}kg / {item.altura}m</span>
                  <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">{item.imc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ÁREA DE RESULTADO (Só aparece se tiver resultado) */}
      {resultado && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* VERSÃO WEB DO RESULTADO */}
            <Card className={`border-2 bg-opacity-30 print:hidden ${resultado.cor.split(' ')[1]}`}> 
              <CardContent className="p-6 text-center">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Seu Índice de Massa Corporal</p>
                <div className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-4 tracking-tighter">{resultado.imc}</div>
                <div className={`text-sm md:text-base font-bold ${resultado.cor} uppercase tracking-wide px-6 py-2 rounded-full shadow-sm border inline-block`}>
                    {resultado.classificacao}
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4 text-left bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-lg mx-auto">
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">Peso Informado</p><p className="text-xl font-bold text-slate-700">{resultado.peso} kg</p></div>
                    <div><p className="text-[10px] text-slate-400 uppercase font-bold">Altura Informada</p><p className="text-xl font-bold text-slate-700">{resultado.altura} m</p></div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 print:hidden max-w-lg mx-auto">
                <Button variant="outline" onClick={() => handleAction("share")} className="h-12 border-slate-200 hover:bg-blue-50 text-blue-700">
                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Ver Completo</span> : (linkCopiado ? <span className="flex items-center gap-2"><CheckCircle2 size={18}/> Copiado!</span> : <span className="flex items-center gap-2"><Share2 size={18}/> Compartilhar</span>)}
                </Button>
                <Button variant="outline" onClick={() => handleAction("pdf")} className="h-12 border-slate-200 hover:bg-slate-50 text-slate-700">
                    {isIframe ? <span className="flex items-center gap-2"><ExternalLink size={18}/> Baixar PDF</span> : <span className="flex items-center gap-2"><Download size={18}/> Salvar PDF</span>}
                </Button>
            </div>

            {/* CARD DE IMPRESSÃO (Oculto na tela, visível no Print) */}
            <div className="hidden print:block">
               {/* ... Conteúdo de Impressão mantido igual ... */}
               <div ref={contentRef} className="print:w-full print:p-10">
                  <h1 className="text-3xl font-bold mb-4">Relatório de IMC</h1>
                  <p>IMC: {resultado.imc}</p>
                  <p>Classificação: {resultado.classificacao}</p>
                  <p className="text-xs mt-10">Gerado por Mestre dos Cálculos</p>
               </div>
            </div>
        </div>
      )}

      {/* MODAL MANTIDO IGUAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in backdrop-blur-sm">
             {/* ... Conteúdo do Modal mantido ... */}
             <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full relative">
                <button onClick={() => setShowEmbedModal(false)} className="absolute top-2 right-2"><X size={20}/></button>
                <h3 className="font-bold mb-4">Incorporar Calculadora</h3>
                <Button onClick={copiarEmbedCode} className="w-full">{embedCopiado ? "Copiado!" : "Copiar Código"}</Button>
             </div>
        </div>
      )}
    </div>
  );
}