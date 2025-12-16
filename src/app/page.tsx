import type { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, 
  Briefcase, 
  HeartPulse, 
  Coins, 
  ArrowRight, 
  TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdUnit from "@/components/ads/AdUnit";

export const metadata: Metadata = {
  title: "Conta Rápida | Calculadoras Online Gratuitas e Precisas",
  description: "Portal de ferramentas para cálculos trabalhistas, financeiros e de saúde. Calcule Salário Líquido, Férias, Rescisão e muito mais em segundos.",
  keywords: ["calculadoras online", "conversor de medidas", "cálculo trabalhista", "ferramentas financeiras"],
};

export default function Home() {
  return (
    <div className="space-y-12">
      
      {/* HERO SECTION (Busca e Título) */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium border border-blue-100 mb-4">
          <TrendingUp size={16} />
          <span>Atualizado com tabelas 2025</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
          O que você precisa <br className="hidden md:block" />
          <span className="text-blue-600">calcular hoje?</span>
        </h1>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Ferramentas simples, rápidas e gratuitas para facilitar suas decisões financeiras e trabalhistas.
        </p>

        <div className="max-w-md mx-auto mt-8 relative">
          <Input 
            type="text" 
            placeholder="Ex: Salário Líquido, Férias..." 
            className="h-12 pl-4 pr-12 text-lg shadow-lg border-slate-200 focus-visible:ring-blue-500"
          />
          <Button size="icon" className="absolute right-1 top-1 h-10 w-10 bg-blue-600 hover:bg-blue-700">
            <ArrowRight size={20} />
          </Button>
        </div>
      </section>

      {/* ANÚNCIO DESTAQUE */}
      <AdUnit slot="123_home_top" format="horizontal" />

      {/* DESTAQUES (Ferramentas mais usadas) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="text-blue-600" /> Mais Populares
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1 - SALÁRIO LÍQUIDO (Já funcional) */}
          <Link href="/financeiro/salario-liquido">
            <Card className="hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer h-full group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Coins size={24} />
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">Salário Líquido 2025</CardTitle>
                <CardDescription>Descubra os descontos de INSS e IRRF do seu holerite.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* CARD 2 - RESCISÃO (Placeholder para o próximo) */}
          <Link href="/trabalhista/rescisao">
            <Card className="hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer h-full group opacity-60 hover:opacity-100">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                  <Briefcase size={24} />
                </div>
                <CardTitle>Rescisão CLT <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded ml-2">Em breve</span></CardTitle>
                <CardDescription>Calcule o valor exato do seu acerto trabalhista.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          {/* CARD 3 - IMC (Placeholder) */}
          <Link href="/saude/imc">
            <Card className="hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer h-full group opacity-60 hover:opacity-100">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  <HeartPulse size={24} />
                </div>
                <CardTitle>Cálculo de IMC <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded ml-2">Em breve</span></CardTitle>
                <CardDescription>Verifique se o seu peso está ideal para sua altura.</CardDescription>
              </CardHeader>
            </Card>
          </Link>

        </div>
      </section>

      {/* CATEGORIAS GRID */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Explore por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Trabalhista", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50", href: "/trabalhista" },
            { name: "Financeiro", icon: Coins, color: "text-blue-600", bg: "bg-blue-50", href: "/financeiro" },
            { name: "Saúde", icon: HeartPulse, color: "text-emerald-600", bg: "bg-emerald-50", href: "/saude" },
            { name: "Matemática", icon: Calculator, color: "text-purple-600", bg: "bg-purple-50", href: "/matematica" },
          ].map((cat) => (
            <Link key={cat.name} href={cat.href} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
              <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-full flex items-center justify-center mb-3`}>
                <cat.icon size={28} />
              </div>
              <span className="font-bold text-slate-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ANÚNCIO RODAPÉ */}
      <AdUnit slot="123_home_bottom" format="auto" />

    </div>
  );
}