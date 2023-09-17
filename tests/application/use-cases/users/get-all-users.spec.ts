import { GetAllUsersUseCase } from "@application/use-cases/user";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it } from "vitest";

/**
- DONE (User) get-all-users
- Recuperar todos os usuários
- Caso de sucesso:
  - Lista de usuários
 */

const makeSut = () => {
  const repository = new MockUserRepository();

  repository.items.push(mockUser({}), mockUser({}), mockUser({}), mockUser({}), mockUser({}), mockUser({}));

  const sut = new GetAllUsersUseCase(repository);

  return { sut, repository };
};

describe("Get All Users Use Case", () => {
  it("should return all users", async () => {
    const { sut, repository } = makeSut();

    const users = await sut.execute();

    expect(users).toHaveLength(repository.items.length);
  });
});
