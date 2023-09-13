import { ITokenRepository } from "@application/repositories";

export class MockTokenRepository implements ITokenRepository {
  items: Record<string, string>[] = [];

  async save(token: string, email: string): Promise<void> {
    this.items.push({ token, email });
  }

  async check(token: string, email: string): Promise<boolean> {
    const item = this.items.find((item) => item.token === token);

    if (item) {
      return item.email === email;
    }

    return false;
  }
}
