import { UseCase } from "@domain/common";

export namespace ChangePassword {
  export type Params = {
    email: string;
    token?: string;
    newPassword?: string;
  };
  export type Result = {
    success: boolean;
    resetToken?: string;
  };
}

export interface ChangePassword
  extends UseCase<ChangePassword.Params, ChangePassword.Result> {
  execute: (params: ChangePassword.Params) => Promise<ChangePassword.Result>;
}
