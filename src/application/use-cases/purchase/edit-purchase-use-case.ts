import { ApplicationError, UseCase } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { PaymentType } from "@domain/payment-type";
import { Purchase } from "@domain/purchase";
import { PurchaseItemProps } from "@domain/purchase-item";

export namespace EditPurchase {
  export type Params = {
    id: string;
    items: PurchaseItemProps[];
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
  constructor(private purchaseRepository: IPurchaseRepository) {}

  async execute(data: EditPurchase.Params): Promise<EditPurchase.Result> {
    const find = await this.purchaseRepository.findById(data.id);

    if (!find) {
      throw new ApplicationError("Purchase not found", this.constructor.name);
    }

    if (data.items.length == 0) {
      throw new ApplicationError("No items provided", this.constructor.name);
    }

    const purchase = Purchase.create({ ...data });

    const edit = await this.purchaseRepository.edit(purchase);

    return {
      id: edit.id,
      total: edit.total,
      userId: edit.userId,
    };
  }
}
