"use client";
import { formatCurrencyInput, parseCurrency, formatCPF, formatCNPJ, formatPhone } from "@/utils/masks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Save, Trash2, Printer, Plus, Info, Wallet, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toaster";

interface SavedKey {
  id: string;
  alias: string;
  key: string;
  name: string;
  city: string;
}

interface Props {
  initialKey?: string;
  initialName?: string;
  initialCity?: string;
  initialAmount?: number;
  initialTxid?: string;
}

export default function PixGenerator({ 
  initialKey = "", 
  initialName = "", 
  initialCity = "", 
  initialAmount = 0, 
  initialTxid = "" 
}: Props) {
  const { toast } = useToast();
  
  // State do Formulário
  const [keyType, setKeyType] = useState("cpf");
  const [key, setKey] = useState(initialKey);
  const [name, setName] = useState(initialName);
  const [city, setCity] = useState(initialCity);
  const [amount, setAmount] = useState(initialAmount);
  const [txid, setTxid] = useState(initialTxid);
  
  // State de App
  const [savedKeys, setSavedKeys] = useState<SavedKey[]>([]);
  const [generatedPayload, setGeneratedPayload] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    const saved = localStorage.getItem("pix_favorites");
    if (saved) {
      try {
        setSavedKeys(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar favoritos", e);
      }
    }
  }, []);

  // Generate Payload Effect
  useEffect(() => {
    if (key && name && city) {
      const payload = generatePayload();
      setGeneratedPayload(payload);
    } else {
        setGeneratedPayload("");
    }
  }, [key, name, city, amount, txid]);

  // --- LÓGICA DO PAYLOAD PIX (EMV STANDARDS) ---
  const generatePayload = () => {
    const formatField = (id: string, value: string) => {
        const len = value.length.toString().padStart(2, "0");
        return `${id}${len}${value}`;
    };
    
    // Preparar chave baseado no tipo
    let formattedKey = key;
    if (keyType === 'phone') {
        const nums = key.replace(/\D/g, '');
        formattedKey = `+55${nums}`;
    } else if (keyType === 'cpf' || keyType === 'cnpj') {
        formattedKey = key.replace(/\D/g, '');
    } else {
        formattedKey = key.trim();
    }
    const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const nameSanitized = removeAccents(name || "Recebedor").substring(0, 25);
    const citySanitized = removeAccents(city || "SAO PAULO").substring(0, 15);
    const txidSanitized = txid || "***";

    // O valor já vem sanitizado se usarmos number, mas aqui estamos usando string formatada ou number?
    // Vamos assumir que amount é number no state:
    // const amountSanitized = amount.toFixed(2);
    
    // Se o state for number:
    // Se o state for number:
    let payload = "000201"; 
    const gui = "0014br.gov.bcb.pix";
    const keyField = formatField("01", formattedKey);
    
    payload += formatField("26", `${gui}${keyField}`);
    payload += formatField("52", "0000"); 
    payload += formatField("53", "986"); 
    
    if (amount > 0) { 
        payload += formatField("54", amount.toFixed(2)); 
    }
    
    payload += formatField("58", "BR"); 
    payload += formatField("59", nameSanitized.toUpperCase()); 
    payload += formatField("60", citySanitized.toUpperCase()); 
    payload += formatField("62", formatField("05", txidSanitized));
    payload += "6304"; 

    // CRC16
    const crc16 = (str: string) => {
        let crc = 0xFFFF;
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;
            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) crc = (crc << 1) ^ 0x1021;
                else crc = crc << 1;
            }
        }
        return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
    };

    return payload + crc16(payload);
  };

  const handleSaveKey = () => {
    if (!key || !name) return;
    const alias = prompt("Dê um nome para esta chave (ex: Aluguel, Mesada):");
    if (!alias) return;

    const newKey: SavedKey = { 
        id: Date.now().toString(), 
        alias, 
        key, 
        name, 
        city 
    };
    
    const updated = [...savedKeys, newKey];
    setSavedKeys(updated);
    localStorage.setItem("pix_favorites", JSON.stringify(updated));
    toast({ title: "Chave Salva!", description: `Agora você pode carregar "${alias}" rapidamente.` });
  };

  const loadKey = (k: SavedKey) => {
    setKey(k.key);
    setName(k.name);
    setCity(k.city);
    toast({ title: "Carregado!", description: `Dados de ${k.alias} preenchidos.` });
  };

  const handleTypeChange = (type: string) => {
      setKeyType(type);
      setKey("");
  };

  const handleKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (keyType === 'cpf') v = formatCPF(v);
      if (keyType === 'cnpj') v = formatCNPJ(v);
      if (keyType === 'phone') v = formatPhone(v);
      setKey(v);
  };

  const deleteKey = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedKeys.filter(k => k.id !== id);
    setSavedKeys(updated);
    localStorage.setItem("pix_favorites", JSON.stringify(updated));
  };

  const copyPayload = () => {
     if(!generatedPayload) return;
     navigator.clipboard.writeText(generatedPayload);
     setIsCopied(true);
     setTimeout(() => setIsCopied(false), 2000);
     toast({ title: "Copiado!", description: "Código Pix Copia e Cola na área de transferência." });
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 w-full font-sans max-w-full">
      
      {/* --- FORMULÁRIO (ESQUERDA) --- */}
      <div className="lg:col-span-7 space-y-6 w-full min-w-0">
        
        {/* MEUS FAVORITOS */}
        {savedKeys.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {savedKeys.map(k => (
                    <div key={k.id} onClick={() => loadKey(k)} className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 p-3 rounded-xl cursor-pointer transition-all shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <Wallet size={16} className="text-emerald-600 dark:text-emerald-400"/>
                            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate">{k.alias}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{k.key}</p>
                        <button onClick={(e) => deleteKey(k.id, e)} className="absolute top-2 right-2 text-slate-300 dark:text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={14}/>
                        </button>
                    </div>
                ))}
            </div>
        )}

        <Card className="border-0 shadow-lg shadow-emerald-100/50 dark:shadow-none ring-1 ring-emerald-100 dark:ring-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
             <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
                <CardTitle className="text-xl flex items-center gap-3">
                   Configurar Cobrança
                </CardTitle>
                <CardDescription className="text-emerald-50">
                    Gere QR Codes estáticos e ilimitados. O dinheiro cai na hora.
                </CardDescription>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="flex justify-between dark:text-slate-300">
                            Chave Pix * 
                            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">CPF, CNPJ, Email, Tel ou Aleatória</span>
                        </Label>
                        <div className="flex gap-2">
                             <Select value={keyType} onValueChange={handleTypeChange}>
                                <SelectTrigger className="w-[130px] h-12 border-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                                    <SelectValue placeholder="Tipo"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cpf">CPF</SelectItem>
                                    <SelectItem value="cnpj">CNPJ</SelectItem>
                                    <SelectItem value="email">E-mail</SelectItem>
                                    <SelectItem value="phone">Celular</SelectItem>
                                    <SelectItem value="random">Aleatória</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input 
                                placeholder={
                                    keyType === 'cpf' ? "000.000.000-00" : 
                                    keyType === 'cnpj' ? "00.000.000/0000-00" :
                                    keyType === 'phone' ? "(00) 00000-0000" :
                                    keyType === 'email' ? "exemplo@email.com" : "Chave aleatória"
                                }
                                value={key} 
                                onChange={handleKeyInput} 
                                className="h-12 text-lg border-emerald-100 dark:border-slate-700 focus:border-emerald-500 bg-emerald-50/30 dark:bg-slate-800 dark:text-white flex-1"
                            />
                            {key && name && (
                                <Button variant="outline" onClick={handleSaveKey} title="Salvar para depois" className="dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                                    <Save size={18} className="text-emerald-600 dark:text-emerald-400"/>
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Nome do Recebedor *</Label>
                            <Input placeholder="Seu Nome ou da Loja" value={name} onChange={(e) => setName(e.target.value)} className="h-11 dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Cidade do Recebedor *</Label>
                            <Input placeholder="Sua Cidade (sem acentos)" value={city} onChange={(e) => setCity(e.target.value)} className="h-11 dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-y-2">
                            <Label className="text-emerald-700 dark:text-emerald-400 font-bold">Valor (R$) - Opcional</Label>
                            <div className="relative">
                                {/* <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">R$</span> */}
                                <Input 
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="0,00" 
                                    value={formatCurrencyInput(amount)} 
                                    onChange={(e) => setAmount(parseCurrency(e.target.value))} 
                                    className="h-12 font-bold text-lg text-emerald-700 dark:text-emerald-400 placeholder:font-normal placeholder:text-slate-400 dark:bg-slate-800 dark:border-slate-700"
                                />
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Deixe 0,00 para quem pagar digitar o valor.</p>
                        </div>
                        <div className="space-y-2">
                            <Label className="dark:text-slate-300">Identificador (TxID) - Opcional</Label>
                            <Input placeholder="Ex: PEDIDO123" value={txid} onChange={(e) => setTxid(e.target.value)} className="h-12 uppercase dark:bg-slate-800 dark:border-slate-700 dark:text-white"/>
                             <p className="text-[10px] text-slate-500 dark:text-slate-400">Código para identificar este pagamento no extrato.</p>
                        </div>
                    </div>

                </div>

             </CardContent>
        </Card>
      </div>

      {/* --- PREVIEW E AÇÃO (DIREITA) --- */}
      <div className="lg:col-span-5 w-full min-w-0">
          <Card className="border-0 shadow-xl shadow-emerald-200/40 dark:shadow-none ring-1 ring-slate-100 dark:ring-slate-800 bg-white dark:bg-slate-900 h-auto lg:sticky lg:top-6">
              <CardContent className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                  
                  {!generatedPayload ? (
                      <div className="text-center space-y-4 opacity-50">
                          <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mx-auto flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                              <Info size={40} className="text-slate-400"/>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Preencha os dados ao lado para gerar o Pix.</p>
                      </div>
                  ) : (
                      <>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                            <QRCodeSVG 
                                value={generatedPayload} 
                                size={220}
                                level="M"
                                imageSettings={{
                                    src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg",
                                    height: 40,
                                    width: 40,
                                    excavate: true
                                }}
                            />
                        </div>

                        <div className="w-full space-y-4">
                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 relative group">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Copia e Cola</p>
                                <p className="font-mono text-xs text-slate-600 dark:text-slate-300 break-all line-clamp-2 pr-8">{generatedPayload}</p>
                                <button 
                                    onClick={copyPayload}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors text-emerald-600 dark:text-emerald-400"
                                >
                                    {isCopied ? <CheckCircle2 size={18}/> : <Copy size={18}/>}
                                </button>
                            </div>

                            <Button onClick={copyPayload} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-200 dark:shadow-none">
                                {isCopied ? "Copiado!" : "Copiar Código Pix"}
                            </Button>
                        </div>
                      </>
                  )}

              </CardContent>
          </Card>
      </div>

    </div>
  );
}
