"use client";

const rows: [string, string, string, string][] = [
  ["Av. San Martín 1200", "J. Pérez", "05/07", "Al día"],
  ["Belgrano 845 2°B", "M. López", "12/07", "Por vencer"],
  ["Mitre 330 PH", "D. Ruiz", "28/06", "Vencido"],
  ["Rivadavia 2100 4°A", "A. Torres", "15/07", "Al día"],
];

const estadoColor: Record<string, { bg: string; c: string }> = {
  "Al día": { bg: "#dcfce7", c: "#15803d" },
  "Por vencer": { bg: "#fef3c7", c: "#92400e" },
  "Vencido": { bg: "#fee2e2", c: "#b91c1c" },
};

export default function AlquileresDemo() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-xl select-none bg-white" style={{ fontSize: 9 }}>
      <div className="px-3 py-1.5 flex items-center justify-between text-white shrink-0" style={{ background: "#0f766e" }}>
        <span className="font-bold" style={{ fontSize: 10 }}>Alquileres &amp; Contratos</span>
        <span className="text-white/80" style={{ fontSize: 7 }}>4 contratos</span>
      </div>
      <div className="flex-1 overflow-hidden p-1.5">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 border-b border-gray-100" style={{ fontSize: 6.5 }}>
              <th className="px-1 py-1 text-left font-medium">Propiedad</th>
              <th className="px-1 py-1 text-left font-medium">Inquilino</th>
              <th className="px-1 py-1 text-left font-medium">Vence</th>
              <th className="px-1 py-1 text-left font-medium">Estado</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: 7 }}>
            {rows.map(([p, inq, v, e]) => (
              <tr key={p} className="border-b border-gray-50">
                <td className="px-1 py-1 text-gray-700 font-medium truncate">{p}</td>
                <td className="px-1 py-1 text-gray-500">{inq}</td>
                <td className="px-1 py-1 text-gray-400">{v}</td>
                <td className="px-1 py-1">
                  <span
                    className="px-1.5 py-0.5 rounded-full font-semibold"
                    style={{ fontSize: 6, background: estadoColor[e].bg, color: estadoColor[e].c }}
                  >
                    {e}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-2 py-1 border-t border-gray-100 bg-white text-gray-500 truncate shrink-0" style={{ fontSize: 6.5 }}>
        🤖 IA: contrato de Mitre 330 redactado y listo para firmar
      </div>
    </div>
  );
}
