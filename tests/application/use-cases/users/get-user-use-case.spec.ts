import { ApplicationError } from "@application/common";
import { GetUserUseCase } from "@application/use-cases/user";
import { MockDataValidation } from "@test-application/mocks/protocols";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockUser } from "@test-domain/mocks/mock-user";

const makeSut = () => {
  const repository = new MockUserRepository();
  const dataValidator = new MockDataValidation();

  repository.items.push(
    mockUser({}),
    mockUser({}),
    mockUser({ id: "any_id" }),
    mockUser({ cpf: "12345678900" })
  );

  const sut = new GetUserUseCase(repository, dataValidator);

  return { sut };
};

describe("Get User Use Case", () => {
  it("should get a existent user by userID", async () => {
    const { sut } = makeSut();

    const exist = await sut.execute({
      id: "any_id",
    });

    expect(exist).toBeTruthy();
  });
  it("should get a existent user by cpf", async () => {
    const { sut } = makeSut();

    const exist = await sut.execute({
      cpf: "123.456.789-00",
    });

    expect(exist).toBeTruthy();
  });
  it("should throw if user does not exist", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({
        cpf: "000.000.000-00",
      });
    }).rejects.toThrow(ApplicationError);
  });
});
