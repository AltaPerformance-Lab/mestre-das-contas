import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Ingestão de Água',
        subtitle: 'Descubra a quantidade ideal de água para seu corpo',
        category: 'Saúde & Bem-estar',
        theme: 'blue'
    });
}
