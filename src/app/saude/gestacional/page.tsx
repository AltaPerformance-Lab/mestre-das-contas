import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Baby, HelpCircle, Heart, Activity,
  CalendarHeart, Stethoscope, Sparkles, 
  CheckCircle2, Dna, ExternalLink, 
  Smile, Coffee, Moon, Sun, Utensils, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";
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
    } 
  };
}

// Lista de FAQ para uso no componente e no JSON-LD (DRY Principle)
const faqList = [
    { p: "Como é calculada a data provável do parto (DPP)?", r: "Utilizamos a consagrada Regra de Naegele em obstetrícia: soma-se exatamente 7 dias ao primeiro dia da sua última menstruação (DUM), subtrai-se 3 meses e adiciona-se 1 ano (ou soma-se 9 meses diretos). Esse cálculo assume um ciclo regular de 28 dias." },
    { p: "A idade gestacional obtida por ultrassom é mais precisa que a DUM?", r: "Sim. O exame de ultrassonografia transvaginal realizado no primeiro trimestre (idealmente entre a 7ª e a 12ª semana) é o padrão-ouro de precisão. Ele avalia o Comprimento Cabeça-Nádega (CCN) do embrião e possui uma margem de erro mínima de apenas 3 a 5 dias." },
    { p: "Quando dá para descobrir o sexo do bebê com segurança?", r: "Através do exame de sangue de sexagem fetal, é possível descobrir a partir da 8ª semana completa de gestação. Já pelo ultrassom obstétrico, os genitais costumam ser visualizados a partir da 16ª semana, obtendo-se certeza no morfológico de segundo trimestre (20ª à 24ª semana)." },
    { p: "De quantas semanas e meses eu realmente estou grávida?", r: "Médicos contam em semanas porque a embriologia muda em dias. Para converter de forma simplificada: o primeiro mês compreende as semanas 1 a 4; o segundo, de 5 a 8; o terceiro, de 9 a 13; e assim por diante. Consulte nossa tabela de conversão oficial no guia para tirar suas dúvidas de cabeça." },
    { p: "Grávida pode tomar café ou bebidas com cafeína?", r: "Sim, mas de forma muito controlada. A Organização Mundial da Saúde (OMS) orienta que a gestante deve limitar o consumo a menos de 200mg de cafeína ao dia (o equivalente a duas xícaras pequenas de café coado), pois o excesso pode estar associado a restrições de crescimento fetal." },
    { p: "Com quantas semanas o bebê é considerado maduro e fora de perigo?", r: "O bebê deixa a faixa de prematuridade ao completar 37 semanas de gestação, sendo classificado como termo inicial. O período ideal e mais seguro para o nascimento voluntário ou agendamento de parto situa-se entre a 39ª e a 41ª semana." },
    { p: "É normal sentir cólicas leves no início da gestação?", r: "Sim. Cólicas leves são normais no primeiro trimestre devido à implantação do embrião e ao rápido estiramento dos ligamentos e músculos uterinos. Contudo, se a dor for intensa, unilateral ou acompanhada de sangramento vaginal, um médico deve ser procurado imediatamente." }
];

export default async function GestacionalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora Gestacional",
        "url": "https://mestredascontas.com.br/saude/gestacional",
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

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora Gestacional"
          description="O milagre da vida começou! Calcule a Data Provável do Parto (DPP), acompanhe o desenvolvimento do bebê semana a semana e tire todas as suas dúvidas."
          category="Maternidade & Família"
          icon={<Baby size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Gravidez" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
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
            Aquele segundo em que o teste dá positivo é indescritível. É um misto de alegria pura, leve receio e uma pergunta que não quer calar na sua mente: <strong>"De quanto tempo eu realmente estou grávida?"</strong>.
          </p>
          <p>
            Calma, respira. Nós estamos aqui para te ajudar a decifrar a maravilhosa biologia por trás da gravidez.
          </p>
          <p>
            Veja bem, ao contrário do que a maioria das pessoas pensa inicialmente, a idade gestacional não começa no dia em que o bebê foi gerado (concepção). Ela é calculada com base no primeiro dia da sua última menstruação (DUM), quando o útero inicia a preparação do endométrio.
          </p>

          <div className="my-10">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <CalendarHeart className="text-purple-500" /> Tabela Oficial de Correlação: Semanas x Meses
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              A dúvida clássica em qualquer consultório obstétrico: "Doutora, 24 semanas são quantos meses?". Facilitamos a sua vida organizando a conversão oficial abaixo:
            </p>
            
            {/* TABELA DE CORRELAÇÃO GESTACIONAL (HTML PURO TOTALMENTE RESPONSIVO) */}
            <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                        <Activity size={16} /> Conversão de Semanas em Meses e Trimestres Gestacionais
                    </h4>
                </div>
                
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left border-collapse min-w-[650px]">
                        <thead className="bg-pink-50 dark:bg-pink-900/20 text-pink-900 dark:text-pink-100 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-pink-100 dark:border-pink-900">Trimestre Oficial</th>
                                <th className="px-6 py-4 font-bold border-b border-pink-100 dark:border-pink-900">Mês de Gestação</th>
                                <th className="px-6 py-4 font-bold border-b border-pink-100 dark:border-pink-900">Intervalo de Semanas</th>
                                <th className="px-6 py-4 font-bold border-b border-pink-100 dark:border-pink-900 text-center">Foco de Desenvolvimento Fetal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {/* 1º Trimestre */}
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-pink-600 dark:text-pink-400 border-r border-slate-100 dark:border-slate-800" rowSpan={3}>1º Trimestre (Formação)</td>
                                <td className="px-6 py-4 font-medium">1º Mês</td>
                                <td className="px-6 py-4 font-mono">0 a 4 semanas e meia</td>
                                <td className="px-6 py-4 text-xs">Fecundação, fixação do embrião no útero (nidação) e início do sistema neural.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">2º Mês</td>
                                <td className="px-6 py-4 font-mono">4 semanas e meia a 9 semanas</td>
                                <td className="px-6 py-4 text-xs">Batimentos cardíacos detectáveis, formação de braços, pernas e órgãos principais.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">3º Mês</td>
                                <td className="px-6 py-4 font-mono">9 a 13 semanas e meia</td>
                                <td className="px-6 py-4 text-xs">O embrião vira feto oficialmente; formação de unhas, pálpebras e cordas vocais.</td>
                            </tr>
                            
                            {/* 2º Trimestre */}
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/20 dark:bg-slate-800/20">
                                <td className="px-6 py-4 font-bold text-purple-600 dark:text-purple-400 border-r border-slate-100 dark:border-slate-800" rowSpan={3}>2º Trimestre (Crescimento)</td>
                                <td className="px-6 py-4 font-medium">4º Mês</td>
                                <td className="px-6 py-4 font-mono">13 semanas e meia a 18 semanas</td>
                                <td className="px-6 py-4 text-xs">Desenvolvimento dos órgãos sexuais, crescimento esquelético e sucção do polegar.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/20 dark:bg-slate-800/20">
                                <td className="px-6 py-4 font-medium">5º Mês</td>
                                <td className="px-6 py-4 font-mono">18 a 22 semanas e meia</td>
                                <td className="px-6 py-4 text-xs">A mãe começa a sentir os primeiros chutes; surgimento do lanugo e verniz protetor.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-slate-50/20 dark:bg-slate-800/20">
                                <td className="px-6 py-4 font-medium">6º Mês</td>
                                <td className="px-6 py-4 font-mono">22 semanas e meia a 27 semanas</td>
                                <td className="px-6 py-4 text-xs">Desenvolvimento dos alvéolos pulmonares; o feto começa a abrir os olhos e ouvir sons.</td>
                            </tr>

                            {/* 3º Trimestre */}
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-teal-600 dark:text-teal-400 border-r border-slate-100 dark:border-slate-800" rowSpan={3}>3º Trimestre (Maturação)</td>
                                <td className="px-6 py-4 font-medium">7º Mês</td>
                                <td className="px-6 py-4 font-mono">27 a 31 semanas e meia</td>
                                <td className="px-6 py-4 text-xs">Ganho acelerado de peso; cérebro desenvolve sulcos complexos e os pulmões amadurecem.</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">8º Mês</td>
                                <td className="px-6 py-4 font-mono">31 semanas e meia a 36 semanas</td>
                                <td className="px-6 py-4 text-xs">O bebê se posiciona de cabeça para baixo (geralmente); pele fica mais lisa com gordura.</td>
                            </tr>
                            <tr className="hover:bg-pink-50/20 dark:hover:bg-pink-900/20 bg-pink-50/10 dark:bg-pink-900/10 font-semibold text-pink-700 dark:text-pink-300">
                                <td className="px-6 py-4">9º Mês</td>
                                <td className="px-6 py-4 font-mono">36 a 42 semanas</td>
                                <td className="px-6 py-4 text-xs">Bebê totalmente formado e pronto para nascer a qualquer momento da gestação.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Stethoscope className="text-teal-600 dark:text-teal-400" /> Regra de Naegele: A Ciência por Trás do Cálculo
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
              O algoritmo da nossa calculadora aplica com rigor científico a Regra de Naegele, padrão mundial obstétrico.
          </p>
          <p>
              A verdade é que apenas cerca de <strong>5% dos bebês</strong> de fato nascem exatamente na data estimada (DPP). A gestação humana saudável acomoda nascimentos perfeitamente normais a qualquer dia entre a 38ª e a 41ª semana gestacional completa.
          </p>

          {/* CURIOSIDADE LUNAR */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 md:p-8 rounded-2xl border border-purple-100 dark:border-purple-800 my-10 relative overflow-hidden shadow-sm not-prose">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={120} className="text-purple-900 dark:text-purple-300"/>
              </div>
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-300 mb-4 flex items-center gap-2 relative z-10">
                  <Dna size={24} className="text-pink-500 dark:text-pink-400"/> Mito ou Verdade: A Lua e o Momento do Parto
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Muitas avós e doulas experientes afirmam com certeza absoluta que a troca das fases lunares (principalmente na virada para a Lua Cheia) causa picos de internações em maternidades.
                  </p>
                  <p>
                      Embora a ciência oficial atribua isso a coincidências estatísticas ou efeito placebo populacional, a correlação histórica e folclórica é maravilhosa. Vale super a pena acompanhar o <GlossaryTerm slug="fases-da-lua-calendario-lunar">calendário lunar</GlossaryTerm> conforme suas 39 semanas forem se aproximando!
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-6 flex items-center gap-2">
              <Heart className="text-red-500" /> Cuidados Médicos por Trimestre
          </h3>
          
          <div className="grid gap-4 not-prose">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-pink-200 dark:hover:border-pink-800 transition-colors">
                  <div className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">1º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">O Início Delicado (Semana 1 a 13)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">Fase crítica de organogênese do feto. O uso monitorado de ácido fólico é mandatório para prevenção do tubo neural. Sintomas de fadiga, enjoos matinais e flutuações hormonais acentuadas são esperados.</p>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">2º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">O Trimestre do Bem-Estar (Semana 14 a 27)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">Os incômodos iniciais regridem gradualmente e a energia celular retorna. A barriga torna-se visível, os primeiros chutes do bebê são sentidos e o sexo é facilmente mapeável via ultrassonografia de rotina.</p>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                  <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">3º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-center md:text-left">A Preparação Final (Semana 28 a 40+)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left leading-relaxed">Ganho acelerado de volume e peso fetal. O cansaço físico aumenta por conta da sobrecarga lombar. Momento ideal para finalizar o plano de parto, lavar o enxoval e arrumar a bolsa maternidade.</p>
                  </div>
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

          <ExpertSignature updatedAt="Junho de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/saude/gestacional" />
        <SmartCrossLinker currentHref="/saude/gestacional" category="saude" />

        {/* 7 PERGUNTAS FREQUENTES (EXATAMENTE 7 SINCRONIZADAS COM JSON-LD) */}
        <div className="max-w-4xl mx-auto w-full print:hidden" id="faq">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-pink-100 dark:border-pink-900/30 pb-4">
                <HelpCircle className="text-pink-500" /> Tira-Dúvidas da Maternidade
            </h2>
            
            <div className="grid gap-3 not-prose">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-pink-100 dark:open:ring-pink-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center text-sm md:text-base select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-pink-400 font-bold text-xs mt-1">#{idx + 1}</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.p}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm md:text-base pl-7 animate-in fade-in">
                          {item.r}
                      </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

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