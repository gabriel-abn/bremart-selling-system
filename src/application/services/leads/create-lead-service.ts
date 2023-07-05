import { Service } from "@application/common";
import { IVoucherInterface } from "@application/protocols/apis";
import { ILeadRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { Lead, LeadStatus } from "@domain/lead";
import { PurchaseProps } from "@domain/purchase";

export namespace CreateLead {
  export type Params = {
    purchase: PurchaseProps;
  };

  export type Result = {
    id: string;
  };
}

export class CreateLeadService
  implements Service<CreateLead.Params, CreateLead.Result>
{
  constructor(
    private leadRepository: ILeadRepository,
    private voucherValidator: IVoucherInterface,
    private idGenerator: IUUIDGenerator
  ) {}

  async execute(data: CreateLead.Params): Promise<CreateLead.Result> {
    if (data.purchase.voucher) {
      var voucher = await this.voucherValidator.validateVoucher(
        data.purchase.voucher
      );
    }

    const lead = Lead.create({
      id: this.idGenerator.generate(),
      paymentId: null,
      userId: data.purchase.userId,
      status: LeadStatus.PENDING,
      purchaseId: data.purchase.id,
      discountAmount: voucher.valid ? voucher.discountAmount : 0,
      discountCoupon: voucher.valid ? data.purchase.voucher : null,
    });

    const result = await this.leadRepository.create(lead);

    return result;
  }
}
