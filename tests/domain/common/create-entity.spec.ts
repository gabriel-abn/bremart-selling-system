import { Entity } from "@domain/common";
import { mockPurchase } from "@test-domain/mocks";

describe("Create Entity", () => {
  it("should be able to create an entity", () => {
    expect(mockPurchase()).toBeInstanceOf(Entity);
  });
  it("2 entities should have different IDs", () => {
    const product1 = mockPurchase();
    const product2 = mockPurchase();

    expect(product1.id).not.toEqual(product2.id);
  });
  it("should have a creation date", () => {
    expect(mockPurchase().getUpdateDates().createdAt).not.toBeNull();
  });
  it("should have a last update date", () => {
    expect(mockPurchase().getUpdateDates().updatedAt).not.toBeNull();
  });
  it("should have a last update date equal or greater that creation date", () => {
    const purchase = mockPurchase();

    expect(
      purchase.getUpdateDates().updatedAt.getTime()
    ).toBeGreaterThanOrEqual(purchase.getUpdateDates().createdAt.getTime());
  });
});
