import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { CategoryComponent } from '../../components/category/category.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    CardProductComponent,
    CategoryComponent,
    FilterComponent,
  ],
})
export class HomeComponent {
  public price = signal<number>(0);

  handlePriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.price.set(Number(target.value));
    console.log(this.price());
  }
}
