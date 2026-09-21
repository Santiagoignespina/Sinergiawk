"use client";

import { useState } from "react";

/**
 * Toda la lógica del formulario de contacto, sin markup.
 * Cada variante escribe su propio HTML y lo estiliza; esto sólo maneja estado,
 * validación y envío.
 */

export type Modo = "texto" | "audio";

// FileReader convierte el blob entero sin pasar por el stack de argumentos:
// con btoa(String.fromCharCode(...bytes)) un audio de más de ~120KB tiraba
// RangeError, o sea que fallaba a los ~8 segundos de grabación.
const blobABase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result as string;
      resolve(r.slice(r.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export function useContacto() {
  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [empresa, setEmpresa] = useState(""); // honeypot
  const [audio, setAudio] = useState<Blob | null>(null);
  const [modo, setModo] = useState<Modo>("texto");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim()) return setError("Completá tu nombre.");
    if (!celular.trim()) return setError("Dejanos tu celular así te podemos responder.");
    if (modo === "texto" && !mensaje.trim()) return setError("Contanos en qué te podemos ayudar.");
    if (modo === "audio" && !audio) return setError("Grabá un mensaje de voz antes de enviar.");

    setCargando(true);
    try {
      const audioBase64 = modo === "audio" && audio ? await blobABase64(audio) : null;

      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          celular,
          empresa,
          tipo: modo === "texto" ? "text" : "audio",
          mensaje: modo === "texto" ? mensaje : null,
          audio: audioBase64,
          audioMime: audioBase64 ? "audio/webm" : null,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");

      setExito(true);
    } catch {
      setError("Hubo un error al enviar. Intentá de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return {
    nombre, setNombre,
    celular, setCelular,
    mensaje, setMensaje,
    empresa, setEmpresa,
    audio, setAudio,
    modo, setModo,
    cargando, error, exito,
    enviar,
  };
}
