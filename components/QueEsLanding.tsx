const puntos = [
  {
    title: "Un solo objetivo",
    description:
      "Sin menús infinitos ni distracciones. Todo en la página empuja a una sola acción: que el visitante te contacte o te compre.",
  },
  {
    title: "Pensada para el celular",
    description:
      "La mayoría de la gente entra desde el teléfono. Carga rápido y se ve perfecta en cualquier pantalla, sin que tengas que hacer nada.",
  },
  {
    title: "Convierte visitas en clientes",
    description:
      "Botón de WhatsApp, formulario o catálogo: la persona que entra deja de ser un número y pasa a ser un contacto real para tu negocio.",
  },
  {
    title: "Lista en pocos días",
    description:
      "Ideal para promocionar en redes o Google Ads. En poco tiempo tenés tu página online y empezás a recibir consultas.",
  },
];

export default function QueEsLanding() {
  return (
    <section id="que-es" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#FF4D00] text-sm font-semibold uppercase tracking-widest mb-3">
            Para qué sirve
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-white mb-5">
            ¿Para qué te sirve?
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto text-lg leading-relaxed">
            Una buena landing no es solo linda — está hecha para que tu negocio venda más.
            Esto es lo que logra:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {puntos.map((p) => (
            <div
              key={p.title}
              className="bg-[#121212] border border-white/10 rounded-2xl p-6 hover:border-[#FF4D00]/40 transition-colors"
            >
              <div className="w-8 h-0.5 bg-[#FF4D00] rounded-full mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#landings"
            className="bg-[#FF4D00] text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-[#ff6a2b] transition-colors inline-block"
          >
            Mirá ejemplos reales
          </a>
        </div>
      </div>
    </section>
  );
}
