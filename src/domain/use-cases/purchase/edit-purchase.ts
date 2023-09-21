import { UseCase } from "@domain/common";
import { PaymentType } from "@domain/entities";

export namespace EditPurchase {
  export type Params = {
    id: string;
    user: {
      id: string;
      address?: string;
    };
    products: string[];
    paymentType: PaymentType;
  };

  export type Result = boolean;
}

export interface EditPurchase extends UseCase<EditPurchase.Params, EditPurchase.Result> {
  execute(params: EditPurchase.Params): Promise<EditPurchase.Result>;
}
