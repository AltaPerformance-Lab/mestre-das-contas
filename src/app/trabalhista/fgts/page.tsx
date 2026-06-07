import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import FgtsCalculator from "@/components/calculators/FgtsCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  PiggyBank, HelpCircle, History, BookOpen, 
  AlertTriangle, CheckCircle2, Coins, Calculator, 
  Wallet, FileText, Scale, Users, Calendar, ShieldCheck, XCircle, Search,
  Landmark, AlertOctagon, Link as LinkIcon, ExternalLink
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DE DOMINAÇÃO (SEO 2026) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Simulador de Antecipação de FGTS 2026 | Saca na Hora via Pix";
  const description = "Simule a antecipação do seu Saque-Aniversário do FGTS em 2026. Descubra o valor liberado na hora, taxas de juros e parcelas. Pix imediato e 100% online.";

  return {
    title,
    description,
    keywords: [
      "simulador antecipacao fgts", 
      "antecipar saque aniversario 2026", 
      "calculadora saque aniversario", 
      "como adiantar fgts", 
      "tabela saque aniversario 2026",
      "antecipação fgts banco safra",
      "liberar saldo fgts retido"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/trabalhista/fgts" },
    openGraph: {
      title: "Simulador de Antecipação de FGTS 2026 | Saca na Hora",
      description: "Descubra quanto você pode receber adiantando as parcelas do seu Saque-Aniversário do FGTS em segundos. Simulação gratuita.",
      url: "https://mestredascontas.com.br/trabalhista/fgts",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Simulador de FGTS Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Quer sacar seu FGTS retido? Faça uma simulação rápida!",
      description: "Descubra o valor liberado e receba via Pix em minutos.",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

// --- FAQ LIST ---
const faqList = [
  { q: "O que exatamente é essa Antecipação do Saque-Aniversário?", a: "Pense nela como um empréstimo onde a garantia é o seu próprio dinheiro guardado no FGTS. Em vez de esperar anos para sacar parcelinhas no mês do seu aniversário, você recebe o valor todo de uma vez (antecipado). O banco que te emprestou o dinheiro vai descontar as parcelas direto do seu saldo na Caixa Econômica anualmente." },
  { q: "Se eu antecipar, perco minha multa de 40% em caso de demissão?", a: "Esse é o maior medo das pessoas, mas fique tranquilo: a resposta é não! A multa de 40% por demissão sem justa causa é um direito intocável. Você continua recebendo ela normalmente, calculada sobre o saldo total histórico que a empresa depositou." },
  { q: "A taxa de juros dessa antecipação compensa?", a: "Sem dúvida. Como o banco tem a certeza absoluta de que vai receber (afinal, o dinheiro já está travado na Caixa), o risco de calote é zero. Por isso, a taxa de juros dessa modalidade costuma ser muito mais baixa (entre 1,49% e 1,99% ao mês) do que qualquer empréstimo pessoal ou rotativo do cartão de crédito." },
  { q: "Meu nome está no SPC/Serasa (negativado). Consigo fazer?", a: "Sim, consegue perfeitamente! Como a garantia é o saldo do FGTS e não a sua renda mensal ou histórico de pagamentos, os bancos não consultam o SPC nem o Serasa para liberar o dinheiro. A aprovação é garantida desde que haja saldo." },
  { q: "Quanto tempo demora para o dinheiro cair na conta?", a: "Na imensa maioria das vezes, o dinheiro é depositado via Pix na sua conta bancária em poucos minutos, muitas vezes em menos de 10 minutos após a aprovação digital. É um processo totalmente automatizado." },
  { q: "Essa operação bloqueia ou diminui o limite do meu cartão de crédito?", a: "De forma alguma. A antecipação do FGTS é uma operação à parte que não consome a margem do seu cartão de crédito e nem aparece no SCR do Banco Central como comprometimento da sua renda mensal." },
  { q: "Se eu pedir demissão depois de antecipar o FGTS, o que acontece?", a: "Nada muda em relação à sua dívida, pois ela já está vinculada ao saldo bloqueado no FGTS. No entanto, lembre-se que, ao pedir demissão, você já não sacaria o FGTS de qualquer forma. O banco simplesmente continuará retirando a parcela anual do seu saldo retido na Caixa." }
];

// --- 2. DADOS ESTRUTURADOS (JSON-LD GRAFO CONSISTENTE) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Simulador de Antecipação de FGTS",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Simulador financeiro online para projetar saques de Saque-Aniversário e simular antecipação de FGTS com descontos de taxas." },
    {
      "@type": "TechArticle",
      "headline": "Antecipação de FGTS em 2026: Taxas, Regras e Como Funciona",
      "description": "Tudo sobre o saque-aniversário: tabelas oficiais de desconto da Caixa e como liberar saldo retido.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Trabalhista Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/opengraph-image" } },
      "datePublished": "2024-05-15",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
    {
      "@type": "HowTo",
      "name": "Como Liberar o Saldo FGTS Retido",
      "description": "Passo a passo para autorizar bancos a simular e antecipar o FGTS.",
      "image": "https://mestredascontas.com.br/opengraph-image",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Ative o Saque-Aniversário",
          "text": "Acesse o aplicativo do FGTS, selecione 'Saque-Aniversário' e altere a modalidade de saque."
        },
        {
          "@type": "HowToStep",
          "name": "Autorize Bancos Parceiros",
          "text": "No aplicativo do FGTS, clique em 'Autorizar Bancos' e adicione correspondentes como Banco Safra ou PagBank."
        },
        {
          "@type": "HowToStep",
          "name": "Faça a Simulação",
          "text": "Simule em nossa calculadora para ver o valor exato a ser liberado imediatamente via Pix."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default async function FgtsPage() {
  return (
    <article className="w-full max-w-full overflow-hidden pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- PAGE HEADER PADRONIZADO --- */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Simulador de Antecipação de FGTS"
          description="Possui saldo no FGTS retido de empregos anteriores ou atual? Descubra o valor exato que você pode antecipar via Pix usando o Saque-Aniversário em 2026."
          category="Crédito e Fundo de Garantia"
          icon={<PiggyBank size={32} strokeWidth={2} />}
          variant="finance" 
          categoryColor="emerald"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Trabalhista", href: "/trabalhista" },
            { label: "Simulador FGTS" }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* REVISÃO LEGAL E E-E-A-T */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300 mb-2 print:hidden">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Informações calculadas conforme a Lei nº 8.036/1990 e normas vigentes do FGTS e Banco Central do Brasil em 2026.</span>
        </div>

        {/* ALERTA DE SEGURANÇA */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-xl p-4 flex gap-3 items-start text-left shadow-sm max-w-3xl mx-auto w-full print:hidden">
          <ShieldCheck className="text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" size={20} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-blue-900 dark:text-blue-400 uppercase tracking-wide">Operação 100% Segura</p>
            <p className="text-sm text-blue-800/90 dark:text-blue-200/90 leading-relaxed">
              O adiantamento do FGTS é descontado direto do saldo do seu fundo uma vez ao ano pelo banco. Não gera parcelas mensais em sua conta e não suja o seu nome.
            </p>
          </div>
        </div>

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="fgts_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none p-4 md:p-8">
            <PrivacyBadge />
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <FgtsCalculator />
            </Suspense>
          </div>

          <div className="mt-8 print:hidden max-w-5xl mx-auto">
            <DisclaimerBox />
          </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden">
            <LazyAdUnit slot="fgts_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO EDUCACIONAL --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-emerald-600 pl-4">
            A Verdade Sobre o Seu FGTS Retido
          </h2>
          
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Sabe aquele sentimento de ter dinheiro no bolso, mas não poder usar? Essa é a exata sensação de milhares de trabalhadores brasileiros que possuem saldo bloqueado nas contas do <GlossaryTerm slug="fgts-fundo-de-garantia">FGTS</GlossaryTerm>. 
          </p>

          <p>
            O Governo Federal até diz que o Fundo de Garantia é para "proteger o trabalhador". Mas sejamos sinceros: ver o seu próprio dinheiro rendendo quase nada na Caixa Econômica, enquanto a inflação dispara ou os juros do cartão de crédito te sufocam, não parece muita proteção.
          </p>

          <p>
            A boa notícia? O jogo virou. Com a chegada da Antecipação do <GlossaryTerm slug="saque-aniversario-fgts">Saque-Aniversário</GlossaryTerm>, você ganhou a chave para destrancar esse cofre.
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6">
            Como Funciona a Antecipação na Prática?
          </h3>

          <p>
            Imagine a seguinte situação. Você tem R$ 5.000 presos no FGTS. Pela regra comum, você só poderia sacar pequenas parcelas uma vez por ano no mês do seu aniversário (o que levaria quase uma década para limpar a conta).
          </p>

          <p>
            É aí que entra a <strong>antecipação</strong>. Ela funciona como um atalho. Um banco parceiro empresta o valor total que você teria direito a sacar nos próximos anos e te transfere na hora, via Pix. O melhor de tudo? Você não precisa pagar boletos mensais. O banco e a Caixa Econômica se resolvem entre si: uma vez ao ano, a Caixa desconta o valor direto do seu saldo do FGTS para pagar o banco.
          </p>

          <p>
            Você pega o dinheiro, resolve sua vida e o seu orçamento mensal fica intacto. Genial, não é?
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-2 border-l-4 border-emerald-600 pl-4">
            A Tabela Oficial de Alíquotas (Regra da Caixa)
          </h2>

          <p>
            Mas atenção, você não pode simplesmente sacar 100% do valor retido em uma única tacada mágica. A Caixa criou uma tabela progressiva para determinar a fatia que pode ser movimentada anualmente.
          </p>

          <p>
            Funciona assim: quem tem saldos menores (até R$ 500) pode sacar uma fatia maior (50%). Conforme o seu saldo vai crescendo, a porcentagem diminui, mas o governo acrescenta uma "Parcela Fixa" para compensar. Veja com os próprios olhos:
          </p>

          {/* TABELA DE CÁLCULO VISUAL */}
          <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm not-prose">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm md:text-base">
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold">Limite de Saldo no FGTS (R$)</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-center">Alíquota (%)</th>
                  <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-right">Parcela Adicional (Fixa)</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base text-slate-700 dark:text-slate-300">
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">Até R$ 500,00</td>
                  <td className="p-4 text-center font-semibold">50,0%</td>
                  <td className="p-4 text-right font-mono">R$ 0,00</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">De R$ 500,01 até R$ 1.000,00</td>
                  <td className="p-4 text-center font-semibold">40,0%</td>
                  <td className="p-4 text-right font-mono">R$ 50,00</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">De R$ 1.000,01 até R$ 5.000,00</td>
                  <td className="p-4 text-center font-semibold">30,0%</td>
                  <td className="p-4 text-right font-mono">R$ 150,00</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">De R$ 5.000,01 até R$ 10.000,00</td>
                  <td className="p-4 text-center font-semibold">20,0%</td>
                  <td className="p-4 text-right font-mono">R$ 650,00</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">De R$ 10.000,01 até R$ 15.000,00</td>
                  <td className="p-4 text-center font-semibold">15,0%</td>
                  <td className="p-4 text-right font-mono">R$ 1.150,00</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20">
                  <td className="p-4">De R$ 15.000,01 até R$ 20.000,00</td>
                  <td className="p-4 text-center font-semibold">10,0%</td>
                  <td className="p-4 text-right font-mono">R$ 1.900,00</td>
                </tr>
                <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold transition-colors">
                  <td className="p-4 text-emerald-900 dark:text-emerald-400">Acima de R$ 20.000,00</td>
                  <td className="p-4 text-center text-emerald-900 dark:text-emerald-400">5,0%</td>
                  <td className="p-4 text-right font-mono text-emerald-900 dark:text-emerald-400">R$ 2.900,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4">
            Por que os Especialistas Recomendam Antecipar?
          </h3>

          <p>
            Sejamos diretos: o FGTS rende oficialmente cerca de 3% ao ano, mais a TR. Enquanto isso, um empréstimo pessoal ou a fatura atrasada do cartão cobram juros absurdos (frequentemente passando de 15% ao mês). 
          </p>

          <p>
            Matematicamente, não faz sentido deixar seu dinheiro mofando na conta inativa enquanto você paga juros abusivos na praça. Ao antecipar, você acessa uma das linhas de crédito <strong>mais baratas do Brasil</strong> (em torno de 1,60% ao mês) justamente porque o banco não tem risco de tomar calote. 
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Ideal para limpar o nome:</strong> Troque uma dívida cara por uma baratíssima.</li>
            <li><strong>Zero restrição no Serasa:</strong> Aceita negativados sem burocracia.</li>
            <li><strong>Empreender:</strong> O dinheiro serve de capital de giro inicial para quem deseja abrir um pequeno negócio.</li>
          </ul>

          <p>
            Não fique apenas na teoria. Volte ao topo desta página, coloque o seu saldo aproximado e use a nossa calculadora para descobrir na hora o dinheiro que já é seu por direito e pode estar na sua conta hoje mesmo.
          </p>

          {/* FONTES E REFERÊNCIAS */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Landmark size={16} /> Fontes Oficiais e Legislação
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Toda a regulamentação do Saque-Aniversário e FGTS foi baseada em canais oficiais e leis federais do Brasil:</p>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <a href="https://www.gov.br/pt-br/servicos/optar-pelo-saque-aniversario-do-fgts" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                Gov.br - Regras de Opção do FGTS <ExternalLink size={10}/>
              </a>
              <a href="https://www.caixa.gov.br/beneficios-trabalhador/fgts/saque-aniversario/Paginas/default.aspx" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                Caixa Econômica - Saque Aniversário <ExternalLink size={10}/>
              </a>
              <a href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13932.htm" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded border dark:border-slate-700 shadow-sm">
                Lei nº 13.932/19 (Saque-Aniversário) <ExternalLink size={10}/>
              </a>
            </div>
            
            <ExpertSignature updatedAt="Maio de 2026" author="Rodrigo Costa (Analista de Sistemas)" />
          </div>
        </div>

        <SmartGlossaryLinker currentHref="/trabalhista/fgts" category="trabalhista" />
        <SmartCrossLinker currentHref="/trabalhista/fgts" category="trabalhista" />

        {/* FAQ ACCORDION */}
        <div className="max-w-4xl mx-auto w-full print:hidden">
          <div className="mt-8 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-150 dark:border-slate-800 pb-4">
              <HelpCircle className="text-emerald-600 dark:text-emerald-400" /> Perguntas Frequentes (FAQ)
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                <details key={idx} className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs mt-1">#</span>
                      <span className="leading-snug text-slate-850 dark:text-slate-200">{item.q}</span>
                    </div>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-650 dark:text-slate-350 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3 text-sm">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ANÚNCIO DE SAÍDA E MONETIZAÇÃO */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
          <LazyAdUnit slot="fgts_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
