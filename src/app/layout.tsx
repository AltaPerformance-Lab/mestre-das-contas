import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// --- Componentes de "Compliance" ---
import CookieConsent from "@/components/layout/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import PerformanceOptimizer from "@/components/analytics/PerformanceOptimizer";
import WebVitals from "@/components/analytics/WebVitals";

// --- Componentes de Layout ---
import Sidebar from "@/components/layout/Sidebar";
import HeaderMobile from "@/components/layout/HeaderMobile"; 
import HeaderDesktop from "@/components/layout/HeaderDesktop"; 
import dynamic from "next/dynamic";
import PageTransition from "@/components/layout/PageTransition";
import { ToastProvider } from "@/components/ui/toaster"; 
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import InstallPrompt from "@/components/pwa/InstallPrompt";

// Lazy load do Footer (não é crítico para above-the-fold)
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  loading: () => <div className="h-64 bg-slate-100 dark:bg-slate-900 animate-pulse" />,
  ssr: true
});

// Lazy load do RightSidebar (não é crítico inicial)
const RightSidebar = dynamic(() => import("@/components/layout/RightSidebar"), {
  loading: () => <div className="h-screen bg-slate-50 dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800" />,
  ssr: true 
});

// --- SEO ---
import PreloadLinks from "@/components/seo/PreloadLinks";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
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
    default: "Mestre das Contas | Calculadoras e Ferramentas Online Grátis",
  },
  description: "Sua central de ferramentas online gratuitas. Calculadoras financeiras, trabalhistas, saúde e utilitários digitais atualizados para 2026.",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
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
    title: "Mestre das Contas | Calculadoras e Ferramentas Online Grátis",
    description: "Centenas de calculadoras e ferramentas gratuitas. Cálculos exatos de Rescisão, Férias, Salário e muito mais.",
    locale: "pt_BR",
    type: "website",
    url: "https://mestredascontas.com.br",
    images: [
      { 
        url: "/opengraph-image", 
        width: 1200, 
        height: 630, 
        alt: "Mestre das Contas - Ferramentas Online", 
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mestre das Contas | Ferramentas Gratuitas",
    description: "Sua central de ferramentas online gratuitas para o dia a dia.",
    images: ["/opengraph-image"],
  },
  appleWebApp: {
    capable: true,
    title: "Mestre das Contas",
    statusBarStyle: "default",
  },
  other: {
    ...(process.env.NEXT_PUBLIC_ADSENSE_ID ? { "google-adsense-account": `ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}` } : {}),
    "facebook-domain-verification": "seuvinculoaqui", // Opcional para anúncios no FB
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <PreloadLinks />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-indigo-500 selection:text-white min-h-screen flex flex-col overflow-x-hidden scroll-smooth">
        
        {/* PROVIDER DE TEMA (DARK MODE) */}
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

          {/* --- 1. ANALYTICS --- */}
          <GoogleAnalytics />
          <WebVitals />

          <ToastProvider>
            
            <div className="xl:hidden print:hidden">
              <HeaderMobile />
            </div>

            {/* GRID LAYOUT FIXO */}
            <div className="pt-16 xl:pt-0 mx-auto w-full max-w-[1400px] min-h-screen xl:grid xl:grid-cols-[240px_1fr_310px] gap-6 shadow-xl shadow-slate-200/40 dark:shadow-none bg-slate-50 dark:bg-slate-950 items-start xl:my-6 xl:rounded-2xl ring-1 ring-slate-900/5 dark:ring-slate-800 print:shadow-none print:bg-white print:ring-0 print:block print:my-0 print:pt-0">
              
              {/* ESQUERDA (STICKY MENU) */}
              <aside className="hidden xl:block border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 sticky top-0 h-screen max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-800 print:hidden">
                <Sidebar />
              </aside>

              {/* CENTRO (CONTEÚDO) */}
              <div className="flex flex-col min-w-0 bg-white dark:bg-slate-900 min-h-screen rounded-tl-2xl rounded-tr-2xl xl:rounded-none print:min-h-0 print:border-none">
                <div className="hidden xl:block sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 h-20 print:hidden">
                  <HeaderDesktop />
                </div>

                <main className="flex-1 w-full flex flex-col relative p-0 print:w-full print:absolute print:top-0 print:left-0">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
              </div>

              {/* DIREITA (ADS) */}
              <aside className="hidden xl:block border-l border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-20 h-full min-h-screen rounded-br-2xl print:hidden transition-colors duration-300">
                <RightSidebar />
              </aside>

            </div>

            {/* FOOTER (FULL SCREEN WIDTH) */}
            <div className="w-full border-t border-slate-200 dark:border-slate-800 print:hidden bg-white dark:bg-slate-950">
              <Footer />
            </div>

          </ToastProvider>

          {/* --- 2. OTIMIZADOR DE PERFORMANCE (ADS LAZY) --- */}
          <PerformanceOptimizer />

          {/* --- 3. SERVICE WORKER (Otimizado: lazyOnload) --- */}
          <Script id="register-sw" strategy="lazyOnload">
            {`
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    // SW Registered
                  }).catch(function(err) {
                    console.error('SW error:', err);
                  });
                });
              }
            `}
          </Script>
          
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