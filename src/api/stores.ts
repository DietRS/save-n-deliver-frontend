import client from "./client";
import { Product } from "../types/Product";

export async function searchCompetitive(query: string): Promise<Product[]> {
  const [walmart, safeway, saveon, costco] = await Promise.all([
    client.get<Product[]>("/walmart/search", { params: { q: query } }),
    client.get<Product[]>("/safeway/search", { params: { q: query } }),
    client.get<Product[]>("/saveon/search", { params: { q: query } }),
    client.get<Product[]>("/costco/search", { params: { q: query } }),
  ]);
  return [...walmart.data, ...safeway.data, ...saveon.data, ...costco.data];
}
