import { DeletePurchaseUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockPurchase } from "@test-domain/mocks";
import { beforeAll, describe, expect, it } from "vitest";

const repository = new MockPurchaseRepository();
const sut = new DeletePurchaseUseCase(repository);

describe("Delete Purchase Use Case", () => {
  beforeAll(async () => {
    await repository.create(mockPurchase({ id: "any_id" }));
  });

  it("should throw if id not found", async () => {
    expect(async () => {
      await sut.execute({
        id: "invalid_id",
      });
    }).rejects.toThrow("PURCHASE_NOT_FOUND");
  });

  it.todo("should throw if purchase not deleted");

  it("should delete purchase", async () => {
    const deleted = await sut.execute({ id: "any_id" });

    expect(deleted).toBeTruthy();
  });
});
