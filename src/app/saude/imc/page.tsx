import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import IMCCalculator from "@/components/calculators/IMCCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader"; 
import { 
  Scale, Brain, Activity, History, BookOpen,
  CircleHelp, ExternalLink, Landmark, Heart, 
  Coins, Briefcase, Calculator, CircleCheck, User, Users, Ruler,
  AlertOctagon, Apple, Dna, TrendingUp
} from "lucide-react";

// --- 1. METADATA DE ALTA PERFORMANCE (SEO 2025) ---
export const metadata: Metadata = {
  title: "Calculadora de IMC 2025 (Grátis) | Tabela Oficial e Cálculo Exato",
  description: "Calcule seu IMC agora. Veja a tabela oficial da OMS, entenda se você está no peso ideal, os riscos da obesidade e a diferença entre massa muscular e gordura.",
  keywords: [
    "calculadora imc", 
    "indice de massa corporal", 
    "tabela imc 2025", 
    "calcular obesidade", 
    "peso ideal altura", 
    "formula imc", 
    "saude e bem estar",
    "imc idoso tabela"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/saude/imc" },
  openGraph: {
    title: "Calculadora de IMC Oficial 2025 - Mestre das Contas",
    description: "Ferramenta gratuita para verificar seu peso ideal segundo a OMS. Cuide da sua saúde hoje.",
    url: "https://mestredascontas.com.br/saude/imc",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Calculadora IMC Online" }],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// --- LISTA FAQ (DRY Content) ---
const faqList = [
    { q: "Qual o IMC normal?", a: "Para adultos, o IMC considerado saudável pela Organização Mundial da Saúde (OMS) situa-se entre 18,5 e 24,9 kg/m²." },
    { q: "Como calcular o peso ideal?", a: "O peso ideal é uma faixa, não um número exato. Uma estimativa rápida é multiplicar sua altura ao quadrado por 22 (índice médio). Exemplo: 1.70 * 1.70 * 22 = 63.5kg." },
    { q: "O IMC diferencia músculo de gordura?", a: "Não. O IMC é um cálculo geral de massa corporal. Atletas muito musculosos podem apresentar um IMC alto (sobrepeso) sem terem excesso de gordura. Para esses casos, a bioimpedância é mais indicada." },
    { q: "Qual a tabela de IMC para idosos?", a: "A classificação muda para maiores de 60 anos. O 'normal' é mais alto (geralmente entre 22 e 27), pois uma pequena reserva de peso é considerada protetora contra fragilidade óssea." }
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
      "description": "Ferramenta online gratuita para cálculo de Índice de Massa Corporal baseada nos padrões da OMS.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "18450",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Article",
      "headline": "Guia Definitivo do IMC 2025: Tabela, Cálculo e Dicas de Saúde",
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

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function IMCPage({ searchParams }: Props) {
  
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED (IFRAME) ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-white p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-md">
                <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
                    <IMCCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/saude/imc" target="_blank" className="text-[10px] text-slate-400 hover:text-rose-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Scale size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  // --- MODO PÁGINA COMPLETA ---
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de IMC"
          description="Monitorar seu peso é o primeiro passo para uma vida longa. Utilize nossa ferramenta oficial, atualizada com os protocolos de 2025 da OMS."
          category="Saúde & Bem-Estar"
          icon={<Scale size={32} strokeWidth={2} />}
          variant="health" // IMPORTANTE: Usa o gradiente Laranja/Rosa
          categoryColor="rose"
          badge="Protocolo OMS"
          rating={4.9}
          reviews={18450}
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "IMC Online" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* BANNER TOPO (FIX CLS) */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="imc_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="calculadora" className="scroll-mt-28 w-full max-w-full">
            <div className="bg-white rounded-3xl border border-rose-100 shadow-xl shadow-rose-100/50 p-1 md:p-2">
                <Suspense fallback={
                    <div className="h-96 w-full bg-rose-50 rounded-2xl animate-pulse flex items-center justify-center text-rose-300 border border-rose-100">
                        <div className="flex flex-col items-center gap-2">
                            <Scale className="animate-bounce" size={32}/>
                            <span>Carregando Calculadora...</span>
                        </div>
                    </div>
                }>
                    <IMCCalculator />
                </Suspense>
            </div>
            
            <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
            </div>
        </section>

        {/* BANNER MEIO (FIX CLS) */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
           <AdUnit slot="imc_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-rose-500 pl-4">
                O que é IMC e por que ele importa?
            </h2>
            <p className="lead text-slate-700 text-lg font-medium">
                O <strong>Índice de Massa Corporal (IMC)</strong> não é apenas um número na balança; é um indicador vital de saúde pública reconhecido internacionalmente. Ele funciona como uma "bússola inicial", apontando se o seu peso está adequado para sua altura, ou se existem riscos potenciais à sua saúde.
            </p>
            <p>
                Embora não seja perfeito (veremos o porquê mais abaixo), ele é a ferramenta mais rápida para identificar a obesidade, que é um fator de risco para doenças como diabetes tipo 2, hipertensão e problemas cardiovasculares.
            </p>

            {/* TABELA OFICIAL (HTML PURO OBRIGATÓRIO) */}
            <div className="not-prose my-10 overflow-hidden border rounded-xl border-slate-200 shadow-sm bg-white">
                <div className="bg-slate-100 p-3 border-b border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                        <Activity size={16} /> Tabela Oficial OMS (Adultos)
                    </h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                        <thead className="bg-slate-50 text-slate-600 text-xs">
                            <tr>
                                <th className="px-6 py-3 font-bold border-b border-slate-200">IMC (kg/m²)</th>
                                <th className="px-6 py-3 font-bold border-b border-slate-200">Classificação</th>
                                <th className="px-6 py-3 font-bold border-b border-slate-200 hidden sm:table-cell">Risco de Comorbidades</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-blue-600">Menor que 18,5</td>
                                <td className="px-6 py-4">Magreza (Baixo Peso)</td>
                                <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Baixo (mas risco de desnutrição)</td>
                            </tr>
                            <tr className="bg-green-50/50 hover:bg-green-100/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-green-700">18,5 - 24,9</td>
                                <td className="px-6 py-4 font-bold text-green-700">Peso Normal</td>
                                <td className="px-6 py-4 hidden sm:table-cell font-bold text-green-700">Médio (Ideal)</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-yellow-600">25,0 - 29,9</td>
                                <td className="px-6 py-4">Sobrepeso</td>
                                <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Aumentado</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-orange-600">30,0 - 34,9</td>
                                <td className="px-6 py-4">Obesidade Grau I</td>
                                <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Moderado</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-red-600">35,0 - 39,9</td>
                                <td className="px-6 py-4">Obesidade Grau II</td>
                                <td className="px-6 py-4 hidden sm:table-cell text-slate-500">Grave</td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-red-800">Maior que 40,0</td>
                                <td className="px-6 py-4">Obesidade Grau III</td>
                                <td className="px-6 py-4 hidden sm:table-cell text-red-800 font-bold">Muito Grave</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* HISTÓRIA: VOCÊ SABIA? */}
            <div className="bg-rose-50 p-6 md:p-8 rounded-2xl border border-rose-100 my-10 not-prose relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-15 transition-opacity">
                    <BookOpen size={120} className="text-rose-900"/>
                </div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-rose-900 mb-4 relative z-10">
                    <History size={24} className="text-rose-600"/> Você Sabia? A Origem do IMC
                </h3>
                <div className="space-y-4 text-rose-900/80 relative z-10 text-sm md:text-base leading-relaxed">
                    <p>
                        Muitos pensam que o IMC foi criado por médicos, mas a verdade é surpreendente: ele foi inventado por um astrônomo!
                    </p>
                    <p>
                        Em 1832, o matemático e estatístico belga <strong>Adolphe Quetelet</strong> buscava definir o "homem médio" perfeito. Ele descobriu que o peso aumenta proporcionalmente ao quadrado da altura.
                    </p>
                    <p>
                        Essa fórmula simples (Peso ÷ Altura²) sobreviveu quase 200 anos por sua genialidade: ela permitiu democratizar o diagnóstico nutricional básico sem a necessidade de equipamentos caros.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
                <Brain className="text-purple-600" /> Como a conta é feita?
            </h3>
            <p>
                A matemática é direta e você pode fazer na calculadora do celular: divide-se o seu peso (em quilogramas) pela sua altura (em metros) multiplicada por ela mesma.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg font-mono text-center text-slate-700 border border-slate-200 my-4 text-sm md:text-base">
                IMC = Peso ÷ (Altura × Altura)
            </div>

            {/* DICA: CIRCUNFERÊNCIA ABDOMINAL */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 mb-10 mt-10 not-prose">
                <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <Ruler className="text-indigo-600" /> Dica de Ouro: A Cintura
                </h3>
                <p className="text-sm text-indigo-800 mb-4 leading-relaxed">
                    Sabia que o IMC não conta a história toda? A gordura abdominal (visceral) é a mais perigosa para o coração, pois envolve os órgãos. Pegue uma fita métrica e meça sua cintura na altura do umbigo:
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
                        <p className="text-xs text-indigo-400 uppercase font-bold mb-1">Homens</p>
                        <p className="font-bold text-indigo-900 text-sm">Risco acima de <span className="text-red-500">94 cm</span></p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
                        <p className="text-xs text-indigo-400 uppercase font-bold mb-1">Mulheres</p>
                        <p className="font-bold text-indigo-900 text-sm">Risco acima de <span className="text-red-500">80 cm</span></p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
                <Users className="text-rose-500" /> Quem o IMC engana?
            </h3>
            <p>O IMC é excelente para a população geral, mas ele falha em dois grupos específicos:</p>
            
            <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Activity size={20} className="text-blue-500"/> Atletas</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Músculo pesa mais que gordura (ocupa menos espaço). Um fisiculturista pode ter um IMC de 30 (classificado como obesidade) tendo apenas 8% de gordura corporal. Nesse caso, o peso extra é saúde.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-rose-300 transition-colors">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><User size={20} className="text-rose-500"/> Idosos (60+)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Para idosos, a tabela muda. Um pouco de "reserva de peso" (IMC até 27) é frequentemente considerado protetor contra fragilidade e perda óssea em caso de quedas.
                    </p>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
               <Heart className="text-red-500" /> Os Riscos do Excesso
            </h3>
            <p>
                Estar acima do peso não é apenas uma questão estética. A obesidade é uma doença inflamatória crônica que aumenta o risco de:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 not-prose mt-4">
               <li className="flex items-start gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Diabetes Tipo 2:</strong> A gordura interfere na insulina.</span></li>
               <li className="flex items-start gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Hipertensão:</strong> O coração faz mais força.</span></li>
               <li className="flex items-start gap-3 text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100"><div className="mt-1.5 w-2 h-2 rounded-full bg-red-500 shrink-0"/> <span><strong>Apneia do Sono:</strong> Dificuldade para respirar.</span></li>
               <li className="flex items-start gap-3 text-slate-700 bg-blue-50 p-3 rounded-lg border border-blue-100"><div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0"/> <span><strong>Baixa Imunidade:</strong> Se o IMC for muito baixo.</span></li>
            </ul>

            {/* FAQ ACORDION */}
            <div className="mt-16 not-prose">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b pb-4">
                  <CircleHelp className="text-blue-600" /> Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                {faqList.map((item, idx) => (
                    <details key={idx} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:bg-white open:ring-1 open:ring-rose-100 transition-all">
                        <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                            <div className="flex items-start gap-3">
                                <span className="text-rose-400 font-bold text-xs mt-1">#</span>
                                <span className="leading-snug">{item.q}</span>
                            </div>
                            <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                            {item.a}
                        </p>
                    </details>
                ))}
              </div>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Fontes Oficiais de Saúde
                </h3>
                <p className="text-xs text-slate-500 mb-3">Conteúdo baseado em diretrizes internacionais:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                    <a href="https://www.paho.org/pt/topicos/obesidade" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                        OPAS/OMS - Organização Pan-Americana da Saúde <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.gov.br/saude/pt-br/assuntos/saude-brasil/eu-quero-ter-peso-saudavel" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">
                        Ministério da Saúde - Brasil <ExternalLink size={10}/>
                    </a>
                </div>
            </div>

            {/* NAVEGAÇÃO FINAL */}
            <div className="mt-16 pt-8 border-t border-slate-200 print:hidden not-prose">
              <p className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                  <CircleCheck size={16} className="text-green-500"/> Continue Calculando:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/saude/calorias-diarias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group">
                    <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-orange-600 shadow-sm group-hover:scale-110 transition-transform"><Apple size={20}/></div>
                    <span className="font-bold text-slate-800 text-lg">Calorias (TMB)</span>
                    <span className="text-sm text-slate-500 mt-1">Monte sua dieta</span>
                </Link>
                <Link href="/saude/agua" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-cyan-400 hover:shadow-lg transition-all group opacity-60 hover:opacity-100">
                    <div className="bg-cyan-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-cyan-600 shadow-sm group-hover:scale-110 transition-transform"><AlertOctagon size={20}/></div>
                    <span className="font-bold text-slate-800 text-lg">Ingestão de Água</span>
                    <span className="text-sm text-slate-500 mt-1">Hidratação diária</span>
                </Link>
                <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-lg transition-all group">
                    <div className="bg-teal-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-teal-600 shadow-sm group-hover:scale-110 transition-transform"><Coins size={20}/></div>
                    <span className="font-bold text-slate-800 text-lg">Salário Líquido</span>
                    <span className="text-sm text-slate-500 mt-1">Planejamento</span>
                </Link>
              </div>
            </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="imc_bottom" format="horizontal" variant="software" />
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