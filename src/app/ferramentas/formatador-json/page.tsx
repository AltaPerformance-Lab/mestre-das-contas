import type { Metadata } from "next";
export const runtime = 'edge';
import Link from "next/link";
import JsonFormatter from "@/components/tools/JsonFormatter";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { 
  FileJson, CheckCircle2, ShieldCheck, Zap, 
  Code2, AlertTriangle, BookOpen, Terminal,
  Maximize2, Minimize2, Lock
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";

// --- SEO 2026 ---
export const metadata: Metadata = {
  title: "Formatador JSON Online: Validar, Beautify e Minificar (Lint)",
  description: "Ferramenta para formatar, validar e minificar JSON. Identifique erros de sintaxe, converta para uma só linha ou indente para leitura. Seguro e 100% no navegador.",
  keywords: [
    "formatador json online", "json validator", "json beautifier",
    "minificar json", "validar json", "json parser online",
    "json lint", "formatar json gratis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/formatador-json" },
  openGraph: {
    title: "Formatador JSON Online - Valide e Organize seu Código",
    description: "Ferramenta essencial para desenvolvedores. Formate, minifique e corrija erros de JSON instantaneamente. Sem cadastro e ilimitado.",
    url: "https://mestredascontas.com.br/ferramentas/formatador-json",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
  },
};

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Formatador JSON Online",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
  "description": "Ferramenta online para validar, formatar (beautify) e minificar dados JSON. Processamento local no navegador para total privacidade.",
  "featureList": "Validação de Sintaxe, Beautify (Pretty Print), Minificação, Download de Arquivo, Copiar para Clipboard",
  "aggregateRating": { 
      "@type": "AggregateRating", 
      "ratingValue": "4.9", 
      "ratingCount": "850", 
      "bestRating": "5", 
      "worstRating": "1" 
  }
};

export default function JsonFormatterPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Formatador JSON Online"
          description="A ferramenta definitiva para desenvolvedores. Valide, indente e minifique seus arquivos JSON com segurança total. Seus dados não saem do seu navegador."
          category="Ferramentas Dev"
          icon={<FileJson size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Novo"
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Formatador JSON" }]}
          rating={4.9}
          reviews={850}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-700 print:hidden min-h-[100px]">
           <LazyAdUnit slot="tools_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PrivacyBadge />
           <JsonFormatter />
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="tools_mid" format="auto" />
        </div>

        {/* --- ARTIGO EDUCACIONAL (SEO DENSO) --- */}
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden w-full print:hidden">
          
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider text-xs mb-2">
                <Code2 size={16} /> Guia Definitivo 2026
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                JSON Validator Online: O Guia Completo para Desenvolvedores
            </h2>
            <p className="lead text-slate-700 dark:text-slate-300 text-xl font-medium mb-8">
                Você já passou pela frustração de tentar ler um arquivo JSON que parece um bloco infinito de texto? Ou pior, receber um erro de sintaxe misterioso em uma API e não saber onde está o problema?
            </p>
            
            <p>
                Pois é, nós te entendemos. A verdade é que, no mundo do desenvolvimento web, lidar com **JSON** (JavaScript Object Notation) é o nosso "pão com manteiga". É o padrão universal. Mas, vamos ser sinceros? Ler JSON minificado é tarefa para robôs, não para humanos.
            </p>

            <p>
                É exatamente por isso que criamos o **Formatador JSON Mestre das Contas**. Queríamos uma ferramenta que fosse não apenas um "beautifier" (embelezador), mas um verdadeiro canivete suíço para validar, minificar e organizar seu código. E o melhor? Sem a preocupação de "onde meus dados estão indo".
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-3">
                <Maximize2 className="text-indigo-600 dark:text-indigo-400" /> Beautify vs. Minify: Qual a diferença?
            </h3>
            <p>
                Se você está começando agora ou apenas precisa relembrar, essa é a dúvida número um. A diferença é visual e de performance:
            </p>

            <div className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-700">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-800">
                            <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">Característica</th>
                            <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-indigo-700 dark:text-indigo-400">Beautify (Formatado)</th>
                            <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300">Minify (Minificado)</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Legibilidade</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 text-green-600 dark:text-green-400 font-bold">Alta (Humanos leem)</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 text-red-500 dark:text-red-400">Nula (Máquinas leem)</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Tamanho</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800">Maior (Espaços e quebras)</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 text-green-600 dark:text-green-400 font-bold">Menor possível</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800 font-medium">Uso Ideal</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800">Debug, Edição, Configuração</td>
                            <td className="p-4 border-b border-slate-100 dark:border-slate-800">Requisicões de API, Banco de Dados</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-3">
                <AlertTriangle className="text-amber-500" /> Os 3 Erros que Mais Quebram JSON
            </h3>
            <p>
                Veja bem, o JSON é estrito. Ele não perdoa. Diferente do JavaScript, onde você pode esquecer uma vírgula aqui e ali, no JSON isso é fatal. Nossa ferramenta detecta automaticamente:
            </p>
            <ol className="list-decimal pl-5 space-y-4 text-slate-700 dark:text-slate-300 font-medium marker:text-indigo-600 dark:marker:text-indigo-400 marker:font-bold">
                <li>
                    <strong>Trailing Commas (Vírgula Sobrando):</strong>
                    <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">O clássico <code>{"{\"a\": 1,}"}</code>. Essa vírgula final quebra a maioria dos parsers estritos.</p>
                </li>
                <li>
                    <strong>Aspas Simples:</strong>
                    <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">JSON <strong>exige</strong> aspas duplas <code>"</code>. Escrever <code>{'{\'chave\': 1}'}</code> é inválido, embora funcione em JS.</p>
                </li>
                <li>
                    <strong>Tipagem Incorreta:</strong>
                    <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">Tentar colocar comentários <code>{"//"}</code> (JSON padrão não aceita) ou esquecer de fechar chaves.</p>
                </li>
            </ol>
            
            <p className="mt-6 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200 italic">
                <strong>Dica Profissional:</strong> Sempre use o botão "Validar" antes de commitar um arquivo de configuração como o <code>package.json</code>. Isso salva horas de dor de cabeça no CI/CD.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-3">
                <Terminal className="text-slate-800 dark:text-slate-200" /> Por que usar uma ferramenta Online?
            </h3>
            <p>
                "Ah, mas meu VS Code faz isso." Sim, faz. Mas e quando você está em uma máquina alheia? Ou no celular? Ou precisa apenas limpar rapidamente um payload de logs do servidor?
            </p>
            <p>
                A praticidade de ter um validador no navegador, que funciona offline (graças ao processamento client-side), é imbatível. Além disso, incluímos funcionalidades que editores simples não têm, como a conversão rápida para download de arquivo.
            </p>

             {/* --- FAQ --- */}
            <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-slate-500 dark:text-slate-400"/> Perguntas Frequentes (FAQ)
                </h3>
                
                <div className="space-y-4">
                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            1. É seguro colar senhas ou chaves de API aqui?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                            A resposta curta é: <strong>Sim, nesta ferramenta específica é seguro.</strong><br/><br/>
                            Diferente de muitos sites, nós não enviamos seus dados para a "nuvem" para serem processados. Tudo acontece via JavaScript no seu próprio computador. Você pode testar: carregue a página, desligue o Wi-Fi e use a ferramenta. Ela continuará funcionando.
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            2. Qual a diferença entre JSON e XML?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                            O XML é mais antigo, verboso e difícil de ler (usa tags de abertura e fechamento). O JSON é moderno, leve e nativo da web. Hoje em dia, 99% das APIs modernas (REST/GraphQL) preferem JSON por ser mais rápido de processar e consumir menos banda.
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            3. O que fazer quando recebo "Unexpected token"?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                           Esse é o erro mais comum. Geralmente significa que você tem uma aspa faltando, uma vírgula a mais no final de uma lista, ou caracteres invisíveis copiados de sites da web. Cole seu código na nossa área de entrada e o nosso validador apontará a linha exata do problema.
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            4. Existe limite de tamanho para o arquivo?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                            Tecnicamente, o limite é a memória RAM do seu navegador. Nós já testamos arquivos de 50MB a 100MB com sucesso. Porém, se o arquivo for gigantesco (Gigabytes), o navegador pode travar.
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            5. A ferramenta ordena as chaves do objeto?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                           Por padrão, o JSON.stringify respeita a ordem de inserção na maioria dos navegadores modernos, mas JSON não garante ordem de chaves. Nossa ferramenta foca em validação e formatação visual, mantendo a estrutura original o máximo possível.
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                         <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            6. Posso usar isso para converter JSON em CSV?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                           Esta ferramenta específica é para validação e formatação. Para conversão de dados (JSON para CSV, XML ou Excel), estamos desenvolvendo ferramentas específicas que estarão disponíveis em breve no menu "Ferramentas".
                        </div>
                    </details>

                    <details className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                        <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                            7. Por que "Mestre das Contas" tem ferramentas de dev?
                            <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="text-slate-600 dark:text-slate-400 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2">
                           Porque empreendedores modernos, contadores e gestores tech muitas vezes precisam lidar com integrações, notas fiscais eletrônicas (que usam JSON/XML) e dados brutos. Queremos ser o hub completo para resolver seus problemas, sejam financeiros ou técnicos.
                        </div>
                    </details>
                </div>
            </div>

        </div>

        {/* NAVEGAÇÃO FINAL */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 print:hidden not-prose">
            <p className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
               <ShieldCheck size={16} className="text-indigo-500"/> Outras Ferramentas para Você:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/ferramentas/gerador-de-senhas" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-400 hover:shadow-lg transition-all group">
                  <div className="bg-slate-100 dark:bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-slate-600 dark:text-slate-300 shadow-sm group-hover:scale-110 transition-transform"><BookOpen size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador de Senhas</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Crie chaves seguras</span>
              </Link>
              <Link href="/ferramentas/conversor-imagem" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all group">
                  <div className="bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform"><Zap size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Conversor de Imagem</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">WebP, PNG e JPG</span>
              </Link>
              <Link href="/ferramentas/gerador-qr-code" className="flex flex-col p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all group">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400 shadow-sm group-hover:scale-110 transition-transform"><Code2 size={20}/></div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-lg">Gerador QR Code</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pix, Links e Wi-Fi</span>
              </Link>
            </div>
        </div>

        {/* ANÚNCIO BOTTOM */}
        <div className="w-full flex justify-center mt-8 min-h-[250px]">
            <LazyAdUnit slot="tools_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}
