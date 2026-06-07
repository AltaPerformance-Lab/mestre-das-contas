import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import IMCCalculator from "@/components/calculators/IMCCalculator";
import { calculateIMC } from "@/lib/calculators/health";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader"; 
import { 
  Scale, Brain, Activity, History, BookOpen,
  CircleHelp, ExternalLink, Landmark, Heart, 
  Coins, Briefcase, Calculator, CircleCheck, User, Users, Ruler,
  AlertOctagon, Apple, Dna, TrendingUp, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO 2026) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de IMC 2026 (Grátis) | Tabela Oficial e Peso Ideal";
  const description = "Calcule seu IMC em 10 segundos em 2026. Tabela oficial da OMS 2026 atualizada para adults e idosos. Descubra se você está no peso ideal gratuitamente.";

  return {
    title,
    description,
    keywords: ["calculadora imc", "indice de massa corporal", "tabela imc 2026", "calcular obesidade", "peso ideal altura"],
    alternates: { canonical: "https://mestredascontas.com.br/saude/imc" },
    openGraph: {
      title: "Calculadora de IMC 2026 | Tabela OMS e Peso Ideal",
      description: "Descubra seu IMC em segundos e saiba se você está no peso ideal segundo a OMS. Ferramenta grátis e atualizada para 2026.",
      url: "https://mestredascontas.com.br/saude/imc",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de IMC Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Como está seu IMC hoje?",
      description: "Use nossa calculadora gratuita e descubra seu peso ideal agora.",
      images: ["/opengraph-image"],
    }
  };
}

// --- LISTA FAQ (DRY Content) ---
const faqList = [
  { q: "Qual o IMC normal e considerado saudável?", a: "Para adultos entre 20 e 59 anos, o IMC considerado saudável e normal pela Organização Mundial da Saúde (OMS) situa-se entre 18,5 e 24,9 kg/m²." },
  { q: "Como calcular o meu peso ideal aproximado?", a: "O peso ideal é representado por uma faixa de peso saudável. Uma forma prática de estimar é multiplicar a sua altura ao quadrado por 22 (o IMC médio recomendado). Exemplo para 1,70m: 1,70 * 1,70 * 22 = 63,5 kg." },
  { q: "O cálculo do IMC consegue diferenciar músculo de gordura?", a: "Não. O IMC avalia apenas a massa total em relação à altura. Por isso, pessoas musculosas ou atletas podem ter um IMC alto (indicando sobrepeso) mesmo com baixo percentual de gordura. Nesses casos, avaliações como bioimpedância e dobras cutâneas são mais adequadas." },
  { q: "Como funciona a tabela de IMC para idosos (60 anos ou mais)?", a: "A classificação de IMC para idosos é diferente porque uma reserva de peso maior atua como fator de proteção contra osteoporose e outras fragilidades. A faixa de normalidade recomendada pelo Ministério da Saúde para idosos vai de 22 a 27 kg/m²." },
  { q: "Quais são os principais riscos à saúde de um IMC na faixa de obesidade?", a: "Um IMC acima de 30 aumenta significativamente o risco de desenvolver condições crônicas graves, tais como diabetes tipo 2, hipertensão arterial, dislipidemias, apnéia do sono e problemas articulares decorrentes da sobrecarga de peso." },
  { q: "O que significa ter o IMC abaixo do peso normal?", a: "Um IMC menor que 18,5 indica baixo peso corporal. Isso pode estar associado a quadros de desnutrição, deficiência de vitaminas essenciais, anemia, perda de massa muscular e enfraquecimento do sistema imunológico, exigindo avaliação médica." },
  { q: "Com que frequência é recomendado calcular o IMC?", a: "Para monitoramento geral de saúde, calcular o IMC a cada 2 ou 3 meses é suficiente, a menos que você esteja em um programa ativo de ganho ou perda de peso orientado por profissionais de saúde." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de IMC - Mestre das Contas",
      "url": "https://mestredascontas.com.br/saude/imc",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para cálculo de Índice de Massa Corporal baseada nos padrões da OMS."
    },
    {
      "@type": "HowTo",
      "name": "Como usar a Calculadora de IMC",
      "description": "Passo a passo simples para calcular o seu Índice de Massa Corporal e descobrir se você está no peso ideal.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Selecione seu Gênero",
          "text": "Escolha entre Masculino ou Feminino. A classificação pode ter pequenas nuances de estrutura corporal.",
          "url": "https://mestredascontas.com.br/saude/imc#calculadora"
        },
        {
          "@type": "HowToStep",
          "name": "Insira seu Peso",
          "text": "Digite o seu peso atual em quilogramas (ex: 75 kg).",
          "url": "https://mestredascontas.com.br/saude/imc#calculadora"
        },
        {
          "@type": "HowToStep",
          "name": "Insira sua Altura",
          "text": "Digite sua altura em centímetros (ex: 175 cm ou 1,75 m).",
          "url": "https://mestredascontas.com.br/saude/imc#calculadora"
        },
        {
          "@type": "HowToStep",
          "name": "Acompanhe o Resultado",
          "text": "O sistema calcula seu IMC instantaneamente e aponta seu peso ideal na tabela da OMS.",
          "url": "https://mestredascontas.com.br/saude/imc#calculadora"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia Definitivo do IMC 2026: Tabela, Cálculo e Dicas de Saúde",
      "description": "Entenda a ciência por trás do Índice de Quetelet, riscos da obesidade e tabela oficial atualizada.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-01-05",
      "dateModified": new Date().toISOString(),
      "image": "https://mestredascontas.com.br/opengraph-image"
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default async function IMCPage() {

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de IMC"
          description="Monitorar seu peso é o primeiro passo para uma vida longa. Utilize nossa ferramenta oficial, atualizada com os protocolos de 2026 da OMS."
          category="Saúde & Bem-Estar"
          icon={<Scale size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose"
          badge="Protocolo OMS"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "IMC Online" }
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
           <LazyAdUnit slot="imc_top" format="horizontal" variant="agency" />
        </div>

        {/* REVISÃO DE SAÚDE (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Informações revisadas com base nas diretrizes da Organização Mundial da Saúde (OMS) para 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section id="calculadora" className="scroll-mt-28 w-full max-w-full">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-100 dark:border-rose-900/30 shadow-xl shadow-rose-100/50 dark:shadow-none p-1 md:p-2">
                    <PrivacyBadge />
                    <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                      <IMCCalculator />
                    </Suspense>
            </div>
            
            <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
            </div>
        </section>

        {/* BANNER MEIO (FIX CLS) */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
           <LazyAdUnit slot="imc_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-rose-500 pl-4">
                Como usar a Calculadora de IMC (Passo a Passo)
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
               Descubra seu Índice de Massa Corporal e veja se está dentro do peso ideal recomendado pela OMS em 4 etapas rápidas:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Selecione seu Sexo</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Escolha entre <strong>Masculino</strong> ou <strong>Feminino</strong>, pois a distribuição de massa gorda e óssea tem pequenas variações naturais.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira seu Peso</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Digite seu peso em quilogramas (kg) no campo correspondente (Exemplo: <code>72</code>).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira sua Altura</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Digite sua altura em centímetros (cm) (Exemplo: se você mede 1,75 m, digite <code>175</code>).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center shrink-0">4</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Confira a Classificação</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">O sistema calcula tudo na hora e plota a barra na faixa correspondente da tabela (Abaixo do Peso, Peso Normal, Sobrepeso ou Obesidade).</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-l-4 border-rose-500 pl-4">
                O que é IMC e por que ele importa?
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
                O <strong>Índice de Massa Corporal (IMC)</strong> não é apenas um número na balança; é um indicador vital de saúde pública reconhecido internacionalmente. Ele funciona como uma "bússola inicial", apontando se o seu peso está adequado para sua altura, ou se existem riscos potenciais à sua saúde.
            </p>
            <p>
                Veja bem, embora o IMC seja um cálculo indireto, ele fornece uma correlação estatisticamente robusta com o percentual de gordura corporal de grandes populações.
            </p>
            <p>
                A verdade é que, embora não seja perfeito (veremos o porquê mais abaixo), ele continua sendo a ferramenta de triagem mais rápida para identificar a obesidade, que é um fator de risco comprovado para doenças crônicas como diabetes tipo 2, hipertensão e problemas cardiovasculares graves.
            </p>
            <p className="text-sm italic text-slate-500 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                Além do controle de peso, lembre-se que a <Link href="/saude/agua" className="text-rose-500 font-bold hover:underline">hidratação correta</Link> e o <Link href="/saude/calorias-diarias" className="text-rose-500 font-bold hover:underline">balanço calórico</Link> são fundamentais para uma vida longa.
            </p>

            {/* TABELA OFICIAL (HTML PURO OBRIGATÓRIO E TOTALMENTE RESPONSIVO) */}
            <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                        <Activity size={16} /> Tabela Oficial de Classificação do IMC (OMS)
                    </h4>
                </div>
                
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left border-collapse min-w-[650px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Faixa de IMC (kg/m²)</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Classificação Oficial</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Nível de Risco Associado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-blue-600 dark:text-blue-400">Abaixo de 18,5</td>
                                <td className="px-6 py-4">Abaixo do peso (Magreza)</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Baixo (mas com riscos de imunidade baixa e desnutrição)</td>
                            </tr>
                            <tr className="bg-green-50/30 dark:bg-green-900/10 hover:bg-green-100/30 dark:hover:bg-green-900/20 transition-colors font-bold text-green-700 dark:text-green-400">
                                <td className="px-6 py-4">18,5 a 24,9</td>
                                <td className="px-6 py-4">Peso Normal (Saudável)</td>
                                <td className="px-6 py-4">Mínimo (Ideal para a saúde geral)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-yellow-600 dark:text-yellow-500">25,0 a 29,9</td>
                                <td className="px-6 py-4">Pré-obesidade (Sobrepeso)</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Moderadamente aumentado</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-orange-600 dark:text-orange-500">30,0 a 34,9</td>
                                <td className="px-6 py-4">Obesidade Grau I</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Aumentado</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium text-red-500 dark:text-red-400">35,0 a 39,9</td>
                                <td className="px-6 py-4">Obesidade Grau II (Grave)</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Muito Alto</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-bold text-red-800 dark:text-red-500">Acima de 40,0</td>
                                <td className="px-6 py-4">Obesidade Grau III (Mórbida)</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-semibold">Extremamente Alto</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* HISTÓRIA: VOCÊ SABIA? */}
            <div className="bg-rose-50 dark:bg-rose-900/10 p-6 md:p-8 rounded-2xl border border-rose-100 dark:border-rose-900/30 my-10 not-prose relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
                    <BookOpen size={120} className="text-rose-900 dark:text-rose-500"/>
                </div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-rose-900 dark:text-rose-400 mb-4 relative z-10">
                    <History size={24} className="text-rose-600 dark:text-rose-500"/> Você Sabia? A Origem do IMC
                </h3>
                <div className="space-y-4 text-rose-900/80 dark:text-rose-200/80 relative z-10 text-sm md:text-base leading-relaxed">
                    <p>
                        Muitos pensam que o IMC foi criado por médicos ou especialistas em nutrição, mas a verdade é surpreendente: ele foi inventado por um astrônomo!
                    </p>
                    <p>
                        Em 1832, o matemático, estatístico e astrônomo belga <strong>Adolphe Quetelet</strong> busqua definir matematicamente o "homem médio" perfeito. Ele descobriu que, na biologia humana saudável, o peso aumenta proporcionalmente ao quadrado da altura.
                    </p>
                    <p>
                        O melhor de tudo? Essa fórmula simples (Peso ÷ Altura²) sobreviveu quase 200 anos por sua praticidade operacional: ela democratizou o diagnóstico nutricional de massa sem a necessidade de exames caros de laboratório.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Brain className="text-purple-600 dark:text-purple-400" /> Como a conta é feita?
            </h3>
            <p>
                A matemática por trás do cálculo é extremamente direta e você pode fazer facilmente com qualquer calculadora de celular.
            </p>
            <p>
                Nós pegamos o peso de uma pessoa (em quilogramas) e o dividimos pelo resultado da altura (em metros) multiplicada por si mesma (altura ao quadrado).
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-center text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 my-4 text-sm md:text-base">
                IMC = Peso ÷ (Altura × Altura)
            </div>

            {/* DICA: CIRCUNFERÊNCIA ABDOMINAL */}
            <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 mb-10 mt-10 not-prose">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-3 flex items-center gap-2">
                    <Ruler className="text-indigo-600 dark:text-indigo-500" /> Dica de Ouro: A Cintura
                </h3>
                <p className="text-sm text-indigo-800 dark:text-indigo-300 mb-4 leading-relaxed">
                    Sabia que o IMC não conta a história toda sozinho? A gordura acumulada no abdômen (conhecida como gordura visceral) é muito perigosa porque envolve órgãos vitais. Pegue uma fita métrica e meça sua cintura na altura do umbigo:
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-slate-800 text-center shadow-sm">
                        <p className="text-xs text-indigo-400 dark:text-indigo-500 uppercase font-bold mb-1">Homens</p>
                        <p className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">Risco aumentado acima de <span className="text-red-500 dark:text-red-400">94 cm</span></p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-slate-800 text-center shadow-sm">
                        <p className="text-xs text-indigo-400 dark:text-indigo-500 uppercase font-bold mb-1">Mulheres</p>
                        <p className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">Risco aumentado acima de <span className="text-red-500 dark:text-red-400">80 cm</span></p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
                <Users className="text-rose-500" /> Quem o IMC engana?
            </h3>
            <p>
                Embora o IMC seja excelente para triagens epidemiológicas populacionais rápidas, ele falha em ser 100% preciso para dois grupos principais de pessoas:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3"><Activity size={20} className="text-blue-500"/> Atletas e Praticantes de Musculação</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Músculo é um tecido mais denso e pesado do que a gordura (ocupa muito menos volume físico). Atletas com alto desenvolvimento muscular podem ter um peso elevado, registrando um IMC indicativo de sobrepeso ou obesidade grau I, quando na verdade possuem pouquíssima gordura corporal e excelente saúde celular.
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3"><User size={20} className="text-rose-500"/> Idosos (Maiores de 60 Anos)</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        Com o passar dos anos, o corpo naturalmente perde massa muscular e acumula tecido adiposo. Além disso, uma pequena reserva extra de peso protege o idoso contra quedas, fraturas e desgaste ósseo acelerado, exigindo uma faixa de normalidade própria e mais tolerante.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
               <Heart className="text-red-500" /> Os Riscos do Excesso
            </h3>
            <p>
                Estar na faixa de sobrepeso ou de obesidade não se resume a uma questão visual ou de estética. A obesidade é clinicamente entendida como um estado inflamatório crônico de baixo grau, que afeta negativamente todo o organismo humano:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 not-prose mt-4">
               <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Diabetes Tipo 2:</strong> A inflamação das células adiposas prejudica a captação de glicose pela insulina.</span></li>
               <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Hipertensão:</strong> O aumento do volume corporal exige que o coração faça mais força para bombear sangue.</span></li>
               <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Apneia Obstrutiva:</strong> O acúmulo de gordura na região cervical estreita as vias aéreas durante o sono.</span></li>
               <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30"><div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"/> <span><strong>Desnutrição Oculta:</strong> Se o IMC estiver abaixo de 18,5, indicando falta de macro e micronutrientes básicos.</span></li>
            </ul>

            <div className="bg-rose-50 dark:bg-rose-900/10 p-6 md:p-8 rounded-2xl border border-rose-100 dark:border-rose-900/30 my-8 not-prose">
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed m-0">
                    <strong>Dica de Saúde e Carreira:</strong> Manter a saúde em dia é o melhor investimento para sua produtividade e qualidade de vida no trabalho sob o regime da <GlossaryTerm slug="inss-previdencia-social">CLT</GlossaryTerm>. A prevenção de doenças crônicas ajuda a evitar afastamentos médicos e a garantir uma aposentadoria tranquila com cobertura do <GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm>.
                </p>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Fontes Oficiais de Saúde
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Conteúdo baseado em diretrizes internacionais:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <a href="https://www.paho.org/pt/topicos/obesidade" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        OPAS/OMS - Organização Pan-Americana da Saúde <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.gov.br/saude/pt-br/assuntos/saude-brasil/eu-quero-ter-peso-saudavel" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Ministério da Saúde - Brasil <ExternalLink size={10}/>
                    </a>
                </div>
            </div>

            <ExpertSignature updatedAt="Junho de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/saude/imc" />
        <SmartCrossLinker currentHref="/saude/imc" category="saude" />

        {/* FAQ ACORDION (EXATAMENTE 7 ITENS SINCRONIZADOS COM JSON-LD) */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <CircleHelp className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes sobre IMC
            </h3>
            <div className="space-y-4 not-prose">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50/50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-rose-100 dark:open:ring-rose-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-rose-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200 font-semibold">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="imc_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ DE IMPRESSÃO */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}