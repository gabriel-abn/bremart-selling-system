import { UseCase } from "@domain/common";
import { PaymentType } from "@domain/entities";

export namespace CreatePurchase {
  export type Params = {
    user: {
      id: string;
      address?: string;
    };
    products: string[];
    paymentType: PaymentType;
  };
  export type Result = {
    cryptedPurchaseId: string;
    total: number;
  };
}

export interface CreatePurchase extends UseCase<CreatePurchase.Params, CreatePurchase.Result> {
  execute(params: CreatePurchase.Params): Promise<CreatePurchase.Result>;
}
