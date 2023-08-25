import { DomainError } from "@domain/common";
import { PaymentStatus } from "@domain/payment";
import { mockPayment } from "@test-domain/mocks";

describe("Payment business rules", () => {
  describe("Payment status", () => {
    it("should create a payment with status pending", () => {
      const pendingPayment = mockPayment({});

      expect(pendingPayment.status).toBe("PENDING");
    });
    it("should update payment status just if it's pending", () => {
      const pendingPayment = mockPayment({});

      pendingPayment.updateStatus(PaymentStatus.CONFIRMED);

      expect(pendingPayment.status).toBe("CONFIRMED");
    });
    it("should throw if update confirmed payment status", () => {
      const confirmedPayment = mockPayment({});

      confirmedPayment.updateStatus(PaymentStatus.CONFIRMED);

      expect(() =>
        confirmedPayment.updateStatus(PaymentStatus.PENDING)
      ).toThrowError(DomainError);
    });
  });
});
