import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contractCases } from "@/data/contract-cases";
import ContractGenerator from "@/components/tools/ContractGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { Suspense } from "react";
import { 
  FileText, ShieldCheck, HelpCircle, 
  BookOpen, CheckCircle2, AlertTriangle, Scale
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return contractCases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const contract = contractCases.find((c) => c.slug === slug);
  
  if (!contract) {
    return { title: "Contrato não encontrado" };
  }

  const title = `${contract.name} Grátis em PDF | Modelo 2026`;
  const description = `Gere seu ${contract.name} online e de graça. Ferramenta para criar modelo em PDF pronto para impressão e assinatura. Simples, rápido e seguro.`;

  return {
    title,
    description,
    keywords: [...contract.keywords, "gerador de contrato grátis", "contrato em pdf", "modelo de contrato editável"],
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}` },
    openGraph: {
      title,
      description,
      url: `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}`,
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${contract.name} (Grátis)`,
      description: "Gerador automático de contratos em PDF. Crie o seu em 1 minuto.",
    },
    robots: { index: true, follow: true }
  };
}

export default async function ContractCasePage({ params }: PageProps) {
  const { slug } = await params;
  const contract = contractCases.find((c) => c.slug === slug);

  if (!contract) {
    notFound();
  }

  // JSON-LD Dinâmico (Dual: App + HowTo)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": contract.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": contract.description
      },
      {
        "@type": "HowTo",
        "name": `Como preencher e gerar ${contract.name}`,
        "description": `Passo a passo simples para criar seu ${contract.name} grátis em PDF com testemunhas e cláusulas customizáveis.`,
        "totalTime": "PT2M",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Preencha os Dados das Partes",
            "text": "Insira o nome completo, CPF/CNPJ, profissão e endereço tanto do Contratante quanto do Contratado.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Descreva o Objeto e Valores",
            "text": "Descreva detalhadamente o serviço que será prestado, o valor total combinado e as condições de pagamento.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Configure Prazos e Rescisão",
            "text": "Adicione as datas de início e término do serviço, assim como multas ou condições em caso de cancelamento.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}#ferramenta`
          },
          {
            "@type": "HowToStep",
            "name": "Gere o PDF e Colha as Assinaturas",
            "text": "Baixe o PDF. Ambos assinam, juntamente com duas testemunhas maiores de idade para dar força de título extrajudicial.",
            "url": `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}#ferramenta`
          }
        ]
      }
    ]
  };

  const initialContractValues = {
    objeto: contract.defaultObject,
    condicoesExtras: contract.defaultTerms
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans bg-slate-50 dark:bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title={contract.name}
          description={contract.description}
          category="Gerador Grátis"
          icon={<Scale size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="blue"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Contratos", href: "/ferramentas/gerador-contrato" },
            { label: contract.shortName }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* AD TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200 mt-8 print:hidden min-h-[100px]">
           <LazyAdUnit slot="contract_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-5xl mx-auto relative z-10">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <ContractGenerator initialValues={initialContractValues} />
           </Suspense>
           
           <div className="mt-8 print:hidden">
              <DisclaimerBox />
           </div>
        </section>

        {/* INSTRUÇÕES E SEO */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-4">
              Como Usar o Gerador de Contratos (Passo a Passo)
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
             Proteja juridicamente o seu negócio gerando um contrato completo e formatado em PDF em poucos minutos:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">1</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Qualificação das Partes</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Insira os dados cadastrais (Nome, CPF/CNPJ, Profissão, Estado Civil e Endereço) do Contratante (Cliente) e Contratado (Prestador).</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Objeto & Valores</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Descreva detalhadamente o escopo do serviço para evitar mal-entendidos. Defina também o preço, prazo e condições de pagamento do combinado.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">3</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Cláusulas Rescisórias</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Defina o prazo de vigência do contrato e as penalidades ou multas em caso de desistência ou descumprimento de prazos.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">4</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Gere PDF e Colha Testemunhas</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Baixe o PDF. Ambas as partes devem assinar e colher a assinatura de 2 testemunhas para habilitar a execução extrajudicial direta na Justiça.</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-12 flex items-center gap-2">
            <ShieldCheck className="text-blue-600" /> Como garantir a validade deste contrato grátis?
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              Você acabou de gerar um <strong>{contract.name}</strong> em PDF de forma totalmente gratuita. Para que ele tenha validade jurídica e proteja seu negócio, siga as boas práticas legais:
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" /> 
                 <span><strong>Assinatura das partes:</strong> Ambas as partes devem assinar o documento (fisicamente com caneta azul/preta ou via assinatura digital com certificado ICP-Brasil).</span>
              </li>
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" /> 
                 <span><strong>Duas testemunhas:</strong> Para que o contrato tenha força de título executivo extrajudicial, é fundamental que duas testemunhas maiores de 18 anos também assinem. O nosso PDF já possui os campos preparados.</span>
              </li>
              <li className="flex gap-2">
                 <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" /> 
                 <span><strong>Rubrica em todas as páginas:</strong> Se o contrato tiver mais de uma página, certifique-se de que o contratante e o contratado rubriquem as folhas anteriores à da assinatura final.</span>
              </li>
            </ul>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-900 mt-8 mb-8">
              <h4 className="flex items-center gap-2 font-bold text-yellow-900 dark:text-yellow-400 mt-0">
                <AlertTriangle size={20} /> Evite o vínculo empregatício
              </h4>
              <p className="text-yellow-800 dark:text-yellow-200 text-sm mb-0">
                Se você é autônomo, cuidado com os pilares que configuram vínculo CLT: subordinação, habitualidade, onerosidade e pessoalidade. Este contrato atesta a natureza "cível" da prestação de serviço, mas a prática do dia a dia é o que dita a regra na justiça do trabalho.
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2">
               <BookOpen className="text-blue-600" /> Base Jurídica e Fontes Oficiais
            </h3>
            <p>
               Para garantir a segurança jurídica deste documento, nosso modelo de contrato gratuito foi estruturado com base nas seguintes legislações brasileiras:
            </p>
            <ul>
               <li><strong>Código Civil Brasileiro (Lei nº 10.406/2002):</strong> Especificamente no Capítulo VII (Arts. 593 a 609), que regulamenta a Prestação de Serviços, estabelecendo direitos, deveres e limites de prazo (máximo de 4 anos).</li>
               <li><strong>Código de Processo Civil (Lei nº 13.105/2015):</strong> Artigo 784, inciso III, que confere força de título executivo extrajudicial ao documento particular assinado pelo devedor e por 2 (duas) testemunhas.</li>
               <li><strong>Código de Defesa do Consumidor (Lei nº 8.078/1990):</strong> Aplicável quando o contratante é o destinatário final do serviço.</li>
            </ul>
            <p className="text-sm text-slate-500 italic mt-4">
               Fonte: Planalto.gov.br (Legislação Federal).
            </p>
          </div>
        </section>

        <SmartCrossLinker 
          currentHref={`/ferramentas/gerador-contrato/${contract.slug}`} 
          category="ferramentas"
        />

        {/* AD BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="contract_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
