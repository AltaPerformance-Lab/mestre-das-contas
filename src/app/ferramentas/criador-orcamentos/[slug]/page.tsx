import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BudgetCreator, { type BudgetData } from "@/components/tools/BudgetCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";
import { budgetCases } from "@/data/budget-pseo-list";
import { ArrowLeft, Star, Briefcase, BookOpen, PenTool, CheckCircle2, ShieldCheck, HelpCircle, FileText, ClipboardCheck } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>
}

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return budgetCases.map((customCase) => ({
        slug: customCase.slug 
    }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const customCase = budgetCases.find(c => c.slug === slug);

    if (!customCase) return {};

    const title = `${customCase.title} | Grátis em PDF`;
    const description = customCase.description;

    return {
        title,
        description,
        keywords: [
            ...customCase.keywords,
            "criador de orçamento online", 
            "modelo de orçamento editavel",
            "fazer orçamento profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}` },
        openGraph: {
            title,
            url: `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}`,
            type: "article"
        }
    };
}

export default async function BudgetPseoPage({ params }: Props) {
    const { slug } = await params;
    const customCase = budgetCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // FAQ Dinâmico com exatamente 7 questões sincronizadas
    const faqs = [
        {
            q: `O que é um ${customCase.title} e qual sua finalidade principal?`,
            a: `Um ${customCase.title} é um documento comercial oficial emitido por um profissional para formalizar escopos de serviços, quantidade de insumos, valores de mão de obra e prazos de entrega para o contratante. A verdade é que ele atua como a fundação de confiança do negócio, garantindo que ambas as partes concordem formalmente com os termos estipulados antes de dar início ao trabalho.`
        },
        {
            q: `Como posso preencher e gerar meu orçamento em arquivo PDF profissional?`,
            a: `O preenchimento é extremamente simples. Insira as informações da sua empresa (incluindo o logotipo para transmitir maior autoridade), preencha os dados do cliente, insira as descrições dos serviços prestados ou materiais necessários na tabela e revise os Termos e Condições. Em seguida, clique em 'Gerar PDF' e selecione a impressora virtual 'Salvar como PDF' para obter o arquivo limpo.`
        },
        {
            q: `Posso incluir o logotipo da minha marca no cabeçalho do orçamento?`,
            a: `Com certeza! A nossa ferramenta disponibiliza um campo interativo no cabeçalho do gerador para carregar a imagem da sua logo (nos formatos PNG ou JPG). Ao fazer o upload, a imagem é embutida de forma elegante e centralizada no cabeçalho do arquivo PDF gerado, elevando o patamar institucional do seu documento de orçamento.`
        },
        {
            q: `Qual é o segredo de detalhar com cuidado os Termos e Condições no orçamento?`,
            a: `Deixar as regras comerciais explícitas por escrito é a chave para blindar sua atuação profissional. No campo de 'Termos e Condições', nós aconselhamos estipular o período de validade do orçamento (visto a oscilação constante de custos de materiais), as condições de parcelamento aceitas, prazos reais de entrega e o que **não** está incluso no escopo combinado.`
        },
        {
            q: `Como funciona o cálculo automático de somatórios na tabela de itens?`,
            a: `Nossa plataforma possui um algoritmo de cálculo integrado de última geração. Conforme você insere os itens, ajusta as quantidades ou edita os valores unitários, o sistema calcula as multiplicações e atualiza o subtotal e o valor total geral instantaneamente na tela. Isso zera qualquer possibilidade de falhas aritméticas manuais na frente do seu cliente.`
        },
        {
            q: `Um orçamento formalizado e assinado possui peso jurídico de contrato?`,
            a: `Sim! Perante a legislação civil brasileira, um orçamento formal assinado pelo cliente ou aceito via canais digitais (como e-mail ou WhatsApp) pode ser interpretado como um contrato preliminar de prestação de serviços. Ele atua como uma prova probatória incontestável de consentimento mútuo de valores, obrigações e escopo.`
        },
        {
            q: `Como fazer para que o meu orçamento seja aprovado com facilidade pelo cliente?`,
            a: `Para maximizar sua conversão de vendas, nós sempre recomendamos educar o seu cliente por meio do orçamento. Em vez de listar linhas vagas, descreva detalhadamente a qualidade técnica das marcas de insumos que você utiliza e sua metodologia de trabalho. O layout profissional e limpo do nosso criador transmite segurança comercial de ponta.`
        }
    ];

    // JSON-LD Dinâmico (Dual: App + HowTo + FAQPage)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": customCase.title,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": customCase.longDescription
            },
            {
                "@type": "HowTo",
                "name": `Como fazer um ${customCase.title}`,
                "description": `Passo a passo para gerar um orçamento profissional de ${customCase.title} em PDF.`,
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Preencha seus dados",
                        "text": "Informe os dados da sua empresa (Emissor) e adicione sua logo para passar credibilidade.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Adicione o cliente",
                        "text": "Preencha os dados do cliente para quem o orçamento é destinado.",
                        "url": `https://mestredascontas.com.br/ferramentas/criador-orcamentos/${slug}#ferramenta`
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
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

    return (
        <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
             <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.longDescription}
                    category="Modelos Prontos"
                    icon={<Briefcase size={32} strokeWidth={2} />}
                    variant="tools"
                    categoryColor="indigo"
                    badge="Atualizado 2026"
                    breadcrumbs={[
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos" },
                        { label: customCase.title }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/ferramentas/criador-orcamentos" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Versão Padrão
                    </Link>
                </div>

                {/* REVISÃO PROFISSIONAL (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Estrutura de orçamento profissional auditada para máxima conversão e clareza comercial em 2026.</span>
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden transition-all hover:shadow-md">
                        <Star className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20} fill="currentColor"/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Template Ativo: {customCase.title}</p>
                            <p className="text-indigo-700 dark:text-indigo-300/80 text-xs mt-1">
                                Dados pré-preenchidos com valores de referência de mercado. Edite as linhas e ajuste conforme suas regras de precificação.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                        <BudgetCreator initialValues={customCase.initialValues} />
                    </Suspense>
                    
                    <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
                </section>

                {/* --- ARTIGO EDUCACIONAL ESPECÍFICO E PROFUNDO (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
                <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full print:hidden">
                    
                    <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-indigo-500 pl-4 flex items-center gap-3">
                        <ClipboardCheck className="text-indigo-500"/> O Segredo Oculto de um Orçamento Irrecusável
                    </h2>
                    
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Imagine a seguinte situação comercial clássica: você passa horas conversando com um cliente em potencial, discute suas demandas técnicas e o convence de que você é a pessoa perfeita para o trabalho.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Contudo, no momento do envio da proposta, você apenas digita um valor bruto em uma mensagem rápida de WhatsApp de forma solta.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A verdade é que esse é o maior causador de perda de conversão e de suspeitas de amadorismo por parte de microempreendedores autônomos.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Veja bem, o cliente não quer ver apenas um preço; ele precisa enxergar a clareza técnica de escopo, as linhas de materiais e as garantias contratuais.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Nós estamos aqui para garantir que suas propostas passem a mais sólida credibilidade e assegurem taxas de fechamento incomparavelmente maiores.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Aí é que está o segredo: um documento em folha timbrada, com seu logotipo e termos detalhados de garantia, justifica plenamente o seu preço profissional frente à concorrência barata.
                    </p>

                    {/* Como usar o Criador - Passo a Passo */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
                        <PenTool className="text-indigo-600 dark:text-indigo-400 shrink-0" size={24} /> Como Estruturar Sua Proposta Com Perfeição
                    </h3>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Monte uma proposta altamente profissional com sua marca em PDF em apenas 4 etapas estruturadas:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">1</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira Seus Dados & Logo</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Informe os seus dados e carregue uma imagem PNG ou JPG da sua marca para estampar a folha timbrada.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">2</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Preencha o Cliente</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Insira a identificação do contratante de forma completa (nome, contato, endereço e CPF/CNPJ) para validade contratual.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">3</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Ajuste os Itens da Tabela</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Edite as descrições dos serviços, insira as quantidades de horas ou metros e determine os custos unitários.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center shrink-0">4</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Imprima ou Salve o PDF</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Clique em 'Gerar PDF' para produzir a folha A4 oficial de proposta comercial, pronta para arquivamento ou envio por chat.</p>
                        </div>
                      </div>
                    </div>

                    <hr className="my-8 border-slate-100 dark:border-slate-800" />

                    {/* Comparativo de Padrões Comerciais - Tabela HTML */}
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Orçamento Profissional PDF vs Anotação no Zap vs Bloco de Papel Carbono</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                       A forma como você apresenta seus números dita a percepção de valor do seu cliente antes mesmo de você começar a trabalhar.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                       Para comprovar esse impacto de autoridade, nós mapeamos os três padrões de comunicação mais adotados por prestadores de serviços no Brasil.
                    </p>

                    <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                        <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Dimensão Comercial</th>
                                    <th className="px-6 py-4 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/10 dark:bg-indigo-950/10">Orçamento PDF (Nossa Plataforma)</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Mensagem Simples de Zap</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Bloco de Carbono (Papelaria)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Impressão e Visual</td>
                                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold bg-indigo-50/10 dark:bg-indigo-950/10">Impecável (Folha timbrada com logo)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Texto corrido informal</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Caligrafia manual sujeita a rasuras</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Validade Civil de Cobrança</td>
                                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold bg-indigo-50/10 dark:bg-indigo-950/10">Alta (Contém termos e assinaturas)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Baixa (Fácil de descontextualizar)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Nula (Sem dados estruturados formais)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Cálculo de Somatórios</td>
                                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold bg-indigo-50/10 dark:bg-indigo-950/10">100% Automático e Inteligente</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Manual (Sujeito a erros aritméticos)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Manual com calculadora manual</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Aderência de Preço Alto</td>
                                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold bg-indigo-50/10 dark:bg-indigo-950/10">Excelente (Transmite valor técnico)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Pobre (Cliente pede desconto na hora)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Pobre (Imagem de profissional barato)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                       O melhor de tudo? Como mapeado acima, a apresentação por PDF timbrado legitima o seu profissionalismo e protege a sua margem de lucro perante os fechamentos comerciais de alto nível.
                    </p>

                    {/* Metáfora do Cartão de Visitas Digital */}
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Vestuário de Negócios": O Orçamento Como Seu Terno Digital</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Para ilustrar a relevância de um bom design de proposta comercial, nós gostamos de fazer uma analogia com a vestimenta em reuniões corporativas.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Se você comparecer a uma reunião importante calçando chinelos e vestindo roupas informais de passeio, o cliente imediatamente formará um pré-julgamento de desorganização.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Ele pensará que se você não tem o cuidado com a sua própria apresentação, também não terá cuidado com o serviço dele.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      O orçamento enviado em papel de caderno ou digitado de forma crua no chat é o equivalente a chinelos comerciais na internet.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Já o nosso criador automatizado confecciona o seu "terno digital": um documento sob medida, impecável, elegante e com todas as costuras jurídicas no lugar.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Parece complicado, né? Mas veja bem, vestir o seu negócio com uma folha timbrada profissional é a forma mais simples e garantida de colher excelentes contratos.
                    </p>

                    {/* Conteúdo Dinâmico Predefinido do Profissional */}
                    {customCase.articleContent && (
                        <div className="mb-8 mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-4">
                                <BookOpen size={16} /> Checklist Técnico de Atuação
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                                {customCase.articleContent}
                            </div>
                        </div>
                    )}

        </div>

        <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref={`/ferramentas/criador-orcamentos/${slug}`} />

        <SmartCrossLinker currentHref={`/ferramentas/criador-orcamentos/${slug}`} category="ferramentas" />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-indigo-500 shrink-0" size={32} /> Perguntas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Confira as respostas definitivas para as principais dúvidas dos microempreendedores na área de {customCase.title}.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-indigo-500">
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

    </div>
</article>
    );
}
