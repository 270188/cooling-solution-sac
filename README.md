# Cooling Solution SAC — Sitio web

Sitio one-page en **Vite + TypeScript** (sin frameworks) para los servicios integrales de Cooling Solution SAC, Catacaos – Piura.

## Uso
```bash
npm install
npm run dev       # desarrollo en http://localhost:5173
npm run build     # genera /dist listo para subir a cualquier hosting (Netlify, Vercel, Hostinger…)
npm run preview   # revisa el build
```

## Editar contenido
Todo el texto, servicios, diapositivas, galería y preguntas frecuentes están en `src/data.ts`.
Los enlaces de Facebook, Instagram y TikTok están en `SOCIAL` dentro de `src/data.ts`: reemplázalos por los perfiles reales.

Las fotos actuales son de Unsplash (enlazadas). Para usar fotos propias: colócalas en `public/images/`
y cambia la propiedad `image` por `./images/mi-foto.jpg`.

## Requerimientos funcionales
| # | Requerimiento | Implementación |
|---|---|---|
| RF1 | Navbar fija con navegación por secciones | Se vuelve sólida al hacer scroll, resalta la sección activa, menú hamburguesa en móvil (cierra con Esc) |
| RF2 | Carrusel principal | Autoplay con barra de progreso, flechas, puntos, pausa/reanudar, teclado (← →), deslizar en táctil, pausa al pasar el mouse |
| RF3 | Catálogo de servicios con imágenes | 9 servicios: instalación y mantenimiento de A/A, refrigeración, melamine, drywall, electricidad, gasfitería, cerámicos y porcelanatos, mantenimiento integral |
| RF4 | Detalle de servicio | Ventana modal con alcance del servicio y botones de cotización |
| RF5 | Botón flotante de WhatsApp | Siempre visible, mensaje predefinido al 990 073 634 |
| RF6 | Cotización por servicio | Cada tarjeta abre WhatsApp con el servicio ya escrito |
| RF7 | Formulario de cotización | Validación (nombre, celular peruano 9XXXXXXXX, servicio, detalle) y envío por WhatsApp |
| RF8 | Galería de proyectos | Cuadrícula con lightbox (flechas y teclado) |
| RF9 | Preguntas frecuentes | Acordeón nativo `<details>` |
| RF10 | Ubicación y contacto | Dirección, teléfono clicable, horario y mapa de Google embebido |
| RF11 | Volver arriba | Botón flotante tras desplazarse |
| RF12 | Redes sociales | Íconos de Facebook, Instagram y TikTok en navbar, menú móvil, contacto y footer (enlaces en `SOCIAL`, `src/data.ts`) |

## Requerimientos no funcionales
- **Responsive / mobile-first**: probado de 360 px a 1440 px, sin scroll horizontal.
- **Rendimiento**: JS ~10 KB gzip, CSS ~5 KB gzip, imágenes con `loading="lazy"` y `decoding="async"`, la primera diapositiva con `fetchpriority="high"`.
- **Accesibilidad**: enlace "saltar al contenido", HTML semántico, roles ARIA en carrusel, foco visible, objetivos táctiles ≥ 44 px, respeta `prefers-reduced-motion`, textos alternativos.
- **SEO**: title/description, Open Graph, `lang="es-PE"` y datos estructurados Schema.org (`HomeAndConstructionBusiness`).
- **Seguridad**: enlaces externos con `rel="noopener noreferrer"`, escape de textos al renderizar, sin backend ni datos almacenados.
- **Mantenibilidad**: TypeScript estricto, contenido separado en `data.ts`, componentes en `main.ts`, carrusel en `carousel.ts`.
- **Compatibilidad**: navegadores modernos (Chrome, Edge, Firefox, Safari, iOS/Android).
- **Resiliencia**: si una imagen no carga se muestra un fondo de marca en su lugar.
