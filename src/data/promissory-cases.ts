export interface PromissoryCase {
    slug: string;
    name: string;
    shortName: string;
    description: string;
    keywords: string[];
    defaultMotivo: string;
    searchVolume: "Alto" | "Médio";
  }
  
  export const promissoryCases: PromissoryCase[] = [
    {
      slug: "pagamento-aluguel",
      name: "Nota Promissória para Pagamento de Aluguel",
      shortName: "Aluguel",
      description: "Modelo de nota promissória para atrasos de aluguel e negociação de dívidas entre inquilino e locador.",
      keywords: ["nota promissoria aluguel atrasado", "modelo promissoria locação de imovel", "garantia de aluguel"],
      defaultMotivo: "Referente ao pagamento de aluguel atrasado do imóvel.",
      searchVolume: "Alto"
    },
    {
      slug: "emprestimo-dinheiro",
      name: "Nota Promissória para Empréstimo de Dinheiro",
      shortName: "Empréstimo",
      description: "Proteja seu dinheiro ao emprestar para terceiros. Gere uma nota promissória com validade legal e preencha os juros em caso de atraso.",
      keywords: ["promissoria para emprestimo de dinheiro", "como fazer nota promissoria divida", "modelo confissão de divida"],
      defaultMotivo: "Referente a empréstimo pessoal concedido em espécie/transferência.",
      searchVolume: "Alto"
    },
    {
      slug: "venda-veiculo",
      name: "Nota Promissória para Venda de Veículo",
      shortName: "Venda de Veículo",
      description: "Vai parcelar a venda de um carro ou moto particular? Emita notas promissórias para cada parcela do negócio.",
      keywords: ["nota promissoria venda de carro", "promissoria parcelamento moto", "garantia compra e venda veiculo"],
      defaultMotivo: "Referente ao pagamento de parcela de compra e venda de veículo automotor.",
      searchVolume: "Médio"
    },
    {
      slug: "prestacao-servicos",
      name: "Nota Promissória Comercial para Prestação de Serviços",
      shortName: "Prestação de Serviços",
      description: "Ideal para autônomos que farão serviços com pagamento postergado (fiado). Garanta o pagamento do seu trabalho.",
      keywords: ["nota promissoria prestação de serviços", "modelo promissoria serviço autonomo", "cobrança titulo executivo"],
      defaultMotivo: "Referente à execução de serviços prestados e não quitados no ato.",
      searchVolume: "Alto"
    },
    {
      slug: "pensao-alimenticia",
      name: "Nota Promissória para Acordo de Pensão Alimentícia",
      shortName: "Acordo de Pensão",
      description: "Modelo extrajudicial para formalizar acordo de pagamento de pensão alimentícia em atraso.",
      keywords: ["nota promissoria pensão alimenticia atrasada", "acordo promissoria pensão", "garantia alimentos"],
      defaultMotivo: "Referente a acordo de pagamento de pensão alimentícia em atraso.",
      searchVolume: "Médio"
    }
  ];
