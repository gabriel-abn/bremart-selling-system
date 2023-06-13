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
    return this.items.find((u) => {
      return u.id === id;
    }).props;
  }

  async getByCPF(cpf: string): Promise<UserProps> {
    return this.items.find((u) => {
      return u.props.cpf === cpf;
    }).props;
  }
}
