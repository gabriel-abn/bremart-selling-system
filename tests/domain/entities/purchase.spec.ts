import { DomainError } from "@domain/common/domain-error";
import { PaymentType, PurchaseStatus } from "@domain/entities";
import { mockCompletePurchase, mockProduct } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

describe("Purchase business rules", () => {
  it("should throw if user id is not provided", () => {
    expect(() => mockCompletePurchase({ userId: undefined })).toThrow(
      DomainError
    );
  });
  it("should throw if purchase has no products", () => {
    expect(() => mockCompletePurchase({ items: [] })).toThrow(DomainError);
  });
  it("should return product list", () => {
    const purchase = mockCompletePurchase({
      items: [mockProduct({}), mockProduct({})],
    });

    expect(purchase.props.items).toHaveLength(2);
  });
  describe("Delivery address", () => {
    it("should throw if address is not provided", () => {
      expect(() => mockCompletePurchase({ address: null })).toThrow(
        DomainError
      );
    });
    it("should throw if address fields are not valid", () => {
      expect(() =>
        mockCompletePurchase({
          address: {
            street: "",
            number: "",
            city: "",
            state: "",
            neighborhood: "",
            complement: "",
            zipCode: "",
          },
        })
      ).toThrow(DomainError);
    });
    it("should be able to update delivery address", () => {
      const purchase = mockCompletePurchase({});

      purchase.updateDeliveryAddress({
        street: "Rua B",
        number: "321",
        city: "São Paulo",
        state: "SP",
        neighborhood: "Bairro",
        complement: "Complemento",
        zipCode: "12345678",
      });

      expect(purchase.props.address).toEqual({
        street: "Rua B",
        number: "321",
        city: "São Paulo",
        state: "SP",
        neighborhood: "Bairro",
        complement: "Complemento",
        zipCode: "12345678",
      });
    });
    it("should throw if update delivery address with invalid fields", () => {
      const purchase = mockCompletePurchase({});

      expect(() =>
        purchase.updateDeliveryAddress({
          street: "",
          number: "",
          city: "",
          state: "",
          neighborhood: "",
          complement: "",
          zipCode: "",
        })
      ).toThrow(DomainError);
    });
  });
  describe("Purchase value", () => {
    it("should sum all products values and be greater than 0", () => {
      const purchase = mockCompletePurchase({
        items: [mockProduct({ price: 50 }), mockProduct({ price: 50 })],
      });

      expect(purchase.props.purchaseValue).toBe(100);
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

      expect(purchasePercentageDiscount.props.purchaseValue).toBe(90);
      expect(purchaseValueDiscount.props.purchaseValue).toBe(40);
      expect(purchaseBothDiscount.props.purchaseValue).toBe(80);
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

      expect(purchase.props.purchaseValue).toBe(270);
    });
    it("should throw if discount percentage is greater than 1 or less than 0", () => {
      expect(() =>
        mockCompletePurchase({
          discountPercentage: 2,
          items: [mockProduct({ price: 50 })],
        })
      ).toThrow(DomainError);
      expect(() =>
        mockCompletePurchase({
          discountPercentage: -1,
          items: [mockProduct({ price: 50 })],
        })
      ).toThrow(DomainError);
    });
  });
  describe("Freight value", () => {
    it("should be greater or equal to 0", () => {
      const purchase = mockCompletePurchase({ freightValue: 0 });

      expect(purchase.props.freightValue).toBe(0);
      expect(() =>
        mockCompletePurchase({
          freightValue: -1,
        })
      ).toThrow(DomainError);
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

      expect(purchasePercentageDiscount.props.freightValue).toBe(90);
      expect(purchaseValueDiscount.props.freightValue).toBe(190);
      expect(purchaseBothDiscount.props.freightValue).toBe(260);
    });
    it("should throw if discount gets greater than initial value", () => {
      expect(() =>
        mockCompletePurchase({
          freightValue: 100,
          freightDiscountValue: 200,
        })
      ).toThrow(DomainError);
    });
    it("should throw if discount percentage is greater than 1 or less than 0", () => {
      expect(() =>
        mockCompletePurchase({
          freightDiscountPercentage: 2,
        })
      ).toThrow(DomainError);
      expect(() =>
        mockCompletePurchase({
          freightDiscountPercentage: -1,
        })
      ).toThrow(DomainError);
    });
  });
  describe("Total value", () => {
    it("should sum purchase and fright value", () => {
      const purchase = mockCompletePurchase({
        items: [mockProduct({ price: 100 })],
        freightValue: 100,
      });

      expect(purchase.props.totalValue).toBe(200);
    });
  });
  describe("Purchase status", () => {
    it("should be initialized as 'PENDING_PAYMENT'", () => {
      const purchase = mockCompletePurchase();

      expect(purchase.props.status).toBe("PENDING_PAYMENT");
    });
    it("should be able to update status", () => {
      const purchase = mockCompletePurchase();

      purchase.status = PurchaseStatus.CANCELED;

      expect(purchase.props.status).toBe("CANCELED");
    });
  });
  describe("Delivery status", () => {
    it("should be initialized as null", () => {
      const purchase = mockCompletePurchase();

      expect(purchase.props.deliveryStatus).toBeNull();
    });
    it("should be able to update delivery status", () => {
      const purchase = mockCompletePurchase();

      purchase.deliveryStatus = {
        description: "DELIVERED",
        location: "São Paulo",
        purchaseId: purchase.id,
        trackingId: "123456789",
      };

      expect(purchase.props.deliveryStatus).toEqual({
        description: "DELIVERED",
        location: "São Paulo",
        purchaseId: purchase.id,
        trackingId: "123456789",
      });
    });
  });
});
