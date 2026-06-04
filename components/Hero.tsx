import { projects, industryLabels } from "@/data/projects";

export default function Hero() {
  const totalProjects = projects.length;
  const totalIndustries = new Set(projects.map((p) => p.industry)).size;
  const liveSites = projects.filter((p) => p.liveUrl).length;

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* glow naranja sutil */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D00]/10 rounded-full blur-[130px] pointer-events-none" />
      {/* grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        <div className="inline-flex items-center gap-2 border border-[#FF4D00]/30 bg-[#FF4D00]/10 text-[#FF4D00] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-pulse" />
          Desarrollo web · Sistemas a medida
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight mb-6">
          <span className="text-white">Tu próxima web,</span>
          <br />
          <span className="gradient-text">hecha a medida.</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseño y programo landing pages, e-commerce y sistemas a medida para negocios
          y emprendedores. Nada de plantillas: cada proyecto, único y pensado para vender.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#proyectos"
            className="bg-[#FF4D00] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#ff6a2b] transition-colors text-base"
          >
            Ver mis trabajos
          </a>
          <a
            href="#contacto"
            className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:border-[#FF4D00]/50 hover:bg-white/5 transition-all text-base"
          >
            Hablemos
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto border-t border-white/10 pt-10">
          {[
            { value: `+${totalProjects}`, label: "Proyectos en producción" },
            { value: `+${liveSites}`, label: "Sitios en vivo" },
            { value: `${totalIndustries}`, label: "Rubros distintos" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-[#FF4D00] text-3xl font-bold">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
          {Object.values(industryLabels).map((label) => (
            <span
              key={label}
              className="text-xs text-white/30 border border-white/10 px-2.5 py-0.5 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
