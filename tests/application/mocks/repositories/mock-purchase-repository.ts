import { IPurchaseRepository } from "@application/repositories";
import { Purchase } from "@domain/entities";

export class MockPurchaseRepository implements IPurchaseRepository {
  items: Purchase[] = [];

  async create(purchase: Purchase): Promise<{ id: string }> {
    this.items.push(purchase);

    return { id: purchase.id };
  }

  async get(id: string): Promise<Purchase> {
    return this.items.find((purchase) => purchase.id === id);
  }

  async getAll(): Promise<Purchase[]> {
    return this.items.map((p) => p);
  }

  async edit(purchase: Purchase): Promise<boolean> {
    const edit = await this.get(purchase.id);

    const newPurchase = Purchase.create({
      ...edit,
      ...purchase.props,
    });

    this.items.splice(
      this.items.findIndex((item) => item.id == purchase.id),
      1,
    );

    this.items.push(newPurchase);

    return true;
  }

  async delete(id: string): Promise<boolean> {
    const purchase = await this.get(id);

    if (!purchase) {
      return false;
    }

    this.items.splice(
      this.items.findIndex((item) => item.id == id),
      1,
    );

    return true;
  }

  async getAllByUserId(userId: string): Promise<Purchase[]> {
    return this.items.filter((p) => p.props.userId === userId).map((p) => p);
  }
}
