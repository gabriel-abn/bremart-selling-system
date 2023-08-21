describe("Payment business rules", () => {
  describe("Payment type", () => {
    it("should have valid payment type", () => {});
  });
  describe("Payment status", () => {
    it("should be initialized as 'NOT_PAID' if payment type is 'PIX' or 'DEBIT_CARD'", () => {});
    it("should be initialized as 'PENDING' if payment type is 'CREDIT_CARD' or 'BOLETO'", () => {});
    it("should be able to update payment status to 'CONFIRMED'", () => {});
    it("should be able to update payment status to 'REJECTED' if type is 'CREDIT_CARD' or 'BOLETO'", () => {});
  });
});
