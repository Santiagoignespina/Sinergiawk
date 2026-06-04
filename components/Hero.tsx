import { projects, industryLabels } from "@/data/projects";

// WhatsApp de Sinergia (instancia Evolution API)
const WA_NUMERO = "5491170637316";
const WA_MENSAJE = "Hola Santiago! Vi tu portfolio y quiero hablar sobre una web.";
const waLink = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(WA_MENSAJE)}`;

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
          <span className="text-white">¿Qué es</span>
          <br />
          <span className="gradient-text">una landing?</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Una <span className="text-white font-semibold">landing page</span> es una página web pensada para un
          único objetivo: que quien entra termine comprándote, escribiéndote o dejándote sus datos.
          Es tu vendedor trabajando 24/7, sin descanso.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
          <a
            href="#landings"
            className="bg-[#FF4D00] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#ff6a2b] transition-colors text-base"
          >
            Ver landings
          </a>
          <a
            href="#casos"
            className="border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:border-[#FF4D00]/50 hover:bg-white/5 transition-all text-base"
          >
            Ver sistemas
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-[#0A0A0A] font-semibold px-8 py-3.5 rounded-xl hover:bg-[#1ebe57] transition-colors text-base"
          >
            <WhatsAppIcon className="w-5 h-5" />
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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.19.84.85-3.11-.2-.32a8.23 8.23 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}
