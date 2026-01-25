import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Reajuste de Aluguel 2026',
        subtitle: 'Tabela oficial IGP-M e IPCA acumulada 12 meses',
        category: 'Imóveis',
        theme: 'blue'
    });
}
