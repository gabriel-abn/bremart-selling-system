import { DomainError, Entity } from "../common";
import { Address } from "./address";
import { Freight } from "./freight";
import { PaymentType } from "./payment";
import { Product } from "./product";

export enum PurchaseStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PENDING_DELIVERY = "PENDING_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export type DeliveryStatus = {
  purchaseId: string;
  trackingId: string;
  description: string;
  location: string;
};

export type PurchaseProps = {
  id: string;
  userId?: string;
  items: Product[];
  address: Address;
  paymentType: PaymentType;
  discountPercentage: number;
  discountValue: number;
  purchaseValue: number;
  freight: Freight;
  status?: PurchaseStatus;
  deliveryStatus?: DeliveryStatus;
  totalValue?: number;
};

export class Purchase extends Entity<PurchaseProps> {
  private constructor(props: PurchaseProps) {
    super(props, props.id);
  }

  public set status(status: PurchaseStatus) {
    this._props.status = status;
  }

  public get freight(): Freight {
    return this._props.freight;
  }

  public set deliveryStatus(deliveryStatus: DeliveryStatus) {
    this._props.deliveryStatus = deliveryStatus;
  }

  public updateDeliveryAddress(address: Address): void {
    for (const field in address) {
      if (address[field] === null || address[field] === "") {
        throw new DomainError(`Address ${field} must be provided`);
      }
    }

    this._props.address = address;
  }

  public static restore(props: PurchaseProps): Purchase {
    return new Purchase(props);
  }

  public static create(props: Omit<PurchaseProps, "status" | "totalValue">): Purchase {
    const errors: string[] = [];
    let total: number = 0;

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

    props.purchaseValue = props.purchaseValue * (1 - props.discountPercentage) - props.discountValue;

    total = props.purchaseValue + props.freight.total;

    if (props.paymentType === PaymentType.PIX && props.purchaseValue >= 300) {
      props.purchaseValue -= props.purchaseValue * 0.1;
    }

    if (props.address === null) {
      errors.push("Address must be provided");
    }

    for (const field in props.address) {
      if (props.address[field] === null || props.address[field] === "") {
        errors.push(`Address ${field} must be provided`);
      }
    }

    if (errors.length > 0) throw new DomainError(...errors);

    return new Purchase({
      ...props,
      status: PurchaseStatus.PENDING_PAYMENT,
      deliveryStatus: null,
      totalValue: total,
    });
  }
}
