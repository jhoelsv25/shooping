import { Injectable, effect, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorite = signal<Product[]>([]);

  addProductFavorite(product: Product) {
    this.favorite.update((state) => {
      const index = state.find((item) => item.id === product.id);
      if (index) {
        return state.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              isFavorite: true,
            };
          }
          return item;
        });
      }
      return [
        ...state,
        {
          ...product,
          isFavorite: true,
        },
      ];
    });
    console.log(this.favorite());
  }
}
