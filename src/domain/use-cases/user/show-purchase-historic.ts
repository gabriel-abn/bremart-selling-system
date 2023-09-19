import { UseCase } from "@domain/common";
import { PurchaseProps } from "@domain/entities";

export namespace ShowPurchaseHistoric {
  export type Params = {
    userId: string;
  };

  export type Result = PurchaseProps[];
}

export interface ShowPurchaseHistoric extends UseCase<ShowPurchaseHistoric.Params, ShowPurchaseHistoric.Result> {
  execute(params: ShowPurchaseHistoric.Params): Promise<ShowPurchaseHistoric.Result>;
}
