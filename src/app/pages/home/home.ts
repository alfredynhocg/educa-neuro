import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Quote {
  text: string;
  author: string;
  role: string;
  color: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
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
    this.timer = setInterval(() => this.next(), 4500);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
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
