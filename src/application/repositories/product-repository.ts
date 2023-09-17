import { Product } from "@domain/entities";

export interface IProductRepository {
  get(id: string): Promise<Product>;
  getMany(ids: string[]): Promise<Product[]>;
}
