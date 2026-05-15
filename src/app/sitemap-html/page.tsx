import { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { 
  Map, Calculator, CreditCard, FileText, Heart, Shield, 
  Briefcase, Activity, Zap, ShoppingBag, Lock, Image as ImageIcon,
  Clock, Percent, Moon, Book
} from 'lucide-react';
import { cardMachineCases } from "@/data/card-machine-pseo";
import { terminationCases } from "@/data/termination-pseo";
import { glossaryData } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Mapa do Site Completo | Mestre das Contas",
  description: "Navegue por todas as ferramentas, calculadoras financeiras, trabalhistas e utilitários do Mestre das Contas em um só lugar.",
  alternates: { canonical: "https://mestredascontas.com.br/sitemap-html" }
};

const salarySlugs = ["1500", "2000", "2500", "3000", "3500", "4000", "5000", "6000", "7000", "8000", "10000", "12000", "15000", "20000"];

export default function SitemapHTMLPage() {
  return (
    <article className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-12">
        <PageHeader 
          title="Mapa Completo do Site"
          description="Encontre todas as nossas ferramentas de produtividade, simuladores financeiros e guias de direitos trabalhistas."
          category="Navegação Geral"
          icon={<Map size={32} className="text-slate-600" />}
          variant="default"
          breadcrumbs={[
            { label: "Navegação", href: "/sitemap-html" },
            { label: "Mapa do Site" }
          ]}
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* --- COLUNA 1: TRABALHISTA --- */}
            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <Briefcase size={16} /> Direitos Trabalhistas
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/trabalhista/rescisao" className="text-sm font-bold hover:text-indigo-600">Rescisão CLT (Geral)</Link></li>
                        <div className="grid grid-cols-1 gap-1 pl-3 border-l border-slate-100 dark:border-slate-800">
                            {terminationCases.map(t => (
                                <li key={t.slug}><Link href={`/trabalhista/rescisao/${t.slug}`} className="text-[11px] text-slate-500 hover:text-indigo-500">{t.reasonLabel}</Link></li>
                            ))}
                        </div>
                        <li><Link href="/trabalhista/ferias" className="text-sm font-bold hover:text-indigo-600">Cálculo de Férias</Link></li>
                        <li><Link href="/trabalhista/decimo-terceiro" className="text-sm font-bold hover:text-indigo-600">13º Salário</Link></li>
                        <li><Link href="/trabalhista/horas-extras" className="text-sm font-bold hover:text-indigo-600">Horas Extras</Link></li>
                        <li><Link href="/trabalhista/horas-trabalhadas" className="text-sm font-bold hover:text-indigo-600">Horas Trabalhadas</Link></li>
                        <li><Link href="/trabalhista/seguro-desemprego" className="text-sm font-bold hover:text-indigo-600">Seguro Desemprego</Link></li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-2 text-rose-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <Heart size={16} /> Saúde & Bem-estar
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/saude/imc" className="text-sm font-bold hover:text-rose-600">Calculadora de IMC</Link></li>
                        <li><Link href="/saude/calorias" className="text-sm font-bold hover:text-rose-600">Calorias Diárias</Link></li>
                        <li><Link href="/ferramentas/fases-da-lua" className="text-sm font-bold hover:text-slate-600 flex items-center gap-2"><Moon size={14}/> Fases da Lua</Link></li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <Book size={16} /> Glossário Estratégico
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/glossario" className="text-sm font-bold hover:text-indigo-600">Dicionário Financeiro A-Z</Link></li>
                        <div className="grid grid-cols-1 gap-1 pl-3 border-l border-slate-100 dark:border-slate-800">
                            {glossaryData.slice(0, 10).map(item => (
                                <li key={item.slug}><Link href={`/glossario/${item.slug}`} className="text-[11px] text-slate-500 hover:text-indigo-500">{item.term}</Link></li>
                            ))}
                            <li><Link href="/glossario" className="text-[11px] font-bold text-indigo-500">Ver todos os 25 termos...</Link></li>
                        </div>
                    </ul>
                </section>
            </div>

            {/* --- COLUNA 2: FINANCEIRO --- */}
            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <Calculator size={16} /> Financeiro & Impostos
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/financeiro/salario-liquido" className="text-sm font-bold hover:text-emerald-600">Salário Líquido 2026</Link></li>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-3 border-l border-slate-100 dark:border-slate-800">
                            {salarySlugs.slice(0, 8).map(s => (
                                <li key={s}><Link href={`/financeiro/salario-liquido/${s}`} className="text-[11px] text-slate-500 hover:text-emerald-500">Líquido de {s}</Link></li>
                            ))}
                        </div>
                        <li><Link href="/financeiro/juros-compostos" className="text-sm font-bold hover:text-emerald-600">Juros Compostos</Link></li>
                        <li><Link href="/financeiro/reforma-tributaria" className="text-sm font-bold hover:text-emerald-600">Simulador Reforma Tributária</Link></li>
                        <li><Link href="/financeiro/calculadora-mei" className="text-sm font-bold hover:text-emerald-600">Calculadora MEI</Link></li>
                        <li><Link href="/financeiro/comparador-salario" className="text-sm font-bold hover:text-emerald-600">Comparador de Salário (CLT vs PJ)</Link></li>
                        <li><Link href="/financeiro/reajuste-aluguel" className="text-sm font-bold hover:text-emerald-600">Reajuste de Aluguel</Link></li>
                        <li><Link href="/financeiro/porcentagem" className="text-sm font-bold hover:text-emerald-600 flex items-center gap-2"><Percent size={14}/> Porcentagem</Link></li>
                        <li><Link href="/financeiro/calculadora-dias-uteis" className="text-sm font-bold hover:text-emerald-600 flex items-center gap-2"><Clock size={14}/> Dias Úteis</Link></li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <CreditCard size={16} /> Maquininhas de Cartão
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/financeiro/simulador-maquininha" className="text-sm font-bold hover:text-blue-600">Simulador de Taxas (Geral)</Link></li>
                        {cardMachineCases.map(c => (
                            <li key={c.slug}><Link href={`/financeiro/simulador-maquininha/${c.slug}`} className="text-[11px] text-slate-500 hover:text-blue-500">Taxas {c.name}</Link></li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* --- COLUNA 3: NEGÓCIOS & TOOLS --- */}
            <div className="space-y-8">
                <section>
                    <div className="flex items-center gap-2 text-violet-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <ShoppingBag size={16} /> Ferramentas de Negócios
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/ferramentas/editor-pdf-online" className="text-sm font-bold hover:text-violet-600">Editor de PDF Grátis</Link></li>
                        <li><Link href="/ferramentas/gerador-recibo" className="text-sm font-bold hover:text-violet-600">Gerador de Recibos</Link></li>
                        <li><Link href="/ferramentas/criador-orcamentos" className="text-sm font-bold hover:text-violet-600">Criador de Orçamentos</Link></li>
                        <li><Link href="/ferramentas/criador-pedidos" className="text-sm font-bold hover:text-violet-600">Gerador de Pedidos</Link></li>
                        <li><Link href="/ferramentas/declaracao-conteudo" className="text-sm font-bold hover:text-violet-600">Declaração de Conteúdo</Link></li>
                        <li><Link href="/ferramentas/gerador-qr-code" className="text-sm font-bold hover:text-violet-600">QR Code Pix</Link></li>
                        <li><Link href="/ferramentas/gerador-link-whatsapp" className="text-sm font-bold hover:text-violet-600">Link para WhatsApp</Link></li>
                        <li><Link href="/ferramentas/conversor-imagem" className="text-sm font-bold hover:text-violet-600 flex items-center gap-2"><ImageIcon size={14}/> Conversor de Imagem</Link></li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-2 text-slate-600 font-bold uppercase tracking-widest text-xs mb-4">
                        <Lock size={16} /> Segurança & Tech
                    </div>
                    <ul className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <li><Link href="/ferramentas/gerador-de-senhas" className="text-sm font-bold hover:text-slate-600">Gerador de Senhas Fortes</Link></li>
                        <li><Link href="/ferramentas/formatador-json" className="text-sm font-bold hover:text-slate-600">Formatador JSON</Link></li>
                        <li><Link href="/ferramentas/gerador-privacidade" className="text-sm font-bold hover:text-slate-600">Gerador de Pol. de Privacidade</Link></li>
                    </ul>
                </section>

                <section>
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
                        <Shield size={16} /> Institucional
                    </div>
                    <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <li><Link href="/para-empresas" className="hover:text-blue-600 font-bold text-slate-700 dark:text-slate-300">Soluções para Empresas (B2B)</Link></li>
                        <li><Link href="/sobre/autor" className="hover:text-blue-600">Quem Somos / Autor</Link></li>
                        <li><Link href="/sobre/metodologia" className="hover:text-blue-600">Metodologia Editorial</Link></li>
                        <li><Link href="/politica-privacidade" className="hover:text-blue-600">Política de Privacidade</Link></li>
                        <li><Link href="/termos-de-uso" className="hover:text-blue-600">Termos de Uso</Link></li>
                    </ul>
                </section>
            </div>

        </div>
      </div>
    </article>
  );
}
