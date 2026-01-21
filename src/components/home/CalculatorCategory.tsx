
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeatureCardData } from "@/data/home-cards";

interface FeatureCardProps {
  data: FeatureCardData;
}

function FeatureCard({ data }: FeatureCardProps) {
  const { href, title, desc, icon: Icon, highlight = false, theme = "blue" } = data;
  
  const themeStyles = {
    blue: { border: "hover:border-blue-400", bgHighlight: "bg-blue-50/50 border-blue-200", textHighlight: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
    emerald: { border: "hover:border-emerald-400", bgHighlight: "bg-emerald-50/50 border-emerald-200", textHighlight: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
    rose: { border: "hover:border-rose-400", bgHighlight: "bg-rose-50/50 border-rose-200", textHighlight: "text-rose-700", badge: "bg-rose-100 text-rose-700" },
    indigo: { border: "hover:border-indigo-400", bgHighlight: "bg-indigo-50/50 border-indigo-200", textHighlight: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700" },
    violet: { border: "hover:border-violet-400", bgHighlight: "bg-violet-50/50 border-violet-200", textHighlight: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
    slate: { border: "hover:border-slate-400", bgHighlight: "bg-slate-50/50 border-slate-200", textHighlight: "text-slate-700", badge: "bg-slate-100 text-slate-700" },
  };

  const style = themeStyles[theme] || themeStyles.blue;

  return (
    <Link href={href} className="group h-full block">
      <div className={`h-full p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col relative overflow-hidden
        ${highlight 
          ? `${style.bgHighlight} shadow-sm` 
          : `bg-white border-slate-200 ${style.border}`
        }`}>
        
        {/* Ícone e Badge */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-110 group-hover:bg-white transition-all shadow-sm">
            <Icon size={22} className={highlight ? style.textHighlight : `text-${theme}-600`}/>
          </div>
          {highlight && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.badge}`}>
              Popular
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <h3 className={`text-lg font-bold text-slate-900 mb-2 transition-colors ${highlight ? style.textHighlight : "group-hover:text-blue-700"}`}>
            {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
            {desc}
        </p>
      </div>
    </Link>
  );
}

interface CalculatorCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  linkHref: string;
  linkColor: string;
  cards: FeatureCardData[];
  cols?: 2 | 3 | 4;
}

export default function CalculatorCategory({
  title,
  description,
  icon,
  iconBgColor,
  iconColor,
  linkHref,
  linkColor,
  cards,
  cols = 3
}: CalculatorCategoryProps) {
  
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-4">
          <div className={`p-3.5 ${iconBgColor} ${iconColor} rounded-2xl shadow-sm`}>{icon}</div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h2>
            <p className="text-slate-500 text-sm md:text-base">{description}</p>
          </div>
        </div>
        <Link href={linkHref} className={`${linkColor} font-bold text-sm hover:underline flex items-center gap-1`}>
          Ver todos <ArrowRight size={14}/>
        </Link>
      </div>
      
      <div className={`grid grid-cols-1 ${gridCols[cols]} gap-6`}>
        {cards.map((card, index) => (
          <FeatureCard key={index} data={card} />
        ))}
      </div>
    </div>
  );
}
