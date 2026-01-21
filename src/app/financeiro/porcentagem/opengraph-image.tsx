import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Porcentagem',
        subtitle: 'Cálculos rápidos de descontos, aumentos e variações',
        category: 'Matemática Financeira',
        theme: 'purple'
    });
}
