import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promissoryCases } from "@/data/promissory-cases";
import PromissoryGenerator from "@/components/tools/PromissoryGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Suspense } from "react";
import { 
  FileText, ShieldCheck, CheckCircle2, AlertTriangle, Scale, Star, Sparkles, HelpCircle
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return promissoryCases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = promissoryCases.find((c) => c.slug === slug);
  
  if (!note) {
    return { title: "Promissória não encontrada" };
  }

  const title = `${note.name} (Grátis em PDF) | Modelo 2026`;
  const description = `Gere sua ${note.name} online e de graça. Modelo de título de crédito pronto para impressão em 2026, garantindo a cobrança legal da sua dívida.`;

  return {
    title,
    description,
    keywords: [...note.keywords, "gerador de nota promissoria gratis", "promissoria em pdf", "modelo de nota promissoria para imprimir"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}` },
    openGraph: {
      title,
      description,
      url: `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}`,
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [{ url: `https://mestredascontas.com.br/opengraph/nota-promissoria-${note.slug}.jpg`, width: 1200, height: 630, alt: note.name }]
    },
    robots: { index: true, follow: true }
  };
}

export default async function PromissoryCasePage({ params }: PageProps) {
  const { slug } = await params;
  const note = promissoryCases.find((c) => c.slug === slug);

  if (!note) {
    notFound();
  }

  // 7 FAQs Dinâmicas Sincronizadas
  const faqs = [
    {
      q: `O que é uma ${note.name} e qual é a sua real validade legal perante a justiça brasileira?`,
      a: `A ${note.name} é um título de crédito regulamentado pelo Decreto nº 2.044/1908 e pela Lei Uniforme de Genebra (LUG). Ela representa uma promessa incondicional de pagamento escrita de próprio punho. Juridicamente, atua como um título executivo extrajudicial autônomo, permitindo que o credor execute a cobrança judicial direta (penhora de bens) em caso de inadimplência, sem precisar discutir a origem da dívida.`
    },
    {
      q: `Quais são os requisitos obrigatórios exigidos por lei para uma ${note.name} ter força executiva?`,
      a: "Veja bem, para ter validade executiva plena, o documento deve conter obrigatoriamente: a denominação 'Nota Promissória' escrita no corpo do documento, a promessa pura e simples de pagar uma quantia determinada, o nome da pessoa a quem se deve pagar (credor), a data e o local de emissão, a data de vencimento e a assinatura física de próprio punho do emitente (devedor)."
    },
    {
      q: `O valor escrito por extenso na ${note.name} possui soberania sobre o valor em algarismos?`,
      a: "Sim, de forma absoluta! A legislação brasileira de títulos de crédito estabelece que, em caso de divergência matemática ou digitação entre o valor indicado em algarismos numéricos e o valor escrito por extenso na promissória, o valor expresso por extenso é o que prevalecerá legalmente para fins de execução e cobrança da dívida."
    },
    {
      q: `Qual é o prazo legal de prescrição para executar judicialmente uma ${note.name} vencida?`,
      a: "A verdade é que o credor tem o prazo de até 3 (três) anos, contados exatamente a partir da data de vencimento do título, para ajuizar uma Ação de Execução de Título Extrajudicial. Caso esse prazo de três anos seja ultrapassado sem ação judicial, o título prescreve judicialmente, restando apenas a via comum de cobrança (Ação Monitória)."
    },
    {
      q: `É obrigatório reconhecer firma em cartório da assinatura do devedor na ${note.name}?`,
      a: "Não é um requisito obrigatório para a existência ou validade executiva do documento. A nota promissória assinada já possui força de título executivo extrajudicial por si só. No entanto, o reconhecimento de firma por semelhança ou autenticidade em cartório é uma excelente prática protetiva, pois anula qualquer contestação futura sobre a autenticidade da assinatura."
    },
    {
      q: `Uma ${note.name} rasurada perde totalmente a sua validade jurídica de cobrança?`,
      a: "Sim, há um altíssimo risco. Títulos de crédito são regidos pela rigidez formal. Qualquer rasura, uso de corretivo líquido, borrão no valor, datas riscadas ou emendas à caneta no corpo da promissória podem anular a força de execução extrajudicial do documento, transformando-o em mero início de prova documental e retardando o recebimento."
    },
    {
      q: `Como funciona o protesto em cartório de uma ${note.name} que não foi paga no vencimento?`,
      a: "O credor pode levar o título ao Cartório de Protesto de Títulos da comarca onde a nota foi emitida ou onde o pagamento deveria ser efetuado. O cartório notificará oficialmente o devedor para quitar o débito em até 3 dias úteis. Caso não pague, o devedor será protestado, o que restringe seu CPF/CNPJ nos órgãos de proteção ao crédito (Serasa/SPC)."
    }
  ];

  // JSON-LD Dinâmico (Dual: App + HowTo + FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": note.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": note.description
      },
      {
        "@type": "HowTo",
        "name": `Como preencher e imprimir ${note.name}`,
        "description": `Passo a passo simples para emitir sua ${note.name} grátis em PDF com valor por extenso automático.`,
        "totalTime": "PT1M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Digite o Valor",
            "text": "Informe o valor em reais da promissória. A ferramenta calcula o valor por extenso automaticamente por segurança.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Preencha Devedor e Credor",
            "text": "Preencha os dados do devedor (quem vai pagar) e do credor (quem vai receber), incluindo CPF/CNPJ.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Insira Datas e Vencimento",
            "text": "Defina o dia do vencimento e o local e data de emissão do título de crédito.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Imprima em PDF e Assine",
            "text": "Clique no botão de impressão. O devedor precisa assinar a próprio punho para ter validade jurídica.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-promissoria/${note.slug}#ferramenta`
          }
        ]
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

  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title={note.name}
            description={note.description}
            category="Cobrança e Garantia"
            icon={<FileText size={32} className="text-amber-600" />}
            variant="default"
            categoryColor="amber"
            badge="Modelo PDF 2026"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Nota Promissória", href: "/ferramentas/gerador-promissoria" },
              { label: note.shortName }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* AD TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="promissory_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300 mb-2">
          <ShieldCheck size={18} className="text-amber-600 shrink-0" />
          <span>Geração Local Garantida: Os dados preenchidos no formulário são protegidos. O PDF é gerado e formatado localmente na memória do seu navegador.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <PromissoryGenerator />
        </Suspense>
        <div className="mt-8 print:hidden">
          <DisclaimerBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-amber-50 dark:bg-amber-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Valor por Extenso</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Nosso sistema converte o valor numérico digitado em texto por extenso de forma automatizada por segurança jurídica.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full">
                    <Scale size={12}/> Evite Divergências Judiciais
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                    <FileText size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Modelo Completo</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    O PDF gerado acompanha o corpo formal da promissória e o canhoto de controle administrativo do credor.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Isolamento Local</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Nenhum CPF, CNPJ ou nome digitado é transferido para nossos servidores. Crie seus títulos offline.
                </p>
            </div>
        </section>

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
                    <Star className="text-amber-500 fill-amber-500 animate-pulse" /> O Foguete da Cobrança: Segurança Legal com {note.name}
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você fez um empréstimo considerável para um parceiro comercial ou vendeu um automóvel usado.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se você confia apenas no aperto de mão e em mensagens informais de aplicativo, reaver esse saldo na justiça é complexo.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que ter uma {note.name} devidamente preenchida e assinada muda totalmente as regras do jogo.
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
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{note.shortName} (Gerador)</td>
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
                        <AlertTriangle size={20} className="text-amber-600" /> Aviso de Isenção Legal
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A ferramenta do Mestre das Contas simplifica a formatação jurídica do PDF. Nenhuma informação pessoal é salva por nós. Não nos responsabilizamos pela solvência dos devedores ou por erros de digitação cometidos. Em negócios de alto risco financeiro, consulte sempre um advogado especializado.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="promissory_sidebar" format="horizontal" />
            </div>
        </div>

        <ExpertSignature author="Equipe Jurídica e Financeira Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref={`/ferramentas/gerador-promissoria/${note.slug}`} />

        <SmartCrossLinker currentHref={`/ferramentas/gerador-promissoria/${note.slug}`} category="ferramentas" />

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
             <LazyAdUnit slot="promissory_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}

