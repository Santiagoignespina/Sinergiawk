"""Captura screenshots del hero de cada landing en vivo para la galeria del portfolio."""
import os
import time
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "shots")
os.makedirs(OUT, exist_ok=True)

SITES = {
    "multientrenador": "https://multientrenador.com.ar",
    "carmai": "https://carmai.vercel.app",
    "amaf": "https://amaf.com.ar",
    "canedo-sacabollos": "https://sacabolloscanedo.com",
    "tu-reclamo-web": "https://tureclamoweb.com.ar",
    "canedo-cursos": "https://canedo-cursos.vercel.app",
    "jitter-vpn": "https://jitter-vpn.vercel.app",
    "lopez-esposito": "https://lopezesposito.com",
    "casi-creativos": "https://casi-creativos.vercel.app",
    "estudio-calle": "https://estudio-calle.vercel.app",
    "landing-carina": "https://lahoradeljuego.vercel.app",
    "irban-sas": "https://irbansas.com.ar",
    "agusmagicplan": "https://agusmagicplan.vercel.app",
    "ccv": "https://campeonato-cordobes-de-velocidad.vercel.app",
    "dinacars": "https://dinacars.com.ar",
    "trucos-para-el-truco": "https://trucos-para-el-truco.vercel.app",
    "food-trucks-triple-c": "https://food-trucks-triple-c.vercel.app",
    "ivo-scurti": "https://ivo-scurti.vercel.app",
    "lucardetail": "https://lucardetail.vercel.app",
    "cfstore": "https://cfstore-ashy.vercel.app",
    "lucerospavioli": "https://lucerospavioli.vercel.app",
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
