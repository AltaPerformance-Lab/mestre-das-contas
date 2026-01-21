import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora Gestacional',
        subtitle: 'Acompanhe sua gravidez, data provável do parto e semanas',
        category: 'Saúde da Mulher',
        theme: 'rose'
    });
}
