export interface ICrypter {
  encrypt(value: string): Promise<string>;
  decrypt(value: string): Promise<string>;
}
