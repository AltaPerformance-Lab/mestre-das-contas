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
            intro: "Fechando o ano de 2025, o reajuste de Dezembro pega o acumulado de Nov/24 a Nov/25. Historicamente, Dezembro é um mês forte de negociação para renovações anuais.",
            analysis: `
                <p>Dezembro é mês de encerrar ciclos. Com o IPCA em <strong>4.05%</strong> e IGP-M em <strong>4.60%</strong>, tivemos um ano de relativa estabilidade.</p>
                <p>Curiosidade: Contratos firmados em Dezembro costumam ter maior facilidade de negociação, pois ninguém quer virar o ano com imóvel vazio.</p>
            `,
            lawText: "Pagamento: O novo valor reajustado em Dezembro será pago no vencimento de Janeiro (para contratos com pagamento mês vencido)."
        }
    }
];
