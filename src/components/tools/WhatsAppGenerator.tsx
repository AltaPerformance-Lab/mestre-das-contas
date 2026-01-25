"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, Copy, ExternalLink, 
  Smartphone, CheckCircle2, QrCode, Send
} from "lucide-react";
import Link from "next/link";

interface Props {
  initialPhone?: string;
  initialMessage?: string;
}

export default function WhatsAppGenerator({ initialPhone = "", initialMessage = "" }: Props) {
  const [phone, setPhone] = useState(initialPhone);
  const [message, setMessage] = useState(initialMessage);
  const [generatedLink, setGeneratedLink] = useState("");
  const [cleanNum, setCleanNum] = useState(""); 
  const [copied, setCopied] = useState(false);
  
  // Referência para o CONTAINER de scroll, não para o fim da página
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Formata telefone (Máscara BR)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    setCleanNum(value);
    
    if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
    }
    
    setPhone(value);
  };

  // Gera o link em tempo real
  useEffect(() => {
    const limpo = phone.replace(/\D/g, "");
    if (limpo.length < 10) {
        setGeneratedLink("");
        return;
    }
    
    // Codifica a mensagem corretamente para URL
    const encodedMessage = encodeURIComponent(message);
    const fullPhone = `55${limpo}`;
    setGeneratedLink(`https://wa.me/${fullPhone}?text=${encodedMessage}`);
  }, [phone, message]);

  // Scroll automático APENAS dentro do celular (sem puxar a página)
  useEffect(() => {
    if (chatContainerRef.current) {
        // Rola suavemente para o final do container
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth"
        });
    }
  }, [message]);

  const copyToClipboard = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 w-full items-start">
      
      {/* --- COLUNA 1: CONFIGURAÇÃO --- */}
      <div className="lg:col-span-7 space-y-6">
        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
            <CardTitle className="text-xl flex items-center gap-3">
               <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                 <MessageCircle size={22} strokeWidth={2.5} />
               </div> 
               Criar Link de WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-600 dark:text-slate-300 font-medium">Seu Número de WhatsApp</Label>
              <Input 
                id="phone" 
                placeholder="(11) 99999-9999" 
                value={phone} 
                onChange={handlePhoneChange}
                className="h-12 text-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white focus:bg-white dark:focus:bg-slate-800 transition-colors"
                inputMode="numeric"
                maxLength={15}
              />
              <p className="text-xs text-slate-400">Insira o DDD + Número. Funciona para WhatsApp Business e Pessoal.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-600 dark:text-slate-300 font-medium">Mensagem Personalizada (Opcional)</Label>
              <Textarea 
                id="message" 
                placeholder="Olá! Vi seu anúncio e gostaria de mais informações..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-slate-200 focus:bg-white dark:focus:bg-slate-800 transition-colors resize-y text-base leading-relaxed"
              />
              <p className="text-xs text-slate-400">Essa mensagem aparecerá escrita automaticamente no celular do seu cliente.</p>
            </div>

            {/* AÇÕES */}
            <div className="pt-4 space-y-3">
                <div className="flex gap-3">
                    <Button 
                        onClick={copyToClipboard} 
                        disabled={!generatedLink}
                        className="flex-1 h-14 text-lg font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-lg shadow-slate-200 dark:shadow-none rounded-xl transition-all active:scale-[0.99]"
                    >
                        {copied ? (
                            <span className="flex items-center gap-2"><CheckCircle2 /> Copiado!</span>
                        ) : (
                            <span className="flex items-center gap-2"><Copy /> Copiar Link</span>
                        )}
                    </Button>
                    
                    {generatedLink && (
                        <Button 
                            variant="outline"
                            asChild
                            className="h-14 w-14 shrink-0 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/30 rounded-xl"
                            title="Testar Link"
                        >
                            <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink />
                            </a>
                        </Button>
                    )}
                </div>
                
                {/* LINK CRUZADO PARA QR CODE */}
                {generatedLink && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                        <div className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                            <strong>Dica:</strong> Transforme este link em um QR Code para imprimir.
                        </div>
                        <Link 
                            // O encodeURIComponent garante que espaços e quebras de linha passem corretamente
                            href={`/ferramentas/gerador-qr-code?type=whatsapp&num=55${cleanNum}&msg=${encodeURIComponent(message)}`}
                        >
                            <Button size="sm" variant="ghost" className="text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-900 font-bold gap-2">
                                <QrCode size={16}/> Gerar QR Code
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

          </CardContent>
        </Card>
      </div>

      {/* --- COLUNA 2: PREVIEW DO CELULAR (Scroll Corrigido) --- */}
      <div className="lg:col-span-5 flex items-center justify-center lg:items-start lg:pt-4">
         <div className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] shadow-2xl ring-4 ring-slate-200 overflow-hidden border-[6px] border-slate-900 select-none">
            
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-7 bg-slate-900 z-30 flex justify-center rounded-b-2xl">
                <div className="w-24 h-4 bg-black rounded-b-xl"></div>
            </div>

            {/* Tela - Header WhatsApp */}
            <div className="bg-[#008069] h-24 pt-8 px-4 flex items-center gap-3 text-white shadow-md z-20 relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold border border-white/10">
                    VC
                </div>
                <div className="flex-1">
                    <div className="text-base font-bold leading-tight">Sua Empresa</div>
                    <div className="text-[10px] opacity-90">online</div>
                </div>
                <div className="flex gap-4 opacity-80">
                    <Smartphone size={18}/>
                </div>
            </div>

            {/* Tela - Chat Body */}
            <div className="bg-[#EFE7DE] w-full h-full flex flex-col relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.06] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png')] bg-repeat bg-center bg-[length:300px] pointer-events-none"></div>

                {/* Área de Mensagens (Scroll Interno) */}
                <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-4 flex flex-col z-10 scrollbar-thin scrollbar-thumb-slate-300 scroll-smooth"
                >
                    
                    {/* Mensagem de Boas Vindas Fake */}
                    <div className="bg-white p-2.5 rounded-lg rounded-tl-none shadow-sm max-w-[80%] self-start mb-4 text-xs text-slate-800">
                        Olá! Como podemos ajudar você hoje?
                        <div className="text-[9px] text-slate-400 text-right mt-1">10:41</div>
                    </div>

                    {/* Mensagem do Usuário (Preview Real) */}
                    {message ? (
                        <div className="bg-[#D9FDD3] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[90%] self-end animate-in slide-in-from-right-2 duration-300 mb-2 break-words">
                            {/* whitespace-pre-wrap preserva quebras de linha e espaços */}
                            <p className="text-sm text-slate-900 whitespace-pre-wrap leading-relaxed">
                                {message}
                            </p>
                            <div className="text-[9px] text-slate-500 text-right mt-1 flex justify-end gap-1 items-center">
                                10:42 <span className="text-blue-500 font-bold">✓✓</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 text-xs italic opacity-60 mt-10 bg-slate-100/50 p-2 rounded-lg mx-auto w-fit">
                            Pré-visualização da mensagem...
                        </div>
                    )}
                    
                    {/* Espaçador para garantir que a última msg não fique atrás da barra de input */}
                    <div className="h-16 shrink-0"></div>
                </div>
            </div>
            
            {/* Barra de Input Fake (Fixa no bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#F0F2F5] flex items-center gap-2 z-30">
                 <div className="bg-white flex-1 h-10 rounded-full flex items-center px-4 text-slate-400 text-sm shadow-sm border border-slate-100 truncate">
                    {message ? message.replace(/\n/g, " ") : "Mensagem"}
                 </div>
                 <div className="w-10 h-10 rounded-full bg-[#008069] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Send size={18} className="ml-0.5"/>
                 </div>
            </div>

         </div>
      </div>

    </div>
  );
}