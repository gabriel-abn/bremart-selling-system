import { IPurchaseRepository } from "@application/repositories";
import { Purchase, PurchaseProps } from "@domain/entities";

export class MockPurchaseRepository implements IPurchaseRepository {
  private items: Purchase[] = [];

  async create(purchase: Purchase): Promise<{ id: string }> {
    this.items.push(purchase);

    return { id: purchase.getId() };
  }

  async findById(id: string): Promise<PurchaseProps> {
    const purchase = this.items.find((purchase) => purchase.getId() === id);

    if (purchase) {
      return purchase.getProps();
    }

    return null;
  }

  async getAll(): Promise<PurchaseProps[]> {
    return this.items.map((p) => p.getProps());
  }

  async edit(purchase: Purchase): Promise<PurchaseProps> {
    const edit = await this.findById(purchase.getId());

    const newPurchase = Purchase.create(purchase.getProps());

    this.items.splice(
      this.items.findIndex((item) => item.getId() == purchase.getId()),
      1
    );

    this.items.push(newPurchase);

    return newPurchase.getProps();
  }

  async delete(id: string): Promise<boolean> {
    const purchase = await this.findById(id);

    if (!purchase) {
      return false;
    }

    this.items.splice(
      this.items.findIndex((item) => item.getId() == id),
      1
    );

    return true;
  }

  async getAllByUserId(userId: string): Promise<PurchaseProps[]> {
    return this.items
      .filter((p) => p.getProps().userId === userId)
      .map((p) => p.getProps());
  }
}
