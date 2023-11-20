import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  private productService = inject(ProductService);
  public categories = signal<Category[]>([]);

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
