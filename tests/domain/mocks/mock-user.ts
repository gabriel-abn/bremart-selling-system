import { User, UserProps } from "@domain/user";
import { faker } from "@faker-js/faker";

export const mockUser = (mock: Partial<UserProps>): User => {
  return User.create({
    id: "ID" + Math.floor(Math.random() * 100).toString(),
    cpf: faker.phone.number("###.###.###-##"),
    email: faker.internet.email(),
    birthdate: faker.date.between({ from: "2000-01-01", to: "2000-01-01" }),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    phone: faker.phone.number("##9########"),
    rg: faker.phone.number("##.###.###"),
    ...mock,
  });
};
