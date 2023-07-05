import { ApplicationError } from "@application/common";
import { CreateLeadService } from "@application/services/leads/create-lead-service";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { PaymentType } from "@domain/payment-type";
import {
  MockLeadRepository,
  MockPurchaseItemRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import {
  UUIDGeneratorMock,
  mockCompletePurchase,
  mockPurchaseItem,
} from "@test-domain/mocks";

const makeSut = () => {
  const mockLeadRepository = new MockLeadRepository();

  const leadService = new CreateLeadService(
    mockLeadRepository,
    null,
    new UUIDGeneratorMock()
  );

  const sut = new CreatePurchaseUseCase(
    new UUIDGeneratorMock(),
    new MockPurchaseRepository(),
    new MockUserRepository(),
    new MockPurchaseItemRepository(),
    leadService
  );

  return sut;
};

const mockProps = mockCompletePurchase({}).props;

describe("Create purchase use case", () => {
  it("should return a purchase", async () => {
    const sut = makeSut();

    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: mockProps.items,
      paymentType: mockProps.paymentType,
    });

    expect(purchase).toBeTruthy();
  });

  it("should return a purchase with a valid result", async () => {
    const sut = makeSut();

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
      const sut = makeSut();

      await sut.execute({
        userId: mockProps.userId,
        paymentType: mockProps.paymentType,
        items: [],
      });
    }).rejects.toThrowError(ApplicationError);
  });

  it("should give 5% discount if payment type is in cash and total price greater than 500", async () => {
    const sut = makeSut();

    const purchase = await sut.execute({
      userId: mockProps.userId,
      items: [mockPurchaseItem({ id: "valid_id_1", price: 600 })],
      paymentType: PaymentType.CASH,
    });

    expect(purchase.total).toBe(570);
  });

  it("should throw if invalid purchase items given", async () => {
    expect(async () => {
      const sut = makeSut();

      await sut.execute({
        items: [mockPurchaseItem({ id: "invalid_id" })],
        paymentType: PaymentType.CASH,
        userId: "1",
      });
    }).rejects.toThrowError(ApplicationError);
  });
});
