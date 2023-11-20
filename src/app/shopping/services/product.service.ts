import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL: string = 'https://api.escuelajs.co/api/v1';
  private http = inject(HttpClient);

  products = signal<Product[]>([]);

  getProductById(id: number) {
    const url = `${this.BASE_URL}/products/${id}`;
    return this.http.get<Product>(url);
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.BASE_URL}/categories`;
    return this.http.get<Category[]>(url);
  }
  getProducts() {
    const url = `${this.BASE_URL}/products`;
    return this.http.get<Product[]>(url);
  }
  getFilterProducts(params?: {
    categoryId?: number;
    title?: string;
  }): Observable<Product[]> {
    const url = `${this.BASE_URL}/products/`;
    let httpParams = new HttpParams();
    if (params) {
      if (params.categoryId) {
        httpParams = httpParams.set('categoryId', params.categoryId.toString());
      }
      if (params.title) {
        httpParams = httpParams.set('title', params.title);
      }
    }
    return this.http
      .get<Product[]>(url, { params: httpParams })
      .pipe(tap((res) => this.products.set(res)));
  }
}
