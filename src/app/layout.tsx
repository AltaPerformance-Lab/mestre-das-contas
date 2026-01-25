import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// --- Componentes de "Compliance" ---
import CookieConsent from "@/components/layout/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

// --- Componentes de Layout ---
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import HeaderMobile from "@/components/layout/HeaderMobile"; 
import HeaderDesktop from "@/components/layout/HeaderDesktop"; 
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/toaster"; 
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import InstallPrompt from "@/components/pwa/InstallPrompt";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit',
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
  // PWA Manifest Link
  manifest: "/manifest.json",
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
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300 scroll-smooth">
        
        {/* PROVIDER DE TEMA (DARK MODE) */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

          {/* --- 1. ANALYTICS --- */}
          <GoogleAnalytics />

          <ToastProvider>
            
            <div className="xl:hidden print:hidden">
              <HeaderMobile />
            </div>

            {/* GRID LAYOUT FIXO */}
            <div className="pt-16 xl:pt-0 mx-auto w-full max-w-[1400px] min-h-screen xl:grid xl:grid-cols-[240px_1fr_310px] gap-6 shadow-xl shadow-slate-200/40 dark:shadow-none bg-slate-50 dark:bg-slate-950 items-start xl:my-6 xl:rounded-2xl ring-1 ring-slate-900/5 dark:ring-slate-800 print:shadow-none print:bg-white print:ring-0 print:block print:my-0 print:pt-0 transition-colors duration-300">
              
              {/* ESQUERDA (STICKY MENU) */}
              <aside className="hidden xl:block border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 sticky top-0 h-screen max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-800 print:hidden transition-colors duration-300">
                <Sidebar />
              </aside>

              {/* CENTRO (CONTEÚDO) */}
              <div className="flex flex-col min-w-0 bg-white dark:bg-slate-900 min-h-screen rounded-tl-2xl rounded-tr-2xl xl:rounded-none print:min-h-0 print:border-none transition-colors duration-300">
                <div className="hidden xl:block sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 h-20 print:hidden transition-colors duration-300">
                  <HeaderDesktop />
                </div>

                <main className="flex-1 w-full flex flex-col relative p-0 print:w-full print:absolute print:top-0 print:left-0">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
                
                <div className="print:hidden">
                  <Footer />
                </div>
              </div>

              {/* DIREITA (ADS) */}
              <aside className="hidden xl:block border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 h-full min-h-screen rounded-br-2xl print:hidden transition-colors duration-300">
                <RightSidebar />
              </aside>

            </div>

          </ToastProvider>

          {/* --- 2. SCRIPT ADSENSE --- */}
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
          <div className="print:hidden">
            <InstallPrompt />
            <CookieConsent />
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}