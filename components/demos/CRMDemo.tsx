"use client";
import { useState } from "react";

const screens = ["Potenciales", "Detalle", "Tareas"] as const;
type Screen = (typeof screens)[number];

const PINK = "#f472b6";
const ORANGE = "#fb923c";
const GRAD = `linear-gradient(135deg, ${PINK}, ${ORANGE})`;

const estadoStyle: Record<string, { label: string; bg: string; color: string }> = {
  nuevo:                  { label: "Nuevo",            bg: "#dbeafe", color: "#1d4ed8" },
  contactado:             { label: "Contactado",        bg: "#dcfce7", color: "#15803d" },
  esperando_respuesta:    { label: "Esp. respuesta",    bg: "#fef3c7", color: "#92400e" },
  contactar_mas_adelante: { label: "Más adelante",      bg: "#ede9fe", color: "#6d28d9" },
  convertido:             { label: "Convertido ✓",      bg: "#d1fae5", color: "#065f46" },
};

const potenciales = [
  { nombre: "María López",    destino: "Walt Disney World",  estado: "nuevo",                  origen: "Instagram", fecha: "hace 1h" },
  { nombre: "Carlos Ruiz",    destino: "Universal Orlando",  estado: "contactado",              origen: "WhatsApp",  fecha: "hace 3h" },
  { nombre: "Ana Fernández",  destino: "Disney + Universal", estado: "esperando_respuesta",     origen: "Web",       fecha: "ayer"    },
  { nombre: "Juan Martínez",  destino: "Disney World",       estado: "contactar_mas_adelante",  origen: "Email",     fecha: "ayer"    },
  { nombre: "Laura García",   destino: "Magic Kingdom",      estado: "convertido",              origen: "WhatsApp",  fecha: "lunes"   },
];

const mensajesWP = [
  { dir: "recibido", texto: "Hola! Vi que hacés viajes a Disney, me interesa info para enero", hora: "10:14" },
  { dir: "enviado",  texto: "¡Hola María! Claro, con gusto te ayudo. ¿Cuántas personas viajan?", hora: "10:22" },
  { dir: "recibido", texto: "Somos 4, 2 adultos y 2 nenas de 6 y 8 años 🎉", hora: "10:25" },
  { dir: "enviado",  texto: "¡Perfecto! Tengo paquetes ideales para familia. ¿Fechas tentativas?", hora: "10:28" },
  { dir: "recibido", texto: "Pensamos enero, primera quincena", hora: "10:30" },
];

const tareas = [
  { titulo: "Enviar cotización Disney enero",    cliente: "María López",   prioridad: "alta",  vence: "Hoy",    completada: false },
  { titulo: "Seguimiento propuesta Universal",   cliente: "Carlos Ruiz",   prioridad: "media", vence: "Hoy",    completada: false },
  { titulo: "Confirmar fechas de viaje",         cliente: "Ana Fernández", prioridad: "alta",  vence: "Vencida",completada: false },
  { titulo: "Enviar info de seguro de viaje",    cliente: "Juan Martínez", prioridad: "baja",  vence: "Mañana", completada: false },
  { titulo: "Reservar hotel confirmado",         cliente: "Laura García",  prioridad: "media", vence: "Viernes",completada: true  },
];

const prioStyle: Record<string, { bg: string; color: string }> = {
  alta:  { bg: "#fee2e2", color: "#b91c1c" },
  media: { bg: "#fef3c7", color: "#92400e" },
  baja:  { bg: "#f1f5f9", color: "#475569" },
};

const filtros = ["Todos", "Nuevo", "Contactado", "Esp. respuesta", "Convertido"];

export default function CRMDemo() {
  const [screen, setScreen] = useState<Screen>("Potenciales");
  const [filtro, setFiltro] = useState("Todos");
  const [detalle, setDetalle] = useState(potenciales[0]);
  const [tab, setTab] = useState<"chat" | "info" | "tareas" | "programar">("chat");
  const [chatCanal, setChatCanal] = useState("WhatsApp");
  const [progCanal, setProgCanal] = useState("WhatsApp");
  const [progMensaje, setProgMensaje] = useState("");
  const [programados, setProgramados] = useState([
    { canal: "WhatsApp", mensaje: "Hola! Te recuerdo que mañana vence la seña", fecha: "Mañana 9:00", cancelado: false },
    { canal: "Email",    mensaje: "Cotización actualizada para enero adjunta",  fecha: "Vie 10:00",  cancelado: false },
  ]);
  const [tareasList, setTareasList] = useState(tareas);
  const [msg, setMsg] = useState("");

  const potencialesFiltrados = potenciales.filter(p => {
    if (filtro === "Todos") return true;
    return estadoStyle[p.estado].label.startsWith(filtro);
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-white" style={{ fontSize: 9 }}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0 text-white" style={{ background: GRAD }}>
        <div className="font-bold flex items-center gap-1" style={{ fontSize: 11 }}>
          <span>✈️</span>
          <span>CRM Viajes</span>
        </div>
        <div className="flex gap-1">
          {screens.map((s) => (
            <button key={s} onClick={() => setScreen(s)}
              className="px-2 py-0.5 rounded font-semibold transition-colors"
              style={{ fontSize: 7, background: screen === s ? "white" : "transparent", color: screen === s ? PINK : "rgba(255,255,255,0.85)" }}>
              {s}
            </button>
          ))}
        </div>
        <div className="text-white/80 font-medium" style={{ fontSize: 7 }}>
          {potenciales.filter(p => p.estado !== "convertido").length} leads activos
        </div>
      </div>

      {/* ── POTENCIALES ── */}
      {screen === "Potenciales" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Búsqueda */}
          <div className="px-2 py-1.5 border-b border-gray-100 shrink-0">
            <div className="border-2 border-pink-100 rounded-lg px-2 py-0.5 text-gray-400 flex items-center gap-1" style={{ fontSize: 7.5 }}>
              🔍 Buscar por nombre, destino...
            </div>
          </div>

          {/* Filtros */}
          <div className="flex gap-1 px-2 py-1.5 overflow-x-auto border-b border-gray-100 shrink-0">
            {filtros.map((f) => (
              <button key={f} onClick={() => setFiltro(f)}
                className="px-2 py-0.5 rounded-full whitespace-nowrap font-semibold transition-colors"
                style={{ fontSize: 6.5, background: filtro === f ? GRAD : "white", color: filtro === f ? "white" : "#9ca3af", border: filtro === f ? "none" : "1px solid #fce7f3" }}>
                {f}
              </button>
            ))}
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto px-2 py-1.5 flex flex-col gap-1.5">
            {potencialesFiltrados.map((p, i) => {
              const est = estadoStyle[p.estado];
              return (
                <button key={i} onClick={() => { setDetalle(p); setScreen("Detalle"); setTab("chat"); }}
                  className="w-full text-left border-2 border-pink-100 rounded-xl p-2 hover:border-pink-300 transition-colors bg-white">
                  <div className="flex items-center gap-2">
                    {/* Avatar */}
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ background: GRAD, fontSize: 8 }}>
                      {p.nombre.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-gray-800 truncate" style={{ fontSize: 8 }}>{p.nombre}</span>
                        <span className="text-gray-400 shrink-0" style={{ fontSize: 6 }}>{p.fecha}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-gray-500 truncate" style={{ fontSize: 7 }}>🏰 {p.destino}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="px-1.5 py-0.5 rounded-full font-semibold" style={{ fontSize: 6, background: est.bg, color: est.color }}>{est.label}</span>
                    <span className="text-gray-400" style={{ fontSize: 6 }}>via {p.origen}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DETALLE ── */}
      {screen === "Detalle" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header del cliente */}
          <div className="px-3 py-2 border-b border-gray-100 bg-white shrink-0">
            <div className="flex items-center gap-2">
              <button onClick={() => setScreen("Potenciales")} className="text-pink-400 font-bold" style={{ fontSize: 9 }}>← </button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: GRAD, fontSize: 9 }}>
                {detalle.nombre.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800" style={{ fontSize: 9 }}>{detalle.nombre}</div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-full font-semibold" style={{ fontSize: 6, background: estadoStyle[detalle.estado].bg, color: estadoStyle[detalle.estado].color }}>
                    {estadoStyle[detalle.estado].label}
                  </span>
                  <span className="text-gray-400" style={{ fontSize: 6 }}>🏰 {detalle.destino}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600" style={{ fontSize: 9 }}>💬</span>
                <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600" style={{ fontSize: 9 }}>✉️</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 bg-white shrink-0">
            {(["chat", "programar", "info", "tareas"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-1.5 font-semibold transition-colors"
                style={{ fontSize: 6.5, color: tab === t ? PINK : "#9ca3af", borderBottom: tab === t ? `2px solid ${PINK}` : "2px solid transparent" }}>
                {t === "chat" ? "💬 Chat" : t === "programar" ? "🗓 Programar" : t === "info" ? "📋 Info" : "✅ Tareas"}
              </button>
            ))}
          </div>

          {/* Chat */}
          {tab === "chat" && (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Selector de red */}
              {(() => {
                const canales = [
                  { label: "WhatsApp", icon: "💬", color: "#25D366" },
                  { label: "Email",    icon: "✉️", color: "#3b82f6" },
                  { label: "Facebook", icon: "📘", color: "#1877f2" },
                  { label: "Instagram",icon: "📸", color: "#e1306c" },
                ];
                return (
                  <div className="flex gap-1 px-2 py-1.5 border-b border-gray-100 bg-white shrink-0">
                    {canales.map(({ label, icon, color }) => (
                      <button key={label} onClick={() => setChatCanal(label)}
                        className="flex items-center gap-0.5 px-2 py-0.5 rounded-full font-semibold transition-colors"
                        style={{ fontSize: 6.5, background: chatCanal === label ? `${color}18` : "white", color: chatCanal === label ? color : "#9ca3af", border: `1px solid ${chatCanal === label ? color : "#fce7f3"}` }}>
                        <span style={{ fontSize: 9 }}>{icon}</span> {label}
                      </button>
                    ))}
                  </div>
                );
              })()}

              <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1.5" style={{ background: "#fdf9ff" }}>
                {chatCanal === "WhatsApp" && mensajesWP.map((m, i) => (
                  <div key={i} className={`flex ${m.dir === "enviado" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%] px-2 py-1 rounded-xl" style={{
                      fontSize: 7.5, lineHeight: 1.4,
                      background: m.dir === "enviado" ? "#dcfce7" : "white",
                      border: m.dir === "recibido" ? "1px solid #e5e7eb" : "none",
                    }}>
                      <div className="text-gray-700">{m.texto}</div>
                      <div className="text-gray-400 text-right mt-0.5" style={{ fontSize: 6 }}>{m.hora}</div>
                    </div>
                  </div>
                ))}
                {chatCanal === "Email" && [
                  { dir: "enviado",  texto: "Hola María! Te envío la cotización para Disney en enero.", hora: "Lun 09:15" },
                  { dir: "recibido", texto: "Gracias! La revisé, tengo algunas preguntas sobre el hotel.", hora: "Lun 11:42" },
                  { dir: "enviado",  texto: "Claro, te llamo esta tarde para resolverlas.", hora: "Lun 12:00" },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.dir === "enviado" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%] px-2 py-1 rounded-xl" style={{
                      fontSize: 7.5, lineHeight: 1.4,
                      background: m.dir === "enviado" ? "#dbeafe" : "white",
                      border: m.dir === "recibido" ? "1px solid #e5e7eb" : "none",
                    }}>
                      <div className="text-gray-700">{m.texto}</div>
                      <div className="text-gray-400 text-right mt-0.5" style={{ fontSize: 6 }}>{m.hora}</div>
                    </div>
                  </div>
                ))}
                {chatCanal === "Facebook" && [
                  { dir: "recibido", texto: "Vi tu publicación de Disney! Cuánto sale para 2 personas?", hora: "Mar 16:00" },
                  { dir: "enviado",  texto: "Hola! Depende las fechas y el hotel. Te paso opciones 😊", hora: "Mar 16:10" },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.dir === "enviado" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%] px-2 py-1 rounded-xl" style={{
                      fontSize: 7.5, lineHeight: 1.4,
                      background: m.dir === "enviado" ? "#dbeafe" : "white",
                      border: m.dir === "recibido" ? "1px solid #e5e7eb" : "none",
                    }}>
                      <div className="text-gray-700">{m.texto}</div>
                      <div className="text-gray-400 text-right mt-0.5" style={{ fontSize: 6 }}>{m.hora}</div>
                    </div>
                  </div>
                ))}
                {chatCanal === "Instagram" && [
                  { dir: "recibido", texto: "Me re copó tu historia de Universal! Hacés viajes grupales?", hora: "Mié 20:15" },
                  { dir: "enviado",  texto: "Sí! Tenemos paquetes grupales con descuentos especiales ✨", hora: "Mié 20:22" },
                  { dir: "recibido", texto: "Genial, somos 6 amigas para marzo", hora: "Mié 20:25" },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.dir === "enviado" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-[70%] px-2 py-1 rounded-xl" style={{
                      fontSize: 7.5, lineHeight: 1.4,
                      background: m.dir === "enviado" ? "#fce7f3" : "white",
                      border: m.dir === "recibido" ? "1px solid #e5e7eb" : "none",
                    }}>
                      <div className="text-gray-700">{m.texto}</div>
                      <div className="text-gray-400 text-right mt-0.5" style={{ fontSize: 6 }}>{m.hora}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-2 py-1.5 border-t border-gray-100 flex gap-1 shrink-0 bg-white">
                <input value={msg} onChange={e => setMsg(e.target.value)} placeholder={`Escribir por ${chatCanal}...`}
                  className="flex-1 border-2 border-pink-100 rounded-lg px-2 py-0.5 text-gray-700 outline-none" style={{ fontSize: 7.5 }} />
                <button className="text-white px-2 py-0.5 rounded-lg font-bold" style={{ fontSize: 7, background: GRAD }}>Enviar</button>
              </div>
            </div>
          )}

          {/* Info */}
          {tab === "info" && (
            <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-2">
              {[
                ["🏰 Destino", detalle.destino],
                ["📅 Fecha estimada", "Enero 2025 · 1ª quincena"],
                ["💰 Presupuesto", "$ 3.500 USD"],
                ["👥 Pasajeros", "4 (2 adultos, 2 niños)"],
                ["📱 Origen", detalle.origen],
              ].map(([label, val]) => (
                <div key={String(label)} className="border-2 border-pink-100 rounded-xl px-3 py-1.5">
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{label}</div>
                  <div className="font-semibold text-gray-800" style={{ fontSize: 8 }}>{val}</div>
                </div>
              ))}
              <div className="border-2 border-pink-100 rounded-xl px-3 py-1.5">
                <div className="text-gray-400 mb-0.5" style={{ fontSize: 6.5 }}>🤖 Resumen IA</div>
                <div className="text-gray-600 leading-relaxed" style={{ fontSize: 7 }}>
                  Familia interesada en Disney World en enero. Prioridad: experiencia con niños pequeños. Alto potencial de conversión.
                </div>
              </div>
            </div>
          )}

          {/* Programar mensajes */}
          {tab === "programar" && (
            <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-2">
              {/* Formulario */}
              <div className="border-2 border-pink-100 rounded-xl p-2 flex flex-col gap-1.5 bg-white">
                <div className="font-semibold text-gray-700" style={{ fontSize: 8 }}>Nuevo mensaje programado</div>

                {/* Canal selector */}
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { label: "WhatsApp", icon: "💬", color: "#25D366" },
                    { label: "Email",    icon: "✉️", color: "#3b82f6" },
                    { label: "Facebook", icon: "📘", color: "#1877f2" },
                    { label: "Instagram",icon: "📸", color: "#e1306c" },
                  ].map(({ label, icon, color }) => (
                    <button key={label} onClick={() => setProgCanal(label)}
                      className="flex flex-col items-center py-1 rounded-lg border-2 transition-colors"
                      style={{ fontSize: 6, borderColor: progCanal === label ? color : "#fce7f3", background: progCanal === label ? `${color}18` : "white", color: progCanal === label ? color : "#9ca3af" }}>
                      <span style={{ fontSize: 11 }}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Fecha/hora */}
                <div className="border-2 border-pink-100 rounded-lg px-2 py-1 text-gray-400 flex items-center gap-1" style={{ fontSize: 7.5 }}>
                  📅 Fecha y hora de envío
                </div>

                {/* Mensaje */}
                <textarea value={progMensaje} onChange={e => setProgMensaje(e.target.value)}
                  placeholder="Escribí el mensaje a programar..."
                  className="border-2 border-pink-100 rounded-lg px-2 py-1 text-gray-700 resize-none outline-none w-full"
                  style={{ fontSize: 7.5, minHeight: 36 }} />

                <button
                  onClick={() => {
                    if (!progMensaje.trim()) return;
                    setProgramados(p => [{ canal: progCanal, mensaje: progMensaje, fecha: "Programado", cancelado: false }, ...p]);
                    setProgMensaje("");
                  }}
                  className="w-full py-1.5 rounded-lg text-white font-bold" style={{ fontSize: 7.5, background: GRAD }}>
                  Programar mensaje
                </button>
              </div>

              {/* Lista programados */}
              <div className="font-semibold text-gray-500" style={{ fontSize: 7 }}>Mensajes programados</div>
              {programados.map((m, i) => {
                const canalColor: Record<string, string> = { WhatsApp: "#25D366", Email: "#3b82f6", Facebook: "#1877f2", Instagram: "#e1306c" };
                const canalIcon:  Record<string, string> = { WhatsApp: "💬", Email: "✉️", Facebook: "📘", Instagram: "📸" };
                return (
                  <div key={i} className={`border-2 rounded-xl px-2 py-1.5 flex gap-2 items-start transition-opacity ${m.cancelado ? "opacity-40 border-gray-100" : "border-pink-100"}`}>
                    <span style={{ fontSize: 12 }}>{canalIcon[m.canal] ?? "📨"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="font-bold" style={{ fontSize: 7, color: canalColor[m.canal] ?? PINK }}>{m.canal}</span>
                        <span className="text-gray-400" style={{ fontSize: 6 }}>· {m.fecha}</span>
                        {m.cancelado && <span className="text-gray-400 italic" style={{ fontSize: 6 }}>cancelado</span>}
                      </div>
                      <div className="text-gray-600 leading-relaxed" style={{ fontSize: 7 }}>{m.mensaje}</div>
                    </div>
                    {!m.cancelado && (
                      <button onClick={() => setProgramados(p => p.map((x, j) => j === i ? { ...x, cancelado: true } : x))}
                        className="text-gray-300 hover:text-red-400 shrink-0 font-bold" style={{ fontSize: 9 }}>✕</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tareas del cliente */}
          {tab === "tareas" && (
            <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1.5">
              {tareasList.filter(t => t.cliente === detalle.nombre).length === 0 && (
                <div className="text-center text-gray-400 mt-6" style={{ fontSize: 8 }}>Sin tareas para este cliente</div>
              )}
              {tareasList.filter(t => t.cliente === detalle.nombre).map((t, i) => (
                <div key={i} className="border-2 border-pink-100 rounded-xl px-2 py-1.5 flex items-center gap-2">
                  <input type="checkbox" checked={t.completada} onChange={() =>
                    setTareasList(prev => prev.map((x, j) => x.titulo === t.titulo ? { ...x, completada: !x.completada } : x))}
                    className="accent-pink-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-gray-800 ${t.completada ? "line-through text-gray-400" : ""}`} style={{ fontSize: 7.5 }}>{t.titulo}</div>
                    <div className="text-gray-400" style={{ fontSize: 6.5 }}>📅 {t.vence}</div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ fontSize: 6, ...prioStyle[t.prioridad] }}>{t.prioridad}</span>
                </div>
              ))}
              <button className="w-full py-1.5 rounded-xl border-2 border-dashed border-pink-200 text-pink-400 font-semibold" style={{ fontSize: 7.5 }}>
                + Nueva tarea
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── TAREAS ── */}
      {screen === "Tareas" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-3 py-1.5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
            <span className="font-semibold text-gray-700" style={{ fontSize: 8.5 }}>Panel de tareas</span>
            <span className="px-2 py-0.5 rounded-full text-white font-bold" style={{ fontSize: 6.5, background: GRAD }}>
              {tareasList.filter(t => !t.completada).length} pendientes
            </span>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-1.5 flex flex-col gap-1">
            {/* Vencidas */}
            <div className="text-red-500 font-bold mb-0.5" style={{ fontSize: 7 }}>⚠ Vencidas</div>
            {tareasList.filter(t => t.vence === "Vencida" && !t.completada).map((t, i) => (
              <div key={i} className="border-2 border-red-100 rounded-xl px-2 py-1.5 flex items-center gap-2 bg-red-50">
                <input type="checkbox" checked={t.completada} onChange={() =>
                  setTareasList(prev => prev.map(x => x.titulo === t.titulo ? { ...x, completada: !x.completada } : x))}
                  className="accent-pink-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate" style={{ fontSize: 7.5 }}>{t.titulo}</div>
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{t.cliente}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ fontSize: 6, ...prioStyle[t.prioridad] }}>{t.prioridad}</span>
              </div>
            ))}

            {/* Hoy */}
            <div className="text-orange-500 font-bold mt-1 mb-0.5" style={{ fontSize: 7 }}>📅 Para hoy</div>
            {tareasList.filter(t => t.vence === "Hoy" && !t.completada).map((t, i) => (
              <div key={i} className="border-2 border-orange-100 rounded-xl px-2 py-1.5 flex items-center gap-2">
                <input type="checkbox" checked={t.completada} onChange={() =>
                  setTareasList(prev => prev.map(x => x.titulo === t.titulo ? { ...x, completada: !x.completada } : x))}
                  className="accent-pink-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate" style={{ fontSize: 7.5 }}>{t.titulo}</div>
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{t.cliente}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ fontSize: 6, ...prioStyle[t.prioridad] }}>{t.prioridad}</span>
              </div>
            ))}

            {/* Próximas */}
            <div className="text-gray-500 font-bold mt-1 mb-0.5" style={{ fontSize: 7 }}>🗓 Próximas</div>
            {tareasList.filter(t => t.vence !== "Hoy" && t.vence !== "Vencida" && !t.completada).map((t, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-xl px-2 py-1.5 flex items-center gap-2">
                <input type="checkbox" checked={t.completada} onChange={() =>
                  setTareasList(prev => prev.map(x => x.titulo === t.titulo ? { ...x, completada: !x.completada } : x))}
                  className="accent-pink-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate" style={{ fontSize: 7.5 }}>{t.titulo}</div>
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{t.cliente} · {t.vence}</div>
                </div>
                <span className="px-1.5 py-0.5 rounded-full font-semibold shrink-0" style={{ fontSize: 6, ...prioStyle[t.prioridad] }}>{t.prioridad}</span>
              </div>
            ))}

            {/* Completadas */}
            {tareasList.filter(t => t.completada).map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl px-2 py-1.5 flex items-center gap-2 opacity-50">
                <input type="checkbox" checked={true} onChange={() =>
                  setTareasList(prev => prev.map(x => x.titulo === t.titulo ? { ...x, completada: false } : x))}
                  className="accent-pink-400 shrink-0" />
                <div className="font-medium text-gray-400 line-through truncate" style={{ fontSize: 7.5 }}>{t.titulo}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
