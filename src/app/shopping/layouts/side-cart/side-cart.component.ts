import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPreviewComponent } from '../../components/card-preview/card-preview.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'side-cart',
  standalone: true,
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
  imports: [CommonModule, CardPreviewComponent],
})
export class SideCartComponent {
  private cartService = inject(CartService);
  public total = this.cartService.total;

  @Input() isOpen!: boolean;
  togleCart() {
    this.isOpen = true;
  }
}
