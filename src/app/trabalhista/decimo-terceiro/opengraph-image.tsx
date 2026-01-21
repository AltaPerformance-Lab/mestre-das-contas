import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Simulador Décimo Terceiro',
        subtitle: 'Calcule a primeira e segunda parcela do 13º Salário',
        category: 'Trabalhista',
        theme: 'blue'
    });
}
