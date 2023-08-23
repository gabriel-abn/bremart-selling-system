import { DomainError } from "@domain/common/domain-error";
import { PaymentType } from "@domain/payment-type";
import { mockCompletePurchase, mockProduct } from "@test-domain/mocks";

describe("Purchase business rules", () => {
  it("should throw if user id is not provided", () => {
    expect(() => mockCompletePurchase({ userId: undefined })).toThrow(
      DomainError
    );
  });
  it("should throw if purchase has no items", () => {
    expect(() => mockCompletePurchase({ items: [] })).toThrow(DomainError);
  });
  it("should return shopping cart", () => {
    const purchase = mockCompletePurchase({
      items: [mockProduct({}), mockProduct({})],
    });

    expect(purchase.getShoppingCart()).toHaveLength(2);
  });
  describe("Purchase value", () => {
    it("should sum all products values and be greater than 0", () => {
      const purchase = mockCompletePurchase({
        items: [mockProduct({ price: 50 }), mockProduct({ price: 50 })],
      });

      expect(purchase.getPurchaseValue()).toBe(100);
    });
    it("should apply discount if any given", () => {
      const purchasePercentageDiscount = mockCompletePurchase({
        discountPercentage: 0.1,
        items: [mockProduct({ price: 100 })],
      });

      const purchaseValueDiscount = mockCompletePurchase({
        discountValue: 10,
        items: [mockProduct({ price: 50 })],
      });

      const purchaseBothDiscount = mockCompletePurchase({
        discountPercentage: 0.1,
        discountValue: 10,
        items: [mockProduct({ price: 100 })],
      });

      expect(purchasePercentageDiscount.getPurchaseValue()).toBe(90);
      expect(purchaseValueDiscount.getPurchaseValue()).toBe(40);
      expect(purchaseBothDiscount.getPurchaseValue()).toBe(80);
    });
    it("should throw if discount total value is greater than purchase value", () => {
      expect(() =>
        mockCompletePurchase({
          discountValue: 100,
          items: [mockProduct({ price: 50 })],
        })
      ).toThrow(DomainError);
    });
    it("should apply 10% discount if total value is greater than 300 and payment method is PIX", () => {
      const purchase = mockCompletePurchase({
        paymentType: PaymentType.PIX,
        items: [mockProduct({ price: 300 })],
      });

      expect(purchase.getPurchaseValue()).toBe(270);
    });
  });
  describe("Freight value", () => {
    it("should be greater or equal to 0", () => {
      const purchase = mockCompletePurchase({ freightValue: 0 });

      expect(purchase.getFreightValue()).toBe(0);
    });
    it("should apply discount if any given", () => {
      const purchasePercentageDiscount = mockCompletePurchase({
        freightValue: 100,
        freightDiscountPercentage: 0.1,
      });

      const purchaseValueDiscount = mockCompletePurchase({
        freightValue: 200,
        freightDiscountValue: 10,
      });

      const purchaseBothDiscount = mockCompletePurchase({
        freightValue: 300,
        freightDiscountPercentage: 0.1,
        freightDiscountValue: 10,
      });

      expect(purchasePercentageDiscount.getFreightValue()).toBe(90);
      expect(purchaseValueDiscount.getFreightValue()).toBe(190);
      expect(purchaseBothDiscount.getFreightValue()).toBe(260);
    });
    it("should throw if discount gets greater than initial value", () => {
      expect(() =>
        mockCompletePurchase({
          freightValue: 100,
          freightDiscountValue: 200,
        })
      ).toThrow(DomainError);
    });
  });
  // describe("Total value", () => {
  //   it("should sum purchase and fright value", () => {});
  // });
  // describe("Purchase status", () => {
  //   it("should be initialized as 'PENDING_PAYMENT'", () => {});
  // });
  // describe("Delivery status", () => {
  //   it("should be initialized as null", () => {});
  //   it("should be able to update delivery status", () => {});
  // });
});
