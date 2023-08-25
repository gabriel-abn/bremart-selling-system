import {
  PaymentType,
  Product,
  Purchase,
  PurchaseProps,
} from "@domain/entities";

import { faker } from "@faker-js/faker";

export const mockProduct = (mock: Partial<Product>): Product => {
  return {
    id: Math.floor(Math.random() * 100).toString(),
    productId: Math.floor(Math.random() * 100).toString(),
    name: faker.commerce.productName(),
    quantity: 1,
    price: mock.price,
    uniqueDiscount: 0,
  };
};

export const mockCompletePurchase = (
  mock?: Partial<PurchaseProps>
): Purchase => {
  const id = Math.floor(Math.random() * 100).toString();
  return Purchase.create({
    id: "ID" + id,
    userId: "1",
    address: {
      id: id + "1",
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      city: faker.location.city(),
      state: faker.location.state(),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      zipCode: faker.location.zipCode(),
    },
    items: [mockProduct({ id: "valid_id_1" })],
    paymentType: PaymentType.PIX,
    purchaseValue: 0,
    discountPercentage: 0,
    discountValue: 0,
    freightValue: 0,
    freightDiscountPercentage: 0,
    freightDiscountValue: 0,
    ...mock,
  });
};
