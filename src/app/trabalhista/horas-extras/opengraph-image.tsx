import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Horas Extras',
        subtitle: 'Valor da hora extra 50%, 100% e noturna',
        category: 'Trabalhista',
        theme: 'blue'
    });
}
