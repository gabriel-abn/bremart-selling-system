import { UseCase } from "@domain/common";

export namespace VerifyEmail {
  export type Params = {
    email: string;
    verificationToken: string;
  };

  export type Result = {
    email: string;
    authToken: string;
  };
}

export interface VerifyEmail
  extends UseCase<VerifyEmail.Params, VerifyEmail.Result> {
  execute: (params: VerifyEmail.Params) => Promise<VerifyEmail.Result>;
}
