import { IHasher } from "@application/protocols";

export class FakeHasher implements IHasher {
  async hash(value: string): Promise<string> {
    return value + "hashed";
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return value + "hashed" === hash;
  }

  generate(): string {
    return "NEW_PASSWORD";
  }
}
