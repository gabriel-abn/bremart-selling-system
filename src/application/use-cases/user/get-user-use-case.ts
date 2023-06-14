import { UseCase } from "@application/common";
import { IDataValidation } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { UserProps } from "@domain/user";

export namespace GetUser {
  export type Params = Partial<{
    id: string;
    cpf: string;
  }>;

  export type Result = {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
  };
}

export class GetUserUseCase implements UseCase<GetUser.Params, GetUser.Result> {
  constructor(
    private repository: IUserRepository,
    private dataValidator: IDataValidation
  ) {}

  async execute(params: GetUser.Params): Promise<GetUser.Result> {
    var validCPF: string;
    var exist: UserProps;

    if (params.id) {
      exist = await this.repository.getById(params.id);
    }
    if (params.cpf) {
      validCPF = await this.dataValidator.validateCPF(params.cpf);

      exist = await this.repository.getByCPF(validCPF);
    }

    return {
      name: exist.name,
      email: exist.email,
      birthdate: exist.birthdate.toUTCString(),
      phone: exist.phone,
    };
  }
}
