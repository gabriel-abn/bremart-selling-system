import { ApplicationError } from "@application/common";
import { GetAllPurchasePerUserUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository, MockUserRepository } from "@test-application/mocks/repositories";
import { mockPurchase } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it } from "vitest";

/* 
- DONE (Purchase) get-all-purchase-per-user
*/

const makeSut = () => {
  const userRepository = new MockUserRepository();

  userRepository.items.push(mockUser({ id: "any_id_1" }));

  const purchaseRepository = new MockPurchaseRepository();

  purchaseRepository.items.push(
    mockPurchase({ userId: "any_id_1" }),
    mockPurchase({ userId: "any_id_1" }),
    mockPurchase({ userId: "any_id_1" }),
    mockPurchase({ userId: "any_id_1" }),
  );

  const sut = new GetAllPurchasePerUserUseCase(purchaseRepository, userRepository);

  return { sut };
};

describe("Get All Purchase per User Use Case", () => {
  it("should return all purchases by user id", async () => {
    const { sut } = makeSut();

    const result = await sut.execute({ userId: "any_id_1" });

    expect(result).toHaveLength(4);
  });

  it("should throw if user not found", async () => {
    expect(async () => {
      const { sut } = makeSut();

      await sut.execute({ userId: "invalid_id" });
    }).rejects.toThrow(ApplicationError);
  });
});
