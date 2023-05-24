import { ApplicationError, UseCase } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";

export namespace DeletePurchase {
  export type Params = {
    id: string;
  };
  export type Result = {
    deleted: boolean;
  };
}

export class DeletePurchaseUseCase
  implements UseCase<DeletePurchase.Params, DeletePurchase.Result>
{
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(data: DeletePurchase.Params): Promise<DeletePurchase.Result> {
    const purchase = await this.purchaseRepository.findById(data.id);

    if (!purchase) {
      throw new ApplicationError("Purchase not found", this.constructor.name);
    }

    return {
      deleted: await this.purchaseRepository.delete(data.id),
    };
  }
}
