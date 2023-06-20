import { Purchase, PurchaseProps } from "@domain/purchase";

export interface IPurchaseRepository {
  create(purchase: Purchase): Promise<{ id: string }>;
  findById(id: string): Promise<PurchaseProps>;
  getAll(): Promise<PurchaseProps[]>;
  edit(purchase: Purchase): Promise<PurchaseProps>;
  delete(id: string): Promise<boolean>;
  getAllByUserId(userId: string): Promise<PurchaseProps[]>;
}
