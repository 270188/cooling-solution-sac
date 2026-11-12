import './style.css';
import { COMPANY, SOCIAL, SERVICES, SLIDES, GALLERY, STEPS, FAQ, type Service } from './data';
import { icon } from './icons';
import { Carousel } from './carousel';

// ── Utilidades ───────────────────────────────────────────────
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const waLink = (msg: string) =>
  `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(msg)}`;

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T & Element>(sel) as T;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];

const socials = (cls = '') => `
<ul class="social ${cls}" aria-label="Redes sociales">
  ${SOCIAL.map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener noreferrer" aria-label="${r.name} de ${esc(COMPANY.name)}" title="${r.name}">${icon(r.icon, 18)}</a></li>`).join('')}
</ul>`;

const NAV = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#faq', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
];

const mapsQuery = encodeURIComponent(`${COMPANY.address}, Catacaos, Piura, Perú`);

// ── Plantillas ───────────────────────────────────────────────
const header = () => `
<header class="nav" id="nav">
  <div class="container nav__inner">
    <a href="#inicio" class="brand" aria-label="${esc(COMPANY.name)} — inicio">
      <span class="brand__mark">${icon('snow', 22)}</span>
      <span class="brand__text">Cooling<span>Solution</span> <small>SAC</small></span>
    </a>
    <nav aria-label="Principal">
      <ul class="nav__links" id="nav-links">
        ${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        <li class="nav__cta-mobile"><a class="btn btn--primary" href="${waLink('Hola Cooling Solution, quisiera una cotización.')}" target="_blank" rel="noopener noreferrer">${icon('whatsapp', 18)} Cotizar por WhatsApp</a></li>
        <li class="nav__cta-mobile">${socials('social--menu')}</li>
      </ul>
    </nav>
    ${socials('social--nav')}
    <a class="btn btn--primary nav__cta" href="tel:+${COMPANY.phoneIntl}">${icon('phone', 16)} ${COMPANY.phoneDisplay}</a>
    <button class="nav__toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;

const hero = () => `
<section class="hero" id="inicio" aria-roledescription="carrusel" aria-label="Servicios destacados">
  <div class="hero__track" id="hero-track">
    ${SLIDES.map((s, i) => `
      <article class="slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${SLIDES.length}" ${i === 0 ? '' : 'aria-hidden="true"'}>
        <img class="slide__img" src="${s.image}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />
        <div class="slide__shade"></div>
        <div class="container slide__content">
          <p class="eyebrow">${esc(s.eyebrow)}</p>
          <h${i === 0 ? '1' : '2'} class="slide__title">${esc(s.title)}</h${i === 0 ? '1' : '2'}>
          <p class="slide__text">${esc(s.text)}</p>
          <div class="slide__actions">
            <a class="btn btn--light" href="${s.cta.href}" tabindex="${i === 0 ? 0 : -1}">${esc(s.cta.label)}</a>
            <a class="btn btn--ghost" href="${waLink(`Hola, me interesa: ${s.eyebrow}.`)}" target="_blank" rel="noopener noreferrer" tabindex="${i === 0 ? 0 : -1}">${icon('whatsapp', 18)} WhatsApp</a>
          </div>
        </div>
      </article>`).join('')}
  </div>
  <div class="container hero__controls">
    <div class="hero__dots" role="tablist" aria-label="Elegir diapositiva">
      ${SLIDES.map((s, i) => `<button role="tab" class="dot${i === 0 ? ' is-active' : ''}" aria-label="Ir a: ${esc(s.eyebrow)}" aria-selected="${i === 0}" data-i="${i}"><span></span></button>`).join('')}
    </div>
    <div class="hero__arrows">
      <button class="arrow" id="hero-prev" aria-label="Diapositiva anterior">${icon('arrowL', 20)}</button>
      <button class="arrow" id="hero-pause" aria-label="Pausar carrusel" aria-pressed="false"><span class="pause-ico"></span></button>
      <button class="arrow" id="hero-next" aria-label="Diapositiva siguiente">${icon('arrowR', 20)}</button>
    </div>
  </div>
</section>`;

const strip = () => `
<section class="strip" aria-label="Lista de servicios">
  <div class="container strip__inner">
    ${SERVICES.map((s) => `<a href="#${s.id}" class="strip__item">${icon(s.icon, 18)}<span>${esc(s.title.replace('Instalación de ', '').replace(/^\w/, (c) => c.toUpperCase()))}</span></a>`).join('')}
  </div>
</section>`;

const serviceCard = (s: Service) => `
<article class="card reveal" id="${s.id}">
  <div class="card__media">
    <img src="${s.image}" alt="${esc(s.title)} — Cooling Solution SAC" loading="lazy" decoding="async" width="900" height="600" data-icon="${s.icon}" />
    <span class="card__icon">${icon(s.icon, 22)}</span>
  </div>
  <div class="card__body">
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.summary)}</p>
    <div class="card__actions">
      <button class="link-btn" data-service="${s.id}" aria-haspopup="dialog">Ver detalle ${icon('arrowR', 16)}</button>
      <a class="link-btn link-btn--wa" href="${waLink(`Hola, quisiera cotizar: ${s.title}.`)}" target="_blank" rel="noopener noreferrer" aria-label="Cotizar ${esc(s.title)} por WhatsApp">${icon('whatsapp', 16)} Cotizar</a>
    </div>
  </div>
</article>`;

const services = () => `
<section class="section" id="servicios">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow eyebrow--dark">Servicios integrales</p>
      <h2>Todo lo que tu espacio necesita, con un solo equipo.</h2>
      <p class="lead">Climatización, refrigeración, carpintería en melamine, drywall, electricidad, gasfitería y acabados en cerámicos y porcelanatos.</p>
    </header>
    <div class="grid">${SERVICES.map(serviceCard).join('')}</div>
  </div>
</section>`;

const about = () => `
<section class="section section--tint" id="nosotros">
  <div class="container about">
    <div class="about__media reveal">
      <img src="${GALLERY[0].image}" alt="Ambiente climatizado por Cooling Solution SAC" loading="lazy" decoding="async" />
      <div class="about__badge"><strong>+9</strong><span>especialidades<br/>en un solo lugar</span></div>
    </div>
    <div class="about__text reveal">
      <p class="eyebrow eyebrow--dark">Nosotros</p>
      <h2>Trabajo prolijo, plazos claros y garantía en cada servicio.</h2>
      <p class="lead">En <strong>${esc(COMPANY.name)}</strong> resolvemos las necesidades técnicas de hogares, negocios y empresas de Piura. Coordinamos varios oficios en un mismo proyecto para que tú solo te ocupes del resultado.</p>
      <ul class="checks">
        ${['Técnicos especializados por oficio', 'Presupuesto detallado antes de empezar', 'Materiales de calidad y garantía escrita', 'Atención a hogares, comercios y empresas'].map((t) => `<li>${icon('check', 18)} ${t}</li>`).join('')}
      </ul>
      <ol class="steps">
        ${STEPS.map((s, i) => `<li><span class="steps__n">0${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`).join('')}
      </ol>
    </div>
  </div>
</section>`;

const gallery = () => `
<section class="section" id="proyectos">
  <div class="container">
    <header class="section__head reveal">
      <p class="eyebrow eyebrow--dark">Proyectos</p>
      <h2>Ambientes que hablan por nosotros.</h2>
    </header>
    <div class="gallery">
      ${GALLERY.map((g, i) => `
        <button class="gallery__item reveal" data-g="${i}" aria-label="Ampliar imagen: ${esc(g.caption)}">
          <img src="${g.image}" alt="${esc(g.caption)}" loading="lazy" decoding="async" />
          <span>${esc(g.caption)}</span>
        </button>`).join('')}
    </div>
  </div>
</section>`;

const faq = () => `
<section class="section section--tint" id="faq">
  <div class="container faq">
    <header class="section__head section__head--left reveal">
      <p class="eyebrow eyebrow--dark">Preguntas frecuentes</p>
      <h2>Resolvemos tus dudas.</h2>
      <p class="lead">¿No encuentras tu respuesta? Escríbenos y te contestamos en minutos.</p>
      <a class="btn btn--primary" href="${waLink('Hola, tengo una consulta.')}" target="_blank" rel="noopener noreferrer">${icon('whatsapp', 18)} Hacer una consulta</a>
    </header>
    <div class="faq__list reveal">
      ${FAQ.map((f, i) => `
        <details ${i === 0 ? 'open' : ''}>
          <summary>${esc(f.q)}<span class="faq__plus" aria-hidden="true"></span></summary>
          <p>${esc(f.a)}</p>
        </details>`).join('')}
    </div>
  </div>
</section>`;

const contact = () => `
<section class="section contact" id="contacto">
  <div class="container contact__grid">
    <div class="reveal">
      <p class="eyebrow">Contacto</p>
      <h2>Pide tu cotización sin compromiso.</h2>
      <ul class="contact__info">
        <li>${icon('phone', 20)}<div><span>Teléfono / WhatsApp</span><a href="tel:+${COMPANY.phoneIntl}">${COMPANY.phoneDisplay}</a></div></li>
        <li>${icon('pin', 20)}<div><span>Dirección</span><a href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer">${esc(COMPANY.address)}<br/>${esc(COMPANY.city)}</a></div></li>
        <li>${icon('clock', 20)}<div><span>Horario</span><p>${esc(COMPANY.hours)}</p></div></li>
      </ul>
      <p class="social__label">Síguenos</p>
      ${socials('social--contact')}
      <div class="map">
        <iframe title="Ubicación de Cooling Solution SAC en Catacaos, Piura" src="https://www.google.com/maps?q=${mapsQuery}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <a class="btn btn--ghost map__link" href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer">${icon('pin', 18)} Abrir en Google Maps</a>
    </div>
    <form class="form reveal" id="quote-form" novalidate>
      <h3>Solicitar cotización</h3>
      <p class="form__hint">Al enviar se abrirá WhatsApp con tu mensaje listo.</p>
      <div class="field">
        <label for="f-name">Nombre completo</label>
        <input id="f-name" name="name" autocomplete="name" required minlength="3" maxlength="60" />
        <small class="field__err" aria-live="polite"></small>
      </div>
      <div class="field">
        <label for="f-phone">Celular</label>
        <input id="f-phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" required pattern="9\\d{8}" maxlength="9" placeholder="9XXXXXXXX" />
        <small class="field__err" aria-live="polite"></small>
      </div>
      <div class="field">
        <label for="f-service">Servicio</label>
        <select id="f-service" name="service" required>
          <option value="">Selecciona un servicio</option>
          ${SERVICES.map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`).join('')}
        </select>
        <small class="field__err" aria-live="polite"></small>
      </div>
      <div class="field">
        <label for="f-district">Distrito</label>
        <input id="f-district" name="district" autocomplete="address-level2" maxlength="40" placeholder="Ej. Catacaos" />
      </div>
      <div class="field">
        <label for="f-msg">Cuéntanos qué necesitas</label>
        <textarea id="f-msg" name="message" rows="4" required minlength="10" maxlength="600"></textarea>
        <small class="field__err" aria-live="polite"></small>
      </div>
      <button class="btn btn--primary btn--block" type="submit">${icon('whatsapp', 18)} Enviar por WhatsApp</button>
      <p class="form__status" id="form-status" role="status" hidden></p>
    </form>
  </div>
</section>`;

const footer = () => `
<footer class="footer">
  <div class="container footer__inner">
    <div>
      <a href="#inicio" class="brand brand--light"><span class="brand__mark">${icon('snow', 22)}</span><span class="brand__text">Cooling<span>Solution</span> <small>SAC</small></span></a>
      <p>Servicios integrales para hogares y empresas en Piura.</p>
      ${socials('social--footer')}
    </div>
    <div>
      <h4>Servicios</h4>
      <ul>${SERVICES.slice(0, 5).map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h4>&nbsp;</h4>
      <ul>${SERVICES.slice(5).map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h4>Contacto</h4>
      <ul>
        <li><a href="tel:+${COMPANY.phoneIntl}">${COMPANY.phoneDisplay}</a></li>
        <li>${esc(COMPANY.address)}</li>
        <li>${esc(COMPANY.city)}</li>
      </ul>
    </div>
  </div>
  <div class="container footer__bottom">
    <p>© ${new Date().getFullYear()} ${esc(COMPANY.name)}. Todos los derechos reservados.</p>
  </div>
</footer>`;

const floating = () => `
<a class="fab-wa" href="${waLink('Hola Cooling Solution, quisiera información sobre sus servicios.')}" target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp al ${COMPANY.phoneDisplay}">
  ${icon('whatsapp', 30)}
  <span class="fab-wa__tip">¿Hablamos? Escríbenos</span>
</a>
<button class="fab-top" id="to-top" aria-label="Volver arriba">${icon('up', 20)}</button>
<dialog class="modal" id="service-modal" aria-labelledby="modal-title"></dialog>
<dialog class="lightbox" id="lightbox" aria-label="Imagen ampliada"></dialog>`;

// ── Render ───────────────────────────────────────────────────
const app = document.getElementById('app')!;
app.innerHTML = `${header()}<main id="main">${hero()}${strip()}${services()}${about()}${gallery()}${faq()}${contact()}</main>${footer()}${floating()}`;

// ── Imágenes: respaldo si una foto no carga ─────────────────
$$<HTMLImageElement>('img').forEach((img) => {
  img.addEventListener('error', () => {
    img.classList.add('img-fallback');
    const name = img.dataset.icon as Parameters<typeof icon>[0] | undefined;
    if (name) img.insertAdjacentHTML('afterend', `<span class="ph" aria-hidden="true">${icon(name, 96)}</span>`);
  }, { once: true });
});

// ── Navbar ───────────────────────────────────────────────────
const nav = $('#nav');
const toggle = $<HTMLButtonElement>('#nav-toggle');
const links = $('#nav-links');
const setMenu = (open: boolean) => {
  nav.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.classList.toggle('no-scroll', open);
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
links.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

const toTop = $<HTMLButtonElement>('#to-top');
const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('is-scrolled', y > 40);
  toTop.classList.toggle('is-visible', y > 700);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

// Sección activa en el navbar
const navAnchors = $$<HTMLAnchorElement>('.nav__links a[href^="#"]');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    navAnchors.forEach((a) => {
      const on = a.getAttribute('href') === `#${en.target.id}`;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
NAV.forEach((n) => { const el = document.querySelector(n.href); if (el) spy.observe(el); });

// ── Carrusel ─────────────────────────────────────────────────
new Carousel($('#inicio'), 6500);

// ── Animación al hacer scroll ────────────────────────────────
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealer.unobserve(en.target); } });
}, { threshold: 0.12 });
$$('.reveal').forEach((el) => revealer.observe(el));

// ── Modal de servicio ────────────────────────────────────────
const modal = $<HTMLDialogElement>('#service-modal');
const openService = (id: string) => {
  const s = SERVICES.find((x) => x.id === id);
  if (!s) return;
  modal.innerHTML = `
    <div class="modal__media"><img src="${s.image}" alt="${esc(s.title)}" onerror="this.classList.add('img-fallback')" /></div>
    <div class="modal__body">
      <button class="modal__close" aria-label="Cerrar">${icon('close', 20)}</button>
      <span class="card__icon card__icon--static">${icon(s.icon, 22)}</span>
      <h3 id="modal-title">${esc(s.title)}</h3>
      <p>${esc(s.summary)}</p>
      <ul class="checks">${s.details.map((d) => `<li>${icon('check', 18)} ${esc(d)}</li>`).join('')}</ul>
      <div class="modal__actions">
        <a class="btn btn--primary" href="${waLink(`Hola, quisiera cotizar: ${s.title}.`)}" target="_blank" rel="noopener noreferrer">${icon('whatsapp', 18)} Cotizar por WhatsApp</a>
        <a class="btn btn--outline" href="#contacto" data-close data-pick="${esc(s.title)}">Usar formulario</a>
      </div>
    </div>`;
  modal.showModal();
};
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-service]');
  if (btn) openService(btn.dataset.service!);
});
modal.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t === modal || t.closest('.modal__close')) modal.close();
  const pick = t.closest<HTMLElement>('[data-pick]');
  if (pick) { $<HTMLSelectElement>('#f-service').value = pick.dataset.pick!; modal.close(); }
});

// ── Lightbox de galería ──────────────────────────────────────
const lb = $<HTMLDialogElement>('#lightbox');
let gi = 0;
const showG = (i: number) => {
  gi = (i + GALLERY.length) % GALLERY.length;
  const g = GALLERY[gi];
  lb.innerHTML = `
    <figure><img onerror="this.classList.add('img-fallback')" src="${g.image.replace('w=800', 'w=1600')}" alt="${esc(g.caption)}" /><figcaption>${esc(g.caption)} · ${gi + 1}/${GALLERY.length}</figcaption></figure>
    <button class="arrow lb__prev" aria-label="Anterior">${icon('arrowL', 20)}</button>
    <button class="arrow lb__next" aria-label="Siguiente">${icon('arrowR', 20)}</button>
    <button class="arrow lb__close" aria-label="Cerrar">${icon('close', 20)}</button>`;
};
$$<HTMLButtonElement>('.gallery__item').forEach((b) => b.addEventListener('click', () => { showG(Number(b.dataset.g)); lb.showModal(); }));
lb.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  if (t.closest('.lb__prev')) showG(gi - 1);
  else if (t.closest('.lb__next')) showG(gi + 1);
  else if (t === lb || t.closest('.lb__close')) lb.close();
});
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showG(gi - 1);
  if (e.key === 'ArrowRight') showG(gi + 1);
});

// ── Formulario → WhatsApp ────────────────────────────────────
const form = $<HTMLFormElement>('#quote-form');
const messages: Record<string, string> = {
  name: 'Ingresa tu nombre (mínimo 3 letras).',
  phone: 'Ingresa un celular válido de 9 dígitos que empiece con 9.',
  service: 'Selecciona un servicio.',
  message: 'Describe tu necesidad (mínimo 10 caracteres).',
};
const validate = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
  el.value = el.name === 'phone' ? el.value.replace(/\D/g, '') : el.value;
  const min = Number(el.getAttribute('minlength') ?? 0);
  const ok = el.checkValidity() && (!el.required || el.value.trim().length >= Math.max(1, min));
  const err = el.parentElement?.querySelector('.field__err');
  el.setAttribute('aria-invalid', String(!ok));
  if (err) err.textContent = ok ? '' : messages[el.name] ?? 'Campo inválido.';
  return ok;
};
const fields = $$<HTMLInputElement>('input[required], select[required], textarea[required]', form);
fields.forEach((f) => f.addEventListener('blur', () => validate(f)));
fields.forEach((f) => f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') validate(f); }));
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const results = fields.map(validate);
  if (results.includes(false)) { fields[results.indexOf(false)].focus(); return; }
  const d = new FormData(form);
  const msg = [
    `Hola ${COMPANY.short}, quisiera una cotización.`,
    `• Nombre: ${String(d.get('name')).trim()}`,
    `• Celular: ${d.get('phone')}`,
    `• Servicio: ${d.get('service')}`,
    d.get('district') ? `• Distrito: ${String(d.get('district')).trim()}` : '',
    `• Detalle: ${String(d.get('message')).trim()}`,
  ].filter(Boolean).join('\n');
  const url = waLink(msg);
  window.open(url, '_blank', 'noopener');
  const status = $('#form-status');
  status.innerHTML = `${icon('check', 18)} Mensaje listo. Si WhatsApp no se abrió, <a href="${url}" target="_blank" rel="noopener noreferrer">toca aquí para enviarlo</a>.`;
  status.hidden = false;
  form.reset();
  fields.forEach((f) => f.removeAttribute('aria-invalid'));
});
