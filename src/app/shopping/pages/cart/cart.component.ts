import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private cartService = inject(CartService);
  public carts = this.cartService.cart;
  public total = this.cartService.total;

  updateQuantity(item: Product, quantity: string) {
    this.cartService.updateQuantity(item, Number(quantity));
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }
}
