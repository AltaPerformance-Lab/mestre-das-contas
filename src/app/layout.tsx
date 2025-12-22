import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// --- Componentes de "Compliance" ---
import CookieConsent from "@/components/layout/CookieConsent";
// Opção A: Importamos nosso componente customizado (que já usa a lib oficial por dentro)
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// --- Componentes de Layout ---
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import HeaderMobile from "@/components/layout/HeaderMobile"; 
import HeaderDesktop from "@/components/layout/HeaderDesktop"; 
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/toaster"; 

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

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
  openGraph: {
    siteName: "Mestre das Contas",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "https://mestredascontas.com.br/opengraph-image", width: 1200, height: 630, alt: "Mestre das Contas", }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="bg-slate-100 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">
        
        {/* --- 1. ANALYTICS INTELIGENTE (OPÇÃO A) --- */}
        {/* Não precisa passar ID, ele pega do .env e só ativa se tiver consentimento */}
        <GoogleAnalytics />

        <ToastProvider>
          
          <div className="xl:hidden">
             <HeaderMobile />
          </div>

          {/* GRID LAYOUT FIXO */}
          <div className="pt-16 xl:pt-0 mx-auto w-full max-w-[1400px] min-h-screen xl:grid xl:grid-cols-[240px_1fr_310px] gap-6 shadow-xl shadow-slate-200/40 bg-slate-50 items-start xl:my-6 xl:rounded-2xl ring-1 ring-slate-900/5">
            
            {/* ESQUERDA (STICKY MENU) */}
            <aside className="hidden xl:block border-r border-slate-100 bg-white z-20 sticky top-0 h-screen max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100">
               <Sidebar />
            </aside>

            {/* CENTRO (CONTEÚDO) */}
            <div className="flex flex-col min-w-0 bg-white min-h-screen rounded-tl-2xl rounded-tr-2xl xl:rounded-none">
              <div className="hidden xl:block sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 h-20">
                 <HeaderDesktop />
              </div>

              <main className="flex-1 w-full flex flex-col relative p-0">
                <PageTransition>
                   {children}
                </PageTransition>
              </main>
              
              <Footer />
            </div>

            {/* DIREITA (ADS) */}
            <aside className="hidden xl:block border-l border-slate-100 bg-white z-20 h-full min-h-screen rounded-br-2xl">
               <RightSidebar />
            </aside>

          </div>

        </ToastProvider>

        {/* --- 2. SCRIPT ADSENSE --- */}
        {/* Nota: Mudei para 'afterInteractive' para garantir que os ads carreguem. 'lazyOnload' pode diminuir a receita. */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            id="adsense-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload" 
          />
        )}
        
        {/* --- 3. BANNER DE COOKIES --- */}
        <CookieConsent />
      </body>
    </html>
  );
}