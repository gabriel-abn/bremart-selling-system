import { describe, it } from "vitest";

/*
- TEST (User) add-product-to-cart
- Receber o id do usuário e os dados do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto indisponível (`PRODUCT_UNAVAILABLE`: "Produto indisponível.")
    - Produto já adicionado ao carrinho (`PRODUCT_ALREADY_ADDED`: "Produto já adicionado ao carrinho.")
    - Quantidade inválida (`INVALID_QUANTITY`: "Quantidade inválida.")
- Caso de sucesso:
  - Índice do produto no carrinho
  - Valor total do carrinho
*/

describe("Add Product To Cart", () => {
  it("should throw if product does not exist", () => {});
  it("should throw if product is not available", () => {});
  it("should throw if product is already in the cart", () => {});
  it("should throw if product has invalid quantity", () => {});
  it("should be able to add a product to cart", () => {});
});
