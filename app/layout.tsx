import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Sinergia — Automatizaciones",
  description: "Automatizaciones inteligentes y sistemas a medida para empresas. n8n, IA, dashboards interactivos.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Logo decorativo fijo que acompaña todo el scroll */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <Image src="/logo.png" alt="" width={700} height={700} className="object-contain opacity-10" priority />
        </div>
        <div className="relative z-10 flex flex-col min-h-full">{children}</div>
      </body>
    </html>
  );
}
