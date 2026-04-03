import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/shop-list/shop-list.component').then((m) => m.ShopListComponent),
  },
  {
    path: 'basket',
    loadComponent: () =>
      import('./features/basket/basket.component').then((m) => m.BasketComponent),
  },
  { path: '**', redirectTo: 'shop' },
];
