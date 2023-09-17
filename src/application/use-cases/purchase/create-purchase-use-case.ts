import { ApplicationError, UseCase } from "@application/common";
import { IProductRepository, IPurchaseRepository, IUserRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { PaymentType, Product } from "@domain/entities";

export namespace CreatePurchase {
  export type Params = {
    userId: string;
    items: Product[];
    paymentType: PaymentType;
    voucher: string;
  };
  export type Result = {
    id: string;
    total: number;
    userId: string;
    leadId: string;
  };
}

export class CreatePurchaseUseCase implements UseCase<CreatePurchase.Params, CreatePurchase.Result> {
  constructor(
    private idGenerator: IUUIDGenerator,
    private purchaseRepository: IPurchaseRepository,
    private userRepository: IUserRepository,
    private purchaseItemRepository: IProductRepository,
  ) {}

  async execute(data: CreatePurchase.Params): Promise<CreatePurchase.Result> {
    if (data.items.length === 0) {
      throw new ApplicationError("Purchase has no items", this.constructor.name);
    }

    const itensID = data.items.map((item) => item.id);

    const purchaseItens = await this.purchaseItemRepository.getMany(itensID);

    if (purchaseItens.length === 0) {
      throw new ApplicationError("Purchase has invalid items", this.constructor.name);
    }

    return {
      id: "",
      leadId: "",
      total: 0,
      userId: "",
    };
  }
}
