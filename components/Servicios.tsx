"use client";
import { useState } from "react";
import { projects } from "@/data/projects";
import DashboardDemo from "@/components/demos/DashboardDemo";
import TurneroDemo from "@/components/demos/TurneroDemo";
import AgusmagicplanDemo from "@/components/demos/AgusmagicplanDemo";
import BrideonDemo from "@/components/demos/BrideonDemo";
import StockDemo from "@/components/demos/StockDemo";
import CRMDemo from "@/components/demos/CRMDemo";
import RecordatorioDemo from "@/components/demos/RecordatorioDemo";
import CalificacionDemo from "@/components/demos/CalificacionDemo";
import AusentesDemo from "@/components/demos/AusentesDemo";
import PromocionDemo from "@/components/demos/PromocionDemo";
import InformacionHoraDemo from "@/components/demos/InformacionHoraDemo";
import ComisionesDemo from "@/components/demos/ComisionesDemo";
import PacientesProfesionalDemo from "@/components/demos/PacientesProfesionalDemo";
import RecopilacionChatsDemo from "@/components/demos/RecopilacionChatsDemo";

const demoMap: Record<string, React.ReactNode> = {
  DashboardDemo: <DashboardDemo />,
  TurneroDemo: <TurneroDemo />,
  AgusmagicplanDemo: <AgusmagicplanDemo />,
  BrideonDemo: <BrideonDemo />,
  StockDemo: <StockDemo />,
  CRMDemo: <CRMDemo />,
  RecordatorioDemo: <RecordatorioDemo />,
  CalificacionDemo: <CalificacionDemo />,
  AusentesDemo: <AusentesDemo />,
  PromocionDemo: <PromocionDemo />,
  InformacionHoraDemo: <InformacionHoraDemo />,
  ComisionesDemo: <ComisionesDemo />,
  PacientesProfesionalDemo: <PacientesProfesionalDemo />,
  RecopilacionChatsDemo: <RecopilacionChatsDemo />,
};

const statusLabel: Record<string, { label: string; color: string }> = {
  live: { label: "En producción", color: "bg-green-500/20 text-green-400" },
  desarrollo: { label: "En desarrollo", color: "bg-yellow-500/20 text-yellow-400" },
  concepto: { label: "Concepto", color: "bg-white/10 text-white/40" },
};

const servicios = [
  {
    id: "automatizaciones",
    icon: "⚡",
    title: "Automatizaciones con n8n",
    description:
      "Flujos automáticos que conectan tus apps, envían notificaciones, procesan datos y eliminan trabajo manual repetitivo.",
  },
  {
    id: "agentes-ia",
    icon: "🤖",
    title: "Agentes con IA",
    description:
      "Bots inteligentes que responden clientes, procesan formularios y toman decisiones usando modelos de lenguaje.",
  },
  {
    id: "integraciones",
    icon: "🔗",
    title: "Integraciones y dashboards",
    description:
      "Conecto tus herramientas — CRM, WhatsApp, email, bases de datos — y construyo paneles interactivos que unifican tu información en tiempo real.",
  },
  {
    id: "micrositios",
    icon: "🌐",
    title: "Micrositios para emprendedores",
    description:
      "Landing pages personalizadas con formularios inteligentes, captura de leads por texto o audio, y automatización integrada. Tu presencia digital lista para vender.",
  },
];

export default function Servicios() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section id="servicios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#00C8E8] text-sm font-semibold uppercase tracking-widest mb-3">Lo que hago</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Servicios & Proyectos</h2>
        </div>

        <div className="flex flex-col gap-4">
          {servicios.map((s) => {
            const related = projects.filter((p) => p.serviceId === s.id);
            const isOpen = openId === s.id;

            return (
              <div
                key={s.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-[#00C8E8]/30 bg-[#0d1e35]"
                    : "border-white/5 bg-[#0d1e35] hover:border-white/15"
                }`}
              >
                {/* Header clickeable */}
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{s.title}</h3>
                      <p className="text-white/40 text-sm mt-0.5 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {related.length > 0 && (
                      <span className="text-xs text-[#00C8E8]/60 bg-[#00C8E8]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {related.length} proyecto{related.length > 1 ? "s" : ""}
                      </span>
                    )}
                    <svg
                      className={`w-5 h-5 text-white/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Proyectos expandidos */}
                {isOpen && related.length > 0 && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-5">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Proyectos</p>
                    <div className="grid md:grid-cols-2 gap-5">
                      {related.map((project) => {
                        const status = statusLabel[project.status];
                        return (
                          <div
                            key={project.id}
                            className="bg-[#0a1628] border border-white/5 rounded-xl overflow-hidden"
                          >
                            {project.demo && demoMap[project.demo] && (
                              <div className="h-72 border-b border-white/5">
                                {demoMap[project.demo]}
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-white font-semibold">{project.name}</h4>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${status.color}`}>
                                  {status.label}
                                </span>
                              </div>
                              <p className="text-white/40 text-sm leading-relaxed mb-3">{project.description}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.tags.map((tag) => (
                                  <span key={tag} className="text-xs text-[#00C8E8]/60 bg-[#00C8E8]/10 px-2 py-0.5 rounded-full">
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
                )}

                {/* Sin proyectos aún */}
                {isOpen && related.length === 0 && (
                  <div className="px-6 pb-6 border-t border-white/5 pt-5 text-center">
                    <p className="text-white/20 text-sm">Próximos proyectos en camino.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
