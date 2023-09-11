import { ApplicationError } from "@application/common";
import {
  IPurchaseRepository,
  IUserRepository,
} from "@application/repositories";
import { PurchaseProps } from "@domain/entities";

export namespace GetAllPurchasePerUser {
  export type Params = {
    userId: string;
  };

  export type Result = PurchaseProps[];
}

export class GetAllPurchasePerUserUseCase {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute({
    userId,
  }: GetAllPurchasePerUser.Params): Promise<GetAllPurchasePerUser.Result> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new ApplicationError("User not found", this.constructor.name);
    }

    const purchases = await this.purchaseRepository.getAllByUserId(userId);

    return purchases;
  }
}
