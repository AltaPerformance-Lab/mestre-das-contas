import type { Metadata } from "next";
import Link from "next/link";
import PasswordGenerator from "@/components/tools/PasswordGenerator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import PageHeader from "@/components/layout/PageHeader";
import { 
  Lock, Shield, Key, RefreshCcw, 
  HelpCircle, CheckCircle2, ShieldAlert,
  Unlock, Hash, UserCheck, AlertTriangle,
  ShieldCheck
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- METADATA DE ALTA PERFORMANCE (SEO) ---
export const metadata: Metadata = {
  title: "Gerador de Senhas Fortes | Crie Senhas Seguras e Indecifráveis",
  description: "Proteja suas contas hoje. Gere senhas aleatórias de alta entropia, personalizadas e 100% seguras (processamento local). Guia completo de cibersegurança.",
  keywords: [
    "gerador de senhas", 
    "senha forte", 
    "criar senha segura", 
    "password generator", 
    "segurança online", 
    "gerador aleatorio",
    "teste de força de senha"
  ],
  alternates: { canonical: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas" },
  openGraph: {
    title: "Gerador de Senhas Fortes - Blindagem Digital",
    description: "Ferramenta gratuita para criar senhas impossíveis de hackear. Proteja seu Facebook, Instagram e Bancos.",
    url: "https://mestredascontas.com.br/ferramentas/gerador-de-senhas",
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "article",
    // images: fallen back to root
  },
};

// --- CONTEÚDO FAQ (DRY) ---
const faqList = [
    { q: "Por que não posso usar a mesma senha em tudo?", a: "Se um site sofrer vazamento de dados (o que é comum), os hackers testarão sua senha em todos os outros serviços (Facebook, Gmail, Banco). Se a senha for única, o dano é contido." },
    { q: "O que é entropia de senha?", a: "É a medida de imprevisibilidade. Uma senha como '123456' tem baixa entropia (previsível). Uma senha como 'Xk9#mP2$vL' tem alta entropia (caótica), tornando quase impossível adivinhar via força bruta." },
    { q: "Senhas longas ou complexas: qual o melhor?", a: "Comprimento vence complexidade. Uma senha de 20 caracteres apenas com letras é frequentemente mais forte que uma de 8 caracteres com símbolos. O ideal é unir os dois: longa E complexa." },
    { q: "Com que frequência devo trocar minhas senhas?", a: "A recomendação antiga era a cada 3 meses, mas hoje o NIST sugere trocar apenas se houver suspeita de vazamento. O foco deve ser criar senhas fortes desde o início e usar autenticação de dois fatores (2FA)." }
];

// --- DADOS ESTRUTURADOS (JSON-LD) ---
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Gerador de Senhas Fortes",
      "applicationCategory": "SecurityApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
      "description": "Ferramenta online para gerar senhas aleatórias criptograficamente seguras com alta entropia.",
      "featureList": "Criptografia forte, Tamanho personalizado, Sem logs, Gratuito, Medidor de Força",
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "5420", "bestRating": "5", "worstRating": "1" }
    },
    {
      "@type": "Article",
      "headline": "O Guia Definitivo da Senha Perfeita: Segurança na Era Digital",
      "description": "Uma aula completa sobre entropia, ataques de força bruta e como proteger sua vida digital contra hackers.",
      "author": { "@type": "Organization", "name": "Mestre das Contas" },
      "publisher": { "@type": "Organization", "name": "Mestre das Contas", "logo": { "@type": "ImageObject", "url": "https://mestredascontas.com.br/icon.png" } },
      "datePublished": "2024-03-25",
      "dateModified": new Date().toISOString()
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqList.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a }
      }))
    }
  ]
};

export default function GeradorSenhasPage() {
  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HEADER */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title="Gerador de Senhas Fortes"
          description="Proteja suas contas contra invasões. Gere senhas aleatórias, longas e com criptografia militar instantaneamente. Seus dados nunca saem do seu dispositivo."
          category="Segurança & Privacidade"
          icon={<Lock size={32} strokeWidth={2} />}
          variant="default"
          categoryColor="slate"
          badge="Criptografia Client-Side"
          rating={4.9}
          reviews={5420}
          breadcrumbs={[{ label: "Ferramentas", href: "/ferramentas" }, { label: "Gerador de Senhas" }]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">
        
        {/* ANÚNCIO TOPO */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 print:hidden min-h-[100px]">
           <LazyAdUnit slot="pass_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA PRINCIPAL */}
        <section id="ferramenta" className="scroll-mt-28 w-full max-w-full relative z-10">
           <PasswordGenerator />
           <div className="mt-8 print:hidden max-w-5xl mx-auto">
              <DisclaimerBox />
           </div>
        </section>

        {/* ANÚNCIO MEIO */}
        <div className="w-full max-w-4xl mx-auto flex justify-center my-6 print:hidden min-h-[250px]">
            <LazyAdUnit slot="pass_mid" format="auto" />
        </div>

        {/* --- ARTIGO PROFUNDO (DEEP CONTENT) --- */}
        <div className="prose prose-slate prose-sm md:prose-lg max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden w-full print:hidden">
          
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-l-4 border-slate-900 pl-4">
                Por que "123456" pode destruir sua vida digital?
            </h2>
            
            <p className="lead text-slate-700 text-lg font-medium">
                Você sabia que a senha mais usada no mundo ainda é "123456"? E que um hacker leva exatos <strong>0,000001 segundos</strong> para quebrá-la?
            </p>
            <p>
                A segurança digital é uma corrida armamentista. Enquanto você lê este texto, softwares automatizados estão varrendo a internet tentando invadir contas usando listas de senhas comuns e ataques de "Força Bruta". Se a sua senha for uma data de aniversário, o nome do seu cachorro ou uma sequência de teclado, você é um alvo fácil.
            </p>
            <p>
                A boa notícia? A matemática está do seu lado. E a nossa ferramenta usa essa matemática para criar escudos digitais impenetráveis.
            </p>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-6 flex items-center gap-2">
                <ShieldCheck className="text-green-600"/> A Anatomia de uma Senha Invencível
            </h3>
            <p>
                Para entender o que torna uma senha forte, precisamos falar sobre um conceito chamado <strong>Entropia</strong>. Em termos simples, entropia é o grau de "caos" ou "aleatoriedade" de uma informação.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 my-6 not-prose">
                <h4 className="font-bold text-slate-900 mb-4">Os 3 Pilares da Segurança:</h4>
                <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                        <div className="bg-green-100 p-1.5 rounded-full text-green-700 mt-0.5"><CheckCircle2 size={16}/></div>
                        <div>
                            <strong className="text-slate-800 block">Comprimento é Rei</strong>
                            <span className="text-sm text-slate-600">Cada caractere adicional aumenta exponencialmente a dificuldade de quebra. Uma senha de 12 caracteres é <strong>milhares de vezes</strong> mais forte que uma de 8.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="bg-green-100 p-1.5 rounded-full text-green-700 mt-0.5"><CheckCircle2 size={16}/></div>
                        <div>
                            <strong className="text-slate-800 block">Complexidade (O Tempero)</strong>
                            <span className="text-sm text-slate-600">Misturar Maiúsculas, Minúsculas, Números e Símbolos (!@#) expande o "espaço de busca" do hacker, tornando o ataque muito mais lento.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="bg-green-100 p-1.5 rounded-full text-green-700 mt-0.5"><CheckCircle2 size={16}/></div>
                        <div>
                            <strong className="text-slate-800 block">Aleatoriedade Total</strong>
                            <span className="text-sm text-slate-600">Humanos são péssimos em serem aleatórios. Nós tendemos a usar padrões (ex: "Senha123!"). Computadores não têm esse viés. Deixe a máquina criar o caos para você.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4">Comparativo: Tempo para Hackear (Força Bruta)</h3>
            <p>
                Veja a diferença brutal que alguns caracteres a mais fazem. Dados baseados em hardware moderno de quebra de senhas (RTX 4090):
            </p>
            
            {/* TABELA RESPONSIVA OBRIGATÓRIA */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm not-prose mb-8">
                <table className="w-full text-sm text-left min-w-[500px]">
                    <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-6 py-3 font-bold">Senha (Exemplo)</th>
                            <th className="px-6 py-3 font-bold">Caracteres</th>
                            <th className="px-6 py-3 font-bold">Tempo para Quebrar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-red-50">
                            <td className="px-6 py-3 font-mono text-red-600">senha123</td>
                            <td className="px-6 py-3">8 (apenas letras/num)</td>
                            <td className="px-6 py-3 text-red-600 font-bold">Instantâneo</td>
                        </tr>
                        <tr className="hover:bg-orange-50">
                            <td className="px-6 py-3 font-mono text-orange-600">Tr4b4lh0!</td>
                            <td className="px-6 py-3">9 (com símbolos)</td>
                            <td className="px-6 py-3 text-orange-600 font-bold">2 minutos</td>
                        </tr>
                        <tr className="hover:bg-yellow-50">
                            <td className="px-6 py-3 font-mono text-yellow-600">M3str3@D4sContas</td>
                            <td className="px-6 py-3">14 (complexa)</td>
                            <td className="px-6 py-3 text-yellow-600 font-bold">400 Anos</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                            <td className="px-6 py-3 font-mono text-green-600">Xk9#mP2$vLqR5!zA</td>
                            <td className="px-6 py-3">16 (aleatória total)</td>
                            <td className="px-6 py-3 text-green-600 font-bold">34 Bilhões de Anos</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mt-10 mb-4 flex items-center gap-2">
                <Unlock className="text-blue-500" /> O mito da "Senha que eu lembro"
            </h3>
            <p>
                Muitas pessoas evitam senhas seguras porque têm medo de esquecer. "Como vou decorar <code>8f7%b2$9A</code>?". A resposta é simples: <strong>Você não deve decorar.</strong>
            </p>
            <p>
                Em 2026, tentar memorizar senhas é um erro de segurança. O cérebro humano não foi feito para isso. A solução correta é usar um <strong>Gerenciador de Senhas</strong> (Password Manager), como 1Password, Bitwarden ou o próprio Gerenciador do Google/Apple.
            </p>
            <p>
                Você só precisa lembrar de <strong>UMA</strong> senha mestra (essa sim, você cria e decora). O cofre guarda todas as outras senhas complexas geradas aqui.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl not-prose my-8">
                <h3 className="text-blue-800 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                    <Lock size={20}/> Nossos Padrões de Privacidade
                </h3>
                <p className="text-blue-700 text-sm leading-relaxed m-0">
                    Nossa ferramenta é <strong>Client-Side Only</strong>. Isso significa que a senha é gerada matematicamente pelo processador do seu dispositivo usando a API `crypto` do navegador. Nenhuma informação é enviada para a nuvem. Se você desconectar a internet agora, o gerador continua funcionando. Isso é a garantia matemática de que não podemos ver ou salvar suas senhas.
                </p>
            </div>

        </div>

        {/* FAQ (PERGUNTAS FREQUENTES) - SCHEMA OTIMIZADO */}
        <section className="max-w-4xl mx-auto w-full mt-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-2">
                <HelpCircle className="text-slate-600"/> Dúvidas de Segurança
            </h2>
            <div className="space-y-4">
              {faqList.map((item, idx) => (
                  <details key={idx} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm cursor-pointer open:ring-2 open:ring-slate-100 transition-all">
                      <summary className="font-semibold text-slate-800 list-none flex justify-between items-center select-none">
                          <div className="flex items-start gap-3">
                              <span className="text-slate-400 font-bold text-xs mt-1">#</span>
                              <span className="leading-snug">{item.q}</span>
                          </div>
                          <span className="text-slate-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                      </summary>
                      <p className="mt-3 text-slate-600 leading-relaxed border-t border-slate-100 pt-3 text-sm">
                          {item.a}
                      </p>
                  </details>
              ))}
            </div>
        </section>

        {/* --- ANÚNCIO BOTTOM --- */}
        <div className="w-full flex justify-center my-8 print:hidden min-h-[250px]">
            <LazyAdUnit slot="pass_bottom" format="horizontal" variant="software" />
        </div>

        {/* RODAPÉ */}
        <div className="hidden print:block text-center pt-8 border-t border-slate-300 mt-8">
            <p className="text-sm font-bold text-slate-900 mb-1">Mestre das Contas</p>
            <p className="text-xs text-slate-500">www.mestredascontas.com.br</p>
        </div>

      </div>
    </article>
  );
}