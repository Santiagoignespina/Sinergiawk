"use client";
import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";

type InputMode = "text" | "audio";

const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "", audio: null as Blob | null });
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.nombre.trim() || !form.email.trim()) {
      setError("Completá nombre y email.");
      return;
    }
    if (inputMode === "text" && !form.mensaje.trim()) {
      setError("Contanos en qué te podemos ayudar.");
      return;
    }
    if (inputMode === "audio" && !form.audio) {
      setError("Grabá un mensaje de voz antes de enviar.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("nombre", form.nombre);
      payload.append("email", form.email);
      payload.append("tipo", inputMode);

      if (inputMode === "text") {
        payload.append("mensaje", form.mensaje);
      } else if (form.audio) {
        payload.append("audio", form.audio, "mensaje.webm");
      }

      if (N8N_WEBHOOK_URL) {
        const res = await fetch(N8N_WEBHOOK_URL, { method: "POST", body: payload });
        if (!res.ok) throw new Error("Error al enviar");
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("Form data (dev):", Object.fromEntries(payload.entries()));
      }

      setSuccess(true);
    } catch {
      setError("Hubo un error al enviar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section id="contacto" className="py-24 px-6">
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="w-16 h-16 bg-[#00C8E8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#00C8E8]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">¡Mensaje enviado!</h3>
          <p className="text-white/50">
            Gracias <span className="text-[#00C8E8]">{form.nombre}</span>. Te respondo a la brevedad.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#00C8E8] text-sm font-semibold uppercase tracking-widest mb-3">Trabajemos juntos</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Tenés un proyecto<br />en mente?
          </h2>
          <p className="text-white/50">Contame qué querés automatizar o construir. Te respondo rápido.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1e35]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 flex flex-col gap-5"
        >
          {/* Nombre + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Nombre *</label>
              <input
                type="text"
                placeholder="Santiago"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00C8E8]/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Email *</label>
              <input
                type="email"
                placeholder="vos@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00C8E8]/50 transition-colors"
              />
            </div>
          </div>

          {/* Tipo de mensaje */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm">¿Cómo querés escribirnos? *</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setInputMode("text")}
                className={`rounded-xl py-2.5 px-4 text-sm font-semibold transition-all border ${
                  inputMode === "text"
                    ? "bg-[#00C8E8]/15 border-[#00C8E8]/50 text-[#00C8E8]"
                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                ✍️ Escribir mensaje
              </button>
              <button
                type="button"
                onClick={() => setInputMode("audio")}
                className={`rounded-xl py-2.5 px-4 text-sm font-semibold transition-all border ${
                  inputMode === "audio"
                    ? "bg-[#00C8E8]/15 border-[#00C8E8]/50 text-[#00C8E8]"
                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                🎙️ Mandar audio
              </button>
            </div>
          </div>

          {/* Mensaje o Audio */}
          {inputMode === "text" ? (
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Tu mensaje</label>
              <textarea
                rows={4}
                placeholder="Contame qué proceso querés automatizar, qué sistema necesitás, o cualquier duda que tengas..."
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00C8E8]/50 transition-colors resize-none"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-sm">Mensaje de voz</label>
              <div className="border border-white/10 rounded-xl p-5 bg-white/5">
                <AudioRecorder onAudioReady={(blob) => setForm({ ...form, audio: blob })} />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00C8E8] hover:bg-[#00b8d4] disabled:opacity-50 text-[#0a1628] font-bold py-3.5 rounded-xl transition-colors mt-1"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                Enviando...
              </span>
            ) : (
              "Enviar consulta"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
