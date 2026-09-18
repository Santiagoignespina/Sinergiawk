"""Captura screenshots del hero de cada landing en vivo para la galeria del portfolio."""
import os
import time
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "shots")
os.makedirs(OUT, exist_ok=True)

SITES = {
    # --- ya estaban, ahora con dominio propio ---
    "carmai": "https://estudiocarmai.com",
    "canedo-cursos": "https://cursosdesacabollos.com",
    "estudio-calle": "https://estudioimpositivointegral.com.ar",
    "trucos-para-el-truco": "https://trucosparaeltruco.com",
    # --- ya estaban ---
    "multientrenador": "https://multientrenador.com.ar",
    "amaf": "https://amaf.com.ar",
    "canedo-sacabollos": "https://sacabolloscanedo.com",
    "tu-reclamo-web": "https://tureclamoweb.com.ar",
    "lopez-esposito": "https://lopezesposito.com",
    "landing-carina": "https://lahoradeljuego.vercel.app",
    "irban-sas": "https://irbansas.com.ar",
    "agusmagicplan": "https://agusmagicplan.vercel.app",
    "ccv": "https://campeonato-cordobes-de-velocidad.vercel.app",
    "dinacars": "https://dinacars.com.ar",
    "food-trucks-triple-c": "https://food-trucks-triple-c.vercel.app",
    "ivo-scurti": "https://ivo-scurti.vercel.app",
    "lucardetail": "https://lucardetail.vercel.app",
    "lucerospavioli": "https://lucerospavioli.vercel.app",
    "santos-propiedades": "https://santos-propiedades.vercel.app",
    # --- nuevos con dominio propio ---
    "rcr-soluciones": "https://rcr-soluciones.com.ar",
    "alpie": "https://alpie.com.ar",
    "asppe": "https://asppe.org.ar",
    "dra-mercedes-bustamante": "https://dramechebustamante.com.ar",
    "fremli": "https://fremli.com.ar",
    # "lse": "https://lse.com.ar",  # el dominio sigue apuntando al hosting viejo (sin SSL valido)
    "pci-inversiones": "https://inversionespci.com.ar",
    "crona-consulting": "https://cronaconsulting.com.ar",
    "a-perez-abogados": "https://estudiojuridicoaperez.com.ar",
    "electroben": "https://electroben.com.ar",
    "castro-marcelo": "https://castromarcelo.com.ar",
    "infinita": "https://serinfinita.com.ar",
    "madera-maestra": "https://maderamaestra.com",
    "gasotex": "https://gasotex.com.ar",
    "psi-matias-hernandez": "https://psimatiashernandez.com.ar",
    "plexo-pilates": "https://plexopilates.com.ar",
    "artefund": "https://artefund.com.ar",
}

ok, fail = [], []
with sync_playwright() as p:
    browser = p.chromium.launch()
    for sid, url in SITES.items():
        dest = os.path.join(OUT, f"{sid}.jpg")
        try:
            ctx = browser.new_context(
                viewport={"width": 1280, "height": 800},
                device_scale_factor=2,
            )
            page = ctx.new_page()
            page.goto(url, wait_until="load", timeout=45000)
            time.sleep(4)  # animaciones de entrada + imagenes hero
            page.screenshot(path=dest, type="jpeg", quality=80)
            ctx.close()
            ok.append(sid)
            print(f"OK   {sid:24s} {url}", flush=True)
        except Exception as e:
            fail.append((sid, str(e)[:80]))
            print(f"FAIL {sid:24s} {url}  -> {str(e)[:80]}", flush=True)
    browser.close()

print(f"\nDONE: {len(ok)} ok, {len(fail)} fail")
for sid, err in fail:
    print(f"  FAIL {sid}: {err}")
