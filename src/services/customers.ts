import { apiFetch } from "./api";
import { Customer } from "@/types";

export const CustomerService = {
  getCustomers: async (): Promise<Customer[]> => {
    return apiFetch("/customers/");
  },

  getCustomerById: async (id: string): Promise<Customer> => {
    return apiFetch(`/customers/${id}`);
  }
};
