// src/api/auth.ts
import client from "./client";
import { LoginResponse } from "../types/Auth";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>("/auth/login", { email, password });
  return data;
}
