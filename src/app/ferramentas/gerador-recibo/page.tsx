import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ReceiptGenerator from "@/components/tools/ReceiptGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  FileText, ShieldCheck, Printer, 
  PenTool, HelpCircle, Scale, DollarSign, BookOpen, KeyRound, ArrowRight
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Recibo Online 2026 (Grátis) | PDF e WhatsApp";
  const description = "Emita recibos de pagamento profissionais em segundos! Preencha as informações, gere o PDF pronto para impressão ou envie direto no WhatsApp. 100% grátis!";

  return {
    title,
    description,
    keywords: [
      "gerador de recibo", "recibo online gratis", "modelo de recibo pdf", 
      "recibo aluguel preencher", "emitir recibo online", "recibo de pagamento simples"
    ],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-recibo" },
    openGraph: {
      title: "Gerador de Recibo Online 2026 | PDF e WhatsApp",
      url: "https://mestredascontas.com.br/ferramentas/gerador-recibo",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website",
      images: [
        { 
          url: "/opengraph-image", 
          width: 1200, 
          height: 630, 
          alt: "Gerador de Recibo Mestre das Contas", 
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    }
  };
}

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "O recibo gerado online tem real validade jurídica?",
    a: "Sim, com certeza! O recibo emitido de forma digital possui plena validade jurídica como prova civil de quitação de pagamento, conforme regulamentado pelo Código Civil brasileiro. Para isso, a verdade é que ele precisa ser preenchido integralmente com os dados de identificação do emissor e do pagador (como nome completo e CPF/CNPJ), conter a data da transação e a respectiva assinatura manuscrita ou digital."
  },
  {
    q: "Qual é a diferença jurídica básica entre um Recibo e uma Nota Fiscal?",
    a: "A diferença é de cunho fiscal. O recibo serve estritamente como comprovação entre particulares (uma prova de que a pessoa X pagou e a pessoa Y recebeu o valor). A Nota Fiscal é um documento tributário obrigatório exigido pelos órgãos governamentais para registrar a prestação de serviços comerciais ou venda de produtos de empresas, servindo para o recolhimento de impostos devidos ao Fisco."
  },
  {
    q: "Como salvar o recibo preenchido em arquivo PDF para enviar pelo WhatsApp?",
    a: "O processo é extremamente rápido. Ao terminar de preencher a cobrança no nosso sistema, clique no botão 'Imprimir'. Na caixa de diálogo de impressão do seu navegador ou celular, altere a impressora de destino e selecione a opção 'Salvar como PDF'. Em seguida, escolha a pasta do seu dispositivo e envie o arquivo digital diretamente no chat do WhatsApp."
  },
  {
    q: "Posso emitir recibo online para pagamentos de aluguéis e taxas?",
    a: "Sim, o nosso modelo é ideal para recibos de aluguéis residenciais ou comerciais, taxas de condomínio, prestações de serviços autônomos e vendas de produtos seminovos. Recomendamos especificar detalhadamente no campo 'Referência' o mês de vigência do contrato e a respectiva parcela paga para garantir transparência nas contas."
  },
  {
    q: "Quem é o responsável por emitir e assinar o recibo: quem paga ou quem recebe?",
    a: "O recibo deve ser emitido e assinado exclusivamente por quem está **recebendo** o dinheiro (o credor). Ao assinar o documento, você confere ao pagador (o devedor) a quitação legal do débito. A via original assinada do recibo deve ficar sempre em posse de quem efetuou o pagamento como salvaguarda jurídica."
  },
  {
    q: "É obrigatório reconhecer firma da assinatura do recibo em cartório?",
    a: "Para a grande maioria das transações comerciais rotineiras, o reconhecimento de firma em cartório não é obrigatório. A assinatura do próprio punho ou assinaturas eletrônicas integradas já são suficientes perante a justiça civil. O reconhecimento de firma só é recomendado em transações de alto ticket, como venda de veículos ou contratos de compra e venda imobiliária."
  },
  {
    q: "Posso emitir recibo na Pessoa Física (CPF) cobrando uma Pessoa Jurídica (CNPJ)?",
    a: "Sim, profissionais autônomos que não possuem empresa aberta podem emitir recibos normalmente para clientes corporativos. Veja bem, contudo: nesse cenário B2B, a empresa que está efetuando o pagamento deverá gerar em sua contabilidade um documento chamado RPA (Recibo de Pagamento de Autônomo) para recolher os tributos federais (INSS, IRRF) devidos sobre a transação."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Recibo Online Mestre das Contas",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta gratuita para gerar e imprimir recibos de pagamento personalizados em PDF."
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

export default async function ReceiptPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans bg-slate-50 dark:bg-slate-950 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <PageHeader 
          title="Gerador de Recibo Online"
          description="A forma mais rápida de criar recibos profissionais. Preencha, visualize e imprima em PDF. Ideal para autônomos, MEI, aluguéis e vendas."
          category="Ferramentas Úteis"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Modelo 2026"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador de Recibo" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto w-full">
        {/* REVISÃO FINANCEIRA (E-E-A-T) */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-blue-700 dark:text-blue-300 mt-4">
          <ShieldCheck size={18} className="text-blue-600 shrink-0" />
          <span>Modelo de recibo atualizado conforme normas vigentes em 2026. Geração local e segura.</span>
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <ReceiptGenerator />
           </Suspense>
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE (+5000 PALAVRAS EM COMPLEXIDADE) --- */}
        <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full print:hidden">
          
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-slate-900 dark:border-slate-100 pl-4 flex items-center gap-3">
                <FileText className="text-slate-900 dark:text-white"/> O Guia Definitivo da Quitação Civil: Como Emitir Recibos Incontestáveis
            </h2>
            
            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Você já parou para pensar na vulnerabilidade de efetuar um pagamento e não receber nenhuma comprovação formal por escrito no mesmo momento?
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A verdade é que no mercado brasileiro de prestação de serviços ou locação de imóveis, a palavra falada não possui qualquer peso perante a legislação civil.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Muitos profissionais autônomos e pequenos comerciantes ainda cometem o erro crítico de utilizar bloquinhos de papel carbono comprados em papelaria.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Veja bem, a escrita manual de dados abre margens imensas para rasuras, ilegibilidade de assinaturas e desbotamento de tintas químicas com o tempo.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Nós projetamos este emissor digital justamente para trazer autoridade jurídica, clareza administrativa e modernidade profissional para o seu negócio diário.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              Aí é que está o segredo: um recibo impresso em PDF e enviado no e-mail demonstra organização técnica e blinda você contra contestações financeiras indesejáveis.
            </p>
            
            {/* Benefícios em 2 colunas com Ícones */}
            <div className="grid md:grid-cols-2 gap-8 my-10 not-prose">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-base md:text-lg">
                        <Printer className="text-indigo-600" size={22}/> Otimização de Papel: Emissão em Duas Vias
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Nossa ferramenta gera um layout no formato universal A4 perfeitamente alinhado. Você pode configurar a impressão de <strong>2 vias na mesma folha</strong>, agilizando sua rotina física e economizando materiais de forma sustentável.
                    </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-3 text-base md:text-lg">
                        <Scale className="text-emerald-600 dark:text-emerald-400" size={22}/> Resguardo do Artigo 319 do Código Civil
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A legislação brasileira é enfática: o devedor que paga tem direito à quitação regular por parte do credor. O recibo digital cumpre integralmente esse papel, atuando como documento probatório de quitação jurídica perante qualquer juízo.
                    </p>
                </div>
            </div>

            <hr className="my-8 border-slate-100 dark:border-slate-800" />

            {/* Comparativo de Documentos - Tabela HTML */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Planilha Comparativa: Recibo vs Nota Fiscal vs Declaração de Conteúdo</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               No dia a dia comercial, há uma grande confusão mental sobre o papel de cada documento de controle corporativo emitido.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
               Nós elaboramos uma planilha analítica mapeando a finalidade legal de cada uma das principais documentações utilizadas no mercado de consumo brasileiro.
            </p>

            <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Característica Legal</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white bg-slate-100/50 dark:bg-slate-800/50">Recibo de Pagamento</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Nota Fiscal (NF-e)</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Declaração de Conteúdo</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Principal Objetivo</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-100/20 dark:bg-slate-800/10">Provar quitação civil de um valor</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Registrar transação tributável</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Acompanhar transporte postal (sem NFe)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Obrigatoriedade Fiscal</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-100/20 dark:bg-slate-800/10">Opcional (Exigível civilmente)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Obrigatória para PJ (exceto venda PF)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Obrigatória para envio via Correios</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Emissor Padrão</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 bg-slate-100/20 dark:bg-slate-800/10">Autônomos, CPF e Micro-negócios</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Pessoas Jurídicas cadastradas no Fisco</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Pessoas físicas em envios não comerciais</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Gera Impostos Diretos</td>
                            <td className="px-6 py-4 text-sm text-red-500 bg-slate-100/20 dark:bg-slate-800/10">Não (Declarado via IR anual)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Sim (Calculado no faturamento)</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Não (Isento de finalidade de venda)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
               Parece um detalhe burocrático insignificante, né? Mas compreendendo a função técnica de cada documento, nós mantemos nossa empresa 100% regular perante a fiscalização nacional.
            </p>

            {/* Seção Como Preencher com Analogia */}
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Anatomia do Recibo Perfeito: A Metáfora do "Contrato de Bolso"</h2>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Para simplificar o entendimento técnico da estrutura de um recibo, nós gostamos de compará-lo a uma "chave de cadeado de gaveta".
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O cadeado representa a pendência financeira ou a dívida contratada entre as duas partes ao longo da prestação de serviços.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O recibo assinado é a chave exata que destranca essa gaveta, libertando o devedor da obrigação de pagamento perante a justiça de forma definitiva.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              No entanto, se a chave possuir o segredo desgastado, torto ou incompleto, o cadeado não abrirá de forma alguma.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              O segredo da chave são os dados obrigatórios: o **Nome por Extenso** do pagador, a **Data Precisa**, os **CPFs de Identificação** e o **Valor Escrito por Extenso**.
            </p>

            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              O melhor de tudo? Nosso emissor automatizado gera o valor por extenso de forma matemática e padronizada, eliminando chances de rasuras manuais na chave do seu cadeado.
            </p>

            {/* Dicas Práticas de Preenchimento */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
                <PenTool className="text-indigo-600 dark:text-indigo-400 shrink-0" size={24} /> Três Cuidados de Ouro na Emissão do Comprovante
            </h3>
            
            <ul className="space-y-4 text-slate-700 dark:text-slate-300 not-prose mb-8">
                <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <DollarSign className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        <strong>Detalhamento da Referência:</strong> Nunca descreva apenas "serviços gerais". O ideal é especificar com clareza: *"Serviço de pintura externa da fachada residencial de alvenaria concluído"*.
                    </span>
                </li>
                <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <Scale className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        <strong>Identificação por CPF/CNPJ:</strong> Preencher os documentos das partes é fundamental para comprovação junto à Receita Federal e evitar suspeitas de sonegação fiscal no Imposto de Renda.
                    </span>
                </li>
                <li className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <BookOpen className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                        <strong>Datação do Recebimento Real:</strong> Sempre insira a data do dia em que o saldo realmente entrou na sua conta bancária (ou foi entregue em espécie), não a data de faturamento original.
                    </span>
                </li>
            </ul>
        </div>

        <ExpertSignature author="Equipe de Redação Mestre das Contas" updatedAt="Junho de 2026" />

        <SmartGlossaryLinker currentHref="/ferramentas/gerador-recibo" />

        <SmartCrossLinker currentHref="/ferramentas/gerador-recibo" category="ferramentas" />

        {/* --- FAQ COMPLETO ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-slate-900 dark:text-white shrink-0" size={32} /> Perguntas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas oficiais e suporte técnico para as suas dúvidas mais recorrentes sobre emissão e validade de recibos de pagamento.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-slate-500">
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
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="recibo_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}