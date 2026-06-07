import type { Metadata } from "next";
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
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import ExpertSignature from "@/components/ui/ExpertSignature";

export const metadata: Metadata = {
  title: "Formatador JSON Online: Validar, Beautify e Minificar (Lint)",
  description: "Precisa organizar ou validar um código JSON? Formate, indente, minifique e corrija erros de sintaxe instantaneamente. 100% seguro e direto no seu navegador!",
  keywords: [
    "formatador json online", "json validator", "json beautifier",
    "minificar json", "validar json", "json parser online",
    "json lint", "formatar json gratis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/formatador-json" },
  openGraph: {
    title: "Formatador JSON Online - Valide e Organize seu Código",
    url: "https://mestredascontas.com.br/ferramentas/formatador-json",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website" } };

// --- FAQ LIST (SCHEMA ROBUSTO PARA RICH SNIPPETS) ---
const faqList = [
  {
    p: "É seguro colar senhas ou chaves de API aqui?",
    r: "Sim, é 100% seguro! Diferente de outras ferramentas web, nosso formatador de JSON processa todas as informações localmente no seu navegador via JavaScript (client-side). Seus dados sigilosos, códigos ou chaves de API nunca são transmitidos ou armazenados em servidores externos."
  },
  {
    p: "Qual a diferença entre JSON e XML?",
    r: "O XML é um formato mais antigo, verboso e complexo, estruturado com tags personalizáveis de abertura e fechamento. O JSON (JavaScript Object Notation) é moderno, extremamente leve, fácil de ler para humanos e nativo da web, sendo o padrão absoluto para APIs RESTful modernas."
  },
  {
    p: "O que fazer quando recebo o erro 'Unexpected token'?",
    r: "Esse erro indica um desvio das regras estritas do JSON. Geralmente é causado por aspas simples em vez de aspas duplas, vírgulas sobressalentes no final de listas ou objetos (trailing commas), ausência de fechamento de chaves/colchetes ou caracteres invisíveis copiados da web."
  },
  {
    p: "Existe limite de tamanho para o arquivo formatado?",
    r: "Não há limites rígidos impostos por nós, pois o processamento ocorre direto na máquina do usuário. O limite real é a capacidade de memória RAM do seu navegador. Testamos com sucesso arquivos grandes de até 100MB, mas payloads em Gigabytes podem travar a aba."
  },
  {
    p: "A ferramenta de formatação ordena as chaves do objeto?",
    r: "Por padrão, preservamos rigorosamente a ordem original de inserção das chaves informadas no payload bruto para evitar distorções no mapeamento das APIs. O formato JSON não define uma ordem obrigatória para os pares de chave e valor."
  },
  {
    p: "Posso usar este formatador para converter JSON em CSV?",
    r: "Esta ferramenta específica é focada em validação, beautify (pretty print) e minificação de dados. Se você precisa converter estruturas de dados complexas para CSV, XML ou planilhas Excel, disponibilizamos ferramentas específicas de conversão em nosso hub de utilitários."
  },
  {
    p: "Por que o Mestre das Contas possui ferramentas de desenvolvimento?",
    r: "Acreditamos em centralizar soluções úteis para a produtividade de empreendedores, analistas de TI e profissionais de tecnologia que trabalham diariamente com integrações de dados, Webhooks, arquivos de configurações e notas fiscais eletrônicas estruturadas."
  }
];

// --- DADOS ESTRUTURADOS ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Formatador JSON Online",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para validar, formatar (beautify) e minificar dados JSON. Processamento local no navegador para total privacidade.",
      "featureList": "Validação de Sintaxe, Beautify (Pretty Print), Minificação, Download de Arquivo, Copiar para Clipboard"
    },
    {
      "@type": "HowTo",
      "name": "Como Formatar e Validar JSON Online",
      "description": "Passo a passo simples para validar a sintaxe do seu código JSON, corrigir recuos e erros estruturais.",
      "totalTime": "PT15S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Cole seu JSON",
          "text": "Cole o código JSON bruto ou minificado no campo de texto principal.",
          "url": "https://mestredascontas.com.br/ferramentas/formatador-json#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Escolha a Ação",
          "text": "Clique em 'Formatar' para identar o código de forma legível, ou 'Minificar' para remover todos os espaços e economizar banda.",
          "url": "https://mestredascontas.com.br/ferramentas/formatador-json#ferramenta"
        },
        {
          "@type": "HowToStep",
          "name": "Corrija Erros e Copie",
          "text": "Se houver erro de sintaxe, o sistema aponta a linha exata. Corrija o texto e clique em 'Copiar' para salvar seu JSON perfeito.",
          "url": "https://mestredascontas.com.br/ferramentas/formatador-json#ferramenta"
        }
      ]
    },
    {
      "@type": "Article",
      "headline": "Guia de Formatação e Validação JSON para Desenvolvedores",
      "description": "Aprenda a identificar erros de sintaxe em JSON, as diferenças entre formatar e minificar, e por que a segurança local é essencial.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-07-02",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.p,
        "acceptedAnswer": { "@type": "Answer", "text": item.r }
      }))
    }
  ]
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
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2 mb-4 flex items-center gap-2 border-l-4 border-slate-700 dark:border-slate-300 pl-4">
                Como Usar o Formatador JSON (Passo a Passo)
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
               Valide, indente ou compacte seus dados estruturados JSON em 3 passos:
            </p>

            <div className="grid sm:grid-cols-3 gap-6 my-8 not-prose">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0">1</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Cole o Código</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Cole seu código JSON bruto ou minificado na área de texto principal. Também aceita arquivos arrastados.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0">2</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Formate ou Minifique</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Clique em <strong>"Formatar"</strong> para indentar ( Pretty Print ) de forma legível, ou <strong>"Minificar"</strong> para compactar e remover espaços.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0">3</div>
                <div className="space-y-1">
                   <h4 className="font-bold text-slate-800 dark:text-white text-sm">Corrija & Copie</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400">Se houver erros de sintaxe (como vírgulas extras), o validador apontará a linha. Corrija-os e clique em <strong>"Copiar"</strong>.</p>
                </div>
              </div>
            </div>

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

            {/* TABELA COMPARATIVA 1 (OBRIGATÓRIA & RESPONSIVA) */}
            <div className="not-prose my-8 w-full">
              <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                <table className="w-full min-w-[600px] text-sm text-left border-collapse">
                  <thead className="bg-slate-900 text-white dark:bg-slate-950 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Característica</th>
                      <th className="px-6 py-4 font-bold text-indigo-300">Beautify (Formatado)</th>
                      <th className="px-6 py-4 font-bold text-emerald-300">Minify (Minificado)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Legibilidade</td>
                      <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">Excelente (Pronto para leitura humana)</td>
                      <td className="px-6 py-4 text-red-500 dark:text-red-400">Complexo (Código em linha única contínua)</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Tamanho & Peso</td>
                      <td className="px-6 py-4">Maior (Inclui espaços, tabulações e quebras de linha)</td>
                      <td className="px-6 py-4 font-bold text-green-600 dark:text-green-400">Mínimo possível (Compactado ao extremo)</td>
                    </tr>
                    <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Aplicação Recomendada</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Debugging, desenvolvimento local, revisão de código e arquivos de configuração</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Produção, tráfego de dados em APIs, economia de banda e performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-2">
                <span className="inline-block text-xs text-slate-400 dark:text-slate-500 italic bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
                  ↔️ Deslize horizontalmente para comparar todos os atributos.
                </span>
              </div>
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
                    <p className="font-normal text-slate-600 dark:text-slate-400 mt-1">O clássico <code>{"{\"a\": 1 }"}</code>. Essa vírgula final quebra a maioria dos parsers estritos.</p>
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

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6 flex items-center gap-3">
                <BookOpen className="text-indigo-600" /> Comparativo Técnico: JSON vs. XML vs. YAML
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Escolher a estrutura correta para tráfego ou configuração de dados faz toda a diferença na arquitetura do seu sistema. Compare os três principais formatos do mercado:
            </p>

            {/* TABELA COMPARATIVA 2 (RESPONSIVA) */}
            <div className="not-prose my-8 w-full">
              <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                <table className="w-full min-w-[700px] text-sm text-left border-collapse">
                  <thead className="bg-slate-900 text-white dark:bg-slate-950 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-bold">Métrica</th>
                      <th className="px-6 py-4 font-bold text-blue-300">JSON (Universal)</th>
                      <th className="px-6 py-4 font-bold text-yellow-300">XML (Legado)</th>
                      <th className="px-6 py-4 font-bold text-purple-300">YAML (Configs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Legibilidade</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Alta</td>
                      <td className="px-6 py-4">Média (Tags poluídas)</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Excelente (Sem tags/chaves)</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Peso da Payload</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Leve</td>
                      <td className="px-6 py-4 text-red-500 dark:text-red-400">Muito Pesado</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Leve</td>
                    </tr>
                    <tr className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Comentários</td>
                      <td className="px-6 py-4">Não nativo (Ignorado no padrão)</td>
                      <td className="px-6 py-4 font-medium">Sim (Tags de comentários)</td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-bold">Sim (Nativo via #)</td>
                    </tr>
                    <tr className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 font-semibold">Foco de Uso</td>
                      <td className="px-6 py-4 font-semibold">APIs RESTful e GraphQL, NoSQL</td>
                      <td className="px-6 py-4">Notas fiscais (NF-e), SOAP, sistemas legados</td>
                      <td className="px-6 py-4">Arquivos de Configuração (Docker, CI/CD, Kubernetes)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <ExpertSignature author="Equipe de Tecnologia Mestre das Contas" updatedAt="Junho de 2026" />
        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/formatador-json" />
        <SmartCrossLinker currentHref="/ferramentas/formatador-json" category="ferramentas" />

        {/* --- FAQ --- */}
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <BookOpen className="text-slate-500 dark:text-slate-400"/> Perguntas Frequentes (FAQ)
                </h3>
                
                <div className="space-y-4">
                    {faqList.map((item, idx) => (
                        <details key={idx} className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 open:bg-white dark:open:bg-slate-900 open:shadow-md transition-all">
                            <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center cursor-pointer p-4 list-none select-none">
                                <div className="flex items-start gap-3">
                                    <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm mt-1">#{idx + 1}</span>
                                    <span className="leading-snug">{item.p}</span>
                                </div>
                                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                            </summary>
                            <div className="text-slate-600 dark:text-slate-300 px-4 pb-4 pt-0 leading-relaxed border-t border-transparent group-open:border-slate-100 dark:group-open:border-slate-800 group-open:pt-2 pl-8">
                                {item.r}
                            </div>
                        </details>
                    ))}
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
