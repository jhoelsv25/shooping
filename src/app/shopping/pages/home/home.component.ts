import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { CategoryComponent } from '../../components/category/category.component';
import { FilterComponent } from '../../components/filter/filter.component';

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
export class HomeComponent {}
