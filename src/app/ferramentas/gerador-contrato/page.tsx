import type { Metadata } from "next";
import Link from "next/link";
import { contractCases } from "@/data/contract-cases";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import { Scale, ChevronRight, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Gerador de Contrato de Prestação de Serviços (Grátis em PDF)",
  description: "Crie contratos profissionais online e grátis. Modelos em PDF para serviços de limpeza, obras, marketing e autônomos. Com base na Lei e Código Civil.",
  keywords: [
    "gerador de contrato grátis", "contrato prestação de serviços simples", 
    "modelo de contrato word pdf", "fazer contrato online", "contrato autonomo"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-contrato" },
  openGraph: {
    title: "Gerador de Contratos (Grátis em PDF) | Mestre das Contas",
    description: "Crie contratos profissionais com base no Código Civil em menos de 1 minuto.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-contrato",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website"
  }
};

export default function ContractIndexPage() {
  return (
    <article className="w-full min-h-screen font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-12">
        <PageHeader 
          title="Gerador de Contrato Grátis"
          description="Crie contratos profissionais e seguros com base no Código Civil Brasileiro. Escolha um modelo específico abaixo e preencha online. O PDF sai pronto para assinatura na hora."
          category="Jurídico & Negócios"
          icon={<Scale size={32} />}
          variant="default"
          categoryColor="blue"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador de Contratos" }
          ]}
        />
        
        <div className="max-w-4xl mx-auto mt-8 flex justify-center">
            <PrivacyBadge />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 space-y-8">
          
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {contractCases.map((contract) => (
            <Link 
              key={contract.slug}
              href={`/ferramentas/gerador-contrato/${contract.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all group flex flex-col justify-between"
            >
              <div>
                 <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {contract.shortName}
                 </h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                    {contract.description}
                 </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                 Preencher Contrato <ChevronRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="contract_index_mid" format="horizontal" />
        </div>

        {/* ARTIGO INFORMATIVO E AVISO LEGAL */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
            <h2 className="text-2xl font-bold mb-6">Por que todo serviço precisa de contrato?</h2>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>O combinado não sai caro. Um contrato bem feito evita calotes judiciais, estabelece expectativas claras e dá a ambas as partes as garantias de que o que foi prometido será entregue.</p>
                
                <h3 className="flex items-center gap-2"><CheckCircle2 className="text-green-500"/> Validade do Documento Particular</h3>
                <p>Nossos modelos geram um <strong>"Instrumento Particular de Prestação de Serviços"</strong>. Segundo o Código Civil e o Código de Processo Civil (Art. 784), para que este documento se torne um título executivo (permitindo cobrança judicial rápida em caso de calote), ele deve:</p>
                <ul>
                    <li>Ter a assinatura do Contratante e do Contratado.</li>
                    <li>Conter a assinatura de <strong>2 (duas) testemunhas</strong> devidamente identificadas.</li>
                    <li>Estar assinado em todas as vias de igual teor.</li>
                </ul>

                <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col gap-3">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 m-0">
                        <ShieldAlert size={20} className="text-slate-500"/>
                        Aviso de Responsabilidade Isenta (Disclaimer)
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
                        As ferramentas e geradores fornecidos no portal Mestre das Contas são <strong>gratuitos</strong> e têm caráter puramente informativo e facilitador. Nossos modelos são genéricos e não substituem, em hipótese alguma, a análise e o aconselhamento de um profissional de direito (advogado). Ao utilizar os documentos aqui gerados, o usuário assume total responsabilidade por sua aplicação prática, isentando o Mestre das Contas de qualquer responsabilidade civil, criminal ou trabalhista resultante de disputas, calotes ou irregularidades legais inerentes à relação contratual.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </article>
  );
}
