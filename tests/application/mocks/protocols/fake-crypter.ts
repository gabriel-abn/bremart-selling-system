import { ICrypter } from "@application/protocols";

export class FakeCrypter implements ICrypter {
  async encrypt(value: string): Promise<string> {
    return value;
  }

  async decrypt(value: string): Promise<string> {
    return value;
  }
}
