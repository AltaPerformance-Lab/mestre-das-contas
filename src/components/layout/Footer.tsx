import Link from "next/link";
import { Calculator, Mail, Shield, FileText, QrCode, Cookie, Rocket } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const megaMenuLinks = [
    {
      category: "Salário Líquido",
      links: [
        { label: "Salário de R$ 1.500", href: "/financeiro/salario-liquido/1500" },
        { label: "Salário de R$ 2.000", href: "/financeiro/salario-liquido/2000" },
        { label: "Salário de R$ 3.000", href: "/financeiro/salario-liquido/3000" },
        { label: "Salário de R$ 5.000", href: "/financeiro/salario-liquido/5000" },
        { label: "Salário de R$ 10.000", href: "/financeiro/salario-liquido/10000" },
      ]
    },
    {
      category: "Rescisão Trabalhista",
      links: [
        { label: "Sem Justa Causa", href: "/trabalhista/rescisao/sem-justa-causa" },
        { label: "Pedido de Demissão", href: "/trabalhista/rescisao/pedido-demissao" },
        { label: "Demissão por Acordo", href: "/trabalhista/rescisao/acordo" },
        { label: "Com Justa Causa", href: "/trabalhista/rescisao/justa-causa" },
      ]
    },
    {
      category: "Reajuste de Aluguel",
      links: [
        { label: "Reajuste pelo IGP-M", href: "/financeiro/reajuste-aluguel/igpm" },
        { label: "Reajuste pelo IPCA", href: "/financeiro/reajuste-aluguel/ipca" },
        { label: "Reajuste pelo INPC", href: "/financeiro/reajuste-aluguel/inpc" },
      ]
    },
    {
      category: "Simular Financiamento",
      links: [
        { label: "Financiamento de Carros", href: "/financeiro/financiamento-veiculos/simulacao/carros" },
        { label: "Financiamento de Motos", href: "/financeiro/financiamento-veiculos/simulacao/motos" },
        { label: "Financiamento de Caminhões", href: "/financeiro/financiamento-veiculos/simulacao/caminhoes" },
      ]
    },
    {
      category: "Máquinas de Cartão",
      links: [
        { label: "Simulador InfinitePay", href: "/financeiro/simulador-maquininha/infinitepay" },
        { label: "Simulador Stone", href: "/financeiro/simulador-maquininha/stone" },
        { label: "Simulador Ton", href: "/financeiro/simulador-maquininha/ton" },
        { label: "Simulador PagBank", href: "/financeiro/simulador-maquininha/pagbank" },
        { label: "Todas as Marcas", href: "/financeiro/simulador-maquininha" },
      ]
    },
    {
      category: "Ferramentas PDF",
      desktopOnly: true,
      links: [
        { label: "Editor de PDF Online", href: "/ferramentas/editor-pdf-online" },
        { label: "Recibo de Aluguel", href: "/ferramentas/gerador-recibo/aluguel" },
        { label: "Recibo de Serviços", href: "/ferramentas/gerador-recibo/prestacao-servicos" },
      ]
    },
    {
      category: "Glossário A-Z",
      links: [
        { label: "FGTS: Guia Completo", href: "/glossario/fgts-fundo-de-garantia" },
        { label: "MEI: Regras 2026", href: "/glossario/mei-microempreendedor-individual" },
        { label: "IVA: Reforma Tributária", href: "/glossario/iva-dual-reforma-tributaria" },
        { label: "Juros Compostos", href: "/glossario/juros-compostos-o-que-e" },
        { label: "Ver Todos os Termos", href: "/glossario" },
      ]
    },
    {
      category: "Soluções B2B",
      links: [
        { label: "Calculadoras para Sites", href: "/para-empresas" },
        { label: "Simuladores White Label", href: "/para-empresas" },
        { label: "Consultoria pSEO", href: "/para-empresas" },
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 mt-auto z-10 relative print:hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* COLUNA 1: Marca e Sobre */}
          <div className="lg:col-span-3 space-y-6">
            <Link prefetch={false} href="/" className="inline-flex items-center gap-2 group" aria-label="Mestre das Contas Home">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:bg-blue-700 transition-colors">
                <Calculator size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100 tracking-tight">
                Mestre das <span className="text-blue-600 dark:text-blue-500">Contas</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm text-pretty">
              Simplificamos a matemática da vida real. Ferramentas gratuitas, precisas e atualizadas para você tomar as melhores decisões financeiras com segurança.
            </p>
          </div>

          {/* COLUNA 2: Calculadoras Populares */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Mais Acessadas</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link prefetch={false} href="/financeiro/salario-liquido" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Salário Líquido 2026</Link></li>
              <li><Link prefetch={false} href="/ferramentas/gerador-qr-code" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-flex items-center gap-2"><QrCode size={14} className="text-blue-500 dark:text-blue-400"/> Gerador de QR Code</Link></li>
              <li><Link prefetch={false} href="/trabalhista/rescisao" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Rescisão CLT</Link></li>
              <li><Link prefetch={false} href="/trabalhista/ferias" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block">Calculadora de Férias</Link></li>
              <li><Link prefetch={false} href="/financeiro/simulador-maquininha" className="hover:text-blue-600 dark:hover:text-blue-400 hover:translate-x-1 transition-all inline-block font-bold text-indigo-600">Simulador de Maquininhas</Link></li>
            </ul>
          </div>

          {/* COLUNA 3: Categorias */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link prefetch={false} href="/trabalhista" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Trabalhista</Link></li>
              <li><Link prefetch={false} href="/financeiro" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Financeiro & Investimentos</Link></li>
              <li><Link prefetch={false} href="/saude" className="hover:text-blue-600 hover:translate-x-1 transition-all inline-block">Saúde e Bem-estar</Link></li>
              <li><Link prefetch={false} href="/glossario" className="hover:text-indigo-600 font-bold hover:translate-x-1 transition-all inline-block">Glossário Estratégico</Link></li>
              <li>
                <Link prefetch={false} href="/sobre/metodologia" className="hover:text-indigo-600 hover:translate-x-1 transition-all inline-flex items-center gap-2">
                  Metodologia de Cálculo <span className="text-[9px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 px-1.5 py-0.5 rounded-full uppercase tracking-wide border border-indigo-200 dark:border-indigo-800">E-E-A-T</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 4: Institucional (ATUALIZADA) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Institucional</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link prefetch={false} href="/sobre/autor" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 font-bold">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/para-empresas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 font-bold">
                  <Rocket size={14} className="text-indigo-500" /> Soluções B2B
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/politica-privacidade" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <Shield size={14} className="text-slate-400" /> Privacidade
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/sobre/metodologia" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Transparência Editorial
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/termos-de-uso" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  <FileText size={14} className="text-slate-400" /> Termos de Uso
                </Link>
              </li>
              <li>
                <a href="mailto:contato@mestredascontas.com.br" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2" title="contato@mestredascontas.com.br">
                  <Mail size={14} className="text-slate-400 shrink-0" /> <span>contato@mestredascontas.com.br</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* MEGA-MENU: pSEO Hub (SEO Técnico) */}
        <div className="border-t border-slate-100 dark:border-slate-800/50 pt-8 mt-8 mb-8">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6 text-xs uppercase tracking-widest text-center">Buscas Frequentes</h3>
          
          {/* Mobile Accordion & Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 text-xs text-slate-500 dark:text-slate-400">
            {megaMenuLinks.map((menu, idx) => (
              <div key={idx} className={menu.desktopOnly ? "hidden lg:block" : ""}>
                
                {/* Mobile View (Accordion) */}
                <details className="md:hidden group border-b border-slate-100 dark:border-slate-800/50 pb-2 mb-2">
                  <summary className="font-semibold text-slate-700 dark:text-slate-300 py-2 cursor-pointer flex justify-between items-center list-none [&::-webkit-details-marker]:hidden">
                    {menu.category}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <ul className="space-y-2 pt-2 pb-2 pl-2 border-l border-slate-100 dark:border-slate-800 ml-1">
                    {menu.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link prefetch={false} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>

                {/* Desktop View (Static List) */}
                <ul className="hidden md:block space-y-2">
                  <li className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{menu.category}</li>
                  {menu.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link prefetch={false} href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>&copy; {currentYear} Mestre das Contas. Todos os direitos reservados.</p>
            <Link href="/sitemap-html" className="hover:text-blue-600 transition-colors">Mapa do Site</Link>
          </div>
          
          <div className="flex items-center gap-4">
             <p className="flex items-center gap-1.5">
               Desenvolvido com <span className="text-red-500 animate-pulse">❤</span> por 
               <a 
                 href="https://alta-performance-web-site.vercel.app" 
                 target="_blank" 
                 rel="noopener noreferrer nofollow" 
                 className="font-bold text-slate-600 hover:text-blue-600 transition-colors"
                 aria-label="Agência Alta Performance Web"
               >
                 Alta Performance Web
               </a>
             </p>
          </div>
        </div>
      </footer>
  );
}