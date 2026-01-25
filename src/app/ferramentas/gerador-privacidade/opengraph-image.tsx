import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de Política de Privacidade',
        subtitle: 'Crie documentos legais para seu site ou app conforme a LGPD',
        category: 'Legal',
        theme: 'slate'
    });
}
