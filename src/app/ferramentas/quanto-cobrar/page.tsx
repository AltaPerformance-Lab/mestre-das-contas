import type { Metadata } from "next";
import PricingCalculator from "@/components/tools/PricingCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Suspense } from "react";
import { Coins, HelpCircle, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

export const metadata: Metadata = {
  title: "Quanto Cobrar por Serviço (Precificação) | Calculadora Online",
  description: "Calcule grátis o preço ideal da sua hora de trabalho e dos seus projetos/serviços de forma simples e profissional com base em despesas, lucros e impostos.",
  keywords: [
    "quanto cobrar por serviço",
    "calculadora de preco de servico",
    "preco da hora de trabalho",
    "como precificar servicos freelancer",
    "calculadora de precificacao"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/quanto-cobrar" },
  openGraph: {
    title: "Quanto Cobrar por Serviço | Calculadora de Precificação Online",
    description: "Descubra grátis o valor ideal da sua hora de trabalho autônomo ou do seu projeto baseado em suas despesas fixas, impostos e margem de lucro real.",
    url: "https://mestredascontas.com.br/ferramentas/quanto-cobrar",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
  robots: { index: true, follow: true }
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Calculadora de Precificação de Serviços ('Quanto Cobrar?')",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "description": "Ferramenta interativa profissional para calcular o preço ideal de venda de serviços de autônomos, profissionais liberais e freelancers."
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Calculadora de Precificação: Quanto Cobrar?"
          description="Descubra o preço de venda ideal para os seus serviços e projetos. Calcule o valor exato da sua hora de trabalho de forma profissional e sem complicação."
          category="Ferramentas"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="violet"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Quanto Cobrar (Precificação)" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* AD TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pricing_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-5xl mx-auto relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <PricingCalculator />
           </Suspense>
           
           <div className="mt-8 print:hidden">
              <DisclaimerBox />
           </div>
        </section>

        {/* ARTIGO SEO E E-E-A-T */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-violet-600" /> Guia Prático de Precificação de Serviços
          </h2>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p>
              Muitos prestadores de serviço autônomos, freelancers e profissionais liberais enfrentam a mesma dúvida cruel: <strong>"Quanto devo cobrar pelo meu trabalho?"</strong>. 
              Cobrar muito pouco desvaloriza sua profissão e pode te levar ao prejuízo. Cobrar demais pode afastar clientes em potencial.
            </p>
            
            <p>
              A precificação profissional não deve ser baseada em "achismo" ou apenas olhando o preço da concorrência. Ela deve ser pautada em dados reais sobre os seus custos operacionais de sobrevivência, tempo investido e expectativa de crescimento.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8">Os Três Pilares da Precificação Correta</h3>
            
            <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 text-xs flex items-center justify-center font-bold">1</span>
                  Sua Sobrevivência
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Suas despesas fixas pessoais (seu salário/pró-labore desejado) somadas a todas as despesas da empresa (internet, MEI, softwares).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 text-xs flex items-center justify-center font-bold">2</span>
                  Sua Produtividade
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Nem todo o seu tempo útil diário é cobrável. Apenas cerca de 70% a 80% do dia é produtivo. O restante é gasto em prospecção, reuniões ou tarefas administrativas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 text-xs flex items-center justify-center font-bold">3</span>
                  Seu Lucro Real
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  O dinheiro que sobra no negócio para investimentos futuros. Salário não é lucro! O lucro pertence à empresa para que ela possa crescer.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8">Perguntas Frequentes (FAQ)</h3>
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Qual a diferença entre Salário (Pró-labore) e Lucro do Negócio?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                  Muitos autônomos misturam as duas coisas. <strong>Pró-labore</strong> é a remuneração pelo seu trabalho operacional (o seu salário fixo). 
                  O <strong>Lucro</strong> é o excedente gerado pelo negócio (a margem de lucro que colocamos na precificação). Esse dinheiro serve para cobrir riscos, investir em equipamentos melhores, cursos ou capital de giro da empresa.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Por que devo descontar horas de produtividade?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                  Se você trabalha 8 horas por dia, não conseguirá faturar as 8 horas cheias de todos os dias. Parte do seu tempo será gasto escrevendo e-mails, conversando com novos clientes, emitindo notas fiscais ou resolvendo problemas operacionais. 
                  Considerar um índice de produtividade real (como 70%) evita que seu custo de hora real fique abaixo do planejado.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Como embutir impostos e taxas de maquininha?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 pl-6 leading-relaxed">
                  A nossa ferramenta calcula a incidência de impostos "por fora" (usando a margem de markup). Se você é MEI, paga uma taxa mensal fixa que entra no seu <strong>Custo de Sobrevivência</strong>. 
                  Se você emite notas no Simples Nacional (ex: 6% de imposto inicial), esse valor deve ser embutido na fórmula final para garantir que o imposto não corroa a sua margem de lucro real.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* CROSS-LINKING */}
        <SmartCrossLinker 
          currentHref="/ferramentas/quanto-cobrar" 
          category="ferramentas"
        />

        {/* AD BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="pricing_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
