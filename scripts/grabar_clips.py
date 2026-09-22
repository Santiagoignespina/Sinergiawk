"""Graba un clip corto de cada landing en vivo para las placas de la Vitrina.

El clip es la landing recorriéndose sola: arranca quieta en la portada (igual a la
captura de public/shots, que queda de foto mientras el clip carga), baja unas dos
pantallas y vuelve a subir por el mismo camino, así el loop no tiene corte.

No se graba la pantalla en tiempo real (el video de Playwright sale borroso): se
saca una foto por cuadro con el scroll puesto a mano y ffmpeg arma el video. Antes
se recorre la página una vez para que carguen las imágenes y se disparen las
animaciones de entrada; si no, el clip mostraría secciones vacías.

Uso: python scripts/grabar_clips.py             (todas las landings con captura)
     python scripts/grabar_clips.py alpie asppe  (solo esas)
"""
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
from playwright.sync_api import sync_playwright

RAIZ = os.path.join(os.path.dirname(__file__), "..")
SALIDA = os.path.join(RAIZ, "public", "clips")
MANIFIESTO = os.path.join(RAIZ, "components", "vitrina", "clips.json")

# Mismo viewport que scripts/capture_shots.py del sitio: el primer cuadro tiene
# que coincidir con la captura para que el paso de foto a video no salte.
ANCHO, ALTO = 1280, 800
# La placa muestra la captura recortada en 380/210 desde arriba.
ALTO_PLACA = round(ANCHO * 210 / 380)  # 707
SALIDA_ANCHO, SALIDA_ALTO = 720, 398   # ~2x del ancho de una placa en desktop

FPS = 30
QUIETO_ARRIBA = 24   # cuadros (0,8 s) mirando la portada
BAJADA = 120         # cuadros (4 s) de scroll
QUIETO_ABAJO = 18    # cuadros (0,6 s) antes de volver
RECORRIDO_MAX = 1400 # px: portada y la sección siguiente, no la página entera


def landings():
    """Las landings de data/projects.ts que tienen captura y URL en vivo."""
    with open(os.path.join(RAIZ, "data", "projects.ts"), encoding="utf-8") as f:
        texto = f.read()
    sitios = {}
    for bloque in re.findall(r"\{\s*id: \"[^\"]+\".*?\n  \}", texto, re.S):
        campo = lambda n: (re.search(n + r': "([^"]+)"', bloque) or [None, None])[1]
        if campo("serviceId") == "web" and campo("previewImage") and campo("liveUrl"):
            sitios[campo("id")] = campo("liveUrl")
    return sitios


def grabar(browser, url, carpeta):
    ctx = browser.new_context(viewport={"width": ANCHO, "height": ALTO}, device_scale_factor=1)
    page = ctx.new_page()
    try:
        page.goto(url, wait_until="load", timeout=45000)
        page.add_style_tag(content="html, body { scroll-behavior: auto !important; }")
        page.wait_for_timeout(4000)  # animaciones de entrada + imágenes de la portada

        alto_pagina = page.evaluate("() => document.documentElement.scrollHeight")
        recorrido = max(0, min(alto_pagina - ALTO, RECORRIDO_MAX))

        # Pasada previa: carga lo diferido y dispara las animaciones de entrada.
        for y in range(0, recorrido + ALTO, 150):
            page.evaluate("y => window.scrollTo(0, y)", y)
            page.wait_for_timeout(120)
        page.wait_for_timeout(1200)
        page.evaluate("() => window.scrollTo(0, 0)")
        page.wait_for_timeout(1500)

        cuadros = []
        for i in range(BAJADA):
            t = i / (BAJADA - 1)
            y = round(recorrido * (1 - math.cos(math.pi * t)) / 2)  # arranca y frena suave
            page.evaluate(
                "y => { window.scrollTo(0, y); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }",
                y,
            )
            ruta = os.path.join(carpeta, f"b{i:04d}.jpg")
            page.screenshot(path=ruta, type="jpeg", quality=92,
                            clip={"x": 0, "y": 0, "width": ANCHO, "height": ALTO_PLACA})
            cuadros.append(ruta)
    finally:
        ctx.close()

    # Ida y vuelta: quieto arriba, baja, quieto abajo, y el mismo camino al revés.
    ida = [cuadros[0]] * QUIETO_ARRIBA + cuadros + [cuadros[-1]] * QUIETO_ABAJO
    secuencia = ida + ida[-2:0:-1]
    for n, origen in enumerate(secuencia):
        shutil.copyfile(origen, os.path.join(carpeta, f"f{n:04d}.jpg"))
    return recorrido


def codificar(carpeta, destino):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS),
         "-i", os.path.join(carpeta, "f%04d.jpg"),
         "-vf", f"scale={SALIDA_ANCHO}:{SALIDA_ALTO}:flags=lanczos,format=yuv420p",
         "-c:v", "libx264", "-preset", "slow", "-crf", "28",
         "-movflags", "+faststart", "-an", destino],
        check=True,
    )


def main():
    sitios = landings()
    pedidos = sys.argv[1:]
    if pedidos:
        faltan = [s for s in pedidos if s not in sitios]
        if faltan:
            sys.exit(f"No son landings con captura: {', '.join(faltan)}")
        sitios = {s: sitios[s] for s in pedidos}

    os.makedirs(SALIDA, exist_ok=True)
    ok, fallas = [], []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for sid, url in sitios.items():
            with tempfile.TemporaryDirectory() as carpeta:
                try:
                    recorrido = grabar(browser, url, carpeta)
                    destino = os.path.join(SALIDA, f"{sid}.mp4")
                    codificar(carpeta, destino)
                    kb = os.path.getsize(destino) // 1024
                    ok.append(sid)
                    print(f"OK   {sid:24s} {kb:5d} KB  recorrido {recorrido}px", flush=True)
                except Exception as e:
                    fallas.append(sid)
                    print(f"FAIL {sid:24s} {url} -> {str(e)[:90]}", flush=True)
        browser.close()

    # El manifiesto sale de lo que hay en disco: una corrida parcial no borra los
    # clips que ya estaban.
    hechos = sorted(f[:-4] for f in os.listdir(SALIDA) if f.endswith(".mp4"))
    with open(MANIFIESTO, "w", encoding="utf-8") as f:
        json.dump(hechos, f, indent=2)
        f.write("\n")
    print(f"\nDONE: {len(ok)} ok, {len(fallas)} fail. Clips en total: {len(hechos)}")


if __name__ == "__main__":
    main()
