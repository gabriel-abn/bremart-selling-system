import { User, UserProps } from "@domain/user";

export interface IUserRepository {
  register(user: User): Promise<{ id: string }>;
  getById(id: string): Promise<UserProps>;
  getByCPF(cpf: string): Promise<UserProps>;
}
