import Link from "next/link";
import { Book, Briefcase, TrendingUp, Landmark, Coins, ArrowRight } from "lucide-react";
import { glossaryData } from "@/data/glossary";

interface SmartGlossaryLinkerProps {
  currentHref: string;
  relatedSlugs?: string[];
  maxItems?: number;
  category?: string;
}

function deterministicShuffle<T>(array: T[], seedStr: string): T[] {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = seedStr.charCodeAt(i) + ((seed << 5) - seed);
  }
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const random = Math.abs(seed / 233280);
    const j = Math.floor(random * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SmartGlossaryLinker({ currentHref, relatedSlugs, maxItems = 4, category }: SmartGlossaryLinkerProps) {
  const dynamicGlossaryCards = glossaryData.map(item => {
    let icon = Book;
    if (item.category === "trabalhista") icon = Briefcase;
    else if (item.category === "financeiro") icon = TrendingUp;
    else if (item.category === "fiscal") icon = Landmark;
    else if (item.category === "empreendedorismo") icon = Coins;

    return {
      href: `/glossario/${item.slug}`,
      title: item.term.split(" (")[0],
      desc: item.definition,
      icon: icon,
      theme: "slate" as const
    };
  });

  let glossaryDataList = dynamicGlossaryCards;
  if (relatedSlugs && relatedSlugs.length > 0) {
    glossaryDataList = dynamicGlossaryCards.filter(item => relatedSlugs.includes(item.href.split("/").pop() || ""));
  } else {
    const pagePath = currentHref.toLowerCase();
    const keywordsMapping: { [key: string]: string[] } = {
      fgts: ["fgts-fundo-de-garantia", "saque-aniversario-fgts"],
      demissao: ["fgts-fundo-de-garantia", "dsr-descanso-semanal-remunerado", "aviso-previo-trabalhista", "seguro-desemprego-clt"],
      rescisao: ["fgts-fundo-de-garantia", "dsr-descanso-semanal-remunerado", "aviso-previo-trabalhista", "seguro-desemprego-clt", "saldo-de-salario-rescisao"],
      ferias: ["abono-pecuniario-venda-ferias", "ferias-proporcionais-calculo"],
      decimo: ["decimo-terceiro-proporcional"],
      salario: ["dsr-descanso-semanal-remunerado", "mei-microempreendedor-individual", "pro-labore-salario-socio", "piso-salarial-profissional"],
      liquido: ["dsr-descanso-semanal-remunerado", "irrf-imposto-de-renda", "inss-previdencia-social"],
      horas: ["dsr-descanso-semanal-remunerado", "sistema-sexagesimal-soma-horas", "cartao-de-ponto-jornada"],
      mei: ["mei-microempreendedor-individual", "pro-labore-salario-socio"],
      aluguel: ["inflacao-ipca-igpm", "taxa-selic-o-que-e"],
      juros: ["juros-compostos-o-que-e", "taxa-selic-o-que-e"],
      financiamento: ["juros-compostos-o-que-e", "taxa-selic-o-que-e", "amortizacao-price-sac", "saldo-devedor-financiamento", "cet-custo-efetivo-total"],
      veiculo: ["tabela-fipe-o-que-e", "cet-custo-efetivo-total", "saldo-devedor-financiamento", "amortizacao-price-sac"],
      fipe: ["tabela-fipe-o-que-e"],
      tributaria: ["iva-dual-reforma-tributaria", "cashback-de-imposto-reforma"],
      imposto: ["iva-dual-reforma-tributaria", "irrf-imposto-de-renda", "inss-previdencia-social", "cashback-de-imposto-reforma"],
      maquininha: ["mdr-taxa-da-maquininha", "antecipacao-de-recebiveis-negocios", "antecipacao-de-vendas-maquininhas"],
      conteudo: ["declaracao-de-conteudo-correios", "mei-microempreendedor-individual"],
      contrato: ["contrato-de-prestacao-de-servicos", "mei-microempreendedor-individual"],
      orcamento: ["contrato-de-prestacao-de-servicos", "capital-de-giro-negocios", "fluxo-de-caixa-empresa"],
      pedido: ["fluxo-de-caixa-empresa", "capital-de-giro-negocios"],
      imagem: ["webp-formato-imagem", "compressao-de-imagens-web"],
      "qr-code": ["qr-code-estatico-dinamico"],
      qrcode: ["qr-code-estatico-dinamico"],
      whatsapp: ["api-whatsapp-links-diretos"],
      senha: ["criptografia-senhas-hash"],
      lua: ["fases-da-lua-calendario-lunar"],
      pdf: ["pdf-a-padrao-arquivamento", "assinatura-digital-documentos"]
    };

    const matchedSlugs: string[] = [];
    Object.keys(keywordsMapping).forEach(keyword => {
      if (pagePath.includes(keyword)) {
        matchedSlugs.push(...keywordsMapping[keyword]);
      }
    });

    const uniqueMatchedSlugs = Array.from(new Set(matchedSlugs));
    if (uniqueMatchedSlugs.length > 0) {
      glossaryDataList = dynamicGlossaryCards.filter(item => uniqueMatchedSlugs.includes(item.href.split("/").pop() || ""));
    } else {
      if (pagePath.includes("/trabalhista")) {
        glossaryDataList = dynamicGlossaryCards.filter(item => item.href.includes("fgts") || item.href.includes("dsr") || item.href.includes("ferias") || item.href.includes("abono") || item.href.includes("salario") || item.href.includes("trabalhista") || item.href.includes("ponto") || item.href.includes("clt") || item.href.includes("salarial"));
      } else if (pagePath.includes("/financeiro")) {
        glossaryDataList = dynamicGlossaryCards.filter(item => item.href.includes("juros") || item.href.includes("selic") || item.href.includes("inflacao") || item.href.includes("amortizacao") || item.href.includes("devedor") || item.href.includes("cet") || item.href.includes("maquininha"));
      } else if (pagePath.includes("/veiculos")) {
        glossaryDataList = dynamicGlossaryCards.filter(item => item.href.includes("fipe") || item.href.includes("cet") || item.href.includes("devedor") || item.href.includes("amortizacao") || item.href.includes("selic"));
      } else if (pagePath.includes("/ferramentas")) {
        glossaryDataList = dynamicGlossaryCards.filter(item => item.href.includes("mei") || item.href.includes("prestacao-de-servicos") || item.href.includes("caixa") || item.href.includes("giro") || item.href.includes("recebiveis") || item.href.includes("conteudo") || item.href.includes("pro-labore") || item.href.includes("maquininha"));
      } else {
        glossaryDataList = dynamicGlossaryCards;
      }
    }
  }

  const recommendedGlossary = deterministicShuffle(
    glossaryDataList.filter(tool => !currentHref.startsWith(tool.href)),
    currentHref
  ).slice(0, maxItems);

  if (recommendedGlossary.length === 0) return null;

  return (
    <aside aria-label="Termos relacionados do glossário" className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 print:hidden not-prose">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Book size={22} className="text-slate-500" /> Termos do Glossário Relacionados
      </h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedGlossary.map((tool, index) => {
          const IconComponent = tool.icon;
          
          return (
            <Link key={index} href={tool.href} className="block group">
              <div className="h-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1 hover:border-indigo-500 dark:hover:border-indigo-500">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors bg-indigo-100 dark:bg-indigo-900/30 group-hover:bg-indigo-500">
                  <IconComponent size={20} className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1 flex items-center justify-between">
                  {tool.title}
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500" />
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-2">
                  {tool.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
