describe("Purchase business rules", () => {
  describe("Purchase value", () => {
    it("should sum all products values and be greater than 0", () => {});
    it("should apply discount if any given", () => {});
    it("should throw if discount total value is greater than purchase value", () => {});
    it("should apply discount if total value is greater than 300 and payment method is PIX", () => {});
  });
  describe("Freight value", () => {
    it("should be greater or equal to 0", () => {});
  });
  describe("Total value", () => {
    it("should sum purchase and fright value", () => {});
  });
  describe("Purchase status", () => {
    it("should be initialized as 'PENDING_PAYMENT'", () => {});
  });
  describe("Delivery status", () => {
    it("should be initialized as null", () => {});
    it("should be able to update delivery status", () => {});
  });
});
