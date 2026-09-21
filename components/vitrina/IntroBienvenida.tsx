"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Intro de bienvenida de Vitrina: el logo se arma de a partes. Cae "Sin", después
 * cae "erg", y el bloque rojo del "ia" entra desde la izquierda de la pantalla,
 * pasa por arriba de las letras y cae en su lugar. Con la palabra armada, el logo
 * vuela a acomodarse en el nav y se destapa la página.
 *
 * Una vez por sesión: recargar no la repite, una pestaña nueva sí. Se saltea con
 * un clic, un toque o una tecla, y no corre con prefers-reduced-motion.
 */

const CLAVE = "sinergia-intro-vista";

// Corre mientras el navegador lee el HTML, antes de pintar: si la intro ya se vio
// en esta sesión la esconde sin esperar a React (si no, cada recarga mostraría un
// instante de pantalla vacía). Va como HTML crudo para que React no lo maneje como
// un <script> propio: cuando el componente se monta en el cliente no se ejecuta, y
// ahí lo resuelve el efecto.
const ANTES_DE_PINTAR = `<script>try{if(sessionStorage.getItem("${CLAVE}")==="1"){var e=document.createElement("style");e.textContent=".v-vitrina .intro{display:none}";document.head.appendChild(e)}}catch(_){}</script>`;

// Momentos (ms desde que arranca).
const T_SIN = 250;
const T_ERG = 800;
const T_IA = 1350;
const T_VUELO = 2600;

export default function IntroBienvenida() {
  const raizRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    let vista = false;
    try {
      vista = sessionStorage.getItem(CLAVE) === "1";
    } catch {
      /* sin storage la intro corre en cada carga */
    }
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Si el JS tardó más que la red de seguridad del CSS, la intro ya se fue: no se
    // vuelve a poner encima de la página.
    const tarde = getComputedStyle(raiz).visibility === "hidden";
    if (vista || reducido || tarde) {
      raiz.style.display = "none";
      return;
    }

    const pieza = (sel: string) => raiz.querySelector(sel) as HTMLElement;
    const logo = pieza(".intro__logo");
    const sin = pieza(".intro__sin");
    const erg = pieza(".intro__erg");
    const iaX = pieza(".intro__ia-x");
    const iaY = pieza(".intro__ia-y");
    const fondo = pieza(".intro__fondo");
    const pista = pieza(".intro__pista");
    const navLogo = document.querySelector<HTMLElement>(".v-vitrina .nav__marca .logo-sinergia");
    const html = document.documentElement;
    const overflowAntes = html.style.overflow;

    raiz.style.animation = "none"; // apaga la red de seguridad: de acá en más manda el JS
    html.style.overflow = "hidden";
    if (navLogo) navLogo.style.visibility = "hidden";

    const timers: number[] = [];
    const luego = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let saliendo = false;

    const terminar = () => {
      timers.forEach(clearTimeout);
      try {
        sessionStorage.setItem(CLAVE, "1");
      } catch {
        /* sin storage se repite en la próxima carga */
      }
      raiz.style.display = "none";
      html.style.overflow = overflowAntes;
      if (navLogo) navLogo.style.visibility = "";
    };

    const saltear = () => {
      if (saliendo) return;
      saliendo = true;
      timers.forEach(clearTimeout);
      if (navLogo) navLogo.style.visibility = "";
      raiz.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" }).finished.then(terminar, () => {});
    };

    const F = parseFloat(getComputedStyle(logo).fontSize);

    // Cae desde arriba de la pantalla, se aplasta un poco al tocar y se acomoda.
    const caer = (el: HTMLElement, demora: number) =>
      el.animate(
        [
          {
            transform: `translateY(${-(el.getBoundingClientRect().bottom + 20)}px) scale(1, 1)`,
            opacity: 1,
            easing: "cubic-bezier(.55, 0, .9, .45)",
          },
          { transform: "translateY(0px) scale(1, 1)", offset: 0.62, easing: "ease-out" },
          { transform: "translateY(0px) scale(1.07, .86)", offset: 0.76, easing: "ease-out" },
          { transform: `translateY(${-F * 0.05}px) scale(.98, 1.03)`, offset: 0.88, easing: "ease-in-out" },
          { transform: "translateY(0px) scale(1, 1)", opacity: 1 },
        ],
        { duration: 780, delay: demora, fill: "both" },
      );

    caer(sin, T_SIN);
    caer(erg, T_ERG);

    // El "ia" viaja en dos capas: la de afuera lo trae desde la izquierda y la de
    // adentro lo lleva por arriba de "Sinerg"; cuando ya está sobre su lugar, cae.
    const desde = -(iaX.getBoundingClientRect().right + 20);
    iaX.animate(
      [
        { transform: `translateX(${desde}px)`, opacity: 1, easing: "cubic-bezier(.3, .7, .4, 1)" },
        { transform: "translateX(0px)", offset: 0.6 },
        { transform: "translateX(0px)", opacity: 1 },
      ],
      { duration: 900, delay: T_IA, fill: "both" },
    );
    iaY.animate(
      [
        { transform: `translateY(${-F * 1.2}px) scale(1, 1)`, easing: "ease-out" },
        { transform: `translateY(${-F * 1.4}px) scale(1, 1)`, offset: 0.35, easing: "ease-in-out" },
        { transform: `translateY(${-F * 1.3}px) scale(1, 1)`, offset: 0.6, easing: "cubic-bezier(.55, 0, .9, .45)" },
        { transform: "translateY(0px) scale(1, 1)", offset: 0.76, easing: "ease-out" },
        { transform: "translateY(0px) scale(1.08, .86)", offset: 0.86, easing: "ease-in-out" },
        { transform: "translateY(0px) scale(1, 1)" },
      ],
      { duration: 900, delay: T_IA, fill: "both" },
    );

    // La palabra quedó completa: un golpe chico de todo el logo.
    luego(T_IA + 690, () => {
      logo.animate([{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }], {
        duration: 360,
        easing: "ease-out",
      });
    });

    pista.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 700, fill: "forwards" });

    // Vuelo al logo del nav mientras se destapa la página.
    luego(T_VUELO, () => {
      pista.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      fondo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, delay: 150, easing: "ease", fill: "forwards" });
      if (!navLogo) {
        logo.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: "forwards" }).finished.then(terminar, () => {});
        return;
      }
      const a = logo.getBoundingClientRect();
      const b = navLogo.getBoundingClientRect();
      const dx = b.left + b.width / 2 - (a.left + a.width / 2);
      const dy = b.top + b.height / 2 - (a.top + a.height / 2);
      logo
        .animate(
          [{ transform: "translate(0px, 0px) scale(1)" }, { transform: `translate(${dx}px, ${dy}px) scale(${b.width / a.width})` }],
          { duration: 800, easing: "cubic-bezier(.65, 0, .25, 1)", fill: "forwards" },
        )
        .finished.then(terminar, () => {});
    });

    raiz.addEventListener("click", saltear);
    window.addEventListener("keydown", saltear);

    return () => {
      timers.forEach(clearTimeout);
      raiz.getAnimations({ subtree: true }).forEach((an) => an.cancel());
      raiz.removeEventListener("click", saltear);
      window.removeEventListener("keydown", saltear);
      html.style.overflow = overflowAntes;
      if (navLogo) navLogo.style.visibility = "";
    };
  }, []);

  return (
    <>
      <div hidden dangerouslySetInnerHTML={{ __html: ANTES_DE_PINTAR }} />
      <div ref={raizRef} className="intro" aria-hidden="true">
        <div className="intro__fondo" />
        <span className="intro__logo logo-sinergia">
          <span className="intro__pieza intro__sin logo-sinergia__base">Sin</span>
          <span className="intro__pieza intro__erg logo-sinergia__base">erg</span>
          <span className="intro__pieza intro__ia-x">
            <span className="intro__ia-y">
              <span className="logo-sinergia__ia">ia</span>
            </span>
          </span>
        </span>
        <p className="intro__pista">Tocá para saltear</p>
      </div>
    </>
  );
}
