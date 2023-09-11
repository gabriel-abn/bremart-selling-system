import { IUserRepository } from "@application/repositories";
import { GetAllUsers } from "@domain/use-cases/user";

export class GetAllUsersUseCase implements GetAllUsers {
  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<GetAllUsers.Result> {
    return await this.repository.getAll();
  }
}
