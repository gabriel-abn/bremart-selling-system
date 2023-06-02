import { ApplicationError } from "@application/common";
import { EditPurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/payment-type";
import {
  MockPurchaseItemRepository,
  MockPurchaseRepository,
} from "@test-application/mocks/repositories";
import { mockCompletePurchase, mockPurchaseItem } from "@test-domain/mocks";

const purchaseRepository = new MockPurchaseRepository();
const purchaseItemRepository = new MockPurchaseItemRepository();
const sut = new EditPurchaseUseCase(purchaseRepository, purchaseItemRepository);

describe("Edit Purchase Use Case", () => {
  beforeAll(async () => {
    for (let index = 0; index < 5; index++) {
      await purchaseRepository.create(mockCompletePurchase({}));
    }

    await purchaseRepository.create(mockCompletePurchase({ id: "any_id" }));

    await purchaseRepository.create(
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
      items: [mockPurchaseItem({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.CREDIT_CARD,
    });

    expect(purchase).toHaveProperty("id", "any_id");
  });
  it("should return the edited purchase if only one field provided", async () => {
    const purchase = await sut.execute({
      id: "any_id",
      items: [mockPurchaseItem({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.BOLETO,
    });

    expect(purchase).toBeTruthy();
  });
  it("should remove discount if total price gets below 500.00", async () => {
    const purchase = await sut.execute({
      id: "discount_id",
      items: [mockPurchaseItem({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.CASH,
    });

    expect(purchase.total).toBe(100);
  });
  it("should throw if invalid purchase item ids provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "any_id",
        items: [mockPurchaseItem({})],
        paymentType: PaymentType.CASH,
      });
    }).rejects.toThrowError(ApplicationError);
  });
});
