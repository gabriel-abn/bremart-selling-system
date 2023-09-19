import { UseCase } from "@domain/common";

export namespace DeletePurchase {
  export type Params = {
    id: string;
  };
  export type Result = boolean;
}

export interface DeletePurchase extends UseCase<DeletePurchase.Params, DeletePurchase.Result> {
  execute(data: DeletePurchase.Params): Promise<DeletePurchase.Result>;
}
