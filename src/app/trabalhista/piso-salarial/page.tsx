import type { Metadata } from "next";
import Link from "next/link";
import { profissoes } from "@/data/profissoes";

import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Briefcase, Search, ArrowRight, Clock, HelpCircle, 
  Scale, ShieldCheck, Landmark, ExternalLink
} from "lucide-react";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. SEO METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Piso Salarial por Profissão 2026 | Tabela de Salários da CLT";
  const description = "Consulte a tabela oficial de pisos salariais por profissão em 2026. Veja o salário mínimo de enfermeiros, professores, desenvolvedores, engenheiros e simule descontos.";

  return {
    title,
    description,
    keywords: [
      "piso salarial por profissao",
      "tabela de salarios 2026",
      "piso salarial clt",
      "piso salarial enfermagem 2026",
      "piso nacional magistério",
      "salario minimo por categoria"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/piso-salarial" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/trabalhista/piso-salarial",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Tabela de Pisos Salariais Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

// --- FAQ LIST ---
const faqList = [
  {
    q: "O que é o piso salarial de uma profissão?",
    a: "O piso salarial é o menor valor de salário que uma categoria profissional pode receber por lei federal, estadual ou por convenção coletiva de trabalho (CCT) firmada pelo sindicato da categoria para uma determinada jornada de trabalho."
  },
  {
    q: "Qual a diferença entre piso salarial e salário mínimo?",
    a: "O salário mínimo é o valor base nacional garantido pela Constituição a todo trabalhador brasileiro (R$ 1.518,00 em 2026). O piso salarial é um valor superior ao salário mínimo estabelecido especificamente para certas profissões devido à sua complexidade ou regulamentação própria."
  },
  {
    q: "A empresa pode pagar menos que o piso da categoria?",
    a: "Não. Pagar um salário inferior ao piso salarial estabelecido por lei ou convenção coletiva constitui uma infração trabalhista grave, permitindo ao trabalhador cobrar judicialmente as diferenças salariais acumuladas retroativamente."
  },
  {
    q: "O piso salarial é igual em todo o Brasil?",
    a: "Depende da profissão. Algumas categorias possuem um piso nacional unificado por lei federal (como enfermeiros e professores da rede básica). Outras categorias têm pisos regionais que variam de estado para estado de acordo com convenções de sindicatos locais."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "Piso Salarial por Profissão 2026 | Tabela de Salários da CLT",
      "description": "Tabela de referência e simulador de pisos salariais nacionais de categorias profissionais regulamentadas no Brasil.",
      "url": "https://mestredascontas.com.br/trabalhista/piso-salarial"
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function PisosHubPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Tabela de Pisos Salariais por Profissão 2026"
          description="Consulte o piso salarial regulamentado e a média de mercado das principais profissões do Brasil. Simule as deduções de INSS, IRRF e descontos em folha."
          category="Direitos Trabalhistas (CLT)"
          icon={<Briefcase size={32} strokeWidth={2} />}
          variant="reform" // Estilo verde profissional (Foco Trabalhista)
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Pisos Salariais" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* REVISÃO LEGAL (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Central de Informações atualizada com as últimas convenções coletivas e portarias federais vigentes para o ano de 2026.</span>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="horas_top" format="horizontal" variant="agency" />
        </div>

        {/* --- GRID DE PROFISSÕES --- */}
        <section className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Escolha a Categoria Profissional</h2>
                <p className="text-xs text-slate-400">Clique na profissão para ver a legislação completa, direitos e abrir a calculadora de salário líquido do piso.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profissoes.map((p) => (
                <div key={p.slug} className="group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/10 to-emerald-500/30 group-hover:from-emerald-500 group-hover:to-emerald-600 transition-colors"></div>
                  
                  <div>
                    <h3 className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {p.desc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Piso Salarial 2026:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          R$ {p.piso2026.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Jornada Padrão:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{p.cargaHoraria}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <Link 
                      href={`/trabalhista/piso-salarial/${p.slug}`}
                      className="w-full h-10 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500/90 transition-all"
                    >
                      Ver Direitos & Calcular <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCLAIMER */}
        <div className="print:hidden max-w-5xl mx-auto w-full">
            <DisclaimerBox />
        </div>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_mid" format="auto" />
        </div>

        {/* --- ARTICLE CONTENT --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-4">
              Como funciona o Piso Salarial na CLT?
          </h2>
          <p className="lead text-slate-700 text-lg font-medium">
            O piso salarial é a garantia mínima de que certas carreiras, expostas a grandes responsabilidades ou riscos, recebam um pagamento compatível com a complexidade técnica do seu serviço.
          </p>
          <p>
            Diferentemente do salário mínimo nacional (que serve de base geral para todas as atividades informais e não regulamentadas), o piso é negociado em acordos coletivos conduzidos por sindicatos patronais e de trabalhadores, ou fixado via projetos de leis federais sancionadas (como é o caso da Enfermagem, Magistério Básico e Engenharia).
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4">
            Como saber qual é o piso salarial do meu estado?
          </h3>
          <p>
            Para consultar a remuneração mínima legal da sua atividade profissional no seu estado, siga as diretrizes abaixo:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>Consulte o Sindicato de Classe:</strong> O sindicato dos trabalhadores da sua localidade é o órgão responsável por homologar as Convenções Coletivas de Trabalho (CCT) onde constam as tabelas salariais atualizadas para cada função da categoria.</li>
            <li><strong>Verifique o Salário Mínimo Regional:</strong> Estados como São Paulo, Rio de Janeiro, Paraná, Santa Catarina e Rio Grande do Sul possuem leis próprias que estabelecem faixas de pisos estaduais superiores ao mínimo nacional para categorias não representadas por sindicatos específicos.</li>
            <li><strong>Analise a Carga Horária Contratual:</strong> O piso é indexado a jornadas cheias (normalmente 40h ou 44h semanais). Caso seu contrato estipule carga de trabalho reduzida, a remuneração mínima pode ser calculada proporcionalmente ao valor da hora regulamentada.</li>
          </ol>

          {/* FAQ SECTION */}
          <div className="mt-16 not-prose">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <HelpCircle className="text-emerald-500" /> Dúvidas Frequentes sobre Pisos
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:bg-white dark:open:bg-slate-900/50 open:ring-1 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                      <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-emerald-500 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug text-slate-800 dark:text-slate-200">{item.q}</span>
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

          {/* BASE LEGAL */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Landmark size={16} /> Consolidação e Direitos
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Consulte a base jurídica que valida a proteção salarial do trabalhador:</p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-blue-600 dark:text-blue-400">
                  <a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CLT - Título IV (Do Salário Mínimo) <ExternalLink size={10}/>
                  </a>
                  <a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                      CF/88 - Artigo 7º, Inciso V (Piso Proporcional) <ExternalLink size={10}/>
                  </a>
              </div>
          </div>

          <ExpertSignature updatedAt="Maio de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
        </div>

        <SmartCrossLinker currentHref="/trabalhista/piso-salarial" category="trabalhista" />

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="horas_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
