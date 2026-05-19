export interface ReceiptCase {
  slug: string;
  title: string;
  desc: string;
  prefill: {
    referente: string;
    valor?: string;
  };
  tips: string[];
}

export const receiptCases: ReceiptCase[] = [
  {
    slug: "recibo-aluguel",
    title: "Recibo de Aluguel",
    desc: "Modelo oficial para comprovante de pagamento de aluguel residencial ou comercial.",
    prefill: { referente: "Pagamento de aluguel referente ao mês de ... de 2026" },
    tips: ["Sempre coloque o mês de referência.", "Se houver condomínio ou IPTU, discrimine no campo de descrição."]
  },
  {
    slug: "recibo-prestacao-servicos",
    title: "Recibo de Prestação de Serviços",
    desc: "Emita recibo para serviços de pedreiro, pintura, limpeza, jardinagem e autônomos em geral.",
    prefill: { referente: "Serviços de ... prestados no dia ..." },
    tips: ["Descreva detalhadamente o serviço realizado.", "Ideal para autônomos que não emitem nota fiscal."]
  },
  {
    slug: "recibo-venda-veiculo",
    title: "Recibo de Sinal (Venda de Veículo)",
    desc: "Comprovante de pagamento de entrada ou sinal para compra de carro ou moto.",
    prefill: { referente: "Sinal/Entrada referente à compra do veículo Modelo ..., Placa ..." },
    tips: ["Coloque a placa e o modelo do veículo.", "Especifique que é um sinal e o valor restante a pagar."]
  },
  {
    slug: "recibo-salao-beleza",
    title: "Recibo para Salão de Beleza",
    desc: "Modelo para cabeleireiros, manicures e esteticistas entregarem aos clientes.",
    prefill: { referente: "Serviços de beleza (corte, tintura, etc.)" },
    tips: ["Útil para clientes que pedem reembolso ou controle de gastos."]
  },
  {
    slug: "recibo-diaria-domestica",
    title: "Recibo de Diária Doméstica",
    desc: "Comprovante de pagamento para diaristas e empregadas domésticas.",
    prefill: { referente: "Pagamento de diária de limpeza realizada em ..." },
    tips: ["A diária inclui transporte e alimentação? Especifique se necessário."]
  },
  {
    slug: "recibo-pagamento-parcial",
    title: "Recibo de Pagamento Parcial",
    desc: "Use quando receber apenas uma parte da dívida. Evite confusões futuras.",
    prefill: { referente: "Pagamento parcial referente à dívida de ... (Saldo restante: R$ ...)" },
    tips: ["Sempre escreva quanto ainda falta pagar.", "Coloque a data prevista para o próximo pagamento."]
  },
  {
    slug: "recibo-condominio",
    title: "Recibo de Condomínio",
    desc: "Para síndicos e administradoras. Comprovante de taxa condominial.",
    prefill: { referente: "Taxa de condomínio da unidade ... referente a ..." },
    tips: ["Discrimine fundo de reserva e taxas extras se houver."]
  },
  {
    slug: "recibo-aulas-particulares",
    title: "Recibo de Aulas Particulares",
    desc: "Para professores particulares, personal trainers e explicadores.",
    prefill: { referente: "Pacote de ... aulas de ... ministradas em ..." },
    tips: ["Especifique o período ou a quantidade de aulas."]
  },
  {
    slug: "recibo-compra-venda-imovel",
    title: "Recibo de Arras (Imóvel)",
    desc: "Comprovante de sinal para compra de casa ou terreno.",
    prefill: { referente: "Sinal (Arras) para compra do imóvel situado em ..." },
    tips: ["Mencione o contrato de compra e venda vinculado.", "Essencial para garantir o negócio."]
  },
  {
    slug: "recibo-doacao",
    title: "Recibo de Doação",
    desc: "Para ONGs e instituições emitirem comprovante aos doadores.",
    prefill: { referente: "Doação espontânea para auxílio em ..." },
    tips: ["Agradeça a doação no campo de observação."]
  },
  {
    slug: "recibo-honorarios-advocaticios",
    title: "Recibo de Honorários Advocatícios",
    desc: "Modelo para advogados e sociedades de advogados. Comprovante de honorários contratuais ou sucumbenciais.",
    prefill: { referente: "Honorários profissionais referentes a assessoria jurídica no processo nº ..." },
    tips: ["Mencione o número do processo ou o contrato de honorários.", "Especifique se é pagamento único ou parcela."]
  },
  {
    slug: "recibo-consulta-medica",
    title: "Recibo de Consulta Médica/Saúde",
    desc: "Para médicos, psicólogos e fisioterapeutas. Essencial para reembolso de plano de saúde e declaração de IR.",
    prefill: { referente: "Atendimento de saúde realizado no dia ... para o paciente ..." },
    tips: ["O paciente usará este recibo para reembolso e Imposto de Renda.", "Certifique-se de que os dados do profissional (CRM/CRP/CREFITO) estão no cabeçalho."]
  },
  {
    slug: "recibo-aluguel-comercial",
    title: "Recibo de Aluguel Comercial",
    desc: "Modelo oficial para pagamento de aluguel de galpões, salas comerciais e lojas.",
    prefill: { referente: "Aluguel comercial da sala/loja ... referente ao mês de ..." },
    tips: ["Se houver retenção de impostos (IRRF), especifique no campo de valor líquido e bruto.", "Mencione a competência correta do aluguel."]
  },
  {
    slug: "recibo-pedreiro-obra",
    title: "Recibo de Pedreiro e Obra",
    desc: "Comprovante simples para serviços de alvenaria, reforma, gesso e pintura.",
    prefill: { referente: "Serviços de reforma/construção realizados na obra situada em ..." },
    tips: ["Especifique se o pagamento é referente a uma diária, empreitada ou medição.", "Ideal para prestadores de serviço autônomos sem CNPJ."]
  },
  {
    slug: "recibo-jardinagem",
    title: "Recibo de Jardinagem e Paisagismo",
    desc: "Comprovante de pagamento para manutenção de jardins, poda de árvores e paisagismo.",
    prefill: { referente: "Serviços de jardinagem e manutenção realizados no dia ..." },
    tips: ["Descreva se houve custo de materiais (adubos, plantas) incluído no valor.", "Muito útil para prestar contas a síndicos de condomínios."]
  },
  {
    slug: "recibo-diarias-hotel",
    title: "Recibo de Diárias (Hospedagem)",
    desc: "Comprovante de pagamento para pousadas, hostels e aluguel por temporada (Airbnb).",
    prefill: { referente: "Pagamento de ... diárias de hospedagem, no período de ... a ..." },
    tips: ["O hóspede pode precisar deste recibo para reembolso corporativo.", "Separe o valor das diárias de eventuais taxas de limpeza."]
  },
  {
    slug: "recibo-patrocinio",
    title: "Recibo de Patrocínio e Apoio",
    desc: "Comprovante de recebimento de doação de patrocínio para eventos, atletas ou causas.",
    prefill: { referente: "Cota de patrocínio / Apoio financeiro para a realização do projeto ..." },
    tips: ["Empresas precisam deste recibo para justificar a saída do dinheiro na contabilidade.", "Se for uma doação com incentivo fiscal, mencione a lei correspondente."]
  },
  {
    slug: "recibo-pensao-alimenticia",
    title: "Recibo de Pensão Alimentícia",
    desc: "Comprovante legal de pagamento de pensão alimentícia feito em dinheiro ou acordo extrajudicial.",
    prefill: { referente: "Pagamento de pensão alimentícia referente ao mês de ... em favor do(s) menor(es) ..." },
    tips: ["Coloque o nome de quem está pagando e de quem está recebendo (responsável legal).", "Se for referente a meses atrasados, especifique no recibo."]
  },
  {
    slug: "recibo-adiantamento-salarial",
    title: "Recibo de Adiantamento Salarial (Vale)",
    desc: "Comprovante de vale ou adiantamento quinzenal entregue a funcionários.",
    prefill: { referente: "Adiantamento salarial (vale) referente ao mês de ..." },
    tips: ["O funcionário deve assinar. Este valor será descontado no contracheque no fechamento do mês."]
  },
  {
    slug: "recibo-entrega-chaves",
    title: "Recibo de Entrega de Chaves",
    desc: "Documento que formaliza a devolução das chaves no encerramento do contrato de aluguel.",
    prefill: { referente: "Devolução das chaves do imóvel situado em ... encerrando as obrigações de locação." },
    tips: ["Use este recibo após a vistoria final do imóvel.", "Isenta o inquilino de cobranças de aluguel a partir desta data."]
  },
  {
    slug: "recibo-compra-celular",
    title: "Recibo de Compra/Venda de Celular ou Eletrônico",
    desc: "Comprovante de venda de itens usados (celulares, notebooks) entre pessoas físicas.",
    prefill: { referente: "Venda de 01 aparelho celular marca/modelo ..., IMEI nº ..., em perfeito estado de funcionamento." },
    tips: ["Coloque o IMEI ou número de série do aparelho para segurança.", "Deixe claro que o aparelho é usado e testado no ato."]
  },
  {
    slug: "recibo-oficina-mecanica",
    title: "Recibo de Oficina Mecânica / Funilaria",
    desc: "Comprovante de pagamento de serviços automotivos, troca de óleo ou peças.",
    prefill: { referente: "Serviços mecânicos e/ou peças aplicadas no veículo ..., placa ..." },
    tips: ["Especifique a quilometragem do veículo no ato do serviço.", "Se houver garantia do serviço, mencione no campo de descrição."]
  }
];