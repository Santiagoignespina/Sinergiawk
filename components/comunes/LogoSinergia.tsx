/**
 * Logotipo de Sinergia.
 *
 * Conserva la idea buena del logo viejo —"SINERG" + "IA" destacado, que juega
 * con la sigla— y descarta lo que no servía: la ilustración del laptop, ilegible
 * a 56px de alto, y el subtítulo "AUTOMATIZACIONES", que hoy queda corto.
 *
 * El "IA" no se destaca con color de texto sino con peso y con un BLOQUE de
 * acento detrás. La regla de la casa es un solo color de texto por fondo: el
 * acento vive en bloques, bordes y reglas, nunca en una palabra suelta.
 *
 * Es texto, no paths: así toma la tipografía de la variante que lo monta, que es
 * justo lo que queremos mientras se comparan las tres direcciones. Cuando una
 * gane se vectoriza para el favicon.
 */

export default function LogoSinergia({
  alto = 24,
  className = "",
}: {
  alto?: number;
  className?: string;
}) {
  return (
    <span
      className={`logo-sinergia ${className}`}
      style={{ fontSize: alto }}
      role="img"
      aria-label="Sinergia"
    >
      <span className="logo-sinergia__base" aria-hidden="true">
        Sinerg
      </span>
      <span className="logo-sinergia__ia" aria-hidden="true">
        ia
      </span>
    </span>
  );
}
