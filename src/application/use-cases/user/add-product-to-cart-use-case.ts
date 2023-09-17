import { ApplicationError } from "@application/common";
import { IProductRepository, IUserRepository } from "@application/repositories";
import { AddProductToCart } from "@domain/use-cases/user";

export class AddProductToCartUseCase implements AddProductToCart {
  constructor(
    private productRepository: IProductRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(params: AddProductToCart.Params): Promise<AddProductToCart.Result> {
    const user = await this.userRepository.get(params.userId);

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    const product = await this.productRepository.get(params.productId);

    if (!product) {
      throw new ApplicationError("Product not found.", "PRODUCT_NOT_FOUND");
    }

    if (product.quantity == 0) {
      throw new ApplicationError("Product is unavailable.", "PRODUCT_UNAVAILABLE");
    }

    user.addProductToShoppingCart(product);

    return {
      totalValue: user.props.shoppingCart.total,
      productIndex: user.props.shoppingCart.items.length,
    };
  }
}
