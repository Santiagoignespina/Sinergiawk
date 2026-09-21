"""Pasa el logo de Sinergia (PNG) a trazos SVG y escribe components/comunes/logoTrazos.ts.

El original es una imagen generada (scripts/logo/sinergia-logo-original.png, 2172x724,
fondo transparente, pensada para fondo oscuro). Se separa en piezas para poder animarlas:
los dos trazos del símbolo, "SIN", "ERG" e "IA". La frase de abajo NO se traza: en el sitio
va como texto real (ver IntroBienvenida).

Uso: pip install potracer opencv-python numpy pillow ; python scripts/logo/trazar_logo.py
"""
import pathlib
import numpy as np, cv2, potrace
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parents[2]
src = np.array(Image.open(pathlib.Path(__file__).with_name("sinergia-logo-original.png")).convert("RGBA")).astype(np.float32)
X0, Y0, UP = 395, 190, 4          # origen de las coordenadas del logo y sobremuestreo para el trazado


def componentes(caja):
    x0, y0, x1, y1 = caja
    n, lab, st, _ = cv2.connectedComponentsWithStats((src[y0:y1, x0:x1, 3] > 60).astype(np.uint8), connectivity=8)
    return lab, [(st[i, 0], st[i, 1], i) for i in range(1, n) if st[i, 4] > 4]


def num(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


def trazar(caja, lab, ids, suavizado, tolerancia):
    """Contorno con curvas (potrace) de los componentes `ids`, en coordenadas del logo."""
    x0, y0, x1, y1 = caja
    alpha = src[y0:y1, x0:x1, 3] * np.isin(lab, ids)
    g = cv2.GaussianBlur(cv2.resize(alpha, None, fx=UP, fy=UP, interpolation=cv2.INTER_CUBIC), (0, 0), suavizado * UP)
    curvas = potrace.Bitmap(g <= 127).trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=tolerancia)
    P = lambda p: f"{num(p.x / UP + x0 - X0)} {num(p.y / UP + y0 - Y0)}"
    d = []
    for c in curvas:
        d.append("M" + P(c.start_point))
        for s in c.segments:
            d.append("L" + P(s.c) + "L" + P(s.end_point) if s.is_corner else "C" + P(s.c1) + " " + P(s.c2) + " " + P(s.end_point))
        d.append("Z")
    return "".join(d)


def color(caja, lab, ids):
    x0, y0, x1, y1 = caja
    sel = np.isin(lab, ids) & (src[y0:y1, x0:x1, 3] > 250)
    return "#%02x%02x%02x" % tuple(int(v) for v in src[y0:y1, x0:x1, :3][sel].mean(0))


# Símbolo: dos trazos (arriba y abajo). El borde de la imagen original es irregular, por eso
# el suavizado es mayor que en las letras.
CS = (390, 185, 700, 515)
lab, cs = componentes(CS)
cs.sort(key=lambda c: c[1])
trazos = [trazar(CS, lab, [c[2]], 2.4, 0.8) for c in cs]
reg = src[CS[1]:CS[3], CS[0]:CS[2]]
ys, xs = np.nonzero(reg[:, :, 3] > 250)
t = xs - ys
degrade = ["#%02x%02x%02x" % tuple(int(v) for v in reg[ys[m], xs[m], :3].mean(0)) for m in (t < t.min() + 25, t > t.max() - 25)]

# Palabra: 8 letras, de izquierda a derecha.
CP = (715, 250, 1780, 395)
lab, cs = componentes(CP)
ids = [c[2] for c in sorted(cs)]
assert len(ids) == 8, f"se esperaban 8 letras y hay {len(ids)}"
sin, erg, ia = (trazar(CP, lab, ids[a:b], 1.2, 0.25) for a, b in ((0, 3), (3, 6), (6, 8)))
celeste = color(CP, lab, ids[6:8])

ts = f'''// GENERADO por scripts/logo/trazar_logo.py a partir de scripts/logo/sinergia-logo-original.png.
// No editar a mano: si cambia el logo, se reemplaza el PNG y se corre el script.
// Coordenadas del logo: el símbolo va de x 0 a 281 y la palabra de x 332 a 1370 (y 70 a 199).

export const LOGO_VIEWBOX = "0 4 1378 316";
export const LOGO_ANCHO = 1378;
export const LOGO_ALTO = 316;

/** Degradé del símbolo: de abajo a la izquierda (azul) a arriba a la derecha (celeste). */
export const LOGO_DEGRADE = ["{degrade[0]}", "{degrade[1]}"] as const;
/** Color del "IA". */
export const LOGO_CELESTE = "{celeste}";

export const TRAZO_ARRIBA = "{trazos[0]}";
export const TRAZO_ABAJO = "{trazos[1]}";
export const LETRAS_SIN = "{sin}";
export const LETRAS_ERG = "{erg}";
export const LETRAS_IA = "{ia}";
'''
(RAIZ / "components" / "comunes" / "logoTrazos.ts").write_text(ts, encoding="utf-8", newline="\n")
print("ok", degrade, celeste, {k: len(v) for k, v in (("trazos", "".join(trazos)), ("sin", sin), ("erg", erg), ("ia", ia))})
