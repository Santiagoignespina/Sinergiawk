import { projects } from "@/data/projects";
import DashboardDemo from "@/components/demos/DashboardDemo";

const demoMap: Record<string, React.ReactNode> = {
  DashboardDemo: <DashboardDemo />,
};

const statusLabel: Record<string, { label: string; color: string }> = {
  live: { label: "En producción", color: "bg-green-500/20 text-green-400" },
  desarrollo: { label: "En desarrollo", color: "bg-yellow-500/20 text-yellow-400" },
  concepto: { label: "Concepto", color: "bg-white/10 text-white/40" },
};

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#00C8E8] text-sm font-semibold uppercase tracking-widest mb-3">Lo que construyo</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Proyectos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const status = statusLabel[project.status];
            return (
              <div
                key={project.id}
                className="card-hover bg-[#0d1e35] border border-white/5 rounded-2xl overflow-hidden"
              >
                {/* Demo window */}
                {project.demo && demoMap[project.demo] && (
                  <div className="h-52 border-b border-white/5">
                    {demoMap[project.demo]}
                  </div>
                )}

                {/* Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-white text-xl font-semibold">{project.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-[#00C8E8]/70 bg-[#00C8E8]/10 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
