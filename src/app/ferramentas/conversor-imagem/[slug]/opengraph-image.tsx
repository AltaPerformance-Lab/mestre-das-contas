import OgTemplate from "@/components/og/OgTemplate";
import { conversionData } from "@/data/image-conversions";

export const runtime = 'edge';

export default async function Image({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const customCase = conversionData.find(c => c.slug === slug);

    const title = customCase ? customCase.title : 'Conversor de Imagens Grátis';
    const subtitle = customCase ? `Converta ${customCase.from} para ${customCase.to} com máxima qualidade` : 'WebP, JPG, PNG e mais. Sem instalar nada.';

    return OgTemplate({
        title,
        subtitle,
        category: 'Editor de Imagens',
        theme: 'purple'
    });
}
