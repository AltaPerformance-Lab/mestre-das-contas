
import { 
  Calculator, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  ShieldCheck, 
  Zap,
  Landmark,
  CheckCircle2, 
  Clock,
  Percent,
  Image as ImageIcon,
  KeyRound,
  MessageCircle,
  Receipt,
  FileText,
  Wrench,
  Home,
  CreditCard,
  BarChart3
} from "lucide-react";

export interface FeatureCardData {
  href: string;
  title: string;
  desc: string;
  icon: any; // Using any here to simplify, but ideally should be LucideIcon
  highlight?: boolean;
  theme?: "blue" | "emerald" | "rose" | "indigo" | "violet" | "slate";
}

export const laborCards: FeatureCardData[] = [
  {
    href: "/trabalhista/rescisao",
    title: "Rescisão de Contrato",
    desc: "Vai sair da empresa? Calcule o valor exato da sua rescisão, multa de 40% e férias proporcionais.",
    icon: Calculator,
    highlight: true,
    theme: "blue"
  },
  {
    href: "/trabalhista/seguro-desemprego",
    title: "Seguro Desemprego",
    desc: "Descubra a quantidade de parcelas que você tem direito e o valor exato do benefício.",
    icon: ShieldCheck,
    theme: "blue"
  },
  {
    href: "/trabalhista/decimo-terceiro",
    title: "Décimo Terceiro",
    desc: "Calcule a 1ª e 2ª parcela do seu 13º salário com os descontos legais.",
    icon: Briefcase,
    theme: "blue"
  },
  {
    href: "/trabalhista/ferias",
    title: "Cálculo de Férias",
    desc: "Planeje seu descanso. Saiba quanto vai receber líquido (com 1/3) antes de sair.",
    icon: Zap,
    theme: "blue"
  },
  {
    href: "/trabalhista/horas-extras",
    title: "Horas Extras",
    desc: "Trabalhou a mais? Veja quanto vale sua hora extra 50%, 100% ou noturna.",
    icon: TrendingUp,
    theme: "blue"
  },
  {
    href: "/trabalhista/horas-trabalhadas",
    title: "Horas Trabalhadas",
    desc: "Controle sua jornada. Calcule o total de horas trabalhadas no mês.",
    icon: Clock,
    theme: "blue"
  },
];

export const financeCards: FeatureCardData[] = [
  {
    href: "/financeiro/comparador-salario",
    title: "Comparador de Renda",
    desc: "Você é rico ou pobre? Veja sua posição na pirâmide salarial do Brasil.",
    icon: BarChart3,
    highlight: true,
    theme: "emerald"
  },
  {
    href: "/financeiro/salario-liquido",
    title: "Salário Líquido 2026",
    desc: "Tabela de INSS e IRRF atualizada. Saiba quanto realmente cai na sua conta.",
    icon: TrendingUp,
    highlight: true,
    theme: "emerald"
  },
  {
    href: "/financeiro/calculadora-mei",
    title: "Calculadora MEI 2026",
    desc: "Calcule o valor do DAS, verifique o limite anual proporcional e evite desenquadramento.",
    icon: Briefcase,
    highlight: true,
    theme: "emerald"
  },
  {
    href: "/financeiro/financiamento-veiculos",
    title: "Financiamento Veículos",
    desc: "Simule parcelas de carros e motos. Compare taxas e prazos.",
    icon: Landmark,
    theme: "emerald"
  },
  {
    href: "/financeiro/financiamento",
    title: "Financiamento (Price/SAC)",
    desc: "Simule financiamentos imobiliários e compare tabelas Price e SAC.",
    icon: Landmark,
    theme: "emerald"
  },
  {
    href: "/financeiro/juros-compostos",
    title: "Juros Compostos",
    desc: "Simule seus investimentos e veja a mágica dos juros trabalhando a seu favor.",
    icon: TrendingUp,
    theme: "emerald"
  },
  {
    href: "/financeiro/calculadora-dias-uteis",
    title: "Dias Úteis",
    desc: "Some dias a uma data ou calcule prazos excluindo feriados e fins de semana.",
    icon: Clock,
    theme: "emerald"
  },
  {
    href: "/financeiro/porcentagem",
    title: "Calculadora de Porcentagem",
    desc: "Calcule descontos, aumentos e variações percentuais de forma simples.",
    icon: Percent,
    theme: "emerald"
  },
  {
    href: "/financeiro/reajuste-aluguel",
    title: "Reajuste de Aluguel",
    desc: "Tabela oficial IGP-M e IPCA. Calcule o novo valor e negocie com proprietário.",
    icon: Home,
    theme: "emerald"
  },
  {
    href: "/financeiro/simulador-maquininha",
    title: "Simulador Maquininha",
    desc: "Descubra quanto você perde de dinheiro antecipando vendas no cartão.",
    icon: CreditCard,
    theme: "emerald"
  },
];

export const healthCards: FeatureCardData[] = [
  {
    href: "/saude/imc",
    title: "Cálculo de IMC",
    desc: "Verifique se seu Índice de Massa Corporal está na faixa ideal.",
    icon: Heart,
    theme: "rose"
  },
  {
    href: "/saude/gestacional",
    title: "Idade Gestacional",
    desc: "Acompanhe as semanas da gravidez e a Data Provável do Parto (DPP).",
    icon: Heart,
    theme: "rose"
  },
  {
    href: "/saude/calorias-diarias",
    title: "Gasto Calórico (TMB)",
    desc: "Quantas calorias você gasta por dia? Essencial para dieta.",
    icon: Zap,
    theme: "rose"
  },
  {
    href: "/saude/agua",
    title: "Ingestão de Água",
    desc: "Descubra a quantidade exata de água para seu peso corporal.",
    icon: CheckCircle2,
    theme: "rose"
  },
];

export const toolsCards: FeatureCardData[] = [
  {
    href: "/ferramentas/criador-orcamentos",
    title: "Criador de Orçamento",
    desc: "Crie orçamentos em PDF com sua logo e cálculo automático.",
    icon: Calculator,
    highlight: true,
    theme: "violet"
  },
  {
    href: "/ferramentas/editor-pdf-online",
    title: "Editor de PDF Online",
    desc: "Edite, junte, assine e faça anotações em PDFs. 100% gratuito e sem cadastro.",
    icon: FileText,
    highlight: true,
    theme: "violet"
  },
  {
    href: "/ferramentas/conversor-imagem",
    title: "Conversor de Imagem",
    desc: "Converta imagens para WebP, PNG e JPG. Comprime sem perder qualidade.",
    icon: ImageIcon,
    theme: "violet"
  },
  {
    href: "/ferramentas/gerador-de-senhas",
    title: "Gerador de Senhas",
    desc: "Crie senhas fortes e seguras para proteger suas contas online.",
    icon: KeyRound,
    theme: "violet"
  },
  {
    href: "/ferramentas/gerador-link-whatsapp",
    title: "Link WhatsApp",
    desc: "Gere links diretos para seu WhatsApp com mensagem personalizada.",
    icon: MessageCircle,
    theme: "violet"
  },
  {
    href: "/ferramentas/gerador-recibo",
    title: "Gerador de Recibo",
    desc: "Emita recibos simples e profissionais prontos para imprimir ou salvar em PDF.",
    icon: Receipt,
    theme: "violet"
  },
  {
    href: "/ferramentas/criador-pedidos",
    title: "Criador de Pedidos",
    desc: "Talão de pedido digital. Crie pedidos de venda com frete e prazo de entrega.",
    icon: Briefcase, // Note: I must make sure Briefcase is imported if I use it, or similar. In home-cards.ts Briefcase IS imported.
    theme: "violet"
  },
  {
    href: "/ferramentas/formatador-json",
    title: "Formatador JSON",
    desc: "Valide, formate e minifique arquivos JSON. Essencial para desenvolvedores.",
    icon: FileText,
    theme: "violet"
  },
  {
    href: "/ferramentas/declaracao-conteudo",
    title: "Declaração de Conteúdo",
    desc: "Gere o PDF oficial para envio de encomendas pelos Correios sem Nota Fiscal.",
    icon: FileText,
    highlight: true,
    theme: "violet"
  },
  {
    href: "/ferramentas/gerador-privacidade",
    title: "Gerador de Privacidade",
    desc: "Crie políticas de privacidade e termos de uso compatíveis com a LGPD e AdSense.",
    icon: ShieldCheck,
    theme: "violet"
  },
  {
    href: "/ferramentas/gerador-pix",
    title: "Gerador de Pix",
    desc: "Crie QR Code Pix com valor fixo e código Copia e Cola para cobranças.",
    icon: Zap,
    highlight: true,
    theme: "violet"
  },
];
