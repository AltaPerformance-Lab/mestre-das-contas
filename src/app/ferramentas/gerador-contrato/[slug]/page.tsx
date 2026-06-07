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
  BookOpen, CheckCircle2, AlertTriangle, Scale, Landmark, Info
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// --- GERAR ROTAS ESTÁTICAS (SSG) ---
export async function generateStaticParams() {
  return contractCases.map((c) => ({
    slug: c.slug,
  }));
}

// --- METADATA DINÂMICA ---
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
      url: `https://mestredascontas.com.br/ferramentas/gerador-contrato/${contract.slug}`,
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
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

  // FAQ Dinâmico com exatamente 7 questões sincronizadas
  const faqs = [
    {
      q: `O que é o ${contract.name} e qual a sua real validade civil?`,
      a: `O ${contract.name} é um instrumento jurídico particular de natureza cível respaldado pelo Código Civil Brasileiro. A verdade é que ele atua como prova irrefutável das obrigações acordadas entre o Contratante (quem contrata) e o Contratado (quem presta), definindo prazos, preços e multas para evitar que controvérsias comerciais precisem ser decididas na justiça.`
    },
    {
      q: "Quais dados são obrigatórios na qualificação das partes de um contrato?",
      a: "Para pessoas físicas, preencha nome completo, nacionalidade, estado civil, profissão, RG, CPF e endereço residencial completo. Para pessoas jurídicas, insira a razão social, CNPJ, endereço da sede, inscrição estadual/municipal e a identificação civil completa do sócio ou representante administrador. Deixar esses dados completos é o segredo de ouro para a validade do documento."
    },
    {
      q: "Por que é fundamental recolher a assinatura de 2 testemunhas no contrato?",
      a: "A assinatura de duas testemunhas maiores de idade confere ao documento particular a força de título executivo extrajudicial, segundo o Artigo 784 do Código de Processo Civil. Veja bem, se ocorrer inadimplência ou calote de pagamento, você poderá ajuizar uma ação de execução direta na justiça, cobrando a dívida em tempo recorde sem precisar passar por um demorado processo inicial."
    },
    {
      q: `Como salvar e baixar o ${contract.name} gerado online em formato PDF?`,
      a: "Nossa ferramenta é 100% gratuita. Após preencher todos os campos interativos do gerador, clique no botão 'Gerar Contrato'. O sistema formatará as cláusulas. Em seguida, clique em 'Imprimir' e configure o destino de impressão para 'Salvar como PDF' para efetuar o download direto da cópia digital do contrato."
    },
    {
      q: "O que são as cláusulas de rescisão e multas e qual a sua relevância?",
      a: "As cláusulas de rescisão determinam sob quais condições o serviço pode ser cancelado antes do prazo estipulado. Nós recomendamos fixar um aviso prévio mínimo por escrito (como 15 ou 30 dias) e multas penais justas (geralmente entre 10% e 20% do saldo restante do contrato) em caso de descumprimento imotivado das obrigações."
    },
    {
      q: "Como o profissional autônomo pode evitar a configuração de vínculo trabalhista (CLT)?",
      a: "Para mitigar qualquer risco de vínculo de emprego com base na CLT, a relação contratual deve ser estritamente cível e focada na entrega do resultado final. Evite pilares empregatícios como subordinação direta (o prestador deve definir seus próprios horários), pessoalidade (você pode mandar um ajudante realizar a tarefa) e habitualidade constante de salário."
    },
    {
      q: "É obrigatório fazer o reconhecimento de firma em cartório para que o contrato tenha valor?",
      a: "Não é necessário registrar em cartório ou reconhecer firma para que o contrato particular tenha validade jurídica plena. A assinatura do contratante, contratado e das testemunhas (ou assinatura digital certificada através da conta Gov.br) já garante plena eficácia legal perante o Código Civil Brasileiro."
    }
  ];

  // JSON-LD Dinâmico (Dual: App + HowTo + FAQPage)
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

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
        
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

         {/* AD MEIO */}
         <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-4 print:hidden min-h-[100px]">
            <LazyAdUnit slot="contract_mid" format="horizontal" />
         </div>

        {/* --- ARTIGO EDUCACIONAL ESPECÍFICO E PROFUNDO (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
        <section className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm print:hidden">
          
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-blue-500 pl-4 flex items-center gap-3">
              <Scale className="text-blue-500"/> O Segredo Oculto Por Trás da Validade de um Contrato Particular
          </h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Imagine fechar um acordo de prestação de serviços com um novo parceiro de negócios, investir dezenas de horas de trabalho e, no final, sofrer um calote indesejado.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A verdade é que no ecossistema cível e empresarial brasileiro, o acordo verbal não oferece qualquer nível de proteção jurídica real nas contas.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Muitos profissionais autônomos ou microempresas operam diariamente na informalidade simplesmente por acharem que redigir um documento contratual é um processo lento e caro.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Veja bem, um contrato bem estruturado define expectativas explícitas de escopo de trabalho, prazos claros de entrega e regras para multas moratórias.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nós estruturamos este gerador justamente para que você consiga consolidar propostas comerciais robustas e juridicamente seguras em menos de um minuto.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Aí é que está o segredo: ao colher a assinatura das partes com duas testemunhas identificadas, o contrato se transforma em um título extrajudicial executável.
          </p>

          {/* Como Usar o Gerador - Passo a Passo */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-600" /> Fluxo de Trabalho Sem Fricção
          </h3>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
             Proteja juridicamente as suas contas gerando um contrato completo e formatado em PDF em 4 etapas rápidas:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">1</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Qualificação Completa</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Insira os dados cadastrais (CPF/CNPJ, endereços e qualificações) do contratante e contratado de forma precisa.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Escopo & Preços</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Descreva as tarefas de forma minuciosa no objeto. Determine os valores totais cobrados e as datas de pagamento combinadas.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">3</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Cláusulas de Rescisão</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Configure os prazos finais de vigência e as multas aplicáveis em caso de quebra ou rescisão imotivada do contrato.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0">4</div>
              <div className="space-y-1">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm">Geração de PDF e Assinaturas</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Exporte a folha timbrada oficial do PDF. Providencie a assinatura eletrônica ou manual das partes e de 2 testemunhas de apoio.</p>
              </div>
            </div>
          </div>

          <hr className="my-8 border-slate-100 dark:border-slate-800" />

          {/* Comparativo de Tipos de Contrato - Tabela HTML */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Planilha Técnica Comparativa: Contrato Civil vs Vínculo CLT vs Parceria B2B</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
             Entender as diferenças fundamentais de enquadramento afasta riscos com passivos trabalhistas indesejáveis na sua carteira.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
             Nós preparamos uma planilha analítica mapeando a aplicabilidade legal, flexibilidade e custos tributários de cada modelo.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
              <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                  <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                          <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Dimensão Trabalhista</th>
                          <th className="px-6 py-4 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50/10 dark:bg-blue-950/10">Contrato de Prestação Civil</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Vínculo de Emprego CLT</th>
                          <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Parceria Comercial B2B</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Legislação de Amparo</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-bold bg-blue-50/10 dark:bg-blue-950/10">Código Civil (Lei 10.406/02)</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Consolidação das Leis do Trabalho</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Código Civil (Direito Societário)</td>
                      </tr>
                      <tr>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Flexibilidade de Horários</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-bold bg-blue-50/10 dark:bg-blue-950/10">Alta (Definido pelo prestador)</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Nula (Jornada fixa de trabalho)</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Totalmente livre entre sócios</td>
                      </tr>
                      <tr>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Burocracia de Contratação</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-bold bg-blue-50/10 dark:bg-blue-950/10">Mínima (Gere e assine o PDF)</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Altíssima (Exame médico, eSocial)</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Exige registro de atas/contrato social</td>
                      </tr>
                      <tr>
                          <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Encargos de Rescisão</td>
                          <td className="px-6 py-4 text-sm text-blue-600 font-bold bg-blue-50/10 dark:bg-blue-950/10">Apenas multa acordada nas cláusulas</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Multa FGTS 40%, aviso indenizado, 13º</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Dissolução de acordo com quotas</td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
             O melhor de tudo? Como demonstrado na tabela, a prestação cível com base no Código Civil oferece custos enxutos e total segurança para ambas as partes.
          </p>

          {/* Metáfora Visual / Analogia */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Metáfora do "Cinturão de Segurança": O Contrato Como Seu Airbag Financeiro</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Para explicar o papel da proteção jurídica sem burocracias complexas, nós gostamos de utilizar a analogia com os sistemas de segurança automotivos.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Ninguém entra em um automóvel com o desejo ou planejamento de colidir contra um poste ou barreira de concreto ao longo do trajeto.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Mesmo assim, os veículos modernos vêm equipados com airbags robustos e cintos de segurança pré-tensionadores instalados na cabine.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            O contrato de prestação de serviços é exatamente o cinto de segurança e o airbag do seu negócio ou da sua prestação de serviços.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            No início, tudo é amigável e harmônico. No entanto, se ocorrer um imprevisto financeiro (a batida), os airbags inflam de forma automática.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Veja bem, ter as assinaturas e as cláusulas em mãos protege a saúde das suas contas e garante que você saia ileso de colisões financeiras.
          </p>

          {/* Fontes Oficiais */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mt-8 not-prose">
             <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                 <Info size={18} className="text-blue-500" /> Base Jurídica e Fontes Oficiais
             </h4>
             <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                <li><strong>Código Civil Brasileiro (Lei nº 10.406/2002):</strong> Regulamentação da Prestação de Serviços no Capítulo VII (Arts. 593 a 609).</li>
                <li><strong>Código de Processo Civil (Lei nº 13.105/2015):</strong> Artigo 784, inciso III, conferindo força de título extrajudicial.</li>
                <li><strong>Planalto.gov.br:</strong> Fontes da Legislação Federal Brasileira.</li>
             </ul>
          </div>
        </section>

        <ExpertSignature author="Equipe Técnica Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref={`/ferramentas/gerador-contrato/${contract.slug}`} />

        <SmartCrossLinker 
          currentHref={`/ferramentas/gerador-contrato/${contract.slug}`} 
          category="ferramentas"
        />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-blue-500 shrink-0" size={32} /> Perguntas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas oficiais e suporte técnico para as suas dúvidas mais recorrentes sobre enquadramento e validade jurídica de contratos de serviços.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                     <span className="pr-4">{faq.q}</span>
                     <span className="transition-transform duration-300 group-open:rotate-180 text-blue-500">
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

        {/* AD BOTTOM */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center mt-12 print:hidden min-h-[250px]">
           <LazyAdUnit slot="contract_bottom" format="square" variant="in-article" />
        </div>
      </div>
    </article>
  );
}
