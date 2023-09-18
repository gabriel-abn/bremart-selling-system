import { DomainError } from "@domain/common";

export class PurchaseValue {
  private initialValue: number;
  private discountPercentage: number;
  private discountValue: number;
  private totalValue: number;

  constructor(initialValue: number, discountPercentage: number, discountValue: number) {
    this.initialValue = initialValue;
    if (discountPercentage < 0 || discountPercentage > 1) {
      throw new DomainError("Invalid discount percentage.");
    }

    if (discountValue > initialValue || discountValue < 0) {
      throw new DomainError("Invalid discount value.");
    }

    this.discountPercentage = discountPercentage;
    this.discountValue = discountValue;

    this.totalValue = this.initialValue - this.discountValue - this.initialValue * this.discountPercentage;
  }

  public get total(): number {
    return this.totalValue;
  }
}
