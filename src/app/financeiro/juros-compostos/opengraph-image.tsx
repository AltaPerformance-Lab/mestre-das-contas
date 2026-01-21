import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Juros Compostos',
        subtitle: 'Simule o poder dos juros sobre juros nos seus investimentos',
        category: 'Investimentos',
        theme: 'emerald'
    });
}
