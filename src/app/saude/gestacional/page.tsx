import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Baby, HelpCircle, Heart, 
  CalendarHeart, Stethoscope, Sparkles, 
  CheckCircle2, Dna, ExternalLink, 
  Smile, Coffee, Moon, Sun, Utensils, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA 2026 ---
import { calculatePregnancy } from "@/lib/calculators/health";


// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora Gestacional 2026 (Grátis) | Semanas e Data do Parto";
  const description = "Estou grávida de quanto tempo? Calcule a Data Provável do Parto (DPP) e acompanhe sua gestação semana a semana com a tabela oficial 2026. Grátis.";

  return {
    title,
    description,
    keywords: [
      "calculadora gestacional", 
      "calcular data do parto", 
      "dpp calculadora", 
      "tabela gestacional semanas e meses", 
      "sintomas gravidez semana a semana",
      "sexagem fetal data",
      "calculadora gravidez 2026"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/saude/gestacional" },
    openGraph: {
      title: "Calculadora Gestacional 2026 | Semanas e Data do Parto",
      description: "Descubra de quantas semanas você está e a data provável do parto. Acompanhe sua gravidez com precisão.",
      url: "https://mestredascontas.com.br/saude/gestacional",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora Gestacional Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "De quantas semanas eu estou?",
      description: "Calcule sua DPP e acompanhe o desenvolvimento do seu bebê agora.",
      images: ["/opengraph-image"],
    } };
}

// Lista de FAQ para uso no componente e no JSON-LD (DRY Principle)
const faqList = [
    { p: "Como é calculada a data do parto?", r: "Utilizamos a Regra de Naegele: soma-se 7 dias ao primeiro dia da última menstruação e subtrai-se 3 meses (ou adiciona-se 9 meses)." },
    { p: "A data do ultrassom é mais precisa que a DUM?", r: "Sim. O ultrassom do primeiro trimestre (até 12 semanas) é o 'padrão ouro'. Ele mede o comprimento do embrião (CCN) e tem margem de erro de apenas 3 a 5 dias." },
    { p: "Quando dá para ver o sexo do bebê?", r: "Pela sexagem fetal (exame de sangue), a partir da 8ª semana. Pelo ultrassom, geralmente a partir da 16ª semana, mas com certeza absoluta após a 20ª semana (morfológico)." },
    { p: "Estou de quantas semanas e meses?", r: "Essa é a confusão clássica! Médicos contam em semanas. Para saber o mês, consulte nossa tabela abaixo. Basicamente, 40 semanas completam 9 meses e 1 semana." },
    { p: "Grávida pode tomar café?", r: "Sim, mas com moderação. A OMS recomenda limitar a cafeína a 200mg por dia (cerca de 2 xícaras pequenas). Excesso pode aumentar risco de baixo peso ao nascer." }
];

export default async function GestacionalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora Gestacional",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta completa para acompanhamento gestacional, cálculo de DPP e fases do bebê."
      },
      {
        "@type": "HowTo",
        "name": "Como Calcular Idade Gestacional e DPP",
        "description": "Descubra como calcular suas semanas de gravidez e a data provável do parto.",
        "totalTime": "PT15S",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Escolha o Método de Entrada",
            "text": "Selecione se deseja calcular pela data da última menstruação (DUM), data provável do parto (DPP) ou por um ultrassom prévio.",
            "url": "https://mestredascontas.com.br/saude/gestacional#ferramenta"
          },
          {
            "@type": "HowToStep",
            "name": "Insira a Data Correspondente",
            "text": "Selecione no calendário a data correta conforme o método escolhido (ex: primeiro dia da última menstruação).",
            "url": "https://mestredascontas.com.br/saude/gestacional#ferramenta"
          },
          {
            "@type": "HowToStep",
            "name": "Acompanhe sua Gestação",
            "text": "Veja de quantas semanas e dias você está grávida, a data provável do parto e o peso/tamanho aproximado do bebê.",
            "url": "https://mestredascontas.com.br/saude/gestacional#ferramenta"
          }
        ]
      },
      {
        "@type": "MedicalWebPage",
        "name": "Guia da Gestação Semana a Semana",
        "about": { "@type": "MedicalCondition", "name": "Gravidez" },
        "audience": { "@type": "Patient", "audienceType": "Gestantes" },
        "author": { "@type": "Organization", "name": "Equipe Mestre das Contas" },
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
          "@type": "Question",
          "name": item.p,
          "acceptedAnswer": { "@type": "Answer", "text": item.r }
        }))
      }
    ]
  };

  // --- MODO PÁGINA NORMAL ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora Gestacional"
          description="O milagre da vida começou! Calcule a Data Provável do Parto (DPP), acompanhe o desenvolvimento do bebê semana a semana e tire todas as suas dúvidas."
          category="Maternidade & Família"
          icon={<Baby size={32} strokeWidth={2} />}
          variant="health" // Laranja/Rosa (Saúde)
          categoryColor="rose"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Gravidez" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO CIENTÍFICA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Conteúdo revisado conforme diretrizes da Organização Mundial da Saúde (OMS) e protocolos médicos de 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="gestacional_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO DE SAÚDE (E-E-A-T) */}
        <div className="bg-pink-50/50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-pink-700 dark:text-pink-300 mb-2">
          <ShieldCheck size={18} className="text-pink-600 shrink-0" />
          <span>Cálculo baseado na Regra de Naegele, padrão ouro em obstetrícia para 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="mb-8">
               <PrivacyBadge />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-pink-100 dark:border-pink-900/30 shadow-xl shadow-pink-100/50 dark:shadow-none p-1 md:p-2">
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <PregnancyCalculator />
                  </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="gest_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (DEEP CONTENT) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-pink-400 pl-4">
                Como Usar a Calculadora Gestacional (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Descubra o tempo de gravidez e planeje a chegada do bebê em 3 passos:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Método de Entrada</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Selecione se deseja calcular pela data da última menstruação (DUM), pela data provável do parto (DPP) ou por ultrassonografia.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Selecione a Data</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Informe a data exata no calendário conforme o método que você selecionou.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Calcule e Acompanhe</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"Calcular"</strong> para ver seu relatório gestacional completo, incluindo semanas e dias, trimestre e peso do bebê.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-pink-400 pl-4">
               Parabéns, mamãe! E agora?
            </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Aquele segundo em que o teste dá positivo é indescritível. É um misto de alegria, medo e uma pergunta que não cala: <strong>"De quanto tempo eu estou?"</strong>.
          </p>
          <p>
            Calma, respira. Nós vamos te ajudar a decifrar a "matemática da gravidez". Diferente do que pensamos, a gravidez não começa no dia que o bebê foi feito (concepção), mas sim no primeiro dia da sua última menstruação (DUM).
          </p>

          <div className="my-10">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <CalendarHeart className="text-purple-500" /> Tabela Oficial: Semanas x Meses
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">A dúvida número 1: "Doutor, 24 semanas são quantos meses?". Salve esta tabela oficial:</p>
            
            {/* TABELA HTML OBRIGATÓRIA */}
            <div className="overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm w-full bg-white dark:bg-slate-900">
                
                {/* DESKTOP TABLE */}
                <div className="hidden md:block">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-pink-50 dark:bg-pink-900/20 text-pink-900 dark:text-pink-100 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100 dark:border-pink-900">Trimestre</th>
                                <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100 dark:border-pink-900">Mês</th>
                                <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100 dark:border-pink-900">Semanas Correspondentes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {/* 1º Trimestre */}
                            <tr className="bg-white dark:bg-slate-900"><td className="px-4 py-3 font-bold text-slate-500 dark:text-slate-400 border-r border-slate-50 dark:border-slate-800" rowSpan={3}>1º Trimestre</td><td className="px-4 py-3 font-medium">Mês 1</td><td className="px-4 py-3">0 a 4 semanas e meia</td></tr>
                            <tr className="bg-white dark:bg-slate-900"><td className="px-4 py-3 font-medium">Mês 2</td><td className="px-4 py-3">4 e meia a 9 semanas</td></tr>
                            <tr className="bg-white dark:bg-slate-900"><td className="px-4 py-3 font-medium">Mês 3</td><td className="px-4 py-3">9 a 13 semanas e meia</td></tr>
                            
                            {/* 2º Trimestre */}
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50"><td className="px-4 py-3 font-bold text-slate-500 dark:text-slate-400 border-r border-slate-100 dark:border-slate-700" rowSpan={3}>2º Trimestre</td><td className="px-4 py-3 font-medium">Mês 4</td><td className="px-4 py-3">13 e meia a 18 semanas</td></tr>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50"><td className="px-4 py-3 font-medium">Mês 5</td><td className="px-4 py-3">18 a 22 semanas e meia</td></tr>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50"><td className="px-4 py-3 font-medium">Mês 6</td><td className="px-4 py-3">22 e meia a 27 semanas</td></tr>

                            {/* 3º Trimestre */}
                            <tr className="bg-white dark:bg-slate-900"><td className="px-4 py-3 font-bold text-slate-500 dark:text-slate-400 border-r border-slate-50 dark:border-slate-800" rowSpan={3}>3º Trimestre</td><td className="px-4 py-3 font-medium">Mês 7</td><td className="px-4 py-3">27 a 31 semanas e meia</td></tr>
                            <tr className="bg-white dark:bg-slate-900"><td className="px-4 py-3 font-medium">Mês 8</td><td className="px-4 py-3">31 e meia a 36 semanas</td></tr>
                            <tr className="bg-pink-100/30 dark:bg-pink-900/10"><td className="px-4 py-3 font-bold text-pink-700 dark:text-pink-300">Mês 9</td><td className="px-4 py-3 font-bold text-pink-700 dark:text-pink-300">36 a 42 semanas (Reta Final)</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* MOBILE LIST */}
                <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                     {[
                        { mes: 1, sem: "0 a 4½", tri: 1 },
                        { mes: 2, sem: "4½ a 9", tri: 1 },
                        { mes: 3, sem: "9 a 13½", tri: 1 },
                        { mes: 4, sem: "13½ a 18", tri: 2 },
                        { mes: 5, sem: "18 a 22½", tri: 2 },
                        { mes: 6, sem: "22½ a 27", tri: 2 },
                        { mes: 7, sem: "27 a 31½", tri: 3 },
                        { mes: 8, sem: "31½ a 36", tri: 3 },
                        { mes: 9, sem: "36 a 42", tri: 3, highlight: true },
                     ].map((item, idx) => (
                         <div key={idx} className={`p-4 flex justify-between items-center ${item.highlight ? 'bg-pink-50 dark:bg-pink-900/10' : ''}`}>
                             <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.tri === 1 ? 'bg-pink-100 text-pink-600' : item.tri === 2 ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'}`}>
                                     {item.mes}º
                                 </div>
                                 <div>
                                     <span className="text-xs font-bold text-slate-400 block uppercase">Mês {item.mes}</span>
                                     <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.sem} semanas</span>
                                 </div>
                             </div>
                             <span className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{item.tri}º Trimestre</span>
                         </div>
                     ))}
                </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Stethoscope className="text-teal-600 dark:text-teal-400" /> Regra de Naegele: A Ciência por Trás
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
              A calculadora usa um método criado pelo obstetra alemão Franz Naegele no século 19. Ele percebeu que a gestação humana dura em média <strong>280 dias</strong>.
          </p>
          <p>
              Mas atenção: apenas <strong>5% dos bebês</strong> nascem na data exata (DPP). A maioria decide vir ao mundo entre 38 e 41 semanas. A DPP é apenas um norte, não uma promessa!
          </p>

          {/* CURIOSIDADE LUNAR */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 md:p-8 rounded-2xl border border-purple-100 dark:border-purple-800 my-10 relative overflow-hidden shadow-sm not-prose">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={120} className="text-purple-900 dark:text-purple-300"/>
              </div>
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2 relative z-10">
                  <Dna size={24} className="text-pink-500 dark:text-pink-400"/> Mito ou Verdade: A Lua Influencia?
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Acredite se quiser: muitas parteiras juram que nas <strong>mudanças de lua</strong> (especialmente na Lua Cheia) as maternidades lotam.
                  </p>
                  <p>
                      Embora a ciência não tenha comprovado uma ligação direta entre a gravidade lunar e o trabalho de parto, a coincidência é intrigante. Fique de olho no calendário lunar quando estiver chegando perto das 39 semanas!
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <Heart className="text-red-500" /> Cuidados Essenciais por Trimestre
          </h3>
          
          <div className="grid gap-4 not-prose">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-pink-200 dark:hover:border-pink-800 transition-colors">
                  <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">1º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">O Início Delicado (Semana 1 a 13)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">É a fase de formação dos órgãos. O ácido fólico é obrigatório. Enjoos e sono excessivo são comuns. Evite remédios sem prescrição.</p>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">2º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">A Fase de Ouro (Semana 14 a 27)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">A disposição volta! A barriga aparece, você sente o bebê mexer e descobre o sexo. Hora de cuidar das estrias com hidratação intensa.</p>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">3º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">A Reta Final (Semana 28 a 40+)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">O peso aumenta, o cansaço volta e a ansiedade bate. Prepare a mala da maternidade, lave as roupinhas e descanse o máximo possível.</p>
                  </div>
              </div>
          </div>

          {/* 20 PERGUNTAS FREQUENTES */}
          <div className="mt-16 not-prose" id="faq">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-pink-100 dark:border-pink-900/30 pb-4">
                <HelpCircle className="text-pink-500" /> Tira-Dúvidas da Gestante
            </h2>
            
            <div className="grid gap-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-pink-100 dark:open:ring-pink-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center text-sm md:text-base select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-pink-400 font-bold text-xs mt-1">#{idx + 1}</span>
                              <span className="leading-snug">{item.p}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm md:text-base pl-7 animate-in fade-in">
                          {item.r}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><CheckCircle2 size={14}/> Base Científica</h3>
              <p className="text-xs text-slate-500 mb-3">Este conteúdo foi elaborado com base nas diretrizes das principais instituições de saúde:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.febrasgo.org.br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">FEBRASGO <ExternalLink size={10}/></a>
                  <a href="https://www.gov.br/saude/pt-br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">Ministério da Saúde <ExternalLink size={10}/></a>
                  <a href="https://www.acog.org" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">ACOG (EUA) <ExternalLink size={10}/></a>
              </div>

              <p className="text-sm italic text-slate-500 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800">
                    Durante a gravidez, monitorar o <Link href="/saude/imc" className="text-rose-500 font-bold hover:underline">ganho de peso (IMC)</Link> e manter a <Link href="/saude/agua" className="text-rose-500 font-bold hover:underline">hidratação correta</Link> é essencial para a saúde da mãe e do bebê.
              </p>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/saude/gestacional" category="saude" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="gest_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>
      </div>
    </article>
  );
}