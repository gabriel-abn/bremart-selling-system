import { DisableUserUseCase } from "@application/use-cases/user";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/**
- DOING (User) disable-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Usuário já desativado (`USER_DISABLED`: "Usuário já desativado.")
- Desativar o usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário
*/

const makeSut = () => {
  const repo = new MockUserRepository();

  repo.items.push(
    mockUser({
      id: "valid_user",
    }),
  );

  const sut = new DisableUserUseCase(repo);

  return { sut, repo };
};

describe("Use Case: Disable User", () => {
  it("should throw an error if the user does not exist", async () => {
    const { sut } = makeSut();

    await expect(() => sut.execute({ userId: "invalid_user" })).rejects.toThrow("USER_NOT_FOUND");
  });

  it("should disable the user", async () => {
    const { sut, repo } = makeSut();

    const res = await sut.execute({ userId: "valid_user" });

    const user = await repo.get("valid_user");

    expect(user.status).toBe("DISABLED");
    expect(res.success).toBe(true);
  });
});
