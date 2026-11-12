// ─────────────────────────────────────────────────────────────
//  Contenido editable del sitio. Cambia textos e imágenes aquí.
//  Para usar fotos propias: colócalas en /public/images y usa
//  rutas como "./images/aire-01.jpg".
// ─────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Cooling Solution SAC',
  short: 'Cooling Solution',
  phoneDisplay: '990 073 634',
  phoneIntl: '51990073634',
  address: 'Av. Progreso cuadra 36, casa 173, Condominio Veranda',
  city: 'Catacaos, Piura — Perú',
  hours: 'Lunes a sábado · 8:00 a. m. – 6:00 p. m.',
} as const;

// Reemplaza estos enlaces por los perfiles reales de la empresa.
export const SOCIAL = [
  { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/coolingsolutionsac' },
  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/coolingsolutionsac' },
  { name: 'TikTok', icon: 'tiktok', url: 'https://www.tiktok.com/@coolingsolutionsac' },
] as const;

export type IconName =
  | 'snow' | 'wind' | 'wrench' | 'cabinet' | 'wall' | 'bolt' | 'drop' | 'fridge' | 'tiles';

export interface Service {
  id: string;
  title: string;
  icon: IconName;
  summary: string;
  details: string[];
  image: string;
}

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const SERVICES: Service[] = [
  {
    id: 'instalacion-aire',
    title: 'Instalación de aire acondicionado',
    icon: 'wind',
    summary: 'Equipos split, piso-techo y cassette para hogares, oficinas y comercios.',
    details: [
      'Evaluación del ambiente y cálculo de BTU',
      'Instalación de tubería de cobre, drenaje y soportes',
      'Vacío del sistema y prueba de funcionamiento',
      'Acabado limpio y orientación de uso',
    ],
    image: u('photo-1759772238012-9d5ad59ae637'),
  },
  {
    id: 'mantenimiento-aire',
    title: 'Mantenimiento de aire acondicionado',
    icon: 'wrench',
    summary: 'Preventivo y correctivo para que tu equipo enfríe mejor y consuma menos.',
    details: [
      'Limpieza de filtros, serpentines y bandeja de drenaje',
      'Medición de presiones y carga de refrigerante',
      'Revisión eléctrica de capacitores y contactores',
      'Diagnóstico de fallas y reparación',
    ],
    image: u('photo-1762341123870-d706f257a12e'),
  },
  {
    id: 'refrigeracion',
    title: 'Refrigeración',
    icon: 'fridge',
    summary: 'Cámaras, congeladoras, visicoolers y refrigeración comercial.',
    details: [
      'Mantenimiento de cámaras frigoríficas',
      'Reparación de congeladoras y exhibidoras',
      'Cambio de compresores y recarga de gas',
      'Atención a negocios y restaurantes',
    ],
    image: u('photo-1584568694244-14fbdf83bd30'),
  },
  {
    id: 'melamine',
    title: 'Muebles de melamine',
    icon: 'cabinet',
    summary: 'Cocinas, closets, centros de entretenimiento y mobiliario de oficina a medida.',
    details: [
      'Diseño a medida según tu espacio',
      'Tableros de melamine de alta resistencia',
      'Herrajes de cierre suave y tapacanto fino',
      'Fabricación e instalación en obra',
    ],
    image: u('photo-1556911220-bff31c812dba'),
  },
  {
    id: 'drywall',
    title: 'Drywall',
    icon: 'wall',
    summary: 'Tabiques, falsos techos, muebles y divisiones rápidas y limpias.',
    details: [
      'Tabiquería y divisiones de ambientes',
      'Falsos techos con iluminación empotrada',
      'Placas resistentes a humedad y fuego',
      'Empastado, lijado y pintura',
    ],
    image: u('photo-1503387762-592deb58ef4e'),
  },
  {
    id: 'electricidad',
    title: 'Electricidad',
    icon: 'bolt',
    summary: 'Instalaciones eléctricas domiciliarias y comerciales seguras.',
    details: [
      'Cableado, tomacorrientes e iluminación',
      'Tableros eléctricos y llaves termomagnéticas',
      'Pozos a tierra y circuitos para aire acondicionado',
      'Detección y solución de cortocircuitos',
    ],
    image: u('photo-1558449028-b53a39d100fc'),
  },
  {
    id: 'gasfiteria',
    title: 'Gasfitería',
    icon: 'drop',
    summary: 'Instalación y reparación de redes de agua y desagüe.',
    details: [
      'Detección y reparación de fugas',
      'Instalación de griferías, sanitarios y termas',
      'Destape de desagües',
      'Redes de agua fría y caliente',
    ],
    image: u('photo-1585704032915-c3400ca199e7'),
  },
  {
    id: 'ceramicos-porcelanatos',
    title: 'Instalación de cerámicos y porcelanatos',
    icon: 'tiles',
    summary: 'Pisos y paredes con nivelación precisa, juntas parejas y acabado impecable.',
    details: [
      'Nivelación de contrapiso y preparación de superficie',
      'Instalación de cerámicos, porcelanatos y formatos grandes',
      'Cortes a medida, zócalos y enchapes de baño y cocina',
      'Fraguado, sellado y limpieza final',
    ],
    image: u('photo-1600607687939-ce8a6c25118c'),
  },
  {
    id: 'mantenimiento-general',
    title: 'Mantenimiento integral',
    icon: 'snow',
    summary: 'Un solo equipo para el mantenimiento de tu casa, oficina o local.',
    details: [
      'Planes de mantenimiento periódico',
      'Atención a empresas e instituciones',
      'Coordinación de varios oficios en una sola visita',
      'Informe del trabajo realizado',
    ],
    image: u('photo-1581578731548-c64695cc6952'),
  },
];

export interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  cta: { label: string; href: string };
}

export const SLIDES: Slide[] = [
  {
    eyebrow: 'Climatización',
    title: 'Aire fresco, instalado con precisión.',
    text: 'Instalación y mantenimiento de aire acondicionado para el calor de Piura.',
    image: u('photo-1761330440311-16e160cad236', 1800),
    cta: { label: 'Ver servicios', href: '#servicios' },
  },
  {
    eyebrow: 'Muebles de melamine',
    title: 'Espacios a tu medida.',
    text: 'Cocinas, closets y mobiliario fabricados e instalados por nuestro equipo.',
    image: u('photo-1556911220-bff31c812dba', 1800),
    cta: { label: 'Cotizar un mueble', href: '#contacto' },
  },
  {
    eyebrow: 'Drywall y electricidad',
    title: 'Remodela sin complicaciones.',
    text: 'Tabiques, falsos techos e instalaciones eléctricas seguras en una sola coordinación.',
    image: u('photo-1600566753190-17f0baa2a6c3', 1800),
    cta: { label: 'Hablemos de tu proyecto', href: '#contacto' },
  },
  {
    eyebrow: 'Cerámicos y porcelanatos',
    title: 'Acabados que elevan cada ambiente.',
    text: 'Instalación de pisos y enchapes con nivelación exacta y juntas perfectas.',
    image: u('photo-1600607687939-ce8a6c25118c', 1800),
    cta: { label: 'Cotizar instalación', href: '#contacto' },
  },
  {
    eyebrow: 'Refrigeración y gasfitería',
    title: 'Soluciones que no se detienen.',
    text: 'Atención a hogares, comercios y empresas con mantenimiento preventivo y correctivo.',
    image: u('photo-1584568694244-14fbdf83bd30', 1800),
    cta: { label: 'Escríbenos', href: '#contacto' },
  },
];

export const GALLERY: { image: string; caption: string }[] = [
  { image: u('photo-1761330440311-16e160cad236', 800), caption: 'Sala climatizada' },
  { image: u('photo-1726614846573-c1ac2e6161d1', 800), caption: 'Equipo split instalado' },
  { image: u('photo-1759772238012-9d5ad59ae637', 800), caption: 'Instalación de aire acondicionado' },
  { image: u('photo-1762341123870-d706f257a12e', 800), caption: 'Equipo funcionando a 22 °C' },
  { image: u('photo-1776860150250-757406c52438', 800), caption: 'Climatización comercial' },
  { image: u('photo-1556911220-bff31c812dba', 800), caption: 'Cocina en melamine' },
  { image: u('photo-1600566753190-17f0baa2a6c3', 800), caption: 'Falso techo en drywall' },
  { image: u('photo-1600607687939-ce8a6c25118c', 800), caption: 'Piso de porcelanato' },
  { image: u('photo-1620626011761-996317b8d101', 800), caption: 'Baño — gasfitería' },
];

export const STEPS = [
  { title: 'Nos escribes', text: 'Cuéntanos qué necesitas por WhatsApp o con el formulario.' },
  { title: 'Visita y evaluación', text: 'Revisamos el lugar y te explicamos las opciones.' },
  { title: 'Presupuesto claro', text: 'Recibes un presupuesto detallado antes de empezar.' },
  { title: 'Ejecución y entrega', text: 'Trabajamos limpio, a tiempo, y verificamos todo contigo.' },
];

export const FAQ = [
  {
    q: '¿En qué zonas atienden?',
    a: 'Atendemos Catacaos, Piura, Castilla, Veintiséis de Octubre y alrededores. Escríbenos para confirmar tu zona.',
  },
  {
    q: '¿Cada cuánto debo hacer mantenimiento a mi aire acondicionado?',
    a: 'En uso frecuente, lo recomendable es cada 3 a 6 meses. Así mantienes el rendimiento y reduces el consumo eléctrico.',
  },
  {
    q: '¿Cómo solicito un presupuesto?',
    a: 'Envíanos un mensaje por WhatsApp con el servicio, el distrito y, si puedes, fotos del lugar. Coordinamos la visita.',
  },
  {
    q: '¿Trabajan con empresas?',
    a: 'Sí. Atendemos hogares, negocios, oficinas e instituciones, incluidos planes de mantenimiento periódico.',
  },
];
