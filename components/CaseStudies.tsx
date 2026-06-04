"use client";
import { projects, industryLabels } from "@/data/projects";
import DashboardDemo from "@/components/demos/DashboardDemo";
import TurneroDemo from "@/components/demos/TurneroDemo";
import CRMDemo from "@/components/demos/CRMDemo";

const demoMap: Record<string, React.ReactNode> = {
  DashboardDemo: <DashboardDemo />,
  TurneroDemo: <TurneroDemo />,
  CRMDemo: <CRMDemo />,
};

export default function CaseStudies() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="casos" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Casos destacados
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Problemas reales, resultados concretos
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Tres proyectos en producción donde construí el sistema completo — desde el problema operativo hasta la solución en uso diario.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {featured.map((p, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={p.id}
                className={`grid lg:grid-cols-2 gap-8 items-center bg-[#121212] border border-white/10 rounded-3xl overflow-hidden p-2 lg:p-3`}
              >
                <div
                  className={`h-72 lg:h-80 rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] ${
                    reverse ? "lg:order-2" : ""
                  }`}
                >
                  {p.demo && demoMap[p.demo]}
                </div>

                <div className={`p-6 lg:p-8 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs uppercase tracking-widest text-[#FF4D00]/70">
                      {industryLabels[p.industry]}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs uppercase tracking-widest text-white/40">
                      Caso #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {p.name}
                  </h3>

                  <p className="text-white/55 leading-relaxed mb-5">{p.description}</p>

                  {p.outcome && (
                    <div className="border-l-2 border-[#FF4D00] pl-4 py-1 mb-5">
                      <p className="text-white/80 text-sm leading-relaxed">
                        <span className="text-[#FF4D00] font-semibold">Resultado: </span>
                        {p.outcome}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#FF4D00]/70 bg-[#FF4D00]/10 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
