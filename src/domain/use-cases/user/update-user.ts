import { UseCase } from "@domain/common";
import { User } from "@domain/entities";

export namespace UpdateUser {
  export type Params = {
    user: User;
  };

  export type Result = {
    user: User;
    success: boolean;
  };
}

export interface UpdateUser
  extends UseCase<UpdateUser.Params, UpdateUser.Result> {
  execute(params: UpdateUser.Params): Promise<UpdateUser.Result>;
}
