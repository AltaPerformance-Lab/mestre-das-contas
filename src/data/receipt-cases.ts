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
  }
];