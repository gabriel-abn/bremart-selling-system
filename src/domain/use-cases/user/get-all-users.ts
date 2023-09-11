import { UseCase } from "@domain/common";
import { UserProps } from "@domain/entities";

export namespace GetAllUsers {
  export type Result = UserProps[];
}

export interface GetAllUsers extends UseCase<void, GetAllUsers.Result> {
  execute(): Promise<GetAllUsers.Result>;
}
