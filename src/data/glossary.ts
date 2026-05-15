
export interface GlossaryEntry {
  term: string;
  slug: string;
  category: 'trabalhista' | 'financeiro' | 'fiscal' | 'empreendedorismo';
  definition: string;
  detailedContent: string;
  keyPoints: string[];
  practicalExample?: string;
  relatedTerms: string[];
}

export const glossaryData: GlossaryEntry[] = [
  {
    term: "FGTS (Fundo de Garantia do Tempo de Serviço)",
    slug: "fgts-fundo-de-garantia",
    category: "trabalhista",
    definition: "O FGTS é um fundo de proteção ao trabalhador demitido sem justa causa, formado por depósitos mensais de 8% do salário realizados pelo empregador.",
    detailedContent: "Instituído pela Lei nº 5.107/1966 e atualmente regido pela Lei nº 8.036/1990, o FGTS é um dos pilares da seguridade social do trabalhador brasileiro. O depósito é uma obrigação do empregador e não pode ser descontado do salário do funcionário. O valor acumulado é corrigido mensalmente pela TR (Taxa Referencial) mais juros de 3% ao ano, além da distribuição de parte dos lucros do fundo.",
    keyPoints: [
      "Alíquota de 8% para trabalhadores CLT e 2% para aprendizes.",
      "Multa de 40% sobre o saldo total em caso de demissão sem justa causa.",
      "Permite saque-aniversário ou saque-rescisão.",
      "Pode ser usado para amortizar saldo devedor de financiamento habitacional."
    ],
    practicalExample: "Se você recebe R$ 3.000,00, a empresa deposita R$ 240,00 todo mês. Em um ano, você terá R$ 2.880,00 (mais correções) sem descontos.",
    relatedTerms: ["saldo-de-salario-rescisao", "aviso-previo-trabalhista"]
  },
  {
    term: "DSR (Descanso Semanal Remunerado)",
    slug: "dsr-descanso-semanal-remunerado",
    category: "trabalhista",
    definition: "O DSR é o direito ao repouso semanal remunerado de 24 horas consecutivas, preferencialmente aos domingos, garantido a todos os trabalhadores.",
    detailedContent: "O DSR (ou RSR) é um direito constitucional previsto no Art. 7º. Ele garante que, após uma jornada semanal de trabalho, o colaborador tenha um dia para descanso e convívio social sem perder a remuneração desse dia. Para mensalistas, o DSR já está embutido no salário, mas para quem faz horas extras ou recebe comissões, o cálculo do reflexo é obrigatório.",
    keyPoints: [
      "Perda do direito ao DSR na semana se houver falta injustificada.",
      "A folga deve ser de, no mínimo, 24 horas consecutivas.",
      "Trabalho em feriados ou domingos de folga deve ser pago em dobro.",
      "Reflexo obrigatório sobre Horas Extras, Adicional Noturno e Comissões."
    ],
    practicalExample: "Se você fez R$ 500,00 de horas extras em um mês com 25 dias úteis e 5 domingos, seu DSR será: (500 ÷ 25) × 5 = R$ 100,00.",
    relatedTerms: ["adicional-noturno-clt", "inss-previdencia-social"]
  },
  {
    term: "IVA Dual (Reforma Tributária)",
    slug: "iva-dual-reforma-tributaria",
    category: "fiscal",
    definition: "O IVA Dual é a unificação de impostos brasileiros em dois novos tributos: CBS (Federal) e IBS (Estadual/Municipal).",
    detailedContent: "O modelo de Imposto sobre Valor Agregado (IVA) Dual é a espinha dorsal da Reforma Tributária brasileira. Ele elimina o efeito cascata e traz transparência, permitindo que o consumidor saiba exatamente quanto paga de tributo em cada produto.",
    keyPoints: [
      "CBS: Substitui PIS e Cofins (âmbito Federal).",
      "IBS: Substitui ICMS e ISS (âmbito Estadual e Municipal).",
      "Não cumulatividade plena: permite crédito imediato do imposto pago anteriormente.",
      "Alíquota padrão estimada entre 25% e 27,5%."
    ],
    practicalExample: "Um fabricante abate o IVA pago na compra da matéria-prima do imposto devido na venda, tributando apenas o valor que ele adicionou.",
    relatedTerms: ["cashback-de-imposto-reforma", "irrf-imposto-de-renda"]
  },
  {
    term: "MDR (Merchant Discount Rate)",
    slug: "mdr-taxa-da-maquininha",
    category: "empreendedorismo",
    definition: "MDR é a taxa percentual cobrada pelas credenciadoras sobre cada transação realizada por lojistas via cartões de débito ou crédito.",
    detailedContent: "A taxa MDR é composta por três partes: o interchange (banco emissor), a taxa da bandeira e a margem da credenciadora. Entender o MDR é crucial para a precificação de produtos, pois a taxa pode consumir boa parte da margem de lucro.",
    keyPoints: [
      "Varia conforme o tipo de cartão: Débito, Crédito à Vista ou Parcelado.",
      "Diferente da taxa de antecipação de recebíveis.",
      "Impacta diretamente o Markup (preço de venda) do produto."
    ],
    practicalExample: "Em uma venda de R$ 100,00 com MDR de 3%, o lojista recebe R$ 97,00. Se o lucro era 10%, a taxa consumiu 30% do lucro real.",
    relatedTerms: ["antecipacao-de-recebiveis-negocios", "capital-de-giro-negocios"]
  },
  {
    term: "Aviso Prévio",
    slug: "aviso-previo-trabalhista",
    category: "trabalhista",
    definition: "Comunicação antecipada da rescisão do contrato de trabalho, feita por uma das partes (empresa ou empregado) com o objetivo de encerrar o vínculo.",
    detailedContent: "O aviso prévio visa evitar a surpresa da ruptura contratual, permitindo que o empregado busque novo emprego ou que a empresa busque um substituto. Pode ser trabalhado (cumprimento do horário) ou indenizado (pagamento do salário sem trabalho).",
    keyPoints: [
      "Duração mínima de 30 dias.",
      "Aviso Prévio Proporcional: +3 dias por ano trabalhado (máximo 90 dias totais).",
      "Redução de 2 horas na jornada diária ou 7 dias no final do aviso trabalhado."
    ],
    practicalExample: "Um funcionário com 10 anos de casa tem direito a 60 dias de aviso prévio (30 base + 30 proporcionais).",
    relatedTerms: ["saldo-de-salario-rescisao", "decimo-terceiro-proporcional"]
  },
  {
    term: "INSS (Instituto Nacional do Seguro Social)",
    slug: "inss-previdencia-social",
    category: "fiscal",
    definition: "Órgão responsável pelo pagamento da aposentadoria e outros benefícios aos trabalhadores brasileiros.",
    detailedContent: "O INSS funciona como um seguro social obrigatório. O trabalhador contribui mensalmente e garante o direito a renda em casos de aposentadoria, doença ou maternidade.",
    keyPoints: [
      "Alíquotas progressivas (7,5% a 14% em 2026).",
      "Teto do INSS: Valor máximo pago em aposentadorias.",
      "Carência: Tempo mínimo de contribuição para acessar benefícios."
    ],
    practicalExample: "Quem ganha o salário mínimo (R$ 1.621 em 2026) contribui com 7,5% (R$ 121,57) para garantir a cobertura previdenciária.",
    relatedTerms: ["irrf-imposto-de-renda", "pis-pasep-abono-salarial"]
  },
  {
    term: "IRRF (Imposto de Renda Retido na Fonte)",
    slug: "irrf-imposto-de-renda",
    category: "fiscal",
    definition: "Imposto federal descontado diretamente do salário como antecipação do IRPF anual.",
    detailedContent: "O IRRF é aplicado sobre rendimentos que ultrapassam a faixa de isenção. É um imposto progressivo: quanto mais você ganha, maior a alíquota (até 27,5%).",
    keyPoints: [
      "Dedução por dependente: Reduz a base de cálculo do imposto.",
      "Faixa de Isenção: Rendimento mensal abaixo do qual não se paga imposto.",
      "Restituição: Devolução de valores pagos a mais durante o ano."
    ],
    practicalExample: "Se seu salário base é R$ 4.000,00, você paga IRRF sobre o valor que excede a faixa de isenção, após descontar o INSS.",
    relatedTerms: ["inss-previdencia-social", "salario-liquido-calculo"]
  },
  {
    term: "Juros Compostos",
    slug: "juros-compostos-o-que-e",
    category: "financeiro",
    definition: "Rendimento calculado sobre o valor principal somado aos juros acumulados de períodos anteriores.",
    detailedContent: "Diferente dos juros simples, os juros compostos criam um crescimento exponencial. É a base dos investimentos de longo prazo e das dívidas de cartão de crédito.",
    keyPoints: [
      "Fórmula: M = P(1 + i)^n.",
      "Tempo é o fator mais importante no crescimento exponencial.",
      "Pode ser seu melhor amigo (investimentos) ou pior inimigo (dívidas)."
    ],
    practicalExample: "R$ 1.000 a 10% ao ano viram R$ 1.100 no 1º ano e R$ 1.210 no 2º ano (ganhou juros sobre os R$ 100 iniciais).",
    relatedTerms: ["cet-custo-efetivo-total", "taxa-selic-o-que-e"]
  },
  {
    term: "Saldo de Salário",
    slug: "saldo-de-salario-rescisao",
    category: "trabalhista",
    definition: "Valor proporcional aos dias trabalhados no mês da saída da empresa.",
    detailedContent: "Garante que o trabalhador receba exatamente pelos dias em que esteve à disposição da empresa no último mês de contrato.",
    keyPoints: [
      "Base de cálculo: Salário mensal ÷ 30.",
      "Obrigatório em todas as modalidades de rescisão.",
      "Incide FGTS e INSS sobre este valor."
    ],
    practicalExample: "Saindo no dia 10 do mês com salário de R$ 3.000, o saldo é (3000 ÷ 30) × 10 = R$ 1.000,00.",
    relatedTerms: ["aviso-previo-trabalhista", "ferias-proporcionais-calculo"]
  },
  {
    term: "Adicional Noturno",
    slug: "adicional-noturno-clt",
    category: "trabalhista",
    definition: "Direito garantido aos trabalhadores que exercem funções entre 22h e 5h.",
    detailedContent: "Compensa o desgaste do trabalho noturno com um adicional salarial e uma contagem de hora reduzida.",
    keyPoints: [
      "Adicional mínimo de 20% sobre a hora diurna.",
      "Hora Noturna Reduzida: 52 minutos e 30 segundos equivalem a 60 minutos.",
      "Deve ser pago enquanto durar o trabalho no período noturno."
    ],
    practicalExample: "Se sua hora vale R$ 10, a hora noturna valerá no mínimo R$ 12.",
    relatedTerms: ["dsr-descanso-semanal-remunerado", "inss-previdencia-social"]
  },
  {
    term: "Amortização",
    slug: "amortizacao-price-sac",
    category: "financeiro",
    definition: "Redução gradual de uma dívida através de pagamentos que abatem o principal e os juros.",
    detailedContent: "Fundamental em financiamentos imobiliários e de veículos para entender como o saldo devedor é reduzido ao longo do tempo.",
    keyPoints: [
      "Sistema SAC: Amortização constante, parcelas decrescentes.",
      "Sistema Price: Parcelas fixas, amortização crescente.",
      "Amortização Extraordinária: Pagar parcelas de trás para frente para eliminar juros."
    ],
    practicalExample: "Ao amortizar R$ 5.000 em um financiamento imobiliário, você abate R$ 5.000 direto da dívida real, economizando anos de juros.",
    relatedTerms: ["saldo-devedor-financiamento", "cet-custo-efetivo-total"]
  },
  {
    term: "Cashback de Imposto",
    slug: "cashback-de-imposto-reforma",
    category: "fiscal",
    definition: "Devolução de parte dos impostos pagos para famílias de baixa renda na nova Reforma Tributária.",
    detailedContent: "Busca tornar o sistema tributário mais justo, devolvendo o imposto pago em itens essenciais para quem mais precisa.",
    keyPoints: [
      "Focado em famílias no Cadastro Único.",
      "Incide sobre energia, saneamento e itens da cesta básica.",
      "Parte da estratégia para reduzir a desigualdade social."
    ],
    practicalExample: "Uma família paga R$ 100 de luz, onde R$ 25 é imposto. O governo devolve parte desse valor via PIX ou crédito em conta.",
    relatedTerms: ["iva-dual-reforma-tributaria", "reforma-tributaria"]
  },
  {
    term: "Antecipação de Recebíveis",
    slug: "antecipacao-de-recebiveis-negocios",
    category: "empreendedorismo",
    definition: "Recebimento antecipado de valores de vendas feitas a prazo no cartão ou duplicatas.",
    detailedContent: "Transforma vendas futuras em dinheiro no presente, permitindo manter o fluxo de caixa mas pagando uma taxa por isso.",
    keyPoints: [
      "Taxa de Antecipação: O 'juro' cobrado para liberar o dinheiro antes.",
      "Melhora o capital de giro imediato.",
      "Se usada em excesso, pode comprometer a rentabilidade do negócio."
    ],
    practicalExample: "Antecipar R$ 10.000 que você receberia em 12 meses paga uma taxa alta, mas pode salvar a empresa de uma dívida maior.",
    relatedTerms: ["fluxo-de-caixa-empresa", "capital-de-giro-negocios"]
  },
  {
    term: "Custo Efetivo Total (CET)",
    slug: "cet-custo-efetivo-total",
    category: "financeiro",
    definition: "Taxa real de um empréstimo, somando juros e todas as outras despesas.",
    detailedContent: "O único indicador que permite comparar empréstimos de bancos diferentes de forma justa.",
    keyPoints: [
      "Soma de juros + IOF + seguros + tarifas administrativas.",
      "Sempre será maior ou igual à taxa de juros nominal.",
      "Obrigatório ser informado em todos os contratos de crédito."
    ],
    practicalExample: "Juros de 2% + taxas podem resultar em um CET de 2,8% ao mês. Compare sempre o CET, não os juros.",
    relatedTerms: ["amortizacao-price-sac", "saldo-devedor-financiamento"]
  },
  {
    term: "PIS/PASEP",
    slug: "pis-pasep-abono-salarial",
    category: "trabalhista",
    definition: "Contribuições que financiam o seguro-desemprego e o abono salarial.",
    detailedContent: "Identificador único do trabalhador no sistema previdenciário e base para o recebimento do PIS anual.",
    keyPoints: [
      "Abono Salarial: Pago a quem ganha até 2 salários mínimos.",
      "Necessário ter 5 anos de cadastro para receber o abono.",
      "Número do PIS é o mesmo do NIS e do NIT."
    ],
    practicalExample: "Trabalhando há 5 anos e ganhando 1.5 salário mínimo, você recebe 1 salário mínimo extra por ano via PIS.",
    relatedTerms: ["inss-previdencia-social", "decimo-terceiro-proporcional"]
  },
  {
    term: "Férias Proporcionais",
    slug: "ferias-proporcionais-calculo",
    category: "trabalhista",
    definition: "Direito do trabalhador de receber o valor das férias equivalente aos meses trabalhados no ano da rescisão.",
    detailedContent: "A cada mês trabalhado (ou fração superior a 14 dias), o empregado adquire o direito a 1/12 de férias. Na saída da empresa, esse valor deve ser pago em dinheiro, acrescido do terço constitucional.",
    keyPoints: [
      "Calculado com base no salário atual.",
      "Cada mês trabalhado vale 1/12.",
      "Sempre somado ao terço constitucional (33,3%)."
    ],
    practicalExample: "Trabalhando 6 meses, você recebe exatamente metade de um salário bruto mais o terço.",
    relatedTerms: ["abono-pecuniario-venda-ferias", "saldo-de-salario-rescisao"]
  },
  {
    term: "13º Salário Proporcional",
    slug: "decimo-terceiro-proporcional",
    category: "trabalhista",
    definition: "Pagamento do 13º salário equivalente aos meses trabalhados durante o ano civil vigente.",
    detailedContent: "Assim como as férias, o 13º é acumulado mês a mês (1/12 por mês). Na rescisão ou em contratos temporários, o trabalhador recebe a parte que lhe cabe pelo tempo trabalhado no ano.",
    keyPoints: [
      "Fração de 15 dias ou mais conta como mês inteiro.",
      "Baseado no salário de dezembro ou do mês da rescisão.",
      "Dividido em duas parcelas no calendário anual padrão."
    ],
    practicalExample: "Se você trabalhou até agosto, receberá 8/12 do seu salário como 13º proporcional.",
    relatedTerms: ["saldo-de-salario-rescisao", "inss-previdencia-social"]
  },
  {
    term: "Abono Pecuniário",
    slug: "abono-pecuniario-venda-ferias",
    category: "trabalhista",
    definition: "Direito do trabalhador de converter 1/3 (um terço) do seu período de férias em dinheiro, a famosa 'venda das férias'.",
    detailedContent: "O trabalhador pode escolher vender até 10 dias das suas férias de 30 dias para a empresa. É uma opção exclusiva do empregado, e a empresa não pode obrigar nem recusar se o pedido for feito no prazo legal.",
    keyPoints: [
      "Prazo: deve ser solicitado até 15 dias antes do fim do período aquisitivo.",
      "Limite: Máximo de 1/3 do período total de férias.",
      "Pagamento: Deve ser feito junto com o valor das férias."
    ],
    practicalExample: "Em vez de descansar 30 dias, você descansa 20 e recebe o valor de 10 dias como um 'bônus' no salário.",
    relatedTerms: ["ferias-proporcionais-calculo", "inss-previdencia-social"]
  },
  {
    term: "Saldo Devedor",
    slug: "saldo-devedor-financiamento",
    category: "financeiro",
    definition: "Valor real que você ainda deve ao banco em um financiamento, descontando os juros que ainda não venceram.",
    detailedContent: "É o valor que seria necessário para quitar a dívida 'hoje'. Muita gente confunde o saldo devedor com a soma das parcelas que faltam, o que está errado, pois as parcelas futuras contêm juros que somem na quitação antecipada.",
    keyPoints: [
      "Base para o cálculo da amortização.",
      "Reduzido mensalmente após o pagamento da parte principal da parcela.",
      "Sobre ele incidem os juros do próximo mês."
    ],
    practicalExample: "Se você deve R$ 100 mil, sua próxima parcela pode ser de R$ 1.500, mas apenas R$ 500 abatem o saldo devedor, os outros R$ 1.000 são juros.",
    relatedTerms: ["amortizacao-price-sac", "cet-custo-efetivo-total"]
  },
  {
    term: "Taxa SELIC",
    slug: "taxa-selic-o-que-e",
    category: "financeiro",
    definition: "Taxa básica de juros da economia brasileira, definida pelo Banco Central (Copom).",
    detailedContent: "A SELIC influencia todas as outras taxas de juros do país, como empréstimos, financiamentos e rendimentos de investimentos (como a Poupança e o Tesouro Direto).",
    keyPoints: [
      "Selic Alta: Controla a inflação, mas encarece o crédito.",
      "Selic Baixa: Estimula o consumo, mas pode aumentar a inflação.",
      "Principal instrumento de política monetária do Brasil."
    ],
    practicalExample: "Quando a Selic sobe, o financiamento do seu próximo carro ou casa tende a ficar mais caro.",
    relatedTerms: ["inflacao-ipca-igpm", "juros-compostos-o-que-e"]
  },
  {
    term: "Inflação (IPCA / IGP-M)",
    slug: "inflacao-ipca-igpm",
    category: "financeiro",
    definition: "Aumento generalizado dos preços de produtos e serviços, reduzindo o poder de compra do dinheiro.",
    detailedContent: "O IPCA é o índice oficial da inflação no Brasil (focado em consumo), enquanto o IGP-M é muito usado para reajustes de aluguel e energia elétrica.",
    keyPoints: [
      "IPCA: Medido pelo IBGE.",
      "IGP-M: Medido pela Fundação Getúlio Vargas (FGV).",
      "Inflação alta corrói o valor real do salário mínimo."
    ],
    practicalExample: "Se a inflação foi de 10% no ano, o que você comprava com R$ 100,00 agora custa R$ 110,00.",
    relatedTerms: ["taxa-selic-o-que-e", "iva-dual-reforma-tributaria"]
  },
  {
    term: "Fluxo de Caixa",
    slug: "fluxo-de-caixa-empresa",
    category: "empreendedorismo",
    definition: "Movimentação de entradas e saídas de dinheiro no caixa de uma empresa em um determinado período.",
    detailedContent: "É a ferramenta vital para a saúde financeira do negócio. Um fluxo de caixa positivo significa que a empresa tem liquidez para pagar suas contas em dia.",
    keyPoints: [
      "Diferente de Lucro: Uma empresa pode ter lucro mas não ter dinheiro em caixa (fluxo negativo).",
      "Essencial para planejar investimentos e compras de estoque.",
      "Deve ser acompanhado diariamente pelo empreendedor."
    ],
    practicalExample: "Vender R$ 100 mil no cartão para receber em 30 dias gera lucro, mas se você não tiver dinheiro hoje para pagar o aluguel, seu fluxo de caixa falhou.",
    relatedTerms: ["capital-de-giro-negocios", "mei-microempreendedor-individual"]
  },
  {
    term: "Capital de Giro",
    slug: "capital-de-giro-negocios",
    category: "empreendedorismo",
    definition: "Recurso financeiro necessário para sustentar as operações da empresa no dia a dia, antes de receber as vendas.",
    detailedContent: "O capital de giro cobre o intervalo entre o pagamento aos fornecedores e o recebimento dos clientes. É o 'fôlego' financeiro do negócio.",
    keyPoints: [
      "Financia as vendas a prazo e o estoque.",
      "Falta de capital de giro é a maior causa de fechamento de empresas no Brasil.",
      "Pode ser obtido via lucro retido ou empréstimos específicos."
    ],
    practicalExample: "Se você compra matéria-prima à vista mas vende o produto em 3x no cartão, você precisa de capital de giro para surpreender nesses 3 meses.",
    relatedTerms: ["fluxo-de-caixa-empresa", "antecipacao-de-recebiveis-negocios"]
  },
  {
    term: "MEI (Microempreendedor Individual)",
    slug: "mei-microempreendedor-individual",
    category: "empreendedorismo",
    definition: "Categoria jurídica simplificada para profissionais autônomos que faturam até R$ 81 mil por ano.",
    detailedContent: "Criado para formalizar milhões de brasileiros, o MEI oferece CNPJ, emissão de nota fiscal e cobertura previdenciária com uma carga tributária mínima e fixa.",
    keyPoints: [
      "Imposto mensal fixo (DAS).",
      "Permite a contratação de apenas 1 funcionário.",
      "Direito a aposentadoria por idade e auxílio-doença."
    ],
    practicalExample: "Um cabeleireiro que abre um MEI passa a ter direitos de empresa e pode vender serviços para outras empresas com nota fiscal.",
    relatedTerms: ["inss-previdencia-social", "pro-labore-salario-socio"]
  },
  {
    term: "Pró-Labore",
    slug: "pro-labore-salario-socio",
    category: "empreendedorismo",
    definition: "Remuneração paga aos sócios que trabalham efetivamente na empresa, funcionando como o seu 'salário'.",
    detailedContent: "Diferente da distribuição de lucros, o pró-labore é uma despesa administrativa da empresa e sobre ele incidem INSS e IRRF. É obrigatório para sócios que exercem atividades na companhia.",
    keyPoints: [
      "O valor não pode ser inferior ao salário mínimo.",
      "Serve como base para a contribuição previdenciária do sócio.",
      "Deve ser fixado no contrato social ou em ata."
    ],
    practicalExample: "O dono da loja retira R$ 5.000 como pró-labore para pagar suas contas pessoais, separando o dinheiro dele do dinheiro da empresa.",
    relatedTerms: ["mei-microempreendedor-individual", "inss-previdencia-social"]
  },
  {
    term: "Declaração de Conteúdo",
    slug: "declaracao-de-conteudo-correios",
    category: "fiscal",
    definition: "Documento oficial exigido pelos Correios e transportadoras para o envio de encomendas por quem não emite Nota Fiscal (Pessoa Física ou MEI).",
    detailedContent: "A Declaração de Conteúdo é o documento legal que acompanha mercadorias que não possuem Nota Fiscal de venda. Ela serve para identificar o remetente, o destinatário e descrever os itens transportados, garantindo a conformidade com as normas do ICMS e da legislação postal.",
    keyPoints: [
      "Obrigatória para envios não comerciais entre pessoas físicas.",
      "Deve ser assinada pelo remetente para ter validade legal.",
      "Deve ser fixada do lado de fora da caixa em saco plástico transparente.",
      "Não substitui a Nota Fiscal em transações comerciais frequentes."
    ],
    practicalExample: "Se você vendeu um celular usado pelo Mercado Livre como pessoa física, deve preencher a Declaração de Conteúdo com o valor real do item para postar nos Correios.",
    relatedTerms: ["mei-microempreendedor-individual", "irrf-imposto-de-renda"]
  }
];
