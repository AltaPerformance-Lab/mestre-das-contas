import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadoras Financeiras',
        subtitle: 'Financiamentos, Investimentos, MEI e muito mais',
        category: 'Hub Financeiro',
        theme: 'emerald'
    });
}
