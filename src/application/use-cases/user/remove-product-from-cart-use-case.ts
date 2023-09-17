import { ApplicationError } from "@application/common";
import { IProductRepository, IUserRepository } from "@application/repositories";
import { RemoveProductFromCart } from "@domain/use-cases/user";

export class RemoveProductFromCartUseCase implements RemoveProductFromCart {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(params: RemoveProductFromCart.Params): Promise<RemoveProductFromCart.Result> {
    const user = await this.userRepository.get(params.userId).then((user) => {
      if (!user) throw new ApplicationError("User not found.", "USER_NOT_FOUND");
      return user;
    });

    const product = await this.productRepository.get(params.productId).then((product) => {
      if (!product) throw new ApplicationError("Product not found.", "PRODUCT_NOT_FOUND");
      return product;
    });

    user.removeProductFromShoppingCart(product.id);

    return {
      status: true,
      updatedValue: user.props.shoppingCart.total,
    };
  }
}
