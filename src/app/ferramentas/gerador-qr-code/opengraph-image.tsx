import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de QR Code',
        subtitle: 'Crie códigos QR personalizados para WiFi, Links e Pix',
        category: 'Ferramentas Úteis',
        theme: 'blue'
    });
}
