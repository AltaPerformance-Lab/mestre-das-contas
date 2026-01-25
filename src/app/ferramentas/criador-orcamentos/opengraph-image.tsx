import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Criador de Orçamentos PDF',
        subtitle: 'Gere orçamentos profissionais com logo e envie pelo WhatsApp',
        category: 'Vendas',
        theme: 'blue'
    });
}
