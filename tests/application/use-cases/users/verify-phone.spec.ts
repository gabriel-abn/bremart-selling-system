import { describe, it } from "vitest";

/*
- TEST (User) verify-phone
- Receber o número de telefone do usuário e o código de verificação
- Verificar se o código corresponde com o número de telefone do usuário
  - Casos de erro:
    - Código expirado (`EXPIRED_CODE`: "Código expirado.")
    - Código não corresponde com o número de telefone do usuário (`INVALID_CODE`: "Código não corresponde com o número de telefone do usuário.")
    - Número de telefone inválido (`INVALID_PHONE_NUMBER`: "Número de telefone inválido.")
    - Número de telefone já verificado (`PHONE_NUMBER_ALREADY_VERIFIED`: "Número de telefone já verificado.")
- Caso de sucesso:
  - Email do usuário
  - Confirmação de verificação do número de telefone
*/

describe.todo("Verify phone", () => {
  it("should throw if verify code is invalid");
  it("should throw if verify code is expired");
  it("should throw if phone is not found");
  it("should throw if phone is already verified");
  it("should verify phone");
});
