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
  purchaseValue?: number;
  freightValue: number;
  freightDiscountPercentage: number;
  freightDiscountValue: number;
};

export class Purchase extends Entity<PurchaseProps> {
  private constructor(props: PurchaseProps) {
    super(props, props.id);
  }

  public getShoppingCart(): Product[] {
    return this.props.items;
  }

  public getPurchaseValue(): number {
    return this.props.purchaseValue;
  }

  public getFreightValue(): number {
    return this.props.freightValue;
  }

  public static create(props: PurchaseProps): Purchase {
    var errors: string[] = [];

    if (!props.userId) {
      errors.push("User id must be provided");
    }

    if (props.items.length <= 0) {
      errors.push("Purchase must have at least one item");
    }

    props.purchaseValue = props.items
      .map((item) => item.price)
      .reduce((a, b) => {
        return a + b;
      }, 0);

    if (props.purchaseValue <= 0) {
      errors.push("Total value must be greater than 0");
    }

    if (props.discountPercentage > 1 || props.discountPercentage < 0) {
      errors.push("Discount percentage must be between 0 and 1");
    }

    if (props.discountValue > props.purchaseValue) {
      errors.push("Discount value must be less than total value");
    }

    props.purchaseValue =
      props.purchaseValue * (1 - props.discountPercentage) -
      props.discountValue;

    if (props.paymentType === PaymentType.PIX && props.purchaseValue >= 300) {
      props.purchaseValue -= props.purchaseValue * 0.1;
    }

    if (props.freightValue < 0) {
      errors.push("Freight value must be greater or equal to 0");
    }

    if (
      props.freightDiscountPercentage > 1 ||
      props.freightDiscountPercentage < 0
    ) {
      errors.push("Freight discount percentage must be between 0 and 1");
    }

    if (props.freightDiscountValue > props.freightValue) {
      errors.push("Freight discount value must be less than freight value");
    }

    props.freightValue =
      props.freightValue * (1 - props.freightDiscountPercentage) -
      props.freightDiscountValue;

    if (errors.length > 0) throw new DomainError(errors);

    return new Purchase(props);
  }
}
