import { UseCase } from "@domain/common";

export namespace RemoveProductFromCart {
  export type Params = {
    userId: string;
    productId: string;
  };
  export type Result = {
    status: boolean;
    updatedValue: number;
  };
}

export interface RemoveProductFromCart
  extends UseCase<RemoveProductFromCart.Params, RemoveProductFromCart.Result> {
  execute(
    params: RemoveProductFromCart.Params
  ): Promise<RemoveProductFromCart.Result>;
}
