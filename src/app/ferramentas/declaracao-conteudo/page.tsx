
import { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import ContentDeclarationGenerator from "@/components/tools/ContentDeclarationGenerator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import { 
  FileText, ShieldCheck, Truck, Scale, AlertTriangle, 
  HelpCircle, BookOpen, Printer, Package, CheckCircle2,
  AlertOctagon, Info
} from "lucide-react";
import DisclaimerBox from "@/components/ui/DisclaimerBox";

export const metadata: Metadata = {
  title: "Declaração de Conteúdo Correios: Gerador PDF (Modelo 2026)",
  description: "Preencha e imprima a Declaração de Conteúdo oficial dos Correios. Obrigatório para envio de encomendas sem Nota Fiscal. Grátis, rápido e seguro.",
  keywords: [
    "declaração de conteudo correios", 
    "modelo declaração conteudo pdf", 
    "gerador declaração de conteudo", 
    "enviar encomenda sem nota fiscal", 
    "formulario correios pdf",
    "declaração de conteudo editavel"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/declaracao-conteudo" },
  openGraph: {
    title: "Gerador de Declaração de Conteúdo Correios - Mestre das Contas",
    description: "Ferramenta para gerar o formulário obrigatório de envio sem NF. Baixe em PDF.",
    url: "https://mestredascontas.com.br/ferramentas/declaracao-conteudo",
    siteName: "Mestre das Contas",
    type: "website",
  }
};

export default function ContentDeclarationPage() {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Gerador de Declaração de Conteúdo",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
        "description": "Ferramenta para gerar formulário de Declaração de Conteúdo exigido pelos Correios para envios não comerciais.",
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1530" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Posso preencher a mão?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, você pode pegar o formulário em branco na agência e preencher com caneta. Mas nosso gerador é mais legível, evita erros e você já chega na agência pronto."
            }
          },
          {
            "@type": "Question",
            "name": "Serve para transportadoras (Jadlog, Azul, etc)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim! A Declaração de Conteúdo é um documento fiscal padrão aceito por todas as transportadoras terrestres e aéreas para transporte entre não contribuintes."
            }
          },
          {
            "@type": "Question",
            "name": "Preciso colocar o CPF do destinatário?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, é obrigatório. Sem o CPF/CNPJ do destinatário, o sistema dos Correios trava e não permite a postagem."
            }
          },
          {
            "@type": "Question",
            "name": "Qual o limite de valor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Para seguro declarado (adicional), o limite geralmente é de R$ 3.000,00 para Declaração de Conteúdo. Acima disso, a exigência de Nota Fiscal se torna quase absoluta."
            }
          },
          {
            "@type": "Question",
            "name": "Meus dados ficam salvos aqui?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não! Nossa ferramenta processa tudo no seu navegador. Quando você atualiza a página, tudo é apagado."
            }
          },
          {
            "@type": "Question",
            "name": "Posso mentir na declaração?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não. É crime de Falsidade Ideológica. Além disso, se a encomenda for extraviada, você só receberá o valor que declarou."
            }
          },
          {
            "@type": "Question",
            "name": "Preciso levar quantas vias?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Apenas uma via é fixada na caixa. Recomenda-se imprimir uma segunda via para você assinar e guardar como comprovante."
            }
          }
        ]
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Declaração de Conteúdo Correios"
          description="Gere o documento obrigatório para enviar encomendas sem Nota Fiscal. Preencha abaixo e imprima o modelo oficial aceito em todas as agências."
          category="Logística & Correios"
          icon={<FileText size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="amber"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Declaração de Conteúdo" }
          ]}
          rating={4.9}
          reviews={1530}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 print:hidden min-h-[100px]">
           <AdUnit slot="declaracao_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA */}
        <section className="w-full max-w-full relative z-10 print:m-0">
           <div className="mb-6 print:hidden">
              <PrivacyBadge />
           </div>
           
           <ContentDeclarationGenerator />
           
           <div className="mt-8 print:hidden max-w-5xl mx-auto"><DisclaimerBox /></div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <AdUnit slot="declaracao_mid" format="auto" />
        </div>

        {/* --- CONTEÚDO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden dark:prose-invert">
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-4">
               O Guia Definitivo da Declaração de Conteúdo
            </h2>
            
            <p className="lead text-lg font-medium text-slate-700 dark:text-slate-300">
               Você preparou o pacote com todo carinho, foi até a agência dos Correios, enfrentou a fila e, na hora de postar, o atendente soltou aquela frase clássica: <em>"Cadê a nota fiscal ou a declaração de conteúdo?"</em>.
            </p>
            <p>
               Se isso já aconteceu com você, respire fundo. Você não está sozinho. Desde 2018, uma regra federal mudou o jogo das postagens no Brasil, pegando muito e-commerce e vendedor informal de surpresa.
            </p>
            <p>
               A verdade é que <strong>nenhuma encomenda viaja no Brasil sem documento fiscal</strong>. Mas calma! Se você não tem Nota Fiscal (porque é pessoa física ou MEI vendendo produto usado/artesanato), a "Declaração de Conteúdo" é o seu salvo-conduto.
            </p>
            <p>
               Neste guia, nós vamos desmistificar esse documento, te ensinar a preencher sem erros (para evitar multas pesadas) e explicar exatamente quando você pode usá-lo.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 p-6 rounded-2xl my-8 not-prose shadow-sm">
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                    <ShieldCheck size={20}/> Regra de Ouro
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-0">
                    A Declaração de Conteúdo substitui a Nota Fiscal <strong>APENAS</strong> para envios não comerciais ou transporte de bens entre não contribuintes de ICMS. Se você tem empresa e vende habitualmente, a Nota Fiscal é obrigatória. Usar a declaração indevidamente é crime de sonegação fiscal.
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Truck className="text-blue-600"/> Por que os Correios exigem isso?
            </h3>
            <p>
                Não é burocracia dos Correios, é lei. A exigência vem do protocolo ICMS 32/01 e da Lei Postal. O objetivo é duplo:
            </p>
            <ul className="list-none space-y-4 pl-0 mt-4">
                <li className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1 shrink-0"><CheckCircle2 size={16}/></div>
                    <span><strong>Fiscalização Tributária:</strong> O governo quer saber o que está circulando para evitar sonegação de impostos (especialmente ICMS, que é estadual).</span>
                </li>
                <li className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-1 shrink-0"><CheckCircle2 size={16}/></div>
                    <span><strong>Segurança:</strong> Saber o que está no pacote evita o transporte de itens proibidos, perigosos ou explosivos.</span>
                </li>
            </ul>
            <p className="mt-4">
                Se a fiscalização parar seu pacote e ele estiver sem documento (ou com a declaração do lado de dentro, o que é proibido), a mercadoria pode ser <strong>apreendida pela Receita Estadual</strong>. E acredite: recuperar é uma dor de cabeça que você não quer ter.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Scale className="text-emerald-600"/> Nota Fiscal vs. Declaração: A Batalha Final
            </h3>
            <p>
                A confusão é comum. "Sou MEI, preciso de nota?". "Estou vendendo meu iPhone usado, como faço?". Vamos resolver isso agora, de forma visual.
            </p>

            {/* TABELA COMPARATIVA */}
            <div className="not-prose my-8 overflow-hidden border rounded-xl border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 dark:bg-slate-950 text-white">
                        <tr>
                            <th className="px-6 py-4 font-bold border-b border-slate-700 w-1/3">Cenário</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-700 w-1/3">Documento Correto</th>
                            <th className="px-6 py-4 font-bold border-b border-slate-700 w-1/3">Por que?</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium">E-commerce / Loja Virtual (CNPJ)</td>
                            <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Nota Fiscal (NF-e)</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Venda habitual é fato gerador de ICMS.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium">Pessoa Física vendendo usado (OLX/Enjoei)</td>
                            <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold">Declaração de Conteúdo</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Venda ocasional entre não contribuintes.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium">MEI vendendo para Pessoa Física</td>
                            <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Nota Fiscal*</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">*A lei dispensa NF do MEI para PF, mas os Correios/Marketplaces exigem para segurança. Melhor emitir.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium">Presente para familiar</td>
                            <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-bold">Declaração de Conteúdo</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Não há transação comercial.</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-6 py-4 font-medium">Devolução de mercadoria (Troca)</td>
                            <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">NF de Devolução</td>
                            <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">A mercadoria precisa retornar ao estoque fiscal.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-500"/> 3 Erros Fatais ao Preencher
            </h3>
            <p>
                Usar a declaração é simples, mas pequenos erros podem travar sua encomenda no raio-X dos centros de distribuição. Evite estes a todo custo:
            </p>

            <div className="space-y-4 not-prose mt-6">
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-l-4 border-slate-200 dark:border-slate-800 border-l-red-400 dark:border-l-red-500 shadow-sm">
                    <span className="font-bold text-red-500 text-xl">01</span>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Descrições Vagas</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Escrever apenas "Roupas" ou "Diversos" é pedir para ser fiscalizado. Seja específico: <em>"2 Camisetas de Algodão Tamanho M"</em>. Quanto mais detalhe, menos suspeita.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-l-4 border-slate-200 dark:border-slate-800 border-l-red-400 dark:border-l-red-500 shadow-sm">
                    <span className="font-bold text-red-500 text-xl">02</span>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Valor Irreal</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Declarar R$ 10,00 para um pacote que claramente contém um notebook. O seguro dos Correios (se houver extravio) pagará apenas o valor declarado. Não minta.
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-l-4 border-slate-200 dark:border-slate-800 border-l-red-400 dark:border-l-red-500 shadow-sm">
                    <span className="font-bold text-red-500 text-xl">03</span>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">Esquecer de Assinar</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Uma declaração sem assinatura não tem validade legal. O funcionário dos Correios vai recusar o pacote ou pedir para você assinar na hora (se você for o remetente).
                        </p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                <Package className="text-purple-600"/> Como prender na caixa? (O jeito Ninja)
            </h3>
            <p>
                Não adianta fazer a declaração perfeita e colocar dentro da caixa. Ela precisa estar acessível para a fiscalização sem abrir o pacote.
            </p>
            <p>
                O jeito correto é usar um saquinho plástico transparente (conhecido como "Canguru") colado na parte externa.
            </p>
            <ol className="list-decimal pl-5 space-y-2 marker:font-bold marker:text-purple-600">
                <li>Imprima a declaração gerada aqui.</li>
                <li>Dobre a folha de modo que apenas o cabeçalho "Declaração de Conteúdo" fique visível (escondendo os valores para evitar roubos).</li>
                <li>Coloque no saquinho plástico.</li>
                <li>Cole o saquinho na caixa, preferencialmente ao lado da etiqueta de endereço.</li>
                <li>Nunca use fita adesiva diretamente sobre o papel, pois pode rasgar ao tentar ler.</li>
            </ol>

            {/* FAQ */}
            <div className="mt-16 not-prose">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <HelpCircle className="text-blue-600 dark:text-blue-400" /> Perguntas Frequentes
                </h2>
                <div className="grid gap-4">
                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Posso preencher a mão?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim, você pode pegar o formulário em branco na agência e preencher com caneta. Mas nosso gerador é mais legível, evita erros e você já chega na agência pronto, pulando a etapa de ficar procurando caneta no balcão.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Serve para transportadoras (Jadlog, Azul, etc)?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim! A Declaração de Conteúdo é um documento fiscal padrão aceito por todas as transportadoras terrestres e aéreas para transporte entre não contribuintes. O modelo gerado aqui é 100% compatível.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Preciso colocar o CPF do destinatário?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Sim, é obrigatório. Sem o CPF/CNPJ do destinatário, o sistema dos Correios trava e não permite a postagem. Peça esse dado ao seu cliente antes de sair de casa.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Qual o limite de valor?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Para seguro automático, os Correios indenizam valores baixos. Para seguro declarado (adicional), o limite geralmente é de R$ 3.000,00 para Declaração de Conteúdo. Acima disso, a exigência de Nota Fiscal se torna quase absoluta por questões de seguro.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Meus dados ficam salvos aqui?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Não! Nossa ferramenta processa tudo no seu navegador. Quando você atualiza a página, tudo é apagado. Sua privacidade e a de seus clientes é nossa prioridade.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Posso mentir na declaração?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Poder, pode, mas é crime (Falsidade Ideológica - Art. 299 do Código Penal). Além disso, se a encomenda for extraviada, você só receberá o valor que declarou. O risco não vale a pena.
                        </p>
                    </details>

                    <details className="group bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer open:ring-2 open:ring-blue-100 dark:open:ring-blue-900/50 transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center list-none select-none">
                            Preciso levar quantas vias?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                            Apenas uma via é fixada na caixa. Recomenda-se imprimir uma segunda via para você assinar e guardar como comprovante do que foi enviado, caso precise acionar o seguro depois.
                        </p>
                    </details>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-12 not-prose text-center">
                <p className="font-bold text-slate-900 dark:text-white mb-2">Pronto para enviar?</p>
                <div className="flex justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1"><Printer size={16}/> Imprima em A4</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={16}/> Assine</span>
                    <span className="flex items-center gap-1"><Package size={16}/> Cole na caixa</span>
                </div>
            </div>

        </div>

        {/* ANÚNCIO FINAL */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <AdUnit slot="declaracao_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
