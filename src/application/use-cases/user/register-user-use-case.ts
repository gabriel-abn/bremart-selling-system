import { IEmailSender, IHasher } from "@application/protocols";
import { IDataValidation } from "@application/protocols/apis";
import { IUserRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { User } from "@domain/entities";
import { RegisterUser } from "@domain/use-cases/user";

export class RegisterUserUseCase implements RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private uuidGenerator: IUUIDGenerator,
    private dataValidator: IDataValidation,
    private emailSender: IEmailSender,
    private hasher: IHasher
  ) {}

  async execute(params: RegisterUser.Params): Promise<RegisterUser.Result> {
    const validCPF = await this.dataValidator.validateCPF(params.cpf);
    const validRG = await this.dataValidator.validateRG(params.rg);

    await this.dataValidator.validateEmail(params.email);

    const password = await this.hasher.hash(this.hasher.generate());
    const hashedPassword = await this.hasher.hash(password);

    const user = User.create({
      ...params,
      id: this.uuidGenerator
        .generate()
        .replaceAll("-", "")
        .toUpperCase()
        .slice(0, 9),
      cpf: validCPF,
      rg: validRG,
      addresses: [],
      password: password,
      birthDate: new Date(params.birthDate),
    });

    await this.emailSender.sendEmail({
      to: user.getProps().email,
      subject: "Bem vindo ao sistema",
      template: "welcome",
      params: {
        "user.name": user.getName(),
      },
    });

    const result = await this.userRepository.register(user);

    return {
      email: user.getProps().email,
      createdAt: user.getUpdateDates().createdAt,
      hashedPassword: hashedPassword,
      cryptedId: result.id,
    };
  }
}
