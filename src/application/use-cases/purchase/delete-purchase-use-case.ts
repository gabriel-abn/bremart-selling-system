import { ApplicationError } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { DeletePurchase } from "@domain/use-cases/purchase";

export class DeletePurchaseUseCase implements DeletePurchase {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(data: DeletePurchase.Params): Promise<DeletePurchase.Result> {
    const purchase = await this.purchaseRepository.get(data.id);

    if (!purchase) {
      throw new ApplicationError("Purchase not found", "PURCHASE_NOT_FOUND");
    }

    const deleted = await this.purchaseRepository.delete(data.id);

    if (!deleted) {
      throw new ApplicationError("Purchase not deleted.", "PURCHASE_NOT_DELETED");
    }

    return true;
  }
}
