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
  describe("Basic user fields error handling", () => {
    it("should throw if CPF already exists");
    it("should throw if CPF is invalid");
    it("should throw if email is invalid");
    it("should throw if birth date is invalid");
    it("should throw if phone number is invalid");
  });
  it("should generate a password");
  it("should hash the password");
  it("should send a confirmation email");
  it("should save the user and return use case response object");
});
