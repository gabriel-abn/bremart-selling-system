export interface ITokenRepository {
  save(token: string, email: string): Promise<void>;
  check(token: string, email: string): Promise<boolean>;
}
