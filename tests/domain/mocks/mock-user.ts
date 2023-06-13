import { User, UserProps } from "@domain/user";
import { faker } from "@faker-js/faker";

export const mockUser = (mock: Partial<UserProps>): User => {
  return User.create({
    id: undefined,
    cpf: mock.cpf ? mock.cpf : faker.phone.number("###########"),
    email: mock.email ? mock.email : faker.internet.email(),
    birthdate: mock.birthdate ? mock.birthdate : faker.date.past({ years: 18 }),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    phone: faker.phone.number("319########"),
    rg: faker.phone.number("##.###.###"),
  });
};
