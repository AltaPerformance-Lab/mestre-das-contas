import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora MEI 2026',
        subtitle: 'Calcule o valor do DAS, limites de faturamento e impostos',
        category: 'Empreendedorismo',
        theme: 'emerald'
    });
}
