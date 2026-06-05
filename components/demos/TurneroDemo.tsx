"use client";
import { useState } from "react";

const screens = ["Kiosk", "Recepción", "Pantalla TV", "Consultorio"] as const;
type Screen = (typeof screens)[number];

const GREEN = "#00C4A7";

export default function TurneroDemo() {
  const [screen, setScreen] = useState<Screen>("Kiosk");
  const [kioskStep, setKioskStep] = useState<"bienvenida" | "dni" | "confirmado">("bienvenida");
  const [dni, setDni] = useState("");

  const resetKiosk = () => { setKioskStep("bienvenida"); setDni(""); };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-white" style={{fontSize:9}}>
      {/* Nav de pantallas */}
      <div className="flex border-b border-gray-100 bg-gray-50 shrink-0">
        {screens.map((s) => (
          <button key={s} onClick={() => { setScreen(s); resetKiosk(); }}
            className={`flex-1 py-1.5 font-semibold transition-colors ${screen === s ? "text-white" : "text-gray-400 hover:text-gray-600"}`}
            style={{fontSize:8, backgroundColor: screen === s ? GREEN : "transparent"}}>
            {s}
          </button>
        ))}
      </div>

      {/* ── KIOSK ── */}
      {screen === "Kiosk" && (
        <div className="flex-1 flex flex-col items-center justify-center" style={{backgroundColor: GREEN}}>
          <div className="w-12 h-12 rounded-2xl bg-white/25 flex items-center justify-center text-white font-bold mb-2" style={{fontSize:24}}>+</div>

          {kioskStep === "bienvenida" && (
            <>
              <div className="text-white font-bold mb-1" style={{fontSize:14}}>¡Bienvenido!</div>
              <div className="text-white/80 mb-4" style={{fontSize:9}}>¿Cómo es tu visita hoy?</div>
              <div className="grid grid-cols-2 gap-2 w-48">
                {[["Soy paciente", true], ["Guardia", false], ["Es mi primera vez", false], ["Sin turno", false]].map(([label, primary]) => (
                  <button key={String(label)} onClick={() => primary ? setKioskStep("dni") : null}
                    className={`rounded-xl py-2.5 font-bold transition-all ${primary ? "bg-white" : "bg-white/20 border border-white/40"}`}
                    style={{fontSize:8, color: primary ? GREEN : "white"}}>
                    {String(label)}
                  </button>
                ))}
              </div>
            </>
          )}

          {kioskStep === "dni" && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-white font-bold" style={{fontSize:11}}>Ingresá tu DNI</div>
              <div className="bg-white/20 text-white font-bold rounded-lg px-4 py-2 min-w-24 text-center tracking-widest" style={{fontSize:13}}>
                {dni || "·  ·  ·"}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1,2,3,4,5,6,7,8,9,"←",0,"✓"].map((k) => (
                  <button key={String(k)}
                    onClick={() => {
                      if (k === "←") setDni(d => d.slice(0,-1));
                      else if (k === "✓" && dni.length >= 6) setKioskStep("confirmado");
                      else if (typeof k === "number" && dni.length < 8) setDni(d => d + k);
                    }}
                    className={`w-8 h-8 rounded-lg font-bold text-white flex items-center justify-center ${k === "✓" ? "bg-white/40" : "bg-white/20"}`}
                    style={{fontSize:10}}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}

          {kioskStep === "confirmado" && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-white font-bold" style={{fontSize:13}}>¡Buenas tardes, García Juan!</div>
              <div className="text-white/80" style={{fontSize:9}}>Tu llegada fue registrada. Esperá en sala.</div>
              <button onClick={resetKiosk} className="mt-2 bg-white/20 text-white rounded-lg px-4 py-1.5 border border-white/30" style={{fontSize:8}}>
                Volver
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── RECEPCIÓN ── */}
      {screen === "Recepción" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-3 py-2 flex items-center justify-between border-b border-gray-100" style={{backgroundColor: GREEN}}>
            <span className="text-white font-bold" style={{fontSize:11}}>Panel de Recepción</span>
            <span className="text-white/70 underline" style={{fontSize:8}}>Ver pantalla TV →</span>
          </div>
          <div className="px-2 py-1.5 border-b border-gray-100 flex items-center gap-2">
            <span className="text-gray-400" style={{fontSize:7}}>CONSULTORIOS:</span>
            {["C.1","C.2","C.3","C.4"].map((c) => (
              <span key={c} className="text-white px-1.5 py-0.5 rounded-full font-bold" style={{fontSize:7, backgroundColor: GREEN}}>{c}</span>
            ))}
            <span className="text-gray-300 px-1.5 py-0.5 rounded-full border border-gray-200" style={{fontSize:7}}>C.5</span>
          </div>
          <div className="flex border-b border-gray-100">
            {["Pacientes a recepcionar","En espera","Debe pagar","Historial"].map((t,i) => (
              <span key={t} className={`px-2 py-1.5 font-semibold ${i===0?"text-white":"text-gray-400"}`}
                style={{fontSize:7.5, backgroundColor: i===0 ? GREEN : "transparent"}}>{t}</span>
            ))}
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2 overflow-hidden">
            <div className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
              <div className="text-gray-400" style={{fontSize:8}}>Pacientes en espera de recepción</div>
              <div className="font-bold mt-1" style={{color: GREEN, fontSize:10}}>García, Juan · López, María</div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-2">
              <div className="font-bold text-gray-700 mb-2" style={{fontSize:9}}>Registrar nuevo turno</div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="border border-gray-200 rounded px-2 py-1 text-gray-400" style={{fontSize:8}}>García, Juan</div>
                <div className="border border-gray-200 rounded px-2 py-1 text-gray-400" style={{fontSize:8}}>12345678</div>
                <div className="border border-gray-200 rounded px-2 py-1 text-gray-400" style={{fontSize:8}}>Normal ▾</div>
                <div className="border border-gray-200 rounded px-2 py-1 text-gray-400" style={{fontSize:8}}>+ Agregar estudios</div>
              </div>
              <div className="mt-2 text-center text-white py-1.5 rounded font-bold" style={{backgroundColor: GREEN, fontSize:8}}>
                Registrar turno
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PANTALLA TV ── */}
      {screen === "Pantalla TV" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 shrink-0" style={{backgroundColor: GREEN}}>
            <div className="w-7 h-7 rounded-lg bg-white/25 flex items-center justify-center text-white font-bold" style={{fontSize:14}}>+</div>
            <div className="text-right">
              <div className="text-white font-bold" style={{fontSize:16}}>22:43</div>
              <div className="text-white/80" style={{fontSize:7}}>Jueves 26 de marzo de 2026</div>
            </div>
          </div>
          <div className="grid grid-cols-2 px-3 py-1 shrink-0" style={{backgroundColor:"#00b899"}}>
            <span className="text-white font-bold" style={{fontSize:8}}>CONSULTORIO</span>
            <span className="text-white font-bold" style={{fontSize:8}}>PACIENTE</span>
          </div>
          <div className="flex-1 px-3 py-2 flex flex-col gap-2">
            {[["Consultorio 1","GARCÍA, JUAN"],["Consultorio 2","LÓPEZ, MARÍA"]].map(([c,p]) => (
              <div key={c} className="grid grid-cols-2 border-b border-gray-100 pb-2">
                <span className="font-bold" style={{color: GREEN, fontSize:11}}>{c}</span>
                <span className="font-bold text-gray-800" style={{fontSize:11}}>{p}</span>
              </div>
            ))}
            <div className="text-gray-300 text-center mt-4" style={{fontSize:8}}>Sin turnos llamados</div>
          </div>
          <div className="px-3 py-1.5 flex items-center gap-2 shrink-0" style={{backgroundColor: GREEN}}>
            <span className="text-white font-bold" style={{fontSize:8}}>PRÓXIMOS</span>
            <span className="text-white/80" style={{fontSize:8}}>Rodríguez, Pablo · Martínez, Ana · Sánchez, Luis</span>
          </div>
        </div>
      )}

      {/* ── CONSULTORIO ── */}
      {screen === "Consultorio" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 shrink-0" style={{backgroundColor: GREEN}}>
            <div>
              <div className="text-white/70" style={{fontSize:7}}>Panel del profesional</div>
              <div className="text-white font-bold" style={{fontSize:12}}>Consultorio 1</div>
            </div>
            <div className="bg-white rounded-full px-2 py-1 font-semibold" style={{fontSize:8, color: GREEN}}>👤 Dra. Romero</div>
            <span className="text-white/70 underline" style={{fontSize:7}}>← Recepción</span>
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2 overflow-hidden">
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="font-bold text-gray-700 mb-1" style={{fontSize:9}}>TURNO ACTUAL</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-800" style={{fontSize:11}}>García, Juan</div>
                  <div className="text-gray-400" style={{fontSize:8}}>Bracket Metálico · Control</div>
                </div>
                <span className="text-white px-2 py-0.5 rounded-full font-bold" style={{fontSize:7.5, backgroundColor: GREEN}}>EN ATENCIÓN</span>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
              <div className="font-bold text-gray-700 mb-1" style={{fontSize:9}}>Cola de este consultorio</div>
              {[["López, María","Arco Niti","ESPERANDO"],["Rodríguez, Pablo","RX Panorámica","ESPERANDO"]].map(([n,e,s]) => (
                <div key={String(n)} className="flex items-center justify-between py-1 border-b border-gray-50">
                  <div>
                    <div className="font-medium text-gray-700" style={{fontSize:8}}>{n}</div>
                    <div className="text-gray-400" style={{fontSize:7}}>{e}</div>
                  </div>
                  <span className="text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full" style={{fontSize:7}}>{s}</span>
                </div>
              ))}
            </div>
            <button className="text-white py-1.5 rounded-lg font-bold" style={{backgroundColor: GREEN, fontSize:9}}>
              📢 Llamar siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
