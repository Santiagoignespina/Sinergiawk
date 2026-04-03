"use client";
import { useState } from "react";

const screens = ["Flujo n8n", "WhatsApp", "Google"] as const;
type Screen = (typeof screens)[number];

const N8N_BG    = "#111118";
const N8N_BORDER= "#2e2e42";
const ORANGE    = "#ff6d3f";

const mensajeWP = `👋 Hola Valentina, espero que este todo bien con la instalación de tus brackets!.

Si quedaste conforme con nuestra atención te pedimos que nos dejes un comentario positivo con 5 estrellas aca:

https://acortar.link/goEpCk

Y cuánto más nos recomendas, más ahorras. No hay tope 🥳

Si recomendas a alguien, y se instala con nosotros, TE REGALAMOS un control.

Muchas gracias!! 😊`;

export default function CalificacionDemo() {
  const [screen, setScreen] = useState<Screen>("Flujo n8n");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none"
      style={{ fontSize:9, background:N8N_BG, color:"#e0e0e0" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0 border-b"
        style={{ borderColor:N8N_BORDER, background:"#0c0c14" }}>
        <div className="flex items-center gap-1.5 font-bold" style={{ fontSize:10 }}>
          <span style={{ color:ORANGE }}>n8n</span>
          <span className="text-white/30">|</span>
          <span className="text-white/70 font-normal" style={{ fontSize:8 }}>Solicitud de reseña Google</span>
        </div>
        <div className="flex gap-1">
          {screens.map(s => (
            <button key={s} onClick={() => setScreen(s)}
              className="px-2 py-0.5 rounded font-semibold transition-colors"
              style={{ fontSize:7, background:screen===s ? ORANGE : "transparent", color:screen===s ? "white" : "#666" }}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1" style={{ fontSize:7, color:"#4ade80" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Activo
        </div>
      </div>

      {/* ── FLUJO N8N ── */}
      {screen === "Flujo n8n" && (
        <div className="flex-1 overflow-auto relative" style={{ background:"#111118" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/n8n-clasificacion-google.png"
            alt="Flujo n8n"
            style={{ width:"160%", imageRendering:"crisp-edges" }}
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{ background:"#0c0c14cc", fontSize:7, color:"#4ade80", backdropFilter:"blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Ejecuta automáticamente cada tarde
          </div>
        </div>
      )}

      {/* ── WHATSAPP ── */}
      {screen === "WhatsApp" && (
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"#0d1418" }}>
          <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ background:"#202c33" }}>
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shrink-0" style={{ fontSize:9 }}>🏥</div>
            <div>
              <div className="font-semibold text-white" style={{ fontSize:8.5 }}>Clínica</div>
              <div className="text-green-400" style={{ fontSize:6.5 }}>en línea</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
            style={{ background:"#0b141a", backgroundImage:"radial-gradient(circle,#ffffff08 1px,transparent 1px)", backgroundSize:"20px 20px" }}>
            <div className="flex justify-center">
              <span className="px-2 py-0.5 rounded-full text-white/60" style={{ fontSize:6.5, background:"#1f2c34" }}>Hoy</span>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-2.5 py-2 relative" style={{ background:"#005c4b" }}>
                <div className="text-white leading-relaxed whitespace-pre-line" style={{ fontSize:7.5 }}>{mensajeWP}</div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-white/50" style={{ fontSize:6 }}>1:55</span>
                  <span style={{ fontSize:8, color:"#53bdeb" }}>✓✓</span>
                </div>
                <div className="absolute -right-1.5 top-0 w-0 h-0"
                  style={{ borderLeft:"6px solid #005c4b", borderBottom:"6px solid transparent" }} />
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[60%] rounded-lg px-2.5 py-2 relative" style={{ background:"#1f2c34" }}>
                <div className="text-white" style={{ fontSize:7.5 }}>Ya lo dejé! Gracias 😊⭐⭐⭐⭐⭐</div>
                <div className="text-white/40 text-right mt-0.5" style={{ fontSize:6 }}>2:10</div>
                <div className="absolute -left-1.5 top-0 w-0 h-0"
                  style={{ borderRight:"6px solid #1f2c34", borderBottom:"6px solid transparent" }} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ background:"#202c33" }}>
            <div className="flex-1 rounded-full px-3 py-1 text-white/30" style={{ fontSize:7.5, background:"#2a3942" }}>
              Escribe un mensaje
            </div>
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center" style={{ fontSize:10 }}>🎤</div>
          </div>
        </div>
      )}

      {/* ── GOOGLE ── */}
      {screen === "Google" && (
        <div className="flex-1 overflow-y-auto flex flex-col" style={{ background:"#202124", color:"#e8eaed" }}>
          {/* Search bar */}
          <div className="px-3 py-2 shrink-0 flex items-center gap-2" style={{ background:"#303134" }}>
            <div className="flex-1 rounded-full px-3 py-1 flex items-center gap-1.5" style={{ background:"#202124", fontSize:7.5, color:"#9aa0a6" }}>
              <span style={{ fontSize:9 }}>🔍</span> Clínica Opiniones
            </div>
          </div>

          {/* Business card */}
          <div className="mx-3 my-2 rounded-xl overflow-hidden shrink-0" style={{ background:"#303134" }}>
            {/* Map placeholder */}
            <div className="h-16 flex items-center justify-center" style={{ background:"#3c4043" }}>
              <span style={{ fontSize:7, color:"#9aa0a6" }}>📍 Ver en mapa</span>
            </div>
            <div className="px-3 py-2">
              <div className="font-bold" style={{ fontSize:11 }}>Clínica</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span style={{ fontSize:9, color:"#fbbc04" }}>★★★★★</span>
                <span style={{ fontSize:7.5, color:"#fbbc04" }}>4,7</span>
                <span style={{ fontSize:7, color:"#9aa0a6" }}>(312 opiniones)</span>
              </div>
              <div style={{ fontSize:7, color:"#9aa0a6", marginTop:2 }}>Clínica odontológica · Abre a las 9:00</div>
              <div className="flex gap-2 mt-2">
                {["Reseñas","Fotos","Cómo llegar"].map(a => (
                  <div key={a} className="flex-1 text-center rounded py-1 font-medium" style={{ fontSize:6.5, background:"#3c4043", color:"#8ab4f8" }}>{a}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className="px-3 pb-3 flex flex-col gap-2">
            <div style={{ fontSize:8, color:"#9aa0a6" }}>Opiniones recientes</div>

            {/* New review — highlighted */}
            <div className="rounded-xl p-2.5" style={{ background:"#303134", border:"1px solid #fbbc0440" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ fontSize:7, background:"#4285f4" }}>V</div>
                <div>
                  <div className="font-semibold" style={{ fontSize:7.5 }}>Valentina G.</div>
                  <div style={{ fontSize:6, color:"#9aa0a6" }}>hace un momento</div>
                </div>
                <div className="ml-auto" style={{ fontSize:8, color:"#fbbc04" }}>★★★★★</div>
              </div>
              <div style={{ fontSize:7.5, lineHeight:1.5 }}>
                Excelente atención! El personal muy amable y profesional. Lo recomiendo totalmente 😊
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded inline-block" style={{ fontSize:6, background:"#fbbc0420", color:"#fbbc04" }}>
                ✦ Nueva reseña generada por automatización
              </div>
            </div>

            {/* Existing reviews */}
            {[
              { name:"Carlos M.", initial:"C", color:"#34a853", texto:"Muy buen servicio, cumplen con los horarios y el trato es excelente.", time:"hace 2 días" },
              { name:"Laura P.",  initial:"L", color:"#ea4335", texto:"Super recomendable, la atención fue muy buena desde el primer momento.", time:"hace 1 semana" },
            ].map(r => (
              <div key={r.name} className="rounded-xl p-2.5" style={{ background:"#303134" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-white shrink-0" style={{ fontSize:7, background:r.color }}>{r.initial}</div>
                  <div>
                    <div className="font-semibold" style={{ fontSize:7.5 }}>{r.name}</div>
                    <div style={{ fontSize:6, color:"#9aa0a6" }}>{r.time}</div>
                  </div>
                  <div className="ml-auto" style={{ fontSize:8, color:"#fbbc04" }}>★★★★★</div>
                </div>
                <div style={{ fontSize:7.5, lineHeight:1.5 }}>{r.texto}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
