"use client";

import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  FileText, Printer, DollarSign, 
  MapPin, CalendarDays, ArrowDown, Scissors
} from "lucide-react";

// --- FUNÇÃO AUXILIAR: NÚMERO POR EXTENSO (LÓGICA STRING PURA) ---
const numeroParaExtenso = (valorStr: string): string => {
  if (!valorStr || valorStr === "0,00") return "Zero reais";

  const cleanStr = valorStr.replace(/\./g, ""); 
  const parts = cleanStr.split(",");
  
  const reais = parseInt(parts[0], 10);
  const centavos = parts[1] ? parseInt(parts[1], 10) : 0;

  const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
  const dezes = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  const getGroup = (n: number) => {
    let str = "";
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;

    if (n === 100) return "cem";
    
    if (c > 0) str += centenas[c];

    if (d === 1) {
        if (str) str += " e ";
        str += dezes[u];
    } else {
        if (d > 0) {
            if (str) str += " e ";
            str += dezenas[d];
        }
        if (u > 0) {
            if (str) str += " e ";
            str += unidades[u];
        }
    }
    return str;
  };

  let extenso = "";

  if (reais > 0) {
      if (reais >= 1000000) {
          const milhoes = Math.floor(reais / 1000000);
          const resto = reais % 1000000;
          extenso += getGroup(milhoes) + (milhoes === 1 ? " milhão" : " milhões");
           if (resto > 0) {
              if (resto < 100000) extenso += " e ";
              else extenso += ", ";
              const mil = Math.floor(resto / 1000);
              const restoMil = resto % 1000;
              if (mil > 0) extenso += getGroup(mil) + " mil";
              if (restoMil > 0) extenso += " e " + getGroup(restoMil);
          }
      } else if (reais >= 1000) {
          const mil = Math.floor(reais / 1000);
          const resto = reais % 1000;
          if (mil === 1) extenso += "mil";
          else extenso += getGroup(mil) + " mil";
          
          if (resto > 0) {
              if (resto < 100 || (resto % 100 === 0)) extenso += " e ";
              else extenso += ", ";
              extenso += getGroup(resto);
          }
      } else {
          extenso += getGroup(reais);
      }
      extenso += reais === 1 ? " real" : " reais";
  }

  if (centavos > 0) {
      if (extenso) extenso += " e ";
      extenso += getGroup(centavos) + (centavos === 1 ? " centavo" : " centavos");
  }

  return extenso.charAt(0).toUpperCase() + extenso.slice(1);
};

// --- INTERFACE PARA DADOS INICIAIS (pSEO) ---
interface ReceiptGeneratorProps {
    initialValues?: {
        referente?: string; // Ex: "Aluguel referente ao mês de..."
        valor?: string;
        pagador?: string;
        emissor?: string;
        cidade?: string;
    }
}

// --- COMPONENTE VISUAL DO RECIBO ---
interface ReciboTemplateProps {
  via: string;
  data: {
    valor: string;
    valorExtenso: string;
    pagador: string;
    cpfPagador: string;
    referente: string;
    emissor: string;
    cpfEmissor: string;
    telefone: string;
    cidade: string;
    dataRecibo: string;
  }
}

const ReciboTemplate = ({ via, data }: ReciboTemplateProps) => (
    <div className="border-[2px] border-slate-800 p-6 bg-white text-slate-900 font-serif relative shadow-none w-full h-full flex flex-col justify-between">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <span className="text-8xl font-black transform -rotate-12 select-none">RECIBO</span>
        </div>

        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-3 mb-4 relative z-10">
            <div className="flex flex-col">
                <h2 className="text-3xl font-black tracking-widest text-slate-900 uppercase">Recibo</h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">{via}</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Valor</span>
                <div className="bg-slate-100 border border-slate-300 px-3 py-1.5 rounded">
                    <span className="text-xl font-mono font-bold text-slate-900">
                        R$ {data.valor || "0,00"}
                    </span>
                </div>
            </div>
        </div>

        <div className="space-y-4 text-base leading-relaxed relative z-10 flex-grow">
            <p>
                Recebi(emos) de <span className="font-bold border-b border-slate-400 px-2 inline-block min-w-[50%]">{data.pagador || "_________________________________"}</span> 
                {data.cpfPagador && <span className="text-sm ml-2 text-slate-700 block sm:inline mt-1 sm:mt-0">(Doc: {data.cpfPagador})</span>},
            </p>
            
            <div className="bg-slate-50 p-3 rounded border border-slate-200 text-sm">
                <p className="text-slate-500 uppercase font-bold mb-1 text-[10px]">A importância de:</p>
                <p className="font-bold italic text-slate-800 break-words">
                    {data.valorExtenso || "(Escreva o valor por extenso...)"}
                </p>
            </div>

            <p>
                Referente a <span className="font-bold border-b border-slate-400 px-2 inline-block min-w-[50%]">{data.referente || "Serviços prestados..."}</span>.
            </p>

            <p className="text-sm text-slate-600 mt-2">
                Pelo que firmo(amos) o presente recibo para plena e geral quitação.
            </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-end gap-6 relative z-10">
            <div className="text-sm font-medium space-y-1 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400"/>
                    <span className="border-b border-slate-300 min-w-[100px] inline-block">{data.cidade || "Local"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-slate-400"/>
                    <span className="border-b border-slate-300 min-w-[100px] inline-block">{data.dataRecibo}</span>
                </div>
            </div>
            
            <div className="text-center w-full sm:min-w-[200px]">
                <div className="border-b border-slate-900 mb-1 h-8 w-full"></div>
                <p className="font-bold text-xs uppercase">{data.emissor || "Assinatura"}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{data.cpfEmissor} {data.telefone ? `• ${data.telefone}` : ''}</p>
            </div>
        </div>

        <div className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-sans italic opacity-60">
            Gerado gratuitamente em <strong>mestredascontas.com.br</strong>
        </div>
    </div>
);

export default function ReceiptGenerator({ initialValues }: ReceiptGeneratorProps) {
  // --- STATES ---
  const [valor, setValor] = useState("");
  const [valorExtenso, setValorExtenso] = useState("");
  
  const [pagador, setPagador] = useState("");
  const [cpfPagador, setCpfPagador] = useState("");
  
  const [referente, setReferente] = useState("");
  
  const [emissor, setEmissor] = useState("");
  const [cpfEmissor, setCpfEmissor] = useState("");
  const [telefone, setTelefone] = useState("");
  
  const [cidade, setCidade] = useState("");
  const [dataRecibo, setDataRecibo] = useState("");
  
  const [duasVias, setDuasVias] = useState(true);

  const printRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const dadosRecibo = {
      valor, valorExtenso, pagador, cpfPagador, referente, 
      emissor, cpfEmissor, telefone, cidade, dataRecibo
  };

  // Inicializa data atual e carrega valores do pSEO
  useEffect(() => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    setDataRecibo(`${dia}/${mes}/${ano}`);
    setCidade("São Paulo");
    
    // Carrega dados iniciais se existirem (pSEO)
    if (initialValues) {
        if (initialValues.referente) setReferente(initialValues.referente);
        if (initialValues.valor) setValor(initialValues.valor);
        if (initialValues.pagador) setPagador(initialValues.pagador);
        if (initialValues.emissor) setEmissor(initialValues.emissor);
        if (initialValues.cidade) setCidade(initialValues.cidade);
    }
  }, [initialValues]);

  // Atualiza extenso automaticamente
  useEffect(() => {
    if (!valor || valor === "0,00") {
        setValorExtenso("");
        return;
    }
    setValorExtenso(numeroParaExtenso(valor));
  }, [valor]);

  const scrollToPreview = () => {
      if (previewRef.current) {
          previewRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    v = (Number(v) / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    setValor(v);
  };

  const handleCpfCnpjChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 14) v = v.slice(0, 14);

    if (v.length > 11) {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    setter(v);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length > 5) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
      v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }
    setTelefone(v);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Recibo_${pagador || "Cliente"}`,
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print { 
        body { -webkit-print-color-adjust: exact; }
        .print-page-container {
            width: 210mm;
            height: 296mm;
            padding: 15mm;
            display: flex;
            flex-direction: column;
            justify-content: ${duasVias ? 'space-between' : 'flex-start'};
        }
      }
    `
  });

  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
      
      {/* FORMULÁRIO */}
      <div className="w-full">
        <Card className="border-0 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden ring-1 ring-slate-100">
          <CardHeader className="bg-slate-900 text-white p-6">
            <CardTitle className="text-xl flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                 <FileText size={22} strokeWidth={2.5} />
               </div> 
               Preencher Recibo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-slate-600 font-bold">Valor (R$)</Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                        <Input 
                            value={valor} 
                            onChange={handleValorChange} 
                            className="pl-10 h-11 font-bold text-lg bg-slate-50 focus:bg-white"
                            placeholder="0,00"
                            inputMode="numeric"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600">Data</Label>
                    <Input 
                        value={dataRecibo} 
                        onChange={e => setDataRecibo(e.target.value)} 
                        className="h-11 bg-slate-50 focus:bg-white"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-slate-600">Valor por Extenso</Label>
                <Textarea 
                    placeholder="Ex: Cento e cinquenta reais" 
                    value={valorExtenso} 
                    onChange={e => setValorExtenso(e.target.value)} 
                    className="min-h-[60px] bg-slate-50 focus:bg-white resize-none"
                />
                <p className="text-xs text-slate-400">Preenchido automaticamente, mas você pode editar se precisar.</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
                <Label className="text-slate-600 font-bold">Quem está pagando? (Cliente)</Label>
                <Input placeholder="Nome Completo ou Razão Social" value={pagador} onChange={e => setPagador(e.target.value)} />
                <Input 
                  placeholder="CPF ou CNPJ (Opcional)" 
                  value={cpfPagador} 
                  onChange={(e) => handleCpfCnpjChange(e, setCpfPagador)} 
                  className="mt-2" 
                  maxLength={18}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-slate-600 font-bold">Referente a quê?</Label>
                <Input placeholder="Ex: Aluguel de Maio / Serviço de Pintura" value={referente} onChange={e => setReferente(e.target.value)} />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
                <Label className="text-slate-600 font-bold">Quem recebe? (Emissor)</Label>
                <Input placeholder="Seu Nome ou Empresa" value={emissor} onChange={e => setEmissor(e.target.value)} />
                <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input 
                      placeholder="CPF/CNPJ" 
                      value={cpfEmissor} 
                      onChange={(e) => handleCpfCnpjChange(e, setCpfEmissor)} 
                      maxLength={18}
                    />
                    <Input 
                      placeholder="Telefone" 
                      value={telefone} 
                      onChange={handlePhoneChange}
                      maxLength={15}
                    />
                </div>
                <Input placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} className="mt-2" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2 border-t border-slate-100 mt-4">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 w-full sm:w-auto">
                    <input 
                        type="checkbox" 
                        id="duasVias" 
                        checked={duasVias} 
                        onChange={e => setDuasVias(e.target.checked)} 
                        className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <Label htmlFor="duasVias" className="cursor-pointer font-bold text-blue-800 text-sm">Gerar 2 vias (1 folha)</Label>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" onClick={scrollToPreview} className="flex-1 sm:flex-none border-slate-300 text-slate-600 hover:bg-slate-50">
                        <ArrowDown size={18} className="mr-2"/> Ver Preview
                    </Button>
                    <Button onClick={() => handlePrint()} className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                        <Printer size={18} className="mr-2"/> Imprimir
                    </Button>
                </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* --- PREVIEW --- */}
      <div ref={previewRef} className="w-full bg-slate-100 p-4 md:p-8 rounded-3xl border border-slate-200 flex justify-center">
         <div className="w-full flex justify-center overflow-hidden h-[130mm] sm:h-[180mm] md:h-[240mm] lg:h-[270mm] xl:h-auto transition-all duration-300">
             
             <div className="bg-white shadow-2xl origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100" style={{ width: '210mm', minHeight: '297mm' }}>
                 
                 <div ref={printRef} className="print-page-container flex flex-col justify-between h-full p-[15mm]">
                     
                     <div className="flex-1 flex flex-col">
                        <ReciboTemplate via="1ª Via - Emissor" data={dadosRecibo} />
                     </div>
                     
                     {duasVias && (
                         <>
                            <div className="py-8 flex items-center justify-center gap-4 opacity-50 select-none shrink-0">
                                <Scissors size={16} className="text-slate-400 rotate-180"/>
                                <div className="border-t-2 border-dashed border-slate-300 w-full"></div>
                                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans whitespace-nowrap">Corte Aqui</span>
                                <div className="border-t-2 border-dashed border-slate-300 w-full"></div>
                                <Scissors size={16} className="text-slate-400"/>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <ReciboTemplate via="2ª Via - Cliente" data={dadosRecibo} />
                            </div>
                         </>
                     )}
                 </div>

             </div>
         </div>
      </div>

    </div>
  );
}