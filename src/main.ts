import './style.css';
import { COMPANY, SERVICES, GALLERY } from './data';
import { icon } from './icons';
import { Carousel } from './carousel';
import { esc, waLink, NAV, renderPage } from './templates';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T & Element>(sel) as T;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll(sel)) as T[];


// ── Render ───────────────────────────────────────────────────
// El HTML ya viene prerenderizado desde el build; solo se genera aquí si falta (modo desarrollo).
const app = document.getElementById('app')!;
if (!app.firstElementChild) app.innerHTML = renderPage();

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
