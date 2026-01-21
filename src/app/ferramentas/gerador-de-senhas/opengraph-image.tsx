import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de Senhas Seguras',
        subtitle: 'Crie senhas fortes e invioláveis instantaneamente',
        category: 'Segurança Digital',
        theme: 'slate'
    });
}
