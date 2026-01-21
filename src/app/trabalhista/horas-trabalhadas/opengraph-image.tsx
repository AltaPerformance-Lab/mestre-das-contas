import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Horas Trabalhadas',
        subtitle: 'Some suas horas de trabalho e calcule seu banco de horas',
        category: 'Produtividade',
        theme: 'blue'
    });
}
