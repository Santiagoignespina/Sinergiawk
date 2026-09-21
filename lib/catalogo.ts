// Selectores derivados sobre data/projects.ts.
// Esta lógica estaba copiada en Landings.tsx, Sistemas.tsx y Galeria.tsx.
// Acá vive una sola vez y la consumen las tres variantes.

import { projects, industryLabels, type Project, type Industry } from "@/data/projects";

const esVercel = (url?: string) => !!url && url.includes("vercel.app");

/** Las más nuevas van adelante: son las que mejor muestran el trabajo actual. */
export const DESTACADAS = [
  "alpie",
  "asppe",
  "fremli",
  "dra-mercedes-bustamante",
  "rcr-soluciones",
];

/** Orden manual de los sistemas. */
const ORDEN_SISTEMAS = [
  "mrbracket",
  "mga-flex",
  "turnero",
  "stock",
  "mrbracket-crm",
  "santos-alquileres",
  "crm-viajes",
];

/** Destacadas primero, después el resto con dominio propio, al final .vercel.app */
function rango(p: Project): number {
  const i = DESTACADAS.indexOf(p.id);
  if (i !== -1) return i;
  return DESTACADAS.length + (esVercel(p.liveUrl) ? 1 : 0);
}

export const landings = projects
  .filter((p) => p.serviceId === "web" && p.previewImage)
  .sort((a, b) => rango(a) - rango(b));

export const sistemas = projects
  .filter((p) => p.serviceId === "sistemas")
  .sort((a, b) => ORDEN_SISTEMAS.indexOf(a.id) - ORDEN_SISTEMAS.indexOf(b.id));

export const automatizaciones = projects.filter(
  (p) => p.serviceId === "automatizaciones"
);

/** Todo junto, en el orden en que conviene mostrarlo. */
export const todos = [...landings, ...sistemas, ...automatizaciones];

/** Los rubros que realmente aparecen, en orden de cantidad. */
export const rubros: { id: Industry; label: string; cantidad: number }[] =
  Object.entries(industryLabels)
    .map(([id, label]) => ({
      id: id as Industry,
      label,
      cantidad: projects.filter((p) => p.industry === id).length,
    }))
    .filter((r) => r.cantidad > 0)
    .sort((a, b) => b.cantidad - a.cantidad);

export function porRubro(lista: Project[], rubro: Industry | "todos"): Project[] {
  return rubro === "todos" ? lista : lista.filter((p) => p.industry === rubro);
}

/** Los números del hero salen de los datos, no se escriben a mano. */
export const conteos = {
  proyectos: projects.length,
  enVivo: projects.filter((p) => p.liveUrl).length,
  rubros: new Set(projects.map((p) => p.industry)).size,
  conDemo: projects.filter((p) => p.demo).length,
};

export { industryLabels };
export type { Project, Industry };
