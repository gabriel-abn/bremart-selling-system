import { IPurchaseRepository } from "@application/repositories";
import { Purchase, PurchaseProps } from "@domain/purchase";

export class MockPurchaseRepository implements IPurchaseRepository {
  private items: Purchase[] = [];

  async create(purchase: Purchase): Promise<{ id: string }> {
    this.items.push(purchase);

    return { id: purchase.id };
  }

  async findById(id: string): Promise<PurchaseProps> {
    const purchase = this.items.find((purchase) => purchase.id === id);

    if (purchase) {
      return purchase.props;
    }

    return null;
  }

  async getAll(): Promise<PurchaseProps[]> {
    return this.items.map((p) => p.props);
  }

  async edit(purchase: Purchase): Promise<PurchaseProps> {
    const edit = await this.findById(purchase.id);

    const newPurchase = Purchase.create(purchase.props);

    this.items.splice(
      this.items.findIndex((item) => item.id == purchase.id),
      1
    );

    this.items.push(newPurchase);

    return newPurchase.props;
  }

  async delete(id: string): Promise<boolean> {
    const purchase = await this.findById(id);

    if (!purchase) {
      return false;
    }

    this.items.splice(
      this.items.findIndex((item) => item.id == id),
      1
    );

    return true;
  }

  async getAllByUserId(userId: string): Promise<PurchaseProps[]> {
    return this.items
      .filter((p) => p.props.userId === userId)
      .map((p) => p.props);
  }
}
