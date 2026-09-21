# FICHA — sinergia (landing sinergiawk.com)

> Actualizada: 2026-09-21 (rediseño Vitrina). Regenerar con /cerrar-proyecto tras cambios grandes.

## Resumen
- **Cliente**: proyecto propio (portfolio de Santiago Ignespina)
- **Qué es**: portfolio web de una sola página que muestra landings, sistemas y automatizaciones hechas, y capta consultas por formulario (texto o audio) hacia n8n.
- **Estado**: en producción
- **Diseño actual**: "Vitrina" (desde 2026-09-21). Salió del laboratorio `proyectos/sinergia-variantes` (variante A · Vitrina), elegida por Santiago y copiada tal cual. Desde ahora los cambios se hacen ACÁ: el laboratorio ya no es la fuente.

## Stack
- Next.js 16.2.1 (App Router, Turbopack) + React 19.2.4
- Tailwind CSS v4 (`@theme inline` en `app/globals.css`)
- TypeScript 5
- Tipografía vía next/font: Jost (300 a 600), declarada en `app/page.tsx` como `--font-vitrina`
- Paleta (tokens en `components/vitrina/vitrina.css`): fondo hueso `#ece9e2`, placas `#ffffff`, tinta `#15161a`, acento `#e8442b` (naranja), y `--logo-ia` `#ff7a2e` (el naranja claro del logo, para los puntos de la frase de la intro). El 2026-09-21 se probó una versión azul con los colores originales del logo nuevo y Santiago volvió a la paleta naranja de siempre.
- Estructura: `components/vitrina/` (la página, la intro y su CSS, todo bajo `.v-vitrina`), `components/comunes/` (logo, marco y escenario de las demos, formulario), `components/demos/`, `lib/catalogo.ts` (orden y filtros del portfolio), `lib/marca.ts` (nombre y WhatsApp), `lib/useContacto.ts` (lógica del formulario)

## Comandos
- `npm run dev` — dev server (Turbopack)
- `npm run build` — build de producción
- `npm run start` — servir el build
- `npm run lint` — eslint
- `python scripts/capture_shots.py` — regenera las capturas de `public/shots/` (Playwright headless, 1280x800 @2x, jpg q80). Para sumar una landing: agregar la URL al dict SITES y correr.
- `node scripts/make-logo-transparent.mjs` — utilitario del logo

## Deploy
- **Plataforma**: Vercel (proyecto `sinergiawk`)
- **URL**: https://www.sinergiawk.com (producción)
- **Método**: Vercel CLI desde local, y ADEMÁS la integración de GitHub: cada `git push` a `master` dispara un deploy de producción (comprobado 2026-09-21). No pushear a master nada que no deba salir al aire.
- **Repo git**: propio — `github.com/Santiagoignespina/Sinergiawk`, branch `master`

## Variables de entorno
| Variable | Seteada en | Para qué |
|----------|-----------|----------|
| `N8N_WEBHOOK_URL` | local (.env.local) + Vercel Production y Development. **Falta Preview.** | URL del webhook n8n que recibe las consultas del formulario. Privada: la lee solo el route handler `app/api/contacto/route.ts`. |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | Vercel (Dev/Preview/Prod) | **OBSOLETA** desde 2026-09-17. Era la misma URL pero expuesta en el bundle del navegador. Borrar de Vercel una vez que `N8N_WEBHOOK_URL` esté cargada y deployada. |
| `VERCEL_PROJECT_PRODUCTION_URL` | la inyecta Vercel sola | De ahí sale el dominio en metadata, sitemap y robots (ver `lib/site.ts`). |

## Base de datos
- Sin base de datos. El sitio es estático salvo el route handler `/api/contacto`.

## Integraciones
- **WhatsApp**: `5491170637316` (+54 9 11 7063-7316) — número de la instancia Sinergia de Evolution API. Vive en un solo lugar, `lib/marca.ts` (`WA_SINERGIA`, `waLink()`), como link `wa.me` con mensaje pre-cargado.
- **n8n**: el formulario postea a `/api/contacto`, que reenvía al webhook de n8n. Payload: `{nombre, celular, tipo, mensaje, audio, audioMime}`; `tipo` es `"text"` o `"audio"`, y el audio va en base64 webm.

## Decisiones técnicas no obvias
- **Branding**: desde 2026-09-21 la página usa el **logo nuevo de Santiago**: el símbolo S (dos trazos con degradé) + SINERG + IA. El original es azul → celeste y para fondo oscuro (SINERG en blanco); en el sitio va en **versión naranja** (degradé `#e8442b` → `#ff8f3a`, IA `#ff7a2e`, elegida por Santiago para seguir con la paleta de siempre) y, como la Vitrina es clara, SINERG va en el color del texto. Los colores del logo viven en `components/comunes/LogoSinergia.tsx`, no en el archivo generado. Lo que NO se ve en la página sigue diciendo "Santiago Ignespina": título de la pestaña, metadata, JSON-LD e imagen para compartir (`app/opengraph-image.tsx`, todavía con la paleta oscura vieja). No cambiar sin que Santiago lo pida.
- **El logo es un SVG trazado de una imagen**: el original es un PNG generado con ChatGPT (`scripts/logo/sinergia-logo-original.png`). `scripts/logo/trazar_logo.py` lo pasa a trazos con potrace y escribe `components/comunes/logoTrazos.ts` (no editar a mano). `LogoDefs` define los trazos una sola vez en la página y `LogoSinergia` (menú y pie) y la intro los reusan con `<use>`: así el HTML no repite los paths. Si aparece un vector original del logo, reemplaza al trazado. La frase del logo ("DESARROLLO • SISTEMAS • AUTOMATIZACIÓN") no se traza: en la intro va como texto real en Jost.
- **El dominio se resuelve en un solo lugar** (`lib/site.ts`). Antes estaba duplicado en layout, sitemap y robots con tres fallbacks distintos y ninguno era el real.
- **El webhook de n8n no se llama desde el navegador**: va por `/api/contacto`, que además valida y tiene un honeypot (campo `empresa`). Si se vuelve a llamar directo desde el cliente, la URL queda pública otra vez.
- **El audio se convierte a base64 con FileReader, no con `btoa(String.fromCharCode(...bytes))`**: el spread revienta el call stack arriba de ~120KB, que son ~8 segundos de grabación. `AudioRecorder` corta solo a los 120s (`MAX_SECONDS`).
- **Las capturas de sistemas son reales pero genericizadas** (cliente → "Clínica", nombres de pacientes/sucursales → genéricos) antes del screenshot. Los nombres en `data/projects.ts` también son genéricos, sin "Mr Bracket" ni "Santos".
- **Favicon** (`app/icon.png`, pestaña) y **`app/apple-icon.png`** (iPhone): el símbolo S del logo con su degradé, generado desde los mismos trazos; el de la pestaña con fondo transparente y el de iPhone sobre blanco (iOS no admite transparencia).
- **`data/projects.ts` es el contenido del sitio**: `serviceId` decide la sección (`web` → Landings, `sistemas` → Sistemas, `automatizaciones` → Automatizaciones). El orden vive en `lib/catalogo.ts`: las landings de `DESTACADAS` primero, después dominio propio y al final `.vercel.app`; los sistemas siguen `ORDEN_SISTEMAS`.
- **Intro animada** (`components/vitrina/IntroBienvenida.tsx`): el logo se arma de a partes: los dos trazos de la S entran en diagonal y encastran, cae "SIN", cae "ERG", el "IA" entra desde la izquierda por arriba de las letras y cae, aparece la frase, y el logo vuela al del nav. Una vez por sesión (`sessionStorage` `sinergia-intro-vista`), se saltea con clic o tecla, no corre con reduced-motion. Un script inline la esconde antes del primer pintado si ya se vio (si no, cada recarga mostraría un instante vacío) y una animación CSS la saca a los 5 s si el JS no arranca: sin eso, un error de JS dejaría la página tapada. Las piezas son grupos de un SVG: los px de sus transforms son unidades del dibujo, no de pantalla.
- **Las capturas de n8n de las demos siguen como `<img>` crudo** (no `next/image`): se muestran al 160% de ancho dentro de un contenedor con scroll para que se lean los nodos, y están detrás de un click. El resto de las imágenes sí pasa por `next/image`.

## Pendientes / deuda conocida
- **`N8N_WEBHOOK_URL` falta en el entorno Preview de Vercel** (Production y Development ya están). Los deploys de preview van a responder 500 en el formulario hasta cargarla.
- **`NEXT_PUBLIC_N8N_WEBHOOK_URL` sigue cargada en Vercel.** Ya no la usa ningún código y el deploy actual no la expone (verificado: el host no aparece ni en el HTML ni en los chunks). Se puede borrar, pero **ojo**: si se borra, un rollback al deploy anterior deja el formulario sin webhook.
- **lse.com.ar está roto y por eso quedó afuera del portfolio**: el dominio resuelve al hosting viejo (DonWeb/Ferozo) y sirve "Su sitio web no posee certificado SSL" en lugar del sitio, que sí está bien deployado en Vercel. Hay que corregir los registros DNS del dominio.
- **"Leads Sinergia" (n8n) corta a mitad de camino** (verificado 2026-09-21 con las dos pruebas del smoke test): el aviso por WhatsApp a Santiago SÍ sale (y el audio se transcribe), pero el nodo "Create a row" (Supabase self-hosted caído) da error y corta el flujo antes del Gmail. O sea: no llega el mail y el lead no entra al CRM. Es lo que prevé la entrada 6.7 del mapa del CRM (mover el insert al CRM y los avisos después); no depende de este repo.
- Sin rate limit en `/api/contacto`. Hay honeypot y validación, pero un bot dedicado igual puede spamear.
- 2 warnings de eslint preexistentes (variables sin usar en CRMDemo y RecordatorioDemo).
- **Decisiones abiertas de la Vitrina**: la tarjeta "E-commerce" de "Lo que hacemos" y la palabra e-commerce en la metadata siguen, aunque las tiendas online salieron del portfolio; título, metadata e imagen para compartir siguen como "Santiago Ignespina" (ver Branding).
- Proyectos en Vercel no incluidos en el portfolio por no estar deployados/accesibles: robiar, garra-duo, martin-estrella, ventacar, criaderoatr, planarq. naivres se sacó (el cliente bloqueó el sitio).
- Warning de build: hay dos `package-lock.json` (este y uno en `C:\Users\santi\`) y Turbopack infiere mal la raíz del workspace.

## Última auditoría
- 2026-09-17 — análisis + fixes en esta sesión (bug de audio, webhook privado, next/image, dominio unificado, código muerto) y renovación del portfolio. No se corrió `/auditar` completo; no existe `AUDITORIA.md`.

## Smoke test del formulario
- 2026-09-21, sobre https://www.sinergiawk.com recién deployado con la Vitrina: intro completa en desktop y mobile (termina, devuelve el scroll y el logo del nav), links de WhatsApp a `5491170637316`, validación de celular vacío, y envío real de texto en desktop y de audio en mobile: los dos 200 y con "¡Mensaje enviado!". Nombre usado: "PRUEBA sitio nuevo (ignorar)". Consola sin errores. Rollback posible al deploy anterior `sinergiawk-jmjl5bply` (2026-09-17).
- 2026-09-17, contra el dev server con el webhook real: camino texto y camino audio, los dos llegaron a n8n y devolvieron 200. Validaciones del route handler probadas una por una (honeypot, campos faltantes, JSON inválido, audio >3MB). Repetido el mismo día sobre https://www.sinergiawk.com ya deployado: texto en desktop y audio en mobile, los dos 200 y con la pantalla de éxito; la validación de celular vacío frena el envío en ambos.
