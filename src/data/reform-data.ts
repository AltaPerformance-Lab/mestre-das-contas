export interface ReformData {
  slug: string;
  title: string;
  category: "servico" | "padrao" | "saude" | "cesta" | "imovel" | "seletivo" | "agro";
  jobTitle: string;
  currentTax: number;
  painPoint: string;
  benefit: string;
  legislationNote: string;
  law_reference?: string;
  // Verdict controla a cor do card (Vermelho, Verde, Amarelo)
  verdict: "Aumento de Carga" | "Redução de Carga" | "Neutro / Depende" | "Isento" | "Isento / Reduzido";
  description_seo: string;
  related_tags: string[];
  faq: { question: string; answer: string }[];
}

export const reformData: ReformData[] = [
  // ========================================================================
  // GRUPO 1: JURÍDICO E ENGENHARIA (SERVIÇOS INTELECTUAIS)
  // ========================================================================
  {
    slug: "advogados-escritorios-advocacia",
    title: "Reforma Tributária para Advogados",
    description_seo: "Advogado pagará mais imposto com o IVA? Simule o impacto do IBS/CBS no seu escritório e compare com o Simples Nacional e Lucro Presumido.",
    category: "servico",
    jobTitle: "Advogado / Sociedade",
    currentTax: 14.5, // Média Presumido ISS Fixo
    verdict: "Aumento de Carga",
    painPoint: "A advocacia (hoje no Lucro Presumido com ISS fixo) sofrerá um dos maiores impactos, saindo de ~14% para a alíquota cheia estimada em 26,5%.",
    benefit: "O 'Split Payment' automático reduzirá a inadimplência. Além disso, a nota fiscal do advogado gerará crédito integral para clientes PJ, facilitando a venda de contratos mensais (Fee Mensal).",
    legislationNote: "A OAB pleiteou regime diferenciado, mas o texto base manteve a advocacia na regra geral de serviços.",
    law_reference: "PLP 68/2024 - Regra Geral de Serviços",
    related_tags: ["Serviços", "Lucro Presumido", "Honorários"],
    faq: [
      { question: "O Simples Nacional acaba para advogados?", answer: "Não. O Simples continua, mas o crédito gerado para o cliente será limitado. Grandes bancas podem ser pressionadas a migrar para o Lucro Real/Presumido." },
      { question: "Honorários de sucumbência pagam IVA?", answer: "Sim. São tributados como receita de serviço, incidindo a alíquota cheia (26,5%) no momento do recebimento." }
    ]
  },
  {
    slug: "engenheiros-arquitetos-urbanistas",
    title: "Impacto para Engenheiros e Arquitetos",
    description_seo: "Calculadora de impostos para Engenheiros na Reforma Tributária. Veja se a carga vai subir para 26,5% e como ficam os projetos e ARTs.",
    category: "servico",
    jobTitle: "Engenheiro / Arquiteto",
    currentTax: 16.0,
    verdict: "Aumento de Carga",
    painPoint: "A alíquota para projetos técnicos saltará de ~16% para 26,5% (IVA Cheio). O custo do serviço intelectual ficará mais alto na ponta.",
    benefit: "A não-cumulatividade é a chave: Construtoras poderão descontar 100% do imposto pago no seu projeto. Isso incentiva a contratação formal via PJ e desestimula o 'recibo por fora'.",
    legislationNote: "Profissões regulamentadas (CREA/CAU) seguem a regra geral. O regime específico de imóveis não se aplica ao projetista.",
    related_tags: ["Construção Civil", "Projetos", "B2B"],
    faq: [
      { question: "Posso abater software (CAD/BIM)?", answer: "Sim! Licenças de software, computadores e plotters geram crédito imediato (IBS/CBS) para abater seu imposto a pagar." },
      { question: "Como fica o Engenheiro PJ?", answer: "Sua nota fiscal ficará mais cara, mas se tornará um 'ativo' tributário valioso para a construtora contratante." }
    ]
  },
  {
    slug: "contadores-escritorios-contabilidade",
    title: "Reforma Tributária para Contadores",
    description_seo: "Contabilidade ficará mais cara? Entenda o impacto da Reforma nos escritórios contábeis e no BPO Financeiro.",
    category: "servico",
    jobTitle: "Contador / BPO",
    currentTax: 15.0,
    verdict: "Aumento de Carga",
    painPoint: "Escritórios no Lucro Presumido terão aumento nominal de carga. O desafio será repassar esse custo sem perder clientes pequenos.",
    benefit: "O contador será o profissional mais valorizado da década. A transição de 7 anos com dois sistemas tributários simultâneos criará uma demanda explosiva por consultoria.",
    legislationNote: "Serviços contábeis seguem a regra geral (26,5%), sem alíquota reduzida específica.",
    related_tags: ["Consultoria", "BPO", "Compliance"],
    faq: [
      { question: "BPO Financeiro paga igual?", answer: "Sim, terceirização financeira entra na regra geral de serviços." },
      { question: "Escritório no Simples muda algo?", answer: "O Simples permanece, mas grandes clientes podem exigir migração para regimes que gerem mais crédito tributário." }
    ]
  },

  // ========================================================================
  // GRUPO 2: SAÚDE (OS VENCEDORES - 60% DESCONTO)
  // ========================================================================
  {
    slug: "medicos-clinicas-consultorios",
    title: "Reforma para Médicos e Clínicas",
    description_seo: "Médico paga menos na Reforma? Entenda a redução de 60% na alíquota e simule seus ganhos como PJ.",
    category: "saude",
    jobTitle: "Médico / Clínica",
    currentTax: 11.33,
    verdict: "Redução de Carga",
    painPoint: "A burocracia do 'Split Payment' pode travar o fluxo de caixa de clínicas que dependem de recebíveis de cartão de crédito.",
    benefit: "Grande Vitória: Serviços de saúde humana têm redução de 60% na alíquota padrão. Carga estimada de ~10,6%, mantendo ou melhorando a competitividade.",
    legislationNote: "Redução de 60% garantida constitucionalmente para serviços de saúde e dispositivos médicos.",
    law_reference: "PLP 68/2024 - Art. 116 (Serviços de Saúde)",
    related_tags: ["Saúde", "Clínicas", "Médicos"],
    faq: [
      { question: "Cirurgia Plástica tem desconto?", answer: "Reparadora sim. Estética pura corre risco de cair na regra geral, dependendo da classificação final do procedimento." },
      { question: "Planos de Saúde aumentam?", answer: "Operadoras também têm alíquota reduzida, mas a complexidade dos repasses pode gerar ajustes de preço no curto prazo." }
    ]
  },
  {
    slug: "dentistas-odontologia",
    title: "Reforma Tributária na Odontologia",
    description_seo: "Dentista PJ: Veja o impacto da Reforma. Materiais e implantes ficarão mais baratos com o novo IVA?",
    category: "saude",
    jobTitle: "Dentista / Odonto",
    currentTax: 11.33,
    verdict: "Redução de Carga",
    painPoint: "A adaptação dos softwares de clínica para emitir a Nota Fiscal de Serviços Eletrônica (NFS-e) no padrão nacional será obrigatória.",
    benefit: "Odontologia tem redução de 60% na alíquota. E melhor: a compra de insumos caros (implantes, cadeiras) agora gera crédito para abater o imposto.",
    legislationNote: "Odontologia classificada como saúde humana com redutor de 60%.",
    related_tags: ["Saúde", "Implantes", "Materiais"],
    faq: [
      { question: "Materiais dentários baixam de preço?", answer: "Tendência de queda. Dispositivos médicos também têm alíquota reduzida e fim da cumulatividade na indústria." },
      { question: "Harmonização (HOF) entra?", answer: "Zona cinzenta. Se classificada como estética, pode pagar 26,5%. Se saúde, 10,6%." }
    ]
  },
  {
    slug: "psicologos-terapeutas",
    title: "Reforma para Psicólogos",
    description_seo: "Psicólogo paga IVA cheio? Saiba como a Reforma Tributária classifica a saúde mental e sua nova alíquota.",
    category: "saude",
    jobTitle: "Psicólogo",
    currentTax: 10.0,
    verdict: "Neutro / Depende",
    painPoint: "Aumenta a fiscalização sobre recebimentos via Pix e Cartão, forçando a formalização total das receitas.",
    benefit: "Enquadramento na saúde garante alíquota de ~10,6%. Para quem está no Lucro Presumido hoje, pode haver redução real de carga.",
    legislationNote: "Psicologia clínica é saúde humana. Terapias holísticas aguardam definição.",
    related_tags: ["Saúde Mental", "Terapia", "Autônomos"],
    faq: [
      { question: "Atendimento online muda o imposto?", answer: "A alíquota é a mesma, mas o imposto (IBS) é devido no local do paciente, exigindo sistema que identifique o CEP do cliente." },
      { question: "Supervisão clínica entra?", answer: "Sim, serviços educacionais ou de saúde possuem alíquotas favorecidas." }
    ]
  },
  {
    slug: "veterinarios-pet-shop",
    title: "Reforma para Veterinários (Polêmica)",
    description_seo: "Veterinário é saúde? Entenda por que Pet Shops podem ter aumento de imposto na Reforma Tributária.",
    category: "servico", // Veterinário ficou fora da saúde humana
    jobTitle: "Veterinário",
    currentTax: 13.0,
    verdict: "Aumento de Carga",
    painPoint: "Polêmica: Saúde animal NÃO entrou na redução de 60% no texto base. Clínicas veterinárias vão para a regra geral (26,5%), dobrando a carga atual.",
    benefit: "O único alívio é o crédito financeiro: compra de medicamentos, vacinas e equipamentos gera crédito para abater o imposto alto da saída.",
    legislationNote: "Veterinária segue regra geral. Há forte lobby para inclusão na saúde, mas sem garantia atual.",
    related_tags: ["Pets", "Serviços", "Polêmica"],
    faq: [
      { question: "Consulta do pet vai aumentar?", answer: "Sim. Se mantida na regra geral, o repasse de custos para o tutor será inevitável." },
      { question: "Banho e Tosa?", answer: "Segue a regra geral de serviços (26,5%), exceto se for MEI ou Simples Nacional." }
    ]
  },

  // ========================================================================
  // GRUPO 3: TECNOLOGIA E CRIATIVIDADE (EXPORTAÇÃO É REI)
  // ========================================================================
  {
    slug: "programadores-ti-software",
    title: "Reforma Tributária para Programadores",
    description_seo: "Dev PJ vai pagar mais imposto? Veja como a Reforma afeta TI, SaaS e a isenção na exportação de software.",
    category: "servico",
    jobTitle: "Desenvolvedor / TI",
    currentTax: 11.0,
    verdict: "Neutro / Depende",
    painPoint: "Setor com pouca tomada de crédito (poucos insumos físicos) e folha alta. No mercado interno, a alíquota de 26,5% pesa.",
    benefit: "Ouro: Exportação de Software é totalmente ISENTA (Imune). Trabalhar para fora (EUA/Europa) terá tributação ZERO de consumo (IBS/CBS).",
    legislationNote: "Software é serviço na regra geral. Exportação mantém imunidade tributária.",
    related_tags: ["Tecnologia", "Exportação", "SaaS"],
    faq: [
      { question: "Devo exportar serviços?", answer: "Sim! É o melhor cenário tributário. Zero IBS/CBS, pagando apenas IRPJ/CSLL." },
      { question: "Desenvolvo para empresas no Brasil?", answer: "Sua nota fiscal encarece, mas gera crédito total para a empresa contratante. No B2B, o efeito é neutro." }
    ]
  },
  {
    slug: "influenciadores-digitais-youtubers",
    title: "Impostos para Influenciadores",
    description_seo: "Influencer paga imposto sobre recebidos? Reforma Tributária para YouTubers, Instagrammers e Streamers.",
    category: "servico",
    jobTitle: "Influencer / Creator",
    currentTax: 10.0,
    verdict: "Neutro / Depende",
    painPoint: "Receitas de 'publi' nacionais sofrerão a alíquota padrão (26,5%). Permutas também deverão ser tributadas pelo valor de mercado.",
    benefit: "AdSense e ganhos de plataformas estrangeiras (YouTube, Twitch, TikTok) configuram exportação de serviço e são ISENTOS de IBS/CBS.",
    legislationNote: "Publicidade e streaming seguem regra geral. Exportação é imune.",
    related_tags: ["Digital", "AdSense", "Marketing"],
    faq: [
      { question: "AdSense paga imposto?", answer: "Não paga IBS/CBS se a fonte for estrangeira (Google LLC). Você paga apenas imposto de renda sobre o lucro." },
      { question: "Permuta paga imposto?", answer: "Sim. A lei exige emissão de nota sobre o valor do produto recebido em troca da divulgação." }
    ]
  },

  // ========================================================================
  // GRUPO 4: COMÉRCIO, LAZER E TURISMO
  // ========================================================================
  {
    slug: "restaurantes-bares-alimentacao",
    title: "Reforma para Restaurantes",
    description_seo: "Preço da comida vai subir? Entenda o regime diferenciado para Bares e Restaurantes na Reforma Tributária.",
    category: "saude", // Visualmente verde (reduzido)
    jobTitle: "Dono de Restaurante",
    currentTax: 8.0, 
    verdict: "Redução de Carga",
    painPoint: "Fim do PERSE (programa de retomada) e a complexidade de gerir créditos de insumos com alíquotas diferentes (bebida x comida).",
    benefit: "Alimentação fora do lar ganhou regime diferenciado (redução de 60%). Além disso, crédito integral na conta de luz e aluguel reduz custo fixo.",
    legislationNote: "Regime específico de Bares e Restaurantes garantido na EC 132.",
    related_tags: ["Alimentação", "Turismo", "Comércio"],
    faq: [
      { question: "Cerveja no bar fica mais cara?", answer: "Sim. A bebida paga 'Imposto Seletivo' na fábrica, chegando mais cara para o bar revender." },
      { question: "Delivery entra na redução?", answer: "Sim, tele-entrega de alimentos segue a regra de alimentação fora do lar (reduzida)." }
    ]
  },
  {
    slug: "hoteis-pousadas-turismo",
    title: "Reforma na Hotelaria e Turismo",
    description_seo: "Diárias de hotel vão aumentar? Veja o impacto do IVA reduzido na hotelaria e parques de diversão.",
    category: "saude", // Visualmente verde
    jobTitle: "Hoteleiro / Turismo",
    currentTax: 12.0,
    verdict: "Redução de Carga",
    painPoint: "Setor sensível a preço. Plataformas digitais (Airbnb/Booking) terão que recolher imposto na fonte (Split Payment).",
    benefit: "Vitória do setor: Hotelaria, parques e eventos ganharam redução de 60% na alíquota. Fundamental para competitividade do turismo interno.",
    legislationNote: "Hotelaria e parques temáticos nas exceções constitucionais.",
    related_tags: ["Turismo", "Lazer", "Eventos"],
    faq: [
      { question: "Airbnb paga imposto?", answer: "Sim. As plataformas digitais serão responsáveis solidárias pelo recolhimento do imposto." },
      { question: "Eventos corporativos?", answer: "Também entram na alíquota reduzida de eventos." }
    ]
  },
  {
    slug: "academias-fitness-crossfit",
    title: "Reforma para Academias",
    description_seo: "Mensalidade da academia vai subir? Por que o setor fitness ficou na regra geral da Reforma Tributária.",
    category: "servico",
    jobTitle: "Dono de Academia",
    currentTax: 12.0,
    verdict: "Aumento de Carga",
    painPoint: "Ficaram na REGRA GERAL (26,5%). Como o cliente final é Pessoa Física (não toma crédito), o repasse de preço será sentido na mensalidade.",
    benefit: "Equipamentos caros (esteiras, musculação) geram crédito integral na compra. Isso barateia a montagem e renovação da academia.",
    legislationNote: "Atividades físicas seguem alíquota padrão, salvo projetos sociais.",
    related_tags: ["Fitness", "Saúde", "Esporte"],
    faq: [
      { question: "Personal Trainer paga quanto?", answer: "Autônomo segue regra geral. Se for MEI, continua pagando fixo." },
      { question: "Crossfit é saúde?", answer: "Tributariamente não. É atividade física (Regra Geral 26,5%)." }
    ]
  },

  // ========================================================================
  // GRUPO 5: PRODUTOS E SETORES ESPECÍFICOS
  // ========================================================================
  {
    slug: "corretores-imobiliarias-venda",
    title: "Reforma Tributária em Imóveis",
    description_seo: "Comprar casa vai ficar mais caro? Simule o novo imposto sobre imóveis e aluguéis.",
    category: "imovel",
    jobTitle: "Corretor / Imobiliária",
    currentTax: 8.0,
    verdict: "Neutro / Depende",
    painPoint: "Risco de desaquecimento se a alíquota final for alta. A tributação incide sobre a diferença (Venda - Custo) ou valor total com redutor.",
    benefit: "Regime específico com redutor de alíquota (estimado em 40% a 60% de desconto) e tributação focada no ganho, não no faturamento total.",
    legislationNote: "Constituição garante regime favorecido para operações imobiliárias.",
    related_tags: ["Imóveis", "Construção", "Vendas"],
    faq: [
      { question: "Aluguel sobe?", answer: "Para residencial, a tendência é neutralidade. Comercial pode ter repasse." },
      { question: "Venda de imóvel usado (PF)?", answer: "Continua pagando ITBI e Ganho de Capital. O IVA foca em operações empresariais (incorporadoras)." }
    ]
  },
  {
    slug: "produtor-rural-agro",
    title: "Reforma Tributária no Agro",
    description_seo: "O Agro é isento? Tributação para produtores rurais PF e PJ na Reforma.",
    category: "agro",
    jobTitle: "Produtor Rural",
    currentTax: 3.0,
    verdict: "Isento / Reduzido",
    painPoint: "Burocracia pode aumentar para quem decidir sair do regime especial para aproveitar créditos de maquinário.",
    benefit: "Produtor Rural PF (faturamento até R$ 3,6mi/ano) é ISENTO de IVA. Insumos agropecuários têm redução de 60%.",
    legislationNote: "Cesta Básica Nacional (Alíquota Zero) e Regime do Produtor Rural.",
    related_tags: ["Agronegócio", "Alimentação", "Isenção"],
    faq: [
      { question: "Trator gera crédito?", answer: "Sim! Se o produtor optar por ser contribuinte, a compra de máquinas gera crédito integral." },
      { question: "Exportação de soja?", answer: "Totalmente imune. O imposto não é exportado." }
    ]
  },
  {
    slug: "cerveja-bebidas-distribuidoras",
    title: "Preço da Cerveja (Imposto Seletivo)",
    description_seo: "Cerveja vai aumentar? O impacto do 'Imposto do Pecado' nas bebidas alcoólicas.",
    category: "seletivo",
    jobTitle: "Distribuidor de Bebidas",
    currentTax: 50.0,
    verdict: "Aumento de Carga",
    painPoint: "Dupla incidência: Alíquota padrão (26,5%) + Imposto Seletivo na fabricação. Carga total pode superar 60% para desestimular consumo.",
    benefit: "Fim da Substituição Tributária (ST) do ICMS, simplificando a burocracia para distribuidoras e bares.",
    legislationNote: "Imposto Seletivo sobre bens nocivos à saúde (álcool e tabaco).",
    related_tags: ["Imposto Seletivo", "Indústria", "Bebidas"],
    faq: [
      { question: "Cerveja artesanal paga?", answer: "Sim, o imposto seletivo atinge alcoólicas em geral." },
      { question: "Refrigerante entra?", answer: "Sim, bebidas açucaradas também estão na lista do Imposto Seletivo." }
    ]
  },
  {
    slug: "supermercados-varejo",
    title: "Reforma para Supermercados",
    description_seo: "Supermercado na Reforma: Cesta Básica Zero, Cashback e produtos com alíquota cheia.",
    category: "padrao",
    jobTitle: "Supermercadista",
    currentTax: 18.0,
    verdict: "Neutro / Depende",
    painPoint: "Gestão complexa de múltiplos regimes na mesma gôndola: Cesta Zero (arroz), Reduzida (carnes), Seletiva (bebida) e Padrão (limpeza).",
    benefit: "Fim da cumulatividade: O mercado se credita de TUDO (energia, frete, aluguel, serviços). A inclusão de Carnes na Cesta Básica Zero (provável) ajuda nas vendas.",
    legislationNote: "Cashback pode ser operacionalizado no caixa. Carnes devem entrar na Cesta Zero.",
    related_tags: ["Varejo", "Cesta Básica", "Cashback"],
    faq: [
      { question: "Arroz e feijão?", answer: "Alíquota ZERO na Cesta Básica Nacional." },
      { question: "Carne é isenta?", answer: "Tendência forte de inclusão na Cesta Básica Zero no texto final da regulamentação." }
    ]
  }
];