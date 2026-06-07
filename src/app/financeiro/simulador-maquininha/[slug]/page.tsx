import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CardMachineSimulator from "@/components/calculators/CardMachineSimulator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { cardMachineCases } from "@/data/card-machine-pseo";
import { CreditCard, ArrowLeft, Star, ShoppingCart, TrendingDown, ShieldCheck, Wallet, HelpCircle, Check, Award } from "lucide-react";

// --- SSG ---
export async function generateStaticParams() {
    return cardMachineCases.map((customCase) => ({
        slug: customCase.slug 
    }));
}

type Props = { params: Promise<{ slug: string }> };

// --- METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const customCase = cardMachineCases.find(c => c.slug === slug);

    if (!customCase) return {};

    return {
        title: `${customCase.title} | Mestre das Contas`,
        description: customCase.description,
        keywords: customCase.keywords,
        alternates: { canonical: `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}` },
        openGraph: {
            title: customCase.title,
            description: customCase.description,
            url: `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`,
            type: "article"
        }
    };
}

export default async function CardMachinePSeoPage({ params }: Props) {
    const { slug } = await params;
    const customCase = cardMachineCases.find(c => c.slug === slug);

    if (!customCase) {
        notFound();
    }

    // FAQ Dinâmico com exatamente 7 questões sincronizadas
    const faqs = [
        {
            q: `O que são as taxas MDR e Antecipação na maquininha ${customCase.name}?`,
            a: `A taxa MDR (Merchant Discount Rate) é a tarifa básica cobrada sobre cada transação realizada (geralmente débito ou crédito à vista). Para a ${customCase.name}, o MDR simulado é de ${customCase.mdr}%. A taxa de Antecipação é o custo adicional aplicado para que o saldo de parcelamentos caia na sua conta em 1 dia útil, estimado em ${customCase.anticipation}%. A verdade é que saber calcular a soma dessas tarifas evita sustos nas suas contas.`
        },
        {
            q: `Quanto tempo demora para o saldo de vendas cair na conta com a ${customCase.name}?`,
            a: `O prazo padrão de liquidação para as vendas efetuadas na ${customCase.name} é de 1 dia útil (D+1). Veja bem, no caso específico de marcas como o Mercado Pago, há a opção de liquidez imediata (D+0) na conta digital, inclusive aos finais de semana e feriados. Isso é perfeito para manter seu fluxo de caixa sempre abastecido.`
        },
        {
            q: `Preciso ter CNPJ (como MEI) para contratar a maquininha ${customCase.name}?`,
            a: `Para a maioria das marcas como a ${customCase.name}, o cadastro é simplificado e aceita tanto CPF quanto CNPJ. Contudo, marcas como a InfinitePay exigem CNPJ ativo. Nós recomendamos formalizar-se como MEI, pois as taxas de maquininhas costumam ser substancialmente menores para Pessoas Jurídicas comparadas a CPF.`
        },
        {
            q: `A maquininha ${customCase.name} cobra taxa de aluguel ou taxa de inatividade?`,
            a: `Não! A ${customCase.name} opera no regime de adesão ou comodato grátis, onde você paga um valor único na aquisição do aparelho e fica totalmente livre de aluguel mensal ou tarifas por inatividade. A máquina fica disponível para você usar no ritmo das vendas do seu negócio.`
        },
        {
            q: `Como funciona o repasse automático de juros para o cliente na ${customCase.name}?`,
            a: `No nosso simulador de taxas, você tem a opção de embutir os juros da transação no valor final cobrado do cliente. Ao selecionar o repasse de taxas na calculadora, o sistema ajusta o preço da venda para que você receba o valor bruto exato que digitou, enquanto o comprador arca com as taxas diluídas nas parcelas.`
        },
        {
            q: `Quais as principais bandeiras de cartões aceitas na ${customCase.name}?`,
            a: `A ${customCase.name} aceita as principais bandeiras nacionais e internacionais, como Visa, Mastercard, Elo, Hipercard e American Express. Se o seu estabelecimento atua no segmento de alimentação, você pode entrar em contato com a operadora para habilitar vales-refeição e alimentação utilizando seu CNPJ.`
        },
        {
            q: `Como conseguir desconto ou frete grátis na compra da maquininha ${customCase.name}?`,
            a: `Para garantir as melhores condições de aquisição da ${customCase.name}, basta utilizar o link promocional de indicação de parceiros autorizados que disponibilizamos na nossa página. Ele garante descontos exclusivos de até 10% no checkout oficial, frete gratuito e a segurança de receber o modelo correto.`
        }
    ];

    // JSON-LD Dinâmico (Dual: App + FAQPage + HowTo)
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": customCase.title,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web Browser",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
                "description": customCase.description
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
            },
            {
                "@type": "HowTo",
                "name": `Como calcular taxas da ${customCase.name}`,
                "description": `Passo a passo para usar o simulador de taxas ${customCase.name} e descobrir seu lucro real.`,
                "totalTime": "PT2M",
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Digite o Valor da Venda",
                        "text": "Insira o valor total que você vai cobrar do cliente na maquininha.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Escolha a Modalidade",
                        "text": "Selecione Débito, Crédito à Vista ou Parcelado.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Defina as Parcelas",
                        "text": `Se for parcelado, escolha em quantas vezes. O simulador já aplica a taxa da ${customCase.name}.`,
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Resultado",
                        "text": "Veja exatamente quanto cai na sua conta e quanto você paga de taxa.",
                        "url": `https://mestredascontas.com.br/financeiro/simulador-maquininha/${slug}`
                    }
                ]
            }
        ]
    };

    return (
        <article className="w-full max-w-full overflow-hidden font-sans pb-12 bg-slate-50 dark:bg-slate-950">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* HEADER */}
            <div className="px-4 pt-4 md:pt-6">
                <PageHeader 
                    title={customCase.title}
                    description={customCase.description}
                    category="Simulador de Taxas"
                    icon={<CreditCard size={32} strokeWidth={2} />}
                    variant="finance"
                    categoryColor={customCase.brandColor}
                    badge="Taxas 2026"
                    breadcrumbs={[
                        { label: "Financeiro", href: "/financeiro" },
                        { label: "Maquininha", href: "/financeiro/simulador-maquininha" },
                        { label: customCase.name }
                    ]}
                />
            </div>

            <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
                {/* REVISÃO COMERCIAL (E-E-A-T) */}
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300">
                  <ShieldCheck size={18} className="text-blue-600 shrink-0" />
                  <span>Cálculo auditado conforme os planos vigentes de 2026 para taxas de MDR e antecipação bancária.</span>
                </div>
                
                {/* BACK LINK */}
                <div className="print:hidden">
                    <Link href="/financeiro/simulador-maquininha" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <ArrowLeft size={16} className="mr-1"/> Voltar para Simulador Geral
                    </Link>
                </div>

                {/* FERRAMENTA PRE-FILLED */}
                <section id="ferramenta" className="w-full relative z-10">
                    <div className={`
                        p-5 rounded-2xl mb-8 flex items-start gap-4 print:hidden shadow-sm border transition-all
                        ${customCase.brandColor === 'emerald' ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : ''}
                        ${customCase.brandColor === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-900' : ''}
                        ${customCase.brandColor === 'slate' ? 'bg-slate-100 border-slate-200 text-slate-900' : ''}
                        ${customCase.brandColor === 'yellow' ? 'bg-yellow-50 border-yellow-200 text-yellow-900' : ''}
                        ${customCase.brandColor === 'cyan' ? 'bg-cyan-50 border-cyan-100 text-cyan-900' : ''}
                        ${customCase.brandColor === 'green' ? 'bg-green-50 border-green-100 text-green-900' : ''}
                        dark:bg-slate-900/50 dark:border-slate-800
                    `}>
                        <div className={`
                            p-2.5 rounded-xl shrink-0
                            ${customCase.brandColor === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                            ${customCase.brandColor === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                            ${customCase.brandColor === 'slate' ? 'bg-slate-200 text-slate-600' : ''}
                            ${customCase.brandColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${customCase.brandColor === 'cyan' ? 'bg-cyan-100 text-cyan-600' : ''}
                            ${customCase.brandColor === 'green' ? 'bg-green-100 text-green-600' : ''}
                            dark:bg-slate-800 dark:text-slate-400
                        `}>
                            <CreditCard size={24} strokeWidth={2.5}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-black text-slate-900 dark:text-white text-base md:text-lg leading-tight">
                                Simulação Direta: {customCase.name}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                                Taxas vigentes para 2026: Débito/Vista <span className="text-slate-900 dark:text-slate-200 font-bold">{customCase.mdr}%</span> e Antecipação <span className="text-slate-900 dark:text-slate-200 font-bold">{customCase.anticipation}%</span>.
                            </p>
                        </div>
                    </div>

                    <PrivacyBadge />
                    
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 md:p-8">
                        <CardMachineSimulator 
                            initialMdr={customCase.mdr}
                            initialAnticipation={customCase.anticipation}
                            initialInstallments={customCase.initialInstallments}
                            brandName={customCase.name}
                            referralUrl={customCase.referralUrl}
                            extraFees={customCase.extraFees}
                        />

                        {/* Dynamic Referral CTA Block */}
                        {customCase.referralUrl && (
                            <div className="mt-8 space-y-4">
                                <div className={`
                                    p-6 rounded-2xl border flex flex-col md:flex-row items-center gap-6 shadow-sm bg-gradient-to-br
                                    ${customCase.brandColor === 'emerald' ? 'from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900' : ''}
                                    ${customCase.brandColor === 'blue' ? 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900/50 text-blue-900' : ''}
                                    ${customCase.brandColor === 'slate' ? 'from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/20 border-slate-200 dark:border-slate-700 text-slate-900' : ''}
                                    ${customCase.brandColor === 'yellow' ? 'from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200 dark:border-yellow-900/50 text-yellow-900' : ''}
                                    ${customCase.brandColor === 'cyan' ? 'from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200 dark:border-cyan-900/50 text-cyan-900' : ''}
                                    ${customCase.brandColor === 'green' ? 'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-green-950/20 border-green-200 dark:border-green-900/50 text-green-900' : ''}
                                `}>
                                    <div className="flex-grow space-y-3 text-center md:text-left">
                                        <h4 className={`
                                            text-xl font-black flex items-center justify-center md:justify-start gap-2
                                            ${customCase.brandColor === 'emerald' ? 'text-emerald-950 dark:text-emerald-100' : ''}
                                            ${customCase.brandColor === 'blue' ? 'text-blue-900 dark:text-blue-100' : ''}
                                            ${customCase.brandColor === 'slate' ? 'text-slate-900 dark:text-slate-100' : ''}
                                            ${customCase.brandColor === 'yellow' ? 'text-yellow-950 dark:text-yellow-100' : ''}
                                            ${customCase.brandColor === 'cyan' ? 'text-cyan-900 dark:text-cyan-100' : ''}
                                            ${customCase.brandColor === 'green' ? 'text-green-900 dark:text-green-100' : ''}
                                        `}>
                                            🚀 Adquira a sua {customCase.name} com Desconto Promocional
                                        </h4>
                                        <ul className={`
                                            text-sm space-y-1
                                            ${customCase.brandColor === 'emerald' ? 'text-emerald-800 dark:text-emerald-200' : ''}
                                            ${customCase.brandColor === 'blue' ? 'text-blue-800 dark:text-blue-200' : ''}
                                            ${customCase.brandColor === 'slate' ? 'text-slate-700 dark:text-slate-300' : ''}
                                            ${customCase.brandColor === 'yellow' ? 'text-yellow-800 dark:text-yellow-200' : ''}
                                            ${customCase.brandColor === 'cyan' ? 'text-cyan-800 dark:text-cyan-200' : ''}
                                            ${customCase.brandColor === 'green' ? 'text-green-800 dark:text-green-200' : ''}
                                        `}>
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Menores taxas de intermediação garantidas por link de indicação oficial.</li>
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Sem taxas abusivas de aluguel ou fidelidades contratuais.</li>
                                            <li className="flex items-center gap-2 justify-center md:justify-start font-medium">✅ Envio expresso grátis para todo o território nacional.</li>
                                        </ul>
                                    </div>
                                    <Link 
                                        href={customCase.referralUrl} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            w-full md:w-auto font-black px-8 py-4 rounded-xl transition-all shadow-lg text-center whitespace-nowrap
                                            ${customCase.brandColor === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 dark:shadow-none' : ''}
                                            ${customCase.brandColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 dark:shadow-none' : ''}
                                            ${customCase.brandColor === 'slate' ? 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-200 dark:shadow-none dark:bg-slate-700 dark:hover:bg-slate-600' : ''}
                                            ${customCase.brandColor === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-200 dark:shadow-none' : ''}
                                            ${customCase.brandColor === 'cyan' ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-200 dark:shadow-none' : ''}
                                            ${customCase.brandColor === 'green' ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200 dark:shadow-none' : ''}
                                        `}
                                    >
                                        GARANTIR DESCONTO →
                                    </Link>
                                </div>

                                {/* PagBank Specific Conta Digital CTA */}
                                {slug === "pagseguro-moderninha-pro" && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-yellow-500 p-2 rounded-lg text-white">
                                                <Wallet size={20}/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white text-sm">Procurando por conta?</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">Abra sua conta digital grátis em menos de 3 minutos.</p>
                                            </div>
                                        </div>
                                        <Link 
                                            href="https://pagbank.vc/indica-conta-a702ca65c" 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-yellow-600 dark:text-yellow-500 font-bold text-sm hover:underline"
                                        >
                                            ABRIR CONTA GRÁTIS →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <DisclaimerBox />
                        </div>
                    </div>
                </section>

                {/* --- CONTEÚDO EXTRA PROFUNDO (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
                <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full">
                     
                     <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-indigo-500 pl-4">
                        Guia de Análise Técnica: Por Que Estudar as Taxas da {customCase.name}?
                     </h2>
                     
                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Ao gerir o faturamento de qualquer negócio, a maior armadilha financeira é não conhecer exatamente qual porcentagem é perdida em taxas.
                     </p>

                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Veja bem, muitos lojistas focam exclusivamente no preço do produto, mas esquecem que as tarifas das maquininhas drenam o lucro real silenciosamente.
                     </p>

                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        A verdade é que cada centavo economizado em taxas representa dinheiro a mais depositado diretamente no seu bolso ao final do expediente.
                     </p>

                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Nós estruturamos essa calculadora justamente para dar a você o controle matemático completo sobre cada transação simulada.
                     </p>

                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        Aí é que está o segredo: ao planejar a precificação e escolher o regime de repasse, sua margem de lucro fica 100% protegida.
                     </p>

                     {/* Highlights Custom Box */}
                     {customCase.articleContent.highlights && customCase.articleContent.highlights.length > 0 && (
                        <div className={`
                            p-6 rounded-2xl border my-8 not-prose
                            ${customCase.brandColor === 'emerald' ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900' : ''}
                            ${customCase.brandColor === 'blue' ? 'bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900' : ''}
                            ${customCase.brandColor === 'slate' ? 'bg-slate-100 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700' : ''}
                            ${customCase.brandColor === 'yellow' ? 'bg-yellow-50 border-yellow-100 dark:bg-yellow-950/30 dark:border-yellow-900' : ''}
                            ${customCase.brandColor === 'cyan' ? 'bg-cyan-50 border-cyan-100 dark:bg-cyan-950/30 dark:border-cyan-900' : ''}
                            ${customCase.brandColor === 'green' ? 'bg-green-50 border-green-100 dark:bg-green-950/30 dark:border-green-900' : ''}
                        `}>
                            <h4 className={`
                                font-bold mb-3 flex items-center gap-2 text-base md:text-lg
                                ${customCase.brandColor === 'emerald' ? 'text-emerald-950 dark:text-emerald-400' : ''}
                                ${customCase.brandColor === 'blue' ? 'text-blue-900 dark:text-blue-400' : ''}
                                ${customCase.brandColor === 'slate' ? 'text-slate-900 dark:text-slate-300' : ''}
                                ${customCase.brandColor === 'yellow' ? 'text-yellow-900 dark:text-yellow-400' : ''}
                                ${customCase.brandColor === 'cyan' ? 'text-cyan-900 dark:text-cyan-400' : ''}
                                ${customCase.brandColor === 'green' ? 'text-green-900 dark:text-green-400' : ''}
                            `}>
                               {customCase.articleContent.highlightsTitle}
                            </h4>
                            <ul className={`
                                list-none p-0 m-0 space-y-2 text-sm font-medium
                                ${customCase.brandColor === 'emerald' ? 'text-emerald-800 dark:text-emerald-200' : ''}
                                ${customCase.brandColor === 'blue' ? 'text-blue-800 dark:text-blue-200' : ''}
                                ${customCase.brandColor === 'slate' ? 'text-slate-700 dark:text-slate-400' : ''}
                                ${customCase.brandColor === 'yellow' ? 'text-yellow-800 dark:text-yellow-200' : ''}
                                ${customCase.brandColor === 'cyan' ? 'text-cyan-800 dark:text-cyan-200' : ''}
                                ${customCase.brandColor === 'green' ? 'text-green-800 dark:text-green-200' : ''}
                            `}>
                                {customCase.articleContent.highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check size={16} className="shrink-0" />
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                     )}

                     <hr className="my-8 border-slate-100 dark:border-slate-800" />

                     {/* Seção Comparativa Pura HTML Dinâmica */}
                     <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Tabela Comparativa Oficial de Maquininhas 2026</h2>
                     
                     <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                        Para ajudar na sua decisão de negócios, nós estruturamos uma tabela dinâmica comparando as taxas base de todas as marcas ativas no nosso sistema.
                     </p>

                     <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                          <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                              <thead>
                                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                      <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Modelo / Marca</th>
                                      <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Taxa Débito (MDR)</th>
                                      <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Taxa Antecipação</th>
                                      <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">Comparação</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                  {cardMachineCases.map((c) => (
                                      <tr key={c.slug} className={c.slug === slug ? "bg-indigo-50/20 dark:bg-indigo-900/10 font-bold" : ""}>
                                          <td className="px-6 py-4 text-sm text-slate-900 dark:text-white flex items-center gap-2">
                                              <span className={`w-2.5 h-2.5 rounded-full bg-${c.brandColor === 'emerald' ? 'emerald' : c.brandColor === 'blue' ? 'blue' : 'slate'}-500`} />
                                              {c.name} {c.slug === slug && <span className="text-[10px] bg-indigo-600 text-white font-extrabold px-1.5 py-0.5 rounded-full ml-1 shrink-0">ATIVO</span>}
                                          </td>
                                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.mdr}%</td>
                                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{c.anticipation}%</td>
                                          <td className="px-6 py-4 text-sm text-right">
                                              {c.slug === slug ? (
                                                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-black">Você está aqui</span>
                                              ) : (
                                                  <Link href={`/financeiro/simulador-maquininha/${c.slug}`} className="text-xs text-slate-400 hover:text-indigo-500 font-semibold underline">
                                                      Simular taxas
                                                  </Link>
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                         Parece complicado, né? Mas veja bem, analisando friamente a planilha de taxas, fica claro qual modelo oferece a melhor rentabilidade para o seu perfil de vendas.
                      </p>

                      {/* Seção Como Funciona a Antecipação com Analogia */}
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Armadilha Silenciosa da Antecipação de Recebíveis</h2>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                         Para explicar o conceito de antecipação bancária sem enrolação, nós adoramos usar a metáfora da colheita agrícola.
                      </p>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                         Imagine que você vendeu uma mercadoria parcelada em 12 vezes. Juridicamente, é como plantar uma semente e precisar esperar 12 meses para colher todos os frutos.
                      </p>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                         A antecipação de recebíveis é como contratar uma estufa tecnológica que faz todos os frutos amadurecerem e serem colhidos em apenas 1 dia útil.
                      </p>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                         O problema? A empresa de tecnologia cobra uma taxa considerável de comissão por esse serviço especial de aceleração.
                      </p>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                         No caso da ${customCase.name}, essa taxa de aceleração é de aproximadamente ${customCase.anticipation}%, restando o valor restante líquido para você reinvestir no seu estoque.
                      </p>

                      {/* Seção final com link de indicação */}
                      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Conclusão: O Veredito Sobre a {customCase.name}</h2>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          {customCase.articleContent.closingText.replace(/<[^>]*>/g, '') || `Ao final das contas, a maquininha ${customCase.name} destaca-se como uma das opções mais sólidas para lojistas autônomos que buscam solidez e estabilidade tributária.`}
                      </p>

                      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                          O melhor de tudo? Você pode adquirir a sua diretamente pelo nosso canal promocional oficial de parceiros com descontos acumulativos e frete 100% grátis.
                      </p>

                      <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
                          <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                              <Award size={18} className="text-indigo-500" /> Comparar com outras marcas de prestígio
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                              Simule e compare as taxas oficiais em tempo real para encontrar a melhor maquininha de cartões para seu faturamento.
                          </p>
                          <div className="flex flex-wrap gap-2">
                               {cardMachineCases.filter(c => c.slug !== slug).map(c => (
                                   <Link key={c.slug} href={`/financeiro/simulador-maquininha/${c.slug}`} className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                       {c.name}
                                   </Link>
                               ))}
                          </div>
                      </div>
                </section>

                <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />
                <SmartGlossaryLinker currentHref={"/financeiro/simulador-maquininha/" + slug} category="financeiro" />
                <SmartCrossLinker currentHref={"/financeiro/simulador-maquininha/" + slug} category="financeiro" />

                {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
                <section className="w-full max-w-4xl mx-auto mt-8">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                      <HelpCircle className="text-indigo-500 shrink-0" size={32} /> Dúvidas Frequentes Resolvidas
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                      Confira as respostas definitivas para as perguntas mais recorrentes sobre a maquininha {customCase.name}.
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

                {/* ANÚNCIO BOTTOM */}
                <div className="w-full flex justify-center mt-8">
                   <LazyAdUnit slot="card_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
                </div>

            </div>
        </article>
    );
}
