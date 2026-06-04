const servicios = [
  {
    id: "web",
    icon: "🌐",
    title: "Landing pages & sitios web",
    description:
      "Webs a medida para tu negocio: rápidas, atractivas y pensadas para convertir visitas en clientes. Diseño único según tu rubro — nada de plantillas genéricas.",
  },
  {
    id: "ecommerce",
    icon: "🛒",
    title: "E-commerce & catálogos",
    description:
      "Tiendas online con catálogo, filtros, carrito y checkout — con medios de pago o pedido directo a WhatsApp. Que tu producto se venda solo.",
  },
  {
    id: "sistemas",
    icon: "📊",
    title: "Sistemas & dashboards a medida",
    description:
      "El software que tu negocio necesita: CRMs, stock, turnos, paneles en tiempo real. Conecto tus herramientas y unifico la información en un solo lugar.",
  },
  {
    id: "automatizaciones",
    icon: "⚡",
    title: "Automatizaciones & IA",
    description:
      "Flujos automáticos con n8n e IA: recordatorios, reportes, respuestas a clientes. El trabajo repetitivo se hace solo, 24/7, sin sumar gente.",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Qué hago
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Servicios
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Desde una landing simple hasta un sistema completo — diseño la solución según lo que tu negocio necesita.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {servicios.map((s) => (
            <div
              key={s.id}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-[#FF4D00]/40 transition-colors"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
