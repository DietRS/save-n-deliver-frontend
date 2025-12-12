export type CompetitorPrice = {
  chain: string;
  price: number;
};

export type BasketItem = {
  id: string;
  name: string;
  price: number;      // your chosen store’s price
  chain: string;      // your chosen store
  quantity: number;
  competitors?: CompetitorPrice[]; // optional list of other store prices
};
