import { UseCase } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { UserProps } from "@domain/user";

export namespace GetAllUsers {
  export type Result = UserProps[];
}

export class GetAllUsersUseCase implements UseCase<void, GetAllUsers.Result> {
  constructor(private readonly repository: IUserRepository) {}

  async execute(): Promise<GetAllUsers.Result> {
    return await this.repository.getAll();
  }
}
