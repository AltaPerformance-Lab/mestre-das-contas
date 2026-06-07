import { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import OrderCreator, { type OrderData } from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { orderCases } from "@/data/order-pseo-list";
import { ShoppingBag, ArrowLeft, Star, Briefcase, BookOpen, PenTool, ShieldCheck, HelpCircle, FileText, ShoppingCart } from "lucide-react";
import ExpertSignature from "@/components/ui/ExpertSignature";

type Props = {
  params: Promise<{ slug: string }>
}

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
    return orderCases.map((customCase) => ({
        slug: customCase.slug 
    }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const customCase = orderCases.find(c => c.slug === slug);

    if (!customCase) return {};

    const title = `${customCase.title} | Grátis em PDF`;
    const description = customCase.description;

    return {
        title,
        description,
        keywords: [
            ...customCase.keywords,
            "talão de pedido online", 
            "bloco de pedido pdf",
            "fazer pedido venda profissional"
        ],
        alternates: { canonical: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}` },
        openGraph: {
            title,
            description,
            url: `https://mestredascontas.com.br/ferramentas/criador-pedidos/${slug}`,
            type: "article"
        }
    };
}

export default async function OrderPseoPage({ params }: Props) {
    const { slug } = await params;
    const customCase = orderCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // FAQ Dinâmico com exatamente 7 questões sincronizadas
    const faqs = [
        {
            q: `O que é um ${customCase.title} e qual sua principal função?`,
            a: `Um ${customCase.title} é um documento comercial oficial utilizado por lojistas, prestadores de serviços e autônomos para formalizar uma transação de compra efetuada pelo cliente. A verdade é que ele atua como a garantia de que as partes acordaram sobre os produtos específicos, quantidades, custos tributários ou de frete, além de estabelecer a data final de entrega.`
        },
        {
            q: `Como posso gerar e salvar meu talão de pedido em PDF no celular?`,
            a: `O processo é extremamente prático. Preencha as informações do emissor e adicione o seu logotipo, complete os dados do comprador, liste as mercadorias ou serviços vendidos na tabela e preencha as condições de frete e prazos. Em seguida, clique em 'Imprimir Pedido' e altere o destino de impressão para 'Salvar como PDF' para efetuar o download.`
        },
        {
            q: `É possível colocar o logotipo da minha marca no topo do pedido?`,
            a: `Sim! A nossa ferramenta disponibiliza um campo de upload interativo no topo do gerador de pedidos. Basta carregar o arquivo da sua logo (nos formatos PNG ou JPG) para que ela seja inserida centralizada e com excelente resolução no cabeçalho do arquivo PDF A4 gerado, conferindo um patamar estético altamente profissional.`
        },
        {
            q: `Qual a real diferença jurídica entre um Pedido de Venda e um Orçamento?`,
            a: `A diferença reside no compromisso de compra. O Orçamento é apenas uma estimativa provisória de preços sem qualquer compromisso financeiro. Já o Pedido de Venda é a formalização de que a compra foi concluída e autorizada pelo cliente. Veja bem, o pedido consolida a transação e costuma dar início à separação de estoque ou produção.`
        },
        {
            q: `Como posso definir regras claras de trocas e devoluções no talão?`,
            a: `Manter as condições descritas em papel é o segredo de ouro para evitar disputas de consumo. No campo de 'Termos e Condições', nós aconselhamos estipular prazos para trocas de peças, políticas em relação a mercadorias de saldo ou promoção e taxas aplicáveis em caso de cancelamento da encomenda pelo cliente.`
        },
        {
            q: `O talão de pedido gerado online substitui a Nota Fiscal Eletrônica (NF-e)?`,
            a: `Não. O talão de pedido é uma documentação interna gerencial e probatória civil entre as partes. Ele não substitui a Nota Fiscal oficial exigida pela Receita Federal para cobrança tributária. No entanto, o pedido impresso serve como a base de dados ideal e segura para preenchimento posterior do seu faturamento tributário.`
        },
        {
            q: `Como evitar calotes ao aceitar encomendas sob medida ou personalizadas?`,
            a: `A regra de ouro é sempre exigir um pagamento de sinal mínimo de 50% antes de comprar materiais ou começar a fabricar produtos customizados. Ao formalizar o pedido com o sinal pago e detalhar que itens personalizados não têm direito de devolução por arrependimento simples (pois não podem ser revendidos), você blinda suas finanças de forma legal.`
        }
    ];

    // JSON-LD Dinâmico (Dual: App + FAQPage)
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
                        { label: "Criar Pedido", href: "/ferramentas/criador-pedidos" },
                        { label: customCase.title }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/ferramentas/criador-pedidos" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Versão Padrão
                    </Link>
                </div>

                {/* REVISÃO COMERCIAL (E-E-A-T) */}
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                  <span>Documento padronizado para formalização de vendas e prestação de serviços conforme o Código de Defesa do Consumidor.</span>
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-xl mb-6 flex items-start gap-3 print:hidden transition-all hover:shadow-md">
                        <Star className="text-indigo-600 dark:text-indigo-400 mt-1 shrink-0" size={20} fill="currentColor"/>
                        <div>
                            <p className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">Template Ativo: {customCase.title}</p>
                            <p className="text-indigo-700 dark:text-indigo-300/80 text-xs mt-1">
                                Pedido pré-configurado especificamente para sua área comercial. Ajuste os itens e configure a entrega livremente.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
                        <OrderCreator initialValues={customCase.initialValues} />
                    </Suspense>
                    
                    <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
                </section>

                {/* --- ARTIGO EDUCACIONAL ESPECÍFICO E PROFUNDO (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
                <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full print:hidden">
                    
                    <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                        <ShoppingCart className="text-emerald-500"/> Como Dominar as Vendas Com um Talão de Pedido Profissional
                    </h2>
                    
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Ao gerir a rotina comercial de qualquer microempreendimento ou trabalho autônomo, a maior armadilha é a informalidade dos fechamentos.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Veja bem, fechar negócios por telefone ou mensagens rápidas no chat de forma crua abre margens gigantescas para erros de comunicação.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A verdade é que o cliente pode se confundir em relação ao tamanho das peças, recheio de bolos, aromas de mimos ou prazos combinados.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Nós estruturamos este emissor automatizado justamente para que você forneça um comprovante oficial, blindado e legível na hora da compra.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Com essa folha de pedido timbrada em PDF, você assume o controle do fluxo de estoque e estabelece regras claras de trocas e cancelamento.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Aí é que está o segredo: formalizar as transações com um sinal financeiro e documentar tudo afasta calotes e garante mais dinheiro no caixa.
                    </p>

                    {/* Como usar a ferramenta - Passo a Passo */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
                        <PenTool className="text-indigo-600 dark:text-indigo-400 shrink-0" size={24} /> O Caminho do Fechamento Sem Erros
                    </h3>
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Crie e gerencie seus pedidos de venda de forma organizada em 4 simples passos:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">1</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira Seus Dados & Logo</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Preencha as informações do Emissor e carregue a imagem da sua logo para destacar o cabeçalho do documento.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">2</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dados do Cliente & Frete</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Informe os dados completos do comprador, prazos de entrega e configure os custos de frete aplicáveis.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">3</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Registre as Mercadorias</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Insira quantidade, descrição específica (especificando cor, tamanho ou sabor) e custos de cada item da venda.</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">4</div>
                        <div className="space-y-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">Gere o PDF do Pedido</h4>
                           <p className="text-xs text-slate-500 dark:text-slate-400">Clique em 'Imprimir Pedido' para exportar a folha timbrada oficial em PDF, pronta para ser assinada pelo cliente ou despachada.</p>
                        </div>
                      </div>
                    </div>

                    <hr className="my-8 border-slate-100 dark:border-slate-800" />

                    {/* Comparativo de Documentos Operacionais - Tabela HTML */}
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Planilha Comparativa: Talão de Pedido vs Orçamento Comercial vs Nota Fiscal</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                       Muitos empreendedores ainda possuem dúvidas conceituais sobre a hora exata de emitir cada tipo de documento na rotina de faturamento.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                       Nós elaboramos uma planilha técnica comparando a finalidade legal, validade operacional e complexidade de cada uma dessas ferramentas.
                    </p>

                    <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                        <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                    <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Operacional</th>
                                    <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Talão de Pedido (Nossa Ferramenta)</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Orçamento Comercial</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Nota Fiscal (NF-e)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Vínculo de Venda</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Confirmado (Compra fechada)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Provisório (Apenas cotação)</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Fiscal (Processada no Fisco)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Burocracia / Complexidade</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Dispensado de registro tributário</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispensado de registro tributário</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exige API municipal/estadual ativa</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Finalidade no Caixa</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Garantir a separação/produção</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Negociar valores e margens</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Comprovar recolhimento de imposto</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Uso Recomendado</td>
                                    <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Sacoleiras, <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm>, encomendas</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Consultoria, projetos complexos</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Venda formal a qualquer cliente</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                       Veja bem, compreendendo a função exata de cada etapa do faturamento, você transmite segurança comercial inabalável para quem compra de você.
                    </p>

                    {/* Metáfora do "Contrato de Aço" */}
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Cadeado de Encomenda": O Pedido Como Seu <GlossaryTerm slug="contrato-de-prestacao-de-servicos">Contrato</GlossaryTerm> de Produção</h2>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Para ilustrar a relevância de registrar seus fechamentos comerciais em papel, nós gostamos de fazer uma analogia com a reserva de passagens de avião.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Se você apenas ligar para a companhia aérea pedindo para 'guardar uma poltrona', no dia do voo você provavelmente descobrirá que sua reserva foi apagada.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      O talão de pedido assinado com o sinal de 50% pago é a emissão do seu bilhete de embarque com assento marcado no voo da produção.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Ele bloqueia legalmente a vaga no seu cronograma e protege suas finanças contra desistências intempestivas do cliente.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      Se o cliente tentar cancelar a viagem na véspera, o bilhete já custeou as matérias-primas e a preparação da aeronave.
                    </p>

                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Parece complicado, né? Mas na verdade, nós encaramos o talão de pedido como um cadeado de proteção essencial para a saúde do seu caixa de produção.
                    </p>

                    {/* Conteúdo Dinâmico Predefinido do Profissional */}
                    {customCase.articleContent && (
                        <div className="mb-8 mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-4">
                                <BookOpen size={16} /> Checklist Operacional da Atividade
                             </div>
                            <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                                {customCase.articleContent}
                            </div>
                        </div>
                    )}

                    <ExpertSignature author="Equipe de Redação Mestre das Contas" updatedAt="Junho de 2026" />
                </div>

                <SmartGlossaryLinker currentHref={`/ferramentas/criador-pedidos/${slug}`} />
                <SmartCrossLinker currentHref={`/ferramentas/criador-pedidos/${slug}`} category="ferramentas" />

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

                {/* PUBLICIDADE BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="orcamento_bottom" format="horizontal" variant="software" className="min-h-[100px] w-full" />
                </div>
            </div>
        </article>
    );
}
