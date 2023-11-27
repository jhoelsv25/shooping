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
        return state.map((item) =>
          item.id === product.id
            ? { ...item, isFarite: !item.isFavorite }
            : item
        );
      }
      return [
        ...state,
        {
          ...product,
          isFavorite: true,
        },
      ];
    });
  }
}
