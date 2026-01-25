import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadoras de Saúde e Bem-estar',
        subtitle: 'IMC, Ingestão de Água, Calorias e mais',
        category: 'Hub Saúde',
        theme: 'rose'
    });
}
