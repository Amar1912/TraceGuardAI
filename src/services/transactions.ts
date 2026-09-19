import { useFraudStore } from "@/lib/mock-data/store";
import { Transaction } from "@/types";

export const TransactionService = {
  getTransactions: (): Transaction[] => {
    return useFraudStore.getState().transactions;
  },

  getTransactionById: (id: string): Transaction | undefined => {
    return useFraudStore.getState().transactions.find((t) => t.id === id);
  },

  getTransactionsByCustomerId: (customerId: string): Transaction[] => {
    return useFraudStore.getState().transactions.filter((t) => t.customerId === customerId);
  }
};
