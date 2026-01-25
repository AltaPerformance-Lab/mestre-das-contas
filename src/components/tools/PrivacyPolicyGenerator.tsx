"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, Globe, Mail, Eye, Copy, Check, 
  Cookie, ListChecks, FileText, AlertTriangle, ChevronRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PolicyData = {
  siteName: string;
  siteUrl: string;
  companyName: string; // Or personal name
  contactEmail: string;
  city: string;
  collectsName: boolean;
  collectsEmail: boolean;
  collectsPhone: boolean;
  collectsCookies: boolean;
  usesAdSense: boolean;
  usesAnalytics: boolean;
  hasNewsletter: boolean;
};

export default function PrivacyPolicyGenerator() {
  const [data, setData] = useState<PolicyData>({
    siteName: "",
    siteUrl: "",
    companyName: "",
    contactEmail: "",
    city: "São Paulo",
    collectsName: true,
    collectsEmail: true,
    collectsPhone: false,
    collectsCookies: true,
    usesAdSense: true,
    usesAnalytics: true,
    hasNewsletter: false
  });

  const [step, setStep] = useState(1);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [generatedMd, setGeneratedMd] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePolicy = () => {
    const today = new Date().toLocaleDateString("pt-BR");
    
    // --- TEXTO BASE (HTML) ---
    let html = `
      <h2>Política de Privacidade</h2>
      <p>A sua privacidade é importante para nós. É política do <strong>${data.siteName}</strong> respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site <a href="${data.siteUrl}">${data.siteName}</a>.</p>
      
      <h3>1. Coleta de Dados</h3>
      <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
      <p>Tipos de dados coletados:</p>
      <ul>
        ${data.collectsName ? "<li>Nome completo</li>" : ""}
        ${data.collectsEmail ? "<li>Endereço de email</li>" : ""}
        ${data.collectsPhone ? "<li>Número de telefone</li>" : ""}
        <li>Dados de navegação (Cookies)</li>
      </ul>

      <h3>2. Retenção de Dados</h3>
      <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

      <h3>3. Compartilhamento de Dados</h3>
      <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
    `;

    // --- COOKIES & PUBLICIDADE ---
    if (data.collectsCookies) {
      html += `
      <h3>4. Cookies e Tecnologias Semelhantes</h3>
      <p>O <strong>${data.siteName}</strong> utiliza cookies para melhorar a experiência do usuário. Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
      `;
    }

    if (data.usesAdSense) {
      html += `
      <h4>Publicidade (Google AdSense)</h4>
      <p>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você. Para mais informações sobre o Google AdSense, consulte as <a href="https://policies.google.com/technologies/ads">FAQs oficiais sobre privacidade do Google AdSense</a>.</p>
      `;
    }

    if (data.usesAnalytics) {
      html += `
      <h4>Analítica (Google Analytics)</h4>
      <p>Utilizamos o Google Analytics para entender como você usa o site e como podemos melhorar sua experiência. Esses cookies podem rastrear itens como quanto tempo você gasta no site e as páginas visitadas.</p>
      `;
    }

    html += `
      <h3>5. Direitos do Usuário (LGPD)</h3>
      <p>De acordo com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você tem direito a acessar, corrigir, portar e eliminar seus dados pessoais. Se você desejar exercer esses direitos, entre em contato conosco.</p>

      <h3>6. Contato</h3>
      <p>Para dúvidas sobre esta política, entre em contato através do e-mail: <strong>${data.contactEmail}</strong>.</p>

      <p><em>Atualizado em: ${today} - ${data.city}</em></p>
    `;

    setGeneratedHtml(html);
    
    // Markdown Version (Simpler)
    setGeneratedMd(html.replace(/<h2>/g, "## ").replace(/<\/h2>/g, "\n").replace(/<h3>/g, "### ").replace(/<\/h3>/g, "\n").replace(/<p>/g, "").replace(/<\/p>/g, "\n\n").replace(/<strong>/g, "**").replace(/<\/strong>/g, "**").replace(/<ul>/g, "").replace(/<\/ul>/g, "").replace(/<li>/g, "- ").replace(/<\/li>/g, "\n"));
    
    setStep(2);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none overflow-hidden">
      
      {/* HEADER DA WIZARD */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex justify-between items-center">
         <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-emerald-400"/>
            <div>
               <h2 className="font-bold text-lg">Gerador de Política de Privacidade</h2>
               <p className="text-xs text-slate-400">Compatível com LGPD, AdSense e Analytics</p>
            </div>
         </div>
         <div className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
            Passo {step} de 2
         </div>
      </div>

      <div className="p-6 md:p-8">
        
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-left-4 fade-in duration-300">
             
             {/* PARTE 1 - BÁSICO */}
             <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b dark:border-slate-700 pb-2"><Globe size={18}/> Informações do Site</h3>
                   <div>
                      <Label className="dark:text-slate-300">Nome do Site *</Label>
                      <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={data.siteName} onChange={e => setData({...data, siteName: e.target.value})} placeholder="Ex: Mestre das Contas" />
                   </div>
                   <div>
                      <Label className="dark:text-slate-300">URL do Site (opcional)</Label>
                      <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={data.siteUrl} onChange={e => setData({...data, siteUrl: e.target.value})} placeholder="https://..." />
                   </div>
                   <div>
                      <Label className="dark:text-slate-300">Cidade / Base Legal *</Label>
                      <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={data.city} onChange={e => setData({...data, city: e.target.value})} placeholder="São Paulo" />
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b dark:border-slate-700 pb-2"><Mail size={18}/> Contato</h3>
                   <div>
                      <Label className="dark:text-slate-300">Nome da Empresa / Responsável *</Label>
                      <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={data.companyName} onChange={e => setData({...data, companyName: e.target.value})} placeholder="Sua Empresa Ltda" />
                   </div>
                   <div>
                      <Label className="dark:text-slate-300">E-mail de Contato *</Label>
                      <Input className="dark:bg-slate-950 dark:border-slate-700 dark:text-slate-100" value={data.contactEmail} onChange={e => setData({...data, contactEmail: e.target.value})} placeholder="contato@site.com" />
                   </div>
                </div>
             </div>

             {/* PARTE 2 - COLETA */}
             <div>
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 border-b dark:border-slate-700 pb-2 mb-4"><ListChecks size={18}/> O que você usa/coleta?</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 border dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <Switch id="adsense" checked={data.usesAdSense} onCheckedChange={(c) => setData({...data, usesAdSense: c})} />
                        <label htmlFor="adsense" className="text-sm font-medium leading-none cursor-pointer dark:text-slate-300">Google AdSense (Anúncios)</label>
                    </div>
                    <div className="flex items-center space-x-2 border dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <Switch id="analytics" checked={data.usesAnalytics} onCheckedChange={(c) => setData({...data, usesAnalytics: c})} />
                        <label htmlFor="analytics" className="text-sm font-medium leading-none cursor-pointer dark:text-slate-300">Google Analytics (Métricas)</label>
                    </div>
                    <div className="flex items-center space-x-2 border dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <Switch id="newsletter" checked={data.collectsEmail} onCheckedChange={(c) => setData({...data, collectsEmail: c})} />
                        <label htmlFor="newsletter" className="text-sm font-medium leading-none cursor-pointer dark:text-slate-300">Coleta E-mails (Newsletter/Login)</label>
                    </div>
                    <div className="flex items-center space-x-2 border dark:border-slate-700 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <Switch id="cookies" checked={data.collectsCookies} onCheckedChange={(c) => setData({...data, collectsCookies: c})} />
                        <label htmlFor="cookies" className="text-sm font-medium leading-none cursor-pointer dark:text-slate-300">Usa Cookies (Padrão)</label>
                    </div>
                </div>
             </div>

             <Button 
                onClick={generatePolicy} 
                disabled={!data.siteName || !data.contactEmail}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 text-lg shadow-lg shadow-emerald-200"
             >
                Gerar Política Grátis <ChevronRight className="ml-2"/>
             </Button>
          </div>
        )}

        {step === 2 && (
           <div className="animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                      <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-800 dark:text-white">Resultado (HTML)</h3>
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedHtml)} className="dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800/50">
                              {copied ? <Check size={16} className="mr-1 text-green-600 dark:text-green-400"/> : <Copy size={16} className="mr-1"/>}
                              {copied ? "Copiado!" : "Copiar Código"}
                          </Button>
                      </div>
                      <Textarea value={generatedHtml} readOnly className="h-96 font-mono text-xs bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-400 dark:border-slate-700" />
                  </div>

                  <div className="space-y-4">
                      <h3 className="font-bold text-slate-800 dark:text-white">Pré-visualização</h3>
                      <div className="h-96 overflow-y-auto p-6 border dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 shadow-inner prose prose-sm prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedHtml }}></div>
                  </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500">
                      Voltar e Editar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.reload()}>
                      Criar Nova Política
                  </Button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}
