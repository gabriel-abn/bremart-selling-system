import { DomainError } from "@domain/common";

export class Freight {
  private value: number;
  private discountPercentage: number;
  private discountValue: number;
  private totalValue: number = 0;

  constructor(value: number, discountPercentage: number, discountValue: number) {
    if (value < 0) {
      throw new DomainError("Freight value must be greater or equal to 0");
    }

    if (discountPercentage < 0 || discountPercentage > 1) {
      throw new DomainError("Discount percentage must be between 0 and 1");
    }

    if (discountValue < 0) {
      throw new DomainError("Discount value must be greater or equal to 0");
    }

    if (discountValue > value) {
      throw new DomainError("Discount value must be less than freight value");
    }

    this.value = value;
    this.discountPercentage = discountPercentage;
    this.discountValue = discountValue;

    this.totalValue = this.value - this.discountValue - this.value * this.discountPercentage;

    if (this.totalValue < 0 || this.totalValue > this.value) {
      throw new DomainError("Invalid freight total value.");
    }
  }

  public get total(): number {
    return this.totalValue;
  }
}
