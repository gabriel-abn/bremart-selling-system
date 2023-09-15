import { ApplicationError } from "@application/common";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/entities";
import {
  MockProductRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import {
  UUIDGeneratorMock,
  mockCompletePurchase,
  mockProduct,
} from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it } from "vitest";

/* 
- TODO (Purchase) create-purchase
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

  userRepository.items.push(mockUser({ id: "1" }));

  const sut = new CreatePurchaseUseCase(
    new UUIDGeneratorMock(),
    new MockPurchaseRepository(),
    userRepository,
    new MockProductRepository()
  );

  return { sut };
};

const mockProps = mockCompletePurchase({ userId: "1" }).props;

describe("Create purchase use case", () => {
  it("should return a purchase", async () => {
    const { sut } = makeSut();

    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: mockProps.items,
      paymentType: mockProps.paymentType,
      voucher: "invalid",
    });

    expect(purchase).toBeTruthy();
  });

  it("should throw if user's id not found", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        userId: "invalid_user_id",
        items: mockProps.items,
        paymentType: mockProps.paymentType,
        voucher: "invalid",
      });
    }).rejects.toThrow(ApplicationError);
  });

  it("should return a purchase with a valid result", async () => {
    const { sut } = makeSut();

    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: mockProps.items,
      paymentType: mockProps.paymentType,
      voucher: "invalid",
    });

    expect(purchase.id).toBeTruthy();
    expect(purchase.total).toBeGreaterThan(0);
    expect(purchase.userId).toBeTruthy();
  });

  it("should throw if purchase has no items", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        userId: mockProps.userId,
        paymentType: mockProps.paymentType,
        items: [],
        voucher: "invalid",
      });
    }).rejects.toThrowError(ApplicationError);
  });

  it("should give 5% discount if payment type is in cash and total price greater than 500", async () => {
    const { sut } = makeSut();

    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: [mockProduct({ id: "valid_id_1", price: 600 })],
      paymentType: PaymentType.PIX,
      voucher: "invalid",
    });

    expect(purchase.total).toBe(570);
  });

  it("should throw if invalid purchase items given", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        items: [mockProduct({ id: "invalid_id" })],
        paymentType: PaymentType.PIX,
        userId: "1",
        voucher: "invalid",
      });
    }).rejects.toThrowError(ApplicationError);
  });
});
