import { describe, it } from "vitest";

/* 

- TEST (User) add-address
- Receber o id do usuário e os dados do endereço
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Endereço já cadastrado (`ADDRESS_ALREADY_EXISTS`: "Endereço já cadastrado.")
    - Formato do endereço inválido (`INVALID_ADDRESS_FORMAT`: "Formato do endereço inválido.")
- Caso de sucesso:
  - ID do endereço criptografado


*/

describe("Add address use case", () => {
  it("should throw if user does not exist");
  it("should throw if address already exists");
  it("should throw if address is invalid");
  it("should add address to user");
});
