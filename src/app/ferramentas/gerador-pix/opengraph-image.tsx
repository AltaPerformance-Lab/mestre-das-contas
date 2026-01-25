import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de Pix Copia e Cola',
        subtitle: 'Crie QR Codes Pix com valor definido profissionalmente',
        category: 'Ferramenta Grátis',
        theme: 'emerald'
    });
}
