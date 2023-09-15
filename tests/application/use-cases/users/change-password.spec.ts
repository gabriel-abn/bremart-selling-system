import { describe, it } from "vitest";

/**
- TEST (User) change-password
- Receber o email do usuário e um campo opcional contendo um token de verificação e a nova senha
- Se o caso de uso receber apenas o email do usuário:
  - Enviar um email para o usuário com um link para alterar a senha
    - Casos de erro:
      - Email não encontrado (`EMAIL_NOT_FOUND`: "Email não encontrado.")
  - Caso de sucesso:
    - Email do usuário
    - Token de verificação
    - Tempo máximo de espera para verificação do email
- Se o caso de uso receber o email do usuário, a senha e o token de verificação:
  - Verificar se o token corresponde com o email do usuário
    - Casos de erro:
      - Email não encontrado (`EMAIL_NOT_FOUND`: "Email não encontrado.")
      - Token expirado (`EXPIRED_TOKEN`: "Token expirado.")
      - Token não corresponde com o email do usuário (`INVALID_TOKEN`: "Token não corresponde com o email do usuário.")
  - Alterar a senha do usuário
  - Caso de sucesso:
    - Email do usuário
    - Senha criptografada
 */

describe("Use Case: change-password", () => {
  describe("Receiving just the user email", () => {
    it("should throw an error if email not found", () => {});
    it("should send email with verification code");
    it("should create a key-value pair with email and verification code");
  });
  describe("Receiving email, token and new password", () => {
    it("should throw an error if email not found");
    it("should throw an error if token is incorrect");
    it("should throw an error if token is expired");
    it("should change the password");
  });
});
