import {
  LETRAS_ERG,
  LETRAS_IA,
  LETRAS_SIN,
  LOGO_ALTO,
  LOGO_ANCHO,
  LOGO_CELESTE,
  LOGO_DEGRADE,
  LOGO_VIEWBOX,
  TRAZO_ABAJO,
  TRAZO_ARRIBA,
} from "./logoTrazos";

/**
 * Logo de Sinergia: el símbolo S (dos trazos con el degradé azul → celeste) y la
 * palabra SINERG + IA. Es la versión para fondo claro del logo que armó Santiago
 * (el original, para fondo oscuro, tiene SINERG en blanco): acá SINERG toma el
 * color del texto (currentColor).
 *
 * Los trazos se definen UNA vez en <LogoDefs /> y cada logo los reusa con <use>:
 * el menú, el pie y la intro no repiten los paths en el HTML. <LogoDefs /> tiene
 * que estar montado en la página antes que cualquier logo.
 */

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
          <stop offset="0" stopColor={LOGO_DEGRADE[0]} />
          <stop offset="1" stopColor={LOGO_DEGRADE[1]} />
        </linearGradient>
        <path id={ID.trazoArriba} d={TRAZO_ARRIBA} fill={`url(#${ID.degrade})`} />
        <path id={ID.trazoAbajo} d={TRAZO_ABAJO} fill={`url(#${ID.degrade})`} />
        <path id={ID.sin} d={LETRAS_SIN} fillRule="evenodd" />
        <path id={ID.erg} d={LETRAS_ERG} fillRule="evenodd" />
        <path id={ID.ia} d={LETRAS_IA} fillRule="evenodd" fill={LOGO_CELESTE} />
      </defs>
    </svg>
  );
}

export default function LogoSinergia({
  alto = 32,
  className = "",
}: {
  alto?: number;
  className?: string;
}) {
  return (
    <svg
      className={`logo-sinergia ${className}`}
      viewBox={LOGO_VIEWBOX}
      width={Math.round((alto * LOGO_ANCHO) / LOGO_ALTO)}
      height={alto}
      role="img"
      aria-label="Sinergia"
    >
      <use href={`#${ID.trazoArriba}`} />
      <use href={`#${ID.trazoAbajo}`} />
      <use href={`#${ID.sin}`} fill="currentColor" />
      <use href={`#${ID.erg}`} fill="currentColor" />
      <use href={`#${ID.ia}`} />
    </svg>
  );
}
