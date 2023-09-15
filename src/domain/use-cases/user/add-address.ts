import { UseCase } from "@domain/common";
import { Address } from "@domain/entities";

export namespace AddAddress {
  export type Params = {
    id: string;
    address: Address;
  };
  export type Result = {
    email: string;
    cryptedAddressId: string;
  };
}

export interface AddAddress
  extends UseCase<AddAddress.Params, AddAddress.Result> {
  execute(params: AddAddress.Params): Promise<AddAddress.Result>;
}
