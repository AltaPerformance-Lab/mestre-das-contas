export interface MEIActivity {
    slug: string;
    jobTitle: string; // Ex: "Pedreiro Independente"
    category: "Serviços" | "Comércio" | "Indústria";
    description: string;
    cnae: string; // Código CNAE
    keywords: string[];
    articleContent?: {
        intro: string;
        pros: string[];
        cons: string[];
        faq?: { question: string; answer: string }[];
    };
}

export const meiActivities: MEIActivity[] = [
    {
        slug: "mei-pedreiro",
        jobTitle: "Pedreiro (Alvenaria)",
        category: "Serviços",
        description: "Construção de alvenaria e serviços relacionados.",
        cnae: "4399-1/03",
        keywords: ["mei pedreiro valor", "das mei pedreiro", "cnae pedreiro"],
        articleContent: {
            intro: "O <strong>Pedreiro MEI</strong> é uma das categorias mais importantes da construção civil. Formalizar-se como microempreendedor permite emitir notas fiscais para construtoras e participar de licitações públicas de pequeno porte.",
            pros: [
                "Acesso a aposentadoria e auxílio-doença.",
                "Pode contratar até um ajudante formalizado.",
                "Facilidade para comprar materiais em atacados com desconto de CNPJ."
            ],
            cons: [
                "Limite de faturamento de R$ 81 mil pode ser baixo para grandes obras.",
                "Não pode ter sócios ou outras empresas no nome."
            ]
        }
    },
    {
        slug: "mei-marketing-direto",
        jobTitle: "Social Media / Marketing Direto",
        category: "Serviços",
        description: "Serviços de marketing direto e gestão de redes sociais.",
        cnae: "7319-0/03",
        keywords: ["mei social media", "cnae gestor de trafego mei", "marketing digital mei", "pode ser mei social media"],
        articleContent: {
            intro: "Trabalhar com <strong>Social Media como MEI</strong> é possível através do CNAE de Marketing Direto. É a forma mais barata de ter um CNPJ para prestar serviços para empresas e agências.",
            pros: [
                "Imposto fixo baixo (DAS), ideal para quem está começando.",
                "Emissão de nota fiscal para agências (B2B).",
                "Possibilidade de contratar softwares americanos com Invoice de empresa."
            ],
            cons: [
                "Atividades de publicidade pura (agência) são vedadas; o foco deve ser marketing direto.",
                "Limite de faturamento de R$ 6.750,00 por mês."
            ],
            faq: [
                { question: "Gestor de Tráfego pode ser MEI?", answer: "Sim, muitos utilizam o CNAE de Marketing Direto (7319-0/03) para atuar de forma regularizada como autônomo." }
            ]
        }
    },
    {
        slug: "mei-tecnico-ti",
        jobTitle: "Técnico de TI / Suporte",
        category: "Serviços",
        description: "Reparação e manutenção de computadores e equipamentos periféricos.",
        cnae: "9511-8/00",
        keywords: ["mei ti", "tecnico de informatica mei", "cnae suporte ti mei", "abrir mei para ti"],
        articleContent: {
            intro: "O <strong>MEI para TI</strong> é focado em manutenção e suporte técnico. Programadores e desenvolvedores de software possuem regras diferentes (não podem ser MEI), mas o técnico de hardware e rede é muito bem-vindo nesta categoria.",
            pros: [
                "Ideal para quem faz manutenção em domicílio ou possui pequena oficina.",
                "Pode vender peças de reposição se incluir o CNAE de comércio.",
                "Acesso a softwares de gestão gratuitos para pequenos técnicos."
            ],
            cons: [
                "Não permite a atividade de desenvolvimento de sistemas customizáveis.",
                "Risco de desenquadramento se o serviço se tornar consultoria complexa."
            ]
        }
    },
    {
        slug: "mei-editor-video",
        jobTitle: "Editor de Vídeo (Pós-Produção)",
        category: "Serviços",
        description: "Atividades de pós-produção cinematográfica, de vídeos e de programas de televisão.",
        cnae: "5912-0/99",
        keywords: ["mei editor de video", "cnae edição de video mei", "trabalhar como editor pj", "imposto editor de video"],
        articleContent: {
            intro: "Se você é <strong>Editor de Vídeo</strong> e trabalha para canais do YouTube ou produtoras, o MEI é o caminho mais rápido para a formalização. O CNAE de pós-produção permite emitir notas para clientes em todo o Brasil.",
            pros: [
                "Carga tributária mínima comparada ao Lucro Presumido.",
                "Pode faturar para o exterior com isenção de impostos de consumo.",
                "Acesso a leasing de equipamentos (Câmeras/Workstations) com taxas de CNPJ."
            ],
            cons: [
                "Limite de faturamento pode ser atingido rapidamente por editores de alto ticket.",
                "Exige disciplina no controle de gastos para não estourar o limite anual."
            ]
        }
    },
    {
        slug: "mei-cabeleireiro",
        jobTitle: "Cabeleireiro(a)",
        category: "Serviços",
        description: "Serviços de tratamento de beleza e estética.",
        cnae: "9602-5/01",
        keywords: ["mei salão de beleza", "quanto paga mei cabeleireira", "cnae cabeleireiro"]
    },
    {
        slug: "mei-entregador",
        jobTitle: "Entregador de Encomendas",
        category: "Serviços",
        description: "Serviços de entrega rápida (motoboy).",
        cnae: "5320-2/02",
        keywords: ["mei ifood entregador", "das mei motoboy", "limite mei entregador"]
    },
    {
        slug: "mei-mecanico",
        jobTitle: "Mecânico de Veículos",
        category: "Serviços",
        description: "Manutenção e reparação mecânica de veículos automotores.",
        cnae: "4520-0/01",
        keywords: ["mei oficina mecanica", "nota fiscal mecanico mei", "cnae mecanico"]
    },
    {
        slug: "mei-eletricista",
        jobTitle: "Eletricista",
        category: "Serviços",
        description: "Instalação e manutenção elétrica.",
        cnae: "4321-5/00",
        keywords: ["mei eletricista", "cnae eletricista", "das eletricista independente"]
    },
    {
        slug: "mei-manicure",
        jobTitle: "Manicure e Pedicure",
        category: "Serviços",
        description: "Atividades de manicure, pedicure e outros serviços de cuidados com a beleza.",
        cnae: "9602-5/01",
        keywords: ["mei manicure", "limite faturamento manicure", "cnae unhas mei", "abrir mei manicure"],
        articleContent: {
            intro: "A <strong>Manicure MEI</strong> é uma das profissões que mais cresce no Brasil. Formalizar-se permite que você trabalhe em salões de luxo ou abra seu próprio estúdio com segurança jurídica e benefícios do INSS.",
            pros: [
                "Aposentadoria garantida pelo pagamento do DAS.",
                "Auxílio-maternidade após o período de carência.",
                "Pode comprar esmaltes e materiais em atacado com desconto."
            ],
            cons: [
                "Não pode ultrapassar o limite de faturamento anual de R$ 81.000,00.",
                "Necessidade de seguir normas rigorosas da Vigilância Sanitária local."
            ],
            faq: [
                { question: "Manicure pode trabalhar no salão parceiro?", answer: "Sim! A Lei do Salão Parceiro regulamenta a relação entre o MEI e o salão de beleza, evitando o vínculo empregatício e protegendo ambas as partes." }
            ]
        }
    },
    {
        slug: "mei-esteticista",
        jobTitle: "Esteticista Independente",
        category: "Serviços",
        description: "Atividades de estética e outros serviços de cuidados com a beleza.",
        cnae: "9602-5/02",
        keywords: ["mei esteticista", "limite faturamento estetica", "cnae esteticista independente"],
        articleContent: {
            intro: "A <strong>Esteticista como MEI</strong> pode realizar procedimentos faciais, corporais e depilação de forma regularizada. É a base para quem deseja crescer no mercado de beleza de alto ticket.",
            pros: [
                "Possibilidade de financiar equipamentos de estética com juros de CNPJ.",
                "Formalização de parcerias com clínicas médicas e dermatológicas.",
                "Emissão de nota fiscal para venda de pacotes de tratamentos."
            ],
            cons: [
                "Restrição para procedimentos invasivos que exigem formação médica ou de enfermagem.",
                "Fiscalização sanitária constante."
            ]
        }
    }
];
