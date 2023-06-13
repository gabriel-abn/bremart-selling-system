import { Entity } from "./common";
import { DomainError } from "./common/domain-error";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  rg: string;
  birthdate: Date;
  phone: string;
};

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props, props.id);
  }

  static create(props: UserProps): User {
    var errors: string[] = [];

    if (
      new Date(Date.now()).getFullYear() - props.birthdate.getFullYear() <
      18
    ) {
      errors.push("Users with less than 18 years are not allowed");
    }

    if (errors.length > 0) {
      throw new DomainError(errors);
    }

    return new User(props);
  }
}
