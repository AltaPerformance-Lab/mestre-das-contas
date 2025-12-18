import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import HeaderMobile from "@/components/layout/Header"; // Header Mobile (Só aparece < XL)
import HeaderDesktop from "@/components/layout/HeaderDesktop"; // NOVO: Header Desktop (Só aparece >= XL)
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Mestre das Contas",
    default: "Mestre das Contas - Calculadoras Financeiras e Trabalhistas",
  },
  description: "Simplifique sua vida financeira. Calculadoras gratuitas e atualizadas.",
  metadataBase: new URL("https://mestredascontas.com.br"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-slate-100 text-slate-900 antialiased`}>
        
        {/* HEADER MOBILE (Visível apenas em telas pequenas < XL) */}
        <div className="xl:hidden sticky top-0 z-50 bg-white border-b border-slate-200">
           <HeaderMobile />
        </div>

        {/* WRAPPER GERAL (GRID DE 3 COLUNAS) */}
        <div className="mx-auto max-w-7xl min-h-screen bg-slate-50 shadow-2xl shadow-slate-200/50 xl:grid xl:grid-cols-[260px_1fr_320px]">
          
          {/* --- COLUNA 1: SIDEBAR NAVEGAÇÃO (Esquerda) --- */}
          <aside className="hidden xl:block border-r border-slate-200 bg-white relative z-20">
            <div className="sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
               <Sidebar />
            </div>
          </aside>

          {/* --- COLUNA 2: CONTEÚDO PRINCIPAL (Meio) --- */}
          <div className="flex flex-col min-w-0 bg-white xl:bg-slate-50/30">
            
            {/* HEADER DESKTOP (Novo: Fixo no topo da coluna do meio) */}
            <HeaderDesktop />

            <main className="flex-1 w-full">
              {children}
            </main>
            
            <Footer />
          </div>

          {/* --- COLUNA 3: SIDEBAR PUBLICIDADE (Direita) --- */}
          <aside className="hidden xl:block border-l border-slate-200 bg-white relative z-20">
            <div className="sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
               <RightSidebar />
            </div>
          </aside>

        </div>
        
        <Toaster />
      </body>
      {process.env.NEXT_PUBLIC_ANALYTICS_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_ANALYTICS_ID} />
      )}
      {process.env.NEXT_PUBLIC_ADSENSE_ID && (
  <Script
    id="adsense-init"
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
    crossOrigin="anonymous"
    strategy="afterInteractive"
  />
)}
    </html>
  );
}