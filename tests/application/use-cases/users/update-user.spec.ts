import { describe, it } from "vitest";

/**
- TEST (User) update-user
- Receber o id do usuário e os dados do usuário
  - Casos de erro:
    - ID do usuário não encontrado
    - Formato da data de nascimento inválida
    - Formato do telefone inválido
 */

describe("Use Case: Update User", () => {
  it("should throw if user does not exist");
  it("should throw if any user data is invalid");
  it("should return the updated user");
});
