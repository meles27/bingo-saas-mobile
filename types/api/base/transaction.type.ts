import { BaseQueryParams } from ".";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  image: string | null;
}

interface Cashier {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  image: string | null;
}

export type PaymentStatus = "pending" | "completed" | "failed" | "cancelled";
export type PaymentGateway = "cash" | "card" | "telebirr" | "chapa" | string;

export interface TransactionEntity {
  id: string;
  user: User;
  cashier: Cashier;
  amount: string;
  currency: string;
  status: PaymentStatus;
  gateway: PaymentGateway;
  notes: string | null;
  reason: string | null;
  createdAt: string; // ISO timestamp
}

export type UserQueryParamsIface = BaseQueryParams & {
  includeDeleted?: boolean;
};
