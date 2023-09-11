import { DeletePurchaseUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase } from "@test-domain/mocks";
import { beforeAll, describe, expect, it } from "vitest";

const repository = new MockPurchaseRepository();
const sut = new DeletePurchaseUseCase(repository);

describe("Delete Purchase Use Case", () => {
  beforeAll(async () => {
    for (let index = 0; index < 5; index++) {
      await repository.create(mockCompletePurchase({}));
    }

    await repository.create(mockCompletePurchase({ id: "any_id" }));
  });
  it("should throw if id not found", async () => {
    expect(async () => {
      await sut.execute({
        id: "invalid_id",
      });
    }).rejects.toThrow("DeletePurchaseUseCase: Purchase not found");
  });

  it("should delete purchase from repository", async () => {
    const deleted = await sut.execute({ id: "any_id" });

    expect(deleted).toBeTruthy();
  });
});
