"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  QrCode, Download, Settings2, Link as LinkIcon, 
  Type, Wifi, Palette, Image as ImageIcon, Mail, MessageCircle, Contact, Printer, DollarSign, 
} from "lucide-react";

// --- TIPAGEM ---
type QRLevel = "L" | "M" | "Q" | "H";

// --- PROPS PARA PSEO ---
interface QRCodeGeneratorProps {
    initialType?: string; // 'pix', 'link', 'wifi', etc.
    initialValues?: {
        pixKey?: string;
        pixName?: string;
        pixCity?: string;
        pixAmount?: string;
        pixId?: string;
        url?: string;
        // adicione outros se necessário para pSEO
    };
}

// --- FUNÇÃO AUXILIAR: GERADOR DE PAYLOAD PIX (EMV QRCPS) ---
const generatePixPayload = (key: string, name: string, city: string, amount: string, txid: string) => {
    if (!key) return "";

    const formatField = (id: string, value: string) => {
        const len = value.length.toString().padStart(2, "0");
        return `${id}${len}${value}`;
    };

    const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const nameSanitized = removeAccents(name || "Recebedor").substring(0, 25);
    const citySanitized = removeAccents(city || "Cidade").substring(0, 15);
    const txidSanitized = txid || "***"; // *** é o padrão para "qualquer transação" se vazio
    const amountSanitized = amount.replace(",", ".");

    let payload = "000201"; // Payload Format Indicator
    
    // Merchant Account Information (GUI + Chave)
    const gui = "0014br.gov.bcb.pix";
    const keyField = formatField("01", key);
    payload += formatField("26", `${gui}${keyField}`);

    payload += formatField("52", "0000"); // Merchant Category Code
    payload += formatField("53", "986"); // Transaction Currency (BRL)
    
    if (parseFloat(amountSanitized) > 0) {
        payload += formatField("54", amountSanitized); // Transaction Amount
    }

    payload += formatField("58", "BR"); // Country Code
    payload += formatField("59", nameSanitized); // Merchant Name
    payload += formatField("60", citySanitized); // Merchant City
    
    // Additional Data Field Template (TxID)
    payload += formatField("62", formatField("05", txidSanitized));

    // CRC16 Calculation
    payload += "6304"; // ID do CRC + tamanho
    
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

export default function QRCodeGenerator({ initialType, initialValues }: QRCodeGeneratorProps) {
  // --- ESTADOS GERAIS ---
  const [activeTab, setActiveTab] = useState("link");
  const [qrValue, setQrValue] = useState("https://mestredascontas.com.br");
  const [printTitle, setPrintTitle] = useState("Escaneie aqui");

  // --- DADOS ESPECÍFICOS ---
  // Pix
  const [pixKey, setPixKey] = useState("");
  const [pixName, setPixName] = useState("");
  const [pixCity, setPixCity] = useState("");
  const [pixAmount, setPixAmount] = useState("");
  const [pixId, setPixId] = useState("");

  // Outros
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiType, setWifiType] = useState("WPA");
  const [emailTo, setEmailTo] = useState("");
  const [emailSub, setEmailSub] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [whatsNum, setWhatsNum] = useState("");
  const [whatsMsg, setWhatsMsg] = useState("");
  const [vcardName, setVcardName] = useState("");
  const [vcardPhone, setVcardPhone] = useState("");
  const [vcardEmail, setVcardEmail] = useState("");

  // --- PERSONALIZAÇÃO ---
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [level, setLevel] = useState<QRLevel>("H"); 
  const [includeMargin, setIncludeMargin] = useState(true);
  
  const [incluirLogo, setIncluirLogo] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/icon"); 

  // --- REFERÊNCIAS ---
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // --- EFEITO pSEO (Inicialização) ---
  useEffect(() => {
    if (initialType) {
        setActiveTab(initialType);
        if (initialType === "pix" && initialValues) {
            setPixKey(initialValues.pixKey || "");
            setPixName(initialValues.pixName || "");
            setPixCity(initialValues.pixCity || "");
            setPixAmount(initialValues.pixAmount || "");
            setPixId(initialValues.pixId || "");
            setPrintTitle("Pague com Pix");
            setIncluirLogo(true); // Pix fica legal com logo
        } else if (initialType === "link" && initialValues?.url) {
            setQrValue(initialValues.url);
        }
    }
  }, [initialType, initialValues]);

  // --- IMPRESSÃO ---
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "QRCode_MestreDasContas",
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print { 
        body, html { height: 100%; margin: 0; }
        .print-page {
            display: flex !important;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100%;
            padding: 20px;
        }
        .print-moldura {
            page-break-inside: avoid;
        }
      }
    `
  });

  // --- LÓGICA DE GERAÇÃO FINAL ---
  const getFinalValue = () => {
      switch (activeTab) {
          case "pix":
              return generatePixPayload(pixKey, pixName, pixCity, pixAmount, pixId);
          case "wifi": return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
          case "email": return `mailto:${emailTo}?subject=${encodeURIComponent(emailSub)}&body=${encodeURIComponent(emailBody)}`;
          case "whatsapp": return `https://wa.me/${whatsNum.replace(/\D/g, "")}?text=${encodeURIComponent(whatsMsg)}`;
          case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
          default: return qrValue || "https://mestredascontas.com.br";
      }
  };

  // --- DOWNLOAD ---
  const download = (format: "png" | "svg") => {
    if (format === "png") {
        const canvas = canvasRef.current?.querySelector("canvas");
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.download = `qrcode-${activeTab}.png`;
            link.href = url;
            link.click();
        }
    } else {
        const svg = svgRef.current?.querySelector("svg");
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.download = `qrcode-${activeTab}.svg`;
            link.href = url;
            link.click();
        }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: (val: string) => void) => {
    setter(e.target.value);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 w-full font-sans">
      
      {/* --- ESQUERDA: CONFIGURAÇÃO --- */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-0 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200 bg-white overflow-hidden">
          <CardHeader className="bg-slate-900 text-white p-6">
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg"><Settings2 size={20}/></div>
              Criar QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); if(val !== 'pix') setQrValue(""); }} className="w-full">
              <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                  <TabsList className="flex w-max h-auto p-1 bg-slate-100/50 space-x-1">
                    <TabsTrigger value="link" className="flex-col gap-1 py-2 px-4 h-16 w-20"><LinkIcon size={18}/> <span className="text-[10px]">Link</span></TabsTrigger>
                    <TabsTrigger value="pix" className="flex-col gap-1 py-2 px-4 h-16 w-20"><DollarSign size={18}/> <span className="text-[10px]">Pix</span></TabsTrigger>
                    <TabsTrigger value="whatsapp" className="flex-col gap-1 py-2 px-4 h-16 w-20"><MessageCircle size={18}/> <span className="text-[10px]">Whats</span></TabsTrigger>
                    <TabsTrigger value="wifi" className="flex-col gap-1 py-2 px-4 h-16 w-20"><Wifi size={18}/> <span className="text-[10px]">Wi-Fi</span></TabsTrigger>
                    <TabsTrigger value="vcard" className="flex-col gap-1 py-2 px-4 h-16 w-20"><Contact size={18}/> <span className="text-[10px]">Contato</span></TabsTrigger>
                    <TabsTrigger value="texto" className="flex-col gap-1 py-2 px-4 h-16 w-20"><Type size={18}/> <span className="text-[10px]">Texto</span></TabsTrigger>
                    <TabsTrigger value="email" className="flex-col gap-1 py-2 px-4 h-16 w-20"><Mail size={18}/> <span className="text-[10px]">E-mail</span></TabsTrigger>
                  </TabsList>
              </div>

              <div className="mt-6 min-h-[150px]">
                  
                  {/* --- ABA PIX (NOVA) --- */}
                  <TabsContent value="pix" className="space-y-4 animate-in fade-in">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800 mb-4 flex gap-2">
                        <DollarSign size={18} className="shrink-0"/>
                        <p>Gere um QR Code estático para receber pagamentos instantâneos. Funciona para qualquer banco.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Chave Pix (CPF, E-mail, Celular ou Aleatória) *</Label>
                        <Input placeholder="Ex: 123.456.789-00" value={pixKey} onChange={(e) => handleChange(e, setPixKey)} className="h-12 text-lg font-medium"/>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nome do Recebedor *</Label>
                            <Input placeholder="Seu Nome ou Empresa" value={pixName} onChange={(e) => handleChange(e, setPixName)} className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Cidade *</Label>
                            <Input placeholder="Sua Cidade" value={pixCity} onChange={(e) => handleChange(e, setPixCity)} className="h-12"/>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Valor (Opcional)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                                <Input placeholder="0,00" value={pixAmount} onChange={(e) => handleChange(e, setPixAmount)} className="h-12 pl-10"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Código da Transação (TxID)</Label>
                            <Input placeholder="LOJA01 (Opcional)" value={pixId} onChange={(e) => handleChange(e, setPixId)} className="h-12"/>
                        </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="link" className="space-y-3 animate-in fade-in">
                    <Label>Cole o Link (URL)</Label>
                    <Input placeholder="https://seu-site.com.br" value={qrValue} onChange={(e) => handleChange(e, setQrValue)} className="h-12 text-lg"/>
                  </TabsContent>

                  <TabsContent value="texto" className="space-y-3 animate-in fade-in">
                    <Label>Mensagem de Texto</Label>
                    <Textarea placeholder="Digite sua mensagem aqui..." value={qrValue} onChange={(e) => handleChange(e, setQrValue)} className="text-lg" rows={4}/>
                  </TabsContent>

                  <TabsContent value="whatsapp" className="space-y-3 animate-in fade-in">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Seu WhatsApp (com DDD)</Label>
                            <Input placeholder="5511999999999" value={whatsNum} onChange={(e) => handleChange(e, setWhatsNum)} className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Mensagem Automática</Label>
                            <Input placeholder="Olá, vi o QR Code!" value={whatsMsg} onChange={(e) => handleChange(e, setWhatsMsg)} className="h-12"/>
                        </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="wifi" className="space-y-3 animate-in fade-in">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nome da Rede (SSID)</Label>
                            <Input placeholder="Wi-Fi Clientes" value={wifiSsid} onChange={(e) => handleChange(e, setWifiSsid)} className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>Senha do Wi-Fi</Label>
                            <Input placeholder="senha123" value={wifiPass} onChange={(e) => handleChange(e, setWifiPass)} className="h-12"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Segurança</Label>
                        <Select value={wifiType} onValueChange={setWifiType}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="WPA">WPA/WPA2 (Padrão)</SelectItem>
                                <SelectItem value="nopass">Rede Aberta</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="vcard" className="space-y-3 animate-in fade-in">
                    <Label>Nome do Contato</Label>
                    <Input placeholder="Dr. João Silva" value={vcardName} onChange={(e) => handleChange(e, setVcardName)} className="h-12"/>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Telefone</Label>
                            <Input placeholder="(11) 99999-9999" value={vcardPhone} onChange={(e) => handleChange(e, setVcardPhone)} className="h-12"/>
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail</Label>
                            <Input placeholder="contato@email.com" value={vcardEmail} onChange={(e) => handleChange(e, setVcardEmail)} className="h-12"/>
                        </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-3 animate-in fade-in">
                    <Label>Destinatário</Label>
                    <Input placeholder="suporte@empresa.com" value={emailTo} onChange={(e) => handleChange(e, setEmailTo)} className="h-12"/>
                    <Label>Assunto</Label>
                    <Input placeholder="Solicitação de Orçamento" value={emailSub} onChange={(e) => handleChange(e, setEmailSub)} className="h-12"/>
                  </TabsContent>
              </div>
            </Tabs>

            {/* OPÇÕES AVANÇADAS */}
            <div className="border-t border-slate-100 pt-6 mt-6">
                <h4 className="font-bold text-slate-700 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
                    <Palette size={16}/> Aparência & Impressão
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <Label>Cor do QR Code</Label>
                        <div className="flex gap-2">
                            <Input type="color" value={fgColor} onChange={(e) => handleChange(e, setFgColor)} className="w-12 h-10 p-1 cursor-pointer shrink-0"/>
                            <Input value={fgColor} onChange={(e) => handleChange(e, setFgColor)} className="font-mono uppercase"/>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label>Título para Impressão</Label>
                        <div className="flex gap-2 items-center">
                             <Input 
                                placeholder={activeTab === 'pix' ? "Pague com Pix" : "Escaneie Aqui"}
                                value={printTitle} 
                                onChange={(e) => handleChange(e, setPrintTitle)} 
                                className="h-10 border-slate-200 bg-amber-50 focus:bg-white"
                             />
                        </div>
                        <p className="text-[10px] text-slate-400">Aparece no topo do flyer impresso.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-3">
                        <Label>Inserir Logo (URL)</Label>
                        <div className="flex gap-2 items-center">
                            <Button 
                                variant={incluirLogo ? "default" : "outline"} 
                                onClick={() => setIncluirLogo(!incluirLogo)}
                                className={incluirLogo ? "bg-slate-900" : ""}
                            >
                                {incluirLogo ? "Sim" : "Não"}
                            </Button>
                            {incluirLogo && (
                                <Input placeholder="/icon" value={logoUrl} onChange={(e) => handleChange(e, setLogoUrl)} className="text-xs"/>
                            )}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Label>Nível de Correção</Label>
                        <Select value={level} onValueChange={(val: QRLevel) => setLevel(val)}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="L">Baixo (7%)</SelectItem>
                                <SelectItem value="M">Médio (15%)</SelectItem>
                                <SelectItem value="Q">Alto (25%)</SelectItem>
                                <SelectItem value="H">Máximo (30%)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* --- DIREITA: PREVIEW & AÇÃO --- */}
      <div className="lg:col-span-5">
        <Card className="border-0 shadow-lg shadow-slate-200/60 ring-1 ring-slate-200 bg-slate-50 h-full sticky top-6">
            <CardContent className="p-8 flex flex-col items-center justify-center h-full min-h-[400px]">
                
                <div className="text-center mb-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center justify-center gap-2"><QrCode size={20}/> Resultado</h3>
                    <p className="text-xs text-slate-500 font-medium bg-white px-3 py-1 rounded-full shadow-sm inline-block">
                        {printTitle || "Seu Código"}
                    </p>
                </div>

                {/* VISUALIZAÇÃO SVG */}
                <div ref={svgRef} className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200 mb-8 transition-all hover:scale-105 duration-300">
                    <QRCodeSVG
                        value={getFinalValue()}
                        size={250}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        level={level}
                        includeMargin={includeMargin}
                        imageSettings={incluirLogo ? { src: logoUrl, x: undefined, y: undefined, height: 50, width: 50, excavate: true } : undefined}
                    />
                </div>

                {/* CANVAS INVISÍVEL (Para download PNG) */}
                <div ref={canvasRef} className="hidden">
                    <QRCodeCanvas
                        value={getFinalValue()}
                        size={1200}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        level={level}
                        includeMargin={includeMargin}
                        imageSettings={incluirLogo ? { src: logoUrl, x: undefined, y: undefined, height: 200, width: 200, excavate: true } : undefined}
                    />
                </div>

                {/* BOTÕES */}
                <div className="w-full space-y-3">
                    {activeTab === 'pix' && (
                        <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-lg border border-emerald-100 text-center mb-2 font-mono break-all">
                            {getFinalValue()}
                        </div>
                    )}

                    <Button 
                        onClick={() => download("png")} 
                        className="w-full h-14 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-100 rounded-xl transition-all active:scale-95 group"
                    >
                        <div className="flex flex-col items-center leading-none">
                            <span className="flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-wide">
                                <Download size={20} className="group-hover:animate-bounce"/> Baixar PNG (HD)
                            </span>
                            <span className="text-[10px] opacity-80 font-normal mt-1">Ideal para Redes Sociais</span>
                        </div>
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" onClick={() => download("svg")} className="h-12 border-slate-300 rounded-xl">
                            <ImageIcon size={16} className="mr-2"/> SVG
                        </Button>
                        <Button variant="outline" onClick={handlePrint} className="h-12 border-slate-300 rounded-xl">
                            <Printer size={16} className="mr-2"/> Imprimir
                        </Button>
                    </div>
                    
                    <p className="text-xs text-center text-slate-400 pt-2 opacity-70">
                        *Este QR Code é estático, gratuito e nunca expira.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* --- TEMPLATE DE IMPRESSÃO (CENTRALIZADO) --- */}
      <div className="hidden">
        <div ref={printRef} className="print-page w-full h-full flex items-center justify-center bg-white">
            
            {/* CONTAINER "MOLDURA" */}
            <div className="print-moldura border-[6px] border-slate-900 rounded-[32px] p-12 flex flex-col items-center justify-center gap-6 max-w-[650px] text-center shadow-none bg-white">
                
                {/* Título Personalizado */}
                <h1 className="text-6xl font-black text-slate-900 leading-tight uppercase mb-4 tracking-tight">
                    {printTitle || "Aponte a Câmera"}
                </h1>

                {/* QR Code SVG Gigante */}
                <div className="p-2">
                    <QRCodeSVG
                        value={getFinalValue()}
                        size={480} // Bem grande
                        bgColor={"#ffffff"}
                        fgColor={"#000000"} // Força preto para alto contraste na impressão
                        level={level}
                        includeMargin={false}
                        imageSettings={incluirLogo ? { src: logoUrl, x: undefined, y: undefined, height: 100, width: 100, excavate: true } : undefined}
                    />
                </div>

                {/* Detalhes do Pix na Impressão */}
                {activeTab === 'pix' && (
                    <div className="text-xl font-bold text-slate-700 mt-2">
                        <p>{pixName}</p>
                        {pixKey && <p className="text-sm font-normal text-slate-500 mt-1">Chave: {pixKey}</p>}
                    </div>
                )}

                {/* Rodapé "Colado" */}
                <div className="flex flex-col items-center gap-1 mt-4 pt-4 border-t-2 border-slate-100 w-full">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        Criado com <span className="text-red-500 text-lg">❤</span> por
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900">Mestre das Contas</p>
                    <p className="text-sm text-slate-400 font-mono tracking-wider">mestredascontas.com.br</p>
                </div>

            </div>

        </div>
      </div>

    </div>
  );
}