import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Cálculos Trabalhistas 2026',
        subtitle: 'Rescisão, Férias, 13º Salário e todos os seus direitos CLT',
        category: 'Hub Trabalhista',
        theme: 'blue'
    });
}
