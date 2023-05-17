import { IUserRepository } from "@application/repositories";
import { UserProps } from "@domain/user";

export class MockUserRepository implements IUserRepository {
  async getById(id: string): Promise<UserProps> {
    return {
      userId: id ? id : "1",
      name: "John Doe",
      email: "test@email.com",
      cpf: "00000000000",
    };
  }
}
