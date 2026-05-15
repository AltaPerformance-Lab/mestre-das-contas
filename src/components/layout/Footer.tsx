
import React from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Shield, 
  Mail, 
  MessageSquare, 
  Rocket,
  Search,
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';

const megaMenuLinks = [
  {
    category: "Salário Líquido",
    links: [
      { label: "Salário de R$ 1.500", href: "/financeiro/salario-liquido/1500" },
      { label: "Salário de R$ 2.000", href: "/financeiro/salario-liquido/2000" },
      { label: "Salário de R$ 3.000", href: "/financeiro/salario-liquido/3000" },
      { label: "Salário de R$ 5.000", href: "/financeiro/salario-liquido/5000" },
    ]
  },
  {
    category: "Rescisão Trabalhista",
    links: [
      { label: "Sem Justa Causa", href: "/trabalhista/rescisao/sem-justa-causa" },
      { label: "Pedido de Demissão", href: "/trabalhista/rescisao/pedido-de-demissao" },
      { label: "Demissão por Acordo", href: "/trabalhista/rescisao/acordo-comum" },
      { label: "Com Justa Causa", href: "/trabalhista/rescisao/justa-causa" },
    ]
  },
  {
    category: "Reajuste de Aluguel",
    links: [
      { label: "Tabela IGP-M 2026", href: "/financeiro/reajuste-aluguel" },
      { label: "Reajuste pelo IPCA", href: "/financeiro/reajuste-aluguel" },
      { label: "Como Calcular Aluguel", href: "/financeiro/reajuste-aluguel" },
    ]
  },
  {
    category: "Máquinas de Cartão",
    links: [
      { label: "Taxas Ton T3", href: "/financeiro/simulador-maquininha/ton-t3-promo" },
      { label: "Taxas InfinitePay", href: "/financeiro/simulador-maquininha/infinitepay-smart" },
      { label: "Taxas Stone", href: "/financeiro/simulador-maquininha/stone-maquininha" },
      { label: "Taxas PagSeguro", href: "/financeiro/simulador-maquininha/pagseguro-moderninha-pro" },
    ]
  },
  {
    category: "Financiamento",
    links: [
      { label: "Financiar Carros", href: "/financeiro/financiamento-veiculos/simulacao/carro-popular-usado" },
      { label: "Financiar Motos", href: "/financeiro/financiamento-veiculos/simulacao/moto-alta-cilindrada" },
      { label: "Financiar Caminhões", href: "/financeiro/financiamento-veiculos/simulacao/caminhao-leve" },
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
    category: "Ferramentas Úteis",
    links: [
      { label: "Editor de PDF Online", href: "/ferramentas/editor-pdf-online" },
      { label: "Gerador de Pix", href: "/ferramentas/gerador-pix" },
      { label: "Link de WhatsApp", href: "/ferramentas/gerador-link-whatsapp" },
      { label: "Gerador de Senhas", href: "/ferramentas/gerador-de-senhas" },
      { label: "Criar Orçamento", href: "/ferramentas/criador-orcamentos" },
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 overflow-hidden print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* TOP SECTION: BRAND + LINKS */}
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4 space-y-6">
            {/* LOGO RESTAURADA (IGUAL AO HEADER/SIDEBAR) */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
              <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none group-hover:rotate-6 transition-transform">
                <Calculator size={22} strokeWidth={3} />
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                MESTRE <span className="text-blue-600">DAS CONTAS</span>
              </span>
            </Link>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              Ferramentas de precisão para planejamento financeiro, cálculos trabalhistas e simuladores de crédito. Sua bússola no mercado brasileiro em 2026.
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Institucional</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link prefetch={false} href="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Sobre o Portal
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/sobre/autor" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 font-bold">
                  Quem Somos / Autor
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
                <Link prefetch={false} href="/politica-cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/termos-de-uso" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/sobre/metodologia" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  Metodologia
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-xs uppercase tracking-widest">Explore</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link prefetch={false} href="/sitemap-html" className="hover:text-blue-600 transition-colors">Mapa do Site</Link></li>
              <li><Link prefetch={false} href="/fale-conosco" className="hover:text-blue-600 transition-colors">Contato / Imprensa</Link></li>
              <li><Link prefetch={false} href="/glossario" className="hover:text-indigo-600 font-bold hover:translate-x-1 transition-all inline-block">Glossário Estratégico</Link></li>
              <li><Link prefetch={false} href="/para-empresas" className="hover:text-blue-600 transition-colors">Anuncie Conosco</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-600" /> Suporte Técnico
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Encontrou algum erro nos cálculos? Nossa equipe revisa todas as ferramentas semanalmente.
              </p>
              <a 
                href="mailto:contato@mestredascontas.com.br" 
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
              >
                Reportar Bug ou Sugestão <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* MEGA MENU: FREQUENT SEARCHES */}
        <div className="border-y border-slate-100 dark:border-slate-800 py-12 mb-12">
          <div className="flex items-center gap-2 text-slate-400 mb-8 overflow-hidden">
            <Search size={16} className="shrink-0" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Mega Menu de Navegação Rápida</span>
            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full ml-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-8">
            {megaMenuLinks.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-900 dark:text-slate-200 tracking-wider">
                  {section.category}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        prefetch={false} 
                        href={link.href} 
                        className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 mr-2 group-hover:bg-blue-500 transition-colors"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-100 dark:border-slate-800 pt-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              © {currentYear} Mestre das Contas - Todos os direitos reservados
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl italic leading-relaxed">
              As ferramentas deste portal são informativas e baseadas em legislações vigentes. Não substituem assessoria jurídica ou contábil especializada.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  Desenvolvido com <Heart size={12} className="text-red-500 fill-red-500" /> por
                </span>
                <a href="https://alta-performance-web-site.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 group">
                   <span className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">ALTA PERFORMANCE WEB</span>
                   <ExternalLink size={12} className="text-slate-400" />
                </a>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;