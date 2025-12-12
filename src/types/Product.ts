export type Product = {
  id: string;
  name: string;
  price: number;
  chain: "Walmart" | "Safeway" | "Save-On Foods" | "Costco";
  image?: string;
  logo?: string;
};

export type BasketItem = Product & { quantity: number };
