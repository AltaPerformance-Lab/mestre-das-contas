import OgTemplate from "@/components/og/OgTemplate";
import { cardMachineCases } from "@/data/card-machine-pseo";

export const runtime = 'edge';

export default async function Image({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const customCase = cardMachineCases.find(c => c.slug === slug);

    const title = customCase ? customCase.title : 'Simulador de Maquininha';
    const subtitle = customCase ? `Análise completa: ${customCase.name}` : 'Compare as melhores taxas do mercado';
    const brandColor = customCase ? customCase.brandColor : 'emerald';
    
    // Mapeamento seguro de cores para o tema do OG (tipos suportados: blue, emerald, purple, rose, slate, amber)
    let theme: 'blue' | 'emerald' | 'purple' | 'rose' | 'slate' | 'amber' = 'emerald';
    
    if (['blue', 'cyan', 'indigo', 'sky'].includes(brandColor)) theme = 'blue';
    else if (['green', 'emerald', 'teal'].includes(brandColor)) theme = 'emerald';
    else if (['purple', 'violet', 'fuchsia'].includes(brandColor)) theme = 'purple';
    else if (['red', 'rose'].includes(brandColor)) theme = 'rose';
    else if (['yellow', 'orange', 'amber'].includes(brandColor)) theme = 'amber';
    else theme = 'slate';

    return OgTemplate({
        title: title.length > 50 ? customCase?.name || title : title, // Usa nome curto se titulo for longo
        subtitle,
        category: 'Simulador de Taxas',
        theme
    });
}
