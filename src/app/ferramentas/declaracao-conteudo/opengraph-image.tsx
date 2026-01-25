import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Declaração de Conteúdo Correios',
        subtitle: 'Gerador pronto para imprimir. Substitui a Nota Fiscal no envio.',
        category: 'E-commerce',
        theme: 'amber'
    });
}
