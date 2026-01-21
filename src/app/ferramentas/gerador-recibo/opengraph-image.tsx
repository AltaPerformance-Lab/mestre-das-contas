import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de Recibo Online',
        subtitle: 'Emita recibos profissionais prontos para imprimir',
        category: 'Documentos',
        theme: 'slate'
    });
}
