import { ApplicationError } from "@application/common";
import { RegisterUserUseCase } from "@application/use-cases/user";
import { MockDataValidation } from "@test-application/mocks/protocols";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { UUIDGeneratorMock } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";

const makeSut = () => {
  const userRepository = new MockUserRepository();

  userRepository.items.push(
    mockUser({}),
    mockUser({}),
    mockUser({ rg: "12345678" }),
    mockUser({ cpf: "12345678900" }),
    mockUser({ cpf: "11100011100" })
  );

  const sut = new RegisterUserUseCase(
    userRepository,
    new UUIDGeneratorMock(),
    new MockDataValidation()
  );

  return {
    userRepository,
    sut,
  };
};

describe("Register User Use Case", () => {
  it("should be able to collect user's info and register in the system", async () => {
    const mock = mockUser({ cpf: "123.321.123-11" }).props;
    const { sut } = makeSut();

    const response = await sut.execute({
      ...mock,
    });

    expect(response).toBeTruthy();
  });
  it("should throw if CPF exists in repository", async () => {
    expect(async () => {
      const { sut } = makeSut();

      return await sut.execute(mockUser({ cpf: "12345678900" }).props);
    }).rejects.toThrow(ApplicationError);
  });
  it("should throw if CPF is invalid", async () => {
    expect(async () => {
      const { sut } = makeSut();

      return await sut.execute(
        mockUser({
          cpf: "123456",
        }).props
      );
    }).rejects.toThrow(ApplicationError);
  });
  it("should throw if RG is invalid", async () => {
    expect(async () => {
      const { sut } = makeSut();

      return await sut.execute(
        mockUser({
          rg: "123456",
        }).props
      );
    }).rejects.toThrow(ApplicationError);
  });
});
