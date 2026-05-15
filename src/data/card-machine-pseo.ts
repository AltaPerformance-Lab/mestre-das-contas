
export interface CardMachinePSeo {
    slug: string;
    name: string; // Ex: "Ton T3 Promo"
    brandColor: string; // Ex: "green"
    mdr: number; // Taxa (%)
    anticipation: number; // Taxa (%)
    title: string;
    description: string;
    keywords: string[];
    initialInstallments?: string;
    referralUrl?: string; // Link de indicação/afiliado
    extraFees?: { label: string; value: number }[]; // Taxas adicionais (ex: taxa de adesão)
    // Mudança para dados enriquecidos
    articleContent: {
        introTitle: string;
        introText: string;
        highlightsTitle: string;
        highlights: string[];
        analysis?: string; // New: Deeper analysis
        faq?: { question: string; answer: string }[];
        closingText: string;
    };
}

// T3 Promo
export const cardMachineCases: CardMachinePSeo[] = [
    {
        slug: "ton-t3-promo",
        name: "Ton T3 (PromoTon)",
        brandColor: "emerald",
        mdr: 0.99,
        anticipation: 9.90, // Ajuste para refletir melhor a taxa total de 12x que suele ser alta se não for promocional, mas aqui é simulador
        title: "Calculadora de Taxas Ton T3 (Plano PromoTon)",
        description: "Simule suas vendas na maquininha Ton T3. Descubra quanto sobra no bolso com as taxas do plano PromoTon e se vale a pena antecipar.",
        keywords: ["taxas ton t3", "simulador ton", "calculadora ton t3", "maquininha ton taxas"],
        initialInstallments: "12",
        referralUrl: "https://www.ton.com.br/checkout/#/cart?coupon=MESTREDASCONTAS10&utm_source=affiliate&utm_medium=invite_share&utm_campaign=MESTREDASCONTAS10",
        articleContent: {
            introTitle: "A Ton T3 vale a pena?",
            introText: "A <strong>Ton T3</strong> é a \"queridinha\" de quem vende muito. No plano PromoTon (ou UltraTon, dependendo da vigência), ela oferece algumas das menores taxas do mercado, especialmente para quem antecipa vendas parceladas em 12x. É uma máquina robusta, com bobina e bateria de longa duração.",
            analysis: `
                <p>O grande diferencial da Ton (empresa do grupo Stone) é a garantia vitalícia e o modelo de comodato disfarçado de venda (você paga uma adesão, não aluguel). As taxas são dinâmicas: quanto mais você vende, menor a taxa.</p>
                <p>Para quem fatura acima de <strong>R$ 2.000,00 mensais</strong>, o plano PromoTon é imbatível. Abaixo disso, as taxas podem migrar automaticamente para o plano Mega, que é um pouco mais caro. Fique atento a essa regra de faturamento mínimo para manter a taxa baixa.</p>
            `,
            highlightsTitle: "✅ Pontos Fortes",
            highlights: [
                "Taxas agressivas para antecipação (receber em 1 dia).",
                "Garantia vitalícia e troca grátis em caso de defeito.",
                "Conexão Chip 4G e Wi-Fi (não precisa de celular)."
            ],
            faq: [
                { question: "O dinheiro cai na hora?", answer: "Não, na Ton o recebimento padrão é em 1 dia útil (D+1). Não cai em fins de semana." },
                { question: "Preciso de CNPJ?", answer: "Não, a Ton aceita cadastro de CPF (Pessoa Física) sem burocracia." }
            ],
            closingText: "Se o seu foco é vender parcelado e você tem um volume constante de vendas, a T3 Promo é provavelmente a opção que vai deixar mais dinheiro no seu bolso."
        }
    },
    // Mercado Pago
    {
        slug: "mercadopago-point-pro",
        name: "Mercado Pago Point Pro 2",
        brandColor: "blue",
        mdr: 3.03,
        anticipation: 12.50, // Estimativa de taxa total parcelado
        title: "Simulador Mercado Pago Point Pro 2",
        description: "Calcule os descontos da maquininha Point Pro 2 do Mercado Pago. Veja quanto você recebe na hora na sua Conta Mercado Pago.",
        keywords: ["taxas mercado pago", "simulador point pro 2", "calculadora mercado pago", "tarifa point"],
        initialInstallments: "1",
        articleContent: {
            introTitle: "A Força do Ecossistema Mercado Pago",
            introText: "A <strong>Point Pro 2</strong> não é apenas uma maquininha, é a porta de entrada para um banco completo. A grande vantagem aqui não é apenas a taxa (que é competitiva), mas a velocidade: o dinheiro cai na hora, inclusive fins de semana e feriados.",
            analysis: `
                <p>O Mercado Pago se destaca pela <strong>liquidez imediata</strong>. Vendeu, o dinheiro está na conta digital rendendo CDI (acima da poupança). Isso é vital para pequenos comerciantes que precisam girar o estoque rápido.</p>
                <p>A máquina imprime comprovante, tem bateria de longa duração e aceita pagamentos por QR Code e NFC, integrando-se nativamente com o app do Mercado Livre.</p>
            `,
            highlightsTitle: "⚡ Dinheiro na Hora",
            highlights: [
                "Recebimento instantâneo (D+0) todos os dias.",
                "Sem aluguel e sem taxa de adesão (você compra a máquina).",
                "Conta digital gratuita e cartão de crédito (sujeito a análise)."
            ],
            faq: [
                { question: "Tem taxa de aluguel?", answer: "Não, você compra a máquina e ela é sua. Não há mensalidade." },
                { question: "Aceita voucher alimentação?", answer: "Sim, a Point Pro 2 aceita as principais bandeiras de vale (Alelo, Sodexo, VR), mas você precisa habilitar isso com seu CNPJ." }
            ],
            closingText: "Para quem precisa de <strong>fluxo de caixa imediato</strong> para repor mercadoria no mesmo dia, essa é a melhor opção. As taxas podem ser um pouco maiores que as da Ton em alguns cenários, mas a liquidez compensa."
        }
    },
    // InfinitePay
    {
        slug: "infinitepay-smart",
        name: "InfinitePay InfiniteSmart",
        brandColor: "slate",
        mdr: 3.15,
        anticipation: 8.90, // InfinitePay geralmente tem as melhores taxas 12x
        title: "Calculadora InfinitePay (Taxas 2026)",
        description: "Simule as taxas da InfinitePay. Conhecida por ter as melhores taxas no parcelado em 12x do Brasil. Veja quanto sobra.",
        keywords: ["infinitepay taxas", "simulador infinitepay", "calculadora infinite smart", "infinitepay 12x"],
        initialInstallments: "10",
        referralUrl: "http://buy.infinitepay.io/smart?rid=hdcrepresentacoes",
        articleContent: {
            introTitle: "A Revolução das Taxas no Parcelado",
            introText: "A <strong>InfinitePay</strong> chegou chutando a porta com taxas de parcelamento incrivelmente baixas. Para quem vende produtos de alto ticket (eletrônicos, móveis) em 10x ou 12x, ela costuma ser imbatível, oferecendo mais lucro para o lojista.",
            analysis: `
                <p>Diferente de outras empresas, a InfinitePay repassa taxas muito próximas das cobradas pelas bandeiras, ganhando no volume. O modelo é muito transparente.</p>
                <p>A máquina InfiniteSmart é baseada em Android, funcionando como um smartphone. Ela é rápida, tem tela touch grande e permite instalar apps de gestão. O recebimento é em 1 dia útil.</p>
            `,
            highlightsTitle: "🚀 Foco no Lucro Real",
            highlights: [
                "Taxas de parcelamento muito abaixo da média de mercado.",
                "Recebimento em 1 dia útil (D+1).",
                "Sistema Android: moderna, rápida e intuitiva."
            ],
            faq: [
                { question: "Posso usar CPF?", answer: "Não. A InfinitePay só aceita CNPJ (MEI, Eireli, Ltda, etc)." },
                { question: "Qual a bandeira da máquina?", answer: "Ela aceita Visa, Master, Elo e Hipercard. A aceitação é boa, mas não abrange vouchers regionais." }
            ],
            closingText: "<strong>Atenção:</strong> A InfinitePay é rigorosa no cadastro e focada em CNPJ. Se você se enquadra, é provavelmente a máquina que vai te dar o maior lucro líquido no final do mês."
        }
    },
    // PagSeguro
    {
        slug: "pagseguro-moderninha-pro",
        name: "PagBank Moderninha Pro",
        brandColor: "yellow",
        mdr: 3.79,
        anticipation: 11.50,
        title: "Simulador Moderninha Pro (PagBank)",
        description: "Calcule taxas da Moderninha Pro do PagSeguro. Veja as opções de recebimento na hora, 14 dias ou 30 dias.",
        keywords: ["taxas moderninha", "simulador pagseguro", "calculadora moderninha pro", "tarifa pagbank"],
        initialInstallments: "3",
        referralUrl: "https://pagbank.vc/indica-maquininhas-ad67c77f3",
        articleContent: {
            introTitle: "A Mais Popular do Brasil",
            introText: "A <strong>Moderninha Pro</strong> é um clássico nos balcões brasileiros. Robusta, imprime comprovante e aguenta o tranco de uma loja movimentada. O PagBank oferece flexibilidade: você pode escolher receber na hora (taxas maiores) ou em 30 dias (taxas menores).",
            analysis: `
                <p>O PagBank (antigo PagSeguro) construiu um ecossistema gigante. Ter uma Moderninha facilita o acesso a empréstimos, cartões de crédito e até investimentos dentro do app PagBank.</p>
                <p>Ao abrir sua conta pelo link de indicação, você garante um banco completo e gratuito, sem burocracias e tarifas, ideal para gerir o lucro das suas vendas.</p>
                <p><strong>Destaque:</strong> As maquininhas PagBank não possuem aluguel, oferecem cashback no valor da adesão e contam com 5 anos de garantia.</p>
            `,
            highlightsTitle: "🏆 Confiabilidade e Aceitação",
            highlights: [
                "5 anos de garantia (uma das maiores do mercado).",
                "Aceita praticamente todas as bandeiras e vouchers (VR, VA, Alelo).",
                "<strong>Conta Grátis PagBank:</strong> <a href='https://pagbank.vc/indica-conta-a702ca65c' target='_blank' rel='noopener noreferrer'>Abra sua conta aqui</a>.",
                "Cashback no valor da maquininha e bateria de longa duração."
            ],
            faq: [
                { question: "Tem taxa de aluguel?", answer: "Não! Você compra a máquina (paga a adesão) e ela é sua para sempre. No PagBank, você ainda pode receber cashback desse valor." },
                { question: "Preciso de celular?", answer: "Não, a Moderninha Pro tem chip próprio 4G e Wi-Fi grátis." },
                { question: "Aceita VR e VA?", answer: "Sim! É uma das máquinas com maior aceitação de vales do mercado, ideal para restaurantes e mercados." }
            ],
            closingText: "Se o seu negócio depende de vouchers refeição/alimentação ou você quer a segurança de uma marca consolidada com conta digital integrada, a Moderninha é a escolha segura."
        }
    },
    {
        slug: "sumup-solo",
        name: "SumUp Solo",
        brandColor: "cyan",
        mdr: 1.90,
        anticipation: 10.50,
        title: "Calculadora de Taxas SumUp Solo",
        description: "Simule suas vendas na SumUp Solo. Veja as taxas no débito, crédito e parcelado em 12x para autônomos e pequenos negócios.",
        keywords: ["taxas sumup", "simulador sumup solo", "calculadora sumup", "tarifa sumup parcelado"],
        initialInstallments: "1",
        articleContent: {
            introTitle: "SumUp Solo: A Máquina que Não Precisa de Celular",
            introText: "A <strong>SumUp Solo</strong> é a opção ideal para quem busca simplicidade e transparência. Sem aluguel, ela é compacta, possui tela touch e vem com base de carregamento. A SumUp é mundialmente conhecida pelo excelente atendimento ao cliente.",
            analysis: `
                <p>O grande trunfo da SumUp é a <strong>clareza das taxas</strong>. Você sabe exatamente quanto vai pagar sem letras miúdas. Para quem está começando e não quer se preocupar com planos complexos de faturamento mínimo, ela é a escolha racional.</p>
                <p>Ela aceita as principais bandeiras (Visa, Master, Elo, Hipercard e Amex) e o dinheiro cai na sua conta bancária em até 1 dia útil.</p>
            `,
            highlightsTitle: "💎 Diferenciais SumUp",
            highlights: [
                "Transparência total nas taxas (sem planos escondidos).",
                "Suporte humanizado premiado.",
                "Design moderno e base de carregamento inclusa."
            ],
            faq: [
                { question: "Tem aluguel?", answer: "Não. Você compra a máquina e ela é sua." },
                { question: "Aceita aproximação (NFC)?", answer: "Sim, aceita cartões de aproximação, Apple Pay e Google Pay." }
            ],
            closingText: "Para o pequeno empreendedor que quer uma máquina confiável e fácil de usar, a SumUp Solo é um dos melhores investimentos do mercado."
        }
    },
    {
        slug: "stone-maquininha",
        name: "Stone (Plano Personalizado)",
        brandColor: "green",
        mdr: 0.85,
        anticipation: 8.50,
        title: "Calculadora de Taxas Stone para Empresas",
        description: "Simule as taxas da maquininha Stone. Ideal para negócios com faturamento acima de R$ 15 mil mensais. Planos sob medida.",
        keywords: ["taxas stone", "simulador stone", "calculadora stone", "maquininha stone para empresas"],
        initialInstallments: "12",
        articleContent: {
            introTitle: "Stone: Soluções para quem quer crescer",
            introText: "A <strong>Stone</strong> é focada no lojista médio e grande. Diferente da Ton (focada em autônomos), a Stone oferece um gerente de conta dedicado e taxas negociáveis de acordo com o seu faturamento real. Se você vende mais de R$ 15 mil por mês, a Stone é para você.",
            analysis: `
                <p>A Stone se destaca pelo <strong>atendimento em até 5 segundos</strong> e pela logística verde (os "Green Angels") que trocam sua máquina em tempo recorde caso ela apresente defeito. O ecossistema Stone inclui conta PJ, ERP e integração total com o balcão.</p>
                <p>As taxas aqui são simuladas para faturamentos maiores, onde a margem de negociação é maior. O "Efeito Stone" é ter um parceiro de negócio, não apenas uma maquininha.</p>
            `,
            highlightsTitle: "🏢 Foco no Varejo",
            highlights: [
                "Gerente de conta exclusivo para o seu negócio.",
                "Taxas reduzidas conforme o aumento do faturamento.",
                "Atendimento ultra rápido e troca presencial da máquina."
            ],
            faq: [
                { question: "A Stone tem aluguel?", answer: "Geralmente sim, mas o valor do aluguel pode ser zerado (isento) se o seu faturamento atingir uma meta mensal combinada com o gerente." },
                { question: "Aceita todos os vouchers?", answer: "Sim, a Stone possui uma das maiores compatibilidades de vales (refeição, alimentação, combustível) do Brasil." }
            ],
            closingText: "Se o seu negócio já está consolidado e você precisa de suporte de alto nível, a Stone é o padrão ouro do mercado brasileiro."
        }
    }
];
