import { UseCase } from "@domain/common";

export namespace VerifyPhone {
  export type Params = {
    phone: string;
    code: string;
  };

  export type Result = {
    email: string;
    confirmation: boolean;
  };
}

export interface VerifyPhone
  extends UseCase<VerifyPhone.Params, VerifyPhone.Result> {
  execute: (params: VerifyPhone.Params) => Promise<VerifyPhone.Result>;
}
