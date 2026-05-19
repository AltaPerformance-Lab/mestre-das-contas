"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Printer, ArrowDown, Maximize2, X, Building2, User } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { formatDocument, validateDocument, formatCurrencyInput, parseCurrency } from "@/utils/masks";
import { numeroParaExtenso } from "@/utils/numero-extenso"; // Assumindo que criamos/movemos essa func

interface ContractData {
    contratante: { nome: string; doc: string; endereco: string; };
    contratado: { nome: string; doc: string; endereco: string; };
    objeto: string;
    valor: string;
    formaPagamento: string;
    prazo: string;
    condicoesExtras: string;
    foro: string;
    dataEmissao: string;
}

const ContractTemplate = ({ data }: { data: ContractData }) => {
    const valorExtenso = numeroParaExtenso(data.valor);

    return (
        <div className="w-full h-full bg-white text-slate-900 font-serif relative px-12 py-16" style={{ fontSize: "11pt", lineHeight: "1.6" }}>
            
            <h1 className="text-xl font-bold text-center uppercase mb-10 tracking-widest">
                Contrato de Prestação de Serviços
            </h1>

            <div className="space-y-6 text-justify">
                {/* DAS PARTES */}
                <section>
                    <h2 className="font-bold uppercase mb-2">1. Das Partes</h2>
                    <p>
                        <strong>CONTRATANTE:</strong> {data.contratante.nome || "[NOME DO CONTRATANTE]"}, inscrito(a) no CPF/CNPJ sob o nº {data.contratante.doc || "[DOCUMENTO]"}, residente e domiciliado(a) na {data.contratante.endereco || "[ENDEREÇO COMPLETO]"}.
                    </p>
                    <p className="mt-2">
                        <strong>CONTRATADO:</strong> {data.contratado.nome || "[NOME DO CONTRATADO]"}, inscrito(a) no CPF/CNPJ sob o nº {data.contratado.doc || "[DOCUMENTO]"}, residente e domiciliado(a) na {data.contratado.endereco || "[ENDEREÇO COMPLETO]"}.
                    </p>
                    <p className="mt-2">
                        As partes acima qualificadas celebram entre si este Contrato de Prestação de Serviços, que se regerá pelas cláusulas seguintes.
                    </p>
                </section>

                {/* DO OBJETO */}
                <section>
                    <h2 className="font-bold uppercase mb-2">2. Do Objeto do Contrato</h2>
                    <p>
                        A CONTRATADA compromete-se a prestar os seguintes serviços para a CONTRATANTE, em conformidade com as normas do Código Civil Brasileiro (Lei nº 10.406/2002, arts. 593 a 609): <br/>
                        <span className="italic">"{data.objeto || "Descreva detalhadamente o serviço que será prestado..."}"</span>
                    </p>
                </section>

                {/* DO PREÇO E PAGAMENTO */}
                <section>
                    <h2 className="font-bold uppercase mb-2">3. Do Preço e Condições de Pagamento</h2>
                    <p>
                        Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor total de <strong>R$ {data.valor || "0,00"} ({valorExtenso})</strong>.
                    </p>
                    <p className="mt-2">
                        O pagamento será realizado da seguinte forma: <strong>{data.formaPagamento || "[FORMA E PRAZOS DE PAGAMENTO]"}</strong>.
                    </p>
                </section>

                {/* DO PRAZO */}
                <section>
                    <h2 className="font-bold uppercase mb-2">4. Do Prazo de Execução</h2>
                    <p>
                        Os serviços objeto deste contrato serão realizados no prazo de: <strong>{data.prazo || "[PRAZO DE EXECUÇÃO / DURAÇÃO DO CONTRATO]"}</strong>, podendo ser prorrogado mediante acordo mútuo entre as partes.
                    </p>
                </section>

                {/* CONDIÇÕES EXTRAS */}
                {data.condicoesExtras && (
                <section>
                    <h2 className="font-bold uppercase mb-2">5. Das Condições Específicas</h2>
                    <p className="whitespace-pre-wrap">{data.condicoesExtras}</p>
                </section>
                )}

                {/* DISPOSIÇÕES GERAIS E FORO */}
                <section>
                    <h2 className="font-bold uppercase mb-2">{data.condicoesExtras ? "6" : "5"}. Disposições Gerais e Foro</h2>
                    <p>
                        A prestação de serviço não gera vínculo empregatício entre as partes. O descumprimento de qualquer cláusula sujeitará a parte infratora à multa e perdas e danos.
                    </p>
                    <p className="mt-2">
                        Fica eleito o foro da cidade de <strong>{data.foro || "[CIDADE DO FORO]"}</strong> para dirimir quaisquer dúvidas originadas deste contrato, renunciando a qualquer outro por mais privilegiado que seja.
                    </p>
                </section>

                {/* ASSINATURAS */}
                <section className="mt-16 pt-8">
                    <p className="text-center mb-16">
                        {data.foro || "[Cidade]"}, {data.dataEmissao}.
                    </p>
                    
                    <div className="flex justify-between mt-12 gap-12">
                        <div className="w-1/2 text-center">
                            <div className="border-b border-slate-900 mb-2 h-8"></div>
                            <p className="font-bold uppercase text-xs">{data.contratante.nome || "CONTRATANTE"}</p>
                            <p className="text-[10px] text-slate-500">CPF/CNPJ: {data.contratante.doc}</p>
                        </div>
                        <div className="w-1/2 text-center">
                            <div className="border-b border-slate-900 mb-2 h-8"></div>
                            <p className="font-bold uppercase text-xs">{data.contratado.nome || "CONTRATADO"}</p>
                            <p className="text-[10px] text-slate-500">CPF/CNPJ: {data.contratado.doc}</p>
                        </div>
                    </div>

                    <div className="flex justify-between mt-16 gap-12">
                         <div className="w-1/2 text-center">
                            <div className="border-b border-slate-900 mb-2 h-8"></div>
                            <p className="font-bold uppercase text-xs">Testemunha 1</p>
                            <p className="text-[10px] text-slate-500">CPF:</p>
                        </div>
                        <div className="w-1/2 text-center">
                            <div className="border-b border-slate-900 mb-2 h-8"></div>
                            <p className="font-bold uppercase text-xs">Testemunha 2</p>
                            <p className="text-[10px] text-slate-500">CPF:</p>
                        </div>
                    </div>
                </section>
            </div>
            
            <div className="absolute bottom-8 right-12 text-[9px] text-slate-300 font-sans italic">
                Documento gerado gratuitamente em <strong>mestredascontas.com.br</strong>
            </div>
        </div>
    );
};

export default function ContractGenerator({ initialValues }: { initialValues?: Partial<ContractData> }) {
    // --- ESTADOS ---
    const [cNome, setCNome] = useState(initialValues?.contratante?.nome || "");
    const [cDoc, setCDoc] = useState(initialValues?.contratante?.doc || "");
    const [cEnd, setCEnd] = useState(initialValues?.contratante?.endereco || "");

    const [dNome, setDNome] = useState(initialValues?.contratado?.nome || "");
    const [dDoc, setDDoc] = useState(initialValues?.contratado?.doc || "");
    const [dEnd, setDEnd] = useState(initialValues?.contratado?.endereco || "");

    const [objeto, setObjeto] = useState(initialValues?.objeto || "");
    const [valor, setValor] = useState(initialValues?.valor || "");
    const [forma, setForma] = useState(initialValues?.formaPagamento || "À vista na finalização do serviço");
    const [prazo, setPrazo] = useState(initialValues?.prazo || "30 dias");
    const [extras, setExtras] = useState(initialValues?.condicoesExtras || "");
    const [foro, setForo] = useState(initialValues?.foro || "São Paulo - SP");
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
        setDataEmissao(initialValues?.dataEmissao || `${dia} de ${mesLocal} de ${ano}`);

        // Parametros de SEO
        const objUrl = searchParams.get('objeto');
        if (objUrl) setObjeto(decodeURIComponent(objUrl));
    }, [initialValues, searchParams]);

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
        documentTitle: `Contrato_${dNome.substring(0,10) || "Servico"}`,
        onAfterPrint: () => trackEvent("print_contract_success", { value: valor }),
        pageStyle: `@page { size: A4 portrait; margin: 0; } body { -webkit-print-color-adjust: exact; }`
    });

    const scrollToPreview = () => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const contractData: ContractData = {
        contratante: { nome: cNome, doc: cDoc, endereco: cEnd },
        contratado: { nome: dNome, doc: dDoc, endereco: dEnd },
        objeto, valor, formaPagamento: forma, prazo, condicoesExtras: extras, foro, dataEmissao
    };

    return (
        <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto">
            
            <div className="w-full space-y-6">
                
                {/* PARTES */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                Contratante (Cliente)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label>Nome Completo / Razão Social</Label>
                                <Input placeholder="João da Silva" value={cNome} onChange={e => setCNome(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CPF ou CNPJ</Label>
                                <Input placeholder="000.000.000-00" value={cDoc} onChange={handleDocChange(setCDoc)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Endereço Completo</Label>
                                <Input placeholder="Rua A, 123 - Bairro, Cidade/UF" value={cEnd} onChange={e => setCEnd(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                                Contratado (Você/Prestador)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label>Nome Completo / Razão Social</Label>
                                <Input placeholder="Sua Empresa Ltda" value={dNome} onChange={e => setDNome(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>CPF ou CNPJ</Label>
                                <Input placeholder="00.000.000/0001-00" value={dDoc} onChange={handleDocChange(setDDoc)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Endereço Completo</Label>
                                <Input placeholder="Sua Rua, 456 - Sua Cidade/UF" value={dEnd} onChange={e => setDEnd(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* OBJETO E VALORES */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                    <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
                            Objeto, Valores e Prazos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label>O que será feito? (Objeto do Contrato)</Label>
                            <Textarea placeholder="Descreva os serviços a serem prestados de forma clara e objetiva..." value={objeto} onChange={e => setObjeto(e.target.value)} className="min-h-[80px]" />
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Valor Total (R$)</Label>
                                <Input value={valor} onChange={handleValorChange} placeholder="0,00" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label>Forma de Pagamento</Label>
                                <Input placeholder="Ex: 50% na assinatura e 50% na entrega" value={forma} onChange={e => setForma(e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Prazo de Execução / Duração</Label>
                            <Input placeholder="Ex: 15 dias úteis contados da assinatura" value={prazo} onChange={e => setPrazo(e.target.value)} />
                        </div>

                        <div className="space-y-2 pt-2">
                            <Label>Cláusulas Extras / Garantias (Opcional)</Label>
                            <Textarea placeholder="O contratado oferece garantia de 90 dias contra falhas de execução..." value={extras} onChange={e => setExtras(e.target.value)} className="min-h-[80px]" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-2">
                                <Label>Foro (Cidade para disputas judiciais)</Label>
                                <Input placeholder="São Paulo - SP" value={foro} onChange={e => setForo(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Data de Emissão no Rodapé</Label>
                                <Input value={dataEmissao} onChange={e => setDataEmissao(e.target.value)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* BOTÕES */}
                <div className="flex gap-4 sticky bottom-4 z-50 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl shadow-xl backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 max-w-2xl mx-auto">
                    <Button variant="outline" size="lg" onClick={scrollToPreview} className="flex-1 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <ArrowDown size={20} className="mr-2"/> Ver Preview
                    </Button>
                    <Button size="lg" onClick={() => handlePrint()} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-blue-200 shadow-lg">
                        <Printer size={20} className="mr-2"/> Imprimir PDF
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

                <div onClick={() => setIsZoomed(true)} className="cursor-zoom-in w-full flex justify-center overflow-y-auto overflow-x-hidden h-[400px] sm:h-[600px] md:h-[750px] lg:h-[850px] transition-all duration-300 pr-2 pb-2">
                    <div className="bg-white shadow-2xl origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 select-none" style={{ width: '210mm', minHeight: '297mm' }}>
                        <div ref={printRef} className="h-full">
                            <ContractTemplate data={contractData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL ZOOM */}
            {isZoomed && (
                <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in" onClick={() => setIsZoomed(false)}>
                    <div className="relative w-full max-w-5xl h-[90vh] overflow-hidden bg-slate-200 dark:bg-slate-900 rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border-b border-slate-200 z-10">
                            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2"><FileText size={18}/> Contrato</h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsZoomed(false)}><X size={20}/></Button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-100">
                             <div className="bg-white shadow-2xl scale-[0.5] sm:scale-[0.7] md:scale-100 origin-top" style={{ width: '210mm', minHeight: '297mm' }}>
                                <div className="h-full">
                                    <ContractTemplate data={contractData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
