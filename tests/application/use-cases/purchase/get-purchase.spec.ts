import { GetPurchaseUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/* 
- DOING (Purchase) get-purchase
*/

const makeSut = () => {
  const repository = new MockPurchaseRepository();

  repository.items.push(mockCompletePurchase({ id: "any_id" }));

  const sut = new GetPurchaseUseCase(repository);

  return { sut, repository };
};

describe("Use Case: Get Purchase", () => {
  it("should throw if purchase does not exists", async () => {
    const { sut } = makeSut();

    await expect(() => sut.execute({ id: "invalid_id" })).rejects.toThrow("NO_PURCHASE_FOUND");
  });

  it("should return purchase by id", async () => {
    const { sut } = makeSut();
    const purchase = await sut.execute({ id: "any_id" });

    expect(purchase).toBeTruthy();
  });
});
