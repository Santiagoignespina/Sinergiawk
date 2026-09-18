# FICHA — sinergia (landing sinergiawk.com)

> Actualizada: 2026-09-17. Regenerar con /cerrar-proyecto tras cambios grandes.

## Resumen
- **Cliente**: proyecto propio (portfolio de Santiago Ignespina)
- **Qué es**: portfolio web de una sola página que muestra landings, sistemas y automatizaciones hechas, y capta consultas por formulario (texto o audio) hacia n8n.
- **Estado**: en producción

## Stack
- Next.js 16.2.1 (App Router, Turbopack) + React 19.2.4
- Tailwind CSS v4 (`@theme inline` en `app/globals.css`)
- TypeScript 5
- Tipografías vía next/font: Space Grotesk (display) + Inter (body)
- Paleta: fondo `#0A0A0A`, surface `#121212`, acento único `#FF4D00`

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
- **Método**: Vercel CLI desde local
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
- **WhatsApp**: `5491170637316` (+54 9 11 7063-7316) — número de la instancia Sinergia de Evolution API. Hardcodeado en `components/Hero.tsx` (`WA_NUMERO`) y `components/WhatsAppFloat.tsx`, como link `wa.me` con mensaje pre-cargado.
- **n8n**: el formulario postea a `/api/contacto`, que reenvía al webhook de n8n. Payload: `{nombre, celular, tipo, mensaje, audio, audioMime}`; `tipo` es `"text"` o `"audio"`, y el audio va en base64 webm.

## Decisiones técnicas no obvias
- **Branding mixto a propósito**: el navbar usa el logo viejo de Sinergia (`public/logo.png`) y el título/footer/metadata dicen "Santiago Ignespina". Conviven por decisión del usuario; no "arreglar" sin preguntar.
- **El dominio se resuelve en un solo lugar** (`lib/site.ts`). Antes estaba duplicado en layout, sitemap y robots con tres fallbacks distintos y ninguno era el real.
- **El webhook de n8n no se llama desde el navegador**: va por `/api/contacto`, que además valida y tiene un honeypot (campo `empresa`). Si se vuelve a llamar directo desde el cliente, la URL queda pública otra vez.
- **El audio se convierte a base64 con FileReader, no con `btoa(String.fromCharCode(...bytes))`**: el spread revienta el call stack arriba de ~120KB, que son ~8 segundos de grabación. `AudioRecorder` corta solo a los 120s (`MAX_SECONDS`).
- **Las capturas de sistemas son reales pero genericizadas** (cliente → "Clínica", nombres de pacientes/sucursales → genéricos) antes del screenshot. Los nombres en `data/projects.ts` también son genéricos, sin "Mr Bracket" ni "Santos".
- **`data/projects.ts` es el contenido del sitio**: `serviceId` decide la sección (`web` → Landings, `sistemas` → Sistemas, `automatizaciones` → Galeria). Las landings ordenan dominio propio primero y `.vercel.app` después.
- **Las capturas de n8n de las demos siguen como `<img>` crudo** (no `next/image`): se muestran al 160% de ancho dentro de un contenedor con scroll para que se lean los nodos, y están detrás de un click. El resto de las imágenes sí pasa por `next/image`.

## Pendientes / deuda conocida
- **`N8N_WEBHOOK_URL` falta en el entorno Preview de Vercel** (Production y Development ya están). Los deploys de preview van a responder 500 en el formulario hasta cargarla.
- **`NEXT_PUBLIC_N8N_WEBHOOK_URL` sigue cargada en Vercel.** Ya no la usa ningún código y el deploy actual no la expone (verificado: el host no aparece ni en el HTML ni en los chunks). Se puede borrar, pero **ojo**: si se borra, un rollback al deploy anterior deja el formulario sin webhook.
- **lse.com.ar está roto y por eso quedó afuera del portfolio**: el dominio resuelve al hosting viejo (DonWeb/Ferozo) y sirve "Su sitio web no posee certificado SSL" en lugar del sitio, que sí está bien deployado en Vercel. Hay que corregir los registros DNS del dominio.
- Sin rate limit en `/api/contacto`. Hay honeypot y validación, pero un bot dedicado igual puede spamear.
- Las demos de automatizaciones (`components/demos/`) todavía muestran nombres de pacientes y "/Mr.Bracket" en algunas pantallas — pendiente genericizar.
- 4 warnings de eslint preexistentes (variables sin usar en BrideonDemo, CRMDemo, RecordatorioDemo).
- Proyectos en Vercel no incluidos en el portfolio por no estar deployados/accesibles: robiar, garra-duo, martin-estrella, ventacar, criaderoatr, planarq. naivres se sacó (el cliente bloqueó el sitio).
- Warning de build: hay dos `package-lock.json` (este y uno en `C:\Users\santi\`) y Turbopack infiere mal la raíz del workspace.

## Última auditoría
- 2026-09-17 — análisis + fixes en esta sesión (bug de audio, webhook privado, next/image, dominio unificado, código muerto) y renovación del portfolio. No se corrió `/auditar` completo; no existe `AUDITORIA.md`.

## Smoke test del formulario
- 2026-09-17, contra el dev server con el webhook real: camino texto y camino audio, los dos llegaron a n8n y devolvieron 200. Validaciones del route handler probadas una por una (honeypot, campos faltantes, JSON inválido, audio >3MB). Repetido el mismo día sobre https://www.sinergiawk.com ya deployado: texto en desktop y audio en mobile, los dos 200 y con la pantalla de éxito; la validación de celular vacío frena el envío en ambos.
