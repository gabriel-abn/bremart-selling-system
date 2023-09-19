import { UseCase } from "@application/common";
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

export interface GetPurchase extends UseCase<GetPurchase.Params, GetPurchase.Result> {
  execute(data: GetPurchase.Params): Promise<GetPurchase.Result>;
}
