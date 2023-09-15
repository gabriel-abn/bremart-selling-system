import { AddAddressUseCase } from "@application/use-cases/user";
import { FakeCrypter } from "@test-application/mocks/protocols";
import { MockUserRepository } from "@test-application/mocks/repositories";
import { mockAddress, mockUser } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

/* 

- DONE (User) add-address
- Receber o id do usuário e os dados do endereço
  - Casos de erro:
    - ID do usuário não encontrado (`USER_NOT_FOUND`: "ID do usuário não encontrado.")
    - Endereço já cadastrado (`ADDRESS_ALREADY_EXISTS`: "Endereço já cadastrado.")
    - Formato do endereço inválido (`INVALID_ADDRESS_FORMAT`: "Formato do endereço inválido.")
- Caso de sucesso:
  - ID do endereço criptografado


*/

const makeSut = () => {
  const repository = new MockUserRepository();

  repository.items.push(
    mockUser({ id: "valid_id", email: "valid_email" }),
    mockUser({}),
    mockUser({})
  );

  const sut = new AddAddressUseCase(repository, new FakeCrypter());
  return { sut };
};

describe("Add address use case", () => {
  it("should throw if user does not exist", async () => {
    const { sut } = makeSut();

    await expect(() =>
      sut.execute({
        id: "invalid_id",
        address: mockAddress("ID"),
      })
    ).rejects.toThrowError("USER_NOT_FOUND");
  });

  it("should throw if address is invalid", async () => {});

  it("should add address to user", async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      id: "valid_id",
      address: mockAddress("ID"),
    });

    expect(response.cryptedAddressId).toBeTruthy();
    expect(response.cryptedAddressId).not.toBe("" || "ID");
    expect(response.email).toBe("valid_email");
  });
});
