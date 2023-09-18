import { DomainError } from "@domain/common";
import { Address } from "./address";

export class AddressList {
  defaultAddress: Address;
  addresses: Address[] = [];

  constructor(userId: string, ...addresses: Address[]) {
    if (!this.defaultAddress) {
      this.defaultAddress = addresses[0];
    }

    if (Array.isArray(addresses)) {
      addresses.forEach((a) => {
        a.id = userId + "-" + addresses.indexOf(a).toString();
        this.addresses.push(a);
      });
    }
  }

  public addAddress(address: Address, userId: string): void {
    this.addresses.map((a) => {
      if (a.id === address.id) {
        throw new DomainError("Address already exists.");
      }
    });

    this.addresses.push({
      ...address,
      id: userId + "-" + this.addresses.length.toString(),
    });
  }

  public removeAddress(addressId: string): void {
    this.addresses = this.addresses.filter((a) => a.id.includes(addressId));
  }

  public setDefaultAddress(addressId: string): void {
    if (this.addresses.length === 1) {
      throw new DomainError("User with only one address.");
    }

    this.defaultAddress = this.addresses.find((a) => a.id.includes("-" + addressId));
  }
}
