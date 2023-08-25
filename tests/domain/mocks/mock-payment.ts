import { Payment, PaymentProps, PaymentType } from "@domain/entities";

export const mockPayment = (mock?: Partial<PaymentProps>): Payment =>
  Payment.create({
    id: Math.floor(Math.random() * 100).toString(),
    paymentType: PaymentType.PIX,
    purchaseId: Math.floor(Math.random() * 100).toString(),
    value: 100,
    ...mock,
  });
