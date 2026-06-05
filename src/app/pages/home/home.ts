import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Quote {
  text: string;
  author: string;
  role: string;
  color: string;
}

interface HeroSlide {
  id: string;
  label: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private el       = inject(ElementRef);
  private platform = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;
  private observerFeatures: IntersectionObserver | null = null;
  private observerQue: IntersectionObserver | null = null;
  private observerValores: IntersectionObserver | null = null;
  private observerCta: IntersectionObserver | null = null;
  quienVisible    = signal(false);
  featuresVisible = signal(false);
  queVisible      = signal(false);
  valoresVisible  = signal(false);
  ctaVisible      = signal(false);
  readonly heroSlides: HeroSlide[] = [
    { id: 'inicio',   label: 'Inicio' },
    { id: 'cursos',   label: 'Cursos' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'webinars', label: 'Webinars' },
    { id: 'tienda',   label: 'Tienda' },
  ];

  heroSlide = signal(0);
  heroVisible = signal(true);
  private heroTimer: ReturnType<typeof setInterval> | null = null;

  readonly quotes: Quote[] = [
    {
      text: 'Creemos en una educación que abraza la diversidad y construye entornos más inclusivos para todos.',
      author: 'EducaNeuro',
      role: 'Nuestra misión',
      color: 'var(--color-primary)',
    },
    {
      text: 'Cada niño aprende diferente. Nuestra tarea es encontrar el camino que le permita brillar.',
      author: 'Enfoque neuroafirmativo',
      role: 'Principio pedagógico',
      color: 'var(--color-secondary)',
    },
    {
      text: 'La inclusión no es un favor que le hacemos a quienes son diferentes. Es una ganancia para todos.',
      author: 'Comunidad EducaNeuro',
      role: 'Valor compartido',
      color: 'var(--color-accent-orange)',
    },
    {
      text: 'Entender el autismo no es una opción: es el primer paso para construir un mundo más justo.',
      author: 'Programa de formación',
      role: 'Módulo introductorio',
      color: 'var(--color-accent-teal)',
    },
    {
      text: 'Las familias que aprenden juntas, acompañan mejor. El conocimiento transforma el hogar.',
      author: 'Recursos para familias',
      role: 'Guía de apoyo',
      color: 'var(--color-accent-purple)',
    },
  ];

  current = signal(0);
  visible = signal(true);
  private timer: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.heroTimer = setInterval(() => this.nextHeroSlide(), 5000);
    this.timer = setInterval(() => this.next(), 4500);
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platform)) return;
    const makeObserver = (selector: string, setter: () => void) => {
      const el = this.el.nativeElement.querySelector(selector);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(); obs.disconnect(); } },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    };
    this.observer         = makeObserver('.quien-grid',    () => this.quienVisible.set(true));
    this.observerFeatures = makeObserver('.features-grid', () => this.featuresVisible.set(true));
    this.observerQue      = makeObserver('.que-list',      () => this.queVisible.set(true));
    this.observerValores  = makeObserver('.valores-grid',  () => this.valoresVisible.set(true));
    this.observerCta      = makeObserver('.cta-inner',     () => this.ctaVisible.set(true));
  }

  ngOnDestroy() {
    if (this.heroTimer) clearInterval(this.heroTimer);
    if (this.timer) clearInterval(this.timer);
    this.observer?.disconnect();
    this.observerFeatures?.disconnect();
    this.observerQue?.disconnect();
    this.observerValores?.disconnect();
    this.observerCta?.disconnect();
  }

  goToHeroSlide(index: number) {
    if (index === this.heroSlide()) return;
    this.animateHero(index);
    if (this.heroTimer) clearInterval(this.heroTimer);
    this.heroTimer = setInterval(() => this.nextHeroSlide(), 5000);
  }

  private nextHeroSlide() {
    const next = (this.heroSlide() + 1) % this.heroSlides.length;
    this.animateHero(next);
  }

  private animateHero(index: number) {
    this.heroVisible.set(false);
    setTimeout(() => {
      this.heroSlide.set(index);
      this.heroVisible.set(true);
    }, 400);
  }

  goTo(index: number) {
    if (index === this.current()) return;
    this.animate(index);
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.next(), 4500);
  }

  private next() {
    const nextIndex = (this.current() + 1) % this.quotes.length;
    this.animate(nextIndex);
  }

  private animate(index: number) {
    this.visible.set(false);
    setTimeout(() => {
      this.current.set(index);
      this.visible.set(true);
    }, 350);
  }

  get activeQuote(): Quote {
    return this.quotes[this.current()];
  }
}
