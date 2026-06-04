"use client";
import { useMemo, useState } from "react";
import { projects, industryLabels, type Industry } from "@/data/projects";

type FilterValue = "todos" | Industry;

const isVercel = (url?: string) => !!url && url.includes("vercel.app");
const INITIAL = 6;

export default function Landings() {
  const [filter, setFilter] = useState<FilterValue>("todos");
  const [showAll, setShowAll] = useState(false);

  // Solo landings con captura; dominio propio (.com.ar/.com) primero, luego .vercel.app
  const landings = useMemo(
    () =>
      projects
        .filter((p) => p.previewImage)
        .sort((a, b) => Number(isVercel(a.liveUrl)) - Number(isVercel(b.liveUrl))),
    []
  );

  const availableIndustries = useMemo(() => {
    const set = new Set<Industry>();
    landings.forEach((p) => set.add(p.industry));
    return Array.from(set);
  }, [landings]);

  const filtered = useMemo(() => {
    if (filter === "todos") return landings;
    return landings.filter((p) => p.industry === filter);
  }, [filter, landings]);

  const handleFilter = (value: FilterValue) => {
    setFilter(value);
    setShowAll(false);
  };

  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <section id="landings" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Portfolio de landing pages
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Landings que están online
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Páginas reales funcionando ahora mismo. Filtrá por rubro para ver lo que hice en el tuyo — tocá cualquiera para abrirla.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <FilterChip active={filter === "todos"} onClick={() => handleFilter("todos")}>
            Todas · {landings.length}
          </FilterChip>
          {availableIndustries.map((ind) => {
            const count = landings.filter((p) => p.industry === ind).length;
            return (
              <FilterChip key={ind} active={filter === ind} onClick={() => handleFilter(ind)}>
                {industryLabels[ind]} · {count}
              </FilterChip>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <a
              key={p.id}
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-hover bg-[#121212] border border-white/10 hover:border-[#FF4D00]/40 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-48 border-b border-white/10 bg-[#0A0A0A] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.previewImage}
                  alt={`Captura de ${p.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
                {!isVercel(p.liveUrl) && (
                  <span className="absolute top-2 right-2 text-[10px] font-semibold uppercase tracking-wider bg-[#FF4D00] text-white px-2 py-0.5 rounded-full">
                    Dominio propio
                  </span>
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
                <span className="text-[#FF4D00] text-sm font-semibold group-hover:text-white transition-colors inline-flex items-center gap-1">
                  Ver en vivo <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {filtered.length > INITIAL && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="border border-white/20 text-white font-semibold px-8 py-3 rounded-xl hover:border-[#FF4D00]/50 hover:bg-white/5 transition-all"
            >
              {showAll ? "Ver menos" : `Ver todas las landings (${filtered.length})`}
            </button>
          </div>
        )}
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
