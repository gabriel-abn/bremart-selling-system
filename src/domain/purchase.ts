import { Entity } from "./common";
import { PaymentType } from "./payment-type";
import { PurchaseItem } from "./purchase-item";

export type PurchaseProps = {
  id: string;
  userId?: string;
  items: PurchaseItem[];
  paymentType: PaymentType;
  total?: number;
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
        .reduce((a, b) => {
          return (
            a + b - b * (props.paymentType === PaymentType.CASH ? 0.05 : 0)
          );
        }, 0),
    });
  }
}
