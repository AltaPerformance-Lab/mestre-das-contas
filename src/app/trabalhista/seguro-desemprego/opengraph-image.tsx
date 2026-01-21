import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Seguro Desemprego 2026',
        subtitle: 'Quem tem direito, valor das parcelas e prazos',
        category: 'Benefícios',
        theme: 'emerald'
    });
}
