import { ShowPurchaseHistoricUseCase } from "@application/use-cases/user";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/**
- DONE (User) show-purchase-history
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Recuperar todas as compras do usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Lista de compras
 */

const makeSut = () => {
  const repo = new MockUserRepository();
  const user = mockUser({ id: "valid_id" });

  user.props.purchaseHistoric = [mockCompletePurchase({}), mockCompletePurchase({}), mockCompletePurchase({})];

  repo.items.push(user);

  const sut = new ShowPurchaseHistoricUseCase(repo);

  return { sut };
};

describe("Use Case: Show Purchase Historic", () => {
  it("should throw if user not found", async () => {
    const { sut } = makeSut();

    await expect(sut.execute({ userId: "invalid_id" })).rejects.toThrow("USER_NOT_FOUND");
  });
  it("should return purchase historic", async () => {
    const { sut } = makeSut();

    const userPurchaseHistoric = await sut.execute({ userId: "valid_id" });

    expect(userPurchaseHistoric).toHaveLength(3);
  });
});
