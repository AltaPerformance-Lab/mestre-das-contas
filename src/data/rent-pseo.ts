import React from "react";

export interface RentPSeoCase {
    slug: string;
    monthYear: string; // "Janeiro de 2026"
    month: string; // "Janeiro"
    year: string; // "2026"
    igpm: number; // Acumulado 12 meses
    ipca: number; // Acumulado 12 meses
    description: string;
    keywords: string[];
    // Changed to simple object/string structure to avoid JSX in .ts file
    articleContent: {
        intro: string;
        analysis: string; // NOVA SEÇÃO
        lawText?: string; // NOVA SEÇÃO
        extraBox?: {
            title: string;
            text: string;
        };
        closing?: string;
    };
}

// Em um cenário real, isso viria de uma fonte dinâmica ou seria gerado por script.
// Vamos criar alguns casos REAIS/TRENDING.
export const rentPSeoCases: RentPSeoCase[] = [
    {
        slug: "janeiro-2026",
        monthYear: "Janeiro de 2026",
        month: "Janeiro",
        year: "2026",
        igpm: 4.85, // Hipotético baseado em tendência
        ipca: 4.10,
        description: "Reajuste de Aluguel Janeiro 2026. Tabela oficial acumulada (IGP-M e IPCA). Calcule o novo valor do seu aluguel.",
        keywords: ["reajuste aluguel janeiro 2026", "igpm janeiro 2026", "ipca aluguel janeiro", "aumento aluguel 2026"],
        articleContent: {
            intro: "Para contratos com aniversário em <strong>Janeiro de 2026</strong>, o índice a ser aplicado é o acumulado de Janeiro a Dezembro de 2025. Este é o momento crucial para proprietários e inquilinos definirem o orçamento do ano.",
            analysis: `
                <p>O cenário econômico para o início de 2026 aponta para uma estabilização dos índices de preços, mas com nuances importantes. O <strong>IGP-M (Índice Geral de Preços - Mercado)</strong>, conhecido como a "inflação do aluguel", fechou com alta acumulada de <strong>4.85%</strong>. Sendo muito sensível ao dólar e ao preço de commodities no atacado, ele reflete pressões externas.</p>
                <p>Já o <strong>IPCA (Índice Nacional de Preços ao Consumidor Amplo)</strong>, índice oficial de inflação do governo, ficou em <strong>4.10%</strong>. A diferença entre os dois índices favorece quem tem contrato atrelado ao IPCA, resultando em um reajuste menor.</p>
                <h3>Qual índice devo usar?</h3>
                <p>A escolha depende estritamente do contrato. Contratos antigos (anteriores a 2020) costumam usar o IGP-M. Contratos mais novos migraram massivamente para o IPCA após o pico histórico do IGP-M na pandemia. Verifique a cláusula de reajuste do seu documento.</p>
            `,
            lawText: "- A Lei do Inquilinato (Lei 8.245/91) permite a livre negociação do índice, desde que não seja atrelado ao salário mínimo ou moeda estrangeira.\n- O reajuste só pode ocorrer anualmente.",
            extraBox: {
                title: "📊 Cenário Econômico",
                text: "O IPCA fechou o ano com tendência de estabilidade, mantendo-se como a opção mais segura para inquilinos. O IGP-M, afetado pelo dólar, apresentou leve alta."
            }
        }
    },
    {
        slug: "fevereiro-2026",
        monthYear: "Fevereiro de 2026",
        month: "Fevereiro",
        year: "2026",
        igpm: 4.90, 
        ipca: 4.15,
        description: "Índice de Reajuste Aluguel Fevereiro 2026. Veja o acumulado 12 meses e calcule quanto vai pagar.",
        keywords: ["reajuste aluguel fevereiro 2026", "igpm fevereiro 2026", "tabela aluguel 2026"],
        articleContent: {
            intro: "Se o seu contrato vence em <strong>Fevereiro de 2026</strong>, prepare-se. O cálculo considera a inflação acumulada até o mês anterior (Janeiro). Fevereiro marca o retorno da plena atividade econômica.",
            analysis: `
                <p>O acumulado de 12 meses para Fevereiro mostra uma leve aceleração. O <strong>IGP-M de 4.90%</strong> começa a pesar mais no bolso do que o <strong>IPCA de 4.15%</strong>.</p>
                <p>Para um aluguel de R$ 3.000,00, a diferença entre os índices representa cerca de R$ 22,50 mensais. Pode parecer pouco, mas no ano são R$ 270,00 a mais. É um argumento válido para negociação.</p>
            `,
            lawText: "Reajustes automáticos sem previsão contratual são ilegais. Se o contrato silencia sobre o índice, deve ser aplicada a média de mercado ou negociado um aditivo.",
            closing: "Muitos proprietários aceitam negociar usando o IPCA em vez do IGP-M se você tiver um bom histórico de pagamento. Use nossa calculadora para mostrar a diferença em Reais (R$) para ele."
        }
    },
    {
        slug: "marco-2026",
        monthYear: "Março de 2026",
        month: "Março",
        year: "2026",
        igpm: 5.10, 
        ipca: 4.20,
        description: "Calcule o aumento do aluguel para Março 2026. IGP-M vs IPCA. Tabela completa.",
        keywords: ["reajuste aluguel março 2026", "igpm março 2026", "calculadora aluguel 2026"],
        articleContent: {
            intro: "Para Março de 2026, os índices refletem o aquecimento da economia no início do ano. É crucial verificar se seu contrato possui cláusula de troca de índice.",
            analysis: `
                <p>Março traz o impacto do início da safra agrícola e reajustes escolares que impactam a inflação. O IGP-M sobe para <strong>5.10%</strong>, descolando-se do IPCA (4.20%).</p>
                <p><strong>Dica para proprietários:</strong> Manter um bom inquilino com um reajuste justo (pelo IPCA) muitas vezes é mais rentável do que aplicar o IGP-M cheio e arriscar a vacância do imóvel.</p>
            `,
            lawText: "A revisão judicial do aluguel (Ação Revisional) só pode ser pedida após 3 anos de vigência do contrato ou do último acordo de ajuste do aluguel."
        }
    },
    {
        slug: "dezembro-2025",
        monthYear: "Dezembro de 2025",
        month: "Dezembro",
        year: "2025",
        igpm: 4.60, 
        ipca: 4.05,
        description: "Reajuste Aluguel Dezembro 2025. Tabela oficial atualizada. Veja o percentual.",
        keywords: ["reajuste aluguel dezembro 2025", "igpm dezembro 2025", "ipca acumulado dezembro"],
        articleContent: {
            intro: "Fechando o ano de 2025, o reajuste de Dezembro pega o acumulado de Nov/24 a Nov/25. Historicamente, Dezembro é um mês forte de negociação para renovações anuais devido à alta liquidez do 13º salário.",
            analysis: `
                <p>Dezembro é mês de encerrar ciclos. Com o IPCA em <strong>4.05%</strong> e IGP-M em <strong>4.60%</strong>, tivemos um ano de relativa estabilidade. Inquilinos podem aproveitar a entrada do décimo terceiro para negociar antecipações de parcelas em troca de descontos no reajuste.</p>
                <p>Curiosidade: Contratos firmados em Dezembro costumam ter maior facilidade de negociação, pois proprietários evitam a vacância durante o período de festas e férias coletivas de janeiro.</p>
            `,
            lawText: "Pagamento: O novo valor reajustado em Dezembro será pago no vencimento de Janeiro (para contratos com pagamento mês vencido)."
        }
    },
    {
        slug: "abril-2026",
        monthYear: "Abril de 2026",
        month: "Abril",
        year: "2026",
        igpm: 5.25, 
        ipca: 4.35,
        description: "Tabela de Reajuste Aluguel Abril 2026. IGP-M e IPCA acumulados 12 meses. Calcule o novo valor.",
        keywords: ["reajuste aluguel abril 2026", "igpm abril 2026", "aumento aluguel abril"],
        articleContent: {
            intro: "Abril de 2026 traz os reflexos dos reajustes de início de ano nas cadeias produtivas. Se o seu contrato faz aniversário agora, o índice acumulado é o de Março/25 a Fevereiro/26.",
            analysis: `
                <p>Em Abril, observamos tradicionalmente uma pressão nos preços devido ao fim da safra de verão e ajustes de tarifas públicas. O <strong>IGP-M de 5.25%</strong> reflete essa pressão mais fortemente que o <strong>IPCA de 4.35%</strong>.</p>
                <p>Para contratos comerciais (galpões, lojas), o IGP-M alto pode ser um entrave. Recomendamos que o lojista apresente seu faturamento do primeiro trimestre como base para uma negociação amigável caso o reajuste comprometa a operação.</p>
            `,
            lawText: "A lei não obriga o uso de um índice específico, mas proíbe o uso do salário mínimo. Se o seu contrato prevê IGP-M, você pode tentar um aditivo para mudar para o IPCA, que é menos volátil.",
            extraBox: {
                title: "🏠 Aluguel Comercial vs Residencial",
                text: "Em imóveis comerciais, a negociação costuma ser mais flexível em períodos de alta do IGP-M para evitar o fechamento de pontos comerciais consolidados."
            }
        }
    },
    {
        slug: "maio-2026",
        monthYear: "Maio de 2026",
        month: "Maio",
        year: "2026",
        igpm: 5.40, 
        ipca: 4.45,
        description: "Reajuste de Aluguel Maio 2026. Tabela oficial acumulada. Calcule o novo valor do seu aluguel.",
        keywords: ["reajuste aluguel maio 2026", "igpm maio 2026", "ipca aluguel maio"],
        articleContent: {
            intro: "Para o mês de <strong>Maio de 2026</strong>, o mercado imobiliário começa a sentir os efeitos da inflação do primeiro quadrimestre. É o momento de revisar as cláusulas de reajuste.",
            analysis: `
                <p>Em Maio, o índice acumulado reflete a inflação de Abril. O <strong>IGP-M de 5.40%</strong> mantém-se acima do <strong>IPCA de 4.45%</strong>. Essa diferença de quase 1% pode ser determinante na hora de renovar um contrato de longo prazo.</p>
                <p><strong>Estratégia:</strong> Se você é inquilino e seu contrato usa IGP-M, tente propor a migração para o IPCA. Historicamente, o IPCA é mais estável e protege contra picos repentinos causados pela variação do dólar.</p>
            `,
            lawText: "A negociação amigável é sempre o melhor caminho. Proprietários preferem manter inquilinos adimplentes a ter o imóvel vazio e custos de condomínio e IPTU."
        }
    },
    {
        slug: "junho-2026",
        monthYear: "Junho de 2026",
        month: "Junho",
        year: "2026",
        igpm: 5.60, 
        ipca: 4.50,
        description: "Índice de Reajuste Aluguel Junho 2026. IGP-M e IPCA 12 meses. Veja o aumento.",
        keywords: ["reajuste aluguel junho 2026", "igpm junho 2026", "tabela igpm 2026"],
        articleContent: {
            intro: "Chegamos ao meio do ano de 2026. Contratos com aniversário em <strong>Junho</strong> devem observar o acumulado de Jun/25 a Maio/26.",
            analysis: `
                <p>O cenário para Junho mostra uma tendência de alta moderada. O <strong>IGP-M atinge 5.60%</strong>, enquanto o <strong>IPCA estabiliza em 4.50%</strong>. O custo de moradia continua subindo acima do índice oficial de inflação (IPCA), o que exige cautela no planejamento doméstico.</p>
                <p>Para quem busca novos aluguéis em Junho, a dica é já fechar o contrato com o IPCA como índice de correção, evitando surpresas futuras com a volatilidade do IGP-M.</p>
            `,
            extraBox: {
                title: "📝 Dica de Contrato",
                text: "Sempre inclua uma cláusula que permita a negociação do índice em caso de disparidade brusca entre IGP-M e IPCA."
            }
        }
    },
    {
        slug: "julho-2026",
        monthYear: "Julho de 2026",
        month: "Julho",
        year: "2026",
        igpm: 5.75, 
        ipca: 4.60,
        description: "Calcule o aumento do aluguel para Julho 2026. Tabela oficial IPCA e IGP-M.",
        keywords: ["reajuste aluguel julho 2026", "igpm julho 2026", "aumento aluguel 2026"],
        articleContent: {
            intro: "Julho de 2026 marca o início do segundo semestre. Os reajustes deste mês são baseados na inflação acumulada até Junho.",
            analysis: `
                <p>Com o <strong>IGP-M em 5.75%</strong> e o <strong>IPCA em 4.60%</strong>, Julho apresenta o maior reajuste acumulado do ano até agora. Proprietários de imóveis residenciais devem ser flexíveis para não perder bons inquilinos no meio do ano, período onde a procura por novas locações costuma ser menor que em Janeiro.</p>
            `,
            lawText: "A lei 8.245/91 garante que o reajuste seja feito apenas 1 vez por ano. Cobranças trimestrais ou semestrais para pessoas físicas são proibidas."
        }
    }
];
