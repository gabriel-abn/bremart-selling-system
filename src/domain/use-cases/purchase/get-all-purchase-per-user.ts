import { UseCase } from "@application/common";
import { PurchaseProps } from "@domain/entities";

export namespace GetAllPurchasePerUser {
  export type Params = {
    userId: string;
  };

  export type Result = PurchaseProps[];
}

export interface GetAllPurchasePerUser extends UseCase<GetAllPurchasePerUser.Params, GetAllPurchasePerUser.Result> {
  execute: (params: GetAllPurchasePerUser.Params) => Promise<GetAllPurchasePerUser.Result>;
}
