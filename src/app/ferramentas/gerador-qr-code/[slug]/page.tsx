import { promises as fs } from 'fs';
import path from 'path';
import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QRCodeGenerator from "@/components/calculators/QRCodeGenerator";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
import { QrCode, Smartphone, Wifi, CreditCard, Link as LinkIcon, Share2, Printer, CheckCircle2 } from "lucide-react";

// --- TIPAGEM DO JSON ---
type QRCodeCase = {
  slug: string;
  title: string;
  type: string;
  desc: string;
  prefill?: {
    url?: string;
    pixKey?: string;
  };
};

// --- LEITURA DE DADOS ---
async function getCasesData(): Promise<QRCodeCase[]> {
  const filePath = path.join(process.cwd(), 'src/data/qrcode-cases.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

// --- GERAÇÃO ESTÁTICA ---
export async function generateStaticParams() {
  const dados = await getCasesData();
  return dados.map((item) => ({ slug: item.slug }));
}

// --- METADATA DINÂMICA ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dados = await getCasesData();
  const item = dados.find(d => d.slug === slug);

  if (!item) return {};

  return {
    title: `Gerador de QR Code para ${item.title} Grátis | Personalizado`,
    description: `Crie um QR Code para ${item.title} gratuitamente. ${item.desc} Sem validade, sem cadastro e com alta resolução (PNG/SVG).`,
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-qr-code/${slug}` },
    keywords: [`qr code ${item.title}`, `gerar qr code ${item.slug}`, "qr code gratis", "criar qr code pix", "qr code wifi"],
  };
}

// --- COMPONENTE DA PÁGINA ---
export default async function QRCodeCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dados = await getCasesData();
  const item = dados.find(d => d.slug === slug);

  if (!item) notFound();

  // Define ícone dinâmico baseado no tipo
  const getIcon = () => {
      if (item.type === 'whatsapp') return <Smartphone size={32} />;
      if (item.type === 'wifi') return <Wifi size={32} />;
      if (item.type === 'pix') return <CreditCard size={32} />;
      return <QrCode size={32} />;
  }

  return (
    <article className="w-full max-w-full overflow-hidden">
      
      {/* HEADER ESPECÍFICO */}
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={`Gerador de QR Code: ${item.title}`}
          description={item.desc}
          category="Ferramentas Úteis"
          icon={getIcon()}
          variant="default"
          categoryColor="slate"
          breadcrumbs={[
            { label: "Ferramentas", href: "/ferramentas" },
            { label: "Gerador QR Code", href: "/ferramentas/gerador-qr-code" },
            { label: item.title }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 pb-12 max-w-7xl mx-auto">

        <div className="w-full max-w-5xl mx-auto overflow-hidden flex justify-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200/50 min-h-[100px]">
           <AdUnit slot="qr_case_top" format="horizontal" variant="agency" />
        </div>

        {/* FERRAMENTA CONFIGURADA */}
        <section className="scroll-mt-28 w-full max-w-full">
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 rounded-2xl animate-pulse flex items-center justify-center text-slate-400">Carregando Gerador...</div>}>
                {/* AQUI ESTÁ A MÁGICA:
                    Passamos o 'initialType' e 'initialValues' do JSON direto para a ferramenta.
                    Se for /pix, abre na aba Pix. Se for /instagram, abre Link com a URL pré-preenchida.
                */}
                <QRCodeGenerator 
                    initialType={item.type} 
                    initialValues={item.prefill} 
                />
            </Suspense>
        </section>

        {/* CONTEÚDO RICO & CROSS LINKING */}
        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 prose prose-slate prose-sm md:prose-lg max-w-none bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3>Como usar o QR Code para {item.title}?</h3>
                <p>
                    A estratégia de usar QR Codes para <strong>{item.title}</strong> é excelente para converter o mundo físico para o digital. 
                    Ao contrário de digitar uma URL ou número, o escaneamento remove a fricção e leva o usuário direto ao objetivo.
                </p>
                <ul>
                    <li><strong>Sem Validade:</strong> Nossos códigos são estáticos. Crie hoje e use para sempre.</li>
                    <li><strong>Alta Qualidade:</strong> Ideal para imprimir em cardápios, adesivos, cartões de visita ou banners.</li>
                    <li><strong>100% Gratuito:</strong> Não cobramos mensalidade e não exibimos anúncios antes do usuário acessar seu link.</li>
                </ul>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-800 text-sm not-prose flex gap-3 items-start my-6">
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5"/>
                    <div>
                        <strong>Dica Pro:</strong> Após gerar seu código para {item.title}, teste com a câmera do seu celular antes de enviar para a gráfica. Garanta que o contraste (cor escura no fundo claro) esteja bom.
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <LinkIcon size={18}/> Outros Geradores
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {dados.filter(d => d.slug !== slug).slice(0, 10).map((link) => (
                            <Link 
                                key={link.slug} 
                                href={`/ferramentas/gerador-qr-code/${link.slug}`}
                                className="text-xs bg-white hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <Printer size={18}/> Vai imprimir?
                    </h4>
                    <p className="text-sm text-blue-700 mb-3">
                        Nossa ferramenta possui um modo exclusivo de impressão que gera uma plaquinha pronta com o título "{item.title}" e seu código.
                    </p>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Basta clicar em Imprimir</span>
                </div>
            </div>
        </div>

        <div className="w-full flex justify-center my-8 min-h-[250px]">
            <AdUnit slot="qr_case_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}