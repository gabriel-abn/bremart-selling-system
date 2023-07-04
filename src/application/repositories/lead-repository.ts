import { Lead, LeadProps } from "@domain/lead";

export interface ILeadRepository {
  create: (lead: Lead) => Promise<{ id: string }>;
  findByPurchaseId: (purchaseId: string) => Promise<LeadProps>;
}
