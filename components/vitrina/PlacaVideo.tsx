"use client";

import { useEffect, useRef, useState } from "react";

// El clip arranca con 0,8 s quieto en la portada (scripts/grabar_clips.py):
// se saltea casi toda esa pausa para que el movimiento empiece enseguida.
const ARRANQUE = 0.7;
// Con el dedo, el clip arranca recién si el dedo se queda: si no, cada vez que
// alguien apoya el dedo para scrollear la página, la placa parpadearía.
const ESPERA_DEDO = 150;
// Un toque más largo que esto fue para mirar el clip, no para abrir el sitio.
const TOQUE_LARGO = 350;

/**
 * Clip de la landing recorriéndose, encima de su captura.
 *
 * Las placas están quietas: el clip corre solo mientras el cursor está encima
 * o mientras el dedo queda apoyado, y al soltar se desvanece y vuelve a la
 * portada. Un toque corto sigue abriendo el sitio. La captura queda abajo como
 * foto, así nunca se ve un cuadro negro. En computadora el clip se baja cuando
 * la placa está por entrar en pantalla, para que arranque sin demora; en el
 * celular recién con el primer toque. No existe para quien pidió menos
 * movimiento o ahorro de datos.
 */
export default function PlacaVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const video = ref.current;
    const placa = video?.closest<HTMLElement>(".placa");
    if (!video || !placa) return;
    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || conexion?.saveData) return;

    let activo = false;
    let reinicio: number | undefined;
    let esperaDedo: number | undefined;
    let tocadoDesde = 0;

    const cargar = () => {
      if (!video.getAttribute("src")) video.src = src;
    };
    const activar = () => {
      activo = true;
      clearTimeout(reinicio);
      cargar();
      if (video.currentTime < ARRANQUE) video.currentTime = ARRANQUE;
      video.play().catch(() => {});
    };
    const desactivar = () => {
      activo = false;
      clearTimeout(esperaDedo);
      video.pause();
      setListo(false);
      // Cuando terminó de desvanecerse, vuelve a la portada para la próxima vez.
      reinicio = window.setTimeout(() => {
        if (!activo) video.currentTime = ARRANQUE;
      }, 400);
    };

    const entra = (e: PointerEvent) => {
      if (e.pointerType === "mouse") activar();
    };
    const sale = (e: PointerEvent) => {
      if (e.pointerType === "mouse") desactivar();
    };
    const apoya = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      tocadoDesde = Date.now();
      esperaDedo = window.setTimeout(activar, ESPERA_DEDO);
    };
    const suelta = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") desactivar();
    };
    // Si el dedo quedó apoyado para mirar el clip, soltarlo no abre el sitio.
    const clic = (e: MouseEvent) => {
      if (tocadoDesde && Date.now() - tocadoDesde > TOQUE_LARGO) e.preventDefault();
      tocadoDesde = 0;
    };
    // Sin esto, en Android el dedo apoyado abre el menú del link.
    const menu = (e: Event) => {
      if (tocadoDesde) e.preventDefault();
    };

    placa.addEventListener("pointerenter", entra);
    placa.addEventListener("pointerleave", sale);
    placa.addEventListener("pointerdown", apoya);
    placa.addEventListener("pointerup", suelta);
    placa.addEventListener("pointercancel", suelta); // el dedo se usó para scrollear
    placa.addEventListener("click", clic);
    placa.addEventListener("contextmenu", menu);

    // Con cursor, precargar al acercarse para que el hover arranque sin demora.
    let observer: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: hover)").matches) {
      observer = new IntersectionObserver(
        ([entrada]) => {
          if (!entrada.isIntersecting) return;
          video.preload = "auto";
          cargar();
          observer?.disconnect();
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(video);
    }

    return () => {
      clearTimeout(reinicio);
      clearTimeout(esperaDedo);
      observer?.disconnect();
      placa.removeEventListener("pointerenter", entra);
      placa.removeEventListener("pointerleave", sale);
      placa.removeEventListener("pointerdown", apoya);
      placa.removeEventListener("pointerup", suelta);
      placa.removeEventListener("pointercancel", suelta);
      placa.removeEventListener("click", clic);
      placa.removeEventListener("contextmenu", menu);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={`placa__video ${listo ? "is-listo" : ""}`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      onPlaying={() => setListo(true)}
    />
  );
}
