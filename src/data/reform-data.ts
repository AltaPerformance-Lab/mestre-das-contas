export interface ReformData {
  slug: string;
  title: string;
  category: "servico" | "padrao" | "saude" | "cesta" | "imovel" | "seletivo";
  jobTitle: string;
  currentTax: number;
  painPoint: string;
  benefit: string;
  legislationNote: string;
  faq: { question: string; answer: string }[];
}

export const reformData: ReformData[] = [
  // ========================================================================
  // GRUPO 1: JURÍDICO E ENGENHARIA (A "ELITE" DOS SERVIÇOS AFETADOS)
  // ========================================================================
  {
    slug: "advogados-escritorios-advocacia",
    title: "Reforma Tributária para Advogados e Escritórios",
    category: "servico",
    jobTitle: "Advogado",
    currentTax: 14.5,
    painPoint: "A advocacia, hoje majoritariamente no Lucro Presumido, sofrerá um dos maiores impactos com a alíquota cheia do IVA (estimada em 26,5%).",
    benefit: "Escritórios B2B terão um novo argumento de venda: suas notas fiscais gerarão crédito integral para os clientes PJ.",
    legislationNote: "A OAB pleiteou regime diferenciado, mas o texto base manteve a advocacia na regra geral (IBS/CBS).",
    faq: [
      { question: "O Simples Nacional acaba para advogados?", answer: "Não, mas o crédito gerado para o cliente será limitado, o que pode forçar migração para o Lucro Real/Presumido." },
      { question: "Honorários de sucumbência pagam IVA?", answer: "Sim, são tributados como receita de serviços na regra geral." }
    ]
  },
  {
    slug: "engenheiros-arquitetos-urbanistas",
    title: "Impacto da Reforma para Engenheiros e Arquitetos",
    category: "servico",
    jobTitle: "Engenheiro / Arquiteto",
    currentTax: 16.0,
    painPoint: "A alíquota para projetos de engenharia e arquitetura pode saltar de ~16% para 26,5%, encarecendo o custo final do serviço intelectual.",
    benefit: "A não-cumulatividade plena permite que construtoras descontem integralmente o imposto pago no projeto, o que favorece grandes contratos.",
    legislationNote: "Profissões regulamentadas (CREA/CAU) entram na regra geral. O regime específico de imóveis não se aplica necessariamente ao projetista.",
    faq: [
      { question: "Posso abater software (CAD/BIM)?", answer: "Sim! A compra de licenças de software e computadores gera crédito para abater o imposto a pagar." }
    ]
  },
  {
    slug: "contadores-escritorios-contabilidade",
    title: "Reforma Tributária para Contadores",
    category: "servico",
    jobTitle: "Contador",
    currentTax: 15.0,
    painPoint: "Escritórios de contabilidade no Lucro Presumido verão aumento de carga. O desafio será repassar esse custo aos honorários.",
    benefit: "O contador se tornará ainda mais essencial. A complexidade da transição (conviver com 2 sistemas) aumentará a demanda por consultoria.",
    legislationNote: "Serviços contábeis seguem a regra geral. Não foram incluídos nas exceções de alíquota reduzida.",
    faq: [
      { question: "BPO Financeiro paga a mesma coisa?", answer: "Sim, terceirização financeira e contábil entram na mesma regra de serviços (IVA padrão)." }
    ]
  },

  // ========================================================================
  // GRUPO 2: SAÚDE (QUEM GANHOU O DESCONTO DE 60%)
  // ========================================================================
  {
    slug: "medicos-clinicas-consultorios",
    title: "Reforma Tributária para Médicos",
    category: "saude",
    jobTitle: "Médico",
    currentTax: 11.33,
    painPoint: "Havia temor da alíquota de 26,5%, mas o setor garantiu tratamento diferenciado.",
    benefit: "Serviços de saúde humana têm redução de 60%. A carga estimada será de ~10,6%, competitiva com o cenário atual.",
    legislationNote: "Redução constitucional de 60% para serviços de saúde e dispositivos médicos.",
    faq: [
      { question: "Cirurgia Plástica entra?", answer: "Reparadora sim. Estética pura pode ficar na regra geral dependendo da Lei Complementar." }
    ]
  },
  {
    slug: "dentistas-odontologia",
    title: "Reforma Tributária para Dentistas",
    category: "saude",
    jobTitle: "Dentista",
    currentTax: 11.33,
    painPoint: "Custos de materiais e equipamentos são altos. A dúvida é sobre o repasse.",
    benefit: "Odontologia tem redução de 60%. Além disso, compra de implantes e próteses gera crédito.",
    legislationNote: "Classificado como saúde humana, garantindo o redutor de 60%.",
    faq: [
      { question: "Materiais ficam mais baratos?", answer: "Dispositivos médicos também têm alíquota reduzida, o que deve aliviar o custo de insumos." }
    ]
  },
  {
    slug: "psicologos-terapeutas",
    title: "Reforma Tributária para Psicólogos",
    category: "saude",
    jobTitle: "Psicólogo",
    currentTax: 10.0,
    painPoint: "Burocracia do novo sistema (Split Payment) pode afetar fluxo de caixa de autônomos.",
    benefit: "Enquadramento na saúde garante alíquota de ~10,6%, muitas vezes menor que a carga atual do Lucro Presumido.",
    legislationNote: "Psicologia clínica é considerada saúde. Terapias alternativas aguardam definição.",
    faq: [
      { question: "Atendimento online muda algo?", answer: "O imposto é devido no domicílio do paciente, mas a alíquota é a mesma." }
    ]
  },
  {
    slug: "fisioterapeutas-pilates",
    title: "Reforma para Fisioterapeutas e Pilates",
    category: "saude",
    jobTitle: "Fisioterapeuta",
    currentTax: 11.0,
    painPoint: "Estúdios de Pilates muitas vezes são enquadrados como 'fitness' (regra geral) e não saúde.",
    benefit: "Se o serviço for de reabilitação/fisioterapia, entra na redução de 60%.",
    legislationNote: "A distinção entre atividade física (academia) e saúde (fisioterapia) será crucial na classificação.",
    faq: [
      { question: "Pilates é saúde ou academia?", answer: "Se ministrado por fisioterapeuta com fim terapêutico, tende a ser saúde (reduzido). Se fitness, regra geral." }
    ]
  },
  {
    slug: "nutricionistas",
    title: "Impostos para Nutricionistas",
    category: "saude",
    jobTitle: "Nutricionista",
    currentTax: 10.0,
    painPoint: "Profissionais liberais terão que adaptar seus sistemas de emissão de nota para o padrão nacional.",
    benefit: "Alíquota reduzida de 10,6% (desconto de 60%) por ser área da saúde.",
    legislationNote: "Nutrição clínica enquadrada como saúde humana.",
    faq: [
      { question: "Venda de suplementos paga quanto?", answer: "A venda do produto segue a regra do produto (pode ser reduzida ou normal), separada da consulta." }
    ]
  },
  {
    slug: "veterinarios-pet-shop",
    title: "Reforma Tributária para Veterinários",
    category: "servico", // ATENÇÃO: Veterinário NÃO entrou na saúde humana (regra geral)
    jobTitle: "Veterinário",
    currentTax: 13.0,
    painPoint: "Grande polêmica: Saúde animal não entrou na redução de 60% no texto base. Clínicas veterinárias vão para a regra geral (26,5%).",
    benefit: "Compra de medicamentos veterinários e rações pode gerar crédito para abater o imposto alto da saída.",
    legislationNote: "Até o momento, veterinária está na regra geral. Há lobby forte para inclusão na saúde, mas sem garantia.",
    faq: [
      { question: "Consulta do pet vai aumentar?", answer: "Se mantida na regra geral, sim. O custo tributário dobrará para clínicas no Presumido." }
    ]
  },

  // ========================================================================
  // GRUPO 3: TECNOLOGIA E MARKETING
  // ========================================================================
  {
    slug: "programadores-ti-software",
    title: "Reforma Tributária para Programadores (TI)",
    category: "servico",
    jobTitle: "Desenvolvedor",
    currentTax: 11.0,
    painPoint: "Setor com poucos créditos (insumos) e folha alta. Alíquota cheia na saída pesa muito.",
    benefit: "Exportação de Software é ISENTA. Trabalhar para fora do Brasil terá tributação zero de consumo.",
    legislationNote: "Software segue regra geral. Discussão sobre SaaS ser serviço ou licenciamento continua.",
    faq: [
      { question: "Devo exportar serviços?", answer: "Sim, é o melhor cenário tributário. Isenção total de IBS/CBS." }
    ]
  },
  {
    slug: "marketing-agencias-publicidade",
    title: "Reforma para Agências de Marketing",
    category: "servico",
    jobTitle: "Agência de Marketing",
    currentTax: 14.0,
    painPoint: "Agências costumam ter margens apertadas. O IVA de 26,5% exige repasse imediato aos clientes.",
    benefit: "Para clientes B2B (empresas), contratar agência fica mais barato no final, pois eles recuperam os 26,5% como crédito.",
    legislationNote: "Publicidade é serviço regra geral. O crédito gerado é o grande trunfo comercial.",
    faq: [
      { question: "Influencers entram aqui?", answer: "Sim. A emissão de nota de publicidade segue a mesma regra." }
    ]
  },
  {
    slug: "influenciadores-digitais-youtubers",
    title: "Impostos para Influenciadores Digitais",
    category: "servico",
    jobTitle: "Influencer",
    currentTax: 10.0,
    painPoint: "Receitas de 'publi' nacionais sofrerão a alíquota padrão. O Simples Nacional pode ficar menos atrativo para grandes faturamentos.",
    benefit: "Receitas do YouTube/AdSense vindas do exterior são consideradas exportação de serviço (Isentas).",
    legislationNote: "Serviços de streaming e publicidade seguem regra geral.",
    faq: [
      { question: "AdSense paga imposto?", answer: "Se a fonte pagadora for o Google Irlanda/EUA, configura exportação (Isento de IBS/CBS)." }
    ]
  },

  // ========================================================================
  // GRUPO 4: COMÉRCIO, LAZER E TURISMO
  // ========================================================================
  {
    slug: "restaurantes-bares-alimentacao",
    title: "Reforma Tributária para Restaurantes",
    category: "saude", // Usando 'saude' para simular a alíquota reduzida (Restaurantes têm regime diferenciado)
    jobTitle: "Dono de Restaurante",
    currentTax: 8.0, // Regime especial atual
    painPoint: "O setor teme o fim do PERSE e regimes especiais estaduais de ICMS.",
    benefit: "Restaurantes ganharam regime diferenciado (redução de 60% ou regime especial de crédito). O impacto deve ser amortecido.",
    legislationNote: "Alimentação fora do lar entrou no rol de alíquotas reduzidas/regimes específicos.",
    faq: [
      { question: "Bebida alcoólica no restaurante?", answer: "A bebida paga imposto seletivo na fábrica, mas o serviço do restaurante tem alíquota reduzida." }
    ]
  },
  {
    slug: "hoteis-pousadas-turismo",
    title: "Reforma Tributária na Hotelaria",
    category: "saude", // Regime diferenciado (Reduzido)
    jobTitle: "Hoteleiro",
    currentTax: 12.0,
    painPoint: "Turismo é sensível a preço. Aumento de diárias afasta viajantes.",
    benefit: "Hotelaria, parques de diversão e eventos ganharam redução de 60% na alíquota. Fundamental para o setor.",
    legislationNote: "Serviços de hotelaria e turismo estão nas exceções constitucionais (alíquota reduzida).",
    faq: [
      { question: "Airbnb paga imposto?", answer: "Plataformas digitais de aluguel devem recolher o imposto na fonte (Split Payment)." }
    ]
  },
  {
    slug: "academias-fitness-crossfit",
    title: "Reforma Tributária para Academias",
    category: "servico",
    jobTitle: "Dono de Academia",
    currentTax: 12.0,
    painPoint: "Diferente de clínicas médicas, academias ficaram na REGRA GERAL (26,5%). Mensalidades devem subir.",
    benefit: "Compra de equipamentos de musculação (caros) gera crédito integral. Reformas no imóvel também.",
    legislationNote: "Atividades físicas e desportivas seguem a alíquota padrão, salvo projetos sociais específicos.",
    faq: [
      { question: "Personal Trainer paga quanto?", answer: "Como prestador de serviço autônomo, segue a regra geral, a menos que seja MEI." }
    ]
  },
  {
    slug: "salao-beleza-estetica",
    title: "Impostos para Salão de Beleza",
    category: "servico",
    jobTitle: "Cabeleireiro / Estética",
    currentTax: 6.0, // Muitos são MEI ou Salão Parceiro
    painPoint: "Serviços de estética (cabelo, unha, massagem) estão na regra geral. Clínicas grandes sofrerão impacto.",
    benefit: "O modelo 'Salão Parceiro' deve ser preservado, dividindo a tributação entre o salão e o profissional (muitas vezes MEI).",
    legislationNote: "Estética não é saúde para fins de redução tributária.",
    faq: [
      { question: "E quem é MEI?", answer: "O MEI continua pagando valor fixo mensal. A reforma não muda o boleto do MEI por enquanto." }
    ]
  },

  // ========================================================================
  // GRUPO 5: PRODUTOS E SETORES ESPECÍFICOS
  // ========================================================================
  {
    slug: "corretores-imobiliarias-venda",
    title: "Reforma Tributária em Imóveis",
    category: "imovel",
    jobTitle: "Corretor de Imóveis",
    currentTax: 8.0,
    painPoint: "Medo de desaquecimento do mercado com impostos altos.",
    benefit: "Regime específico com redutor de alíquota (estimado em 40-60% de desconto) e tributação apenas sobre a margem/ganho.",
    legislationNote: "Constituição garante regime favorecido para operações imobiliárias.",
    faq: [
      { question: "Aluguel sobe?", answer: "Residencial deve manter neutralidade. Comercial pode ter repasse." }
    ]
  },
  {
    slug: "produtor-rural-agro",
    title: "Reforma Tributária no Agro",
    category: "cesta",
    jobTitle: "Produtor Rural",
    currentTax: 3.0,
    painPoint: "Burocracia para pequenos produtores.",
    benefit: "Produtor PF até R$ 3,6mi de faturamento não paga IVA (não contribuinte). Insumos têm redução de 60%.",
    legislationNote: "Cesta Básica Nacional terá alíquota ZERO.",
    faq: [
      { question: "Trator gera crédito?", answer: "Sim, maquinário agrícola gera crédito integral para produtores contribuintes." }
    ]
  },
  {
    slug: "cerveja-bebidas-distribuidoras",
    title: "Preço da Cerveja (Imposto Seletivo)",
    category: "seletivo",
    jobTitle: "Distribuidor de Bebidas",
    currentTax: 50.0,
    painPoint: "Incidência do 'Imposto do Pecado' somado ao IVA. Carga total pode subir.",
    benefit: "Fim da Substituição Tributária (ST) do ICMS, simplificando radicalmente a gestão fiscal.",
    legislationNote: "Imposto Seletivo incide na fabricação.",
    faq: [
      { question: "Cerveja artesanal paga?", answer: "Sim, o imposto seletivo atinge alcoólicas em geral." }
    ]
  },
  {
    slug: "supermercados-varejo",
    title: "Reforma Tributária para Supermercados",
    category: "padrao",
    jobTitle: "Dono de Supermercado",
    currentTax: 18.0, // Mix complexo
    painPoint: "Gestão de múltiplos regimes (Cesta Zero, Cesta Reduzida, Bebida Seletiva, Produto Padrão).",
    benefit: "Fim da cumulatividade de impostos em cascata. O crédito é 'financeiro' (sobre tudo que paga).",
    legislationNote: "Cashback pode ser aplicado para famílias de baixa renda na boca do caixa.",
    faq: [
      { question: "Arroz e feijão sobem?", answer: "Não, itens da Cesta Básica Nacional terão alíquota zero." }
    ]
  },
  {
    slug: "representantes-comerciais",
    title: "Reforma para Representantes Comerciais",
    category: "servico",
    jobTitle: "Representante Comercial",
    currentTax: 16.0,
    painPoint: "Categoria historicamente tributada no anexo V do Simples (alto) ou Lucro Presumido. Vai para regra geral.",
    benefit: "A indústria contratante terá muito mais interesse em contratar PJ, pois o valor pago gera crédito integral.",
    legislationNote: "Serviço de representação segue regra geral.",
    faq: [
      { question: "Vale a pena ser PJ?", answer: "Sim, o mercado B2B exigirá nota fiscal para tomar crédito." }
    ]
  }
];