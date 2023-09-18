import { DomainError, Entity } from "../common";
import { Address } from "./address";
import { AddressList } from "./address-list";
import { Product } from "./product";
import { Purchase } from "./purchase";
import { ShoppingCart } from "./shopping-cart";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  phone: string;
  addressList?: AddressList;
  shoppingCart: ShoppingCart;
  purchaseHistoric: Purchase[];
  status: "ACTIVE" | "DISABLED";
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props, props.id);
  }

  public set name(name: string) {
    this._props.name = name;
  }

  public set password(password: string) {
    this._props.password = password;
  }

  public get addressList(): AddressList {
    return this._props.addressList;
  }

  public addAddress(address: Address): void {
    this.addressList.addAddress(address, this._id);
  }

  public removeAddress(addressId: string): void {
    this.addressList.removeAddress(addressId);
  }

  public set defaultAddress(addressId: string) {
    this.addressList.setDefaultAddress(addressId);
  }

  public get defaultAddress(): Address {
    return this.addressList.defaultAddress;
  }

  public get status(): "ACTIVE" | "DISABLED" {
    return this._props.status;
  }

  public set status(status: "ACTIVE" | "DISABLED") {
    if (this.status === "DISABLED" && status === "DISABLED") {
      throw new DomainError("User is already disabled.");
    }

    this._props.status = status;
  }

  public addProductToShoppingCart(...product: Product[]): void {
    product.forEach((p) => {
      if (!p.productId) {
        throw new DomainError(`Product ${p.name} must have an id.`);
      }

      this._props.shoppingCart.addProduct(p);
    });
  }

  public removeProductFromShoppingCart(productId: string): void {
    this._props.shoppingCart.removeProduct(productId);
  }

  public updateProductQuantityInCart(productId: string, quantity: number): void {
    this._props.shoppingCart.updateProductQuantity(productId, quantity);
  }

  public static restore(props: UserProps): User {
    const user = new User(props);

    if (!user) {
      throw new DomainError("Error restoring user.");
    }

    return user;
  }

  public static create(props: Omit<UserProps, "shoppingCart" | "status" | "purchaseHistoric">): User {
    const errors: string[] = [];

    if (new Date(Date.now()).getFullYear() - props.birthDate.getFullYear() < 18) {
      errors.push("Users with less than 18 years are not allowed");
    }

    if (errors.length > 0) {
      throw new DomainError(...errors);
    }

    return new User({
      purchaseHistoric: [],
      shoppingCart: new ShoppingCart(),
      status: "ACTIVE",
      ...props,
    });
  }
}
