import { MockPurchaseRepository } from "@test-application/mocks/repositories";

const sut = new GetPurchaseUseCase(new MockPurchaseRepository());

describe("Get Purchase Use Case", () => {
  it("should return purchase by id", async () => {
    const purchase = await sut.execute({ id: "any_id" });

    expect(purchase).toEqual({ id: "any_id" });
  });

  it("should throw if purchase does not exists", async () => {
    expect(async () => {
      await sut.execute({ id: "invalid_id" });
    }).rejects.toThrow("GetPurchaseUseCase: Purchase not found");
  });
});
