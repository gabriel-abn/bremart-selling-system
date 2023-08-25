import { UseCase } from "@domain/common";

export namespace RegisterUser {
  export type Params = {
    name: string;
    cpf: string;
    email: string;
    birthDate: string;
    phone: string;
  };

  export type Result = {
    cryptedId: string;
    email: string;
    hashedPassword: string;
    createdAt: Date;
  };
}

export interface RegisterUser
  extends UseCase<RegisterUser.Params, RegisterUser.Result> {
  execute: (params: RegisterUser.Params) => Promise<RegisterUser.Result>;
}
