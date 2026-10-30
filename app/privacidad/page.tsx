import type { Metadata } from "next";
import Link from "next/link";

// Política de privacidad de Sinergia (30/10/2026). La pide Meta para la app de WhatsApp (Tech Provider, plan
// del CRM Mr. Bracket, sección 11). Escrita según la Ley 25.326 de Protección de los Datos Personales.
// Datos de TITULAR: los pasó Santiago el 30/10/2026.
const TITULAR = {
  nombre: "Santiago Ignacio Espina",
  cuit: "20-35366687-9",
  domicilio: "Conde 2345, Ciudad Autónoma de Buenos Aires",
  mail: "sinergia.wk@gmail.com",
};
const ACTUALIZADA = "30 de octubre de 2026";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Sinergia trata los datos personales en su sitio web y en los sistemas que desarrolla para sus clientes.",
};

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      {children}
    </section>
  );
}

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-[#ece9e2] text-[#15161a]">
      <article className="mx-auto max-w-3xl px-4 py-16 space-y-8 leading-relaxed">
        <header className="space-y-2">
          <Link href="/" className="text-sm text-[#e8442b] hover:underline">
            ← Volver a Sinergia
          </Link>
          <h1 className="text-3xl font-semibold">Política de privacidad</h1>
          <p className="text-sm opacity-70">Última actualización: {ACTUALIZADA}</p>
        </header>

        <p>
          En Sinergia desarrollamos sitios web, sistemas a medida y automatizaciones para negocios. Esta política explica
          qué datos personales tratamos, para qué, con quién los compartimos y cómo podés ejercer tus derechos. Se aplica a
          este sitio (sinergiawk.com) y a los sistemas que operamos para nuestros clientes, incluidas las integraciones con
          WhatsApp.
        </p>

        <Seccion titulo="1. Quién es el responsable">
          <p>
            {TITULAR.nombre} (Sinergia), CUIT {TITULAR.cuit}, con domicilio en {TITULAR.domicilio}, República Argentina.
            Contacto: <a className="underline" href={`mailto:${TITULAR.mail}`}>{TITULAR.mail}</a>.
          </p>
        </Seccion>

        <Seccion titulo="2. Datos que tratamos">
          <p>
            <b>Cuando nos escribís desde este sitio:</b> el nombre, el medio de contacto que nos dejes (teléfono, WhatsApp o
            mail) y el contenido de tu consulta, en texto o audio. Los usamos solo para responderte.
          </p>
          <p>
            <b>Cuando trabajamos para un cliente:</b> algunos de nuestros clientes (por ejemplo, clínicas y comercios) usan
            sistemas que desarrollamos y operamos, como un CRM conectado a su número de WhatsApp Business. En ese caso
            tratamos, <b>por cuenta y orden de ese cliente</b>, los datos de las personas que se comunican con él: nombre,
            número de teléfono, los mensajes y archivos que envían o reciben por WhatsApp (por ejemplo, fotos) y los datos
            que el cliente cargue en su sistema, como turnos o fichas. El responsable de esos datos es el cliente; Sinergia
            actúa como encargado del tratamiento y los usa únicamente para prestarle el servicio.
          </p>
        </Seccion>

        <Seccion titulo="3. Para qué los usamos">
          <ul className="list-disc pl-6 space-y-1">
            <li>Responder consultas y presupuestos.</li>
            <li>
              Hacer funcionar los sistemas de nuestros clientes: recibir y mostrar sus conversaciones de WhatsApp en su
              CRM, gestionar turnos, enviar los mensajes que el cliente decida y guardar el historial.
            </li>
            <li>Mantener la seguridad de los sistemas y resolver errores.</li>
          </ul>
          <p>No vendemos datos personales ni los usamos para publicidad propia o de terceros.</p>
        </Seccion>

        <Seccion titulo="4. WhatsApp y Meta">
          <p>
            Cuando un cliente conecta su número de WhatsApp Business a nuestros sistemas, recibimos los mensajes a través de
            la plataforma de WhatsApp Business de Meta Platforms, Inc. y de las herramientas que el cliente autoriza. Usamos
            esa información solo para mostrarla en el sistema del cliente y operar su atención. El uso de WhatsApp también
            está sujeto a las políticas de WhatsApp y Meta.
          </p>
        </Seccion>

        <Seccion titulo="5. Con quién se comparten">
          <p>
            Con proveedores de infraestructura que necesitamos para prestar el servicio y que guardan los datos en nuestro
            nombre: alojamiento web (Vercel), base de datos (Supabase), servidores de automatización y la plataforma de
            WhatsApp Business de Meta. Algunos de ellos pueden almacenar datos fuera de la Argentina, con medidas de
            seguridad adecuadas. No compartimos datos con otros terceros, salvo obligación legal.
          </p>
        </Seccion>

        <Seccion titulo="6. Cuánto tiempo se guardan">
          <p>
            Las consultas del sitio, mientras dure el intercambio y hasta un año después. Los datos que tratamos por cuenta
            de un cliente, mientras dure el servicio con ese cliente; al terminar, se devuelven o se eliminan según lo que el
            cliente indique.
          </p>
        </Seccion>

        <Seccion titulo="7. Seguridad">
          <p>
            Los sistemas tienen acceso con usuario y contraseña, conexiones cifradas, permisos por rol y copias de
            seguridad. Las claves de acceso a servicios externos se guardan solo en los servidores.
          </p>
        </Seccion>

        <Seccion titulo="8. Tus derechos">
          <p>
            Podés pedir acceso, rectificación, actualización o supresión de tus datos escribiendo a{" "}
            <a className="underline" href={`mailto:${TITULAR.mail}`}>{TITULAR.mail}</a>. Respondemos en los plazos de la Ley
            25.326 (10 días corridos para el acceso y 5 días hábiles para la rectificación o supresión). Si tus datos los
            tratamos por cuenta de un cliente (por ejemplo, la clínica a la que le escribiste), también podés dirigirte a
            ese cliente y nosotros lo asistimos.
          </p>
          <p className="text-sm opacity-80">
            La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la
            atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
            incumplimiento de las normas vigentes en materia de protección de datos personales.
          </p>
        </Seccion>

        <Seccion titulo="9. Cambios">
          <p>
            Si cambiamos esta política, publicamos la nueva versión en esta misma página con su fecha de actualización.
          </p>
        </Seccion>
      </article>
    </main>
  );
}
