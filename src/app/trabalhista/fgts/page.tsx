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
  { q: "O que é a antecipação do Saque-Aniversário?", a: "É uma modalidade de crédito que permite que você utilize o saldo do seu FGTS como garantia para antecipar parcelas que seriam pagas apenas no mês do seu aniversário. O dinheiro é liberado na sua conta na hora e o banco desconta a parcela diretamente da Caixa anualmente." },
  { q: "Qual a taxa de juros do adiantamento de FGTS?", a: "A taxa é regulamentada pelo Banco Central e costuma ser uma das mais baixas do mercado financeiro (média entre 1,49% e 1,99% ao mês), sendo muito mais barata que empréstimo pessoal ou cartão de crédito convencional." },
  { q: "Quem tem direito a fazer a antecipação?", a: "Qualquer trabalhador com carteira assinada ou saldo em contas ativas/inativas do FGTS (mínimo de R$ 300,00 no total), maior de 18 anos, que tenha optado pela modalidade de 'Saque-Aniversário' no app do FGTS." },
  { q: "Compromete o limite do meu cartão de crédito?", a: "Não. A antecipação é um desconto em folha do próprio fundo de garantia. Ela não entra no seu score de crédito do Serasa e não utiliza o limite de seus cartões." },
  { q: "Posso fazer mesmo com o nome sujo/negativado?", a: "Sim, perfeitamente! Como a garantia da operação é o próprio saldo do FGTS que já está depositado na Caixa Econômica, não há análise de score ou restrição cadastral no SPC/Serasa." }
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
            Como Funciona a Antecipação do FGTS?
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg font-medium">
            Muitas vezes precisamos de dinheiro rápido para resolver uma emergência, investir em um negócio ou quitar dívidas caras de cartão de crédito. Se você trabalha ou trabalhou com carteira assinada, você possui um patrimônio "escondido" no <strong>FGTS</strong>.
          </p>
          <p>
            O adiantamento do Saque-Aniversário nada mais é do que contratar um empréstimo com taxas super baixas onde a garantia é o dinheiro do seu fundo que já está depositado na Caixa Econômica. O banco antecipa as parcelas anuais para você imediatamente e a própria Caixa transfere esse saldo de volta para o banco parceiro no mês do seu aniversário.
          </p>

          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 flex items-center gap-2">
            <Calculator className="text-emerald-600 dark:text-emerald-400" /> A Tabela do Saque-Aniversário (Alíquotas da Caixa)
          </h3>
          <p>
            O valor anual que você tem direito a sacar é determinado por faixas de saldo. Quanto menor o seu saldo, maior a porcentagem (alíquota) que você pode sacar, porém menor a parcela adicional fixa. Veja a tabela oficial abaixo:
          </p>

          {/* TABELA DE CÁLCULO VISUAL */}
          <div className="my-8">
            <div className="overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-xs md:text-sm uppercase flex items-center gap-2">
                  <Scale size={16} /> Faixas de Saldo e Parcelas Adicionais
                </h3>
              </div>
              <table className="w-full text-xs md:text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold">
                  <tr>
                    <th className="px-4 py-3">Limite de Saldo (R$)</th>
                    <th className="px-4 py-3">Alíquota (%)</th>
                    <th className="px-4 py-3">Parcela Adicional (R$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">Até R$ 500,00</td>
                    <td className="px-4 py-3 font-semibold">50,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 0,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">De 500,01 até 1.000,00</td>
                    <td className="px-4 py-3 font-semibold">40,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 50,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">De 1.000,01 até 5.000,00</td>
                    <td className="px-4 py-3 font-semibold">30,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 150,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">De 5.000,01 até 10.000,00</td>
                    <td className="px-4 py-3 font-semibold">20,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 650,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">De 10.000,01 até 15.000,00</td>
                    <td className="px-4 py-3 font-semibold">15,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 1.150,00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">De 15.000,01 até 20.000,00</td>
                    <td className="px-4 py-3 font-semibold">10,0%</td>
                    <td className="px-4 py-3 font-mono">R$ 1.900,00</td>
                  </tr>
                  <tr className="bg-emerald-500/5 hover:bg-emerald-500/10 font-bold transition-colors">
                    <td className="px-4 py-3 text-emerald-800 dark:text-emerald-400">Acima de R$ 20.000,00</td>
                    <td className="px-4 py-3 text-emerald-800 dark:text-emerald-400">5,0%</td>
                    <td className="px-4 py-3 font-mono text-emerald-800 dark:text-emerald-400">R$ 2.900,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-10 mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-500" /> Vantagens Reais de Adiantar o FGTS
          </h3>
          <ul className="space-y-3 not-prose mb-8">
            <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={18} />
              <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Sem Boleto Mensal:</strong> A cobrança é feita uma vez por ano e repassada automaticamente pela Caixa ao banco parceiro. Seu orçamento mensal fica intocado.</span>
            </li>
            <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={18} />
              <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Aceita Negativados:</strong> Como há saldo em conta como garantia líquida, não há restrições cadastrais para quem possui restrição no nome.</span>
            </li>
            <li className="flex items-start gap-3 bg-white dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={18} />
              <span className="text-slate-700 dark:text-slate-300 text-sm"><strong>Investimento ou Dívidas:</strong> As taxas de juros de 1.5% a 2% ao mês são até 10 vezes mais baratas do que o rotativo do cartão ou o cheque especial (que chegam a 15% ao mês).</span>
            </li>
          </ul>

          {/* HISTÓRIA E E-E-A-T */}
          <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 dark:from-emerald-900/10 dark:to-indigo-900/10 p-6 md:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-10 not-prose relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <History size={140} className="text-emerald-900 dark:text-emerald-100"/>
            </div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-white mb-4 flex items-center gap-2 relative z-10">
              <BookOpen size={24} className="text-emerald-600 dark:text-emerald-400"/> Histórico: Por que o FGTS rende pouco?
            </h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-200 relative z-10 text-sm md:text-base leading-relaxed">
              <p>
                O FGTS rende oficialmente **3% ao ano + TR (Taxa Referencial)**. Historicamente, essa rentabilidade fica consideravelmente abaixo da inflação (IPCA) e do rendimento da poupança ou de títulos do Tesouro Selic. 
              </p>
              <p>
                Deixar o saldo inativo parado no banco significa que seu dinheiro está perdendo poder de compra a cada ano. Por isso, especialistas apontam que antecipar esse saldo para investir em negócios com retorno maior ou quitar dívidas ativas é uma escolha financeiramente estratégica.
              </p>
            </div>
          </div>

          {/* FAQ ACCORDION */}
          <div className="mt-16 not-prose">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <HelpCircle className="text-emerald-600 dark:text-emerald-400" /> Perguntas Frequentes (FAQ)
            </h3>
            
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                <details key={idx} className="group bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900/30 transition-all">
                  <summary className="font-semibold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs mt-1">#</span>
                      <span className="leading-snug">{item.q}</span>
                    </div>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                  </summary>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3 text-sm">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

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
            
            <ExpertSignature updatedAt="Maio de 2026" author="Equipe Editorial" />
          </div>
        </div>

        <SmartCrossLinker currentHref="/trabalhista/fgts" category="trabalhista" />

        {/* ANÚNCIO DE SAÍDA E MONETIZAÇÃO */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
          <LazyAdUnit slot="fgts_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}
