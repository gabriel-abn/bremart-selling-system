import { ApplicationError } from "@application/common";
import { IDataValidation } from "@application/protocols/apis";
import { IUserRepository } from "@application/repositories";
import { GetUser } from "@domain/use-cases/user";

export class GetUserUseCase implements GetUser {
  constructor(
    private repository: IUserRepository,
    private dataValidator: IDataValidation,
  ) {}

  async execute(params: GetUser.Params): Promise<GetUser.Result> {
    if (!params.id && !params.cpf) {
      throw new ApplicationError("ID or CPF must be provided.", "NO_DATA_PROVIDED");
    }

    const user = await this.repository.get(params.id).then((user) => {
      if (!user) throw new ApplicationError("User not found.", "USER_NOT_FOUND");
      return user;
    });

    return user;
  }
}
