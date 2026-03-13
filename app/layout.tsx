import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ToastProvider } from "@/components/Toast";
import { CartProvider } from "@/components/CartContext";
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(0.62 0.16 45)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.145 0 0)" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Artes_Ana",
  },
  openGraph: {
    title: "Artes_Ana | Jabones Medicinales Artesanales",
    description: "Jabones medicinales para humanos y mascotas. Cuidado botánico con ingredientes orgánicos.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
        <CartProvider>
          <ToastProvider>
            <Header />
            <PageTransition>
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
            </PageTransition>
            <WhatsAppButton />
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
