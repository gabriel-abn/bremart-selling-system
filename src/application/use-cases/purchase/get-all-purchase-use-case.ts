import { UseCase } from "@application/common";
import { IPurchaseRepository } from "@application/repositories";
import { PurchaseProps } from "@domain/purchase";

export class GetAllPurchaseUseCase implements UseCase<null, PurchaseProps[]> {
  constructor(private readonly purchaseRepository: IPurchaseRepository) {}

  async execute(): Promise<PurchaseProps[]> {
    return await this.purchaseRepository.getAll();
  }
}
