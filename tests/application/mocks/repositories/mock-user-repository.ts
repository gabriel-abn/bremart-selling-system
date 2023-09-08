import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { User, UserProps } from "@domain/entities/user";

export class MockUserRepository implements IUserRepository {
  public items: User[] = [];

  async register(user: User): Promise<{ id: string }> {
    const exist = this.items.find(
      (u) => u.getProps().cpf == user.getProps().cpf
    );

    if (exist) {
      throw new ApplicationError(
        "CPF already exists in repository.",
        "User Repository: "
      );
    }

    this.items.push(user);
    return { id: user.getId() };
  }

  async getById(id: string): Promise<UserProps> {
    const user = this.items.find((u) => {
      if (u.getId() === id) {
        return u;
      }
    });

    if (!user) {
      throw new ApplicationError("User not found.", "User Repository");
    }

    return user.getProps();
  }

  async getByCPF(cpf: string): Promise<UserProps> {
    const user = this.items.find((u) => {
      return u.getProps().cpf === cpf;
    });

    if (!user) {
      throw new ApplicationError("User not found.", "User Repository: ");
    }

    return user.getProps();
  }

  async getAll(): Promise<UserProps[]> {
    return this.items.map((u) => u.getProps());
  }
}
