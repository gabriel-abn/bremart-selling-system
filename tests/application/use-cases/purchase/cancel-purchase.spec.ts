import { describe, it } from "vitest";

/* 
- DOING (Purchase) cancel-purchase
- Receber o id do usuário e o id da compra
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - ID da compra não encontrado (`PURCHASE_NOT_FOUND`: "ID da compra não encontrado.")
    - ID da compra não pertence ao usuário (`PURCHASE_NOT_BELONG_TO_USER`: "ID da compra não pertence ao usuário.")
- Verificar status da compra
  - Casos de erro:
    - Compra já cancelada (`PURCHASE_CANCELED`: "Compra cancelada.")
    - Compra já entregue (`PURCHASE_ALREADY_DELIVERED`: "Compra já entregue.")
- Caso de sucesso:
  - ID da compra criptografado
  - Data de cancelamento
 */

describe("Cancel purchase", () => {
  it("should throw if user`s id not found", () => {});
  it("should throw if purchase`s id not found", () => {});
  it("should throw if purchase does not belong to user", () => {});
  it("should throw if purchase is already canceled", () => {});
  it("should throw if purchase is already delivered", () => {});
  it("should cancel purchase", () => {});
});
