import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Simulador de Taxas de Maquininha',
        subtitle: 'Compare taxas: Ton, Mercado Pago, InfinitePay e mais',
        category: 'Vendas',
        theme: 'emerald'
    });
}
