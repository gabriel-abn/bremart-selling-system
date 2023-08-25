import { DomainError, Entity } from "./common";

export type PaymentProps = {
  id: string;
  purchaseId: string;
  paymentType: PaymentType;
  status?: PaymentStatus;
  value: number;
};

export enum PaymentType {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  BOLETO = "BOLETO",
  PIX = "PIX",
}

export enum PaymentStatus {
  NOT_PAID = "NOT_PAID",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  CONFIRMED = "CONFIRMED",
}

export class Payment extends Entity<PaymentProps> {
  private constructor(props: PaymentProps) {
    super(props, props.id);
  }

  public updateStatus(status: PaymentStatus): void {
    if (this.props.status === PaymentStatus.PENDING) {
      this.props.status = status;
      return;
    }

    throw new DomainError(["Payment status can't be updated"]);
  }

  public get status(): PaymentStatus {
    return this.props.status;
  }

  public static create(props: PaymentProps): Payment {
    return new Payment({
      ...props,
      status: PaymentStatus.PENDING,
    });
  }
}
