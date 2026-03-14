import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/Toast";
import { CartProvider } from "@/components/CartContext";
import { FavoritesProvider } from "@/components/FavoritesContext";
import { ComparisonProvider } from "@/components/ComparisonContext";
import { ComparisonSidebar } from "@/components/ComparisonSidebar";
import { BottomNav } from "@/components/BottomNav";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Artes_Ana | Jabones Medicinales para Ti y tu Mascota",
  description: "Jabones medicinales 100% artesanales. Línea Pet Care segura para mascotas y productos faciales/terapéuticos humanos. Ingredientes orgánicos, 0% químicos tóxicos.",
  keywords: ["jabones artesanales", "jabones para mascotas", "pet care", "jabones medicinales", "jabon avena manzanilla", "jabon carbon activado", "productos naturales", "dermatitis perros"],
  authors: [{ name: "Artes_Ana" }],
  metadataBase: new URL('https://artes-ana.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Artes_Ana | Jabones Medicinales Artesanales",
    description: "Jabones medicinales para humanos y mascotas. Cuidado botánico con ingredientes orgánicos.",
    type: "website",
    locale: "es_ES",
    siteName: "Artes_Ana",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Artes_Ana",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Artes_Ana',
    'application-name': 'Artes_Ana',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEFDF8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Artes_Ana" />
        <meta name="theme-color" content="#C8765F" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased font-sans`}
      >
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <ScrollProgress />
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-terracotta focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          Saltar al contenido principal
        </a>
        <FavoritesProvider>
          <CartProvider>
            <ComparisonProvider>
              <ToastProvider>
                <Header />
                <PageTransition>
                  <main id="main-content" tabIndex={-1}>
                    {children}
                  </main>
                </PageTransition>
                <WhatsAppButton />
                <Footer />
                <ComparisonSidebar />
                <BottomNav />
                <PWAInstallPrompt />
              </ToastProvider>
            </ComparisonProvider>
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
