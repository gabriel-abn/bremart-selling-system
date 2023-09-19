import { Freight, PaymentType, Product, Purchase, PurchaseConstructor } from "@domain/entities";

import { faker } from "@faker-js/faker";
import { mockAddress } from "./mock-user";

export const mockProduct = (mock: Partial<Product>): Product => {
  return {
    id: Math.floor(Math.random() * 100).toString(),
    productId: Math.floor(Math.random() * 100).toString(),
    name: faker.commerce.productName(),
    quantity: 1,
    price: 100,
    uniqueDiscount: 0,
    ...mock,
  };
};

export const mockPurchase = (mock?: Partial<PurchaseConstructor>): Purchase => {
  const id = Math.floor(Math.random() * 100).toString();

  return Purchase.create({
    id: "ID" + id,
    userId: "user_id",
    address: mockAddress(id),
    items: [mockProduct({ id: "valid_id_1" })],
    paymentType: PaymentType.PIX,
    freight: new Freight(0, 0, 0),
    discount: {
      percentage: 0,
      value: 0,
    },
    ...mock,
  });
};
