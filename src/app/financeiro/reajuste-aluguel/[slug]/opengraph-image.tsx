import OgTemplate from "@/components/og/OgTemplate";
import { rentPSeoCases } from "@/data/rent-pseo";

export const runtime = 'edge';

export default async function Image({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const customCase = rentPSeoCases.find(c => c.slug === slug);

    const title = customCase ? `Reajuste Aluguel: ${customCase.monthYear}` : 'Tabela de Reajuste Aluguel';
    const subtitle = customCase ? `IGP-M: ${customCase.igpm}% | IPCA: ${customCase.ipca}% (Acumulado)` : 'Confira os índices oficiais';

    return OgTemplate({
        title,
        subtitle,
        category: 'Tabela Oficial',
        theme: 'blue'
    });
}
