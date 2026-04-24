import React from "react";
import { OrderData } from "../components/tools/OrderCreator";
import { 
    ShoppingBag, Truck, Package, Utensils, 
    Palette, Briefcase, Wrench, CheckCircle2, AlertTriangle, Star
} from "lucide-react";

export interface OrderPSeoCase {
    slug: string;
    title: string;
    description: string;
    longDescription: string;
    keywords: string[];
    initialValues: Partial<OrderData>;
    rating: number;
    reviewsCount: number;
    articleContent: React.ReactNode;
}

export const orderCases: OrderPSeoCase[] = [
    {
        slug: "confeitaria",
        title: "Pedido para Confeitaria e Bolos",
        description: "Modelo de pedido para confeiteiras. Detalhe sabor, recheio, peso do bolo e data de entrega.",
        longDescription: "Organize suas encomendas de bolos e doces. Especifique decoração, topos de bolo e taxa de entrega para evitar confusões com clientes.",
        keywords: ["pedido confeitaria pdf", "encomenda bolo modelo", "bloco pedido doces", "ficha técnica confeitaria"],
        rating: 5.0,
        reviewsCount: 1420,
        initialValues: {
            items: [
                { id: '1', description: 'Bolo Aniversário (Massa Baunilha / Recheio Ninho com Morango) - 2kg', quantity: 1, price: 180.00 },
                { id: '2', description: 'Docinhos Tradicionais (Brigadeiro/Beijinho) - Cento', quantity: 1, price: 120.00 },
                { id: '3', description: 'Topo de Bolo Personalizado (Scrap)', quantity: 1, price: 35.00 },
            ],
            shipping: { value: 15.00, notes: "Taxa de entrega (Motoboy)" },
            terms: "1. Encomenda confirmada mediante 50% de sinal.\n2. Bolo deve ser mantido refrigerado até a hora do parabéns.\n3. Não nos responsabilizamos por transporte feito pelo cliente (Uber/Carro próprio).\n4. Cancelamentos com menos de 48h não terão devolução do sinal."
        },
        articleContent: (
            <div className="space-y-6">
                <div className="bg-pink-50 dark:bg-pink-950/30 p-6 rounded-2xl border-l-4 border-pink-500">
                    <h3 className="text-xl font-bold text-pink-900 dark:text-pink-200 mt-0 mb-4 flex items-center gap-2"><Utensils size={20}/> Como organizar encomendas de bolos?</h3>
                    <p className="text-pink-800 dark:text-pink-300 mb-4">
                        O erro nº 1 na confeitaria é a falta de detalhes. "Bolo de Chocolate" pode ser mil coisas.
                        Use o campo de descrição para especificar: <strong className="text-pink-900 dark:text-white">Massa, Recheio, Cobertura e Decoração</strong>.
                    </p>
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                    Outro ponto crítico é o <strong>Transporte</strong>. Bolos decorados são frágeis. Sempre coloque no pedido quem é o responsável pela entrega. Se o cliente for buscar, escreva que a "garantia termina na entrega em mãos".
                </p>
            </div>
        )
    },
    {
        slug: "roupas",
        title: "Pedido de Venda Roupas (Loja/Sacoleira)",
        description: "Talão de pedido para venda de roupas. Controle tamanhos, cores e política de troca.",
        longDescription: "Ideal para sacoleiras e lojas de moda. Emita pedidos profissionais com política de troca clara e link de pagamento.",
        keywords: ["bloco pedido roupas pdf", "modelo pedido venda moda", "talão pedido sacoleira", "recibo loja roupas"],
        rating: 4.8,
        reviewsCount: 2100,
        initialValues: {
            items: [
                { id: '1', description: 'Vestido Longo Floral (Tamanho M)', quantity: 1, price: 149.90 },
                { id: '2', description: 'Blusa Básica Gola V (Branca - P)', quantity: 2, price: 49.90 },
                { id: '3', description: 'Calça Jeans Skinny (Tam 38)', quantity: 1, price: 129.90 },
            ],
            shipping: { value: 0, notes: "Retirada na Loja" },
            terms: "1. Trocas em até 7 dias com etiqueta fixada e sem uso.\n2. Peças em PROMOÇÃO não possuem troca.\n3. Lavagem incorreta não cobre garantia.\n4. Pagamento parcelado em até 3x sem juros."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Política de Troca: Sua melhor amiga</h3>
                <p className="text-slate-700 dark:text-slate-300">
                    Vender roupa online ou na malinha requer regras claras. No seu pedido, destaque em letras maiúsculas: <strong>PRAZO DE TROCA</strong> e <strong>CONDIÇÕES DA PEÇA</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                    <li><strong>Promoções:</strong> Deixe claro se peças de bazar/sale têm troca. Pela lei (CDC), defeitos sempre têm garantia, mas "gosto/tamanho" não é obrigatório em loja física.</li>
                    <li><strong>Reserva:</strong> Não segure peças sem sinal. Use o pedido para formalizar a reserva por 24h apenas mediante pagamento.</li>
                </ul>
            </div>
        )
    },
    {
        slug: "artesanato",
        title: "Pedido de Artesanato e Personalizados",
        description: "Modelo para artesãos. Detalhe cores, personalização de nomes e prazo de produção.",
        longDescription: "Valorize seu trabalho manual. Especifique tempo de confecção, materiais usados e aprovação da arte final antes da produção.",
        keywords: ["orçamento artesanato pdf", "pedido personalizado", "modelo contrato artesão", "recibo encomenda"],
        rating: 4.9,
        reviewsCount: 850,
        initialValues: {
            items: [
                { id: '1', description: 'Kit Maternidade Personalizado (Nome: THEO)', quantity: 1, price: 280.00 },
                { id: '2', description: 'Lembrancinhas Batizado (Sachê Perfumado)', quantity: 30, price: 8.50 },
                { id: '3', description: 'Porta Maternidade Mdf/Tecido', quantity: 1, price: 150.00 },
            ],
            shipping: { value: 35.00, notes: "PAC (Correios) - Rastreio: A Enviar" },
            terms: "1. Prazo de produção: 15 dias úteis APÓS confirmação do pagamento.\n2. Arte digital enviada para aprovação em até 3 dias.\n3. Por ser personalizado, não aceitamos devolução (apenas defeito).\n4. Variações pequenas de cor podem ocorrer na impressão/tecido."
        },
        articleContent: (
            <div className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-950/30 p-6 rounded-2xl border-l-4 border-indigo-500">
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-200 mt-0 mb-4 flex items-center gap-2"><Palette size={20}/> Personalizado não tem volta!</h3>
                    <p className="text-indigo-800 dark:text-indigo-300 mb-4">
                        Pela lei, produtos feitos sob encomenda exclusivamente para o cliente (com nome, foto, etc) <strong>não têm direito de arrependimento</strong> simples, pois não podem ser revendidos.
                    </p>
                    <p className="text-indigo-900 dark:text-white font-bold">
                        Escreva isso nos termos do pedido para se proteger!
                    </p>
                </div>
            </div>
        )
    },
    {
        slug: "representante",
        title: "Pedido de Venda (Representação Comercial)",
        description: "Talão de pedido padrão para representantes. Ideal para venda B2B e atacado.",
        longDescription: "Ferramenta para representantes comerciais. Emita pedidos de fábrica com cálculo de IPI, ICMS ST (nos campos livres) e prazos de faturamento.",
        keywords: ["bloco pedido representação pdf", "modelo pedido atacado", "fazer pedido venda b2b", "talão representante comercial"],
        rating: 4.7,
        reviewsCount: 1100,
        initialValues: {
            items: [
                { id: '1', description: 'Ref. 1020 - Parafuso Sextavado 1/4 (Caixa c/ 100)', quantity: 50, price: 25.00 },
                { id: '2', description: 'Ref. 3050 - Bucha Nylon S8 (Milheiro)', quantity: 10, price: 45.00 },
                { id: '3', description: 'Ref. 8800 - Abraçadeira Tipo D 3/4', quantity: 100, price: 1.20 },
            ],
            shipping: { value: 0, notes: "FOB (Por conta do destinatário)" },
            terms: "1. Faturamento mínimo: R$ 500,00.\n2. Prazo de pagamento: Boleto 28/42/56 dias (sujeito a análise de crédito).\n3. Mercadoria despachada de São Paulo-SP.\n4. Devoluções apenas com autorização da fábrica (RMA)."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frete CIF ou FOB?</h3>
                <p className="text-slate-700 dark:text-slate-300">
                    No atacado, essa definição muda tudo. Use o campo de "Obs. Frete" para marcar:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                    <li><strong>CIF (Cost, Insurance and Freight):</strong> Frete pago por quem vende (Emissor).</li>
                    <li><strong>FOB (Free On Board):</strong> Frete pago por quem compra (Cliente). A responsabilidade da carga é do cliente assim que sai da fábrica.</li>
                </ul>
            </div>
        )
    },
    {
        slug: "servico",
        title: "Ordem de Serviço (Assistência Técnica)",
        description: "OS simples para técnicos. Celulares, informática e reparos em geral.",
        longDescription: "Controle a entrada e saída de equipamentos. Registre defeito relatado, laudo técnico, peças trocadas e garantia do serviço.",
        keywords: ["ordem de serviço celular pdf", "modelo os assistencia tecnica", "ficha entrada equipamento", "recibo conserto"],
        rating: 4.9,
        reviewsCount: 1800,
        initialValues: {
            items: [
                { id: '1', description: 'Troca de Display (Tela Incell)', quantity: 1, price: 350.00 },
                { id: '2', description: 'Bateria Nova (Primeira Linha)', quantity: 1, price: 180.00 },
                { id: '3', description: 'Limpeza Interna e Higienização', quantity: 1, price: 50.00 },
                { id: '4', description: 'Película de Vidro 3D (Brinde)', quantity: 1, price: 0.00 },
            ],
            shipping: { value: 0, notes: "" },
            terms: "1. Garantia de 90 dias apenas sobre as peças trocadas.\n2. Não garantimos contra danos por água ou novas quedas.\n3. Aparelhos não retirados em 90 dias serão vendidos para cobrir custos (Lei 1.234).\n4. Backup de dados é responsabilidade do cliente."
        },
        articleContent: (
            <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0 mb-4 flex items-center gap-2"><Wrench size={20}/> A importância do "Defeito Relatado"</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                        Sempre anote como o aparelho chegou. "Tela trincada, mas ligando", "Não carrega", "Carcaça arranhada".
                        Isso evita que o cliente diga depois: "Ah, mas não tinha esse risco aqui antes". Proteja sua assistência técnica!
                    </p>
                </div>
            </div>
        )
    },
    {
        slug: "lembrancinhas",
        title: "Pedido de Lembrancinhas e Brindes",
        description: "Modelo para festas e eventos. Detalhe personalização, cores e prazo de entrega de lembrancinhas.",
        longDescription: "Organize seus pedidos de mimos. Especifique aroma, cor da fita, nome na tag e quantidade mínima para garantir o lucro na produção em lote.",
        keywords: ["pedido lembrancinhas personalizado", "bloco pedido brindes", "modelo encomenda festa infantil", "recibo lembrancinha"],
        rating: 4.9,
        reviewsCount: 650,
        initialValues: {
            items: [
                { id: '1', description: 'Velas Aromáticas (Pote Vidro + Tampa Cortiça) - 40g', quantity: 50, price: 12.50 },
                { id: '2', description: 'Personalização de Tags e Laços (Incluso)', quantity: 1, price: 0.00 },
                { id: '3', description: 'Taxa de Urgência (Entrega em 5 dias)', quantity: 1, price: 50.00 },
            ],
            shipping: { value: 45.00, notes: "Sedex com Seguro" },
            terms: "1. Produção inicia após aprovação do layout digital.\n2. Cores podem variar de acordo com o lote do fornecedor.\n3. Prazo de entrega conta a partir do sinal de 50%.\n4. Pedido mínimo: 20 unidades."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dicas para Produção em Escala</h3>
                <p className="text-slate-700 dark:text-slate-300">
                    Ao vender lembrancinhas, o segredo é o <strong>Pedido Mínimo</strong>. Pequenas quantidades dão o mesmo trabalho de layout que grandes, mas lucram menos.
                    Use o campo de termos para definir o lote mínimo e a antecedência necessária.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900">
                    <p className="text-amber-900 dark:text-amber-100 text-sm italic">"Importante: Deixe claro que por ser um item artesanal, pequenas variações de cor e aroma são normais e não configuram defeito."</p>
                </div>
            </div>
        )
    },
    {
        slug: "marmitas",
        title: "Pedido de Marmitas Fitness e Congelados",
        description: "Controle de pedidos de comida saudável. Monte cardápios semanais e pacotes de marmitas.",
        longDescription: "Ideal para cozinheiras e empresas de marmitex. Liste opções de carboidratos, proteínas e legumes para cada dia da semana.",
        keywords: ["pedido marmita fitness pdf", "cardapio semanal encomendas", "bloco pedido marmitex", "venda comida congelada modelo"],
        rating: 4.8,
        reviewsCount: 1560,
        initialValues: {
            items: [
                { id: '1', description: 'Combo 10 Marmitas (Proteína + Carbo + Legume)', quantity: 1, price: 180.00 },
                { id: '2', description: 'Sopa Funcional (Pote 500ml)', quantity: 5, price: 15.00 },
                { id: '3', description: 'Taxa de Entrega Local', quantity: 1, price: 10.00 },
            ],
            shipping: { value: 0, notes: "Entrega programada domingo à tarde" },
            terms: "1. Pedidos devem ser feitos até quinta-feira para entrega no domingo.\n2. Pagamento via Pix na confirmação do pedido.\n3. Embalagens próprias para microondas e freezer.\n4. Alerta: Contém glúten/lactose em alguns itens (consultar)."
        },
        articleContent: (
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Organizando o Fluxo da Cozinha</h3>
                <p className="text-slate-700 dark:text-slate-300">
                    Trabalhar com comida requer pontualidade. Use o pedido para definir a <strong>data de corte</strong> (até quando o cliente pode pedir).
                    Isso permite que você compre os ingredientes frescos na sexta e produza tudo no sábado/domingo.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-2xl border-l-4 border-green-500">
                    <h4 className="font-bold text-green-900 dark:text-green-200 mb-2 flex items-center gap-2"><CheckCircle2 size={18}/> Alerta de Alergias</h4>
                    <p className="text-green-800 dark:text-green-300 text-sm">
                        Sempre pergunte sobre restrições alimentares. Deixe um espaço no campo de observações para anotar "Sem Cebola" ou "Sem Sal", isso fideliza o cliente.
                    </p>
                </div>
            </div>
        )
    }
];
