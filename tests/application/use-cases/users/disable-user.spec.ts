import { describe, it } from "vitest";

/**
- TEST (User) disable-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Usuário já desativado (`USER_DISABLED`: "Usuário já desativado.")
- Desativar o usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário
 */

describe("Use Case: Disable User", () => {
  it("should throw an error if the user does not exist");
  it("should throw an error if the user is already disabled");
  it("should disable the user");
});
