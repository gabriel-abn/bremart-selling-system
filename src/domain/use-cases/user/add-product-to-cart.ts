import { UseCase } from "@domain/common";

export namespace AddProductToCart {
  export type Params = {
    userId: string;
    productId: string;
  };

  export type Result = {
    productIndex: number;
    totalValue: number;
  };
}

export interface AddProductToCart extends UseCase<AddProductToCart.Params, AddProductToCart.Result> {
  execute: (params: AddProductToCart.Params) => Promise<AddProductToCart.Result>;
}
