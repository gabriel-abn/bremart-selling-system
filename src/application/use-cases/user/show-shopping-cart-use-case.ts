import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { ShowShoppingCart } from "@domain/use-cases/user";

export class ShowShoppingCartUseCase implements ShowShoppingCart {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: ShowShoppingCart.Params): Promise<ShowShoppingCart.Result> {
    const user = await this.userRepository.get(userId);

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    return { userId: user.id, cart: user.props.shoppingCart.items };
  }
}
