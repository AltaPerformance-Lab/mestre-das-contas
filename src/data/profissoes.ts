export interface Profissao {
  slug: string;
  title: string;
  piso2026: number;
  mediaSalarial: number;
  cargaHoraria: string;
  regime: string;
  fonte: string;
  desc: string;
  sindicato: string;
  adicionais: string;
  beneficios: string[];
  detalhesMercado: string;
  faixasProfissionais: {
    junior: number;
    pleno: number;
    senior: number;
  };
}

export const profissoes: Profissao[] = [
  {
    slug: "enfermeiro",
    title: "Enfermeiro",
    piso2026: 4750.00,
    mediaSalarial: 5120.00,
    cargaHoraria: "44h semanais",
    regime: "CLT / Estatutário",
    fonte: "Lei Federal nº 14.434/2022",
    desc: "O piso salarial nacional da enfermagem foi estabelecido por lei federal e é aplicável a profissionais de hospitais públicos, privados e filantrópicos em todo o Brasil.",
    sindicato: "FNE (Federação Nacional dos Enfermeiros) / Cofen (Conselho Federal de Enfermagem)",
    adicionais: "Adicional de Insalubridade (normalmente 20% ou 40% sobre o salário mínimo nacional ou salário base, conforme a instituição) e Adicional Noturno para plantões entre 22h e 5h.",
    beneficios: ["Plano de Saúde Hospitalar", "Vale Refeição / Alimentação", "Auxílio Creche (em convenções estaduais)", "Seguro de Vida em Grupo"],
    detalhesMercado: "O mercado para enfermeiros apresenta altíssima demanda, especialmente em grandes centros urbanos e redes hospitalares de média e alta complexidade. A consolidação do piso nacional em lei trouxe maior estabilidade financeira, embora a negociação de jornadas regionais ainda varie em plantões 12x36h.",
    faixasProfissionais: {
      junior: 4750.00,
      pleno: 5800.00,
      senior: 7500.00
    }
  },
  {
    slug: "desenvolvedor-software",
    title: "Desenvolvedor de Software",
    piso2026: 4800.00,
    mediaSalarial: 8900.00,
    cargaHoraria: "40h semanais",
    regime: "CLT / PJ",
    fonte: "Convenções Sindicais de TI (Sindpd e correlatos)",
    desc: "O piso salarial do profissional de tecnologia da informação varia regionalmente, mas costuma seguir convenções coletivas fortes que estipulam pisos mínimos para júniores, analistas e técnicos.",
    sindicato: "Sindpd (Sindicato dos Trabalhadores em Processamento de Dados) de cada estado",
    adicionais: "Hora Extra com acréscimo de 50% a 100% ou banco de horas, adicional noturno para plantões de infraestrutura/sistemas e reembolso por certificações de tecnologia.",
    beneficios: ["Vale Refeição Premium", "Plano de Saúde e Odontológico Nacional", "Auxílio Home Office (Internet/Equipamentos)", "Participação nos Lucros e Resultados (PLR)"],
    detalhesMercado: "A área de desenvolvimento de software e tecnologia da informação possui um dos maiores crescimentos salariais do mercado. Embora o piso sindical sirva como garantia inicial (especialmente para suporte e desenvolvedores júniores), a alta demanda por profissionais qualificados faz com que a média real de mercado seja muito superior ao piso.",
    faixasProfissionais: {
      junior: 4800.00,
      pleno: 8500.00,
      senior: 14000.00
    }
  },
  {
    slug: "professor",
    title: "Professor da Educação Básica",
    piso2026: 4580.57,
    mediaSalarial: 4890.00,
    cargaHoraria: "40h semanais",
    regime: "CLT / Estatutário",
    fonte: "Lei nº 11.738/2008 / Portaria do Ministério da Educação (MEC)",
    desc: "O piso salarial nacional do magistério público da educação básica é atualizado anualmente com base no crescimento do Fundo de Manutenção e Desenvolvimento da Educação Básica (Fundeb).",
    sindicato: "CNTE (Confederação Nacional dos Trabalhadores em Educação)",
    adicionais: "Adicional de tempo de serviço (anuênio/bienal/quinquênio em regimes públicos), adicional de aprimoramento acadêmico (pós-graduação, mestrado e doutorado) e hora-atividade de 1/3 da jornada reservada para planejamento.",
    beneficios: ["Licença Prêmio (para servidores públicos estatuários)", "Vale Alimentação", "Acesso facilitado a cursos de extensão profissional", "Plano de saúde regional de servidores"],
    detalhesMercado: "O piso nacional serve de referência para toda a rede pública municipal, estadual e federal, além de pautar as convenções coletivas das escolas privadas de ensino fundamental e médio.",
    faixasProfissionais: {
      junior: 4580.57,
      pleno: 5400.00,
      senior: 6800.00
    }
  },
  {
    slug: "engenheiro-civil",
    title: "Engenheiro Civil",
    piso2026: 9180.00,
    mediaSalarial: 10200.00,
    cargaHoraria: "40h semanais",
    regime: "CLT / Autônomo / PJ",
    fonte: "Lei Federal nº 4.950-A/1966 / CREA-CONFEA",
    desc: "O piso salarial do engenheiro é regulamentado por lei federal vinculada ao salário mínimo nacional, exigindo 6 salários mínimos para jornadas de 6 horas diárias e 8,5 salários mínimos para 8 horas diárias.",
    sindicato: "Senge (Sindicato dos Engenheiros) de cada estado / Conselho Federal de Engenharia e Agronomia (Confea)",
    adicionais: "Adicional de periculosidade (30%) caso atue em canteiros de alta tensão, depósitos inflamáveis ou áreas de risco elevado. Responsabilidade técnica remunerada.",
    beneficios: ["Vale Refeição de Obra", "Seguro de Acidentes de Trabalho", "Plano de Saúde Corporativo", "Auxílio Combustível ou Veículo da Empresa"],
    detalhesMercado: "A engenharia possui piso legal forte, embora muitas empresas contratem sob a denominação de 'analista' ou 'tecnólogo' para evitar o piso. Exigir o registro no CREA e a contratação como engenheiro garante o cumprimento do salário base nacional.",
    faixasProfissionais: {
      junior: 9180.00,
      pleno: 11500.00,
      senior: 16000.00
    }
  },
  {
    slug: "auxiliar-servicos-gerais",
    title: "Auxiliar de Serviços Gerais",
    piso2026: 1518.00,
    mediaSalarial: 1750.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Salário Mínimo Regional / Federal 2026",
    desc: "A remuneração mínima para a categoria de serviços gerais e manutenção predial acompanha o salário mínimo ou pisos salariais estaduais (como os do RJ, SP, PR e RS).",
    sindicato: "Siemaco (Sindicato dos Trabalhadores em Empresas de Prestação de Serviços de Limpeza e Conservação)",
    adicionais: "Adicional de Insalubridade (20% a 40%) dependendo da exposição direta a agentes químicos de limpeza concentrados ou lixo biológico urbano pesado.",
    beneficios: ["Cesta Básica ou Vale Alimentação", "Vale Transporte Obrigatório", "Seguro de Vida em Grupo", "Uniforme Completo Fornecido pela Empresa"],
    detalhesMercado: "Setor com alto nível de contratação em regime de terceirização. O cumprimento dos pisos sindicais locais costuma ser rigidamente fiscalizado em licitações públicas e grandes condomínios comerciais.",
    faixasProfissionais: {
      junior: 1518.00,
      pleno: 1800.00,
      senior: 2200.00
    }
  },
  {
    slug: "recepcionista",
    title: "Recepcionista",
    piso2026: 1620.00,
    mediaSalarial: 1950.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Convenções Coletivas do Comércio e Serviços",
    desc: "O salário normativo ou piso de ingresso para recepcionistas de clínicas, consultórios, hotéis e escritórios comerciais é estipulado por convenções coletivas estaduais ou municipais.",
    sindicato: "Seac (Sindicato das Empresas de Asseio e Conservação) / Sindicatos de Comerciários locais",
    adicionais: "Quebra de caixa (caso exerça dupla função de recepção e cobrança financeira) e adicional noturno para recepções de hotéis e hospitais 24h.",
    beneficios: ["Vale Transporte", "Vale Refeição ou Alimentação", "Assistência Odontológica Básica", "Convênio de Farmácia"],
    detalhesMercado: "Área de entrada muito comum no mercado administrativo. Habilidades com sistemas digitais, agendamento em nuvem e excelente comunicação interpessoal valorizam o profissional acima da média padrão.",
    faixasProfissionais: {
      junior: 1620.00,
      pleno: 1950.00,
      senior: 2500.00
    }
  },
  {
    slug: "vendedor",
    title: "Vendedor do Varejo",
    piso2026: 1650.00,
    mediaSalarial: 2400.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sindicato dos Empregados no Comércio",
    desc: "Vendedores de lojas de shopping e do comércio de rua têm um piso salarial garantido (salário fixo da categoria), abaixo do qual não podem receber, além das comissões contratuais.",
    sindicato: "Sindicatos de Comerciários e Vendedores locais",
    adicionais: "Comissão percentual sobre vendas individuais ou coletivas (garantido o piso caso a soma de comissões não atinja o mínimo da categoria), DSR (Descanso Semanal Remunerado) sobre as comissões.",
    beneficios: ["Vale Transporte", "Comissões Agressivas", "Premiações por Metas", "Plano de Saúde Familiar (em grandes redes)"],
    detalhesMercado: "O ganho real do vendedor depende fundamentalmente do seu desempenho e do volume de vendas. Em datas comemorativas (Black Friday, Natal), a remuneração final pode triplicar em relação ao piso estipulado.",
    faixasProfissionais: {
      junior: 1650.00,
      pleno: 2800.00,
      senior: 4500.00
    }
  },
  {
    slug: "motorista-caminhao",
    title: "Motorista de Caminhão",
    piso2026: 2650.00,
    mediaSalarial: 3800.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sindicato dos Condutores de Veículos Rodoviários",
    desc: "O piso do motorista rodoviário de cargas pesadas é fixado com base no tipo de veículo operado, tipo de carga (carga seca, frigorificada, produtos químicos) e rotas (urbanas ou interestaduais).",
    sindicato: "Sindimotoristas / Federações Estaduais de Trabalhadores em Transportes Rodoviários",
    adicionais: "Adicional de Periculosidade (30%) para transporte de inflamáveis, diárias de viagem (ajuda de custo para alimentação e pousada) e horas extras de trânsito controlado.",
    beneficios: ["Seguro de Vida com Cobertura Ampliada", "Diária de Viagem Garantida", "Plano de Saúde com Rede de Rodovias", "Auxílio Alimentação / Cesta Básica"],
    detalhesMercado: "Há carência crônica de motoristas carreteiros qualificados. Profissionais com certificados de cursos específicos (MOPP para produtos perigosos, cargas indivisíveis) possuem piso e remuneração muito mais elevados.",
    faixasProfissionais: {
      junior: 2650.00,
      pleno: 3800.00,
      senior: 5500.00
    }
  },
  {
    slug: "psicologo",
    title: "Psicólogo Clinico/Organizacional",
    piso2026: 3600.00,
    mediaSalarial: 4250.00,
    cargaHoraria: "30h semanais",
    regime: "CLT / Autônomo",
    fonte: "Conselho Federal de Psicologia / Projetos de Lei do Piso Coletivo",
    desc: "A base salarial do psicólogo é fixada em âmbito estadual por sindicatos de saúde e de psicólogos, variando sob jornadas reduzidas de até 30 horas semanais padrão.",
    sindicato: "Fenapsi (Federação Nacional dos Psicólogos) / Conselhos Regionais (CRP)",
    adicionais: "Adicional de insalubridade caso atue em hospitais psiquiátricos, penitenciárias ou postos de saúde de atenção básica de média/alta complexidade.",
    beneficios: ["Plano de Saúde Regional", "Vale Alimentação", "Flexibilidade de Agenda", "Seguro de Responsabilidade Civil Profissional"],
    detalhesMercado: "Crescimento explosivo da demanda por saúde mental nas empresas (Psicologia Organizacional) e clínicas digitais (telepsicologia). Os salários em empresas privadas como RH e recrutamento costumam superar os pisos de clínicas convencionais.",
    faixasProfissionais: {
      junior: 3600.00,
      pleno: 4800.00,
      senior: 7200.00
    }
  },
  {
    slug: "fisioterapeuta",
    title: "Fisioterapeuta",
    piso2026: 3800.00,
    mediaSalarial: 4400.00,
    cargaHoraria: "30h semanais",
    regime: "CLT / Estatutário / Cooperado",
    fonte: "COFFITO / Sindicatos de Fisioterapia e Terapia Ocupacional",
    desc: "Os pisos estaduais de fisioterapia costumam tomar como base a jornada reduzida de 30 horas semanais, estabelecida pela Lei Federal nº 8.856/1994, com reajustes negociados anualmente.",
    sindicato: "Sinfito (Sindicato de Fisioterapeutas e Terapeutas Ocupacionais) de cada estado / Crefito",
    adicionais: "Adicional de Insalubridade (20% a 40%) em hospitais, UTIs e clínicas de reabilitação física intensiva.",
    beneficios: ["Plano de Saúde Co-participativo", "Vale Refeição", "Financiamento para Cursos de Especialização", "Convênio de Farmácia"],
    detalhesMercado: "Fisioterapia desportiva, reabilitação traumato-ortopédica e home-care de idosos são áreas em franca ascensão. O ganho por plantões hospitalares e atendimento particular domiciliar complementa de forma robusta o piso salarial clt da categoria.",
    faixasProfissionais: {
      junior: 3800.00,
      pleno: 4700.00,
      senior: 6900.00
    }
  },
  {
    slug: "auxiliar-administrativo",
    title: "Auxiliar Administrativo",
    piso2026: 1850.00,
    mediaSalarial: 2200.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Convenções Coletivas do Comércio e Serviços",
    desc: "O auxiliar administrativo desempenha tarefas diárias de apoio à gestão de escritórios, faturamento, organização de arquivos e atendimento comercial.",
    sindicato: "Sindicatos de Empregados de Escritórios e Serviços estaduais",
    adicionais: "Horas extras a 50% ou 100%, quebra de caixa caso manipule fluxo financeiro diretamente.",
    beneficios: ["Vale Transporte", "Vale Refeição", "Seguro de Vida", "Plano de Saúde Coparticipativo"],
    detalhesMercado: "Cargo com altíssimo giro e contratações em todos os setores econômicos. Excelente porta de entrada profissional.",
    faixasProfissionais: {
      junior: 1850.00,
      pleno: 2400.00,
      senior: 3500.00
    }
  },
  {
    slug: "vigilante",
    title: "Vigilante de Segurança",
    piso2026: 2450.00,
    mediaSalarial: 3200.00,
    cargaHoraria: "Escala 12x36h ou 44h",
    regime: "CLT",
    fonte: "Convenções de Segurança e Vigilância Privada",
    desc: "Profissional responsável por resguardar a integridade de patrimônios e pessoas em bancos, empresas e condomínios residenciais.",
    sindicato: "Sindvigilantes / Federações Estaduais de Vigilância e Segurança",
    adicionais: "Adicional de Periculosidade obrigatório de 30% sobre o salário base, adicional noturno para plantões noturnos.",
    beneficios: ["Vale Alimentação / Refeição", "Seguro de Vida Especial", "Assistência Odontológica", "Uniforme Completo Balístico"],
    detalhesMercado: "Setor muito aquecido e rigidamente fiscalizado pela Polícia Federal, exigindo curso de formação e reciclagem periódica.",
    faixasProfissionais: {
      junior: 2450.00,
      pleno: 3200.00,
      senior: 4200.00
    }
  },
  {
    slug: "farmaceutico",
    title: "Farmacêutico",
    piso2026: 4300.00,
    mediaSalarial: 4950.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Conselho Federal de Farmácia / Acordos Sindicais Regionais",
    desc: "Responsável técnico pela dispensação de medicamentos, controle de fórmulas, assistência clínica e atendimento em drogarias e farmácias hospitalares.",
    sindicato: "Sinfar (Sindicato dos Farmacêuticos) / CRF (Conselho Regional de Farmácia)",
    adicionais: "Adicional de Responsabilidade Técnica (RT) e adicional de insalubridade.",
    beneficios: ["Vale Alimentação", "Seguro de Vida", "Participação em Resultados (PLR)", "Desconto em Medicamentos"],
    detalhesMercado: "A abertura constante de novas farmácias e drogarias de grandes redes mantém o mercado extremamente favorável a farmacêuticos em todo o país.",
    faixasProfissionais: {
      junior: 4300.00,
      pleno: 5200.00,
      senior: 7000.00
    }
  },
  {
    slug: "dentista",
    title: "Dentista / Odontólogo",
    piso2026: 4554.00,
    mediaSalarial: 6500.00,
    cargaHoraria: "20h semanais",
    regime: "CLT / Prestador de Serviços",
    fonte: "Lei Federal nº 3.999/1961",
    desc: "Profissional regulamentado por lei federal, dedicado à saúde bucal em clínicas públicas, privadas e consultórios populares.",
    sindicato: "Sindicatos de Odontologistas / Conselho Regional de Odontologia (CRO)",
    adicionais: "Adicional de insalubridade (20% a 40%) e gratificação de responsabilidade clínica.",
    beneficios: ["Plano de Saúde Odontológico", "Financiamento de Equipamentos", "Auxílio Congresso Científico", "Seguro Multirrisco"],
    detalhesMercado: "Altamente voltado para o setor autônomo, mas com consolidação expressiva de contratações CLT em redes populares e clínicas de convênios.",
    faixasProfissionais: {
      junior: 4554.00,
      pleno: 6200.00,
      senior: 9500.00
    }
  },
  {
    slug: "arquiteto",
    title: "Arquiteto e Urbanista",
    piso2026: 9108.00,
    mediaSalarial: 9800.00,
    cargaHoraria: "40h semanais",
    regime: "CLT / PJ / Autônomo",
    fonte: "Lei Federal nº 4.950-A/1966 / CAU",
    desc: "Profissional dedicado ao planejamento urbano, arquitetura de interiores, projetos residenciais, comerciais e industriais.",
    sindicato: "Sinarq (Sindicato dos Arquitetos) / CAU (Conselho de Arquitetura e Urbanismo)",
    adicionais: "Adicional de Responsabilidade Técnica (RRT) e prêmios de produtividade por acompanhamento de obras.",
    beneficios: ["Vale Refeição Especial", "Seguro de Responsabilidade Civil", "Auxílio Transporte para Obras", "Plano de Saúde Executivo"],
    detalhesMercado: "O mercado de design de interiores e reformas de alto padrão cresce muito rápido, garantindo excelentes contratos autônomos acima do piso CLT.",
    faixasProfissionais: {
      junior: 9108.00,
      pleno: 11000.00,
      senior: 16500.00
    }
  },
  {
    slug: "programador",
    title: "Programador Frontend / Backend",
    piso2026: 4900.00,
    mediaSalarial: 8500.00,
    cargaHoraria: "40h semanais",
    regime: "CLT / PJ",
    fonte: "Convenções de TI estaduais (Sindpd e similares)",
    desc: "Profissional de programação focado na codificação de interfaces (Frontend) ou regras de negócios, servidores e bancos de dados (Backend).",
    sindicato: "Sindicatos de TI e Processamento de Dados de cada estado (Sindpd)",
    adicionais: "Hora extra a 50% ou 100%, banco de horas e auxílio reembolsável para certificações tecnológicas.",
    beneficios: ["Auxílio Home Office (Internet)", "Vale Refeição Premium", "Plano de Saúde e Odontológico", "Participação nos Resultados (PLR)"],
    detalhesMercado: "Altíssima empregabilidade nacional e internacional. O tráfego para buscas por 'salário de programador' é um dos mais valiosos e lucrativos no nicho de tecnologia.",
    faixasProfissionais: {
      junior: 4900.00,
      pleno: 8200.00,
      senior: 13500.00
    }
  },
  {
    slug: "servente-de-obras",
    title: "Servente de Obras",
    piso2026: 1650.00,
    mediaSalarial: 1950.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sinduscon (Sindicato da Construção Civil) regional",
    desc: "Profissional de apoio na construção civil, realizando transporte de materiais, preparação de massas de concreto e limpeza de canteiros de obras.",
    sindicato: "Sindicatos dos Trabalhadores nas Indústrias da Construção Civil",
    adicionais: "Adicional de insalubridade e horas extras com acréscimo legal.",
    beneficios: ["Cesta Básica", "Café da Manhã e Almoço no Canteiro", "Seguro de Acidentes", "EPIs Fornecidos Gratuitamente"],
    detalhesMercado: "Vaga operacional com alto volume de contratação imediata, servindo de base fundamental para todas as obras de infraestrutura.",
    faixasProfissionais: {
      junior: 1650.00,
      pleno: 1950.00,
      senior: 2300.00
    }
  },
  {
    slug: "pedreiro",
    title: "Pedreiro",
    piso2026: 2150.00,
    mediaSalarial: 2800.00,
    cargaHoraria: "44h semanais",
    regime: "CLT / Empreitada",
    fonte: "Sinduscon / Sindicatos de Construção Civil",
    desc: "Profissional qualificado na execução de alvenaria, revestimentos cerâmicos, concretagem, fundações e acabamentos de engenharia civil.",
    sindicato: "Sindicatos de Trabalhadores da Construção Civil locais",
    adicionais: "Adicional de periculosidade ou insalubridade conforme o canteiro de obras, horas extras.",
    beneficios: ["Almoço no Local", "Cesta Básica de Alimentos", "Seguro de Acidentes de Trabalho", "Kit de Ferramentas de Trabalho"],
    detalhesMercado: "Mercado em contínuo crescimento. Profissionais especializados em acabamentos finos ou porcelanatos conseguem diárias altamente valorizadas como autônomos.",
    faixasProfissionais: {
      junior: 2150.00,
      pleno: 3000.00,
      senior: 4500.00
    }
  },
  {
    slug: "manobrista",
    title: "Manobrista de Estacionamento",
    piso2026: 1720.00,
    mediaSalarial: 1980.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sindicatos de Estacionamentos e Garagens (Sindepark)",
    desc: "Responsável por receber, manobrar e zelar pelos veículos em estacionamentos privados, hotéis, shoppings e eventos especiais.",
    sindicato: "Sindepark (Sindicato das Empresas de Estacionamento) / Sindicato dos Condutores Rodoviários",
    adicionais: "Adicional de periculosidade (em alguns acordos) e adicional noturno para plantões noturnos de valets.",
    beneficios: ["Vale Transporte", "Vale Refeição", "Seguro contra Danos a Veículos de Terceiros", "Uniforme Completo"],
    detalhesMercado: "Grande procura em polos hoteleiros, shoppings e centros urbanos. Habilidade com carros automáticos e direção defensiva são diferenciais obrigatórios.",
    faixasProfissionais: {
      junior: 1720.00,
      pleno: 1980.00,
      senior: 2500.00
    }
  },
  {
    slug: "entregador-motoboy",
    title: "Entregador / Motoboy",
    piso2026: 1850.00,
    mediaSalarial: 2600.00,
    cargaHoraria: "44h semanais",
    regime: "CLT / Cooperado / Autônomo",
    fonte: "Acordos Coletivos de Empresas de Entrega e Logística",
    desc: "Profissional dedicado à entrega rápida de refeições, encomendas, documentos e e-commerce utilizando motocicletas ou bicicletas.",
    sindicato: "Sindimoto (Sindicato dos Mensageiros, Motociclistas e Ciclistas)",
    adicionais: "Adicional de Periculosidade obrigatório de 30% (Lei Federal nº 12.997) e taxa de aluguel/desgaste da moto.",
    beneficios: ["Seguro de Vida Específico", "Auxílio Manutenção de Veículo", "Equipamentos de Proteção de Chuva", "Vale Refeição / Ticket"],
    detalhesMercado: "Crescimento avassalador impulsionado por aplicativos de delivery e e-commerce rápido. Excelente remuneração por produtividade.",
    faixasProfissionais: {
      junior: 1850.00,
      pleno: 2800.00,
      senior: 4200.00
    }
  },
  {
    slug: "porteiro-vigia",
    title: "Porteiro / Vigia",
    piso2026: 1880.00,
    mediaSalarial: 2200.00,
    cargaHoraria: "Escala 12x36h ou 44h",
    regime: "CLT",
    fonte: "Convenções Coletivas de Condomínios e Edifícios (Sindicon)",
    desc: "Responsável pelo controle de acesso de moradores, prestadores de serviço e visitantes em condomínios residenciais ou empresariais.",
    sindicato: "Sindicatos de Empregados em Condomínios (Sindicon)",
    adicionais: "Adicional de acúmulo de função (em alguns acordos) e adicional noturno obrigatório para escala da noite.",
    beneficios: ["Vale Transporte", "Cesta Básica", "Plano de Saúde Ambulatorial", "Uniforme Fornecido"],
    detalhesMercado: "Demanda perene em todas as capitais. A migração para portarias eletrônicas exige maior familiaridade com computadores e softwares de acesso.",
    faixasProfissionais: {
      junior: 1880.00,
      pleno: 2200.00,
      senior: 2800.00
    }
  },
  {
    slug: "cozinheiro",
    title: "Cozinheiro de Restaurante",
    piso2026: 1980.00,
    mediaSalarial: 2500.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Convenções Coletivas de Hotéis, Restaurantes e Bares",
    desc: "Responsável pelo preparo de pratos, gestão de suprimentos da praça de cozinha, controle de qualidade e cumprimento de normas sanitárias.",
    sindicato: "Sinthoresp (Sindicato de Hotéis, Bares e Restaurantes)",
    adicionais: "Adicional de acúmulo de função, horas extras noturnas e adicionais de feriados trabalhados.",
    beneficios: ["Refeição Completa no local", "Vale Transporte", "Plano Odontológico", "Seguro de Vida em Grupo"],
    detalhesMercado: "Setor gastronômico e de eventos muito forte. Cozinheiros especializados em gastronomia internacional possuem salários excelentes.",
    faixasProfissionais: {
      junior: 1980.00,
      pleno: 2700.00,
      senior: 4200.00
    }
  },
  {
    slug: "eletricista",
    title: "Eletricista",
    piso2026: 2250.00,
    mediaSalarial: 3100.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sindicatos de Metalúrgicos e Construção Civil",
    desc: "Profissional responsável pela instalação, manutenção preventiva e corretiva de redes de energia elétrica industrial e residencial.",
    sindicato: "Sindicatos de Trabalhadores em Instalações Elétricas / Sindicatos de Construção Civil",
    adicionais: "Adicional de Periculosidade obrigatório de 30% para quem atua em redes de alta/baixa tensão viva.",
    beneficios: ["Seguro de Vida de Alta Cobertura", "Cesta Básica de Alimentos", "Plano de Saúde", "Kit de Ferramentas de Proteção (NR10)"],
    detalhesMercado: "Sempre aquecido. A obrigatoriedade dos cursos NR10 e NR35 garante maior valorização do piso da categoria.",
    faixasProfissionais: {
      junior: 2250.00,
      pleno: 3200.00,
      senior: 4800.00
    }
  },
  {
    slug: "frentista",
    title: "Frentista de Posto",
    piso2026: 1920.00,
    mediaSalarial: 2600.00,
    cargaHoraria: "44h semanais",
    regime: "CLT",
    fonte: "Sinpospetro / Convenções de Postos de Combustíveis",
    desc: "Profissional de atendimento direto em postos de combustível, realizando abastecimento de veículos e venda de serviços correlatos.",
    sindicato: "Sinpospetro (Sindicato dos Frentistas e Empregados em Postos)",
    adicionais: "Adicional de Periculosidade obrigatório de 30% devido ao contato diário com vapores inflamáveis e combustíveis.",
    beneficios: ["Vale Transporte", "Vale Refeição ou Cesta Básica", "Seguro de Vida Coletivo", "Uniforme Especial de Proteção"],
    detalhesMercado: "Setor com sindicato muito combativo que garante reajustes frequentes e proteção das condições laborais.",
    faixasProfissionais: {
      junior: 1920.00,
      pleno: 2600.00,
      senior: 3200.00
    }
  }
];
