import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

// Componentes
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import HeaderMobile from "@/components/layout/HeaderMobile"; 
import HeaderDesktop from "@/components/layout/HeaderDesktop"; 
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

// Importe o Provider que criamos (Verifique se salvou como 'toast-context' ou 'toaster')
import { ToastProvider } from "@/components/ui/toaster"; 

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// --- METADATA GLOBAL ---
export const metadata: Metadata = {
  metadataBase: new URL("https://mestredascontas.com.br"),
  title: {
    template: "%s | Mestre das Contas",
    default: "Mestre das Contas - Calculadoras Financeiras e Trabalhistas",
  },
  description: "Simplifique sua vida financeira. Calculadoras gratuitas, precisas e atualizadas para 2026.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-slate-100 text-slate-900 antialiased selection:bg-blue-600 selection:text-white`}>
        
        {/* O PROVIDER ABRAÇA TUDO AGORA */}
        <ToastProvider>
          
          {/* HEADER MOBILE */}
          <div className="xl:hidden sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
             <HeaderMobile />
          </div>

          {/* WRAPPER GERAL */}
          <div className="mx-auto max-w-[1440px] min-h-screen bg-slate-50 shadow-2xl shadow-slate-200/50 xl:grid xl:grid-cols-[240px_1fr_300px]">
            
            {/* COLUNA 1: SIDEBAR */}
            <aside className="hidden xl:block border-r border-slate-200 bg-white relative z-20">
              <div className="sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                 <Sidebar />
              </div>
            </aside>

            {/* COLUNA 2: CONTEÚDO */}
            <div className="flex flex-col min-w-0 bg-white xl:bg-slate-50/50">
              <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
                 <HeaderDesktop />
              </div>

              <main className="flex-1 w-full flex flex-col relative">
                <PageTransition>
                   {/* AQUI ESTÁ O ÚNICO CHILDREN - CORRETO */}
                   {children}
                </PageTransition>
              </main>
              
              <Footer />
            </div>

            {/* COLUNA 3: ADS */}
            <aside className="hidden xl:block border-l border-slate-200 bg-white relative z-20">
              <div className="sticky top-0 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                 <RightSidebar />
              </div>
            </aside>

          </div>

        </ToastProvider>
      </body>
      
      {/* Analytics & Ads */}
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