import { Metadata } from 'next';
import { glossaryData } from '@/data/glossary';
import PageHeader from '@/components/layout/PageHeader';
import { Book, HelpCircle, ShieldCheck } from 'lucide-react';
import GlossaryClient from './GlossaryClient';
import LazyAdUnit from '@/components/ads/LazyAdUnit';

export const metadata: Metadata = {
  title: "Glossário Financeiro e Trabalhista 2026 | Dicionário do Empreendedor",
  description: "Entenda termos complexos de forma simples. Guia completo de termos trabalhistas, fiscais e financeiros atualizado para 2026. Grátis e online.",
  alternates: {
    canonical: "https://mestredascontas.com.br/glossario"
  },
  openGraph: {
    title: "Glossário Financeiro e Trabalhista 2026 | Mestre das Contas",
    description: "Descomplique termos fiscais e financeiros. Entenda tudo sobre o seu bolso e seu negócio de forma simples e gratuita.",
    url: "https://mestredascontas.com.br/glossario",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Glossário Mestre das Contas", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Não entende o 'economês'?",
    description: "Nosso glossário traduz termos complexos para você nunca mais ter dúvidas.",
    images: ["/opengraph-image"],
  }
};

export default function GlossaryPage() {
  const sortedData = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": "https://mestredascontas.com.br/glossario",
        "name": "Glossário Estratégico Mestre das Contas 2026",
        "description": "Dicionário completo de termos financeiros, fiscais e trabalhistas atualizados para o cenário de 2026.",
        "hasDefinedTerm": sortedData.map(item => ({
          "@type": "DefinedTerm",
          "name": item.term,
          "description": item.definition,
          "url": `https://mestredascontas.com.br/glossario/${item.slug}`
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" },
          { "@type": "ListItem", "position": 2, "name": "Glossário", "item": "https://mestredascontas.com.br/glossario" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "1. O que é o Glossário do Mestre das Contas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "O Glossário é um dicionário completo e simplificado desenvolvido por especialistas para traduzir termos financeiros, tributários e trabalhistas complexos da legislação brasileira em linguagem simples e acessível a qualquer pessoa."
            }
          },
          {
            "@type": "Question",
            "name": "2. Os termos explicados são atualizados para as leis vigentes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, absolutamente. Todas as nossas definições, fórmulas e pontos cruciais de direitos trabalhistas e obrigações fiscais são atualizados com as regras e normas válidas para o cenário de 2026."
            }
          },
          {
            "@type": "Question",
            "name": "3. Qual a diferença entre uma convenção coletiva e a CLT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Consolidação das Leis do Trabalho (CLT) é a lei trabalhista federal base do Brasil. A Convenção Coletiva de Trabalho (CCT) é um acordo negociado entre sindicatos patronais e de empregados que estabelece regras adicionais específicas para uma categoria, válidas por tempo determinado."
            }
          },
          {
            "@type": "Question",
            "name": "4. Por que o INSS e o IRRF são descontados diretamente do salário bruto?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Esses descontos são obrigatórios por lei e retidos na fonte pela empresa. O INSS financia a seguridade social (como aposentadorias e auxílios), enquanto o IRRF é uma antecipação mensal do Imposto de Renda Pessoa Física."
            }
          },
          {
            "@type": "Question",
            "name": "5. Como a Taxa Selic afeta o meu poder de compra diário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Taxa Selic é o principal instrumento para controlar a inflação. Quando ela sobe, os juros de financiamentos, cartões e empréstimos aumentam, desestimulando o consumo e, consequentemente, reduzindo a alta geral dos preços."
            }
          },
          {
            "@type": "Question",
            "name": "6. O que significa não-cumulatividade de impostos na Reforma Tributária?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Significa que as empresas podem abater o valor do imposto pago na etapa anterior da produção do imposto devido na venda final. Isso evita o efeito cascata, onde um imposto é cobrado sobre outro imposto."
            }
          },
          {
            "@type": "Question",
            "name": "7. Posso propor novos termos para serem adicionados ao Glossário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com certeza. O nosso dicionário é um projeto em constante evolução. Caso você encontre algum termo técnico de finanças ou direito trabalhista que ainda não está definido, pode nos enviar uma mensagem com a sua sugestão."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Glossário Estratégico"
          description="Descomplique o 'economês' e o 'juridiquês'. Entenda os termos que afetam o seu bolso e o seu negócio em 2026."
          category="Educação Financeira"
          icon={<Book size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="indigo"
          badge="Guia 2026"
          breadcrumbs={[{ label: "Início", href: "/" }, { label: "Glossário" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 py-12 max-w-7xl mx-auto">
        <GlossaryClient sortedData={sortedData} />

        {/* --- CONTEÚDO RICO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm mt-10">
          
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" size={32} /> Traduzindo a Legislação para Práticas de Negócios
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
            Nós sabemos perfeitamente que o vocabulário financeiro, fiscal e de relações trabalhistas no Brasil é complexo e burocrático. A verdade é que a falta de entendimento de termos simples como DSR, CET ou MDR pode fazer com que trabalhadores percam direitos ou que empresários tomem decisões financeiras equivocadas.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
            Nossa missão com este <strong>Glossário Estratégico</strong> é desmistificar e traduzir termos cruciais com definições revisadas por profissionais e exemplos práticos para o dia a dia. Monitore os termos mais relevantes da sua área e empodere o seu planejamento financeiro.
          </p>

          {/* TABELA COMPARATIVA DE CATEGORIAS DO GLOSSÁRIO */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
            Principais Siglas e Conceitos do Mercado
          </h3>
          <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
            <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Termo / Sigla</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Significado Curto</th>
                  <th className="p-4">Impacto no Bolso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">FGTS</td>
                  <td className="p-4">Trabalhista</td>
                  <td className="p-4">Fundo de Garantia do Tempo de Serviço</td>
                  <td className="p-4">Fundo de segurança mensal de 8% pago pelo empregador</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">DSR</td>
                  <td className="p-4">Trabalhista</td>
                  <td className="p-4">Descanso Semanal Remunerado</td>
                  <td className="p-4">Garante pagamento proporcional do dia de folga sobre extras/comissões</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">CET</td>
                  <td className="p-4">Financeiro</td>
                  <td className="p-4">Custo Efetivo Total</td>
                  <td className="p-4">Taxa real do financiamento, englobando juros, seguros e taxas</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">IVA Dual</td>
                  <td className="p-4">Fiscal</td>
                  <td className="p-4">Imposto sobre Valor Agregado (IBS + CBS)</td>
                  <td className="p-4">Substitui impostos antigos unificando a alíquota em consumo</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PERGUNTAS FREQUENTES (FAQ) */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
            <HelpCircle className="text-slate-500" size={26} /> Dúvidas Frequentes sobre Termos Técnicos
          </h3>
          <div className="space-y-4">
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                1. O que é o Glossário do Mestre das Contas?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                O Glossário é um dicionário completo e simplificado desenvolvido por especialistas para traduzir termos financeiros, tributários e trabalhistas complexos da legislação brasileira em linguagem simples e acessível a qualquer pessoa.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                2. Os termos explicados são atualizados para as leis vigentes?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim, absolutamente. Todas as nossas definições, fórmulas e pontos cruciais de direitos trabalhistas e obrigações fiscais são atualizados com as regras e normas válidas para o cenário de 2026.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                3. Qual a diferença entre uma convenção coletiva e a CLT?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                A Consolidação das Leis do Trabalho (CLT) é a lei trabalhista federal base do Brasil. A Convenção Coletiva de Trabalho (CCT) é um acordo negociado entre sindicatos patronais e de empregados que estabelece regras adicionais específicas para uma categoria, válidas por tempo determinado.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                4. Por que o INSS e o IRRF são descontados diretamente do salário bruto?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Esses descontos são obrigatórios por lei e retidos na fonte pela empresa. O INSS financia a seguridade social (como aposentadorias e auxílios), enquanto o IRRF é uma antecipação mensal do Imposto de Renda Pessoa Física.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                5. Como a Taxa Selic afeta o meu poder de compra diário?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                A Taxa Selic é o principal instrumento para controlar a inflação. Quando ela sobe, os juros de financiamentos, cartões e empréstimos aumentam, desestimulando o consumo e, consequentemente, reduzindo a alta geral dos preços.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                6. O que significa não-cumulatividade de impostos na Reforma Tributária?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Significa que as empresas podem abater o valor do imposto pago na etapa anterior da produção do imposto devido na venda final. Isso evita o efeito cascata, onde um imposto é cobrado sobre outro imposto.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                7. Posso propor novos termos para serem adicionados ao Glossário?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Com certeza. O nosso dicionário é um projeto em constante evolução. Caso você encontre algum termo técnico de finanças ou direito trabalhista que ainda não está definido, pode nos enviar uma mensagem com a sua sugestão.
              </div>
            </details>
          </div>
        </div>

        <div className="w-full flex justify-center py-8 border-t border-slate-100 dark:border-slate-800 mt-8">
           <LazyAdUnit slot="glossary_hub_bottom" format="auto" />
        </div>

        {/* PROMO BOX */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white mt-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Book size={140} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 italic">Conhecimento é poder (e dinheiro).</h2>
            <p className="text-indigo-100 mb-6 text-lg">
              Estamos construindo o maior dicionário financeiro do Brasil. Novos termos são adicionados semanalmente por nossos especialistas.
            </p>
            <div className="flex gap-4">
              <a href="/para-empresas" className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                Preciso de Ajuda Profissional
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
