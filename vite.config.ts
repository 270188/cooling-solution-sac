import { defineConfig, type Plugin } from 'vite';
import { renderPage } from './src/templates';
import { COMPANY, SERVICES, FAQ, SITE_URL } from './src/data';

/** Datos estructurados (Schema.org) para Google: negocio local + preguntas frecuentes. */
function structuredData() {
  const business = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    '@id': `${SITE_URL}/#negocio`,
    name: COMPANY.name,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    description:
      'Instalación y mantenimiento de aire acondicionado, refrigeración, muebles de melamine, drywall, electricidad, gasfitería, cerámicos y porcelanatos en Piura.',
    telephone: `+${COMPANY.phoneIntl}`,
    priceRange: 'S/ S/ S/',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: 'Catacaos',
      addressRegion: 'Piura',
      addressCountry: 'PE',
    },
    areaServed: ['Catacaos', 'Piura', 'Castilla', 'Veintiséis de Octubre'].map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${COMPANY.phoneIntl}`,
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.summary, url: `${SITE_URL}/#${s.id}` },
      })),
    },
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#web`,
    url: `${SITE_URL}/`,
    name: COMPANY.name,
    inLanguage: 'es-PE',
    publisher: { '@id': `${SITE_URL}/#negocio` },
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return [business, website, faq]
    .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
}

/** Escribe todo el contenido en el HTML al compilar, para que Google y las redes lo lean sin ejecutar JavaScript. */
function prerender(): Plugin {
  return {
    name: 'prerender-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .replace('<!--structured-data-->', structuredData())
          .replace('<div id="app"></div>', `<div id="app">${renderPage()}</div>`);
      },
    },
  };
}

/** sitemap.xml con la fecha del último build. */
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [prerender(), sitemap()],
  build: { target: 'es2020', cssMinify: true },
});
