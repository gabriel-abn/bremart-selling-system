import { VerifyEmailUseCase } from "@application/use-cases/user";
import { MockTokenRepository } from "@test-application/mocks/repositories";
import { describe, expect, it } from "vitest";

/**
 *
 * #DONE (User) verify-email
 * - Receber o email do usuário e o token de verificação
 * - Verificar se o token corresponde com o email do usuário
 *   - Casos de erro:
 *     - Token expirado (`EXPIRED_TOKEN`: "Token expirado.")
 *     - Token não corresponde com o email do usuário (`INVALID_TOKEN`: "Token não corresponde com o email do usuário.")
 *     - Email inválido (`INVALID_EMAIL`: "Email inválido.")
 *     - Email já verificado (`EMAIL_ALREADY_VERIFIED`: "Email já verificado.")
 * - Caso de Sucesso:
 *   - ID do usuário criptografado
 *   - Email do usuário
 *   - Tempo máximo de espera para verificação do email
 *
 */

const makeSut = () => {
  const mockTokenRepository = new MockTokenRepository();

  mockTokenRepository.items.set("valid_email", "ABC123");
  mockTokenRepository.items.set("valid_email_2", "ABC000");
  mockTokenRepository.items.set("valid_email_3", "ABC345;YES");
  const sut = new VerifyEmailUseCase(mockTokenRepository);

  return { sut };
};

describe("Verify email", () => {
  describe("Basic error handling", () => {
    it("should throw if email not found", async () => {
      const { sut } = makeSut();

      await expect(() =>
        sut.execute({ email: "invalid_email", verificationToken: "ABC123" })
      ).rejects.toThrow("INVALID_EMAIL");
    });
    it("should throw if verification token is invalid or expired", async () => {
      const { sut } = makeSut();

      await expect(() =>
        sut.execute({ email: "valid_email", verificationToken: "ABC000" })
      ).rejects.toThrow("INVALID_DATA");
    });
    it("should throw if user is already verified", async () => {
      const { sut } = makeSut();

      await expect(() =>
        sut.execute({ email: "valid_email_3", verificationToken: "ABC345" })
      ).rejects.toThrow("EMAIL_ALREADY_VERIFIED");
    });
  });
  it("should verify user", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      email: "valid_email",
      verificationToken: "ABC123",
    });

    expect(result).toHaveProperty("verified", true);
  });
});
