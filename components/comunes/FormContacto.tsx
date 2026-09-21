"use client";

import AudioRecorder from "@/components/AudioRecorder";
import { useContacto } from "@/lib/useContacto";

/**
 * Markup del formulario. Las clases son semánticas y sin estilo propio: las
 * pinta la Vitrina desde components/vitrina/vitrina.css.
 */
export default function FormContacto() {
  const c = useContacto();

  if (c.exito) {
    return (
      <div className="form form--exito">
        <p className="form__exito-titulo">¡Mensaje enviado!</p>
        <p className="form__exito-texto">
          Gracias {c.nombre}. Te respondemos a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={c.enviar}>
      <div className="form__campo">
        <label className="form__label" htmlFor="f-nombre">
          Nombre *
        </label>
        <input
          id="f-nombre"
          className="form__input"
          type="text"
          placeholder="Tu nombre"
          value={c.nombre}
          onChange={(e) => c.setNombre(e.target.value)}
        />
      </div>

      <div className="form__campo">
        <label className="form__label" htmlFor="f-celular">
          Celular *
        </label>
        <input
          id="f-celular"
          className="form__input"
          type="tel"
          placeholder="+54 9 11 1234-5678"
          value={c.celular}
          onChange={(e) => c.setCelular(e.target.value)}
        />
      </div>

      {/* Honeypot: invisible para personas, tentador para bots */}
      <input
        className="form__trampa"
        type="text"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={c.empresa}
        onChange={(e) => c.setEmpresa(e.target.value)}
      />

      <div className="form__campo">
        <span className="form__label">¿Cómo preferís contarnos?</span>
        <div className="form__modos">
          <button
            type="button"
            className={`form__modo ${c.modo === "texto" ? "is-activo" : ""}`}
            onClick={() => c.setModo("texto")}
          >
            Escribir
          </button>
          <button
            type="button"
            className={`form__modo ${c.modo === "audio" ? "is-activo" : ""}`}
            onClick={() => c.setModo("audio")}
          >
            Mandar audio
          </button>
        </div>
      </div>

      {c.modo === "texto" ? (
        <div className="form__campo">
          <label className="form__label" htmlFor="f-mensaje">
            Tu mensaje
          </label>
          <textarea
            id="f-mensaje"
            className="form__input form__textarea"
            rows={4}
            placeholder="Contanos qué necesitás: una web, un sistema, una automatización..."
            value={c.mensaje}
            onChange={(e) => c.setMensaje(e.target.value)}
          />
        </div>
      ) : (
        <div className="form__campo">
          <span className="form__label">Mensaje de voz</span>
          <div className="form__grabador">
            <AudioRecorder onAudioReady={(blob) => c.setAudio(blob)} />
          </div>
        </div>
      )}

      {c.error && <p className="form__error">{c.error}</p>}

      <button type="submit" className="form__enviar" disabled={c.cargando}>
        {c.cargando ? "Enviando..." : "Enviar consulta"}
      </button>
    </form>
  );
}
