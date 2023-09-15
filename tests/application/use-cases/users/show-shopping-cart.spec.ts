import { describe, it } from "vitest";

/**
- TEST (User) show-shopping-cart
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todos os produtos do carrinho
- Caso de sucesso:
  - ID do usuário criptografado
  - Lista de produtos do carrinho
 */

describe("Use Case: Show Cart", () => {
  it("should throw if user not found");
  it("should return user's shopping cart");
  it("should return an empty array if shopping cart is empty");
});
