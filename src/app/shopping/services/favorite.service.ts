import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  public favorite = signal<Product[]>([]);
  public isFavorite = signal<boolean>(false);
}
