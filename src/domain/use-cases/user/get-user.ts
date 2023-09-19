import { UseCase } from "@domain/common";
import { UserProps } from "@domain/entities";

export namespace GetUser {
  export type Params = Partial<{
    id: string;
    cpf: string;
  }>;

  export type Result = Omit<UserProps, "id" | "cpf" | "password">;
}

export interface GetUser extends UseCase<GetUser.Params, GetUser.Result> {
  execute: (params: GetUser.Params) => Promise<GetUser.Result>;
}
