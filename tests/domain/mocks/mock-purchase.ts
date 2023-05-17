import {
  PaymentType,
  Purchase,
  PurchaseItem,
  PurchaseItemProps,
  PurchaseProps,
} from "@domain/index";

export const mockPurchaseItem = (
  mock: Partial<PurchaseItemProps>
): PurchaseItem => {
  return PurchaseItem.create({
    id: "ID" + Math.floor(Math.random() * 100).toString(),
    productId: "PRODUCT" + Math.floor(Math.random() * 100).toString(),
    quantity: 1,
    price: mock.price ? mock.price : 50,
    uniqueDiscount: 0,
  });
};

export const mockCompletePurchase = (
  mock?: Partial<PurchaseProps>
): Purchase => {
  return Purchase.create({
    id: mock.id ? mock.id : "ID" + Math.floor(Math.random() * 100).toString(),
    userId: mock.userId ? mock.userId : "1",
    items: mock.items
      ? mock.items
      : [
          mockPurchaseItem({}).props,
          mockPurchaseItem({}).props,
          mockPurchaseItem({}).props,
        ],
    paymentType: PaymentType.CASH,
    total: 0,
  });
};
