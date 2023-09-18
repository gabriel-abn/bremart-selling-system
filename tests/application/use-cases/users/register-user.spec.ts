import { ApplicationError } from "@application/common";
import { RegisterUserUseCase } from "@application/use-cases/user";
import { FakeHasher, SpyEmailSender } from "@test-application/mocks/protocols";
import { MockDataValidation } from "@test-application/mocks/protocols/apis";
import { MockTokenRepository, MockUserRepository } from "@test-application/mocks/repositories";
import { UUIDGeneratorMock } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it, vi } from "vitest";

/**
 * 
 * #DONE (User) register-user
  - Receber nome, cpf, email, data de nascimento e telefone
    - Casos de erro:
      - CPF já presente no repositório (`CPF_EXISTS`: "CPF já presente no repositório.")
      - CPF inválido (`INVALID_CPF`: "CPF inválido.")
      - Email inválido (`INVALID_EMAIL`: "Email inválido.")
      - Formato da data de nascimento inválida (`INVALID_DATE_FORMAT`: "Formato da data de nascimento inválida.")
      - Telefone inválido (`INVALID_PHONE_NUMBER`: "Telefone inválido.")
  - A senha deve ser gerada automaticamente
  - A senha deve ser criptografada antes do armazenamento
  - O usuário deve receber um email de confirmação
  - Caso de Sucesso:
    - ID do usuário criptografado
    - Email do usuário
    - Senha criptografada
    - Tempo máximo de espera para verificação do email      
 * 
 */

const makeSut = () => {
  const userRepository = new MockUserRepository();

  userRepository.items.push(
    mockUser({}),
    mockUser({}),
    mockUser({ rg: "12345678" }),
    mockUser({ cpf: "12345678900" }),
    mockUser({ cpf: "11100011100" }),
  );

  const sut = new RegisterUserUseCase(
    userRepository,
    new UUIDGeneratorMock(),
    new MockDataValidation(),
    new SpyEmailSender(),
    new FakeHasher(),
    new MockTokenRepository(),
  );

  return {
    userRepository,
    sut,
  };
};

describe("Use Case: Register User", () => {
  describe("Basic user fields error handling", () => {
    it("should throw if CPF already exists", async () => {
      const { sut } = makeSut();
      const mock = mockUser({ cpf: "12345678900" });

      await expect(
        sut.execute({
          ...mock.props,
          birthDate: mock.props.birthDate.toISOString(),
        }),
      ).rejects.toThrowError("CPF_EXISTS");
    });
    it("should throw if email is invalid", async () => {
      const { sut } = makeSut();
      const mock = mockUser({ email: "invalid-email" });

      await expect(
        sut.execute({
          ...mock.props,
          birthDate: mock.props.birthDate.toISOString(),
        }),
      ).rejects.toThrow(ApplicationError);
    });
  });
  it("should generate a password and hash it", async () => {
    const spyGenerate = vi.spyOn(FakeHasher.prototype, "generate");
    const spyHash = vi.spyOn(FakeHasher.prototype, "hash");

    const response = await makeSut().sut.execute({
      ...mockUser({}).props,
      birthDate: mockUser({}).props.birthDate.toISOString(),
    });

    expect(response.hashedPassword).not.toBe("");
    expect(spyGenerate).toHaveBeenCalled();
    expect(spyHash).toHaveBeenCalled();
    expect(spyHash).toHaveBeenCalledWith("NEW_PASSWORD");
  });
  it("should generate a random token and store it", async () => {
    const spy = vi.spyOn(MockTokenRepository.prototype, "save");

    const mock = mockUser({}).props;

    await makeSut().sut.execute({
      ...mock,
      birthDate: mock.birthDate.toISOString(),
    });

    expect(spy).toHaveBeenCalled();
  });
  it("should send a confirmation email", async () => {
    const spy = vi.spyOn(SpyEmailSender.prototype, "sendEmail");
    const fake = mockUser({}).props;

    await makeSut().sut.execute({
      ...fake,
      birthDate: fake.birthDate.toISOString(),
    });

    expect(spy).toHaveBeenCalled();
  });
  it("should save the user and return use case response object", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...mockUser({}).props,
      birthDate: mockUser({}).props.birthDate.toISOString(),
    });

    expect(response).toBeTruthy();
  });
});
