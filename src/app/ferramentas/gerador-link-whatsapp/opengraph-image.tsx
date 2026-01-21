import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Gerador de Link WhatsApp',
        subtitle: 'Crie links diretos para seu WhatsApp sem salvar contato',
        category: 'Produtividade',
        theme: 'emerald'
    });
}
