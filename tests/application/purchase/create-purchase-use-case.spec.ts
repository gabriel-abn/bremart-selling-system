import { ApplicationError } from "@application/common";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { UUIDGeneratorMock, mockInitialPurchase } from "@test-domain/mocks";

const sut = new CreatePurchaseUseCase(
  new UUIDGeneratorMock(),
  new MockPurchaseRepository()
);

describe("Create purchase use case", () => {
  it("should return a purchase", async () => {
    const purchase = await sut.execute({
      ...mockInitialPurchase(),
    });

    expect(purchase).toBeTruthy();
  });

  it("should return a purchase with a valid id and total price", async () => {
    const purchase = await sut.execute({
      ...mockInitialPurchase(),
    });

    expect(purchase.id).toBeTruthy();
    expect(purchase.total).toBeGreaterThan(0);
  });

  it("should throw if purchase has no items", async () => {
    expect(async () => {
      await sut.execute({
        ...mockInitialPurchase(),
        items: [],
      });
    }).rejects.toThrowError(ApplicationError);
  });
});
