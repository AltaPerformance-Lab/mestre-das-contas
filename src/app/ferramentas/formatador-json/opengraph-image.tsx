import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Formatador JSON Online',
        subtitle: 'Valide, formate e visualize JSON de forma bonita e legível',
        category: 'Dev Tools',
        theme: 'slate'
    });
}
