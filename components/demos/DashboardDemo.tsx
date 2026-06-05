"use client";
import { useState } from "react";

const tabs = ["Ventas", "Pacientes", "Profesionales", "Ranking"] as const;
type Tab = (typeof tabs)[number];

function Donut({ pct, color, size = 44 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2 + 3} textAnchor="middle" fontSize="9" fontWeight="bold" fill={color}>{pct}%</text>
    </svg>
  );
}

export default function DashboardDemo() {
  const [active, setActive] = useState<Tab>("Ventas");

  return (
    <div className="w-full h-full flex overflow-hidden rounded-xl select-none bg-white" style={{fontSize: 9}}>
      {/* Sidebar */}
      <div className="w-[72px] bg-gradient-to-b from-[#22c55e] to-[#16a34a] flex flex-col items-center py-2 gap-0.5 shrink-0">
        <div className="mb-1 w-8 h-8 rounded-lg bg-white/25 flex items-center justify-center text-white font-bold" style={{fontSize:14}}>+</div>
        <div className="text-white/70 text-[7px] font-semibold mb-1">Dashboard</div>
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)}
            className={`w-full text-center py-1.5 font-bold transition-colors ${
              active === t ? "bg-white/25 text-white" : "text-white/60 hover:text-white"
            }`} style={{fontSize: 9}}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-3 py-1.5 flex justify-end items-center gap-2">
          {active === "Pacientes" && (
            <span className="text-gray-300 text-[8px] border border-gray-200 rounded px-2 py-0.5">Buscar paciente, DNI...</span>
          )}
          <span className="text-gray-400 text-[8px] border border-gray-200 rounded px-1.5 py-0.5">Cerrar sesión</span>
        </div>

        <div className="flex-1 overflow-hidden p-2">

          {/* ── VENTAS ── */}
          {active === "Ventas" && (
            <div className="flex flex-col gap-1.5 h-full">
              <div className="text-green-600 font-bold text-center" style={{fontSize:11}}>Ventas</div>
              <div className="grid grid-cols-4 gap-1">
                {[["Total Facturado","3.089.100"],["Total Cobrado","3.076.100"],["Pacientes","64"],["Comisiones","429.700"]].map(([l,v]) => (
                  <div key={l} className="bg-white rounded-lg p-1.5 shadow-sm text-center">
                    <div className="text-gray-400" style={{fontSize:7}}>{l}</div>
                    <div className="text-green-700 font-bold" style={{fontSize:10}}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[["Efectivo",76,"2.332.500"],["Tarjeta",9,"275.400"],["Transf./MP",15,"468.200"]].map(([l,p,v]) => (
                  <div key={String(l)} className="bg-white rounded-lg p-1.5 shadow-sm flex flex-col items-center gap-0.5">
                    <Donut pct={Number(p)} color="#16a34a" size={36} />
                    <div className="text-gray-500" style={{fontSize:7}}>{String(l)}</div>
                    <div className="text-green-700 font-semibold" style={{fontSize:8}}>{String(v)}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1">
                <div className="px-2 py-1 flex gap-1 border-b border-gray-100">
                  {["Hoy","Ayer","Mes"].map((f,i) => (
                    <span key={f} className={`px-1.5 py-0.5 rounded ${i===2?"bg-green-600 text-white":"text-gray-400 border border-gray-200"}`} style={{fontSize:7}}>{f}</span>
                  ))}
                </div>
                <table className="w-full">
                  <thead><tr className="text-gray-400 border-b border-gray-100" style={{fontSize:7}}>
                    <th className="px-2 py-1 text-left font-medium">Día</th>
                    <th className="px-2 py-1 text-left font-medium">Sucursal</th>
                    <th className="px-2 py-1 text-right font-medium">Facturado</th>
                    <th className="px-2 py-1 text-right font-medium">Pac.</th>
                  </tr></thead>
                  <tbody style={{fontSize:8}}>
                    {[["26/03","centro","2.161.400",47],["26/03","norte","927.700",17]].map(([d,s,f,p]) => (
                      <tr key={String(s)} className="border-b border-gray-50">
                        <td className="px-2 py-1 text-gray-400">{d}</td>
                        <td className="px-2 py-1 text-gray-700 font-medium">{s}</td>
                        <td className="px-2 py-1 text-right text-green-700 font-semibold">{f}</td>
                        <td className="px-2 py-1 text-right text-gray-500">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PACIENTES ── */}
          {active === "Pacientes" && (
            <div className="flex flex-col gap-1.5 h-full">
              <div className="text-green-600 font-bold text-center" style={{fontSize:11}}>Pacientes</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                  <div className="text-gray-400" style={{fontSize:7}}>Pacientes</div>
                  <div className="text-gray-800 font-bold" style={{fontSize:14}}>1702</div>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm flex items-center gap-1.5">
                  <Donut pct={73} color="#16a34a" size={36} />
                  <div><div className="text-gray-500" style={{fontSize:7}}>Asistieron</div><div className="text-green-700 font-bold" style={{fontSize:10}}>1785</div></div>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm flex items-center gap-1.5">
                  <Donut pct={27} color="#9ca3af" size={36} />
                  <div><div className="text-gray-500" style={{fontSize:7}}>Ausentes</div><div className="text-gray-600 font-bold" style={{fontSize:10}}>668</div></div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {[["80-90+","1"],["60-80","3"],["40-60","33"],["25-40","216"],["< 25","1000"],["Nuevos","456"]].map(([r,v]) => (
                  <div key={r} className="bg-green-50 border border-green-100 rounded p-1 text-center">
                    <div className="text-gray-400" style={{fontSize:6}}>{r} años</div>
                    <div className="text-green-700 font-bold" style={{fontSize:10}}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1">
                <table className="w-full">
                  <thead><tr className="text-gray-500 border-b border-gray-100 font-bold" style={{fontSize:7}}>
                    <th className="px-1.5 py-1 text-left">Día</th>
                    <th className="px-1.5 py-1 text-left">Paciente</th>
                    <th className="px-1.5 py-1 text-left">DNI</th>
                    <th className="px-1.5 py-1 text-left">Estudio</th>
                    <th className="px-1.5 py-1 text-right">Monto</th>
                  </tr></thead>
                  <tbody style={{fontSize:7.5}}>
                    {[
                      ["02/03","Juan Pérez","30111222","Bracket Metálico","$3.000"],
                      ["02/03","María López","31222333","Arco Niti","$4.000"],
                      ["02/03","Lucía Gómez","29333444","Cancelación deuda","$2.000"],
                      ["02/03","Diego Ruiz","32444555","Arco Niti, Tubo","$12.000"],
                    ].map(([d,p,dni,e,m]) => (
                      <tr key={dni+e} className="border-b border-gray-50">
                        <td className="px-1.5 py-0.5 text-gray-400">{d}</td>
                        <td className="px-1.5 py-0.5 text-green-600 font-medium">{p}</td>
                        <td className="px-1.5 py-0.5 text-gray-400">{dni}</td>
                        <td className="px-1.5 py-0.5 text-gray-600">{e}</td>
                        <td className="px-1.5 py-0.5 text-right text-gray-700 font-semibold">{m}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── PROFESIONALES ── */}
          {active === "Profesionales" && (
            <div className="flex flex-col gap-1.5 h-full">
              <div className="text-green-600 font-bold text-center" style={{fontSize:11}}>Profesionales</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-white rounded-lg p-2 shadow-sm text-center">
                  <div className="text-gray-400" style={{fontSize:7}}>Profesional</div>
                  <div className="text-green-600 font-bold" style={{fontSize:10}}>Todos</div>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm flex items-center gap-1.5">
                  <Donut pct={100} color="#16a34a" size={36} />
                  <div><div className="text-gray-400" style={{fontSize:6}}>Estudios realizados</div><div className="text-green-700 font-bold" style={{fontSize:9}}>1288 / 1288</div></div>
                </div>
                <div className="bg-white rounded-lg p-2 shadow-sm flex items-center gap-1.5">
                  <Donut pct={100} color="#16a34a" size={36} />
                  <div><div className="text-gray-400" style={{fontSize:6}}>Total Comisiones</div><div className="text-green-700 font-bold" style={{fontSize:9}}>8.912.500</div></div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1">
                <table className="w-full">
                  <thead><tr className="text-gray-500 border-b border-gray-100 font-bold" style={{fontSize:7}}>
                    <th className="px-2 py-1 text-left">Fecha</th>
                    <th className="px-2 py-1 text-left">Profesional</th>
                    <th className="px-2 py-1 text-left">Estudio</th>
                    <th className="px-2 py-1 text-right">Comisiones</th>
                  </tr></thead>
                  <tbody style={{fontSize:7.5}}>
                    {[
                      ["13/03","Dra. Romero","PROMO control metálico","6000"],
                      ["13/03","Dr. Suárez","RX Panorámica","900"],
                      ["13/03","Dra. Ferreyra","Control metálicos","6000"],
                      ["13/03","Dr. Molina","Control metálicos","6000"],
                      ["13/03","Dra. Castro","PROMO control metálico","6000"],
                    ].map(([f,p,e,c]) => (
                      <tr key={p+e} className="border-b border-gray-50">
                        <td className="px-2 py-0.5 text-gray-400">{f}</td>
                        <td className="px-2 py-0.5 text-green-600 font-medium">{p}</td>
                        <td className="px-2 py-0.5 text-gray-600">{e}</td>
                        <td className="px-2 py-0.5 text-right text-gray-700 font-semibold">{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── RANKING ── */}
          {active === "Ranking" && (
            <div className="flex flex-col gap-1.5 h-full">
              <div className="text-green-600 font-bold text-center" style={{fontSize:11}}>Ranking</div>
              <div className="flex justify-center gap-2 mb-1">
                <span className="bg-green-600 text-white px-2 py-0.5 rounded-full" style={{fontSize:8}}>Comisiones</span>
                <span className="border border-gray-200 text-gray-400 px-2 py-0.5 rounded-full" style={{fontSize:8}}>Estudios</span>
              </div>
              {/* Podio */}
              <div className="flex items-end justify-center gap-2 px-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[7px] font-bold text-gray-500 border-2 border-gray-300">DR</div>
                  <div className="text-gray-600 font-semibold text-center" style={{fontSize:7}}>Dra. Romero</div>
                  <div className="text-green-600 font-bold" style={{fontSize:8}}>847.600</div>
                  <div className="w-10 h-7 bg-gray-300 rounded-t flex items-center justify-center text-white font-bold" style={{fontSize:9}}>2°</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-[7px] font-bold text-green-700 border-2 border-green-400">DF</div>
                  <div className="text-gray-700 font-semibold text-center" style={{fontSize:7}}>Dra. Ferreyra</div>
                  <div className="text-green-600 font-bold" style={{fontSize:9}}>1.192.500</div>
                  <div className="w-10 h-10 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t flex items-center justify-center text-white font-bold" style={{fontSize:10}}>1°</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[7px] font-bold text-orange-600 border-2 border-orange-300">DC</div>
                  <div className="text-gray-600 font-semibold text-center" style={{fontSize:7}}>Dra. Castro</div>
                  <div className="text-green-600 font-bold" style={{fontSize:8}}>829.000</div>
                  <div className="w-10 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t flex items-center justify-center text-white font-bold" style={{fontSize:9}}>3°</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-1">
                <table className="w-full">
                  <thead><tr className="text-gray-500 border-b border-gray-100 font-bold" style={{fontSize:7}}>
                    <th className="px-2 py-1 text-left">#</th>
                    <th className="px-2 py-1 text-left">Profesional</th>
                    <th className="px-2 py-1 text-right">Comisiones</th>
                    <th className="px-2 py-1 text-right">%</th>
                  </tr></thead>
                  <tbody style={{fontSize:7.5}}>
                    {[
                      [4,"Dr. Suárez","665.500","7%"],
                      [5,"Dr. Molina","554.000","6%"],
                      [6,"Dra. Vega","498.000","6%"],
                      [7,"Dr. Peña","443.000","5%"],
                    ].map(([n,p,c,pct]) => (
                      <tr key={String(n)} className="border-b border-gray-50">
                        <td className="px-2 py-0.5 text-gray-400">{n}</td>
                        <td className="px-2 py-0.5 text-gray-700">{p}</td>
                        <td className="px-2 py-0.5 text-right text-gray-700 font-semibold">{c}</td>
                        <td className="px-2 py-0.5 text-right text-gray-400">{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
