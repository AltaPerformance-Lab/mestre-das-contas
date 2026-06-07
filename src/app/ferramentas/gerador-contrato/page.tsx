import type { Metadata } from "next";
import Link from "next/link";
import { contractCases } from "@/data/contract-cases";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import { Scale, ChevronRight, FileText, CheckCircle2, ShieldAlert, HelpCircle } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export const metadata: Metadata = {
  title: "Gerador de Contrato de Prestação de Serviços (Grátis em PDF)",
  description: "Gere contratos de prestação de serviços válidos e estruturados conforme o Código Civil. Modelos prontos em PDF editáveis em menos de 2 minutos. Grátis!",
  keywords: [
    "gerador de contrato grátis", "contrato prestação de serviços simples", 
    "modelo de contrato word pdf", "fazer contrato online", "contrato autonomo"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-contrato" },
  openGraph: {
    title: "Gerador de Contratos (Grátis em PDF) | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/gerador-contrato",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website"
  }
};

const faqList = [
  {
    q: "Como funciona o gerador de contrato de prestação de serviços?",
    a: "Nossa ferramenta é extremamente intuitiva. Você escolhe o modelo desejado, preenche os campos com os dados das partes e as cláusulas específicas, e o sistema formata o documento automaticamente. O download em PDF fica pronto em segundos."
  },
  {
    q: "Quais dados são necessários para preencher o contrato?",
    a: "Você precisará qualificar ambas as partes com nome ou razão social, CPF ou CNPJ, endereço completo e dados de contato. Também é essencial descrever detalhadamente o escopo do serviço, prazos e condições de pagamento."
  },
  {
    q: "O contrato gerado em PDF tem validade jurídica?",
    a: "Sim, tem validade plena perante o Código Civil Brasileiro como um instrumento particular. A verdade é que o documento serve como prova das obrigações assumidas por cada uma das partes contratantes."
  },
  {
    q: "Preciso registrar o contrato em cartório?",
    a: "Não é obrigatório reconhecer firma ou registrar em cartório para que o contrato seja válido. No entanto, as assinaturas digitais ou físicas das partes e de testemunhas são essenciais."
  },
  {
    q: "Qual a importância das duas testemunhas no contrato?",
    a: "A assinatura de duas testemunhas confere ao documento a força de título executivo extrajudicial. Veja bem, em caso de inadimplência, você pode cobrar a dívida judicialmente de forma muito mais rápida."
  },
  {
    q: "Como o processamento dos dados é feito no gerador?",
    a: "Prezamos totalmente pela sua segurança. Todo o processamento e formatação do PDF ocorrem localmente no seu navegador. Nós não salvamos nenhuma informação pessoal em nossos servidores."
  },
  {
    q: "O gerador de contratos do Mestre das Contas é gratuito?",
    a: "Sim, a ferramenta é 100% gratuita e ilimitada. Você pode gerar quantos contratos precisar, sem taxas ocultas ou necessidade de realizar qualquer tipo de cadastro."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Contratos",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Crie contratos profissionais e seguros com base no Código Civil Brasileiro gratuitamente."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ]
};

export default function ContractIndexPage() {
  return (
    <article className="w-full min-h-screen font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 relative z-10 space-y-8">
          
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="contract_index_top" format="horizontal" variant="agency" />
        </div>

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
                 <p>Nossos modelos geram um <strong>"Instrumento Particular de Prestação de Serviços"</strong>. Segundo o <GlossaryTerm slug="contrato-de-prestacao-de-servicos">Código Civil</GlossaryTerm> e o Código de Processo Civil (Art. 784), para que este documento se torne um título executivo (permitindo cobrança judicial rápida em caso de calote), ele deve:</p>
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

         <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />

         <SmartGlossaryLinker currentHref="/ferramentas/gerador-contrato" />

         <SmartCrossLinker currentHref="/ferramentas/gerador-contrato" category="ferramentas" />

         {/* SEÇÃO FAQ ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) */}
         <section className="w-full mt-8">
           <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
               <HelpCircle className="text-blue-500 shrink-0" size={32} /> Perguntas Frequentes Resolvidas
             </h2>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
               Tira-dúvidas definitivo sobre a utilização e regras legais vinculadas a este recurso.
             </p>

             <div className="space-y-4 not-prose">
               {faqList.map((faq, index) => (
                 <details 
                   key={index}
                   className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                 >
                   <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                     <span className="pr-4">{faq.q}</span>
                     <span className="transition-transform duration-300 group-open:rotate-180 text-blue-500">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                       </svg>
                     </span>
                   </summary>
                   <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                     {faq.a}
                   </div>
                 </details>
               ))}
             </div>
           </div>
         </section>

         {/* ANÚNCIO RODAPÉ */}
         <div className="w-full flex justify-center mt-8 min-h-[250px] print:hidden">
           <LazyAdUnit slot="contract_index_bottom" format="auto" />
         </div>

       </div>
     </article>
  );
}
