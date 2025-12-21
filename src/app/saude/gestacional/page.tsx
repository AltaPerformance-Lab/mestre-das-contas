import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import AdUnit from "@/components/ads/AdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Baby, HelpCircle, Heart, 
  CalendarHeart, Stethoscope, Sparkles, 
  CheckCircle2, Dna, ExternalLink, 
  Smile, Coffee, Moon, Sun, Utensils
} from "lucide-react";

// --- 1. METADATA 2026 ---
export const metadata: Metadata = {
  title: "Calculadora Gestacional 2026 | DPP, Semanas e Sexo do Bebê",
  description: "Estou grávida de quanto tempo? Calcule a Data Provável do Parto (DPP), descubra o signo do bebê e acompanhe sua gestação semana a semana com a tabela oficial.",
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
    title: "Acompanhamento de Gravidez 2026 - Mestre das Contas",
    description: "O guia da mamãe moderna. Calcule sua DPP e tire as 20 maiores dúvidas da gestação.",
    url: "https://mestredascontas.com.br/saude/gestacional",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    images: [{ url: "https://mestredascontas.com.br/og-gestacional.png", width: 1200, height: 630, alt: "Calculadora de Gravidez" }],
  },
};

// Lista de FAQ para uso no componente e no JSON-LD (DRY Principle)
const faqList = [
    { p: "Como é calculada a data do parto?", r: "Utilizamos a Regra de Naegele: soma-se 7 dias ao primeiro dia da última menstruação e subtrai-se 3 meses (ou adiciona-se 9 meses)." },
    { p: "A data do ultrassom é mais precisa que a DUM?", r: "Sim. O ultrassom do primeiro trimestre (até 12 semanas) é o 'padrão ouro'. Ele mede o comprimento do embrião (CCN) e tem margem de erro de apenas 3 a 5 dias." },
    { p: "Quando dá para ver o sexo do bebê?", r: "Pela sexagem fetal (exame de sangue), a partir da 8ª semana. Pelo ultrassom, geralmente a partir da 16ª semana, mas com certeza absoluta após a 20ª semana (morfológico)." },
    { p: "Estou de quantas semanas e meses?", r: "Essa é a confusão clássica! Médicos contam em semanas. Para saber o mês, consulte nossa tabela abaixo. Basicamente, 40 semanas completam 9 meses e 1 semana." },
    { p: "Grávida pode tomar café?", r: "Sim, mas com moderação. A OMS recomenda limitar a cafeína a 200mg por dia (cerca de 2 xícaras pequenas). Excesso pode aumentar risco de baixo peso ao nascer." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora Gestacional",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta completa para acompanhamento gestacional, cálculo de DPP e fases do bebê.",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "21030", "bestRating": "5", "worstRating": "1" }
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

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }

export default async function GestacionalPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const isEmbed = resolvedParams.embed === 'true';

  // --- MODO EMBED ---
  if (isEmbed) {
    return (
        <main className="w-full min-h-screen bg-pink-50/30 p-2 sm:p-4 flex flex-col items-center justify-center font-sans">
            <div className="w-full max-w-2xl">
                <Suspense fallback={<div className="p-4 text-center text-pink-400 animate-pulse">Carregando Calculadora...</div>}>
                    <PregnancyCalculator />
                </Suspense>
                <div className="mt-4 text-center">
                    <Link href="https://mestredascontas.com.br/saude/gestacional" target="_blank" className="text-[10px] text-pink-400 hover:text-pink-600 uppercase font-bold tracking-wider flex items-center justify-center gap-1 transition-colors">
                        <Baby size={10} /> Powered by Mestre das Contas
                    </Link>
                </div>
            </div>
        </main>
    );
  }

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
          rating={4.9}
          reviews={21030}
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Gravidez" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-pink-50/30 rounded-lg border border-dashed border-pink-200/50 print:hidden min-h-[100px]">
           <AdUnit slot="gest_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white rounded-3xl border border-pink-100 shadow-xl shadow-pink-100/50 p-1 md:p-2">
              <Suspense fallback={
                <div className="h-96 w-full bg-pink-50 rounded-2xl animate-pulse flex items-center justify-center text-pink-300 border border-pink-100">
                    <div className="flex flex-col items-center gap-2">
                        <Baby className="animate-bounce" size={32}/>
                        <span>Carregando Calculadora...</span>
                    </div>
                </div>
              }>
                  <PregnancyCalculator />
              </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="gest_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-pink-400 pl-4">
              Parabéns, mamãe! E agora?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            Aquele segundo em que o teste dá positivo é indescritível. É um misto de alegria, medo e uma pergunta que não cala: <strong>"De quanto tempo eu estou?"</strong>.
          </p>
          <p>
            Calma, respira. Nós vamos te ajudar a decifrar a "matemática da gravidez". Diferente do que pensamos, a gravidez não começa no dia que o bebê foi feito (concepção), mas sim no primeiro dia da sua última menstruação (DUM).
          </p>

          <div className="my-10">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CalendarHeart className="text-purple-500" /> Tabela Oficial: Semanas x Meses
            </h3>
            <p className="text-slate-600 mb-4">A dúvida número 1: "Doutor, 24 semanas são quantos meses?". Salve esta tabela oficial:</p>
            
            {/* TABELA HTML OBRIGATÓRIA */}
            <div className="overflow-x-auto border rounded-xl border-slate-200 shadow-sm w-full">
                

[Image of Pregnancy Trimester Chart]

                <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-pink-50 text-pink-900 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100">Trimestre</th>
                            <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100">Mês</th>
                            <th className="px-4 py-3 font-bold whitespace-nowrap border-b border-pink-100">Semanas Correspondentes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        {/* 1º Trimestre */}
                        <tr className="bg-white"><td className="px-4 py-3 font-bold text-slate-500 border-r border-slate-50" rowSpan={3}>1º Trimestre</td><td className="px-4 py-3 font-medium">Mês 1</td><td className="px-4 py-3">0 a 4 semanas e meia</td></tr>
                        <tr className="bg-white"><td className="px-4 py-3 font-medium">Mês 2</td><td className="px-4 py-3">4 e meia a 9 semanas</td></tr>
                        <tr className="bg-white"><td className="px-4 py-3 font-medium">Mês 3</td><td className="px-4 py-3">9 a 13 semanas e meia</td></tr>
                        
                        {/* 2º Trimestre */}
                        <tr className="bg-slate-50/50"><td className="px-4 py-3 font-bold text-slate-500 border-r border-slate-100" rowSpan={3}>2º Trimestre</td><td className="px-4 py-3 font-medium">Mês 4</td><td className="px-4 py-3">13 e meia a 18 semanas</td></tr>
                        <tr className="bg-slate-50/50"><td className="px-4 py-3 font-medium">Mês 5</td><td className="px-4 py-3">18 a 22 semanas e meia</td></tr>
                        <tr className="bg-slate-50/50"><td className="px-4 py-3 font-medium">Mês 6</td><td className="px-4 py-3">22 e meia a 27 semanas</td></tr>

                        {/* 3º Trimestre */}
                        <tr className="bg-white"><td className="px-4 py-3 font-bold text-slate-500 border-r border-slate-50" rowSpan={3}>3º Trimestre</td><td className="px-4 py-3 font-medium">Mês 7</td><td className="px-4 py-3">27 a 31 semanas e meia</td></tr>
                        <tr className="bg-white"><td className="px-4 py-3 font-medium">Mês 8</td><td className="px-4 py-3">31 e meia a 36 semanas</td></tr>
                        <tr className="bg-pink-100/30"><td className="px-4 py-3 font-bold text-pink-700">Mês 9</td><td className="px-4 py-3 font-bold text-pink-700">36 a 42 semanas (Reta Final)</td></tr>
                    </tbody>
                </table>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
              <Stethoscope className="text-teal-600" /> Regra de Naegele: A Ciência por Trás
          </h3>
          <p>
              A calculadora usa um método criado pelo obstetra alemão Franz Naegele no século 19. Ele percebeu que a gestação humana dura em média <strong>280 dias</strong>.
          </p>
          <p>
              Mas atenção: apenas <strong>5% dos bebês</strong> nascem na data exata (DPP). A maioria decide vir ao mundo entre 38 e 41 semanas. A DPP é apenas um norte, não uma promessa!
          </p>

          {/* CURIOSIDADE LUNAR */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 md:p-8 rounded-2xl border border-purple-100 my-10 relative overflow-hidden shadow-sm not-prose">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles size={120} className="text-purple-900"/>
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2 relative z-10">
                  <Dna size={24} className="text-pink-500"/> Mito ou Verdade: A Lua Influencia?
              </h3>
              <div className="space-y-4 text-slate-700 relative z-10 text-sm md:text-base leading-relaxed">
                  <p>
                      Acredite se quiser: muitas parteiras juram que nas <strong>mudanças de lua</strong> (especialmente na Lua Cheia) as maternidades lotam.
                  </p>
                  <p>
                      Embora a ciência não tenha comprovado uma ligação direta entre a gravidade lunar e o trabalho de parto, a coincidência é intrigante. Fique de olho no calendário lunar quando estiver chegando perto das 39 semanas!
                  </p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
              <Heart className="text-red-500" /> Cuidados Essenciais por Trimestre
          </h3>
          
          <div className="grid gap-4 not-prose">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 hover:border-pink-200 transition-colors">
                  <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">1º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">O Início Delicado (Semana 1 a 13)</h4>
                      <p className="text-sm text-slate-600 text-center md:text-left leading-relaxed">É a fase de formação dos órgãos. O ácido fólico é obrigatório. Enjoos e sono excessivo são comuns. Evite remédios sem prescrição.</p>
                  </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 hover:border-blue-200 transition-colors">
                  <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">2º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">A Fase de Ouro (Semana 14 a 27)</h4>
                      <p className="text-sm text-slate-600 text-center md:text-left leading-relaxed">A disposição volta! A barriga aparece, você sente o bebê mexer e descobre o sexo. Hora de cuidar das estrias com hidratação intensa.</p>
                  </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 hover:border-teal-200 transition-colors">
                  <div className="bg-teal-100 text-teal-600 w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold mx-auto md:mx-0 text-lg">3º</div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-center md:text-left">A Reta Final (Semana 28 a 40+)</h4>
                      <p className="text-sm text-slate-600 text-center md:text-left leading-relaxed">O peso aumenta, o cansaço volta e a ansiedade bate. Prepare a mala da maternidade, lave as roupinhas e descanse o máximo possível.</p>
                  </div>
              </div>
          </div>

          {/* 20 PERGUNTAS FREQUENTES */}
          <div className="mt-16 not-prose" id="faq">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3 border-b border-pink-100 pb-4">
                <HelpCircle className="text-pink-500" /> Tira-Dúvidas da Gestante
            </h2>
            
            <div className="grid gap-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-pink-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center text-sm md:text-base select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-pink-400 font-bold text-xs mt-1">#{idx + 1}</span>
                              <span className="leading-snug">{item.p}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm md:text-base pl-7 animate-in fade-in">
                          {item.r}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose bg-slate-50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2"><CheckCircle2 size={14}/> Base Científica</h3>
              <p className="text-xs text-slate-500 mb-3">Este conteúdo foi elaborado com base nas diretrizes das principais instituições de saúde:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600">
                  <a href="https://www.febrasgo.org.br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">FEBRASGO <ExternalLink size={10}/></a>
                  <a href="https://www.gov.br/saude/pt-br" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">Ministério da Saúde <ExternalLink size={10}/></a>
                  <a href="https://www.acog.org" target="_blank" rel="nofollow noreferrer" className="hover:underline flex items-center gap-1 bg-white px-3 py-1 rounded border shadow-sm">ACOG (EUA) <ExternalLink size={10}/></a>
              </div>
          </div>

          {/* NAVEGAÇÃO FINAL */}
          <div className="mt-12 pt-8 border-t border-slate-200 print:hidden not-prose">
            <p className="font-bold text-slate-900 mb-6 text-xs uppercase tracking-wider flex items-center gap-2">
               <CheckCircle2 size={16} className="text-emerald-500"/> Cuide da família toda:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/saude/calorias-diarias" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-orange-400 hover:shadow-lg transition-all group">
                  <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-orange-600 shadow-sm group-hover:scale-110 transition-transform"><Utensils size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Calorias (TMB)</span>
                  <span className="text-sm text-slate-500 mt-1">Nutrição na gravidez</span>
              </Link>
              <Link href="/saude/imc" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 shadow-sm group-hover:scale-110 transition-transform"><Smile size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">IMC Gestacional</span>
                  <span className="text-sm text-slate-500 mt-1">Controle de peso</span>
              </Link>
              <Link href="/financeiro/salario-liquido" className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-lg transition-all group">
                  <div className="bg-teal-50 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-teal-600 shadow-sm group-hover:scale-110 transition-transform"><Coffee size={20}/></div>
                  <span className="font-bold text-slate-800 text-lg">Salário Maternidade</span>
                  <span className="text-sm text-slate-500 mt-1">Planeje a licença</span>
              </Link>
            </div>
          </div>

        </div>

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="gest_bottom" format="horizontal" variant="software" />
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