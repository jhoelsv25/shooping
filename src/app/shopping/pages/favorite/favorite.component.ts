import { Component, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { Product } from '../../models/product';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
  imports: [CommonModule, CardProductComponent],
})
export class FavoriteComponent {
  favorites: WritableSignal<Product[]> = [] as unknown as WritableSignal<
    Product[]
  >;

  private favoriteService = inject(FavoriteService);

  ngOnInit(): void {
    this.favorites = this.favoriteService.favorite;
  }
}
