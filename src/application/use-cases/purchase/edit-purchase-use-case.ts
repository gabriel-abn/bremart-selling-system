import { ApplicationError, UseCase } from "@application/common";
import {
  IProductRepository,
  IPurchaseRepository,
} from "@application/repositories";
import { PaymentType, Product } from "@domain/entities";

export namespace EditPurchase {
  export type Params = {
    id: string;
    items: Product[];
    paymentType: PaymentType;
  };
  export type Result = {
    id: string;
    total: number;
    userId: string;
  };
}

export class EditPurchaseUseCase
  implements UseCase<EditPurchase.Params, EditPurchase.Result>
{
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private purchaseItemRepository: IProductRepository
  ) {}

  async execute(data: EditPurchase.Params): Promise<EditPurchase.Result> {
    const find = await this.purchaseRepository.findById(data.id);

    if (!find) {
      throw new ApplicationError("Purchase not found", this.constructor.name);
    }

    if (data.items.length == 0) {
      throw new ApplicationError("No items provided", this.constructor.name);
    }

    const itemsID = data.items.map((p) => p.id);

    const purchaseItems = await this.purchaseItemRepository.findManybyID(
      itemsID
    );

    if (purchaseItems.length == 0) {
      throw new ApplicationError(
        "Invalid items IDs provided",
        this.constructor.name
      );
    }

    return {
      id: "",
      total: 3,
      userId: "",
    };
  }
}
