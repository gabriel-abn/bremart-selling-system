import { UseCase } from "@domain/common";

export namespace UpdateUser {
  export type Params = {
    userId: string;
  };

  export type Result = boolean;
}

export interface UpdateUser extends UseCase<UpdateUser.Params, UpdateUser.Result> {
  execute(params: UpdateUser.Params): Promise<UpdateUser.Result>;
}
