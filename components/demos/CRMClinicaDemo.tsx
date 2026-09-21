"use client";
import { useState } from "react";

// Demo del CRM para clínica: se tiene que entender en 5 segundos qué hace.
// Tres pantallas que cuentan una historia: quién está en qué etapa → qué dice la IA de un paciente
// → qué mensajes salen solos. Nombres y datos inventados.

const AZUL = "#2563eb";
const AZUL_OSCURO = "#1e40af";

const pantallas = ["Pacientes", "Ficha", "Recordatorios"] as const;
type Pantalla = (typeof pantallas)[number];

type Etapa = "Nuevo" | "En tratamiento" | "Control";

const ETAPAS: Record<Etapa, string> = {
  Nuevo: "#3b82f6",
  "En tratamiento": "#f97316",
  Control: "#a855f7",
};

type Paciente = {
  nombre: string;
  motivo: string;
  etapa: Etapa;
  detalle: string;
  alerta?: boolean;
  resumen: string;
  paso: string;
  accion: string;
};

const PACIENTES: Paciente[] = [
  {
    nombre: "Juan Pérez", motivo: "Consulta por ortodoncia", etapa: "Nuevo", detalle: "Escribió hace 2 h por WhatsApp", alerta: true,
    resumen: "Preguntó cuánto sale la ortodoncia y si atienden con su obra social.",
    paso: "mandarle los precios y un turno de evaluación.", accion: "Mandar precios por WhatsApp",
  },
  {
    nombre: "María López", motivo: "Brackets · mes 6 de 18", etapa: "En tratamiento", detalle: "Control el viernes 10:00",
    resumen: "Le molesta un bracket de abajo desde el lunes. Preguntó si puede adelantar el control.",
    paso: "ofrecerle turno el miércoles.", accion: "Ofrecer turno por WhatsApp",
  },
  {
    nombre: "Diego Ruiz", motivo: "Blanqueamiento", etapa: "En tratamiento", detalle: "Falta pagar la 2.ª sesión", alerta: true,
    resumen: "Hizo la primera sesión el martes y quedó en pagar la segunda por transferencia.",
    paso: "recordarle el pago con el alias.", accion: "Mandar recordatorio de pago",
  },
  {
    nombre: "Luis Gómez", motivo: "Post implante", etapa: "Control", detalle: "Control en 30 días",
    resumen: "Dice que está bien y sin dolor desde la cirugía.",
    paso: "agendarle el control del mes que viene.", accion: "Agendar el control",
  },
];

const RECORDATORIOS = [
  { hora: "Hoy 09:00", texto: "Recordatorio del control de mañana", quien: "María López", estado: "Enviado" },
  { hora: "Hoy 09:00", texto: "Recordatorio del control de mañana", quien: "Carla Méndez", estado: "Confirmó" },
  { hora: "Hoy 18:00", texto: "¿Cómo te sentiste después del implante?", quien: "Luis Gómez", estado: "Programado" },
];

const COLOR_ESTADO: Record<string, string> = { Enviado: "#2563eb", Confirmó: "#16a34a", Programado: "#64748b" };

export default function CRMClinicaDemo() {
  const [pantalla, setPantalla] = useState<Pantalla>("Pacientes");
  const [elegido, setElegido] = useState(1); // la ficha arranca en María si se entra por la pestaña
  const [enviados, setEnviados] = useState<number[]>([]);
  const p = PACIENTES[elegido];
  const enviado = enviados.includes(elegido);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-white" style={{ fontSize: 9 }}>
      {/* Encabezado con las tres pantallas */}
      <div className="px-3 py-1.5 flex items-center justify-between text-white shrink-0" style={{ background: AZUL_OSCURO }}>
        <span className="font-bold" style={{ fontSize: 11 }}>
          🦷 CRM Clínica
        </span>
        <div className="flex gap-1">
          {pantallas.map((p) => (
            <button
              key={p}
              onClick={() => setPantalla(p)}
              className="px-2 py-0.5 rounded font-semibold transition-colors"
              style={{
                fontSize: 7,
                background: pantalla === p ? "white" : "transparent",
                color: pantalla === p ? AZUL_OSCURO : "rgba(255,255,255,0.8)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── PACIENTES: quién está en qué etapa y qué hay que hacer ── */}
      {pantalla === "Pacientes" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden bg-slate-50">
          <div className="grid grid-cols-3 gap-1 shrink-0">
            {(Object.keys(ETAPAS) as Etapa[]).map((e) => (
              <div key={e} className="bg-white rounded-md border border-gray-200 px-1.5 py-1">
                <div className="flex items-center gap-1 text-gray-500" style={{ fontSize: 6.5 }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: ETAPAS[e] }} />
                  {e}
                </div>
                <div className="font-bold text-gray-800" style={{ fontSize: 11 }}>
                  {PACIENTES.filter((p) => p.etapa === e).length}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 bg-white rounded-md border border-gray-200 overflow-hidden">
            {PACIENTES.map((p, i) => (
              <button
                key={p.nombre}
                onClick={() => {
                  setElegido(i);
                  setPantalla("Ficha");
                }}
                className="w-full flex items-center justify-between gap-2 px-2 py-1 border-b border-gray-100 last:border-0 text-left hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 truncate" style={{ fontSize: 8 }}>
                    {p.nombre} <span className="font-normal text-gray-400">· {p.motivo}</span>
                  </div>
                  <div className="truncate" style={{ fontSize: 7, color: p.alerta ? "#c2410c" : "#64748b" }}>
                    {p.alerta ? "⚠ " : ""}
                    {p.detalle}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-1.5 py-0.5 font-semibold text-white"
                  style={{ fontSize: 6, background: ETAPAS[p.etapa] }}
                >
                  {p.etapa}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── FICHA: lo que resume la IA y el próximo paso ── */}
      {pantalla === "Ficha" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden bg-slate-50">
          <div className="bg-white rounded-md border border-gray-200 px-2 py-1.5 shrink-0 flex items-center justify-between">
            <div>
              <div className="font-bold text-gray-800" style={{ fontSize: 9 }}>
                {p.nombre}
              </div>
              <div className="text-gray-500" style={{ fontSize: 7 }}>
                {p.motivo} · {p.detalle}
              </div>
            </div>
            <span className="rounded-full px-1.5 py-0.5 font-semibold text-white" style={{ fontSize: 6, background: ETAPAS[p.etapa] }}>
              {p.etapa}
            </span>
          </div>

          <div className="rounded-md px-2 py-1.5 shrink-0" style={{ background: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <div className="font-bold" style={{ fontSize: 7, color: AZUL }}>
              ✨ RESUMEN DE LA IA (últimos mensajes de WhatsApp)
            </div>
            <div className="text-gray-700" style={{ fontSize: 7.5 }}>
              {p.resumen}
            </div>
            <div className="mt-1 font-semibold text-gray-800" style={{ fontSize: 7.5 }}>
              Próximo paso sugerido: {p.paso}
            </div>
          </div>

          <button
            onClick={() => setEnviados((e) => (e.includes(elegido) ? e : [...e, elegido]))}
            className="rounded-md py-1.5 font-bold text-white shrink-0 transition-colors"
            style={{ fontSize: 8, background: enviado ? "#16a34a" : AZUL }}
          >
            {enviado ? "✓ Enviado por WhatsApp" : p.accion}
          </button>
          <button onClick={() => setPantalla("Pacientes")} className="text-gray-500 underline shrink-0" style={{ fontSize: 7 }}>
            ← Volver a los pacientes
          </button>
        </div>
      )}

      {/* ── RECORDATORIOS: los mensajes que salen solos ── */}
      {pantalla === "Recordatorios" && (
        <div className="flex-1 flex flex-col p-2 gap-1.5 overflow-hidden bg-slate-50">
          <div className="text-gray-500 shrink-0" style={{ fontSize: 7 }}>
            Salen solos por WhatsApp. Nadie tiene que acordarse de mandarlos.
          </div>
          <div className="flex-1 bg-white rounded-md border border-gray-200 overflow-hidden">
            {RECORDATORIOS.map((r) => (
              <div key={r.quien + r.hora} className="flex items-center justify-between gap-2 px-2 py-1.5 border-b border-gray-100 last:border-0">
                <div className="min-w-0">
                  <div className="text-gray-800 truncate" style={{ fontSize: 8 }}>
                    {r.texto}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: 7 }}>
                    {r.hora} · {r.quien}
                  </div>
                </div>
                <span
                  className="shrink-0 rounded-full px-1.5 py-0.5 font-semibold text-white"
                  style={{ fontSize: 6, background: COLOR_ESTADO[r.estado] }}
                >
                  {r.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
