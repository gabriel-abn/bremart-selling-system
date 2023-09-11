import { IProductRepository } from "@application/repositories";
import { Product } from "@domain/entities";
import { mockProduct } from "@test-domain/mocks";

export class MockProductRepository implements IProductRepository {
  public items: Product[] = [
    mockProduct({}),
    mockProduct({}),
    mockProduct({}),
    mockProduct({ id: "valid_id_1" }),
    mockProduct({ id: "valid_id_2" }),
  ];

  async findByID(id: string): Promise<Product> {
    return this.items.find((p) => p.id === id);
  }
  async findManybyID(ids: string[]): Promise<Product[]> {
    return this.items.filter((p) => ids.includes(p.id));
  }
}
