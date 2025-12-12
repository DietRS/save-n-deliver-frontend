// src/types/Product.ts

// Base product returned from store search
export type Product = {
  id: string;
  name: string;
  price: number;
  chain: string;
  image?: string;
  logo?: string;
};

// Basket item extends Product with quantity
export type BasketItem = Product & {
  quantity: number;
};
