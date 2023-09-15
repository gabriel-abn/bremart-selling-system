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
  birthDate: Date;
  phone: string;
  addresses: Address[];
  defaultAddress?: Address;
  shoppingCart?: Product[];
  purchaseHistoric?: Purchase[];
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

  public addAddress(address: Address): void {
    this.props.addresses.map((a) => {
      if (a.id === address.id) {
        throw new DomainError(["Address already exists."]);
      }
    });

    this._props.addresses.push({
      id: this.id + this._props.addresses.length.toString(),
      ...address,
    });
  }

  public set defaultAddress(addressId: number) {
    this.props.defaultAddress = this.props.addresses[addressId];
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

  public static restore(props: UserProps): User {
    return new User(props);
  }

  public static create(props: UserProps): User {
    var errors: string[] = [];

    if (
      new Date(Date.now()).getFullYear() - props.birthDate.getFullYear() <
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
      purchaseHistoric: [],
      shoppingCart: [],
      ...props,
    });
  }
}
