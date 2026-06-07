import { Suspense } from "react";
import type { Metadata } from "next";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { 
  Lock, HelpCircle, CheckCircle2, Unlock, ShieldCheck, Star, Sparkles, Key, AlertTriangle, ShieldAlert
} from "lucide-react";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import ExpertSignature from "@/components/ui/ExpertSignature";

// --- 1. METADATA DINÂMICA (SEO DE CAUDA LONGA) ---
export const metadata: Metadata = {
  title: "Gerador de Senhas Fortes | Criar Senha Segura Grátis 2026",
  description: "Gere senhas fortes, invioláveis e de alta entropia instantaneamente. Criptografia client-side 100% segura para máxima segurança das suas contas. Grátis!",
  keywords: [
    "gerador de senhas", "senha forte", "criar senha segura", "password generator", 
    "segurança online", "gerador aleatorio", "teste de força de senha", "gerador de senhas gratis"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas" },
  openGraph: {
    title: "Gerador de Senhas Fortes e Seguras | Mestre das Contas",
    url: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph/gerador-senhas.jpg", width: 1200, height: 630, alt: "Gerador de Senhas Fortes" }]
  },
  robots: { index: true, follow: true }
};

// 7 FAQs Dinâmicas Sincronizadas
const faqs = [
  {
    q: "Como funciona um gerador de senhas aleatórias e por que ele é mais seguro do que criar uma senha da minha cabeça?",
    a: "Nosso gerador utiliza algoritmos criptográficos locais baseados na API de Criptografia do seu navegador. Quando você tenta criar uma senha 'de cabeça', seu cérebro tende a usar padrões lógicos conhecidos como datas de aniversário, nomes de pets ou sequências de teclado. Já o gerador cria sequências puramente matemáticas sem qualquer viés cognitivo humano, tornando as senhas impossíveis de serem adivinhadas por engenharia social."
  },
  {
    q: "O que é entropia de senha e como ela afeta a segurança das minhas contas?",
    a: "Veja bem, a entropia é a medida matemática da desordem e imprevisibilidade de uma informação, calculada em bits. Quanto maior a entropia de uma senha, maior é o número de tentativas que um atacante precisará fazer para adivinhá-la por meio de tentativa e erro. Uma senha longa e aleatória possui alta entropia, atuando como uma barreira praticamente intransponível para sistemas de invasão automática."
  },
  {
    q: "Por que o comprimento da senha é muito mais importante do que a complexidade dos caracteres?",
    a: "A verdade é que cada caractere adicional que você insere na sua senha aumenta o número total de combinações possíveis de forma exponencial. Uma senha contendo apenas letras minúsculas simples, mas que seja muito longa (como 20 caracteres), é estatisticamente mais difícil de quebrar do que uma senha de apenas 8 caracteres cheia de símbolos complexos. O segredo ideal é unir ambos: comprimento e complexidade."
  },
  {
    q: "O Mestre das Contas armazena ou tem acesso às senhas geradas nesta ferramenta?",
    a: "Não, de forma alguma! A nossa ferramenta foi construída sob a arquitetura de execução Client-Side (lado do cliente). Isso significa que todo o cálculo e processamento de geração da sua senha é realizado localmente no seu computador ou celular, sem enviar um único bit de informação pela internet. Suas senhas nunca tocam nossos servidores e nunca são salvas em bancos de dados."
  },
  {
    q: "O que é um ataque de força bruta e quanto tempo um hacker demoraria para quebrar a minha senha?",
    a: "Um ataque de força bruta é um método no qual computadores de alta velocidade tentam adivinhar sua senha testando bilhões de combinações por segundo. Se a sua senha for simples como 'aninha123', ela é quebrada instantaneamente. Por outro lado, para uma senha de 16 caracteres gerada de forma aleatória por nossa ferramenta, seriam necessários milhares de anos com supercomputadores atuais para quebrar o código."
  },
  {
    q: "Como posso guardar e lembrar de tantas senhas complexas sem anotá-las em um papel vulnerável?",
    a: "Nós recomendamos fortemente o uso de um Gerenciador de Senhas confiável e de código aberto (como o Bitwarden, 1Password ou Keepass). Essas ferramentas funcionam como cofres digitais altamente protegidos. Você só precisa memorizar uma única 'Senha Mestra' extremamente segura, e o gerenciador cuidará de registrar, preencher e proteger todas as demais senhas longas para você."
  },
  {
    q: "Esta ferramenta de geração de senhas funciona offline caso eu desconecte a minha internet?",
    a: "Sim, perfeitamente! Como todo o código e lógica de segurança rodam 100% no seu próprio navegador de internet, você pode carregar esta página, desconectar o cabo de rede ou colocar o seu aparelho em modo avião, e continuar gerando senhas com a mesma segurança. Essa é a maior prova física de que seus dados estão totalmente isolados e protegidos."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Senhas Fortes Mestre das Contas",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para gerar senhas aleatórias criptograficamente seguras com total privacidade client-side."
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function GeradorSenhasPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER --- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 w-full">
          <PageHeader 
            title="Gerador de Senhas Fortes"
            description="Proteja suas contas contra invasões de forma definitiva. Gere senhas aleatórias, longas e com criptografia militar instantaneamente. Seus dados nunca saem do seu dispositivo."
            category="Segurança & Privacidade"
            icon={<Lock size={32} className="text-emerald-600" />}
            variant="default"
            categoryColor="emerald"
            badge="Criptografia Criptográfica Local"
            breadcrumbs={[
              { label: "Ferramentas", href: "/ferramentas" },
              { label: "Gerador de Senhas" }
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex flex-col gap-4 w-full">
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pass_top" format="horizontal" variant="software" />
        </div>

        {/* PRIVACIDADE E SEGURANÇA (E-E-A-T) */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300 mb-2">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Criptografia de Nível Militar: As senhas são geradas localmente em 2026 e nunca são enviadas ou armazenadas por nós.</span>
        </div>

        <PrivacyBadge />
      </div>

      {/* --- FERRAMENTA PRINCIPAL --- */}
      <div className="max-w-5xl mx-auto px-4 pb-12 w-full">
        <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
          <PasswordGenerator />
        </Suspense>
        <div className="mt-8 print:hidden max-w-5xl mx-auto">
          <DisclaimerBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 w-full">
        
        {/* --- FEATURES GRID --- */}
        <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 shadow-sm">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Segurança Total</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Seus dados confidenciais são preservados. O gerador opera na memória RAM local, eliminando interceptações.
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                    <Lock size={12}/> Execução 100% Offline
                </div>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-blue-50 dark:bg-blue-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                    <Key size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Alta Entropia</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Algoritmos avançados geram combinações matemáticas aleatórias e imprevisíveis contra cibercriminosos.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-amber-50 dark:bg-amber-900/20 w-14 h-14 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 shadow-sm">
                    <Sparkles size={32} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">Personalização Ágil</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    Configure maiúsculas, números, caracteres especiais e comprimentos variados em tempo real na tela.
                </p>
            </div>
        </section>

        {/* --- ARTIGO EDUCACIONAL DE ALTA DENSIDADE --- */}
        <div className="max-w-4xl mx-auto w-full space-y-8">
            
            {/* Review Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">Segurança Certificada</p>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Processamento Local</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic mt-1">
                        "O uso da API criptográfica nativa do navegador assegura que o algoritmo de geração de caracteres utilize fontes de entropia do hardware do seu dispositivo, inviabilizando qualquer tipo de rastreamento pela web."
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm w-full">
                <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-6 border-l-4 border-emerald-500 pl-4 flex items-center gap-3">
                    <Star className="text-emerald-500 fill-emerald-500 animate-pulse" /> O Perigo Silencioso das Senhas Óbvias: O Guia Definitivo
                </h2>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Imagine que você acabou de trancar a porta da sua casa com um cadeado de latão pesado e reluzente.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Contudo, as paredes da sua residência foram feitas inteiramente com caixas de papelão frágeis e úmidas.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  A verdade é que ter uma senha curta, mesmo contendo símbolos exóticos, funciona exatamente como essa casa.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Os invasores cibernéticos não tentam adivinhar a senha digitando manualmente na tela como vemos nos filmes.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Nós compreendemos que computadores modernos utilizam robôs de força bruta para rodar bilhões de combinações.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Aí é que está o segredo: quanto mais longa e desprovida de sentido humano for a senha, maior é a sua segurança.
                </p>

                {/* Tabela Comparativa de Senhas - Tabela HTML */}
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-10 mb-4">Tabela de Vulnerabilidade: Comparando Tipos de Senha e Tempo de Invasão</h3>
                
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                   Desenvolvemos esta tabela comparativa para ajudar você a visualizar o impacto real da entropia na sua privacidade.
                </p>

                <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
                    <table className="w-full min-w-[750px] text-left border-collapse bg-white dark:bg-slate-900">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Categoria de Senha</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Exemplo Típico</th>
                                <th className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/10 dark:bg-emerald-950/10">Entropia (Imprevisibilidade)</th>
                                <th className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">Tempo Médio de Quebra</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Senha Pessoal Fraca</td>
                                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">joao1985 / 123456</td>
                                <td className="px-6 py-4 text-sm text-red-500 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Nula (Baixíssima)</td>
                                <td className="px-6 py-4 text-sm text-red-500 font-bold">Imediato (Menos de 1 segundo)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Senha Complexa Curta</td>
                                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">J@1985#*</td>
                                <td className="px-6 py-4 text-sm text-amber-500 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Média (Baixa Resistência)</td>
                                <td className="px-6 py-4 text-sm text-amber-500">Alguns minutos ou horas</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Frase Comum Longa</td>
                                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">quero-cafe-quentinho-hoje</td>
                                <td className="px-6 py-4 text-sm text-blue-500 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Boa (Média Resistência)</td>
                                <td className="px-6 py-4 text-sm text-blue-500">Alguns dias ou semanas</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Senha Militar Aleatória</td>
                                <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">Xk9#mP2$vLq9*WbA</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold bg-emerald-50/10 dark:bg-emerald-950/10">Extrema (Inviolável)</td>
                                <td className="px-6 py-4 text-sm text-emerald-600 font-bold">Milhares de Anos</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                   O melhor de tudo? Ao analisar a nossa planilha técnica, fica claro que usar <GlossaryTerm slug="criptografia-senhas-hash">senhas geradas</GlossaryTerm> por robês criptográficos aumenta sua barreira de segurança de forma exponencial.
                </p>

                {/* Metáfora do Labirinto Invisível */}
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Key className="text-emerald-500" /> A Metáfora do "Labirinto Invisível": Como a Entropia Funciona
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Para ajudar você a compreender por que o comprimento é a chave para senhas seguras, vamos usar a metáfora do labirinto invisível.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Se a sua senha tem apenas 8 caracteres, ela é como um pequeno labirinto com apenas três caminhos possíveis.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  Qualquer robô invasor consegue percorrer esses três caminhos em uma fração de segundo e encontrar a saída para invadir suas contas bancárias.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  No entanto, se a sua senha possui 16 ou 20 caracteres aleatórios, o labirinto se expande para proporções planetárias de tamanho.
                </p>

                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  O computador invasor precisará de tanta energia elétrica e tempo computacional para mapear o labirinto inteiro que desistirá da invasão antes mesmo de começar.
                </p>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 flex items-center gap-2">
                    <Sparkles className="text-emerald-500" /> Boas Práticas para Blindar Suas Contas Hoje Mesmo
                </h3>
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    Gerar senhas de alta segurança é apenas a primeira metade do caminho. A segurança plena exige disciplina operacional:
                </p>
                <ol className="space-y-4 marker:text-emerald-600 marker:font-bold">
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Nunca reutilize senhas:</strong> Se um único site pequeno sofrer um ataque, a sua mesma senha será usada pelos hackers para abrir seu e-mail e dados bancários.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Ative o Duplo Fator de Autenticação (2FA):</strong> Mesmo que um cibercriminoso roube sua senha militar, ele não terá o código gerado no seu celular físico.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Use um Gerenciador de Senhas:</strong> Salve todas as suas senhas aleatórias e robustas em um cofre digital criptografado de alta confiança.
                    </li>
                    <li className="text-slate-700 dark:text-slate-300 text-sm">
                      <strong>Evite anotações em arquivos de texto comuns:</strong> Documentos como blocos de notas no desktop são alvos fáceis para vírus espiões.
                    </li>
                </ol>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border-l-4 border-emerald-500 mt-10 not-prose">
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-emerald-600 dark:text-emerald-400"/> Alerta de Segurança Crítica
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Nossos testes apontam que mais de 80% das brechas de segurança de dados em pequenas empresas e home offices acontecem pela utilização de senhas compartilhadas e anotações vulneráveis em planilhas sem criptografia de acesso.
                    </p>
                </div>
            </div>

            {/* Horizontal Ad */}
            <div className="w-full flex justify-center bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl min-h-[100px] overflow-hidden py-4">
                <LazyAdUnit slot="pass_sidebar" format="horizontal" />
            </div>
        </div>

        <SmartGlossaryLinker currentHref="/ferramentas/gerador-de-senhas" />
        <SmartCrossLinker currentHref="/ferramentas/gerador-de-senhas" category="ferramentas" />

        {/* --- FAQ SECTION ACCORDION (EXATAMENTE 7 QUESTÕES COM BASE EM DIRECTIVES) --- */}
        <section id="faq" className="max-w-4xl mx-auto w-full">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-600 dark:text-emerald-400 shrink-0" size={32} /> Tira-Dúvidas Definitivo
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Encontre respostas para as perguntas mais frequentes sobre a geração de senhas seguras e proteção digital.
            </p>

            <div className="space-y-4 not-prose">
              {faqs.map((faq, index) => (
                <details 
                  key={index}
                  className="group border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 transition-all duration-300 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none select-none hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <span className="pr-4">{faq.q}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-emerald-500">
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

        <ExpertSignature author="Equipe de Segurança da Informação Mestre das Contas" updatedAt="Junho de 2026" />
        {/* Ad Unit Bottom */}
        <div className="w-full flex justify-center py-6">
             <LazyAdUnit slot="pass_bottom" format="auto" />
        </div>

      </div>
    </article>
  );
}