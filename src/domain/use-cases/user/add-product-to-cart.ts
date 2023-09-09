import { UseCase } from "@domain/common";
import { Product } from "@domain/entities";

export namespace AddProductToCart {
  export type Params = {
    userId: string;
    product: Product;
  };

  export type Result = {
    productIndex: number;
    totalValue: number;
  };
}

export interface AddProductToCart
  extends UseCase<AddProductToCart.Params, AddProductToCart.Result> {
  execute: (
    params: AddProductToCart.Params
  ) => Promise<AddProductToCart.Result>;
}
