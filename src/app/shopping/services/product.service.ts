import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private BASE_URL: string = 'https://api.escuelajs.co/api/v1';
  private http = inject(HttpClient);
  constructor() {}

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
    price_min?: number;
    price_max?: number | string;
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
      if (params.price_min) {
        httpParams = httpParams.set('price_min', params.price_min.toString());
      }
      if (params.price_max) {
        httpParams = httpParams.set('price_max', params.price_max.toString());
      }
    }
    return this.http.get<Product[]>(url, { params: httpParams });
  }
}
