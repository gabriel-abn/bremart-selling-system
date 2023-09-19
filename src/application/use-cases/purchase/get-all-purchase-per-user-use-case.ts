import { ApplicationError } from "@application/common";
import { IPurchaseRepository, IUserRepository } from "@application/repositories";
import { GetAllPurchasePerUser } from "@domain/use-cases/purchase";

export class GetAllPurchasePerUserUseCase implements GetAllPurchasePerUser {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(params: GetAllPurchasePerUser.Params): Promise<GetAllPurchasePerUser.Result> {
    const user = await this.userRepository.get(params.userId);

    if (!user) {
      throw new ApplicationError("User not found", "USER_NOT_FOUND");
    }

    const purchases = await this.purchaseRepository.getAllByUserId(params.userId);

    return purchases.map((purchase) => purchase.props);
  }
}
