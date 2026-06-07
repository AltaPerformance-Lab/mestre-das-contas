import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import OrderCreator from "@/components/tools/OrderCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { orderCases } from "@/data/order-pseo-list";
import { 
  ShoppingBag, Star, TrendingUp, HelpCircle, Briefcase, 
  Truck, Calculator, PenTool, CheckCircle2
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. SEO 2026 DINÂMICO ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Criador de Pedidos de Venda Grátis | Bloco de Pedido PDF";
  const description = "Crie pedidos de venda e ordens de serviço profissionais em PDF. Adicione sua logo, frete e faça cálculos automatizados 100% grátis e sem cadastro.";

  return {
    title,
    description,
    keywords: [
      "talão de pedido grátis", "bloco de pedido pdf", "gerador de talão de venda",
      "gerar pedido venda online", "o que é um talão de venda", "fazer pedido com logo", "criador de pedidos de venda"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/criador-pedidos" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/criador-pedidos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website" 
    } 
  };
}

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "Qual a diferença jurídica entre um pedido de venda e um orçamento?",
    a: "A diferença reside na intenção de compra. O Orçamento é apenas uma estimativa de preços sem compromisso comercial ou financeiro. O Pedido de Venda, por outro lado, formaliza que o negócio foi fechado. Quando assinado ou confirmado via e-mail/WhatsApp, o pedido funciona como um contrato de prestação de serviços ou compra e venda, obrigando ambas as partes a cumprir o combinado."
  },
  {
    q: "Como posso gerar meu bloco de pedidos em PDF de graça?",
    a: "Com a nossa ferramenta, o processo é imediato e 100% gratuito. Basta preencher os dados da sua empresa (emissor) e do seu cliente, adicionar os itens com suas respectivas quantidades e valores, e configurar as observações de frete. Ao final, clique no botão 'Imprimir Pedido' e selecione a opção 'Salvar como PDF' para fazer o download do documento em formato A4 profissional."
  },
  {
    q: "Posso incluir a logo da minha empresa no cabeçalho do pedido?",
    a: "Com certeza! Nosso emissor possui uma área de upload no topo. Basta carregar o arquivo da sua logomarca (em formato PNG ou JPG) para que ela apareça centralizada no cabeçalho do documento PDF final. Isso agrega um valor estético impressionante e passa muito mais profissionalismo para o seu cliente."
  },
  {
    q: "O pedido de venda substitui a emissão da Nota Fiscal (NF-e)?",
    a: "Não. O talão de pedido de venda é um documento de controle interno e comprovação contratual entre as partes. Ele não substitui a Nota Fiscal exigida pela Receita Federal para fins tributários. Contudo, ele serve como o rascunho de dados ideal e seguro para o posterior preenchimento e faturamento da sua nota fiscal oficial."
  },
  {
    q: "Como preencher os dados de frete e prazos de entrega de forma segura?",
    a: "A regra de ouro é detalhar todas as especificações no campo de observações do frete. Especifique quem pagará pelo frete (FOB ou CIF), o nome da transportadora e a data estimada de entrega ou o prazo em dias úteis após a confirmação do pagamento. Isso evita atritos logísticos e cobranças indevidas de ambas as partes."
  },
  {
    q: "Posso usar este emissor de pedidos pelo celular ou tablet?",
    a: "Sim! Nossa ferramenta foi desenvolvida com design 100% responsivo e tecnologia mobile-first. Você pode emitir, preencher e salvar seus pedidos em formato PDF diretamente da tela do seu smartphone ou tablet, permitindo realizar faturamentos de vendas na frente do cliente ou enquanto faz entregas na rua."
  },
  {
    q: "Como me proteger de desistências de pedidos personalizados?",
    a: "A melhor estratégia legal é exigir um pagamento de sinal mínimo (normalmente 50%) antes de começar a produzir ou comprar materiais para itens personalizados. Deixe claro nos termos do pedido que produtos sob medida não são passíveis de devolução por mero arrependimento, uma vez que não podem ser revendidos a terceiros. Isso protege o caixa do seu negócio."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Criador de Pedidos de Venda Online Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Crie e imprima talões e blocos de pedido de venda de forma profissional, adicionando sua logo e fazendo cálculos de frete de maneira 100% gratuita."
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

export default async function OrderPage() {

  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Criador de Pedidos de Venda"
          description="Aposente o bloco de papel. Crie pedidos digitais completos com cálculo de frete, previsão de entrega e sua marca. Profissionalize suas vendas."
          category="Ferramentas para Vendas"
          icon={<ShoppingBag size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="emerald"
          badge="Novo 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Criar Pedido" }]}
          />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="orcamento_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <OrderCreator />
           </Suspense>
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="orcamento_mid" format="auto" />
        </div>

        {/* --- MODELOS DE PEDIDOS --- */}
        <div className="print:hidden not-prose mb-12">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-slate-500 dark:text-slate-400"/> Modelos Prontos por Ramo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {orderCases.map((c) => (
                    <Link 
                        key={c.slug} 
                        href={`/ferramentas/criador-pedidos/${c.slug}`}
                        className="flex flex-col p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Template</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base group-hover:text-emerald-700 dark:group-hover:text-emerald-400 leading-tight">
                            {c.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE (PADRÃO OURO) --- */}
        <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full print:hidden mt-8">
            
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
               <PenTool className="text-emerald-500"/> O Segredo do Fechamento Perfeito: Como o Bloco de Pedidos Protege Seu Caixa
            </h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Você já passou pelo desespero de produzir uma encomenda personalizada inteirinha e, na hora da entrega, o cliente simplesmente sumir?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Ou então ele alegar que o tamanho, a cor ou a especificação do item não era exatamente o que ele tinha em mente no bate-papo informal?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A verdade é que fechar vendas de boca ou depender apenas de históricos de conversas no chat é um convite aberto a mal-entendidos e prejuízos.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O mercado atual exige velocidade, mas abrir mão do profissionalismo na formalização de vendas mata a saúde financeira de qualquer negócio.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Nós projetamos essa ferramenta para funcionar como o escudo protetor da sua produção e o cartão de visitas que eleva sua marca comercial.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Aí é que está o segredo: ao formalizar o pedido com um documento claro em PDF, você estabelece um acordo inabalável e ganha respeito.
            </p>

            {/* Como usar - Passo a passo visual */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} /> Fluxo de Trabalho Sem Fricção
            </h3>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Profissionalize seu faturamento e fature mais em apenas 4 etapas rápidas com o nosso emissor digital:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira Sua Logo & Emissor</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Carregue o logotipo do seu negócio e preencha as informações completas de contato e endereço comercial.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Preencha o Comprador</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Anote nome, CPF/CNPJ e contatos do cliente para assegurar a validade do documento em transações comerciais.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Liste Produtos & Frete</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Adicione as descrições dos produtos, quantidades, valores e o custo de envio. O sistema soma tudo automaticamente.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">4</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Gere o PDF A4 Grátis</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Clique em 'Imprimir Pedido' e salve como PDF. Envie ao cliente para assinatura e valide o sinal financeiro.</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Comparativo de Documentos - Tabela HTML */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Diferenças Técnicas: Pedido de Venda vs Orçamento vs Nota Fiscal</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Muitos empreendedores informais ou atuando como <GlossaryTerm slug="mei-microempreendedor-individual">MEI</GlossaryTerm> confundem a função exata de cada papel no faturamento diário.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Para sanar essas dúvidas operacionais, nós elaboramos uma tabela comparativa direta detalhando a finalidade e o nível de compromisso de cada um.
            </p>

            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Legal</th>
                            <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Pedido de Venda (Nossa Ferramenta)</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Orçamento Comercial</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Nota Fiscal (NF-e / NFS-e)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Status da Transação</td>
                            <td className="px-6 py-4 text-sm font-bold text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Confirmada (Compra Fechada)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Provisória (Apenas Estimativa)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Finalizada (Despachada/Faturada)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Vínculo Contratual</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Atua como <GlossaryTerm slug="contrato-de-prestacao-de-servicos">contrato</GlossaryTerm> após aprovação</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sem obrigação mútua de compra</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Comprovação fiscal e tributária obrigatória</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Exigência de Sistema</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Dispensado (Geração rápida online)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dispensado (Geração rápida online)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Requer cadastro no governo e certificado digital</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Impacto Logístico</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Inicia separação de estoque/produção</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Não reserva produtos no estoque</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Garante o transporte legal da mercadoria</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              O melhor de tudo? Usar o pedido de venda como rascunho simplificado agiliza a posterior emissão da nota fiscal, mantendo sua contabilidade limpa e sem refações.
            </p>

            {/* Metáfora Visual / Analogia */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Recibo de Bagagem": Por que a Cópia Física Evita Atritos</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Para quem acha que formalizar pedidos é excesso de burocracia para quem vende pouco, nós propomos uma analogia simples com os despachos de bagagem em aeroportos.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Se você entrega sua mala valiosa na mão de um funcionário sem receber um ticket impresso com o código de rastreamento...
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Como você comprovará que aquela mala específica de cor preta pertencia a você caso ocorra um extravio no meio da viagem?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O talão de pedido de venda timbrado funciona exatamente como esse ticket de rastreamento de bagagem.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Ele prova em papel que as especificações do bolo, do kit de artesanato ou da peça de vestuário foram combinadas e aprovadas de forma explícita antes da produção.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Veja bem, nós não queremos que você perca noites de sono se preocupando com desentendimentos. Nosso gerador imprime o seu ticket de segurança em segundos.
            </p>

            <ExpertSignature author="Equipe Editorial Mestre das Contas" updatedAt="Junho de 2026" />
        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/criador-pedidos" />
        <SmartCrossLinker currentHref="/ferramentas/criador-pedidos" category="ferramentas" />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-500 shrink-0" size={32} /> Perguntas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as suas principais dúvidas sobre faturamento e emissão de talões de pedido online.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-emerald-500">
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
