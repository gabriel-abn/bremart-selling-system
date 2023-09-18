import { describe, it } from "vitest";

/**
 * 
- TEST (User) remove-user
- Receber o id do usuário
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
- Remover o usuário
- Caso de sucesso:
  - ID do usuário criptografado
  - Email do usuário
 * 
 */

describe.todo("Use Case: Remove User", () => {
  it("should throw an error if the user does not exist");
  it("should remove the user and return the removed user");
});
