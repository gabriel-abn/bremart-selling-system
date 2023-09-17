import { ApplicationError } from "@application/common";
import { ICrypter } from "@application/protocols";
import { IUserRepository } from "@application/repositories";
import { AddAddress } from "@domain/use-cases/user";

export class AddAddressUseCase implements AddAddress {
  constructor(
    private userRepository: IUserRepository,
    private crypter: ICrypter,
  ) {}

  async execute(params: AddAddress.Params): Promise<AddAddress.Result> {
    const user = await this.userRepository.get(params.id).then((user) => {
      if (!user) throw new ApplicationError("User not found.", "USER_NOT_FOUND");
      return user;
    });

    user.addAddress(params.address);

    await this.userRepository.update(user);

    const cryptedAddressId = await this.crypter.encrypt(params.address.id);

    return {
      email: user.props.email,
      cryptedAddressId,
    };
  }
}
