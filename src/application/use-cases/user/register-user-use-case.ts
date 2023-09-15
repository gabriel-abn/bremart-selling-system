import { IEmailSender, IHasher } from "@application/protocols";
import { IDataValidation } from "@application/protocols/apis";
import { ITokenRepository, IUserRepository } from "@application/repositories";
import { IUUIDGenerator } from "@domain/common";
import { User } from "@domain/entities";
import { RegisterUser } from "@domain/use-cases/user";

export class RegisterUserUseCase implements RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private uuidGenerator: IUUIDGenerator,
    private dataValidator: IDataValidation,
    private emailSender: IEmailSender,
    private hasher: IHasher,
    private tokenRepository: ITokenRepository
  ) {}

  async execute(params: RegisterUser.Params): Promise<RegisterUser.Result> {
    const validCPF = await this.dataValidator.validateCPF(params.cpf);
    const validRG = await this.dataValidator.validateRG(params.rg);

    await this.dataValidator.validateEmail(params.email);

    const password = this.hasher.generate();
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

    const token = this.uuidGenerator.generate().split("-")[0].toUpperCase();

    await this.tokenRepository.save(user.props.email, [token]);

    await this.emailSender.sendEmail({
      to: user.props.email,
      subject: "Bem vindo ao sistema",
      template: "welcome",
      params: {
        "user.name": user.props.name,
        token: token,
      },
    });

    const result = await this.userRepository.register(user);

    return {
      email: user.props.email,
      createdAt: user.getUpdateDates().createdAt,
      hashedPassword: hashedPassword,
      cryptedId: result.id,
    };
  }
}
