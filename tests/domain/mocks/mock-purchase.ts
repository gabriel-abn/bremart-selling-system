import { Purchase, PurchaseItem } from "@domain/index";

export const mockPurchaseItem = (): PurchaseItem => {
  return PurchaseItem.create({
    id: "ID" + Math.floor(Math.random() * 100).toString(),
    productId: "PRODUCT" + Math.floor(Math.random() * 100).toString(),
    quantity: 1,
    price: 10,
    uniqueDiscount: 0,
  });
};

export const mockInitialPurchase = (): {
  items: PurchaseItem[];
  userId?: string;
} => {
  return {
    items: [mockPurchaseItem(), mockPurchaseItem(), mockPurchaseItem()],
    userId: "1",
  };
};

export const mockCompletePurchase = (): Purchase => {
  return Purchase.create({
    id: "ID" + Math.floor(Math.random() * 100).toString(),
    items: [mockPurchaseItem(), mockPurchaseItem(), mockPurchaseItem()],
    total: 0,
  });
};
