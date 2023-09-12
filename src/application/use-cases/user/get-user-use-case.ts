import { ApplicationError } from "@application/common";
import { IDataValidation } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { User } from "@domain/entities";
import { GetUser } from "@domain/use-cases/user";

export class GetUserUseCase implements GetUser {
  constructor(
    private repository: IUserRepository,
    private dataValidator: IDataValidation
  ) {}

  async execute(params: GetUser.Params): Promise<GetUser.Result> {
    var validCPF: string;
    var exist: User;

    if (params.id) {
      exist = await this.repository.getById(params.id);
    } else if (params.cpf) {
      validCPF = await this.dataValidator.validateCPF(params.cpf);
      exist = await this.repository.getByCPF(validCPF);
    } else {
      throw new ApplicationError("User not found", "USER_NOT_FOUND");
    }

    return exist;
  }
}
