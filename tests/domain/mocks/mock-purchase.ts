import { Freight, PaymentType, Product, Purchase, PurchaseProps } from "@domain/entities";

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

export const mockCompletePurchase = (mock?: Partial<PurchaseProps>): Purchase => {
  const id = Math.floor(Math.random() * 100).toString();

  return Purchase.create({
    id: "ID" + id,
    userId: "user_id",
    address: mockAddress(id),
    items: [mockProduct({ id: "valid_id_1" })],
    paymentType: PaymentType.PIX,
    purchaseValue: 0,
    discountPercentage: 0,
    discountValue: 0,
    freight: new Freight(0, 0, 0),
    ...mock,
  });
};
