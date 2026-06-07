import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import UnemploymentCalculator from "@/components/calculators/UnemploymentCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, HelpCircle, History, BookOpen, 
  AlertTriangle, CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Users, Calendar, ShieldCheck, XCircle, Search,
  Landmark, AlertOctagon, ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Calculadora de Seguro-Desemprego 2026 | Valor e Parcelas";
  const description = "Tem direito ao Seguro-Desemprego? Descubra o valor exato das suas parcelas e quantas parcelas irá receber em 2026 de forma grátis, rápida e 100% segura!";

  return {
    title,
    description,
    keywords: [
      "calculadora seguro desemprego", 
      "valor seguro desemprego 2026", 
      "quantas parcelas seguro desemprego", 
      "quem tem direito seguro desemprego", 
      "teto seguro desemprego 2026",
      "dar entrada seguro desemprego online",
      "calculo media 3 ultimos salarios"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/seguro-desemprego" },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/trabalhista/seguro-desemprego",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Calculadora de Seguro-Desemprego Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Foi demitido? Saiba quanto o governo vai te pagar!",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- LISTA FAQ (Exatamente 7 Dúvidas Reais de Usuários) ---
const faqList = [
  { 
    q: "Afinal, quantas parcelas do seguro-desemprego eu vou receber?", 
    a: "A quantidade de parcelas varia entre 3, 4 ou 5 meses, dependendo de quantos meses você trabalhou sob regime CLT nos últimos 36 meses e de quantas solicitações do benefício você já realizou ao longo da sua vida profissional." 
  },
  { 
    q: "Qual é o valor máximo da parcela (teto) do seguro-desemprego em 2026?", 
    a: "O valor máximo pago pelo governo é reajustado anualmente com base no Índice Nacional de Preços ao Consumidor (INPC). Em 2026, o teto do benefício ultrapassa R$ 2.500,00 por parcela, garantindo um patamar de subsistência mínimo." 
  },
  { 
    q: "Quem tem empresa aberta (CNPJ MEI) ativo pode receber o seguro-desemprego?", 
    a: "Em regra, ter um CNPJ ativo (mesmo como MEI) gera o bloqueio automático do benefício pelo sistema do governo. Para conseguir a liberação, o trabalhador precisa comprovar que a empresa está totalmente inativa ou que não aufere lucros." 
  },
  { 
    q: "Qual é o prazo regulamentar para dar entrada no pedido de seguro-desemprego?", 
    a: "Para trabalhadores formais sob regime de CLT, o prazo estipulado por lei é de 7 a 120 dias corridos a contar do dia seguinte à demissão. Para trabalhadores domésticos, o prazo regulamentar é menor, sendo de 7 a 90 dias corridos." 
  },
  { 
    q: "O que acontece com as parcelas do seguro-desemprego caso eu consiga um novo emprego?", 
    a: "Assim que um novo registro de contrato é ativado na sua Carteira de Trabalho Digital pelo eSocial, o sistema suspende imediatamente a liberação das parcelas futuras do seguro, sendo pago apenas os dias proporcionais de desemprego." 
  },
  { 
    q: "Quem é dispensado por justa causa ou pede demissão tem direito ao seguro-desemprego?", 
    a: "Não. O seguro-desemprego é um programa governamental de proteção exclusivo para trabalhadores demitidos sem justa causa ou em situações específicas de rescisão indireta. Pedidos de demissão voluntária não dão direito ao benefício." 
  },
  { 
    q: "Como dar entrada no requerimento de seguro-desemprego totalmente online?", 
    a: "Você pode solicitar de forma 100% online e sem sair de casa utilizando o aplicativo 'Carteira de Trabalho Digital' ou acessando o portal Gov.br, munido do número de Requerimento de Seguro-Desemprego fornecido pela empresa na demissão." 
  }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD COMPLETO COM 7 FAQ) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Calculadora de Seguro-Desemprego",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador online para cálculo de valor e parcelas do Seguro-Desemprego no Brasil de acordo com as regras vigentes em 2026."
    },
    {
      "@type": "HowTo",
      "name": "Como Solicitar o Seguro-Desemprego Online",
      "description": "Aprenda a calcular o valor do seu seguro e realizar o requerimento digital passo a passo.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Apure os Três Últimos Salários",
          "text": "Calcule a média aritmética dos seus três últimos salários em folha."
        },
        {
          "@type": "HowToStep",
          "name": "Verifique a Quantidade de Parcelas",
          "text": "Conte os meses de carteira assinada nos últimos 36 meses para definir se recebe 3, 4 ou 5 meses."
        },
        {
          "@type": "HowToStep",
          "name": "Faça a Solicitação Online",
          "text": "Insira os dados no aplicativo Carteira de Trabalho Digital ou portal Gov.br."
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia de Seguro-Desemprego: Regras, Parcelas, Prazos e Evitando Bloqueios",
      "description": "Tudo sobre o seguro-desemprego em 2026: regras de carência, cálculo de média salarial e o impacto de ter um CNPJ MEI.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-05-15",
      "dateModified": new Date().toISOString()
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

export default async function SeguroPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Calculadora de Seguro-Desemprego"
          description="Foi demitido sem justa causa? Descubra o valor exato do benefício e quantas parcelas você tem direito de receber segundo a regra oficial de 2026."
          category="Proteção Social"
          icon={<ShieldCheck size={32} strokeWidth={2} />}
          variant="default" 
          categoryColor="blue"
          badge="Regra 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Seguro Desemprego" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mb-2">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Informações baseadas na Consolidação das Leis do Trabalho (CLT) e atualizações vigentes em 2026.</span>
        </div>

        {/* ALERTA DE PRAZO CRÍTICO */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full">
          <Calendar className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wide">Atenção ao Prazo!</p>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90 leading-relaxed">
              Trabalhador formal tem de <strong>7 a 120 dias</strong> após a demissão para dar entrada no requerimento. Passou disso, perde o direito. Não deixe para a última hora.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="seguro_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-1 md:p-2">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <UnemploymentCalculator />
            </Suspense>
          </div>
          
          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="seguro_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL DE ALTA PERFORMANCE (ADSENSE & AI GROUNDING) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              O Paraquedas Social: Tudo Sobre o Seguro-Desemprego
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Você já vivenciou a dolorosa e frustrante sensação de receber a notícia de uma demissão surpresa, acompanhada pelo temor imediato de como arcar com as contas nos próximos meses?
          </p>

          <p>
            A verdade é que a perda involuntária de um posto de trabalho representa um dos períodos de maior instabilidade e pressão emocional na vida de qualquer cidadão.
          </p>

          <p>
            Veja bem, o <GlossaryTerm slug="seguro-desemprego-clt">seguro-desemprego</GlossaryTerm> funciona como uma espécie de paraquedas de emergência robusto, acionado para amortecer nossa queda e garantir um pouso controlado.
          </p>

          <p>
            Enquanto nós reorganizamos o rumo profissional e focamos na conquista de novas oportunidades no mercado, esse programa governamental garante que o prato de comida continue na mesa.
          </p>

          <p>
            Parece um benefício fácil de compreender, né? No entanto, as complexas faixas de cálculo do governo e os prazos rígidos podem pregar peças muito desagradáveis.
          </p>

          <p>
            O melhor de tudo? Nós preparamos este material denso para clarear cada regra e ajudar você a realizar a simulação mais precisa do mercado!
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2 border-l-4 border-blue-600 pl-4">
              Quem Tem Direito vs Quem Não Tem Direito: Tabela Detalhada
          </h3>

          <p>
            Uma das etapas que mais provocam bloqueios de benefícios no Ministério do Trabalho diz respeito ao enquadramento das regras de elegibilidade.
          </p>

          <p>
            Para que você não cometa erros ao solicitar o auxílio, desenhamos uma tabela comparativa pure HTML com todos os regimes de trabalho vigentes no país.
          </p>

          <div className="not-prose my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full min-w-[600px] text-sm text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Regime de Trabalho</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300">Situação Exigida</th>
                  <th scope="col" className="px-6 py-3 font-bold text-slate-700 dark:text-slate-300 text-right">Tem Direito ao Seguro?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">CLT Formal (Urbano/Rural)</td>
                  <td className="px-6 py-4 text-xs">Dispensa sem justa causa ou rescisão indireta forçada judicialmente.</td>
                  <td className="px-6 py-4 text-xs font-bold text-emerald-650 text-right uppercase">Sim (Regra padrão)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Empregado Doméstico</td>
                  <td className="px-6 py-4 text-xs">Rescisão sem justa causa, com comprovação de recolhimento de FGTS.</td>
                  <td className="px-6 py-4 text-xs font-bold text-emerald-650 text-right uppercase">Sim (Até 3 parcelas)</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Microempreendedor (CNPJ <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm>)</td>
                  <td className="px-6 py-4 text-xs">Empresa sem movimentação e sem retirada de pró-labore comprovada.</td>
                  <td className="px-6 py-4 text-xs font-bold text-amber-650 text-right uppercase">Apenas sob análise restrita</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">Estagiários ou Autônomos</td>
                  <td className="px-6 py-4 text-xs">Contratos regidos por termos específicos, sem recolhimento previdenciário FAT.</td>
                  <td className="px-6 py-4 text-xs font-bold text-red-650 text-right uppercase">Não tem direito</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
              <Calculator className="text-blue-600 dark:text-blue-400" /> A Complexa Faixa de Cálculo Governamental
          </h3>
          
          <p>
            Muitos trabalhadores ficam assustados ao ver o depósito do seguro cair abaixo da média salarial declarada em carteira.
          </p>

          <p>
            A verdade é que as parcelas sofrem um reajuste proporcional de faixas para garantir que o caixa público permaneça sustentável.
          </p>

          <div className="my-8 overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 not-prose">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold text-slate-700 dark:text-slate-200 text-xs md:text-sm uppercase flex items-center gap-2">
                <Scale size={16} /> Faixas de Cálculo Governamentais 2026
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-sm text-left">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-650 dark:text-slate-350">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Média até R$ 2.245,69</td>
                  <td className="px-4 py-3">Multiplica-se a média salarial por **0,80 (80%)**.</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">Média entre R$ 2.245,70 e R$ 3.743,21</td>
                  <td className="px-4 py-3">O valor que exceder R$ 2.245,69 é multiplicado por **0,50** e somado a R$ 1.796,55.</td>
                </tr>
                <tr className="bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors">
                  <td className="px-4 py-3 font-bold text-blue-800 dark:text-blue-300">Média acima de R$ 3.743,21</td>
                  <td className="px-4 py-3 font-bold text-blue-800 dark:text-blue-300">Valor fixado no Teto Nacional: **R$ 2.545,31**.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
              <Landmark className="text-amber-600" /> A Origem Histórica do Fundo FAT
          </h3>
          
          <p>
            O Seguro-Desemprego foi desenhado a partir da promulgação da Carta Magna de 1988, integrando o rol de garantias de seguridade social fundamentais do cidadão brasileiro.
          </p>

          <p>
            O melhor de tudo? Toda a engrenagem é abastecida de forma independente pelo Fundo de Amparo ao Trabalhador (FAT), eliminando dependências fiscais diretas de outras pastas governamentais.
          </p>

          <p>
            Isso quer dizer que, ao longo de sua jornada de carteira assinada, as contribuições mensais de PIS e PASEP das empresas servem para construir a sua poupança de segurança pessoal!
          </p>

          {/* SEÇÃO FAQ COM 7 ITENS */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-blue-600 dark:text-blue-400" /> Dúvidas Frequentes sobre Seguro-Desemprego
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/30 transition-all">
                      <summary className="font-semibold text-slate-850 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-blue-500 dark:text-blue-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-850 dark:text-slate-200">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-650 dark:text-slate-350 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
          </div>

          {/* FONTES E REFERÊNCIAS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Fontes Oficiais e Legislação Governamental
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">As informações desta página foram validadas conforme canais oficiais:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.gov.br" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Portal Gov.br (Ministério do Trabalho) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/leis/l7998.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      Lei Federal nº 7.998/1990 <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Junho de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/seguro-desemprego" category="trabalhista" />
        <SmartCrossLinker currentHref="/trabalhista/seguro-desemprego" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="seguro_bottom" format="horizontal" variant="software" />
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