"use client";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import DashboardDemo from "@/components/demos/DashboardDemo";
import TurneroDemo from "@/components/demos/TurneroDemo";
import CRMDemo from "@/components/demos/CRMDemo";
import StockDemo from "@/components/demos/StockDemo";
import BrideonDemo from "@/components/demos/BrideonDemo";
import CRMClinicaDemo from "@/components/demos/CRMClinicaDemo";
import AlquileresDemo from "@/components/demos/AlquileresDemo";

const INITIAL = 6;

const demoMap: Record<string, React.ReactNode> = {
  DashboardDemo: <DashboardDemo />,
  TurneroDemo: <TurneroDemo />,
  CRMDemo: <CRMDemo />,
  StockDemo: <StockDemo />,
  BrideonDemo: <BrideonDemo />,
  CRMClinicaDemo: <CRMClinicaDemo />,
  AlquileresDemo: <AlquileresDemo />,
};

export default function Sistemas() {
  const [showAll, setShowAll] = useState(false);

  const sistemas = useMemo(() => {
    const order = ["mrbracket", "turnero", "stock", "mrbracket-crm", "santos-alquileres", "brideon", "crm-viajes"];
    return projects
      .filter((p) => p.serviceId === "sistemas")
      .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }, []);

  const visible = showAll ? sistemas : sistemas.slice(0, INITIAL);

  return (
    <section id="sistemas" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Software a medida
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-4">
            Sistemas que trabajan con IA
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto text-lg leading-relaxed">
            No solo programo el sistema que tu negocio necesita: le sumo inteligencia artificial
            puesta a <span className="text-white font-semibold">trabajar</span> — que redacte, resuma,
            responda y avise sola. Tocá cada tarjeta para verlos funcionando.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <div
              key={p.id}
              className="card-hover bg-[#121212] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-52 border-b border-white/10 bg-[#0A0A0A] overflow-hidden">
                {p.previewImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.previewImage}
                    alt={`Captura de ${p.name}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full p-2">{p.demo ? demoMap[p.demo] : null}</div>
                )}
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
              </div>
            </div>
          ))}
        </div>

        {sistemas.length > INITIAL && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="border border-white/20 text-white font-semibold px-8 py-3 rounded-xl hover:border-[#FF4D00]/50 hover:bg-white/5 transition-all"
            >
              {showAll ? "Ver menos" : `Ver todos los sistemas (${sistemas.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
