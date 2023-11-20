import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart = signal<Product[]>([]);

  public total = computed<number>(() => {
    const cart = this.cart();
    return cart.reduce(
      (total: number, item: Product) =>
        total + item.price * (item.quantity ?? 1),
      0
    );
  });

  public addToCart(cart: Product): void {
    this.cart.update((prevState) => {
      const index = prevState.find((item) => item.id === cart.id);
      console.log(index);
      if (index) {
        return prevState.map((item) => {
          if (item.id === cart.id) {
            return {
              ...item,
              quantity: (item.quantity ?? 1) + 1,
            };
          }
          return item;
        });
      }
      return [
        ...prevState,
        {
          ...cart,
          quantity: 1,
        },
      ];
    });
  }
  public removeFromCart(cart: Product): void {
    this.cart.update((prevState) => {
      const index = prevState.findIndex((item) => item.id === cart.id);
      prevState.splice(index, 1);
      return [...prevState];
    });
  }
  public updateQuantity(cart: Product, quantity: number): void {
    this.cart.update((prevState) => {
      const index = prevState.findIndex((item) => item.id === cart.id);
      prevState[index].quantity = quantity;
      return [...prevState];
    });
  }

  public increaseQuantity(cart: Product): void {
    this.cart.update((prevState) => {
      return prevState.map((item) =>
        item.id === cart.id
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      );
    });
  }

  public decreaseQuantity(cart: Product): void {
    this.cart.update((prevState) => {
      return prevState.map((item) =>
        item.id === cart.id
          ? { ...item, quantity: (item.quantity ?? 1) - 1 }
          : item
      );
    });
  }
}
