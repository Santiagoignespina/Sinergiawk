"use client";
import { useState } from "react";

const screens = ["Flujo n8n", "Datos"] as const;
type Screen = (typeof screens)[number];

const N8N_BG     = "#111118";
const N8N_BORDER = "#2e2e42";
const ORANGE     = "#ff6d3f";

const filas = [
  { fecha:"2026-03-31", profesional:"Dra. López",   paciente:"Valentina Scutella", estudio:"Arco Niti",        cantidad:1 },
  { fecha:"2026-03-31", profesional:"Dr. Méndez",   paciente:"Belen Repetto",      estudio:"Bracket Metálico", cantidad:1 },
  { fecha:"2026-04-01", profesional:"Dra. López",   paciente:"Camila Silveira",    estudio:"Arco Niti",        cantidad:1 },
  { fecha:"2026-04-01", profesional:"Dra. Reyes",   paciente:"Silvana Borda",      estudio:"Limpieza",         cantidad:1 },
  { fecha:"2026-04-02", profesional:"Dr. Méndez",   paciente:"Javier Amarilla",    estudio:"Arco Niti",        cantidad:1 },
  { fecha:"2026-04-02", profesional:"Dra. Herrera", paciente:"Lucia Campanella",   estudio:"Control porcel.",  cantidad:1 },
  { fecha:"2026-04-03", profesional:"Dra. López",   paciente:"Martina Rodriguez",  estudio:"Arco Acero",       cantidad:1 },
  { fecha:"2026-04-03", profesional:"Dr. Méndez",   paciente:"Belkys Sánchez",     estudio:"Arco Niti",        cantidad:1 },
  { fecha:"2026-04-04", profesional:"Dra. Reyes",   paciente:"Nicole Suilar",      estudio:"Limpieza",         cantidad:1 },
  { fecha:"2026-04-04", profesional:"Dra. Herrera", paciente:"Eliel Noir",         estudio:"RX Panorámica",    cantidad:1 },
];

const resumen = [
  { profesional:"Dra. López",   total:3 },
  { profesional:"Dr. Méndez",   total:3 },
  { profesional:"Dra. Reyes",   total:2 },
  { profesional:"Dra. Herrera", total:2 },
];

export default function PacientesProfesionalDemo() {
  const [screen, setScreen] = useState<Screen>("Flujo n8n");
  const [vista, setVista] = useState<"detalle"|"resumen">("resumen");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none"
      style={{ fontSize:9, background:N8N_BG, color:"#e0e0e0" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0 border-b"
        style={{ borderColor:N8N_BORDER, background:"#0c0c14" }}>
        <div className="flex items-center gap-1.5 font-bold" style={{ fontSize:10 }}>
          <span style={{ color:ORANGE }}>n8n</span>
          <span className="text-white/30">|</span>
          <span className="text-white/70 font-normal" style={{ fontSize:8 }}>Pacientes por profesional — semanal</span>
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
            src="/n8n-pacientes-por-profesional.png"
            alt="Flujo n8n"
            style={{ width:"160%", imageRendering:"crisp-edges" }}
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{ background:"#0c0c14cc", fontSize:7, color:"#4ade80", backdropFilter:"blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Ejecuta todos los lunes a las 8:00
          </div>
        </div>
      )}

      {/* ── DATOS ── */}
      {screen === "Datos" && (
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"#1c1c1c" }}>
          {/* Top bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#171717" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{ background:"#3ecf8e" }} />
              <span className="font-semibold text-white" style={{ fontSize:7.5 }}>semanal</span>
            </div>
            <span className="text-white/30" style={{ fontSize:6.5 }}>·</span>
            <span style={{ fontSize:6.5, color:"#3ecf8e" }}>sem. 31/3 – 5/4</span>
            {/* Vista toggle */}
            <div className="ml-auto flex gap-1">
              {(["resumen","detalle"] as const).map(v => (
                <button key={v} onClick={() => setVista(v)}
                  className="px-1.5 py-0.5 rounded capitalize"
                  style={{ fontSize:6, background: vista===v ? ORANGE : "#2e2e2e", color: vista===v ? "white" : "#999" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {vista === "resumen" ? (
            /* ── Resumen por profesional ── */
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
              <div style={{ fontSize:6.5, color:"#ffffff40" }} className="mb-1">Pacientes atendidos esta semana</div>
              {resumen.map((r, i) => {
                const pct = Math.round((r.total / 4) * 100);
                const initials = r.profesional.split(" ").map(w => w[0]).join("").slice(0,2);
                const colors = ["#3b82f6","#8b5cf6","#10b981","#f59e0b"];
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                      style={{ fontSize:6.5, background:colors[i] }}>{initials}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span style={{ fontSize:7.5, color:"#e0e0e0" }}>{r.profesional}</span>
                        <span className="font-bold" style={{ fontSize:7.5, color:"#3ecf8e" }}>{r.total} pac.</span>
                      </div>
                      <div className="w-full rounded-full overflow-hidden" style={{ height:4, background:"#2e2e2e" }}>
                        <div className="h-full rounded-full" style={{ width:`${pct}%`, background:colors[i] }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between mt-2 pt-2 border-t" style={{ borderColor:"#2e2e2e" }}>
                <span style={{ fontSize:6.5, color:"#ffffff40" }}>Total semana</span>
                <span className="font-bold" style={{ fontSize:7.5, color:"#3ecf8e" }}>10 pacientes</span>
              </div>
            </div>
          ) : (
            /* ── Detalle fila por fila ── */
            <>
              <div className="flex shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
                {["fecha","profesional","paciente","estudio","cant."].map(c => (
                  <div key={c} className="px-2 py-1 font-semibold uppercase text-white/40 truncate"
                    style={{ fontSize:5.5, width: c==="profesional"||c==="paciente" ? 68 : c==="estudio" ? 72 : 36, flexShrink:0 }}>
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto">
                {filas.map((f, i) => (
                  <div key={i} className="flex border-b hover:bg-white/5 transition-colors" style={{ borderColor:"#232323" }}>
                    <div className="px-2 py-1.5 text-white/50 shrink-0" style={{ fontSize:6.5, width:36 }}>{f.fecha.slice(5)}</div>
                    <div className="px-2 py-1.5 text-white truncate shrink-0" style={{ fontSize:6.5, width:68 }}>{f.profesional}</div>
                    <div className="px-2 py-1.5 text-white/70 truncate shrink-0" style={{ fontSize:6.5, width:68 }}>{f.paciente}</div>
                    <div className="px-2 py-1.5 text-white/60 truncate shrink-0" style={{ fontSize:6.5, width:72 }}>{f.estudio}</div>
                    <div className="px-2 py-1.5 text-center text-white/50 shrink-0" style={{ fontSize:6.5, width:36 }}>{f.cantidad}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="px-3 py-1 shrink-0 border-t flex items-center justify-between" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
            <span style={{ fontSize:6, color:"#ffffff30" }}>tabla: semanal · Supabase</span>
            <span style={{ fontSize:6, color:"#3ecf8e" }}>Última sync: lunes 07/04 · 08:02</span>
          </div>
        </div>
      )}
    </div>
  );
}
