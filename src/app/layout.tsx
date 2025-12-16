import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar"; // Vamos garantir que esse componente exista abaixo
import HeaderMobile from "@/components/layout/HeaderMobile"; // Header só para mobile
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster"; // Para avisos/toasts se usar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mestre das Contas",
    default: "Mestre das Contas - Calculadoras Financeiras e Trabalhistas",
  },
  description: "Simplifique sua vida financeira. Calculadoras gratuitas de Rescisão, Férias, Décimo Terceiro, Juros Compostos e muito mais.",
  metadataBase: new URL("https://mestredascontas.com.br"),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        
        {/* WRAPPER GERAL - Centraliza em telas ultra-wide */}
        <div className="mx-auto max-w-[1600px] min-h-screen bg-slate-50 shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row">
          
          {/* --- SIDEBAR (Desktop) --- */}
          {/* Fixamos em 260px. Flex-none impede que ela encolha ou estique. */}
          <aside className="hidden lg:block w-[260px] flex-none border-r border-slate-200 bg-white min-h-screen sticky top-0 h-screen overflow-y-auto z-20">
            <Sidebar />
          </aside>

          {/* --- CONTEÚDO PRINCIPAL --- */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Header Mobile (Só aparece em telas pequenas) */}
            <div className="lg:hidden sticky top-0 z-50">
               <HeaderMobile />
            </div>

            {/* MAIN - Onde as páginas são renderizadas */}
            {/* Removemos paddings globais (p-4/p-8) para evitar o "aperto" */}
            <main className="flex-1 w-full">
              {children}
            </main>

            {/* Footer Global */}
            <Footer />
            
          </div>
        </div>
        
        <Toaster />
      </body>
    </html>
  );
}