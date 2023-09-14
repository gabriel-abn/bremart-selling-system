import { ApplicationError } from "@application/common";
import { ITokenRepository } from "@application/repositories";

export class MockTokenRepository implements ITokenRepository {
  items: Map<string, string> = new Map();

  async save(email: string, data: string[]): Promise<void> {
    if (this.items.has(email)) {
      const oldData = this.items.get(email);
      this.items.delete(email);
      this.items.set(email, oldData.concat(data.join(";")));
      return;
    }

    this.items.set(email, data.join(";"));
  }

  async check(email: string, data: string): Promise<boolean> {
    if (!this.items.has(email)) {
      throw new ApplicationError("Invalid email.", "INVALID_EMAIL");
    }

    const userData = this.items.get(email);

    if (userData.includes(data)) {
      return true;
    }

    return false;
  }
}
