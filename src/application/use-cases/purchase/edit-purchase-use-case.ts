import { ApplicationError } from "@application/common";
import { IProductRepository, IPurchaseRepository, IUserRepository } from "@application/repositories";
import { Purchase } from "@domain/entities";
import { EditPurchase } from "@domain/use-cases/purchase/edit-purchase";

export class EditPurchaseUseCase implements EditPurchase {
  constructor(
    private purchaseRepository: IPurchaseRepository,
    private productRepository: IProductRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: EditPurchase.Params): Promise<EditPurchase.Result> {
    const purchase = await this.purchaseRepository.get(data.id);

    if (!purchase) {
      throw new ApplicationError("Purchase not found", "PURCHASE_NOT_FOUND");
    }

    if (purchase.props.userId !== data.user.id) {
      throw new ApplicationError("Purchase does not match with user.", "INVALID_USER_PURCHASE");
    }

    const user = await this.userRepository.get(data.user.id);

    if (!data.products.length) {
      throw new ApplicationError("No products provided", "NO_PRODUCTS_PROVIDED");
    }

    const products = await this.productRepository.getMany(data.products);

    if (products.length == 0) {
      throw new ApplicationError("Invalid products provided", "NO_VALID_PRODUCTS_FOUND");
    }

    data.products.forEach((productId) => {
      if (!products.find((product) => product.id === productId)) {
        throw new ApplicationError("Invalid product id provided", "INVALID_PRODUCT_ID_" + productId);
      }
    });

    if (data.user.address) {
      purchase.updateDeliveryAddress(user.getAddress(data.user.address));
    }

    const edit: Purchase = undefined;

    await this.purchaseRepository.edit(edit).then((saved) => {
      if (!saved) throw new ApplicationError("Purchase not saved", "PURCHASE_NOT_SAVED");
    });

    return true;
  }
}
