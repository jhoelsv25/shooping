import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPreviewComponent } from '../../components/card-preview/card-preview.component';
import { CartService } from '../../services/cart.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'side-cart',
  standalone: true,
  templateUrl: './side-cart.component.html',
  imports: [CommonModule, CardPreviewComponent, RouterLinkWithHref],
})
export class SideCartComponent {
  private cartService = inject(CartService);
  public total = this.cartService.total;
  public isOpen = computed(() => this.cartService.isOpen());

  toggleCart() {
    this.cartService.togleCart();
  }
}
