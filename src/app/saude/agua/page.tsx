import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WaterCalculator from "@/components/calculators/WaterCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Droplet, Activity, HelpCircle, 
  CheckCircle2, BookOpen, Calculator,
  GlassWater, Zap, Brain, AlertOctagon, HeartPulse,
  Landmark, ExternalLink, Scale, Apple, Dna, AlertTriangle, ShieldCheck
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

import { calculateWater } from "@/lib/calculators/health";


// --- 1. METADATA DE ALTA PERFORMANCE (SEO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Água Diária 2026 (Grátis) | Tabela Oficial por Peso";
  const description = "Descubra exatamente quantos litros de água beber por dia em 2026 baseado no seu peso e atividade física. Tabela oficial de hidratação atualizada da OMS.";

  return {
    title,
    description,
    keywords: [
      "calculadora ingestão de agua", 
      "quantos litros de agua beber por dia", 
      "tabela agua por peso", 
      "calculo 35ml por kg", 
      "importancia hidratação", 
      "beber agua emagrece"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/saude/agua" },
    openGraph: {
      title: "Calculadora de Água Diária 2026 | Meta por Peso",
      description: "Saiba exatamente quanta água você precisa beber hoje baseado no seu peso e atividade física. Grátis e atualizado.",
      url: "https://mestredascontas.com.br/saude/agua",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Água Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Você está bebendo água o suficiente?",
      description: "Calcule sua meta diária de hidratação em segundos com nossa ferramenta.",
      images: ["/opengraph-image"],
    } };
}

const faqList = [
    { q: "Qual a regra básica para beber água?", a: "A diretriz geral para adultos saudáveis em climas temperados é de aproximadamente 35ml de água para cada quilo de peso corporal." },
    { q: "Sucos e chás contam como água?", a: "Sim, alimentos e outras bebidas contribuem para a hidratação, mas a água pura deve ser a fonte principal por não conter açúcares ou cafeína." },
    { q: "Quais os sintomas de desidratação?", a: "Sede intensa, boca seca, urina escura e com odor forte, cansaço inexplicável, tontura e dor de cabeça." },
    { q: "Beber água demais faz mal?", a: "Sim, existe uma condição rara chamada hiponatremia (intoxicação por água), que ocorre quando os rins não conseguem eliminar o excesso, diluindo o sódio no sangue." },
    { q: "Atletas precisam de mais água?", a: "Com certeza. Durante exercícios intensos, deve-se repor o líquido perdido pelo suor. Recomenda-se adicionar 500ml a 1L por hora de atividade física." }
];

export default async function AguaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora de Ingestão de Água - Mestre das Contas",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta para cálculo personalizado da meta de hidratação diária baseada no peso e atividade física."
      },
      {
        "@type": "HowTo",
        "name": "Como Calcular Meta Diária de Água",
        "description": "Descubra como calcular seu consumo ideal de água por dia com base no seu peso e rotina de exercícios.",
        "totalTime": "PT15S",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Informe seu Peso",
            "text": "Digite seu peso corporal atual em kg para servir de base para o cálculo dos 35ml por kg.",
            "url": "https://mestredascontas.com.br/saude/agua#ferramenta"
          },
          {
            "@type": "HowToStep",
            "name": "Defina o Nível de Atividade Física",
            "text": "Selecione a intensidade de exercício físico diário para compensar a perda de líquido através do suor.",
            "url": "https://mestredascontas.com.br/saude/agua#ferramenta"
          },
          {
            "@type": "HowToStep",
            "name": "Veja e Acompanhe sua Meta",
            "text": "O sistema calcula instantaneamente sua meta em litros e a quantidade recomendada de copos de água de 200ml ou 300ml.",
            "url": "https://mestredascontas.com.br/saude/agua#ferramenta"
          }
        ]
      },
      {
        "@type": "Article",
        "headline": "Guia de Hidratação 2026: Quanta Água seu Corpo Realmente Precisa?",
        "description": "Entenda a ciência por trás da regra dos 35ml por quilo e como a hidratação correta impacta sua saúde e metabolismo.",
        "author": { "@type": "Organization", "name": "Mestre das Contas" },
        "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
        "datePublished": "2024-01-10",
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

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Água"
          description="A hidratação é o combustível invisível do seu corpo. Descubra a meta diária exata de água baseada no seu peso e nível de atividade física."
          category="Saúde & Vitalidade"
          icon={<Droplet size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose"
          badge="Hidratação 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Calculadora de Água" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO DE SAÚDE (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Cálculo baseado em diretrizes nutricionais modernas (35ml/kg) validadas para 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="agua_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
          <div className="mb-8">
               <PrivacyBadge />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-cyan-100 dark:border-slate-800 shadow-xl shadow-cyan-100/50 dark:shadow-none p-1 md:p-2">
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <WaterCalculator />
                  </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="agua_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
                Como Usar a Calculadora de Água (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Descubra seu consumo de água ideal em 3 etapas rápidas:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira seu Peso</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Insira seu peso corporal em kg. O cálculo básico usa a proporção ideal de 35ml por kg.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Atividade Física</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Selecione seu nível de atividade para que o algoritmo compense a perda de líquidos por transpiração.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Veja em Copos</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">O resultado mostra a meta em litros e também traduz em quantos copos normais (200ml/300ml) você deve beber.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-cyan-500 pl-4">
               Por que 2 litros não é para todos?
            </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já deve ter ouvido que "beber 2 litros de água por dia" é o padrão. Mas pense bem: um atleta de 100kg gasta a mesma água que uma pessoa sedentária de 50kg? <strong>Claro que não.</strong>
          </p>
          <p>
            A necessidade de água é individual. Ela depende do seu peso corporal (mais massa exige mais hidratação), do clima onde você mora e do seu nível de atividade física. Nossa ferramenta utiliza a base de 35ml por quilo, recomendada por nutricionistas.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
              <div className="bg-blue-50 dark:bg-slate-950 p-6 rounded-2xl border border-blue-100 dark:border-slate-800">
                  <div className="text-blue-600 mb-3"><Zap size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Energia</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A desidratação leve é a causa nº 1 de fadiga e cansaço mental durante o dia.</p>
              </div>
              <div className="bg-cyan-50 dark:bg-slate-950 p-6 rounded-2xl border border-cyan-100 dark:border-slate-800">
                  <div className="text-cyan-600 mb-3"><Brain size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Foco</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Seu cérebro é 75% água. Beber água melhora a concentração e a memória de curto prazo.</p>
              </div>
              <div className="bg-indigo-50 dark:bg-slate-950 p-6 rounded-2xl border border-indigo-100 dark:border-slate-800">
                  <div className="text-indigo-600 mb-3"><Activity size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Metabolismo</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A água é essencial para a queima de gordura e o bom funcionamento dos rins e intestino.</p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <HeartPulse size={24} className="text-red-500" /> Sinais que você precisa beber água agora
          </h3>
          <p>
            Muitas vezes confundimos a sensação de sede com fome. Antes de atacar um lanche, beba um copo de água e espere 15 minutos. Além disso, preste atenção à cor da sua urina:
          </p>

          <div className="flex flex-col gap-3 my-8 not-prose">
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="w-4 h-12 bg-yellow-50 rounded-full border border-slate-200"></div>
                  <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Clara/Transparente</h5>
                      <p className="text-xs text-slate-500">Hidratação ideal. Continue assim!</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="w-4 h-12 bg-yellow-200 rounded-full border border-slate-200"></div>
                  <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Amarelo Médio</h5>
                      <p className="text-xs text-slate-500">Sinal de alerta. Beba um copo de água nos próximos minutos.</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="w-4 h-12 bg-orange-400 rounded-full border border-slate-200"></div>
                  <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Escura/Concentrada</h5>
                      <p className="text-xs text-red-500 font-bold">Desidratação. Seu corpo está sofrendo para filtrar toxinas.</p>
                  </div>
              </div>
          </div>

          <div className="mt-12 not-prose" id="faq">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-cyan-600 dark:text-cyan-500" /> Dúvidas sobre Hidratação
            </h3>
            <div className="space-y-3">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center text-sm select-none">
                      {item.q} <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>

          {/* REFERÊNCIAS OFICIAIS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes de Saúde
              </h3>
              <p className="text-xs text-slate-500 mb-3">Conteúdo baseado em diretrizes internacionais:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.sbn.org.br/publico/dicas-de-saude-renal/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Sociedade Brasileira de Nefrologia <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Mayo Clinic (Nutrition) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/saude/agua" category="saude" />

        {/* --- ANÚNCIO BOTTOM (ESTRATÉGICO) --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="agua_bottom" format="horizontal" variant="software" />
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