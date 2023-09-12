import { UseCase } from "@domain/common";

export namespace RemoveUser {
  export type Params = {
    userId: string;
  };

  export type Result = {
    email: string;
  };
}

export interface RemoveUser
  extends UseCase<RemoveUser.Params, RemoveUser.Result> {
  execute(params: RemoveUser.Params): Promise<RemoveUser.Result>;
}
