import { ShowShoppingCartUseCase } from "@application/use-cases/user";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockProduct, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/**
- DONE (User) show-shopping-cart
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todos os produtos do carrinho
- Caso de sucesso:
  - ID do usuário criptografado
  - Lista de produtos do carrinho
*/

const makeSut = () => {
  const user = mockUser({ id: "valid_id" });
  user.addProductToShoppingCart(mockProduct({}), mockProduct({}), mockProduct({}));

  const repo = new MockUserRepository();

  repo.items.push(user, mockUser({ id: "empty_cart" }));

  const sut = new ShowShoppingCartUseCase(repo);

  return { sut };
};

describe("Use Case: Show Shopping Cart", () => {
  it("should throw if user not found", async () => {
    const { sut } = makeSut();

    await expect(sut.execute({ userId: "invalid_id" })).rejects.toThrow("USER_NOT_FOUND");
  });
  it("should return user's shopping cart", async () => {
    const { sut } = makeSut();

    const userShoppingCart = await sut.execute({ userId: "valid_id" });

    expect(userShoppingCart.cart).toHaveLength(3);
  });
  it("should return an empty array if shopping cart is empty", async () => {
    const { sut } = makeSut();

    const userShoppingCart = await sut.execute({ userId: "empty_cart" });

    expect(userShoppingCart.cart).toHaveLength(0);
  });
});
