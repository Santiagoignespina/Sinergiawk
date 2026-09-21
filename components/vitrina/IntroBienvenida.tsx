"use client";

import { useLayoutEffect, useRef } from "react";
import { ID } from "@/components/comunes/LogoSinergia";
import { LOGO_ALTO, LOGO_ANCHO, LOGO_VIEWBOX } from "@/components/comunes/logoTrazos";

/**
 * Intro de bienvenida: el logo se arma de a partes. Primero la S, con sus dos
 * trazos que entran en diagonal y encastran; después cae "SIN", cae "ERG", y el
 * "IA" celeste entra desde la izquierda de la pantalla, pasa por arriba de las
 * letras y cae en su lugar. Aparece la frase del logo y todo vuela a acomodarse
 * en el nav mientras se destapa la página.
 *
 * Una vez por sesión: recargar no la repite, una pestaña nueva sí. Se saltea con
 * un clic, un toque o una tecla, y no corre con prefers-reduced-motion.
 *
 * Las piezas son grupos de un SVG: en SVG los px de un transform son unidades del
 * dibujo (el viewBox), no píxeles de pantalla. Por eso las distancias medidas en
 * pantalla se pasan a unidades con `u`.
 */

const CLAVE = "sinergia-intro-vista";

// Corre mientras el navegador lee el HTML, antes de pintar: si la intro ya se vio
// en esta sesión la esconde sin esperar a React (si no, cada recarga mostraría un
// instante de pantalla vacía). Va como HTML crudo para que React no lo maneje como
// un <script> propio: cuando el componente se monta en el cliente no se ejecuta, y
// ahí lo resuelve el efecto.
const ANTES_DE_PINTAR = `<script>try{if(sessionStorage.getItem("${CLAVE}")==="1"){var e=document.createElement("style");e.textContent=".v-vitrina .intro{display:none}";document.head.appendChild(e)}}catch(_){}</script>`;

// Momentos (ms desde que arranca).
const T_S = 150;
const T_SIN = 650;
const T_ERG = 1100;
const T_IA = 1550;
const T_FRASE = 2300;
const T_VUELO = 3000;

// Alto de las letras en unidades del dibujo (van de y 70 a 199).
const LETRA = 129;

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

    const pieza = <T extends Element>(sel: string) => raiz.querySelector(sel) as T;
    const logo = pieza<SVGSVGElement>(".intro__logo");
    const trazoArriba = pieza<SVGGElement>(".intro__trazo-arriba");
    const trazoAbajo = pieza<SVGGElement>(".intro__trazo-abajo");
    const sin = pieza<SVGGElement>(".intro__sin");
    const erg = pieza<SVGGElement>(".intro__erg");
    const iaX = pieza<SVGGElement>(".intro__ia-x");
    const iaY = pieza<SVGGElement>(".intro__ia-y");
    const frase = pieza<SVGTextElement>(".intro__frase");
    const fondo = pieza<HTMLElement>(".intro__fondo");
    const pista = pieza<HTMLElement>(".intro__pista");
    const navLogo = document.querySelector<SVGSVGElement>(".v-vitrina .nav__marca .logo-sinergia");
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

    // Unidades del dibujo por píxel de pantalla.
    const u = LOGO_ANCHO / logo.getBoundingClientRect().width;

    // La S: cada trazo entra por su diagonal (la de arriba desde arriba a la derecha,
    // la de abajo desde abajo a la izquierda) y encastra con el otro.
    const encastrar = (el: SVGGElement, dx: number, dy: number, demora: number) =>
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, opacity: 0, easing: "cubic-bezier(.2, .8, .25, 1.08)" },
          { transform: "translate(0px, 0px)", opacity: 1 },
        ],
        { duration: 650, delay: demora, fill: "both" },
      );
    encastrar(trazoArriba, 260, -150, T_S);
    encastrar(trazoAbajo, -260, 150, T_S + 90);

    // Cae desde arriba de la pantalla, se aplasta un poco al tocar y se acomoda.
    const caer = (el: SVGGElement, demora: number) =>
      el.animate(
        [
          {
            transform: `translateY(${-(el.getBoundingClientRect().bottom + 20) * u}px) scale(1, 1)`,
            opacity: 1,
            easing: "cubic-bezier(.55, 0, .9, .45)",
          },
          { transform: "translateY(0px) scale(1, 1)", offset: 0.62, easing: "ease-out" },
          { transform: "translateY(0px) scale(1.07, .86)", offset: 0.76, easing: "ease-out" },
          { transform: `translateY(${-LETRA * 0.07}px) scale(.98, 1.03)`, offset: 0.88, easing: "ease-in-out" },
          { transform: "translateY(0px) scale(1, 1)", opacity: 1 },
        ],
        { duration: 780, delay: demora, fill: "both" },
      );

    caer(sin, T_SIN);
    caer(erg, T_ERG);

    // El "IA" viaja en dos capas: la de afuera lo trae desde la izquierda y la de
    // adentro lo lleva por arriba de la S y de "SINERG"; ya sobre su lugar, cae.
    const desde = -(iaX.getBoundingClientRect().right + 20) * u;
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
        { transform: `translateY(${-LETRA * 1.65}px) scale(1, 1)`, easing: "ease-out" },
        { transform: `translateY(${-LETRA * 1.95}px) scale(1, 1)`, offset: 0.35, easing: "ease-in-out" },
        { transform: `translateY(${-LETRA * 1.8}px) scale(1, 1)`, offset: 0.6, easing: "cubic-bezier(.55, 0, .9, .45)" },
        { transform: "translateY(0px) scale(1, 1)", offset: 0.76, easing: "ease-out" },
        { transform: "translateY(0px) scale(1.08, .86)", offset: 0.86, easing: "ease-in-out" },
        { transform: "translateY(0px) scale(1, 1)" },
      ],
      { duration: 900, delay: T_IA, fill: "both" },
    );

    // La palabra quedó completa: un golpe chico de todo el logo.
    luego(T_IA + 690, () => {
      logo.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }], {
        duration: 360,
        easing: "ease-out",
      });
    });

    frase.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0px)" },
      ],
      { duration: 450, delay: T_FRASE, easing: "ease-out", fill: "both" },
    );

    pista.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 700, fill: "forwards" });

    // Vuelo al logo del nav mientras se destapa la página. La frase no está en el
    // logo del nav: se va antes de volar.
    luego(T_VUELO, () => {
      pista.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      frase.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" });
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
        <svg className="intro__logo" viewBox={LOGO_VIEWBOX} width={LOGO_ANCHO} height={LOGO_ALTO}>
          <g className="intro__pieza intro__trazo-arriba">
            <use href={`#${ID.trazoArriba}`} />
          </g>
          <g className="intro__pieza intro__trazo-abajo">
            <use href={`#${ID.trazoAbajo}`} />
          </g>
          <g className="intro__pieza intro__sin">
            <use href={`#${ID.sin}`} fill="currentColor" />
          </g>
          <g className="intro__pieza intro__erg">
            <use href={`#${ID.erg}`} fill="currentColor" />
          </g>
          <g className="intro__pieza intro__ia-x">
            <g className="intro__ia-y">
              <use href={`#${ID.ia}`} />
            </g>
          </g>
          {/* La frase del logo como texto real, estirada al ancho de la palabra. */}
          <text className="intro__frase" x="337" y="267" textLength="1039" lengthAdjust="spacing">
            {"DESARROLLO "}
            <tspan className="intro__punto">•</tspan>
            {" SISTEMAS "}
            <tspan className="intro__punto">•</tspan>
            {" AUTOMATIZACIÓN"}
          </text>
        </svg>
        <p className="intro__pista">Tocá para saltear</p>
      </div>
    </>
  );
}
