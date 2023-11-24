import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCartComponent } from '../side-cart/side-cart.component';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule, SideCartComponent, RouterLinkWithHref],
})
export class HeaderComponent {
  public isOpen = signal<boolean>(true);
  private cartService = inject(CartService);
  public cart = computed(() => this.cartService.cart());
  toggleCart() {
    this.isOpen.update((preState) => !preState);
  }
}
