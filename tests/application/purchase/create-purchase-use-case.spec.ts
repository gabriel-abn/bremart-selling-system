import { ApplicationError } from "@application/common";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/payment-type";
import {
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import {
  UUIDGeneratorMock,
  mockCompletePurchase,
  mockPurchaseItem,
} from "@test-domain/mocks";

const sut = new CreatePurchaseUseCase(
  new UUIDGeneratorMock(),
  new MockPurchaseRepository(),
  new MockUserRepository()
);

const mockProps = mockCompletePurchase({}).props;

describe("Create purchase use case", () => {
  it("should return a purchase", async () => {
    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: mockProps.items,
      paymentType: mockProps.paymentType,
    });

    expect(purchase).toBeTruthy();
  });

  it("should return a purchase with a valid result", async () => {
    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: mockProps.items,
      paymentType: mockProps.paymentType,
    });

    expect(purchase.id).toBeTruthy();
    expect(purchase.total).toBeGreaterThan(0);
    expect(purchase.userId).toBeTruthy();
  });

  it("should throw if purchase has no items", async () => {
    expect(async () => {
      await sut.execute({
        userId: mockProps.userId,
        paymentType: mockProps.paymentType,
        items: [],
      });
    }).rejects.toThrowError(ApplicationError);
  });

  it("should give 5% discount if payment type is in cash and total price greater than 500", async () => {
    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: [mockPurchaseItem({ price: 600 })],
      paymentType: PaymentType.CASH,
    });

    expect(purchase.total).toBe(570);
  });
});
