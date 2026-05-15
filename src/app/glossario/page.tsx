
import { Metadata } from 'next';
import { glossaryData } from '@/data/glossary';
import PageHeader from '@/components/layout/PageHeader';
import { Book } from 'lucide-react';
import GlossaryClient from './GlossaryClient';
import LazyAdUnit from '@/components/ads/LazyAdUnit';

export const metadata: Metadata = {
  title: "Glossário Financeiro e Trabalhista 2026 | Dicionário do Empreendedor",
  description: "Entenda termos complexos de forma simples. Guia completo de termos trabalhistas, fiscais e financeiros atualizado para 2026. Grátis e online.",
  alternates: {
    canonical: "https://mestredascontas.com.br/glossario"
  }
};

export default function GlossaryPage() {
  const sortedData = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term));

  // OPORTUNIDADE DE OURO: Schema.org DefinedTermSet para Posição Zero
  const definedTermSetJsonLd = {
    "@context": "https://schema.org",
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
  };

  return (
    <div className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetJsonLd) }}
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
