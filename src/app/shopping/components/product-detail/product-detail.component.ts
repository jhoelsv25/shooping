import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  public product = signal<Product | null>(null);
  public cover = signal<string>('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const productId = parseInt(id);
      this.productService.getProductById(productId).subscribe({
        next: (product) => {
          this.product.set(product);
          this.cover.set(product.images[0]);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  addToCart(product: Product | null) {
    if (!product) return;
    this.cartService.addToCart(product);
  }

  changeCover(image: string) {
    this.cover.set(image);
  }
}
