import { DomainError } from "@domain/common/domain-error";
import { PaymentType } from "@domain/payment-type";
import { mockCompletePurchase, mockPurchaseItem } from "@test-domain/mocks";

describe("Purchase business rules", () => {
  describe("Purchase value", () => {
    it("should sum all products values and be greater than 0", () => {
      const purchase = mockCompletePurchase({
        items: [
          mockPurchaseItem({ price: 50 }),
          mockPurchaseItem({ price: 50 }),
        ],
      });

      expect(purchase.getTotal()).toBe(100);
    });
    it("should apply discount if any given", () => {
      const purchasePercentageDiscount = mockCompletePurchase({
        discountPercentage: 0.1,
        items: [mockPurchaseItem({ price: 100 })],
      });

      const purchaseValueDiscount = mockCompletePurchase({
        discountValue: 10,
        items: [mockPurchaseItem({ price: 50 })],
      });

      const purchaseBothDiscount = mockCompletePurchase({
        discountPercentage: 0.1,
        discountValue: 10,
        items: [mockPurchaseItem({ price: 100 })],
      });

      expect(purchasePercentageDiscount.getTotal()).toBe(90);
      expect(purchaseValueDiscount.getTotal()).toBe(40);
      expect(purchaseBothDiscount.getTotal()).toBe(80);
    });
    it("should throw if discount total value is greater than purchase value", () => {
      expect(() =>
        mockCompletePurchase({
          discountValue: 100,
          items: [mockPurchaseItem({ price: 50 })],
        })
      ).toThrow(DomainError);
    });
    it("should apply 10% discount if total value is greater than 300 and payment method is PIX", () => {
      const purchase = mockCompletePurchase({
        paymentType: PaymentType.PIX,
        items: [mockPurchaseItem({ price: 300 })],
      });

      expect(purchase.getTotal()).toBe(270);
    });
  });
  // describe("Freight value", () => {
  //   it("should be greater or equal to 0", () => {});
  // });
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
