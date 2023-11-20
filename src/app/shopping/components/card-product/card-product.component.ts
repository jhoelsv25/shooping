import {
  Component,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'card-product',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent implements OnChanges {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private favoriteService = inject(FavoriteService);
  public isFavorite = this.favoriteService.isFavorite;
  public products = signal<Product[]>([]);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.allProducts();
    this.route.queryParams.subscribe((params) => {
      const id = params['category_id'];
      if (id) {
        this.productService.getCategoryById(id).subscribe({
          next: (res) => {
            this.products.set(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.allProducts();
      }
    });
  }
  addTocart(product: Product) {
    this.cartService.addToCart(product);
  }
  private allProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnChanges(change: SimpleChanges) {
    console.log('on change');
    const category = change['category_id'];
  }

  toggleFavorite(product: Product) {
    this.favoriteService.isFavorite.update((prev) => !prev);
  }
}
