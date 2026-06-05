export type Industry =
  | "salud"
  | "turismo"
  | "retail"
  | "automotor"
  | "deportes"
  | "educacion"
  | "servicios";

export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  demo?: string;
  status: "live" | "desarrollo" | "concepto";
  serviceId: string;
  industry: Industry;
  liveUrl?: string;
  previewImage?: string;
  featured?: boolean;
  outcome?: string;
};

export const industryLabels: Record<Industry, string> = {
  salud: "Salud",
  turismo: "Turismo",
  retail: "Retail & E-commerce",
  automotor: "Automotor",
  deportes: "Deportes",
  educacion: "Educación",
  servicios: "Servicios profesionales",
};

export const projects: Project[] = [
  // ───────────────────────── CASOS DESTACADOS (sistemas con demo interactiva)
  {
    id: "mrbracket",
    name: "Dashboard de gestión para clínica",
    description:
      "Panel de gestión comercial para una clínica con múltiples sucursales: KPIs de facturación en tiempo real, búsqueda avanzada de pacientes y ranking del equipo. Con IA que resume el día y avisa cuando la facturación se sale de lo normal.",
    tags: ["React", "TypeScript", "Supabase"],
    demo: "DashboardDemo",
    status: "live",
    serviceId: "sistemas",
    industry: "salud",
    featured: true,
    outcome:
      "Reemplazó 4 planillas Excel manuales por un panel en tiempo real con datos de 6 sucursales.",
  },
  {
    id: "turnero",
    name: "Turnero de Clínica en Tiempo Real",
    description:
      "Sistema de gestión de colas en tiempo real para clínica. Kiosco táctil de autoingreso, panel de recepción, pantalla TV con anuncios por voz y panel por consultorio. Comunicación instantánea vía SSE.",
    tags: ["Next.js", "Supabase", "SSE", "Real-time", "Kiosco"],
    demo: "TurneroDemo",
    status: "live",
    serviceId: "sistemas",
    industry: "salud",
    featured: true,
    outcome:
      "Eliminó la gestión manual de turnos: kiosco, recepción, consultorios y TV sincronizados.",
  },
  {
    id: "crm-viajes",
    name: "CRM para agencia de viajes",
    description:
      "CRM para agentes de viajes: leads desde múltiples canales (WhatsApp, email, redes), seguimiento por estado, tareas con vencimientos y conversión a cliente. La IA redacta las respuestas y prioriza los leads más calientes.",
    tags: ["Next.js", "Supabase", "n8n", "WhatsApp", "TypeScript"],
    demo: "CRMDemo",
    status: "live",
    serviceId: "sistemas",
    industry: "turismo",
    featured: true,
    outcome:
      "Unificó 5 canales de captación de leads en una sola bandeja con seguimiento automático.",
  },
  {
    id: "mrbracket-crm",
    name: "CRM para clínica / consultorio",
    description:
      "Seguimiento de pacientes, leads y tratamientos por etapa, con recordatorios y mensajes automáticos. La IA resume las conversaciones de cada paciente y sugiere el próximo paso a dar.",
    tags: ["Next.js", "Supabase", "IA", "WhatsApp"],
    demo: "CRMClinicaDemo",
    previewImage: "/shots/mrbracket-crm.jpg",
    status: "live",
    serviceId: "sistemas",
    industry: "salud",
  },
  {
    id: "santos-alquileres",
    name: "Administración de alquileres y contratos",
    description:
      "Sistema para inmobiliaria: propiedades, inquilinos, vencimientos y contratos en un solo lugar, con avisos automáticos por WhatsApp. La IA redacta y revisa contratos en segundos.",
    tags: ["Next.js", "Supabase", "IA", "WhatsApp"],
    demo: "AlquileresDemo",
    previewImage: "/shots/santos-alquileres.jpg",
    status: "live",
    serviceId: "sistemas",
    industry: "servicios",
  },

  // ───────────────────────── LANDINGS & SITIOS (con screenshot real)
  {
    id: "lucardetail",
    name: "Lucar Detail — Estética Vehicular",
    description:
      "Landing para centro de detailing y estética vehicular en Caballito. Reserva de turnos online, servicios, precios y opción de servicio a domicilio. Diseño dark con tipografía de alto impacto.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "automotor",
    liveUrl: "https://lucardetail.vercel.app",
    previewImage: "/shots/lucardetail.jpg",
  },
  {
    id: "santos-propiedades",
    name: "Santos Propiedades — Inmobiliaria",
    description:
      "Sitio para inmobiliaria en CABA: listado de propiedades en venta y alquiler con filtros por ubicación, tipo, precio y ambientes. Fichas con fotos y contacto directo.",
    tags: ["Next.js", "Supabase", "Tailwind"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://santos-propiedades.vercel.app/",
    previewImage: "/shots/santos-propiedades.jpg",
  },
  {
    id: "cfstore",
    name: "CF Store Cali — Sneakers",
    description:
      "E-commerce de zapatillas con catálogo, filtros, carrito persistente y checkout directo a WhatsApp. Estética neón sobre dark, envíos a todo el país.",
    tags: ["Next.js", "Tailwind v4", "E-commerce", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "retail",
    liveUrl: "https://cfstore-ashy.vercel.app",
    previewImage: "/shots/cfstore.jpg",
  },
  {
    id: "food-trucks-triple-c",
    name: "Food Trucks Triple C",
    description:
      "Landing para fabricante de food trucks personalizados: proceso de fabricación, galería de trailers, ventajas de comprar directo de fábrica y contacto. Diseño con identidad gastronómica.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "automotor",
    liveUrl: "https://food-trucks-triple-c.vercel.app",
    previewImage: "/shots/food-trucks-triple-c.jpg",
  },
  {
    id: "ccv",
    name: "Campeonato Cordobés de Velocidad",
    description:
      "Landing oficial del campeonato de motociclismo deportivo: calendario de fechas, categorías e inscripción online con formulario integrado a Google Sheets vía Apps Script.",
    tags: ["React", "Vite", "Apps Script", "Google Sheets"],
    status: "live",
    serviceId: "web",
    industry: "deportes",
    liveUrl: "https://campeonato-cordobes-de-velocidad.vercel.app",
    previewImage: "/shots/ccv.jpg",
  },
  {
    id: "dinacars",
    name: "Dinacars — Traslados Turísticos",
    description:
      "Landing para servicio de traslados turísticos en Puerto Madryn: experiencias destacadas, formulario de reserva con destino, fecha y pasajeros, y envío directo a WhatsApp del operador.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "turismo",
    liveUrl: "https://dinacars.com.ar",
    previewImage: "/shots/dinacars.jpg",
  },
  {
    id: "agusmagicplan",
    name: "Agusmagicplan — Viajes Disney",
    description:
      "Micrositio para agente certificada Disney & Universal. Hero con identidad visual, sección de parques y formulario inteligente con captura de leads por texto o audio grabado, integrado a n8n.",
    tags: ["React", "Vite", "Tailwind", "n8n", "Audio"],
    status: "live",
    serviceId: "web",
    industry: "turismo",
    liveUrl: "https://agusmagicplan.vercel.app",
    previewImage: "/shots/agusmagicplan.jpg",
  },
  {
    id: "casi-creativos",
    name: "Casi Creativos — Packs Digitales",
    description:
      "Tienda de packs de contenido para redes con checkout y entrega automática. Catálogo de packs, proceso de compra simple y canal de novedades por WhatsApp.",
    tags: ["Next.js", "Neon", "Vercel Blob", "E-commerce"],
    status: "live",
    serviceId: "web",
    industry: "retail",
    liveUrl: "https://casi-creativos.vercel.app",
    previewImage: "/shots/casi-creativos.jpg",
  },
  {
    id: "trucos-para-el-truco",
    name: "Trucos para el Truco — Libro",
    description:
      "Landing de venta para el libro «Trucos para el Truco». Diseño cultural argentino cálido sobre dark, presentación del autor, capítulos y CTA de compra.",
    tags: ["React", "Vite", "Tailwind v4", "Landing de venta"],
    status: "live",
    serviceId: "web",
    industry: "retail",
    liveUrl: "https://trucos-para-el-truco.vercel.app",
    previewImage: "/shots/trucos-para-el-truco.jpg",
  },
  {
    id: "ivo-scurti",
    name: "Ivo Scurti — Asesor Contable",
    description:
      "Landing para asesor contable e impositivo. Servicios, propuesta de valor y formulario de contacto que envía la consulta directo a WhatsApp.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://ivo-scurti.vercel.app",
    previewImage: "/shots/ivo-scurti.jpg",
  },
  {
    id: "carmai",
    name: "CARMAI Contadores",
    description:
      "Landing institucional para estudio contable e impositivo. Identidad corporativa sobria en blanco y negro con celeste, servicios y contacto.",
    tags: ["React", "Vite", "Tailwind v4"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://carmai.vercel.app",
    previewImage: "/shots/carmai.jpg",
  },
  {
    id: "estudio-calle",
    name: "Estudio Calle & Asociados",
    description:
      "Landing institucional para estudio contable e impositivo: hero con video portrait, servicios y contacto. Paleta verde + dorado con efecto blur sobre fondo de video.",
    tags: ["HTML", "CSS", "Vanilla JS"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://estudio-calle.vercel.app",
    previewImage: "/shots/estudio-calle.jpg",
  },
  {
    id: "lucerospavioli",
    name: "Lucero Spavioli — Seguros",
    description:
      "Landing rediseñada para productores asesores de seguros (Pilar, Bs. As.). Hero con carrusel, formulario de cotización a WhatsApp y dos sucursales con mapa.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://lucerospavioli.vercel.app",
    previewImage: "/shots/lucerospavioli.jpg",
  },
  {
    id: "amaf",
    name: "AMAF Soluciones — Conectividad",
    description:
      "Landing para empresa de fibra óptica, Starlink, CCTV y alarmas en La Costa. Servicios, cobertura y contacto. Diseño corporativo confiable.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://amaf.com.ar",
    previewImage: "/shots/amaf.jpg",
  },
  {
    id: "irban-sas",
    name: "Irban S.A.S. — Seguridad e Higiene",
    description:
      "Landing para empresa de matafuegos y seguridad e higiene. Servicios, recargas, certificaciones y contacto directo. Diseño corporativo claro.",
    tags: ["HTML", "CSS", "Vanilla JS", "SEO"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://irbansas.com.ar",
    previewImage: "/shots/irban-sas.jpg",
  },
  {
    id: "tu-reclamo-web",
    name: "Tu Reclamo Web — Reclamos a Seguros",
    description:
      "Landing para servicio de intermediación en reclamos a compañías de seguros. Proceso paso a paso, testimonios, preguntas frecuentes y CTA para iniciar el reclamo.",
    tags: ["React", "Vite", "Tailwind v4"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://tureclamoweb.com.ar",
    previewImage: "/shots/tu-reclamo-web.jpg",
  },
  {
    id: "jitter-vpn",
    name: "Jitter VPN — App Android",
    description:
      "Landing para servicio de VPN por túnel SSH para Android. Mockup de celular animado, planes, descarga del APK y soporte por WhatsApp. Dark theme tech.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://jitter-vpn.vercel.app",
    previewImage: "/shots/jitter-vpn.jpg",
  },
  {
    id: "canedo-sacabollos",
    name: "Canedo Sacabollos — Taller PDR",
    description:
      "Landing para taller de reparación de abolladuras sin pintura (PDR) con tres sedes. Servicios, antes/después y turnos por WhatsApp.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "automotor",
    liveUrl: "https://sacabolloscanedo.com",
    previewImage: "/shots/canedo-sacabollos.jpg",
  },
  {
    id: "multientrenador",
    name: "Multientrenador — Personal Trainer",
    description:
      "Landing para personal trainer con el método MULTITASK y el grupo Las Spartans. Hero con mockup animado, quién soy, propuesta de entrenamiento y ubicación. CTA directo a WhatsApp.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "deportes",
    liveUrl: "https://multientrenador.com.ar",
    previewImage: "/shots/multientrenador.jpg",
  },
  {
    id: "lopez-esposito",
    name: "López Esposito & Asociados",
    description:
      "Landing para estudio jurídico especializado en derecho laboral (Pilar y CABA). Diseño editorial de alto impacto, áreas de práctica y contacto directo para consultas.",
    tags: ["HTML", "CSS", "Vanilla JS", "SEO"],
    status: "live",
    serviceId: "web",
    industry: "servicios",
    liveUrl: "https://lopezesposito.com",
    previewImage: "/shots/lopez-esposito.jpg",
  },
  {
    id: "canedo-cursos",
    name: "Canedo Cursos — Capacitación PDR",
    description:
      "Landing para cursos de reparación de abolladuras (PDR), online y presenciales en Buenos Aires. Temario, modalidades, inscripción y consultas por WhatsApp.",
    tags: ["React", "Vite", "Tailwind v4", "WhatsApp"],
    status: "live",
    serviceId: "web",
    industry: "educacion",
    liveUrl: "https://canedo-cursos.vercel.app",
    previewImage: "/shots/canedo-cursos.jpg",
  },
  {
    id: "landing-carina",
    name: "La Hora del Juego — Estimulación Temprana",
    description:
      "Landing para maestra jardinera especializada en estimulación temprana. Propuesta pedagógica, edades trabajadas y contacto directo.",
    tags: ["HTML", "CSS", "Vanilla JS"],
    status: "live",
    serviceId: "web",
    industry: "educacion",
    liveUrl: "https://lahoradeljuego.vercel.app",
    previewImage: "/shots/landing-carina.jpg",
  },

  // ───────────────────────── E-COMMERCE / SISTEMAS con demo interactiva
  {
    id: "brideon",
    name: "Tienda online a medida",
    description:
      "E-commerce con catálogo, filtros, carrito persistente y checkout directo a WhatsApp. Los pedidos por texto o audio los interpreta y ordena la IA, sin cargar nada a mano.",
    tags: ["React", "TypeScript", "Supabase", "IA", "WhatsApp"],
    demo: "BrideonDemo",
    status: "live",
    serviceId: "sistemas",
    industry: "retail",
  },
  {
    id: "stock",
    name: "Sistema de Stock Distribuido",
    description:
      "Sistema distribuido de inventario con tres niveles: stock central, sucursales y área de pickeo. Panel de administración y app separada para operarios, sincronizados en tiempo real.",
    tags: ["Next.js", "Supabase", "Real-time", "TypeScript"],
    demo: "StockDemo",
    status: "live",
    serviceId: "sistemas",
    industry: "retail",
  },

  // ───────────────────────── AUTOMATIZACIONES (n8n + IA) con demo
  {
    id: "recordatorio-turnos",
    name: "Recordatorio automático de turnos",
    description:
      "Automatización n8n que cada mañana consulta Google Calendar, extrae nombre y celular de cada turno del día siguiente, clasifica por tipo de atención y envía un mensaje de WhatsApp personalizado por IA a cada paciente — sin intervención humana.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "RecordatorioDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "calificacion-google",
    name: "Reseñas automáticas en Google",
    description:
      "Automatización n8n que cada tarde consulta la base de datos, identifica pacientes atendidos en el día, filtra duplicados y ausentes, y envía por IA un mensaje de WhatsApp personalizado solicitando una reseña de 5 estrellas en Google.",
    tags: ["n8n", "GPT", "WhatsApp", "PostgreSQL", "Evolution API"],
    demo: "CalificacionDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "ausentes-dia-anterior",
    name: "Seguimiento de pacientes ausentes",
    description:
      "Automatización n8n que cada mañana consulta Google Calendar, identifica pacientes que no asistieron el día anterior, clasifica el tipo de ausencia y envía vía IA un mensaje de WhatsApp invitando a reprogramar.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "AusentesDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "promocion-automatica",
    name: "Campaña de promociones automática",
    description:
      "Automatización n8n que consulta Google Calendar, filtra pacientes por color de evento y envía vía IA un mensaje de WhatsApp personalizado con promociones activas.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "PromocionDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "informacion-hora",
    name: "Sincronización de datos en tiempo real",
    description:
      "Automatización n8n que cada 30 minutos extrae ventas, estudios y comisiones desde la API de la clínica y sincroniza los datos en Supabase — alimentando en tiempo real el dashboard y todos los análisis del negocio.",
    tags: ["n8n", "Supabase", "PostgreSQL", "API REST", "Tiempo real"],
    demo: "InformacionHoraDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "comisiones-diarias",
    name: "Registro automático de comisiones",
    description:
      "Automatización n8n que cada tarde consulta PostgreSQL, filtra los estudios con comisión mayor a cero y guarda el detalle por profesional en Supabase — manteniendo el ranking actualizado sin intervención manual.",
    tags: ["n8n", "Supabase", "PostgreSQL", "Automatización"],
    demo: "ComisionesDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "pacientes-por-profesional",
    name: "Reporte semanal por profesional",
    description:
      "Automatización n8n que cada lunes extrae los datos de la semana anterior, calcula cuántos pacientes atendió cada profesional por estudio y sincroniza el resumen en Supabase para alimentar el dashboard de rendimiento.",
    tags: ["n8n", "Supabase", "Web Scraping", "Automatización"],
    demo: "PacientesProfesionalDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
  {
    id: "recopilacion-chats",
    name: "Análisis de atención por WhatsApp",
    description:
      "Automatización n8n que captura en tiempo real cada mensaje de WhatsApp vía Webhook, identifica quién envía y guarda el historial en Supabase — habilitando informes de cuántos consultan, agendan, cancelan o reprograman por día.",
    tags: ["n8n", "Supabase", "WhatsApp", "Webhook", "Análisis"],
    demo: "RecopilacionChatsDemo",
    status: "live",
    serviceId: "automatizaciones",
    industry: "salud",
  },
];
