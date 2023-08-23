import { Entity } from "./common";
import { DomainError } from "./common/domain-error";
import { PaymentType } from "./payment-type";
import { Product } from "./product";

export type PurchaseProps = {
  id: string;
  userId?: string;
  items: Product[];
  paymentType: PaymentType;
  discountPercentage: number;
  discountValue: number;
  total?: number;
};

export class Purchase extends Entity<PurchaseProps> {
  private constructor(props: PurchaseProps) {
    super(props, props.id);
  }

  public getShoppingCart(): Product[] {
    return this.props.items;
  }

  public getTotal(): number {
    return this.props.total;
  }

  public static create(props: PurchaseProps): Purchase {
    var errors: string[] = [];

    if (!props.userId) {
      errors.push("User id must be provided");
    }

    if (props.items.length <= 0) {
      errors.push("Purchase must have at least one item");
    }

    props.total = props.items
      .map((item) => item.price)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    if (props.total <= 0) {
      errors.push("Total value must be greater than 0");
    }

    if (props.discountPercentage > 1 || props.discountPercentage < 0) {
      errors.push("Discount percentage must be between 0 and 1");
    }

    if (props.discountValue > props.total) {
      errors.push("Discount value must be less than total value");
    }

    props.total =
      props.total * (1 - props.discountPercentage) - props.discountValue;

    if (props.paymentType === PaymentType.PIX && props.total >= 300) {
      props.total -= props.total * 0.1;
    }

    if (errors.length > 0) throw new DomainError(errors);

    return new Purchase(props);
  }
}
