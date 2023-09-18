import { AddProductToCartUseCase } from "@application/use-cases/user";
import { MockProductRepository, MockUserRepository } from "@test-application/mocks/repositories";
import { mockProduct, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/*
- DONE (User) add-product-to-cart
- Receber o id do usuário e os dados do produto
  - Casos de erro:
    - Produto não encontrado (`PRODUCT_NOT_FOUND`: "Produto não encontrado.")
    - Produto indisponível (`PRODUCT_UNAVAILABLE`: "Produto indisponível.")
    - Produto já adicionado ao carrinho (`PRODUCT_ALREADY_ADDED`: "Produto já adicionado ao carrinho.")
- Caso de sucesso:
  - Índice do produto no carrinho
  - Valor total do carrinho
*/
const makeSut = () => {
  const userRepository = new MockUserRepository();

  const userWithShoppingCart = {
    user: mockUser({
      id: "valid_user_id_3",
    }),
    product: mockProduct({ id: "duplicated_product", price: 100 }),
  };

  userWithShoppingCart.user.addProductToShoppingCart(userWithShoppingCart.product);

  userRepository.items.push(
    mockUser({ id: "valid_user_id" }),
    mockUser({ id: "valid_user_id_2" }),
    userWithShoppingCart.user,
  );

  const productRepository = new MockProductRepository();

  productRepository.items.push(
    mockProduct({ id: "unavailable_product", quantity: 0 }),
    mockProduct({ id: "valid_product" }),
    mockProduct({ id: "valid_product_2", price: 200 }),
    userWithShoppingCart.product,
  );

  const sut = new AddProductToCartUseCase(productRepository, userRepository);

  return { sut };
};

describe("Use Case: Add Product To Cart", () => {
  describe("error handling", () => {
    it("should throw if product does not exist", async () => {
      const { sut } = makeSut();

      await expect(
        sut.execute({
          productId: "invalid_product",
          userId: "valid_user_id",
        }),
      ).rejects.toThrowError("PRODUCT_NOT_FOUND");
    });

    it("should throw if product is not available", async () => {
      const { sut } = makeSut();

      await expect(
        sut.execute({
          productId: "unavailable_product",
          userId: "valid_user_id",
        }),
      ).rejects.toThrowError("PRODUCT_UNAVAILABLE");
    });
  });

  it("should be able to add a product to cart", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      productId: "valid_product_2",
      userId: "valid_user_id",
    });

    expect(result.productIndex).toBe(1);
    expect(result.totalValue).toBe(200);
  });
});
