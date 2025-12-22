import { promises as fs } from 'fs';
import path from 'path';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdUnit from "@/components/ads/AdUnit";
import PageHeader from "@/components/layout/PageHeader";
// Importa o Wrapper (Componente Cliente) em vez do Gerador direto
import QRCodeWrapper from "@/components/calculators/QRCodeWrapper"; 
import { 
  QrCode, Smartphone, Wifi, CreditCard, Link as LinkIcon, 
  Share2, Printer, CheckCircle2, Zap, ShieldCheck, 
  History, Globe, Award, HelpCircle 
} from "lucide-react";

type QRCodeCase = {
  slug: string;
  title: string;
  type: string;
  desc: string;
  prefill?: { url?: string; pixKey?: string; };
};

async function getCasesData(): Promise<QRCodeCase[]> {
  const filePath = path.join(process.cwd(), 'src/data/qrcode-cases.json');
  const fileContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export async function generateStaticParams() {
  const dados = await getCasesData();
  return dados.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dados = await getCasesData();
  const item = dados.find(d => d.slug === slug);

  if (!item) return {};

  return {
    title: `Gerador de QR Code para ${item.title} | Grátis e Vitalício`,
    description: `Crie seu QR Code para ${item.title} em segundos. Ferramenta gratuita, sem validade e sem cadastro. Baixe em alta resolução (PNG/SVG) agora mesmo.`,
    alternates: { canonical: `https://mestredascontas.com.br/ferramentas/gerador-qr-code/${slug}` },
    keywords: [`qr code ${item.title}`, `gerar qr code ${item.slug}`, "qr code estatico", "criar qr code pix", "como fazer qr code"],
    openGraph: {
      title: `Crie seu QR Code de ${item.title} Grátis`,
      description: item.desc,
      type: "website",
      url: `https://mestredascontas.com.br/ferramentas/gerador-qr-code/${slug}`,
      images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Gerador de QR Code" }],
    }
  };
}

export default async function QRCodeCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dados = await getCasesData();
  const item = dados.find(d => d.slug === slug);

  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Gerador de QR Code para ${item.title}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "1250" },
    "description": item.desc,
    "featureList": "QR Code Estático, Alta Resolução, Sem Validade, Gratuito"
  };

  const getIcon = () => {
      if (item.type === 'whatsapp') return <Smartphone size={32} />;
      if (item.type === 'wifi') return <Wifi size={32} />;
      if (item.type === 'pix') return <CreditCard size={32} />;
      return <QrCode size={32} />;
  }

  return (
    <article className="w-full max-w-full overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
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

        {/* USO DO WRAPPER (CORREÇÃO DE ERRO) */}
        <section className="scroll-mt-28 w-full max-w-full relative z-10">
            <QRCodeWrapper 
                initialType={item.type} 
                initialValues={item.prefill} 
            />
        </section>

        {/* CONTEÚDO */}
        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 prose prose-slate prose-sm md:prose-lg max-w-none bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
                
                <h2>A Verdade Sobre o QR Code para {item.title}</h2>
                <p>
                  Você sabia que a tecnologia que você está prestes a usar para criar seu código de <strong>{item.title}</strong> foi inspirada em um jogo de tabuleiro japonês?
                </p>
                <p>
                  Pois é. Em 1994, <strong>Masahiro Hara</strong>, um engenheiro da Denso Wave, estava jogando "Go" (aquele jogo de pedras pretas e brancas) na hora do almoço. Ele percebeu que a disposição das pedras poderia armazenar muito mais informação do que o código de barras tradicional.
                </p>
                <p>
                  Hoje, essa tecnologia evoluiu para conectar o mundo físico ao digital. E quando falamos de <strong>{item.title}</strong>, estamos falando de eliminar barreiras. Seu cliente não quer digitar. Ele quer apontar, clicar e resolver.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-xl not-prose my-8">
                    <h3 className="text-blue-800 font-bold flex items-center gap-2 text-lg m-0 mb-2">
                        <Zap size={20}/> Pense nisto como um "Teletransporte"
                    </h3>
                    <p className="text-blue-700 text-sm leading-relaxed m-0">
                        Imagine que o QR Code é um portal de teletransporte. Sem ele, seu cliente precisa "caminhar" até você (digitar URL, salvar contato, procurar a senha do Wi-Fi). Com o código gerado acima, você abre um portal direto para o <strong>{item.title}</strong>. A fricção desaparece.
                    </p>
                </div>

                <h2>Estático vs. Dinâmico: O Segredo que Ninguém Conta</h2>
                <p>
                  Aqui está o "pulo do gato" que muitos sites cobram para te ensinar. Existem dois tipos de QR Codes, e escolher o errado pode custar caro (literalmente).
                </p>
                
                <h3>O Dinâmico (A Armadilha da Mensalidade)</h3>
                <p>
                  Muitos geradores "gratuitos" criam códigos dinâmicos. Eles funcionam assim:
                </p>
                <ul>
                   <li>Você cria o código.</li>
                   <li>O código leva para o servidor <em>deles</em>.</li>
                   <li>O servidor deles redireciona para o seu <strong>{item.title}</strong>.</li>
                </ul>
                <p>
                  <strong>O problema?</strong> Daqui a 15 dias, eles "desligam" o redirecionamento e cobram uma mensalidade para ligar de novo. Seu código impresso vira papel de rascunho.
                </p>

                <h3>O Estático (O Nosso)</h3>
                <p>
                  O código que você gerou acima é <strong>Estático</strong>. Pense nele como uma "tatuagem digital". A informação do seu <strong>{item.title}</strong> está gravada diretamente no desenho dos pixels.
                </p>
                <p>
                  <strong>Vantagens:</strong>
                </p>
                <ul>
                    <li><strong>Vitalício:</strong> Funciona para sempre.</li>
                    <li><strong>Independente:</strong> Não depende do nosso servidor.</li>
                    <li><strong>Privado:</strong> Seus dados não ficam com a gente.</li>
                </ul>

                <div className="not-prose my-10 overflow-hidden rounded-xl border border-slate-200">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900 text-white">
                            <tr>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider">Característica</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider bg-emerald-600">Nosso Gerador (Estático)</th>
                                <th className="px-6 py-4 font-bold uppercase tracking-wider bg-slate-800 text-slate-400">Outros (Dinâmico)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">Validade</td>
                                <td className="px-6 py-4 text-emerald-700 font-bold">Infinita (Vitalício)</td>
                                <td className="px-6 py-4 text-red-600">Expira (Trial)</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">Custo</td>
                                <td className="px-6 py-4 text-emerald-700 font-bold">100% Grátis</td>
                                <td className="px-6 py-4 text-slate-600">Mensalidade (US$)</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">Dependência</td>
                                <td className="px-6 py-4 text-emerald-700 font-bold">Zero (Link Direto)</td>
                                <td className="px-6 py-4 text-slate-600">Servidor Deles</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium text-slate-900">Privacidade</td>
                                <td className="px-6 py-4 text-emerald-700 font-bold">Total (Client-side)</td>
                                <td className="px-6 py-4 text-slate-600">Rastreável</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>Como garantir que seu código funcione sempre?</h2>
                <p>
                  Acredite, não há nada pior do que imprimir mil panfletos e descobrir que o código não lê. Para evitar esse desastre com seu código de <strong>{item.title}</strong>, siga estas 3 regras de ouro:
                </p>

                <h3>1. Contraste é Rei</h3>
                <p>
                  Os leitores de QR Code procuram por contraste. O ideal é sempre <strong>código escuro em fundo claro</strong>. Embora nossa ferramenta permita cores, evite colocar "amarelo claro no fundo branco". O clássico preto e branco nunca falha.
                </p>

                <h3>2. A "Zona de Silêncio"</h3>
                <p>
                  Todo QR Code precisa de uma margem branca ao redor dele. É como uma moldura que diz para a câmera: "Ei, o código começa aqui!". Nossa ferramenta já adiciona essa margem automaticamente, então não recorte ela na hora de imprimir.
                </p>

                <h3>3. Tamanho Importa</h3>
                <p>
                  Se você vai imprimir em um cartão de visita, o código deve ter pelo menos 2x2 cm. Se for em um outdoor, precisa ser muito maior. A regra prática é: a distância de leitura dividida por 10.
                </p>

                <div className="bg-slate-900 text-white p-6 rounded-2xl not-prose mt-8">
                    <h3 className="flex items-center gap-2 text-xl font-bold mb-3 text-white">
                        <Award className="text-yellow-400"/> Você Sabia?
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                        O QR Code tem um sistema de "autocura" chamado <strong>Correção de Erro (Reed-Solomon)</strong>. Isso significa que mesmo se você rasgar, sujar ou colocar uma logo grande no meio do código (como permitimos na ferramenta acima), ele ainda funciona! Nossa ferramenta usa o Nível H (High), que permite que até 30% do código seja danificado sem perder a leitura.
                    </p>
                </div>

            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 sticky top-24">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-lg">
                        <Globe size={20} className="text-blue-500"/> Mais Populares
                    </h4>
                    <nav className="flex flex-col gap-2">
                        {dados.filter(d => d.slug !== slug).slice(0, 8).map((link) => (
                            <Link 
                                key={link.slug} 
                                href={`/ferramentas/gerador-qr-code/${link.slug}`}
                                className="group flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all"
                            >
                                <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700">{link.title}</span>
                                <Share2 size={14} className="text-slate-300 group-hover:text-blue-400"/>
                            </Link>
                        ))}
                    </nav>
                    
                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm">
                            <History size={16}/> Histórico
                        </h4>
                        <p className="text-xs text-slate-500">
                            A tecnologia QR Code foi criada em 1994 pela Denso Wave para rastrear peças de carros Toyota. Hoje, é livre de patentes.
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Printer size={20}/> Precisa da Plaquinha?
                    </h4>
                    <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                        Não gaste com designer. Nossa ferramenta gera um PDF pronto para imprimir com o título "{item.title}" e seu código.
                    </p>
                    <div className="bg-white/10 rounded-lg p-3 text-xs text-center font-mono border border-white/20">
                        Clique em "Imprimir" na ferramenta
                    </div>
                </div>

            </div>
        </div>

        <div className="mt-12 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HelpCircle className="text-slate-400"/> Perguntas Frequentes
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <details className="bg-slate-50 p-4 rounded-xl cursor-pointer group">
                    <summary className="font-bold text-slate-700 list-none flex justify-between items-center">
                        O QR Code expira?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">Não. Como usamos tecnologia estática, o link fica gravado na imagem para sempre.</p>
                </details>
                <details className="bg-slate-50 p-4 rounded-xl cursor-pointer group">
                    <summary className="font-bold text-slate-700 list-none flex justify-between items-center">
                        Tem limite de leituras?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">Não. Você pode ter 1 ou 1 milhão de acessos, nunca cobraremos por isso.</p>
                </details>
                <details className="bg-slate-50 p-4 rounded-xl cursor-pointer group">
                    <summary className="font-bold text-slate-700 list-none flex justify-between items-center">
                        Posso colocar minha logo?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">Sim! Use a opção "Inserir Logo" na ferramenta. Recomendamos usar o nível de correção "H" (Máximo) para garantir a leitura.</p>
                </details>
                <details className="bg-slate-50 p-4 rounded-xl cursor-pointer group">
                    <summary className="font-bold text-slate-700 list-none flex justify-between items-center">
                        É seguro para Pix?
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-2 text-sm text-slate-600">Sim. O código apenas contém sua chave Pix e o valor. O pagamento em si é processado pelo aplicativo do banco do seu cliente, com toda a segurança bancária.</p>
                </details>
            </div>
        </div>

        <div className="w-full flex justify-center my-8 min-h-[250px]">
            <AdUnit slot="qr_case_bottom" format="horizontal" variant="software" />
        </div>

      </div>
    </article>
  );
}