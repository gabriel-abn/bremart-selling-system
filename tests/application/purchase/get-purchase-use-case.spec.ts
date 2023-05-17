import {
  GetPurchase,
  GetPurchaseUseCase,
} from "@application/use-cases/purchase";
import { MockPurchaseRepository } from "@test-application/mocks/repositories";

const sut = new GetPurchaseUseCase(new MockPurchaseRepository());

describe("Get Purchase Use Case", () => {
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
