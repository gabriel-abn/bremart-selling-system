import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { User } from "@domain/entities/user";

export class MockUserRepository implements IUserRepository {
  public items: User[] = [];

  async register(user: User): Promise<{ id: string }> {
    const exist = this.items.find(
      (u) => u.getProps().cpf == user.getProps().cpf
    );

    if (exist) {
      throw new ApplicationError(
        "CPF already exists in repository.",
        "CPF_EXISTS"
      );
    }

    this.items.push(user);
    return { id: user.getId() };
  }

  async getById(id: string): Promise<User> {
    const user = this.items.find((u) => {
      if (u.getId() === id) {
        return u;
      }
    });

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    return user;
  }

  async getByCPF(cpf: string): Promise<User> {
    const user = this.items.find((u) => {
      return u.getProps().cpf === cpf;
    });

    if (!user) {
      throw new ApplicationError("User not found.", "USER_NOT_FOUND");
    }

    return user;
  }

  async getAll(): Promise<User[]> {
    return this.items;
  }
}
