import { ApplicationError } from "@application/common";
import { RegisterUserUseCase } from "@application/use-cases/user";
import { FakeHasher, SpyEmailSender } from "@test-application/mocks/protocols";
import { MockDataValidation } from "@test-application/mocks/protocols/apis";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { UUIDGeneratorMock } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it, vi } from "vitest";

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
    new MockDataValidation(),
    new SpyEmailSender(),
    new FakeHasher()
  );

  return {
    userRepository,
    sut,
  };
};

describe("Register User Use Case", () => {
  describe("Basic user fields error handling", () => {
    it("should throw if CPF already exists", async () => {
      const { sut } = makeSut();
      const mock = mockUser({ cpf: "12345678900" });

      await expect(
        sut.execute({
          ...mock.getProps(),
          birthDate: mock.getProps().birthDate.toISOString(),
        })
      ).rejects.toThrowError("CPF_EXISTS");
    });
    it("should throw if email is invalid", async () => {
      const { sut } = makeSut();
      const mock = mockUser({ email: "invalid-email" });

      await expect(
        sut.execute({
          ...mock.getProps(),
          birthDate: mock.getProps().birthDate.toISOString(),
        })
      ).rejects.toThrow(ApplicationError);
    });
  });
  it("should generate a password and hash it", async () => {
    const spyGenerate = vi.spyOn(FakeHasher.prototype, "generate");
    const spyHash = vi.spyOn(FakeHasher.prototype, "hash");

    const response = await makeSut().sut.execute({
      ...mockUser({}).getProps(),
      birthDate: mockUser({}).getProps().birthDate.toISOString(),
    });

    expect(response.hashedPassword).not.toBe("");
    expect(spyGenerate).toHaveBeenCalled();
    expect(spyHash).toHaveBeenCalled();
    expect(spyHash).toHaveBeenCalledWith("NEW_PASSWORD");
  });
  it("should send a confirmation email", async () => {
    const spy = vi.spyOn(SpyEmailSender.prototype, "sendEmail");
    const fake = mockUser({}).getProps();

    await makeSut().sut.execute({
      ...fake,
      birthDate: fake.birthDate.toISOString(),
    });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith({
      to: fake.email,
      subject: "Bem vindo ao sistema",
      template: "welcome",
      params: {
        "user.name": fake.name,
      },
    });
  });
  it("should save the user and return use case response object", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...mockUser({}).getProps(),
      birthDate: mockUser({}).getProps().birthDate.toISOString(),
    });

    expect(response).toBeTruthy();
  });
});
