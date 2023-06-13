import { UseCase } from "@application/common";
import { IDataValidation } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { User } from "@domain/user";

export namespace RegisterUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    rg: string;
    birthdate: Date;
    phone: string;
  };

  export type Result = {
    id: string;
  };
}

export class RegisterUserUseCase
  implements UseCase<RegisterUser.Params, RegisterUser.Result>
{
  constructor(
    private userRepository: IUserRepository,
    private uuidGenerator: IUUIDGenerator,
    private dataValidator: IDataValidation
  ) {}

  async execute(params: RegisterUser.Params): Promise<RegisterUser.Result> {
    const validCPF = await this.dataValidator.validateCPF(params.cpf);

    const validRG = await this.dataValidator.validateRG(params.rg);

    const newID = this.uuidGenerator
      .generate()
      .replaceAll("-", "")
      .toUpperCase()
      .slice(0, 9);

    const user = User.create({
      id: newID,
      cpf: validCPF,
      rg: validRG,
      ...params,
    });

    const result = await this.userRepository.register(user);

    return {
      id: result.id,
    };
  }
}
