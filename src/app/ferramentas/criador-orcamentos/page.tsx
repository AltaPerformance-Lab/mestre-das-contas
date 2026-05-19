import type { Metadata } from "next";
import { Suspense } from "react";
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
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- 1. SEO 2026 DINÂMICO ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Modelo de Orçamento com Logo (PDF) | Criador Grátis 2026";
  const description = "Faça orçamentos profissionais em PDF. Inclui cálculo de desconto, opções de pagamento (Pix/Boleto) e folha de orçamento com sua logotipo. Ferramenta grátis sem cadastro.";

  return {
    title,
    description,
    keywords: [
      "modelo de orçamento com logo", "folha de orçamento com logotipo", "criador de orçamento online", "gerar orçamento pdf gratis", "modelo de orçamento editavel",
      "fazer orçamento com logo", "emitir orçamento mei", "orçamento para prestação de serviços"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/criador-orcamentos" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/criador-orcamentos",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website" } };
}

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Criador de Orçamento Online Profissional",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser, Android, iOS",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta completa para criação de orçamentos em PDF com gestão de itens, descontos e logotipo.",
      "featureList": "Gerar PDF, Adicionar Logo, Calcular Descontos, Termos Personalizáveis, Impressão A4" },
    {
      "@type": "Article",
      "headline": "Como Criar um Orçamento Irresistível para seus Clientes",
      "description": "Descubra como estruturar uma proposta comercial profissional, usar gatilhos mentais de escassez e transmitir confiança com sua marca.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-05-20",
      "dateModified": new Date().toISOString()
    }
  ]
};

export default async function BudgetPage() {

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
             <BudgetCreator />
           </Suspense>
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

        <SmartCrossLinker currentHref="/ferramentas/criador-orcamentos" category="ferramentas" />

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="orcamento_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
