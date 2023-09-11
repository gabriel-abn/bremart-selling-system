import { Product } from "@domain/entities";

export interface IProductRepository {
  findByID(id: string): Promise<Product>;
  findManybyID(ids: string[]): Promise<Product[]>;
}
