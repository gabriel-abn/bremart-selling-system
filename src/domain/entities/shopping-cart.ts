import { DomainError } from "@domain/common";
import { Product } from "./product";

export class ShoppingCart {
  protected products: Product[] = [];
  protected totalValue: number = 0;

  public get total(): number {
    return this.totalValue;
  }

  public get items(): Product[] {
    return this.products;
  }

  public addProduct(product: Product): void {
    if (this.products.find((p) => p.id === product.id)) {
      throw new DomainError("Product already exists in cart");
    }

    this.products.push(product);
    this.totalValue += product.price;
  }

  public removeProduct(productId: string): void {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      throw new DomainError("Product not found");
    }

    this.totalValue -= product.price * product.quantity;
    this.products = this.products.filter((product) => product.id !== productId);
  }

  public updateProductQuantity(productId: string, quantity: number): void {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      throw new DomainError("Product not found");
    }

    this.totalValue -= product.price * product.quantity;
    product.quantity = quantity;
    this.totalValue += product.price * product.quantity;
  }
}
