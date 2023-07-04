import {
  PaymentType,
  Purchase,
  PurchaseItemProps,
  PurchaseProps,
} from "@domain/index";

import { faker } from "@faker-js/faker";

export const mockPurchaseItem = (
  mock: Partial<PurchaseItemProps>
): PurchaseItemProps => {
  return {
    id: mock.id ? mock.id : "ID" + Math.floor(Math.random() * 100).toString(),
    productId: mock.productId
      ? mock.productId
      : Math.floor(Math.random() * 100).toString(),
    name: faker.commerce.productName(),
    quantity: 1,
    price: mock.price ? mock.price : 50,
    uniqueDiscount: 0,
  };
};

export const mockCompletePurchase = (
  mock?: Partial<PurchaseProps>
): Purchase => {
  return Purchase.create({
    id: mock.id ? mock.id : "ID" + Math.floor(Math.random() * 100).toString(),
    userId: mock.userId ? mock.userId : "1",
    items: mock.items ? mock.items : [mockPurchaseItem({ id: "valid_id_1" })],
    paymentType: PaymentType.CASH,
    total: 0,
    voucher: mock.voucher ? mock.voucher : "valid_voucher",
  });
};
