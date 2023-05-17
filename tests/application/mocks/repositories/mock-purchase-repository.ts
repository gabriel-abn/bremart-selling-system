import { IPurchaseRepository } from "@application/repositories";
import { PurchaseProps } from "@domain/purchase";

export class MockPurchaseRepository implements IPurchaseRepository {
  async create(purchase: PurchaseProps): Promise<{ id: string }> {
    return purchase.id ? { id: purchase.id } : { id: "1" };
  }
}
