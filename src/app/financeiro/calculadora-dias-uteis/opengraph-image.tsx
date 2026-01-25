import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora de Dias Úteis',
        subtitle: 'Some ou subtraia dias úteis considerando feriados nacionais',
        category: 'Utilidade Financeira',
        theme: 'blue'
    });
}
