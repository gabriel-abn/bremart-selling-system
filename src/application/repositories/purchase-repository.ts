import { Purchase } from "@domain/entities";

export interface IPurchaseRepository {
  create(purchase: Purchase): Promise<{ id: string }>;
  get(id: string): Promise<Purchase>;
  getAll(): Promise<Purchase[]>;
  edit(purchase: Purchase): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  getAllByUserId(userId: string): Promise<Purchase[]>;
}
