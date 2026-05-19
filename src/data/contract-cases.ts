export interface ContractCase {
    slug: string;
    name: string; // Ex: "Contrato de Prestação de Serviços de Limpeza"
    shortName: string; // Ex: "Limpeza"
    description: string;
    keywords: string[];
    defaultObject: string; // Ex: "Serviços de limpeza e conservação residencial/comercial conforme periodicidade acordada."
    defaultTerms: string; // Cláusulas adicionais sugeridas
    searchVolume: "Alto" | "Médio";
  }
  
  export const contractCases: ContractCase[] = [
    {
      slug: "prestacao-de-servicos",
      name: "Gerador de Contrato de Prestação de Serviços",
      shortName: "Prestação de Serviços",
      description: "Modelo geral de contrato para qualquer tipo de prestação de serviço, protegendo ambas as partes juridicamente.",
      keywords: ["contrato de prestação de serviços simples", "modelo de contrato word pdf", "contrato autonomo"],
      defaultObject: "Prestação de serviços profissionais conforme especificações acordadas entre as partes.",
      defaultTerms: "",
      searchVolume: "Alto"
    },
    {
      slug: "limpeza-diarista",
      name: "Contrato de Prestação de Serviços de Limpeza e Diarista",
      shortName: "Limpeza / Diarista",
      description: "Gere seu contrato para serviços de limpeza, faxina ou diarista. Ideal para evitar vínculos empregatícios indevidos.",
      keywords: ["contrato prestação serviços limpeza", "modelo contrato diarista", "contrato faxineira pdf"],
      defaultObject: "Serviços de limpeza e conservação no imóvel do CONTRATANTE, não configurando vínculo empregatício por não ter caráter de subordinação contínua.",
      defaultTerms: "Os materiais de limpeza e equipamentos de proteção (EPI) deverão ser fornecidos pelo CONTRATANTE.",
      searchVolume: "Alto"
    },
    {
      slug: "moveis-planejados",
      name: "Contrato de Móveis Planejados e Marcenaria",
      shortName: "Móveis Planejados",
      description: "Contrato essencial para marceneiros e lojas de móveis planejados. Estabeleça prazos, entregas e garantias.",
      keywords: ["modelo de contrato moveis planejados", "contrato marcenaria", "contrato prestação de serviço moveis"],
      defaultObject: "Fabricação, entrega e montagem de móveis planejados conforme projeto aprovado e anexo a este contrato.",
      defaultTerms: "A garantia contra defeitos de fabricação será de 90 (noventa) dias legais, não cobrindo danos por mau uso, umidade excessiva ou sobrepeso.",
      searchVolume: "Alto"
    },
    {
      slug: "arquitetura-interiores",
      name: "Contrato de Arquitetura e Interiores",
      shortName: "Arquitetura",
      description: "Gerador de contrato para arquitetos e designers. Estipule escopo de projeto, 3D, revisões e acompanhamento de obra.",
      keywords: ["contrato arquitetura simples", "modelo de contrato designer de interiores", "contrato prestação serviço arquiteto"],
      defaultObject: "Elaboração de projeto arquitetônico / interiores, incluindo estudos preliminares, imagens 3D e detalhamento executivo.",
      defaultTerms: "Estão inclusas até 2 (duas) revisões no estudo preliminar. Revisões adicionais serão cobradas separadamente.",
      searchVolume: "Médio"
    },
    {
      slug: "pintura",
      name: "Contrato de Prestação de Serviços de Pintura",
      shortName: "Pintura",
      description: "Proteja-se na hora de fechar orçamentos de pintura residencial ou comercial. Gere seu contrato em PDF.",
      keywords: ["contrato de prestação de serviços pintura", "modelo contrato pintor pdf", "contrato obra pintura"],
      defaultObject: "Serviços de preparação de superfícies, lixamento, emassamento e pintura no imóvel designado.",
      defaultTerms: "O CONTRATADO se compromete a proteger pisos e móveis durante a execução, devendo entregar o local limpo de respingos.",
      searchVolume: "Alto"
    },
    {
      slug: "marketing-digital",
      name: "Contrato de Marketing Digital e Gestão de Redes Sociais",
      shortName: "Marketing Digital",
      description: "Modelo de contrato para Social Media, Gestores de Tráfego e Agências de Marketing.",
      keywords: ["contrato marketing digital", "modelo contrato social media", "contrato gestao de trafego"],
      defaultObject: "Serviços de planejamento estratégico, criação de conteúdo e gestão de redes sociais/campanhas online.",
      defaultTerms: "O orçamento destinado ao tráfego pago (Facebook Ads, Google Ads) não compõe o valor deste contrato e deve ser pago diretamente às plataformas.",
      searchVolume: "Alto"
    },
    {
      slug: "fotografia-eventos",
      name: "Contrato de Fotografia e Cobertura de Eventos",
      shortName: "Fotografia",
      description: "Contrato para fotógrafos e videomakers. Estipule uso de imagem, prazos de entrega, quantidade de fotos e multas por cancelamento.",
      keywords: ["contrato de fotografia", "modelo contrato fotografo", "contrato prestação serviço audiovisual"],
      defaultObject: "Cobertura fotográfica/audiovisual do evento, incluindo edição, tratamento de imagens e entrega digital conforme pacote contratado.",
      defaultTerms: "A CONTRATANTE autoriza o uso das imagens captadas para composição de portfólio do CONTRATADO. Em caso de cancelamento com menos de 30 dias do evento, o sinal não será devolvido.",
      searchVolume: "Alto"
    },
    {
      slug: "desenvolvimento-software-sites",
      name: "Contrato de Desenvolvimento de Software e Criação de Sites",
      shortName: "Desenvolvimento/Sites",
      description: "Proteja-se de clientes que mudam o escopo toda hora. Defina tecnologias, entregáveis e limites de revisão.",
      keywords: ["contrato criação de site", "modelo contrato desenvolvimento de software", "contrato freelancer ti"],
      defaultObject: "Desenvolvimento de software/website personalizado, abrangendo design de interface, programação e publicação inicial.",
      defaultTerms: "Alterações estruturais que fujam do escopo inicial aprovado serão orçadas e cobradas à parte. O código-fonte só será entregue após quitação total.",
      searchVolume: "Alto"
    },
    {
      slug: "pedreiro-obras",
      name: "Contrato de Empreitada, Pedreiro e Obras",
      shortName: "Empreitada/Obras",
      description: "Formalize o trabalho na construção civil (pedreiro, encanador, eletricista). Evite dor de cabeça com materiais e prazos.",
      keywords: ["contrato de pedreiro", "modelo contrato pequena empreitada", "contrato prestação serviço construção civil"],
      defaultObject: "Execução de obra/reforma, compreendendo os serviços descritos no orçamento anexo, com fornecimento apenas de mão de obra.",
      defaultTerms: "O fornecimento de todos os materiais de construção é de inteira responsabilidade da CONTRATANTE, devendo estar disponíveis no local da obra no momento oportuno.",
      searchVolume: "Alto"
    },
    {
      slug: "transporte-frete",
      name: "Contrato de Transporte de Cargas e Frete",
      shortName: "Transporte/Frete",
      description: "Modelo para transportadoras e motoristas autônomos. Defina responsabilidades sobre avarias, rotas e seguros.",
      keywords: ["contrato de frete", "modelo contrato transporte de cargas", "contrato prestação serviço motorista autonomo"],
      defaultObject: "Transporte rodoviário de cargas do ponto de origem ao destino final, garantindo a integridade dos itens listados no romaneio.",
      defaultTerms: "A CONTRATANTE é responsável por declarar o valor real da carga para fins de seguro. O CONTRATADO não se responsabiliza por mercadorias mal embaladas na origem.",
      searchVolume: "Médio"
    },
    {
      slug: "consultoria-empresarial",
      name: "Contrato de Consultoria e Assessoria Empresarial",
      shortName: "Consultoria",
      description: "Ideal para consultores financeiros, RH, e especialistas. Garanta a confidencialidade e estabeleça cronogramas de reuniões.",
      keywords: ["contrato de consultoria empresarial", "modelo contrato mentoria", "contrato prestação serviço consultor"],
      defaultObject: "Serviços de consultoria especializada, incluindo diagnóstico, elaboração de relatórios, mentoria e acompanhamento estratégico.",
      defaultTerms: "As partes firmam compromisso de estrita confidencialidade (NDA) sobre todos os dados financeiros e estratégicos compartilhados durante a vigência deste contrato.",
      searchVolume: "Médio"
    },
    {
      slug: "aulas-particulares",
      name: "Contrato de Aulas Particulares e Mentoria",
      shortName: "Aulas Particulares",
      description: "Contrato para professores particulares (idiomas, música, reforço escolar). Defina regras de reposição de faltas e pagamentos.",
      keywords: ["contrato professor particular", "modelo contrato aulas de ingles", "contrato prestação serviço educacional"],
      defaultObject: "Ministração de aulas particulares na modalidade (presencial/online), com carga horária semanal e metodologia acordada.",
      defaultTerms: "Faltas do aluno deverão ser comunicadas com no mínimo 24h de antecedência para que haja reposição. Faltas sem aviso prévio serão computadas como aula dada.",
      searchVolume: "Médio"
    }
  ];
