import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'segundatela',
    loadComponent: () => import('./segundatela/segundatela.page').then( m => m.SegundatelaPage)
  },
  {
    path: 'tela3',
    loadComponent: () => import('./tela3/tela3.page').then( m => m.Tela3Page)
  },
];
