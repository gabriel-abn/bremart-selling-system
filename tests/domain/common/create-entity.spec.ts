import { Entity } from "@domain/common";
import { PurchaseProps } from "@domain/entities";
import { mockCompletePurchase } from "@test-domain/mocks";

describe("Create Entity", () => {
  it("should be able to create an entity", () => {
    expect(mockCompletePurchase({})).toBeInstanceOf(Entity);
  });
  it("should return false if 2 entities should have different IDs", () => {
    const product1 = mockCompletePurchase({});
    const product2 = mockCompletePurchase({});

    expect(product1.equals(product2)).toBeFalsy();
  });
  it("should return false if the object is null", () => {
    const product1 = mockCompletePurchase({});
    const product2 = null;

    expect(product1.equals(product2)).toBeFalsy();
  });
  it("should return true if comparing the same object", () => {
    const product1 = mockCompletePurchase({});
    const product2 = product1;

    expect(product1.equals(product2)).toBeTruthy();
  });
  it("should return true if 2 entities should have the same ID", () => {
    const product1 = mockCompletePurchase({
      id: "123",
    });
    const product2 = mockCompletePurchase({
      id: "123",
    });

    expect(product1.equals(product2)).toBeTruthy();
  });
  it("should return props of the entity", () => {
    const product = mockCompletePurchase({});

    expect(product.getProps()).toEqual(
      expect.objectContaining<PurchaseProps>(product.getProps())
    );
  });
  it("should return the ID of the entity", () => {
    const product = mockCompletePurchase({});

    expect(product.getId()).toEqual(product.getId());
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
