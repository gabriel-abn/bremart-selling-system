import { PurchaseProps } from "@domain/purchase";

export interface IPurchaseRepository {
  create(purchase: PurchaseProps): Promise<{ id: string }>;
  findById(id: string): Promise<PurchaseProps>;
}
