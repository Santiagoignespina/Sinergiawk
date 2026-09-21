// Medidas compartidas entre server y client components.
// Viven en un módulo SIN "use client": si se exportan desde uno que lo tiene,
// al importarlas desde un server component Next deja solo las referencias de
// componente y la constante llega undefined.

/** Caja para la que están calibradas las 15 demos (fontSize absolutos adentro). */
export const LIENZO_ANCHO = 380;
export const LIENZO_ALTO = 210;
