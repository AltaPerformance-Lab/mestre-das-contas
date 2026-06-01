import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import { calculateCalorias } from "@/lib/calculators/health";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox"; 
import PageHeader from "@/components/layout/PageHeader";
import { 
  Flame, HelpCircle, BookOpen, Activity, 
  Scale, Utensils, Zap, 
  CheckCircle2, TrendingUp, Apple, Briefcase,
  Dna, AlertTriangle, ArrowRight, ShieldCheck, TrendingDown
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO 2026) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Calorias Diárias 2026 | TMB e Gasto Calórico Total";
  const description = "Calcule sua Taxa Metabólica Basal (TMB) e Gasto Calórico Total em segundos. Planeje sua dieta de 2026 com precisão científica e gratuitamente.";

  return {
    title,
    description,
    keywords: ["calculadora de calorias", "taxa metabólica basal", "calcular tmb", "tdee calculator", "dieta para emagrecer"],
    alternates: { canonical: "https://mestredascontas.com.br/saude/calorias-diarias" },
    openGraph: {
      title: "Calculadora de Calorias Diárias 2026 | TMB e Gasto Total",
      description: "Saiba exatamente quantas calorias seu corpo gasta por dia e planeje sua dieta para emagrecer ou ganhar massa. Grátis e preciso.",
      url: "https://mestredascontas.com.br/saude/calorias-diarias",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Calorias Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quantas calorias você queima por dia?",
      description: "Use nossa calculadora de TMB e Gasto Calórico para ajustar seu plano alimentar.",
      images: ["/opengraph-image"],
    }
  };
}

const faqList = [
    { q: "O que é Taxa Metabólica Basal (TMB)?", a: "É o mínimo de calorias que seu corpo precisa para manter as funções vitais (respiração, batimentos, temperatura) em repouso absoluto." },
    { q: "Qual a diferença entre TMB e Gasto Total?", a: "A TMB é o repouso. O Gasto Total (GET) inclui sua TMB mais as calorias gastas com exercícios, trabalho e digestão de alimentos." },
    { q: "Como a calculadora funciona?", a: "Usamos a fórmula de Mifflin-St Jeor, considerada a mais precisa para a população moderna pela Academia de Nutrição e Dietética." },
    { q: "Para emagrecer, quanto devo comer?", a: "Geralmente recomenda-se um déficit de 300 a 500 calorias abaixo do seu Gasto Diário Total. Nunca coma menos que sua TMB sem supervisão." },
    { q: "O que é o efeito térmico dos alimentos?", a: "É o gasto de energia que seu corpo tem para digerir o que você come. Proteínas gastam muito mais energia para serem processadas que gorduras." }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Calorias Diárias - Mestre das Contas",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta profissional para cálculo de TMB (Taxa Metabólica Basal) e planejamento de déficit ou superávit calórico."
    },
    {
      "@type": "HowTo",
      "name": "Como Calcular Gasto Calórico e TMB",
      "description": "Descubra como calcular seu gasto calórico total e programar um déficit ou superávit calórico eficiente.",
      "totalTime": "PT30S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Escolha o Sexo e Insira sua Idade",
          "text": "Selecione o sexo biológico e digite sua idade atual em anos para calibrar a taxa metabólica basal.",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Informe Peso, Altura e Nível de Atividade",
          "text": "Insira seu peso (kg), sua altura (cm) e selecione o seu nível de atividade física semanal (de sedentário a extremamente ativo).",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Selecione seu Objetivo",
          "text": "Escolha se o seu objetivo é perder peso (déficit), manter o peso ou ganhar peso (hipertrofia). O sistema calculará as calorias diárias sugeridas imediatamente.",
          "url": "https://mestredascontas.com.br/saude/calorias-diarias#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia de Calorias e Metabolismo 2026: Como Calcular seu Gasto Real",
      "description": "Entenda como funciona a Taxa Metabólica Basal e como o déficit calórico controlado pode ajudar na perda de peso saudável.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-02-15",
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
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
        { "@type": "ListItem", "position": 2, "name": "Saúde", "item": "https://mestredascontas.com.br/saude" },
        { "@type": "ListItem", "position": 3, "name": "Calorias Diárias", "item": "https://mestredascontas.com.br/saude/calorias-diarias" }
      ]
    }
  ]
};

export default async function CaloriasPage() {

  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Calorias"
          description="Quer emagrecer, manter o peso ou ganhar massa? Descubra seu gasto calórico real e saiba exatamente quanto consumir por dia."
          category="Saúde & Nutrição"
          icon={<Flame size={32} strokeWidth={2} />}
          variant="health"
          categoryColor="rose"
          badge="Precisão 2026"
          breadcrumbs={[
            { label: "Saúde", href: "/saude" },
            { label: "Calorias Diárias" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO DE SAÚDE (E-E-A-T) */}
        <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-orange-700 dark:text-orange-300 mb-2">
          <ShieldCheck size={18} className="text-orange-600 shrink-0" />
          <span>Cálculo fundamentado na Equação de Mifflin-St Jeor, amplamente aceita pela comunidade médica em 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="calorias_top" format="horizontal" variant="agency" />
        </div>

        {/* --- FERRAMENTA PRINCIPAL --- */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
          <div className="mb-8">
               <PrivacyBadge />
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-orange-100 dark:border-slate-800 shadow-xl shadow-orange-100/50 dark:shadow-none p-1 md:p-2">
                  <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                    <CalorieCalculator />
                  </Suspense>
          </div>
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="calorias_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-orange-500 pl-4">
                Como Usar a Calculadora de Calorias Diárias (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Planeje sua ingestão de energia com precisão científica seguindo as etapas abaixo:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dados Fisiológicos</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Selecione seu sexo biológico, informe sua idade atual, peso em kg e sua altura em centímetros.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Nível de Atividade</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Escolha a opção de atividade física semanal que melhor descreve sua rotina (sedentário até atleta).</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Escolha seu Objetivo</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Marque se deseja Emagrecer (déficit), Manter o Peso ou Ganhar Peso (superávit) para obter sua meta de calorias diárias e macronutrientes.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-orange-500 pl-4">
               Matemática do Emagrecimento
            </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
             Você já ouviu que "comer menos e se exercitar mais" é o segredo. Mas quanto menos? E quanto exercício? Sem números, você está apenas chutando.
          </p>
          <p>
            O corpo humano é uma máquina térmica. Se você consome mais energia (calorias) do que gasta, ele armazena o excesso em forma de gordura. Se consome menos, ele é obrigado a usar suas reservas. Nossa calculadora descobre seu "ponto de equilíbrio".
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <TrendingDown className="text-emerald-500"/> Déficit Calórico
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Consumir de 300 a 500 kcal a menos por dia. É o caminho seguro e sustentável para a perda de gordura sem perder massa muscular.</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <TrendingUp className="text-blue-500"/> Superávit Calórico
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Consumir mais calorias do que gasta. Essencial para quem busca hipertrofia (ganho de músculos) e força.</p>
              </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <Utensils className="text-orange-500" /> Macronutrientes: O que comer?
          </h3>
          <p>
            Tão importante quanto a quantidade é a qualidade. Calorias vindas de proteínas têm um efeito térmico maior e ajudam na saciedade, enquanto calorias de açúcares refinados causam picos de insulina que favorecem o acúmulo de gordura.
          </p>

          <ul className="space-y-4 my-8">
              <li className="flex items-start gap-3">
                  <div className="bg-orange-100 text-orange-600 p-1 rounded-md mt-1 shrink-0"><CheckCircle2 size={16}/></div>
                  <span><strong>Proteínas (4 kcal/g):</strong> Construção muscular e saciedade.</span>
              </li>
              <li className="flex items-start gap-3">
                  <div className="bg-orange-100 text-orange-600 p-1 rounded-md mt-1 shrink-0"><CheckCircle2 size={16}/></div>
                  <span><strong>Carboidratos (4 kcal/g):</strong> Fonte primária de energia para o cérebro e treinos intensos.</span>
              </li>
              <li className="flex items-start gap-3">
                  <div className="bg-orange-100 text-orange-600 p-1 rounded-md mt-1 shrink-0"><CheckCircle2 size={16}/></div>
                  <span><strong>Gorduras (9 kcal/g):</strong> Essenciais para a produção hormonal e absorção de vitaminas.</span>
              </li>
          </ul>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden my-12 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Zap size={200} />
              </div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10 text-orange-400">
                  A Regra dos 80/20
              </h3>
              <p className="text-slate-300 mb-0 relative z-10 text-lg leading-relaxed">
                  Não tente ser perfeito 100% do tempo. A maioria das pessoas desiste porque tenta dietas extremamente restritivas. Foque em comer alimentos limpos e saudáveis em 80% do tempo, e deixe os 20% para flexibilidade. O que importa é a média calórica semanal!
              </p>
          </div>

          <div className="mt-12 not-prose" id="faq">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="text-orange-600 dark:text-orange-500" /> Perguntas Frequentes
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
            <p className="text-sm italic text-slate-500 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800">
                  Além das calorias, a qualidade da sua saúde depende do <Link href="/saude/imc" className="text-rose-500 font-bold hover:underline">seu peso ideal</Link> e da <Link href="/saude/agua" className="text-rose-500 font-bold hover:underline">hidratação diária</Link>.
            </p>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
        </div>

        <SmartCrossLinker currentHref="/saude/calorias-diarias" category="saude" />

        {/* Footer Impressão */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}