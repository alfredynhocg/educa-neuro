import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    @if (loading()) {
      <div class="loader-overlay" [class.fade-out]="fadeOut()">
        <div class="loader-particles">
          @for (p of particles; track p) {
            <div class="particle" [style]="p"></div>
          }
        </div>
        <div class="loader-center">
          <div class="loader-glow"></div>
          <img src="assets/images/educa-neuro-loader.png" alt="EducaNeuro" class="loader-logo" />
        </div>
        <div class="loader-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    }
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    main { min-height: 100vh; }

    .loader-overlay {
      position: fixed;
      inset: 0;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      z-index: 9999;
      opacity: 1;
      transition: opacity 0.7s ease;
      overflow: hidden;
    }

    .loader-overlay.fade-out {
      opacity: 0;
      pointer-events: none;
    }

    /* Partículas flotantes de fondo */
    .loader-particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      border-radius: 50%;
      opacity: 0;
      animation: float-up linear infinite;
    }

    @keyframes float-up {
      0%   { transform: translateY(0) scale(0.5); opacity: 0; }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.3; }
      100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
    }

    /* Centro: glow + logo */
    .loader-center {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loader-glow {
      position: absolute;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(46,125,50,0.12) 0%, rgba(2,51,103,0.08) 50%, transparent 70%);
      animation: glow-pulse 2s ease-in-out infinite;
    }

    @keyframes glow-pulse {
      0%, 100% { transform: scale(1);    opacity: 1; }
      50%       { transform: scale(1.25); opacity: 0.6; }
    }

    .loader-logo {
      width: clamp(130px, 30vw, 210px);
      height: auto;
      position: relative;
      z-index: 1;
      animation: drop-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    @keyframes drop-in {
      from { transform: translateY(-40px) scale(0.8); opacity: 0; }
      to   { transform: translateY(0)     scale(1);   opacity: 1; }
    }

    /* Tres puntos animados */
    .loader-dots {
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }

    .loader-dots span {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: bounce-dot 1.2s ease-in-out infinite;
    }

    .loader-dots span:nth-child(1) { background: #2e7d32; animation-delay: 0s; }
    .loader-dots span:nth-child(2) { background: #023367; animation-delay: 0.2s; }
    .loader-dots span:nth-child(3) { background: #f57c00; animation-delay: 0.4s; }

    @keyframes bounce-dot {
      0%, 80%, 100% { transform: scale(0.7) translateY(0);   opacity: 0.5; }
      40%            { transform: scale(1.2) translateY(-8px); opacity: 1; }
    }
  `]
})
export class App implements OnInit {
  loading = signal(true);
  fadeOut = signal(false);

  readonly particles = Array.from({ length: 18 }, () => {
    const colors = ['#2e7d32', '#023367', '#f57c00', '#7b1fa2', '#00838f'];
    const size = Math.random() * 10 + 5;
    return [
      `left:${Math.random() * 100}%`,
      `bottom:${Math.random() * -10}%`,
      `width:${size}px`,
      `height:${size}px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `animation-duration:${Math.random() * 4 + 4}s`,
      `animation-delay:${Math.random() * 4}s`,
    ].join(';');
  });

  ngOnInit() {
    setTimeout(() => this.fadeOut.set(true), 2000);
    setTimeout(() => this.loading.set(false), 2700);
  }
}
