import { Component, WritableSignal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { Product } from '../../models/product';
import { FavoriteService } from '../../services/favorite.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  templateUrl: './favorite.component.html',
  imports: [CommonModule, CardProductComponent, RouterLinkWithHref],
})
export class FavoriteComponent {
  favorites: WritableSignal<Product[]> = [] as unknown as WritableSignal<
    Product[]
  >;
  productsFavorite: WritableSignal<Product[]> = computed(() =>
    this.favorites().filter((item) => item.isFavorite)
  ) as unknown as WritableSignal<Product[]>;

  private favoriteService = inject(FavoriteService);

  ngOnInit(): void {
    this.favorites = this.favoriteService.favorite;
  }
}
