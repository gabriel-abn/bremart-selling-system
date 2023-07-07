import { ApplicationError, UseCase } from "@application/common";
import {
  IPurchaseItemRepository,
  IPurchaseRepository,
  IUserRepository,
} from "@application/repositories";
import { CreateLeadService } from "@application/services/leads";
import { IUUIDGenerator } from "@domain/common";
import { PaymentType } from "@domain/payment-type";
import { Purchase } from "@domain/purchase";
import { PurchaseItemProps } from "@domain/purchase-item";

export namespace CreatePurchase {
  export type Params = {
    userId: string;
    items: PurchaseItemProps[];
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

export class CreatePurchaseUseCase
  implements UseCase<CreatePurchase.Params, CreatePurchase.Result>
{
  constructor(
    private idGenerator: IUUIDGenerator,
    private purchaseRepository: IPurchaseRepository,
    private userRepository: IUserRepository,
    private purchaseItemRepository: IPurchaseItemRepository,
    private createLeadService: CreateLeadService
  ) {}

  async execute(data: CreatePurchase.Params): Promise<CreatePurchase.Result> {
    if (data.items.length === 0) {
      throw new ApplicationError(
        "Purchase has no items",
        this.constructor.name
      );
    }

    const itensID = data.items.map((item) => item.id);

    const purchaseItens = await this.purchaseItemRepository.findManybyID(
      itensID
    );

    if (purchaseItens.length === 0) {
      throw new ApplicationError(
        "Purchase has invalid items",
        this.constructor.name
      );
    }

    const user = await this.userRepository.getById(data.userId);

    const purchase = Purchase.create({
      id: this.idGenerator.generate(),
      items: data.items,
      userId: user.id,
      paymentType: data.paymentType,
      voucher: data.voucher,
    });

    const lead = await this.createLeadService.execute({
      purchase: purchase.props,
    });

    const save = await this.purchaseRepository.create(purchase);

    return {
      id: save.id,
      total: purchase.props.total,
      userId: purchase.props.userId,
      leadId: lead.id,
    };
  }
}
