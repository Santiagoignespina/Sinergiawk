"use client";
import { useState } from "react";

const screens = ["Flujo n8n", "Chats", "Análisis"] as const;
type Screen = (typeof screens)[number];

const N8N_BG     = "#111118";
const N8N_BORDER = "#2e2e42";
const ORANGE     = "#ff6d3f";

const chats = [
  { fecha:"04/04 09:12", quien:"Paciente",  celular:"5491140…", mensaje:"Hola! quería consultar por el precio de los brackets" },
  { fecha:"04/04 09:13", quien:"Empresa",   celular:"5491170…", mensaje:"Hola! Los brackets metálicos arrancan en $51.333 por cuo…" },
  { fecha:"04/04 09:15", quien:"Paciente",  celular:"5491140…", mensaje:"Genial, ¿tienen turno mañana a la mañana?" },
  { fecha:"04/04 09:16", quien:"Empresa",   celular:"5491170…", mensaje:"Sí, tenemos disponibilidad a las 10:00 hs 😊" },
  { fecha:"04/04 09:17", quien:"Paciente",  celular:"5491140…", mensaje:"Perfecto! Me agendo" },
  { fecha:"04/04 11:30", quien:"Paciente",  celular:"5491155…", mensaje:"Buenos días, necesito cancelar mi turno de hoy" },
  { fecha:"04/04 11:31", quien:"Empresa",   celular:"5491170…", mensaje:"Claro! Queda cancelado. ¿Querés reprogramar?" },
  { fecha:"04/04 14:05", quien:"Paciente",  celular:"5491162…", mensaje:"Hola cuánto sale la limpieza dental?" },
];

const dias = [
  { dia:"Lun",  consultas:18, agendados:11 },
  { dia:"Mar",  consultas:22, agendados:14 },
  { dia:"Mié",  consultas:15, agendados: 9 },
  { dia:"Jue",  consultas:27, agendados:18 },
  { dia:"Vie",  consultas:31, agendados:20 },
  { dia:"Sáb",  consultas:12, agendados: 7 },
];
const maxConsultas = Math.max(...dias.map(d => d.consultas));

export default function RecopilacionChatsDemo() {
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
          <span className="text-white/70 font-normal" style={{ fontSize:8 }}>Recopilación chats WhatsApp</span>
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
          En vivo
        </div>
      </div>

      {/* ── FLUJO N8N ── */}
      {screen === "Flujo n8n" && (
        <div className="flex-1 overflow-auto relative" style={{ background:"#111118" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/n8n-recopilaciondatos-whatsapp.png"
            alt="Flujo n8n"
            style={{ width:"160%", imageRendering:"crisp-edges" }}
          />
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded flex items-center gap-1"
            style={{ background:"#0c0c14cc", fontSize:7, color:"#4ade80", backdropFilter:"blur(4px)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Captura cada mensaje en tiempo real vía Webhook
          </div>
        </div>
      )}

      {/* ── CHATS ── */}
      {screen === "Chats" && (
        <div className="flex-1 overflow-hidden flex flex-col" style={{ background:"#1c1c1c" }}>
          <div className="flex items-center gap-2 px-3 py-1.5 shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#171717" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-sm" style={{ background:"#3ecf8e" }} />
              <span className="font-semibold text-white" style={{ fontSize:7.5 }}>chats_atencion_al_cliente</span>
            </div>
            <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background:"#3ecf8e18", fontSize:6.5, color:"#3ecf8e" }}>
              <span className="w-1 h-1 rounded-full bg-green-400 inline-block animate-pulse" />
              Tiempo real
            </div>
          </div>

          {/* Columnas */}
          <div className="flex shrink-0 border-b" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
            {["fecha","quién","celular","mensaje"].map(c => (
              <div key={c} className="px-2 py-1 font-semibold uppercase text-white/40 truncate"
                style={{ fontSize:5.5, width: c==="mensaje" ? 130 : c==="celular" ? 56 : c==="quién" ? 48 : 48, flexShrink:0 }}>
                {c}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((c, i) => (
              <div key={i} className="flex border-b hover:bg-white/5 transition-colors items-start" style={{ borderColor:"#232323" }}>
                <div className="px-2 py-1.5 text-white/40 shrink-0" style={{ fontSize:6, width:48 }}>{c.fecha}</div>
                <div className="px-2 py-1.5 shrink-0" style={{ fontSize:6.5, width:48 }}>
                  <span className="px-1 py-0.5 rounded" style={{
                    background: c.quien==="Empresa" ? "#005c4b40" : "#1f2c34",
                    color: c.quien==="Empresa" ? "#3ecf8e" : "#93c5fd"
                  }}>{c.quien}</span>
                </div>
                <div className="px-2 py-1.5 text-white/40 shrink-0 truncate" style={{ fontSize:6, width:56 }}>{c.celular}</div>
                <div className="px-2 py-1.5 text-white/70 truncate shrink-0" style={{ fontSize:6.5, width:130 }}>{c.mensaje}</div>
              </div>
            ))}
          </div>

          <div className="px-3 py-1 border-t flex justify-between shrink-0" style={{ borderColor:"#2e2e2e", background:"#141414" }}>
            <span style={{ fontSize:6, color:"#ffffff30" }}>Webhook activo · POST /Mr.Bracket</span>
            <span style={{ fontSize:6, color:"#3ecf8e" }}>+3 mensajes hoy</span>
          </div>
        </div>
      )}

      {/* ── ANÁLISIS ── */}
      {screen === "Análisis" && (
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3" style={{ background:"#111118" }}>
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label:"Consultas esta semana", value:"125",  sub:"↑ 12% vs semana ant.", color:"#3ecf8e" },
              { label:"Agendados",             value:"79",   sub:"63% conversión",       color:"#60a5fa" },
              { label:"Cancelaciones",         value:"14",   sub:"11% del total",        color:"#f87171" },
              { label:"Sin respuesta",         value:"32",   sub:"No agendaron",         color:"#fbbf24" },
            ].map(k => (
              <div key={k.label} className="rounded-lg p-2" style={{ background:"#1e1e2e", border:"1px solid #2e2e42" }}>
                <div style={{ fontSize:6.5, color:"#ffffff50" }} className="mb-0.5">{k.label}</div>
                <div className="font-bold" style={{ fontSize:16, color:k.color, lineHeight:1.2 }}>{k.value}</div>
                <div style={{ fontSize:6, color:"#ffffff30" }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Gráfico de barras */}
          <div className="rounded-lg p-2.5" style={{ background:"#1e1e2e", border:"1px solid #2e2e42" }}>
            <div className="font-semibold mb-2" style={{ fontSize:7.5, color:"#e0e0e0" }}>Consultas diarias — semana actual</div>
            <div className="flex items-end gap-1.5" style={{ height:52 }}>
              {dias.map(d => (
                <div key={d.dia} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex flex-col justify-end gap-px" style={{ height:44 }}>
                    {/* Barra agendados */}
                    <div className="w-full rounded-sm"
                      style={{ height:`${Math.round((d.agendados / maxConsultas) * 44)}px`, background:"#3b82f6" }} />
                    {/* Barra restante (no agendaron) */}
                    <div className="w-full rounded-sm"
                      style={{ height:`${Math.round(((d.consultas - d.agendados) / maxConsultas) * 44)}px`, background:"#2e2e42" }} />
                  </div>
                  <div style={{ fontSize:5.5, color:"#ffffff40" }}>{d.dia}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1"><div className="w-2 h-1.5 rounded-sm" style={{ background:"#3b82f6" }} /><span style={{ fontSize:6, color:"#ffffff50" }}>Agendados</span></div>
              <div className="flex items-center gap-1"><div className="w-2 h-1.5 rounded-sm" style={{ background:"#2e2e42" }} /><span style={{ fontSize:6, color:"#ffffff50" }}>No agendaron</span></div>
            </div>
          </div>

          {/* Top motivos */}
          <div className="rounded-lg p-2.5" style={{ background:"#1e1e2e", border:"1px solid #2e2e42" }}>
            <div className="font-semibold mb-2" style={{ fontSize:7.5, color:"#e0e0e0" }}>Top motivos de consulta</div>
            {[
              { motivo:"Precio / presupuesto", pct:38, color:"#8b5cf6" },
              { motivo:"Turno / disponibilidad", pct:31, color:"#3ecf8e" },
              { motivo:"Reprogramación",         pct:17, color:"#fbbf24" },
              { motivo:"Cancelación",            pct:14, color:"#f87171" },
            ].map(m => (
              <div key={m.motivo} className="flex items-center gap-2 mb-1.5">
                <div style={{ fontSize:7, color:"#ffffff60", width:90, flexShrink:0 }}>{m.motivo}</div>
                <div className="flex-1 rounded-full overflow-hidden" style={{ height:5, background:"#2e2e42" }}>
                  <div className="h-full rounded-full" style={{ width:`${m.pct}%`, background:m.color }} />
                </div>
                <div style={{ fontSize:6.5, color:"#ffffff40", width:20, textAlign:"right" }}>{m.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
