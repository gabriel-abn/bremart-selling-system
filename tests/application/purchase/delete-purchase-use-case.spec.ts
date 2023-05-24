import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase } from "@test-domain/mocks";

const repository = new MockPurchaseRepository();
const sut = new DeletePurchaseUseCase(repository);

describe("Delete Purchase Use Case", () => {
  beforeAll(async () => {
    for (let index = 0; index < 5; index++) {
      await repository.create(mockCompletePurchase());
    }

    await repository.create(mockCompletePurchase({ id: "any_id" }));
  });
  it("should throw if id not found", async () => {
    expect(async () => {
      await sut.execute({
        id: "any_id",
      });
    }).rejects.toThrow("DeletePurchaseUseCase: Purchase not found");
  });

  it("should delete purchase from repository", async () => {
    await sut.execute({
      id: "any_id",
    });

    const purchase = await repository.findById("any_id");

    expect(purchase).toBeUndefined();
  });
});
