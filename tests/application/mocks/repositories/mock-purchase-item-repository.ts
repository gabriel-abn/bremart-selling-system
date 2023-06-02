import { IPurchaseItemRepository } from "@application/repositories";
import { PurchaseItemProps } from "@domain/purchase-item";
import { mockPurchaseItem } from "@test-domain/mocks";

export class MockPurchaseItemRepository implements IPurchaseItemRepository {
  public items: PurchaseItemProps[] = [
    mockPurchaseItem({}),
    mockPurchaseItem({}),
    mockPurchaseItem({}),
    mockPurchaseItem({ id: "valid_id_1" }),
    mockPurchaseItem({ id: "valid_id_2" }),
  ];

  async findByID(id: string): Promise<PurchaseItemProps> {
    return this.items.find((p) => p.id === id);
  }
  async findManybyID(ids: string[]): Promise<PurchaseItemProps[]> {
    return this.items.filter((p) => ids.includes(p.id));
  }
}
