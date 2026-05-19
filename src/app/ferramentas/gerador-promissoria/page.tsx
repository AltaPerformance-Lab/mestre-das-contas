import type { Metadata } from "next";
import Link from "next/link";
import { promissoryCases } from "@/data/promissory-cases";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import { FileText, ChevronRight, CheckCircle2, ShieldAlert } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

export const metadata: Metadata = {
  title: "Gerador de Nota Promissória em PDF (Grátis para Imprimir)",
  description: "Crie notas promissórias com validade comercial em menos de 1 minuto. Modelo online gratuito preenchido e com valor por extenso, pronto para impressão.",
  keywords: [
    "gerador de nota promissória", "nota promissoria em pdf", 
    "modelo nota promissoria imprimir", "fazer promissoria online", "titulo de credito"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-promissoria" },
  openGraph: {
    title: "Gerador de Nota Promissória (Grátis em PDF) | Mestre das Contas",
    description: "Crie notas promissórias prontas para assinatura e garanta legalmente suas vendas e empréstimos.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-promissoria",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website"
  }
};

export default function PromissoryIndexPage() {
  return (
    <article className="w-full min-h-screen font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-12">
        <PageHeader 
          title="Gerador de Nota Promissória"
          description="A forma mais rápida e segura de documentar uma dívida. Escolha o seu caso abaixo, preencha os dados e gere o PDF da nota promissória preenchida e com valor por extenso, pronta para assinatura."
          category="Jurídico & Negócios"
          icon={<FileText size={32} />}
          variant="default"
          categoryColor="amber"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Nota Promissória" }
          ]}
        />
        
        <div className="max-w-4xl mx-auto mt-8 flex justify-center">
            <PrivacyBadge />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 space-y-8">
          
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {promissoryCases.map((note) => (
            <Link 
              key={note.slug}
              href={`/ferramentas/gerador-promissoria/${note.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700 transition-all group flex flex-col justify-between"
            >
              <div>
                 <div className="bg-amber-50 dark:bg-amber-900/30 w-12 h-12 rounded-xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                    {note.shortName}
                 </h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3">
                    {note.description}
                 </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                 Gerar Promissória <ChevronRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="promissory_index_mid" format="horizontal" />
        </div>

        {/* ARTIGO INFORMATIVO E AVISO LEGAL */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm mt-8">
            <h2 className="text-2xl font-bold mb-6">O que faz uma Nota Promissória ter validade legal?</h2>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>A nota promissória é um <strong>título de crédito</strong> (uma promessa incondicional de pagamento) regulamentado no Brasil pelo Decreto 2.044/1908 e pela LUG. Isso significa que, se preenchida corretamente, você não precisa de um processo longo (fase de conhecimento) para cobrar a dívida judicialmente: você entra direto na fase de execução, podendo pedir penhora de bens e bloqueio de contas do devedor.</p>
                
                <h3 className="flex items-center gap-2 mt-8 mb-4"><CheckCircle2 className="text-emerald-500"/> Requisitos Essenciais</h3>
                <p>Nossa ferramenta garante que a estrutura do documento está correta, mas você precisa assegurar que:</p>
                <ul>
                    <li>A expressão "Nota Promissória" está escrita no documento (já incluso em nosso PDF).</li>
                    <li>O valor a ser pago esteja expresso em algarismos e também <strong>por extenso</strong> (nosso gerador converte automaticamente para evitar fraudes).</li>
                    <li>O nome completo da pessoa a quem deve ser pago (Credor).</li>
                    <li>A assinatura de próprio punho (física ou digital certificada) do Emitente/Devedor.</li>
                </ul>

                <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 my-8 flex flex-col gap-3">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 m-0">
                        <ShieldAlert size={20} className="text-slate-500"/>
                        Aviso de Responsabilidade (Disclaimer)
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">
                        A ferramenta de geração de notas promissórias do Mestre das Contas é um utilitário <strong>gratuito</strong> que facilita a formatação e impressão do documento. Não garantimos que a dívida será recebida nem assumimos qualquer responsabilidade jurídica por erros de preenchimento, rasuras, ou inadimplência do devedor. Documentos com rasuras podem perder a validade executiva. Em caso de negócios de alto risco financeiro, sempre consulte um profissional do direito.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </article>
  );
}
