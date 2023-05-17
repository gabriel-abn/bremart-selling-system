import { ApplicationError, UseCase } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { Purchase } from "@domain/purchase";
import { PurchaseItem } from "@domain/purchase-item";

export namespace CreatePurchase {
  export type Params = {
    userId?: string;
    items: PurchaseItem[];
  };
  export type Result = {
    id: string;
    total: number;
  };
}

export class CreatePurchaseUseCase
  implements UseCase<CreatePurchase.Params, CreatePurchase.Result>
{
  constructor(
    private idGenerator: IUUIDGenerator,
    private purchaseRepository: IPurchaseRepository
  ) {}

  async execute(data: CreatePurchase.Params): Promise<CreatePurchase.Result> {
    const { userId, items } = data;

    if (items.length === 0) {
      throw new ApplicationError(
        "Purchase has no items",
        this.constructor.name
      );
    }

    const purchase = Purchase.create({
      id: this.idGenerator.generate(),
      items,
      userId,
    });

    const save = await this.purchaseRepository.create({
      ...purchase.props,
    });

    return {
      id: save.id,
      total: purchase.props.total,
    };
  }
}
