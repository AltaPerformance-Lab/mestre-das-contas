import OgTemplate from "@/components/og/OgTemplate";

export const runtime = 'edge';

export default async function Image() {
    return OgTemplate({
        title: 'Calculadora Salário Líquido',
        subtitle: 'Descubra quanto sobra depois do INSS e Imposto de Renda',
        category: 'Financeiro',
        theme: 'emerald'
    });
}
