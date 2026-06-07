import { Suspense } from 'react';
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NetSalaryCalculator from "@/components/calculators/SalaryCalculator";
import LazyAdUnit from "@/components/ads/LazyAdUnit";
import PageHeader from "@/components/layout/PageHeader";
import PrivacyBadge from "@/components/ui/PrivacyBadge";
import DisclaimerBox from "@/components/ui/DisclaimerBox";
import SmartCrossLinker from "@/components/layout/SmartCrossLinker";
import SmartGlossaryLinker from "@/components/layout/SmartGlossaryLinker";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { Coins, CheckCircle2, TrendingDown, Briefcase, HelpCircle, ArrowLeft, ShieldCheck, FileText, Landmark, Info } from "lucide-react";
import ExpertSignature from "@/components/ui/ExpertSignature";
import fs from 'fs';
import path from 'path';
import { calculateSalary } from "@/lib/calculators/salary";

// --- DADOS PSEO DINÂMICOS ---
export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/salarios.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const salarios = JSON.parse(fileContent);
    return salarios.map((item: any) => ({
      valor: String(item.valor || item.slug)
    }));
  } catch (error) {
    return [{ valor: "1500" }, { valor: "2000" }, { valor: "3000" }];
  }
}

type Props = { params: Promise<{ valor: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",", "."));
  
  if (isNaN(salarioNum)) return {};

  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);
  const calculated = calculateSalary(salarioNum);
  const liquidoStr = calculated ? calculated.liquido : "";

  const title = `Salário Líquido de ${formatado} em 2026: Receba ${liquidoStr}`;
  const description = `Qual o salário líquido de ${formatado} em 2026? Veja o cálculo exato com desconto de INSS, IRRF e saiba quanto cai na sua conta: ${liquidoStr} líquidos.`;

  return {
    title,
    description,
    keywords: [`salario liquido ${valor}`, `calcular salario ${valor}`, "desconto inss 2026", "irrf 2026", "calculadora salario liquido", `liquido de ${valor}`],
    alternates: {
        canonical: `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`
    },
    openGraph: {
        title,
        description,
        url: `https://mestredascontas.com.br/financeiro/salario-liquido/${valor}`,
        type: "article"
    }
  };
}

function getAnalysis(valor: number) {
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
    const salariosMinimos = (valor / 1500).toFixed(1); 
    
    let inssEstimado = 0;
    if (valor <= 1412) inssEstimado = valor * 0.075;
    else if (valor <= 2666.68) inssEstimado = 105.9 + ((valor - 1412) * 0.09);
    else if (valor <= 4000.03) inssEstimado = 105.9 + 112.92 + ((valor - 2666.68) * 0.12);
    else if (valor <= 7786.02) inssEstimado = 105.9 + 112.92 + 160 + ((valor - 4000.03) * 0.14);
    else inssEstimado = 908.85;

    const inssFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(inssEstimado);
    
    let analise = {
      text: "",
      alert: "",
      color: "emerald",
      power: "",
      tips: [] as string[],
      inssText: `A contribuição previdenciária estimada (INSS) sobre o seu salário de ${formatado} é de aproximadamente ${inssFormat}.`
    };
    
    if (valor <= 1500) {
      analise.text = `Recebendo ${formatado}, este valor está próximo ao Piso Nacional de 2026. A vantagem é que o desconto do INSS é mínimo e você está <strong>100% isento de IR</strong>.`;
      analise.alert = "Descontos Mínimos";
      analise.color = "emerald";
      analise.power = "Básico";
      analise.tips = ["Evite dívidas de cartão.", "Busque contas digitais gratuitas.", "Planeje um orçamento realista baseando-se no valor líquido real."];
    } else if (valor <= 2800) {
      analise.text = `Você recebe cerca de ${salariosMinimos} salários mínimos. Até este patamar, você provavelmente ainda está <strong>Isento de IRRF</strong>.`;
      analise.alert = "Isento de IRRF";
      analise.color = "blue";
      analise.power = "Estabilidade";
      analise.tips = ["Comece sua reserva de emergência.", "Poupe R$ 100 por mês.", "Monitore descontos opcionais que impactam seu orçamento."];
    } else {
      analise.text = `Com ${formatado}, o Imposto de Renda Retido na Fonte (IRRF) já aparece no seu holerite mensal.`;
      analise.alert = "Tributação Ativa";
      analise.color = "amber";
      analise.power = "Ascendente";
      analise.tips = ["Declare dependentes no RH.", "Guarde notas fiscais médicas.", "Avalie um plano de previdência complementar PGBL para dedução fiscal."];
    }
    
    return analise;
}

export default async function SalarioPorValorPage({ params }: Props) {
  const { valor } = await params;
  const salarioNum = parseFloat(valor.replace(",", "."));
  if (isNaN(salarioNum)) notFound();

  const calculated = calculateSalary(salarioNum);
  if (!calculated) notFound();

  const analysis = getAnalysis(salarioNum);
  const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(salarioNum);
  const salariosMinimos = (salarioNum / 1500).toFixed(1);

  // Pergunta e Respostas para o FAQ
  const faqs = [
    {
      q: `Quanto sobra de um salário bruto de R$ ${valor}?`,
      a: `Para uma remuneração bruta de ${formatado}, o valor líquido estimado a receber na sua conta bancária é de ${calculated.liquido}. Esse valor final é alcançado após deduzir os encargos obrigatórios da legislação trabalhista brasileira, especificamente ${calculated.inss} para o INSS e ${calculated.irrf} para o IRRF. A verdade é que o valor que cai na conta é o que realmente define seu orçamento mensal.`
    },
    {
      q: `Qual é o valor exato do desconto de INSS sobre um salário de R$ ${valor}?`,
      a: `A contribuição para o INSS sobre o salário de ${formatado} é de ${calculated.inss}. Esse cálculo é realizado de forma progressiva com base nas faixas de contribuição de 2026, onde cada parcela do seu salário é tributada com uma alíquota específica (variando entre 7,5% e 14%) até atingir o teto estabelecido pela Previdência Social.`
    },
    {
      q: `Quem ganha R$ ${valor} paga Imposto de Renda (IRRF) em 2026?`,
      a: `Para o salário de ${formatado}, o Imposto de Renda Retido na Fonte (IRRF) deduzido mensalmente é de ${calculated.irrf}. A base de cálculo do imposto é obtida subtraindo o valor do INSS e eventuais deduções por dependentes do seu salário bruto. Se o valor final for menor que o limite de isenção, nenhuma taxa de IRRF é cobrada.`
    },
    {
      q: `Qual é a alíquota efetiva de desconto sobre um salário bruto de R$ ${valor}?`,
      a: `A alíquota efetiva final de descontos obrigatórios para um salário de ${formatado} é de ${calculated.aliquotaEfetiva}. Isso significa que, do valor total contratado na sua carteira de trabalho, essa porcentagem é retida na fonte para o pagamento de tributos, restando ${calculated.liquido} para o seu uso direto.`
    },
    {
      q: `Quais outros descontos podem incidir sobre o holerite de R$ ${valor}?`,
      a: `Além dos tributos obrigatórios (INSS e IRRF), o seu salário de ${formatado} pode sofrer reduções devido a benefícios como Vale-Transporte (desconto de até 6% do salário básico), Vale-Refeição/Alimentação (coparticipação do PAT), Plano de Saúde ou Odontológico, além de faltas ou atrasos injustificados. Veja bem, cada benefício opcional reduz o líquido real final.`
    },
    {
      q: `Como comprovar renda recebendo R$ ${valor} na carteira assinada?`,
      a: `Você pode comprovar sua renda de ${formatado} utilizando o seu holerite (contracheque mensal), a Carteira de Trabalho Digital atualizada, ou o extrato de contribuição do CNIS emitido pelo portal Meu INSS. Instituições financeiras analisam o seu salário bruto para limites de crédito, mas focam no líquido de ${calculated.liquido} para entender seu real poder de pagamento.`
    },
    {
      q: `Como negociar um aumento se o meu salário bruto atual é R$ ${valor}?`,
      a: `Ao negociar um aumento de salário, nós recomendamos focar no valor bruto, pois todos os encargos são calculados sobre ele. Se você deseja um líquido específico, utilize a nossa calculadora para encontrar o salário bruto equivalente necessário para compensar os descontos do INSS e IRRF, garantindo que o valor que entra na conta seja exatamente o que você planejou.`
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": `Calculadora de Salário Líquido: ${formatado}`,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <article className="w-full max-w-full overflow-hidden pb-12 bg-slate-50 dark:bg-slate-950 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="px-4 pt-4 md:pt-6">
        <PageHeader 
          title={`Salário Líquido: ${formatado}`}
          description={`Análise dos impostos para quem ganha ${formatado} em 2026.`}
          category="Calculadora CLT"
          icon={<Coins size={32} strokeWidth={2} />}
          variant="finance"
          categoryColor="emerald"
          badge="Atualizado 2026"
          breadcrumbs={[
            { label: "Financeiro", href: "/financeiro" },
            { label: "Salário Líquido", href: "/financeiro/salario-liquido" },
            { label: `R$ ${valor}` }
          ]}
        />
      </div>

      <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="print:hidden">
          <Link href="/financeiro/salario-liquido" className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={16} className="mr-1"/> Voltar para Calculadora Completa
          </Link>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-4 rounded-2xl flex items-center gap-3 text-xs text-emerald-700 dark:text-emerald-300">
          <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
          <span>Cálculo baseado nas tabelas progressivas oficiais de 2026.</span>
        </div>

        {/* --- CALCULADORA INTERATIVA --- */}
        <section id="ferramenta" className="w-full relative z-10">
          <PrivacyBadge />
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 md:p-8">
            <Suspense fallback={<div className="h-96 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-3xl" />}>
              <NetSalaryCalculator initialValue={salarioNum} />
            </Suspense>
            <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <DisclaimerBox />
            </div>
          </div>
        </section>

        {/* --- GUIA DE CONTEÚDO ENRIQUECIDO (AD-SENSE E COPILOT) --- */}
        <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto bg-white dark:bg-slate-900 p-6 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden w-full">
          
          {/* Diagnóstico Rápido */}
          <h2 className={`text-3xl font-bold text-slate-900 dark:text-white mb-6 border-l-4 border-${analysis.color}-500 pl-4 flex items-center gap-3`}>
             <TrendingDown className={`text-${analysis.color}-500`}/> Cenário de Análise: {formatado}
          </h2>

          <div className={`bg-${analysis.color}-50 dark:bg-${analysis.color}-900/10 border-l-4 border-${analysis.color}-500 p-6 rounded-r-xl mb-8 not-prose`}>
             <h3 className={`text-xl font-bold text-${analysis.color}-900 dark:text-${analysis.color}-100 mb-2`}>Diagnóstico Rápido: {analysis.alert}</h3>
             <p className={`text-${analysis.color}-800 dark:text-${analysis.color}-200 mb-4`} dangerouslySetInnerHTML={{ __html: analysis.text }} />
             <div className="flex flex-wrap gap-2">
                 <span className="text-xs font-bold bg-white dark:bg-black/20 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">
                    Equivalente a {salariosMinimos} Salários Mínimos
                 </span>
                 <span className={`text-xs font-bold text-white bg-${analysis.color}-600 px-3 py-1.5 rounded-full`}>
                    Poder de Compra: {analysis.power}
                 </span>
             </div>
          </div>

          {/* Dicas Práticas */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Dicas Estratégicas para R$ {valor}</h3>
          <ul className="space-y-2 not-prose mb-8">
              {analysis.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 items-start p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <CheckCircle2 className={`text-${analysis.color}-500 shrink-0 mt-0.5`} size={18} />
                      <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{tip}</span>
                  </li>
              ))}
          </ul>

          <hr className="my-8 border-slate-100 dark:border-slate-800" />

          {/* Seção 1: Introdução Conversacional */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">O Segredo Oculto Por Trás do Seu Holerite</h2>
          
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Imagine a seguinte cena: você trabalhou duro o mês inteiro, planejou suas compras e aguarda ansiosamente pelo dia do pagamento.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            No entanto, ao abrir o aplicativo do banco, o valor depositado é consideravelmente menor do que os {formatado} combinados.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A verdade é que esse é um susto muito comum para quem trabalha sob o regime da CLT no Brasil.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Veja bem, o salário bruto serve como uma referência teórica para contratos, mas o que dita as regras do jogo é o salário líquido.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nós estamos aqui para desmistificar cada centavo dessa diferença e garantir que você nunca mais seja pego de surpresa.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Aí é que está o segredo: entender os descontos é o primeiro passo para assumir o controle total da sua vida financeira.
          </p>

          {/* Seção 2: Explicação da diferença com Analogia */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Salário Bruto vs Salário Líquido: A Metáfora do Bolo</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Para entender essa diferença sem termos burocráticos, nós gostamos de pensar em uma receita de bolo de aniversário.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            O bolo inteiro representa o seu salário bruto de {formatado}, bonito, vistoso e completo na fôrma.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Mas, antes mesmo de você dar a primeira mordida, o governo e a legislação retiram algumas fatias obrigatórias.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Uma fatia vai para a Previdência Social (<GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm>), servindo como sua rede de segurança para aposentadoria e auxílio-doença.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Outra fatia pode ir para o Leão do Imposto de Renda (<GlossaryTerm slug="irrf-imposto-de-renda">IRRF</GlossaryTerm>), sustentando a máquina pública e serviços sociais federais.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            O pedaço que sobra no prato é, finalmente, o seu salário líquido de {calculated.liquido}, pronto para ser saboreado.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Parece complicado, né? Mas nós garantimos que, com a nossa tabela de simulação, as contas ficam claras como o dia.
          </p>

          {/* Seção 3: Tabela Comparativa de Descontos Puras HTML */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Demonstrativo Detalhado de Descontos e Valores</h2>
          
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Abaixo, apresentamos a planilha exata gerada para um contrato de trabalho no valor de {formatado} por mês.
          </p>

          <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm not-prose">
            <table className="w-full min-w-[600px] text-left border-collapse bg-white dark:bg-slate-900">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Descrição da Rubrica</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Tipo</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase size={16} className="text-emerald-500" /> Salário Bruto Contratual
                  </td>
                  <td className="px-6 py-4 text-sm text-emerald-600 font-semibold">Vencimento</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white text-right">{calculated.bruto}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <Landmark size={16} className="text-amber-500" /> Desconto de INSS (Previdência)
                  </td>
                  <td className="px-6 py-4 text-sm text-amber-600 font-semibold">Desconto</td>
                  <td className="px-6 py-4 text-sm font-bold text-amber-600 text-right">-{calculated.inss}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText size={16} className="text-rose-500" /> Desconto de IRRF (Imposto de Renda)
                  </td>
                  <td className="px-6 py-4 text-sm text-rose-600 font-semibold">Desconto</td>
                  <td className="px-6 py-4 text-sm font-bold text-rose-600 text-right">-{calculated.irrf}</td>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-800/20 font-bold">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">Total Geral de Descontos</td>
                  <td className="px-6 py-4 text-sm text-slate-500">Retenção</td>
                  <td className="px-6 py-4 text-sm text-right text-rose-600">-{calculated.totalDescontos}</td>
                </tr>
                <tr className="bg-emerald-50/20 dark:bg-emerald-950/20 font-black border-t-2 border-emerald-500">
                  <td className="px-6 py-4 text-base text-emerald-700 dark:text-emerald-400">Salário Líquido Estimado</td>
                  <td className="px-6 py-4 text-base text-emerald-700 dark:text-emerald-400">Líquido na Conta</td>
                  <td className="px-6 py-4 text-base text-right text-emerald-600 dark:text-emerald-400">{calculated.liquido}</td>
                </tr>
                <tr className="text-xs text-slate-500">
                  <td className="px-6 py-3" colSpan={2}>Alíquota Efetiva Real Retida</td>
                  <td className="px-6 py-3 text-right font-semibold">{calculated.aliquotaEfetiva}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Seção 4: O Desconto do INSS em 2026 */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Engrenagem Progressiva da Contribuição do INSS</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Muitas pessoas pensam que a Previdência Social cobra uma porcentagem única sobre todo o salário bruto, mas o sistema funciona em faixas.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Em 2026, as alíquotas do <GlossaryTerm slug="inss-previdencia-social">INSS</GlossaryTerm> variam progressivamente de 7,5% a 14%, incidindo em camadas, como degraus de uma escada.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Isso quer dizer que, ao invés de tributar todo o seu salário de {formatado} na alíquota máxima, cada fatia do salário é descontada conforme seu respectivo patamar.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            O melhor de tudo? Isso suaviza o impacto tributário para quem ganha menos e garante justiça fiscal no orçamento previdenciário.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Com esse método progressivo, o desconto estimado para R$ {valor} fica estabelecido em exatamente {calculated.inss}.
          </p>

          {/* Seção 5: O Imposto de Renda (IRRF) */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">O Leão Faminto: Imposto de Renda Retido na Fonte (IRRF)</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Chegou a hora de falar sobre o temido <GlossaryTerm slug="irrf-imposto-de-renda">IRRF</GlossaryTerm>, o imposto que morde parte substancial da sua renda mensal.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            No entanto, antes do IRRF agir, existe uma base de cálculo: nós subtraímos o INSS que você já pagou e eventuais deduções permitidas por lei.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Entre as principais deduções que você pode reivindicar junto ao setor de Recursos Humanos estão os dependentes legais (filhos, cônjuge).
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Cada dependente cadastrado abate um valor fixo da sua base tributável, reduzindo diretamente o valor pago em impostos federais.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            No cenário padrão de um salário bruto de {formatado}, o seu desconto estimado de Imposto de Renda é de {calculated.irrf}.
          </p>

          {/* Seção 6: Descontos Não-Tributários */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">A Armadilha Silenciosa: Outros Descontos do Seu Contracheque</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Além do INSS e do IRRF, que são descontos tributários federais obrigatórios, existem outros abatimentos que a empresa pode efetuar no seu salário.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Um dos principais exemplos é o Vale-Transporte. A CLT permite que o empregador desconte até 6% do seu salário básico para custeá-lo.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Temos também a coparticipação em planos de saúde ou odontológicos e o Vale-Refeição/Alimentação sob as regras do PAT.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            O melhor conselho aqui? Avalie se vale a pena manter benefícios opcionais se eles estiverem drenando excessivamente seu holerite.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            Lembre-se: cada um desses descontos adicionais fará com que o valor líquido que entra na conta seja menor que o padrão demonstrado.
          </p>

          {/* Seção 7: Educação Financeira e Organização */}
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Como Organizar Seu Orçamento Com Base em {calculated.liquido}</h2>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Agora que você conhece o seu salário líquido real de {calculated.liquido}, o próximo passo é estruturar seu planejamento financeiro pessoal.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Nós recomendamos utilizar o método clássico 50/30/20, que se adapta muito bem a essa faixa salarial.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Destine 50% dos seus rendimentos líquidos para custos essenciais de moradia, transporte, saúde e alimentação do dia a dia.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Reserve 30% para gastos variáveis e estilo de vida, como passeios, assinaturas digitais, lazer e pequenos desejos de consumo.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Por fim, poupe os 20% restantes religiosamente para formar sua reserva de emergência ou aplicar em investimentos seguros de longo prazo.
          </p>

          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            A verdade é que a constância vale muito mais do que grandes somas de dinheiro acumuladas esporadicamente.
          </p>

          <ExpertSignature updatedAt="Junho de 2026" author="Equipe Editorial Mestre das Contas" />
        </section>

        <SmartGlossaryLinker currentHref={`/financeiro/salario-liquido/${valor}`} category="financeiro" />
        <SmartCrossLinker currentHref={`/financeiro/salario-liquido/${valor}`} category="financeiro" />

        {/* --- FAQ COMPLETO ACCORDION --- */}
        <section className="w-full max-w-4xl mx-auto mt-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
              <HelpCircle className="text-emerald-500 shrink-0" size={32} /> Dúvidas Frequentes Resolvidas
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Confira as respostas diretas para as dúvidas mais comuns dos trabalhadores com salário bruto de {formatado}.
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

        <div className="w-full flex justify-center mt-8 min-h-[250px]">
          <LazyAdUnit slot="salario_bottom" format="horizontal" variant="software" />
        </div>
      </div>
    </article>
  );
}