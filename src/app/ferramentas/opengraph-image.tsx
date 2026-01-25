import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Ferramentas Digitais Úteis',
        subtitle: 'Geradores de PDF, Pix, QR Code e Utilitários para o dia a dia',
        category: 'Ferramentas Grátis',
        theme: 'purple'
    });
}
