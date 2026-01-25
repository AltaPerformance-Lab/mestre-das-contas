"use client";

import React, { useState, useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { 
  Printer, Plus, Trash2, Save, Download, 
  Package, User, DollarSign, MapPin, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";

// --- TYPES ---
type Address = {
  name: string;
  doc: string; // CPF/CNPJ
  address: string;
  city: string;
  state: string;
  cep: string;
};

type Item = {
  id: string;
  description: string;
  quantity: number;
  weight: number; // in kg
  value: number; // in BRL
};

export default function ContentDeclarationGenerator() {
  // --- STATE ---
  const [sender, setSender] = useState<Address>({
    name: "", doc: "", address: "", city: "", state: "", cep: ""
  });

  const [recipient, setRecipient] = useState<Address>({
    name: "", doc: "", address: "", city: "", state: "", cep: ""
  });

  const [items, setItems] = useState<Item[]>([
    { id: "1", description: "", quantity: 1, weight: 0, value: 0 }
  ]);

  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // --- ACTIONS ---
  const addItem = () => {
    setItems([...items, { id: crypto.randomUUID(), description: "", quantity: 1, weight: 0, value: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof Item, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const totalQty = items.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totalWeight = items.reduce((acc, item) => acc + (Number(item.weight) * Number(item.quantity)), 0); // Correios asks for Total Weight
  const totalValue = items.reduce((acc, item) => acc + (Number(item.value) * Number(item.quantity)), 0);

  // --- PRINTING ---
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Declaracao_Conteudo_${recipient.name || 'Correios'}`
  });

  // --- FORMATTERS ---
  const formatCurrency = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <div className="flex flex-col gap-8">
      {/* --- FORMULÁRIO DE ENTRADA --- */}
      <div className="grid lg:grid-cols-2 gap-6 print:hidden">
        
        {/* REMETENTE */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white"><User size={18} className="text-blue-600 dark:text-blue-400"/> Remetente (Quem envia)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="dark:text-slate-300">Nome Completo / Razão Social</Label>
              <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.name} onChange={e => setSender({...sender, name: e.target.value})} placeholder="Seu nome ou da loja" />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div>
                 <Label className="dark:text-slate-300">CPF / CNPJ</Label>
                 <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.doc} onChange={e => setSender({...sender, doc: e.target.value})} placeholder="000.000.000-00" />
               </div>
               <div>
                  <Label className="dark:text-slate-300">CEP</Label>
                  <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.cep} onChange={e => setSender({...sender, cep: e.target.value})} placeholder="00000-000" />
               </div>
            </div>
            <div>
              <Label className="dark:text-slate-300">Endereço Completo</Label>
              <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.address} onChange={e => setSender({...sender, address: e.target.value})} placeholder="Rua, Número, Bairro, Compl." />
            </div>
            <div className="grid grid-cols-3 gap-3">
               <div className="col-span-2">
                 <Label className="dark:text-slate-300">Cidade</Label>
                 <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.city} onChange={e => setSender({...sender, city: e.target.value})} />
               </div>
               <div>
                  <Label className="dark:text-slate-300">UF</Label>
                  <Input className="uppercase dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={sender.state} onChange={e => setSender({...sender, state: e.target.value})} maxLength={2} />
               </div>
            </div>
          </CardContent>
        </Card>

        {/* DESTINATÁRIO */}
        <Card className="dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white"><MapPin size={18} className="text-green-600 dark:text-green-400"/> Destinatário (Quem recebe)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="dark:text-slate-300">Nome Completo / Razão Social</Label>
              <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.name} onChange={e => setRecipient({...recipient, name: e.target.value})} placeholder="Nome do cliente" />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div>
                 <Label className="dark:text-slate-300">CPF / CNPJ</Label>
                 <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.doc} onChange={e => setRecipient({...recipient, doc: e.target.value})} placeholder="000.000.000-00" />
               </div>
               <div>
                  <Label className="dark:text-slate-300">CEP</Label>
                  <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.cep} onChange={e => setRecipient({...recipient, cep: e.target.value})} placeholder="00000-000" />
               </div>
            </div>
            <div>
              <Label className="dark:text-slate-300">Endereço Completo</Label>
              <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.address} onChange={e => setRecipient({...recipient, address: e.target.value})} placeholder="Rua, Número, Bairro, Compl." />
            </div>
            <div className="grid grid-cols-3 gap-3">
               <div className="col-span-2">
                 <Label className="dark:text-slate-300">Cidade</Label>
                 <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.city} onChange={e => setRecipient({...recipient, city: e.target.value})} />
               </div>
               <div>
                  <Label className="dark:text-slate-300">UF</Label>
                  <Input className="uppercase dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={recipient.state} onChange={e => setRecipient({...recipient, state: e.target.value})} maxLength={2} />
               </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ITENS */}
      <Card className="print:hidden dark:bg-slate-900 dark:border-slate-800">
         <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-slate-900 dark:text-white"><Package size={18} className="text-amber-600 dark:text-amber-500"/> Identificação dos Bens (Conteúdo)</CardTitle>
            <Button onClick={addItem} size="sm" variant="outline" className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50 dark:hover:bg-blue-900/20">
               <Plus size={16} className="mr-1"/> Adicionar Item
            </Button>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <Table>
                 <TableHeader>
                   <TableRow className="dark:border-slate-800 dark:hover:bg-slate-800/50">
                     <TableHead className="w-[40%] dark:text-slate-400">Descrição do Conteúdo</TableHead>
                     <TableHead className="w-[15%] text-center dark:text-slate-400">Qtd.</TableHead>
                     <TableHead className="w-[15%] text-center dark:text-slate-400">Peso (kg)</TableHead>
                     <TableHead className="w-[20%] text-right dark:text-slate-400">Valor unit. (R$)</TableHead>
                     <TableHead className="w-[10%]"></TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {items.map((item) => (
                     <TableRow key={item.id} className="dark:border-slate-800 dark:hover:bg-slate-800/50">
                       <TableCell>
                          <Input 
                            className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                            value={item.description} 
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)} 
                            placeholder="Ex: Camiseta, Livro..."
                          />
                       </TableCell>
                       <TableCell>
                          <Input 
                            type="number" 
                            min="1"
                            className="text-center dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                            value={item.quantity} 
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} 
                          />
                       </TableCell>
                       <TableCell>
                          <div className="relative">
                            <Input 
                                type="number" 
                                min="0" 
                                step="0.1"
                                className="pl-2 pr-6 text-center dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                                value={item.weight} 
                                onChange={(e) => updateItem(item.id, 'weight', Number(e.target.value))} 
                            />
                            <span className="absolute right-2 top-2.5 text-xs text-slate-400">kg</span>
                          </div>
                       </TableCell>
                       <TableCell>
                            <div className="relative">
                                <span className="absolute left-2 top-2.5 text-xs text-slate-500">R$</span>
                                <Input 
                                    type="number" 
                                    min="0"
                                    step="0.01" 
                                    className="pl-7 text-right dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100"
                                    value={item.value} 
                                    onChange={(e) => updateItem(item.id, 'value', Number(e.target.value))} 
                                />
                            </div>
                       </TableCell>
                       <TableCell className="text-center">
                          {items.length > 1 && (
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <Trash2 size={16}/>
                            </Button>
                          )}
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
            </div>
            
            <div className="mt-4 flex justify-end gap-6 text-sm font-medium p-4 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800">
               <div className="dark:text-slate-300">Total Itens: <span className="text-slate-900 dark:text-white font-bold">{totalQty}</span></div>
               <div className="dark:text-slate-300">Peso Total: <span className="text-slate-900 dark:text-white font-bold">{totalWeight.toFixed(3)} kg</span></div>
               <div className="dark:text-slate-300">Valor Total: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{formatCurrency(totalValue)}</span></div>
            </div>
         </CardContent>
      </Card>

      {/* AÇÕES */}
      <div className="flex justify-center gap-4 print:hidden p-4 sticky bottom-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-slate-200 dark:border-slate-800 z-20">
         <Button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-lg shadow-blue-200 dark:shadow-none">
            <Printer size={20} className="mr-2"/> Imprimir Declaração
         </Button>
      </div>


      {/* --- MODELO DE IMPRESSÃO (CORREIOS OFFICIAL LAYOUT) --- */}
      {/* Este bloco só aparece na impressão ou preview */}
      <div className="hidden print:block font-sans text-black bg-white p-0 m-0 print:m-0 w-full max-w-[210mm] mx-auto" ref={componentRef}>
         
         {/* CABEÇALHO */}
         <div className="text-center border-b-2 border-black pb-2 mb-4">
            <h1 className="text-xl font-bold uppercase">Declaração de Conteúdo</h1>
            <p className="text-[10px] mt-1 text-gray-600">
               (Anexo à encomenda - Não substitui Nota Fiscal - Válido apenas para transporte de bens entre não contribuintes de ICMS)
            </p>
         </div>

         {/* REMETENTE E DESTINATÁRIO (Lado a Lado) */}
         <div className="grid grid-cols-2 gap-4 mb-4 border border-black p-2">
            
            {/* REMETENTE */}
            <div className="border-r border-black pr-2">
               <h3 className="font-bold text-sm uppercase bg-gray-200 px-1 mb-2">Remetente</h3>
               <div className="text-xs space-y-1">
                  <p><span className="font-bold">Nome:</span> {sender.name}</p>
                  <p><span className="font-bold">CPF/CNPJ:</span> {sender.doc}</p>
                  <p><span className="font-bold">Endereço:</span> {sender.address}</p>
                  <p><span className="font-bold">Cidade/UF:</span> {sender.city}/{sender.state}</p>
                  <p><span className="font-bold">CEP:</span> {sender.cep}</p>
               </div>
            </div>

            {/* DESTINATÁRIO */}
            <div className="pl-2">
               <h3 className="font-bold text-sm uppercase bg-gray-200 px-1 mb-2">Destinatário</h3>
               <div className="text-xs space-y-1">
                  <p><span className="font-bold">Nome:</span> {recipient.name}</p>
                  <p><span className="font-bold">CPF/CNPJ:</span> {recipient.doc}</p>
                  <p><span className="font-bold">Endereço:</span> {recipient.address}</p>
                  <p><span className="font-bold">Cidade/UF:</span> {recipient.city}/{recipient.state}</p>
                  <p><span className="font-bold">CEP:</span> {recipient.cep}</p>
               </div>
            </div>
         </div>

         {/* ITENS */}
         <div className="mb-4">
            <h3 className="font-bold text-sm uppercase bg-gray-200 px-1 border border-black border-b-0">Identificação dos Bens</h3>
            <table className="w-full text-xs border border-black border-collapse">
               <thead>
                  <tr className="bg-gray-100">
                     <th className="border border-black p-1 w-[10%]">Item</th>
                     <th className="border border-black p-1 w-[50%]">Conteúdo</th>
                     <th className="border border-black p-1 w-[10%]">Quant.</th>
                     <th className="border border-black p-1 w-[15%]">Valor (R$)</th>
                  </tr>
               </thead>
               <tbody>
                  {items.map((item, idx) => (
                     <tr key={item.id}>
                        <td className="border border-black p-1 text-center">{idx + 1}</td>
                        <td className="border border-black p-1">{item.description}</td>
                        <td className="border border-black p-1 text-center">{item.quantity}</td>
                        <td className="border border-black p-1 text-right">{item.value.toFixed(2)}</td>
                     </tr>
                  ))}
                  {/* Linhas vazias para preencher se tiver poucos itens */}
                  {Array.from({ length: Math.max(0, 5 - items.length) }).map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td className="border border-black p-1 text-center">&nbsp;</td>
                        <td className="border border-black p-1">&nbsp;</td>
                        <td className="border border-black p-1">&nbsp;</td>
                        <td className="border border-black p-1">&nbsp;</td>
                      </tr>
                  ))}
               </tbody>
               <tfoot>
                  <tr className="bg-gray-100 font-bold">
                     <td colSpan={2} className="border border-black p-1 text-right uppercase">Totais</td>
                     <td className="border border-black p-1 text-center">{totalQty}</td>
                     <td className="border border-black p-1 text-right">{totalValue.toFixed(2)}</td>
                  </tr>
                  <tr>
                     <td colSpan={4} className="border border-black p-1">
                        <span className="font-bold mr-2">Peso Total (kg):</span> {totalWeight.toFixed(3)}
                     </td>
                  </tr>
               </tfoot>
            </table>
         </div>

         {/* DECLARAÇÃO LEGAL */}
         <div className="border border-black p-2 text-[10px] text-justify mb-4 leading-tight">
            <h3 className="font-bold text-xs uppercase mb-1 text-center">Declaração</h3>
            <p>
               Declaro que não me enquadro no conceito de contribuinte habitual do ICMS, razão pela qual não possuo Inscrição Estadual. 
               Declaro ainda, sob as penas da lei, que o conteúdo da encomenda é composto pelos bens discriminados acima, 
               sendo a expressão da verdade.
            </p>
         </div>

         {/* ASSINATURA */}
         <div className="flex gap-4 items-end mt-8">
             <div className="flex-1 text-center">
                 <div className="border-b border-black mb-1 mx-4">
                     {sender.city && sender.state ? `${sender.city}/${sender.state}` : '______________________'}, {new Date().toLocaleDateString('pt-BR')}
                 </div>
                 <p className="text-xs">Local e Data</p>
             </div>
             <div className="flex-1 text-center">
                 <div className="border-b border-black mb-1 mx-4 h-6"></div>
                 <p className="text-xs font-bold uppercase">Assinatura do Remetente/Declarante</p>
             </div>
         </div>

         {/* RODAPÉ */}
         <div className="mt-8 text-[9px] text-center text-gray-500 border-t pt-2">
            Gerado gratuitamente por <strong>Mestre das Contas</strong> - www.mestredascontas.com.br
         </div>

      </div>
    </div>
  );
}
