"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import LogoSinergia, { LogoDefs } from "@/components/comunes/LogoSinergia";
import IconoWA from "@/components/comunes/IconoWA";
import DemoFrame from "@/components/comunes/DemoFrame";
import DemoStage from "@/components/comunes/DemoStage";
import FormContacto from "@/components/comunes/FormContacto";
import IntroBienvenida from "./IntroBienvenida";
import PlacaVideo from "./PlacaVideo";
import clips from "./clips.json";
import {
  todos,
  landings,
  sistemas,
  automatizaciones,
  rubros,
  porRubro,
  conteos,
  industryLabels,
  type Industry,
  type Project,
} from "@/lib/catalogo";
import { MARCA, waLink } from "@/lib/marca";

/**
 * Dirección "Vitrina".
 *
 * La home ES el trabajo: una grilla bento en tres secciones (landings,
 * sistemas, automatizaciones). Cada una muestra sus destacados y un botón abre
 * el resto en el lugar. Si se elige un rubro, se abren todas: ya es un recorte
 * que pidió el visitante.
 *
 * Primera versión: las 50 placas a la vista de una. Santiago la vio y pidió
 * destacados + desplegar, porque era un scroll infinito.
 */

// Toda placa con demo va a doble ancho: a un ancho de columna la demo queda a
// 0,7x y no se lee nada. Estas cuatro además llevan descripción y resultado.
const DESTACADAS = ["mrbracket", "mga-flex", "turnero", "stock"];

// Cuántas placas se ven antes de desplegar: dos filas de cada sección.
// Las landings ya vienen ordenadas con las cinco que eligió Santiago primero.
const SECCIONES = [
  {
    id: "landings",
    titulo: "Landings",
    bajada: "Sitios en vivo, pensados para que quien entra te escriba.",
    items: landings,
    visibles: 8,
    sustantivo: "landings",
    femenino: true,
  },
  {
    id: "sistemas",
    titulo: "Sistemas",
    bajada: "Herramientas a medida que un equipo usa todos los días.",
    items: sistemas,
    visibles: 4,
    sustantivo: "sistemas",
    femenino: false,
  },
  {
    id: "automatizaciones",
    titulo: "Automatizaciones",
    bajada: "Tareas que antes hacía una persona y ahora salen solas.",
    items: automatizaciones,
    visibles: 4,
    sustantivo: "automatizaciones",
    femenino: true,
  },
];

const SERVICIOS = [
  {
    titulo: "Landing pages",
    texto: "Una página pensada para que quien entra te escriba. Dominio propio, lista en días.",
  },
  {
    titulo: "Sistemas a medida",
    texto: "Turnos, stock, CRM, reparto. El sistema se adapta a cómo ya trabaja tu equipo.",
  },
  {
    titulo: "Automatizaciones con IA",
    texto: "Recordatorios, respuestas y reportes que salen solos, sin que nadie los toque.",
  },
  {
    titulo: "E-commerce",
    texto: "Catálogo, carrito y pedido directo a WhatsApp, sin comisiones por venta.",
  },
];

function Placa({
  p,
  ancha,
  destacada,
  clip,
}: {
  p: Project;
  ancha: boolean;
  destacada: boolean;
  clip?: string;
}) {
  const contenido = p.demo ? (
    <DemoFrame titulo={p.name} demo={p.demo}>
      <DemoStage demo={p.demo} />
    </DemoFrame>
  ) : p.previewImage ? (
    <div className="placa__captura">
      <Image
        src={p.previewImage}
        alt={`Captura de ${p.name}`}
        fill
        sizes={ancha ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"}
        className="placa__img"
      />
      {clip && <PlacaVideo src={clip} />}
    </div>
  ) : null;

  const cuerpo = (
    <>
      <div className="placa__visual">{contenido}</div>
      <div className="placa__pie">
        <h3 className="placa__nombre">{p.name}</h3>
        <p className="placa__rubro">{industryLabels[p.industry]}</p>
        {destacada && <p className="placa__desc">{p.description}</p>}
        {destacada && p.outcome && <p className="placa__outcome">{p.outcome}</p>}
      </div>
    </>
  );

  if (p.liveUrl) {
    return (
      <a
        className={`placa ${ancha ? "placa--ancha" : ""}`}
        href={p.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {cuerpo}
        <span className="placa__ir">Ver en vivo →</span>
      </a>
    );
  }
  return <div className={`placa ${ancha ? "placa--ancha" : ""}`}>{cuerpo}</div>;
}

function Seccion({
  titulo,
  bajada,
  items,
  visibles,
  sustantivo,
  femenino,
  rubro,
}: {
  titulo: string;
  bajada: string;
  items: Project[];
  visibles: number;
  sustantivo: string;
  femenino: boolean;
  rubro: Industry | "todos";
}) {
  const [abierta, setAbierta] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const filtrados = porRubro(items, rubro);
  if (filtrados.length === 0) return null;

  const conFiltro = rubro !== "todos";
  const expandida = conFiltro || abierta;
  const mostrar = expandida ? filtrados : filtrados.slice(0, visibles);
  const restantes = filtrados.length - visibles;

  const alternar = () => {
    // Al cerrar una sección larga, volver a su encabezado: si no, el visitante
    // queda varias pantallas más abajo mirando la sección siguiente.
    if (abierta) ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setAbierta(!abierta);
  };

  return (
    <section className="seccion" ref={ref}>
      <div className="seccion__cabeza">
        <h3 className="seccion__titulo">
          {titulo} <span className="seccion__cant">{filtrados.length}</span>
        </h3>
        <p className="seccion__bajada">{bajada}</p>
        {filtrados.some((p) => clips.includes(p.id)) && (
          <p className="seccion__pista">Dejá el dedo sobre una landing para verla en movimiento.</p>
        )}
      </div>

      <div className="grilla">
        {mostrar.map((p) => (
          <Placa
            key={p.id}
            p={p}
            ancha={!!p.demo}
            destacada={DESTACADAS.includes(p.id)}
            clip={clips.includes(p.id) ? `/clips/${p.id}.mp4` : undefined}
          />
        ))}
      </div>

      {!conFiltro && restantes > 0 && (
        <button type="button" className="seccion__mas" onClick={alternar}>
          {abierta
            ? "Mostrar menos"
            : `Ver ${restantes === 1 ? (femenino ? "la" : "el") : femenino ? "las" : "los"} ${restantes} ${sustantivo} restantes`}
        </button>
      )}
    </section>
  );
}

export default function Vitrina() {
  const [rubro, setRubro] = useState<Industry | "todos">("todos");

  return (
    <div className="v-vitrina">
      <LogoDefs />
      <IntroBienvenida />
      <header className="nav">
        <a className="nav__marca" href="#top" aria-label={MARCA}>
          <LogoSinergia alto={64} frase />
        </a>
        <nav className="nav__links">
          <a href="#trabajo">Clientes</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="nav__cta" href={waLink()} target="_blank" rel="noopener noreferrer">
          <IconoWA className="nav__wa" />
          Escribinos
        </a>
      </header>

      <main id="top">
        {/* ---------- Portada ---------- */}
        <section className="portada">
          <div className="portada__titulo">
            <h1 className="display">
              Cada proyecto
              <br />
              {/* "una idea" va junta: en el celular "idea" quedaba sola en el tercer renglón */}
              empezó con una{"\u00a0"}idea
            </h1>
            <p className="portada__bajada">
              Algunas se convirtieron en una web. Otras, en un sistema o una automatización.
              Todas tienen algo en común: hoy están funcionando.
            </p>
          </div>

          <div className="portada__cifra portada__cifra--fuerte">
            <strong>{conteos.proyectos}</strong>
            <span>proyectos en producción</span>
          </div>
          <div className="portada__cifra">
            <strong>{conteos.enVivo}</strong>
            <span>sitios en vivo</span>
          </div>
          <div className="portada__cifra">
            <strong>{conteos.rubros}</strong>
            <span>rubros distintos</span>
          </div>
          <div className="portada__cifra">
            <strong>{conteos.conDemo}</strong>
            <span>demos para tocar</span>
          </div>

          <a className="portada__cta" href="#contacto">
            Contame qué necesitás
            <span className="portada__cta-flecha" aria-hidden="true">
              →
            </span>
          </a>
        </section>

        {/* ---------- El trabajo ---------- */}
        <section className="trabajo" id="trabajo">
          <div className="trabajo__encabezado">
            <h2 className="display display--chico">Clientes</h2>
            <div className="filtros">
              <button
                type="button"
                className={`filtro ${rubro === "todos" ? "is-activo" : ""}`}
                onClick={() => setRubro("todos")}
              >
                Todo · {todos.length}
              </button>
              {rubros.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`filtro ${rubro === r.id ? "is-activo" : ""}`}
                  onClick={() => setRubro(r.id)}
                >
                  {r.label} · {r.cantidad}
                </button>
              ))}
            </div>
          </div>

          {SECCIONES.map((sec) => (
            <Seccion
              key={sec.id}
              titulo={sec.titulo}
              bajada={sec.bajada}
              items={sec.items}
              visibles={sec.visibles}
              sustantivo={sec.sustantivo}
              femenino={sec.femenino}
              rubro={rubro}
            />
          ))}
        </section>

        {/* ---------- Servicios ---------- */}
        <section className="servicios" id="servicios">
          <h2 className="display display--chico">Lo que hacemos</h2>
          <div className="servicios__grilla">
            {SERVICIOS.map((s) => (
              <article key={s.titulo} className="servicio">
                <h3 className="servicio__titulo">{s.titulo}</h3>
                <p className="servicio__texto">{s.texto}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Contacto ---------- */}
        <section className="contacto" id="contacto">
          <div className="contacto__intro">
            <h2 className="display display--chico">¿Empezamos?</h2>
            <p className="contacto__bajada">
              Contanos qué necesita tu negocio. Respondemos rápido, y si preferís
              hablar directo, escribinos por WhatsApp.
            </p>
            <a
              className="contacto__wa"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconoWA className="contacto__wa-icono" />
              Escribinos por WhatsApp
            </a>
          </div>
          <div className="contacto__form">
            <FormContacto />
          </div>
        </section>

        <footer className="pie">
          <LogoSinergia alto={22} />
          <span>© {new Date().getFullYear()} · Desarrollo web y sistemas a medida</span>
        </footer>
      </main>

      <a
        className="wa-float"
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribinos por WhatsApp"
      >
        <IconoWA className="wa-float__icono" />
      </a>
    </div>
  );
}
