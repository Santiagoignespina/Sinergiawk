"use client";

import type { ReactNode } from "react";
import { buscarDemo, type Tono } from "./demoRegistry";

/**
 * Marco para las demos.
 *
 * Las 15 demos traen su propia paleta: 8 oscuras (#0c0c14, las de n8n), 5 claras
 * y 2 de color saturado. Quince paletas ajenas no se funden con ningún fondo, así
 * que no se intenta: se las presenta como PANTALLAS.
 *
 * El paspartú separa la demo del fondo de la variante con un tono que contrasta
 * contra la demo, no contra la página. La barra superior lleva el nombre en la
 * tipografía de la variante, y eso es lo que ata la demo al diseño.
 *
 * La variante controla la forma con variables: --marco-radio, --marco-linea,
 * --marco-borde, --marco-barra-bg, --marco-barra-tinta.
 */

export default function DemoFrame({
  titulo,
  demo,
  tono,
  puntos = true,
  children,
}: {
  titulo: string;
  demo?: string;
  tono?: Tono;
  puntos?: boolean;
  children: ReactNode;
}) {
  const tonoFinal: Tono = tono ?? buscarDemo(demo)?.tono ?? "claro";

  return (
    <figure className="demo-marco" data-tono={tonoFinal}>
      <figcaption className="demo-marco__barra">
        {puntos && (
          <span className="demo-marco__puntos" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        )}
        <span className="demo-marco__titulo">{titulo}</span>
      </figcaption>
      <div className="demo-marco__paspartu">{children}</div>
    </figure>
  );
}
