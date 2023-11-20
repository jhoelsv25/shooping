import { HttpClient } from '@angular/common/http';
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

  getProducts(): Observable<Product[]> {
    const url = `${this.BASE_URL}/products/`;
    return this.http.get<Product[]>(url);
  }
  getProductById(id: number) {
    const url = `${this.BASE_URL}/products/${id}`;
    return this.http.get<Product>(url);
  }

  getCategories(): Observable<Category[]> {
    const url = `${this.BASE_URL}/categories`;
    return this.http.get<Category[]>(url);
  }
  getCategoryById(id: number) {
    const url = `${this.BASE_URL}/products/?categoryId=${id}`;
    return this.http.get<Product[]>(url);
  }
}
