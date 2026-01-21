import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Simulador de Rescisão CLT',
        subtitle: 'Calcule seus direitos trabalhistas exatos na demissão',
        category: 'Trabalhista',
        theme: 'blue'
    });
}
