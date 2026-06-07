import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PixGenerator from "@/components/tools/PixGenerator";
import { 
  Zap, ShieldCheck, Smartphone, CheckCircle2, 
  HelpCircle, AlertTriangle, ArrowRight, Receipt, Calculator, FileText, Share2, Landmark
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Pix: QR Code e Copia e Cola (Com Valor Definido)";
  const description = "Gere seu QR Code Pix e código Copia e Cola em segundos com valor definido! Facilite seus recebimentos de forma 100% segura, grátis e livre de taxas.";

  return {
    title,
    description,
    keywords: ["gerador pix", "criar qr code pix", "pix copia e cola com valor", "gerar pix cobrança", "qr code pix estatico"],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-pix" },
    openGraph: {
      title,
      url: "https://mestredascontas.com.br/ferramentas/gerador-pix",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Gerador de PIX Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Gere seu QR Code Pix com valor em segundos!",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 }
    }
  };
}

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "Esse QR Code Pix tem validade ou expira em algum momento?",
    a: "Não expira nunca. O código gerado pela nossa ferramenta é do tipo Estático. Enquanto a sua Chave Pix (CPF, CNPJ, Celular, Email ou Aleatória) estiver ativa na sua instituição financeira, esse QR Code funcionará perfeitamente. A verdade é que você pode imprimir o código, plastificá-lo e deixá-lo exposto no balcão do seu estabelecimento comercial por anos sem se preocupar com expiração."
  },
  {
    q: "O dinheiro recebido passa pela conta do Mestre das Contas antes?",
    a: "Jamais! O Mestre das Contas funciona puramente como um facilitador tecnológico. Nós pegamos as informações que você digita e as codificamos no formato regulamentado pelo Banco Central (o BR Code). O pagamento é processado diretamente do banco do seu cliente para a sua conta, de ponta a ponta e com total sigilo, sem intermediários ou tarifas retidas."
  },
  {
    q: "Posso utilizar uma chave aleatória para gerar o QR Code Pix com valor?",
    a: "Com certeza, e nós recomendamos fortemente essa prática! Expor chaves pessoais como CPF, e-mail ou número de telefone celular em balcões comerciais ou na internet abre brechas para golpes e vazamentos de dados. A chave aleatória (EVP) é a escolha perfeita para resguardar a sua privacidade e segurança fiscal."
  },
  {
    q: "Qual é a real utilidade do campo 'Identificador (TxID)' no gerador?",
    a: "O Identificador (TxID) é uma tag alfanumérica opcional que permite a você rastrear a origem daquela transferência específica. Se você inserir 'COBRANCA01', esse marcador aparecerá detalhado no seu extrato de recebimentos. É a ferramenta perfeita para gerenciar o fluxo de caixa de quem recebe múltiplas transferências de mesmo valor ao longo do dia."
  },
  {
    q: "Existe cobrança de taxas bancárias ao receber Pix pelo QR Code?",
    a: "Nossa ferramenta é 100% gratuita. Contudo, veja bem: embora as transferências Pix sejam gratuitas e isentas de tarifas por lei para Pessoas Físicas, alguns bancos cobram taxas fixas ou percentuais para receber cobranças por QR Code em contas de Pessoas Jurídicas (PJ). É fundamental verificar o contrato da sua conta jurídica com o banco."
  },
  {
    q: "O QR Code gerado nesta ferramenta serve para qualquer banco no Brasil?",
    a: "Sim! Os QR Codes e códigos Copia e Cola gerados pelo nosso sistema seguem estritamente as especificações oficiais do padrão EMV BR Code estabelecido pelo Banco Central do Brasil. Dessa forma, a cobrança é universal e pode ser lida por qualquer aplicativo de banco tradicional, banco digital ou carteira de pagamentos (como PicPay ou Mercado Pago)."
  },
  {
    q: "Como enviar o código Pix Copia e Cola de forma profissional no WhatsApp?",
    a: "Após gerar a sua cobrança Pix, basta clicar no botão 'Copiar Código Pix'. O sistema salva a linha de dados criptografada na memória do seu aparelho. Em seguida, abra a conversa com o cliente no WhatsApp e cole a mensagem. O cliente poderá simplesmente copiar o texto e colá-lo na área de pagamento instantâneo do aplicativo bancário dele, sem burocracia."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Pix Copia e Cola Mestre das Contas",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Gera QR Codes Pix estáticos com valor definido segundo o padrão oficial do Banco Central (BR Code)."
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

export default async function PixPage() {
  return (
    <div className="w-full max-w-full overflow-hidden font-sans pb-12 bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de Pix Copia e Cola"
          description="A maneira mais rápida e profissional de cobrar. Crie um QR Code com valor exato, envie pelo WhatsApp e receba na hora. Sem taxas, sem intermediários."
          category="Ferramentas Financeiras"
          icon={<Zap size={32} strokeWidth={2} />}
          variant="tools" 
          categoryColor="emerald"
          badge="Seguro 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador Pix" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px] mt-4">
           <LazyAdUnit slot="pix_top" format="horizontal" variant="software" />
        </div>

        {/* REVISÃO TECNOLÓGICA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mt-4">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Algoritmo de geração baseado no padrão oficial EMV BR Code do Banco Central, atualizado para as normas de 2026.</span>
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <PixGenerator />
           </Suspense>

           {/* PRÓXIMOS PASSOS */}
           <div className="mt-8 grid sm:grid-cols-2 gap-4 print:hidden max-w-5xl mx-auto">
              <Link href="/ferramentas/gerador-recibo" className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all group shadow-sm">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Receipt size={24} className="text-emerald-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Emitir Recibo</h4>
                  <p className="text-xs text-slate-500 mt-1">Gere um comprovante profissional para este Pix.</p>
                </div>
              </Link>
              <Link href="/ferramentas/criador-orcamentos" className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500 transition-all group shadow-sm">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Calculator size={24} className="text-emerald-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Criar Orçamento</h4>
                  <p className="text-xs text-slate-500 mt-1">Transforme este valor em um orçamento PDF.</p>
                </div>
              </Link>
           </div>
        </section>

         {/* ANÚNCIO MEIO */}
         <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px] mt-4">
            <LazyAdUnit slot="pix_mid" format="horizontal" variant="software" />
         </div>

        {/* ARTIGO PROFUNDO (SEO + RETENÇÃO) */}
        <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full mt-8">
            
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
               <Zap className="text-emerald-500"/> O Fim dos Erros de Digitação: O Segredo de Cobrar Sem Falhas
            </h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Você já passou pela situação desconfortável de ter que soletrar sua chave Pix por telefone várias vezes seguidas para um cliente?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Ou, ainda pior, ele digita um dígito incorretamente, a transferência falha, o dinheiro retorna e você acaba perdendo a venda.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A verdade é que confiar na digitação manual de chaves é um risco logístico e comercial desnecessário nos dias de hoje.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O Pix revolucionou o mercado nacional de transações, mas o fator humano na digitação continua sendo a maior causa de erros operacionais.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Nós criamos essa ferramenta justamente para que você consiga "blindar" suas transações comerciais diárias sem depender do teclado do seu cliente.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Aí é que está o segredo: ao gerar um código com o valor já estipulado, o cliente só precisa abrir o app de banco e aprovar a transação.
            </p>

            {/* Como funciona - Passo a Passo visual */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} /> Fluxo de Trabalho Sem Fricção
            </h3>
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Crie cobranças profissionais instantâneas e seguras em apenas 4 etapas rápidas com a nossa plataforma:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Insira Sua Chave</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Selecione o formato (CPF, CNPJ, Celular, E-mail ou Chave Aleatória) e digite os dígitos correspondentes.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Dados do Recebedor</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Insira o seu nome completo (ou da empresa) e a respectiva cidade de registro para que o app do cliente exiba os dados corretos.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Defina o Valor & ID</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Preencha o valor exato dos produtos ou serviços cobrados. Opcionalmente, adicione uma tag de identificação financeira.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center shrink-0">4</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">QR Code ou Copia & Cola</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Copie o código seguro Copia e Cola para enviar pelo chat ou imprima o QR Code estático oficial para exibir na sua loja física.</p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Como funciona o Pix Estático vs Dinâmico vs TED/DOC - Tabela HTML */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Comparativo Técnico: Pix Estático vs Pix Dinâmico vs TED/DOC</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Muitos profissionais possuem dúvidas sobre os limites de utilização e as diferenças conceituais de cada modalidade de transferência.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Para esclarecer de forma definitiva, nós preparamos uma tabela comparativa detalhando as características técnicas, burocracias e custos de cada método.
            </p>

            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica do Meio</th>
                            <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Pix Estático (Nossa Ferramenta)</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Pix Dinâmico (E-commerce Grande)</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Transferência TED / DOC</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Custo de Implementação</td>
                            <td className="px-6 py-4 text-sm font-bold text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">100% Gratuito e Instantâneo</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exige API paga e desenvolvedor</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Isento no app (ou até R$ 15,00 no guichê)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Definição do Valor Fixo</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Opcional (Flexível no caixa)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Obrigatório (Vinculado ao carrinho)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Digitado manualmente pelo pagador</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Tempo de Processamento</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Imediato (Menos de 2 segundos)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Imediato (Com webhook automático)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Até 1 hora (TED) ou 24 horas (DOC)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Segurança Contra Expiração</td>
                            <td className="px-6 py-4 text-sm text-emerald-600 bg-emerald-50/10 dark:bg-emerald-950/10">Não expira (Código Permanente)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Expira em minutos (Ex: 15-30 min)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Depende de aprovação em horários comerciais</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              O melhor de tudo? O Pix Estático gerado na nossa plataforma não possui data de expiração, atuando de maneira contínua e sem restrições fiscais desnecessárias.
            </p>

            {/* Metáfora Visual / Analogia */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Mensageiro Digital": Como o Banco Lê Seu QR Code</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Para quem acha que gerar um código QR Code Pix envolve segredos corporativos complexos, nós gostamos de fazer uma analogia com as cartas de correio tradicionais.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Pense na sua chave Pix, no valor cobrado e na cidade de emissão como as informações do remetente e do destinatário escritas no envelope.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Se você mandar essas informações soltas por escrito, o carteiro precisará decifrar sua caligrafia e digitar os dados manualmente no sistema.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O QR Code que nós desenhamos é simplesmente um envelope lacrado com um selo postal inteligente (BR Code).
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Quando a câmera do smartphone lê esse código visual, o banco reconhece a codificação instantaneamente e processa a entrega da carta direto ao destino correto.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Veja bem, nós não tocamos no seu dinheiro e nem no seu envelope. Nosso gerador apenas imprime o selo postal com perfeição milimétrica.
            </p>

            {/* WhatsApp Copia e Cola */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Regra de Ouro do WhatsApp: Por que o Pix Copia e Cola é Superior à Imagem</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Muitos microempreendedores cometem o erro logístico crucial de tirar print da tela do QR Code e enviar a imagem no bate-papo do WhatsApp.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Imagine o transtorno do seu cliente: ele recebe a imagem da cobrança na tela do celular, mas não pode usar a câmera do mesmo aparelho para ler a própria tela.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Ele é forçado a enviar o print para outro celular ou pedir que você digite os dados da chave na base do chat.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Aí é que está o segredo: enviando a string textual **<GlossaryTerm slug="qr-code-estatico-dinamico">Pix Copia e Cola</GlossaryTerm>**, ele simplesmente copia a mensagem inteira e a insere no app do banco dele.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              O aplicativo bancário detecta a cadeia BR Code copiada na memória do smartphone e preenche todas as informações da transferência na hora.
            </p>

            <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />
        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/gerador-pix" />
        <SmartCrossLinker currentHref="/ferramentas/gerador-pix" category="ferramentas" />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-500 shrink-0" size={32} /> Perguntas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas diretas e suporte técnico para as suas dúvidas mais comuns sobre faturamento com Pix com Valor.
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

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px] mt-8">
           <LazyAdUnit slot="pix_bottom" format="horizontal" variant="auto" />
        </div>

      </div>
    </div>
  );
}
