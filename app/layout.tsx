import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoapArtesana | Productos Artesanales Hechos a Mano",
  description: "Descubre jabones, velas, cerámica y tejidos artesanales. Cada pieza única, elaborada con amor y ingredientes naturales.",
  keywords: ["jabones artesanales", "velas aromáticas", "cerámica artesanal", "tejidos naturales", "productos handmade"],
  authors: [{ name: "SoapArtesana" }],
  openGraph: {
    title: "SoapArtesana | Productos Artesanales",
    description: "Jabones, velas, cerámica y tejidos hechos a mano con ingredientes naturales.",
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
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
