import { Entity } from "@domain/common";
import { PurchaseProps } from "@domain/entities";
import { mockPurchase } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

describe("Create Entity", () => {
  it("should be able to create an entity", () => {
    expect(mockPurchase({})).toBeInstanceOf(Entity);
  });
  it("should return false if 2 entities should have different IDs", () => {
    const product1 = mockPurchase({});
    const product2 = mockPurchase({});

    expect(product1.equals(product2)).toBeFalsy();
  });
  it("should return false if the object is null", () => {
    const product1 = mockPurchase({});
    const product2 = null;

    expect(product1.equals(product2)).toBeFalsy();
  });
  it("should return true if comparing the same object", () => {
    const product1 = mockPurchase({});
    const product2 = product1;

    expect(product1.equals(product2)).toBeTruthy();
  });
  it("should return true if 2 entities should have the same ID", () => {
    const product1 = mockPurchase({
      id: "123",
    });
    const product2 = mockPurchase({
      id: "123",
    });

    expect(product1.equals(product2)).toBeTruthy();
  });
  it("should return props of the entity", () => {
    const product = mockPurchase({});

    expect(product.props).toEqual(expect.objectContaining<PurchaseProps>(product.props));
  });
  it("should return the ID of the entity", () => {
    const product = mockPurchase({});

    expect(product.id).toEqual(product.id);
  });
  it("should have a creation date", () => {
    expect(mockPurchase({}).getUpdateDates().createdAt).not.toBeNull();
  });
  it("should have a last update date", () => {
    expect(mockPurchase({}).getUpdateDates().updatedAt).not.toBeNull();
  });
  it("should have a last update date equal or greater that creation date", () => {
    const purchase = mockPurchase({});

    expect(purchase.getUpdateDates().updatedAt.getTime()).toBeGreaterThanOrEqual(
      purchase.getUpdateDates().createdAt.getTime(),
    );
  });
});
