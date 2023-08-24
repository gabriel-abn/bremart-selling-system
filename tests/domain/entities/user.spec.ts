import { DomainError } from "@domain/common/domain-error";
import { mockUser } from "@test-domain/mocks/mock-user";

describe("User business rules", () => {
  it("should throw if user has less than 18 years old", () => {
    expect(() =>
      mockUser({
        birthdate: new Date("2010-01-01"),
      })
    ).toThrow(DomainError);
  });
  it("should be able to update user name", () => {
    const user = mockUser({
      name: "John Doe",
    });
    user.setName("Jane Doe");
    expect(user.getName()).toBe("Jane Doe");
  });
  it("should be able to update user password", () => {
    const user = mockUser({});

    user.setPassword("123456");

    expect(user.getPassword()).toBe("123456");
  });
  it("should set default address if just one given", () => {
    const user = mockUser({
      addresses: [
        {
          street: "Rua 1",
          number: "123",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
          complement: "",
          neighborhood: "",
        },
      ],
    });

    expect(user.getDefaultAddress()).toHaveProperty("zipCode", "12345678");
  });
  it("should be able to add addresses", () => {
    const user = mockUser({
      addresses: [
        {
          street: "Rua 1",
          number: "123",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
          complement: "",
          neighborhood: "",
        },
      ],
    });

    user.addAddress({
      street: "Rua 2",
      number: "123",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      complement: "",
      neighborhood: "",
    });

    expect(user.getDefaultAddress()).toHaveProperty("street", "Rua 1");
    expect(user.getAddresses()[1]).toHaveProperty("street", "Rua 2");
    expect(user.getAddresses().length).toBe(2);
  });
  it("should be able to update user's default address if more than one given", () => {
    const user = mockUser({
      addresses: [
        {
          street: "Rua 1",
          number: "123",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
          complement: "",
          neighborhood: "",
        },
        {
          street: "Rua 2",
          number: "123",
          city: "São Paulo",
          state: "SP",
          zipCode: "12345678",
          complement: "",
          neighborhood: "",
        },
      ],
    });

    user.setDefaultAddress(1);

    expect(user.getDefaultAddress()).toHaveProperty("street", "Rua 2");
  });
  it("should be initialized with empty shopping cart and purchase historic", () => {
    const user = mockUser({});

    expect(user.getShoppingCart()).toEqual([]);
    expect(user.getPurchaseHistoric()).toEqual([]);
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

    expect(user.getShoppingCart()[0]).toHaveProperty("name", "Product 1");
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

    expect(user.getShoppingCart()).toEqual([]);
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

    expect(user.getShoppingCart()[0]).toHaveProperty("quantity", 2);
  });
});
