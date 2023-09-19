import { DomainError } from "@domain/common/domain-error";
import { AddressList } from "@domain/entities";
import { mockProduct } from "@test-domain/mocks";
import { mockAddress, mockAddressList, mockUser } from "@test-domain/mocks/mock-user";
import { describe, expect, it } from "vitest";

describe("User business rules", () => {
  it("should throw if user has less than 18 years old", () => {
    expect(() =>
      mockUser({
        birthDate: new Date("2010-01-01"),
      }),
    ).toThrow(DomainError);
  });

  it("should be able to update user name", () => {
    const user = mockUser({
      name: "John Doe",
    });

    user.name = "Jane Doe";

    expect(user.props.name).toBe("Jane Doe");
  });

  it("should be able to update user password", () => {
    const user = mockUser({
      password: "123456",
    });

    user.password = "654321";

    expect(user.props.password).toBe("654321");
  });

  describe("User: Address rules", () => {
    it("should set default address if just one given", () => {
      const user = mockUser({
        id: "123",
        addressList: mockAddressList("123"),
      });

      expect(user.defaultAddress).toHaveProperty("id", "123-0");
    });

    it("should be able to add addresses", () => {
      const user = mockUser({
        id: "123",
        addressList: mockAddressList("123"),
      });

      user.addAddress(mockAddress("123"));

      expect(user.defaultAddress).toHaveProperty("id", "123-0");
      expect(user.addressList.addresses[1]).toHaveProperty("id", "123-1");
      expect(user.addressList.addresses).toHaveLength(2);
    });

    it("should be able to update user's default address if more than one given", () => {
      const user = mockUser({
        id: "123",
        addressList: new AddressList("123", mockAddress("123"), mockAddress("123")),
      });

      user.defaultAddress = "1";

      expect(user.defaultAddress).toHaveProperty("id", "123-1");
    });

    it("should throw if add duplicated address", () => {
      const user = mockUser({
        id: "123",
        addressList: mockAddressList("123"),
      });

      expect(() => user.addAddress(mockAddress("123-0"))).toThrow(DomainError);
    });

    it.todo("should throw if try to set default address not in list", () => {});
    it.todo("should be able to get address by id");
    it.todo("should throw if try to get address by id not in list");
  });

  describe("User: Purchase rules", () => {
    it("should be initialized with empty shopping cart and purchase historic", () => {
      const user = mockUser({});

      expect(user.props.shoppingCart.items).toEqual([]);
      expect(user.props.purchaseHistoric).toEqual([]);
    });

    it("should be able to add products to cart", () => {
      const user = mockUser({});

      user.addProductToShoppingCart({
        id: "123",
        name: "Product 1",
        price: 100,
        productId: "123",
        quantity: 1,
        uniqueDiscount: 0,
      });

      expect(user.props.shoppingCart.items[0]).toHaveProperty("name", "Product 1");
    });

    it("should be able to remove products from cart", () => {
      const user = mockUser({});

      user.addProductToShoppingCart({
        id: "123",
        name: "Product 1",
        price: 100,
        productId: "123",
        quantity: 1,
        uniqueDiscount: 0,
      });

      user.removeProductFromShoppingCart("123");

      expect(user.props.shoppingCart.items).toEqual([]);
    });

    it("should be able to update products quantity in cart", () => {
      const user = mockUser({});

      user.addProductToShoppingCart({
        id: "123",
        name: "Product 1",
        price: 100,
        productId: "123",
        quantity: 1,
        uniqueDiscount: 0,
      });

      user.updateProductQuantityInCart("123", 2);

      expect(user.props.shoppingCart.items[0]).toHaveProperty("quantity", 2);
    });

    it("should throw if add duplicated product to cart", () => {
      const user = mockUser({});
      const product = mockProduct({ id: "123" });

      user.addProductToShoppingCart(product);

      expect(() => user.addProductToShoppingCart(product)).toThrow(DomainError);
    });

    it("should throw if try to remove product not in cart", () => {
      const user = mockUser({});
      const product = mockProduct({ id: "123" });

      expect(() => user.removeProductFromShoppingCart(product.id)).toThrow(DomainError);
    });
  });

  it("should update status", () => {
    const user = mockUser({});

    user.status = "DISABLED";

    expect(() => (user.status = "DISABLED")).toThrow(DomainError);
  });
});
