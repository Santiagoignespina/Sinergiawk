export type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  demo?: string;
  status: "live" | "desarrollo" | "concepto";
  serviceId: string; // a qué servicio pertenece
};

export const projects: Project[] = [
  {
    id: "mrbracket",
    name: "Dashboard Clínica",
    description:
      "Aplicación web de gestión comercial para clínicas médicas con múltiples sucursales. Centraliza análisis de ventas, pacientes y profesionales en tiempo real — KPIs de facturación, búsqueda avanzada de pacientes y ranking de profesionales por comisiones y productividad.",
    tags: ["React", "TypeScript", "Supabase"],
    demo: "DashboardDemo",
    status: "live",
    serviceId: "integraciones",
  },
  {
    id: "turnero",
    name: "Turnero Clínica",
    description:
      "Sistema de gestión de colas en tiempo real para clínica. Kiosco táctil de autoingreso, panel de recepción, pantalla TV con anuncios por voz y panel por consultorio. Comunicación instantánea vía SSE.",
    tags: ["Next.js", "Supabase", "SSE", "Real-time", "Kiosco"],
    demo: "TurneroDemo",
    status: "live",
    serviceId: "integraciones",
  },
  {
    id: "agusmagicplan",
    name: "Agente de Viajes",
    description:
      "Micrositio para agente certificada Disney & Universal. Hero con identidad visual, sección de parques, y formulario inteligente con captura de leads por texto o audio grabado, integrado a n8n para notificaciones automáticas.",
    tags: ["React", "Vite", "Tailwind", "n8n", "Audio"],
    demo: "AgusmagicplanDemo",
    status: "live",
    serviceId: "micrositios",
  },
  {
    id: "brideon",
    name: "Tienda de Accesorios",
    description:
      "E-commerce de accesorios para eventos especiales: bodas, quinceañeras, cumpleaños y despedidas. Catálogo con 24 productos, filtros por categoría, carrito persistente, y pedido personalizado con texto o audio integrado a WhatsApp.",
    tags: ["React", "TypeScript", "Vite", "Supabase", "WhatsApp"],
    demo: "BrideonDemo",
    status: "live",
    serviceId: "micrositios",
  },
  {
    id: "crm-viajes",
    name: "CRM Agente de Viajes",
    description:
      "CRM especializado para agentes de viajes: gestión de leads desde múltiples orígenes, comunicación integrada por WhatsApp, email, Facebook e Instagram, programación de mensajes en todas las redes, seguimiento de estado por potencial, tareas con vencimientos y conversión a cliente confirmado. Automatizaciones vía n8n.",
    tags: ["Next.js", "Supabase", "n8n", "WhatsApp", "TypeScript"],
    demo: "CRMDemo",
    status: "live",
    serviceId: "integraciones",
  },
  {
    id: "stock",
    name: "Sistema de Stock",
    description:
      "Sistema distribuido de gestión de inventario con tres niveles: stock central, sucursales y área de pickeo. Panel de administración para movimientos y auditoría, y app separada para operarios de almacén. Sincronización en tiempo real entre todas las vistas.",
    tags: ["Next.js", "Supabase", "Real-time", "TypeScript"],
    demo: "StockDemo",
    status: "live",
    serviceId: "integraciones",
  },
  {
    id: "recordatorio-turnos",
    name: "Recordatorio automático de turnos",
    description:
      "Automatización n8n que cada mañana consulta Google Calendar, extrae nombre y celular de cada turno del día siguiente, clasifica por tipo de atención y envía un mensaje de WhatsApp personalizado por IA a cada paciente — sin intervención humana.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "RecordatorioDemo",
    status: "live",
    serviceId: "agentes-ia",
  },
  {
    id: "calificacion-google",
    name: "Reseñas automáticas en Google",
    description:
      "Automatización n8n que cada tarde consulta la base de datos, identifica pacientes atendidos en el dia, filtra duplicados y ausentes, y envía por IA un mensaje de WhatsApp personalizado solicitando una reseña de 5 estrellas en Google — sin intervención humana.",
    tags: ["n8n", "GPT", "WhatsApp", "PostgreSQL", "Evolution API"],
    demo: "CalificacionDemo",
    status: "live",
    serviceId: "agentes-ia",
  },
  {
    id: "ausentes-dia-anterior",
    name: "Seguimiento de pacientes ausentes",
    description:
      "Automatización n8n que cada mañana consulta Google Calendar, identifica pacientes que no asistieron el día anterior, clasifica el tipo de ausencia por color de evento y sucursal, y envía vía IA un mensaje de WhatsApp personalizado invitando a reprogramar — sin intervención humana.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "AusentesDemo",
    status: "live",
    serviceId: "agentes-ia",
  },
  {
    id: "promocion-automatica",
    name: "Campaña de promociones automática",
    description:
      "Automatización n8n que consulta Google Calendar, filtra pacientes por color de evento, y envía vía IA un mensaje de WhatsApp personalizado con promociones activas — sin intervención humana.",
    tags: ["n8n", "GPT", "WhatsApp", "Google Calendar", "Evolution API"],
    demo: "PromocionDemo",
    status: "live",
    serviceId: "agentes-ia",
  },
  {
    id: "informacion-hora",
    name: "Sincronización de datos en tiempo real",
    description:
      "Automatización n8n que cada 30 minutos extrae ventas, estudios y comisiones desde la API de la clínica, y sincroniza los datos en Supabase — alimentando en tiempo real el dashboard, el ranking de profesionales y todos los análisis del negocio.",
    tags: ["n8n", "Supabase", "PostgreSQL", "API REST", "Tiempo real"],
    demo: "InformacionHoraDemo",
    status: "live",
    serviceId: "automatizaciones",
  },
  {
    id: "comisiones-diarias",
    name: "Registro automático de comisiones",
    description:
      "Automatización n8n que cada tarde consulta PostgreSQL, filtra los estudios con comisión mayor a cero, y guarda el detalle por profesional en Supabase — manteniendo el ranking actualizado sin intervención manual.",
    tags: ["n8n", "Supabase", "PostgreSQL", "Automatización"],
    demo: "ComisionesDemo",
    status: "live",
    serviceId: "automatizaciones",
  },
  {
    id: "pacientes-por-profesional",
    name: "Reporte semanal por profesional",
    description:
      "Automatización n8n que cada lunes extrae los datos de la semana anterior, calcula cuántos pacientes atendió cada profesional por estudio, y sincroniza el resumen en Supabase para alimentar el dashboard de rendimiento.",
    tags: ["n8n", "Supabase", "Web Scraping", "Automatización"],
    demo: "PacientesProfesionalDemo",
    status: "live",
    serviceId: "automatizaciones",
  },
  {
    id: "recopilacion-chats",
    name: "Análisis de atención al cliente por WhatsApp",
    description:
      "Automatización n8n que captura en tiempo real cada mensaje de WhatsApp vía Webhook, identifica quién envía (empresa o paciente), y guarda el historial en Supabase — habilitando informes de cuántos consultan, agendan, cancelan o reprograman por día.",
    tags: ["n8n", "Supabase", "WhatsApp", "Webhook", "Análisis"],
    demo: "RecopilacionChatsDemo",
    status: "live",
    serviceId: "automatizaciones",
  },
  // Para agregar un proyecto nuevo, copiá un bloque y completá los campos.
  // serviceId debe coincidir con el id de un servicio en Servicios.tsx
];
