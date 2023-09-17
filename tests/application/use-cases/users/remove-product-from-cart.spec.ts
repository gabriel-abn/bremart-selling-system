import { RemoveProductFromCartUseCase } from "@application/use-cases/user";
import { MockProductRepository, MockUserRepository } from "@test-application/mocks/repositories";
import { mockProduct, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/**
- DONE (User) remove-product-from-cart
- Receber o id do usuário e o id do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto não adicionado ao carrinho (`PRODUCT_NOT_ADDED`: "Produto não adicionado ao carrinho.")
- Caso de sucesso:
  - Status
  - Valor total do carrinho
*/

const makeSut = () => {
  const productRepo = new MockProductRepository();
  const product = mockProduct({
    id: "valid_id",
  });

  productRepo.items.push(product, mockProduct({ id: "not_in_cart" }));

  const userRepo = new MockUserRepository();
  const user = mockUser({
    id: "valid_id",
  });

  user.addProductToShoppingCart(product);

  userRepo.items.push(user);

  const sut = new RemoveProductFromCartUseCase(userRepo, productRepo);

  return { sut };
};

describe("Remove Product From Cart", () => {
  it("should throw if user not found", async () => {
    const { sut } = makeSut();

    await expect(() => sut.execute({ userId: "invalid_id", productId: "product_id" })).rejects.toThrow(
      "USER_NOT_FOUND",
    );
  });
  it("should throw if product not found", async () => {
    const { sut } = makeSut();

    await expect(() => sut.execute({ userId: "valid_id", productId: "invalid_id" })).rejects.toThrow(
      "PRODUCT_NOT_FOUND",
    );
  });
  it("should throw if product not in shopping cart", async () => {
    const { sut } = makeSut();

    await expect(() => sut.execute({ userId: "valid_id", productId: "not_in_cart" })).rejects.toThrow();
  });
  it("should remove product from shopping cart", async () => {
    const { sut } = makeSut();

    const { status, updatedValue } = await sut.execute({ userId: "valid_id", productId: "valid_id" });

    expect(status).toBe(true);
    expect(updatedValue).toBe(0);
  });
});
