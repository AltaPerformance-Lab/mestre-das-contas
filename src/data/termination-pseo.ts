export interface TerminationPSeoCase {
    slug: string;
    title: string;
    reasonLabel: string; // O que aparece no select do calculador
    description: string;
    keywords: string[];
    articleContent: {
        intro: string;
        analysis?: string; // Detailed textual analysis
        lawText?: string;  // Specific legislation text
        rightsList?: {
            title: string;
            items: { label: string; desc: string }[];
        };
        faq: { question: string; answer: string }[]; // Exactly 7 FAQs for all cases
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
                { question: "O que acontece se a empresa atrasar o pagamento da rescisão?", answer: "Se a empresa não depositar a rescisão em até 10 dias corridos a contar do fim do contrato, ela é obrigada a pagar uma multa no valor exato de um salário mensal em favor do funcionário (Multa do Art. 477 da CLT)." },
                { question: "Posso sacar o FGTS acumulado em caso de demissão sem justa causa?", answer: "Sim. A demissão sem justa causa autoriza o saque de 100% dos depósitos da conta vinculada do FGTS, exceto se o empregado tiver aderido previamente ao regime de Saque-Aniversário, hipótese em que saca apenas a multa rescisória de 40%." },
                { question: "Como é calculado o aviso prévio indenizado?", answer: "O aviso prévio indenizado corresponde ao pagamento de 30 dias de salário integral, acrescidos de 3 dias extras para cada ano trabalhado na mesma empresa, limitando-se ao teto máximo de 90 dias, conforme a Lei do Aviso Prévio Proporcional." },
                { question: "O que é a multa compensatória de 40% do FGTS?", answer: "É uma indenização paga pelo empregador calculada sobre a totalidade de todos os depósitos mensais de FGTS realizados ao longo da relação de emprego, incluindo a correção monetária, mesmo se o funcionário tiver efetuado saques parciais anteriormente." },
                { question: "Como dar entrada no seguro-desemprego após ser demitido?", answer: "O trabalhador deve utilizar o número de requerimento emitido pelo empregador e dar entrada de forma 100% digital pelo portal Gov.br ou pelo aplicativo 'Carteira de Trabalho Digital' no prazo de 7 a 120 dias após o término do vínculo." },
                { question: "O adicional de periculosidade ou insalubridade entra na rescisão?", answer: "Sim. Os adicionais recebidos habitualmente de forma mensal integram a base de cálculo para a apuração do aviso prévio, férias proporcionais, 1/3 constitucional e décimo terceiro salário proporcional." },
                { question: "Quem tem estabilidade provisória pode ser demitido sem justa causa?", answer: "Não, salvo se a empresa pagar uma indenização correspondente a todo o período restante da estabilidade assegurada por lei (como no caso de gestantes, dirigentes sindicais ou acidentados)." }
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
                { question: "A empresa é obrigada a aceitar a dispensa do aviso prévio no pedido de demissão?", answer: "Não. A empresa pode exigir o cumprimento do aviso de 30 dias. Se você optar por não cumprir e a empresa não dispensar o expediente, o valor correspondente a 30 dias de salário será integralmente descontado da rescisão." },
                { question: "Recebo férias proporcionais e 13º salário ao pedir demissão?", answer: "Sim. O pedido de demissão garante o recebimento do saldo de salários do mês, férias vencidas (se houver) + 1/3, férias proporcionais + 1/3 e o décimo terceiro salário proporcional normalmente." },
                { question: "O que acontece com meu FGTS acumulado após pedir demissão?", answer: "O saldo acumulado na conta vinculada permanece retido na conta do FGTS rendendo a remuneração básica legal. Você não poderá sacar de imediato, exceto em hipóteses futuras como aquisição de casa própria ou aposentadoria." },
                { question: "Posso receber seguro-desemprego se pedir demissão?", answer: "Não. O programa de seguro-desemprego foi desenhado para proteger trabalhadores demitidos involuntariamente sem justa causa. Pedidos de demissão são voluntários e retiram esse direito." },
                { question: "Como funciona o desconto do aviso prévio não cumprido?", answer: "Se o trabalhador solicitar a dispensa imediata e não cumprir os 30 dias de aviso trabalhado exigidos pelo empregador, a empresa abate exatamente o valor de um salário bruto nominal no cálculo final da rescisão." },
                { question: "Preciso formalizar o pedido de demissão por escrito?", answer: "Sim. Para resguardar ambas as partes de mal-entendidos jurídicos, o funcionário deve redigir uma carta de pedido de demissão de próprio punho contendo a data e a indicação de cumprimento ou não do aviso." },
                { question: "Posso desistir do pedido de demissão após ter entregue a carta?", answer: "A desistência só produzirá efeitos jurídicos se a empresa aceitar formalmente a anulação do pedido antes do decurso do prazo final do aviso prévio correspondente." }
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
                { question: "A empresa é obrigada a aceitar a rescisão por acordo comum?", answer: "Não. Como o próprio nome diz, a rescisão consensual exige a livre concordância e consenso de ambas as partes. Nenhuma empresa ou funcionário pode coagir o outro a aderir ao distrato." },
                { question: "Qual é o valor da multa do FGTS na rescisão por acordo comum?", answer: "A multa rescisória compensatória devida pelo empregador cai pela metade nesta modalidade, correspondendo a 20% sobre o montante dos saldos históricos depositados na conta vinculada." },
                { question: "Quantos por cento do saldo do FGTS posso sacar no acordo comum?", answer: "O trabalhador é autorizado a realizar o saque imediato de até 80% do saldo total acumulado de sua conta do FGTS na Caixa Econômica Federal." },
                { question: "Trabalhador que faz acordo consensual tem direito ao seguro-desemprego?", answer: "Não. A legislação veda a habilitação e o recebimento de parcelas do seguro-desemprego para funcionários desligados via distrato ou acordo de comum acordo." },
                { question: "Como funciona o aviso prévio indenizado no acordo comum?", answer: "Se o aviso prévio for indenizado, o trabalhador tem o direito de receber metade do valor correspondente (15 dias de salário nominal). Se for trabalhado, cumpre 30 dias e recebe integral." },
                { question: "Quais verbas são pagas integralmente no acordo consensual?", answer: "As verbas de férias vencidas e proporcionais + 1/3 constitucional, saldo de salários do mês e o décimo terceiro salário proporcional são pagos de forma 100% integral no acordo comum." },
                { question: "O acordo comum precisa ser homologado no sindicato?", answer: "A Reforma Trabalhista retirou a obrigatoriedade de homologação no sindicato para a validação da rescisão por acordo comum, bastando a assinatura do termo de distrato mútuo." }
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
            faq: [
                { question: "Quais motivos previstos em lei autorizam a demissão por justa causa?", answer: "O artigo 482 da CLT lista taxativamente as hipóteses, que englobam desídia (preguiça/desleixo), indisciplina, insubordinação, embriaguez em serviço, ato de improbidade (furto/fraude) e abandono de emprego." },
                { question: "Quais verbas rescisórias o trabalhador recebe na justa causa?", answer: "O trabalhador recebe apenas o saldo de salário dos dias trabalhados no respectivo mês e o saldo de férias vencidas (se houver) + 1/3 constitucional. Férias proporcionais não são pagas." },
                { question: "O que o trabalhador perde ao ser demitido por justa causa?", answer: "Perde-se o direito de receber o aviso prévio, décimo terceiro proporcional, férias proporcionais, a multa de 40%, o direito ao saque de qualquer valor do FGTS e a habilitação no seguro-desemprego." },
                { question: "A empresa pode aplicar justa causa sem dar advertências prévias?", answer: "Sim, caso a falta cometida pelo funcionário seja de extrema gravidade (como vias de fato/agressão ou roubo) que quebre imediatamente a confiança contratual mútua." },
                { question: "É possível reverter a justa causa na Justiça do Trabalho?", answer: "Sim. Caso a empresa não consiga provar de forma incontestável a gravidade do ato do trabalhador ou tenha agido com desproporcionalidade, a dispensa pode ser revertida judicialmente para demissão sem justa causa." },
                { question: "A demissão por justa causa fica anotada na Carteira de Trabalho?", answer: "Não. A legislação proíbe o empregador de realizar anotações desabonadoras na CTPS (Carteira de Trabalho), incluindo menções ao motivo da justa causa, sob pena de processo por danos morais." },
                { question: "Como funciona o prazo de pagamento do acerto na justa causa?", answer: "O prazo legal permanece rigorosamente idêntico ao das outras modalidades de demissão: até 10 dias corridos a contar da data de notificação da dispensa." }
            ],
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
                { question: "Estagiário recebe 13º salário proporcional?", answer: "A Lei do Estágio não obriga o pagamento de gratificação de 13º salário. Contudo, a empresa concedente pode pagar opcionalmente ou se estiver pré-estabelecido em contrato." },
                { question: "Como funciona o recesso remunerado proporcional na rescisão de estágio?", answer: "Para cada mês trabalhado, o estagiário adquire direito a 2,5 dias de recesso. No fechamento do contrato, a empresa deve indenizar em dinheiro todos os dias de recesso não usufruídos." },
                { question: "É necessário cumprir aviso prévio na rescisão do contrato de estágio?", answer: "Não. Como o estágio não estabelece vínculo CLT, qualquer uma das partes pode dar por rescindido o termo de compromisso imediatamente sem exigência de aviso ou indenização financeira." },
                { question: "Estagiário tem direito ao saque do FGTS ou multa rescisória?", answer: "Não. Não há recolhimento de Fundo de Garantia do Tempo de Serviço (FGTS) na bolsa de estágio e, portanto, inexistem depósitos ou multas compensatórias de desligamento." },
                { question: "A rescisão antecipada do estágio gera alguma indenização para as partes?", answer: "Nenhuma das partes responde por multas rescisórias por quebra antecipada de contrato, devido ao caráter essencialmente pedagógico da relação jurídica." },
                { question: "Quem estagia tem direito a receber seguro-desemprego?", answer: "Não. Por não possuir cadastro CLT e nem vínculo empregatício formal, estagiários desligados não integram o programa de seguro-desemprego do Governo Federal." },
                { question: "Como deve ser formalizado o desligamento do estagiário?", answer: "A formalização ocorre mediante assinatura de um termo de rescisão de estágio, acompanhado obrigatoriamente de um termo de realização de estágio contendo o sumário das atividades executadas." }
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
                { question: "O jovem aprendiz tem direito a seguro-desemprego ao fim do contrato?", answer: "Sim, caso ocorra demissão antecipada sem justa causa promovida pelo empregador e o aprendiz atenda aos quesitos regulares de carência do Ministério do Trabalho." },
                { question: "Qual é a alíquota mensal de depósito do FGTS para o jovem aprendiz?", answer: "Ao contrário dos 8% descontados para empregados CLT tradicionais, a alíquota legal de recolhimento de FGTS devida pela empresa para o jovem aprendiz é de apenas 2%." },
                { question: "O que acontece se o contrato do aprendiz for encerrado antecipadamente?", answer: "Se ocorrer dispensa sem justa causa promovida pela empresa antes do prazo, o aprendiz tem direito a receber todas as verbas normais e indenizações, bem como a multa do FGTS." },
                { question: "O jovem aprendiz recebe multa rescisória de 40% ao fim do contrato?", answer: "Não, se a rescisão decorrer do término normal do prazo estipulado em contrato (tempo de vigência final). A multa de 40% só é devida na dispensa imotivada precoce." },
                { question: "Como são calculadas as férias e o 13º proporcional do jovem aprendiz?", answer: "Os cálculos seguem as normas CLT idênticas às do trabalhador comum, rateados na proporção de avos pelos meses trabalhados com fração superior a 15 dias de serviço." },
                { question: "Quais são os motivos legais para a rescisão antecipada por justa causa do aprendiz?", answer: "São a falta de aproveitamento escolar, ausência sem justificativa às aulas do curso profissionalizante, faltas injustificadas na empresa ou inadequação grave de comportamento." },
                { question: "O jovem aprendiz tem direito ao saque do FGTS no término regular do contrato?", answer: "Sim. A rescisão pelo término natural do contrato por prazo determinado autoriza o aprendiz a sacar integralmente os depósitos da conta vinculada (código 04)." }
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
                { question: "Recebo a multa compensatória de 40% do FGTS no término da experiência?", answer: "Não. Se o contrato for extinto no prazo de vigência regular acordado previamente, o desligamento não é considerado demissão arbitrária e não enseja pagamento da multa." },
                { question: "Tenho direito a sacar o FGTS ao fim do contrato de experiência de 90 dias?", answer: "Sim. A rescisão por término regular de contrato de experiência por prazo determinado permite o saque integral dos depósitos da conta do FGTS na Caixa." },
                { question: "O término do contrato de experiência no prazo dá direito ao seguro-desemprego?", answer: "Não. Não há concessão de seguro-desemprego para o encerramento regular de contratos temporários ou por prazo de experiência preestabelecido." },
                { question: "Como funciona a rescisão antecipada por iniciativa do empregador?", answer: "Se a empresa demitir o funcionário sem justa causa antes do prazo final da experiência, ela deve pagar as verbas integrais, aviso prévio indenizado ou a indenização prevista no Art. 479 da CLT." },
                { question: "O que acontece se o trabalhador rescindir o contrato antes do fim da experiência?", answer: "Se o trabalhador sair antes do fim, ele deve indenizar a empresa pelos prejuízos que causar, valor este que fica limitado à metade da remuneração a que teria direito até o fim do contrato." },
                { question: "O contrato de experiência pode durar mais do que 90 dias?", answer: "Não. O prazo máximo permitido por lei para o período probatório de experiência é de rigorosamente 90 dias, admitindo-se apenas uma única prorrogação dentro desse limite." },
                { question: "A gravidez durante o contrato de experiência gera estabilidade?", answer: "Sim. Conforme entendimento consolidado do TST (Súmula 244), a empregada gestante tem direito à estabilidade provisória mesmo no decorrer de contratos por prazo determinado." }
            ]
        }
    }
];
