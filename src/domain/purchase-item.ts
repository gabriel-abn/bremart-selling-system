import { Entity } from "./common";

export type PurchaseItemProps = {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  uniqueDiscount: number;
};

export class PurchaseItem extends Entity<PurchaseItemProps> {
  private constructor(props: PurchaseItemProps) {
    super(props, props.id);
  }

  public static create(props: PurchaseItemProps): PurchaseItem {
    return new PurchaseItem(props);
  }
}
