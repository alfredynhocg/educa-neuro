import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'cursos', loadComponent: () => import('./pages/cursos/cursos').then(m => m.Cursos) },
  { path: 'recursos', loadComponent: () => import('./pages/recursos/recursos').then(m => m.Recursos) },
  { path: 'webinars', loadComponent: () => import('./pages/webinars/webinars').then(m => m.Webinars) },
  { path: 'tienda', loadComponent: () => import('./pages/tienda/tienda').then(m => m.Tienda) },
  { path: 'sobre-mi', loadComponent: () => import('./pages/sobre-mi/sobre-mi').then(m => m.SobreMi) },
  { path: '**', redirectTo: '' }
];
