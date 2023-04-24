import { Entity } from "./common";
import { PurchaseItem } from "./purchase-item";

export type PurchaseProps = {
  id: string;
  userId?: string;
  items: PurchaseItem[];
  total: number;
};

export class Purchase extends Entity<PurchaseProps> {
  private constructor(props: PurchaseProps) {
    super(props, props.id);
  }

  public static create(props: PurchaseProps): Purchase {
    return new Purchase({
      ...props,
      total: props.items
        .map((item) => item.props.price)
        .reduce((a, b) => a + b, 0),
    });
  }
}
