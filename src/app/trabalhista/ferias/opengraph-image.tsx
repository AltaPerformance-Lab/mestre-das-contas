import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Férias',
        subtitle: 'Saiba quanto você vai receber e vender das suas férias',
        category: 'Trabalhista',
        theme: 'amber'
    });
}
