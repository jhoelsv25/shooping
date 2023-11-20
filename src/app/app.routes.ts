import { Routes } from '@angular/router';
import { HomeComponent } from './shopping/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./shopping/pages/cart/cart.component').then(
        (m) => m.CartComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./shopping/pages/favorite/favorite.component').then(
        (m) => m.FavoriteComponent
      ),
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import(
        './shopping/components/product-detail/product-detail.component'
      ).then((m) => m.ProductDetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
