import { User } from "@domain/entities";

export interface IUserRepository {
  register(user: User): Promise<{ id: string }>;
  getById(id: string): Promise<User>;
  getByCPF(cpf: string): Promise<User>;
  getAll(): Promise<User[]>;
}
