import { apiFetch } from "./api";
import { Transaction } from "@/types";

export const TransactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    return apiFetch("/transactions/");
  },

  getTransactionById: async (id: string): Promise<Transaction> => {
    return apiFetch(`/transactions/${id}`);
  },

  getTransactionsByCustomerId: async (customerId: string): Promise<Transaction[]> => {
    return apiFetch(`/customers/${customerId}/transactions`);
  }
};
