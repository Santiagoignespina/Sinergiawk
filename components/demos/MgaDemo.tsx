"use client";
import { useState } from "react";

const NAVY = "#123b52";
const TEAL = "#0c6b6e";

const pantallas = ["Escáner", "Mi lista", "Seguimiento"] as const;
type Pantalla = (typeof pantallas)[number];

const MODOS = [
  { id: "tengo", label: "Lo tengo", color: "#0c6b6e" },
  { id: "reparto", label: "A reparto", color: "#2563eb" },
  { id: "entregado", label: "Entregado", color: "#16a34a" },
  { id: "ausente", label: "No estaba", color: "#d97706" },
] as const;

const CODIGOS = ["10023456781", "10023456782", "10023456783", "10023456784"];

type Escaneo = { codigo: string; modo: string; color: string; hora: string };

const ESCANEOS_INICIALES: Escaneo[] = [
  { codigo: "10023456779", modo: "Entregado", color: "#16a34a", hora: "14:32" },
  { codigo: "10023456778", modo: "No estaba", color: "#d97706", hora: "14:18" },
];

const PAQUETES = [
  { id: "10023456782", destino: "Av. Mitre 1240", barrio: "Centro", metros: 420 },
  { id: "10023456783", destino: "San Lorenzo 880", barrio: "Centro", metros: 1100 },
  { id: "10023456784", destino: "Belgrano 2150", barrio: "Norte", metros: 2300 },
];

const TIMELINE = [
  { estado: "Ingresado al depósito", hora: "Hoy 09:12", quien: "Depósito", ok: true },
  { estado: "En camino con el repartidor", hora: "Hoy 13:40", quien: "Martín", ok: true },
  { estado: "Entregado", hora: "Hoy 14:32", quien: "Martín · Av. Mitre 1240", ok: true },
];

export default function MgaDemo() {
  const [pantalla, setPantalla] = useState<Pantalla>("Escáner");
  const [escaneos, setEscaneos] = useState<Escaneo[]>(ESCANEOS_INICIALES);
  const [indice, setIndice] = useState(0);
  const [entregados, setEntregados] = useState<string[]>([]);

  const escanear = (modo: string, color: string) => {
    const codigo = CODIGOS[indice % CODIGOS.length];
    const minutos = 35 + indice;
    setEscaneos((prev) => [{ codigo, modo, color, hora: `14:${minutos}` }, ...prev].slice(0, 4));
    setIndice((i) => i + 1);
  };

  const pendientes = PAQUETES.filter((p) => !entregados.includes(p.id));

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none" style={{ background: "#f4f7f9", fontSize: 9 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0 text-white" style={{ background: NAVY }}>
        <div className="font-bold flex items-center gap-1" style={{ fontSize: 11 }}>
          <span>🚚</span>
          <span>Logística</span>
        </div>
        <div className="flex gap-1">
          {pantallas.map((p) => (
            <button
              key={p}
              onClick={() => setPantalla(p)}
              className="px-2 py-0.5 rounded font-semibold transition-colors"
              style={{
                fontSize: 7,
                background: pantalla === p ? "white" : "transparent",
                color: pantalla === p ? NAVY : "rgba(255,255,255,0.75)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 text-white/75" style={{ fontSize: 7 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          GPS
        </div>
      </div>

      {/* ── ESCÁNER ── */}
      {pantalla === "Escáner" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden">
          <div className="relative rounded-lg overflow-hidden shrink-0" style={{ background: "#0b1720", height: 54 }}>
            <div className="absolute inset-x-6 inset-y-3 border-2 rounded" style={{ borderColor: "rgba(255,255,255,0.35)" }} />
            <div className="absolute inset-x-8 top-1/2 h-px" style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee" }} />
            <div className="absolute inset-0 flex items-end justify-center pb-1 text-white/70" style={{ fontSize: 7 }}>
              Apuntá a la etiqueta
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1 shrink-0">
            {MODOS.map((m) => (
              <button
                key={m.id}
                onClick={() => escanear(m.label, m.color)}
                className="rounded py-1 font-bold text-white"
                style={{ fontSize: 7, background: m.color }}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden bg-white rounded-lg border border-gray-200">
            <div className="px-2 py-1 border-b border-gray-100 font-semibold text-gray-500" style={{ fontSize: 7 }}>
              ÚLTIMOS ESCANEOS
            </div>
            {escaneos.map((e, i) => (
              <div key={`${e.codigo}-${i}`} className="flex items-center justify-between px-2 py-1 border-b border-gray-50 last:border-0">
                <span className="font-mono text-gray-700" style={{ fontSize: 8 }}>
                  {e.codigo}
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-full font-semibold text-white" style={{ fontSize: 6, background: e.color }}>
                    {e.modo}
                  </span>
                  <span className="text-gray-400" style={{ fontSize: 7 }}>
                    {e.hora}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MI LISTA ── */}
      {pantalla === "Mi lista" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden">
          {pendientes[0] && (
            <div className="rounded-lg px-2 py-1.5 text-white shrink-0" style={{ background: TEAL }}>
              <div className="font-bold" style={{ fontSize: 7 }}>
                EL MÁS CERCA TUYO · {pendientes[0].metros} m
              </div>
              <div style={{ fontSize: 9 }}>{pendientes[0].destino}</div>
            </div>
          )}

          <div className="flex-1 overflow-hidden bg-white rounded-lg border border-gray-200">
            {pendientes.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-2 py-1.5 border-b border-gray-50 last:border-0">
                <div className="min-w-0">
                  <div className="text-gray-800 truncate" style={{ fontSize: 8 }}>
                    {p.destino}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: 7 }}>
                    {p.barrio} · {p.id}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => setEntregados((e) => [...e, p.id])}
                    className="rounded px-2 py-1 font-bold text-white"
                    style={{ fontSize: 7, background: "#16a34a" }}
                  >
                    Entregado
                  </button>
                  <button
                    onClick={() => setEntregados((e) => [...e, p.id])}
                    className="rounded px-2 py-1 font-bold text-white"
                    style={{ fontSize: 7, background: "#d97706" }}
                  >
                    No estaba
                  </button>
                </div>
              </div>
            ))}
            {pendientes.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-0.5">
                <span style={{ fontSize: 14 }}>✅</span>
                <span style={{ fontSize: 8 }}>Repartiste todo</span>
                <button onClick={() => setEntregados([])} className="underline" style={{ fontSize: 7 }}>
                  Reiniciar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SEGUIMIENTO (lo que ve el cliente final) ── */}
      {pantalla === "Seguimiento" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden">
          <div className="bg-white rounded-lg border border-gray-200 px-2 py-1.5 shrink-0">
            <div className="text-gray-400" style={{ fontSize: 7 }}>
              PAQUETE
            </div>
            <div className="font-mono text-gray-800" style={{ fontSize: 9 }}>
              10023456779
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-2 overflow-hidden">
            {TIMELINE.map((t, i) => (
              <div key={t.estado} className="flex gap-1.5">
                <div className="flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full mt-0.5" style={{ background: t.ok ? "#16a34a" : "#cbd5e1" }} />
                  {i < TIMELINE.length - 1 && <span className="w-px flex-1" style={{ background: "#e2e8f0" }} />}
                </div>
                <div className="pb-2">
                  <div className="text-gray-800 font-semibold" style={{ fontSize: 8 }}>
                    {t.estado}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: 7 }}>
                    {t.hora} · {t.quien}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center text-gray-400" style={{ fontSize: 7 }}>
              El cliente final lo ve por un link, sin instalar nada
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
