export interface ITokenRepository {
  save(email: string, data: string[]): Promise<void>;
  check(email: string, data: string): Promise<boolean>;
}
