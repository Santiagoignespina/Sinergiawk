"use client";

const BLUE = "#2563eb";

const cols = [
  { t: "Nuevos", c: "#3b82f6", items: ["Juan P.", "Sofía R."] },
  { t: "En tratamiento", c: "#FF4D00", items: ["María L.", "Diego R.", "Ana T."] },
  { t: "Control", c: "#a855f7", items: ["Luis G."] },
  { t: "Alta", c: "#16a34a", items: ["Carla M."] },
];

export default function CRMClinicaDemo() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-white" style={{ fontSize: 9 }}>
      <div className="px-3 py-1.5 flex items-center justify-between text-white shrink-0" style={{ background: BLUE }}>
        <span className="font-bold" style={{ fontSize: 10 }}>CRM Clínica</span>
        <span className="text-white/80" style={{ fontSize: 7 }}>7 pacientes activos</span>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-1 p-1.5 overflow-hidden bg-gray-50">
        {cols.map((col) => (
          <div key={col.t} className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: col.c }} />
              <span className="font-semibold text-gray-600 truncate" style={{ fontSize: 6.5 }}>{col.t}</span>
            </div>
            {col.items.map((it) => (
              <div key={it} className="bg-white border border-gray-100 rounded p-1 shadow-sm text-gray-700 font-medium truncate" style={{ fontSize: 7 }}>
                {it}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="px-2 py-1 border-t border-gray-100 bg-white text-gray-500 truncate shrink-0" style={{ fontSize: 6.5 }}>
        🤖 IA: recordale a María L. su control del viernes
      </div>
    </div>
  );
}
