
import dynamic from 'next/dynamic';
import { Metadata } from "next";
import { 
  Briefcase, 
  TrendingUp, 
  Heart, 
  Wrench,
  ShieldCheck,
  HelpCircle,
  Car
} from "lucide-react";

// --- IMPORTAÇÃO DOS COMPONENTES DE PUBLICIDADE E CTA ---
// Lazy Load para AdUnit (Melhora LCP e TBT) - Agora via wrapper Client Component
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import AgencyCTA from "@/components/layout/AgencyCTA";

// --- IMPORTAÇÃO DOS NOVOS COMPONENTES REFATORADOS ---
import HeroSection from "@/components/home/HeroSection";
import FeaturedTools from "@/components/home/FeaturedTools";
import CalculatorCategory from "@/components/home/CalculatorCategory";

// --- IMPORTAÇÃO DOS DADOS ---
import { laborCards, financeCards, healthCards, toolsCards, vehicleCards } from "@/data/home-cards";

// --- METADATA AVANÇADA PARA SEO ---
export const metadata: Metadata = {
  title: "Mestre das Contas | Calculadoras e Ferramentas Online Grátis",
  description: "Precisa fazer cálculos trabalhistas, simular financiamentos ou gerar recibos? Acesse centenas de ferramentas gratuitas, exatas e 100% seguras. Calcule agora!",
  keywords: ["calculadoras grátis", "ferramentas online", "calculadora rescisão", "calculadora férias", "reforma tributária 2026", "gerador qr code", "mestre das contas", "editor pdf online", "gerador link whatsapp", "calculadora mei"],
  alternates: {
    canonical: "https://mestredascontas.com.br" 
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://mestredascontas.com.br",
    title: "Mestre das Contas | Calculadoras e Ferramentas Online Grátis",
    siteName: "Mestre das Contas",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Mestre das Contas - Ferramentas Online Gratuitas", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mestre das Contas | Centenas de Ferramentas Grátis",
    images: ["/opengraph-image"],
  } 
};

export default function Home() {
  
  // SCHEMA MARKUP (JSON-LD) - Estrutura de WebSite, Organization e FAQPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Mestre das Contas",
        "url": "https://mestredascontas.com.br",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://mestredascontas.com.br/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "description": "Plataforma gratuita de calculadoras e ferramentas digitais para cálculos trabalhistas, financeiros, saúde e utilitários."
      },
      {
        "@type": "Organization",
        "name": "Mestre das Contas",
        "url": "https://mestredascontas.com.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://mestredascontas.com.br/opengraph-image"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://mestredascontas.com.br" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "1. O Mestre das Contas é realmente gratuito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, absolutamente. Todas as nossas ferramentas, calculadoras e geradores de documentos são 100% gratuitos e de uso ilimitado, sem taxas ou cobranças ocultas de qualquer natureza."
            }
          },
          {
            "@type": "Question",
            "name": "2. É seguro inserir meus dados financeiros nas calculadoras?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sim, é totalmente seguro. Desenvolvemos nossa plataforma sob a arquitetura Client-Side (lado do cliente). Isso significa que todas as informações que você digita são processadas de forma local, apenas na memória RAM do seu navegador. Nenhum dada é armazenado em nossos servidores ou compartilhado."
            }
          },
          {
            "@type": "Question",
            "name": "3. Preciso criar uma conta ou fazer cadastro para usar?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Não. Acreditamos na agilidade e na acessibilidade imediata. Você pode usar qualquer ferramenta ou calculadora diretamente, sem a necessidade de fornecer nome, e-mail, telefone ou realizar qualquer tipo de registro."
            }
          },
          {
            "@type": "Question",
            "name": "4. Posso usar as calculadoras em dispositivos móveis ou celulares?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Com certeza. Toda a nossa plataforma foi construída de maneira responsiva e otimizada para dispositivos móveis. Você pode fazer cálculos e até baixar PDFs de recibos e contratos diretamente do seu celular ou tablet."
            }
          },
          {
            "@type": "Question",
            "name": "5. Quem desenvolve e audita as fórmulas das ferramentas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nossa equipe técnica pesquisa e desenvolve os algoritmos com base nas legislações nacionais oficiais (como a CLT e as normas da Receita Federal) e publicações científicas renomadas (como os protocolos de biometria da OMS). Realizamos testes contínuos para garantir precisão absoluta."
            }
          },
          {
            "@type": "Question",
            "name": "6. Como posso reportar um bug ou erro em algum cálculo?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Se você notar qualquer inconsistência ou tiver dúvidas sobre algum resultado obtido, pode entrar em contato conosco pelo e-mail de suporte ou formulário de contato do site, e revisaremos o algoritmo imediatamente."
            }
          },
          {
            "@type": "Question",
            "name": "7. Posso sugerir a criação de uma nova ferramenta?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Será um prazer! Estamos sempre expandindo nossa suíte de ferramentas. Se você precisa de algum cálculo específico no seu dia a dia que ainda não oferecemos, envie sua sugestão de recurso para nossa equipe."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      
      {/* INJEÇÃO DO SCHEMA NO HEAD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* --- HERO SECTION (LCP OTIMIZADO) --- */}
      <HeroSection />

      {/* --- DESTAQUE DUPLO: REFORMA & QR CODE (Grid Moderno) --- */}
      <FeaturedTools />

      {/* --- NAVEGAÇÃO POR CATEGORIAS (ACESSIBILIDADE/UX) --- */}
      <section className="px-4 py-8 max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
           <Briefcase className="text-blue-600" size={24} /> O que você precisa hoje?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            
            {/* CARD 1 - TRABALHISTA */}
            <a href="/trabalhista" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Briefcase size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Trabalhista</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">Rescisão, Férias, 13º</span>
            </a>

            {/* CARD 2 - FINANCEIRO */}
            <a href="/financeiro" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <TrendingUp size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Financeiro</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">Salário, MEI, Juros</span>
            </a>

            {/* CARD 3 - FERRAMENTAS */}
            <a href="/ferramentas" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-violet-50 dark:bg-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Wrench size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Ferramentas</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">PDF, QR Code, Senhas</span>
            </a>

            {/* CARD 4 - SAÚDE */}
            <a href="/saude" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-rose-50 dark:bg-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Heart size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Saúde</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">IMC, Calorias, Água</span>
            </a>

            {/* CARD 5 - VEÍCULOS */}
            <a href="/veiculos" className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform relative z-10">
                    <Car size={28} />
                </div>
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 relative z-10">Veículos</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center relative z-10">Tabela FIPE, Financiamento</span>
            </a>

        </div>
      </section>

      {/* --- PUBLICIDADE (SLOT 1 - ALTA VISIBILIDADE) --- */}
      <section className="max-w-5xl mx-auto px-4 mb-16 min-h-[100px]">
        <div className="w-full flex justify-center bg-slate-50/50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200/50 dark:border-slate-800/50 min-h-[100px]">
            <LazyAdUnit slot="home_top_feed" format="horizontal" variant="agency" className="w-full" />
        </div>
      </section>

      {/* --- CATEGORIAS DE CALCULADORAS --- */}
      <section id="calculadoras" className="pb-16 px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* BLOCO TRABALHISTA */}
          <CalculatorCategory 
            title="Trabalhista"
            description="Garanta seus direitos. Cálculos baseados na CLT."
            icon={<Briefcase size={28}/>}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            linkHref="/trabalhista"
            linkColor="text-blue-600"
            cards={laborCards}
            cols={3}
          />

          {/* --- PUBLICIDADE (SLOT 2 - ENTRE CATEGORIAS) --- */}
          <div className="w-full flex justify-center my-8 min-h-[100px]">
              <LazyAdUnit slot="home_middle_feed" format="horizontal" variant="software" className="w-full" />
          </div>

          {/* BLOCO FINANCEIRO */}
          <CalculatorCategory 
            title="Financeiro"
            description="Planeje seu futuro e proteja seu dinheiro."
            icon={<TrendingUp size={28}/>}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
            linkHref="/financeiro"
            linkColor="text-emerald-600"
            cards={financeCards}
            cols={3}
          />

           {/* BLOCO UTILIDADES (NOVO) */}
           <CalculatorCategory 
            title="Utilidades Digitais"
            description="Ferramentas práticas para o seu dia a dia online."
            icon={<Wrench size={28}/>}
            iconBgColor="bg-violet-100"
            iconColor="text-violet-600"
            linkHref="/ferramentas"
            linkColor="text-violet-600"
            cards={toolsCards}
            cols={4}
          />

          {/* BLOCO SAÚDE */}
          <CalculatorCategory 
            title="Saúde e Bem-estar"
            description="Cuidar de você também é uma conta que precisa fechar."
            icon={<Heart size={28}/>}
            iconBgColor="bg-rose-100"
            iconColor="text-rose-600"
            linkHref="/saude"
            linkColor="text-rose-600"
            cards={healthCards}
            cols={4}
          />

          {/* BLOCO VEÍCULOS (NOVO) */}
          <CalculatorCategory 
            title="Automotivo e Veículos"
            description="Consulte a tabela FIPE oficial e simule financiamentos de automóveis."
            icon={<Car size={28}/>}
            iconBgColor="bg-emerald-100"
            iconColor="text-emerald-600"
            linkHref="/veiculos"
            linkColor="text-emerald-600"
            cards={vehicleCards}
            cols={3}
          />

        </div>
      </section>

      {/* --- CONTEÚDO EDUCACIONAL, TABELA E FAQ --- */}
      <section className="max-w-7xl mx-auto px-4 pb-16 print:hidden">
        <div className="prose prose-slate dark:prose-invert prose-sm md:prose-lg max-w-none bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight flex items-center gap-3">
             <ShieldCheck className="text-emerald-600 dark:text-emerald-500" size={32} /> Cálculos Rápidos, Exatos e 100% Seguros
          </h2>
          <p className="lead text-slate-700 dark:text-slate-300 text-lg mb-6">
             Nós sabemos perfeitamente como regras trabalhistas, taxas de financiamento e conversões digitais podem parecer confusas à primeira vista. A verdade é que ninguém deveria tomar decisões financeiras importantes ou assinar contratos com base em suposições.
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm">
             Foi exatamente para resolver essa fricção que estruturamos o <strong>Mestre das Contas</strong>. Nosso objetivo é democratizar o acesso a simuladores matemáticos avançados, processando todas as regras legais em milissegundos, diretamente no seu navegador. O melhor de tudo? Você não paga nada e seus dados nunca saem do seu dispositivo.
          </p>

          {/* TABELA COMPARATIVA DE CATEGORIAS */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-6">
            Guia de Recursos da Plataforma
          </h3>
          <div className="overflow-x-auto w-full rounded-2xl border border-slate-200 dark:border-slate-800 mb-8">
            <table className="min-w-[600px] w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Recursos Principais</th>
                  <th className="p-4">Foco de Cálculo</th>
                  <th className="p-4">Exemplo de Uso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Trabalhista</td>
                  <td className="p-4">Rescisão CLT, Férias, Décimo Terceiro, Seguro-Desemprego, Horas Extras</td>
                  <td className="p-4">Legislação Trabalhista Brasileira</td>
                  <td className="p-4">Simular rescisão contratual sem justa causa</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Financeiro</td>
                  <td className="p-4">Juros Compostos, SAC/Price, Salário Líquido, MEI, Reforma Tributária</td>
                  <td className="p-4">Matemática Financeira e Tributos</td>
                  <td className="p-4">Comparar parcelas de financiamento de imóvel</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Ferramentas</td>
                  <td className="p-4">Editor PDF, QR Code, Senhas, Encurtadores, Geradores de Contratos/Recibos</td>
                  <td className="p-4">Utilitários e Produtividade Digital</td>
                  <td className="p-4">Assinar PDF ou gerar nota promissória rápida</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Saúde</td>
                  <td className="p-4">Calculadora de IMC, Ingestão de Água, Gasto Calórico, Gestação</td>
                  <td className="p-4">Fórmulas Clínicas e Biometria</td>
                  <td className="p-4">Acompanhar semanas de gestação e DPP</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-200">Veículos</td>
                  <td className="p-4">Tabela FIPE Oficial, Financiamento Veicular, Gerador de Recibo de Compra/Venda</td>
                  <td className="p-4">Avaliação de Mercado e Parcelamentos CDC</td>
                  <td className="p-4">Consultar valor de mercado de um carro ou moto usado</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PERGUNTAS FREQUENTES (FAQ) */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 flex items-center gap-2">
            <HelpCircle className="text-slate-500" size={26} /> Perguntas Frequentes sobre o Portal
          </h3>
          <div className="space-y-4">
            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                1. O Mestre das Contas é realmente gratuito?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim, absolutamente. Todas as nossas ferramentas, calculadoras e geradores de documentos são 100% gratuitos e de uso ilimitado, sem taxas ou cobranças ocultas de qualquer natureza.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                2. É seguro inserir meus dados financeiros nas calculadoras?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Sim, é totalmente seguro. Desenvolvemos nossa plataforma sob a arquitetura Client-Side (lado do cliente). Isso significa que todas as informações que você digita são processadas de forma local, apenas na memória RAM do seu navegador. Nenhum dado é armazenado em nossos servidores ou compartilhado.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                3. Preciso criar uma conta ou fazer cadastro para usar?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Não. Acreditamos na agilidade e na acessibilidade imediata. Você pode usar qualquer ferramenta ou calculadora diretamente, sem a necessidade de fornecer nome, e-mail, telefone ou realizar qualquer tipo de registro.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                4. Posso usar as calculadoras em dispositivos móveis ou celulares?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Com certeza. Toda a nossa plataforma foi construída de maneira responsiva e otimizada para dispositivos móveis. Você pode fazer cálculos e até baixar PDFs de recibos e contratos diretamente do seu celular ou tablet.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                5. Quem desenvolve e audita as fórmulas das ferramentas?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Nossa equipe técnica pesquisa e desenvolve os algoritmos com base nas legislações nacionais oficiais (como a CLT e as normas da Receita Federal) e publicações científicas renomadas (como os protocolos de biometria da OMS). Realizamos testes contínuos para garantir precisão absoluta.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                6. Como posso reportar um bug ou erro em algum cálculo?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Se você notar qualquer inconsistência ou tiver dúvidas sobre algum resultado obtido, pode entrar em contato conosco pelo e-mail de suporte ou formulário de contato do site, e revisaremos o algoritmo imediatamente.
              </div>
            </details>

            <details className="group border-b border-slate-200 dark:border-slate-800 pb-4 cursor-pointer">
              <summary className="font-bold text-slate-800 dark:text-slate-200 flex justify-between items-center list-none p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded select-none">
                7. Posso sugerir a criação de uma nova ferramenta?
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 text-slate-600 dark:text-slate-400 px-2 text-sm leading-relaxed">
                Será um prazer! Estamos sempre expandindo nossa suíte de ferramentas. Se você precisa de algum cálculo específico no seu dia a dia que ainda não oferecemos, envie sua sugestão de recurso para nossa equipe.
              </div>
            </details>
          </div>

        </div>
      </section>

      {/* --- CTA FINAL DA AGÊNCIA (Capture Leads de Desenvolvimento) --- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
         <AgencyCTA />
      </section>

    </div>
  );
}