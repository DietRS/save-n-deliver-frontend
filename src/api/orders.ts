import client from "./client";
import { BasketItem } from "../types/Product";

export async function submitOrder(items: BasketItem[], email: string) {
  const { data } = await client.post("/checkout/submit", { items, email });
  return data; // { ok: true }
}

export async function fetchOrderHistory(token: string) {
  const { data } = await client.get("/orders/history", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data; // { orders: ... }
}
