import { IPurchaseRepository } from "@application/repositories";
import { PaymentType } from "@domain/payment-type";
import { PurchaseProps } from "@domain/purchase";

export class MockPurchaseRepository implements IPurchaseRepository {
  async create(purchase: PurchaseProps): Promise<{ id: string }> {
    return purchase.id ? { id: purchase.id } : { id: "1" };
  }

  async findById(id: string): Promise<PurchaseProps> {
    if (id != "any_id") {
      return null;
    }

    return {
      id: "any_id",
      items: [],
      total: 0,
      paymentType: PaymentType.CASH,
    };
  }
}
