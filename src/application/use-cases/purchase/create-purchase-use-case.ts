import { ApplicationError, UseCase } from "@application/common";
import {
  IPurchaseRepository,
  IUserRepository,
} from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { PaymentType } from "@domain/payment-type";
import { Purchase } from "@domain/purchase";
import { PurchaseItem } from "@domain/purchase-item";

export namespace CreatePurchase {
  export type Params = {
    userId: string;
    items: PurchaseItem[];
    paymentType: PaymentType;
  };
  export type Result = {
    id: string;
    total: number;
    userId: string;
  };
}

export class CreatePurchaseUseCase
  implements UseCase<CreatePurchase.Params, CreatePurchase.Result>
{
  constructor(
    private idGenerator: IUUIDGenerator,
    private purchaseRepository: IPurchaseRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: CreatePurchase.Params): Promise<CreatePurchase.Result> {
    if (data.items.length === 0) {
      throw new ApplicationError(
        "Purchase has no items",
        this.constructor.name
      );
    }

    if (!(await this.userRepository.getById(data.userId))) {
      throw new ApplicationError("User not found", this.constructor.name);
    }

    const purchase = Purchase.create({
      id: this.idGenerator.generate(),
      items: data.items,
      userId: data.userId,
      paymentType: data.paymentType,
    });

    const save = await this.purchaseRepository.create({
      ...purchase.props,
    });

    return {
      id: save.id,
      total: purchase.props.total,
      userId: purchase.props.userId,
    };
  }
}
