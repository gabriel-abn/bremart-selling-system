import { Entity } from "./common";

export enum LeadStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export type LeadProps = {
  id: string;
  purchaseId: string;
  userId: string;
  paymentId: string;
  discountCoupon: string;
  discountAmount: number;
  status: LeadStatus;
};

export class Lead extends Entity<LeadProps> {
  private constructor(props: LeadProps) {
    super(props, props.id);
  }

  public static create(props: LeadProps): Lead {
    return new Lead(props);
  }
}
