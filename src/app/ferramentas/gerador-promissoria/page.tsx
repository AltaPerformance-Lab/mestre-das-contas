import type { Metadata } from "next";
import Link from "next/link";
import { promissoryCases } from "@/data/promissory-cases";
import PageHeader from "@/components/layout/PageHeader";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import { FileText, ChevronRight, CheckCircle2, ShieldAlert, Star, Sparkles, Scale, AlertTriangle, ShieldCheck, HelpCircle } from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";

export const metadata: Metadata = {
  title: "Gerador de Nota Promissória em PDF | Grátis para Imprimir 2026",
  description: "Crie notas promissórias com valor legal por extenso e prontas para impressão em 1 minuto. Garanta a segurança jurídica dos seus negócios. 100% grátis!",
  keywords: [
    "gerador de nota promissória", "nota promissoria em pdf", 
    "modelo nota promissoria imprimir", "fazer promissoria online", "titulo de credito"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-promissoria" },
  openGraph: {
    title: "Gerador de Nota Promissória (Grátis em PDF) | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/gerador-promissoria",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/nota-promissoria.jpg", width: 1200, height: 630, alt: "Gerador de Nota Promissória" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "O que é uma nota promissória e qual é a sua real validade legal perante a justiça brasileira?",
    a: "A nota promissória é um título de crédito regulamentado pelo Decreto nº 2.044/1908 e pela Lei Uniforme de Genebra (LUG). Ela representa uma promessa incondicional de pagamento escrita de próprio punho. Juridicamente, atua como um título executivo extrajudicial autônomo, permitindo que o credor execute a cobrança judicial direta (penhora de bens) em caso de inadimplência, sem precisar discutir a origem da dívida."
  },
  {
    q: "Quais são os requisitos obrigatórios exigidos por lei para uma nota promissória ter força executiva?",
    a: "Veja bem, para ter validade executiva plena, a nota promissória deve conter obrigatoriamente: a denominação 'Nota Promissória' escrita no corpo do documento, a promessa pura e simples de pagar uma quantia determinada, o nome da pessoa a quem se deve pagar (credor), a data e o local de emissão, a data de vencimento e a assinatura física de próprio punho do emitente (devedor)."
  },
  {
    q: "O valor escrito por extenso na nota promissória possui soberania sobre o valor em algarismos?",
    a: "Sim, de forma absoluta! A legislação brasileira de títulos de crédito estabelece que, em caso de divergência matemática ou digitação entre o valor indicado em algarismos numéricos e o valor escrito por extenso na promissória, o valor expresso por extenso é o que prevalecerá legalmente para fins de execução e cobrança da dívida."
  },
  {
    q: "Qual é o prazo legal de prescrição para executar judicialmente uma nota promissória vencida?",
    a: "A verdade é que o credor tem o prazo de até 3 (três) anos, contados exatamente a partir da data de vencimento do título, para ajuizar uma Ação de Execução de Título Extrajudicial. Caso esse prazo de três anos seja ultrapassado sem ação judicial, o título prescreve judicialmente, restando apenas a via comum de cobrança (Ação Monitória)."
  },
  {
    q: "É obrigatório reconhecer firma em cartório da assinatura do devedor na nota promissória?",
    a: "Não é um requisito obrigatório para a existência ou validade executiva do documento. A nota promissória assinada já possui força de título executivo extrajudicial por si só. No entanto, o reconhecimento de firma por semelhança ou autenticidade em cartório é uma excelente prática protetiva, pois anula qualquer contestação futura sobre a autenticidade da assinatura."
  },
  {
    q: "Uma nota promissória rasurada perde totalmente a sua validade jurídica de cobrança?",
    a: "Sim, há um altíssimo risco. Títulos de crédito são regidos pela rigidez formal. Qualquer rasura, uso de corretivo líquido, borrão no valor, datas riscadas ou emendas à caneta no corpo da promissória podem anular a força de execução extrajudicial do documento, transformando-o em mero início de prova documental e retardando o recebimento."
  },
  {
    q: "Como funciona o protesto em cartório de uma nota promissória que não foi paga no vencimento?",
    a: "O credor pode levar o título ao Cartório de Protesto de Títulos da comarca onde a nota foi emitida ou onde o pagamento deveria ser efetuado. O cartório notificará oficialmente o devedor para quitar o débito em até 3 dias úteis. Caso não pague, o devedor será protestado, o que restringe seu CPF/CNPJ nos órgãos de proteção ao crédito (Serasa/SPC)."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Nota Promissória Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online gratuita para emissão e preenchimento de notas promissórias em PDF com valor por extenso automático."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function PromissoryIndexPage() {
  return (
    <article className="w-full min-h-screen font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="max-w-7xl mx-auto px-4 pt-6 w-full">
          <PageHeader 
            title="Gerador de Nota Promissória"
            description="A forma mais rápida e segura de documentar e garantir uma dívida. Escolha o seu caso abaixo, preencha os dados e gere o PDF da nota promissória preenchida e com valor por extenso, pronta para assinatura."
            category="Jurídico & Negócios"
            icon={<FileText size={32} className="text-amber-600" />}
            variant="default"
            categoryColor="amber"
            badge="Modelos Prontos 2026"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Nota Promissória" }
            ]}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-8 flex justify-start w-full">
            <PrivacyBadge />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 space-y-16">
          
        {/* --- SELETOR DE CASOS --- */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promissoryCases.map((note) => (
            <Link 
              key={note.slug}
              href={`/ferramentas/gerador-promissoria/${note.slug}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700 transition-all group flex flex-col justify-between"
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

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="promissory_index_mid" format="horizontal" variant="software" />
        </div>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl text-amber-600 dark:text-amber-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Validade Comercial</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Decreto 2.044/08</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "Notas promissórias emitidas de forma eletrônica e impressas sem qualquer rasura constituem prova inquestionável de obrigação pecuniária líquida e certa sob as diretrizes da LUG."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-amber-500 pl-4 flex items-center gap-3">
                    <Star className="text-amber-500 fill-amber-500 animate-pulse" /> O Foguete Judicial da Cobrança: Validade da Promissória
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você fez um empréstimo considerável para um parceiro comercial ou vendeu um automóvel usado.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você confia apenas no aperto de mão e em mensagens informais de aplicativo, reaver esse saldo na justiça é complexo.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que ter uma nota promissória devidamente preenchida e assinada muda totalmente as regras do jogo.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A nota promissória não é um mero rascunho de intenções administrativas ou um protocolo burocrático de transação.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos que ela é um título de crédito autônomo dotado de força de execução extrajudicial plena no Brasil.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: caso o devedor fique inadimplente, você pula a fase de conhecimento judicial e vai direto ao bloqueio.
                </p>

                {/* Tabela Comparativa de Títulos - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Tabela Comparativa: Diferentes Instrumentos de Cobrança e Prazos</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Compreender os prazos legais de prescrição e as complexidades de execução é indispensável para proteger suas vendas comerciais.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Instrumento de Crédito</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Facilidade de Emissão</th>
                                <th className="px-6 py-4 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50/10 dark:bg-amber-950/10">Prazo de Execução Extrajudicial</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Principal Uso</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Nota Promissória (Gerador)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-mono">Extremamente fácil e rápida</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-amber-50/10 dark:bg-amber-950/10">Até 3 anos pós-vencimento</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Empréstimos B2B e vendas diretas</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Contrato Básico Assinado</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exige redação de cláusulas extensas</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Até 5 anos (com 2 testemunhas)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Serviços corporativos e aluguéis</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Duplicata Mercantil</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exige emissão prévia de Nota Fiscal</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Até 3 anos pós-vencimento</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Transações de atacado e comércio</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Contrato Verbal / Whatsapp</td>
                                <td className="px-6 py-4 text-sm text-red-500 font-bold">Imediata no diálogo diário</td>
                                <td className="px-6 py-4 text-sm text-red-500">Sem execução direta (Exige conhecimento)</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Negócios informais de baixíssimo risco</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Como demonstra a nossa planilha jurídica, o rigor formal e a velocidade executiva da nota promissória superam acordos informais por ampla margem.
                </p>

                {/* Metáfora do Foguete Judicial */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Scale className="text-amber-500" /> A Metáfora do "Foguete Judicial": Garantia de Crédito sem Fricção
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para ajudar você a compreender o poder de um título executivo, adoramos usar a analogia das filas de passaporte em aeroportos.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Cobrar um contrato verbal é como enfrentar a imensa fila de imigração sem visto: o juiz precisará conferir todos os seus papéis, fazer interrogatórios e coletar depoimentos de testemunhas por meses.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Já a nota promissória atua como uma credencial diplomática de passe livre no aeroporto.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Você pula a imigração, apresenta o passaporte diplomático (o título executivo) e o juiz determina na hora: 'Intime o devedor para pagar em 3 dias ou bloqueie os ativos via SisbaJud.'
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Isso poupa anos de brigas jurídicas desgastantes e eleva as taxas de recuperação de créditos inadimplidos de forma notável.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-amber-500" /> Diretrizes para Preencher a Promissória com Total Rigor
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Para assegurar que o seu documento gerado não sofra contestações futuras no judiciário, certifique-se das seguintes práticas:
                </p>
                <ol className="space-y-4 marker:text-amber-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Escrita por Extenso Automatizada:</strong> O nosso gerador faz essa conversão na hora por segurança. Lembre-se que em caso de conflitos de algarismos, o valor por extenso prevalecerá na sentença.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Dados Completos do Emitente:</strong> Preencha o CPF ou CNPJ e o endereço residencial exato do devedor. Isso é crucial para localizá-lo para citação judicial.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Assinatura sem Rasuras:</strong> Exija que a assinatura seja feita à caneta e corresponda fielmente aos documentos oficiais de identidade do devedor.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-amber-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-amber-600 dark:text-amber-400"/> Aviso de Isenção Legal
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A ferramenta do Mestre das Contas simplifica a formatação jurídica do PDF. Não nos responsabilizamos pela solvência dos devedores ou por erros de digitação cometidos. Em negócios de alto risco financeiro, consulte sempre um advogado especializado.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="promissory_index_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe Jurídica e Financeira Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref="/ferramentas/gerador-promissoria" />

        <SmartCrossLinker currentHref="/ferramentas/gerador-promissoria" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-amber-600 dark:text-amber-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as principais dúvidas sobre a emissão e execução jurídica de notas promissórias.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-amber-500">
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

        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="promissory_index_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}

