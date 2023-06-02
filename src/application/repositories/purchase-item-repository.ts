import { PurchaseItemProps } from "@domain/purchase-item";

export interface IPurchaseItemRepository {
  findByID(id: string): Promise<PurchaseItemProps>;
  findManybyID(ids: string[]): Promise<PurchaseItemProps[]>;
}
