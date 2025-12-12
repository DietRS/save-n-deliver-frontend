// src/types/Auth.ts

export type LoginResponse = {
  ok: boolean;
  token?: string;
  email?: string;
  error?: string;
};
