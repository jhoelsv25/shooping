import { Category } from './category';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  creationAt: string;
  category: Category;
  quantity?: number;
  isFavorite?: boolean;
}
