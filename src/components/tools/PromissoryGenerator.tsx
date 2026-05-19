"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Printer, ArrowDown, Maximize2, X, AlertTriangle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { formatDocument } from "@/utils/masks";
import { numeroParaExtenso } from "@/utils/numero-extenso";

interface PromissoryData {
    numero: string;
    vencimento: string;
    valor: string;
    credorNome: string;
    credorDoc: string;
    pracaPagamento: string;
    emitenteNome: string;
    emitenteDoc: string;
    emitenteEndereco: string;
    dataEmissao: string;
}

const PromissoryTemplate = ({ data }: { data: PromissoryData }) => {
    const valorExtenso = numeroParaExtenso(data.valor);

    return (
        <div className="w-full h-full bg-white text-slate-900 relative px-4 py-8" style={{ fontFamily: "Georgia, serif", fontSize: "12pt" }}>
            
            <div className="border-[3px] border-slate-900 bg-[#fdfaf3] p-8 shadow-sm relative h-[450px] flex flex-col justify-between">
                
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none overflow-hidden">
                    <span className="text-8xl font-black transform -rotate-12 select-none uppercase">Nota Promissória</span>
                </div>

                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6 relative z-10">
                    <div className="flex flex-col w-1/3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">Nº da Nota</span>
                        <div className="border border-slate-400 bg-white px-3 py-1 text-center font-bold font-mono">
                            {data.numero || "01/01"}
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-1/3 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">Vencimento</span>
                        <div className="border border-slate-400 bg-white px-3 py-1 text-center font-bold">
                            {data.vencimento || "__/__/____"}
                        </div>
                    </div>

                    <div className="flex flex-col w-1/3 items-end">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">Valor</span>
                        <div className="border border-slate-400 bg-white px-4 py-1.5 font-bold font-mono text-xl w-full text-right">
                            R$ {data.valor || "0,00"}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 text-justify leading-relaxed relative z-10 flex-grow">
                    <p className="text-lg">
                        Ao vencimento pagarei(emos) por esta única via de <strong className="uppercase">Nota Promissória</strong> a quantia de:
                    </p>
                    
                    <div className="bg-white border border-slate-300 p-3 italic text-lg leading-loose break-words min-h-[80px]">
                         {valorExtenso ? `${valorExtenso}.` : "(Extenso da quantia em Reais)"}
                    </div>

                    <p className="text-lg leading-loose">
                        A <span className="font-bold border-b border-slate-400 px-2 inline-block min-w-[300px]">{data.credorNome || "Nome do Credor (quem vai receber)"}</span> 
                        {data.credorDoc && <span className="text-sm ml-2">CPF/CNPJ: {data.credorDoc}</span>} <br/>
                        ou à sua ordem, pagável na praça de <span className="font-bold border-b border-slate-400 px-2 inline-block min-w-[200px]">{data.pracaPagamento || "Cidade de pagamento"}</span>.
                    </p>
                </div>

                <div className="mt-8 flex justify-between items-end gap-8 relative z-10 pt-4 border-t border-slate-300">
                    <div className="w-1/2 text-sm space-y-1">
                        <p><strong>Emitente (Devedor):</strong> {data.emitenteNome || "Nome do Devedor"}</p>
                        <p><strong>CPF/CNPJ:</strong> {data.emitenteDoc || "000.000.000-00"}</p>
                        <p><strong>Endereço:</strong> {data.emitenteEndereco || "Rua, Número, Bairro, Cidade - UF"}</p>
                    </div>
                    
                    <div className="w-1/2 flex flex-col items-center">
                        <p className="text-sm mb-8 text-center">{data.pracaPagamento || "Local"}, {data.dataEmissao}</p>
                        <div className="border-b border-slate-900 w-full mb-1"></div>
                        <p className="font-bold uppercase text-xs text-center">Assinatura do Emitente</p>
                    </div>
                </div>
            </div>

             {/* Recibo canhoto (Opcional, comum em blocos) */}
             <div className="border-[2px] border-dashed border-slate-400 bg-white p-4 mt-8 flex justify-between items-center opacity-70">
                 <div className="text-xs space-y-1 w-2/3 border-r border-slate-300 pr-4">
                     <p className="font-bold uppercase tracking-wider text-[10px]">Canhoto de Controle</p>
                     <p>Nº <strong>{data.numero || "01"}</strong> - Vencimento: <strong>{data.vencimento}</strong> - Valor: <strong>R$ {data.valor}</strong></p>
                     <p>Emitente: {data.emitenteNome}</p>
                 </div>
                 <div className="text-xs pl-4 w-1/3 text-center">
                     <p>Recebido em: ___/___/____</p>
                     <div className="border-b border-slate-400 mt-6 w-full"></div>
                     <p className="text-[10px] mt-1">Assinatura Credor</p>
                 </div>
             </div>

             <div className="absolute bottom-2 right-6 text-[9px] text-slate-400 font-sans italic opacity-60">
                Gerado gratuitamente em <strong>mestredascontas.com.br</strong>
            </div>
        </div>
    );
};

export default function PromissoryGenerator({ initialValues }: { initialValues?: Partial<PromissoryData> }) {
    // --- ESTADOS ---
    const [numero, setNumero] = useState(initialValues?.numero || "01/01");
    const [vencimento, setVencimento] = useState(initialValues?.vencimento || "");
    const [valor, setValor] = useState(initialValues?.valor || "");
    
    const [credorNome, setCredorNome] = useState(initialValues?.credorNome || "");
    const [credorDoc, setCredorDoc] = useState(initialValues?.credorDoc || "");
    const [pracaPagamento, setPracaPagamento] = useState(initialValues?.pracaPagamento || "São Paulo - SP");

    const [emitenteNome, setEmitenteNome] = useState(initialValues?.emitenteNome || "");
    const [emitenteDoc, setEmitenteDoc] = useState(initialValues?.emitenteDoc || "");
    const [emitenteEndereco, setEmitenteEndereco] = useState(initialValues?.emitenteEndereco || "");

    const [dataEmissao, setDataEmissao] = useState(initialValues?.dataEmissao || "");

    const [isZoomed, setIsZoomed] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mesLocal = hoje.toLocaleDateString('pt-BR', { month: 'long' });
        const ano = hoje.getFullYear();
        setDataEmissao(`${dia} de ${mesLocal} de ${ano}`);
    }, []);

    const handleDocChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(formatDocument(e.target.value));
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value.replace(/\D/g, "");
        v = (Number(v) / 100).toFixed(2) + "";
        v = v.replace(".", ",");
        v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        setValor(v);
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Nota_Promissoria_${emitenteNome.substring(0,10) || "Devedor"}`,
        onAfterPrint: () => trackEvent("print_promissory_success", { value: valor }),
        pageStyle: `@page { size: A4 portrait; margin: 0; } body { -webkit-print-color-adjust: exact; }`
    });

    const scrollToPreview = () => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const promissoryData: PromissoryData = {
        numero, vencimento, valor,
        credorNome, credorDoc, pracaPagamento,
        emitenteNome, emitenteDoc, emitenteEndereco, dataEmissao
    };

    return (
        <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto">
            
            <div className="w-full space-y-6">
                
                {/* DADOS DO TÍTULO */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                    <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <div className="w-1 h-6 bg-amber-500 rounded-full"></div>
                            Dados do Título
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label>Valor (R$)</Label>
                                <Input value={valor} onChange={handleValorChange} placeholder="0,00" className="text-lg font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label>Data de Vencimento</Label>
                                <Input value={vencimento} onChange={e => setVencimento(e.target.value)} placeholder="DD/MM/AAAA" />
                            </div>
                            <div className="space-y-2">
                                <Label>Número da Nota</Label>
                                <Input value={numero} onChange={e => setNumero(e.target.value)} placeholder="01/01 ou 01/10" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* CREDOR */}
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                Credor (Quem vai receber)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label>Nome do Credor</Label>
                                <Input placeholder="João da Silva" value={credorNome} onChange={e => setCredorNome(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CPF ou CNPJ (Opcional)</Label>
                                <Input placeholder="000.000.000-00" value={credorDoc} onChange={handleDocChange(setCredorDoc)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Praça de Pagamento (Cidade)</Label>
                                <Input placeholder="São Paulo - SP" value={pracaPagamento} onChange={e => setPracaPagamento(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* DEVEDOR */}
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                                Emitente (Quem está devendo)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label>Nome do Emitente/Devedor</Label>
                                <Input placeholder="Maria Souza" value={emitenteNome} onChange={e => setEmitenteNome(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CPF ou CNPJ</Label>
                                <Input placeholder="000.000.000-00" value={emitenteDoc} onChange={handleDocChange(setEmitenteDoc)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Endereço Completo</Label>
                                <Input placeholder="Rua A, 123 - Bairro, Cidade/UF" value={emitenteEndereco} onChange={e => setEmitenteEndereco(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* DATA EMISSAO */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                    <CardContent className="p-6 flex items-center justify-between">
                         <div className="space-y-2 w-1/2">
                            <Label>Data de Emissão da Nota</Label>
                            <Input value={dataEmissao} onChange={e => setDataEmissao(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>

                {/* BOTÕES */}
                <div className="flex gap-4 sticky bottom-4 z-50 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl shadow-xl backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 max-w-2xl mx-auto">
                    <Button variant="outline" size="lg" onClick={scrollToPreview} className="flex-1 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <ArrowDown size={20} className="mr-2"/> Ver Preview
                    </Button>
                    <Button size="lg" onClick={() => handlePrint()} className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-amber-200/50 shadow-lg">
                        <Printer size={20} className="mr-2"/> Imprimir Promissória
                    </Button>
                </div>
            </div>

            {/* PREVIEW */}
             <div ref={previewRef} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center relative group shadow-inner">
                <div className="absolute top-4 right-4 z-20">
                    <Button onClick={() => setIsZoomed(true)} variant="secondary" size="sm" className="bg-white/90 shadow-lg">
                        <Maximize2 size={16} className="mr-2"/> Ampliar
                    </Button>
                </div>

                <div onClick={() => setIsZoomed(true)} className="cursor-zoom-in w-full flex justify-center overflow-y-auto overflow-x-hidden h-[400px] sm:h-[600px] md:h-[750px] transition-all duration-300 pr-2 pb-2">
                    <div className="bg-white shadow-2xl origin-top transition-transform duration-300 scale-[0.50] sm:scale-[0.7] md:scale-[0.9] lg:scale-100 select-none" style={{ width: '210mm', minHeight: '297mm' }}>
                        <div ref={printRef} className="h-full flex flex-col pt-8">
                            <PromissoryTemplate data={promissoryData} />
                            
                            {/* Linha de corte visual apenas para quem quer imprimir duas por folha */}
                            <div className="mt-8 mb-8 flex items-center justify-center gap-4 opacity-30 select-none print:hidden">
                                <div className="border-t-2 border-dashed border-slate-400 w-full"></div>
                                <span className="text-xs uppercase font-sans whitespace-nowrap text-slate-500">Formato A4 comporta até 2 notas</span>
                                <div className="border-t-2 border-dashed border-slate-400 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL ZOOM */}
            {isZoomed && (
                <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in" onClick={() => setIsZoomed(false)}>
                    <div className="relative w-full max-w-5xl h-[90vh] overflow-hidden bg-slate-200 dark:bg-slate-900 rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border-b border-slate-200 z-10">
                            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"><FileText size={18}/> Promissória</h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsZoomed(false)}><X size={20}/></Button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-100">
                             <div className="bg-white shadow-2xl scale-[0.6] sm:scale-[0.8] md:scale-100 origin-top" style={{ width: '210mm', minHeight: '297mm' }}>
                                <div className="h-full pt-8">
                                    <PromissoryTemplate data={promissoryData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
