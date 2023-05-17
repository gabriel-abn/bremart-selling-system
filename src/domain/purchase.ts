import { Entity } from "./common";
import { PaymentType } from "./payment-type";
import { PurchaseItemProps } from "./purchase-item";

export type PurchaseProps = {
  id: string;
  userId?: string;
  items: PurchaseItemProps[];
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
        .map((item) => item.price)
        .reduce((a, b) => {
          return (
            a + b - b * (props.paymentType === PaymentType.CASH ? 0.05 : 0)
          );
        }, 0),
    });
  }
}
