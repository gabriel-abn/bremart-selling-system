import { DomainError } from "@domain/common/domain-error";
import { Freight, PaymentType, PurchaseStatus } from "@domain/entities";
import { mockProduct, mockPurchase } from "@test-domain/mocks";
import { describe, expect, it } from "vitest";

describe("Purchase business rules", () => {
  it("should throw if user id is not provided", () => {
    expect(() => mockPurchase({ userId: undefined })).toThrow(DomainError);
  });
  it("should throw if purchase has no products", () => {
    expect(() => mockPurchase({ items: [] })).toThrow(DomainError);
  });
  it("should return product list", () => {
    const purchase = mockPurchase({
      items: [mockProduct({}), mockProduct({})],
    });

    expect(purchase.props.items).toHaveLength(2);
  });
  describe("Delivery address", () => {
    it("should throw if address is not provided", () => {
      expect(() => mockPurchase({ address: null })).toThrow(DomainError);
    });

    it("should throw if address fields are not valid", () => {
      expect(() =>
        mockPurchase({
          address: {
            street: "",
            number: "",
            city: "",
            state: "",
            neighborhood: "",
            complement: "",
            zipCode: "",
          },
        }),
      ).toThrow(DomainError);
    });

    it("should be able to update delivery address", () => {
      const purchase = mockPurchase({});

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
      const purchase = mockPurchase({});

      expect(() =>
        purchase.updateDeliveryAddress({
          street: "",
          number: "",
          city: "",
          state: "",
          neighborhood: "",
          complement: "",
          zipCode: "",
        }),
      ).toThrow(DomainError);
    });
  });

  describe("Purchase value", () => {
    it("should sum all products values and be greater than 0", () => {
      const purchase = mockPurchase({
        items: [mockProduct({ price: 50 }), mockProduct({ price: 50 })],
      });

      expect(purchase.value.total).toBe(100);
    });

    it("should apply discount if any given", () => {
      const purchasePercentageDiscount = mockPurchase({
        discount: { percentage: 0.1, value: 0 },
        items: [mockProduct({ price: 100 })],
      });

      const purchaseValueDiscount = mockPurchase({
        discount: { value: 10, percentage: 0 },
        items: [mockProduct({ price: 50 })],
      });

      const purchaseBothDiscount = mockPurchase({
        discount: {
          percentage: 0.1,
          value: 10,
        },
        items: [mockProduct({ price: 100 })],
      });

      expect(purchasePercentageDiscount.value.total).toBe(90);
      expect(purchaseValueDiscount.value.total).toBe(40);
      expect(purchaseBothDiscount.value.total).toBe(80);
    });

    it("should throw if discount total value is greater than purchase value", () => {
      expect(() =>
        mockPurchase({
          discount: { value: 100, percentage: 0 },
          items: [mockProduct({ price: 50 })],
        }),
      ).toThrow(DomainError);
    });

    it("should apply 10% discount if total value is greater than 300 and payment method is PIX", () => {
      const purchase = mockPurchase({
        paymentType: PaymentType.PIX,
        items: [mockProduct({ price: 300 })],
      });

      expect(purchase.value.total).toBe(270);
    });

    it("should throw if discount percentage is greater than 1 or less than 0", () => {
      expect(() =>
        mockPurchase({
          discount: { percentage: 2, value: 0 },
          items: [mockProduct({ price: 50 })],
        }),
      ).toThrow(DomainError);
      expect(() =>
        mockPurchase({
          discount: { percentage: -1, value: 0 },
          items: [mockProduct({ price: 50 })],
        }),
      ).toThrow(DomainError);
    });
  });

  describe("Freight value", () => {
    it("should be greater or equal to 0", () => {
      const purchase = mockPurchase({ freight: new Freight(0, 0, 0) });

      expect(purchase.freight.total).toBe(0);
      expect(() =>
        mockPurchase({
          freight: new Freight(-1, 0, 0),
        }),
      ).toThrow(DomainError);
    });

    it("should apply discount if any given", () => {
      const purchasePercentageDiscount = mockPurchase({
        freight: new Freight(100, 0.1, 0),
      });

      const purchaseValueDiscount = mockPurchase({
        freight: new Freight(200, 0, 10),
      });

      const purchaseBothDiscount = mockPurchase({
        freight: new Freight(300, 0.1, 10),
      });

      expect(purchasePercentageDiscount.freight.total).toBe(90);
      expect(purchaseValueDiscount.freight.total).toBe(190);
      expect(purchaseBothDiscount.freight.total).toBe(260);
    });

    it("should throw if discount gets greater than initial value", () => {
      expect(() =>
        mockPurchase({
          freight: new Freight(100, 0.1, 100),
        }),
      ).toThrow(DomainError);
    });

    it("should throw if discount percentage is greater than 1 or less than 0", () => {
      expect(() =>
        mockPurchase({
          freight: new Freight(100, 2, 0),
        }),
      ).toThrow(DomainError);
      expect(() =>
        mockPurchase({
          freight: new Freight(100, -1, 0),
        }),
      ).toThrow(DomainError);
    });
  });

  describe("Total value", () => {
    it("should sum purchase and fright value", () => {
      const purchase = mockPurchase({
        items: [mockProduct({ price: 100 })],
        freight: new Freight(100, 0, 0),
      });

      expect(purchase.props.totalValue).toBe(200);
    });
  });
  describe("Purchase status", () => {
    it("should be initialized as 'PENDING_PAYMENT'", () => {
      const purchase = mockPurchase();

      expect(purchase.props.status).toBe("PENDING_PAYMENT");
    });
    it("should be able to update status", () => {
      const purchase = mockPurchase();

      purchase.status = PurchaseStatus.CANCELED;

      expect(purchase.props.status).toBe("CANCELED");
    });
  });
  describe("Delivery status", () => {
    it("should be initialized as null", () => {
      const purchase = mockPurchase();

      expect(purchase.props.deliveryStatus).toBeNull();
    });
    it("should be able to update delivery status", () => {
      const purchase = mockPurchase();

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
