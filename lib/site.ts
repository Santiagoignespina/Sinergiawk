// Unico lugar donde se resuelve el dominio del sitio.
// Antes estaba duplicado en layout, sitemap y robots, cada uno con un
// dominio de fallback distinto (y ninguno era el real).
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://www.sinergiawk.com";
