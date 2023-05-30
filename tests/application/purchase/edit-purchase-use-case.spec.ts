import { EditPurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/payment-type";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase, mockPurchaseItem } from "@test-domain/mocks";

const repository = new MockPurchaseRepository();
const sut = new EditPurchaseUseCase(repository);

describe("Edit Purchase Use Case", () => {
  beforeAll(async () => {
    for (let index = 0; index < 5; index++) {
      await repository.create(mockCompletePurchase({}));
    }

    await repository.create(mockCompletePurchase({ id: "any_id" }));

    await repository.create(
      mockCompletePurchase({
        id: "discount_id",
        items: [mockPurchaseItem({ price: 600 })],
        paymentType: PaymentType.CASH,
      })
    );
  });
  it("should throw if invalid id is provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "invalid_id",
        items: [mockPurchaseItem({})],
        paymentType: PaymentType.CASH,
      });
    }).rejects.toThrow("EditPurchaseUseCase: Purchase not found");
  });
  it("should throw if no purchase items provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "any_id",
        items: [],
        paymentType: PaymentType.CASH,
      });
    }).rejects.toThrow("EditPurchaseUseCase: No items provided");
  });
  it("should return the edited purchase on success", async () => {
    const purchase = await sut.execute({
      id: "any_id",
      items: [mockPurchaseItem({ price: 100 })],
      paymentType: PaymentType.CREDIT_CARD,
    });

    expect(purchase).toHaveProperty("id", "any_id");
  });
  it("should return the edited purchase if only one field provided", async () => {
    const purchase = await sut.execute({
      id: "any_id",
      items: [mockPurchaseItem({ price: 100 })],
      paymentType: PaymentType.CASH,
    });

    expect(purchase).toBeTruthy();
  });
  it("should remove discount if total price gets below 500.00", async () => {
    const purchase = await sut.execute({
      id: "discount_id",
      items: [mockPurchaseItem({ price: 100 })],
      paymentType: PaymentType.CASH,
    });

    expect(purchase.total).toBe(100);
  });
});
