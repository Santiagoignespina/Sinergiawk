"use client";
import { useState } from "react";

const screens = ["Flujo n8n", "Datos"] as const;
type Screen = (typeof screens)[number];

const N8N_BG     = "#111118";
const N8N_BORDER = "#2e2e42";
const ORANGE     = "#ff6d3f";

const filas = [
  { fecha:"2026-04-03", paciente:"Belkys Sánchez",    estudio:"Arco Niti",        monto:"$51.333", metodo:"Tarjeta", profesional:"Dra. López",   sucursal:"Morón"    },
  { fecha:"2026-04-03", paciente:"Yazmin Cuello",      estudio:"Control de corp.", monto:"$18.000", metodo:"Efectivo",profesional:"Dr. Méndez",   sucursal:"Rivadavia"},
  { fecha:"2026-04-03", paciente:"Valentina Scutella", estudio:"Arco Niti",        monto:"$51.333", metodo:"Tarjeta", profesional:"Dra. López",   sucursal:"San Martín"},
  { fecha:"2026-04-03", paciente:"Camila Silveira",    estudio:"Arco Niti",        monto:"$51.333", metodo:"Débito",  profesional:"Dr. Méndez",   sucursal:"Morón"    },
  { fecha:"2026-04-03", paciente:"Silvana Borda",      estudio:"Limpieza",         monto:"$22.000", metodo:"Efectivo",profesional:"Dra. Reyes",   sucursal:"Rivadavia"},
  { fecha:"2026-04-03", paciente:"Belen Repetto",      estudio:"Bracket Metálico", monto:"$154.000",metodo:"Tarjeta", profesional:"Dr. Méndez",   sucursal:"Morón"    },
  { fecha:"2026-04-03", paciente:"Martina Rodriguez",  estudio:"Arco Acero",       monto:"$38.500", metodo:"Efectivo",profesional:"Dra. López",   sucursal:"San Martín"},
];

export default function InformacionHoraDemo() {
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
          <span className="text-white/70 font-normal" style={{ fontSize:8 }}>Extracción de datos en tiempo real</span>
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
            src="/n8n-informacion-hora.png"
            alt="Flujo n8n"
            style={{ width:"160%", imageRendering:"crisp-edges" }}
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{ background:"#0c0c14cc", fontSize:7, color:"#4ade80", backdropFilter:"blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Sincroniza cada 30 min (9:00–20:00)
          </div>
        </div>
      )}

      {/* ── DATOS ── */}
      {screen === "Datos" && (
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"#1c1c1c" }}>
          {/* Supabase-style top bar */}
          <div className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#171717" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{ background:"#3ecf8e" }} />
              <span className="font-semibold text-white" style={{ fontSize:7.5 }}>informes_diarios</span>
            </div>
            <span className="text-white/30" style={{ fontSize:6.5 }}>·</span>
            <span style={{ fontSize:6.5, color:"#3ecf8e" }}>53.0K registros</span>
            <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background:"#3ecf8e18", fontSize:6.5, color:"#3ecf8e" }}>
              <span className="w-1 h-1 rounded-full bg-green-400 inline-block" />
              Realtime activo
            </div>
          </div>

          {/* Columnas */}
          <div className="flex shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
            {["fecha","paciente","estudio","monto","método","profesional","sucursal"].map(c => (
              <div key={c} className="px-2 py-1 font-semibold uppercase text-white/40 truncate"
                style={{ fontSize:5.5, width: c==="paciente"||c==="profesional" ? 72 : c==="estudio" ? 68 : c==="sucursal" ? 52 : 44, flexShrink:0 }}>
                {c}
              </div>
            ))}
          </div>

          {/* Filas */}
          <div className="flex-1 overflow-y-auto">
            {filas.map((f, i) => (
              <div key={i} className="flex border-b hover:bg-white/5 transition-colors"
                style={{ borderColor:"#232323" }}>
                <div className="px-2 py-1.5 text-white/50 truncate shrink-0" style={{ fontSize:6.5, width:44 }}>{f.fecha.slice(5)}</div>
                <div className="px-2 py-1.5 text-white truncate shrink-0" style={{ fontSize:6.5, width:72 }}>{f.paciente}</div>
                <div className="px-2 py-1.5 text-white/70 truncate shrink-0" style={{ fontSize:6.5, width:68 }}>{f.estudio}</div>
                <div className="px-2 py-1.5 font-semibold shrink-0" style={{ fontSize:6.5, width:44, color:"#3ecf8e" }}>{f.monto}</div>
                <div className="px-2 py-1.5 text-white/50 truncate shrink-0" style={{ fontSize:6.5, width:44 }}>{f.metodo}</div>
                <div className="px-2 py-1.5 text-white/70 truncate shrink-0" style={{ fontSize:6.5, width:72 }}>{f.profesional}</div>
                <div className="px-2 py-1.5 text-white/50 truncate shrink-0" style={{ fontSize:6.5, width:52 }}>{f.sucursal}</div>
              </div>
            ))}
            <div className="px-3 py-2 text-white/20 text-center" style={{ fontSize:6.5 }}>
              ··· 52.993 registros más
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-1 shrink-0 border-t" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
            <span style={{ fontSize:6, color:"#ffffff30" }}>Página 1 de 530 · 100 filas</span>
            <span style={{ fontSize:6, color:"#3ecf8e" }}>Última sync: hace 4 min</span>
          </div>
        </div>
      )}
    </div>
  );
}
