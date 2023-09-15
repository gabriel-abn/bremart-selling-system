import { describe, it } from "vitest";

/**
- TEST (User) remove-product-from-cart
- Receber o id do usuário e o id do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto não adicionado ao carrinho (`PRODUCT_NOT_ADDED`: "Produto não adicionado ao carrinho.")
- Caso de sucesso:
  - Status
  - Valor total do carrinho
 */

describe("Remove Product From Cart", () => {
  it("should throw if product not found");
  it("should throw if product not in shopping cart");
  it("should remove product from shopping cart");
});
