import { NextResponse } from "next/server";

// La URL del webhook vive solo en el servidor: antes viajaba en el bundle
// como NEXT_PUBLIC_ y cualquiera podia dispararla desde afuera.
const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "";

const MAX_AUDIO_BASE64 = 3_000_000; // ~2.2MB de audio, muy por encima de 2 min grabados

type Payload = {
  nombre?: unknown;
  celular?: unknown;
  mensaje?: unknown;
  empresa?: unknown;
  tipo?: unknown;
  audio?: unknown;
  audioMime?: unknown;
};

const texto = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Formato invalido" }, { status: 400 });
  }

  // Honeypot: si vino completo es un bot. Respondemos ok y no reenviamos nada.
  if (texto(body.empresa, 100)) return NextResponse.json({ ok: true });

  const nombre = texto(body.nombre, 100);
  const celular = texto(body.celular, 40);
  const tipo = body.tipo === "audio" ? "audio" : "text";
  const mensaje = texto(body.mensaje, 5000);
  const audio = typeof body.audio === "string" ? body.audio : null;

  if (!nombre || !celular) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  if (tipo === "text" && !mensaje) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  if (tipo === "audio" && !audio) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  if (audio && audio.length > MAX_AUDIO_BASE64) {
    return NextResponse.json({ error: "El audio es demasiado largo" }, { status: 413 });
  }

  if (!WEBHOOK_URL) {
    console.error("N8N_WEBHOOK_URL no esta configurada");
    return NextResponse.json({ error: "Servicio no disponible" }, { status: 500 });
  }

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      celular,
      tipo,
      mensaje: tipo === "text" ? mensaje : null,
      audio,
      audioMime: audio ? "audio/webm" : null,
    }),
  });

  if (!res.ok) {
    console.error("Webhook n8n respondio", res.status);
    return NextResponse.json({ error: "Error al enviar" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
