import type { Metadata } from "next";
import Link from "next/link";
import BudgetCreator from "@/components/tools/BudgetCreator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Calculator, FileText, Printer, CheckCircle, 
  Briefcase, Zap, HelpCircle, ShieldCheck, Star,
  TrendingUp, AlertTriangle, PenTool
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- SEO 2026 ---
export const metadata: Metadata = {
  title: "Criador de Orçamento Online Grátis | Gerar PDF com Logo e Desconto",
  description: "Faça orçamentos profissionais em PDF. Inclui cálculo de desconto, opções de pagamento (Pix/Boleto) e sua logo. Ferramenta grátis sem cadastro.",
  keywords: [
    "criador de orçamento online", "gerar orçamento pdf gratis", "modelo de orçamento editavel",
    "fazer orçamento com logo", "emitir orçamento mei", "orçamento para prestação de serviços"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/criador-orcamentos" },
  openGraph: {
    title: "Criador de Orçamento Profissional - Grátis e com Logo",
    description: "Impressione seus clientes com orçamentos detalhados em PDF. Adicione logo, descontos e termos. Sem cadastro.",
    url: "https://mestredascontas.com.br/ferramentas/criador-orcamentos",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
};

// --- DADOS ESTRUTURADOS (Software + Reviews) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Criador de Orçamento Online Profissional",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser, Android, iOS",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Ferramenta completa para criação de orçamentos em PDF com gestão de itens, descontos e logotipo.",
  "featureList": "Gerar PDF, Adicionar Logo, Calcular Descontos, Termos Personalizáveis, Impressão A4",
  "aggregateRating": { 
      "@type": "AggregateRating", 
      "ratingValue": "4.9", 
      "ratingCount": "3420", 
      "bestRating": "5", 
      "worstRating": "1" 
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ricardo Mendes" },
      "datePublished": "2026-01-15",
      "reviewBody": "Ferramenta excelente! Consigo colocar minha logo e gerar o PDF na hora para enviar no WhatsApp do cliente.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Ana Paula Design" },
      "datePublished": "2026-01-10",
      "reviewBody": "Muito prático. A opção de desconto e selecionar Pix facilitou muito meu dia a dia.",
      "reviewRating": { "@type": "Rating", "ratingValue": "5" }
    }
  ]
};

export default function BudgetPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Criador de Orçamento Profissional"
          description="A ferramenta definitiva para fechar negócios. Crie orçamentos detalhados com cálculo automático, descontos e sua marca. Gere o PDF pronto para envio."
          category="Ferramentas para Negócios"
          icon={<Calculator size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          badge="Atualizado 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Criar Orçamento" }]}
          rating={4.9}
          reviews={3420}
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
           <BudgetCreator />
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="orcamento_mid" format="auto" />
        </div>

        {/* --- ARTIGO EDUCACIONAL DENSO --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-xs mb-2">
                <TrendingUp size={16} /> Guia Definitivo 2026
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                Como criar um Orçamento Irresistível e Fechar Mais Vendas
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-xl font-medium mb-8">
                Um orçamento mal feito pode custar o seu cliente. Descubra como transformar uma simples proposta comercial em uma ferramenta de conversão poderosa usando nossa tecnologia gratuita.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border-l-4 border-blue-600 dark:border-blue-500 my-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0 mb-4">Por que usar nosso Criador de Orçamentos?</h3>
                <ul className="grid sm:grid-cols-2 gap-4 m-0 p-0 list-none">
                    <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300">
                         <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-green-700 dark:text-green-400"><CheckCircle size={16} /></div>
                         <span>Cálculo automático de totais</span>
                    </li>
                    <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300">
                         <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-green-700 dark:text-green-400"><CheckCircle size={16} /></div>
                         <span>Opção de Desconto (R$ ou %)</span>
                    </li>
                    <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300">
                         <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-green-700 dark:text-green-400"><CheckCircle size={16} /></div>
                         <span>Personalização com sua Logo</span>
                    </li>
                    <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300">
                         <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-green-700 dark:text-green-400"><CheckCircle size={16} /></div>
                         <span>Layout A4 Profissional</span>
                    </li>
                </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3">
                <Briefcase className="text-slate-800" /> Estrutura de um Orçamento Vencedor
            </h3>
            <p>
                Para transmitir credibilidade, seu documento precisa seguir uma lógica clara. Nossa ferramenta já entrega essa estrutura pronta, mas é importante você entender o "porquê" de cada campo:
            </p>
            
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-6 text-lg">1. Identificação Visual (Logo)</h4>
            <p className="text-slate-600 dark:text-slate-400">
                O cérebro processa imagens 60.000 vezes mais rápido que texto. Uma logo nítida no topo do orçamento cria uma conexão imediata e profissionalismo. 
                <span className="bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-200 px-1 rounded mx-1">Dica:</span> Use uma imagem com fundo transparente (PNG) para melhor resultado.
            </p>

            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-6 text-lg">2. Clareza nos Itens</h4>
            <p className="text-slate-600 dark:text-slate-400">
                Evite descrições genéricas como "Serviço". Detalhe o que será entregue.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4 text-sm">
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 p-4 rounded-lg flex gap-3 text-red-900 dark:text-red-300">
                    <AlertTriangle className="shrink-0" size={20} />
                    <div>
                        <strong>Ruim:</strong> "Manutenção Computador"
                    </div>
                 </div>
                 <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/50 p-4 rounded-lg flex gap-3 text-emerald-900 dark:text-emerald-300">
                    <CheckCircle className="shrink-0" size={20} />
                    <div>
                        <strong>Bom:</strong> "Troca de SSD 480GB + Instalação Windows 11 e Backup"
                    </div>
                 </div>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-6 text-lg">3. Gatilhos Mentais</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Escassez (Validade):</strong> Sempre coloque uma validade curta (ex: 7 ou 15 dias). Isso motiva o cliente a fechar logo para não perder o preço.</li>
                <li><strong>Ancoragem (Desconto):</strong> Mostrar o preço cheio e depois um desconto (mesmo que pequeno) aumenta a percepção de vantagem.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-3">
                <PenTool className="text-indigo-600 dark:text-indigo-400" /> Termos e Condições: O que escrever?
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
                O campo "Termos" é sua segurança jurídica. Use nossa área de texto livre para especificar:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 marker:font-bold marker:text-indigo-600 dark:marker:text-indigo-400">
                <li><strong>Forma de Pagamento:</strong> "50% de entrada para início do serviço e 50% na entrega."</li>
                <li><strong>Prazos:</strong> "Prazo de entrega de 10 dias úteis após confirmação do pagamento."</li>
                <li><strong>Limitações:</strong> "O serviço não inclui alterações estruturais não listadas acima."</li>
            </ol>

            {/* --- REVIEWS AREA --- */}
            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 not-prose">
                <div className="flex flex-col items-center justify-center text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Avaliações da Ferramenta</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-amber-400">
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                            <Star fill="currentColor" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">4.9</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Baseado em 3.420 utilizações este mês</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                     <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                             <div>
                                 <p className="font-bold text-slate-900 dark:text-slate-100">Ricardo Mendes</p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">Autônomo</p>
                             </div>
                             <div className="flex text-amber-400 gap-0.5">
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                             </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm italic">"Ferramenta excelente! Consigo colocar minha logo e gerar o PDF na hora para enviar no WhatsApp do cliente. Meus orçamentos ficaram muito mais profissionais."</p>
                     </div>
                     <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-start mb-4">
                             <div>
                                 <p className="font-bold text-slate-900 dark:text-slate-100">Ana Paula Design</p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">Agência Digital</p>
                             </div>
                             <div className="flex text-amber-400 gap-0.5">
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                                <Star fill="currentColor" size={14} />
                             </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm italic">"Muito prático. A opção de desconto e selecionar Pix facilitou muito meu dia a dia. Recomendo para todos os freelancers."</p>
                     </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-4 flex items-center gap-2">
                <HelpCircle className="text-slate-500 dark:text-slate-400"/> FAQ - Perguntas Frequentes
            </h3>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                    Como enviar o orçamento pelo WhatsApp?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2">
                    Após clicar em <strong>"Salvar PDF"</strong>, o arquivo será baixado no seu celular ou computador. Basta abrir o WhatsApp, anexar o documento e enviar para seu cliente.
                </div>
            </details>
            
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 cursor-pointer">
                <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                     Posso salvar para editar depois?
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 text-slate-600 dark:text-slate-400 px-2">
                    Atualmente o sistema não salva seus dados na nuvem para garantir sua privacidade. Recomendamos manter a aba aberta se for editar em breve, ou gerar um novo orçamento preenchendo os dados novamente.
                </div>
            </details>

        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
            <p className="font-bold text-slate-900 dark:text-slate-100 mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <ShieldCheck size={16} className="text-indigo-500"/> Ferramentas que você pode gostar:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/ferramentas/gerador-recibo" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador de Recibo</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Emitir recibo simples</span>
              </Link>
              <Link href="/financeiro/calculadora-mei" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-400 hover:shadow-lg transition-all group">
                  <div className="bg-green-50 dark:bg-green-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-green-600 dark:text-green-400 shadow-sm group-hover:scale-110 transition-transform"><Calculator size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Calculadora MEI</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Calcular faturamento</span>
              </Link>
              <Link href="/ferramentas/gerador-qr-code" className="flex flex-col p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-400 hover:shadow-lg transition-all group">
                  <div className="bg-purple-50 dark:bg-purple-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-purple-600 dark:text-purple-400 shadow-sm group-hover:scale-110 transition-transform"><Zap size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador QR Code</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Criar QR Code Pix e Wi-Fi</span>
              </Link>
            </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="orcamento_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
