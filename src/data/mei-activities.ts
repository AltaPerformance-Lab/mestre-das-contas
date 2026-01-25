export interface MEIActivity {
    slug: string;
    jobTitle: string; // Ex: "Pedreiro Independente"
    category: "Serviços" | "Comércio" | "Indústria";
    description: string;
    cnae: string; // Código CNAE
    keywords: string[];
}

export const meiActivities: MEIActivity[] = [
    {
        slug: "mei-pedreiro",
        jobTitle: "Pedreiro (Alvenaria)",
        category: "Serviços",
        description: "Construção de alvenaria e serviços relacionados.",
        cnae: "4399-1/03",
        keywords: ["mei pedreiro valor", "das mei pedreiro", "cnae pedreiro"]
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
        slug: "mei-ubermoto",
        jobTitle: "Motorista de App (Moto)",
        category: "Serviços",
        description: "Transporte de passageiros por motocicleta.",
        cnae: "4923-0/01",
        keywords: ["uber moto pode ser mei", "mei moto taxi", "cnae motorista app"]
    },
    {
        slug: "mei-esteticista",
        jobTitle: "Esteticista",
        category: "Serviços",
        description: "Atividades de estética e outros serviços de cuidados com a beleza.",
        cnae: "9602-5/02",
        keywords: ["mei esteticista", "limite faturamento estetica", "cnae esteticista independente"]
    },
    {
        slug: "mei-comerciante-vestuario",
        jobTitle: "Comerciante de Vestuário",
        category: "Comércio",
        description: "Comércio varejista de artigos do vestuário e acessórios.",
        cnae: "4781-4/00",
        keywords: ["mei loja de roupa", "vender roupa mei", "das comercio"]
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
        slug: "mei-fotografo",
        jobTitle: "Fotógrafo(a)",
        category: "Serviços",
        description: "Atividades de fotografia.",
        cnae: "7420-0/01",
        keywords: ["mei fotografo", "nota fiscal fotografia", "cnae fotografo"]
    },
    {
        slug: "mei-designer-grafico",
        jobTitle: "Designer Gráfico (Artesão)",
        category: "Serviços", // Curiosidade: Designer puro não pode, mas Artesão pode. Usar com cuidado.
        description: "Serviços de acabamento gráfico e edição.",
        cnae: "1821-1/00", // CNAE aproximado permitido (Clicherista/Editor) ou Artesão. *Atenção: Design Gráfico PURO é vedado, mas muitos usam correlatos. Vamos usar um seguro.*
        keywords: ["mei designer", "cnae editor de lista", "mei marketing"]
    }
];
