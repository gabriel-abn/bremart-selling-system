import { UseCase } from "@domain/common";

export namespace DisableUser {
  export type Params = {
    userId: string;
  };

  export type Result = {
    email: string;
    success: boolean;
  };
}

export interface DisableUser
  extends UseCase<DisableUser.Params, DisableUser.Result> {
  execute(params: DisableUser.Params): Promise<DisableUser.Result>;
}
