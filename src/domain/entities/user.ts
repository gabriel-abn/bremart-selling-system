import { DomainError, Entity } from "../common";
import { Address } from "./address";
import { Product } from "./product";
import { Purchase } from "./purchase";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  phone: string;
  addresses: Address[];
  defaultAddress?: Address;
  shoppingCart?: Product[];
  purchaseHistory?: Purchase[];
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props, props.id);
  }

  public setName(name: string): void {
    this.props.name = name;
  }

  public getName(): string {
    return this.props.name;
  }

  public getPassword(): string {
    return this.props.password;
  }

  public setPassword(password: string): void {
    this.props.password = password;
  }

  public getDefaultAddress(): Address {
    return this.props.defaultAddress;
  }

  public addAddress(address: Address): void {
    this.props.addresses.push({
      id: this.getId() + this.props.addresses.length.toString(),
      ...address,
    });
  }

  public setDefaultAddress(addressId: number): void {
    this.props.defaultAddress = this.props.addresses[addressId];
  }

  public getAddresses(): Address[] {
    return this.props.addresses;
  }

  public getShoppingCart(): Product[] {
    return this.props.shoppingCart;
  }

  public addProductToShoppingCart(product: Product): void {
    this.props.shoppingCart.push(product);
  }

  public removeProductFromShoppingCart(productId: string): void {
    this.props.shoppingCart = this.props.shoppingCart.filter(
      (product) => product.id !== productId
    );
  }

  public updateProductQuantityInCart(
    productId: string,
    quantity: number
  ): void {
    this.props.shoppingCart = this.props.shoppingCart.map((product) => {
      if (product.id === productId) {
        product.quantity = quantity;
      }
      return product;
    });
  }

  public getPurchaseHistoric(): Purchase[] {
    return this.props.purchaseHistory;
  }

  public static create(props: UserProps): User {
    var errors: string[] = [];

    if (
      new Date(Date.now()).getFullYear() - props.birthdate.getFullYear() <
      18
    ) {
      errors.push("Users with less than 18 years are not allowed");
    }

    props.addresses.map((address, i) => {
      address.id = props.id + "-" + i.toString();
    });

    if (props.addresses.length === 1) {
      props.defaultAddress = props.addresses[0];
    }

    if (errors.length > 0) {
      throw new DomainError(errors);
    }

    return new User({
      purchaseHistory: [],
      shoppingCart: [],
      ...props,
    });
  }
}
