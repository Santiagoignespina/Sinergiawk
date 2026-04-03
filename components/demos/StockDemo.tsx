"use client";
import { useState } from "react";

const TEAL = "#14b8a6";
const TEAL_DARK = "#0f766e";

type AdminTab = "Central" | "Principal" | "Pickeo";
const screens = ["Admin", "Pickeo App", "Historial"] as const;
type Screen = (typeof screens)[number];

const productos = [
  { nombre: "Yerba Mate 500g",    central: 48, principal: 12, pickeo: 96,  objetivo: 120, upb: 12 },
  { nombre: "Arroz Largo Fino 1kg", central: 30, principal: 8,  pickeo: 64,  objetivo: 80,  upb: 10 },
  { nombre: "Fideos Spaghetti",   central: 22, principal: 5,  pickeo: 40,  objetivo: 60,  upb: 8  },
  { nombre: "Aceite Girasol 1.5L",central: 15, principal: 4,  pickeo: 28,  objetivo: 40,  upb: 6  },
];

const historial = [
  { tipo: "pickeo",        label: "Pickeo",        color: "bg-blue-100 text-blue-700",   producto: "Yerba Mate 500g",       cant: -8,  user: "operario1", hora: "14:32" },
  { tipo: "apertura",      label: "Apertura bolsa",color: "bg-amber-100 text-amber-700", producto: "Arroz Largo Fino 1kg",  cant: +10, user: "admin",     hora: "13:15" },
  { tipo: "transferencia", label: "Transferencia", color: "bg-purple-100 text-purple-700",producto: "Fideos Spaghetti",     cant: +5,  user: "admin",     hora: "12:50" },
  { tipo: "ingreso",       label: "Ingreso",       color: "bg-green-100 text-green-700", producto: "Aceite Girasol 1.5L",   cant: +20, user: "admin",     hora: "11:00" },
  { tipo: "pickeo",        label: "Pickeo",        color: "bg-blue-100 text-blue-700",   producto: "Fideos Spaghetti",      cant: -4,  user: "operario2", hora: "10:45" },
];

export default function StockDemo() {
  const [screen, setScreen] = useState<Screen>("Admin");
  const [adminTab, setAdminTab] = useState<AdminTab>("Central");
  const [qtys, setQtys] = useState([1, 1, 1, 1]);
  const [confirmed, setConfirmed] = useState<number | null>(null);

  const handleConfirm = (i: number) => {
    setConfirmed(i);
    setTimeout(() => setConfirmed(null), 1800);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-gray-50 relative" style={{ fontSize: 9 }}>

      {/* Header teal */}
      <div className="flex items-center justify-between px-3 py-1.5 shrink-0 text-white" style={{ background: TEAL_DARK }}>
        <div className="font-bold flex items-center gap-1" style={{ fontSize: 11 }}>
          <span>📦</span>
          <span>Sistema de Stock</span>
        </div>
        <div className="flex gap-1">
          {screens.map((s) => (
            <button
              key={s}
              onClick={() => setScreen(s)}
              className="px-2 py-0.5 rounded font-semibold transition-colors"
              style={{
                fontSize: 7,
                background: screen === s ? "white" : "transparent",
                color: screen === s ? TEAL_DARK : "rgba(255,255,255,0.75)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 text-white/70" style={{ fontSize: 7 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Boatti
        </div>
      </div>

      {/* ── ADMIN ── */}
      {screen === "Admin" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Sub-tabs */}
          <div className="flex border-b border-gray-200 bg-white px-2 pt-1 gap-1 shrink-0">
            {(["Central", "Principal", "Pickeo"] as AdminTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setAdminTab(t)}
                className="px-3 py-1 rounded-t font-semibold transition-colors"
                style={{
                  fontSize: 8,
                  borderBottom: adminTab === t ? `2px solid ${TEAL}` : "2px solid transparent",
                  color: adminTab === t ? TEAL : "#6b7280",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Search + sort */}
          <div className="px-2 py-1.5 flex gap-1.5 bg-white border-b border-gray-100 shrink-0">
            <div className="flex-1 border border-gray-200 rounded px-2 py-0.5 text-gray-400 flex items-center gap-1" style={{ fontSize: 7.5 }}>
              🔍 Buscar producto...
            </div>
            <button className="border border-gray-200 rounded px-2 py-0.5 text-gray-500 font-medium" style={{ fontSize: 7 }}>Nombre ↑</button>
          </div>

          {/* Tabla */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full" style={{ fontSize: 7.5 }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-2 py-1.5 text-gray-600 font-semibold">Producto</th>
                  <th className="text-right px-2 py-1.5 text-gray-600 font-semibold">
                    {adminTab === "Pickeo" ? "Cantidad" : "Bolsas"}
                  </th>
                  {adminTab === "Pickeo" && <th className="text-right px-2 py-1.5 text-gray-600 font-semibold">Objetivo</th>}
                  <th className="px-2 py-1.5" />
                </tr>
              </thead>
              <tbody>
                {productos.map((p, i) => {
                  const qty = adminTab === "Central" ? p.central : adminTab === "Principal" ? p.principal : p.pickeo;
                  const low = adminTab === "Pickeo" && p.pickeo < p.objetivo * 0.4;
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-2 py-1.5 text-gray-800 font-medium">{p.nombre}</td>
                      <td className="px-2 py-1.5 text-right font-bold" style={{ color: low ? "#ef4444" : "#111827" }}>
                        {qty}
                      </td>
                      {adminTab === "Pickeo" && (
                        <td className="px-2 py-1.5 text-right text-gray-400">{p.objetivo}</td>
                      )}
                      <td className="px-2 py-1.5">
                        <div className="flex gap-0.5 justify-end">
                          {adminTab === "Central" && (
                            <>
                              <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: "#6366f1" }}>+ Cargar</span>
                              <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: TEAL }}>→ Enviar</span>
                            </>
                          )}
                          {adminTab === "Principal" && (
                            <>
                              <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: TEAL }}>Abrir bolsa</span>
                              <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: "#f97316" }}>Devolver</span>
                            </>
                          )}
                          {adminTab === "Pickeo" && (
                            <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: "#8b5cf6" }}>Ajustar</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer info */}
          <div className="px-3 py-1 bg-white border-t border-gray-100 flex items-center justify-between shrink-0" style={{ fontSize: 7 }}>
            <span className="text-gray-400">{productos.length} productos · Sucursal: Boatti</span>
            <span className="flex items-center gap-0.5 text-green-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Sincronizado
            </span>
          </div>
        </div>
      )}

      {/* ── PICKEO APP ── */}
      {screen === "Pickeo App" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-3 py-1.5 bg-white border-b border-gray-100 flex items-center gap-1.5 shrink-0">
            <div className="flex-1 border border-gray-200 rounded px-2 py-0.5 text-gray-400 flex items-center gap-1" style={{ fontSize: 7.5 }}>
              🔍 Buscar...
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full" style={{ fontSize: 7.5 }}>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-2 py-1.5 text-gray-600 font-semibold">Producto</th>
                  <th className="text-right px-2 py-1.5 text-gray-600 font-semibold">Stock</th>
                  <th className="text-center px-2 py-1.5 text-gray-600 font-semibold">Cantidad</th>
                  <th className="px-2 py-1.5" />
                </tr>
              </thead>
              <tbody>
                {productos.map((p, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1.5 text-gray-800 font-medium">{p.nombre}</td>
                    <td className="px-2 py-1.5 text-right font-bold text-gray-800">{p.pickeo}</td>
                    <td className="px-2 py-1.5">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setQtys(q => q.map((v, j) => j === i ? Math.max(1, v - 1) : v))}
                          className="w-4 h-4 rounded border border-gray-200 flex items-center justify-center text-gray-500 font-bold" style={{ fontSize: 9 }}>−</button>
                        <span className="w-5 text-center font-bold text-gray-800">{qtys[i]}</span>
                        <button
                          onClick={() => setQtys(q => q.map((v, j) => j === i ? Math.min(p.pickeo, v + 1) : v))}
                          className="w-4 h-4 rounded border border-gray-200 flex items-center justify-center text-gray-500 font-bold" style={{ fontSize: 9 }}>+</button>
                      </div>
                    </td>
                    <td className="px-2 py-1.5">
                      {confirmed === i ? (
                        <span className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: TEAL }}>✓ Registrado</span>
                      ) : (
                        <button onClick={() => handleConfirm(i)} className="px-1.5 py-0.5 rounded text-white font-bold" style={{ fontSize: 6.5, background: TEAL }}>Confirmar</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-3 py-1 bg-white border-t border-gray-100 text-center shrink-0" style={{ fontSize: 7, color: "#9ca3af" }}>
            App de operarios · Retiro de mercadería en tiempo real
          </div>
        </div>
      )}

      {/* ── HISTORIAL ── */}
      {screen === "Historial" && (
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-2 py-1.5 bg-white border-b border-gray-100 shrink-0 flex items-center justify-between">
            <span className="font-semibold text-gray-700" style={{ fontSize: 8.5 }}>Movimientos recientes</span>
            <span className="text-gray-400" style={{ fontSize: 7 }}>Todas las sucursales</span>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1.5">
            {historial.map((m, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-100 px-2 py-1.5 flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded-full font-semibold whitespace-nowrap ${m.color}`} style={{ fontSize: 6.5 }}>{m.label}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate" style={{ fontSize: 7.5 }}>{m.producto}</div>
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{m.user}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-bold" style={{ fontSize: 8, color: m.cant > 0 ? "#16a34a" : "#dc2626" }}>
                    {m.cant > 0 ? "+" : ""}{m.cant}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: 6.5 }}>{m.hora}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-3 py-1 bg-white border-t border-gray-100 text-center shrink-0" style={{ fontSize: 7, color: "#9ca3af" }}>
            Actualizado en tiempo real · Supabase Realtime
          </div>
        </div>
      )}
    </div>
  );
}
