import { Entity } from "./common";

export type PaymentProps = {
  purchaseId: string;
  paymentType: PaymentType;
  status: PaymentStatus;
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

export class Payment extends Entity<PaymentProps> {}
