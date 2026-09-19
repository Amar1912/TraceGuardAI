import { useFraudStore } from "@/lib/mock-data/store";
import { Customer } from "@/types";

export const CustomerService = {
  getCustomers: (): Customer[] => {
    return useFraudStore.getState().customers;
  },

  getCustomerById: (id: string): Customer | undefined => {
    return useFraudStore.getState().customers.find((c) => c.id === id);
  }
};
