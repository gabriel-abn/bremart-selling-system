import { ApplicationError, UseCase } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { Product } from "@domain/entities";

export namespace GetPurchase {
  export type Params = {
    id: string;
  };
  export type Result = {
    id: string;
    items: Product[];
    total: number;
  };
}

export class GetPurchaseUseCase
  implements UseCase<GetPurchase.Params, GetPurchase.Result>
{
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute(data: GetPurchase.Params): Promise<GetPurchase.Result> {
    const purchase = await this.purchaseRepository.findById(data.id);

    if (!purchase) {
      throw new ApplicationError("Purchase not found", this.constructor.name);
    }

    return {
      id: purchase.id,
      items: purchase.items,
      total: 0,
    };
  }
}
