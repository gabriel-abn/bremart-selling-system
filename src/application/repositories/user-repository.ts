import { UserProps } from "@domain/user";

export interface IUserRepository {
  getById(id: string): Promise<UserProps>;
}
