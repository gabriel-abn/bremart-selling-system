import { ApplicationError } from "@application/common";
import { ITokenRepository } from "@application/repositories";
import { VerifyEmail } from "@domain/use-cases/user";

export class VerifyEmailUseCase implements VerifyEmail {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(data: VerifyEmail.Params): Promise<VerifyEmail.Result> {
    if (await this.tokenRepository.check(data.email, "YES")) {
      throw new ApplicationError(
        "Email already verified.",
        "EMAIL_ALREADY_VERIFIED"
      );
    }

    const token = await this.tokenRepository.check(
      data.email,
      data.verificationToken
    );

    if (!token) {
      throw new ApplicationError("Invalid token.", "INVALID_DATA");
    }

    await this.tokenRepository.save(data.email, ["YES"]);

    return {
      verified: token,
      email: data.email,
    };
  }
}
