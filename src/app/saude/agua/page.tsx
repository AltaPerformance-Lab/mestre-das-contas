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
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
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
    } 
  };
}

const faqList = [
  { q: "Qual a regra geral recomendada para calcular a ingestão diária de água?", a: "A diretriz científica mais aceita para adultos saudáveis é a ingestão de aproximadamente 35ml de água para cada quilo de peso corporal diário. Multiplique seu peso em kg por 0,035 para encontrar sua meta básica." },
  { q: "Bebidas como chás, sucos e café contam para a minha meta de hidratação?", a: "Sim, outras bebidas e a própria água presente nos alimentos contribuem para a hidratação diária total. Porém, a água pura e limpa deve ser sempre a fonte prioritária e principal, evitando açúcares adicionados e excesso de cafeína." },
  { q: "Quais são os primeiros sintomas físicos que indicam desidratação?", a: "Os sintomas iniciais mais comuns de desidratação leve incluem sensação de sede moderada, boca seca, cansaço mental inexplicável, dor de cabeça leve e urina em tom amarelo-escuro com odor mais forte." },
  { q: "Ingerir água em excesso pode fazer mal à saúde?", a: "Sim. Beber quantidades extremas de água em um período muito curto de tempo pode sobrecarregar os rins e causar hiponatremia. Essa é uma condição grave onde a concentração de sódio no sangue fica perigosamente diluída." },
  { q: "Praticantes de atividades físicas intensas ou atletas precisam de mais água?", a: "Com certeza. Durante treinos intensos, perdemos muito líquido através do suor. Recomenda-se acrescentar entre 500ml e 1 litro de água para cada hora de atividade física realizada, de preferência acompanhada de eletrólitos." },
  { q: "Beber água morna ou com limão em jejum acelera o emagrecimento?", a: "Beber água com limão ajuda a hidratar e fornece vitamina C, mas não tem propriedade mágica de queimar gordura. O emagrecimento depende de um déficit calórico geral, embora a água ajude muito na saciedade ativa." },
  { q: "Qual a relação entre a quantidade ideal de água e o funcionamento dos rins?", a: "A água atua diretamente na filtragem sanguínea realizada pelos rins, ajudando a eliminar toxinas através da urina. A hidratação adequada previne a formação de cálculos renais (pedras nos rins) e infecções urinárias recorrentes." }
];

export default async function AguaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Calculadora de Ingestão de Água - Mestre das Contas",
        "url": "https://mestredascontas.com.br/saude/agua",
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
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      
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

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        
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
              Você já deve ter ouvido que "beber 2 litros de água por dia" é o padrão supremo para todos. Mas pense bem: um atleta de 100kg em pleno verão gasta a mesma quantidade de líquido que uma pessoa sedentária de 50kg trabalhando no ar-condicionado? <strong>Claro que não.</strong>
            </p>
            <p>
              A verdade é que a necessidade real de hidratação é estritamente pessoal. Ela depende do seu peso corporal (mais massa requer mais água para manter as funções vitais celulares), do clima local e dos níveis de atividade diária.
            </p>
            <p>
              Veja bem, nossa ferramenta inteligente utiliza a consagrada recomendação médica e nutricional de 35ml por quilo. Isso tira todo o achismo da sua jornada e previne tanto a falta quanto o excesso de ingestão.
            </p>

            {/* TABELA DE METAS POR PESO (HTML PURO TOTALMENTE RESPONSIVO) */}
            <div className="not-prose my-10 border rounded-xl overflow-hidden border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
                <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-2">
                        <Scale size={16} /> Tabela de Hidratação Diária por Peso (Adultos)
                    </h4>
                </div>
                
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Faixa de Peso (kg)</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Necessidade Diária Base (L)</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Copos de 200ml</th>
                                <th className="px-6 py-4 font-bold border-b border-slate-200 dark:border-slate-700">Copos de 300ml</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">50 kg</td>
                                <td className="px-6 py-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">1,75 L</td>
                                <td className="px-6 py-4">~ 9 copos</td>
                                <td className="px-6 py-4">~ 6 copos</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">60 kg</td>
                                <td className="px-6 py-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">2,10 L</td>
                                <td className="px-6 py-4">~ 10.5 copos</td>
                                <td className="px-6 py-4">~ 7 copos</td>
                            </tr>
                            <tr className="bg-cyan-50/20 dark:bg-cyan-900/10 hover:bg-cyan-100/20 dark:hover:bg-cyan-900/20 transition-colors font-bold text-slate-800 dark:text-slate-200">
                                <td className="px-6 py-4">70 kg</td>
                                <td className="px-6 py-4 font-mono text-cyan-700 dark:text-cyan-400">2,45 L</td>
                                <td className="px-6 py-4">~ 12 copos</td>
                                <td className="px-6 py-4">~ 8 copos</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">80 kg</td>
                                <td className="px-6 py-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">2,80 L</td>
                                <td className="px-6 py-4">~ 14 copos</td>
                                <td className="px-6 py-4">~ 9.5 copos</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">90 kg</td>
                                <td className="px-6 py-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">3,15 L</td>
                                <td className="px-6 py-4">~ 16 copos</td>
                                <td className="px-6 py-4">~ 10.5 copos</td>
                            </tr>
                            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                                <td className="px-6 py-4 font-medium">100 kg</td>
                                <td className="px-6 py-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">3,50 L</td>
                                <td className="px-6 py-4">~ 17.5 copos</td>
                                <td className="px-6 py-4">~ 12 copos</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 my-10 not-prose">
              <div className="bg-blue-50 dark:bg-slate-950 p-6 rounded-2xl border border-blue-100 dark:border-slate-800">
                  <div className="text-blue-600 mb-3"><Zap size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Combate à Fadiga</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A desidratação metabólica leve é a causa número 1 de cansaço mental inexplicável, sonolência e dores de cabeça durante o expediente.</p>
              </div>
              <div className="bg-cyan-50 dark:bg-slate-950 p-6 rounded-2xl border border-cyan-100 dark:border-slate-800">
                  <div className="text-cyan-600 mb-3"><Brain size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Clareza Mental</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">O tecido cerebral é composto por cerca de 75% de água. Manter-se hidratado ativa neurotransmissores ligados ao foco e à memória curta.</p>
              </div>
              <div className="bg-indigo-50 dark:bg-slate-950 p-6 rounded-2xl border border-indigo-100 dark:border-slate-800">
                  <div className="text-indigo-600 mb-3"><Activity size={24}/></div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Função Digestiva</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A água lubrifica as paredes intestinais, facilitando o trânsito do bolo fecal e acelerando a metabolização de gorduras.</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <HeartPulse size={24} className="text-red-500" /> Sinais clássicos de que você precisa se hidratar agora
            </h3>
            <p>
              Muitas vezes, nós confundimos a sensação leve de desidratação com fome psicológica. Antes de atacar a geladeira ou buscar um lanche rápido, beba um copo grande de água e aguarde alguns minutos. O melhor de tudo? Seu próprio corpo avisa a situação através da urina:
            </p>

            <div className="flex flex-col gap-3 my-8 not-prose">
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="w-4 h-12 bg-yellow-50 rounded-full border border-slate-200"></div>
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Clara ou Levemente Amarelada</h5>
                        <p className="text-xs text-slate-500">Excelente equilíbrio! Indica que seu corpo está perfeitamente hidratado e as toxinas estão fluindo sem sobrecarga renal.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="w-4 h-12 bg-yellow-200 rounded-full border border-slate-200"></div>
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Amarelo Médio ou Concentrado</h5>
                        <p className="text-xs text-slate-500">Aí é que está o sinal de alerta. Seu organismo está retendo água para evitar escassez. Beba água imediatamente.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="w-4 h-12 bg-orange-400 rounded-full border border-slate-200"></div>
                    <div>
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Escura ou Alaranjada</h5>
                        <p className="text-xs text-red-500 font-bold">Quadro claro de desidratação. Risco de sobrecarga grave nos néfrons renais e fadiga sistêmica ativa.</p>
                    </div>
                </div>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-900/10 p-6 md:p-8 rounded-2xl border border-cyan-100 dark:border-cyan-900/30 my-8 not-prose">
                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed m-0">
                    <strong>Dica de Saúde e Trabalho:</strong> Manter-se hidratado é o hábito mais barato para manter sua produtividade elevada em sua jornada diária sob o regime da <GlossaryTerm slug="inss-previdencia-social">CLT</GlossaryTerm>. Além de beneficiar seus rins, a água ajuda a evitar as dores de cabeça que atrapalham as contas do seu <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm>.
                </p>
            </div>

            {/* REFERÊNCIAS OFICIAIS */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Landmark size={16} /> Fontes Oficiais de Saúde
                </h3>
                <p className="text-xs text-slate-500 mb-3">Conteúdo baseado em diretrizes internacionais:</p>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <a href="https://www.sbn.org.br/publico/dicas-de-saude-renal/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Sociedade Brasileira de Nefrologia <ExternalLink size={10}/>
                    </a>
                    <a href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-900 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                        Mayo Clinic (Nutrition Specialists) <ExternalLink size={10}/>
                    </a>
                </div>
            </div>

            <ExpertSignature updatedAt="Junho de 2026" author="Equipe Editorial" />
        </div>

        <SmartGlossaryLinker currentHref="/saude/agua" />
        <SmartCrossLinker currentHref="/saude/agua" category="saude" />

        {/* FAQ ACORDION (EXATAMENTE 7 ITENS SINCRONIZADOS COM JSON-LD) */}
        <div className="max-w-4xl mx-auto w-full print:hidden" id="faq">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <HelpCircle className="text-cyan-600 dark:text-cyan-500" /> Perguntas Frequentes sobre Hidratação
            </h3>
            <div className="space-y-3 not-prose">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                    <summary className="font-semibold text-slate-800 dark:text-slate-100 flex justify-between items-center text-sm select-none">
                      <span className="pr-4">{item.q}</span> <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0">▼</span>
                    </summary>
                    <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 animate-in fade-in">
                      {item.a}
                    </p>
                  </details>
              ))}
            </div>
          </div>
        </div>

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