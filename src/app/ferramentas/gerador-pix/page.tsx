import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PixGenerator from "@/components/tools/PixGenerator";
import { 
  Zap, ShieldCheck, Smartphone, CheckCircle2, 
  HelpCircle, AlertTriangle, ArrowRight, Receipt, Calculator
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";

// --- 1. METADATA DINÂMICA (SEO MAXIMIZADO) ---
export async function generateMetadata(): Promise<Metadata> {
  const title = "Gerador de Pix: QR Code e Copia e Cola (Com Valor Definido)";
  const description = "Crie cobranças Pix profissionais em segundos. Defina o valor exato, gere o QR Code oficial e o código Copia e Cola. Grátis e Seguro (Sem Taxas).";

  return {
    title,
    description,
    keywords: ["gerador pix", "criar qr code pix", "pix copia e cola com valor", "gerar pix cobrança", "qr code pix estatico"],
    alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-pix" },
    openGraph: {
      title,
      description,
      url: "https://mestredascontas.com.br/ferramentas/gerador-pix",
      siteName: "Mestre das Contas",
      locale: "pt_BR",
      type: "website" },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } } };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Pix Copia e Cola",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Gera QR Codes Pix estáticos com valor definido segundo o padrão do Banco Central (BR Code)." },
    {
      "@type": "TechArticle",
      "headline": "Como funciona o Pix Copia e Cola com Valor?",
      "description": "Entenda a tecnologia BR Code, a segurança do QR Code estático e como evitar golpes.",
      "proficiencyLevel": "Beginner",
      "author": { "@type": "Organization", "name": "Equipe Mestre das Contas", "url": "https://mestredascontas.com.br/sobre" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon" } },
      "datePublished": "2024-07-20",
      "dateModified": new Date().toISOString(),
      "speakable": {
           "@type": "SpeakableSpecification",
           "xpath": ["/html/head/title", "/html/head/meta[@name='description']/@content"]
      }
    },
    {
      "@type": "HowTo",
      "name": "Como Gerar um QR Code Pix com Valor Definido",
      "step": [
        { "@type": "HowToStep", "text": "Insira sua Chave Pix (CPF, CNPJ, Celular, Email ou Aleatória) no campo principal." },
        { "@type": "HowToStep", "text": "Digite o nome do Beneficiário (seu nome ou da empresa) e a Cidade. Isso garante segurança para quem paga." },
        { "@type": "HowToStep", "text": "Defina o Valor exato da cobrança (opcional, mas recomendado)." },
        { "@type": "HowToStep", "text": "O QR Code é gerado automaticamente. Clique em 'Baixar QR Code' ou copie o código 'Pix Copia e Cola' para enviar no WhatsApp." }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Esse QR Code tem validade? Expira em quanto tempo?", "acceptedAnswer": { "@type": "Answer", "text": "Não expira nunca. O código gerado aqui é do tipo Estático. Enquanto a sua Chave Pix (CPF, Email, etc.) existir no seu banco, esse QR Code funcionará. Você pode imprimir, plastificar e usar por anos." } },
        { "@type": "Question", "name": "O dinheiro passa pela conta do site?", "acceptedAnswer": { "@type": "Answer", "text": "Jamais. Nossa ferramenta é um 'tradutor'. Nós apenas pegamos seus dados e os transformamos na linguagem visual que os bancos entendem (o padrão EMV BR Code). A transferência ocorre 100% entre o banco do seu cliente e o seu banco, sem intermediários." } },
        { "@type": "Question", "name": "Posso usar a chave Aleatória no gerador?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, e recomendamos fortemente por questões de privacidade. Ao usar o CPF ou Celular, você expõe dados pessoais. A chave aleatória (EVP) é mais segura para expor em balcões ou na internet. Basta copiar a chave aleatória do app do seu banco e colar aqui." } },
        { "@type": "Question", "name": "O que é o campo 'Identificador (TxID)'?", "acceptedAnswer": { "@type": "Answer", "text": "É um código opcional para você organizar suas finanças. Se você colocar 'CLIENTE01', isso aparecerá no seu extrato bancário. Ajuda muito a saber quem pagou o quê, especialmente se você recebe muitos Pix de mesmo valor no dia. Atenção: Alguns bancos não aceitam identificadores customizados em chaves de pessoa física (CPF)." } },
        { "@type": "Question", "name": "Tem taxa para usar?", "acceptedAnswer": { "@type": "Answer", "text": "Nossa ferramenta é 100% gratuita. Porém, fique atento às regras do seu banco: Alguns bancos (como Itaú ou Bradesco) podem cobrar taxas para receber Pix em contas PJ (Pessoa Jurídica). Para Pessoa Física, geralmente é gratuito." } },
        { "@type": "Question", "name": "Serve para qualquer banco? Nubank, Inter, Itaú?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, qualquer instituição que opere no Brasil pelo Sistema de Pagamentos Instantâneos (SPI). O padrão QR Code é universal e regulado pelo Banco Central. Funciona até para carteiras digitais como PicPay, RecargaPay e Mercado Pago." } }
      ]
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
        {/* REVISÃO TECNOLÓGICA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Algoritmo de geração baseado no padrão oficial EMV BR Code do Banco Central, atualizado para as normas de 2026.</span>
        </div>
        
        {/* PUBLICIDADE TOPO */}
        <div className="w-full flex justify-center">
           <LazyAdUnit slot="pix_top" format="horizontal" variant="agency" className="min-h-[100px] w-full" />
        </div>

        {/* FERRAMENTA */}
        <section id="ferramenta" className="w-full relative z-10">
           <PrivacyBadge />
           <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
             <PixGenerator />
           </Suspense>

           {/* PRÓXIMOS PASSOS (Baseado em Analytics - ChatGPT Users) */}
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
        
        {/* PUBLICIDADE MEIO */}
        <div className="w-full flex justify-center my-4">
           <LazyAdUnit slot="pix_mid" format="auto" className="min-h-[100px] w-full max-w-4xl" />
        </div>

        {/* ARTIGO PROFUNDO (SEO + RETENÇÃO) */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden mt-8">
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
               <Zap className="text-emerald-500"/> O Fim dos Erros de Digitação
            </h2>

            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
                Você já passou pela situação constrangedora de ter que soletrar sua chave Pix três vezes para o cliente? Ou pior: ele digita errado, o dinheiro volta, e você perde a venda (ou a paciência).
            </p>
            <p className="text-slate-600 dark:text-slate-400">
                A verdade é que confiar na digitação manual é um risco que você não pode correr em 2026.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
                O Pix revolucionou o Brasil, mas a "interface humana" ainda falha. É por isso que criamos este Gerador. Ele não é apenas um criador de códigos; é a sua garantia de que <strong>o dinheiro vai cair na conta certa, com o valor certo</strong>.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">Como funciona a mágica do "Pix Com Valor"?</h3>
            <p>
                Veja bem, o sistema do Banco Central (BCB) permite dois tipos de QR Code:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-emerald-600">
                <li><strong>O Simples (Chave Apenas):</strong> O cliente lê e precisa digitar o valor. Abre margem para ele digitar R$ 10,00 em vez de R$ 100,00 "sem querer".</li>
                <li><strong>O Completo (Payload BR Code):</strong> É o que nossa ferramenta gera. Ele carrega a Chave, a Cidade, o Recebedor e, o mais importante, o <strong>VALOR BLINDADO</strong>.</li>
            </ul>
            <p>
                Ao usar nossa ferramenta, você está criando um contrato digital. Quando seu cliente aponta a câmera, o aplicativo do banco dele já abre com tudo preenchido. Ele só tem um trabalho: apertar "Pagar".
            </p>

            {/* TABELA COMPARATIVA (HTML PURO) */}
            <div className="not-prose my-10 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <table className="w-full text-sm text-left min-w-[600px]">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3">Funcionalidade</th>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-emerald-600">Nosso Gerador</th>
                            <th className="px-6 py-4 font-bold uppercase tracking-wider w-1/3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">Mandar só a Chave</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Segurança do Valor</td>
                            <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Total (Valor Fixo)</td>
                            <td className="px-6 py-4 text-red-500">Cliente digita (Risco)</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Velocidade no Caixa</td>
                            <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">5 segundos</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">30 a 60 segundos</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Profissionalismo</td>
                            <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Alto (Padrão Loja)</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Baixo (Amador)</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Custo</td>
                            <td className="px-6 py-4 text-emerald-700 dark:text-emerald-400 font-bold">Zero</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Zero</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">O Segredo do "Copia e Cola" no WhatsApp</h3>
            <p>
                Nem sempre o cliente está na sua frente para ler o QR Code. As vezes, você está negociando pelo WhatsApp. É aí que a nossa ferramenta brilha com o botão <strong>"Copiar Código Pix"</strong>.
            </p>
            <p>
                Muitos vendedores enviam uma foto do QR Code no Zap. Isso é um erro terrível! O cliente não consegue ler um QR Code que está na própria tela do celular (a menos que tenha dois celulares).
            </p>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 my-8">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-2">Por que o Pix Copia e Cola é melhor que foto?</h4>
                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-1"/> O App do banco reconhece automaticamente o código na memória.</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-1"/> Evita erros de "O" (letra) vs "0" (número).</li>
                    <li className="flex gap-2"><CheckCircle2 size={16} className="mt-1"/> É instantâneo e profissional.</li>
                </ul>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-4">Segurança e Dados Pessoais</h3>
            <p>
                Uma dúvida comum é: "É seguro colocar meus dados aqui?". A resposta é sim, e por um motivo técnico simples: <strong>Tudo roda no seu navegador</strong>.
            </p>
            <p>
                Nós não temos um servidor que armazena sua chave Pix. O código JavaScript da página pega o que você digitou e desenha o QR Code ali mesmo, na sua tela. Se você desligar a internet agora, a ferramenta continua funcionando.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 rounded-r-xl not-prose my-8">
                 <h4 className="text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                     <AlertTriangle size={20}/> Atenção aos Golpes!
                 </h4>
                 <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed m-0">
                     Sempre confira o nome do recebedor antes de confirmar. Hackers podem infectar celulares para alterar o código "Copia e Cola" na hora que você cola. Nossa ferramenta é segura, mas o celular do seu cliente pode estar comprometido. Oriente-o a sempre ler: <strong>"Você está transferindo para..."</strong>.
                 </p>
            </div>

            {/* FAQ (PERGUNTAS FREQUENTES IMPORTANTE PARA O GOOGLE) */}
            <div className="mt-12 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
                    <HelpCircle className="text-emerald-600 dark:text-emerald-400" /> Tira-Dúvidas Definitivo
                </h2>
                <div className="space-y-4">
                    
                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Esse QR Code tem validade? Expira em quanto tempo?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Não expira nunca. O código gerado aqui é do tipo <strong>Estático</strong>. Enquanto a sua Chave Pix (CPF, Email, etc.) existir no seu banco, esse QR Code funcionará. Você pode imprimir, plastificar e usar por anos.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            O dinheiro passa pela conta do site?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Jamais. Nossa ferramenta é um "tradutor". Nós apenas pegamos seus dados e os transformamos na linguagem visual que os bancos entendem (o padrão EMV BR Code). A transferência ocorre 100% entre o banco do seu cliente e o seu banco, sem intermediários.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Posso usar a chave Aleatória no gerador?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Sim, e recomendamos fortemente por questões de privacidade. Ao usar o CPF ou Celular, você expõe dados pessoais. A chave aleatória (EVP) é mais segura para expor em balcões ou na internet. Basta copiar a chave aleatória do app do seu banco e colar aqui.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            O que é o campo "Identificador (TxID)"?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            É um código opcional para você organizar suas finanças. Se você colocar "CLIENTE01", isso aparecerá no seu extrato bancário. Ajuda muito a saber quem pagou o quê, especialmente se você recebe muitos Pix de mesmo valor no dia. Atenção: Alguns bancos não aceitam identificadores customizados em chaves de pessoa física (CPF).
                        </p>
                    </details>
                    
                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Tem taxa para usar?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Nossa ferramenta é 100% gratuita. Porém, fique atento às regras do seu banco: Alguns bancos (como Itaú ou Bradesco) podem cobrar taxas para receber Pix em contas PJ (Pessoa Jurídica). Para Pessoa Física, geralmente é gratuito.
                        </p>
                    </details>

                    <details className="group bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-pointer open:ring-2 open:ring-emerald-100 dark:open:ring-emerald-900 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 list-none flex justify-between items-center select-none">
                            Serve para qualquer banco? Nubank, Inter, Itaú?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-slate-700 pt-3 text-sm">
                            Sim, qualquer instituição que opere no Brasil pelo Sistema de Pagamentos Instantâneos (SPI). O padrão QR Code é universal e regulado pelo Banco Central. Funciona até para carteiras digitais como PicPay, RecargaPay e Mercado Pago.
                        </p>
                    </details>

                </div>
            </div>

        </div>

        <SmartCrossLinker currentHref="/ferramentas/gerador-pix" category="ferramentas" />

        {/* PUBLICIDADE BOTTOM */}
        <div className="w-full flex justify-center mt-8">
           <LazyAdUnit slot="pix_bottom" format="horizontal" variant="auto" className="min-h-[100px] w-full" />
        </div>

      </div>
    </div>
  );
}
