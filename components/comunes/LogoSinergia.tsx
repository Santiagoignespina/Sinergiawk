import {
  LETRAS_ERG,
  LETRAS_IA,
  LETRAS_SIN,
  LOGO_ALTO,
  LOGO_ANCHO,
  LOGO_VIEWBOX,
  TRAZO_ABAJO,
  TRAZO_ARRIBA,
} from "./logoTrazos";

/**
 * Logo de Sinergia: el símbolo S (dos trazos con degradé) y la palabra SINERG + IA.
 * Es el logo que armó Santiago, en su versión para fondo claro (el original, para
 * fondo oscuro, tiene SINERG en blanco): acá SINERG toma el color del texto
 * (currentColor).
 *
 * Colores: el original es azul → celeste; Santiago eligió (2026-09-21) la versión
 * naranja para seguir con la paleta de siempre de la página (acento #e8442b).
 *
 * Los trazos se definen UNA vez en <LogoDefs /> y cada logo los reusa con <use>:
 * el menú, el pie y la intro no repiten los paths en el HTML. <LogoDefs /> tiene
 * que estar montado en la página antes que cualquier logo.
 */

/** Degradé del símbolo, de abajo a la izquierda a arriba a la derecha. */
const DEGRADE = ["#e8442b", "#ff8f3a"] as const;
/** El "IA": el naranja claro del degradé. */
const COLOR_IA = "#ff7a2e";

export const ID = {
  degrade: "sinergia-degrade",
  trazoArriba: "sinergia-trazo-arriba",
  trazoAbajo: "sinergia-trazo-abajo",
  sin: "sinergia-sin",
  erg: "sinergia-erg",
  ia: "sinergia-ia",
} as const;

export function LogoDefs() {
  // No va con display:none: en Chrome un degradé definido dentro de un SVG oculto no pinta.
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={ID.degrade} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={DEGRADE[0]} />
          <stop offset="1" stopColor={DEGRADE[1]} />
        </linearGradient>
        <path id={ID.trazoArriba} d={TRAZO_ARRIBA} fill={`url(#${ID.degrade})`} />
        <path id={ID.trazoAbajo} d={TRAZO_ABAJO} fill={`url(#${ID.degrade})`} />
        <path id={ID.sin} d={LETRAS_SIN} fillRule="evenodd" />
        <path id={ID.erg} d={LETRAS_ERG} fillRule="evenodd" />
        <path id={ID.ia} d={LETRAS_IA} fillRule="evenodd" fill={COLOR_IA} />
      </defs>
    </svg>
  );
}

/**
 * La frase del logo, como texto real (Jost) estirado al ancho de la palabra, en
 * las coordenadas del logo: va adentro del <svg> de un logo. La usan el logo del
 * menú y la intro, así los dos quedan iguales y la intro aterriza exacto.
 */
export function FraseLogo({ className = "" }: { className?: string }) {
  return (
    <text className={`logo-sinergia__frase ${className}`} x="337" y="267" textLength="1039" lengthAdjust="spacing">
      {"DESARROLLO "}
      <tspan fill={COLOR_IA}>•</tspan>
      {" SISTEMAS "}
      <tspan fill={COLOR_IA}>•</tspan>
      {" AUTOMATIZACIÓN"}
    </text>
  );
}

export default function LogoSinergia({
  alto = 32,
  frase = false,
  className = "",
}: {
  alto?: number;
  /** Con la frase "DESARROLLO • SISTEMAS • AUTOMATIZACIÓN" debajo de la palabra. */
  frase?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`logo-sinergia ${className}`}
      viewBox={LOGO_VIEWBOX}
      width={Math.round((alto * LOGO_ANCHO) / LOGO_ALTO)}
      height={alto}
      role="img"
      aria-label={frase ? "Sinergia: desarrollo, sistemas, automatización" : "Sinergia"}
    >
      <use href={`#${ID.trazoArriba}`} />
      <use href={`#${ID.trazoAbajo}`} />
      <use href={`#${ID.sin}`} fill="currentColor" />
      <use href={`#${ID.erg}`} fill="currentColor" />
      <use href={`#${ID.ia}`} />
      {frase && <FraseLogo />}
    </svg>
  );
}
