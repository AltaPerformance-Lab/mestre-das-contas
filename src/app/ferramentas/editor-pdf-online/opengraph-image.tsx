import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Editor de PDF Online',
        subtitle: 'Edite textos, assine e preencha formulários em PDF',
        category: 'Produtividade',
        theme: 'rose'
    });
}
