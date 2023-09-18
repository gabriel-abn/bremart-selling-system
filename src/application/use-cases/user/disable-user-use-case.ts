import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { DisableUser } from "@domain/use-cases/user";

export class DisableUserUseCase implements DisableUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: DisableUser.Params): Promise<DisableUser.Result> {
    const user = await this.userRepository.get(params.userId);

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    user.status = "DISABLED";

    await this.userRepository.update(user);

    return {
      email: user.props.email,
      success: true,
    };
  }
}
