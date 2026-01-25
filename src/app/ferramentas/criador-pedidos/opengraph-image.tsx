import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Criador de Pedidos e Comandas',
        subtitle: 'Organize suas vendas. Gere pedidos para imprimir ou salvar.',
        category: 'Vendas',
        theme: 'emerald'
    });
}
