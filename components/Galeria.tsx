"use client";
import { useMemo, useState } from "react";
import { projects, industryLabels } from "@/data/projects";
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

const INITIAL = 6;

export default function Galeria() {
  const [showAll, setShowAll] = useState(false);

  // Sistemas y automatizaciones: no destacados y sin captura (tienen demo interactiva)
  const items = useMemo(
    () => projects.filter((p) => !p.featured && !p.previewImage && p.demo),
    []
  );

  const visible = showAll ? items : items.slice(0, INITIAL);

  return (
    <section id="automatizaciones" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Más allá de las webs
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Sistemas y automatizaciones
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            E-commerce, paneles de gestión y flujos con IA que trabajan solos. Tocá cada tarjeta para ver una demo interactiva.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <div
              key={p.id}
              className="card-hover bg-[#121212] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-44 border-b border-white/10 bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                {p.demo ? demoMap[p.demo] : null}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold leading-tight mb-2">{p.name}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#FF4D00]/80 bg-[#FF4D00]/10 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-3 text-xs uppercase tracking-widest text-white/30">
                  {industryLabels[p.industry]}
                </span>
              </div>
            </div>
          ))}
        </div>

        {items.length > INITIAL && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="border border-white/20 text-white font-semibold px-8 py-3 rounded-xl hover:border-[#FF4D00]/50 hover:bg-white/5 transition-all"
            >
              {showAll ? "Ver menos" : `Ver todo (${items.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
