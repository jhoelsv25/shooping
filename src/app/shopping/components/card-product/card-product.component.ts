import {
  Component,
  Input,
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
  @Input() public products = signal<Product[]>([]);
  private route = inject(ActivatedRoute);
  @Input() price!: number;
  ngOnInit(): void {
    this.allProducts();
    this.filterCategory();
    this.searchProducts();
  }
  addTocart(product: Product) {
    this.cartService.addToCart(product);
  }
  toggleFavorite(product: Product) {
    //this.favoriteService.isFavorite.update((prev) => !prev);
  }
  ngOnChanges(change: SimpleChanges): void {
    if (change['price']) {
      this.filterByPrice();
    }
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

  public filterCategory() {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['category_id'];
      if (categoryId) {
        this.productService.getFilterProducts({ categoryId }).subscribe({
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
  public searchProducts() {
    this.route.queryParams.subscribe((params) => {
      const title = params['q'];

      if (title) {
        this.productService.getFilterProducts({ title }).subscribe({
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
  public filterByPrice() {
    const price_min = this.price;
    const price_max = this.price + 100;
    if (price_min) {
      this.productService
        .getFilterProducts({ price_min, price_max })
        .subscribe({
          next: (res) => {
            this.products.set(res);
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.allProducts();
    }
  }

  public addFavorite(product: Product) {
    this.favoriteService.addProductFavorite(product);
  }
}
