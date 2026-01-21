import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Financiamento de Veículos',
        subtitle: 'Compare taxas, CET e valor final da parcela do seu carro',
        category: 'Financeiro',
        theme: 'rose'
    });
}
