"use client";
import { useMemo, useState } from "react";
import { projects, industryLabels, type Industry } from "@/data/projects";
import BrideonDemo from "@/components/demos/BrideonDemo";
import StockDemo from "@/components/demos/StockDemo";
import RecordatorioDemo from "@/components/demos/RecordatorioDemo";
import CalificacionDemo from "@/components/demos/CalificacionDemo";
import AusentesDemo from "@/components/demos/AusentesDemo";
import PromocionDemo from "@/components/demos/PromocionDemo";
import InformacionHoraDemo from "@/components/demos/InformacionHoraDemo";
import ComisionesDemo from "@/components/demos/ComisionesDemo";
import PacientesProfesionalDemo from "@/components/demos/PacientesProfesionalDemo";
import RecopilacionChatsDemo from "@/components/demos/RecopilacionChatsDemo";

const demoMap: Record<string, React.ReactNode> = {
  BrideonDemo: <BrideonDemo />,
  StockDemo: <StockDemo />,
  RecordatorioDemo: <RecordatorioDemo />,
  CalificacionDemo: <CalificacionDemo />,
  AusentesDemo: <AusentesDemo />,
  PromocionDemo: <PromocionDemo />,
  InformacionHoraDemo: <InformacionHoraDemo />,
  ComisionesDemo: <ComisionesDemo />,
  PacientesProfesionalDemo: <PacientesProfesionalDemo />,
  RecopilacionChatsDemo: <RecopilacionChatsDemo />,
};

type FilterValue = "todos" | Industry;

export default function Galeria() {
  const [filter, setFilter] = useState<FilterValue>("todos");

  const galleryProjects = useMemo(() => projects.filter((p) => !p.featured), []);

  const availableIndustries = useMemo(() => {
    const set = new Set<Industry>();
    galleryProjects.forEach((p) => set.add(p.industry));
    return Array.from(set);
  }, [galleryProjects]);

  const filtered = useMemo(() => {
    if (filter === "todos") return galleryProjects;
    return galleryProjects.filter((p) => p.industry === filter);
  }, [filter, galleryProjects]);

  return (
    <section id="proyectos" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Trabajos reales
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Webs, e-commerce y sistemas que están online ahora mismo. Filtrá por rubro para ver lo que hice en el tuyo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <FilterChip active={filter === "todos"} onClick={() => setFilter("todos")}>
            Todos · {galleryProjects.length}
          </FilterChip>
          {availableIndustries.map((ind) => {
            const count = galleryProjects.filter((p) => p.industry === ind).length;
            return (
              <FilterChip key={ind} active={filter === ind} onClick={() => setFilter(ind)}>
                {industryLabels[ind]} · {count}
              </FilterChip>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => {
            const demo = p.demo ? demoMap[p.demo] : null;
            const CardInner = (
              <>
                <div className="h-48 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-center overflow-hidden relative">
                  {p.previewImage ? (
                    <img
                      src={p.previewImage}
                      alt={`Captura de ${p.name}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : demo ? (
                    demo
                  ) : (
                    <div className="text-center px-6">
                      <div className="text-3xl mb-2 opacity-40">🖥️</div>
                      <div className="text-xs uppercase tracking-widest text-white/30">
                        {industryLabels[p.industry]}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-semibold leading-tight mb-2">{p.name}</h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-[#FF4D00]/80 bg-[#FF4D00]/10 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.liveUrl && (
                    <span className="text-[#FF4D00] text-sm font-semibold group-hover:text-white transition-colors inline-flex items-center gap-1">
                      Ver en vivo <span aria-hidden>→</span>
                    </span>
                  )}
                </div>
              </>
            );

            const cardClass =
              "group card-hover bg-[#121212] border border-white/10 hover:border-[#FF4D00]/40 rounded-2xl overflow-hidden flex flex-col";

            return p.liveUrl ? (
              <a
                key={p.id}
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {CardInner}
              </a>
            ) : (
              <div key={p.id} className={cardClass}>
                {CardInner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-4 py-2 rounded-full border transition-all ${
        active
          ? "bg-[#FF4D00] text-white border-[#FF4D00] font-semibold"
          : "bg-white/5 border-white/10 text-white/60 hover:border-white/25 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
