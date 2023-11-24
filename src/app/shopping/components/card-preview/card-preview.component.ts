import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'card-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-preview.component.html',
})
export class CardPreviewComponent {
  private cartService = inject(CartService);
  public carts = this.cartService.cart;

  public increment(item: Product) {
    this.cartService.increaseQuantity(item);
  }
  public decrement(item: Product) {
    this.cartService.decreaseQuantity(item);
  }
  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }
}
