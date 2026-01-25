
export interface TerminationPSeoCase {
    slug: string;
    title: string;
    reasonLabel: string; // O que aparece no select do calculador
    description: string;
    keywords: string[];
    rating: number;
    reviewsCount: number;
    // Mudança para dados estruturados
    articleContent: {
        intro: string;
        analysis?: string; // New: Detailed textual analysis
        lawText?: string;  // New: Specific legislation text
        rightsList?: {
            title: string;
            items: { label: string; desc: string }[];
        };
        faq?: { question: string; answer: string }[]; // New: FAQs
        warningBox?: {
            title: string;
            text: string;
        };
        closing?: string;
    };
}

export const terminationCases: TerminationPSeoCase[] = [
    {
        slug: "sem-justa-causa",
        title: "Calcular Rescisão Sem Justa Causa",
        reasonLabel: "Sem Justa Causa", 
        description: "Foi demitido sem justa causa? Calcule agora: Saldo de Salário, Aviso Prévio, Férias + 1/3, 13º Proporcional e Multa de 40% do FGTS.",
        keywords: ["rescisão sem justa causa", "calcular demissão", "direitos demissão sem justa causa", "multa 40 fgts"],
        rating: 4.9,
        reviewsCount: 15420,
        articleContent: {
            intro: "A demissão <strong>Sem Justa Causa</strong> é a modalidade que garante mais direitos ao trabalhador. Basicamente, a empresa decidiu encerrar o contrato sem que você tenha cometido nenhuma falta grave. Nesse cenário, a legislação brasileira (CLT) protege o trabalhador com uma série de indenizações financeiras para ampará-lo até a recolocação no mercado.",
            analysis: `
                <p>Nesta modalidade, o empregador deve arcar com todas as verbas rescisórias completas. É o cenário padrão de desligamento não motivado pelo colaborador.</p>
                <p>Além das verbas, a empresa deve fornecer as guias para o <strong>levantamento do FGTS</strong> e para a habilitação no <strong>Seguro Desemprego</strong>. O prazo para pagamento das verbas é de até 10 dias corridos após o término do contrato.</p>
            `,
            lawText: "A demissão sem justa causa está prevista no Art. 477 da CLT. A Constituição Federal garante ainda a indenização compensatória de 40% sobre o FGTS como proteção contra a despedida arbitrária.",
            rightsList: {
                title: "💰 Seus Direitos Garantidos:",
                items: [
                    { label: "Aviso Prévio:", desc: "Trabalhado ou Indenizado. A cada ano trabalhado, você ganha mais 3 dias (Lei 12.506/11), podendo chegar a 90 dias." },
                    { label: "Multa de 40%:", desc: "Calculada sobre todo o saldo do FGTS depositado durante o contrato, mesmo que você já tenha sacado parte (ex: saque-aniversário)." },
                    { label: "Saque do FGTS:", desc: "Liberação imediata do saldo da conta vinculada (código de saque 01)." },
                    { label: "Seguro Desemprego:", desc: "Se tiver trabalhado pelo menos 12 meses (na primeira solicitação), tem direito a 3 a 5 parcelas." },
                    { label: "Verbas Proporcionais:", desc: "Férias vencidas + 1/3, Férias proporcionais + 1/3 e 13º salário proporcional aos meses trabalhados no ano." }
                ]
            },
            faq: [
                { question: "O que acontece se a empresa atrasar o pagamento?", answer: "Se a empresa não pagar a rescisão em até 10 dias corridos, ela deve pagar uma multa no valor de um salário do funcionário (Multa do Art. 477 da CLT)." },
                { question: "Posso sacar meu FGTS total?", answer: "Sim, na demissão sem justa causa o saque é integral, a menos que você tenha aderido ao Saque-Aniversário. Se aderiu, saca apenas a multa de 40%." }
            ],
            warningBox: {
                title: "Atenção ao Aviso Prévio",
                text: "Se o aviso for trabalhado, você tem direito a sair 2 horas mais cedo todos os dias OU faltar 7 dias corridos ao final, sem desconto no salário. É sua escolha."
            }
        }
    },
    {
        slug: "pedido-de-demissao",
        title: "Calcular Pedido de Demissão",
        reasonLabel: "Pedido de Demissão",
        description: "Vai pedir demissão? Veja o que você perde e o que recebe. Aviso prévio, Férias e 13º. Atenção à perda dos 40% do FGTS.",
        keywords: ["calcular pedido demissão", "direitos pedir demissão", "perco 40 fgts se pedir conta", "aviso prévio pedido demissão"],
        rating: 4.8,
        reviewsCount: 8900,
        articleContent: {
            intro: "Pedir demissão é um direito seu, mas tem um custo financeiro. Ao tomar a iniciativa de sair, você abre mão de algumas proteções que a CLT oferece na demissão imotivada. É fundamental calcular bem para não ser surpreendido com um valor muito baixo (ou até zerado) na rescisão.",
            analysis: `
                <p>O maior impacto financeiro no pedido de demissão é a <strong>perda da multa de 40% do FGTS</strong> e a impossibilidade de sacar o saldo acumulado. Esse dinheiro continua seu, rendendo juros, mas fica 'preso' na conta inativa.</p>
                <p>Outro ponto crítico é o <strong>Aviso Prévio</strong>. Se você não cumprir os 30 dias de aviso, a empresa tem o direito de descontar esse valor da sua rescisão, o que pode zerar seu saldo a receber.</p>
            `,
            lawText: "A CLT (Art. 487) estabelece que a parte que rescindir o contrato deve avisar a outra com antecedência mínima de 30 dias. Se o empregado não der o aviso, o empregador pode descontar os salários correspondentes.",
            rightsList: {
                title: "⚠️ O que você PERDE:",
                items: [
                     { label: "Multa de 40%:", desc: "Você NÃO recebe a multa do FGTS." },
                     { label: "Saque do FGTS:", desc: "Seu saldo fica retido (só saca em aposentadoria, casa própria ou saque-aniversário)." },
                     { label: "Seguro Desemprego:", desc: "Você NÃO tem direito ao benefício, pois saiu voluntariamente." },
                     { label: "Aviso Prévio:", desc: "Se não trabalhar, a empresa pode descontar um salário do seu acerto." }
                ]
            },
            faq: [
                { question: "A empresa é obrigada a aceitar o aviso imediato?", answer: "Não. Se você pedir para sair e não quiser cumprir o aviso, a empresa pode optar por descontar ou abonar os dias. É uma negociação." },
                { question: "Recebo férias e décimo terceiro?", answer: "Sim! Você recebe saldo de salário, 13º proporcional e férias vencidas/proporcionais + 1/3 normalmente." }
            ]
        }
    },
    {
        slug: "acordo-comum",
        title: "Calcular Rescisão por Acordo (Comum Acordo)",
        reasonLabel: "Acordo Comum",
        description: "Simule a Rescisão por Acordo (Reforma Trabalhista). Receba 20% da multa e saque 80% do FGTS. Veja se vale a pena.",
        keywords: ["rescisão acordo comum", "demissao por acordo", "multa 20 fgts", "saque 80 fgts"],
        rating: 4.7,
        reviewsCount: 3200,
        articleContent: {
            intro: "Criado na Reforma Trabalhista de 2017, o <strong>Acordo de Comum Acordo</strong> (ou Distrato) é o meio termo oficial entre ser demitido e pedir demissão. É uma saída legal para quando a empresa e o funcionário concordam que não dá mais para continuar.",
            analysis: `
                <p>Antes de 2017, muitas pessoas faziam o famoso 'acordo ilegal' (devolver a multa de 40% por fora). Isso era crime. Agora, a lei permite uma saída honrosa e mais barata para o patrão e mais vantajosa para o empregado do que o pedido de demissão.</p>
                <p>Nesta modalidade, as verbas rescisórias são pagas de forma híbrida: algumas integrais, outras pela metade.</p>
            `,
            lawText: "Regulamentado pelo Art. 484-A da CLT. O acordo deve ser consensual e formalizado.",
            rightsList: {
                title: "🤝 Como funciona o Acordo?",
                items: [
                    { label: "Multa FGTS:", desc: "A empresa paga 20% sobre o saldo (metade da multa normal)." },
                    { label: "Saque FGTS:", desc: "Você pode sacar até 80% do saldo depositado em conta." },
                    { label: "Aviso Prévio:", desc: "Se indenizado, você recebe a metade (15 dias). Se trabalhado, é integral." },
                    { label: "Seguro Desemprego:", desc: "NÃO tem direito ao benefício." }
                ]
            },
            faq: [
                { question: "A empresa é obrigada a fazer acordo?", answer: "Não. Ambas as partes precisam querer. Se um não quiser, o acordo não acontece." },
                { question: "Vale a pena?", answer: "Se você quer sair e a empresa não quer te demitir, vale mais a pena do que pedir demissão, pois você acessa 80% do FGTS e leva uma multa menor." }
            ]
        }
    },
    {
        slug: "justa-causa",
        title: "Calcular Demissão por Justa Causa",
        reasonLabel: "Justa Causa",
        description: "Foi demitido por Justa Causa? Saiba o que resta receber. Saldo de salário e férias vencidas apenas.",
        keywords: ["rescisão justa causa", "direitos justa causa", "calcular verbas justa causa"],
        rating: 4.5,
        reviewsCount: 1200,
        articleContent: {
            intro: "A <strong>Justa Causa</strong> é a punição máxima prevista na CLT. Ela ocorre quando o funcionário comete faltas graves que quebram a confiança da relação de trabalho, como roubo, agressão física, abandono de emprego ou insubordinação grave.",
            analysis: `
                <p>Devido à gravidade, a lei retira a maioria dos direitos rescisórios como forma de penalidade. O objetivo é desestimular condutas lesivas.</p>
                <p>É importante notar que a empresa precisa ter provas robustas (advertências, suspensões ou provas materiais diretas) para aplicar a justa causa. Caso contrário, é possível reverter na justiça.</p>
            `,
            lawText: "As motivos para justa causa estão listados taxativamente no Art. 482 da CLT.",
            rightsList: {
                title: "🚫 O que você recebe:",
                items: [
                     { label: "Saldo de Salário:", desc: "Os dias trabalhados no mês até a demissão." },
                     { label: "Férias Vencidas:", desc: "Apenas se tiver férias vencidas há mais de um ano. Férias proporcionais são perdidas." },
                     { label: "Salário Família:", desc: "Se tiver direito." }
                ]
            },
            warningBox: {
                title: "Perda Total",
                text: "Na Justa Causa, você PERDE: Aviso Prévio, 13º Proporcional, Férias Proporcionais, Saque do FGTS, Multa de 40% e Seguro Desemprego."
            }
        }
    }
];
