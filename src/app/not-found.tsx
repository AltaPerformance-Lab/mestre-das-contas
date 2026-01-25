import Link from 'next/link';
import { 
  FileQuestion, Home, Briefcase, 
  Wallet, ArrowRight, Landmark, QrCode 
} from "lucide-react";

export default function NotFound() {
  
  // Lista de ferramentas atualizada com Reforma e QR Code
  const suggestedTools = [
    {
      label: "Reforma Tributária",
      description: "Simule o impacto do novo IVA no seu bolso.",
      href: "/financeiro/reforma-tributaria",
      icon: Landmark,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200"
    },
    {
      label: "Gerador de QR Code",
      description: "Crie códigos para PIX, Wi-Fi e links.",
      href: "/ferramentas/gerador-qr-code",
      icon: QrCode,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "group-hover:border-slate-200"
    },
    {
      label: "Rescisão CLT",
      description: "Foi demitido? Calcule seu acerto exato.",
      href: "/trabalhista/rescisao",
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200"
    },
    {
      label: "Salário Líquido",
      description: "Veja os descontos do seu holerite.",
      href: "/financeiro/salario-liquido",
      icon: Wallet,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "group-hover:border-indigo-200"
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decorativo Suave */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Ícone 404 Animado */}
        <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center mb-8 animate-bounce ring-1 ring-slate-100 dark:ring-slate-800">
           <FileQuestion size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5}/>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white tracking-tighter mb-2">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 mb-4">
          Ops! Cálculo não encontrado.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 max-w-lg leading-relaxed">
          A página que você procura mudou de endereço ou não existe mais. 
          Aproveite para conferir nossas ferramentas mais acessadas:
        </p>

        {/* GRID DE RECUPERAÇÃO (CARDS MODERNOS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-12 text-left">
          {suggestedTools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href}
              className={`group bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${tool.border} dark:hover:border-slate-700`}
            >
              <div className={`w-10 h-10 ${tool.bg} dark:bg-opacity-10 ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <tool.icon size={20} strokeWidth={2.5}/>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.label}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                Acessar <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform"/>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÃO HOME */}
        <Link href="/">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10 transition-all transform active:scale-95">
             <Home size={20} />
             Voltar para o Início
          </button>
        </Link>

      </div>

      <p className="absolute bottom-6 text-xs text-slate-400 dark:text-slate-600 font-medium tracking-widest uppercase">
        Mestre das Contas
      </p>
    </div>
  );
}