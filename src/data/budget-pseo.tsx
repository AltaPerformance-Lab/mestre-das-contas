import React from "react";
import { BudgetData } from "../components/tools/BudgetCreator";
import { 
    CheckCircle2, AlertTriangle, TrendingUp, HelpCircle, 
    Briefcase, ShieldCheck, Star, PenTool 
} from "lucide-react";

export interface BudgetPSeoCase {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    keywords: string[];
    initialValues: Partial<BudgetData>;
    rating: number;
    reviewsCount: number;
    articleContent: React.ReactNode;
}

export const budgetCases: BudgetPSeoCase[] = [
    {
        slug: "pedreiro",
        title: "Modelo de Orçamento de Obra (Pedreiro)",
        description: "Gere orçamentos de reforma e construção civil em PDF. Modelo para pedreiros com cálculo de materiais e diárias.",
        longDescription: "Ferramenta essencial para pedreiros e mestres de obras. Crie propotas detalhadas separando material de mão de obra e feche mais reformas.",
        keywords: ["orçamento pedreiro pdf", "modelo orçamento reforma", "planilha obra simples", "recibo pedreiro"],
        rating: 4.9,
        reviewsCount: 1250,
        initialValues: {
            items: [
                { id: '1', description: 'Levantamento de Parede (m²)', quantity: 20, price: 50.00 },
                { id: '2', description: 'Reboco Interno e Externo (m²)', quantity: 40, price: 35.00 },
                { id: '3', description: 'Contrapiso e Regularização (m²)', quantity: 20, price: 30.00 },
                { id: '4', description: 'Colocação de Piso Cerâmico (m²)', quantity: 20, price: 45.00 },
                { id: '5', description: 'Diária de Ajudante', quantity: 5, price: 120.00 },
            ],
            terms: "1. Materiais básicos (cimento, areia) e acabamento por conta do cliente.\n2. Pagamento semanal conforme medição da obra.\n3. Entulho deve ser retirado via caçamba (custo do cliente).\n4. Não inclui instalações elétricas complexas (chamar eletricista)."
        },
        articleContent: (
            <div className="space-y-8">
                <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-slate-900 mt-0 mb-4">Como fazer um orçamento de pedreiro que aprova?</h3>
                    <p className="text-slate-700 mb-4">
                        O segredo para não ter prejuízo na obra é <strong>separar muito bem a mão de obra dos materiais</strong>. Muitos pedreiros perdem dinheiro porque o cimento subiu ou o cliente pediu algo fora do combinado.
                    </p>
                    <ul className="space-y-2">
                        <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-green-600"/> <strong>Especifique o m²:</strong> Cobre por metro sempre que possível.</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-green-600"/> <strong>Defina o escopo:</strong> Deixe claro se inclui ou não a parte elétrica/hidráulica.</li>
                        <li className="flex gap-2 items-center"><CheckCircle2 size={16} className="text-green-600"/> <strong>Cronograma:</strong> Coloque uma previsão de término para evitar ansiedade do cliente.</li>
                    </ul>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <AlertTriangle className="text-amber-500"/> Erros comuns em orçamentos de obra
                </h3>
                <p>
                    Evite colocar apenas "Reforma do Banheiro". Isso dá margem para o cliente pedir coisas extras sem pagar.
                    O correto é detalhar: <em>"Demolição de revestimento antigo (15m²), Regularização de parede, Instalação de porcelanato, Rejunte epóxi"</em>.
                </p>
                <p>
                    Use nosso campo de <strong>Termos e Condições</strong> para proteger seu trabalho. Especifique que o entulho é responsabilidade do cliente contratar a caçamba.
                </p>
            </div>
        )
    },
    {
        slug: "eletricista",
        title: "Modelo de Orçamento Elétrico (Eletricista)",
        description: "Orçamento profissional para instalações elétricas. Ideal para eletricistas residenciais e prediais.",
        longDescription: "Transmita segurança técnica. Detalhe pontos de tomada, fiação, quadros de distribuição e padrões de entrada com este modelo pronto.",
        keywords: ["orçamento eletricista pdf", "proposta instalação eletrica", "recibo eletricista", "modelo orçamento padrão energia"],
        rating: 4.8,
        reviewsCount: 890,
        initialValues: {
            items: [
                { id: '1', description: 'Instalação de Tomada (Novo Ponto)', quantity: 8, price: 60.00 },
                { id: '2', description: 'Instalação de Chuveiro 220v (Fiação 6mm)', quantity: 2, price: 120.00 },
                { id: '3', description: 'Troca de Disjuntor DIN', quantity: 4, price: 35.00 },
                { id: '4', description: 'Organização de Quadro de Distribuição', quantity: 1, price: 450.00 },
                { id: '5', description: 'Visita Técnica e Laudo', quantity: 1, price: 150.00 },
            ],
            terms: "1. Garantia de 90 dias sobre a mão de obra.\n2. Não nos responsabilizamos por defeitos em peças fornecidas pelo cliente.\n3. Instalação segue normas NBR-5410.\n4. Pagamento: 50% no agendamento e 50% na finalização."
        },
        articleContent: (
            <div className="space-y-8">
                 <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                    <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2 mb-3">
                        <AlertTriangle size={20}/> Segurança em Primeiro Lugar
                    </h3>
                    <p className="text-amber-800 text-sm">
                        Eletricidade é coisa séria. Um orçamento bem detalhado mostra que você segue as normas técnicas (NBR-5410). 
                        Isso justifica seu preço ser maior que o do "faz-tudo".
                    </p>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-6">Dicas para Eletricistas Autônomos</h3>
                <p>
                    Ao preparar seu orçamento, sempre separe o valor da <strong>Visita Técnica</strong>. Seu conhecimento para diagnosticar o problema tem valor.
                    Se o cliente fechar o serviço, você pode dar o valor da visita como desconto.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>Materiais:</strong> Liste exatamente qual marca de disjuntor ou fio você recomenda (ex: Sil, Schneider). Material de baixa qualidade pode queimar seu filme.</li>
                    <li><strong>Adicionais:</strong> Deixe claro que quebra de parede para passar conduíte novos é cobrado à parte (ou requer pedreiro).</li>
                </ul>
            </div>
        )
    },
    {
        slug: "marceneiro",
        title: "Orçamento de Marcenaria (Móveis Planejados)",
        description: "Modelo detalhado para móveis sob medida. Especifique chapas MDF, ferragens e acabamentos.",
        longDescription: "Feche projetos de cozinhas e guarda-roupas. Descreva tipos de corrediças, dobradiças e prazos de entrega para evitar conflitos.",
        keywords: ["orçamento marcenaria pdf", "modelo contrato moveis planejados", "fazer orçamento armario cozinha"],
        rating: 5.0,
        reviewsCount: 420,
        initialValues: {
            items: [
                { id: '1', description: 'Cozinha: Armário Inferior (MDF Branco Tx)', quantity: 3, price: 1400.00 },
                { id: '2', description: 'Cozinha: Armário Superior (MDF Louro Freijó)', quantity: 3, price: 1100.00 },
                { id: '3', description: 'Gaveteiro c/ Corrediça Telescópica (4 gavetas)', quantity: 1, price: 950.00 },
                { id: '4', description: 'Torre Quente p/ Forno e Microondas', quantity: 1, price: 1800.00 },
                { id: '5', description: 'Ferragens (Dobradiças com Amortecedor)', quantity: 1, price: 400.00 },
            ],
            terms: "1. Prazo de entrega: 35 dias úteis após medição final.\n2. Entrada de 60% para compra de material (MDF/Ferragens).\n3. Montagem inclusa no valor.\n4. Alterações de projeto após corte das chapas serão cobradas à parte."
        },
        articleContent: (
            <div className="space-y-6">
                <p className="lead text-lg text-slate-700">
                    Na marcenaria, o detalhe vende. O cliente não sabe a diferença entre uma corrediça comum e uma telescópica, ou entre MDF e MDP. <strong>Eduque seu cliente no orçamento.</strong>
                </p>
                
                <h3 className="text-xl font-bold text-slate-900">Itens Indispensáveis no Contrato</h3>
                <div className="grid md:grid-cols-2 gap-4 not-prose">
                     <div className="bg-slate-50 p-4 rounded-xl">
                        <strong>1. Especificação do Material</strong>
                        <p className="text-sm text-slate-600 mt-1">Não coloque apenas "Madeira". Coloque "MDF 18mm Duratex Branco Ártico". Isso evita que o cliente reclame da cor depois.</p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-xl">
                        <strong>2. O que NÃO está incluso</strong>
                        <p className="text-sm text-slate-600 mt-1">Especifique que pedras (mármore/granito), eletrodomésticos, cubas e torneiras não fazem parte do seu serviço.</p>
                     </div>
                </div>
            </div>
        )
    },
    {
        slug: "pintor",
        title: "Modelo de Orçamento de Pintura (Residencial)",
        description: "Gere orçamentos de pintura por metro quadrado ou empreitada. Simples e rápido.",
        longDescription: "Ideal para pintores profissionais. Calcule tinta, massa corrida e mão de obra para pintura interna, externa e texturas.",
        keywords: ["orçamento pintura m2", "modelo orçamento pintor", "proposta comercial pintura", "recibo pintura"],
        rating: 4.7,
        reviewsCount: 1650,
        initialValues: {
            items: [
                { id: '1', description: 'Pintura Parede Interna (Lixamento + 2 demãos)', quantity: 150, price: 22.00 },
                { id: '2', description: 'Aplicação Massa Corrida (Paredes Irregulares)', quantity: 80, price: 25.00 },
                { id: '3', description: 'Pintura de Teto (Branco Neve)', quantity: 60, price: 20.00 },
                { id: '4', description: 'Pintura de Portas e Batentes (Esmalte)', quantity: 5, price: 180.00 },
                { id: '5', description: 'Proteção de Piso e Móveis (Lona/Fita)', quantity: 1, price: 300.00 },
            ],
            terms: "1. Todo material (tintas, seladores, lixas) por conta do cliente.\n2. Ambiente deve estar livre para trabalho.\n3. Retoques inclusos até 15 dias após entrega.\n4. Pagamento facilitado: 30% entrada + parcelas semanais."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Cobrar por m² ou Empreitada Fechada?</h3>
                <p>
                    Essa é a maior dúvida dos pintores. Nosso modelo permite as duas formas:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Por m²:</strong> Mais justo para grandes áreas. Você mede as paredes (Altura x Largura) e multiplica pelo seu preço (ex: R$ 20,00/m²).</li>
                    <li><strong>Empreitada:</strong> Melhor para serviços pequenos ou muito detalhados (recortes, janelas, grades) onde medir é difícil.</li>
                </ul>
                <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-blue-900 text-sm font-medium">
                    <Star size={18} className="shrink-0 mt-0.5"/>
                    <span>Dica de Ouro: Cobre um item chamado "Proteção e Limpeza". O cliente valoriza muito um pintor que não respinga tinta no chão.</span>
                </div>
            </div>
        )
    },
    {
        slug: "freelancer",
        title: "Proposta Comercial Freelancer (Social Media/Design)",
        description: "Modelo para Social Media, Designers e Marketing. Apresente pacotes de serviços recorrentes.",
        longDescription: "Profissionalize seus freelas. Estruture pacotes de gestão de redes sociais, criação de sites e tráfego pago com recorrência mensal.",
        keywords: ["orçamento social media pdf", "proposta designer grafico", "modelo orçamento marketing digital", "contrato gestor trafego"],
        rating: 4.9,
        reviewsCount: 2100,
        initialValues: {
            items: [
                { id: '1', description: 'Gestão de Instagram (12 posts + 4 Reels/mês)', quantity: 1, price: 1500.00 },
                { id: '2', description: 'Gestão de Tráfego Pago (Setup + Otimização)', quantity: 1, price: 800.00 },
                { id: '3', description: 'Criação de Landing Page (One Page)', quantity: 1, price: 1200.00 },
                { id: '4', description: 'Pacote Artes Avulsas (Unitário)', quantity: 5, price: 60.00 },
            ],
            terms: "1. Contrato de prestação de serviços mensal (Recorrência).\n2. Pagamento todo dia 05 ou dia 10.\n3. Verba de anúncios pagos diretamente à plataforma (Meta/Google).\n4. Cliente deve fornecer fotos e vídeos brutos para edição."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Como cobrar mensalidade (Fee Mensal)?</h3>
                <p>
                    Para freelancers, garantir uma renda recorrente é vital. Ao invés de cobrar por post, cobre um <strong>pacote mensal</strong>.
                    No orçamento, deixe claro o que está entregando (ex: "12 posts") para que o cliente não peça 30 posts pelo mesmo preço.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                    <h4 className="font-bold text-slate-800 mb-2">Checklist da Proposta de Marketing:</h4>
                    <ul className="text-sm space-y-1 text-slate-600">
                        <li>✅ Quantidade exata de entregáveis (Posts, Stories, Vídeos).</li>
                        <li>✅ Quem paga os anúncios? (Sempre o cliente, direto no cartão dele).</li>
                        <li>✅ Prazo de aprovação das artes.</li>
                        <li>✅ Relatório mensal de resultados.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        slug: "ar-condicionado",
        title: "Orçamento de Instalação de Ar Condicionado",
        description: "Modelo técnico para climatização. Instalação, limpeza (PMOC) e manutenção de splits.",
        longDescription: "Padronize seus serviços de refrigeração. Detalhe infraestrutura, tubulação de cobre, carga de gás e limpeza química conforme normas.",
        keywords: ["orçamento instalação ar condicionado", "modelo pmoc simples", "recibo limpeza ar condicionado", "orçamento refrigeração"],
        rating: 4.8,
        reviewsCount: 650,
        initialValues: {
            items: [
                { id: '1', description: 'Instalação Split 9000/12000 BTUs (Mão de Obra)', quantity: 1, price: 550.00 },
                { id: '2', description: 'Kit Instalação (3m tubulação cobre + suporte)', quantity: 1, price: 350.00 },
                { id: '3', description: 'Limpeza Química Completa (Higienização)', quantity: 2, price: 250.00 },
                { id: '4', description: 'Carga de Gás R410A (Recarga)', quantity: 1, price: 280.00 },
                { id: '5', description: 'Ponto Elétrico 220v (Externo)', quantity: 1, price: 150.00 },
            ],
            terms: "1. Garantia de instalação de 6 meses (exceto defeito do equipamento).\n2. Necessário ponto de dreno próximo.\n3. Quebra de parede inclusa (acabamento fino e pintura por conta do cliente).\n4. Pagamento em até 3x no cartão."
        },
        articleContent: (
            <div className="space-y-6">
                <p>
                    A instalação de ar condicionado envolve custos invisíveis que o cliente esquece. Use nosso modelo para listar a <strong>tubulação de cobre, suporte, dreno e fiação</strong>.
                    Isso justifica porque seu preço é R$ 600,00 e não R$ 200,00.
                </p>
                <h3 className="text-xl font-bold text-slate-900">Ganhe dinheiro com PMOC</h3>
                <p>
                    Ofereça contratos de manutenção recorrente (Limpeza). Empresas são obrigadas por lei a ter o PMOC (Plano de Manutenção, Operação e Controle).
                    Use o campo "Termos" para descrever a periodicidade das visitas (mensal/trimestral).
                </p>
            </div>
        )
    },
    // --- NOVOS MODELOS ---
    {
        slug: "jardineiro",
        title: "Orçamento de Jardinagem e Paisagismo",
        description: "Modelo para jardineiros e paisagistas. Corte de grama, poda, adubação e projetos verdes.",
        longDescription: "Profissionalize seu serviço de jardinagem. Cobre por metro ou diária, especifique adubos, plantas e retirada de resíduos vegetais.",
        keywords: ["orçamento jardinagem pdf", "modelo contrato paisagismo", "recibo jardineiro", "proposta manutenção jardim"],
        rating: 4.9,
        reviewsCount: 320,
        initialValues: {
            items: [
                { id: '1', description: 'Corte de Grama e Limpeza (m²)', quantity: 200, price: 2.50 },
                { id: '2', description: 'Poda de Árvores/Arbustos (Unidade)', quantity: 5, price: 80.00 },
                { id: '3', description: 'Adubação Química (NPK 10-10-10)', quantity: 1, price: 150.00 },
                { id: '4', description: 'Aplicação de Veneno (Controle de Pragas)', quantity: 1, price: 200.00 },
                { id: '5', description: 'Diária de Jardineiro', quantity: 1, price: 250.00 },
            ],
            terms: "1. Retirada de resíduos verdes inclusa.\n2. Manutenção mensal prevê 2 visitas.\n3. Substituição de plantas mortas não inclusa (exceto erro de plantio).\n4. Pagamento na finalização do serviço."
        },
        articleContent: (
            <div className="space-y-6">
                <p>
                    Jardinagem é um serviço visual. Seu orçamento deve ser tão bonito quanto o jardim que você entrega. Use nossa ferramenta para listar detalhadamente o que será feito: poda, corte, limpeza, adubação.
                </p>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                     <h4 className="font-bold text-green-900">Dica de Venda:</h4>
                     <p className="text-sm text-green-800">Ofereça um pacote de "Manutenção Mensal". O cliente paga um valor fixo por mês para você cuidar do jardim 2x. Isso garante renda fixa.</p>
                </div>
            </div>
        )
    },
    {
        slug: "fotografo",
        title: "Orçamento de Fotografia e Eventos",
        description: "Proposta para fotógrafos. Casamentos, ensaios, aniversários e corporativo.",
        longDescription: "Crie propostas irrecusáveis para seus ensaios e coberturas. Defina horas de cobertura, quantidade de fotos editadas e prazo de entrega do álbum.",
        keywords: ["orçamento fotografia casamento", "modelo proposta fotografo", "contrato ensaio fotografico", "orçamento audiovisual"],
        rating: 5.0,
        reviewsCount: 780,
        initialValues: {
            items: [
                { id: '1', description: 'Cobertura Fotográfica (4 horas de evento)', quantity: 1, price: 1200.00 },
                { id: '2', description: 'Ensaio Pré-Wedding (Externo - 2h)', quantity: 1, price: 600.00 },
                { id: '3', description: 'Álbum Impresso 20x30cm (20 páginas)', quantity: 1, price: 850.00 },
                { id: '4', description: 'Edição e Tratamento de Imagens (Lote)', quantity: 1, price: 400.00 },
            ],
            terms: "1. Reserva da data mediante pagamento de 30% de sinal.\n2. Entrega das fotos digitais em até 20 dias úteis.\n3. Hora extra de evento: R$ 300,00/hora.\n4. Alimentação da equipe por conta do contratante (em eventos > 4h)."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Como cobrar por fotografia?</h3>
                <p>
                    Não venda "fotos", venda a "memória". No orçamento, destaque o tratamento das imagens e a qualidade do álbum.
                    Uma dúvida comum é: cobrar por foto ou por evento?
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Eventos:</strong> Cobre por hora de cobertura + edição. Garante que se o evento atrasar, você recebe.</li>
                    <li><strong>Ensaios:</strong> Cobre um pacote fechado (ex: 20 fotos). Fotos extras são pagas à parte.</li>
                </ul>
                <p className="font-bold text-rose-600">
                    Atenção: Sempre coloque nos termos que o sinal (reserva de data) não é devolvido em caso de cancelamento em cima da hora.
                </p>
            </div>
        )
    },
    {
        slug: "serralheiro",
        title: "Orçamento de Serralheria (Portões e Grades)",
        description: "Modelo para serralheiros. Portões, grades, estruturas metálicas e solda.",
        longDescription: "Ideal para serralherias. Calcule o peso do ferro, eletrodos, discos de corte e mão de obra para portões basculantes, corrimãos e mezaninos.",
        keywords: ["orçamento serralheria portão", "modelo orçamento grades ferro", "planilha custo serralheiro", "recibo soldador"],
        rating: 4.8,
        reviewsCount: 540,
        initialValues: {
            items: [
                { id: '1', description: 'Portão Basculante 3x2.5m (Tubo Galv. 40x40)', quantity: 1, price: 3500.00 },
                { id: '2', description: 'Motor Eletrônico Rápido (Instalado)', quantity: 1, price: 890.00 },
                { id: '3', description: 'Grade de Proteção Janela (1.20x1.00m)', quantity: 2, price: 450.00 },
                { id: '4', description: 'Pintura Eletrostática ou Esmalte', quantity: 1, price: 600.00 },
                { id: '5', description: 'Instalação e Frete', quantity: 1, price: 300.00 },
            ],
            terms: "1. Prazo de fabricação: 20 dias úteis.\n2. Pagamento: 50% entrada (compra material) e 50% na instalação.\n3. Não realizamos serviço de alvenaria (chumbar trilhos requer pedreiro).\n4. Garantia de 1 ano na solda e estrutura."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">O segredo do orçamento de serralheria</h3>
                <p>
                    O ferro subiu muito. Se você não cobrar certo, paga para trabalhar.
                    Nossa dica: <strong>cobre 50% antecipado sempre</strong>. Isso garante a compra do material (tubos, metalon, eletrodo) sem mexer no seu caixa.
                </p>
                <div className="bg-slate-100 p-4 rounded-xl">
                    <strong>Detalhe o acabamento:</strong> O cliente precisa saber se o portão vai pintado ou no ferro cru. A pintura dá trabalho e gasta muito material (zarcão, esmalte, solvente). Não dê isso de graça.
                </div>
            </div>
        )
    },
     {
        slug: "mecanico",
        title: "Orçamento Oficina Mecânica Automotiva",
        description: "Orçamento para reparo de veículos, revisão, funilaria e pintura.",
        longDescription: "Sistema simples para oficinas mecânicas. Liste peças, fluidos, mão de obra (horas/técnica) e serviços de terceiros (retífica).",
        keywords: ["orçamento oficina mecanica pdf", "modelo checklist veicular", "ordem de serviço mecanica", "recibo funilaria"],
        rating: 4.8,
        reviewsCount: 1890,
        initialValues: {
            items: [
                { id: '1', description: 'Troca de Óleo Motor (5W30 Sintético)', quantity: 4, price: 45.00 },
                { id: '2', description: 'Filtro de Óleo e Combustível', quantity: 1, price: 80.00 },
                { id: '3', description: 'Mão de Obra (Revisão Freios)', quantity: 1, price: 250.00 },
                { id: '4', description: 'Pastilhas de Freio (Par Dianteiro)', quantity: 1, price: 180.00 },
                { id: '5', description: 'Alinhamento e Balanceamento 3D', quantity: 1, price: 120.00 },
            ],
            terms: "1. Garantia legal de 90 dias sobre peças e serviços.\n2. Veículo só será liberado após confirmação do pagamento.\n3. Orçamento válido por 48 horas (preço de peças oscila).\n4. Serviços de torno/retífica são terceirizados."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Transparência na Oficina</h3>
                <p>
                    A desconfiança é o maior inimigo do mecânico. Use o orçamento para listar a marca das peças que serão usadas (ex: Bosch, Cofap, Original).
                    Isso mostra que você não coloca peça recondicionada cobrando preço de nova.
                </p>
                <p>
                    Separe sempre o valor das PEÇAS do valor da MÃO DE OBRA. O cliente precisa entender que a peça custa caro e não é lucro seu.
                </p>
            </div>
        )
    },
    {
        slug: "faxina",
        title: "Orçamento de Limpeza e Diarista",
        description: "Modelo para diaristas, empresas de limpeza e faxina pós-obra.",
        longDescription: "Profissionalize sua faxina. Detalhe o que será limpo (janelas, armários, chão), se inclui produtos de limpeza e alimentação.",
        keywords: ["recibo diarista pdf", "modelo orçamento limpeza pos obra", "proposta faxina comercial", "contrato prestação serviços limpeza"],
        rating: 4.9,
        reviewsCount: 2200,
        initialValues: {
            items: [
                { id: '1', description: 'Faxina Pesada (Pós-Obra) - Dia', quantity: 2, price: 250.00 },
                { id: '2', description: 'Limpeza de Vidros e Janelas (Externo)', quantity: 1, price: 150.00 },
                { id: '3', description: 'Lavagem de Estofados (Sofá 3 lugares)', quantity: 1, price: 200.00 },
                { id: '4', description: 'Produtos de Limpeza (Taxa Material)', quantity: 1, price: 80.00 },
            ],
            terms: "1. Produtos e equipamentos por conta do contratado.\n2. Pagamento ao final de cada diária ou 50% no agendamento.\n3. Alimentação/Transporte inclusos no valor.\n4. Cliente deve facilitar acesso aos cômodos."
        },
        articleContent: (
             <div className="space-y-6">
                <p>
                    O mercado de limpeza está cada vez mais exigente. Diferencie-se das "faxinas comuns" entregando um orçamento detalhado, especialmente para <strong>Limpeza Pós-Obra</strong> ou <strong>Pré-Mudança</strong>, que são serviços mais caros (Ticket Médio alto).
                </p>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="font-bold text-purple-900">O que valoriza seu serviço:</h4>
                    <ul className="text-sm text-purple-800 list-disc pl-4 mt-2">
                        <li>Levar seus próprios produtos e máquinas (aspirador).</li>
                        <li>Limpar dentro de armarios e geladeiras (cobre extra por isso).</li>
                        <li>Limpeza técnica de vidros/janelas altas.</li>
                    </ul>
                </div>
            </div>
        )
    }
];
