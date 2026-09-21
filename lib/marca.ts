// Constantes de marca en un solo lugar.
// Lección del port a fremli-variantes: cuando el nombre del cliente vive
// hardcodeado adentro del JSX de cada variante, portar cuesta reescribir todo.

export const MARCA = "Sinergia";
export const RUBRO = "Desarrollo web y sistemas a medida";

/** WhatsApp de Sinergia (instancia Evolution API) — el que ve el visitante. */
export const WA_SINERGIA = "5491170637316";
export const WA_MENSAJE = "Hola! Vi el sitio de Sinergia y quiero hablar sobre un proyecto.";

export function waLink(texto: string = WA_MENSAJE): string {
  return `https://wa.me/${WA_SINERGIA}?text=${encodeURIComponent(texto)}`;
}
