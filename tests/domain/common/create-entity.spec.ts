import { Entity } from "@domain/common";
import { mockCompletePurchase } from "@test-domain/mocks";

describe("Create Entity", () => {
  it("should be able to create an entity", () => {
    expect(mockCompletePurchase({})).toBeInstanceOf(Entity);
  });
  it("2 entities should have different IDs", () => {
    const product1 = mockCompletePurchase({});
    const product2 = mockCompletePurchase({});

    expect(product1.id).not.toEqual(product2.id);
  });
  it("should have a creation date", () => {
    expect(mockCompletePurchase({}).getUpdateDates().createdAt).not.toBeNull();
  });
  it("should have a last update date", () => {
    expect(mockCompletePurchase({}).getUpdateDates().updatedAt).not.toBeNull();
  });
  it("should have a last update date equal or greater that creation date", () => {
    const purchase = mockCompletePurchase({});

    expect(
      purchase.getUpdateDates().updatedAt.getTime()
    ).toBeGreaterThanOrEqual(purchase.getUpdateDates().createdAt.getTime());
  });
});
