import { ApplicationError } from "@application/common";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/entities";
import { FakeCrypter } from "@test-application/mocks/protocols";
import {
  MockProductRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import { FreightServiceSpy } from "@test-application/services/purchase";
import { UUIDGeneratorMock, mockProduct, mockPurchase } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it, vi } from "vitest";

/* 
- DOING (Purchase) create-purchase
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todos os produtos do carrinho
  - Casos de erro:
    - Carrinho vazio (`EMPTY_CART`: "Carrinho vazio.")
- Criar uma nova compra com os produtos do carrinho
- Caso de sucesso:
  - ID da compra criptografado
  - Valor total da compra
*/

const makeSut = () => {
  const userRepository = new MockUserRepository();

  userRepository.items.push(
    mockUser({ id: "valid_id_1" }),
    mockUser({ id: "valid_id_2" }),
    mockUser({ id: "valid_id_3" }),
  );

  const productRepository = new MockProductRepository();

  productRepository.items.push(
    mockProduct({ id: "valid_product_id" }),
    mockProduct({ id: "valid_product_id_2" }),
    mockProduct({ id: "valid_product_id_3" }),
    mockProduct({ id: "valid_product_id_4" }),
    mockProduct({ id: "valid_product_id_5" }),
  );

  const sut = new CreatePurchaseUseCase(
    new UUIDGeneratorMock(),
    new MockPurchaseRepository(),
    userRepository,
    productRepository,
    new FreightServiceSpy(),
    new FakeCrypter(),
  );

  return { sut };
};

describe("Use Case: Create Purchase", () => {
  it("should throw if user's id not found", async () => {
    const { sut } = makeSut();
    const mock = mockPurchase({ userId: "1" });

    await expect(() =>
      sut.execute({
        user: { id: "invalid_user_id" },
        products: ["valid_product_id"],
        paymentType: mock.props.paymentType,
      }),
    ).rejects.toThrow(ApplicationError);
  });

  it("should throw if purchase has no items", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        user: { id: "valid_id_2" },
        paymentType: PaymentType.PIX,
        products: [],
      });
    }).rejects.toThrowError(ApplicationError);

    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        user: { id: "valid_id_2" },
        paymentType: PaymentType.PIX,
        products: [],
      });
    }).rejects.toThrowError("INVALID_PURCHASE_ITEMS");
  });

  it.todo("should give 5% discount if payment type is in cash and total price greater than 500", async () => {
    const { sut } = makeSut();
    const mock = mockPurchase({ userId: "1" });

    const purchase = await sut.execute({
      user: { id: mock.props.userId },
      products: ["valid_product_id"],
      paymentType: PaymentType.PIX,
    });

    expect(purchase.total).toBe(570);
  });

  it("should throw if invalid products given", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        products: ["invalid_product_id"],
        paymentType: PaymentType.PIX,
        user: { id: "valid_id_1" },
      });
    }).rejects.toThrowError(ApplicationError);

    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        products: ["valid_product_id", "invalid_product_id"],
        paymentType: PaymentType.PIX,
        user: { id: "valid_id_1" },
      });
    }).rejects.toThrowError("INVALID_PRODUCT_ID_invalid_product_id");
  });

  it.todo("should create with user's default address if no address given", async () => {});
  it.todo("should throw if invalid address given", async () => {});

  it.todo("should throw if purchase not saved");

  it("should create purchase, store and return crypred id", async () => {
    const { sut } = makeSut();
    const mock = mockPurchase({ userId: "1" });
    const purchaseRepo = vi.spyOn(MockPurchaseRepository.prototype, "create");

    const purchase = await sut.execute({
      user: { id: "valid_id_2" },
      products: ["valid_product_id"],
      paymentType: mock.props.paymentType,
    });

    expect(purchaseRepo).toHaveBeenCalled();
    expect(purchaseRepo).toHaveReturned();
    expect(purchase.cryptedPurchaseId).toBeTruthy();
    expect(purchase.total).toBeGreaterThan(0);
  });
});
