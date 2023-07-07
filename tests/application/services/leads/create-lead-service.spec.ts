import { CreateLeadService } from "@application/services/leads/create-lead-service";
import { CreatePurchaseUseCase } from "@application/use-cases/purchase";
import { LeadStatus } from "@domain/lead";
import { PaymentType } from "@domain/payment-type";
import { MockVoucherValidator } from "@test-application/mocks/protocols/apis";
import {
  MockLeadRepository,
  MockPurchaseItemRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "@test-application/mocks/repositories";
import { UUIDGeneratorMock, mockPurchaseItem } from "@test-domain/mocks";
import { mockUser } from "@test-domain/mocks/mock-user";

const makeSut = () => {
  const generator = new UUIDGeneratorMock();
  const purchaseRepository = new MockPurchaseRepository();
  const userRepository = new MockUserRepository();
  const purchaseItemRepository = new MockPurchaseItemRepository();
  const leadRepository = new MockLeadRepository();

  const createLeadService = new CreateLeadService(
    leadRepository,
    new MockVoucherValidator(),
    new UUIDGeneratorMock()
  );

  purchaseItemRepository.items.push(
    mockPurchaseItem({ id: "any_id_1" }),
    mockPurchaseItem({ id: "any_id_2" }),
    mockPurchaseItem({ id: "any_id_3" })
  );

  userRepository.items.push(mockUser({ id: "any_id_1", cpf: "12312312300" }));

  const userMock = mockUser({ id: "any_id_1", cpf: "12312312300" });

  userRepository.items.push(userMock);

  const sut = new CreatePurchaseUseCase(
    generator,
    purchaseRepository,
    userRepository,
    purchaseItemRepository,
    createLeadService
  );

  return {
    userMock,
    sut,
    purchaseRepository,
    userRepository,
    leadRepository,
  };
};

describe("Create Lead service", () => {
  it("should create a lead after purchase completition", async () => {
    const { sut, leadRepository, userMock } = makeSut();

    const response = await sut.execute({
      paymentType: PaymentType.PIX,
      userId: userMock.id,
      items: [
        mockPurchaseItem({ id: "any_id_1" }),
        mockPurchaseItem({ id: "any_id_2" }),
      ],
      voucher: "invalid",
    });

    const lead = await leadRepository.findByPurchaseId(response.id);

    expect(lead).toBeTruthy();
  });
  it("should have 'not completed' status", async () => {
    const { sut, leadRepository, userMock } = makeSut();

    const response = await sut.execute({
      paymentType: PaymentType.PIX,
      userId: userMock.id,
      items: [
        mockPurchaseItem({ id: "any_id_1" }),
        mockPurchaseItem({ id: "any_id_2" }),
      ],
      voucher: "invalid",
    });

    const lead = await leadRepository.findByPurchaseId(response.id);

    expect(lead.status).toEqual(LeadStatus.PENDING);
  });
  it("leads should not have initial value for payment field", async () => {
    const { sut, leadRepository, userMock } = makeSut();

    const response = await sut.execute({
      paymentType: PaymentType.PIX,
      userId: userMock.id,
      items: [
        mockPurchaseItem({ id: "any_id_1" }),
        mockPurchaseItem({ id: "any_id_2" }),
      ],
      voucher: "invalid",
    });

    const lead = await leadRepository.findByPurchaseId(response.id);

    expect(lead.paymentId).toEqual(null);
  });
});
