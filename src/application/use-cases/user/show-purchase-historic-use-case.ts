import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { ShowPurchaseHistoric } from "@domain/use-cases/user";

export class ShowPurchaseHistoricUseCase implements ShowPurchaseHistoric {
  constructor(private userRepository: IUserRepository) {}

  async execute(params: ShowPurchaseHistoric.Params): Promise<ShowPurchaseHistoric.Result> {
    const user = await this.userRepository.get(params.userId);

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    return user.props.purchaseHistoric;
  }
}
