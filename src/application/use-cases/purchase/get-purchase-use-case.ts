import { ApplicationError } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { GetPurchase } from "@domain/use-cases/purchase";

export class GetPurchaseUseCase implements GetPurchase {
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute(data: GetPurchase.Params): Promise<GetPurchase.Result> {
    const purchase = await this.purchaseRepository.get(data.id);

    if (!purchase) {
      throw new ApplicationError("Purchase not found", "NO_PURCHASE_FOUND");
    }

    return {
      id: purchase.id,
      items: purchase.props.items,
      total: 0,
    };
  }
}
