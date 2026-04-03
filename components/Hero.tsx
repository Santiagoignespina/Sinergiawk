import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Glow suave - sin fondo sólido para que se vea el logo fijo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00C8E8]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#00C8E8]/30 bg-[#00C8E8]/10 text-[#00C8E8] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-[#00C8E8] rounded-full animate-pulse" />
          Automatizaciones con IA
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="gradient-text">Sistemas que trabajan</span>
          <br />
          <span className="text-white">mientras vos creás.</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseño y construyo automatizaciones inteligentes y sistemas a medida que unifican tu información,
          eliminan tareas repetitivas y escalan con tu negocio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#proyectos"
            className="bg-[#00C8E8] text-[#0a1628] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#00b8d4] transition-colors text-base"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:border-[#00C8E8]/50 hover:bg-white/5 transition-all text-base"
          >
            Hablemos
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto border-t border-white/10 pt-10">
          {[
            { value: "n8n", label: "Automatizaciones" },
            { value: "IA", label: "Inteligencia aplicada" },
            { value: "24/7", label: "Sistemas activos" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[#00C8E8] text-2xl font-bold">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
