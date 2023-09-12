import { UseCase } from "@domain/common";
import { Product } from "@domain/entities";

export namespace ShowShoppingCart {
  export type Params = {
    userId: string;
  };

  export type Result = {
    userId: string;
    cart: Product[];
  };
}

export interface ShowShoppingCart
  extends UseCase<ShowShoppingCart.Params, ShowShoppingCart.Result> {
  execute(params: ShowShoppingCart.Params): Promise<ShowShoppingCart.Result>;
}
