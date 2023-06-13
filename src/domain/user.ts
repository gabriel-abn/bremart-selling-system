import { Entity } from "./common";

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

    return new User(props);
  }
}
