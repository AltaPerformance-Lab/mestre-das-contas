import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de IMC',
        subtitle: 'Índice de Massa Corporal: Classificação oficial e peso ideal',
        category: 'Saúde & Bem-estar',
        theme: 'rose'
    });
}
