"use client";
import { useState } from "react";

const screens = ["Flujo n8n", "WhatsApp"] as const;
type Screen = (typeof screens)[number];

const N8N_BG    = "#111118";
const N8N_CARD  = "#1e1e2e";
const N8N_BORDER= "#2e2e42";
const ORANGE    = "#ff6d3f";


const mensajeWP = `👋 Hola Quimey,

Te recordamos que tenés un turno agendado en la clínica 🦷
📍 Sucursal: Olazabal 3055
📅 Día y Hora: lunes 6 de abril a las 11:00 h

Si necesitás reprogramar o cancelar, respondé a este mensaje y te ayudamos 😊`;


export default function RecordatorioDemo() {
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
          <span className="text-white/70 font-normal" style={{ fontSize:8 }}>Recordatorio de turnos</span>
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
            src="/n8n-recordatorio.png"
            alt="Flujo n8n"
            style={{ width:"160%", imageRendering:"crisp-edges" }}
          />
          {/* Badge sobre la imagen */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{ background:"#0c0c14cc", fontSize:7, color:"#4ade80", backdropFilter:"blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Ejecuta automáticamente cada mañana
          </div>
        </div>
      )}

      {/* ── WHATSAPP ── */}
      {screen === "WhatsApp" && (
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"#0d1418" }}>
          <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ background:"#202c33" }}>
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shrink-0" style={{ fontSize:9 }}>🦷</div>
            <div>
              <div className="font-semibold text-white" style={{ fontSize:8.5 }}>Clínica</div>
              <div className="text-green-400" style={{ fontSize:6.5 }}>en línea</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col justify-end gap-2"
            style={{ background:"#0b141a", backgroundImage:"radial-gradient(circle,#ffffff08 1px,transparent 1px)", backgroundSize:"20px 20px" }}>
            <div className="flex justify-center">
              <span className="px-2 py-0.5 rounded-full text-white/60" style={{ fontSize:6.5, background:"#1f2c34" }}>Hoy</span>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg px-2.5 py-2 relative" style={{ background:"#005c4b" }}>
                <div className="text-white leading-relaxed whitespace-pre-line" style={{ fontSize:7.5 }}>{mensajeWP}</div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-white/50" style={{ fontSize:6 }}>1:31</span>
                  <span style={{ fontSize:8, color:"#53bdeb" }}>✓✓</span>
                </div>
                <div className="absolute -right-1.5 top-0 w-0 h-0"
                  style={{ borderLeft:"6px solid #005c4b", borderBottom:"6px solid transparent" }} />
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[60%] rounded-lg px-2.5 py-2 relative" style={{ background:"#1f2c34" }}>
                <div className="text-white" style={{ fontSize:7.5 }}>Muchas gracias! Ahí estaré 😊</div>
                <div className="text-white/40 text-right mt-0.5" style={{ fontSize:6 }}>1:45</div>
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
    </div>
  );
}
