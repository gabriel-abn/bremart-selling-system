import { ApplicationError } from "@application/common";
import { EditPurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/entities";
import {
  MockProductRepository,
  MockPurchaseRepository,
} from "@test-application/mocks/repositories";
import { mockCompletePurchase, mockProduct } from "@test-domain/mocks";
import { beforeAll, describe, expect, it } from "vitest";

const purchaseRepository = new MockPurchaseRepository();
const purchaseItemRepository = new MockProductRepository();
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
        items: [mockProduct({ price: 600 })],
        paymentType: PaymentType.PIX,
      })
    );
  });
  it("should throw if invalid id is provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "invalid_id",
        items: [mockProduct({})],
        paymentType: PaymentType.PIX,
      });
    }).rejects.toThrow("EditPurchaseUseCase: Purchase not found");
  });
  it("should throw if no purchase items provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "any_id",
        items: [],
        paymentType: PaymentType.PIX,
      });
    }).rejects.toThrow("EditPurchaseUseCase: No items provided");
  });
  it("should return the edited purchase on success", async () => {
    const purchase = await sut.execute({
      id: "any_id",
      items: [mockProduct({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.CREDIT_CARD,
    });

    expect(purchase).toHaveProperty("id", "any_id");
  });
  it("should return the edited purchase if only one field provided", async () => {
    const purchase = await sut.execute({
      id: "any_id",
      items: [mockProduct({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.BOLETO,
    });

    expect(purchase).toBeTruthy();
  });
  it("should remove discount if total price gets below 500.00", async () => {
    const purchase = await sut.execute({
      id: "discount_id",
      items: [mockProduct({ id: "valid_id_1", price: 100 })],
      paymentType: PaymentType.PIX,
    });

    expect(purchase.total).toBe(100);
  });
  it("should throw if invalid purchase item ids provided", async () => {
    expect(async () => {
      await sut.execute({
        id: "any_id",
        items: [mockProduct({})],
        paymentType: PaymentType.PIX,
      });
    }).rejects.toThrowError(ApplicationError);
  });
});
