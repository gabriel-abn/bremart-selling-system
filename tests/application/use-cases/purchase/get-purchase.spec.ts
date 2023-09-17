import { GetPurchase, GetPurchaseUseCase } from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";
import { mockCompletePurchase } from "@test-domain/mocks";
import { beforeAll, describe, expect, it } from "vitest";

const repository = new MockPurchaseRepository();
const sut = new GetPurchaseUseCase(repository);

describe.skip("Get Purchase Use Case", () => {
  beforeAll(async () => {
    for (let index = 0; index < 5; index++) {
      await repository.create(mockCompletePurchase({ id: `any_id_${index}` }));
    }

    await repository.create(mockCompletePurchase({ id: "any_id" }));
  });
  it("should return purchase by id", async () => {
    const purchase = await sut.execute({ id: "any_id" });

    expect(purchase).toBeTruthy();
  });

  it("should throw if purchase does not exists", async () => {
    const purchase = async (): Promise<GetPurchase.Result> => {
      const response = await sut.execute({ id: "invalid_id" });

      console.log(response);

      return response;
    };

    expect(purchase).rejects.toThrow("GetPurchaseUseCase: Purchase not found");
  });
});
