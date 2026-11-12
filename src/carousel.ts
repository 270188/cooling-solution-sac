/** Carrusel accesible: autoplay, pausa, flechas, puntos, teclado y gesto táctil. */
export class Carousel {
  private slides: HTMLElement[];
  private dots: HTMLButtonElement[];
  private index = 0;
  private timer: number | undefined;
  private paused: boolean;
  private hovering = false;
  private pauseBtn: HTMLButtonElement;

  constructor(private root: HTMLElement, private interval = 6000) {
    this.slides = Array.from(root.querySelectorAll<HTMLElement>('.slide'));
    this.dots = Array.from(root.querySelectorAll<HTMLButtonElement>('.dot'));
    this.pauseBtn = root.querySelector<HTMLButtonElement>('#hero-pause')!;
    this.paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.root.style.setProperty('--interval', `${interval}ms`);

    root.querySelector('#hero-prev')!.addEventListener('click', () => this.go(this.index - 1));
    root.querySelector('#hero-next')!.addEventListener('click', () => this.go(this.index + 1));
    this.pauseBtn.addEventListener('click', () => this.setPaused(!this.paused));
    this.dots.forEach((d) => d.addEventListener('click', () => this.go(Number(d.dataset.i))));

    root.addEventListener('mouseenter', () => { this.hovering = true; this.stop(); });
    root.addEventListener('mouseleave', () => { this.hovering = false; this.start(); });
    root.addEventListener('focusin', () => this.stop());
    root.addEventListener('focusout', () => this.start());
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.go(this.index - 1);
      if (e.key === 'ArrowRight') this.go(this.index + 1);
    });

    let x0: number | null = null;
    root.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) this.go(this.index + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    document.addEventListener('visibilitychange', () => (document.hidden ? this.stop() : this.start()));
    this.setPaused(this.paused);
  }

  private go(i: number) {
    const n = this.slides.length;
    this.index = (i + n) % n;
    this.slides.forEach((s, k) => {
      const on = k === this.index;
      s.classList.toggle('is-active', on);
      s.toggleAttribute('aria-hidden', !on);
      s.querySelectorAll<HTMLElement>('a').forEach((a) => (a.tabIndex = on ? 0 : -1));
      if (on) s.querySelector('img')?.removeAttribute('loading');
    });
    this.dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === this.index);
      d.setAttribute('aria-selected', String(k === this.index));
    });
    this.restart();
  }

  private setPaused(p: boolean) {
    this.paused = p;
    this.root.classList.toggle('is-paused', p);
    this.pauseBtn.setAttribute('aria-pressed', String(p));
    this.pauseBtn.setAttribute('aria-label', p ? 'Reanudar carrusel' : 'Pausar carrusel');
    p ? this.stop() : this.start();
  }

  private restart() {
    // reinicia la barra de progreso del punto activo
    this.dots.forEach((d) => { const s = d.querySelector('span') as HTMLElement; s.style.animation = 'none'; void s.offsetWidth; s.style.animation = ''; });
    this.stop();
    this.start();
  }

  private start() {
    if (this.paused || this.hovering || this.timer) return;
    this.root.classList.remove('is-holding');
    this.timer = window.setInterval(() => this.go(this.index + 1), this.interval);
  }

  private stop() {
    window.clearInterval(this.timer);
    this.timer = undefined;
    this.root.classList.add('is-holding');
  }
}
