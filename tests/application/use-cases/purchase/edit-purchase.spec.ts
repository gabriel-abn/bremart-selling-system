import { EditPurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/entities";
import {
  MockProductRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import { mockProduct, mockPurchase, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/* 
- DOING (Purchase) edit-purchase
*/

const makeSut = () => {
  const purchaseRepository = new MockPurchaseRepository();
  const productRepository = new MockProductRepository();
  const userRepository = new MockUserRepository();

  userRepository.items.push(
    mockUser({ id: "user_id_1" }),
    mockUser({ id: "user_id_2" }),
    mockUser({ id: "user_id_3" }),
    mockUser({ id: "user_id_4" }),
  );

  productRepository.items.push(
    mockProduct({ id: "product_id_1" }),
    mockProduct({ id: "product_id_2" }),
    mockProduct({ id: "product_id_3" }),
    mockProduct({ id: "product_id_4" }),
  );

  purchaseRepository.items.push(
    mockPurchase({ id: "purchase_id_1", userId: "user_id_1", paymentType: PaymentType.CREDIT_CARD }),
    mockPurchase({ id: "purchase_id_2", userId: "user_id_2" }),
    mockPurchase({ id: "purchase_id_3", userId: "user_id_3" }),
    mockPurchase({
      id: "purchase_id_4",
      userId: "user_id_4",
      paymentType: PaymentType.PIX,
      items: [
        mockProduct({ id: "product_id_1", price: 300 }),
        mockProduct({ id: "product_id_2", price: 300 }),
        mockProduct({ id: "product_id_3", price: 300 }),
      ],
    }),
  );

  const sut = new EditPurchaseUseCase(purchaseRepository, productRepository, userRepository);

  return { sut, purchaseRepository };
};

describe.todo("Edit Purchase Use Case", () => {
  describe("Errors", () => {
    it("should throw if invalid id is provided", async () => {
      const { sut } = makeSut();

      expect(async () => {
        await sut.execute({
          id: "invalid_id",
          user: { id: "user_id_1" },
          products: ["product_id_1", "product_id_2"],
          paymentType: PaymentType.PIX,
        });
      }).rejects.toThrow("PURCHASE_NOT_FOUND");
    });

    it("should throw if no purchase items provided", async () => {
      const { sut } = makeSut();

      expect(async () => {
        await sut.execute({
          id: "purchase_id_1",
          user: { id: "user_id_1" },
          products: [],
          paymentType: PaymentType.PIX,
        });
      }).rejects.toThrow("NO_PRODUCTS_PROVIDED");
    });

    it("should throw if invalid purchase item ids provided", async () => {
      const { sut } = makeSut();

      expect(async () => {
        await sut.execute({
          id: "purchase_id_1",
          user: { id: "user_id_1" },
          products: ["invalid_id_1", "invalid_id_2"],
          paymentType: PaymentType.PIX,
        });
      }).rejects.toThrowError("NO_VALID_PRODUCTS_FOUND");

      expect(async () => {
        await sut.execute({
          id: "purchase_id_2",
          user: { id: "user_id_2" },
          products: ["product_id_2", "invalid_id_2"],
          paymentType: PaymentType.PIX,
        });
      }).rejects.toThrow("INVALID_PRODUCT_ID");
    });
  });

  it("should edit purchase", () => {
    expect(async () => {
      const { sut } = makeSut();

      const res = await sut.execute({
        id: "purchase_id_1",
        user: { id: "user_id_1" },
        products: ["valid_id_1"],
        paymentType: PaymentType.PIX,
      });

      return res;
    }).toBeTruthy();
  });
});
