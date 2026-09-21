"use client";

import { buscarDemo } from "./demoRegistry";
import { LIENZO_ANCHO, LIENZO_ALTO } from "./medidas";

/**
 * Escenario para las demos interactivas.
 *
 * Las 15 demos tienen los tamaños de letra hardcodeados en absoluto
 * (fontSize: 9 en la raíz, 6.5-10px en los hijos) y están calibradas para cajas
 * de ~380x210. Darles un contenedor más grande NO las agranda: las estira con
 * letra de 7px. Por eso se renderizan siempre en la caja canónica y se escalan
 * con transform, que sí agranda todo proporcionalmente.
 *
 * El lienzo además corta la herencia tipográfica: sin eso, el uppercase y el
 * letter-spacing del display de una variante se filtran adentro de la demo y la
 * rompen. Las demos usan clases de Tailwind e inline styles, así que cualquier
 * propiedad heredable del contenedor les llega.
 *
 * El transform no rompe el hit-testing: las demos siguen siendo interactivas
 * escaladas.
 */

export { LIENZO_ANCHO, LIENZO_ALTO };

export default function DemoStage({ demo }: { demo?: string }) {
  const entrada = buscarDemo(demo);
  if (!entrada) return null;
  const { Componente } = entrada;

  return (
    <div className="demo-stage">
      <div className="demo-stage__lienzo">
        <Componente />
      </div>
    </div>
  );
}
