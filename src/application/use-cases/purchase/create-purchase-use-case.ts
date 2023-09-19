import { ApplicationError } from "@application/common";
import { ICrypter } from "@application/protocols";
import { IProductRepository, IPurchaseRepository, IUserRepository } from "@application/repositories";
import { IFreightService } from "@application/services/purchase";
import { IUUIDGenerator } from "@domain/common";
import { Address, Purchase } from "@domain/entities";
import { CreatePurchase } from "@domain/use-cases/purchase";
export class CreatePurchaseUseCase implements CreatePurchase {
  constructor(
    private idGenerator: IUUIDGenerator,
    private purchaseRepository: IPurchaseRepository,
    private userRepository: IUserRepository,
    private purchaseItemRepository: IProductRepository,
    private freightCalculator: IFreightService,
    private crypter: ICrypter,
  ) {}

  async execute(params: CreatePurchase.Params): Promise<CreatePurchase.Result> {
    const user = await this.userRepository.get(params.user.id);

    if (!user) {
      throw new ApplicationError("User not found", "USER_NOT_FOUND");
    }

    let address: Address;

    if (!params.user.address) {
      address = user.defaultAddress;
    } else {
      address = user.getAddress(params.user.address);
    }

    const purchaseItems = await this.purchaseItemRepository.getMany(params.products);

    if (purchaseItems.length === 0) {
      throw new ApplicationError("Invalid products.", "INVALID_PURCHASE_ITEMS");
    }

    params.products.forEach((productId) => {
      if (!purchaseItems.find((p) => p.id === productId)) {
        throw new ApplicationError(
          "Purchase has invalid items. Product ID: " + productId,
          "INVALID_PRODUCT_ID_" + productId,
        );
      }
    });

    const freight = await this.freightCalculator.calculate(address);

    const purchaseId = this.idGenerator.generate();

    const purchase = Purchase.create({
      id: purchaseId,
      userId: user.id,
      items: purchaseItems,
      address: address,
      paymentType: params.paymentType,
      freight: freight,
      discount: {
        value: 0,
        percentage: 0,
      },
    });

    const id = await this.purchaseRepository.create(purchase).then((r) => r.id);

    if (!id) {
      throw new ApplicationError("Error while saving purchase.", "PURCHASE_NOT_SAVED");
    }

    const cryptedPurchaseId = await this.crypter.encrypt(id);

    return {
      cryptedPurchaseId,
      total: purchase.value.total,
    };
  }
}
