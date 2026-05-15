
export interface TerminationPSeoCase {
    slug: string;
    title: string;
    reasonLabel: string; // O que aparece no select do calculador
    description: string;
    keywords: string[];
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
    },
    {
        slug: "rescisao-estagio",
        title: "Calcular Rescisão de Estágio (Lei 11.788)",
        reasonLabel: "Rescisão de Estágio",
        description: "Terminou o estágio? Calcule seu acerto. Veja como funciona o recesso proporcional e por que estagiário não tem aviso prévio nem FGTS.",
        keywords: ["rescisão contrato estagio", "acerto estagio calcular", "estagiário tem direito a 13", "recesso proporcional estagio"],
        articleContent: {
            intro: "A rescisão do <strong>Contrato de Estágio</strong> segue uma legislação própria (Lei 11.788/08), que é diferente da CLT comum. Como o estágio tem finalidade educativa, ele não gera vínculo empregatício, o que significa que o estagiário não tem direito a aviso prévio, multa de 40% ou saque do FGTS.",
            analysis: `
                <p>No acerto do estagiário, o item mais importante é o <strong>Recesso Remunerado</strong> (equivalente às férias). Se o estagiário sair antes de completar 1 ano, ele deve receber esse recesso de forma proporcional aos meses trabalhados.</p>
                <p>O contrato pode ser encerrado a qualquer momento por ambas as partes, sem necessidade de justificativa ou aviso prévio indenizado.</p>
            `,
            lawText: "Lei do Estágio (Lei nº 11.788/2008), Art. 13: 'É assegurado ao estagiário, sempre que o estágio tenha duração igual ou superior a 1 (um) ano, período de recesso de 30 (trinta) dias... § 2º Os dias de recesso previstos neste artigo serão concedidos de maneira proporcional, nos casos de o estágio ter duração inferior a 1 (um) ano.'",
            rightsList: {
                title: "📋 O que o Estagiário recebe:",
                items: [
                    { label: "Bolsa-Auxílio:", desc: "Saldo dos dias estagiados no último mês." },
                    { label: "Recesso Proporcional:", desc: "Pagamento dos dias de recesso não gozados (calculado sobre o valor da bolsa)." },
                    { label: "Auxílio-Transporte:", desc: "Proporcional aos dias efetivamente estagiados." }
                ]
            },
            faq: [
                { question: "Estagiário recebe 13º salário?", answer: "Pela lei federal, não há obrigatoriedade. Porém, algumas empresas concedem por liberalidade ou se estiver previsto no Termo de Compromisso." },
                { question: "Precisa de aviso prévio?", answer: "Não. O desligamento pode ser imediato sem ônus para nenhuma das partes." }
            ]
        }
    },
    {
        slug: "menor-aprendiz",
        title: "Calcular Rescisão Jovem Aprendiz",
        reasonLabel: "Jovem Aprendiz",
        description: "Contrato de Aprendizagem chegou ao fim? Calcule suas verbas rescisórias, FGTS (2%) e direitos específicos do Menor Aprendiz.",
        keywords: ["rescisão jovem aprendiz", "direitos menor aprendiz demissão", "fgts aprendiz 2 por cento", "calculo acerto aprendiz"],
        articleContent: {
            intro: "O <strong>Jovem Aprendiz</strong> possui um contrato de trabalho especial, com tempo determinado e foco em formação profissional. Diferente do estagiário, o aprendiz é registrado na CLT, mas com alíquotas e regras diferenciadas, como o FGTS de apenas 2%.",
            analysis: `
                <p>A rescisão pode ocorrer pelo término do prazo do contrato (normalmente 2 anos) ou por antecipação. Se o contrato terminar no prazo, o aprendiz saca o FGTS mas não recebe multa de 40%.</p>
                <p>Se a empresa demitir o aprendiz sem justa causa antes do prazo, ela deve pagar as verbas integrais, incluindo a multa do FGTS.</p>
            `,
            lawText: "CLT, Art. 428. O contrato de aprendizagem é o contrato de trabalho especial, ajustado por escrito e por prazo determinado, em que o empregador se compromete a assegurar ao maior de 14 e menor de 24 anos... formação técnico-profissional metódica.",
            rightsList: {
                title: "📑 Direitos do Aprendiz:",
                items: [
                    { label: "FGTS Diferenciado:", desc: "O depósito mensal é de 2% do salário (contra 8% do CLT normal)." },
                    { label: "Término de Contrato:", desc: "Dá direito ao saque do FGTS acumulado, mas sem a multa de 40%." },
                    { label: "Verbas CLT:", desc: "Recebe 13º e Férias proporcionais normalmente." }
                ]
            },
            faq: [
                { question: "Aprendiz tem direito a seguro-desemprego?", answer: "Sim, caso a rescisão seja antecipada sem justa causa por iniciativa da empresa e ele preencha os requisitos de tempo." }
            ]
        }
    },
    {
        slug: "contrato-experiencia",
        title: "Rescisão em Contrato de Experiência",
        reasonLabel: "Término de Experiência",
        description: "O período de 45 ou 90 dias acabou? Veja como calcular a rescisão no término do contrato de experiência. Saque FGTS e verbas.",
        keywords: ["rescisao contrato experiencia", "acerto 90 dias empresa", "demissao no final da experiencia", "saque fgts experiencia"],
        articleContent: {
            intro: "O <strong>Contrato de Experiência</strong> é uma modalidade por prazo determinado (máximo 90 dias). Quando o contrato chega ao seu fim natural, as partes podem decidir não renovar sem que isso gere o pagamento de aviso prévio ou multa de 40% do FGTS.",
            analysis: `
                <p>Muitos trabalhadores confundem o 'término' com 'demissão'. Se você trabalhou os 90 dias e a empresa te dispensou no último dia, você tem direito ao saque do FGTS, mas não à multa. Se ela te dispensar no 45º dia (meio do contrato), ela deve pagar uma indenização (Art. 479 da CLT).</p>
            `,
            lawText: "CLT, Art. 443, § 2º: 'Considera-se como de prazo determinado o contrato de trabalho cuja vigência dependa de termo prefixado... b) de caráter probatório (experiência).'",
            rightsList: {
                title: "🏁 O que recebe no Término (90 dias):",
                items: [
                    { label: "Saldo de Salário:", desc: "Dias trabalhados no mês final." },
                    { label: "13º Proporcional:", desc: "Referente aos meses de experiência." },
                    { label: "Férias Proporcionais + 1/3:", desc: "Direito garantido mesmo em contratos curtos." },
                    { label: "Saque FGTS:", desc: "Liberado pelo código 04 (Término de contrato)." }
                ]
            },
            faq: [
                { question: "Recebo multa de 40% se o contrato acabar?", answer: "Não. A multa só é devida se a empresa te demitir ANTES do prazo final da experiência chegar." },
                { question: "Tenho direito a seguro desemprego?", answer: "No término de contrato por prazo determinado, não há direito ao seguro desemprego." }
            ]
        }
    }
];
