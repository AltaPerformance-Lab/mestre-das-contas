"use client";

import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, Printer, Plus, Trash2, 
  MapPin, CalendarDays, ArrowDown, Calculator,
  Upload, Image as ImageIcon, CreditCard, Percent,
  Maximize2, X
} from "lucide-react";

// --- INTERFACES ---
export interface BudgetItem {
    id: string;
    description: string;
    quantity: number;
    price: number;
}

export interface BudgetData {
    number: string;
    date: string;
    validity: string;
    issuer: {
        name: string;
        doc: string; // CPF/CNPJ
        phone: string;
        address: string;
        logoObj?: string | null; // Data URL for logo
    };
    client: {
        name: string;
        doc: string;
        address: string;
        contact: string;
    };
    items: BudgetItem[];
    discount: {
        type: 'percentage' | 'fixed';
        value: number;
    };
    payment: {
        method: string;
        notes: string;
    };
    terms: string;
}

export interface BudgetCreatorProps {
    initialValues?: Partial<BudgetData>;
}

// --- UTILS ---
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// --- COMPONENTE VISUAL DO ORÇAMENTO (PRINT) ---
const BudgetTemplate = ({ data }: { data: BudgetData }) => {
    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    
    let discountValue = 0;
    if (data.discount.value > 0) {
        if (data.discount.type === 'percentage') {
            discountValue = subtotal * (data.discount.value / 100);
        } else {
            discountValue = data.discount.value;
        }
    }
    
    const total = Math.max(0, subtotal - discountValue);

    return (
        <div className="w-full h-full bg-white p-8 md:p-12 text-slate-900 font-sans relative flex flex-col justify-between">
            
            {/* CABEÇALHO */}
            <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
                <div className="flex gap-6 items-center">
                    {data.issuer.logoObj ? (
                         // eslint-disable-next-line @next/next/no-img-element
                        <img src={data.issuer.logoObj} alt="Logo" className="h-20 w-auto object-contain max-w-[150px]" />
                    ) : (
                        <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center text-slate-300">
                            <ImageIcon size={32} />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{data.issuer.name || "Nome da Sua Empresa"}</h1>
                        <div className="text-sm text-slate-500 space-y-0.5 mt-1">
                            <p>{data.issuer.doc}</p>
                            <p>{data.issuer.address}</p>
                            <p>{data.issuer.phone}</p>
                        </div>
                    </div>
                </div>
                
                <div className="text-right">
                    <div className="inline-block bg-slate-100 px-4 py-2 rounded-lg mb-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Orçamento Nº</h2>
                        <p className="text-2xl font-mono font-bold text-slate-900">#{data.number || "001"}</p>
                    </div>
                    <p className="text-sm text-slate-500">Data: <strong>{data.date}</strong></p>
                    <p className="text-sm text-slate-500">Validade: <strong>{data.validity}</strong></p>
                </div>
            </div>

            {/* CLIENTE */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Dados do Cliente</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold text-lg text-slate-900">{data.client.name || "Nome do Cliente"}</p>
                        <p className="text-sm text-slate-600">{data.client.doc}</p>
                    </div>
                    <div className="text-right sm:text-left">
                        <p className="text-sm text-slate-600">{data.client.address}</p>
                        <p className="text-sm text-slate-600">{data.client.contact}</p>
                    </div>
                </div>
            </div>

            {/* TABELA DE ITENS */}
            <div className="flex-grow">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-900">
                            <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-500 w-[50%]">Descrição</th>
                            <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Qtd</th>
                            <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Unitário</th>
                            <th className="py-3 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {data.items.map((item) => (
                            <tr key={item.id} className="border-b border-slate-100">
                                <td className="py-4 font-medium text-slate-800">{item.description}</td>
                                <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                                <td className="py-4 text-right text-slate-600">{formatCurrency(item.price)}</td>
                                <td className="py-4 text-right font-bold text-slate-900">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                        {data.items.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-slate-400 italic">Nenhum item adicionado...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* TOTAIS E PAGAMENTO */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-8">
                
                {/* Formas de Pagamento */}
                <div className="w-full sm:w-1/2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b border-slate-100 pb-1">Pagamento</h4>
                    <div className="text-sm text-slate-600 space-y-1">
                        <p><strong>Forma:</strong> {data.payment.method || "A combinar"}</p>
                        {data.payment.notes && <p className="italic">{data.payment.notes}</p>}
                    </div>
                </div>

                {/* Cálculos */}
                <div className="w-full sm:w-1/3 space-y-3">
                    <div className="flex justify-between text-slate-500 text-sm">
                        <span>Subtotal:</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    
                    {discountValue > 0 && (
                        <div className="flex justify-between text-red-500 text-sm font-medium">
                            <span>Desconto {data.discount.type === 'percentage' ? `(${data.discount.value}%)` : ''}:</span>
                            <span>- {formatCurrency(discountValue)}</span>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center border-t-2 border-slate-900 pt-3">
                        <span className="font-bold text-lg text-slate-900">TOTAL:</span>
                        <span className="font-bold text-2xl text-slate-900 bg-slate-100 px-2 rounded">{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* TERMOS E RODAPÉ */}
            <div className="mt-12 pt-8 border-t border-slate-200">
                {data.terms && (
                    <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Termos e Condições</h4>
                        <p className="text-xs text-slate-500 text-justify leading-relaxed whitespace-pre-wrap">
                            {data.terms}
                        </p>
                    </div>
                )}
                
                <div className="flex justify-between items-end">
                    <div className="text-center w-40">
                         <div className="border-b border-slate-300 mb-2 h-8"></div>
                         <p className="text-[10px] text-slate-400 uppercase">Assinatura do Emissor</p>
                    </div>
                    <div className="text-[10px] text-slate-300 italic">
                         Gerado por <strong>Mestre das Contas</strong>
                    </div>
                </div>
            </div>

        </div>
    );
};


// --- COMPONENTE PRINCIPAL ---
import { formatDocument, formatPhone, validateDocument, formatCurrencyInput, parseCurrency } from "@/utils/masks";

export default function BudgetCreator({ initialValues }: BudgetCreatorProps = {}) {
    // --- ESTADO ---
    const [issuerName, setIssuerName] = useState(initialValues?.issuer?.name || "");
    const [issuerDoc, setIssuerDoc] = useState(initialValues?.issuer?.doc || "");
    const [issuerPhone, setIssuerPhone] = useState(initialValues?.issuer?.phone || "");
    const [issuerAddress, setIssuerAddress] = useState(initialValues?.issuer?.address || "");
    const [logo, setLogo] = useState<string | null>(initialValues?.issuer?.logoObj || null);

    const [clientName, setClientName] = useState(initialValues?.client?.name || "");
    const [clientDoc, setClientDoc] = useState(initialValues?.client?.doc || "");
    const [clientAddress, setClientAddress] = useState(initialValues?.client?.address || "");
    const [clientContact, setClientContact] = useState(initialValues?.client?.contact || "");

    const [budgetNumber, setBudgetNumber] = useState(initialValues?.number || "0001");
    const [budgetDate, setBudgetDate] = useState("");
    
    // Validations
    const isIssuerDocValid = issuerDoc ? validateDocument(issuerDoc) : true;
    const isClientDocValid = clientDoc ? validateDocument(clientDoc) : true;

    // --- HANDLERS COM MÁSCARA ---
    const handleDocChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(formatDocument(e.target.value));
    };

    const handlePhoneChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(formatPhone(e.target.value));
    };

    const [budgetValidity, setBudgetValidity] = useState("");

    const [items, setItems] = useState<BudgetItem[]>(initialValues?.items || [
        { id: '1', description: 'Consultoria Técnica', quantity: 1, price: 1500.00 }
    ]);
    
    // Novo: Desconto e Pagamento
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(initialValues?.discount?.type || 'fixed');
    const [discountValue, setDiscountValue] = useState<number>(initialValues?.discount?.value || 0);
    const [paymentMethod, setPaymentMethod] = useState(initialValues?.payment?.method || "Pix");
    const [paymentNotes, setPaymentNotes] = useState(initialValues?.payment?.notes || "");

    const [terms, setTerms] = useState(initialValues?.terms || "1. Validade deste orçamento é de 15 dias.\n2. Pagamento: 50% na entrada e 50% na entrega.");
    const [isZoomed, setIsZoomed] = useState(false);

    const printRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    // --- INIT ---
    useEffect(() => {
        const today = new Date();
        setBudgetDate(formatDate(today));
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 15);
        setBudgetValidity(formatDate(nextWeek));
    }, []);

    // --- HANDLERS ---
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addItem = () => {
        setItems([...items, { id: generateId(), description: "", quantity: 1, price: 0 }]);
    };

    const updateItem = (id: string, field: keyof BudgetItem, value: string | number) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    const scrollToPreview = () => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Orcamento_${budgetNumber}_${clientName || 'Cliente'}`,
        pageStyle: `@page { size: A4 portrait; margin: 0; } body { -webkit-print-color-adjust: exact; }`
    });

    // --- DATA ---
    const budgetData: BudgetData = {
        number: budgetNumber,
        date: budgetDate,
        validity: budgetValidity,
        issuer: {
            name: issuerName,
            doc: issuerDoc,
            phone: issuerPhone,
            address: issuerAddress,
            logoObj: logo
        },
        client: {
            name: clientName,
            doc: clientDoc,
            address: clientAddress,
            contact: clientContact
        },
        items,
        discount: { type: discountType, value: discountValue },
        payment: { method: paymentMethod, notes: paymentNotes },
        terms
    };

    const calculateSubtotal = () => items.reduce((acc, i) => acc + (i.quantity * i.price), 0);
    const calculateTotal = () => {
        const sub = calculateSubtotal();
        const disc = discountType === 'percentage' ? sub * (discountValue / 100) : discountValue;
        return Math.max(0, sub - disc);
    };

    return (
        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">

            {/* FORMULÁRIO */}
            <div className="w-full space-y-6">
                
                {/* 1. EMISSOR */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                    <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                            Dados da Sua Empresa (Emissor)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                         <div className="space-y-4">
                            <div>
                                <Label className="dark:text-slate-300">Sua Logo</Label>
                                <div className="flex items-center gap-4 mt-2">
                                    {logo && (
                                         <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden relative group">
                                             {/* eslint-disable-next-line @next/next/no-img-element */}
                                             <img src={logo} alt="Preview" className="max-w-full max-h-full object-contain"/>
                                             <button onClick={() => setLogo(null)} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                 <Trash2 size={16}/>
                                             </button>
                                        </div>
                                    )}
                                    <div className="relative">
                                        <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                        <Button variant="outline" size="sm" asChild className="cursor-pointer border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                                            <label htmlFor="logo-upload">
                                                <Upload size={14} className="mr-2"/> {logo ? 'Trocar Logo' : 'Enviar Logo'}
                                            </label>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Nome / Razão Social</Label>
                                <Input placeholder="Sua Empresa Ltda" value={issuerName} onChange={e => setIssuerName(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                            </div>
                         </div>
                         <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">CNPJ / CPF {(!isIssuerDocValid && issuerDoc) && <span className="text-red-500 text-xs ml-2">(Inválido)</span>}</Label>
                                <Input 
                                    placeholder="00.000.000/0001-00" 
                                    value={issuerDoc} 
                                    onChange={handleDocChange(setIssuerDoc)} 
                                    className={`${(!isIssuerDocValid && issuerDoc) ? "border-red-300 focus-visible:ring-red-200" : "dark:border-slate-700"} dark:bg-slate-800 dark:text-white`}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Telefone / Contato</Label>
                                <Input 
                                    placeholder="(11) 99999-9999" 
                                    value={issuerPhone} 
                                    onChange={handlePhoneChange(setIssuerPhone)} 
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Endereço Completo</Label>
                                <Input placeholder="Rua Exemplo, 123 - Cidade/UF" value={issuerAddress} onChange={e => setIssuerAddress(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                            </div>
                         </div>
                    </CardContent>
                </Card>

                {/* 2. CLIENTE E DETALHES */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                                Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Nome do Cliente</Label>
                                <Input placeholder="João da Silva" value={clientName} onChange={e => setClientName(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">CPF / CNPJ {(!isClientDocValid && clientDoc) && <span className="text-red-500 text-xs ml-2">(Inválido)</span>}</Label>
                                <Input 
                                    placeholder="Documento do cliente" 
                                    value={clientDoc} 
                                    onChange={handleDocChange(setClientDoc)}
                                    className={`${(!isClientDocValid && clientDoc) ? "border-red-300 focus-visible:ring-red-200" : "dark:border-slate-700"} dark:bg-slate-800 dark:text-white`}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Telefone / WhatsApp</Label>
                                <Input 
                                    placeholder="(11) 99999-9999" 
                                    value={clientContact} 
                                    onChange={handlePhoneChange(setClientContact)} 
                                    className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Endereço</Label>
                                <Input placeholder="Endereço do cliente" value={clientAddress} onChange={e => setClientAddress(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                                Detalhes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                            <div className="space-y-2">
                                <Label className="dark:text-slate-300">Número do Orçamento</Label>
                                <Input value={budgetNumber} onChange={e => setBudgetNumber(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label className="dark:text-slate-300">Data de Emissão</Label>
                                    <Input value={budgetDate} onChange={e => setBudgetDate(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-slate-300">Data de Validade</Label>
                                    <Input value={budgetValidity} onChange={e => setBudgetValidity(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. ITENS */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                     <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
                            Itens e Serviços
                        </CardTitle>
                        <Button onClick={addItem} size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                            <Plus size={16} className="mr-2"/> Adicionar Item
                        </Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {items.map((item, index) => (
                            <div key={item.id} className="grid grid-cols-12 gap-3 items-end p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2">
                                <div className="col-span-12 md:col-span-6 space-y-2">
                                    <Label className="text-xs text-slate-500 dark:text-slate-400">Descrição</Label>
                                    <Input 
                                        value={item.description} 
                                        onChange={e => updateItem(item.id, 'description', e.target.value)} 
                                        placeholder={`Item ${index + 1}`}
                                        className="bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-white"
                                    />
                                </div>
                                <div className="col-span-4 md:col-span-2 space-y-2">
                                    <Label className="text-xs text-slate-500 dark:text-slate-400">Qtd</Label>
                                    <Input 
                                        type="number"
                                        min="1"
                                        value={item.quantity} 
                                        onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))} 
                                        className="bg-white dark:bg-slate-900 dark:border-slate-600 text-center dark:text-white"
                                    />
                                </div>
                                <div className="col-span-6 md:col-span-3 space-y-2">
                                    <Label className="text-xs text-slate-500 dark:text-slate-400">Preço Unit.</Label>
                                    <Input 
                                        type="text"
                                        inputMode="numeric"
                                        value={formatCurrencyInput(item.price)} 
                                        onChange={e => updateItem(item.id, 'price', parseCurrency(e.target.value))} 
                                        className="bg-white dark:bg-slate-900 dark:border-slate-600 text-right dark:text-white font-mono"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1 flex justify-center">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                        disabled={items.length === 1}
                                    >
                                        <Trash2 size={18}/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 4. PAGAMENTO E TOTALIZADORES */}
                <div className="grid md:grid-cols-2 gap-6">
                     <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                        <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                            <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <div className="w-1 h-6 bg-teal-600 rounded-full"></div>
                                Pagamento e Desconto
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="dark:text-slate-300">Forma de Pagamento</Label>
                                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pix">Pix</SelectItem>
                                            <SelectItem value="Boleto Bancário">Boleto Bancário</SelectItem>
                                            <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                                            <SelectItem value="Transferência">Transferência</SelectItem>
                                            <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                                            <SelectItem value="A Combinar">A Combinar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="dark:text-slate-300">Anotações (Opcional)</Label>
                                    <Input placeholder="Ex: Parcelado em 3x" value={paymentNotes} onChange={e => setPaymentNotes(e.target.value)} className="dark:bg-slate-800 dark:border-slate-700 dark:text-white" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <Label className="mb-2 block dark:text-slate-300">Aplicar Desconto</Label>
                                <div className="flex gap-2">
                                    <div className="w-1/3">
                                        <Select value={discountType} onValueChange={(v: any) => setDiscountType(v)}>
                                            <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="fixed">R$ Fixo</SelectItem>
                                                <SelectItem value="percentage">% Porcentagem</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex-1">
                                        <Input 
                                            type={discountType === 'percentage' ? "number" : "text"} 
                                            min="0"
                                            inputMode="numeric" 
                                            value={discountType === 'percentage' ? discountValue : formatCurrencyInput(discountValue)} 
                                            onChange={e => setDiscountValue(discountType === 'percentage' ? Number(e.target.value) : parseCurrency(e.target.value))}
                                            placeholder="Valor" 
                                            className="dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-slate-50 dark:bg-slate-800/50">
                        <CardContent className="p-6 flex flex-col justify-center h-full space-y-3">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>Subtotal</span>
                                <span>{formatCurrency(calculateSubtotal())}</span>
                            </div>
                            <div className="flex justify-between text-red-500 font-medium">
                                <span>Desconto</span>
                                <span>- {formatCurrency(discountType === 'percentage' ? calculateSubtotal() * (discountValue/100) : discountValue)}</span>
                            </div>
                            <div className="border-t border-slate-300 dark:border-slate-600 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-slate-800 dark:text-white">Total Final</span>
                                <span className="text-3xl font-black text-slate-900 bg-white px-3 py-1 rounded shadow-sm border border-slate-200">
                                    {formatCurrency(calculateTotal())}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 5. TERMOS */}
                <Card className="border-0 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900">
                     <CardHeader className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <CardTitle className="text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <div className="w-1 h-6 bg-slate-400 rounded-full"></div>
                            Termos e Condições
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <Textarea 
                            value={terms} 
                            onChange={e => setTerms(e.target.value)} 
                            className="min-h-[100px] dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                            placeholder="Descreva as condições de pagamento, validade, prazos..."
                        />
                    </CardContent>
                </Card>

                {/* --- ACTION BUTTONS --- */}
                <div className="flex gap-4 sticky bottom-4 z-50 bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl shadow-xl backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 max-w-2xl mx-auto">
                    <Button variant="outline" size="lg" onClick={scrollToPreview} className="flex-1 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
                        <ArrowDown size={20} className="mr-2"/> Ver Preview
                    </Button>
                    <Button 
                        size="lg" 
                        onClick={() => handlePrint()} 
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold shadow-green-200 shadow-lg"
                    >
                        <Printer size={20} className="mr-2"/> Imprimir / Salvar PDF
                    </Button>
                </div>

            </div>

             {/* --- PREVIEW ÁREA --- */}
            <div ref={previewRef} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 flex flex-col items-center relative group shadow-inner">
                
                <div className="absolute top-4 right-4 z-20">
                    <Button 
                        onClick={() => setIsZoomed(true)} 
                        variant="secondary" 
                        size="sm" 
                        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                        <Maximize2 size={16} className="mr-2"/> Ampliar
                    </Button>
                </div>

                <div 
                    onClick={() => setIsZoomed(true)}
                    className="cursor-zoom-in w-full flex justify-center overflow-y-auto overflow-x-hidden h-[400px] sm:h-[600px] md:h-[750px] lg:h-[850px] transition-all duration-300 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 pr-2 pb-2"
                >
                    <div className="bg-white shadow-2xl origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 select-none pb-0 mb-0" style={{ width: '210mm', minHeight: '297mm' }}>
                        <div ref={printRef} className="print-page-container h-full">
                            <BudgetTemplate data={budgetData} />
                        </div>
                    </div>
                </div>

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 sm:hidden">
                    <Maximize2 size={12}/> Toque na imagem para ampliar
                </p>
            </div>

            {/* --- MODAL ZOOM --- */}
            {isZoomed && (
                <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsZoomed(false)}>
                    <div className="relative w-full max-w-5xl h-[90vh] overflow-hidden bg-slate-200 dark:bg-slate-900 rounded-lg shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-10">
                            <h3 className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <FileText size={18}/> Visualização do Orçamento
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsZoomed(false)} className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <X size={20}/>
                            </Button>
                        </div>
                        
                        <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-slate-100 dark:bg-slate-900/50">
                            <div className="bg-white shadow-2xl scale-[0.5] sm:scale-[0.7] md:scale-100 origin-top" style={{ width: '210mm', minHeight: '297mm' }}>
                                <div className="print-page-container h-full">
                                    <BudgetTemplate data={budgetData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
