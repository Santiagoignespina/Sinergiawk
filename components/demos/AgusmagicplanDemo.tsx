"use client";
import { useState } from "react";

const screens = ["Hero", "Parques", "Formulario"] as const;
type Screen = (typeof screens)[number];

export default function AgusmagicplanDemo() {
  const [screen, setScreen] = useState<Screen>("Hero");
  const [msgMode, setMsgMode] = useState<"text" | "audio">("text");

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none" style={{fontSize:9}}>
      {/* Nav */}
      <div className="flex shrink-0" style={{background:"#fff"}}>
        {screens.map((s) => (
          <button key={s} onClick={() => setScreen(s)}
            className="flex-1 py-1.5 font-semibold transition-colors border-b-2"
            style={{
              fontSize: 8,
              color: screen === s ? "#ec4899" : "#9ca3af",
              borderBottomColor: screen === s ? "#ec4899" : "transparent",
              background: "white"
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      {screen === "Hero" && (
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center"
          style={{background:"linear-gradient(160deg,#c084fc 0%,#f472b6 40%,#fb923c 100%)"}}>
          {/* Estrellas decorativas */}
          <span className="absolute top-3 left-4 text-yellow-300" style={{fontSize:12}}>✦</span>
          <span className="absolute top-5 right-6 text-yellow-200" style={{fontSize:8}}>✦</span>
          <span className="absolute bottom-10 left-8 text-yellow-300" style={{fontSize:7}}>✦</span>

          {/* Badge */}
          <div className="bg-white/20 border border-white/40 text-white rounded-full px-3 py-0.5 mb-2" style={{fontSize:7}}>
            ✨ AGENTE CERTIFICADA DISNEY & UNIVERSAL ✨
          </div>

          {/* Título */}
          <div className="text-white font-black text-center leading-tight mb-1" style={{fontSize:18}}>
            Tu viaje mágico
          </div>
          <div className="font-black text-center mb-2" style={{fontSize:18, color:"#fde68a"}}>
            empieza acá
          </div>

          <div className="text-white/80 text-center mb-3" style={{fontSize:8}}>
            Planificación 100% personalizada · Sin estrés · Con magia ✨
          </div>

          <button className="text-white font-bold px-4 py-2 rounded-full shadow-lg" style={{fontSize:9, background:"linear-gradient(90deg,#ec4899,#f97316)"}}>
            ¡Empezá a planear tu viaje! 🏰
          </button>
        </div>
      )}

      {/* ── PARQUES ── */}
      {screen === "Parques" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Por qué Agus */}
          <div className="bg-white px-3 py-3 flex flex-col items-center">
            <div className="text-[#f472b6] text-[7px] font-semibold mb-1">¿Por qué elegirnos?</div>
            <div className="font-black text-gray-800 text-center mb-2" style={{fontSize:11}}>
              Planificación <span style={{color:"#f472b6"}}>sin estrés</span> ✨
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full">
              {[
                ["🏰","Agente Certificada","Certificación oficial Disney y Universal."],
                ["👩","Mi historia","Porque crecer no borra la magia."],
                ["💡","Asesoría Personal","Itinerario según tu familia y fechas."],
              ].map(([icon,title,desc]) => (
                <div key={String(title)} className="border border-gray-100 rounded-xl p-2 flex flex-col items-center text-center" style={{background:"#fdf4ff"}}>
                  <span style={{fontSize:16}}>{icon}</span>
                  <div className="font-bold text-gray-800 mt-1 leading-tight" style={{fontSize:7.5}}>{title}</div>
                  <div className="text-gray-400 mt-0.5 leading-tight" style={{fontSize:6.5}}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Parques */}
          <div className="flex-1 flex flex-col items-center justify-center px-3 py-3"
            style={{background:"linear-gradient(135deg,#9333ea 0%,#ec4899 50%,#f97316 100%)"}}>
            <div className="text-white font-black text-center mb-1" style={{fontSize:12}}>Los parques más mágicos del mundo</div>
            <div className="text-white/70 text-center mb-3" style={{fontSize:7.5}}>Experta en ambos destinos de Orlando</div>
            <div className="grid grid-cols-2 gap-2 w-full">
              {[
                ["🏰","Walt Disney World","Magic Kingdom · EPCOT · Hollywood Studios · Animal Kingdom"],
                ["🎢","Universal Orlando","Universal Studios · Islands of Adventure · Epic Universe · Volcano Bay"],
              ].map(([icon,name,parks]) => (
                <div key={String(name)} className="rounded-xl p-3 flex flex-col items-center text-center" style={{background:"rgba(255,255,255,0.15)"}}>
                  <span style={{fontSize:18}}>{icon}</span>
                  <div className="text-white font-bold mt-1" style={{fontSize:8.5}}>{name}</div>
                  <div className="text-white/60 mt-0.5 leading-tight" style={{fontSize:6.5}}>{parks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FORMULARIO ── */}
      {screen === "Formulario" && (
        <div className="flex-1 overflow-hidden flex flex-col items-center justify-start px-3 py-2"
          style={{background:"#fdf6f0"}}>
          <div style={{fontSize:16}} className="mb-0.5">✦</div>
          <div className="font-black text-gray-800 mb-0.5" style={{fontSize:12}}>¡Empezá a planear!</div>
          <div className="text-gray-500 text-center mb-2" style={{fontSize:7.5}}>
            Completá el formulario y te contactamos para armar tu viaje perfecto
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-3 w-full flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="border border-pink-200 rounded-xl px-2 py-1.5 text-gray-400" style={{fontSize:8}}>María</div>
              <div className="border border-pink-200 rounded-xl px-2 py-1.5 text-gray-400" style={{fontSize:8}}>García</div>
            </div>
            <div className="border border-pink-200 rounded-xl px-2 py-1.5 text-gray-400" style={{fontSize:8}}>maria@email.com</div>
            <div className="border border-pink-200 rounded-xl px-2 py-1.5 text-gray-400 flex items-center gap-1" style={{fontSize:8}}>
              <span>📅</span> Seleccioná las fechas de tu viaje
            </div>
            {/* Toggle texto/audio */}
            <div className="grid grid-cols-2 gap-1.5">
              <button onClick={() => setMsgMode("text")}
                className="rounded-xl py-1.5 font-bold text-center transition-all"
                style={{fontSize:8, background: msgMode==="text" ? "linear-gradient(90deg,#ec4899,#f97316)" : "white", color: msgMode==="text" ? "white" : "#6b7280", border: msgMode==="text" ? "none" : "1px solid #e5e7eb"}}>
                ✍️ Escribir mensaje
              </button>
              <button onClick={() => setMsgMode("audio")}
                className="rounded-xl py-1.5 font-bold text-center transition-all"
                style={{fontSize:8, background: msgMode==="audio" ? "linear-gradient(90deg,#9333ea,#ec4899)" : "white", color: msgMode==="audio" ? "white" : "#6b7280", border: msgMode==="audio" ? "none" : "1px solid #e5e7eb"}}>
                🎙️ Mandar audio
              </button>
            </div>
            {msgMode === "text" ? (
              <div className="border border-pink-200 rounded-xl px-2 py-1.5 text-gray-300 leading-relaxed" style={{fontSize:7.5, minHeight:32}}>
                Contanos cuántas personas viajan, si tenés chicos, qué parques te interesan...
              </div>
            ) : (
              <div className="border border-purple-200 rounded-xl p-2 flex flex-col items-center gap-1" style={{background:"#faf5ff"}}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{background:"#f3e8ff"}}>
                  <span style={{fontSize:14}}>🎙️</span>
                </div>
                <div className="text-gray-400" style={{fontSize:7}}>Presioná para grabar tu mensaje</div>
              </div>
            )}
            <button className="text-white font-bold py-2 rounded-xl" style={{fontSize:9, background:"linear-gradient(90deg,#ec4899,#f97316)"}}>
              ¡Enviá tu consulta! ✨
            </button>
            <div className="text-center text-gray-300" style={{fontSize:7}}>🔒 Tu información es 100% privada y segura</div>
          </div>
        </div>
      )}
    </div>
  );
}
