
import Link from "next/link";
import { Landmark, ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeaturedTools() {
  return (
    <section className="px-4 -mt-24 relative z-20 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* CARD 1: REFORMA TRIBUTÁRIA */}
          <div className="bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/40 border border-emerald-500/20 p-1 overflow-hidden relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-slate-900/95 backdrop-blur-xl rounded-[20px] p-6 h-full flex flex-col justify-between relative z-10">
                  <div>
                      <div className="flex items-center gap-2 mb-4">
                          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                              <Landmark size={24}/>
                          </div>
                          <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest bg-emerald-500/10 px-2 py-1 rounded">Destaque 2026</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">Reforma Tributária</h2>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6">
                          O simulador mais completo do Brasil. Descubra o impacto do <strong>IVA Dual (IBS + CBS)</strong> na sua profissão.
                      </p>
                  </div>
                  <Link href="/financeiro/reforma-tributaria">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 rounded-xl transition-all group-hover:scale-[1.02]">
                          Calcular Impacto <ArrowRight size={18} className="ml-2"/>
                      </Button>
                  </Link>
              </div>
          </div>

          {/* CARD 2: GERADOR DE QR CODE (NOVO!) */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-1 overflow-hidden relative group h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-white rounded-[20px] p-6 h-full flex flex-col justify-between relative z-10">
                  <div>
                      <div className="flex items-center gap-2 mb-4">
                          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                              <QrCode size={24}/>
                          </div>
                          <span className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest bg-indigo-50 px-2 py-1 rounded border border-indigo-100">Nova Ferramenta</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Gerador de QR Code</h2>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          Crie códigos QR para <strong>Pix, Wi-Fi e WhatsApp</strong>. Personalize cores, adicione logo e imprima em alta qualidade. Grátis e sem validade.
                      </p>
                  </div>
                  <Link href="/ferramentas/gerador-qr-code">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl transition-all group-hover:scale-[1.02]">
                          Criar QR Code Agora <QrCode size={18} className="ml-2"/>
                      </Button>
                  </Link>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}
