// Un solo mapa demo -> componente. Antes estaba duplicado en Sistemas.tsx y
// Galeria.tsx, y ese duplicado es la razón de que dos demos nunca se vieran.

import type { ComponentType } from "react";

import AlquileresDemo from "@/components/demos/AlquileresDemo";
import AusentesDemo from "@/components/demos/AusentesDemo";
import CRMClinicaDemo from "@/components/demos/CRMClinicaDemo";
import CRMDemo from "@/components/demos/CRMDemo";
import CalificacionDemo from "@/components/demos/CalificacionDemo";
import ComisionesDemo from "@/components/demos/ComisionesDemo";
import DashboardDemo from "@/components/demos/DashboardDemo";
import InformacionHoraDemo from "@/components/demos/InformacionHoraDemo";
import MgaDemo from "@/components/demos/MgaDemo";
import PacientesProfesionalDemo from "@/components/demos/PacientesProfesionalDemo";
import PromocionDemo from "@/components/demos/PromocionDemo";
import RecopilacionChatsDemo from "@/components/demos/RecopilacionChatsDemo";
import RecordatorioDemo from "@/components/demos/RecordatorioDemo";
import StockDemo from "@/components/demos/StockDemo";
import TurneroDemo from "@/components/demos/TurneroDemo";

/** De qué color es la demo por dentro. Decide el color del paspartú del marco:
 *  nunca se pega el fondo de la variante contra el borde de la demo. */
export type Tono = "claro" | "oscuro" | "color";

type Entrada = { Componente: ComponentType; tono: Tono };

export const demoRegistry: Record<string, Entrada> = {
  // Sistemas
  DashboardDemo: { Componente: DashboardDemo, tono: "claro" },
  TurneroDemo: { Componente: TurneroDemo, tono: "claro" },
  CRMDemo: { Componente: CRMDemo, tono: "claro" },
  CRMClinicaDemo: { Componente: CRMClinicaDemo, tono: "claro" },
  MgaDemo: { Componente: MgaDemo, tono: "claro" },
  StockDemo: { Componente: StockDemo, tono: "color" },
  AlquileresDemo: { Componente: AlquileresDemo, tono: "color" },

  // Automatizaciones n8n — todas sobre #0c0c14
  RecordatorioDemo: { Componente: RecordatorioDemo, tono: "oscuro" },
  CalificacionDemo: { Componente: CalificacionDemo, tono: "oscuro" },
  AusentesDemo: { Componente: AusentesDemo, tono: "oscuro" },
  PromocionDemo: { Componente: PromocionDemo, tono: "oscuro" },
  InformacionHoraDemo: { Componente: InformacionHoraDemo, tono: "oscuro" },
  ComisionesDemo: { Componente: ComisionesDemo, tono: "oscuro" },
  PacientesProfesionalDemo: { Componente: PacientesProfesionalDemo, tono: "oscuro" },
  RecopilacionChatsDemo: { Componente: RecopilacionChatsDemo, tono: "oscuro" },
};

export function buscarDemo(nombre?: string): Entrada | null {
  if (!nombre) return null;
  return demoRegistry[nombre] ?? null;
}
