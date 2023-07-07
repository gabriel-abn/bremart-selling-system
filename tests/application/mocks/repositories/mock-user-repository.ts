import { ApplicationError } from "@application/common";
import { IUserRepository } from "@application/repositories";
import { User, UserProps } from "@domain/user";

export class MockUserRepository implements IUserRepository {
  public items: User[] = [];

  async register(user: User): Promise<{ id: string }> {
    const exist = this.items.find((u) => u.props.cpf == user.props.cpf);

    if (exist) {
      throw new ApplicationError(
        "CPF already exists in repository.",
        "User Repository: "
      );
    }

    this.items.push(user);
    return { id: user.id };
  }

  async getById(id: string): Promise<UserProps> {
    const user = this.items.find((u) => {
      if (u.id === id) {
        return u;
      }
    });

    if (!user) {
      throw new ApplicationError("User not found.", "User Repository");
    }

    return user.props;
  }

  async getByCPF(cpf: string): Promise<UserProps> {
    const user = this.items.find((u) => {
      return u.props.cpf === cpf;
    });

    if (!user) {
      throw new ApplicationError("User not found.", "User Repository: ");
    }

    return user.props;
  }

  async getAll(): Promise<UserProps[]> {
    return this.items.map((u) => u.props);
  }
}
