import { Address, AddressList, User, UserProps } from "@domain/entities";
import { faker } from "@faker-js/faker";

export const mockUser = (mock: Partial<UserProps>): User => {
  const id = "ID" + Math.floor(Math.random() * 100).toString() || mock.id;

  return User.create({
    id: id,
    cpf: faker.phone.number("###.###.###-##"),
    email: faker.internet.email(),
    birthDate: faker.date.between({ from: "2000-01-01", to: "2000-01-01" }),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    phone: faker.phone.number("##9########"),
    rg: faker.phone.number("##.###.###"),
    addressList: new AddressList(id, mockAddress("")),
    ...mock,
  });
};

export const mockAddressList = (userId: string): AddressList => {
  return new AddressList(userId, mockAddress(""));
};

export const mockAddress = (id: string, mock?: Partial<Omit<Address, "id">>): Address => {
  return {
    id,
    street: faker.location.street(),
    number: faker.location.buildingNumber(),
    city: faker.location.city(),
    state: faker.location.state(),
    complement: faker.location.secondaryAddress(),
    neighborhood: faker.location.county(),
    zipCode: faker.location.zipCode(),
    ...mock,
  };
};
