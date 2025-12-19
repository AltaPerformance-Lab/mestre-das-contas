export interface ReformData {
  slug: string;
  title: string;
  category: "servico" | "padrao" | "saude" | "cesta" | "imovel" | "seletivo";
  jobTitle: string;
  currentTax: number;
  painPoint: string;
  benefit: string;
  legislationNote: string;
  law_reference?: string;
  // CORREÇÃO AQUI: Adicionei "Isento / Reduzido" na lista de tipos aceitos
  verdict: "Aumento de Carga" | "Redução de Carga" | "Neutro / Depende" | "Isento" | "Isento / Reduzido";
  description_seo: string;
  related_tags: string[];
  faq: { question: string; answer: string }[];
}

export const reformData: ReformData[] = [
  // ========================================================================
  // GRUPO 1: JURÍDICO E ENGENHARIA ("ELITE" DOS SERVIÇOS)
  // ========================================================================
  {
    slug: "advogados-escritorios-advocacia",
    title: "Reforma Tributária para Advogados e Escritórios",
    description_seo: "Advogado vai pagar mais imposto na Reforma Tributária? Simule o impacto do IVA Dual (IBS/CBS) no seu escritório e veja como fica o Simples Nacional.",
    category: "servico",
    jobTitle: "Advogado",
    currentTax: 14.5,
    verdict: "Aumento de Carga",
    painPoint: "A advocacia, hoje majoritariamente no Lucro Presumido (ISS fixo ou alíquotas baixas), sofrerá um dos maiores impactos com a alíquota cheia do IVA (estimada em 26,5%).",
    benefit: "Escritórios B2B terão um novo argumento de venda: suas notas fiscais gerarão crédito integral (IBS+CBS) para os clientes PJ, barateando a contratação real.",
    legislationNote: "A OAB pleiteou regime diferenciado, mas o texto base da EC 132/2023 manteve a advocacia na regra geral.",
    law_reference: "EC 132/2023 - Art. 156-A (Regra Geral)",
    related_tags: ["Serviços", "Lucro Presumido", "Simples Nacional"],
    faq: [
      { question: "O Simples Nacional acaba para advogados?", answer: "Não. O Simples continua, mas o crédito gerado para o cliente será limitado ao valor efetivamente pago, o que pode forçar grandes bancas a migrarem para o Lucro Real/Presumido por pressão comercial." },
      { question: "Honorários de sucumbência pagam IVA?", answer: "Sim. Os honorários são tributados como receita de serviços na regra geral, incidindo a alíquota cheia do local da prestação ou domicílio." },
      { question: "Advogado autônomo (PF) vale a pena?", answer: "Provavelmente não. A tributação na Pessoa Física (IRPF até 27,5% + ISS) somada à perda de competitividade tende a forçar a PJotização." }
    ]
  },
  {
    slug: "engenheiros-arquitetos-urbanistas",
    title: "Impacto da Reforma para Engenheiros e Arquitetos",
    description_seo: "Calculadora de impostos para Engenheiros e Arquitetos na Reforma Tributária. Veja se a carga tributária vai subir para 26,5% e como ficam os projetos.",
    category: "servico",
    jobTitle: "Engenheiro / Arquiteto",
    currentTax: 16.0,
    verdict: "Aumento de Carga",
    painPoint: "A alíquota para projetos de engenharia e arquitetura pode saltar de ~16% (Presumido) para 26,5% (IVA Cheio), encarecendo o custo final do serviço intelectual.",
    benefit: "A não-cumulatividade plena é a salvação: construtoras e incorporadoras poderão descontar 100% do imposto pago no projeto, o que favorece a contratação formal.",
    legislationNote: "Profissões regulamentadas (CREA/CAU) entram na regra geral. O regime específico de imóveis não se aplica necessariamente ao projetista, apenas à venda do bem.",
    related_tags: ["Construção Civil", "Serviços Técnicos", "B2B"],
    faq: [
      { question: "Posso abater software (CAD/BIM)?", answer: "Sim! A compra de licenças de software, computadores e plotters gera crédito imediato para abater o imposto a pagar na saída." },
      { question: "Como fica o Engenheiro PJ (Pejotinha)?", answer: "Se prestar serviço para construtora, a nota fiscal com IVA cheio será exigida para que a construtora tome crédito. O custo aumenta, mas a utilidade fiscal também." }
    ]
  },
  {
    slug: "contadores-escritorios-contabilidade",
    title: "Reforma Tributária para Contadores",
    description_seo: "Contabilidade vai ficar mais cara? Veja como a Reforma Tributária afeta escritórios contábeis e BPO Financeiro. Simulação completa.",
    category: "servico",
    jobTitle: "Contador",
    currentTax: 15.0,
    verdict: "Aumento de Carga",
    painPoint: "Escritórios de contabilidade no Lucro Presumido verão aumento nominal de carga. O grande desafio será repassar esse custo aos honorários mensais.",
    benefit: "O contador se tornará ainda mais essencial e valorizado. A complexidade da transição (conviver com 2 sistemas por 7 anos) aumentará drasticamente a demanda por consultoria tributária.",
    legislationNote: "Serviços contábeis seguem a regra geral. Não foram incluídos nas exceções de alíquota reduzida, apesar do lobby da classe.",
    related_tags: ["Consultoria", "BPO", "Serviços"],
    faq: [
      { question: "BPO Financeiro paga a mesma coisa?", answer: "Sim, terceirização financeira e contábil entram na mesma regra de serviços (IVA padrão estimado em 26,5%)." },
      { question: "Haverá regime especial para contadores?", answer: "Não no texto base. A única exceção é se o escritório estiver no Simples Nacional, que permanece (quase) igual." }
    ]
  },

  // ========================================================================
  // GRUPO 2: SAÚDE (QUEM GANHOU O DESCONTO DE 60%)
  // ========================================================================
  {
    slug: "medicos-clinicas-consultorios",
    title: "Reforma Tributária para Médicos e Clínicas",
    description_seo: "Médico paga menos imposto na Reforma? Entenda a redução de 60% na alíquota para serviços de saúde e simule seus ganhos.",
    category: "saude",
    jobTitle: "Médico",
    currentTax: 11.33,
    verdict: "Redução de Carga",
    painPoint: "Embora a alíquota seja reduzida, a burocracia do 'Split Payment' pode afetar o fluxo de caixa de clínicas que recebem via cartão de crédito.",
    benefit: "Vitória do setor: Serviços de saúde humana têm redução de 60% na alíquota padrão. A carga estimada será de ~10,6%, mantendo a competitividade atual.",
    legislationNote: "Redução constitucional de 60% garantida para 'serviços de saúde' e dispositivos médicos e de acessibilidade.",
    law_reference: "EC 132/2023 - Art. 9º, § 1º (Regimes Específicos)",
    related_tags: ["Saúde", "Clínicas", "Profissionais Liberais"],
    faq: [
      { question: "Cirurgia Plástica entra na redução?", answer: "Reparadora sim. Estética pura corre risco de ficar na regra geral (26,5%), dependendo da Lei Complementar que definirá o que é 'saúde'." },
      { question: "Planos de Saúde ficam mais caros?", answer: "As operadoras de planos de saúde também têm alíquota reduzida, mas a complexidade dos créditos pode gerar ajustes de preço." }
    ]
  },
  {
    slug: "dentistas-odontologia",
    title: "Reforma Tributária para Dentistas",
    description_seo: "Impacto da Reforma Tributária na Odontologia. Veja se materiais e consultas ficarão mais baratos com o novo IVA.",
    category: "saude",
    jobTitle: "Dentista",
    currentTax: 11.33,
    verdict: "Redução de Carga",
    painPoint: "A transição de sistemas exigirá atualização de softwares de gestão de clínicas para emitir a nota fiscal no padrão nacional.",
    benefit: "Odontologia tem redução de 60% na alíquota. Além disso, a compra de implantes, cadeiras e próteses gera crédito para abater o imposto, o que antes era custo puro.",
    legislationNote: "Classificado como saúde humana, garantindo o redutor de 60% na alíquota do IVA (IBS+CBS).",
    related_tags: ["Saúde", "Odontologia", "Materiais"],
    faq: [
      { question: "Materiais ficam mais baratos?", answer: "Provavelmente. Dispositivos médicos e de acessibilidade também têm alíquota reduzida, o que deve aliviar o custo de insumos caros." },
      { question: "Harmonização Orofacial (HOF) tem desconto?", answer: "Área cinzenta. Se classificada como estética pura, pode ir para a regra geral. Se saúde, 60% de desconto." }
    ]
  },
  {
    slug: "psicologos-terapeutas",
    title: "Reforma Tributária para Psicólogos",
    description_seo: "Psicólogo paga IVA cheio? Saiba como a Reforma Tributária classifica a saúde mental e qual será sua nova alíquota.",
    category: "saude",
    jobTitle: "Psicólogo",
    currentTax: 10.0,
    verdict: "Neutro / Depende",
    painPoint: "A obrigatoriedade de emissão de documentos fiscais digitais padronizados pode aumentar o custo de conformidade (compliance) para autônomos.",
    benefit: "O enquadramento na saúde garante alíquota de ~10,6%. Para quem está no Lucro Presumido pagando ~13-16% hoje, haverá ganho real.",
    legislationNote: "Psicologia clínica é considerada saúde humana. Terapias alternativas e holísticas aguardam definição da Lei Complementar.",
    related_tags: ["Saúde Mental", "Autônomos"],
    faq: [
      { question: "Atendimento online muda algo?", answer: "Não na alíquota, mas sim no recolhimento. O imposto (IBS) passa a ser devido no local do domicílio do paciente (destino), não mais do consultório." },
      { question: "Supervisão clínica entra?", answer: "Sim, como serviço educacional ou de saúde, ambos possuem alíquotas favorecidas." }
    ]
  },
  {
    slug: "nutricionistas",
    title: "Impostos para Nutricionistas na Reforma",
    description_seo: "Nutricionista entra na regra da saúde? Veja a simulação de impostos para consultórios de nutrição com o novo IVA.",
    category: "saude",
    jobTitle: "Nutricionista",
    currentTax: 10.0,
    verdict: "Redução de Carga",
    painPoint: "Profissionais liberais terão que adaptar seus sistemas de emissão de nota. A complexidade inicial pode assustar.",
    benefit: "Alíquota reduzida de ~10,6% (desconto de 60%) por ser área da saúde. Isso torna o consultório PJ muito atrativo comparado ao Carnê-Leão.",
    legislationNote: "Nutrição clínica enquadrada como saúde humana na EC 132.",
    related_tags: ["Saúde", "Bem-estar"],
    faq: [
      { question: "Venda de suplementos paga quanto?", answer: "Cuidado: A venda do produto (comércio) segue a regra do produto (pode ser reduzida ou normal), separada da consulta (serviço)." },
      { question: "Personal Diet paga mais?", answer: "Se for serviço de saúde, paga reduzida. Se for consultoria genérica, pode cair na regra geral." }
    ]
  },
  {
    slug: "veterinarios-pet-shop",
    title: "Reforma Tributária para Veterinários",
    description_seo: "Veterinário é saúde ou serviço geral? Entenda a polêmica da Reforma Tributária para Pet Shops e Clínicas Veterinárias.",
    category: "servico", // ATENÇÃO: Veterinário NÃO entrou na saúde humana (regra geral)
    jobTitle: "Veterinário",
    currentTax: 13.0,
    verdict: "Aumento de Carga",
    painPoint: "Grande polêmica: Saúde animal NÃO entrou na redução de 60% no texto base. Clínicas veterinárias vão para a regra geral (26,5%), dobrando a carga atual.",
    benefit: "A única vantagem é o crédito financeiro: compra de medicamentos veterinários, equipamentos de raio-X e rações gera crédito para abater o imposto alto da saída.",
    legislationNote: "Até o momento, veterinária está na regra geral. Há lobby forte no Senado para inclusão na saúde, mas sem garantia no texto atual.",
    related_tags: ["Serviços", "Pets", "Polêmica"],
    faq: [
      { question: "Consulta do pet vai aumentar?", answer: "Sim. Se mantida na regra geral, o custo tributário dobrará. O repasse para o tutor do animal será inevitável." },
      { question: "Banho e Tosa paga quanto?", answer: "Serviço de estética animal segue a regra geral (26,5%), a menos que a empresa seja do Simples Nacional." }
    ]
  },

  // ========================================================================
  // GRUPO 3: TECNOLOGIA E CRIATIVIDADE
  // ========================================================================
  {
    slug: "programadores-ti-software",
    title: "Reforma Tributária para Programadores (TI)",
    description_seo: "Dev PJ vai pagar mais imposto? Veja como a Reforma Tributária afeta programadores, SaaS e exportação de software.",
    category: "servico",
    jobTitle: "Desenvolvedor",
    currentTax: 11.0,
    verdict: "Neutro / Depende",
    painPoint: "Setor com poucos créditos (poucos insumos) e folha de pagamento alta. Alíquota cheia na saída (26,5%) pesa se o cliente não for contribuinte.",
    benefit: "Ouro: Exportação de Software é totalmente ISENTA. Trabalhar para fora do Brasil (EUA/Europa) terá tributação zero de consumo (IBS/CBS).",
    legislationNote: "Software segue regra geral no mercado interno. Discussão sobre SaaS ser serviço ou licenciamento continua, mas ambos pagam IVA.",
    related_tags: ["Tecnologia", "Exportação", "B2B"],
    faq: [
      { question: "Devo exportar serviços?", answer: "Sim, é o melhor cenário tributário possível. Isenção total de IBS/CBS, mantendo apenas IRPJ/CSLL." },
      { question: "E quem desenvolve para empresas no Brasil?", answer: "Sua nota fiscal fica 'mais cara' (26,5%), mas gera crédito total para a empresa contratante. No B2B, o efeito é neutro." }
    ]
  },
  {
    slug: "marketing-agencias-publicidade",
    title: "Reforma para Agências de Marketing",
    description_seo: "Agências de publicidade e a Reforma Tributária. Entenda como o IVA de 26,5% afeta contratos e o repasse de custos.",
    category: "servico",
    jobTitle: "Agência de Marketing",
    currentTax: 14.0,
    verdict: "Aumento de Carga",
    painPoint: "Agências costumam ter margens apertadas. O IVA de 26,5% exige repasse imediato aos preços.",
    benefit: "Para clientes B2B (empresas), contratar agência fica mais barato no final, pois eles recuperam os 26,5% como crédito. Isso desestimula a 'pejotização' interna ineficiente.",
    legislationNote: "Publicidade é serviço regra geral. O crédito gerado é o grande trunfo comercial para fechar contratos com grandes empresas.",
    related_tags: ["Serviços", "B2B", "Comunicação"],
    faq: [
      { question: "Influencers entram aqui?", answer: "Sim. A emissão de nota de publicidade por influencers segue a mesma regra geral." },
      { question: "Anúncios no Facebook/Google geram crédito?", answer: "Sim! As Big Techs pagarão imposto no Brasil e emitirão nota, gerando crédito para as agências/anunciantes." }
    ]
  },
  {
    slug: "influenciadores-digitais-youtubers",
    title: "Impostos para Influenciadores Digitais",
    description_seo: "Influencer paga imposto sobre recebidos? Veja como a Reforma Tributária afeta YouTubers, Instagrammers e Streamers.",
    category: "servico",
    jobTitle: "Influencer",
    currentTax: 10.0,
    verdict: "Neutro / Depende",
    painPoint: "Receitas de 'publi' nacionais sofrerão a alíquota padrão (26,5%). O Simples Nacional pode ficar menos atrativo para faturamentos médios.",
    benefit: "Receitas do YouTube/AdSense vindas do exterior (Google Irlanda/EUA) são consideradas exportação de serviço e são ISENTAS de IBS/CBS.",
    legislationNote: "Serviços de streaming e publicidade seguem regra geral. Exportação é imune.",
    related_tags: ["Digital", "Publicidade", "Exportação"],
    faq: [
      { question: "AdSense paga imposto?", answer: "Se a fonte pagadora for o Google no exterior, configura exportação (Alíquota Zero de IVA). Você só paga IRPJ/CSLL." },
      { question: "Permuta paga imposto?", answer: "Pela lei, sim. A troca de serviço por produto deve ser tributada pelo valor de mercado." }
    ]
  },

  // ========================================================================
  // GRUPO 4: COMÉRCIO, LAZER E TURISMO
  // ========================================================================
  {
    slug: "restaurantes-bares-alimentacao",
    title: "Reforma Tributária para Restaurantes",
    description_seo: "Restaurantes e Bares na Reforma Tributária: Entenda o regime diferenciado e se o preço da comida vai subir.",
    category: "saude", // Usando 'saude' para simular a alíquota reduzida visualmente
    jobTitle: "Dono de Restaurante",
    currentTax: 8.0, 
    verdict: "Redução de Carga",
    painPoint: "O setor teme o fim do PERSE (programa de retomada) e a complexidade dos novos créditos sobre insumos.",
    benefit: "Restaurantes ganharam regime diferenciado (redução de 60% na alíquota). Além disso, podem abater crédito de luz, aluguel e insumos.",
    legislationNote: "Alimentação fora do lar entrou no rol de alíquotas reduzidas/regimes específicos da EC 132.",
    related_tags: ["Alimentação", "Turismo", "Comércio"],
    faq: [
      { question: "Bebida alcoólica no restaurante?", answer: "Atenção: A bebida paga 'Imposto Seletivo' na fábrica, mas o serviço do restaurante tem alíquota reduzida. O custo da cerveja chega mais alto para o dono do bar." },
      { question: "Delivery (iFood) entra?", answer: "Sim, segue a regra de alimentação fora do lar (reduzida)." }
    ]
  },
  {
    slug: "hoteis-pousadas-turismo",
    title: "Reforma Tributária na Hotelaria",
    description_seo: "Diárias de hotel vão aumentar? Veja o impacto do IVA na hotelaria, turismo e parques de diversão.",
    category: "saude", 
    jobTitle: "Hoteleiro",
    currentTax: 12.0,
    verdict: "Redução de Carga",
    painPoint: "Turismo é muito sensível a preço. Qualquer aumento de diárias afasta viajantes. A briga foi grande.",
    benefit: "Vitória do setor: Hotelaria, parques de diversão e eventos ganharam redução de 60% na alíquota. Fundamental para a sobrevivência do turismo nacional.",
    legislationNote: "Serviços de hotelaria, parques temáticos e agências de turismo estão nas exceções constitucionais (alíquota reduzida).",
    related_tags: ["Turismo", "Lazer", "Serviços"],
    faq: [
      { question: "Airbnb paga imposto?", answer: "Sim. As plataformas digitais de aluguel serão responsáveis por recolher o imposto na fonte (Split Payment), igualando a competição." },
      { question: "Eventos corporativos?", answer: "Também entram na alíquota reduzida de eventos." }
    ]
  },
  {
    slug: "academias-fitness-crossfit",
    title: "Reforma Tributária para Academias",
    description_seo: "Mensalidade da academia vai subir? Entenda por que o setor fitness ficou na regra geral da Reforma Tributária.",
    category: "servico",
    jobTitle: "Dono de Academia",
    currentTax: 12.0,
    verdict: "Aumento de Carga",
    painPoint: "Diferente de clínicas médicas, academias ficaram na REGRA GERAL (26,5%). Como a maioria dos clientes é PF (não toma crédito), o repasse de preço será necessário.",
    benefit: "Compra de equipamentos de musculação (que são caros e têm muito imposto hoje) gera crédito integral imediato para a academia.",
    legislationNote: "Atividades físicas e desportivas seguem a alíquota padrão, salvo projetos sociais específicos sem fins lucrativos.",
    related_tags: ["Fitness", "Saúde", "Serviços"],
    faq: [
      { question: "Personal Trainer paga quanto?", answer: "Como prestador de serviço autônomo, segue a regra geral. Se for MEI, continua pagando o valor fixo mensal." },
      { question: "Crossfit é saúde?", answer: "Para fins tributários no texto atual, é considerado atividade física/esportiva (Regra Geral), sem o desconto da saúde." }
    ]
  },
  {
    slug: "salao-beleza-estetica",
    title: "Impostos para Salão de Beleza",
    description_seo: "Salão Parceiro e Reforma Tributária: Como fica a tributação para cabeleireiros, manicures e estética.",
    category: "servico",
    jobTitle: "Cabeleireiro / Estética",
    currentTax: 6.0, 
    verdict: "Neutro / Depende",
    painPoint: "Serviços de estética (cabelo, unha, massagem) estão na regra geral. Clínicas grandes no Lucro Presumido sofrerão impacto.",
    benefit: "O modelo 'Salão Parceiro' deve ser preservado e fortalecido, dividindo a tributação entre o salão e o profissional (muitas vezes MEI, que não muda).",
    legislationNote: "Estética não é saúde para fins de redução tributária (regra geral). MEI permanece inalterado.",
    related_tags: ["Beleza", "MEI", "Serviços"],
    faq: [
      { question: "E quem é MEI?", answer: "O MEI continua pagando valor fixo mensal. A reforma não muda o boleto do MEI por enquanto, a não ser que ele queira gerar crédito." },
      { question: "Produtos de beleza ficam mais baratos?", answer: "Sim, a indústria cosmética terá fim da cumulatividade, o que pode baratear xampus e cremes na ponta." }
    ]
  },

  // ========================================================================
  // GRUPO 5: PRODUTOS E SETORES ESPECÍFICOS
  // ========================================================================
  {
    slug: "corretores-imobiliarias-venda",
    title: "Reforma Tributária em Imóveis",
    description_seo: "Comprar casa vai ficar mais caro? Simule o novo imposto sobre imóveis e aluguéis na Reforma Tributária.",
    category: "imovel",
    jobTitle: "Corretor de Imóveis",
    currentTax: 8.0,
    verdict: "Neutro / Depende",
    painPoint: "Medo de desaquecimento do mercado. Porém, a tributação será apenas sobre a diferença (valor de venda - valor de custo), não sobre o total.",
    benefit: "Regime específico com redutor de alíquota (estimado em 40% a 60% de desconto) e tributação apenas sobre a margem/ganho de capital.",
    legislationNote: "A Constituição garante regime favorecido para operações imobiliárias, construção civil e incorporação.",
    related_tags: ["Imóveis", "Construção", "Vendas"],
    faq: [
      { question: "Aluguel sobe?", answer: "Para residencial, a tendência é neutralidade. Para comercial, pode haver repasse se o locador for empresa." },
      { question: "Venda de imóvel usado (Pessoa Física)?", answer: "Continua pagando ITBI (municipal) e Ganho de Capital (Federal). O IVA foca em operações empresariais (incorporadoras)." }
    ]
  },
  {
    slug: "produtor-rural-agro",
    title: "Reforma Tributária no Agro",
    description_seo: "O Agro é isento? Veja como fica a tributação para produtores rurais PF e PJ na Reforma Tributária.",
    category: "cesta",
    jobTitle: "Produtor Rural",
    currentTax: 3.0,
    verdict: "Isento / Reduzido",
    painPoint: "A burocracia pode aumentar para quem decidir sair do regime especial para aproveitar créditos.",
    benefit: "Produtor Rural PF com faturamento até R$ 3,6 milhões por ano NÃO paga IVA (é considerado não contribuinte). Insumos (adubo, semente) têm redução de 60%.",
    legislationNote: "Cesta Básica Nacional terá alíquota ZERO. Itens do agro fora da cesta têm redução de 60%.",
    related_tags: ["Agronegócio", "Alimentação", "Isenção"],
    faq: [
      { question: "Trator gera crédito?", answer: "Sim! Para produtores que optarem por ser contribuintes, a compra de maquinário gera crédito integral." },
      { question: "Exportação de soja?", answer: "Totalmente isenta (imune). O imposto não é exportado." }
    ]
  },
  {
    slug: "cerveja-bebidas-distribuidoras",
    title: "Preço da Cerveja (Imposto Seletivo)",
    description_seo: "Cerveja vai aumentar? Entenda o Imposto do Pecado e o impacto no preço de bebidas alcoólicas.",
    category: "seletivo",
    jobTitle: "Distribuidor de Bebidas",
    currentTax: 50.0,
    verdict: "Aumento de Carga",
    painPoint: "Dupla incidência: Vai pagar a alíquota padrão (26,5%) + o 'Imposto Seletivo' (extra) na fabricação. A carga total pode superar 60%.",
    benefit: "Fim da complexa Substituição Tributária (ST) do ICMS, que era um pesadelo burocrático para distribuidoras e bares.",
    legislationNote: "Imposto Seletivo incide na fabricação/importação de bens nocivos à saúde (álcool e tabaco).",
    related_tags: ["Imposto Seletivo", "Comércio", "Indústria"],
    faq: [
      { question: "Cerveja artesanal paga?", answer: "Sim, o imposto seletivo atinge alcoólicas em geral, independente do porte da cervejaria." },
      { question: "Refrigerante entra?", answer: "Sim, bebidas açucaradas também estão na mira do Imposto Seletivo por questões de saúde (obesidade/diabetes)." }
    ]
  },
  {
    slug: "supermercados-varejo",
    title: "Reforma Tributária para Supermercados",
    description_seo: "Supermercado na Reforma Tributária: Como lidar com Cesta Básica Zero, Cashback e produtos com alíquota cheia.",
    category: "padrao",
    jobTitle: "Dono de Supermercado",
    currentTax: 18.0,
    verdict: "Neutro / Depende",
    painPoint: "Gestão complexa de múltiplos regimes na mesma prateleira: Cesta Zero (arroz), Cesta Reduzida (carne?), Bebida Seletiva (cerveja) e Produto Padrão (shampoo).",
    benefit: "Fim da cumulatividade. O supermercado se credita de TUDO: energia, aluguel, frete, serviços de limpeza. Isso reduz o custo operacional.",
    legislationNote: "O Cashback pode ser operacionalizado diretamente no caixa para famílias identificadas, exigindo adaptação de software (TEF).",
    related_tags: ["Varejo", "Comércio", "Cesta Básica"],
    faq: [
      { question: "Arroz e feijão sobem?", answer: "Não, pelo contrário. Itens da Cesta Básica Nacional terão alíquota ZERO (hoje pagam resíduos)." },
      { question: "Carne é isenta?", answer: "Discussão em andamento. Provavelmente terá alíquota reduzida (60% de desconto) ou Cashback, mas não isenção total na Cesta Básica (devido ao custo)." }
    ]
  },
  {
    slug: "representantes-comerciais",
    title: "Reforma para Representantes Comerciais",
    description_seo: "Representante Comercial na Reforma Tributária: Vale a pena continuar no Lucro Presumido ou Simples?",
    category: "servico",
    jobTitle: "Representante Comercial",
    currentTax: 16.0,
    verdict: "Aumento de Carga",
    painPoint: "Categoria historicamente tributada no anexo V do Simples (alto) ou Lucro Presumido. Vai para regra geral (26,5%), o que assusta.",
    benefit: "A indústria contratante terá muito mais interesse em contratar PJ, pois o valor pago gera crédito integral de 26,5% para ela abater dos seus impostos.",
    legislationNote: "Serviço de representação segue regra geral.",
    related_tags: ["Vendas", "B2B", "Serviços"],
    faq: [
      { question: "Vale a pena ser PJ?", answer: "Sim, mais do que nunca. O mercado B2B exigirá nota fiscal para tomar crédito. O autônomo (RPA) não gera crédito." },
      { question: "O CORE vai mudar?", answer: "A regulamentação da profissão continua a mesma, o que muda é a tributação sobre a nota fiscal emitida." }
    ]
  }
];