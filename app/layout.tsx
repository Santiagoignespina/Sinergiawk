import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Santiago Ignespina — Desarrollo web y sistemas a medida",
    template: "%s | Santiago Ignespina",
  },
  description:
    "Diseño y programo landing pages, e-commerce y sistemas a medida para negocios y emprendedores. Sitios rápidos, atractivos y pensados para vender.",
  keywords: [
    "desarrollo web",
    "landing page",
    "diseño web a medida",
    "programador web Argentina",
    "páginas web para negocios",
    "e-commerce a medida",
    "sistemas web",
    "dashboards a medida",
  ],
  authors: [{ name: "Santiago Ignespina" }],
  verification: { google: "NSBATzx6nBeIDW7FrmsvpiQGZ5ffjQ7xl4IlUG6e8hI" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "Santiago Ignespina",
    title: "Santiago Ignespina — Desarrollo web y sistemas a medida",
    description:
      "Landing pages, e-commerce y sistemas a medida para negocios. Sitios rápidos, atractivos y pensados para vender.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Santiago Ignespina — Desarrollo web a medida",
    description:
      "Landing pages, e-commerce y sistemas a medida que hacen crecer tu negocio.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Santiago Ignespina — Desarrollo Web",
  description:
    "Desarrollo de landing pages, e-commerce y sistemas a medida para negocios y emprendedores.",
  url: siteUrl,
  areaServed: "AR",
  knowsAbout: [
    "Desarrollo web a medida",
    "Landing pages",
    "E-commerce",
    "Sistemas y dashboards",
    "Automatizaciones",
  ],
  offers: {
    "@type": "Offer",
    description: "Landing pages, e-commerce, sistemas y dashboards a medida",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
