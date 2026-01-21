import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Simulador de Financiamento',
        subtitle: 'Casa própria: SAC ou Price? Simule e economize',
        category: 'Financeiro',
        theme: 'rose'
    });
}
