import OgTemplate from "@/components/og/OgTemplate";
import { receiptCases } from "@/data/receipt-cases";

export const runtime = 'edge';

export default async function Image({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const customCase = receiptCases.find(c => c.slug === slug);

    const title = customCase ? customCase.title : 'Gerador de Recibo Online';
    const subtitle = customCase ? customCase.desc : 'Crie recibos profissionais para imprimir ou salvar em PDF';

    return OgTemplate({
        title,
        subtitle,
        category: 'Documentos',
        theme: 'slate'
    });
}
