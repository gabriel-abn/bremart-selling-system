import { User } from "@domain/entities";

export interface IUserRepository {
  register(user: User): Promise<{ id: string }>;
  get(id: string): Promise<User>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<User[]>;
}
